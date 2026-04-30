import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ArticleDraft } from '../drafts/article-draft.entity';

@Entity('cms_publications')
export class CmsPublication {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => ArticleDraft, { nullable: false, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'draft_id' })
  draft: ArticleDraft;

  @Column({ type: 'uuid', unique: true })
  draft_id: string;

  @Column({ type: 'varchar', length: 100, default: 'wordpress' })
  cms_provider: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  cms_entry_id: string | null;

  @Column({ type: 'varchar', length: 100, nullable: true })
  cms_status: string | null;

  @Column({ type: 'varchar', length: 1000, nullable: true })
  public_url: string | null;

  @Column({ type: 'timestamp', nullable: true })
  published_at: Date | null;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
