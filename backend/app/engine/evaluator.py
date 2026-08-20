from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from datetime import datetime
from app.models.resource import Resource
from app.models.policy import Policy
from app.models.override import Override
from app.services.aws_driver import AWSDriver
from app.services.simulated_driver import SimulatedCloudDriver
from app.core.config import settings
import logging

logger = logging.getLogger(__name__)

class IdleEvaluator:
    """Module 2: Metric-Based Idle Detection Engine."""

    def __init__(self, db: AsyncSession):
        self.db = db
        self.aws_driver = AWSDriver(region_name=settings.AWS_REGION)

    async def get_or_create_default_policy(self) -> Policy:
        res = await self.db.execute(select(Policy).limit(1))
        policy = res.scalars().first()
        if not policy:
            policy = Policy(
                name="Default FinOps Policy",
                max_cpu_threshold=2.0,
                max_network_kbps=10.0,
                max_connections=0,
                idle_window_minutes=30,
                auto_stop_enabled=True,
                dry_run=False
            )
            self.db.add(policy)
            await self.db.commit()
            await self.db.refresh(policy)
        return policy

    async def evaluate_resource(self, resource: Resource, policy: Policy) -> dict:
        """Evaluates whether a specific resource meets idle criteria."""
        # 1. Check for Active Override (Grace Period Extension)
        now = datetime.utcnow()
        override_q = await self.db.execute(
            select(Override).where(
                Override.resource_id == resource.resource_id,
                Override.active_until_timestamp > now
            )
        )
        active_override = override_q.scalars().first()

        if active_override:
            logger.info(f"Resource {resource.resource_id} has active developer override until {active_override.active_until_timestamp}. Skipping idle detection.")
            return {
                "resource_id": resource.resource_id,
                "is_idle": False,
                "override_active": True,
                "active_until": active_override.active_until_timestamp,
                "metrics": {"cpu_utilization": 5.0, "network_kbps": 20.0, "active_connections": 1}
            }

        # 2. Query Metrics (CloudWatch or Simulated Driver)
        if self.aws_driver.has_credentials and resource.provider == "AWS":
            metrics = self.aws_driver.get_cloudwatch_metrics(
                instance_id=resource.resource_id,
                window_minutes=policy.idle_window_minutes
            )
        else:
            metrics = SimulatedCloudDriver.get_simulated_metrics(
                resource_id=resource.resource_id,
                environment=resource.environment
            )

        # 3. Multi-Variable Logical AND Idle Evaluation
        is_cpu_idle = metrics["cpu_utilization"] < policy.max_cpu_threshold
        is_net_idle = metrics["network_kbps"] < policy.max_network_kbps
        is_conn_idle = metrics["active_connections"] <= policy.max_connections

        is_idle = is_cpu_idle and is_net_idle and is_conn_idle

        return {
            "resource_id": resource.resource_id,
            "resource_name": resource.resource_name,
            "is_idle": is_idle,
            "override_active": False,
            "metrics": metrics,
            "criteria": {
                "cpu_idle": is_cpu_idle,
                "net_idle": is_net_idle,
                "conn_idle": is_conn_idle
            }
        }

    async def evaluate_all(self) -> list[dict]:
        """Runs metric evaluation loop across all registered workloads."""
        policy = await self.get_or_create_default_policy()
        result = await self.db.execute(select(Resource))
        resources = result.scalars().all()

        evaluations = []
        for res in resources:
            if res.state == "RUNNING":
                eval_data = await self.evaluate_resource(res, policy)
                evaluations.append(eval_data)
        return evaluations
