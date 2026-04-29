# CMS Module

This module handles publication workflow integration with an existing CMS.

## Features

- CMS configuration (WordPress, Strapi, etc.)
- Draft-to-CMS handoff
- Publication status tracking
- Public URL retrieval

## Entities

- `CmsPublication` - CMS publication record

## Services

- `CmsService` - CMS integration
- `CmsAdapter` - CMS-specific adapter pattern

## Controllers

- `CmsController` - Publication status endpoints
