# ARTIQ Jira Integration Guide

## Overview

This guide sets up Jira project management for the ARTIQ MVP development using the OpenSpec task breakdown.

**Cloud ID**: https://duonex-team-pdtnhbxta.atlassian.net
**Team**: duonex-team

## Step 1: Create Jira Project

### Manual Setup (Recommended)

1. Go to: https://duonex-team-pdtnhbxta.atlassian.net/projects
2. Click **"Create project"**
3. Select **"Scrum"** board type (suitable for iterative MVP development)
4. Fill in:
   - **Project name**: `ARTIQ`
   - **Project key**: `ARTIQ` (auto-filled)
   - **Project template**: Scrum
5. Click **"Create"**

### Project Settings to Configure

Once created, go to Project Settings:

1. **Access**: Set appropriate team member permissions
2. **Issue Types**: Ensure these exist:
   - Story
   - Task
   - Bug
   - Epic
   - Sub-task
3. **Custom Fields** (Optional but recommended):
   - Add "OpenSpec Task ID" field to track T-1.01, T-1.02, etc.
   - Add "GitHub PR" link field to associate with pull requests

## Step 2: GitHub-Jira Integration

### Enable Jira Integration in GitHub

1. Go to your GitHub repo: https://github.com/diegocastilloupgrade/artiq
2. Settings → Integrations & services
3. Add Jira Cloud integration:
   - Workspace: `duonex-team`
   - Organization: Your Atlassian organization

### Link PRs to Jira Issues

When creating PRs in GitHub, include Jira issue key in branch name or PR title:

```bash
# Branch naming pattern
git checkout -b ARTIQ-123-feature-description

# PR title
feat: ARTIQ-123 Add feature
```

GitHub will auto-link to Jira issue.

## Step 3: Create Epic for MVP

In Jira (ARTIQ project):

1. Create Epic: **"Build MVP v1"**
2. Link it to the overall change `build-mvp-v1`

All subsequent issues will be linked to this epic.

## Step 4: Create Issues from OpenSpec Tasks

The following table maps OpenSpec tasks to Jira issues.

### Section 1: Project and Infrastructure Setup

| OpenSpec Task | Issue Type | Title | Description | Status |
|---|---|---|---|---|
| T-1.01 | Task | Project structure setup | Initialize repository, folders, config | ✅ DONE |
| T-1.02 | Task | Configuration management | ConfigService, env-based config | ✅ DONE |
| T-1.03 | Task | Authentication & roles | JWT, guards, role-based access | To Do |

### Section 2: Domain Model and Persistence

| OpenSpec Task | Issue Type | Title | Description | Status |
|---|---|---|---|---|
| T-2.01 | Task | Define domain entities | Topic, Product, Article, etc. | To Do |
| T-2.02 | Task | Database setup & migrations | TypeORM, PostgreSQL | To Do |
| T-2.03 | Task | Implement repositories | CRUD for all entities | To Do |

### Section 3: Topic Management

| OpenSpec Task | Issue Type | Title | Description | Status |
|---|---|---|---|---|
| T-3.01 | Task | Topic CRUD endpoints | Create, read, update, delete | To Do |
| T-3.02 | Task | Topic list view (UI) | Angular topic list component | To Do |
| T-3.03 | Task | Topic detail view (UI) | Angular detail + edit | To Do |
| T-3.04 | Task | Trend source adapter | Google Trends integration | To Do |
| T-3.05 | Task | Topic import job | Scheduled import process | To Do |

### Section 4: Affiliate Product Selection

| OpenSpec Task | Issue Type | Title | Description | Status |
|---|---|---|---|---|
| T-4.01 | Task | Affiliate provider config | Amazon credentials UI | To Do |
| T-4.02 | Task | Amazon adapter | Product search integration | To Do |
| T-4.03 | Task | Product search service | Backend endpoint | To Do |
| T-4.04 | Task | Product search UI | Angular component | To Do |
| T-4.05 | Task | Product selection logic | Single-product constraint | To Do |

### Section 5: Assisted Content Generation

| OpenSpec Task | Issue Type | Title | Description | Status |
|---|---|---|---|---|
| T-5.01 | Task | Generation parameters model | Tone, length, keywords | To Do |
| T-5.02 | Task | AI generation adapter | OpenAI integration | To Do |
| T-5.03 | Task | Draft creation service | Topic + Product → Draft | To Do |
| T-5.04 | Task | Generate draft content | Title, image prompt, body | To Do |
| T-5.05 | Task | Draft editing UI | Angular editor component | To Do |
| T-5.06 | Task | Partial regeneration UI | Section-level regeneration | To Do |
| T-5.07 | Task | Enforce SEO template | Single template constraint | To Do |

### Section 6: CMS Publication

| OpenSpec Task | Issue Type | Title | Description | Status |
|---|---|---|---|---|
| T-6.01 | Task | CMS adapter abstraction | WordPress/Strapi support | To Do |
| T-6.02 | Task | CMS configuration UI | API credentials, endpoints | To Do |
| T-6.03 | Task | Publish draft to CMS | Send to external CMS | To Do |
| T-6.04 | Task | Sync publication status | Track published state | To Do |

### Section 7: Analytics

| OpenSpec Task | Issue Type | Title | Description | Status |
|---|---|---|---|---|
| T-7.01 | Task | GA4 integration | Data retrieval layer | To Do |
| T-7.02 | Task | Analytics service | Metrics calculation | To Do |
| T-7.03 | Task | Analytics dashboard | Frontend dashboard UI | To Do |
| T-7.04 | Task | CTR tracking | Click-through rate metrics | To Do |

### Section 8: Broken Link Monitoring

| OpenSpec Task | Issue Type | Title | Description | Status |
|---|---|---|---|---|
| T-8.01 | Task | Link checker service | Periodic health checks | To Do |
| T-8.02 | Task | Incident management | Create/update incidents | To Do |
| T-8.03 | Task | Incident UI | Dashboard for broken links | To Do |

## Step 5: Create Issues in Jira

### Bulk Creation (Recommended)

Option A: Manual creation in Jira UI
- Go to each section and create issues one by one
- Link to epic "Build MVP v1"
- Assign to yourself

Option B: Use API (if you have permissions)
- I can help automate issue creation via Jira API

### Issue Template

Each issue should include:

**Summary**: Task title from above table

**Description**:
```
**OpenSpec Reference**: T-X.XX

**From**: openspec/changes/build-mvp-v1/tasks.md

**Acceptance Criteria**:
- [Criteria 1]
- [Criteria 2]
- [Criteria 3]

**Related Module**: (e.g., backend/src/auth)

**Implementation Notes**:
[Any specific requirements or design considerations]
```

**Issue Type**: Task

**Epic Link**: Build MVP v1

**Labels**: 
- `backend` or `frontend` (or both)
- `mvp-v1`
- `openspec`

**Assignee**: You

## Step 6: Link GitHub to Jira Issues

When working on a task:

1. Create feature branch with issue key:
   ```bash
   git checkout -b ARTIQ-1-project-structure-setup
   ```

2. In PR title, reference issue:
   ```
   feat: ARTIQ-1 create project structure
   ```

3. In PR description, add:
   ```
   Closes ARTIQ-1
   ```

GitHub will auto-link and Jira will update when PR merges.

## Step 7: Workflow / Board Configuration

### Recommended Workflow States

1. **To Do** - Issue created, not started
2. **In Progress** - Developer working on it
3. **In Review** - PR opened, awaiting review
4. **Done** - PR merged to main

Set this up in Jira:
- Project Settings → Workflows → Customize board

### Board Columns

- To Do
- In Progress
- In Review
- Done

Drag issues between columns as you work.

## Step 8: Sprint Planning (Optional)

If using Sprints:

1. Create Sprint: "Sprint 1 - Foundation (T-1.x)"
2. Add completed tasks (T-1.01, T-1.02) retroactively
3. Add upcoming tasks (T-1.03, T-2.01, T-2.02)
4. Set sprint duration (e.g., 2 weeks)
5. Start sprint

## Common Workflows

### When Starting a New Task

1. Find issue in Jira backlog
2. Create branch: `git checkout -b ARTIQ-123-description`
3. Move issue to "In Progress" on board
4. Commit and push work
5. Create PR with "ARTIQ-123" in title
6. Move issue to "In Review"
7. After PR merge, issue moves to "Done" (via GitHub integration)

### When Reviewing Open PRs

1. Go to Jira board, check "In Review" column
2. Find PR in GitHub
3. Review and approve
4. Merge to main
5. Issue automatically moves to "Done"

### Backlog Grooming

Weekly:
1. Review upcoming tasks in backlog
2. Clarify acceptance criteria
3. Estimate story points (optional, but helpful)
4. Prioritize next sprint

## Dashboard Views

Create custom Jira filters/dashboards:

```jql
# All ARTIQ MVP tasks
project = ARTIQ AND epic = "Build MVP v1"

# Current sprint tasks
project = ARTIQ AND sprint = CLOSED AND status != Done

# Blocked tasks (if you add custom field)
project = ARTIQ AND blocked = true

# Tasks by module
project = ARTIQ AND labels = backend

# Done tasks this week
project = ARTIQ AND updated >= -7d AND status = Done
```

## Troubleshooting

### Issues not appearing in GitHub

1. Verify Jira Cloud integration is enabled in GitHub
2. Check PR/branch includes issue key (ARTIQ-123)
3. Ensure Jira issue exists before creating PR
4. Re-sync: Go to Jira issue → Link pull request manually

### Can't create issues

1. Verify you have "Create Issue" permission in ARTIQ project
2. Check project settings → People & Permissions
3. Ensure issue type exists for "Task"

### PR not auto-closing issue

1. Use exact format: "Closes ARTIQ-123" in PR description
2. Include on separate line
3. Merge PR to ensure it auto-closes
4. Manually update in Jira if needed

## Next Steps

1. Create ARTIQ Scrum project in Jira
2. Configure workflow (To Do → In Progress → In Review → Done)
3. Create epic "Build MVP v1"
4. Create first batch of issues (T-1.03 onwards)
5. Start using Jira board for daily standups and planning
6. Track progress through GitHub PR ↔ Jira issue links

## References

- Jira Scrum Guide: https://www.atlassian.com/software/jira/guides/getting-started
- GitHub-Jira Integration: https://docs.github.com/en/developers/webhooks-and-events/webhooks/creating-webhooks
- OpenSpec Task Breakdown: `openspec/changes/build-mvp-v1/tasks.md`
