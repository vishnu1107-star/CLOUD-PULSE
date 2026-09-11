from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    PROJECT_NAME: str = "CloudPulse FinOps Engine"
    API_V1_STR: str = "/api/v1"
    
    # Database
    DATABASE_URL: str = "sqlite+aiosqlite:///./cloudpulse.db"
    
    # Cloud Configs
    AWS_REGION: str = "us-east-1"
    AWS_ACCESS_KEY_ID: Optional[str] = None
    AWS_SECRET_ACCESS_KEY: Optional[str] = None
    
    # Engine Settings
    DRY_RUN_DEFAULT: bool = False
    ENABLE_SIMULATION_FALLBACK: bool = True
    EVALUATION_INTERVAL_SECONDS: int = 60
    
    # Slack Webhook Secret
    SLACK_SIGNING_SECRET: Optional[str] = "cloudpulse-secret-token"

    class Config:
        case_sensitive = True
        env_file = ".env"

settings = Settings()
