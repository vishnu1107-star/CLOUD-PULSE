from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.models.resource import Resource
from app.models.ghost_resource import GhostResource
from app.services.aws_driver import AWSDriver
from app.services.simulated_driver import SimulatedCloudDriver
from app.core.config import settings
import logging

logger = logging.getLogger(__name__)

class DiscoveryEngine:
    """Module 1: Multi-Provider Resource Discovery & Tag Engine."""

    def __init__(self, db: AsyncSession):
        self.db = db
        self.aws_driver = AWSDriver(region_name=settings.AWS_REGION)

    async def run_discovery(self) -> dict:
        """Discovers active cloud resources & ghost resources, filtering by tags."""
        discovered_resources = []
        ghost_resources = []

        # Try live AWS driver if credentials exist
        if self.aws_driver.has_credentials:
            discovered_resources.extend(self.aws_driver.discover_ec2_instances())
            ghost_resources.extend(self.aws_driver.discover_unattached_volumes())

        # If fallback enabled or database is empty, seed simulated workloads
        result = await self.db.execute(select(Resource))
        existing_resources = result.scalars().all()

        if not existing_resources:
            logger.info("Initializing database with multi-cloud discovery seed dataset...")
            discovered_resources.extend(SimulatedCloudDriver.get_initial_seed_resources())
            ghost_resources.extend(SimulatedCloudDriver.get_initial_ghost_resources())

        # Upsert resources into DB
        added_res_count = 0
        for item in discovered_resources:
            # Tag-aware filtering check
            env = item.get("environment", "").lower()
            tags = item.get("tags", {})
            
            # Skip Production or Excluded workloads
            if env == "production" or tags.get("CloudPulse") == "Exclude":
                continue

            q = await self.db.execute(select(Resource).where(Resource.resource_id == item["resource_id"]))
            existing = q.scalars().first()

            if not existing:
                res = Resource(**item)
                self.db.add(res)
                added_res_count += 1
            else:
                existing.state = item.get("state", existing.state)
                existing.tags = item.get("tags", existing.tags)

        # Upsert ghost resources into DB
        added_ghost_count = 0
        for item in ghost_resources:
            q = await self.db.execute(select(GhostResource).where(GhostResource.resource_id == item["resource_id"]))
            existing = q.scalars().first()
            if not existing:
                g = GhostResource(**item)
                self.db.add(g)
                added_ghost_count += 1

        await self.db.commit()
        return {
            "status": "success",
            "new_resources_discovered": added_res_count,
            "new_ghost_resources_discovered": added_ghost_count
        }
