# Portfolio Code & Mobile Audit Report

- **Date:** 2026-11-28
- **Target:** `My portfolio/` (Next.js 16.3.6 + React 19.2.8 + TypeScript 5 + Tailwind CSS v4 + Framer Motion 14.4.0)
- **Git Branch:** `wip-portfolio` (HEAD `05d1d98`, 1 unstaged file: `components/sections/about.tsx`)
- **Mode:** Strictly Read-Only Audit (no existing files modified; responsive audit performed by CSS/TSX code inspection across 360, 375, 390, 414, 768, 1024, and 1440 px viewports).

---

## Executive Summary (Top Priority Findings)

1. **[HIGH — Asset Size / Mobile Performance] `public/images/project-card-3.png` is 7,396.39 KB (~7.4 MB, 3168×1344 px).** It exceeds the 300 KB thumbnail budget by ~24×. In addition, the 4 hero PNGs in `public/images/` total **~17.37 MB** (`Base_image_mobile.png` is 5.91 MB, `Reveal_image_mobile.png` is 5.39 MB).
2. **[HIGH — Policy / Content Consistency] Banned tag `"scikit-learn"` is rendered on Work Card 04 (`components/sections/work.tsx:64`).** While `skills.tsx` excludes `Scikit-Learn`, Card 04 ("Cinemate AI: Movie Recommender") includes `"scikit-learn"` in its `tags` array.
3. **[MEDIUM — Mobile Overflow / Overlay Usability] Expanded project card overlay (`.work-overlay`) is clipped inside the card's fixed height (`components/ui/floating-card-gallery.tsx:339-410`, `app/globals.css:1808-1820`).** Because `.work-overlay` is `position: absolute; inset: 0` inside `.work-card`, when the overlay renders a 112 px image + title + 3-4 line full description + tags + links, its vertical height on 360–414 px mobile viewports becomes very cramped and forces nested scrolling (`overflow-y: auto`) inside a ~430 px card box.
4. **[MEDIUM — Accessibility / HTML Semantics] Interactive `<a>` links are nested inside `<motion.article role="button" tabIndex={0}>` (`components/ui/floating-card-gallery.tsx:250-414`).** Nesting interactive anchor controls (`GitHubLink`, `LiveLink`, `ApkLink`, and the overlay `<button className="work-overlay-close">`) inside an element with `role="button"` violates WAI-ARIA 1.2 interactive-content nesting rules and confuses screen readers.
5. **[MEDIUM — Security / `npm audit`] 11 vulnerabilities reported by `npm audit` (1 Critical in `next@16.3.6`, 3 High in `sharp`, `source-map-js`, `zod`, 7 Moderate).**
6. **[MEDIUM — Code Hygiene / Dead Files & Bloated Assets] 5 unused component files (`reveal.tsx`, `section-heading.tsx`, `back-to-top.tsx`, `dynamic-action.tsx`, `dynamic-action-demo.tsx`), 1 unused icon export (`ArrowUpRightIcon`), 282 lines of duplicated `.about*` CSS (`app/globals.css:990-1271`), and ~19.7 MB of unused design/source files in `public/` and repo root.**

---

## A. Build & Code Health

### A1. Tooling Output (`tsc`, `eslint`, `npm run build`)

| Check | Exit Code | Findings |
| :--- | :--- | :--- |
| `npx tsc --noEmit` | `0` | Clean — zero TypeScript errors. |
| `npm run build` | `0` | Clean — production build and static page generation (`/`, `/_not-found`) succeed in ~4.6s when network access is available for `next/font/google`. |
| `npx eslint .` | `1` | **2 errors, 1 warning** (details below). |

#### ESLint Findings
1. **`components/sections/skills.tsx:3`** — *Warning: Unused `eslint-disable` directive*:
   ```tsx
   /* eslint-disable react/no-unknown-property */
   ```
2. **`components/glass-hero.tsx:54` & `265`** *(Note: `glass-hero.tsx` is frozen by rule; listed here only to explain `npx eslint .` exit code 1)*:
   - Line 54: `react-hooks/immutability` error (`tick` accessed inside its own `useCallback` before declaration finishes).
   - Line 265: `@next/next/no-html-link-for-pages` error (`<a href="/">` instead of `<Link href="/">`).

---

### A2. Unused Files, Dead Code, Commented Blocks & Stray Files

1. **Unused Section Helper Components (3 files, 0 imports across codebase):**
   - `components/sections/reveal.tsx` (lines 1–32)
   - `components/sections/section-heading.tsx` (lines 1–26)
   - `components/sections/back-to-top.tsx` (lines 1–22)
2. **Unused Hero Widget Components (2 files, 0 imports outside themselves):**
   - `components/ui/dynamic-action.tsx` (lines 1–117)
   - `components/ui/dynamic-action-demo.tsx` (lines 1–126)
3. **Unused Export in `components/sections/icons.tsx`:**
   - `CodeIcon` (`components/sections/icons.tsx:43-50`) is no longer imported anywhere (`experiments.tsx` was rebuilt without it, and `skills.tsx` uses an inline `<svg>` at lines 120–134 instead of `CodeIcon`).
4. **Commented-Out Code Block:**
   - `components/sections/work.tsx:143-204` contains a 62-line `/* ... */` block (`// ARCHIVED_PROJECTS`) holding 4 archived project objects.
5. **Exact Duplicate CSS Block in `app/globals.css` (282 lines):**
   - `app/globals.css:990-1271` is a near-verbatim copy of the `ABOUT` CSS block from `app/globals.css:634-988` (re-declaring `:root` `--ab-*` tokens, `.about`, `.about-glow`, `.about-inner`, `.about-grid`, `.about-label`, `.about-tagline`, `.about-underline`, `.about-bio`, `.about-side`, `.about-card`, `@keyframes ab-pulse`, `.about-rows`, `.about-row`, `.ab-reveal`, and `@media` queries).
   - **Minor bug caused by the duplicate block:** In the first block (`app/globals.css:972-987`), `@media (prefers-reduced-motion: reduce)` disables transitions/transforms on `.about-row`, `.about-tag-bar`, and `.about-tag-text`. The second block (`app/globals.css:1191-1205`) re-declares `.about-row { transition: transform 0.25s ... }` and `.about-row:hover { transform: translateY(-3px); }` **after** line 972, and its second `@media (prefers-reduced-motion: reduce)` at lines 1258–1271 omits `.about-row` and `.about-row:hover`. As a result, **`.about-row` hover lift is NOT disabled when `prefers-reduced-motion: reduce` is active**.
6. **Unused / Dead CSS Rules in `app/globals.css`:**
   - `.pf-mono`, `.pf-gutter`, `.pf-section`, `.pf-card` (`app/globals.css:608-632`) — only used by the retired `back-to-top.tsx` and `section-heading.tsx`; no active section on the page uses `.pf-*` anymore.
   - `.hero__links`, `.hero__btn`, `.hero__btn--cta`, `.hero__btn--explore`, `.hero__action-bar` (`app/globals.css:303-374, 523-525, 555-571`) — dead selectors from an older hero layout.
7. **Stray Design / Scratch Files Tracked in Git (`git ls-files`):**
   - Root: `portfolio-design-desktop-clean.svg` (12.9 KB), `portfolio-design-desktop.svg` (1.37 MB), `portfolio-design-mobile.svg` (4.8 KB), `PROGRESS-CHECKLIST.md` (3.0 KB).
   - `scratch/generate_editable_ui_svg.py` (377 lines, Python script).
   - `public/portfolio-design-clean.svg` (13.2 KB), `public/portfolio-design-desktop.svg` (1.37 MB), `public/portfolio-design-mobile.svg` (**7.89 MB**).
   - `public/editable-design/portfolio-design-desktop-clean.svg` (12.9 KB), `public/editable-design/portfolio-design-desktop.svg` (1.37 MB), `public/editable-design/portfolio-design-mobile.svg` (4.8 KB).
   - Note: `dev.log`, `dev.err.log`, and `_log-scan.txt` are not present on disk.

---

### A3. React & Next.js Architecture Checks

1. **No `Math.random()` / `Date.now()` in render, and no `setState` in `mousemove`:**
   - Verified across all `.tsx` files: `FloatingCardGallery` (`components/ui/floating-card-gallery.tsx:101-131, 147-152`) uses `useMotionValue` + `useSpring` + `useTransform` for 3D tilt (`pointerX.set(...)`, `pointerY.set(...)`), causing zero React re-renders on `mousemove`.
2. **Effect Cleanups:**
   - `about.tsx:37-64`, `skills.tsx:60-86`, `work.tsx:81-108`, `experiments.tsx:48-74`, `contact.tsx:39-65`: all disconnect their `IntersectionObserver` on unmount.
   - `floating-card-gallery.tsx:139-145` cleans up `finePointer.removeEventListener("change", update)` and lines `170-180` clean up `window.removeEventListener("keydown", onKeyDown)`.
3. **Minor Uncleaned `requestAnimationFrame` on Unmount:**
   - `components/ui/floating-card-gallery.tsx:166 & 175`: `requestAnimationFrame(() => cardRefs.current[index]?.focus())` is not cancelled if the component unmounts within that single frame (low risk because optional chaining `?.focus()` prevents a crash).
4. **Hardcoded `width={1321} height={413}` on All Project Card `<img>` Tags:**
   - `components/ui/floating-card-gallery.tsx:291-292` and `383-384`:
     ```tsx
     <img
       className="work-cover-img"
       src={project.image}
       alt={project.imageAlt ?? `${project.title} preview`}
       width={1321}
       height={413}
       loading="lazy"
     />
     ```
   - `1321×413` is the intrinsic size of Card 01 (`graphops-thumb.png`), whereas Card 02 (`project-card-2.png`) is `1100×738`, Card 03 (`project-card-3.png`) is `3168×1344`, and Card 04 (`project-card-4.png`) is `1100×614`. Because `.work-cover-img` has `width: 100%; height: 100%; object-fit: cover` inside a fixed `height: 160px` container, CSS overrides the aspect ratio visually, so there is no visual distortion or layout shift, but the HTML `width`/`height` attributes do not match Cards 02–04's true intrinsic dimensions.
5. **Font Weights Missing in `app/layout.tsx`:**
   - `app/layout.tsx:34-39` loads `Manrope` with only weights `["400", "500"]`:
     ```tsx
     const manrope = Manrope({
       subsets: ["latin"],
       weight: ["400", "500"],
       variable: "--font-body",
       display: "swap",
     });
     ```
   - However, `app/globals.css:2177` (`.contact-cta`) and `app/globals.css:2270` (`.contact-link-value`) request `font-family: var(--font-body), "Manrope", sans-serif; font-weight: 600;`. Because weight `600` is not loaded in `layout.tsx`, the browser synthesizes (faux-bolds) weight 600 or falls back to 500.
   - Similarly, `Albert_Sans` (`app/layout.tsx:12-17`) loads weights `["300", "400", "500"]`, while `components/glass-hero.tsx:252` uses `font-bold` (700) and `components/ui/interactive-hover-button.tsx:18` uses `font-semibold` (600).
6. **Unused Font Variables on Sections 01–05:**
   - `Albert_Sans` (`--font-sans`) and `Fragment_Mono` (`--font-mono`) in `app/layout.tsx:12-24` are only used by the Hero (`--f-sans`, `--f-mono`). Sections 01–05 use `Space_Grotesk`, `Manrope`, and `JetBrains_Mono`. Loading 5 separate Google Font families increases initial font payload.

---

## B. Mobile & Responsive Audit (Reviewed by Code Inspection: 360, 375, 390, 414, 768, 1024, 1440 px)

*Methodology note: Reviewed by CSS/TSX code inspection across all breakpoints (`320px`, `640px`, `767px`, `900px`, `1000px`).*

### B1. Viewport & Overflow Checks
- **Viewport Meta:** Next.js App Router automatically injects `<meta name="viewport" content="width=device-width, initial-scale=1" />`.
- **`100dvh` Usage:** `.hero` (`app/globals.css:99`) uses `height: 100dvh; min-width: 320px;` (and `min-height: 42rem` at `max-width: 767px`, line 482), avoiding the classic mobile browser address-bar `100vh` jump.
- **Decorative Glow Blobs (`.about-glow`, `.skills-glow`, `.work-glow`, `.experiments-glow`, `.contact-glow`):**
  - All 5 section shells (`.about`, `.skills`, `.work`, `.experiments`, `.contact`) set `position: relative; overflow: hidden;`, and `body` sets `overflow-x: hidden;` (`app/globals.css:66`). The 620–820 px negative-offset radial glow circles are safely clipped by their parent `<section>` containers and do not cause horizontal scrollbars.

### B2. Specific Mobile / Narrow-Screen Issues Found

1. **[MEDIUM] Expanded Project Overlay (`.work-overlay`) Is Cramped on Mobile & Tablet (`app/globals.css:1808-1820`):**
   - `.work-overlay` uses `position: absolute; inset: 0; overflow-y: auto; padding: 24px;` inside `.work-card`.
   - On mobile (`<=640px`) and tablet (`641–1000px`), `.work-card` is only as tall as its normal card content (~420–460 px).
   - When a user taps a card to open `.work-overlay`, the overlay tries to fit:
     - `.work-overlay-kicker` (~16 px)
     - `.work-overlay-title` (~30–56 px)
     - `.work-overlay-cover` (`height: 112px; margin-top: 12px; flex-shrink: 0;`, lines 2405–2413)
     - `.work-overlay-desc` (4–5 lines of text, ~110–135 px)
     - `.work-overlay-tags` (~40–76 px)
     - `.work-overlay-links` (`padding-top: 16px`, `36px` buttons = ~53 px)
     - Total inner height ≈ **460–510 px** plus `48px` vertical padding = **508–558 px**, which exceeds the card's ~430–460 px box.
   - **Result on mobile:** The user must scroll *inside* the small card (`overflow-y: auto`), which competes with vertical page scrolling on touch screens, and the close button (`.work-overlay-close`, `position: absolute; top: 14px; right: 14px`) scrolls away if the user scrolls the overlay content down.

2. **[MEDIUM] Tap Targets Under 44×44 px WCAG 2.5.5 / Mobile Guideline:**
   - **Work Card GitHub Icon (`.work-github`, `app/globals.css:1741-1742`):** `width: 36px; height: 36px;` (below 44×44 px).
   - **Work Card LIVE & DOWNLOAD APK Pills (`.work-live`, `.work-apk`, `app/globals.css:2431`):** `height: 36px;` (below 44 px height).
   - **Work Overlay Close Button (`.work-overlay-close`, `app/globals.css:1829-1830`):** `width: 34px; height: 34px;` (below 44×44 px).
   - **Contact Footer Back-to-Top Button (`.contact-top-btn`, `app/globals.css:2315`):** `padding: 8px 16px; font-size: 0.68rem;` → computed height is ~32 px (below 44 px).
   - **Hero CTA Buttons (`components/glass-hero.tsx:279, 282` + `components/ui/interactive-hover-button.tsx:18`):** `py-1.5 px-2 text-xs` → computed height is ~28 px (below 44 px).

3. **[LOW-MEDIUM] Tablet Breakpoint Gap (`641px` – `900px`) on Work Grid (`.work-grid--two`):**
   - `.work-grid--two` stays at **2 columns** all the way down to `641px` (`@media (max-width: 640px)` collapses it to `1fr`, `app/globals.css:1907-1916`).
   - At **650–768 px** viewport width: `650px - 64px (section padding) - 24px (grid gap) = 562px / 2 = 281px` per card (`332px` per card at `768px`).
   - Inside a `281px`–`332px` card (`233px`–`284px` inner width after `24px` card padding), Card 01's top row has `"01"` on the left and two badges (`CYBERSECURITY` + `HACKATHON NATIONALS`) on the right. Thanks to `.work-badges { flex-wrap: wrap; justify-content: flex-end; }` (`app/globals.css:2554-2561`), the two badges wrap onto two stacked lines without overflowing, but the card header looks tight at 650–720 px compared to collapsing to 1 column at `768px`.

4. **[LOW] `.chip` Uses `white-space: nowrap` (`app/globals.css:1410`):**
   - All existing skill/work/experiment chip strings are short enough (`<= 21` chars, e.g. `"Linux Administration"`, `"Prompt Engineering"`) to fit inside a `360px` screen (`360 - 40 - 48 = 272px` inner card width). However, if a longer chip string (>28 characters) is ever added, `white-space: nowrap` without `max-width: 100%` would push the card wider than a 360 px viewport.

5. **[LOW] Touch vs. Hover Interactions:**
   - **3D Tilt:** Properly gated by `window.matchMedia("(hover: hover) and (pointer: fine)")` (`components/ui/floating-card-gallery.tsx:138-145`), so touch devices never run tilt handlers.
   - **Work Card Footer Buttons (`GitHubLink`, `LiveLink`, `ApkLink`):** Properly call `stopPropagation()` on `onClick`, `onPointerDown`, `onMouseDown`, and `onTouchStart` (`components/ui/floating-card-gallery.tsx:58-130`) and have `position: relative; z-index: 4; pointer-events: auto; touch-action: manipulation;` (`app/globals.css:2530-2537`). Tapping them on mobile will not trigger the card's expand overlay.
   - **Hero CTA Buttons (`InteractiveHoverButton`, `components/ui/interactive-hover-button.tsx:23-30`):** The arrow slide-in effect relies on `group-hover:translate-x-...`, which only animates on hover pointers, though tapping the `<button>` inside `<a href="...">` still navigates on mobile.

---

## C. Content & Consistency Audit

### C1. Policy Violation: Banned Skill/Tech Item Present in Work Card 04
- **Rule:** *"Skills list: report if it contains any of: Tailwind, Vite, DSA, Express.js, Scikit-Learn, MongoDB, Mongoose, MongoDB Atlas (these are banned on purpose)."*
- **`components/sections/skills.tsx`:** Clean — none of the 8 banned items appear in `SKILLS`.
- **`components/sections/work.tsx:64` (Card 04 — "Cinemate AI: Movie Recommender"):**
  ```tsx
  tags: ["Python", "Streamlit", "scikit-learn", "SQLite"],
  ```
  **`"scikit-learn"` is present** on Card 04 and rendered publicly on the page.

### C2. Placeholder Content & `// TODO` Markers
1. **`components/sections/experiments.tsx:20-43`** *(Known/intentional per audit rules, noted for completeness)*:
   - Renders 3 visible placeholder cards where the badge is literally `"PLACEHOLDER"`, descriptions read `"TODO: one or two lines on what this experiment explores and what you learned."`, and stack chips literally render `"TODO"` and `"Stack"`.
2. **`components/sections/contact.tsx:15`:**
   - Contains `// TODO: replace with your own closing pitch if you want different wording` above `sub: "Have an idea, a project or an opportunity? My inbox is open, and I usually reply quickly."` (The rendered text itself reads naturally and is not a visible `"TODO"` string).
3. **`components/sections/work.tsx` Unstaged vs. Committed State for `about.tsx`:**
   - `components/sections/about.tsx` has unstaged local modifications (`git status` shows `modified: components/sections/about.tsx`). On disk, `about.tsx` has the updated bio and pills (`"IIT Madras Certified"`, `"SIH 2026: Team Lead"`, `"Hackfront: Grand Finalist"`), matching the current Work section. (In the last git commit `05d1d98`, `about.tsx` still mentioned `"deploying Linux-based multiplayer servers with 99.5%+ uptime"`).

### C3. Cross-Section Wording & Consistency Checks
1. **Hackathon Wording Across About vs. Work Card 01:**
   - **01 About (`components/sections/about.tsx:19` & `24`):**
     - Bio: *"Separately, at the Hackfront Hackathon, I reached the grand finale with GraphOps, a cybersecurity workbench."*
     - Pill: `"Hackfront: Grand Finalist"`
   - **03 Work Card 01 (`components/sections/work.tsx:17` & `19`):**
     - Badges: `["Cybersecurity", "Hackathon Nationals"]`
     - Description: `"...built for the Hackfront hackathon."`
   - *Observation:* About calls the achievement `"Hackfront: Grand Finalist"` / `"reached the grand finale"`, whereas Card 01's badge calls it `"HACKATHON NATIONALS"` (and does not include the word `"Hackfront"` in the badge, only in the description). Not a contradiction, but worth confirming whether both should use the same terminology.
2. **SIH 2026 Project Mentioned in About Bio Is Archived in Work:**
   - **01 About (`components/sections/about.tsx:19` & `23`):** Mentions *"At Smart India Hackathon 2026, I led a team building a freight forecasting dashboard for a Ministry of Steel problem statement"* and pill `"SIH 2026: Team Lead"`.
   - **03 Work (`components/sections/work.tsx:144-158`):** The *"Intelligent Freight Forecasting Dashboard (SIH 2026)"* card is currently commented out in `// ARCHIVED_PROJECTS` and not among the 4 visible Work cards (which are GraphOps, Stylexy, Fall Detection, Cinemate AI). A recruiter reading About and scrolling to Work to see the SIH 2026 dashboard will not find a card for it.
3. **Hero CTA Buttons vs. Single-Page Sections (`components/glass-hero.tsx:278-283`):**
   - *(Note: `glass-hero.tsx` is frozen by rule, noted for visitor UX awareness)*:
   - `"Let's talk"` links externally to LinkedIn (`https://www.linkedin.com/in/anurag-kumar-a15100345/`) rather than scrolling to `#contact`.
   - `"Explore my work"` links externally to GitHub (`https://github.com/anurag1exe?tab=repositories`) rather than scrolling to `#work`.
4. **Section Numbering & Anchor IDs (`#about`, `#skills`, `#work`, `#experiments`, `#contact`):**
   - `01 / About` → `<section id="about">` (`components/sections/about.tsx:67, 76`)
   - `02 / Skills` → `<section id="skills">` (`components/sections/skills.tsx:89, 97`)
   - `03 / WORK` → `<section id="work">` (`components/sections/work.tsx:111, 119`)
   - `04 / Experiments` → `<section id="experiments">` (`components/sections/experiments.tsx:77, 83`)
   - `05 / Contact` → `<section id="contact">` (`components/sections/contact.tsx:74, 79`)
   - All 5 section numbers (`01`–`05`) and anchor `id`s are sequential and consistent.
   - Note: `.about` (`app/globals.css:661`) is the only section missing `scroll-margin-top: 2rem;` (`.skills`, `.work`, `.experiments`, `.contact` all have `scroll-margin-top: 2rem`). Once a sticky navbar is added in Task D, `#about` will need `scroll-margin-top`.
5. **Typo in `README.md:2`:**
   - `This is currently under devlopment and will be done soon` (`devlopment` → `development`).

---

## D. Links & Assets Audit

### D1. Complete Inventory of External & Action Links in Code

| File & Line | Label / Context | Exact `href` Value | `target` | `rel` | Status / Notes |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `components/glass-hero.tsx:265` | Brand monogram (`ANURAG KUMAR`) | `/` | *(none)* | *(none)* | Internal root link (frozen hero). |
| `components/glass-hero.tsx:278` | Hero CTA `"Let's talk"` | `https://www.linkedin.com/in/anurag-kumar-a15100345/` | `_blank` | `noreferrer` | Format valid (format only). Uses `noreferrer` (which implies `noopener` in modern browsers, though `noopener noreferrer` is standard). |
| `components/glass-hero.tsx:281` | Hero CTA `"Explore my work"` | `https://github.com/anurag1exe?tab=repositories` | `_blank` | `noreferrer` | Format valid (format only). |
| `components/sections/work.tsx:25` | Card 01 GitHub (`GraphOps SOC Workbench`) | `https://github.com/anurag1exe/GraphOPS-omen-hackathon-build` | `_blank` | `noopener noreferrer` | Format valid (format only). |
| `components/sections/work.tsx:26` | Card 01 Live (`GraphOps SOC Workbench`) | `https://grapsops-omen.vercel.app/` | `_blank` | `noopener noreferrer` | Format valid (format only; intentional `"grapsops"` spelling per developer). |
| `components/sections/work.tsx:38` | Card 02 GitHub (`Stylexy`) | `https://github.com/anurag1exe/App-for-barber-shop-Prototype-` | `_blank` | `noopener noreferrer` | Format valid (format only; trailing hyphen intentional). |
| `components/sections/work.tsx:41` | Card 02 APK (`Stylexy`) | `https://github.com/anurag1exe/App-for-barber-shop-Prototype-/raw/refs/heads/main/apk/Stylexy.apk` | `_blank` | `noopener noreferrer` | **Confirmed direct raw GitHub URL** (`/raw/refs/heads/main/apk/Stylexy.apk`), not a `/blob/` or `blob:` URL. |
| `components/sections/work.tsx:53` | Card 03 GitHub (`Fall Detection`) | `https://github.com/anurag1exe/Fall-detection-for-senior-citizens-running-on-Arduino-uno-Q` | `_blank` | `noopener noreferrer` | Format valid (format only). |
| `components/sections/work.tsx:68` | Card 04 GitHub (`Cinemate AI`) | `https://github.com/anurag1exe/Movie-recommender-Personalized-with-google-login-` | `_blank` | `noopener noreferrer` | Format valid (format only; trailing hyphen intentional). |
| `components/sections/work.tsx:69` | Card 04 Live (`Cinemate AI`) | `https://movierecommenderrr.streamlit.app/` | `_blank` | `noopener noreferrer` | Format valid (format only). |
| `components/sections/contact.tsx:31` & `92` | Contact CTA `"Email me"` & Email row | `mailto:anuragkumar9678@gmail.com` | *(none)* | *(none)* | Valid `mailto:` format. |
| `components/sections/contact.tsx:32` | Contact GitHub row | `https://github.com/anurag1exe` | `_blank` | `noopener noreferrer` | Format valid (format only). |
| `components/sections/contact.tsx:33` | Contact LinkedIn row | `https://www.linkedin.com/in/anurag-kumar-a15100345/` | `_blank` | `noopener noreferrer` | Format valid (format only). |

---

### D2. Complete Inventory of `public/` Files vs. Code References

| File Path in `public/` | Size (KB) | Dimensions | Referenced in Code? | Issues (Size > 300 KB / Naming / Case / Unused) |
| :--- | :--- | :--- | :--- | :--- |
| `public/images/Base_image_desktop.png` | **1,018.88 KB** | `1024×576` | Yes (`app/globals.css:120, 162`) | **> 300 KB (1.02 MB)**; capital `B`. Case matches CSS exactly. |
| `public/images/Base_image_mobile.png` | **5,913.25 KB** | `1536×2752` | Yes (`app/globals.css:152`) | **> 300 KB (5.91 MB)**; capital `B`. Case matches CSS exactly. |
| `public/images/Reveal_image_desktop.png` | **5,055.23 KB** | `2730×1536` | Yes (`app/globals.css:126, 165`) | **> 300 KB (5.06 MB)**; capital `R`. Case matches CSS exactly. |
| `public/images/Reveal_image_mobile.png` | **5,388.04 KB** | `1536×2752` | Yes (`app/globals.css:155`) | **> 300 KB (5.39 MB)**; capital `R`. Case matches CSS exactly. |
| `public/images/graphops-thumb.png` | 38.54 KB | `1321×413` | Yes (`components/sections/work.tsx:23`) | Clean (< 300 KB, lowercase, no spaces). |
| `public/images/project-card-2.png` | 278.86 KB | `1100×738` | Yes (`components/sections/work.tsx:36`) | Clean (< 300 KB, lowercase, no spaces). |
| `public/images/project-card-3.png` | **7,396.39 KB** | `3168×1344` | Yes (`components/sections/work.tsx:50`) | **[HIGH] > 300 KB (7.40 MB!)** — uncompressed 3168×1344 file on disk. |
| `public/images/project-card-4.png` | 251.92 KB | `1100×614` | Yes (`components/sections/work.tsx:65`) | Clean (< 300 KB, lowercase, no spaces). |
| `public/images/project card 2.png` | **7,175.51 KB** | `2528×1696` | **No (Unused)** | **Unused raw source file (7.18 MB)**; has **spaces** in filename; tracked in git. |
| `public/images/Project 3 card.png` | **2,158.59 KB** | `1264×848` | **No (Unused)** | **Unused raw source file (2.16 MB)**; has **spaces and capital `P`**; tracked in git. |
| `public/images/project 4 card.png` | **5,012.52 KB** | `2752×1536` | **No (Unused)** | **Unused raw source file (5.01 MB)**; has **spaces** in filename; tracked in git. |
| `public/portfolio-design-clean.svg` | 13.19 KB | SVG | **No (Unused)** | Unused mockup in `public/`. |
| `public/portfolio-design-desktop.svg` | **1,371.47 KB** | SVG | **No (Unused)** | **> 300 KB (1.37 MB)** unused mockup in `public/`. |
| `public/portfolio-design-mobile.svg` | **7,889.00 KB** | SVG | **No (Unused)** | **> 300 KB (7.89 MB)** unused mockup in `public/`. |
| `public/editable-design/portfolio-design-desktop-clean.svg` | 12.88 KB | SVG | **No (Unused)** | Unused mockup in `public/editable-design/`. |
| `public/editable-design/portfolio-design-desktop.svg` | **1,371.16 KB** | SVG | **No (Unused)** | **> 300 KB (1.37 MB)** unused mockup in `public/editable-design/`. |
| `public/editable-design/portfolio-design-mobile.svg` | 4.83 KB | SVG | **No (Unused)** | Unused mockup in `public/editable-design/`. |
| `public/file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg` | 0.12–1.34 KB | SVG | **No (Unused)** | Leftover Next.js create-next-app boilerplate SVGs. |

#### Alt Text Audit
- Every rendered `<img>` in the application (`components/ui/floating-card-gallery.tsx:287-294` and `379-386`) has explicit, descriptive `alt` text via `alt={project.imageAlt ?? `${project.title} preview`}`:
  - Card 01: `"GraphOps SOC Workbench preview"`
  - Card 02: `"Stylexy barber shop app preview"`
  - Card 03: `"Fall detection system for senior citizens preview"`
  - Card 04: `"Cinemate AI movie recommender preview"`
- Decorative SVGs and glow divs properly set `aria-hidden="true"`.

---

## E. Security & "Suspicious" Things

1. **Secrets / `.env` / Git Tracking:**
   - No `.env` files exist on disk or in `git ls-files`. `.gitignore:34` properly ignores `.env*`.
   - No hardcoded API keys, tokens, passwords, or private credentials exist anywhere in the codebase.
   - Public contact email `anuragkumar9678@gmail.com` is in `components/sections/contact.tsx:8` as a plain `mailto:` link (standard for portfolios; low-severity note: bots can scrape plain-text `mailto:` addresses from static HTML).
2. **Unsafe Code & Network Calls:**
   - Zero instances of `dangerouslySetInnerHTML`, `eval`, `new Function`, `innerHTML`, `fetch`, `XMLHttpRequest`, `WebSocket`, `navigator.sendBeacon`, `<iframe>`, or third-party tracking scripts.
   - No `http://` mixed-content links in runtime code (only comments and SVG XML namespaces).
   - No `postinstall` or lifecycle hooks in `package.json`.
   - Dependencies in `package.json` (`clsx`, `framer-motion`, `lucide-react`, `next`, `react`, `react-dom`, `tailwind-merge`) strictly match the allowed list + standard Next/Tailwind/shadcn `cn()` helper.
3. **Contact Section Behavior:**
   - `components/sections/contact.tsx` has **no `<form>`** and does not submit data to any backend endpoint; it renders a `mailto:anuragkumar9678@gmail.com` CTA button and 3 external/mailto links (Email, GitHub, LinkedIn).
4. **`npm audit` Vulnerabilities (11 total: 1 Critical, 3 High, 7 Moderate):**
   - **Critical (`next` `16.0.0 - 16.4.4`, currently `16.3.6`):** Multiple advisories (`GHSA-3w37-wq28-93x7`, `GHSA-2464-fhr4-w9xw`, `GHSA-673q-mjm6-r5xr`, etc.) patched in `next@16.4.6`.
   - **High (`sharp <0.35.5`):** `GHSA-wq5f-xc86-pv6w` (librsvg CVE-2026-96889).
   - **High (`source-map-js 1.0.0 - 1.2.1`):** `GHSA-68fv-2mgg-jv7q` (DoS via indexed source-map section offsets).
   - **High (`zod <4.6.6`):** `GHSA-mrhx-c7xc-m3w5` (memory exhaustion on oversized constrained collections).
   - **Moderate (`minimatch 7.0.0 - 11.0.0` via `@typescript-eslint/*`):** `GHSA-g3hv-75wg-m249`.
5. **Security Headers (`next.config.ts:4-36`):**
   - Configures `X-DNS-Prefetch-Control`, `Strict-Transport-Security`, `X-Frame-Options: SAMEORIGIN`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: origin-when-cross-origin`, and `Permissions-Policy`. (Note: no `Content-Security-Policy` header is configured yet).

---

## F. Accessibility (a11y) Audit

1. **[MEDIUM] Nested Interactive Controls Inside `<motion.article role="button" tabIndex={0}>` (`components/ui/floating-card-gallery.tsx:250-414`):**
   - Each project card `<motion.article>` has `role="button"` and `tabIndex={0}` (`lines 260-261`), and contains child `<a href="...">` links (`GitHubLink`, `LiveLink`, `ApkLink`) and, when expanded, `<div role="dialog">` with `<button className="work-overlay-close">` inside the same `<article role="button">`.
   - **Why this is a problem:** According to WAI-ARIA 1.2 and HTML5 specs, an element with `role="button"` makes all of its descendants presentational (`childrenArePresentational: true`), which can cause screen readers (NVDA, VoiceOver, JAWS) to ignore or misannounce the inner GitHub/LIVE/DOWNLOAD APK links and the nested `role="dialog"`.
2. **[MEDIUM] Landmark Structure (`<main>` Only Wraps Hero, Not Sections 01–05):**
   - `components/glass-hero.tsx:164` wraps `<section className="hero">` in `<main>...</main>`, and `<header className="hero__nav">` is nested *inside* `<main><section className="hero">` (`line 261`).
   - Meanwhile, in `app/page.tsx:17-23`, `<div className="page-flow">` (which contains `01 About`, `02 Skills`, `03 Work`, `04 Experiments`, and `05 Contact`) sits **outside** `<main>`. Screen-reader users navigating to the `<main>` landmark only land on the hero, while the actual portfolio content (`<div className="page-flow">`) is outside any landmark.
3. **[LOW-MEDIUM] Dialog Focus Management (`components/ui/floating-card-gallery.tsx:341-410`):**
   - When `.work-overlay` (`role="dialog"`) opens, `autoFocus` moves focus to `.work-overlay-close` (`line 355`), `Escape` closes it (`lines 170-180`), and `closeCard` returns focus to the card (`line 166`).
   - However, `.work-overlay` lacks `aria-modal="true"` and has no focus trap (`Tab` can move focus out of the open overlay to cards behind/after it).
4. **[LOW] Color Contrast on Decorative / Muted Numbers:**
   - `.experiments-index` (`app/globals.css:2003` / `1944`): `color: rgba(14, 165, 233, 0.22)` on `#EEF5FF` has a low contrast ratio (~1.35:1), which is fine only because `<span className="experiments-index" aria-hidden="true">` (`components/sections/experiments.tsx:100`) is marked `aria-hidden="true"`.
   - Primary text colors (`#0B1220` headings on `#EEF5FF` ≈ 16.8:1, `#475569` body on `#EEF5FF` ≈ 6.7:1, `#64748B` muted labels on `#EEF5FF` ≈ 4.3:1) meet WCAG AA contrast requirements.
5. **[LOW] Reduced Motion Gap in Duplicate About CSS (`app/globals.css:1191-1205`):**
   - As detailed in Section A2 (#5), the duplicated `.about-row` block overrides the first `@media (prefers-reduced-motion: reduce)` rule, leaving `.about-row:hover` with `transform: translateY(-3px)` even when `prefers-reduced-motion: reduce` is enabled.
