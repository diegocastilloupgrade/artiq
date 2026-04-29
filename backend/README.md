# ARTIQ Backend

NestJS backend for the ARTIQ MVP platform.

## Architecture

The backend follows a modular, layered architecture:

- **Presentation Layer**: HTTP endpoints exposed via NestJS controllers
- **Application/Orchestration Layer**: Use-case services coordinating business logic
- **Domain Layer**: Core entities and business rules
- **Infrastructure Layer**: External integrations (Amazon, CMS, GA4, AI providers, etc.)

## Modules

- `auth/` - Authentication and authorization
- `topics/` - Topic management and trend import
- `products/` - Affiliate product search and selection
- `drafts/` - Article draft generation and editing
- `cms/` - CMS publication workflow
- `analytics/` - Analytics data retrieval and summaries
- `link-monitoring/` - Broken-link detection and incident management
- `shared/` - Common utilities, interceptors, filters

## Setup

### Prerequisites

- Node.js 18+
- PostgreSQL 13+
- npm

### Installation

```bash
cd backend
npm install
```

### Environment Configuration

Copy `.env.example` to `.env` and update values:

```bash
cp .env.example .env
```

### Database

Run migrations:

```bash
npm run migration:run
```

Generate migration (after schema changes):

```bash
npm run migration:generate -- src/migrations/migration-name
```

### Running

**Development mode:**

```bash
npm run start:dev
```

**Production:**

```bash
npm run build
npm run start:prod
```

### Testing

```bash
npm run test
npm run test:watch
npm run test:cov
```

### Linting & Formatting

```bash
npm run lint
npm run format
```

## API Endpoints

- `POST /auth/login` - User login
- `GET /topics` - List topics
- `POST /topics` - Create topic
- `GET /products/search?query=` - Search Amazon products
- `POST /drafts` - Create draft
- `POST /drafts/:id/generate` - Generate content
- `POST /drafts/:id/publish` - Send to CMS
- `GET /analytics/summary` - Get analytics summary
- `GET /link-incidents` - List broken-link incidents

## Notes

- All external integrations use adapter pattern for loose coupling
- Domain entities use TypeORM for persistence
- JWT-based authentication for backoffice access
