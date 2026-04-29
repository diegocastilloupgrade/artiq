# Design: build-mvp-v1

## Overview

This design describes the technical and functional architecture for the first MVP of the internal affiliate-content platform.

The system is designed to support the validated business flow:

topic → product → prompts → content → review → publication → measurement

The MVP must remain intentionally constrained:

- internal use only,
- single-product articles only,
- Amazon as the first affiliate provider,
- one SEO / SEO-for-AI template,
- one existing CMS as publication target,
- GA4 + GTM as the analytics stack,
- broken-link detection with manual resolution.

The architecture prioritizes:

- fast delivery,
- low operational friction,
- clear traceability between topic, product, draft, article, and analytics,
- future extensibility without overengineering the first release.

## Design Goals

1. Support the full MVP flow end-to-end using modular components.
2. Keep editorial operations inside the MVP backoffice and use the CMS primarily as publication/storage layer.
3. Preserve decoupling between:
   - topic discovery,
   - affiliate provider integration,
   - content generation,
   - publication,
   - analytics,
   - link monitoring.
4. Ensure all important entities can be traced across the system:
   - topic,
   - product,
   - article,
   - product piece,
   - analytics event context,
   - broken-link incident.
5. Allow future changes without redesigning the domain model:
   - new affiliate providers,
   - new article types,
   - more templates,
   - internal event tracking,
   - richer linking strategies.

## Proposed Architecture

The MVP is organized into six main functional modules:

1. Topic Management
2. Affiliate Product Provider
3. Assisted Content Generation
4. CMS Publication
5. Analytics
6. Broken-Link Monitoring

These modules are orchestrated by the MVP application backoffice.

### High-level flow

1. The system imports or manually creates topics.
2. A Redactor selects a topic.
3. The system searches Amazon products related to that topic.
4. The Redactor selects one product.
5. The system generates an article draft and product piece.
6. The Redactor edits and saves the draft.
7. The system sends the draft to the CMS.
8. The article is published in the CMS.
9. GA4 + GTM collect performance data.
10. A link-monitoring process checks published links and creates incidents if needed.

## Application Structure

The MVP application should be implemented using a layered structure.

### 1. Presentation layer

The backoffice UI should provide the following main views:

- Login / access control
- Topic list and topic detail
- Product search and selection
- Draft article generation and editing
- CMS publication status
- Analytics dashboard
- Broken-link incident dashboard

This layer should remain thin and should delegate all business rules to application/domain services.

### 2. Application / orchestration layer

This layer coordinates the business flow and should contain use-case-oriented services such as:

- `TopicService`
- `AffiliateProductService`
- `DraftGenerationService`
- `CmsPublicationService`
- `AnalyticsService`
- `LinkMonitoringService`

This layer is responsible for:

- validating flow state transitions,
- coordinating external integrations,
- invoking AI generation,
- mapping between internal entities and external systems,
- enforcing MVP scope rules.

### 3. Domain layer

The domain layer should represent the core business entities and rules of the system.

Suggested core entities:

- `Topic`
- `Product`
- `ArticleDraft`
- `Article`
- `ProductPiece`
- `CmsPublication`
- `AnalyticsSnapshot`
- `LinkRecord`
- `LinkIncident`
- `User`

This layer should define:

- statuses,
- relationships,
- business invariants,
- domain-specific validation rules.

### 4. Infrastructure / integration layer

This layer handles integrations with external systems:

- trend source provider(s),
- Amazon affiliate provider,
- AI content generation provider,
- CMS provider,
- GA4 / analytics retrieval layer,
- GTM-related instrumentation support,
- scheduled link-check jobs.

Suggested adapters:

- `TrendSourceAdapter`
- `AffiliateProviderAdapter`
- `AiGenerationAdapter`
- `CmsAdapter`
- `AnalyticsAdapter`
- `LinkCheckerAdapter`

## Domain Model

### Topic

Represents a candidate content opportunity.

Suggested fields:

- `id`
- `name`
- `description`
- `source` (`external`, `manual`)
- `source_name`
- `type` (`seasonal`, `evergreen`, `event`, `other`)
- `status` (`candidate`, `in_progress`, `published`, `discarded`)
- `priority`
- `tags`
- `relevant_dates`
- `internal_notes`
- `created_at`
- `updated_at`

### Product

Represents an affiliate product returned by a provider.

Suggested fields:

- `id`
- `provider` (`amazon`)
- `provider_product_id`
- `name`
- `short_description`
- `image_url`
- `price`
- `currency`
- `availability_status`
- `affiliate_url`
- `raw_provider_payload`
- `created_at`
- `updated_at`

### ArticleDraft

Represents the working article inside the MVP platform before publication.

Suggested fields:

- `id`
- `topic_id`
- `product_id`
- `article_type` (`single_product`)
- `title`
- `slug`
- `cover_image_prompt`
- `body_markdown_or_html`
- `seo_template_id`
- `tone`
- `length_hint`
- `technical_level`
- `main_keywords`
- `secondary_keywords`
- `status` (`draft`, `ready_for_cms`, `sent_to_cms`)
- `created_by`
- `created_at`
- `updated_at`

### ProductPiece

Represents the product CTA block inserted into an article.

Suggested fields:

- `id`
- `draft_id`
- `product_id`
- `headline`
- `description`
- `image_url`
- `price_snapshot`
- `cta_label`
- `affiliate_url`
- `placement_hint`
- `created_at`
- `updated_at`

### Article / CmsPublication

Represents the published output and its relationship with the CMS.

Suggested fields:

- `id`
- `draft_id`
- `cms_provider`
- `cms_entry_id`
- `cms_status`
- `public_url`
- `published_at`
- `updated_at`

### AnalyticsSnapshot

Represents article-level aggregated analytics data exposed in the MVP.

Suggested fields:

- `id`
- `article_id`
- `date_from`
- `date_to`
- `sessions`
- `users`
- `affiliate_clicks`
- `ctr`
- `avg_time_on_page`
- `source` (`ga4`)
- `created_at`

### LinkRecord

Represents a monitored external link.

Suggested fields:

- `id`
- `article_id`
- `draft_id` (optional)
- `product_piece_id` (optional)
- `url`
- `link_type` (`affiliate`, `external`)
- `last_checked_at`
- `last_status`
- `last_error_type`

### LinkIncident

Represents a broken-link issue requiring review.

Suggested fields:

- `id`
- `link_record_id`
- `article_id`
- `assigned_to`
- `status` (`pending`, `in_review`, `resolved`, `discarded`)
- `error_type`
- `detected_at`
- `resolved_at`
- `resolution_notes`

### User

Represents an internal actor.

Suggested fields:

- `id`
- `name`
- `email`
- `role` (`admin`, `redactor`)
- `status`
- `created_at`

## State Transitions

### Topic states

Allowed minimum transitions:

- `candidate` → `in_progress`
- `candidate` → `discarded`
- `in_progress` → `published`
- `in_progress` → `discarded`

The system may allow reopening discarded topics later, but this is optional for the MVP.

### Draft states

Suggested transitions:

- `draft`
- `ready_for_cms`
- `sent_to_cms`

The CMS publication state should be tracked separately in `CmsPublication`.

### Link incident states

Allowed transitions:

- `pending` → `in_review`
- `in_review` → `resolved`
- `in_review` → `discarded`

## Integration Design

## Trend Source Integration

The MVP should support at least one external trend source.

Design decisions:

- trend ingestion should be abstracted behind `TrendSourceAdapter`,
- topics from external sources should be normalized into the internal `Topic` model,
- manual topic creation should use the same `Topic` entity and management flows as imported topics.

This allows the application to start with one source and add others later without changing the topic-management UI or business flow.

## Affiliate Provider Integration

Amazon is the first and only required provider for the MVP.

Design decisions:

- all provider-specific behavior should be hidden behind `AffiliateProviderAdapter`,
- the internal product model must not depend directly on Amazon response structure,
- raw provider payload may be stored for debugging and reconciliation,
- one product is selected per article in the MVP,
- provider abstraction must support future expansion.

This is important because affiliate APIs and constraints may change over time.

## AI Content Generation

The MVP requires AI-assisted generation, but the AI provider should remain replaceable.

Design decisions:

- generation should be invoked through `AiGenerationAdapter`,
- prompts should be composed from:
  - topic data,
  - selected product data,
  - writing parameters,
  - SEO / SEO-for-AI template,
- generated outputs should be stored as editable draft fields,
- human review is always mandatory before publication.

This avoids coupling the product logic to a specific LLM or prompt implementation.

## CMS Integration

The MVP will use an existing CMS such as WordPress or Strapi.

Design decisions:

- CMS integration should be implemented behind `CmsAdapter`,
- the MVP remains the operational workspace for article preparation,
- the CMS is the publication target and source of truth for public content,
- field mapping from internal draft to CMS model must be explicit,
- the system should store the CMS entry ID and public URL after publication.

The first CMS can be chosen based on implementation complexity without changing the domain model.

## Analytics Design

The MVP uses GA4 + GTM.

Design decisions:

- GA4 is the primary analytics source,
- GTM is the preferred instrumentation layer,
- affiliate click tracking should be event-based,
- article pages must be identifiable in analytics by URL and/or stable IDs,
- the MVP should expose article-level aggregated analytics rather than raw event streams.

Suggested minimum event model:

- pageview / session data from GA4
- affiliate click event such as:
  - `affiliate_link_click`

Suggested event parameters where possible:

- article ID or URL
- topic ID
- product ID
- destination domain or URL
- CTA position / piece identifier

Not all of these need to be visible in the first UI, but the instrumentation should be designed with them in mind.

## Broken-Link Monitoring Design

Broken-link monitoring should be implemented as a scheduled process.

Design decisions:

- published affiliate/external links should be registered in `LinkRecord`,
- a periodic job should check them,
- when a check fails under configured rules, a `LinkIncident` should be created,
- incident handling remains manual in the MVP,
- the system should store incident history for operational review.

False positives are expected, so the workflow must support manual discard.

## Editorial Template Design

The MVP supports only one SEO / SEO-for-AI template.

Design decisions:

- the template is a configuration artifact, not a dynamic template-management system,
- all generated drafts should conform to the same structural baseline,
- changes to the template may be made by administrators, but advanced multi-template support is out of scope.

## Security and Access Design

The MVP is an internal tool, but it still requires minimum access controls.

Design decisions:

- users must authenticate before accessing the backoffice,
- role-based authorization must distinguish at least:
  - `admin`
  - `redactor`
- only administrators should manage system-level configuration such as:
  - provider credentials,
  - CMS configuration,
  - analytics configuration,
  - user management
- redactores should operate the editorial workflow but not modify platform-wide technical settings.

## Observability and Auditability

The MVP should include basic operational observability.

Minimum expectations:

- log external integration failures,
- log article send-to-CMS attempts,
- log link-check job runs,
- log analytics retrieval errors,
- store who performed key state changes where feasible.

This is especially important for debugging:
- provider failures,
- CMS publication issues,
- analytics mismatches,
- broken-link false positives.

## Trade-offs

### Why use an existing CMS instead of building one?

Because the goal of the MVP is to validate the affiliate-content model quickly, not to build a full editorial platform from scratch.

### Why use GA4 + GTM instead of building custom analytics immediately?

Because the MVP needs fast implementation and enough visibility to validate article performance. A first-party event pipeline can be added later if justified.

### Why support only single-product articles?

Because it simplifies:
- product selection,
- article structure,
- CTA logic,
- analytics attribution,
- editorial review,
and helps validate the core loop before adding complexity.

### Why abstract providers from day one?

Because provider and integration details are the most likely areas to change:
- trend source
- affiliate provider
- AI generation provider
- CMS
- analytics retrieval mechanism

A modest adapter layer provides flexibility without excessive complexity.

## Open Questions

The following questions should be resolved during implementation or shortly before it:

1. Which CMS will be selected first: WordPress or Strapi?
2. Which external trend source will be used first in production?
3. Which AI generation provider/model will be used for draft generation?
4. How much analytics data will be surfaced directly inside the MVP vs. reviewed in GA4?
5. Will topic scoring be manual-only in the first release, or include a simple automated heuristic?

These questions do not block the functional design but may affect implementation detail and delivery order.

## Implementation Strategy

Implementation should proceed incrementally by capability:

1. Core domain and authentication
2. Topic management
3. Affiliate product integration
4. Draft generation
5. CMS handoff
6. Analytics visibility
7. Broken-link monitoring

Each stage should produce a usable increment and should be testable against the requirements in `openspec/specs/product-mvp/spec.md`.