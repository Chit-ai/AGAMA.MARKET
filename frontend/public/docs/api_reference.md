# AgentsPlatform API Reference

## Base URL

`http://localhost:8000/api/v1`

## Authentication

Currently, the API is open for development. Future versions will require API keys or JWT tokens.

## Endpoints

### 1. Agents (`/agents`)

Manage the lifecycle of AI agents.

#### `POST /agents/`

Register a new agent.

- **Body**: Complete `AgamaContract` JSON.
- **Returns**: Created agent object.
- **Status Codes**:
  - `201 Created`
  - `409 Conflict` (if agent version already exists)
  - `422 Unprocessable Entity` (validation failure)

#### `GET /agents/`

List all registered agents.

- **Query Params**:
  - `skip` (int): Number of records to skip (default: 0).
  - `limit` (int): Max records to return (default: 100).
- **Returns**: List of `AgamaContract` objects.

#### `GET /agents/{agent_id}`

Get details of a specific agent.

- **Path Params**: `agent_id` (int).
- **Returns**: `AgamaContract` object.
- **Status Codes**: `404 Not Found`.

### 2. Discovery (`/discovery`)

Find agents from external sources (e.g., GitHub).

#### `POST /discovery/scan`

Trigger a scan for compatible agents on GitHub.

- **Query Params**:
  - `query` (str): GitHub search query (default: `topic:agent`).
  - `limit` (int): Max repositories to scan (default: 10).
- **Returns**: List of found (and optionally saved) `AgamaContract` objects.

### 3. Sandbox (`/sandbox`)

Execute agent code in a secure environment.

#### `POST /sandbox/execute`

Run arbitrary Python code in an isolated Docker container.

- **Body**:
  ```json
  {
    "code": "print('Hello World')",
    "language": "python"
  }
  ```
- **Returns**:
  ```json
  {
    "output": "Hello World\n",
    "exit_code": 0,
    "error": null
  }
  ```
- **Status Codes**: `400 Bad Request` (unsupported language).
