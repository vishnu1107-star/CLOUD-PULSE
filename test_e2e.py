import os, time, json

# Load .env
with open('.env') as f:
    for line in f:
        line = line.strip()
        if line and not line.startswith('#') and '=' in line:
            k, v = line.split('=', 1)
            os.environ[k.strip()] = v.strip()

from app import app

with app.test_client() as client:

    print("=" * 60)
    print("  CLOUDPULSE - VEGATHON 2026 END-TO-END PIPELINE VERIFICATION")
    print("=" * 60)

    # STEP 1: Send VEGA board IDLE telemetry
    print("\n[STEP 1] Sending VEGA Aries IDLE telemetry to /api/edge/telemetry...")
    r = client.post('/api/edge/telemetry', json={
        'device_id': 'vega-01',
        'cpu': 1.4,
        'network': 1.8,
        'sockets': 0,
        'iops': 1,
        'memory': 18
    })
    data = json.loads(r.data)
    print("  HTTP Status      :", r.status_code)
    print("  Device ID        :", data.get('device_id'))
    print("  Mapped Instance  :", data.get('mapped_instance_id'))
    print("  Is Idle Candidate:", data.get('is_idle_candidate'))
    print("  Safety Gate Pass :", data.get('safety_gate_passed'))
    print("  Instance Reclaimed:", data.get('instance_reclaimed'))
    print("  Instance State   :", data.get('instance_state'))

    time.sleep(1)

    # STEP 2: Slack ChatOps wakeup
    print("\n[STEP 2] Slack ChatOps -> /cloudpulse wakeup staging-api...")
    r2 = client.post('/slack/cloudpulse', data={'text': 'wakeup staging-api'})
    data2 = json.loads(r2.data)
    print("  Response Type    :", data2.get('response_type'))
    print("  Bot Message:")
    for line in data2.get('text', '').split('\n'):
        safe_line = line.encode('ascii', errors='replace').decode('ascii')
        print("    " + safe_line)

    # STEP 3: Verify fleet state
    print("\n[STEP 3] Verifying live fleet state via /instances...")
    r3 = client.get('/instances')
    fleet = json.loads(r3.data)
    print("  Total Managed Instances:", len(fleet))
    for iid, inst in fleet.items():
        print(f"  - {iid} ({inst.get('name')}): {inst.get('state').upper()} [{inst.get('feed')}]")

    time.sleep(1)

    # STEP 4: Run Live Scan on all 5 instances
    print("\n[STEP 4] Executing 'Run Live Scan' across all 5 cloud instances (/api/live-scan)...")
    r4 = client.post('/api/live-scan')
    scan_res = json.loads(r4.data)
    print("  HTTP Status      :", r4.status_code)
    print("  Total Scanned    :", scan_res.get('total_scanned'))
    print("  Idle Reclaimed   :", scan_res.get('idle_count'))
    print("  Active Count     :", scan_res.get('active_count'))
    print("  Reclaimed List   :", ", ".join(scan_res.get('reclaimed_instances', [])))
    print("  Active List      :", ", ".join(scan_res.get('active_instances', [])))
    print("  Slack Summary    :", scan_res.get('slack_message'))
    print("\n  Per-Instance Evaluation Results:")
    for item in scan_res.get('results', []):
        print(f"  - {item['name']:<15} | State: {item['state']:<10} | Vault: {str(item['snapshot_id']):<8} | Tag: {item['tag']}")

    print("\n" + "=" * 60)
    print("  ALL 4 STEPS COMPLETE - Check #new-channel in Slack!")
    print("=" * 60)
