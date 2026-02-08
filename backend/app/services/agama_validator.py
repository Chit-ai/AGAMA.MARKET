from app.schemas.agama import AgamaContract
from pydantic import ValidationError
import hashlib
import json

class AgamaValidator:
    @staticmethod
    def validate_json(data: dict) -> AgamaContract:
        """
        Validates a raw JSON dictionary against the ĀGAMA v1.0 strict schema.
        Raises ValidationError if non-compliant.
        """
        try:
            # 1. Structural Validation via Pydantic
            contract = AgamaContract(**data)
            
            # 2. Logic Validation (Sankalpa check is already in Pydantic validator)
            
            # 3. Integrity Check
            # If a hash is provided in Sattva, we could verify it here 
            # (but that requires fetching source code, which is async).
            
            return contract
        except ValidationError as e:
            raise ValueError(f"ĀGAMA Contract Violation: {e.errors()}")

    @staticmethod
    def compute_sattva_hash(contract: AgamaContract) -> str:
        """
        Generates a unique deterministic hash for the agent based on identity.
        """
        # We assume name-version-author is the unique composite key
        unique_str = f"{contract.sattva.author}/{contract.sattva.name}:{contract.sattva.version}"
        return hashlib.sha256(unique_str.encode()).hexdigest()
