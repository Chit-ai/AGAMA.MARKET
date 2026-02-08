from datetime import datetime
from typing import List, Optional, Dict, Any, Literal
from pydantic import BaseModel, Field, HttpUrl, validator

# --- 1. Sattva (Essence/Identity) ---
class Sattva(BaseModel):
    name: str = Field(..., description="Unique name of the agent")
    version: str = Field(..., description="Semantic version of the agent")
    description: str = Field(..., description="Short description of the agent")
    author: str = Field(..., description="Author or organization name")
    repository: HttpUrl = Field(..., description="URL to the source code repository")
    license: str = Field(..., description="SPDX license identifier")
    hash: Optional[str] = Field(None, description="SHA256 hash of the codebase for verification")

# --- 2. Sankalpa (Intention) ---
class Sankalpa(BaseModel):
    goal: str = Field(..., description="Primary goal or purpose of the agent")
    domain: List[str] = Field(..., description="Domains the agent operates in (e.g., coding, finance)")
    role: Literal["assistant", "critic", "executor", "researcher"] = Field(..., description="Role of the agent")
    keywords: List[str] = Field(default_factory=list, description="Keywords for search and discovery")

# --- 3. Shakti (Power/Capabilities) ---
class Tool(BaseModel):
    name: str
    description: str

class ComputeRequirements(BaseModel):
    gpu: bool = False
    memory_mb: int = 512

class Shakti(BaseModel):
    models: List[str] = Field(default_factory=list, description="AI models used by the agent")
    tools: List[Tool] = Field(default_factory=list, description="Tools available to the agent")
    compute_requirements: ComputeRequirements = Field(default_factory=ComputeRequirements)

# --- 4. Ahvana (Invocation) ---
class InputSchema(BaseModel):
    type: Literal["object"] = "object"
    json_schema: Dict[str, Any] = Field(..., description="Standard JSON Schema for input validation")

class Ahvana(BaseModel):
    endpoint: Optional[HttpUrl] = Field(None, description="API endpoint if hosted")
    protocol: Literal["REST", "WS", "gRPC"] = "REST"
    auth_type: Literal["Bearer", "API-Key", "OAuth2", "None"] = "None"
    input_schema: InputSchema

# --- 5. Samvada (Dialogue) ---
class Samvada(BaseModel):
    supports_streaming: bool = False
    conversation_style: Literal["chat", "task", "process"] = "chat"
    handoff_protocol: Optional[HttpUrl] = Field(None, description="Webhook for handing off control")

# --- 6. Parinama (Evolution/Result) ---
class Parinama(BaseModel):
    output_schema: Dict[str, Any] = Field(..., description="JSON Schema for outputs")
    transformation_rules: Optional[str] = Field(None, description="jq filter string for transformation")

# --- 7. Maryada (Boundaries/Safety) ---
class Maryada(BaseModel):
    rate_limit: Optional[str] = Field(None, description="Rate limit (e.g., '60/m')")
    privacy_level: Literal["public", "private", "pii-sensitive"] = "public"
    allowed_domains: List[str] = Field(default_factory=list, description="Whitelisted domains")
    max_budget_usd: Optional[float] = Field(None, description="Maximum budget per run")

# --- 8. Sakshi (Witness) ---
class Sakshi(BaseModel):
    log_level: Literal["INFO", "DEBUG", "WARN", "ERROR"] = "INFO"
    trace_id_header: str = "X-Trace-ID"
    storage_backend: Literal["postgres", "s3", "elastic", "local"] = "postgres"

# --- Master ĀGAMA Contract ---
class AgamaContract(BaseModel):
    agama_version: Literal["1.0"] = "1.0"
    sattva: Sattva
    sankalpa: Sankalpa
    shakti: Shakti
    ahvana: Ahvana
    samvada: Samvada
    parinama: Parinama
    maryada: Maryada
    sakshi: Sakshi

    @validator("sankalpa")
    def validate_intention(cls, v):
        if not v.goal or len(v.goal) < 10:
             raise ValueError("Sankalpa (Intention) must have a clear, descriptive goal (>10 chars).")
        return v
