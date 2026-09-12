from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List, Dict, Any
from datetime import datetime, timedelta

from app.core.database import get_db
from app.models.resource import Resource
from app.schemas.resource import ResourceOut
from app.engine.discovery import DiscoveryEngine
from app.engine.evaluator import IdleEvaluator
from app.engine.executor import ActionExecutor
from app.engine.safety_gate import SafetyGate
from app.engine.vault_manager import VaultManager
from app.engine.event_logger import event_logger
from app.schemas.hook import WakeupRequest
from app.models.override import Override
from app.services.simulated_driver import SimulatedCloudDriver
from app.services.vega_controller import vega_controller

router = APIRouter()
vault_mgr = VaultManager()

@router.get("", response_model=List[ResourceOut])
async def list_resources(environment: str = None, db: AsyncSession = Depends(get_db)):
    """List discovered cloud resources with multi-signal telemetry & safety metadata."""
    stmt = select(Resource)
    if environment:
        stmt = stmt.where(Resource.environment.ilike(environment))
    res = await db.execute(stmt)
    resources = res.scalars().all()
    
    evaluator = IdleEvaluator(db)
    policy = await evaluator.get_or_create_default_policy()
    
    out_list = []
    for r in resources:
        item = ResourceOut.model_validate(r)
        snap = vault_mgr.get_snapshot(r.resource_id)
        
        # Attach metric evaluation data
        eval_data = await evaluator.evaluate_resource(r, policy)
        m = eval_data.get("metrics", {})
        ml_conf = eval_data.get("ml_confidence", 0.94)
        is_idle = eval_data.get("is_idle", False)
        
        # Safety gate evaluation
        sg_eval = SafetyGate.evaluate(metrics=m, ml_prediction={"is_idle": is_idle, "classification": eval_data.get("ml_classification")})

        item.metrics = {
            "cpu_utilization": float(m.get("cpu_utilization", 0.0)),
            "network_kbps": float(m.get("network_kbps", 0.0)),
            "active_connections": int(m.get("active_connections", 0)),
            "disk_io_iops": float(m.get("disk_io_iops", 1.0)),
            "memory_pct": float(m.get("memory_pct", 18.0)),
            "active_process_count": int(m.get("active_process_count", 1)),
            "evaluated_at": datetime.utcnow(),
            "is_idle": is_idle,
            "ml_confidence": ml_conf,
            "safety_gate_status": sg_eval["status"],
            "vault_status": snap["status"] if snap else "READY"
        }
        out_list.append(item)
    return out_list

@router.get("/{resource_id:path}")
async def get_resource_detail(resource_id: str, db: AsyncSession = Depends(get_db)):
    """Get detailed telemetry, ML insight, and Vault status for a specific resource, transmitting status to VEGA LED."""
    q = await db.execute(select(Resource).where(Resource.resource_id == resource_id))
    r = q.scalars().first()
    if not r:
        q_name = await db.execute(select(Resource).where(Resource.resource_name.ilike(f"%{resource_id}%")))
        r = q_name.scalars().first()

    if not r:
        vega_controller.set_led_status("OFF")
        raise HTTPException(status_code=404, detail=f"Resource {resource_id} not found")
    
    evaluator = IdleEvaluator(db)
    policy = await evaluator.get_or_create_default_policy()
    eval_data = await evaluator.evaluate_resource(r, policy)
    metrics = eval_data.get("metrics", {})
    sg_eval = SafetyGate.evaluate(metrics=metrics, ml_prediction={"is_idle": eval_data.get("is_idle")})
    snap = vault_mgr.get_snapshot(r.resource_id)

    is_idle = eval_data.get("is_idle", False)
    res_state = (r.state or "RUNNING").upper()

    if res_state in ["RECLAIMED", "PAUSED", "STOPPED"] or is_idle:
        real_status = "IDLE"
    elif res_state == "RUNNING":
        real_status = "RUNNING"
    else:
        real_status = "OFF"

    vega_res = vega_controller.set_led_status(real_status)

    return {
        "resource": ResourceOut.model_validate(r),
        "evaluation": eval_data,
        "safety_gate": sg_eval,
        "vault_snapshot": snap,
        "real_status": real_status,
        "vega_led": vega_res
    }


@router.post("/{resource_id:path}/analyze")
async def analyze_resource(resource_id: str, db: AsyncSession = Depends(get_db)):
    """Runs on-demand multi-signal analysis & safety gate inspection, forwarding real status to VEGA LED."""
    q = await db.execute(select(Resource).where(Resource.resource_id == resource_id))
    r = q.scalars().first()
    if not r:
        # Fallback search by resource name or substring matching
        q_name = await db.execute(select(Resource).where(Resource.resource_name.ilike(f"%{resource_id}%")))
        r = q_name.scalars().first()

    if not r:
        vega_err = vega_controller.set_led_status("OFF")
        raise HTTPException(status_code=404, detail=f"Resource '{resource_id}' not found")

    evaluator = IdleEvaluator(db)
    policy = await evaluator.get_or_create_default_policy()
    eval_data = await evaluator.evaluate_resource(r, policy)
    metrics = eval_data.get("metrics", {})
    sg_eval = SafetyGate.evaluate(metrics=metrics, ml_prediction={"is_idle": eval_data.get("is_idle")})

    is_idle = eval_data.get("is_idle", False)
    res_state = (r.state or "RUNNING").upper()

    if res_state in ["RECLAIMED", "PAUSED", "STOPPED"] or is_idle:
        real_status = "IDLE"
    elif res_state == "RUNNING":
        real_status = "RUNNING"
    else:
        real_status = "OFF"

    vega_result = vega_controller.set_led_status(real_status)

    event_logger.log_event("ANALYSIS", f"Evaluated {resource_id} status={real_status}: Safety {sg_eval['status']} | VEGA LED={vega_result.get('led_info')}", "INFO", resource_id)

    return {
        "resource_id": r.resource_id,
        "resource_name": r.resource_name,
        "state": r.state,
        "real_status": real_status,
        "evaluation": eval_data,
        "safety_gate": sg_eval,
        "vega_led": vega_result
    }


@router.post("/{resource_id}/vault")
async def vault_resource_snapshot(resource_id: str, db: AsyncSession = Depends(get_db)):
    """Creates cryptographic SHA-256 state recovery snapshot before reclamation."""
    q = await db.execute(select(Resource).where(Resource.resource_id == resource_id))
    r = q.scalars().first()
    if not r:
        raise HTTPException(status_code=404, detail=f"Resource {resource_id} not found")

    resource_data = {
        "resource_id": r.resource_id,
        "resource_name": r.resource_name,
        "provider": r.provider,
        "region": r.region,
        "hourly_cost": r.hourly_cost,
        "state": r.state,
        "tags": r.tags,
        "environment": r.environment
    }

    snap = vault_mgr.create_snapshot(resource_id, resource_data)
    event_logger.log_event("VAULT", f"Snapshot {snap['snapshot_id']} created for {resource_id} (SHA-256 verified)", "SUCCESS", resource_id)

    return {
        "status": "success",
        "snapshot": snap
    }

@router.post("/{resource_id}/reclaim")
async def reclaim_resource(
    resource_id: str,
    db: AsyncSession = Depends(get_db)
):
    """
    Executes autonomous reclamation pipeline:

    1. Safety check
    2. VEGA Aries V2 hardware safety approval
    3. Vault snapshot creation
    4. Non-destructive pause
    5. State updated to RECLAIMED
    """

    # ---------------------------------------------------------
    # FIND RESOURCE
    # ---------------------------------------------------------

    q = await db.execute(
        select(Resource).where(
            Resource.resource_id == resource_id
        )
    )

    r = q.scalars().first()

    if not r:
        raise HTTPException(
            status_code=404,
            detail=f"Resource {resource_id} not found"
        )

    # ---------------------------------------------------------
    # 1. CLOUDPULSE SAFETY CHECK & EVALUATION
    # ---------------------------------------------------------

    metrics = SimulatedCloudDriver.get_simulated_metrics(
        resource_id,
        r.environment
    )

    evaluator = IdleEvaluator(db)
    policy = await evaluator.get_or_create_default_policy()
    eval_data = await evaluator.evaluate_resource(r, policy)

    sg_eval = SafetyGate.evaluate(
        metrics=metrics,
        ml_prediction={
            "is_idle": eval_data.get("is_idle"),
            "classification": eval_data.get("ml_classification")
        }
    )

    # ---------------------------------------------------------
    # 2. CLOUDPULSE SAFETY GATE BARRIER
    # ---------------------------------------------------------

    if not sg_eval["passed"]:
        event_logger.log_event(
            "SAFETY_GATE",
            f"Reclaim BLOCKED for {resource_id}: {sg_eval['primary_reason']}",
            "WARNING",
            resource_id
        )

        return {
            "status": "blocked",
            "message": f"Reclamation blocked by Safety Gate: {sg_eval['primary_reason']}",
            "safety_gate": sg_eval,
            "vega_status": "REJECTED"
        }

    # ---------------------------------------------------------
    # 3. VEGA ARIES V2 HARDWARE SAFETY INTERLOCK
    # ---------------------------------------------------------

    event_logger.log_event(
        "VEGA",
        f"Requesting hardware approval for {resource_id}",
        "INFO",
        resource_id
    )

    vega_result = vega_controller.evaluate_reclamation(
        cpu=float(metrics.get("cpu_utilization", 0.0)),
        network=float(metrics.get("network_kbps", 0.0)),
        sockets=int(metrics.get("active_connections", 0)),
        iops=float(metrics.get("disk_io_iops", 0.0)),
        memory=float(metrics.get("memory_pct", 18.0))
    )

    event_logger.log_event(
        "VEGA",
        f"VEGA {vega_result.get('status')} for {resource_id}: {vega_result.get('reason', '')}",
        "INFO" if vega_result.get("approved") else "WARNING",
        resource_id
    )

    if not vega_result.get("approved", False):
        return {
            "status": "blocked",
            "message": f"Reclamation blocked by VEGA hardware safety interlock: {vega_result.get('reason')}",
            "vega_status": vega_result.get("status"),
            "vega_reason": vega_result.get("reason"),
            "safety_gate": sg_eval
        }

    # ---------------------------------------------------------
    # 4. CREATE VAULT SNAPSHOT
    # ---------------------------------------------------------

    snap = vault_mgr.create_snapshot(
        resource_id,
        {
            "resource_id": r.resource_id,
            "resource_name": r.resource_name,
            "provider": r.provider,
            "environment": r.environment,
            "previous_state": r.state
        }
    )

    event_logger.log_event(
        "VAULT",
        f"Pre-reclaim snapshot {snap['snapshot_id']} secured for {resource_id}",
        "SUCCESS",
        resource_id
    )

    # ---------------------------------------------------------
    # 5. RECLAIM RESOURCE & UPDATE LED
    # ---------------------------------------------------------

    r.state = "RECLAIMED"
    r.last_activity_timestamp = datetime.utcnow()
    await db.commit()

    vega_controller.set_led_status("RECLAIMED")

    event_logger.log_event(
        "RECLAIM",
        f"Resource {resource_id} safely reclaimed. Spend halted.",
        "SUCCESS",
        resource_id
    )

    event_logger.log_event(
        "SLACK",
        f"Alert: Anomaly detected on {resource_id} — resource automatically paused. Protected state: {snap['snapshot_id']}.",
        "INFO",
        resource_id
    )

    return {
        "status": "success",
        "resource_id": resource_id,
        "previous_state": "RUNNING",
        "new_state": "RECLAIMED",
        "protected_state": snap["snapshot_id"],
        "snapshot": snap,
        "vega_status": "APPROVED"
    }

@router.post("/{resource_id}/restore")
async def restore_resource(resource_id: str, db: AsyncSession = Depends(get_db)):
    """
    Executes ChatOps / Dashboard Restoration workflow:
    1. Load Vault Snapshot
    2. Measure exact live hydration time
    3. Restore resource to RUNNING
    """
    q = await db.execute(select(Resource).where(Resource.resource_id == resource_id))
    r = q.scalars().first()
    if not r:
        q_name = await db.execute(select(Resource).where(Resource.resource_name.ilike(f"%{resource_id}%")))
        r = q_name.scalars().first()

    if not r:
        raise HTTPException(status_code=404, detail=f"Resource {resource_id} not found")

    event_logger.log_event("WAKEUP", f"Wakeup command received for {r.resource_id}", "INFO", r.resource_id)
    event_logger.log_event("VAULT", f"Loading snapshot for {r.resource_id}...", "INFO", r.resource_id)

    # Set temporary intermediate state
    r.state = "RESTORING"
    await db.commit()

    # Measured live hydration
    hydration_result = await vault_mgr.restore_workload(r.resource_id)

    # Set final restored state
    r.state = "RUNNING"
    r.last_activity_timestamp = datetime.utcnow()
    await db.commit()

    vega_controller.set_led_status("RUNNING")

    event_logger.log_event("HYDRATION", f"Resource {r.resource_id} restored and RUNNING in {hydration_result['hydration_time_seconds']}s (LIVE MEASURED)", "SUCCESS", r.resource_id)

    return {
        "status": "success",
        "resource_id": r.resource_id,
        "state": "RUNNING",
        "hydration_time_seconds": hydration_result["hydration_time_seconds"],
        "timing_label": "LIVE MEASURED",
        "snapshot": hydration_result.get("snapshot")
    }

@router.post("/demo/reset")
async def reset_demo_state(db: AsyncSession = Depends(get_db)):
    """One-click Reset: Returns all 10 resources to RUNNING, clears demo snapshots and resets event stream."""
    # Reset all resources to RUNNING
    stmt = select(Resource)
    res = await db.execute(stmt)
    resources = res.scalars().all()

    for r in resources:
        r.state = "RUNNING"
        r.last_activity_timestamp = datetime.utcnow()
    
    await db.commit()

    # Reset Vault and Event logs
    vault_mgr.reset_vault()
    event_logger.reset_events()

    event_logger.log_event("DEMO", "Demo state reset: All 10 resources RUNNING, Vault baseline ready.", "SUCCESS")

    return {
        "status": "success",
        "message": "Demo reset complete. Ready for next judge presentation.",
        "resources_reset_count": len(resources)
    }

@router.post("/discover")
async def trigger_discovery(db: AsyncSession = Depends(get_db)):
    """Trigger multi-cloud tag-aware resource discovery."""
    engine = DiscoveryEngine(db)
    result = await engine.run_discovery()
    return result

@router.post("/evaluate")
async def evaluate_and_execute(db: AsyncSession = Depends(get_db)):
    """Run metric evaluation and auto-stop idle resources if enabled."""
    evaluator = IdleEvaluator(db)
    executor = ActionExecutor(db)
    policy = await evaluator.get_or_create_default_policy()

    evaluations = await evaluator.evaluate_all()
    actions_taken = []

    if policy.auto_stop_enabled:
        for item in evaluations:
            if item.get("is_idle") and not item.get("override_active"):

                action_res = await executor.stop_resource(
                item["resource_id"],
                is_automated=True,
                metrics=item.get("metrics")
            )

            actions_taken.append(action_res)

    return {
        "evaluated_count": len(evaluations),
        "idle_count": sum(1 for e in evaluations if e.get("is_idle")),
        "actions_executed": actions_taken
    }
