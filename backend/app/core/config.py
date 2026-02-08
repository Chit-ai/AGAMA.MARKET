from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "Unified Agent Marketplace"
    API_V1_STR: str = "/api/v1"
    DATABASE_URL: str = "postgresql://postgres:password@localhost:5432/agents_db"

    class Config:
        case_sensitive = True

settings = Settings()
