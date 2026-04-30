import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Topic } from '../topics/topic.entity';
import { Product } from '../products/product.entity';

export enum ArticleType {
  SINGLE_PRODUCT = 'single_product',
}

export enum ArticleDraftStatus {
  DRAFT = 'draft',
  READY_FOR_CMS = 'ready_for_cms',
  SENT_TO_CMS = 'sent_to_cms',
}

@Entity('article_drafts')
export class ArticleDraft {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Topic, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'topic_id' })
  topic: Topic | null;

  @Column({ type: 'uuid', nullable: true })
  topic_id: string | null;

  @ManyToOne(() => Product, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'product_id' })
  product: Product | null;

  @Column({ type: 'uuid', nullable: true })
  product_id: string | null;

  @Column({
    type: 'enum',
    enum: ArticleType,
    default: ArticleType.SINGLE_PRODUCT,
  })
  article_type: ArticleType;

  @Column({ type: 'varchar', length: 500 })
  title: string;

  @Column({ type: 'varchar', length: 500, unique: true })
  slug: string;

  @Column({ type: 'text', nullable: true })
  cover_image_prompt: string | null;

  @Column({ type: 'text', nullable: true })
  body_markdown_or_html: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  seo_template_id: string | null;

  @Column({ type: 'varchar', length: 100, nullable: true })
  tone: string | null;

  @Column({ type: 'varchar', length: 50, nullable: true })
  length_hint: string | null;

  @Column({ type: 'varchar', length: 50, nullable: true })
  technical_level: string | null;

  @Column({ type: 'simple-array', nullable: true })
  main_keywords: string[] | null;

  @Column({ type: 'simple-array', nullable: true })
  secondary_keywords: string[] | null;

  @Column({
    type: 'enum',
    enum: ArticleDraftStatus,
    default: ArticleDraftStatus.DRAFT,
  })
  status: ArticleDraftStatus;

  @Column({ type: 'varchar', length: 255 })
  created_by: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
