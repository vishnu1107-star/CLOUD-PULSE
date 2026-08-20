from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List

from app.core.database import get_db
from app.models.resource import Resource
from app.schemas.resource import ResourceOut
from app.engine.discovery import DiscoveryEngine
from app.engine.evaluator import IdleEvaluator
from app.engine.executor import ActionExecutor
from app.schemas.hook import WakeupRequest
from app.models.override import Override
from datetime import datetime, timedelta

router = APIRouter()

@router.get("", response_model=List[ResourceOut])
async def list_resources(environment: str = None, db: AsyncSession = Depends(get_db)):
    """List discovered cloud resources with optional environment filter."""
    stmt = select(Resource)
    if environment:
        stmt = stmt.where(Resource.environment.ilike(environment))
    res = await db.execute(stmt)
    resources = res.scalars().all()
    
    # Attach quick metric evaluation data
    evaluator = IdleEvaluator(db)
    policy = await evaluator.get_or_create_default_policy()
    
    out_list = []
    for r in resources:
        item = ResourceOut.model_validate(r)
        if r.state == "RUNNING":
            eval_data = await evaluator.evaluate_resource(r, policy)
            m = eval_data.get("metrics", {})
            item.metrics = {
                "cpu_utilization": m.get("cpu_utilization", 0.0),
                "network_kbps": m.get("network_kbps", 0.0),
                "active_connections": m.get("active_connections", 0),
                "evaluated_at": datetime.utcnow(),
                "is_idle": eval_data.get("is_idle", False)
            }
        out_list.append(item)
    return out_list

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
                action_res = await executor.stop_resource(item["resource_id"], is_automated=True)
                actions_taken.append(action_res)

    return {
        "evaluated_count": len(evaluations),
        "idle_count": sum(1 for e in evaluations if e.get("is_idle")),
        "actions_executed": actions_taken
    }

@router.post("/{resource_id}/stop")
async def manual_stop(resource_id: str, db: AsyncSession = Depends(get_db)):
    """Manually stop a cloud resource."""
    executor = ActionExecutor(db)
    return await executor.stop_resource(resource_id, is_automated=False)

@router.post("/{resource_id}/wakeup")
async def manual_wakeup(resource_id: str, payload: WakeupRequest = None, db: AsyncSession = Depends(get_db)):
    """Manually wake up a cloud resource and create a developer override grace period."""
    executor = ActionExecutor(db)
    res = await executor.start_resource(resource_id)
    
    hours = payload.hours if payload else 2
    requested_by = payload.requested_by if payload else "developer"
    reason = payload.reason if payload else "Manual dashboard reactivation"

    # Create Grace Period Override
    active_until = datetime.utcnow() + timedelta(hours=hours)
    override = Override(
        resource_id=resource_id,
        requested_by=requested_by,
        active_until_timestamp=active_until,
        reason=reason
    )
    db.add(override)
    await db.commit()

    res["override_active_until"] = active_until.isoformat()
    return res
