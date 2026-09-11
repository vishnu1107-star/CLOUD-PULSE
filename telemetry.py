import random
import time

# Configurable list of active instance IDs (shows real recent activity)
# Default for demo: sandbox-01 ("i-0u3v4w5x") is active, others read as idle
ACTIVE_INSTANCES_CONFIG = ["i-0u3v4w5x"]


def generate_telemetry(instance_id):
    """
    Generates synthetic telemetry based on ACTIVE_INSTANCES_CONFIG.
    Active instances return high CPU/network/sockets/IOPS.
    Idle instances return low telemetry passing pre-filter and safety gate.
    """
    if instance_id in ACTIVE_INSTANCES_CONFIG:
        return {
            "instance_id": instance_id,
            "cpu_percent": round(random.uniform(65.0, 92.0), 2),
            "network_bytes": round(random.uniform(45000.0, 150000.0), 2),
            "open_sockets": random.randint(6, 24),
            "iops": round(random.uniform(150.0, 450.0), 2),
            "timestamp": time.time(),
        }
    else:
        return {
            "instance_id": instance_id,
            "cpu_percent": round(random.uniform(0.5, 3.2), 2),
            "network_bytes": round(random.uniform(500.0, 3500.0), 2),
            "open_sockets": 0,
            "iops": round(random.uniform(0.5, 3.0), 2),
            "timestamp": time.time(),
        }


def generate_batch(instance_ids, n=1):
    out = []
    for _ in range(n):
        for iid in instance_ids:
            out.append(generate_telemetry(iid))
    return out