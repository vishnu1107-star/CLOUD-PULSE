from fastapi import APIRouter
from app.engine.event_logger import event_logger

router = APIRouter()

@router.get("/")
async def get_events(limit: int = 50):
    """Returns real-time event log ledger."""
    return event_logger.get_events(limit=limit)
