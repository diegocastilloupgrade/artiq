import { TopicType } from '../topics/topic.entity';

/**
 * Normalized topic data returned by any TrendSourceAdapter implementation.
 * Maps external trend source data into the internal Topic model fields.
 */
export interface TrendTopicDto {
  /** Topic name / title as returned by the trend source */
  name: string;

  /** Optional description or snippet from the source */
  description?: string;

  /** Identifier of the trend source (e.g. 'google-trends', 'twitter-trends') */
  sourceName: string;

  /** Inferred or default topic type */
  type: TopicType;

  /** Optional tags extracted from the source */
  tags?: string[];

  /** Optional relevant dates (ISO strings) associated with the trend */
  relevantDates?: string[];

  /** Raw payload from the external source, kept for debugging */
  rawPayload?: Record<string, unknown>;
}
