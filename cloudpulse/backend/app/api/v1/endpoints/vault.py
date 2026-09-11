from fastapi import APIRouter, HTTPException
from typing import List, Dict, Any
from app.engine.vault_manager import VaultManager
from app.engine.event_logger import event_logger

router = APIRouter()
vault_mgr = VaultManager()

@router.get("/")
async def list_vault_snapshots():
    """Returns all snapshots currently stored in the Snapshot Vault."""
    snapshots = vault_mgr.list_snapshots()
    avg_hydration = vault_mgr.get_average_hydration_time()
    return {
        "snapshots": snapshots,
        "total_snapshots": len(snapshots),
        "average_hydration_seconds": avg_hydration,
        "provenance": "LIVE_MEASURED",
        "encryption": "AES-256 + SHA-256 Integrity"
    }

@router.get("/{resource_id}")
async def get_vault_snapshot(resource_id: str):
    snap = vault_mgr.get_snapshot(resource_id)
    if not snap:
        raise HTTPException(status_code=404, detail=f"No snapshot found for {resource_id}")
    return snap

@router.post("/{resource_id}/restore")
async def restore_snapshot(resource_id: str):
    """Restores snapshot with real-time measured hydration duration."""
    res = await vault_mgr.restore_workload(resource_id)
    event_logger.log_event("VAULT", f"Snapshot restored for {resource_id} in {res['hydration_time_seconds']}s", "SUCCESS", resource_id)
    event_logger.log_event("HYDRATION", f"Workload {resource_id} is now RUNNING (Hydration: {res['hydration_time_seconds']}s)", "SUCCESS", resource_id)
    return res
