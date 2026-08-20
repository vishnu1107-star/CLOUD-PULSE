from fastapi import APIRouter
from app.api.v1.endpoints import resources, ghost_resources, policies, hooks, analytics, ml

api_router = APIRouter()

api_router.include_router(resources.router, prefix="/resources", tags=["Cloud Resources"])
api_router.include_router(ghost_resources.router, prefix="/ghost", tags=["Ghost Resource Sweeper"])
api_router.include_router(policies.router, prefix="/policies", tags=["FinOps Policies"])
api_router.include_router(hooks.router, prefix="/hooks", tags=["Developer Webhooks & Slack"])
api_router.include_router(analytics.router, prefix="/analytics", tags=["Cost & Carbon Analytics"])
api_router.include_router(ml.router, prefix="/ml", tags=["Machine Learning & AI Forecaster"])
