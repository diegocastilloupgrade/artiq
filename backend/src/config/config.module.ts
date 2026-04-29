import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';

/**
 * Configuration module
 * Provides ConfigService globally for use throughout the application
 */
@Module({
  providers: [ConfigService],
  exports: [ConfigService],
})
export class AppConfigModule {}
