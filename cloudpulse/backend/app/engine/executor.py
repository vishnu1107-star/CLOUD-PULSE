from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from datetime import datetime
from app.models.resource import Resource
from app.models.ghost_resource import GhostResource
from app.models.cost_log import CostLog
from app.models.policy import Policy
from app.services.aws_driver import AWSDriver
from app.services.gcp_driver import GCPDriver
from app.services.k8s_driver import K8sDriver
from app.core.config import settings
import logging

logger = logging.getLogger(__name__)

class ActionExecutor:
    """Module 3: Safe Workload Execution & Ghost Resource Sweeper Engine."""

    def __init__(self, db: AsyncSession):
        self.db = db
        self.aws_driver = AWSDriver(region_name=settings.AWS_REGION)
        self.gcp_driver = GCPDriver()
        self.k8s_driver = K8sDriver()

    async def get_active_policy(self) -> Policy:
        res = await self.db.execute(select(Policy).limit(1))
        policy = res.scalars().first()
        if not policy:
            policy = Policy()
            self.db.add(policy)
            await self.db.commit()
            await self.db.refresh(policy)
        return policy

    async def stop_resource(self, resource_id: str, is_automated: bool = True) -> dict:
        """Safely stops VM or scales Kubernetes Deployment down to 0 replicas."""
        policy = await self.get_active_policy()
        q = await self.db.execute(select(Resource).where(Resource.resource_id == resource_id))
        resource = q.scalars().first()

        if not resource:
            return {"status": "error", "message": f"Resource {resource_id} not found."}

        is_dry_run = policy.dry_run or settings.DRY_RUN_DEFAULT

        if is_dry_run:
            logger.info(f"[DRY RUN] Would stop resource {resource_id} ({resource.resource_type}).")
            # Log dry-run savings preview
            cost_log = CostLog(
                resource_id=resource.resource_id,
                hours_saved=1.0,
                money_saved_usd=round(resource.hourly_cost * 1.0, 4),
                carbon_saved_kg=round(1.0 * 0.2 * 0.385, 4), # 0.2 kW * 0.385 kg CO2/kWh
                action_taken="DRY_RUN_STOP"
            )
            self.db.add(cost_log)
            await self.db.commit()
            return {
                "status": "dry_run_success",
                "resource_id": resource_id,
                "message": f"Dry-run stop logged for {resource.resource_name}.",
                "state": resource.state
            }

        # Actual Execution
        success = True
        if resource.provider == "AWS" and resource.resource_type == "EC2":
            success = self.aws_driver.stop_ec2_instance(resource.resource_id)
        elif resource.provider == "GCP" and resource.resource_type == "GCE":
            success = self.gcp_driver.stop_instance(resource.resource_id)
        elif resource.provider == "K8S" and "DEPLOYMENT" in resource.resource_type:
            success = self.k8s_driver.scale_deployment(resource.resource_name, replicas=0)

        if success:
            resource.state = "STOPPED" if resource.provider != "K8S" else "SCALED_ZERO"
            resource.last_activity_timestamp = datetime.utcnow()

            # Record Savings Log (assume 1 hour initial batch increment for dashboard update)
            cost_log = CostLog(
                resource_id=resource.resource_id,
                hours_saved=1.0,
                money_saved_usd=round(resource.hourly_cost * 1.0, 4),
                carbon_saved_kg=round(1.0 * 0.2 * 0.385, 4),
                action_taken="AUTO_STOP" if is_automated else "MANUAL_STOP"
            )
            self.db.add(cost_log)
            await self.db.commit()
            return {
                "status": "success",
                "resource_id": resource_id,
                "new_state": resource.state,
                "money_saved_usd": cost_log.money_saved_usd,
                "carbon_saved_kg": cost_log.carbon_saved_kg
            }
        else:
            return {"status": "error", "message": f"Failed to stop cloud resource {resource_id}."}

    async def start_resource(self, resource_id: str) -> dict:
        """Restores stopped workload back to RUNNING baseline state."""
        q = await self.db.execute(select(Resource).where(Resource.resource_id == resource_id))
        resource = q.scalars().first()

        if not resource:
            return {"status": "error", "message": f"Resource {resource_id} not found."}

        success = True
        if resource.provider == "AWS" and resource.resource_type == "EC2":
            success = self.aws_driver.start_ec2_instance(resource.resource_id)
        elif resource.provider == "GCP" and resource.resource_type == "GCE":
            success = self.gcp_driver.start_instance(resource.resource_id)
        elif resource.provider == "K8S":
            success = self.k8s_driver.scale_deployment(resource.resource_name, replicas=1)

        if success:
            resource.state = "RUNNING"
            resource.last_activity_timestamp = datetime.utcnow()
            await self.db.commit()
            return {
                "status": "success",
                "resource_id": resource_id,
                "new_state": "RUNNING",
                "message": f"Resource {resource.resource_name} successfully re-activated."
            }
        return {"status": "error", "message": "Failed to re-activate resource."}

    async def cleanup_ghost_resources(self, ghost_ids: list[int] = None) -> dict:
        """Ghost Resource Sweeper: Purge or flag unattached volumes, unassociated EIPs, idle ELBs."""
        stmt = select(GhostResource).where(GhostResource.status == "ORPHANED")
        if ghost_ids:
            stmt = stmt.where(GhostResource.id.in_(ghost_ids))

        res = await self.db.execute(stmt)
        ghosts = res.scalars().all()

        cleaned_count = 0
        total_monthly_saved = 0.0

        for ghost in ghosts:
            ghost.status = "CLEANED_UP"
            cleaned_count += 1
            total_monthly_saved += ghost.monthly_cost

            # Log savings
            cost_log = CostLog(
                resource_id=ghost.resource_id,
                hours_saved=720.0, # 1 month = ~720 hrs
                money_saved_usd=ghost.monthly_cost,
                carbon_saved_kg=round((ghost.size_gb or 10.0) * 0.05, 2),
                action_taken="GHOST_PURGE"
            )
            self.db.add(cost_log)

        await self.db.commit()
        return {
            "status": "success",
            "cleaned_resources_count": cleaned_count,
            "monthly_savings_usd": round(total_monthly_saved, 2)
        }
