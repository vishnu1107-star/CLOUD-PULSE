from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime
from app.core.database import Base

class Override(Base):
    __tablename__ = "overrides"

    id = Column(Integer, primary_key=True, index=True)
    resource_id = Column(String, index=True)
    requested_by = Column(String)  # e.g., "dev-alex", "slack-user-123"
    active_until_timestamp = Column(DateTime, index=True)
    reason = Column(String, default="Late night testing")
    created_at = Column(DateTime, default=datetime.utcnow)
