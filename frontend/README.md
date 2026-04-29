# ARTIQ Frontend

Angular backoffice UI for the ARTIQ MVP platform.

## Architecture

The frontend is organized by feature modules:

- `auth/` - Login and authentication
- `topics/` - Topic list and detail views
- `products/` - Product search interface
- `drafts/` - Article draft editor
- `analytics/` - Dashboard and analytics views
- `dashboard/` - Main dashboard

## Setup

### Prerequisites

- Node.js 18+
- npm
- Angular CLI

### Installation

```bash
cd frontend
npm install
```

### Development Server

Run the dev server:

```bash
npm start
```

Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Code Scaffolding

Generate a component:

```bash
ng generate component component-name
ng g c component-name
```

Generate other items:

```bash
ng generate directive|pipe|service|class|guard|interface|enum|module
```

### Build

Build the project:

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

### Running Tests

```bash
npm run test
```

### Linting

```bash
npm run lint
npm run format
```

## Key UI Sections

- **Login**: JWT-based authentication
- **Topic Management**: CRUD operations, import from sources
- **Product Search**: Search and select Amazon products
- **Draft Editor**: Generate and edit article content
- **Analytics Dashboard**: View article metrics and CTR
- **Broken-Link Incidents**: Review and resolve broken links

## Material Design

The UI uses Angular Material components for a professional, accessible backoffice experience.

## Environment Configuration

Update API endpoint in `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
};
```

## Notes

- Lazy loading of feature modules for better performance
- Reactive forms for complex data entry
- Services for HTTP communication and state management
- Reusable components for common patterns
