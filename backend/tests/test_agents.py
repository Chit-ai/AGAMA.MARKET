from fastapi.testclient import TestClient

def test_create_agent_success(client: TestClient):
    valid_agama = {
        "agama_version": "1.0",
        "sattva": {
            "name": "CodeMaster",
            "version": "1.0.0",
            "description": "An agent that writes code",
            "author": "DevCorp",
            "repository": "https://github.com/devcorp/codemaster",
            "license": "MIT"
        },
        "sankalpa": {
            "goal": "To write high quality python code automatically.",
            "domain": ["coding"],
            "role": "executor"
        },
        "shakti": {
            "models": ["gpt-4"],
            "tools": [{"name": "repl", "description": "Execute python code"}]
        },
        "ahvana": {
            "input_schema": {
                "type": "object",
                "json_schema": {"type": "object", "properties": {"prompt": {"type": "string"}}}
            }
        },
        "samvada": {
            "conversation_style": "task"
        },
        "parinama": {
            "output_schema": {"type": "string"}
        },
        "maryada": {
            "privacy_level": "public"
        },
        "sakshi": {
            "log_level": "INFO"
        }
    }
    
    response = client.post("/api/v1/agents/", json=valid_agama)
    assert response.status_code == 201
    data = response.json()
    assert data["sattva"]["name"] == "CodeMaster"
    assert "sattva_hash" not in data # Should match Pydantic model response (hashes usually internal, or verified)
    # Wait, my pydantic model includes 'hash' in sattva if present, but the API returns the Schema.

def test_create_agent_invalid_intention(client: TestClient):
    invalid_agama = {
         "agama_version": "1.0",
         "sattva": {
            "name": "LazyAgent",
            "version": "0.1",
            "description": "Unknown",
            "author": "Anon",
            "repository": "https://github.com/anon/lazy",
            "license": "Unlicense"
        },
        "sankalpa": {
            "goal": "meh", # Too short, should fail implementation check (>10 chars)
            "domain": [],
            "role": "assistant"
        },
         "shakti": {}, "ahvana": {"input_schema": {"json_schema":{}}}, 
         "samvada": {}, "parinama": {"output_schema":{}},
         "maryada": {}, "sakshi": {}
    }
    response = client.post("/api/v1/agents/", json=invalid_agama)
    assert response.status_code == 422
    assert "Sankalpa" in response.text
