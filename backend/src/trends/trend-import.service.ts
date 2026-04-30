import { Injectable } from '@nestjs/common';
import { GoogleTrendsAdapter } from './google-trends.adapter';
import { TopicsService } from '../topics/topics.service';
import { TopicSource, TopicStatus } from '../topics/topic.entity';

@Injectable()
export class TrendImportService {
  constructor(
    private readonly adapter: GoogleTrendsAdapter,
    private readonly topicsService: TopicsService,
  ) {}

  async importTopics(): Promise<{ imported: number; skipped: number }> {
    const trends = await this.adapter.fetchTopics();
    const existing = await this.topicsService.findAll();
    const existingNames = new Set(existing.map((t) => t.name.toLowerCase()));

    let imported = 0;
    let skipped = 0;

    for (const trend of trends) {
      if (existingNames.has(trend.name.toLowerCase())) {
        skipped++;
        continue;
      }

      await this.topicsService.create({
        name: trend.name,
        description: trend.description ?? null,
        source: TopicSource.EXTERNAL,
        source_name: trend.sourceName,
        type: trend.type,
        status: TopicStatus.CANDIDATE,
        tags: trend.tags ?? null,
        relevant_dates: trend.relevantDates ?? null,
      });

      existingNames.add(trend.name.toLowerCase());
      imported++;
    }

    return { imported, skipped };
  }
}
