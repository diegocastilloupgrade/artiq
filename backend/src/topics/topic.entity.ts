import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

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

@Entity('topics')
export class Topic {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ type: 'enum', enum: TopicSource })
  source: TopicSource;

  @Column({ type: 'varchar', length: 255, nullable: true })
  source_name: string | null;

  @Column({ type: 'enum', enum: TopicType })
  type: TopicType;

  @Column({ type: 'enum', enum: TopicStatus, default: TopicStatus.CANDIDATE })
  status: TopicStatus;

  @Column({ type: 'int', default: 0 })
  priority: number;

  @Column({ type: 'simple-array', nullable: true })
  tags: string[] | null;

  @Column({ type: 'simple-array', nullable: true })
  relevant_dates: string[] | null;

  @Column({ type: 'text', nullable: true })
  internal_notes: string | null;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
