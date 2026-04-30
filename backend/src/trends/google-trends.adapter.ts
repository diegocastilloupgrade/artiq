import { Injectable, Logger } from '@nestjs/common';
import { TopicType } from '../topics/topic.entity';
import { TrendSourceAdapter } from './trend-source.adapter.interface';
import { TrendTopicDto } from './trend-topic.dto';

/**
 * Stub adapter for Google Trends.
 *
 * This is a placeholder implementation. In a real integration, this class
 * would call the Google Trends API (or an unofficial scraper) and map the
 * response into TrendTopicDto objects.
 *
 * The stub returns a fixed list of sample trends so the rest of the pipeline
 * (TrendImportJob, TopicsService) can be developed and tested without live
 * external dependencies.
 */
@Injectable()
export class GoogleTrendsAdapter implements TrendSourceAdapter {
  readonly sourceName = 'google-trends';

  private readonly logger = new Logger(GoogleTrendsAdapter.name);

  async fetchTopics(limit = 10): Promise<TrendTopicDto[]> {
    this.logger.log(
      `[STUB] Fetching up to ${limit} topics from Google Trends`,
    );

    // TODO: Replace with real Google Trends API call.
    // The live implementation should:
    //   1. Authenticate / configure the HTTP client with credentials from ConfigService.
    //   2. Call the trends endpoint (e.g. dailyTrends or realtime).
    //   3. Map each result to TrendTopicDto using normalizeItem() below.
    //   4. Respect rate-limits and handle pagination if needed.

    const stubData: TrendTopicDto[] = [
      {
        name: 'Inteligencia artificial en educación',
        description: 'Tendencia creciente sobre el uso de IA en el aula.',
        sourceName: this.sourceName,
        type: TopicType.EVERGREEN,
        tags: ['ia', 'educacion', 'tecnologia'],
        relevantDates: [new Date().toISOString().split('T')[0]],
        rawPayload: { rank: 1, geo: 'ES' },
      },
      {
        name: 'Black Friday 2026',
        description: 'Búsquedas anticipadas sobre ofertas del Black Friday.',
        sourceName: this.sourceName,
        type: TopicType.SEASONAL,
        tags: ['black-friday', 'ofertas', 'compras'],
        relevantDates: ['2026-11-27'],
        rawPayload: { rank: 2, geo: 'ES' },
      },
      {
        name: 'Copa del Mundo 2026',
        description: 'Tendencias relacionadas con el Mundial de fútbol.',
        sourceName: this.sourceName,
        type: TopicType.EVENT,
        tags: ['futbol', 'mundial', 'deporte'],
        relevantDates: ['2026-06-11', '2026-07-19'],
        rawPayload: { rank: 3, geo: 'ES' },
      },
    ];

    return stubData.slice(0, limit);
  }

  // ---------------------------------------------------------------------------
  // Private helpers (used when real integration is added)
  // ---------------------------------------------------------------------------

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private normalizeItem(_raw: Record<string, unknown>): TrendTopicDto {
    // TODO: implement when real API response shape is known.
    throw new Error('Not implemented');
  }
}
