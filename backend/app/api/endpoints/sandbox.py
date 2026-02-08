from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.services.execution import ExecutionService

router = APIRouter()
executor = ExecutionService()

class ExecutionRequest(BaseModel):
    code: str
    language: str = "python"

class ExecutionResponse(BaseModel):
    output: str
    exit_code: int
    error: str = None

@router.post("/execute", response_model=ExecutionResponse)
def execute_code(request: ExecutionRequest):
    """
    Executes code in a secure, ephemeral Docker container.
    """
    if request.language != "python":
        raise HTTPException(status_code=400, detail="Only Python is currently supported")

    result = executor.execute_code(request.code)
    
    return ExecutionResponse(
        output=result.get("output", ""),
        exit_code=result.get("exit_code", 1),
        error=result.get("error")
    )
