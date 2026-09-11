import random
import time
import os
from trace_replay import TraceReplay

# Configurable list of active instance IDs (shows real recent activity)
# Default for demo: sandbox-01 ("i-0u3v4w5x") is active, others read as idle
ACTIVE_INSTANCES_CONFIG = ["i-0u3v4w5x"]


# Mapping of mock instance IDs to their trace CSV files
TRACE_FILES = {
    "i-0a1b2c3d": os.path.join(os.path.dirname(__file__), "data", "traces", "dev_worker.csv"),  # staging-api uses active trace
    "i-0e4f5g6h": os.path.join(os.path.dirname(__file__), "data", "traces", "dev_worker.csv"),  # dev-worker active trace
    "i-0q7r8s9t": os.path.join(os.path.dirname(__file__), "data", "traces", "qa_runner.csv"),   # qa-runner idle trace
    "i-0m5n6o1p": os.path.join(os.path.dirname(__file__), "data", "traces", "qa_runner.csv"),   # batch-worker idle trace
    "i-0u3v4w5x": os.path.join(os.path.dirname(__file__), "data", "traces", "qa_runner.csv"),   # sandbox idle trace
}

# Initialize TraceReplay objects for each mock instance
_TRACE_REPLAYERS = {instance_id: TraceReplay(csv_path) for instance_id, csv_path in TRACE_FILES.items()}


def generate_telemetry(instance_id):
    """Generate telemetry for a given instance.

    For mock instances, return the next row from the trace CSV.
    Active synthetic instances emit high‑load telemetry.
    All other instances emit low‑load idle telemetry.
    """
    if instance_id in _TRACE_REPLAYERS:
        telemetry = _TRACE_REPLAYERS[instance_id].next_row()
        telemetry["instance_id"] = instance_id
        telemetry["timestamp"] = time.time()
        return telemetry
    # No synthetic telemetry – return empty dict for unknown IDs
    return {}


def generate_batch(instance_ids, n=1):
    """Generate a batch of telemetry records for a list of instance IDs."""
    out = []
    for _ in range(n):
        for iid in instance_ids:
            out.append(generate_telemetry(iid))
    return out