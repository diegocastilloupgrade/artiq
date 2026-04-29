# Architecture Specification

## Purpose

This specification defines the technical architecture of the Internal Affiliate Content Platform MVP. It establishes the structural decisions, system boundaries, core technologies, and integration constraints that govern implementation across all functional modules.

The platform is designed for internal use only and is intended to validate a scalable affiliate-content operating model.

### Requirement: Overall system architecture

The system MUST be structured as a decoupled platform that supports the operational flow:

topic → product → content → review → publication → measurement

#### Scenario: Separate internal operations from public publishing

- WHEN the platform is implemented
- THEN the internal MVP platform SHALL act as the operational system for editorial workflows
- AND WordPress SHALL act as the editorial CMS and published content source of truth
- AND the public frontend SHALL be decoupled from WordPress theme rendering

#### Scenario: Support modular functional decomposition

- WHEN the system is implemented
- THEN the architecture SHALL support at least the following modules:
  - topic-management
  - affiliate-product-selection
  - assisted-content-generation
  - cms-publication
  - analytics
  - broken-link-monitoring

### Requirement: Technical stack baseline

The system MUST use a stable technical baseline aligned with the MVP objectives of maintainability, editorial operability, and public-site SEO performance.

#### Scenario: Backoffice technology

- WHEN the backoffice is implemented
- THEN Angular SHALL be used as the frontend technology for internal users

#### Scenario: Central backend technology

- WHEN the application backend is implemented
- THEN NestJS SHALL be used as the central API and orchestration layer

#### Scenario: Operational database technology

- WHEN operational persistence is implemented
- THEN PostgreSQL SHALL be used as the primary operational database

#### Scenario: Background processing technology

- WHEN asynchronous jobs are required
- THEN Redis and BullMQ SHALL be used for background processing and scheduled jobs

#### Scenario: Editorial CMS technology

- WHEN the CMS is implemented
- THEN WordPress SHALL be used as the editorial CMS in headless mode

#### Scenario: Public frontend technology

- WHEN the public content site is implemented
- THEN the public frontend SHALL be separated from the backoffice
- AND it SHALL be optimized for SEO and fast content delivery
- AND Astro SHOULD be the preferred first implementation option

### Requirement: Role-based access boundaries

The system MUST define and enforce role-based access boundaries.

#### Scenario: Define backoffice roles

- WHEN a user accesses the backoffice
- THEN the system SHALL recognize at least the following authenticated roles:
  - `admin`
  - `redactor`

#### Scenario: Restrict operations by role

- WHEN a user attempts an action in the backoffice
- THEN the system SHALL allow or deny the action according to the assigned role

#### Scenario: Distinguish public readers from backoffice users

- WHEN the public site is accessed
- THEN readers SHALL consume published content without requiring backoffice access

### Requirement: Core domain model consistency

The system MUST manage a consistent set of core domain entities across modules.

#### Scenario: Core entities

- WHEN the system processes operational data
- THEN the following entities SHALL be recognized and tracked:
  - `Topic`
  - `Product`
  - `ArticleDraft`
  - `ProductPiece`
  - `Article`
  - `CmsPublication`
  - `AnalyticsSnapshot`
  - `LinkRecord`
  - `LinkIncident`
  - `User`

### Requirement: Integration boundaries

The system MUST define explicit integration boundaries with external services.

#### Scenario: Affiliate provider integration

- WHEN the system connects to an affiliate provider
- THEN Amazon SHALL be the first supported provider in the MVP
- AND the integration SHALL be isolated behind an adapter boundary
- AND future providers SHALL be supportable without redesigning the core domain model

#### Scenario: CMS integration

- WHEN the system connects to the CMS
- THEN WordPress access details and content mapping SHALL be configurable
- AND the CMS integration SHALL be isolated behind an adapter boundary

#### Scenario: Analytics integration

- WHEN the system integrates analytics
- THEN Google Analytics 4 SHALL be the primary measurement platform
- AND Google Tag Manager SHALL be the preferred instrumentation layer
- AND analytics retrieval SHALL be isolated behind an adapter boundary

#### Scenario: AI generation integration

- WHEN the system generates article content
- THEN the AI generation provider SHALL be accessed through an adapter boundary
- AND generated content SHALL remain editable before publication

### Requirement: Architecture constraints for MVP

The system MUST preserve the architectural constraints defined for the MVP.

#### Scenario: Use an existing CMS

- WHEN publication architecture is implemented
- THEN the system SHALL use an existing CMS
- AND building a custom CMS SHALL remain out of scope

#### Scenario: Restrict article complexity in MVP

- WHEN article generation is implemented
- THEN the MVP SHALL support only single-product articles

#### Scenario: Restrict analytics architecture in MVP

- WHEN analytics architecture is implemented
- THEN GA4 + GTM SHALL be sufficient for MVP measurement
- AND a first-party analytics pipeline SHALL remain outside the initial implementation