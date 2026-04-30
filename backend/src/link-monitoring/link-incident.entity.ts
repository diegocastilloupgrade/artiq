import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { LinkRecord } from './link-record.entity';
import { CmsPublication } from '../cms/cms-publication.entity';

export enum LinkIncidentStatus {
  PENDING = 'pending',
  IN_REVIEW = 'in_review',
  RESOLVED = 'resolved',
  DISCARDED = 'discarded',
}

@Entity('link_incidents')
export class LinkIncident {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => LinkRecord, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'link_record_id' })
  link_record: LinkRecord;

  @Column({ type: 'uuid' })
  link_record_id: string;

  @ManyToOne(() => CmsPublication, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'article_id' })
  article: CmsPublication;

  @Column({ type: 'uuid' })
  article_id: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  assigned_to: string | null;

  @Column({
    type: 'enum',
    enum: LinkIncidentStatus,
    default: LinkIncidentStatus.PENDING,
  })
  status: LinkIncidentStatus;

  @Column({ type: 'varchar', length: 100, nullable: true })
  error_type: string | null;

  @CreateDateColumn({ type: 'timestamp' })
  detected_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  resolved_at: Date | null;

  @Column({ type: 'text', nullable: true })
  resolution_notes: string | null;
}
