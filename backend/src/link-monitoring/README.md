# Link Monitoring Module

This module handles detection and management of broken affiliate links.

## Features

- Periodic link checking
- Broken-link detection
- Incident creation and management
- Incident assignment to users
- Resolution tracking

## Entities

- `LinkRecord` - Monitored link record
- `LinkIncident` - Broken-link incident

## Services

- `LinkMonitoringService` - Link checking and incident management

## Controllers

- `LinkIncidentController` - Incident CRUD endpoints
