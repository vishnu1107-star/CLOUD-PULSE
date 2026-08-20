from pydantic import BaseModel
from typing import Optional

class PolicyBase(BaseModel):
    name: str = "Default FinOps Policy"
    max_cpu_threshold: float = 2.0
    max_network_kbps: float = 10.0
    max_connections: int = 0
    idle_window_minutes: int = 30
    auto_stop_enabled: bool = True
    dry_run: bool = False

class PolicyCreate(PolicyBase):
    pass

class PolicyUpdate(BaseModel):
    name: Optional[str] = None
    max_cpu_threshold: Optional[float] = None
    max_network_kbps: Optional[float] = None
    max_connections: Optional[int] = None
    idle_window_minutes: Optional[int] = None
    auto_stop_enabled: Optional[bool] = None
    dry_run: Optional[bool] = None

class PolicyOut(PolicyBase):
    id: int

    class Config:
        from_attributes = True
