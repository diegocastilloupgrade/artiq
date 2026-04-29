# Broken Links Specification

## Purpose

This specification defines the functional behavior of the broken-link monitoring module. It covers link catalog management, periodic verification, incident creation, incident details, incident lifecycle, and listing for manual review.

### Requirement: Link catalog

The system MUST maintain a catalog of affiliate and relevant external links to monitor from published articles.

#### Scenario: Maintain a catalog of monitored links

- WHEN an article is published
- THEN the system SHALL register the relevant links that must be monitored

### Requirement: Periodic link verification

The system MUST check registered links periodically and record results.

#### Scenario: Check links periodically

- WHEN the monitoring process runs
- THEN the system SHALL attempt to verify the registered links periodically
- AND the system SHALL record the result of each check

### Requirement: Broken link detection

The system MUST detect when a monitored link is broken or unavailable.

#### Scenario: Detect broken or unavailable links

- WHEN a monitored link returns an error or unavailable result
- THEN the system SHALL create a link incident
- AND the incident SHALL be associated with the affected article and link

### Requirement: Incident management

The system MUST store detailed information for each link incident and support a full incident lifecycle.

#### Scenario: Store incident details

- WHEN a broken-link incident is created
- THEN the incident SHALL include at least:
  - affected article
  - affected URL
  - affected section or piece where possible
  - detected error type
  - detection date

#### Scenario: Manage incident states

- WHEN internal users review a link incident
- THEN the system SHALL support at least the following states:
  - `pending`
  - `in_review`
  - `resolved`
  - `discarded`

#### Scenario: List incidents for review

- WHEN internal users access the broken-link monitoring view
- THEN the system SHALL display the detected link incidents in a list
- AND the list SHALL allow users to review pending incidents without assignment

#### Scenario: Resolve an incident after correction

- WHEN the content associated with an incident has been corrected in the CMS
- THEN a user SHALL be able to mark the incident as `resolved`
- AND the system SHALL record who resolved it and when

#### Scenario: Recheck resolved links (optional)

- WHEN an incident has been marked as `resolved`
- THEN the system SHOULD allow rechecking the affected link
- AND, if the link is still broken, the system MAY reopen or create a new incident