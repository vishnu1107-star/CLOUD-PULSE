from pydantic import BaseModel
from datetime import datetime

class GhostResourceBase(BaseModel):
    provider: str
    resource_id: str
    resource_name: str
    resource_type: str
    region: str = "us-east-1"
    size_gb: float = 0.0
    monthly_cost: float = 10.0

class GhostResourceOut(GhostResourceBase):
    id: int
    detected_at: datetime
    status: str

    class Config:
        from_attributes = True

class GhostCleanRequest(BaseModel):
    ghost_ids: list[int]
