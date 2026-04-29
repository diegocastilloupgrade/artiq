# ARTIQ Configuration System

## Overview

The application uses a centralized configuration system that:
- Loads different configurations per environment (dev, staging, production)
- Validates required environment variables at startup
- Provides type-safe access to configuration throughout the app
- Keeps secrets out of source code

## Configuration Service

The `ConfigService` (in `src/config/`) provides:

```typescript
// Get entire configuration
config.getConfig()

// Get specific section
config.get('database')
config.get('amazon')
config.get('cms')

// Check environment
config.isProduction()
config.isDevelopment()
config.isStaging()
```

## Environment Setup

### Development (Default)

```bash
cp backend/.env.example backend/.env
# Edit as needed (most values have sensible dev defaults)
NODE_ENV=development npm run start:dev
```

**Characteristics:**
- Auto-sync database schema
- Verbose SQL logging
- Lenient validation (most vars optional with defaults)
- Hot-reload enabled

### Staging

```bash
cp backend/.env.staging.example backend/.env.staging
# Update with actual staging values
NODE_ENV=staging npm start
```

**Characteristics:**
- No auto-sync (use migrations only)
- Minimal logging
- Stricter validation (most vars required)
- Replicas staging environment

### Production

Create `.env` with production values (never commit):

```bash
NODE_ENV=production npm start:prod
```

**Characteristics:**
- Strict validation (all secrets required)
- No schema auto-sync
- Minimal logging
- All external service credentials required

## Configuration Sections

### App Config

```typescript
{
  name: string;
  environment: 'development' | 'staging' | 'production';
  port: number;
  nodeEnv: string;
}
```

### Database Config

```typescript
{
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  synchronize: boolean;  // true in dev, false in prod
  logging: boolean;      // true in dev, false in prod
}
```

### Auth Config

```typescript
{
  jwtSecret: string;           // Required in staging/prod
  jwtExpirationTime: string;   // e.g., "7d", "24h"
}
```

### Amazon Config

For affiliate product integration:

```typescript
{
  accessKey: string;     // Amazon affiliate access key
  secretKey: string;     // Amazon affiliate secret key
  affiliateTag: string;  // Your unique affiliate tag
  region: string;        // AWS region (e.g., 'US')
}
```

Get keys from: https://affiliate-program.amazon.com

### CMS Config

For publication workflow:

```typescript
{
  provider: 'wordpress' | 'strapi' | 'custom';
  url: string;           // CMS API endpoint
  apiKey: string;        // CMS authentication key
}
```

### Analytics Config

For GA4 + GTM:

```typescript
{
  ga4PropertyId: string;    // GA4 property ID (e.g., "G-XXXXXXXXXX")
  gtmContainerId: string;   // GTM container ID (e.g., "GTM-XXXXXX")
}
```

### AI Config

For content generation:

```typescript
{
  provider: 'openai' | 'anthropic' | 'other';
  apiKey: string;        // API key for provider
}
```

### Trend Sources Config

```typescript
{
  googleTrendsRegion: string;  // Region for trend analysis (e.g., "US")
}
```

### Redis Config (Optional)

```typescript
{
  host: string;
  port: number;
  password?: string;
}
```

## Security Best Practices

### 1. Never Commit Secrets

```bash
# Good: .env is in .gitignore
echo ".env" >> .gitignore
echo ".env.*.local" >> .gitignore

# Bad: Don't do this
git add .env
```

### 2. Generate Strong Secrets

For JWT_SECRET in production:

```bash
# Generate 32-byte random hex string
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

For password fields, use a password manager or generator.

### 3. Use Environment-Specific Files

- `.env.example` - Template with dummy values (commit this)
- `.env` - Local development (DO NOT COMMIT)
- `.env.staging.example` - Staging template (commit this)
- `.env` (on staging) - Actual staging secrets (DO NOT COMMIT)
- `.env` (on production) - Actual production secrets (DO NOT COMMIT)

### 4. Rotate Secrets Regularly

- Change JWT_SECRET if compromised
- Rotate API keys periodically
- Use key management services in production (AWS Secrets Manager, etc.)

### 5. Validate at Startup

The ConfigService validates required variables:
- If missing, app fails to start with clear error message
- This prevents deploying with incomplete configuration
- Validation rules differ per environment

## Adding New Configuration

1. Update `src/config/config.interface.ts`:
```typescript
export interface AppConfig {
  // ... existing fields
  myNewService: {
    endpoint: string;
    apiKey: string;
  };
}
```

2. Update config files:
```typescript
// development.ts, staging.ts, production.ts
myNewService: {
  endpoint: process.env.MY_SERVICE_ENDPOINT || 'http://localhost:9000',
  apiKey: process.env.MY_SERVICE_API_KEY || '',
}
```

3. Update `.env.example`:
```
MY_SERVICE_ENDPOINT=http://localhost:9000
MY_SERVICE_API_KEY=your-api-key
```

4. Use in services:
```typescript
const endpoint = this.config.get('myNewService').endpoint;
```

## Troubleshooting

### "Configuration validation failed"

The app won't start if required variables are missing in production/staging.

**Solution:**
1. Check environment: `echo $NODE_ENV`
2. Verify all required vars are set: `env | grep DATABASE`
3. Check `.env` file exists and is sourced
4. Review config/config.service.ts for validation rules

### "Cannot find module 'config.service'"

The ConfigService must be imported in the root AppModule:

```typescript
@Module({
  imports: [AppConfigModule],
  // ...
})
export class AppModule {}
```

### Port/Database connection issues

Verify these in order:
1. `.env` values match your actual service addresses
2. Docker containers are running: `docker-compose ps`
3. Port/host/password are correct
4. No firewall blocking connections

## References

- TypeORM Configuration: https://typeorm.io/
- NestJS Configuration: https://docs.nestjs.com/techniques/configuration
- Environment Variables (12-Factor App): https://12factor.net/config
