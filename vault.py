import json
import os
import time

VAULT_PATH = os.path.join(os.path.dirname(__file__), "vault", "snapshots.json")


def _load():
    if not os.path.exists(VAULT_PATH):
        return {}
    with open(VAULT_PATH, "r", encoding="utf-8") as f:
        return json.load(f)


def _save(data):
    os.makedirs(os.path.dirname(VAULT_PATH), exist_ok=True)
    with open(VAULT_PATH, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2)


def snapshot(instance_id, state):
    data = _load()
    entry = {"state": state, "paused_at": time.time()}
    data[instance_id] = entry
    _save(data)
    return entry


def restore(instance_id):
    data = _load()
    entry = data.pop(instance_id, None)
    _save(data)
    return entry


def peek(instance_id):
    return _load().get(instance_id)


def all_snapshots():
    return _load()