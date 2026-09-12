from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import asyncio
import logging

from app.core.config import settings
from app.core.database import init_db, AsyncSessionLocal
from app.api.v1.api import api_router
from app.engine.discovery import DiscoveryEngine
from app.engine.evaluator import IdleEvaluator
from app.engine.executor import ActionExecutor
from app.services.vega_controller import vega_controller

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("cloudpulse")

async def background_metric_evaluation_loop():
    """Background task loop that periodically evaluates cloud resources and updates VEGA LED."""
    logger.info(f"CloudPulse Background Metric Loop Started (Interval: {settings.EVALUATION_INTERVAL_SECONDS}s)...")
    while True:
        try:
            await asyncio.sleep(settings.EVALUATION_INTERVAL_SECONDS)
            async with AsyncSessionLocal() as db:
                evaluator = IdleEvaluator(db)
                executor = ActionExecutor(db)
                policy = await evaluator.get_or_create_default_policy()

                evaluations = await evaluator.evaluate_all()

                # Determine overall system status across evaluations for background telemetry
                has_idle = any(item.get("is_idle") or str(item.get("state", "")).upper() in ["RECLAIMED", "PAUSED", "STOPPED"] for item in evaluations)
                bg_validated_status = "IDLE" if has_idle else "RUNNING"
                
                # Drive VEGA physical LED via existing COM6 serial connection.
                led_result = vega_controller.set_led_status(bg_validated_status)
                logger.info(
                    "[VEGA LED] background_loop validated_status=%s led=%s",
                    bg_validated_status,
                    led_result.get("led_info", led_result.get("status"))
                )

                from app.api.v1.endpoints.resources import reclaim_resource

                for item in evaluations:
                    is_idle = item.get("is_idle", False)
                    ml_confirmed = item.get("ml_classification") == "TRUE_IDLE"

                    # Automatic Reclamation Workflow: condition = TRUE and Safety Gate = SAFE_TO_RECLAIM
                    if policy.auto_stop_enabled and is_idle and ml_confirmed and not item.get("override_active"):
                        result = await reclaim_resource(
                            resource_id=item["resource_id"],
                            db=db
                        )
                        logger.info(
                            "Automatic reclamation result for %s: %s",
                            item["resource_id"],
                            result
                        )
        except Exception as e:
            logger.error(f"Error in background evaluation loop: {e}")

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup initialization
    logger.info("Initializing CloudPulse Database Schema...")
    await init_db()

    # Seed initial discovery dataset
    async with AsyncSessionLocal() as db:
        engine = DiscoveryEngine(db)
        await engine.run_discovery()

    # Start background evaluation loop task
    bg_task = asyncio.create_task(background_metric_evaluation_loop())

    yield

    # Shutdown
    bg_task.cancel()

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    lifespan=lifespan
)

# Enable CORS for Frontend UI
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix=settings.API_V1_STR)

# Ensure resources router is explicitly included to expose analyze endpoint
from app.api.v1.endpoints import resources as resources_endpoint
app.include_router(resources_endpoint.router, prefix=f"{settings.API_V1_STR}/resources", tags=["Cloud Resources"])

@app.get("/")
async def root():
    return {
        "app": settings.PROJECT_NAME,
        "version": "1.0.0",
        "status": "operational",
        "docs": "/docs"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
