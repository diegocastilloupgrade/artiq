# Change Proposal: build-mvp-v1

## Summary

We propose to implement the first MVP of an internal platform that:

- identifies and manages trending topics,
- selects affiliate products from Amazon for those topics,
- generates AI-assisted single-product articles,
- sends those articles to an existing CMS for publication, and
- measures their performance using GA4 + GTM,

all within the scope and constraints defined in `openspec/specs/product-mvp/spec.md`.

The goal of this change is to deliver a cohesive, end-to-end version of the product that is usable internally and validates the viability of the affiliate-content model before any further expansion.

## Problem

Currently:

- The organization has SEO and affiliate knowledge but **does not operate a content-based affiliate model**.
- Opportunities around trend-driven, high-volume affiliate content are identified but **there is no system that industrializes the flow** from idea to published article.
- Manual flows would not scale: researching trends, finding products, drafting content, publishing and tracking performance are time-consuming, error-prone, and hard to measure.

Without an integrated tool:

- It is difficult to systematically test whether a trend + product + content approach can generate meaningful affiliate revenue.
- The team cannot easily learn which topics and products work best.
- Broken links and product unavailability would be hard to monitor and fix at scale.

## Goals

This change aims to:

1. Deliver an internal, end-to-end MVP implementing the validated flow  
   `topic → product → prompts → content → review → publication → measurement`.

2. Enable the editorial/SEO team to:
   - manage a backlog of candidate topics,
   - quickly find sellable products on Amazon,
   - generate and refine single-product article drafts,
   - publish them through a CMS with minimal friction.

3. Provide basic but actionable analytics:
   - article traffic,
   - affiliate link clicks,
   - simple CTR per article,
   - ability to see which topic–product combinations work better.

4. Reduce operational risk:
   - detect broken affiliate links,
   - expose them to the team for manual correction,
   - prevent readers from hitting dead CTAs in production.

5. Preserve future extensibility:
   - keep affiliate provider integration abstracted (Amazon first, others later),
   - use GA4 + GTM now, while leaving room for a future first-party event pipeline,
   - avoid locking into a custom CMS in this phase.

## In Scope

This change covers implementing, at minimum, the following capabilities defined in `product-mvp/spec.md`:

- Topic management:
  - import topics from at least one external trend source,
  - manual topic creation,
  - topic listing, status changes, priority marking, and discard flow.

- Affiliate product selection (Amazon only in this change):
  - configuration of Amazon affiliate credentials and parameters,
  - product search from a topic or keywords,
  - retrieval of minimum product data,
  - selection of one product per article,
  - reuse of products across articles,
  - provider abstraction that can later support additional networks.

- Assisted content generation:
  - definition of article generation parameters (tone, length, keywords),
  - generation of:
    - suggested title,
    - suggested cover image prompt,
    - article body draft,
    - product piece,
  - incremental draft saving,
  - partial regeneration of sections,
  - application of a single SEO / SEO-for-AI template.

- CMS publication workflow:
  - configuration of one existing CMS (e.g. WordPress or Strapi),
  - sending drafts from the MVP to the CMS in draft state,
  - mapping MVP fields to CMS content fields,
  - reading and reflecting CMS publication state,
  - storing and displaying the public article URL.

- Analytics and measurement:
  - use of GA4 as the primary analytics source,
  - instrumentation via GTM as the preferred mechanism,
  - tracking of affiliate link clicks as explicit events,
  - exposure in the backoffice of per-article metrics:
    - visits/sessions,
    - affiliate clicks,
    - basic CTR,
  - basic filtering by date and (where feasible) topic/category/product.

- Broken-link monitoring:
  - maintaining a catalog of monitored links (affiliate links and key external URLs),
  - periodic checks of those links,
  - creation and management of link incidents (pending, in_review, resolved, discarded),
  - assignment of incidents to users for correction,
  - basic support for rechecking resolved links.

- MVP scope constraints:
  - only single-product articles are supported,
  - only Amazon is required as an affiliate provider,
  - an existing CMS is used (no custom CMS),
  - only one SEO/SEO-for-AI template is supported,
  - content architecture is limited to a single domain with categorization (no advanced cross-linking automation).

## Out of Scope

This change explicitly excludes:

- Any functionality required to expose the platform as a SaaS or product for external clients.
- Support for multiple affiliate networks beyond the first Amazon integration (though the design must not prevent future providers).
- Additional article types such as:
  - multi-product comparison articles,
  - complementary product collections,
  - purely topic-based articles without product focus.
- Building a custom CMS from scratch.
- Advanced SEO template management:
  - multiple SEO/SEO-for-AI templates,
  - per-vertical or per-segment SEO configurations.
- Advanced automatic cross-linking:
  - multi-vertical link-equity optimization,
  - complex internal link recommendation engines.
- A full custom first-party analytics pipeline:
  - GA4 + GTM will be the primary analytics path for the MVP,
  - internal event storage for analytics is reserved for future changes.

## Risks and Assumptions

### Assumptions

- The organization can provide:
  - access and credentials for Amazon affiliate integration,
  - access and credentials for the chosen CMS (WordPress, Strapi, or similar),
  - access to GA4 and GTM containers for the target domain.
- There is at least one internal user acting as Administrador and one as Redactor.
- The team is willing to adopt the defined flow and adjust processes around it.

### Risks

- If Amazon APIs or affiliate mechanisms change significantly, the MVP may require adjustments sooner than expected.
- Relying only on GA4 for analytics could limit the granularity or retention of data for long-term analysis.
- The single-product-only constraint might limit some use cases; however, this is an intentional constraint for the MVP.
- Broken-link checking may introduce false positives (temporary outages); the UX for incident review must handle this gracefully.

## Acceptance Criteria

This change will be considered complete when:

1. A Redactor can, end-to-end:
   - pick or create a topic,
   - find and select an Amazon product,
   - generate and edit a single-product article draft,
   - send it to the CMS as a draft,
   - publish it from the CMS,
   - see the article live at a public URL.

2. An Administrador can:
   - configure trend sources,
   - configure Amazon and CMS integration,
   - configure GA4/GTM analytics parameters where needed,
   - access a dashboard of basic analytics per article,
   - access and manage link incidents.

3. GA4 shows:
   - pageview/visit data for published articles,
   - events representing affiliate link clicks that can be tied back to articles.

4. The MVP platform exposes:
   - per-article analytics summary (visits, affiliate clicks, CTR),
   - a basic broken-link incident view with at least one round-trip from detection to resolution.

5. All implemented behavior conforms to the requirements and scenarios defined in `openspec/specs/product-mvp/spec.md`.