from sqlalchemy import Column, Integer, String, Text, Boolean, TIMESTAMP, JSON
from sqlalchemy.sql import func
from app.db.base import Base

class Agent(Base):
    __tablename__ = "agents"

    id = Column(Integer, primary_key=True, index=True)
    
    # Sattva (Identity) - extracted for quick access
    name = Column(String, index=True, nullable=False)
    version = Column(String, nullable=False)
    sattva_hash = Column(String, unique=True, index=True, nullable=False)
    
    # Sankalpa (Intent) - extracted for filtering
    goal = Column(Text, nullable=False)
    domain = Column(JSON, nullable=False) # List of strings stored as JSON
    role = Column(String, nullable=False)
    
    # Full Contract as JSONB
    agama_json = Column(JSON, nullable=False)
    
    # Metadata
    is_verified = Column(Boolean, default=False)
    created_at = Column(TIMESTAMP, server_default=func.now())
    updated_at = Column(TIMESTAMP, onupdate=func.now())

    def __repr__(self):
        return f"<Agent(name={self.name}, version={self.version})>"
