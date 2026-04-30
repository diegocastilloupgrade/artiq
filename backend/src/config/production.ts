import { AppConfig } from './config.interface';

/**
 * Production configuration
 */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
export const productionConfig: AppConfig = {
  app: {
    name: 'ARTIQ MVP',
    environment: 'production',
    port: parseInt(process.env.PORT || '3000', 10),
    nodeEnv: 'production',
  },

  database: {
    host: process.env.DATABASE_HOST as string,
    port: parseInt(process.env.DATABASE_PORT || '5432', 10),
    username: process.env.DATABASE_USER as string,
    password: process.env.DATABASE_PASSWORD as string,
    database: process.env.DATABASE_NAME || 'artiq_prod',
    synchronize: false, // Never auto-sync in production
    logging: false, // Minimal logging
  },

  auth: {
    jwtSecret: process.env.JWT_SECRET as string,
    jwtExpirationTime: process.env.JWT_EXPIRATION || '7d',
  },

  amazon: {
    accessKey: process.env.AMAZON_AFFILIATE_ACCESS_KEY as string,
    secretKey: process.env.AMAZON_AFFILIATE_SECRET_KEY as string,
    affiliateTag: process.env.AMAZON_AFFILIATE_TAG as string,
    region: 'US',
  },

  cms: {
    provider: (process.env.CMS_PROVIDER || 'wordpress') as 'wordpress' | 'strapi' | 'custom',
    url: process.env.CMS_URL as string,
    apiKey: process.env.CMS_API_KEY as string,
  },

  analytics: {
    ga4PropertyId: process.env.GA4_PROPERTY_ID as string,
    gtmContainerId: process.env.GTM_CONTAINER_ID as string,
  },

  ai: {
    provider: (process.env.AI_PROVIDER || 'openai') as 'openai' | 'anthropic' | 'other',
    apiKey: process.env.OPENAI_API_KEY as string,
  },

  trendSources: {
    googleTrendsRegion: process.env.GOOGLE_TRENDS_REGION || 'US',
  },

  redis: {
    host: process.env.REDIS_HOST as string,
    port: parseInt(process.env.REDIS_PORT || '6379', 10),
    password: process.env.REDIS_PASSWORD as string,
  },
};
