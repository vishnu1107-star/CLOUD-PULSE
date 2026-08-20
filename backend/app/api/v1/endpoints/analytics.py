from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.schemas.analytics import AnalyticsSummary
from app.engine.analytics import AnalyticsEngine

router = APIRouter()

@router.get("/summary", response_model=AnalyticsSummary)
async def get_analytics_summary(db: AsyncSession = Depends(get_db)):
    """Get real-time cost savings, carbon offset metrics, and environmental trends."""
    engine = AnalyticsEngine(db)
    return await engine.get_summary_report()
