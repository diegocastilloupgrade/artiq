import { Injectable } from '@nestjs/common';
import { AppConfig } from './config.interface';
import { developmentConfig } from './development';
import { stagingConfig } from './staging';
import { productionConfig } from './production';

/**
 * Configuration service
 * Provides centralized access to application configuration
 * and validates that all required environment variables are set
 */
@Injectable()
export class ConfigService {
  private readonly config: AppConfig;

  constructor() {
    this.config = this.loadConfig();
    this.validateConfig();
  }

  /**
   * Load configuration based on NODE_ENV
   */
  private loadConfig(): AppConfig {
    const env = process.env.NODE_ENV || 'development';

    switch (env) {
      case 'staging':
        return stagingConfig;
      case 'production':
        return productionConfig;
      case 'development':
      default:
        return developmentConfig;
    }
  }

  /**
   * Validate that all required configuration is present
   * Throws if critical variables are missing
   */
  private validateConfig(): void {
    const env = process.env.NODE_ENV || 'development';
    const errors: string[] = [];

    // Required in all environments
    if (!this.config.auth.jwtSecret && env !== 'development') {
      errors.push('JWT_SECRET is required');
    }

    // Required in production/staging
    if (env !== 'development') {
      if (!this.config.database.host) errors.push('DATABASE_HOST is required');
      if (!this.config.database.username) errors.push('DATABASE_USER is required');
      if (!this.config.database.password) errors.push('DATABASE_PASSWORD is required');
    }

    if (errors.length > 0) {
      const errorMessage = `Configuration validation failed:\n${errors.map((e) => `  - ${e}`).join('\n')}`;
      throw new Error(errorMessage);
    }
  }

  /**
   * Get full configuration
   */
  getConfig(): AppConfig {
    return this.config;
  }

  /**
   * Get specific configuration section
   */
  get(key: keyof AppConfig): AppConfig[typeof key] {
    return this.config[key];
  }

  /**
   * Check if running in production
   */
  isProduction(): boolean {
    return this.config.app.environment === 'production';
  }

  /**
   * Check if running in development
   */
  isDevelopment(): boolean {
    return this.config.app.environment === 'development';
  }

  /**
   * Check if running in staging
   */
  isStaging(): boolean {
    return this.config.app.environment === 'staging';
  }
}
