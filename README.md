# AgentsPlatform (ĀGAMA)

![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/Chit-ai/AGAMA.MARKET/frontend.yml?label=Frontend%20Build)
![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/Chit-ai/AGAMA.MARKET/backend.yml?label=Backend%20Tests)
![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/Chit-ai/AGAMA.MARKET/publish-docs.yml?label=Docs%20Deploy)
![License](https://img.shields.io/badge/license-MIT-blue)

## 🚀 Deployment Status

| Environment       | Status        | URL                                                                 |
| :---------------- | :------------ | :------------------------------------------------------------------ |
| **Documentation** | 🟢 Live       | [AGAMA Docs](https://Chit-ai.github.io/AGAMA.MARKET/)               |
| **Frontend**      | 🟠 Configured | [Firebase Hosting](https://agama-market.web.app) (Requires Secrets) |
| **Backend**       | ⚪ Local      | `http://localhost:8000`                                             |

## Overview

AgentsPlatform (ĀGAMA) is a unified marketplace and protocol for deploying, discovering, and orchestrating intelligent AI agents. It ensures compliance, verifiability, and composability across a decentralized network.

## Key Features

- **Visual Enrichment**: A premium, glassmorphic UI with dynamic SVG backgrounds and 3D icons.
- **Agent Marketplace**: Discover agents by category (Coding, Research, Creative, Utility).
- **Universal Contract**: Standardized agent definitions ensuring interoperability.
- **Sandbox Execution**: Secure, isolated environment for running agent code.

## 📚 Documentation

Detailed documentation is available in the `gitdoc/` directory or on our [Documentation Site](https://Chit-ai.github.io/AGAMA.MARKET/).

- [API Reference](gitdoc/api_reference.md)
- [Architecture](gitdoc/architecture.md)
- [UI Enhancements](gitdoc/ui_enhancements.md)
- [Contribution Guide](gitdoc/contribution_guide.md)

## ⚙️ CI/CD Pipelines

This repository uses **GitHub Actions** for continuous integration and deployment.

### Workflows

1.  **Frontend Build** (`frontend.yml`): Runs on every push to `main`. Installs dependencies, runs linting, and builds the React app.
2.  **Backend Tests** (`backend.yml`): Runs on every push. Sets up Python environment, installs dependencies, and runs `pytest`.
3.  **Publish Docs** (`publish-docs.yml`): Automatically builds and deploys MkDocs to GitHub Pages.
4.  **Deploy to Firebase** (`deploy-firebase.yml`): Deploys the frontend to Firebase Hosting (requires configuration).

### Setting Up Deployment

To enable automated deployment to Firebase, you must configure Repository Secrets:

1.  Go to **Settings** > **Secrets and variables** > **Actions**.
2.  Add `FIREBASE_SERVICE_ACCOUNT`: Content of your Firebase Service Account JSON key.
3.  Update `.firebaserc` with your Project ID.

## Getting Started

### Prerequisites

- Node.js (v18+)
- Python (3.9+)
- Docker (for sandbox)

### Frontend Setup

1. Navigate to frontend: `cd frontend`
2. Install dependencies: `npm install`
3. Run development server: `npm run dev`

### Backend Setup

1. Navigate to backend: `cd backend`
2. Create virtual environment: `python -m venv venv`
3. Activate venv: `source venv/bin/activate` (Linux/Mac) or `venv\Scripts\activate` (Windows)
4. Install dependencies: `pip install -r requirements.txt`
5. Run server: `uvicorn app.main:app --reload`
