from sqlalchemy import Column, Integer, String, Float, DateTime
from datetime import datetime
from app.core.database import Base

class GhostResource(Base):
    __tablename__ = "ghost_resources"

    id = Column(Integer, primary_key=True, index=True)
    provider = Column(String, index=True)  # AWS, GCP
    resource_id = Column(String, unique=True, index=True)  # vol-012345, eipalloc-9876, elb-unused-1
    resource_name = Column(String)
    resource_type = Column(String)  # UNATTACHED_VOLUME, UNASSOCIATED_EIP, UNUSED_ELB
    region = Column(String, default="us-east-1")
    size_gb = Column(Float, default=0.0)
    monthly_cost = Column(Float, default=10.0)
    detected_at = Column(DateTime, default=datetime.utcnow)
    status = Column(String, default="ORPHANED")  # ORPHANED, CLEANED_UP, IGNORED
