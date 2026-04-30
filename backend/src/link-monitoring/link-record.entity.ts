import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { CmsPublication } from '../cms/cms-publication.entity';
import { ArticleDraft } from '../drafts/article-draft.entity';
import { ProductPiece } from '../drafts/product-piece.entity';

export enum LinkType {
  AFFILIATE = 'affiliate',
  EXTERNAL = 'external',
}

@Entity('link_records')
export class LinkRecord {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => CmsPublication, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'article_id' })
  article: CmsPublication;

  @Column({ type: 'uuid' })
  article_id: string;

  @ManyToOne(() => ArticleDraft, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'draft_id' })
  draft: ArticleDraft | null;

  @Column({ type: 'uuid', nullable: true })
  draft_id: string | null;

  @ManyToOne(() => ProductPiece, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'product_piece_id' })
  product_piece: ProductPiece | null;

  @Column({ type: 'uuid', nullable: true })
  product_piece_id: string | null;

  @Column({ type: 'varchar', length: 1000 })
  url: string;

  @Column({ type: 'enum', enum: LinkType })
  link_type: LinkType;

  @Column({ type: 'timestamp', nullable: true })
  last_checked_at: Date | null;

  @Column({ type: 'varchar', length: 50, nullable: true })
  last_status: string | null;

  @Column({ type: 'varchar', length: 100, nullable: true })
  last_error_type: string | null;
}
