import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1746000000000 implements MigrationInterface {
  name = 'InitialSchema1746000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Enable UUID generation without extension (PostgreSQL 13+)
    await queryRunner.query(
      `CREATE TYPE "public"."topics_source_enum" AS ENUM('external', 'manual')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."topics_type_enum" AS ENUM('seasonal', 'evergreen', 'event', 'other')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."topics_status_enum" AS ENUM('candidate', 'in_progress', 'published', 'discarded')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."products_provider_enum" AS ENUM('amazon')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."article_drafts_article_type_enum" AS ENUM('single_product')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."article_drafts_status_enum" AS ENUM('draft', 'ready_for_cms', 'sent_to_cms')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."analytics_snapshots_source_enum" AS ENUM('ga4')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."link_records_link_type_enum" AS ENUM('affiliate', 'external')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."link_incidents_status_enum" AS ENUM('pending', 'in_review', 'resolved', 'discarded')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."users_role_enum" AS ENUM('admin', 'redactor', 'lector')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."users_status_enum" AS ENUM('active', 'inactive')`,
    );

    // users
    await queryRunner.query(`
      CREATE TABLE "users" (
        "id" uuid NOT NULL DEFAULT gen_random_uuid(),
        "name" character varying(255) NOT NULL,
        "email" character varying(255) NOT NULL,
        "role" "public"."users_role_enum" NOT NULL,
        "status" "public"."users_status_enum" NOT NULL DEFAULT 'active',
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "UQ_users_email" UNIQUE ("email"),
        CONSTRAINT "PK_users" PRIMARY KEY ("id")
      )
    `);

    // topics
    await queryRunner.query(`
      CREATE TABLE "topics" (
        "id" uuid NOT NULL DEFAULT gen_random_uuid(),
        "name" character varying(255) NOT NULL,
        "description" text,
        "source" "public"."topics_source_enum" NOT NULL,
        "source_name" character varying(255),
        "type" "public"."topics_type_enum" NOT NULL,
        "status" "public"."topics_status_enum" NOT NULL DEFAULT 'candidate',
        "priority" integer NOT NULL DEFAULT 0,
        "tags" text,
        "relevant_dates" text,
        "internal_notes" text,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_topics" PRIMARY KEY ("id")
      )
    `);

    // products
    await queryRunner.query(`
      CREATE TABLE "products" (
        "id" uuid NOT NULL DEFAULT gen_random_uuid(),
        "provider" "public"."products_provider_enum" NOT NULL DEFAULT 'amazon',
        "provider_product_id" character varying(255) NOT NULL,
        "name" character varying(255) NOT NULL,
        "short_description" text,
        "image_url" character varying(500),
        "price" numeric(10,2),
        "currency" character varying(10),
        "availability_status" character varying(100),
        "affiliate_url" character varying(1000) NOT NULL,
        "raw_provider_payload" jsonb,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_products" PRIMARY KEY ("id")
      )
    `);

    // article_drafts
    await queryRunner.query(`
      CREATE TABLE "article_drafts" (
        "id" uuid NOT NULL DEFAULT gen_random_uuid(),
        "topic_id" uuid,
        "product_id" uuid,
        "article_type" "public"."article_drafts_article_type_enum" NOT NULL DEFAULT 'single_product',
        "title" character varying(500) NOT NULL,
        "slug" character varying(500) NOT NULL,
        "cover_image_prompt" text,
        "body_markdown_or_html" text,
        "seo_template_id" character varying(255),
        "tone" character varying(100),
        "length_hint" character varying(50),
        "technical_level" character varying(50),
        "main_keywords" text,
        "secondary_keywords" text,
        "status" "public"."article_drafts_status_enum" NOT NULL DEFAULT 'draft',
        "created_by" character varying(255) NOT NULL,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "UQ_article_drafts_slug" UNIQUE ("slug"),
        CONSTRAINT "PK_article_drafts" PRIMARY KEY ("id")
      )
    `);

    // product_pieces
    await queryRunner.query(`
      CREATE TABLE "product_pieces" (
        "id" uuid NOT NULL DEFAULT gen_random_uuid(),
        "draft_id" uuid NOT NULL,
        "product_id" uuid NOT NULL,
        "headline" character varying(500) NOT NULL,
        "description" text,
        "image_url" character varying(500),
        "price_snapshot" numeric(10,2),
        "cta_label" character varying(100),
        "affiliate_url" character varying(1000) NOT NULL,
        "placement_hint" character varying(100),
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_product_pieces" PRIMARY KEY ("id")
      )
    `);

    // cms_publications
    await queryRunner.query(`
      CREATE TABLE "cms_publications" (
        "id" uuid NOT NULL DEFAULT gen_random_uuid(),
        "draft_id" uuid NOT NULL,
        "cms_provider" character varying(100) NOT NULL DEFAULT 'wordpress',
        "cms_entry_id" character varying(255),
        "cms_status" character varying(100),
        "public_url" character varying(1000),
        "published_at" TIMESTAMP,
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "UQ_cms_publications_draft_id" UNIQUE ("draft_id"),
        CONSTRAINT "PK_cms_publications" PRIMARY KEY ("id")
      )
    `);

    // analytics_snapshots
    await queryRunner.query(`
      CREATE TABLE "analytics_snapshots" (
        "id" uuid NOT NULL DEFAULT gen_random_uuid(),
        "article_id" uuid NOT NULL,
        "date_from" date NOT NULL,
        "date_to" date NOT NULL,
        "sessions" integer NOT NULL DEFAULT 0,
        "users" integer NOT NULL DEFAULT 0,
        "affiliate_clicks" integer NOT NULL DEFAULT 0,
        "ctr" numeric(6,4) NOT NULL DEFAULT 0,
        "avg_time_on_page" numeric(10,2) NOT NULL DEFAULT 0,
        "source" "public"."analytics_snapshots_source_enum" NOT NULL DEFAULT 'ga4',
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_analytics_snapshots" PRIMARY KEY ("id")
      )
    `);

    // link_records
    await queryRunner.query(`
      CREATE TABLE "link_records" (
        "id" uuid NOT NULL DEFAULT gen_random_uuid(),
        "article_id" uuid NOT NULL,
        "draft_id" uuid,
        "product_piece_id" uuid,
        "url" character varying(1000) NOT NULL,
        "link_type" "public"."link_records_link_type_enum" NOT NULL,
        "last_checked_at" TIMESTAMP,
        "last_status" character varying(50),
        "last_error_type" character varying(100),
        CONSTRAINT "PK_link_records" PRIMARY KEY ("id")
      )
    `);

    // link_incidents
    await queryRunner.query(`
      CREATE TABLE "link_incidents" (
        "id" uuid NOT NULL DEFAULT gen_random_uuid(),
        "link_record_id" uuid NOT NULL,
        "article_id" uuid NOT NULL,
        "assigned_to" character varying(255),
        "status" "public"."link_incidents_status_enum" NOT NULL DEFAULT 'pending',
        "error_type" character varying(100),
        "detected_at" TIMESTAMP NOT NULL DEFAULT now(),
        "resolved_at" TIMESTAMP,
        "resolution_notes" text,
        CONSTRAINT "PK_link_incidents" PRIMARY KEY ("id")
      )
    `);

    // Foreign keys: article_drafts → topics, products
    await queryRunner.query(
      `ALTER TABLE "article_drafts" ADD CONSTRAINT "FK_article_drafts_topic_id" FOREIGN KEY ("topic_id") REFERENCES "topics"("id") ON DELETE SET NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "article_drafts" ADD CONSTRAINT "FK_article_drafts_product_id" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE SET NULL`,
    );

    // Foreign keys: product_pieces → article_drafts, products
    await queryRunner.query(
      `ALTER TABLE "product_pieces" ADD CONSTRAINT "FK_product_pieces_draft_id" FOREIGN KEY ("draft_id") REFERENCES "article_drafts"("id") ON DELETE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_pieces" ADD CONSTRAINT "FK_product_pieces_product_id" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT`,
    );

    // Foreign keys: cms_publications → article_drafts
    await queryRunner.query(
      `ALTER TABLE "cms_publications" ADD CONSTRAINT "FK_cms_publications_draft_id" FOREIGN KEY ("draft_id") REFERENCES "article_drafts"("id") ON DELETE RESTRICT`,
    );

    // Foreign keys: analytics_snapshots → cms_publications
    await queryRunner.query(
      `ALTER TABLE "analytics_snapshots" ADD CONSTRAINT "FK_analytics_snapshots_article_id" FOREIGN KEY ("article_id") REFERENCES "cms_publications"("id") ON DELETE CASCADE`,
    );

    // Foreign keys: link_records → cms_publications, article_drafts, product_pieces
    await queryRunner.query(
      `ALTER TABLE "link_records" ADD CONSTRAINT "FK_link_records_article_id" FOREIGN KEY ("article_id") REFERENCES "cms_publications"("id") ON DELETE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "link_records" ADD CONSTRAINT "FK_link_records_draft_id" FOREIGN KEY ("draft_id") REFERENCES "article_drafts"("id") ON DELETE SET NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "link_records" ADD CONSTRAINT "FK_link_records_product_piece_id" FOREIGN KEY ("product_piece_id") REFERENCES "product_pieces"("id") ON DELETE SET NULL`,
    );

    // Foreign keys: link_incidents → link_records, cms_publications
    await queryRunner.query(
      `ALTER TABLE "link_incidents" ADD CONSTRAINT "FK_link_incidents_link_record_id" FOREIGN KEY ("link_record_id") REFERENCES "link_records"("id") ON DELETE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "link_incidents" ADD CONSTRAINT "FK_link_incidents_article_id" FOREIGN KEY ("article_id") REFERENCES "cms_publications"("id") ON DELETE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop FK constraints (reverse order of creation)
    await queryRunner.query(
      `ALTER TABLE "link_incidents" DROP CONSTRAINT "FK_link_incidents_article_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "link_incidents" DROP CONSTRAINT "FK_link_incidents_link_record_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "link_records" DROP CONSTRAINT "FK_link_records_product_piece_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "link_records" DROP CONSTRAINT "FK_link_records_draft_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "link_records" DROP CONSTRAINT "FK_link_records_article_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "analytics_snapshots" DROP CONSTRAINT "FK_analytics_snapshots_article_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "cms_publications" DROP CONSTRAINT "FK_cms_publications_draft_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_pieces" DROP CONSTRAINT "FK_product_pieces_product_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_pieces" DROP CONSTRAINT "FK_product_pieces_draft_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "article_drafts" DROP CONSTRAINT "FK_article_drafts_product_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "article_drafts" DROP CONSTRAINT "FK_article_drafts_topic_id"`,
    );

    // Drop tables (reverse dependency order)
    await queryRunner.query(`DROP TABLE "link_incidents"`);
    await queryRunner.query(`DROP TABLE "link_records"`);
    await queryRunner.query(`DROP TABLE "analytics_snapshots"`);
    await queryRunner.query(`DROP TABLE "cms_publications"`);
    await queryRunner.query(`DROP TABLE "product_pieces"`);
    await queryRunner.query(`DROP TABLE "article_drafts"`);
    await queryRunner.query(`DROP TABLE "products"`);
    await queryRunner.query(`DROP TABLE "topics"`);
    await queryRunner.query(`DROP TABLE "users"`);

    // Drop enum types
    await queryRunner.query(`DROP TYPE "public"."users_status_enum"`);
    await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
    await queryRunner.query(`DROP TYPE "public"."link_incidents_status_enum"`);
    await queryRunner.query(`DROP TYPE "public"."link_records_link_type_enum"`);
    await queryRunner.query(
      `DROP TYPE "public"."analytics_snapshots_source_enum"`,
    );
    await queryRunner.query(`DROP TYPE "public"."article_drafts_status_enum"`);
    await queryRunner.query(
      `DROP TYPE "public"."article_drafts_article_type_enum"`,
    );
    await queryRunner.query(`DROP TYPE "public"."products_provider_enum"`);
    await queryRunner.query(`DROP TYPE "public"."topics_status_enum"`);
    await queryRunner.query(`DROP TYPE "public"."topics_type_enum"`);
    await queryRunner.query(`DROP TYPE "public"."topics_source_enum"`);
  }
}
