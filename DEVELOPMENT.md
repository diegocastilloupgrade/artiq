# ARTIQ MVP - Development Setup Guide

## Overview

ARTIQ is an internal affiliate-content MVP platform built with:

- **Backend**: NestJS + TypeScript + PostgreSQL + TypeORM
- **Frontend**: Angular + Material Design
- **Database**: PostgreSQL 15
- **Cache**: Redis (optional, for future scaling)
- **Containerization**: Docker Compose

## Quick Start

### Prerequisites

- **Node.js**: 18+ (LTS recommended)
- **npm**: 9+
- **Docker & Docker Compose**: Latest
- **Git**: Latest

### 1. Clone and Install

```bash
# Clone repository (if not already cloned)
git clone https://github.com/diegocastilloupgrade/artiq.git
cd artiq

# Install backend dependencies
cd backend
npm install
cd ..

# Install frontend dependencies
cd frontend
npm install
cd ..
```

### 2. Start Infrastructure (PostgreSQL + Redis)

```bash
# From project root
docker-compose up -d

# Verify containers
docker-compose ps
```

PostgreSQL will be available at `localhost:5432`
Redis will be available at `localhost:6379`

### 3. Configure Environment

**Backend:**
```bash
cd backend
cp .env.example .env
# Edit .env with your values (API keys, CMS URL, etc.)
```

**Frontend:**
- Update API endpoint in `src/environments/environment.ts` if needed

### 4. Initialize Database

```bash
cd backend
npm run migration:run
```

### 5. Run Both Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm run start:dev
# Backend runs on http://localhost:3000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
# Frontend runs on http://localhost:4200
```

## Development Workflow

### Backend Development

- **File structure**: Modular by feature in `backend/src/`
- **Each module**: `*.controller.ts`, `*.service.ts`, `*.module.ts`
- **Database**: TypeORM entities and migrations in `backend/db/`

**Useful commands:**
```bash
cd backend
npm run start:dev          # Hot-reload dev mode
npm run lint              # ESLint check
npm run format            # Prettier formatting
npm run test              # Run tests
npm run migration:generate -- --name add_user_table  # Generate migration
```

### Frontend Development

- **File structure**: Feature-based lazy-loaded modules in `src/app/`
- **Components**: Located in their feature folders
- **Services**: Shared services in `src/app/services/`

**Useful commands:**
```bash
cd frontend
npm start                 # Dev server with hot reload
ng generate component path/component-name  # Generate component
npm run lint             # Angular linting
npm run format           # Prettier formatting
npm run test             # Run tests
```

## Project Structure

```
artiq/
├── backend/                    # NestJS application
│   ├── src/
│   │   ├── topics/             # Topic management module
│   │   ├── products/           # Product selection module
│   │   ├── drafts/             # Draft generation module
│   │   ├── cms/                # CMS publication module
│   │   ├── analytics/          # Analytics module
│   │   ├── link-monitoring/    # Link monitoring module
│   │   ├── auth/               # Authentication module
│   │   ├── shared/             # Shared utilities
│   │   └── main.ts             # Entry point
│   ├── db/migrations/          # Database migrations
│   ├── package.json
│   ├── tsconfig.json
│   └── README.md
├── frontend/                   # Angular application
│   ├── src/
│   │   ├── app/
│   │   │   ├── auth/           # Login & auth
│   │   │   ├── topics/         # Topic management UI
│   │   │   ├── products/       # Product search UI
│   │   │   ├── drafts/         # Draft editor UI
│   │   │   ├── analytics/      # Analytics UI
│   │   │   ├── dashboard/      # Main dashboard
│   │   │   └── app.component.ts
│   │   ├── assets/             # Images, fonts, etc.
│   │   └── main.ts             # Entry point
│   ├── package.json
│   ├── angular.json
│   ├── tsconfig.json
│   └── README.md
├── docker-compose.yml          # Local development infra
├── .env.example                # Environment template
├── .gitignore
├── README.md                   # This file
└── openspec/                   # Specifications and tasks
    ├── config.yaml
    ├── changes/
    │   ├── build-mvp-v1/
    │   └── archive/
    └── specs/
```

## Architecture Overview

### Layered Backend Architecture

```
┌─ Presentation Layer ────────────────────┐
│  HTTP Endpoints (Controllers)           │
├─────────────────────────────────────────┤
│ Application Layer (Services, Use Cases) │
├─────────────────────────────────────────┤
│ Domain Layer (Entities, Business Rules) │
├─────────────────────────────────────────┤
│ Infrastructure (DB, External APIs)      │
└─────────────────────────────────────────┘
```

### Frontend Architecture

- **Feature Modules**: Lazy-loaded for performance
- **Smart Components**: Manage state (in pages/)
- **Presentational Components**: Reusable UI components
- **Services**: HTTP clients and state management
- **Material Design**: Professional, accessible UI

## Database Migrations

When you modify TypeORM entities, generate and run migrations:

```bash
cd backend

# Generate migration (auto-detects schema changes)
npm run migration:generate -- --name <descriptive_name>

# Run migrations
npm run migration:run

# Revert last migration (if needed)
npm run migration:revert
```

## Testing

### Backend Tests

```bash
cd backend
npm run test              # Run all tests
npm run test:watch       # Watch mode
npm run test:cov         # Coverage report
```

### Frontend Tests

```bash
cd frontend
npm run test             # Run all tests
```

## Troubleshooting

### PostgreSQL Connection Refused

```bash
# Ensure container is running
docker-compose ps

# If not running, start it
docker-compose up -d postgres

# Check logs
docker-compose logs postgres
```

### Port Already in Use

- Backend (3000): `lsof -i :3000` or `netstat -ano | findstr :3000`
- Frontend (4200): `ng serve --port 4200` or `ng serve --port 4300`
- PostgreSQL (5432): Check `docker-compose.yml` and adjust ports

### Module Not Found / Import Errors

- Verify `tsconfig.json` paths match your import statements
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`

### Database Migrations Failed

```bash
cd backend
npm run migration:revert
npm run migration:run
```

## Git Workflow

All work happens through PRs to protect `main`:

```bash
# Create feature branch
git checkout -b feat/your-feature-name

# Make changes and commit
git add .
git commit -m "feat: description of change"

# Push and create PR
git push -u origin feat/your-feature-name
gh pr create --base main --head your-branch-name --title "Your PR Title"

# After PR merge, clean up
git checkout main
git pull origin main
```

See [.github/copilot-instructions.md](.github/copilot-instructions.md) for detailed operational rules.

## Roadmap & Next Steps

1. **T-1.01** - Complete project structure ✅
2. **T-1.02** - Configuration management
3. **T-1.03** - Authentication & roles
4. **T-2.01** - Domain model definition
5. **T-2.02** - Database setup and migrations
6. **T-3.01** - Topic CRUD endpoints
7. (And so on...)

See `openspec/changes/build-mvp-v1/tasks.md` for full task breakdown.

## Support & Issues

- Review `openspec/specs/` for feature specifications
- Check `docs/cambios-operativos.md` for operational log
- Refer to backend/README.md and frontend/README.md for component-specific docs
