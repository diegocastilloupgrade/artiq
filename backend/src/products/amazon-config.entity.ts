import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('amazon_config')
export class AmazonConfig {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  access_key: string;

  @Column({ type: 'varchar', length: 255 })
  secret_key: string;

  @Column({ type: 'varchar', length: 50, default: 'us-east-1' })
  region: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  associate_tag: string | null;

  @Column({ type: 'varchar', length: 50, nullable: true })
  partner_id: string | null;

  @Column({ type: 'jsonb', nullable: true })
  additional_config: Record<string, unknown> | null;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
