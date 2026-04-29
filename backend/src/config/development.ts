import { AppConfig } from './config.interface';

/**
 * Development configuration
 */
export const developmentConfig: AppConfig = {
  app: {
    name: 'ARTIQ MVP',
    environment: 'development',
    port: parseInt(process.env.PORT || '3000', 10),
    nodeEnv: 'development',
  },

  database: {
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT || '5432', 10),
    username: process.env.DATABASE_USER || 'artiq_user',
    password: process.env.DATABASE_PASSWORD || 'artiq_password',
    database: process.env.DATABASE_NAME || 'artiq_db',
    synchronize: true, // Auto-sync schema in dev
    logging: true, // Log SQL queries in dev
  },

  auth: {
    jwtSecret: process.env.JWT_SECRET || 'dev-super-secret-key-change-in-production',
    jwtExpirationTime: process.env.JWT_EXPIRATION || '7d',
  },

  amazon: {
    accessKey: process.env.AMAZON_AFFILIATE_ACCESS_KEY || '',
    secretKey: process.env.AMAZON_AFFILIATE_SECRET_KEY || '',
    affiliateTag: process.env.AMAZON_AFFILIATE_TAG || '',
    region: 'US',
  },

  cms: {
    provider: (process.env.CMS_PROVIDER || 'wordpress') as 'wordpress' | 'strapi' | 'custom',
    url: process.env.CMS_URL || 'http://localhost:8000',
    apiKey: process.env.CMS_API_KEY || '',
  },

  analytics: {
    ga4PropertyId: process.env.GA4_PROPERTY_ID || '',
    gtmContainerId: process.env.GTM_CONTAINER_ID || '',
  },

  ai: {
    provider: (process.env.AI_PROVIDER || 'openai') as 'openai' | 'anthropic' | 'other',
    apiKey: process.env.OPENAI_API_KEY || '',
  },

  trendSources: {
    googleTrendsRegion: process.env.GOOGLE_TRENDS_REGION || 'US',
  },

  redis: process.env.REDIS_HOST
    ? {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT || '6379', 10),
        password: process.env.REDIS_PASSWORD,
      }
    : undefined,
};
