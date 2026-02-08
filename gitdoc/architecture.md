# AgentsPlatform Architecture

## High-Level Overview

AgentsPlatform (ĀGAMA) is built as a modular system designed for scalability and extensibility.

```mermaid
graph TB
    subgraph "Client Layer"
        UI[React Frontend<br/>Vite + Tailwind]
    end

    subgraph "Application Layer"
        API[FastAPI Backend<br/>REST API]
        Validator[AGAMA Validator<br/>Schema Validation]
        Discovery[Discovery Service<br/>GitHub Integration]
        Execution[Execution Service<br/>Sandbox Manager]
    end

    subgraph "Data Layer"
        DB[(PostgreSQL/SQLite<br/>Agent Metadata)]
        Cache[Redis Cache<br/>Optional]
    end

    subgraph "Execution Layer"
        Docker[Docker Sandbox<br/>Isolated Containers]
    end

    UI -->|HTTP/REST| API
    API --> Validator
    API --> Discovery
    API --> Execution
    API --> DB
    API -.->|Optional| Cache
    Execution --> Docker
    Discovery -->|GitHub API| GitHub[GitHub Repositories]

    style UI fill:#6366f1,stroke:#4f46e5,color:#fff
    style API fill:#ec4899,stroke:#db2777,color:#fff
    style DB fill:#14b8a6,stroke:#0d9488,color:#fff
    style Docker fill:#f59e0b,stroke:#d97706,color:#fff
```

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

### Agent Registration Flow

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant API
    participant Validator
    participant Database

    User->>Frontend: Submit Agent Contract
    Frontend->>API: POST /api/v1/agents
    API->>Validator: Validate AGAMA Schema

    alt Valid Contract
        Validator-->>API: ✓ Valid
        API->>Database: Store Agent Metadata
        Database-->>API: Agent ID
        API-->>Frontend: 201 Created
        Frontend-->>User: Success Message
    else Invalid Contract
        Validator-->>API: ✗ Invalid
        API-->>Frontend: 400 Bad Request
        Frontend-->>User: Error Details
    end
```

### Agent Discovery Flow

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant API
    participant Discovery
    participant GitHub
    participant Database

    User->>Frontend: Search Agents
    Frontend->>API: GET /api/v1/agents?category=coding

    par Local Database
        API->>Database: Query Local Agents
        Database-->>API: Local Results
    and GitHub Discovery
        API->>Discovery: Search GitHub
        Discovery->>GitHub: API Request
        GitHub-->>Discovery: Repository Data
        Discovery-->>API: Parsed Agents
    end

    API-->>Frontend: Combined Results
    Frontend-->>User: Display Agent Cards
```

### Code Execution Flow

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant API
    participant Execution
    participant Docker

    User->>Frontend: Trigger Execution
    Frontend->>API: POST /sandbox/execute
    API->>Execution: Create Sandbox
    Execution->>Docker: Spin Up Container
    Docker-->>Execution: Container ID

    Execution->>Docker: Execute Code
    Docker-->>Execution: Stream Output
    Execution-->>API: Execution Results

    Execution->>Docker: Destroy Container
    Docker-->>Execution: Cleanup Complete

    API-->>Frontend: Results + Logs
    Frontend-->>User: Display Output
```

## Deployment Architecture

```mermaid
graph TB
    subgraph "Production Environment"
        subgraph "Firebase Hosting"
            FE[Frontend<br/>Static Assets]
        end

        subgraph "Cloud Infrastructure"
            BE[Backend API<br/>FastAPI Server]
            PG[(PostgreSQL<br/>Production DB)]
        end

        subgraph "Container Registry"
            DR[Docker Registry<br/>Sandbox Images]
        end
    end

    subgraph "CI/CD Pipeline"
        GH[GitHub Actions]
        Build[Build & Test]
        Deploy[Deploy]
    end

    subgraph "Monitoring"
        Logs[Logging Service]
        Metrics[Metrics Dashboard]
    end

    GH --> Build
    Build --> Deploy
    Deploy --> FE
    Deploy --> BE

    FE -->|API Calls| BE
    BE --> PG
    BE --> DR
    BE --> Logs
    BE --> Metrics

    style FE fill:#6366f1,stroke:#4f46e5,color:#fff
    style BE fill:#ec4899,stroke:#db2777,color:#fff
    style PG fill:#14b8a6,stroke:#0d9488,color:#fff
    style DR fill:#f59e0b,stroke:#d97706,color:#fff
```

## Security Considerations

1. **Sandbox Isolation**: All agent code runs in ephemeral Docker containers with resource limits.
2. **Input Validation**: AGAMA contracts are validated against strict JSON schemas.
3. **API Authentication**: JWT-based authentication for protected endpoints (future).
4. **Rate Limiting**: Prevents abuse of execution and discovery services.

## Scalability

- **Horizontal Scaling**: Backend API can be scaled across multiple instances.
- **Caching Layer**: Redis for frequently accessed agent metadata.
- **CDN**: Static assets served via Firebase CDN.
- **Database Replication**: Read replicas for high-traffic scenarios.
