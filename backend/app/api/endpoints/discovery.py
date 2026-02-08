from fastapi import APIRouter, Depends, Query, HTTPException, status
from typing import List, Any
from app.services.discovery import DiscoveryService
from app.schemas.agama import AgamaContract
from app.db.base import get_db
from sqlalchemy.orm import Session
from app.db import models
from app.services.agama_validator import AgamaValidator

router = APIRouter()

@router.post("/scan", response_model=List[AgamaContract])
def scan_github(
    query: str = Query("topic:agent", description="GitHub search query"),
    limit: int = Query(10, le=50, description="Max repos to fetch"),
    db: Session = Depends(get_db)
):
    """
    Triggers a GitHub scan for agents.
    Discovered agents are validated and (optionally) stored as 'drafts' or returned directly.
    """
    service = DiscoveryService()
    try:
        # 1. Fetch from GitHub
        discovered_agents = service.search_agents(query)
        
        # 2. Attempt to Auto-Register (if valid)
        saved_agents = []
        for contract in discovered_agents:
            try:
                # Validate & Compute Hash
                AgamaValidator.validate_json(contract.dict())
                sattva_hash = AgamaValidator.compute_sattva_hash(contract)
                
                # Check Deduplication
                if not db.query(models.Agent).filter(models.Agent.sattva_hash == sattva_hash).first():
                    new_agent = models.Agent(
                        name=contract.sattva.name,
                        version=contract.sattva.version,
                        sattva_hash=sattva_hash,
                        goal=contract.sankalpa.goal,
                        domain=contract.sankalpa.domain,
                        role=contract.sankalpa.role,
                        agama_json=contract.dict(),
                        is_verified=False 
                    )
                    db.add(new_agent)
                    saved_agents.append(contract)
            except Exception as e:
                print(f"Validation failed for {contract.sattva.name}: {e}")
                continue
        
        db.commit()
        return saved_agents

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
