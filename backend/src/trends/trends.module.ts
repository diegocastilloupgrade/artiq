import { Module } from '@nestjs/common';
import { GoogleTrendsAdapter } from './google-trends.adapter';
import { TrendImportService } from './trend-import.service';
import { TrendImportController } from './trend-import.controller';
import { TopicsModule } from '../topics/topics.module';

@Module({
  imports: [TopicsModule],
  controllers: [TrendImportController],
  providers: [GoogleTrendsAdapter, TrendImportService],
  exports: [GoogleTrendsAdapter],
})
export class TrendsModule {}
