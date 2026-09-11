from pydantic import BaseModel
from typing import Optional, Dict, Any
from datetime import datetime

class ResourceBase(BaseModel):
    provider: str
    resource_id: str
    resource_name: str
    resource_type: str
    region: str = "us-east-1"
    environment: str
    hourly_cost: float = 0.10
    tags: Dict[str, Any] = {}

class ResourceCreate(ResourceBase):
    pass

class ResourceStateUpdate(BaseModel):
    state: str  # RUNNING, STOPPED, SCALED_ZERO

class ResourceMetric(BaseModel):
    cpu_utilization: float
    network_kbps: float
    active_connections: int
    evaluated_at: datetime
    is_idle: bool
    disk_io_iops: Optional[float] = 1.0
    memory_pct: Optional[float] = 18.0
    active_process_count: Optional[int] = 1
    ml_confidence: Optional[float] = 0.94
    safety_gate_status: Optional[str] = "PASS"
    vault_status: Optional[str] = "READY"

class ResourceOut(ResourceBase):
    id: int
    state: str
    last_activity_timestamp: datetime
    created_at: datetime
    metrics: Optional[ResourceMetric] = None

    class Config:
        from_attributes = True
