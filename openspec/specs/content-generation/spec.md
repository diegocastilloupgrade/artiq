# Content Generation Specification

## Purpose

This specification defines the functional behavior of the AI-assisted content generation module. It covers the creation of single-product article drafts, writing parameter configuration, content generation (title, body, image prompt, product piece), and incremental editing before CMS publication.

### Requirement: Draft creation

The system MUST allow creating an article draft from a selected topic and product.

#### Scenario: Start draft generation

- WHEN a topic and a product are selected
- THEN the system SHALL allow the Redactor to create a draft article
- AND the draft SHALL not be published automatically

### Requirement: Writing parameter configuration

The system MUST allow the Redactor to configure writing parameters before generating content.

#### Scenario: Define writing parameters

- WHEN the Redactor starts content generation
- THEN the system SHALL allow defining at least:
  - tone
  - approximate length
  - technical level
  - main keywords
  - secondary keywords

### Requirement: Content generation

The system MUST generate a complete article draft including title, body, image prompt, and product piece.

#### Scenario: Generate article title

- WHEN the system generates a draft
- THEN the system SHALL generate a suggested article title
- AND the Redactor SHALL be able to edit it manually

#### Scenario: Generate image prompt

- WHEN the system generates a draft
- THEN the system SHALL generate a suggested prompt for the article cover image
- AND the Redactor SHALL be able to edit it manually

#### Scenario: Generate article body

- WHEN the system generates a draft
- THEN the system SHALL generate a complete draft body for the article
- AND the generated content SHALL follow the configured SEO / SEO-for-AI template structure
- AND the Redactor SHALL be able to edit the content manually

#### Scenario: Generate product piece

- WHEN the selected product is associated with the article
- THEN the system SHALL generate a product piece including at least:
  - product name
  - short description
  - image
  - price
  - CTA
  - affiliate link

### Requirement: Draft editing and saving

The system MUST support iterative editing and incremental saving of drafts.

#### Scenario: Regenerate part of the content

- WHEN the Redactor wants to revise only part of a draft
- THEN the system SHOULD allow regenerating a section without discarding the entire article draft

#### Scenario: Save draft incrementally

- WHEN the Redactor edits a draft
- THEN the system SHALL allow saving intermediate work before sending the article to the CMS

### Requirement: Single SEO template

The system MUST apply a single SEO / SEO-for-AI template in the MVP for generated articles.

#### Scenario: Enforce single SEO template

- WHEN the system generates article content
- THEN the system SHALL apply one configured SEO / SEO-for-AI template
- AND changing the template SHALL be treated as a configuration change, not as per-article logic