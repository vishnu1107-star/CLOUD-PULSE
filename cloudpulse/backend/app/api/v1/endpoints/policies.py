from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from app.core.database import get_db
from app.models.policy import Policy
from app.schemas.policy import PolicyOut, PolicyUpdate
from app.engine.evaluator import IdleEvaluator

router = APIRouter()

@router.get("", response_model=PolicyOut)
async def get_policy(db: AsyncSession = Depends(get_db)):
    """Get active FinOps cost optimization policy settings."""
    evaluator = IdleEvaluator(db)
    return await evaluator.get_or_create_default_policy()

@router.put("", response_model=PolicyOut)
async def update_policy(payload: PolicyUpdate, db: AsyncSession = Depends(get_db)):
    """Update CPU, Network, Connection thresholds, idle window, and dry-run toggles."""
    evaluator = IdleEvaluator(db)
    policy = await evaluator.get_or_create_default_policy()

    if payload.name is not None:
        policy.name = payload.name
    if payload.max_cpu_threshold is not None:
        policy.max_cpu_threshold = payload.max_cpu_threshold
    if payload.max_network_kbps is not None:
        policy.max_network_kbps = payload.max_network_kbps
    if payload.max_connections is not None:
        policy.max_connections = payload.max_connections
    if payload.idle_window_minutes is not None:
        policy.idle_window_minutes = payload.idle_window_minutes
    if payload.auto_stop_enabled is not None:
        policy.auto_stop_enabled = payload.auto_stop_enabled
    if payload.dry_run is not None:
        policy.dry_run = payload.dry_run

    await db.commit()
    await db.refresh(policy)
    return policy
