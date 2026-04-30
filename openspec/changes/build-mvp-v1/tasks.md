# Tasks: build-mvp-v1

This file lists the implementation tasks required to deliver the MVP described in:
- `openspec/specs/product-mvp/spec.md`
- `openspec/changes/build-mvp-v1/proposal.md`
- `openspec/changes/build-mvp-v1/design.md`

Tasks are grouped by area. They are intended to be implemented incrementally.

---

## 1. Project and infrastructure setup

### T-1.01 – Initialize repository and basic structure

- Create the code repository.
- Add `openspec/specs/product-mvp/spec.md`.
- Add `openspec/changes/build-mvp-v1/{proposal.md, design.md, tasks.md}`.
- Set up base application folders (backend, frontend, infra) according to chosen stack.
- Add basic `.gitignore`, linting, and formatting configuration.

### T-1.02 – Basic configuration management

- Introduce a configuration mechanism for:
  - environment (dev, staging, prod),
  - external endpoints (trend source, Amazon, CMS, GA4, GTM).
- Ensure secrets (keys, tokens) are not stored in code.

### T-1.03 – Authentication and roles (minimal)

- Implement authentication for the backoffice.
- Implement minimum roles:
  - `admin`
  - `redactor`
- Ensure only authenticated users can access the backoffice.
- Ensure role checks exist for admin-only features (configuration, user management).

---

## 2. Domain model and persistence

### T-2.01 – Define core domain entities ✅

- Implement domain models for:
  - `Topic`
  - `Product`
  - `ArticleDraft`
  - `ProductPiece`
  - `Article` / `CmsPublication`
  - `LinkRecord`
  - `LinkIncident`
  - `User`
- Implement in-memory or schema definitions depending on persistence choice.

### T-2.02 – Set up database and migrations ✅

- Choose and configure a database for the MVP.
- Create migrations (or equivalent) for all core tables/collections.
- Ensure basic CRUD operations are possible for core entities.

### T-2.03 – Implement basic repositories ✅

- Implement repository layer (or equivalent) for:
  - Topics
  - Products
  - ArticleDrafts
  - Articles / CmsPublications
  - LinkRecords
  - LinkIncidents
  - Users

---

## 3. Topic management

### T-3.01 – Topic CRUD (manual) ✅

- Implement backend endpoints (or services) to:
  - create a topic manually,
  - read topic list,
  - read topic detail,
  - update topic fields,
  - change topic status,
  - discard topic.
- Implement minimal validation as per spec.

### T-3.02 – Topic list view (backoffice UI) ✅

- Implement a backoffice view that:
  - lists topics with fields: name, source, type, status, priority, created_at,
  - supports filtering by status and type,
  - allows sorting by created_at and priority.

### T-3.03 – Topic detail view

- Implement a view for topic detail:
  - shows full topic data,
  - shows related articles (if any),
  - allows editing fields,
  - allows changing status,
  - allows marking topic as prioritized,
  - allows discarding topic.

### T-3.04 – External trend source adapter (initial)

- Implement a `TrendSourceAdapter` stub for the first trend source.
- Define a method to fetch topics from that source.
- Normalize the data into the internal `Topic` model.

### T-3.05 – Topic import job (initial)

- Implement a simple job/process to:
  - call the `TrendSourceAdapter`,
  - create new topics with status `candidate`,
  - avoid duplicate topics (basic de-duplication rule).

---

## 4. Affiliate product selection (Amazon)

### T-4.01 – Affiliate provider configuration

- Implement a configuration UI and storage for Amazon affiliate:
  - access keys,
  - tracking IDs,
  - region/config parameters.
- Restrict access to Administradores.

### T-4.02 – AffiliateProviderAdapter (Amazon)

- Implement `AffiliateProviderAdapter` with methods such as:
  - `searchProducts(query, options)`,
  - `getProductById(providerProductId)`.
- Map Amazon responses into internal `Product` entities.
- Store raw payload as needed for debugging.

### T-4.03 – Product search from topic

- Implement backend endpoint/service that:
  - receives a topic ID and optional extra keywords,
  - calls `AffiliateProviderAdapter` to retrieve candidate products,
  - returns normalized product data.

### T-4.04 – Product search UI

- Implement backoffice UI in topic context:
  - show candidate products for a topic,
  - display name, image, short description, price, affiliate URL,
  - allow basic filtering (e.g. by price).

### T-4.05 – Product selection for single-product article

- Implement logic to:
  - select exactly one product for a new draft article,
  - persist association topic–product,
  - allow reusing the same product in multiple drafts.

---

## 5. Assisted content generation

### T-5.01 – Define generation parameters model

- Define the set of writing parameters supported:
  - tone,
  - length hint,
  - technical level,
  - main keywords,
  - secondary keywords.
- Add these fields to `ArticleDraft` model.

### T-5.02 – AI generation adapter

- Implement `AiGenerationAdapter` with methods to:
  - generate title,
  - generate cover image prompt,
  - generate article body,
  - regenerate selected sections.
- Define prompt-building logic using:
  - topic data,
  - product data,
  - writing parameters,
  - SEO/SEO-for-AI template.

### T-5.03 – Draft creation from topic + product

- Implement a service to:
  - create an `ArticleDraft` given a topic and a product,
  - store initial draft record with linkage to topic and product,
  - initialize status as `draft`.

### T-5.04 – Generate draft content

- Implement a use case to:
  - take an existing draft,
  - call the AI adapter to:
    - generate suggested title,
    - generate suggested cover image prompt,
    - generate body content,
    - generate product piece content,
  - update the draft and product piece in storage.

### T-5.05 – Draft editing UI

- Implement UI for:
  - viewing and editing draft fields:
    - title,
    - cover image prompt,
    - body content,
    - writing parameters,
    - product piece text fields,
  - saving changes incrementally.

### T-5.06 – Partial regeneration UI

- Implement UI controls to:
  - request regeneration of specific sections (e.g. introduction, conclusion),
  - update only the selected sections in the draft.

### T-5.07 – Enforce single SEO template

- Implement configuration for a single SEO/SEO-for-AI template.
- Ensure generation logic uses this template.
- Ensure drafts carry template identification (even if only one template exists).

---

## 6. CMS publication workflow

### T-6.01 – CMS adapter configuration

- Implement configuration UI and storage for CMS integration:
  - base URL,
  - credentials/API keys,
  - target content model mapping.
- Restrict access to Administradores.

### T-6.02 – CmsAdapter abstraction

- Implement `CmsAdapter` interface with methods:
  - `createDraftArticle(draftPayload)`,
  - `updateDraftArticle(cmsEntryId, draftPayload)`,
  - `getArticleStatus(cmsEntryId)`.
- Implement initial adapter for the chosen CMS (WordPress or Strapi).

### T-6.03 – Draft → CMS mapping

- Implement mapping logic from `ArticleDraft` + `ProductPiece` to CMS fields:
  - title,
  - slug,
  - body (HTML/Markdown),
  - cover image reference,
  - product piece representation,
  - categories/tags,
  - SEO metadata.

### T-6.04 – Send draft to CMS

- Implement service to:
  - send a draft to the CMS,
  - create/update CMS entry in draft state,
  - store `cms_entry_id` and initial `cms_status`,
  - update `Article` / `CmsPublication` entity.

### T-6.05 – Publication status sync

- Implement a mechanism to:
  - query CMS for article status,
  - update `CmsPublication` with:
    - current CMS status,
    - published_at when applicable,
    - public URL (if not known already).

### T-6.06 – Draft publication UI

- Implement backoffice UI to:
  - show CMS state for each draft/article,
  - provide a link to open the article in the CMS,
  - show the public URL once the article is published.

---

## 7. Analytics and GA4 + GTM

### T-7.01 – GA4/GTM configuration documentation

- Document the required GA4 and GTM setup:
  - pageview tracking,
  - affiliate link click event.
- Include example GTM triggers and tags for:
  - outbound link clicks,
  - affiliate link domain patterns.

### T-7.02 – AnalyticsAdapter design

- Implement an `AnalyticsAdapter` interface able to:
  - query GA4 for page-level metrics (e.g. using URL or page path),
  - retrieve a minimal set of metrics:
    - sessions,
    - users,
    - affiliate click events,
    - derived CTR.

### T-7.03 – Article identification strategy

- Define and implement an identification strategy for articles in GA4:
  - URL structure and/or
  - custom event parameters or UTM patterns.
- Ensure the mapping from `Article` (MVP) to GA4 identifiers is documented and implemented.

### T-7.04 – Analytics snapshot service

- Implement a service that:
  - queries GA4 for a given article and date range,
  - computes or retrieves:
    - sessions,
    - users,
    - affiliate clicks,
    - CTR,
  - stores an `AnalyticsSnapshot` record.

### T-7.05 – Analytics dashboard UI

- Implement backoffice UI to:
  - list articles with analytics summary,
  - show topic and product context for each article,
  - allow filtering by date range,
  - optionally filter by topic and category/product.

---

## 8. Broken-link monitoring

### T-8.01 – LinkRecord creation on publication

- Implement logic to:
  - extract relevant external links when an article is published,
  - create `LinkRecord` entries with link type (affiliate, external),
  - link them to the `Article` and, when possible, `ProductPiece`.

### T-8.02 – LinkCheckerAdapter

- Implement `LinkCheckerAdapter` to:
  - perform HTTP checks on a URL,
  - return status code and basic error classification.

### T-8.03 – Link-check job

- Implement a scheduled job to:
  - iterate over `LinkRecord`s,
  - call `LinkCheckerAdapter`,
  - update `LinkRecord.last_checked_at` and `last_status`,
  - create or update `LinkIncident` when errors are detected.

### T-8.04 – LinkIncident creation and updates

- Implement logic to:
  - create `LinkIncident` when a link becomes potentially broken,
  - avoid spamming duplicate incidents for the same link and error type,
  - keep basic history of detection and checks.

### T-8.05 – Broken-link dashboard UI

- Implement backoffice UI to:
  - list link incidents with filters by status, error type, date,
  - show affected article and link,
  - allow assigning an incident to a user,
  - show a shortcut to open the article in the CMS.

### T-8.06 – Incident resolution workflow

- Implement UI and backend logic to:
  - mark incidents as `in_review`, `resolved`, or `discarded`,
  - store resolution notes and timestamps,
  - optionally trigger a re-check after resolution.

---

## 9. QA, validation and polish

### T-9.01 – End-to-end flow test (topic → publication)

- Validate that a Redactor can:
  - create or select a topic,
  - search and select a product,
  - generate and edit a draft,
  - send it to the CMS,
  - publish it,
  - access the public URL from the MVP.

### T-9.02 – Analytics validation

- Validate that:
  - GA4 records pageviews for at least one article,
  - affiliate click events are recorded for that article,
  - the analytics dashboard in the MVP shows the expected numbers.

### T-9.03 – Broken-link validation

- Validate that:
  - at least one broken-link incident is created for a deliberately invalid link,
  - the incident appears in the dashboard,
  - the incident can be assigned and marked as resolved.

### T-9.04 – Role-based access control validation

- Validate that:
  - only admins can access configuration screens (providers, CMS, analytics),
  - redactores can perform editorial workflow but not change system configuration.

### T-9.05 – Spec conformance check

- Cross-check implemented behavior against:
  - `product-mvp/spec.md` requirements and scenarios.
- Identify any gaps or deviations and document them for future changes.
