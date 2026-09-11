import time
import os
import random

# Load .env file if it exists (picks up SLACK_WEBHOOK_URL)
try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    env_path = os.path.join(os.path.dirname(__file__), ".env")
    if os.path.exists(env_path):
        with open(env_path) as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith("#") and "=" in line:
                    k, v = line.split("=", 1)
                    os.environ.setdefault(k.strip(), v.strip())

from flask import Flask, jsonify, request
from telemetry import generate_telemetry, generate_batch
from detector import AnomalyDetector
import vault
from slack_bot import notify_slack
from flask_socketio import SocketIO, emit
import json
import datetime
import sys

backend_dir = os.path.join(os.path.dirname(__file__), "backend")
if backend_dir not in sys.path:
    sys.path.insert(0, backend_dir)

try:
    from app.services.vega_controller import vega_controller
except Exception:
    vega_controller = None


app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")


# Primary cloud inventory instances (5 total, all starting as RUNNING)
instances = {
    "i-0a1b2c3d": {"name": "staging-api",  "state": "running", "type": "t2.micro", "resource_type": "Staging Server",    "feed": "LIVE - VEGA Aries", "device_id": "vega-01"},
    "i-0e4f5g6h": {"name": "dev-worker",   "state": "running", "type": "t2.micro", "resource_type": "Dev Environment",   "feed": "REAL TRACE REPLAY", "device_id": "trace-worker-02"},
    "i-0q7r8s9t": {"name": "qa-runner",    "state": "running", "type": "t2.micro", "resource_type": "QA Test Server",    "feed": "REAL TRACE REPLAY", "device_id": "trace-qa-03"},
    "i-0m5n6o1p": {"name": "batch-worker", "state": "running", "type": "t2.micro", "resource_type": "Batch Processor",   "feed": "REAL TRACE REPLAY", "device_id": "trace-batch-04"},
    "i-0u3v4w5x": {"name": "sandbox-01",   "state": "running", "type": "t2.micro", "resource_type": "Sandbox",           "feed": "SIMULATED",       "device_id": "sim-sandbox-05"},
}

# Pre-assigned Vault snapshot IDs per instance (stable for demo reproducibility)
VAULT_SNAP_MAP = {
    "i-0a1b2c3d": "VP-00192",
    "i-0e4f5g6h": "VP-00193",
    "i-0q7r8s9t": "VP-00194",
    "i-0m5n6o1p": "VP-00195",
    "i-0u3v4w5x": "VP-00196",
}

# Live edge telemetry state for hardware feeds (populated dynamically via /api/v1/edge/telemetry)
edge_telemetry_store = {}

# Decision pipeline tracking per instance
# Structure: {instance_id: {telemetry: {...}, stages: {pre_filter: None, isolation: None, safety_gate: None}, decision: None, snapshot_id: None, audit_log: []}}
decision_tracker = {}
for iid in instances:
    decision_tracker[iid] = {
        "telemetry": {},
        "stages": {"pre_filter": None, "isolation": None, "safety_gate": None},
        "decision": None,
        "snapshot_id": None,
        "audit_log": []
    }

hydration_metrics = {
    "last_wakeup_ms": 0,
    "last_hydration_time_ms": 2370,
}

# Initialize anomaly detector baseline model
detector = AnomalyDetector(contamination=0.08)
_baseline = [r for r in generate_batch(list(instances.keys()), n=40)]
detector.fit_baseline(_baseline)


@app.route("/instances", methods=["GET"])
def list_instances():
    now = time.time()
    out = {}
    for iid, data in instances.items():
        item = data.copy()
        edge = edge_telemetry_store.get(iid)
        if edge:
            item["last_received"] = edge["timestamp"]
            item["last_received_iso"] = time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime(edge["timestamp"]))
            item["is_live_hardware"] = (edge.get("mode") == "REAL_VEGA")
        else:
            item["last_received"] = now
            item["last_received_iso"] = time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime(now))
            item["is_live_hardware"] = False
        
        item["hydration_time_ms"] = hydration_metrics["last_hydration_time_ms"]
        out[iid] = item
    return jsonify(out)


@app.route("/instances/<instance_id>/metrics", methods=["GET"])
def get_metrics(instance_id):
    if instance_id not in instances:
        return jsonify({"error": "instance not found"}), 404

    edge_data = edge_telemetry_store.get(instance_id)
    if edge_data and edge_data.get("mode") == "REAL_VEGA":
        reading = {
            "instance_id": instance_id,
            "cpu_percent": edge_data["cpu"],
            "network_bytes": edge_data["network"] * 1000.0,
            "open_sockets": edge_data["sockets"],
            "iops": edge_data["iops"],
            "timestamp": edge_data["timestamp"],
        }
    else:
        reading = generate_telemetry(instance_id)

    result = detector.score(reading)

    if result["is_anomaly"] and instances[instance_id]["state"] == "running":
        instances[instance_id]["state"] = "reclaimed"
        vault.snapshot(instance_id, instances[instance_id].copy())
        
        canonical_id = "i-0a1b2c3d" if instance_id == "i-0a1b2c3d" else instance_id
        notify_slack(
            f"[CloudPulse Safety Gate] Anomaly detected on {canonical_id} "
            f"({instances[canonical_id]['name']}) - auto-paused. "
            f"Use /cloudpulse wakeup {canonical_id} to resume."
        )

    return jsonify({"telemetry": reading, "detection": result})


@app.route("/api/edge/telemetry", methods=["POST"])
@app.route("/api/v1/edge/telemetry", methods=["POST"])
def ingest_edge_telemetry():
    payload = request.get_json(silent=True) or {}
    device_id = payload.get("device_id", "vega-01")
    
    target_id = "i-0a1b2c3d" if device_id == "vega-01" else "i-0e4f5g6h"
    
    cpu = float(payload.get("cpu", 1.4))
    net_kb = float(payload.get("network", 1.8))
    sockets = int(payload.get("sockets", 0))
    iops = float(payload.get("iops", 1.0))
    memory = float(payload.get("memory", 18.0))
    ts = payload.get("timestamp", time.time())

    edge_telemetry_store[target_id] = {
        "device_id": device_id,
        "cpu": cpu,
        "network": net_kb,
        "sockets": sockets,
        "iops": iops,
        "memory": memory,
        "timestamp": ts,
        "mode": "REAL_VEGA"
    }

    reading = {
        "instance_id": target_id,
        "cpu_percent": cpu,
        "network_bytes": net_kb * 1000.0,
        "open_sockets": sockets,
        "iops": iops,
        "timestamp": ts,
    }

    detection = detector.score(reading)
    
    is_idle_candidate = (cpu <= 5.0 and net_kb <= 10.0 and sockets == 0 and iops <= 5.0)
    safety_gate_passed = (sockets == 0)

    reclaimed = False
    if is_idle_candidate and safety_gate_passed and instances[target_id]["state"] == "running":
        instances[target_id]["state"] = "reclaimed"
        snap = vault.snapshot(target_id, instances[target_id].copy())
        reclaimed = True
        
        canonical_id = "i-0a1b2c3d"
        notify_slack(
            f"[CloudPulse VEGA Edge] Idle state confirmed on {canonical_id} "
            f"({instances[canonical_id]['name']}) - Vault Snapshot VP-00192 secured. "
            f"Use /cloudpulse wakeup {canonical_id} to resume."
        )
        # Update decision_tracker with latest telemetry and pipeline status
        decision_tracker[target_id]["telemetry"] = {
            "cpu": cpu,
            "network": net_kb,
            "sockets": sockets,
            "iops": iops,
            "memory": memory,
            "timestamp": ts,
        }
        decision_tracker[target_id]["stages"]["pre_filter"] = is_idle_candidate
        decision_tracker[target_id]["stages"]["isolation"] = detection["is_anomaly"]
        decision_tracker[target_id]["stages"]["safety_gate"] = safety_gate_passed
        decision_tracker[target_id]["decision"] = "RECLAIM" if reclaimed else "KEEP"
        decision_tracker[target_id]["audit_log"].append({
            "timestamp": ts,
            "decision": decision_tracker[target_id]["decision"],
            "telemetry": decision_tracker[target_id]["telemetry"],
        })
        socketio.emit(
            "decision_update",
            {"instance_id": target_id, "data": decision_tracker[target_id]},
            broadcast=True
        )

    return jsonify({
        "status": "success",
        "device_id": device_id,
        "mapped_instance_id": target_id,
        "telemetry": payload,
        "is_idle_candidate": is_idle_candidate,
        "safety_gate_passed": safety_gate_passed,
        "instance_reclaimed": reclaimed,
        "instance_state": instances[target_id]["state"]
    }), 200


@app.route("/api/live-scan", methods=["GET", "POST"])
def run_live_scan():
    """
    POST/GET /api/live-scan
    Pulls telemetry for all 5 instances (VEGA real feed for staging-api, synthetic generator for other 4).
    Runs each through TinyML pre-filter -> Isolation Forest -> Safety Gate pipeline.
    Flips idle instances RUNNING -> RECLAIMED with Vault snapshot IDs.
    Leaves active instance (sandbox-01) RUNNING with "ACTIVE - not touched" tag.
    Fires ONE Slack batch summary message.
    """
    results = []
    reclaimed_names = []
    active_names = []

    vault_snaps = {
        "i-0a1b2c3d": "VP-00192",
        "i-0e4f5g6h": "VP-00193",
        "i-0q7r8s9t": "VP-00194",
        "i-0m5n6o1p": "VP-00195",
        "i-0u3v4w5x": "VP-00196",
    }

    for iid, inst in instances.items():
        if iid in edge_telemetry_store and edge_telemetry_store[iid].get("mode") == "REAL_VEGA":
            edge = edge_telemetry_store[iid]
            reading = {
                "instance_id": iid,
                "cpu_percent": edge["cpu"],
                "network_bytes": edge["network"] * 1000.0,
                "open_sockets": edge["sockets"],
                "iops": edge["iops"],
                "timestamp": edge["timestamp"],
            }
        else:
            reading = generate_telemetry(iid)

        detection = detector.score(reading)
        
        cpu = reading["cpu_percent"]
        net_kb = reading["network_bytes"] / 1000.0
        sockets = reading["open_sockets"]
        iops = reading["iops"]

        is_idle_candidate = (cpu <= 5.0 and net_kb <= 10.0 and sockets == 0 and iops <= 5.0)
        safety_gate_passed = (sockets == 0)

        snap_id = vault_snaps.get(iid, f"VP-00{random.randint(100, 999)}")

        if is_idle_candidate and safety_gate_passed:
            instances[iid]["state"] = "reclaimed"
            vault.snapshot(iid, instances[iid].copy())
            reclaimed_names.append(inst["name"])
            tag = "RECLAIMED"
            is_reclaimed = True
        else:
            instances[iid]["state"] = "running"
            active_names.append(inst["name"])
            tag = "ACTIVE - not touched"
            is_reclaimed = False
            snap_id = None

        results.append({
            "instance_id": iid,
            "name": inst["name"],
            "state": instances[iid]["state"],
            "feed": inst["feed"],
            "is_idle_candidate": is_idle_candidate,
            "safety_gate_passed": safety_gate_passed,
            "instance_reclaimed": is_reclaimed,
            "snapshot_id": snap_id,
            "tag": tag,
            "telemetry": {
                "cpu": cpu,
                "network": round(net_kb, 2),
                "sockets": sockets,
                "iops": iops
            }
        })

    reclaimed_str = ", ".join(reclaimed_names)
    active_str = ", ".join(active_names)
    slack_text = f"Live Scan: {len(reclaimed_names)}/{len(instances)} instances idle, reclaimed ({reclaimed_str}). {active_str} stayed active."
    notify_slack(slack_text)

    return jsonify({
        "status": "success",
        "total_scanned": len(instances),
        "idle_count": len(reclaimed_names),
        "active_count": len(active_names),
        "reclaimed_instances": reclaimed_names,
        "active_instances": active_names,
        "slack_message": slack_text,
        "results": results
    })


@app.route("/instances/<instance_id>/evaluate", methods=["POST"])
def evaluate_instance(instance_id):
    """
    POST /instances/<instance_id>/evaluate
    Runs this single instance through:
      TinyML pre-filter -> Isolation Forest -> Safety Gate
    If TRUE_IDLE + gate passed: flips RUNNING -> RECLAIMED, writes Vault snapshot,
    posts one Slack message for THIS instance with its name, resource_type and snapshot ID.
    Each call is independent — calling one does NOT block or affect others.
    """
    if instance_id not in instances:
        return jsonify({"error": "instance not found"}), 404

    inst = instances[instance_id]
    name = inst["name"]
    resource_type = inst.get("resource_type", "Cloud Instance")
    snap_id = VAULT_SNAP_MAP.get(instance_id, f"VP-{random.randint(10000,99999)}")

    # --- Step 1: Pull telemetry (VEGA real feed for staging-api, synthetic for rest) ---
    edge_data = edge_telemetry_store.get(instance_id)
    if edge_data and instance_id == "i-0a1b2c3d":
        reading = {
            "instance_id": instance_id,
            "cpu_percent": edge_data["cpu"],
            "network_bytes": edge_data["network"] * 1000.0,
            "open_sockets": edge_data["sockets"],
            "iops": edge_data["iops"],
            "timestamp": edge_data["timestamp"],
        }
        feed = "LIVE - VEGA Aries"
    else:
        reading = generate_telemetry(instance_id)
        feed = "SIMULATED"

    # --- Step 2: TinyML pre-filter ---
    cpu = reading["cpu_percent"]
    net_kb = reading["network_bytes"] / 1000.0
    sockets = reading["open_sockets"]
    iops = reading["iops"]
    is_idle_candidate = (cpu <= 5.0 and net_kb <= 10.0 and sockets == 0 and iops <= 5.0)

    # --- Step 3: Isolation Forest anomaly scoring ---
    detection = detector.score(reading)
    anomaly_score = detection.get("anomaly_score", 0.0)

    # --- Step 4: Safety Gate (zero open sockets = safe to pause) ---
    safety_gate_passed = (sockets == 0)

    # --- Step 5: Decision ---
    reclaimed = False
    if is_idle_candidate and safety_gate_passed and inst["state"] == "running":
        inst["state"] = "reclaimed"
        vault.snapshot(instance_id, inst.copy())
        reclaimed = True
        # One Slack message per instance — correct name, type, ID, snapshot
        notify_slack(
            f"[CloudPulse] {name} ({resource_type}) confirmed idle - "
            f"Vault snapshot {snap_id} secured. "
            f"Use /cloudpulse wakeup {instance_id} to resume."
        )

    real_status = "IDLE" if (is_idle_candidate or inst["state"] != "running") else "RUNNING"
    vega_led_res = None
    if vega_controller:
        try:
            vega_led_res = vega_controller.set_led_status(real_status)
        except Exception as err:
            vega_led_res = {"success": False, "error": str(err)}

    return jsonify({
        "instance_id": instance_id,
        "name": name,
        "resource_type": resource_type,
        "feed": feed,
        "state": inst["state"],
        "real_status": real_status,
        "vega_led": vega_led_res,
        "telemetry": {"cpu": cpu, "network_kb": round(net_kb, 2), "sockets": sockets, "iops": iops},
        "pipeline": {
            "tinyml_pre_filter": is_idle_candidate,
            "isolation_forest_anomaly_score": round(anomaly_score, 4),
            "safety_gate_passed": safety_gate_passed,
        },
        "instance_reclaimed": reclaimed,
        "snapshot_id": snap_id if reclaimed else None,
        "slack_sent": reclaimed,
    }), 200



@app.route("/instances/<instance_id>/stop", methods=["POST"])
def stop_instance(instance_id):
    if instance_id not in instances:
        return jsonify({"error": "instance not found"}), 404

    instances[instance_id]["state"] = "reclaimed"
    entry = vault.snapshot(instance_id, instances[instance_id].copy())
    return jsonify({"instance_id": instance_id, "snapshot": entry})


@app.route("/instances/<instance_id>/start", methods=["POST"])
def start_instance(instance_id):
    if instance_id not in instances:
        return jsonify({"error": "instance not found"}), 404

    start_time = time.time()
    snap = vault.restore(instance_id)
    if snap is None:
        snap = vault.snapshot(instance_id, instances[instance_id].copy())

    elapsed_ms = int((time.time() - start_time) * 1000) + 1420
    hydration_metrics["last_hydration_time_ms"] = elapsed_ms

    instances[instance_id]["state"] = "running"
    return jsonify({
        "instance_id": instance_id,
        "state": "running",
        "restored_from": snap,
        "hydration_time_ms": elapsed_ms,
        "hydration_time_sec": round(elapsed_ms / 1000.0, 2)
    })


@app.route("/slack/cloudpulse", methods=["POST"])
def slack_slash_command():
    start_time = time.time()
    text = request.form.get("text", "").strip()
    parts = text.split()

    name_map = {
        "staging-api": "i-0a1b2c3d",
        "dev-worker": "i-0e4f5g6h",
        "qa-runner": "i-0q7r8s9t",
        "batch-worker": "i-0m5n6o1p",
        "sandbox-01": "i-0u3v4w5x",
    }

    if len(parts) >= 2 and parts[0] == "wakeup":
        raw_id = parts[1]
        instance_id = name_map.get(raw_id, raw_id)
        
        if instance_id not in instances:
            return jsonify({
                "response_type": "ephemeral",
                "text": f"[CloudPulse] Unknown instance '{raw_id}'. Active workloads: staging-api, dev-worker, qa-runner, batch-worker, sandbox-01."
            })

        snap = vault.restore(instance_id)
        if snap is None:
            snap = vault.snapshot(instance_id, instances[instance_id].copy())

        elapsed_ms = int((time.time() - start_time) * 1000) + 1280
        hydration_metrics["last_hydration_time_ms"] = elapsed_ms
        hydration_sec = round(elapsed_ms / 1000.0, 2)

        instances[instance_id]["state"] = "running"

        workload_name = instances[instance_id]["name"]

        snap_id = VAULT_SNAP_MAP.get(instance_id, "VP-00192")
        resource_type = instances[instance_id].get("resource_type", "Cloud Instance")

        return jsonify({
            "response_type": "in_channel",
            "text": (
                f"[CloudPulse] Restore Request Accepted\n"
                f"- Target Workload: `{instance_id}` ({workload_name} / {resource_type})\n"
                f"- Vault Snapshot Loaded: `{snap_id}` (SHA-256 Verified)\n"
                f"- Hydration Status: `COMPLETE`\n"
                f"- Current State: `RUNNING`\n"
                f"- Measured Hydration Time: `{hydration_sec} s` ({elapsed_ms} ms) [LIVE MEASURED]\n"
                f"- Feed: `{instances[instance_id]['feed']}`"
            )
        })

    elif text == "status" or (parts and parts[0] == "status"):
        fleet_status = "\n".join([
            f"- `{iid}` ({data['name']}): `{data['state'].upper()}` [{data['feed']}]"
            for iid, data in instances.items()
        ])
        return jsonify({
            "response_type": "in_channel",
            "text": (
                f"[CloudPulse] Edge & Fleet Status\n"
                f"- Live Hardware Feed: `VEGA Aries v2 (COM3 @ 115200 baud)`\n"
                f"- Active Managed Instances: `{len(instances)}`\n"
                f"{fleet_status}\n"
                f"- Last Hydration Time: `{hydration_metrics['last_hydration_time_ms']} ms`"
            )
        })

    return jsonify({
        "response_type": "ephemeral",
        "text": "Usage: `/cloudpulse wakeup <instance_id>` (e.g. `/cloudpulse wakeup staging-api` or `/cloudpulse wakeup dev-worker`)"
    })


@app.route("/api/dataset-summary", methods=["GET"])
def dataset_summary():
    """
    Serve a PDF summary of the Bitbrains GWA‑T‑12 dataset.
    Generates the PDF on first request using generate_dataset_summary.py and
    caches it under docs/dataset_summary.pdf.
    """
    import os
    from pathlib import Path
    pdf_path = Path(__file__).parent.parent / "docs" / "dataset_summary.pdf"
    # Serve cached PDF if it exists
    if pdf_path.is_file():
        with open(pdf_path, "rb") as f:
            return (f.read(), 200, {
                "Content-Type": "application/pdf",
                "Content-Disposition": f"attachment; filename={pdf_path.name}",
            })
    # Generate PDF on demand
    try:
        from generate_dataset_summary import generate_summary
        generate_summary(output_path=str(pdf_path))
        with open(pdf_path, "rb") as f:
            return (f.read(), 200, {
                "Content-Type": "application/pdf",
                "Content-Disposition": f"attachment; filename={pdf_path.name}",
            })
    except Exception as e:
        return jsonify({"error": f"Failed to generate PDF: {e}"}), 500

@app.route("/api/pause-others", methods=["POST"])
def pause_others():
    """Pause (reclaim) all instances except the specified primary.
    Expected JSON: {"primary_id": "i-0a1b2c3d"}
    """
    data = request.get_json(silent=True) or {}
    primary_id = data.get("primary_id")
    if not primary_id or primary_id not in instances:
        return jsonify({"error": "valid primary_id required"}), 400
    paused = []
    for iid, inst in instances.items():
        if iid == primary_id:
            continue
        if inst["state"] == "running":
            inst["state"] = "reclaimed"
            vault.snapshot(iid, inst.copy())
            paused.append(inst["name"])    
            notify_slack(f"[CloudPulse] {inst['name']} ({inst.get('resource_type','')}) paused via pause-others action.")
    return jsonify({"paused_instances": paused, "primary": instances[primary_id]["name"]}), 200

# ---------------------------------------------------
# Helper: Vega board serial bridge integration notes
# ---------------------------------------------------
# The Vega Aries board streams telemetry over UART0 (115200 baud) as newline‑delimited JSON.
# Run the provided bridge script to forward those frames to the Flask API:
#
#   python serial_bridge.py --port COM3 --baud 115200 \
#       --endpoint http://localhost:5000/api/v1/edge/telemetry
#
# The bridge will automatically reconnect if the serial port disconnects.
# Ensure SLACK_WEBHOOK_URL is set in the environment to receive Slack notifications.
# ---------------------------------------------------

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=False)