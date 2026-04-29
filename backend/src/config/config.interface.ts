/**
 * Configuration interface
 * Defines the shape of the application configuration
 */
export interface AppConfig {
  // Application
  app: {
    name: string;
    environment: 'development' | 'staging' | 'production';
    port: number;
    nodeEnv: string;
  };

  // Database
  database: {
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
    synchronize: boolean;
    logging: boolean;
  };

  // JWT & Auth
  auth: {
    jwtSecret: string;
    jwtExpirationTime: string;
  };

  // External Services - Amazon
  amazon: {
    accessKey: string;
    secretKey: string;
    affiliateTag: string;
    region: string;
  };

  // External Services - CMS
  cms: {
    provider: 'wordpress' | 'strapi' | 'custom';
    url: string;
    apiKey: string;
  };

  // External Services - Analytics
  analytics: {
    ga4PropertyId: string;
    gtmContainerId: string;
  };

  // External Services - AI Generation
  ai: {
    provider: 'openai' | 'anthropic' | 'other';
    apiKey: string;
  };

  // Trend Sources
  trendSources: {
    googleTrendsRegion: string;
  };

  // Redis (optional, for caching/queues)
  redis?: {
    host: string;
    port: number;
    password?: string;
  };
}
