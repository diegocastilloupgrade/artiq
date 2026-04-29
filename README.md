# ARTIQ

Internal affiliate-content MVP managed with OpenSpec.

## Purpose

ARTIQ validates an internal, end-to-end workflow to produce and measure affiliate content:

`topic -> product -> prompts -> content -> review -> publication -> measurement`

The MVP focuses on single-product articles, Amazon as first affiliate provider, publication to an existing CMS, and analytics with GA4 + GTM.

## Repository Structure

- `.github/prompts/`: custom prompt files for OpenSpec workflows.
- `.github/skills/`: skill definitions used in the workflow.
- `openspec/config.yaml`: project context, architecture constraints, and implementation rules.
- `openspec/specs/`: source-of-truth requirements by module.
- `openspec/changes/`: proposed or active changes.
- `openspec/changes/archive/`: archived completed changes.

## OpenSpec Workflow

1. Propose or update a change in `openspec/changes/<change-id>/`.
2. Keep `proposal.md`, `design.md`, and `tasks.md` aligned.
3. Implement in small PRs mapped to tasks.
4. Validate behavior against `openspec/specs/*/spec.md`.
5. Archive completed changes under `openspec/changes/archive/`.

## Current MVP Scope

- Topic management and import from at least one trend source.
- Amazon affiliate product search and single-product selection.
- AI-assisted article draft generation and manual editing.
- Draft handoff to an existing CMS and publication state sync.
- Analytics summary using GA4 + GTM events.
- Broken-link monitoring with incident tracking.

## Collaboration Rules

- Main branch is protected.
- Work through feature branches and Pull Requests.
- Keep changes incremental and traceable to OpenSpec tasks.
- Avoid introducing out-of-scope features without a new approved change.

## Next Implementation Reference

Primary active change:
- `openspec/changes/build-mvp-v1/proposal.md`
- `openspec/changes/build-mvp-v1/design.md`
- `openspec/changes/build-mvp-v1/tasks.md`
