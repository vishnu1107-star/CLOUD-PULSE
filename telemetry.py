import random
import time


def _idle_or_spike(idle_range, spike_range, spike_chance=0.08):
    if random.random() < spike_chance:
        return round(random.uniform(*spike_range), 2)
    return round(random.uniform(*idle_range), 2)


def generate_telemetry(instance_id):
    return {
        "instance_id": instance_id,
        "cpu_percent": _idle_or_spike((0, 5), (60, 98)),
        "network_bytes": _idle_or_spike((0, 2000), (500000, 5000000)),
        "open_sockets": random.choice([0, 0, 0, 1, 2, 3, 3, 9, 14]),
        "iops": _idle_or_spike((0, 10), (800, 4000)),
        "timestamp": time.time(),
    }


def generate_batch(instance_ids, n=1):
    out = []
    for _ in range(n):
        for iid in instance_ids:
            out.append(generate_telemetry(iid))
    return out