from fastapi import APIRouter
from app.api.endpoints import agents, discovery, sandbox

api_router = APIRouter()
api_router.include_router(agents.router, prefix="/agents", tags=["agents"])
api_router.include_router(discovery.router, prefix="/discovery", tags=["discovery"])
api_router.include_router(sandbox.router, prefix="/sandbox", tags=["sandbox"])
