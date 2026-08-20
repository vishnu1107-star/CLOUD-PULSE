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

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("cloudpulse")

async def background_metric_evaluation_loop():
    """Background task loop that periodically evaluates cloud resources."""
    logger.info(f"CloudPulse Background Metric Loop Started (Interval: {settings.EVALUATION_INTERVAL_SECONDS}s)...")
    while True:
        try:
            await asyncio.sleep(settings.EVALUATION_INTERVAL_SECONDS)
            async with AsyncSessionLocal() as db:
                evaluator = IdleEvaluator(db)
                executor = ActionExecutor(db)
                policy = await evaluator.get_or_create_default_policy()

                evaluations = await evaluator.evaluate_all()
                if policy.auto_stop_enabled:
                    for item in evaluations:
                        if item.get("is_idle") and not item.get("override_active"):
                            await executor.stop_resource(item["resource_id"], is_automated=True)
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
