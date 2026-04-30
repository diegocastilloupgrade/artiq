import { TrendTopicDto } from './trend-topic.dto';

/**
 * Interface that every trend source adapter must implement.
 * Decouples the import job from any specific external provider.
 */
export interface TrendSourceAdapter {
  /**
   * Unique identifier for this adapter (e.g. 'google-trends').
   */
  readonly sourceName: string;

  /**
   * Fetch trending topics from the external source and normalize them
   * into an array of TrendTopicDto ready to be persisted.
   *
   * @param limit  Maximum number of topics to retrieve. Defaults to adapter-specific value.
   * @returns      Normalized list of trend topics.
   */
  fetchTopics(limit?: number): Promise<TrendTopicDto[]>;
}
