from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List

from app.core.database import get_db
from app.models.ghost_resource import GhostResource
from app.schemas.ghost_resource import GhostResourceOut, GhostCleanRequest
from app.engine.executor import ActionExecutor

router = APIRouter()

@router.get("", response_model=List[GhostResourceOut])
async def list_ghost_resources(status: str = "ORPHANED", db: AsyncSession = Depends(get_db)):
    """List detected ghost (orphaned) infrastructure resources."""
    stmt = select(GhostResource)
    if status:
        stmt = stmt.where(GhostResource.status == status)
    res = await db.execute(stmt)
    return res.scalars().all()

@router.post("/cleanup")
async def cleanup_ghost_resources(payload: GhostCleanRequest = None, db: AsyncSession = Depends(get_db)):
    """Purge or flag orphaned resources to eliminate background costs."""
    executor = ActionExecutor(db)
    ids = payload.ghost_ids if payload else None
    return await executor.cleanup_ghost_resources(ghost_ids=ids)
