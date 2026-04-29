# Topic Management Specification

## Purpose

This specification defines the functional behavior of the topic management module. It covers creation, import, review, prioritization, and lifecycle of candidate topics used as the basis for article generation.

## Requirement: Topic import from external sources

The system MUST allow importing candidate topics from configured external trend sources.

### Scenario: Import topics from external trend sources

- WHEN an external trend source is configured
- THEN the system SHALL be able to import candidate topics from that source
- AND each imported topic SHALL be stored with at least:
  - name
  - source
  - creation date
  - initial status: `candidate`

## Requirement: Manual topic creation

The system MUST allow internal users to create topics manually.

### Scenario: Create topic manually

- WHEN a Redactor or Administrador creates a topic manually
- THEN the system SHALL allow entry of at least the following fields:
  - name
  - description
  - tags
  - type
  - relevant dates
  - internal comments
- AND the created topic SHALL be stored with status `candidate`

## Requirement: Topic list and filtering

The system MUST provide a navigable, filterable view of all topics.

### Scenario: View topic list

- WHEN a user accesses the topic management view
- THEN the system SHALL display a list of topics
- AND each topic SHALL show at least:
  - name
  - source
  - creation date
  - status
  - type
- AND the list SHALL support filtering by status, date, and type

## Requirement: Topic lifecycle management

The system MUST allow managing the full lifecycle status of a topic.

### Scenario: Update topic status

- WHEN a Redactor reviews a topic
- THEN the system SHALL allow changing the topic status
- AND supported statuses SHALL include at least:
  - `candidate`
  - `in_progress`
  - `published`
  - `discarded`

### Scenario: Prioritize a topic

- WHEN a Redactor marks a topic as prioritized
- THEN the system SHALL store a priority indicator
- AND the topic list SHALL be able to highlight prioritized topics

### Scenario: Discard a topic

- WHEN a Redactor discards a topic
- THEN the system SHALL change its status to `discarded`
- AND the topic SHALL remain accessible in historical views
- AND the system SHOULD allow storing a discard reason

## Requirement: Topic–article relationship

The system MUST maintain an explicit link between topics and generated articles.

### Scenario: Relate topics to articles

- WHEN an article is created from a topic
- THEN the system SHALL keep an explicit relationship between the topic and the generated article
