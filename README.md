# Unified Agent Marketplace Platform

A unified platform for discovering, connecting, and running open-source AI agents.

## Project Structure

- **backend/**: FastAPI application (Python)
- **frontend/**: React + Vite application (TypeScript)
- **.github/workflows/**: CI/CD configurations

## Getting Started

### Backend

1. Navigate to `backend/`
2. Create virtual environment: `python -m venv venv`
3. Install requirements: `pip install -r requirements.txt`
4. Run server: `uvicorn app.main:app --reload`

### Frontend

1. Navigate to `frontend/`
2. Install dependencies: `npm install`
3. Run dev server: `npm run dev`

## CI/CD Pipelines

This repository is configured with GitHub Actions:

- **Backend CI**: Runs on push/PR to `backend/**`. executes linting (`flake8`) and tests (`pytest`).
- **Frontend CI**: Runs on push/PR to `frontend/**`. executes linting and build checks.
