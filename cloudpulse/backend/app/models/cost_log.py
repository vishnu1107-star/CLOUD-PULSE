from sqlalchemy import Column, Integer, String, Float, DateTime
from datetime import datetime
from app.core.database import Base

class CostLog(Base):
    __tablename__ = "cost_logs"

    id = Column(Integer, primary_key=True, index=True)
    resource_id = Column(String, index=True)
    timestamp = Column(DateTime, default=datetime.utcnow, index=True)
    hours_saved = Column(Float, default=1.0)
    money_saved_usd = Column(Float, default=0.0)
    carbon_saved_kg = Column(Float, default=0.0)
    action_taken = Column(String, default="AUTO_STOP") # AUTO_STOP, GHOST_PURGE, DRY_RUN_STOP
