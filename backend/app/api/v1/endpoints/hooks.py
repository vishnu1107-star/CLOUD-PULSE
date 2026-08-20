from fastapi import APIRouter, Depends, Form, Request, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from datetime import datetime, timedelta
from typing import Optional

from app.core.database import get_db
from app.models.resource import Resource
from app.models.override import Override
from app.schemas.hook import WakeupRequest, SlackCommandResponse
from app.engine.executor import ActionExecutor
import re

router = APIRouter()

@router.post("/wakeup")
async def wakeup_portal(payload: WakeupRequest, db: AsyncSession = Depends(get_db)):
    """1-Click Developer Re-Activation API Endpoint."""
    executor = ActionExecutor(db)
    target_resources = []

    if payload.resource_id:
        res_q = await db.execute(select(Resource).where(Resource.resource_id == payload.resource_id))
        r = res_q.scalars().first()
        if r:
            target_resources.append(r)
    elif payload.environment:
        res_q = await db.execute(select(Resource).where(Resource.environment.ilike(payload.environment)))
        target_resources = res_q.scalars().all()

    if not target_resources:
        raise HTTPException(status_code=404, detail="No matching resources found for reactivation.")

    reactivated = []
    active_until = datetime.utcnow() + timedelta(hours=payload.hours)

    for r in target_resources:
        # Start Resource
        await executor.start_resource(r.resource_id)
        
        # Create Developer Override entry
        override = Override(
            resource_id=r.resource_id,
            requested_by=payload.requested_by,
            active_until_timestamp=active_until,
            reason=payload.reason
        )
        db.add(override)
        reactivated.append(r.resource_name or r.resource_id)

    await db.commit()
    return {
        "status": "success",
        "reactivated_workloads": reactivated,
        "grace_extension_hours": payload.hours,
        "active_until": active_until.isoformat(),
        "requested_by": payload.requested_by
    }

@router.post("/slack", response_model=SlackCommandResponse)
async def slack_slash_command(
    text: Optional[str] = Form(default=""),
    user_name: Optional[str] = Form(default="slack-developer"),
    db: AsyncSession = Depends(get_db)
):
    """
    Slack Slash Command Webhook Receiver.
    Usage: `/cloudpulse wakeup staging --hours=4` or `/cloudpulse status`
    """
    text_clean = text.strip() if text else ""
    
    if "wakeup" in text_clean:
        # Parse environment or resource_id and hours argument
        match_hours = re.search(r'--hours=(\d+)', text_clean)
        hours = int(match_hours.group(1)) if match_hours else 2

        # Extract environment keyword (e.g. "wakeup staging")
        parts = text_clean.replace("wakeup", "").split()
        target_env = "Staging"
        for p in parts:
            if not p.startswith("--"):
                target_env = p.capitalize()
                break

        # Re-activate workloads
        payload = WakeupRequest(
            environment=target_env,
            hours=hours,
            requested_by=f"slack-@{user_name}",
            reason="Slack slash command invocation"
        )
        
        res = await wakeup_portal(payload, db)
        reactivated_list = ", ".join(res["reactivated_workloads"])
        
        return SlackCommandResponse(
            response_type="in_channel",
            text=f"⚡ *CloudPulse Re-Activation Triggered*\n"
                 f"• Environment: `{target_env}`\n"
                 f"• Reactivated Workloads: `{reactivated_list}`\n"
                 f"• Developer Grace Period: `{hours} hours` (Until {res['active_until'][:19]} UTC)\n"
                 f"• Triggered By: `@{user_name}`"
        )
    elif "status" in text_clean:
        res_q = await db.execute(select(Resource))
        resources = res_q.scalars().all()
        running_count = sum(1 for r in resources if r.state == "RUNNING")
        stopped_count = sum(1 for r in resources if r.state in ["STOPPED", "SCALED_ZERO"])
        
        return SlackCommandResponse(
            response_type="in_channel",
            text=f"📊 *CloudPulse Engine Status*\n"
                 f"• Running Workloads: `{running_count}`\n"
                 f"• Paused/Stopped Workloads: `{stopped_count}`\n"
                 f"• Total Managed Resources: `{len(resources)}`"
        )
    else:
        return SlackCommandResponse(
            response_type="ephemeral",
            text="💡 *CloudPulse Help*\n"
                 "Available Slash Commands:\n"
                 "• `/cloudpulse wakeup <env> --hours=X` (e.g., `/cloudpulse wakeup staging --hours=3`)\n"
                 "• `/cloudpulse status` (View live resource counts)"
        )
