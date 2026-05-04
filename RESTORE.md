# RESTORE.md — Disaster Recovery Guide

**Last updated:** 4 May 2026
**Owner:** Urvil Bumiya
**Purpose:** Step-by-step instructions to fully recover Auric Mirror and Codex from zero — whether the Mac died, files got deleted, GitHub repos were lost, or you're setting up a new machine.

> **Where this file lives:**
> - Primary: Google Drive (personal, `bumiya.urvil@gmail.com`) → `My Drive/auric-codex-backups/RESTORE.md`
> - Secondary: inside each repo as `RESTORE.md` (committed, lives forever in git history)
>
> **If you lose everything except this file — start with §1.**

---

## TABLE OF CONTENTS

1. [What you need before starting](#1-what-you-need-before-starting)
2. [Diagnose: what did you actually lose?](#2-diagnose-what-did-you-actually-lose)
3. [Scenario A — Mac is gone or wiped](#3-scenario-a--mac-is-gone-or-wiped)
4. [Scenario B — Local files deleted, GitHub intact](#4-scenario-b--local-files-deleted-github-intact)
5. [Scenario C — GitHub repos lost or corrupted, Google Drive backup intact](#5-scenario-c--github-repos-lost-or-corrupted-google-drive-backup-intact)
6. [Scenario D — Everything is gone except this RESTORE.md](#6-scenario-d--everything-is-gone-except-this-restoremd)
7. [Scenario E — Vercel deploy is broken](#7-scenario-e--vercel-deploy-is-broken)
8. [Scenario F — Bot commit email got changed](#8-scenario-f--bot-commit-email-got-changed)
9. [Scenario G — One file corrupted (rollback to a `.backup_*`)](#9-scenario-g--one-file-corrupted-rollback-to-a-backup_)
10. [Verification checklist after any restore](#10-verification-checklist-after-any-restore)
11. [What this guide can NOT recover](#11-what-this-guide-can-not-recover)

---

## 1. WHAT YOU NEED BEFORE STARTING

Make sure you have these. If any are missing, get them before proceeding.

| Item | Where to find it |
|---|---|
| GitHub login (account: YUV91292) | Email + password manager |
| Google Drive personal account login | `bumiya.urvil@gmail.com` |
| Vercel login | Linked to GitHub OAuth — log in via "Continue with GitHub" |
| Anthropic API key (for Auric Mirror cron) | Anthropic console → API Keys → or check Vercel/GitHub Actions secrets |
| Mac with admin access | The machine you're restoring to |

**Repos to remember:**
- Auric Mirror: `https://github.com/YUV91292/Auric-Mirror`
- Codex: `https://github.com/YUV91292/codex`

**Local paths (use exactly these — never `~/Projects/...`):**
- `~/Downloads/auric-automation/`
- `~/Downloads/codex/`

---

## 2. DIAGNOSE — WHAT DID YOU ACTUALLY LOSE?

Don't start restoring until you know the failure. Answer these in order:

1. **Can you log into GitHub and see both repos?**
   - YES → GitHub is fine. Go to Q2.
   - NO (or repos missing) → Jump to **Scenario C**.

2. **Is your Mac working and you have shell access?**
   - YES → Go to Q3.
   - NO (Mac dead/wiped) → Jump to **Scenario A**.

3. **Are the local repo folders (`~/Downloads/auric-automation/`, `~/Downloads/codex/`) missing or broken?**
   - YES → Jump to **Scenario B**.
   - NO, but a specific file is corrupted → Jump to **Scenario G**.

4. **Is the live site broken (Auric Mirror or Codex showing errors)?**
   - YES → Jump to **Scenario E**.

5. **Did Vercel deploys suddenly start failing with author/email errors?**
   - YES → Jump to **Scenario F**.

If multiple things broke, do scenarios in this order: **C → A → B → E → F → G**. Fix the root layer (GitHub) first, then local, then deploy.

---

## 3. SCENARIO A — MAC IS GONE OR WIPED

**Situation:** New Mac, or factory-reset Mac. No local repos, no SSH keys, nothing.

### Step 1 — Install required tools

Open Terminal and run each block in order. Wait for each to finish before pasting the next.

```bash
# Install Homebrew (Mac package manager)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

After Homebrew installs, follow the on-screen instructions to add it to your PATH (it will print one or two `eval` lines — paste them).

```bash
# Install git, python, and node
brew install git python@3.11 node
```

Verify:
```bash
git --version
python3 --version
node --version
```
You should see versions printed for all three.

### Step 2 — Configure git identity

```bash
git config --global user.name "Urvil"
git config --global user.email "bumiya.urvil@gmail.com"
```

### Step 3 — Authenticate with GitHub

Easiest path: install GitHub CLI and use it to log in.

```bash
brew install gh
gh auth login
```
Follow prompts: choose **GitHub.com** → **HTTPS** → **Y** to authenticate git → **Login with a web browser** → copy the one-time code, hit Enter, paste code in browser, authorize.

When done:
```bash
gh auth status
```
Should show: `Logged in to github.com account YUV91292`.

### Step 4 — Reinstall Google Drive for Desktop

1. Download from: https://www.google.com/drive/download/
2. Install the .dmg
3. Sign in with `bumiya.urvil@gmail.com`
4. Wait for sync to start (you'll see the Drive icon in the menu bar)

Verify the path exists:
```bash
ls ~/Library/CloudStorage/ | grep bumiya
```
Expected: `GoogleDrive-bumiya.urvil@gmail.com`

### Step 5 — Clone both repos fresh from GitHub

```bash
mkdir -p ~/Downloads
cd ~/Downloads
git clone https://github.com/YUV91292/Auric-Mirror.git auric-automation
git clone https://github.com/YUV91292/codex.git
```

Note: the Auric Mirror repo is named `Auric-Mirror` on GitHub but **must be cloned as `auric-automation`** locally. The trailing `auric-automation` arg in the first command renames it.

### Step 6 — Read HANDOVER.md and confirm state

```bash
cat ~/Downloads/auric-automation/HANDOVER.md | less
```
Press `q` to quit. This tells you the latest version, open items, and current state.

### Step 7 — Restore Anthropic API key for the daily cron

The GitHub Actions cron needs `ANTHROPIC_API_KEY` as a secret. Verify it's still set:

1. Go to https://github.com/YUV91292/Auric-Mirror/settings/secrets/actions
2. Confirm `ANTHROPIC_API_KEY` is listed
3. If missing or expired:
   - Go to https://console.anthropic.com/settings/keys
   - Create a new key
   - Add it back: GitHub → Settings → Secrets → Actions → New repository secret

### Step 8 — Verify Vercel is still connected

1. Go to https://vercel.com/dashboard
2. Log in with GitHub
3. Confirm both projects are listed: `auric-mirror` and `codex` (or `codex-smoky-rho`)
4. If missing: click "Add New" → Project → import from GitHub → select repo → Deploy

### Step 9 — Run verification checklist (§10)

---

## 4. SCENARIO B — LOCAL FILES DELETED, GITHUB INTACT

**Situation:** Mac is fine, but the `~/Downloads/auric-automation/` or `~/Downloads/codex/` folder is gone or broken.

### Step 1 — Re-clone from GitHub

```bash
cd ~/Downloads

# If the folder still exists (broken), rename it as a safety net first:
[ -d auric-automation ] && mv auric-automation auric-automation.broken-$(date +%Y%m%d)
[ -d codex ] && mv codex codex.broken-$(date +%Y%m%d)

git clone https://github.com/YUV91292/Auric-Mirror.git auric-automation
git clone https://github.com/YUV91292/codex.git
```

### Step 2 — Verify integrity

```bash
cd ~/Downloads/auric-automation
git status
git log --oneline -5

cd ~/Downloads/codex
git status
git log --oneline -5
```

`git status` should say `working tree clean` and `branch up to date with origin/main`.
`git log` should show recent commits matching what's on GitHub.

### Step 3 — If you had uncommitted local work that got lost

GitHub only has what was pushed. If you had unpushed changes, check the Google Drive backup — there might be a more recent monthly snapshot. See **Scenario G** to recover individual files from a backup snapshot.

### Step 4 — Run verification checklist (§10)

---

## 5. SCENARIO C — GITHUB REPOS LOST OR CORRUPTED, GOOGLE DRIVE BACKUP INTACT

**Situation:** Worst case for normal recovery. GitHub is gone (account suspended, repo deleted, etc.) but you still have your monthly Google Drive backups.

### Step 1 — Find the most recent backup

```bash
ls ~/Library/CloudStorage/GoogleDrive-bumiya.urvil@gmail.com/My\ Drive/auric-codex-backups/
```
You'll see folders like `auric-mirror-202605/`, `codex-202605/`, `auric-mirror-202606/`, etc. **Pick the most recent month.**

### Step 2 — Copy the backup to your local working directory

```bash
LATEST_MONTH=$(ls ~/Library/CloudStorage/GoogleDrive-bumiya.urvil@gmail.com/My\ Drive/auric-codex-backups/ | grep auric-mirror- | sort -r | head -1 | sed 's/auric-mirror-//')
echo "Restoring from month: $LATEST_MONTH"

GD=~/Library/CloudStorage/GoogleDrive-bumiya.urvil@gmail.com/My\ Drive/auric-codex-backups
cp -R "$GD/auric-mirror-$LATEST_MONTH/Auric-Mirror" ~/Downloads/auric-automation
cp -R "$GD/codex-$LATEST_MONTH/codex" ~/Downloads/codex
```

The backup folders contain full `.git/` directories, so all history is preserved.

### Step 3 — Verify

```bash
cd ~/Downloads/auric-automation
git log --oneline -5
ls src/App.jsx scripts/generate_daily.py HANDOVER.md

cd ~/Downloads/codex
git log --oneline -5
ls index.html api/ HANDOVER.md
```

If files are present and git log shows recent commits, you have a working restore.

### Step 4 — Recreate GitHub repos

1. Go to https://github.com/new
2. Create `Auric-Mirror` (private) — **do not** initialise with README/license/gitignore (you're pushing existing content)
3. Create `codex` (private) — same, empty.

### Step 5 — Push restored content to new GitHub repos

```bash
cd ~/Downloads/auric-automation
git remote set-url origin https://github.com/YUV91292/Auric-Mirror.git
git push -u origin main

cd ~/Downloads/codex
git remote set-url origin https://github.com/YUV91292/codex.git
git push -u origin main
```

### Step 6 — Reconnect Vercel to the new repos

1. Go to https://vercel.com/dashboard
2. Old projects (if listed) will be broken — delete them: Settings → Delete Project
3. "Add New" → Project → import from GitHub → select `Auric-Mirror` → Deploy
4. Same for `codex`
5. Re-add environment variables (Anthropic API key, etc.) — Settings → Environment Variables

### Step 7 — Re-add GitHub Actions secret for cron (Auric Mirror only)

GitHub → `Auric-Mirror` → Settings → Secrets and variables → Actions → New repository secret:
- Name: `ANTHROPIC_API_KEY`
- Value: your key from https://console.anthropic.com/settings/keys

### Step 8 — Run verification checklist (§10)

> ⚠ You'll have lost any work done since the last monthly backup. The HANDOVER.md "Recent state log" inside the backup tells you the last known state.

---

## 6. SCENARIO D — EVERYTHING IS GONE EXCEPT THIS RESTORE.MD

**Situation:** You have access to this file (probably opened from Google Drive on a phone or borrowed laptop) but no Mac, no GitHub, nothing.

This is the "starting from absolute zero" path. It combines Scenario A and Scenario C.

### Step 1 — Get a Mac (or a Linux/Windows machine with WSL)

You can do this on any Unix-like system. Mac is the documented path. On Linux/Windows-WSL, the commands are identical but skip the Homebrew step (use `apt install git python3 nodejs` instead).

### Step 2 — Run Scenario A steps 1–4 (install tools, configure git, install Drive)

Once Google Drive for Desktop syncs, you'll have the backups locally. **At this point, you also have HANDOVER.md back via the Drive sync** — read it.

### Step 3 — Decide: GitHub still exists?

- **GitHub exists with repos intact** → Run **Scenario A from Step 5 onward**.
- **GitHub repos lost too** → Run **Scenario C from Step 1 onward**, since you now have the Drive backups locally.

### Step 4 — Re-establish the backup loop

After everything is restored, immediately:
1. Push restored repos to GitHub (Scenario C steps 4-5)
2. Take a fresh Google Drive backup using the command in §11.4 of HANDOVER.md (or §3 below)
3. Update HANDOVER.md "Recent state log" with what you just did

---

## 7. SCENARIO E — VERCEL DEPLOY IS BROKEN

**Situation:** GitHub and local files are fine but auric-mirror.vercel.app or codex-smoky-rho.vercel.app shows errors.

### Step 1 — Check Vercel build logs first

1. https://vercel.com/dashboard → click the broken project
2. Click "Deployments" tab
3. Click the most recent deployment → "View Function Logs" or "Build Logs"
4. Read the error message. Common causes:
   - Build failure (syntax error, missing dependency)
   - Environment variable missing
   - Bot commit email mismatch (see Scenario F)

### Step 2 — If it's a build error, roll back

In Vercel:
1. Find the last successful deployment (green check)
2. Click the `⋯` menu → **Promote to Production**
3. Site is now back live on the previous version

Then fix the bad commit locally, test, and redeploy properly.

### Step 3 — If environment variables are missing

Vercel project → Settings → Environment Variables → re-add what's missing (e.g. `ANTHROPIC_API_KEY`). Trigger redeploy: Deployments → latest → `⋯` → Redeploy.

### Step 4 — If Vercel is disconnected from GitHub

Settings → Git → Disconnect → then reconnect to the repo. Vercel will auto-redeploy on next push.

---

## 8. SCENARIO F — BOT COMMIT EMAIL GOT CHANGED

**Situation:** Vercel started rejecting deploys with author/identity errors. This is the documented fragility from HANDOVER.md §4.3.

The required bot commit email is:
```
163722036+YUV91292@users.noreply.github.com
```

### Step 1 — Check what the email is currently

```bash
cd ~/Downloads/auric-automation
git config user.email
```

If it shows anything other than the noreply email above, that's the bug.

### Step 2 — Fix the local config

```bash
git config user.email "163722036+YUV91292@users.noreply.github.com"
```

### Step 3 — Check the GitHub Actions workflow file

```bash
grep -r "user.email" .github/workflows/
```

If the workflow file hardcodes a different email, edit it to use:
```yaml
git config --global user.email "163722036+YUV91292@users.noreply.github.com"
git config --global user.name "github-actions[bot]"
```

Commit and push the fix.

### Step 4 — If past commits have wrong author and Vercel rejects them

```bash
git commit --amend --reset-author --no-edit
git push --force-with-lease
```

⚠ `--force-with-lease` is safer than `--force` but still rewrites history. Do this only on commits that are blocking deploys, not on shared history.

---

## 9. SCENARIO G — ONE FILE CORRUPTED (ROLLBACK TO A `.backup_*`)

**Situation:** A single file (e.g. `App.jsx` or `generate_daily.py`) got broken and you want to revert.

### Option 1 — Roll back via git (preferred)

```bash
cd ~/Downloads/auric-automation
git log --oneline src/App.jsx | head -10           # see history of that file
git checkout <commit-hash> -- src/App.jsx          # restore from that commit
git diff src/App.jsx                                # verify what changed
git add src/App.jsx
git commit -m "fix: revert App.jsx to <commit-hash>"
git push
```

### Option 2 — Roll back via local `.backup_*` file

If you ran the documented deploy workflow, every change has a timestamped backup in the same folder.

```bash
cd ~/Downloads/auric-automation/src
ls App.jsx.backup_*                                 # see backups
cp App.jsx.backup_20260501_140601 App.jsx           # restore one
```

Then commit and push as above.

### Option 3 — Roll back via Google Drive monthly snapshot

For older states (1–12 months back):

```bash
GD=~/Library/CloudStorage/GoogleDrive-bumiya.urvil@gmail.com/My\ Drive/auric-codex-backups
cp "$GD/auric-mirror-202604/Auric-Mirror/src/App.jsx" ~/Downloads/auric-automation/src/App.jsx
```

Then commit and push.

---

## 10. VERIFICATION CHECKLIST AFTER ANY RESTORE

After completing a recovery, run through this list. Don't skip — confirms the restore actually worked end-to-end.

### Local checks
```bash
cd ~/Downloads/auric-automation
git status                                          # should be clean
git log --oneline -3                                # should show recent commits
ls src/App.jsx scripts/generate_daily.py scripts/sky_note.py HANDOVER.md
python3 -c "import ast; ast.parse(open('scripts/generate_daily.py').read())"
echo "Auric Mirror Python: OK"

cd ~/Downloads/codex
git status
git log --oneline -3
ls index.html api/ package.json HANDOVER.md
echo "Codex: OK"
```

### Live site checks
- [ ] https://auric-mirror.vercel.app loads without errors
- [ ] Today's transit content displays (date matches today)
- [ ] Moon section, planet cards, "For You Two Today" tabs all render
- [ ] https://codex-smoky-rho.vercel.app loads without errors
- [ ] Search bar and ASK button work

### Cron and CI checks
- [ ] https://github.com/YUV91292/Auric-Mirror/actions — last "Daily Transit Update" run is green
- [ ] CI test (`test_ephemeris_regression.py`) passing on most recent push

### Backup health checks
- [ ] Google Drive `auric-codex-backups/` folder shows all expected monthly snapshots
- [ ] Each snapshot has both `auric-mirror-YYYYMM/` and `codex-YYYYMM/`

### Update HANDOVER.md
After a successful restore, add a one-line entry to HANDOVER.md §13 ("Recent state log"):
```
2026-MM-DD — Recovered from <scenario> after <event>. All systems verified working.
```
Commit and push.

---

## 11. WHAT THIS GUIDE CAN NOT RECOVER

Be honest about what's irreversible:

| Thing | Can it be recovered? |
|---|---|
| Code in GitHub | ✅ Yes |
| Code from last monthly backup | ✅ Yes |
| Code added between last backup and disaster | ❌ No (lost) |
| Vercel build cache | ❌ No (rebuilds on first deploy) |
| Vercel custom domains | ⚠️ Yes but DNS records may need to be re-pointed |
| GitHub repo stars/issues/comments (if repo deleted) | ❌ No |
| Anthropic API key (if revoked) | ❌ No, but a new one can be generated |
| Past Claude conversations not exported | ❌ No |
| Logs of previous daily_data.json runs | ⚠ Only what's in git history |

This is why §11.3(c) of HANDOVER.md (monthly Claude chat export) and the monthly Google Drive backup both matter — they cover the gaps that GitHub alone doesn't.

---

## 12. CONTACT POINTS IF STUCK

- **GitHub support:** https://support.github.com/
- **Vercel support:** https://vercel.com/help
- **Google Drive support:** https://support.google.com/drive
- **Anthropic console:** https://console.anthropic.com/

---

## CHANGELOG

- **2026-05-04** — Initial RESTORE.md created. Covers Scenarios A–G plus verification checklist.
