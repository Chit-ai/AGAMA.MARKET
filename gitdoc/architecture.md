# AgentsPlatform Architecture

## High-Level Overview

AgentsPlatform (ĀGAMA) is built as a modular system designed for scalability and extensibility.

### Core Components

1.  **Frontend (React/Vite)**:
    - **Purpose**: Provides a user interface for discovering, deploying, and interacting with agents.
    - **Tech Stack**: React 18, Vite, Tailwind CSS, Framer Motion.
    - **Key Features**:
      - Glassmorphic UI design.
      - Real-time interaction with backend APIs.
      - Dynamic SVG graphics (HeroBackground, CategoryAvatar).

2.  **Backend (FastAPI)**:
    - **Purpose**: Manages data persistence, API endpoints, and business logic.
    - **Tech Stack**: Python 3.9+, FastAPI, SQLAlchemy, Pydantic.
    - **Key Modules**:
      - `api/`: RESTful endpoints.
      - `services/`: Business logic (Discovery, Execution).
      - `schemas/`: Data validation models (AgamaContract).

3.  **Database (PostgreSQL/SQLite)**:
    - **Purpose**: Stores agent metadata, user information, and logs.
    - **Schema**:
      - `agents`: Core table storing `AgamaContract` JSON and metadata.

4.  **Sandbox (Docker)**:
    - **Purpose**: Executes untrusted agent code in isolated containers.
    - **Workflow**:
      1. User/Agent submits code.
      2. Backend validates request.
      3. `ExecutionService` spins up a Docker container.
      4. Code runs, output is captured.
      5. Container is destroyed.

## Data Flow

1.  **Agent Registration**:
    - User submits `AgamaContract` JSON via Frontend.
    - Backend validates schema using `AgamaValidator`.
    - If valid, agent is stored in Database.

2.  **Agent Discovery**:
    - User searches for agents.
    - Backend queries GitHub API via `DiscoveryService`.
    - Results are tailored and returned to Frontend.

3.  **Code Execution**:
    - User triggers execution.
    - Backend sends code to Docker Sandbox.
    - Results are streamed back to Frontend.
