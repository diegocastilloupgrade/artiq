export enum TopicSource {
  EXTERNAL = 'external',
  MANUAL = 'manual',
}

export enum TopicType {
  SEASONAL = 'seasonal',
  EVERGREEN = 'evergreen',
  EVENT = 'event',
  OTHER = 'other',
}

export enum TopicStatus {
  CANDIDATE = 'candidate',
  IN_PROGRESS = 'in_progress',
  PUBLISHED = 'published',
  DISCARDED = 'discarded',
}

export interface Topic {
  id: string;
  name: string;
  description?: string;
  source: TopicSource;
  source_name?: string;
  type: TopicType;
  status: TopicStatus;
  priority: number;
  tags?: string[];
  relevant_dates?: string[];
  internal_notes?: string;
  created_at: string;
  updated_at: string;
}
