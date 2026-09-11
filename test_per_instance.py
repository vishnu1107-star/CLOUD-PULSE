import os, time, json, concurrent.futures

# Load .env
with open('.env') as f:
    for line in f:
        line = line.strip()
        if line and not line.startswith('#') and '=' in line:
            k, v = line.split('=', 1)
            os.environ[k.strip()] = v.strip()

BASE = "http://localhost:5000"

# The 3 target instances we're verifying
TARGET_INSTANCES = [
    {"id": "i-0a1b2c3d", "name": "staging-api",  "resource_type": "Staging Server",  "snap": "VP-00192"},
    {"id": "i-0e4f5g6h", "name": "dev-worker",   "resource_type": "Dev Environment", "snap": "VP-00193"},
    {"id": "i-0q7r8s9t", "name": "qa-runner",    "resource_type": "QA Test Server",  "snap": "VP-00194"},
]

PASS = "[PASS]"
FAIL = "[FAIL]"
SEP  = "-" * 64


def _safe(text):
    return text.encode('ascii', errors='replace').decode('ascii')


def reset_instances():
    """Reset all 3 to RUNNING before test by POSTing to /instances/<id>/start."""
    import requests
    for inst in TARGET_INSTANCES:
        try:
            requests.post(f"{BASE}/instances/{inst['id']}/start", timeout=5)
        except Exception:
            pass
    time.sleep(0.3)


def evaluate_one(inst):
    """POST /instances/<id>/evaluate and return parsed JSON."""
    import requests
    iid = inst["id"]
    r = requests.post(f"{BASE}/instances/{iid}/evaluate", timeout=10)
    return iid, r.status_code, r.json()


def test_step1_resources_have_types():
    """Step 1 — /instances returns resource_type for all 3 targets."""
    import requests
    print(SEP)
    print("STEP 1: Verify /instances returns resource_type for all 3 targets")
    r = requests.get(f"{BASE}/instances", timeout=5)
    assert r.status_code == 200, f"HTTP {r.status_code}"
    data = r.json()
    all_ok = True
    for inst in TARGET_INSTANCES:
        iid = inst["id"]
        assert iid in data, f"Instance {iid} missing from /instances"
        rt = data[iid].get("resource_type", "")
        expected = inst["resource_type"]
        ok = rt == expected
        all_ok = all_ok and ok
        status = PASS if ok else FAIL
        print(_safe(f"  {status} {iid} ({inst['name']}): resource_type = '{rt}' (expected '{expected}')"))
    print(f"  {'All resource_type fields correct' if all_ok else 'SOME FIELDS WRONG'}")
    return all_ok


def test_step2_independent_evaluate():
    """Step 2 — POST /instances/<id>/evaluate for all 3 concurrently (non-blocking)."""
    import requests
    print(SEP)
    print("STEP 2: Evaluate all 3 instances concurrently (independent, non-blocking)")
    reset_instances()
    time.sleep(0.2)

    t0 = time.time()
    results = {}
    # Run all 3 in parallel threads to prove independence
    with concurrent.futures.ThreadPoolExecutor(max_workers=3) as pool:
        futures = {pool.submit(evaluate_one, inst): inst for inst in TARGET_INSTANCES}
        for future in concurrent.futures.as_completed(futures):
            iid, status_code, body = future.result()
            results[iid] = (status_code, body)
    elapsed = round(time.time() - t0, 2)

    all_ok = True
    for inst in TARGET_INSTANCES:
        iid  = inst["id"]
        code, body = results[iid]

        # --- Assertions ---
        http_ok        = (code == 200)
        id_ok          = (body.get("instance_id") == iid)
        name_ok        = (body.get("name") == inst["name"])
        type_ok        = (body.get("resource_type") == inst["resource_type"])
        reclaimed      = body.get("instance_reclaimed", False)
        snap_ok        = (body.get("snapshot_id") == inst["snap"]) if reclaimed else True
        state_ok       = (body.get("state") == "reclaimed") if reclaimed else True
        pipeline       = body.get("pipeline", {})
        prefilter_ok   = isinstance(pipeline.get("tinyml_pre_filter"), bool)
        iforest_ok     = isinstance(pipeline.get("isolation_forest_anomaly_score"), float)
        gate_ok        = isinstance(pipeline.get("safety_gate_passed"), bool)

        ok = all([http_ok, id_ok, name_ok, type_ok, prefilter_ok, iforest_ok, gate_ok, snap_ok, state_ok])
        all_ok = all_ok and ok
        status = PASS if ok else FAIL

        print(_safe(
            f"  {status} {iid} ({inst['name']} / {inst['resource_type']})\n"
            f"         HTTP:{code} | reclaimed:{reclaimed} | state:{body.get('state')}\n"
            f"         TinyML:{pipeline.get('tinyml_pre_filter')} | "
            f"IF_score:{pipeline.get('isolation_forest_anomaly_score')} | "
            f"gate:{pipeline.get('safety_gate_passed')}\n"
            f"         snap_id:{body.get('snapshot_id')} (expected {inst['snap'] if reclaimed else 'N/A (not reclaimed yet)'})"
        ))
        if not ok:
            failures = []
            if not http_ok:   failures.append(f"HTTP={code}")
            if not id_ok:     failures.append(f"id mismatch:{body.get('instance_id')}")
            if not name_ok:   failures.append(f"name mismatch:{body.get('name')}")
            if not type_ok:   failures.append(f"type mismatch:{body.get('resource_type')}")
            if not snap_ok:   failures.append(f"snap mismatch:{body.get('snapshot_id')}")
            if not state_ok:  failures.append(f"state:{body.get('state')}")
            print(f"         FAILURES: {', '.join(failures)}")

    print(f"\n  Concurrent evaluation elapsed: {elapsed}s (all 3 ran in parallel)")
    return all_ok


def test_step3_no_transposing():
    """Step 3 — Verify each evaluate response carries its OWN instance ID/name (no transposing)."""
    import requests
    print(SEP)
    print("STEP 3: Anti-transposing check — each response must carry its own instance_id/name")
    reset_instances()
    time.sleep(0.2)

    ok_all = True
    for inst in TARGET_INSTANCES:
        iid = inst["id"]
        r = requests.post(f"{BASE}/instances/{iid}/evaluate", timeout=10)
        body = r.json()
        resp_id   = body.get("instance_id")
        resp_name = body.get("name")
        resp_type = body.get("resource_type")

        no_transpose = (resp_id == iid and resp_name == inst["name"] and resp_type == inst["resource_type"])
        ok_all = ok_all and no_transpose
        status = PASS if no_transpose else FAIL
        print(_safe(
            f"  {status} POST /instances/{iid}/evaluate -> "
            f"response.instance_id='{resp_id}' name='{resp_name}' type='{resp_type}'"
        ))
        if not no_transpose:
            print(f"         TRANSPOSED! Expected id='{iid}' name='{inst['name']}' type='{inst['resource_type']}'")
    return ok_all


def test_step4_wakeup_per_instance():
    """Step 4 — Wakeup each instance individually, check correct snapshot ID returned."""
    import requests
    print(SEP)
    print("STEP 4: Per-instance wakeup — /instances/<id>/start & /slack/cloudpulse wakeup <name>")
    reset_instances()
    # First reclaim all 3
    for inst in TARGET_INSTANCES:
        requests.post(f"{BASE}/instances/{inst['id']}/stop", timeout=5)
    time.sleep(0.2)

    ok_all = True
    for inst in TARGET_INSTANCES:
        iid = inst["id"]
        name = inst["name"]
        expected_snap = inst["snap"]

        # --- REST wakeup ---
        r = requests.post(f"{BASE}/instances/{iid}/start", timeout=10)
        body = r.json()
        state_ok = body.get("state") == "running"
        ok_rest = (r.status_code == 200 and state_ok)
        status_rest = PASS if ok_rest else FAIL
        print(_safe(f"  {status_rest} REST wakeup {iid} ({name}): state={body.get('state')}"))
        ok_all = ok_all and ok_rest

        # Put back to reclaimed for Slack test
        requests.post(f"{BASE}/instances/{iid}/stop", timeout=5)
        time.sleep(0.1)

        # --- Slack /cloudpulse wakeup <name> ---
        r2 = requests.post(
            f"{BASE}/slack/cloudpulse",
            data={"text": f"wakeup {name}"},
            timeout=10
        )
        body2 = r2.json()
        text2  = body2.get("text", "")
        snap_in_text = expected_snap in text2
        id_in_text   = iid in text2
        ok_slack = (r2.status_code == 200 and snap_in_text and id_in_text)
        status_slack = PASS if ok_slack else FAIL
        print(_safe(
            f"  {status_slack} Slack wakeup '{name}': "
            f"snap_id={expected_snap} in response={'YES' if snap_in_text else 'NO'} | "
            f"instance_id={iid} in response={'YES' if id_in_text else 'NO'}"
        ))
        ok_all = ok_all and ok_slack

    return ok_all


if __name__ == "__main__":
    import requests
    print("=" * 64)
    print("CloudPulse — Per-Instance Identity & Pause Flow Verification")
    print("Targets: staging-api, dev-worker, qa-runner")
    print("=" * 64)

    # Quick connectivity check
    try:
        r = requests.get(f"{BASE}/instances", timeout=4)
        r.raise_for_status()
    except Exception as e:
        print(f"[ERROR] Flask server not reachable at {BASE}: {e}")
        print("Start with: python app.py")
        raise SystemExit(1)

    results = {
        "Step 1 — resource_type in /instances":      test_step1_resources_have_types(),
        "Step 2 — Independent evaluate pipeline":    test_step2_independent_evaluate(),
        "Step 3 — No instance ID transposing":       test_step3_no_transposing(),
        "Step 4 — Per-instance wakeup":              test_step4_wakeup_per_instance(),
    }

    print(SEP)
    print("FINAL RESULTS")
    print(SEP)
    all_passed = True
    for step, ok in results.items():
        status = PASS if ok else FAIL
        all_passed = all_passed and ok
        print(f"  {status}  {step}")
    print(SEP)
    if all_passed:
        print("ALL STEPS PASSED — Per-instance identity, pause flow, and wakeup verified.")
    else:
        print("SOME STEPS FAILED — Review above for details.")
    print("=" * 64)
