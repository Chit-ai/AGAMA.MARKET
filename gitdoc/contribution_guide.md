# Contributing to AgentsPlatform

We welcome contributions to the AgentsPlatform (ĀGAMA)! Whether you're fixing bugs, adding features, or improving documentation, your help is appreciated.

## Getting Started

1.  **Fork the Repository**: Click the "Fork" button on GitHub.
2.  **Clone Your Fork**:
    ```bash
    git clone https://github.com/YOUR_USERNAME/AGAMA.MARKET.git
    cd AGAMA.MARKET
    ```
3.  **Set Up Environment**:
    - **Frontend**: `cd frontend && npm install`
    - **Backend**: `cd backend && pip install -r requirements.txt`

## Development Workflow

1.  **Create a Branch**: `git checkout -b feature/your-feature-name`
2.  **Make Changes**: Implement your feature or fix.
3.  **Run Tests**:
    - Backend: `pytest`
    - Frontend: `npm run test` (if applicable)
4.  **Commit**: Use descriptive commit messages (e.g., `feat: add new discovery source`).
5.  **Push**: `git push origin feature/your-feature-name`
6.  **Open a Pull Request**: Submit your PR to the `main` branch.

## Project Structure

- `frontend/`: React + Vite + Tailwind CSS application.
  - `src/components/ui/`: Reusable UI components (Glassmorphic design).
  - `src/components/market/`: Marketplace-specific features (Hero, Grid, Search).
- `backend/`: FastAPI + SQLAlchemy application.
  - `app/api/endpoints/`: API route handlers.
  - `app/schemas/`: Pydantic models (AgamaContract).
  - `app/services/`: Business logic (Discovery, Execution).

## Code Style

- **Frontend**: Follow React best practices. Use functional components and hooks.
- **Backend**: Follow PEP 8. Type hints are mandatory.

## Reporting Issues

Please verify that the issue hasn't already been reported. When submitting an issue, include:

- A clear description of the problem.
- Steps to reproduce.
- Expected vs. actual behavior.
