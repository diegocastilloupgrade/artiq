# ARTIQ Jira Setup - Quick Start

Complete these steps to get Jira project management running:

## 🎯 Manual Steps (Do in Jira UI)

### 1. Create Project (2 min)

1. Go to: https://duonex-team-pdtnhbxta.atlassian.net/
2. Click **Projects** → **Create project**
3. Select **Scrum** template
4. **Project name**: `ARTIQ` 
5. **Project key**: `ARTIQ` (auto-filled)
6. Click **Create**

### 2. Create Epic (1 min)

In ARTIQ project:
1. Click **Create Issue**
2. Type:
   - Summary: `Build MVP v1`
   - Issue Type: `Epic`
   - Epic Link: (leave empty, this is the epic)
3. Click **Create**

### 3. Create Issues for In-Progress Work (5 min)

Create these 3 issues and link to epic:

**Issue 1 - T-1.03**
- Summary: `Authentication & Roles (T-1.03)`
- Issue Type: `Task`
- Epic Link: `Build MVP v1`
- Description: See JIRA_SETUP.md table, T-1.03 row

**Issue 2 - T-2.01**
- Summary: `Define Domain Entities (T-2.01)`
- Issue Type: `Task`
- Epic Link: `Build MVP v1`

**Issue 3 - T-2.02**
- Summary: `Database Setup & Migrations (T-2.02)`
- Issue Type: `Task`
- Epic Link: `Build MVP v1`

### 4. Configure Workflow Board (3 min)

1. In ARTIQ project → **Project settings** → **Board**
2. Configure columns:
   - To Do
   - In Progress
   - In Review
   - Done

## 🔗 Link GitHub to Jira

### Option A: Auto-Link (Recommended)

1. In GitHub PR, include issue key in title:
   ```
   feat: ARTIQ-1 Add authentication guards
   ```

2. GitHub will auto-detect and link to Jira

### Option B: Manual Link

1. Find issue in Jira (e.g., ARTIQ-1)
2. Click **Link** → **Link pull request**
3. Paste GitHub PR URL

## 📝 Start Using

### When Working on T-1.03 (Authentication):

1. Create branch:
   ```bash
   git checkout -b ARTIQ-1-authentication-roles
   ```

2. Start work on:
   ```
   backend/src/auth/
   ```

3. Create PR with:
   ```
   Title: feat: ARTIQ-1 Implement JWT guards and roles
   ```

4. In Jira: Move issue from "To Do" → "In Progress" → "In Review" → "Done"

## 📊 Check Progress

- Dashboard: https://duonex-team-pdtnhbxta.atlassian.net/software/c/projects/ARTIQ/boards/1
- Backlog: See all tasks and their status
- Issues link directly to GitHub PRs

## ✅ Next Steps After Setup

1. Start T-1.03 (Authentication module)
2. Create ARTIQ-1 issue in Jira
3. Create branch ARTIQ-1-authentication-roles
4. Implement JWT guards, role decorator, login endpoint
5. Create PR linking to ARTIQ-1
6. Merge and issue auto-moves to Done

## 📚 Full Details

See [JIRA_SETUP.md](JIRA_SETUP.md) for:
- Complete task mapping (T-1.01 through T-8.03)
- Bulk issue creation scripts
- Custom fields setup
- Dashboard examples
- Troubleshooting

---

**Cloud**: https://duonex-team-pdtnhbxta.atlassian.net/
**Project**: ARTIQ  
**Key**: ARTIQ-*
