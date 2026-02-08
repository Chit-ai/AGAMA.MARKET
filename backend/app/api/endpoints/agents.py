from typing import List, Generator, Any
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.db import models
from app.db.base import get_db
from app.schemas.agama import AgamaContract
from app.services.agama_validator import AgamaValidator

router = APIRouter()

@router.post("/", response_model=AgamaContract, status_code=status.HTTP_201_CREATED)
def create_agent(
    contract_in: dict,
    db: Session = Depends(get_db)
) -> Any:
    """
    Register a new agent by submitting a full ĀGAMA v1.0 JSON contract.
    Validates the schema and the 'Sankalpa' (Intent).
    """
    # 1. Validate
    try:
        valid_contract = AgamaValidator.validate_json(contract_in)
    except ValueError as e:
        raise HTTPException(status_code=422, detail=str(e))

    # 2. Check Uniqueness (Sattva Hash)
    sattva_hash = AgamaValidator.compute_sattva_hash(valid_contract)
    if db.query(models.Agent).filter(models.Agent.sattva_hash == sattva_hash).first():
        raise HTTPException(status_code=409, detail="Agent with this version already exists.")

    # 3. Store
    db_agent = models.Agent(
        name=valid_contract.sattva.name,
        version=valid_contract.sattva.version,
        sattva_hash=sattva_hash,
        goal=valid_contract.sankalpa.goal,
        domain=valid_contract.sankalpa.domain, # Saved as JSON
        role=valid_contract.sankalpa.role,
        agama_json=contract_in # Store the original JSON
    )
    db.add(db_agent)
    db.commit()
    db.refresh(db_agent)
    return valid_contract

@router.get("/", response_model=List[AgamaContract])
def read_agents(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
) -> Any:
    """
    Retrieve agents with pagination.
    """
    agents = db.query(models.Agent).offset(skip).limit(limit).all()
    # Convert back to Pydantic model
    return [AgamaContract(**agent.agama_json) for agent in agents]

@router.get("/{agent_id}", response_model=AgamaContract)
def read_agent(
    agent_id: int,
    db: Session = Depends(get_db)
) -> Any:
    """
    Get a specific agent by ID.
    """
    agent = db.query(models.Agent).filter(models.Agent.id == agent_id).first()
    if not agent:
        raise HTTPException(status_code=404, detail="Agent not found")
    return AgamaContract(**agent.agama_json)
