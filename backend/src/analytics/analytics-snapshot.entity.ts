import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { CmsPublication } from '../cms/cms-publication.entity';

export enum AnalyticsSource {
  GA4 = 'ga4',
}

@Entity('analytics_snapshots')
export class AnalyticsSnapshot {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => CmsPublication, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'article_id' })
  article: CmsPublication;

  @Column({ type: 'uuid' })
  article_id: string;

  @Column({ type: 'date' })
  date_from: string;

  @Column({ type: 'date' })
  date_to: string;

  @Column({ type: 'int', default: 0 })
  sessions: number;

  @Column({ type: 'int', default: 0 })
  users: number;

  @Column({ type: 'int', default: 0 })
  affiliate_clicks: number;

  @Column({ type: 'decimal', precision: 6, scale: 4, default: 0 })
  ctr: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  avg_time_on_page: number;

  @Column({ type: 'enum', enum: AnalyticsSource, default: AnalyticsSource.GA4 })
  source: AnalyticsSource;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;
}
