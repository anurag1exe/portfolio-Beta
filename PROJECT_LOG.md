# Portfolio Project Log
Last updated: 2026-11-27 00:41 (local time)
Updated by: Gemini 4 Argon (via Antigravity)

## 0. How to Read This File
This file is the shared memory for the developer (Anurag) and every AI assistant
(Cline, Antigravity, Claude, or any other) that works on this project. Any AI
starting a session must read this file FIRST, follow the rules in Section 8, and
update this file when the session ends (refresh "Last updated", sections 1, 6,
9 and 10, and add a one-line entry to Section 10). Never delete another tool's
entries - append.

## 1. Quick Context (read this first)
Personal developer portfolio for Anurag Kumar ("Think. Build. Repeat."). Built
with Next.js 16 (App Router) + TypeScript + Tailwind CSS v4 + Framer Motion.
It is a single-page scrolling site: a glassmorphic "X-ray reveal" hero fills the
first screen, then numbered sections stack below it - 01 About, 02 Skills,
03 Work (a 3D floating-card gallery with 4 project slots), 04 Experiments
(glass card grid with 3 `// TODO` placeholder entries), and 05 Contact (one
large glass card with real email `anuragkumar9678@gmail.com`, GitHub, LinkedIn,
and a themed back-to-top button). All five sections are built and pass
`npm run build` (exit 0).

**WHERE WE STOPPED (Resume Handoff for Tomorrow - 2026-11-27):**
- **Active Git Repo & Branch:** Two git repos exist (`c:\Users\anura\OneDrive\Desktop\AI workflow` on `master` and `My portfolio/` on `wip-portfolio`). ONLY run git/npm commands inside `My portfolio/`. The old 2026-09-24 scaffold is live on Vercel from `origin/main` (`https://github.com/anurag1exe/My-Portfolio-blog.git`); all new work is committed on `wip-portfolio` (`e4551d9`) and pushed to remote `portfolio-new` (`https://github.com/anurag1exe/portfolio-new.git`, both `wip-portfolio` and `main`). Never push or merge to `origin/main` until the developer says the portfolio is complete.
- **Frozen Hero:** `components/glass-hero.tsx` (292 lines, SHA-256 `F4E59A1EE12320AD62506082F424875D9154F52E2C535AD06918C26CDFE54D94`) is strictly FROZEN.
- **03 Work Current Card Order (`components/sections/work.tsx`):**
  1. **Card 01:** `"GraphOps SOC Workbench"` (badge `"HACKFRONT"`, tags `["Cybersecurity", "Graph Algorithms", "SIEM", "Dijkstra"]`, thumbnail `image: "/images/graphops-thumb.png"`, `githubUrl: "https://github.com/anurag1exe/GraphOPS-omen-hackathon-build"`, `liveUrl: "https://grapsops-omen.vercel.app/"` - keep `"grapsops"` spelling; renders GitHub icon followed immediately by the `"LIVE"` glass pill button in both card footer and expanded overlay).
  2. **Card 02:** Intentionally BLANK card (`title: ""`, `description: ""`, `tags: []`, etc.). Renders only the `"02"` placeholder cover circle, is non-interactive (`aria-label="Coming soon"`, no click/expand overlay, no hover lift). Note: an untracked image `public/images/project card 2.png` exists on disk, not yet wired into code.
  3. **Card 03:** `"Fall Detection System for Senior Citizens"` (badge `"HARDWARE"`, tags `["Arduino", "Python", "FastAPI", "IoT"]`, `githubUrl: "https://github.com/anurag1exe/Fall-detection-for-senior-citizens-running-on-Arduino-uno-Q"`, empty `liveUrl` and `image` so `"03"` placeholder shows).
  4. **Card 04:** `"Python Automation and SQL Projects"` (badge `"Self-directed"`, tags `["Python", "SQL", "Prompt Engineering"]`, links/image still empty `""`).
  - **Archived Projects:** The displaced `"Intelligent Freight Forecasting Dashboard"`, `"Cross-Platform Multiplayer Server"`, and `"Freelance Web Development"` objects are preserved verbatim in a `// ARCHIVED_PROJECTS` comment block at the bottom of `components/sections/work.tsx`.
- **Next Tasks in Queue (Step 5 / Section 9):**
  - **Finish Task C** (if the developer provides data/image for Card 02, 03, or 04) OR move to:
  - **Task D:** Site navbar with smooth-scroll anchors (`#about`, `#skills`, `#work`, `#experiments`, `#contact`) without touching `glass-hero.tsx`.
  - **Task E:** SEO (richer metadata in `app/layout.tsx`, OG image placeholder, `sitemap`, `robots.txt`).
  - **Task F:** Responsive check at 375 / 768 / 1440 px.
  - **Task G:** Cleanup (delete unused `components/sections/reveal.tsx`, `section-heading.tsx`, `back-to-top.tsx`, and temp logs `dev.log`, `dev.err.log`, `_log-scan.txt`).

## 2. Project Overview
- Purpose: personal developer portfolio showcasing projects, skills and contact.
- Live URL: Old initial version (commit 2026-09-24) is live on Vercel from the
  `main` branch. All new work lives on branch `wip-portfolio` and must NOT be
  pushed or merged to `main` until the developer says the portfolio is complete.
- Tech stack:
  - Framework: Next.js 16.3.6 (App Router, Turbopack), React 19.2.8
  - Language: TypeScript 5 (strict)
  - Styling: Tailwind CSS v4 (@tailwindcss/postcss) + a large plain-CSS design
    system in app/globals.css (~1530 lines)
  - Animation: framer-motion 14.4.0 (gallery only) + IntersectionObserver
  - Icons: lucide-react 1.59.0 (only ArrowUpRight so far); brand logos are
    inline SVGs in components/sections/icons.tsx
  - Fonts: next/font Google fonts - Space Grotesk, Manrope, JetBrains Mono,
    Albert Sans, Fragment Mono (all with display: swap)
  - Hosting: Planned: Vercel (not deployed yet)
- Commands (run inside "My portfolio/"):
  - Install: npm install
  - Dev server: npm run dev (http://localhost:3000)
  - Production build: npm run build (must end with exit code 0)
  - Lint: npm run lint
- Git: a repo exists with 4 commits, all dated 2026-09-24 (initial scaffold,
  README updates, security headers). Everything from 2026-10-20 onward is
  uncommitted - see Section 6.

## 3. Folder Structure
Paths relative to the project root "My portfolio/":

- app/globals.css - ALL styles (~2496 lines). Hero CSS (original, frozen) at the
  top, then appended blocks in exact order:
  1. `page-flow` + old `.pf-*` rules
  2. `ABOUT (01)` (`--ab-*`)
  3. `SKILLS (02)` + reusable primitives (`--sk-*`, `.section-label`,
     `.section-title`, `.section-title-gradient`, `.section-underline`,
     `.section-sub`, `.glass-card`, `.chip`, `.chip-list`, `.section-reveal`)
  4. `WORK (03)` (`--wk-*`, `.work-*`, `.gallery-zone`)
  5. `EXPERIMENTS (04)` (`--ex-*`, `.experiments-*`)
  6. `CONTACT (05)` (`--ct-*`, `.contact-*`)
  7. `WORK (03) — thumbnail & LIVE pill button enhancement` (`--wk-live-*`,
     `.work-overlay-cover*`, `.work-live` pill button)
  8. `WORK (03) — blank placeholder card` (`.work-card--blank`)
  Append-only by rule (Section 8).
- app/layout.tsx - Root layout: the 5 Google fonts as CSS variables + page
  metadata (title/description).
- app/page.tsx - Page assembly: GlassHero, then page-flow div with About,
  Skills, Work, Experiments, Contact (in that order).
- app/favicon.ico - Site icon.
- components/glass-hero.tsx - The 100dvh hero with the cursor-following X-ray
  reveal. FROZEN by decision (Section 8) - 292 lines.
- components/sections/about.tsx - 01 / ABOUT: tagline, bio, 3 divider tags,
  glass CURRENTLY card. Data arrays at top.
- components/sections/skills.tsx - 02 / SKILLS: 5 glass cards rendered from the
  SKILLS data array at the top of the file.
- components/sections/work.tsx - 03 / WORK: PROJECTS data array (4 cards:
  01 GraphOps SOC Workbench, 02 blank placeholder, 03 Fall Detection System for
  Senior Citizens, 04 Python Automation and SQL Projects) + header + bottom
  `// ARCHIVED_PROJECTS` comment block (Freight Forecasting, Multiplayer Server,
  Freelance Web Development); renders components/ui/floating-card-gallery.tsx.
- components/sections/experiments.tsx - 04 / EXPERIMENTS: EXPERIMENTS data
  array at the top (3 placeholder entries marked // TODO), glass card grid.
  Rebuilt 2026-11-26.
- components/sections/contact.tsx - 05 / CONTACT: data (EMAIL, GITHUB_URL,
  LINKEDIN_URL, CONTACT_COPY, CONTACT_LINKS) at the top, one large glass card,
  footer with its own back-to-top button. Rebuilt 2026-11-26.
- components/ui/floating-card-gallery.tsx - 3D tilt card gallery used by Work:
  MotionValue springs, expand overlay (including preview image area when
  `project.image` is set), GitHub icon + `"LIVE"` pill button immediately to its
  right, and non-interactive blank-card rendering (`isBlank` / `.work-card--blank`).
- components/sections/back-to-top.tsx - OLD back-to-top button. UNUSED since
  2026-11-26 (contact.tsx now has its own themed button; the old one had a
  dark hover). Retire in Task G.
- components/sections/icons.tsx - Inline SVG icons: GitHub, LinkedIn, Mail,
  ArrowUpRight, Code (</>), ArrowUp.
- components/sections/reveal.tsx, section-heading.tsx - OLD primitives. UNUSED
  since 2026-11-26 (experiments and contact no longer import them). Retire in
  Task G.
- components/ui/dynamic-action.tsx, dynamic-action-demo.tsx - Unused since the
  hero action bar was removed (kept on purpose).
- components/ui/interactive-hover-button.tsx - Hero CTA button.
- components.json - shadcn/ui config (added 2026-10-20).
- lib/utils.ts - cn() class-merge helper (clsx + tailwind-merge).
- public/images/ - Hero X-ray source images (Base/Reveal x desktop/mobile),
  `graphops-thumb.png` (38.54 KB, 1321x413 px, used by Work Card 01), and
  `project card 2.png` (untracked on disk, not wired into code yet).
- public/*.svg + public/editable-design/ - Design mockups (reference only).
- scratch/ - Developer's design-generation script.
- AGENTS.md, CLAUDE.md - Short AI-assistant guides; read together with this file.
- PROGRESS-CHECKLIST.md - Older checklist from the SPA conversion (historical;
  this log supersedes it).
- next.config.ts - Security headers (HSTS, X-Frame-Options, nosniff, etc.).
- package.json - Scripts and dependencies.
- tsconfig.json - Strict TypeScript; "@/*" path alias maps to the root.
- dev.log, dev.err.log - Stray dev-server logs in the root (safe to delete).

## 4. Work Done Today (2026-10-22)
Chronological, with files touched. All done by Cline, each task verified with a
passing "npm run build" before moving on.

1. Early hours (00:14-01:05) - About section redesigned (finished a task that
   started late on 10-21). Rewrote components/sections/about.tsx as the light
   bluish design: "Systems thinker. / Software builder." tagline with gradient
   second line, real bio (BCA at DBS Global University, SIH 2026 freight
   dashboard, 99.5%+ uptime servers), highlight chips, glass CURRENTLY card
   with pulsing dot. Added the --ab-* About CSS system to globals.css and the
   IntersectionObserver fade-up+blur reveal. Fonts (Space Grotesk, Manrope,
   JetBrains Mono) were wired into app/layout.tsx late on 10-21.
2. Morning - CURRENTLY card rows updated: LEARNING now reads "C Language,
   Optimization & Payment Integration", BUILDING reads "Apps & Webpages"
   (about.tsx data array). Added max-width: 60% + line-height 1.4 to
   .about-row-value so the longer text wraps neatly. INCIDENT + FIX: a UTF-8
   BOM accidentally introduced into globals.css by a PowerShell write broke
   the Tailwind build ("Invalid dangling combinator"); fixed by stripping the
   BOM with a byte-exact .NET rewrite and clearing the .next cache.
3. Morning - Highlight chips redesigned into a divider-style tag row
   (IIT Madras Certified | SIH-2026 Lead | Python, SQL, Web) with 2px gradient
   bars; removed the "99.5%+ Server Uptime" chip and all old .about-chip CSS
   (including a stale duplicate block). about.tsx + globals.css.
4. ~10:30 - NEW SKILLS section (02 / SKILLS): created
   components/sections/skills.tsx (5 glass cards rendered from a data array)
   and the --sk-* CSS system including the REUSABLE primitives (.section-label,
   .section-title, .section-title-gradient, .section-underline, .section-sub,
   .glass-card, .chip, .chip-list, .section-reveal). Inserted into page.tsx
   between About and Work.
5. ~10:45 - Skills data cleanup: removed Express.js, Scikit-Learn, MongoDB,
   Mongoose and MongoDB Atlas from the SKILLS array (skills.tsx). A
   project-wide scan found remaining mentions only inside old
   experiments/work placeholders (reported, not edited).
6. 11:44-11:57 - WORK section rebuilt as 03 / WORK: created
   components/ui/floating-card-gallery.tsx (Framer Motion 3D tilt, max 4
   degrees, spring-smoothed MotionValues, no render-time randomness, disabled
   on touch devices and for reduced-motion, expandable overlay with Escape
   close) and rewrote components/sections/work.tsx with 4 real projects
   (Intelligent Freight Forecasting Dashboard / SIH 2026, Cross-Platform
   Multiplayer Server, Freelance Web Development, Python Automation and SQL
   Projects). Desktop grid uses 2 columns when there are exactly 4 projects,
   3 otherwise. Added the --wk-* Work CSS block (append-only). Deleted the old
   Project Alpha/Beta/Gamma placeholder data.
7. Evening - Stopped the local dev servers on request (ports 3000/3001
   verified clear).
8. 23:19 - Created this PROJECT_LOG.md (this entry).

## 4b. Work Done 2026-11-26 (Claude Opus 5.5 via Antigravity)
1. 23:25 - Log corrected (log edits only, no code): the site is NOT deployed.
   Removed the outdated "deployed on Vercel" claims in Sections 2, 5, 7 and 9,
   and added the rule that deployment happens only after the whole portfolio is
   complete and only when the developer says so.
2. 23:26 - Task A: 04 / EXPERIMENTS rebuilt. Files touched:
   - components/sections/experiments.tsx - fully rewritten. Now a client
     component using the shared primitives (.section-label, .section-title,
     .section-title-gradient, .section-underline, .section-sub, .glass-card,
     .chip, .chip-list, .section-reveal) and its own IntersectionObserver
     fade-up + blur reveal (fires once, 80ms stagger, reduced-motion safe).
     EXPERIMENTS data array at the top with 3 placeholder entries, each marked
     // TODO. Optional `href` per entry (empty = no link shown). No longer uses
     the old Reveal / SectionHeading components.
   - app/globals.css - APPENDED a new "EXPERIMENTS (04)" block with --ex-*
     tokens (grid 3 / 2 / 1 columns at >1000px / 641-1000px / <=640px). No
     existing CSS was edited.
   Why: Experiments was an old placeholder still numbered 03, clashing with
   03 Work. Verified: `npm run build` exit 0; components/glass-hero.tsx
   unchanged (same SHA-256 hash before/after); no BOM in edited files.
   Build note: `npm run build` needs internet access (next/font downloads the
   Google fonts). Offline/sandboxed builds fail with "Failed to fetch ... from
   Google Fonts" - that is a network issue, not a code issue.
3. 23:35 - Task B: 05 / CONTACT rebuilt. Files touched:
   - components/sections/contact.tsx - fully rewritten as a client component.
     Real email anuragkumar9678@gmail.com (given by the developer on
     2026-11-26) replaces the old placeholder; the real GitHub and LinkedIn
     URLs were kept unchanged. One large .glass-card (no hover lift): heading
     with gradient word, .section-underline, .section-sub pitch, gradient
     "Email me" CTA, divider, 3 contact links (Email / GitHub / LinkedIn with
     inline SVG icons from icons.tsx). Footer: tagline, copyright and a themed
     back-to-top button (smooth scroll, instant for reduced motion).
     IntersectionObserver fade-up + blur reveal. All text in data constants
     at the top (CONTACT_COPY has a // TODO on the pitch sentence in case the
     developer wants their own wording).
   - app/globals.css - APPENDED a "CONTACT (05)" block with --ct-* tokens.
     Links: 3 columns on desktop, 2 at <=900px, 1 at <=640px. No existing CSS
     edited.
   Why: Contact was an old placeholder numbered 04 with a fake email.
   Result: reveal.tsx, section-heading.tsx and back-to-top.tsx are now unused
   (to be deleted in Task G). Verified: `npm run build` exit 0;
   glass-hero.tsx hash unchanged. Dev server started on request
   (npm run dev, http://localhost:3000).
4. 23:57 - Task C (part 1): Replaced project 02 ("Cross-Platform Multiplayer
   Server") in components/sections/work.tsx with "GraphOps SOC Workbench"
   (badge "HACKFRONT", tags ["Cybersecurity", "Graph Algorithms", "SIEM",
   "Dijkstra"], githubUrl "https://github.com/anurag1exe/GraphOPS-omen-hackathon-build",
   liveUrl "https://grapsops-omen.vercel.app/", image kept empty for the
   numbered placeholder). Also switched git branch in "My portfolio/" to
   `wip-portfolio` so `main` stays untouched until full completion. Verified
   card footer and expanded overlay both render GitHub and Live links with
   `target="_blank" rel="noopener noreferrer"`, and `npm run build` exited 0
   with `glass-hero.tsx` and `globals.css` untouched.
5. 00:09 (2026-11-27) - Task C (part 2): Added thumbnail and LIVE pill button
   for "GraphOps SOC Workbench":
   - Fixed double file extension on `public/images/graphops-thumb.png.png` ->
     `public/images/graphops-thumb.png` (38.54 KB, 1321x413 px, well under 300 KB).
   - Set `image: "/images/graphops-thumb.png"` for "GraphOps SOC Workbench" in
     `components/sections/work.tsx`.
   - Updated `components/ui/floating-card-gallery.tsx`: cover `<img>` now sets
     `alt="${project.title} preview"`, `width={1321}`, `height={413}`, and also
     renders a preview media area inside the expanded overlay when `project.image`
     is present; updated `GitHubLink` and `LiveLink` aria-labels (`"GitHub
     repository for ..."`, `"Live demo of ..."`), uppercase `"LIVE"` text, and
     kept `stopPropagation`, `target="_blank"`, `rel="noopener noreferrer"`.
   - Appended a new `--wk-*` CSS block to `app/globals.css` placing the `"LIVE"`
     pill button immediately after the GitHub icon (`justify-content: flex-start;
     gap: 10px`) with light-bluish glass pill styling, gradient hover, and focus
     ring. Verified `npm run build` exited 0 and `glass-hero.tsx` unchanged.
6. 00:18 (2026-11-27) - Task C (part 3): Reorganized the `PROJECTS` array in
   `components/sections/work.tsx` in one pass:
   - Archived the full exact data of "Intelligent Freight Forecasting Dashboard",
     "Cross-Platform Multiplayer Server", and "Freelance Web Development" in a
     commented block at the bottom of `components/sections/work.tsx` labeled
     `// ARCHIVED_PROJECTS (not rendered, restore later if needed)`.
   - Card 1 (index 0): "GraphOps SOC Workbench" (badge "HACKFRONT", tags
     ["Cybersecurity", "Graph Algorithms", "SIEM", "Dijkstra"], image
     `/images/graphops-thumb.png`, githubUrl + liveUrl with LIVE pill button
     after the GitHub icon).
   - Card 2 (index 1): Intentionally BLANK card (empty title, description, tags,
     badge, image, links). Updated `components/ui/floating-card-gallery.tsx` and
     appended a small `.work-card--blank` block in `app/globals.css` so blank
     cards render only the numbered "02" placeholder cover circle, are
     non-interactive (no click/keyboard expand overlay, no hover lift), and
     carry `aria-label="Coming soon"`.
   - Card 3 (index 2): New project "Fall Detection System for Senior Citizens"
     (badge "HARDWARE", tags ["Arduino", "Python", "FastAPI", "IoT"], githubUrl
     `https://github.com/anurag1exe/Fall-detection-for-senior-citizens-running-on-Arduino-uno-Q`,
     empty liveUrl and image so the "03" placeholder shows).
   - Card 4 (index 3): "Python Automation and SQL Projects" (unchanged).
   - Total 4 cards preserved so the 2-column desktop grid rule still applies.
     Verified `npm run build` exited 0 and `glass-hero.tsx` unchanged.
7. 00:30 (2026-11-27) - Session save & wrap-up: stopped the local dev server on
   port 3000 (`task-81`), verified `git status` on branch `wip-portfolio`, and
   recorded exact session state in `PROJECT_LOG.md`. Stopped cleanly after
   finishing the Work `PROJECTS` reorganization (Task C in progress; no
   half-finished code on disk; last `npm run build` exited 0).
8. 00:40 (2026-11-27) - Committed & pushed to new repo: removed temp logs
   (`dev.log`, `dev.err.log`, `public/images/desktop.ini`), committed all
   portfolio work on branch `wip-portfolio` (`e4551d9`), added remote
   `portfolio-new` (`https://github.com/anurag1exe/portfolio-new.git`), and
   pushed `wip-portfolio` (and `main`) to `portfolio-new`. Original `origin`
   (`My-Portfolio-blog.git`) was left completely untouched.

## 5. Work Done Till Date
Grouped by feature. Legend: Done / In progress / Not started.

- Hero (glass X-ray reveal) - Done. Original component, frozen by decision;
  its bottom-left action bar was removed on 10-21 (297 -> 292 lines).
- SPA single-page structure - Done. Hero on top + page-flow div stacking
  sections vertically in normal document flow (10-21).
- 01 About - Done. Bluish redesign, CURRENTLY card, divider tag row.
- 02 Skills - Done. Includes the reusable design-system primitives.
- 03 Work - Done. Floating card gallery with 4 cards (2-column desktop grid):
  Card 1 = GraphOps SOC Workbench (HACKFRONT, thumbnail + GitHub + LIVE pill),
  Card 2 = intentionally blank "02" placeholder (non-interactive, "Coming soon"),
  Card 3 = Fall Detection System for Senior Citizens (HARDWARE, GitHub link, "03"
  placeholder), Card 4 = Python Automation and SQL Projects ("04" placeholder,
  links empty). Earlier Freight Forecasting, Multiplayer Server, and Freelance
  Web Development entries are archived in a comment block at the bottom of
  `components/sections/work.tsx`.
- 04 Experiments - Done (design/code, 2026-11-26). Content is still 3
  placeholder entries (// TODO) until the developer supplies real experiments.
- 05 Contact - Done (2026-11-26). Real email, GitHub and LinkedIn.
- Navbar - Not started (no site navbar; the hero has two CTA buttons only).
- Animations - Done for finished sections (scroll reveals, hover states,
  prefers-reduced-motion respected everywhere).
- Responsive - Done for finished sections by spec (breakpoints 1000px/900px/
  640px); visual QA at 375/768/1440 still pending.
- SEO - In progress. Only title + description metadata in layout.tsx; no OG
  image, sitemap or robots.txt yet.
- Deployment - Not started (intentionally postponed)
- Performance/quality - Production build passes; security headers configured
  in next.config.ts.

## 6. Uncommitted / In-Progress Changes
Verified with `git status` and `git diff --stat` on 2026-10-22. Nothing has been
committed since 2026-09-24, so ALL recent work is uncommitted but safe on disk:

Modified (tracked, 7 files, +1557 / -69 lines):
- app/globals.css - appended page-flow + About/Skills/Work design-system blocks
- app/layout.tsx - added 3 Google fonts (Space Grotesk, Manrope, JetBrains Mono)
- app/page.tsx - page assembly is now GlassHero + About, Skills, Work,
  Experiments, Contact stacked in a page-flow div
- components/glass-hero.tsx - bottom-left action bar removed (297 -> 292 lines)
- components/ui/interactive-hover-button.tsx - modified before 2026-10-20 (not
  part of recent sessions; left as-is on purpose)
- package.json + package-lock.json - framer-motion dependency added

Update 2026-11-27 (00:41): All work is now COMMITTED on branch `wip-portfolio`
(`e4551d9`) and pushed to `portfolio-new` (`https://github.com/anurag1exe/portfolio-new.git`).
Temp files `dev.log`, `dev.err.log`, `_log-scan.txt`, and `public/images/desktop.ini`
were removed before committing. Working tree is clean.

Untracked (new files):
- components/sections/ - about.tsx, skills.tsx, work.tsx, experiments.tsx,
  contact.tsx plus helpers (reveal, section-heading, icons, back-to-top)
- components/ui/floating-card-gallery.tsx - the 03 Work gallery engine
- components/ui/dynamic-action.tsx, dynamic-action-demo.tsx - old hero widgets,
  now unused (kept deliberately, see Section 8)
- PROGRESS-CHECKLIST.md and PROJECT_LOG.md (this file)
- Temp logs, safe to delete before committing: _log-scan.txt, dev.log, dev.err.log
- Design/scratch material, not app code: portfolio-design-*.svg,
  public/editable-design/, public/portfolio-design-*.svg, scratch/, components.json

State: production build passes (`npm run build`, exit code 0). Ready to commit.

## 7. Known Issues & Bugs
1. Placeholder content still rendered: experiments.tsx has 3 placeholder
   entries marked // TODO (waiting for real experiments from the developer).
   contact.tsx now has real content (email, GitHub, LinkedIn); about.tsx and
   work.tsx are real content too.
2. work.tsx: Card 1 ("GraphOps SOC Workbench") has thumbnail, githubUrl and
   liveUrl; Card 2 is intentionally blank (shows only the "02" placeholder,
   non-interactive); Card 3 ("Fall Detection System for Senior Citizens") has
   githubUrl filled (no image or liveUrl); Card 4 ("Python Automation and SQL
   Projects") still has image/githubUrl/liveUrl = "" with // TODO comments.
   Archived projects (Freight Forecasting, Multiplayer Server, Freelance Web
   Development) live in a `// ARCHIVED_PROJECTS` comment block at the bottom of
   `components/sections/work.tsx`. Do not invent URLs.
3. Dead-but-harmless leftovers: `.hero__action-bar` CSS rules in globals.css
   and the two unused dynamic-action components (kept deliberately). Also now
   unused: components/sections/reveal.tsx, section-heading.tsx, back-to-top.tsx
   (to be deleted in Task G).
4. Responsive layout is built to spec but has not been visually QA'd at
   375 / 768 / 1440 px widths yet.
5. All work up to 2026-11-27 is committed on branch `wip-portfolio` and pushed
   to `portfolio-new` (`https://github.com/anurag1exe/portfolio-new.git`). Do
   NOT push to `origin/main` (`My-Portfolio-blog.git`).
6. `npm run build` needs internet (next/font fetches Google fonts). Offline
   builds fail with "Failed to fetch ... from Google Fonts".

## 8. Decisions & Rules (do not reverse these by accident)
1. components/glass-hero.tsx is FROZEN: the 100dvh hero sits at the top of the
   document with its cursor X-ray reveal untouched. Never restyle or refactor
   it without asking the developer first.
2. app/globals.css is APPEND-ONLY. The original hero CSS at the top is never
   edited; each new section gets an appended block with its own token prefix
   (--ab-* About, --sk-* Skills + shared, --wk-* Work, --ex-* Experiments,
   --ct-* Contact).
3. Reusable primitives every section must reuse: .section-label,
   .section-title, .section-title-gradient, .section-underline, .section-sub,
   .glass-card, .chip, .chip-list, .section-reveal.
4. Design language: light bluish glass theme. Accents #0EA5E9 / #2563EB,
   background #EEF5FF, headings #0B1220, body #475569, muted #64748B. NO dark
   or purple themes anywhere.
5. Fonts load only via next/font in app/layout.tsx: Space Grotesk (headings),
   Manrope (body), JetBrains Mono (labels). Brand logos are inline SVGs in
   components/sections/icons.tsx - do NOT use lucide brand icons.
6. Libraries: framer-motion and lucide-react are allowed. No other new heavy
   dependencies without asking.
7. Animation rules: IntersectionObserver fade-up + blur reveals (fire once,
   80ms stagger); hover motion via CSS transitions or framer-motion; NEVER call
   setState inside mousemove handlers (use useMotionValue + useSpring); NEVER
   call Math.random() during render (hydration risk); always respect
   prefers-reduced-motion.
8. Section content lives in data arrays at the top of each section file so the
   developer can edit content without touching markup.
9. Skills content must not include Tailwind, Vite or DSA (owner's rule);
   Express.js, Scikit-Learn, MongoDB, Mongoose and MongoDB Atlas were removed
   on purpose - do not re-add them.
10. Work grid uses 2 columns on desktop when there are exactly 4 projects,
    3 columns otherwise.
11. Workflow: after every task run `npm run build` (must exit 0), then delete
    the temp build log. When a task says "do not modify X", verify X unchanged
    (line counts / re-read) before reporting done.
12. Windows shell writes: PowerShell Set-Content/Add-Content can add a UTF-8
    BOM that breaks the Tailwind build (happened once on globals.css; fixed by
    a byte-exact .NET rewrite). Prefer the file-editor tool or
    [IO.File]::WriteAllText with UTF8Encoding($false).

## 9. Next Steps / TODO (priority order)
1. [DONE 2026-11-26] Rebuild Experiments as 04 / EXPERIMENTS with the shared
   primitives. Remaining: developer to supply real experiment content.
2. [DONE 2026-11-26] Rebuild Contact as 05 / CONTACT with the real email.
3. IN PROGRESS (Task C): `components/sections/work.tsx` reorganized to: (1)
   GraphOps SOC Workbench (thumbnail + GitHub + LIVE), (2) intentionally blank
   "02" placeholder card, (3) Fall Detection System for Senior Citizens (GitHub
   link), (4) Python Automation and SQL Projects (links still empty). Previous
   Freight Forecasting, Multiplayer Server, and Freelance projects are archived
   at the bottom of `work.tsx`. Waiting for the developer's next instruction
   (any remaining links/cards or move to Task D).
4. [DONE 2026-11-27] Committed all work to git on branch `wip-portfolio` and
   pushed to `https://github.com/anurag1exe/portfolio-new.git` (remote
   `portfolio-new`). Never push or merge to `origin/main` until the developer
   says the portfolio is complete. Do NOT deploy yet.
5. Task D: site navbar with smooth-scroll anchors (ids about, skills, work,
   experiments, contact all exist now; html has scroll-behavior: smooth).
6. Task E: SEO: OG image, sitemap, robots.txt, richer metadata in layout.tsx.
7. Task F: Visual QA at 375 / 768 / 1440 px; fix anything that wraps badly.
8. Task G: Delete unused reveal.tsx, section-heading.tsx, back-to-top.tsx and
   temp files _log-scan.txt, dev.log, dev.err.log.
9. After full completion, when the developer says so: deploy on Vercel and
   record the URL in Section 2.

## 10. Change History (one line per dated change)
- 2026-09-24 - Developer (git) - Initial Next.js scaffold, README updates,
  security headers (4 commits, latest 128d6d7).
- 2026-10-21 - Cline - SPA conversion: hero frozen on top, About/Work/
  Experiments/Contact stacked below in a page-flow div; removed the hero's
  bottom-left action bar (DynamicActionBarDemo).
- 2026-10-21 - Cline - About (01) redesigned: light bluish theme, new fonts in
  layout.tsx, real bio, CURRENTLY glass card, stat chips.
- 2026-10-22 - Cline - CURRENTLY card text updated (C Language / Optimization /
  Payment Integration, Apps & Webpages); About chips became a divider-style
  tag row (IIT Madras Certified | SIH-2026 Lead | Python, SQL, Web).
- 2026-10-22 - Cline - Skills (02) created with the reusable design-system
  primitives; skills data cleaned (removed Express.js, Scikit-Learn, MongoDB,
  Mongoose, MongoDB Atlas).
- 2026-10-22 - Cline - Work (03) rebuilt as a floating card gallery with 4 real
  projects; components/ui/floating-card-gallery.tsx added; old Project
  Alpha/Beta/Gamma placeholder data removed.
- 2026-10-22 23:19 - Cline - PROJECT_LOG.md created (this file).
- 2026-11-26 - Claude Opus 5.5 (Antigravity) - Log corrected (site not
  deployed, deployment postponed until full completion); 04 Experiments rebuilt
  with shared primitives + appended --ex-* CSS block (3 placeholder entries).
- 2026-11-26 23:35 - Claude Opus 5.5 (Antigravity) - 05 Contact rebuilt (one
  large glass card, real email anuragkumar9678@gmail.com, appended --ct-* CSS
  block); old Reveal/SectionHeading/BackToTop now unused.
- 2026-11-26 23:58 - Gemini 4 Argon (Antigravity) - Switched repo to branch
  `wip-portfolio`; replaced Work project 02 ("Cross-Platform Multiplayer Server")
  with "GraphOps SOC Workbench" (HACKFRONT) including real GitHub and Live URLs.
- 2026-11-27 00:10 - Gemini 4 Argon (Antigravity) - Added `/images/graphops-thumb.png`
  thumbnail (card + expanded overlay) for GraphOps SOC Workbench and styled the
  "LIVE" pill button immediately after the GitHub icon via an appended `--wk-*`
  CSS block.
- 2026-11-27 00:18 - Gemini 4 Argon (Antigravity) - Reorganized Work `PROJECTS`:
  Card 1 = GraphOps SOC Workbench, Card 2 = blank non-interactive "02" card,
  Card 3 = Fall Detection System for Senior Citizens (HARDWARE, GitHub link),
  Card 4 = Python Automation and SQL Projects; archived Freight Forecasting,
  Multiplayer Server, and Freelance projects in a comment block at the bottom of
  `work.tsx`.
- 2026-11-27 00:30 - Gemini 4 Argon (Antigravity) - Stopped local dev server and
  saved session state to `PROJECT_LOG.md` on branch `wip-portfolio`.
- 2026-11-27 00:32 - Gemini 4 Argon (Antigravity) - Added detailed "WHERE WE
  STOPPED (Resume Handoff for Tomorrow)" section to Section 1 and updated
  Section 3 folder structure inventory in `PROJECT_LOG.md`.
- 2026-11-27 00:41 - Gemini 4 Argon (Antigravity) - Cleaned temp logs, committed
  all portfolio work on `wip-portfolio`, and pushed to
  `https://github.com/anurag1exe/portfolio-new.git`.