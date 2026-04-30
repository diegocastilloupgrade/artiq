import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ArticleDraft } from './article-draft.entity';
import { Product } from '../products/product.entity';

@Entity('product_pieces')
export class ProductPiece {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => ArticleDraft, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'draft_id' })
  draft: ArticleDraft;

  @Column({ type: 'uuid' })
  draft_id: string;

  @ManyToOne(() => Product, { nullable: false, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column({ type: 'uuid' })
  product_id: string;

  @Column({ type: 'varchar', length: 500 })
  headline: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ type: 'varchar', length: 500, nullable: true })
  image_url: string | null;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  price_snapshot: number | null;

  @Column({ type: 'varchar', length: 100, nullable: true })
  cta_label: string | null;

  @Column({ type: 'varchar', length: 1000 })
  affiliate_url: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  placement_hint: string | null;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
