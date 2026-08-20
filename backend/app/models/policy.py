from sqlalchemy import Column, Integer, String, Float, Boolean
from app.core.database import Base

class Policy(Base):
    __tablename__ = "policies"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, default="Default FinOps Policy")
    max_cpu_threshold = Column(Float, default=2.0)  # CPU % threshold (< 2.0%)
    max_network_kbps = Column(Float, default=10.0)  # Network KB/s threshold (< 10 KB/s)
    max_connections = Column(Integer, default=0)    # Active connections == 0
    idle_window_minutes = Column(Integer, default=30) # Window of evaluation
    auto_stop_enabled = Column(Boolean, default=True)
    dry_run = Column(Boolean, default=False)
