# Configuration System

This module provides centralized configuration management for the application.

## Architecture

- `config.interface.ts` - TypeScript interface defining all config sections
- `development.ts` - Development environment config (sync schema, verbose logging)
- `staging.ts` - Staging environment config
- `production.ts` - Production environment config (strict, no auto-sync)
- `config.service.ts` - Service providing validated access to configuration
- `config.module.ts` - NestJS module exporting the service globally

## Environment-Based Configuration

The application loads different configurations based on `NODE_ENV`:

```bash
# Development (default)
NODE_ENV=development npm run start:dev

# Staging
NODE_ENV=staging npm start

# Production
NODE_ENV=production npm start:prod
```

## Configuration Sections

### App
- `name` - Application name
- `environment` - Current environment
- `port` - Server port
- `nodeEnv` - Node environment string

### Database
- `host`, `port`, `username`, `password`, `database`
- `synchronize` - Auto-sync schema (true in dev, false in prod)
- `logging` - Log SQL queries

### Auth
- `jwtSecret` - Secret key for JWT signing (required in production)
- `jwtExpirationTime` - JWT token expiration (default: 7d)

### Amazon (Affiliate)
- `accessKey` - Amazon affiliate access key
- `secretKey` - Amazon affiliate secret key
- `affiliateTag` - Amazon affiliate tag
- `region` - AWS region

### CMS
- `provider` - CMS type: 'wordpress', 'strapi', 'custom'
- `url` - CMS API endpoint
- `apiKey` - CMS authentication key

### Analytics
- `ga4PropertyId` - Google Analytics 4 property ID
- `gtmContainerId` - Google Tag Manager container ID

### AI
- `provider` - AI provider: 'openai', 'anthropic', 'other'
- `apiKey` - API key for AI provider

### Trend Sources
- `googleTrendsRegion` - Region for Google Trends (default: US)

### Redis (Optional)
- `host`, `port`, `password` - Redis connection params

## Usage

In any NestJS service:

```typescript
import { ConfigService } from './config/config.service';

@Injectable()
export class MyService {
  constructor(private config: ConfigService) {}

  doSomething() {
    const dbConfig = this.config.get('database');
    const isProduction = this.config.isProduction();
    const fullConfig = this.config.getConfig();
  }
}
```

## Environment Variables

See `.env.example` for all available variables. Required variables depend on environment:

**Development**: Mostly optional, defaults provided
**Staging/Production**: Most variables required, validation enforced

## Security Notes

- Never commit `.env` files
- Always use `.env.example` as a template
- Secrets are provided only via environment variables
- Validation ensures all required secrets are present before app starts
- Different log levels per environment (verbose in dev, minimal in prod)
