# Auric Mirror + Codex — Handover Doc

**Last updated:** 4 May 2026
**Maintainer:** Urvil
**Purpose:** Single source of truth for resuming work on either project. Paste this file as the **first message** of any new Claude chat. Everything Claude needs to be useful from message one is here.

> **Rule:** This file lives inside the Auric Mirror repo at `~/Downloads/auric-automation/HANDOVER.md` and is committed alongside code. A copy lives in the Codex repo at `~/Downloads/codex/HANDOVER.md`. The two copies stay in sync. **The repo copies are authoritative — not project memory, not Claude's userMemories, not any Google Doc.**

---

## 1. Who I am

I'm **Urvil**. I work with my partner **Veronika**. I'm building two related apps and Claude is my dev partner on both.

Direct, structured, no fluff. I push back; expect Claude to push back too. Mockup → review → ship. Backups before any change. Strategy and Authority before action.

---

## 2. The two sub-projects (route every message)

### 2.1 Auric Mirror — primary, live
- **What it is:** Personal daily Human Design + astrology dashboard for me and Veronika. Daily oracle (push).
- **Live URL:** https://auric-mirror.vercel.app
- **GitHub:** https://github.com/YUV91292/Auric-Mirror (private)
- **Local repo:** `~/Downloads/auric-automation` on my Mac (user `admin`)
  - ⚠ NEVER reference `~/Projects/auric-mirror` — it does not exist.
- **Trigger phrases:** "auric mirror", "the dashboard", "daily oracle", "the moon disc", "mandala", "deploy the site", anything about `daily_data.json`, transits feed, or the Vercel build.

### 2.2 Codex — secondary, live but incomplete
- **What it is:** AI-powered Q&A app on our personal HD/Gene Keys codex. Ask-anything personal reference (pull).
- **Live URL:** https://codex-smoky-rho.vercel.app
- **GitHub:** https://github.com/YUV91292/codex (private, separate repo)
- **Local repo:** `~/Downloads/codex` (clone if not yet there — see §10)
- **Trigger phrases:** "the codex", "codex Q&A", "auto-detection", "routing logic", "starter questions", anything about the Q&A flow or knowledge fallback.

### 2.3 Routing decision tree (Claude reads first)
1. Deploy / daily feed / JSON / moon / mandala / dashboard UI → **Auric Mirror**
2. Q&A logic / chatbot / web vs codex routing / how the codex app answers → **Codex**
3. Real-time HD / relationship / timing question with no app context → **Pure analysis mode** (apply thinking framework in §6)
4. Ambiguous → ASK once: *"Auric Mirror, Codex, or just analysis?"*

---

## 3. Confirmed chart data (DO NOT re-ask)

### 3.1 Urvil
- **Born:** 9 Dec 1992, 5:13 PM, Dohad India (UTC+5:30, Sid.Time 21:53:56)
- **Type:** Manifestor | **Profile:** 1/3 | **Authority:** Emotional Solar Plexus
- **Not-Self:** Anger | **Signature:** Peace
- **Defined Centers:** Head, Ajna, Throat, Solar Plexus, Spleen
- **Open Centers:** G Center, Sacral, Heart/Ego, Root
- **Defined Channels:** 16-48 (Talent), 22-12 (Openness), 11-56 (Curiosity), 47-64 (Abstraction)
- **Design Sun:** 47.3 | **Personality Sun:** 26.1 | **Design Earth:** Gate 38
- **Natal Sun:** Sagittarius 17°39' | **Asc:** Gemini 11°20' | **MC:** Aquarius 26°15'
- **Full natal:** Sun 17°39' Sag H7 | Moon 11°20' Gem H1 | Mercury 26°53' Sco H6 | Venus 0°52' Aqu H9 | Mars 26°51' Can R H2 | Jupiter 10°57' Lib H5 | Saturn 14°12' Aqu H9 | Uranus 16°23' Cap H8 | Neptune 17°32' Cap H8 | Pluto 23°49' Sco H6 | True Node 21°37' Sag R H7 | Chiron 23°34' Leo R H3

### 3.2 Veronika
- **Born:** 3 Jul 1997, 11:00 AM, St. Petersburg (UTC+4 summer, Sid.Time 3:46:31 — **NOT** 4:43:46)
- **Type:** Manifestor | **Profile:** 3/5 | **Authority:** Emotional Solar Plexus | **Definition:** Split
- **Cross:** Right Angle Cross of Tension (39/38 | 21/48)
- **Not-Self:** Anger | **Signature:** Peace
- **Defined Centers:** G Center, Heart/Ego, Throat, Solar Plexus, Root
- **Open Centers:** Head, Ajna, Sacral, Spleen
- **Defined Channels:** 19-49 (Synthesis), 25-51 (Initiation), 22-12 (Openness — shared with Urvil; her Gate 22 via Personality South Node 22.6, Gate 12 via Personality Moon 12.2)
- **Design Sun:** 21.5 | **Personality Sun:** 39.3
- **Natal Sun:** Cancer 11°23' | **Asc:** Virgo 9°17' | **MC:** Taurus 28°53'
- **Full natal:** Sun 11°23' Can H11 | Moon 23°47' Gem H10 (conj MC) | Mercury 20°14' Can R H11 | Venus 5°29' Leo H11 | Mars 6°28' Lib H2 | Jupiter 21°05' Aqu R H6 | Saturn 19°37' Ari H8 | Uranus 7°42' Aqu R H5 | Neptune 29°02' Cap R H5 | Pluto 3°15' Sag R H4 | True Node 22°32' Vir R H1 | Chiron 25°45' Lib H3

### 3.3 Key relational dynamics
- **Provocation lock:** Veronika's Personality Sun (Gate 39 — Provocation) directly activates Urvil's Design Earth (Gate 38). **STRUCTURAL, not situational.** Permanent provocation frequency. Awareness > reaction.
- **Shared definition:** Channel 22-12 (Openness) is defined in both of us.
- **Both Emotional Manifestors:** No in-the-moment clarity for either. Wave-waiting is protective for both. Reactive decisions made at emotional peaks are a known risk pattern, especially under heavy transits.
- **19-49 sensitivity:** Veronika's Channel 19-49 makes her threshold-sensitive to fairness and conditions; outer-planet transits amplify intensely.

---

## 4. Auric Mirror — current state (as of 4 May 2026)

### 4.1 Version
**v6.3** — latest tracked commit `5cfa6d3` "feat(v6.3): moon phase boundary fix, planet tap-to-expand, Gene Key arc visualization + structured backend data"

**Rating:** ~9.6/10 (up from 7.2/10 at start of refactor sessions).

### 4.2 Stack
- **Frontend:** single-file React JSX at `src/App.jsx` (~1500 lines)
- **Backend:** Python at `scripts/generate_daily.py` (pyswisseph in Moshier mode for ephemeris + Claude API for interpretations)
- **Sky Note module:** `scripts/sky_note.py` (macro astrology context layer, v6.2 source rewrite shipped)
- **Output:** `public/daily_data.json` (committed to repo, fetched by frontend)
- **Cron:** GitHub Actions runs `generate_daily.py` daily at **5am UAE / 1am UTC** → writes new `daily_data.json` → Vercel auto-deploys
- **CI:** `scripts/test_ephemeris_regression.py` runs on every push to `main` and on PRs — catches accuracy regressions like the Julian Day offset bug fixed earlier

### 4.3 Critical config — NEVER change
- **Bot commit email:** `163722036+YUV91292@users.noreply.github.com` (changing this breaks Vercel deploys)
- **Backup files** in `scripts/` and `src/` named `*.backup_*` — never delete
- **Local path:** `~/Downloads/auric-automation` — never `~/Projects/auric-mirror`
- **Push rejections** resolved ONLY via `git pull --rebase && git push`

### 4.4 Major sections of the dashboard
1. Hero (date, names, theme, verdict pill, sun-sign flavor)
2. This Week alert strip
3. Moon section (phase + meaning + 8-phase strip)
4. Resonance card (silent unless transits hit Gate 22/12 or 39 — shared channel + provocation alerts)
5. Sky Note (only when active — coach-tone complete sentences)
6. **For You Two Today** — 3 tabs (Urvil / Veronika / Together), merged from old Right Now + What Today Means + buried "You Two Today"
7. Today's Field (mandala + planet cards, tap-to-expand interpretations)
8. Today's Move (5 numbered actions, tap to expand reasoning)
9. Daily Affirmation
10. Dates to Watch (collapsed accordion)
11. Today's Learning (Urvil/Veronika tabs, no-repeat shuffle rotation)
12. Reference (collapsed — charts + wiring only)
13. Consult the Auric Mirror

### 4.5 Backend prompt rules in `generate_daily.py`
- **Rules 1–15:** section accuracy, content boundaries, sun-sign plain English, chart center accuracy
- **Rule 16:** Plain English audit (banned jargon-soup phrases listed)
- **Rule 17:** Gene Key arc accuracy (authoritative Shadow/Gift/Siddhi triads)

### 4.6 Known fragilities
- **pyswisseph in CI** had a systematic +2.0 Julian Day offset (Ubuntu/Moshier mode). Always verify planet gate outputs against known positions after any environment change.
- **Sky Note source rewrite** shipped in v6.2; the older frontend `interpretSkyNote` band-aid in `App.jsx` should be removed once v6.3 is verified stable on phone.
- **Macro astrology context comes first.** Every "today" reading must check active major events (stelliums, eclipses, retrogrades, ingresses, outer planet conjunctions, lunar phases, nodal shifts) **before** any HD-level transit interpretation.

### 4.7 Open items — Auric Mirror
- **Verify v6.3 on phone:**
  - Moon phase shows "Waning Gibbous" (not "Full Moon") at 97% waning illumination
  - "What matters today" sub-header gone, planet cards tappable
  - Gene Key arc renders Shadow → Gift → Siddhi (red → gold → sage) with educational primer above
  - Sky Note shows complete coach-tone sentence + action
- **Manual cron trigger** to refresh today's content with new prompt rules:
  1. https://github.com/YUV91292/Auric-Mirror/actions
  2. "Daily Transit Update" workflow (left sidebar)
  3. "Run workflow" button → branch `main` → green "Run workflow"
  4. Wait ~60s for completion + Vercel redeploy
- **Remove frontend `interpretSkyNote` band-aid** in `App.jsx` once v6.2 source rewrite is confirmed stable.

---

## 5. Codex — current state (as of 4 May 2026)

### 5.1 What's confirmed
- Repo created last week, 6 commits, deployed via Vercel
- **Description:** "Personal Human Design and Gene Keys codex for Urvil & Veronika"
- **Repo structure (from GitHub UI):**
  - `api/` — backend handlers (Node.js, "Initial codex with Ask Anything backend")
  - `apple-touch-icon.png`, `favicon-32.png`, `icon-192.png`, `icon-512.png` — PWA icons
  - `index.html` — single-file frontend
  - `package.json` — Node deps
  - No README

### 5.2 UI features visible from screenshot
- Search bar + "ASK" button
- Source-mode toggle: AUTO / CODEX / WEB
- Context-scope filter buttons: U / V / US / general / ?
- Red sparkle icon

### 5.3 Architecture intent (designed, possibly not all wired)
- **CODEX mode** → personal questions (about us, our charts, our relationship). Should use chart blueprints as authoritative context.
- **WEB mode** → general HD / Gene Keys / astrology knowledge (definitions, history, system mechanics, founders).
- **AUTO mode** → auto-detect:
  - Personal pronouns/names + no general signals → CODEX
  - General signals + no personal signals → WEB
  - Both present → CODEX wins (apply general knowledge → us)
  - Neither → WEB (default)

### 5.4 The actual problem (FIXED 4 May 2026)
**Status: Shipped.** Previously: "Codex AI says I don't have access to the codex content" when asked personal chart questions. Diagnosis was: CODEX-mode prompt had rich interpretive codex content but ZERO structured chart facts. The LLM correctly searched the codex pages, found nothing matching e.g. "Gate 45" (because Gate 45 has no codex page), and said "I don't have access."

**Fix:** Injected a `CHART_BLUEPRINT` constant into the CODEX-mode prompt in `index.html` (inside `callAI`, line ~9145). Blueprint contains verified ground-truth facts for both Urvil and Veronika: type, profile, authority, definition, defined centers, defined channels, defined gates, all 13 planet positions per layer (Personality + Design), cross, plus relational dynamics. Hard rules forbid invention beyond blueprint or codex content. WEB mode unchanged.

**Verified working:** "Is Gate 47 defined in Urvil?" -> yes, with Channel 47-64 reasoning. "Is Gate 45 defined in Urvil?" -> no, lists his defined gates 11/12/16/22/47/48/56/64. "What is Veronika's authority?" -> Emotional, references her 19-49 fairness sensitivity. WEB mode: "Who founded HD?" -> Ra Uru Hu, untouched.

### 5.5 Architecture (live, post-fix)

**Where the chart blueprint lives:** `index.html`, inside `async function callAI(question, mode, codexContext)`, in the `if (isCodexMode)` branch. Constant named `CHART_BLUEPRINT`. Roughly 60 lines of structured facts.

**Routing:** `mode` arrives at `callAI` as `'codex'`, `'web'`, or pre-resolved from `'auto'`. AUTO detection happens before `callAI` runs — handles personal-pronoun signals -> CODEX, general-knowledge signals -> WEB.

**Backend (`api/ask.js`):** stays a thin passthrough. Frontend assembles the full prompt (system + blueprint + codex context + question) and sends it as a single string. Backend just calls Anthropic's API. Model: `claude-sonnet-4-6` (current as of Feb 2026; Sonnet 4.7 not yet GA).

**The iterative-hardening pattern:** when the LLM gets an interpretive nuance wrong (not a chart fact — those are anchored), the fix is to tighten the blueprint so the misread is forbidden. Example shipped today: 22-12 channel was framed as "shared with Urvil," which the LLM read as electromagnetic ("only completes when together"). Reality: both have Channel 22-12 fully defined independently — it's a companionship channel that resonates, not completes. Blueprint now spells this out explicitly. Same fix pattern applies for any future interpretive miss: read the wrong answer, identify what the blueprint *implied* that the LLM picked up, rewrite that section to be unambiguous.

**Update flow for blueprint changes:**
1. Edit the `CHART_BLUEPRINT` template literal inside `callAI` (Python `find/replace` on the relevant section is safest — see git history for examples)
2. `node -c api/ask.js` to syntax-check the JS context, even though we're editing index.html (the blueprint is JS)
3. `git add index.html` -> commit -> `git pull --rebase` -> push
4. Test on `codex-smoky-rho.vercel.app` after Vercel rebuild (~60 seconds)

**Stale local copies to ignore (or delete):** `~/Desktop/codex` (no git, no AI code, last touched Apr 23) and `~/Projects/codex` (stale clone, last touched Apr 25). The live working copy is `~/Downloads/codex` only.

---

## 6. Thinking framework (mandatory order)
1. **Human Design mechanics**
2. **Emotional authority and timing**
3. **Relationship dynamics** (if relevant)
4. **Astrology** (context layer)
5. **Gene Keys** (reflection layer)

Never reverse this order.

🔴 **System rule:** for any "today" / "right now" / "this week" reading, BEFORE any HD transit interpretation, check & flag active major astrological events first (stelliums, eclipses, retrogrades, ingresses, outer planet conjunctions, lunar phases, nodal shifts). Macro context before HD-level analysis.

---

## 7. Decision guidance

When asked about action, evaluate:
- emotional clarity (stable or reactive?)
- timing (now vs wait)
- pressure (root / external / internal)
- conditioning (open centers)
- alignment with Strategy

Respond with one of:
- "Act now (if aligned and clear)"
- "Wait for clarity"
- "Inform first, then act"
- "Do not act yet"
- "Observe only"

No vague answers.

---

## 8. Conflict protocol (relationship-level)

Both = Manifestor + Emotional Authority → high independence, strong impact, collision potential without communication.

When tension appears, check in order:
1. Did someone act without informing?
2. Is this emotional timing or real conflict?
3. Is this 39/38 provocation lock?
4. Is this control vs freedom tension?
5. Current transits?

Then: slow down, emphasize clarity, reduce reactivity. Explain root cause → address-now-or-later → navigation path.

---

## 9. The deploy workflow (both repos)

```bash
# AURIC MIRROR:
cd ~/Downloads/auric-automation
# CODEX:
# cd ~/Downloads/codex

git pull --rebase

TIMESTAMP=$(date +%Y%m%d_%H%M%S)
# Backup whatever files are about to change:
cp src/App.jsx src/App.jsx.backup_${TIMESTAMP}
# (and/or) cp scripts/generate_daily.py scripts/generate_daily.py.backup_${TIMESTAMP}
# (and/or) cp scripts/sky_note.py scripts/sky_note.py.backup_${TIMESTAMP}

# Move new file(s) from Downloads:
mv ~/Downloads/App.jsx src/App.jsx
# (and/or other files)

# Stage modified + new backup files:
git add <each file path explicitly>
git status   # verify everything green

# Commit:
git commit -m "feat(vX.X): description of changes"
git push

# If push rejected:
git pull --rebase
git push

# Update HANDOVER.md (see §11) and commit it in the same push when state changed materially.
```

---

## 10. Behavioral rules for Claude

### Always
- Use exact `auric-automation` and `codex` repo paths — never `~/Projects/*`
- Build mockups (HTML files) before any structural redesign — show before code
- Validate JSX syntax with `npx esbuild` before declaring frontend code ready
- Validate Python syntax with `ast.parse` before declaring backend code ready
- Test logic with mock data when changing detection/calculation code
- Write commit messages that describe what changed (not just version bumps)
- Honestly flag fatigue risk and recommend stopping after many ships in one session
- Push back when scope creep would create sloppy work — recommend smaller scopes
- Use the §6 thinking framework order for analysis
- Check macro astrology FIRST for any "today/now" reading
- Distinguish: known / inferred / uncertain
- Default to Strategy and Authority when clarity is low

### Never
- Re-ask for chart data already confirmed in §3
- Generalize across both of us (different charts, different patterns)
- Treat temporary feelings as final truth
- Push immediate action when emotional clarity isn't there
- Fabricate precision when gate-level data isn't available — say so instead
- Bundle unrelated features in one commit
- Skip mockups for IA-level redesigns
- Modify the bot commit email or delete `*.backup_*` files

### Communication style
- Direct, structured, no fluff
- Push back constructively when I'm being overambitious
- Show failure modes explicitly
- Use ask_user_input for decisions — don't make architectural choices unilaterally
- Save items to memory when I reject them, so they don't resurface
- Honest about effort, risk, and scope

---

## 11. Backup, continuity & update ritual

This section is the reason this doc exists. Three layers of redundancy, each solving a different failure mode.

### 11.1 Layer 1 — HANDOVER.md inside each repo (you're reading it)
- Lives at `~/Downloads/auric-automation/HANDOVER.md` and `~/Downloads/codex/HANDOVER.md`
- Travels with code, versioned in git, auto-backed-up via GitHub
- **First thing any future Claude (or future-me) reads.**

### 11.2 Layer 2 — pinned project knowledge in Claude
- This file is also pinned as project knowledge in claude.ai
- Claude project's system prompt points here: *"Authoritative current state lives in HANDOVER.md inside each repo. Read it first."*
- The system prompt is stable architecture; this doc is rolling state. They're separated on purpose.

### 11.3 Layer 3 — backup discipline (three things)

**(a) GitHub is the primary backup.** As long as I push, I'm safe. Risk = uncommitted local work.
**Weekly habit (Sundays):** run `git status` in both repos. If anything is uncommitted, decide: commit or delete. Don't let half-done work sit on disk.

**(b) Off-Mac clone — once a month.** Clone both repos to an external drive or second machine:
```bash
# Pick a backup location:
BACKUP=/Volumes/Backup/auric-backup-$(date +%Y%m)
mkdir -p "$BACKUP"
cd "$BACKUP"
git clone https://github.com/YUV91292/Auric-Mirror.git
git clone https://github.com/YUV91292/codex.git
```
Defends against Mac disk failure.

**(c) Export Claude project chats — once a month.** claude.ai → project → export conversations. Drop the file in `~/Downloads/auric-automation/conversations/` (gitignored — it has private content). This preserves the *reasoning* behind decisions, which doesn't fit in a handover doc.

### 11.4 The update ritual (the part that actually matters)

Documentation only works if updates are cheap. Minimum viable ritual:

**End of every session that changed something material:**
1. Update §13 ("Recent state log") with one bullet, one sentence — most recent on top.
2. Update §4.1 (Auric Mirror version) or §5 (Codex state) if the version or state changed.
3. Update §4.7 / §5.5 if open items shifted.
4. ```bash
   cd ~/Downloads/auric-automation   # or ~/Downloads/codex
   git add HANDOVER.md
   git commit -m "handover: <what changed in one phrase>"
   git push
   ```
5. If a *principle* changed (not just state), tell Claude to update userMemories. Otherwise don't bother — memory is for principles, HANDOVER.md is for state.

**Three steps, ~60 seconds. That's the whole discipline.**

### 11.5 Sanity checklist (run monthly)
- [ ] `git status` clean in both repos
- [ ] Off-Mac clone refreshed within last 30 days
- [ ] Claude project chats exported within last 30 days
- [ ] HANDOVER.md "Last updated" date within last 7 days (if active dev) or last 30 (if dormant)
- [ ] Both `HANDOVER.md` files (Auric + Codex) in sync on shared sections (§§1–3, §6–10)
- [ ] CI green on both repos
- [ ] Vercel deploys green on both projects

---

## 12. Resume checklist for a new chat

1. Read this whole doc.
2. Confirm understanding by recapping (briefly) what state Auric Mirror and Codex are in.
3. Ask:
   - Did v6.3 deploy verify correctly on phone?
   - Did manual cron trigger run? Is today's content fresh?
   - Ready to clone Codex repo and tackle the chart-data injection?
4. Once Codex `api/` files are pasted, design the chart-data injection plan and propose changes.
5. Apply the same mockup → review → ship workflow from §9.
6. **At end of session: update §13 + commit HANDOVER.md.**

---

## 13. Recent state log

> **Update rule:** most recent on top. One bullet, one sentence. Date prefix every entry. Truncate to last 20 entries — older history lives in git log.

- **2026-05-04** — Codex blueprint v4: Verified both charts against authoritative MyHumanDesign / Jenna Zoe PDFs. Found and fixed a hidden bug: Veronika's CHART_BLUEPRINT Cross was wrong (47/22 instead of 21/48) since v1 — codex content pages had it correct, blueprint did not, so LLM was working from a contradiction. Also added for Veronika: Gift 39 (most important Gene Key), Alternating Appetite (Digestion), Kitchens (Environment), Touch (Strongest Sense), same NOT IN BLUEPRINT guards as Urvil. Relational note: both have Environment: Kitchens — doubly-aligned PHS backdrop for shared decisions. Commit: 50a8667.
- **2026-05-04** — Codex blueprint v3: (1) Added Urvil's incarnation cross (Right Angle Cross of Rulership 26/45 | 47/22), most important Gene Key (Gift 26), and PHS Variables block (Determination/Environment/Sense). (2) Caught and fixed a Variable hallucination — LLM substituted Cognition (Observed) for Environment (Kitchens) when answering "what environment is best for me?". Blueprint expanded with explicit PHS labels, NOT IN BLUEPRINT markers for Cognition/Motivation/Perspective, and a new HARD RULES entry forbidding Variable substitution. Iterative-hardening pattern: blueprint tightened to forbid the misread that occurred. Two commits: 8182920 (cross + PHS facts), d8cae3d (Variable hallucination fix).
- **2026-05-04** — Codex personalisation shipped: `CHART_BLUEPRINT` injected into CODEX-mode prompt with verified facts for both charts + relational dynamics. Bug "I don't have access to codex content" resolved. Same-day follow-up: 22-12 channel mechanic corrected from electromagnetic to companionship after first user test. Two commits on `main`. Model string updated `claude-sonnet-4-5` -> `claude-sonnet-4-6` in `api/ask.js`. Iterative-hardening pattern documented in §5.5.
- **2026-05-04** — Created consolidated HANDOVER.md (this doc) covering both Auric Mirror + Codex. Established backup discipline + update ritual (§11). Previous handover dated end of v6.3 session.
- **2026-05-04 (earlier)** — Auric Mirror at v6.3, rating ~9.6/10. Pending: phone verification, manual cron trigger, removal of `interpretSkyNote` band-aid in App.jsx.
- **2026-05-04 (earlier)** — Codex live at codex-smoky-rho.vercel.app but bug confirmed: AI has no chart data injected. Fix path documented in §5.5.
- **Pre-2026-05-04** — Day 2 of intensive Auric Mirror work shipped 11 commits across Rounds 1–5: quick wins, G center bug fix, IA merge to "For You Two Today", moon revert to warm gold, Sky Note source rewrite (v6.2), Gene Key arc, planet tap-to-expand, moon phase boundary fix (v6.3).
- **Pre-2026-05-04** — Day 1 shipped 7 commits across Phases 1–4a: backend/frontend rebuild, IA restructure, regression test added, planet collapse.

---

## 14. Sources of truth (do not re-ask)

These were pasted in previous sessions. Claude should NOT ask for them unless materially changed:

- `scripts/sky_note.py` — fully rewritten in v6.2 (coach tone composer)
- `src/App.jsx` — written iteratively, latest v6.3
- `scripts/generate_daily.py` — written iteratively, latest v6.3
- `scripts/test_ephemeris_regression.py` — written in v5.5, currently passing in CI

For Codex, all `api/` files still need to be pasted (first-time read in next session).

---

## 15. Final note

Memory is on. The userMemories block surfaces high-signal state (current rating, last session summary, what I rejected). **This handover doc supplements memory** with operational details memory doesn't preserve — chart specifics, deploy commands, architecture decisions, the full open-items list, and the backup discipline.

Start any new chat by pasting this entire file. Then we resume.
