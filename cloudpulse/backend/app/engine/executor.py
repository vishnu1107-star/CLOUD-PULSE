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
from app.services.vega_controller import vega_controller

from app.core.config import settings

import logging

logger = logging.getLogger(__name__)


class ActionExecutor:
    """
    Module 3:
    Safe Workload Execution & Ghost Resource Sweeper Engine.

    VEGA Aries V2 is used as a physical hardware safety interlock
    before any AUTOMATED reclamation action.
    """

    def __init__(self, db: AsyncSession):
        self.db = db

        self.aws_driver = AWSDriver(
            region_name=settings.AWS_REGION
        )

        self.gcp_driver = GCPDriver()
        self.k8s_driver = K8sDriver()

    # ---------------------------------------------------------
    # GET ACTIVE POLICY
    # ---------------------------------------------------------

    async def get_active_policy(self) -> Policy:

        res = await self.db.execute(
            select(Policy).limit(1)
        )

        policy = res.scalars().first()

        if not policy:
            policy = Policy()

            self.db.add(policy)

            await self.db.commit()

            await self.db.refresh(policy)

        return policy

    # ---------------------------------------------------------
    # STOP RESOURCE
    # ---------------------------------------------------------

    async def stop_resource(
        self,
        resource_id: str,
        is_automated: bool = True,
        metrics: dict | None = None
    ) -> dict:
        """
        Safely stops a cloud resource.

        IMPORTANT:
        If the action is automated, VEGA Aries V2 MUST approve
        the reclamation before the resource can be stopped.

        If VEGA rejects or is offline:
            Resource remains RUNNING.
        """

        # -----------------------------------------------------
        # 1. GET POLICY
        # -----------------------------------------------------

        policy = await self.get_active_policy()

        # -----------------------------------------------------
        # 2. FIND RESOURCE
        # -----------------------------------------------------

        q = await self.db.execute(
            select(Resource).where(
                Resource.resource_id == resource_id
            )
        )

        resource = q.scalars().first()

        if not resource:

            return {
                "status": "error",
                "message": f"Resource {resource_id} not found."
            }

        # -----------------------------------------------------
        # 3. VEGA HARDWARE SAFETY INTERLOCK
        # -----------------------------------------------------

        if is_automated:

            logger.info(
                "[VEGA] Requesting hardware approval for %s",
                resource_id
            )

            # If metrics were not supplied, use safe defaults.
            metrics = metrics or {}

            cpu = float(
                metrics.get(
                    "cpu_utilization",
                    0.0
                )
            )

            network = float(
                metrics.get(
                    "network_kbps",
                    0.0
                )
            )

            sockets = int(
                metrics.get(
                    "active_connections",
                    0
                )
            )

            iops = float(
                metrics.get(
                    "disk_io_iops",
                    0.0
                )
            )

            memory = float(
                metrics.get(
                    "memory_pct",
                    18.0
                )
            )

            logger.info(
                "[VEGA] Telemetry: "
                "CPU=%.2f%% Network=%.2f KB/s "
                "Sockets=%d IOPS=%.2f Memory=%.2f%%",
                cpu,
                network,
                sockets,
                iops,
                memory
            )

            # -------------------------------------------------
            # SEND TELEMETRY TO PHYSICAL VEGA ARIES V2
            # -------------------------------------------------

            vega_result = (
                vega_controller.evaluate_reclamation(
                    cpu=cpu,
                    network=network,
                    sockets=sockets,
                    iops=iops,
                    memory=memory
                )
            )

            logger.info(
                "[VEGA] Result for %s: %s",
                resource_id,
                vega_result
            )

            # -------------------------------------------------
            # BLOCK IF VEGA DOES NOT APPROVE
            # -------------------------------------------------

            if not vega_result.get("approved", False):

                logger.warning(
                    "[VEGA BLOCKED] Resource %s will NOT be stopped.",
                    resource_id
                )

                return {
                    "status": "blocked",
                    "resource_id": resource_id,
                    "reason": vega_result.get(
                        "reason",
                        "VEGA hardware safety validation failed"
                    ),
                    "vega_status": vega_result.get(
                        "status",
                        "UNKNOWN"
                    ),
                    "resource_state": resource.state
                }

            logger.info(
                "[VEGA APPROVED] Resource %s passed "
                "hardware safety validation.",
                resource_id
            )

        # -----------------------------------------------------
        # 4. DRY RUN CHECK
        # -----------------------------------------------------

        is_dry_run = (
            policy.dry_run
            or settings.DRY_RUN_DEFAULT
        )

        if is_dry_run:

            logger.info(
                "[DRY RUN] Would stop resource %s (%s).",
                resource_id,
                resource.resource_type
            )

            cost_log = CostLog(
                resource_id=resource.resource_id,
                hours_saved=1.0,
                money_saved_usd=round(
                    resource.hourly_cost * 1.0,
                    4
                ),
                carbon_saved_kg=round(
                    1.0 * 0.2 * 0.385,
                    4
                ),
                action_taken=(
                    "DRY_RUN_AUTO_STOP"
                    if is_automated
                    else "DRY_RUN_MANUAL_STOP"
                )
            )

            self.db.add(cost_log)

            await self.db.commit()

            return {
                "status": "dry_run_success",
                "resource_id": resource_id,
                "message": (
                    f"Dry-run stop logged for "
                    f"{resource.resource_name}."
                ),
                "state": resource.state,
                "vega": (
                    "APPROVED"
                    if is_automated
                    else "NOT_REQUIRED"
                )
            }

        # -----------------------------------------------------
        # 5. ACTUAL CLOUD EXECUTION
        # -----------------------------------------------------

        success = True

        if (
            resource.provider == "AWS"
            and resource.resource_type == "EC2"
        ):

            success = (
                self.aws_driver.stop_ec2_instance(
                    resource.resource_id
                )
            )

        elif (
            resource.provider == "GCP"
            and resource.resource_type == "GCE"
        ):

            success = (
                self.gcp_driver.stop_instance(
                    resource.resource_id
                )
            )

        elif (
            resource.provider == "K8S"
            and "DEPLOYMENT" in resource.resource_type
        ):

            success = (
                self.k8s_driver.scale_deployment(
                    resource.resource_name,
                    replicas=0
                )
            )

        # -----------------------------------------------------
        # 6. SUCCESS
        # -----------------------------------------------------

        if success:

            resource.state = (
                "STOPPED"
                if resource.provider != "K8S"
                else "SCALED_ZERO"
            )

            resource.last_activity_timestamp = (
                datetime.utcnow()
            )

            cost_log = CostLog(
                resource_id=resource.resource_id,
                hours_saved=1.0,
                money_saved_usd=round(
                    resource.hourly_cost * 1.0,
                    4
                ),
                carbon_saved_kg=round(
                    1.0 * 0.2 * 0.385,
                    4
                ),
                action_taken=(
                    "AUTO_STOP"
                    if is_automated
                    else "MANUAL_STOP"
                )
            )

            self.db.add(cost_log)

            await self.db.commit()

            return {
                "status": "success",
                "resource_id": resource_id,
                "new_state": resource.state,
                "money_saved_usd": (
                    cost_log.money_saved_usd
                ),
                "carbon_saved_kg": (
                    cost_log.carbon_saved_kg
                ),
                "vega": (
                    "APPROVED"
                    if is_automated
                    else "NOT_REQUIRED"
                )
            }

        # -----------------------------------------------------
        # 7. CLOUD EXECUTION FAILED
        # -----------------------------------------------------

        return {
            "status": "error",
            "message": (
                f"Failed to stop cloud resource "
                f"{resource_id}."
            )
        }

    # ---------------------------------------------------------
    # START RESOURCE
    # ---------------------------------------------------------

    async def start_resource(
        self,
        resource_id: str
    ) -> dict:
        """
        Restores stopped workload back to RUNNING state.
        """

        q = await self.db.execute(
            select(Resource).where(
                Resource.resource_id == resource_id
            )
        )

        resource = q.scalars().first()

        if not resource:

            return {
                "status": "error",
                "message": (
                    f"Resource {resource_id} not found."
                )
            }

        success = True

        if (
            resource.provider == "AWS"
            and resource.resource_type == "EC2"
        ):

            success = (
                self.aws_driver.start_ec2_instance(
                    resource.resource_id
                )
            )

        elif (
            resource.provider == "GCP"
            and resource.resource_type == "GCE"
        ):

            success = (
                self.gcp_driver.start_instance(
                    resource.resource_id
                )
            )

        elif resource.provider == "K8S":

            success = (
                self.k8s_driver.scale_deployment(
                    resource.resource_name,
                    replicas=1
                )
            )

        if success:

            resource.state = "RUNNING"

            resource.last_activity_timestamp = (
                datetime.utcnow()
            )

            await self.db.commit()

            return {
                "status": "success",
                "resource_id": resource_id,
                "new_state": "RUNNING",
                "message": (
                    f"Resource "
                    f"{resource.resource_name} "
                    f"successfully re-activated."
                )
            }

        return {
            "status": "error",
            "message": "Failed to re-activate resource."
        }

    # ---------------------------------------------------------
    # GHOST RESOURCE CLEANUP
    # ---------------------------------------------------------

    async def cleanup_ghost_resources(
        self,
        ghost_ids: list[int] = None
    ) -> dict:
        """
        Ghost Resource Sweeper:
        Purge or flag unattached volumes,
        unassociated EIPs and idle ELBs.
        """

        stmt = select(GhostResource).where(
            GhostResource.status == "ORPHANED"
        )

        if ghost_ids:

            stmt = stmt.where(
                GhostResource.id.in_(ghost_ids)
            )

        res = await self.db.execute(stmt)

        ghosts = res.scalars().all()

        cleaned_count = 0

        total_monthly_saved = 0.0

        for ghost in ghosts:

            ghost.status = "CLEANED_UP"

            cleaned_count += 1

            total_monthly_saved += ghost.monthly_cost

            cost_log = CostLog(
                resource_id=ghost.resource_id,
                hours_saved=720.0,
                money_saved_usd=ghost.monthly_cost,
                carbon_saved_kg=round(
                    (ghost.size_gb or 10.0) * 0.05,
                    2
                ),
                action_taken="GHOST_PURGE"
            )

            self.db.add(cost_log)

        await self.db.commit()

        return {
            "status": "success",
            "cleaned_resources_count": cleaned_count,
            "monthly_savings_usd": round(
                total_monthly_saved,
                2
            )
        }