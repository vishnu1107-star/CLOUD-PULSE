from pydantic import BaseModel
from typing import List, Dict, Any
from datetime import datetime

class CostLogOut(BaseModel):
    id: int
    resource_id: str
    timestamp: datetime
    hours_saved: float
    money_saved_usd: float
    carbon_saved_kg: float
    action_taken: str

    class Config:
        from_attributes = True

class AnalyticsSummary(BaseModel):
    total_money_saved_usd: float
    total_carbon_saved_kg: float
    total_hours_saved: float
    active_resources_count: int
    stopped_resources_count: int
    ghost_resources_count: int
    ghost_potential_monthly_savings: float
    savings_by_environment: Dict[str, float]
    savings_by_provider: Dict[str, float]
    daily_savings_trend: List[Dict[str, Any]]
