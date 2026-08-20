from sqlalchemy import Column, Integer, String, Float, DateTime, JSON
from datetime import datetime
from app.core.database import Base

class Resource(Base):
    __tablename__ = "resources"

    id = Column(Integer, primary_key=True, index=True)
    provider = Column(String, index=True)  # AWS, GCP, K8S
    resource_id = Column(String, unique=True, index=True)  # i-0abcd1234, gcp-instance-1, deploy/staging-api
    resource_name = Column(String)
    resource_type = Column(String)  # EC2, RDS, GCE, EKS_DEPLOYMENT
    region = Column(String, default="us-east-1")
    state = Column(String, default="RUNNING")  # RUNNING, STOPPED, SCALED_ZERO
    environment = Column(String, index=True)  # Staging, Dev, QA, Production
    hourly_cost = Column(Float, default=0.10)
    last_activity_timestamp = Column(DateTime, default=datetime.utcnow)
    tags = Column(JSON, default=dict)
    created_at = Column(DateTime, default=datetime.utcnow)
