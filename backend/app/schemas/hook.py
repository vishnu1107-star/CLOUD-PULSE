from pydantic import BaseModel
from typing import Optional

class WakeupRequest(BaseModel):
    resource_id: Optional[str] = None
    environment: Optional[str] = None
    hours: int = 2
    requested_by: str = "developer"
    reason: str = "Manual dashboard reactivation"

class SlackCommandResponse(BaseModel):
    response_type: str = "in_channel"
    text: str
