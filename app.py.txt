from flask import Flask, jsonify, request
from telemetry import generate_telemetry, generate_batch
from detector import AnomalyDetector
import vault
from slack_bot import notify_slack

app = Flask(__name__)

# Initial instance inventory state
instances = {
    "i-0a1b2c3d": {"name": "staging-api", "state": "running", "type": "t2.micro"},
    "i-0e4f5g6h": {"name": "dev-worker", "state": "running", "type": "t2.micro"},
    "i-0z9y8x7w": {"name": "batch-processor", "state": "running", "type": "t2.micro"},
}

# Live prefilter flag from the VEGA board (or simulator) per instance.
# None = no board signal received yet, fall back to the detector's own mock value.
edge_prefilter_state = {
    "i-0a1b2c3d": None,
    "i-0e4f5g6h": None,
    "i-0z9y8x7w": None,
}

# Initialize anomaly detector baseline model
detector = AnomalyDetector(contamination=0.08)
_baseline = [r for r in generate_batch(list(instances.keys()), n=40)]
detector.fit_baseline(_baseline)


@app.route("/instances", methods=["GET"])
def list_instances():
    return jsonify(instances)


@app.route("/instances/<instance_id>/metrics", methods=["GET"])
def get_metrics(instance_id):
    if instance_id not in instances:
        return jsonify({"error": "instance not found"}), 404

    reading = generate_telemetry(instance_id)
    result = detector.score(reading)

    # If the board (or simulator) has sent a real prefilter signal,
    # it overrides the detector's own mocked prefilter_flagged value.
    live_flag = edge_prefilter_state.get(instance_id)
    if live_flag is not None:
        result["prefilter_flagged"] = live_flag
        result["prefilter_source"] = "edge_board"
    else:
        result["prefilter_source"] = "mocked"

    if result["is_anomaly"] and instances[instance_id]["state"] == "running":
        instances[instance_id]["state"] = "paused"
        vault.snapshot(instance_id, instances[instance_id].copy())
        notify_slack(
            f"Anomaly detected on {instance_id} "
            f"({instances[instance_id]['name']}) - auto-paused. "
            f"Use /cloudpulse wakeup {instance_id} to resume."
        )

    return jsonify({"telemetry": reading, "detection": result})


@app.route("/instances/<instance_id>/prefilter", methods=["POST"])
def set_prefilter(instance_id):
    if instance_id not in instances:
        return jsonify({"error": "instance not found"}), 404

    data = request.get_json(silent=True) or {}
    if "prefilter_flagged" not in data:
        return jsonify({"error": "missing 'prefilter_flagged' in body"}), 400

    edge_prefilter_state[instance_id] = bool(data["prefilter_flagged"])
    return jsonify({
        "instance_id": instance_id,
        "prefilter_flagged": edge_prefilter_state[instance_id]
    }), 200


@app.route("/instances/<instance_id>/stop", methods=["POST"])
def stop_instance(instance_id):
    if instance_id not in instances:
        return jsonify({"error": "instance not found"}), 404

    instances[instance_id]["state"] = "paused"
    entry = vault.snapshot(instance_id, instances[instance_id].copy())
    return jsonify({"instance_id": instance_id, "snapshot": entry})


@app.route("/instances/<instance_id>/start", methods=["POST"])
def start_instance(instance_id):
    if instance_id not in instances:
        return jsonify({"error": "instance not found"}), 404

    snap = vault.restore(instance_id)
    if snap is None:
        return jsonify({"error": "no snapshot found for this instance"}), 400

    instances[instance_id]["state"] = "running"
    return jsonify({"instance_id": instance_id, "restored_from": snap})


@app.route("/slack/cloudpulse", methods=["POST"])
def slack_slash_command():
    text = request.form.get("text", "").strip()
    parts = text.split()

    if len(parts) == 2 and parts[0] == "wakeup":
        instance_id = parts[1]
        if instance_id not in instances:
            return jsonify({
                "response_type": "ephemeral",
                "text": f"Unknown instance {instance_id}"
            })

        snap = vault.restore(instance_id)
        if snap is None:
            return jsonify({
                "response_type": "ephemeral",
                "text": f"No snapshot found for {instance_id}"
            })

        instances[instance_id]["state"] = "running"
        return jsonify({
            "response_type": "in_channel",
            "text": f"{instance_id} restored and running again."
        })

    return jsonify({
        "response_type": "ephemeral",
        "text": "Usage: /cloudpulse wakeup <instance_id>"
    })


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)