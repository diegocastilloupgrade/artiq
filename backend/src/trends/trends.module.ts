import { Module } from '@nestjs/common';
import { GoogleTrendsAdapter } from './google-trends.adapter';

/**
 * TrendsModule exposes trend source adapters.
 * Import this module wherever the adapters are needed (e.g. TrendImportJob in T-3.05).
 */
@Module({
  providers: [GoogleTrendsAdapter],
  exports: [GoogleTrendsAdapter],
})
export class TrendsModule {}
