# CMS Publication Specification

## Purpose

This specification defines the functional behavior of the CMS publication module. It covers CMS configuration, article transfer, publication state reflection, and public URL management.

The CMS acts as the source of truth for published content. The MVP platform acts as the upstream operational system for content preparation.

### Requirement: CMS configuration

The system MUST allow an Administrador to configure the destination CMS.

#### Scenario: Configure destination CMS

- WHEN an Administrador configures the CMS
- THEN the system SHALL allow storing the CMS endpoint, credentials, and target content model mapping
- AND WordPress SHALL be the initial CMS supported for the MVP

### Requirement: Article transfer to CMS

The system MUST support sending a prepared article draft to the CMS as a draft entry.

#### Scenario: Send article as draft to CMS

- WHEN the Redactor finishes editing the generated article
- THEN the system SHALL send the article to the CMS in draft state
- AND the payload SHALL include at least:
  - title
  - slug
  - body
  - cover image
  - product piece
  - categories and/or tags
  - SEO metadata

### Requirement: Publication state management

The system MUST reflect the publication state of articles as managed in the CMS.

#### Scenario: Keep CMS as publication source of truth

- WHEN the article is published
- THEN the CMS SHALL act as the source of truth for the published content
- AND the MVP platform SHALL act as the upstream operational system for content preparation

#### Scenario: Reflect CMS publication state

- WHEN an article changes state in the CMS
- THEN the MVP platform SHALL be able to reflect at least whether the article is `draft` or `published`

#### Scenario: Provide public article link

- WHEN an article is published in the CMS
- THEN the MVP platform SHALL store and display the public URL of that article