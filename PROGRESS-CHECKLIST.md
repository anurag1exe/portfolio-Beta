# Portfolio -> SPA Scroll Conversion - Progress Checklist

> Maintained automatically - items get ticked as each part completes.
> Guarantee: `components/glass-hero.tsx` and every existing `.hero*` CSS rule stay untouched.

## Phase 0 - Tracking
- [x] Create this checklist file (PROGRESS-CHECKLIST.md)

## Phase 1 - CSS foundation (globals.css, APPEND-ONLY)
- [x] PAGE FLOW banner + html smooth scrolling (+ reduced-motion opt-out)
- [x] `.hero { touch-action: pan-y }` append (mobile scroll fix over the hero)
- [x] `.page-flow` wrapper + `.pf-*` primitives (mono font, gutters, section rhythm, glass card)

## Phase 2 - Shared primitives (components/sections/)
- [x] `reveal.tsx` - Framer Motion scroll reveal (once, reduced-motion aware)
- [x] `section-heading.tsx` - numbered eyebrow (01 / About style) + display title
- [x] `icons.tsx` - inline SVG icons (GitHub, LinkedIn, Mail, ArrowUpRight, Code, ArrowUp)

## Phase 3 - Section components
- [x] `about.tsx` - 01 / About
- [x] `work.tsx` - 02 / Work (3-col grid, aspect-video thumbs, sky numbers, badge pills, Code/Live buttons)
- [x] `experiments.tsx` - 03 / Experiments (3-col grid, code-icon headers, tech pills)
- [x] `contact.tsx` - 04 / Contact (max-w-5xl mega card, divider, link row, footer + back-to-top)

## Phase 4 - Assembly
- [x] Rewire `app/page.tsx`: GlassHero + page-flow(About, Work, Experiments, Contact)
- [x] Verify `components/glass-hero.tsx` untouched (297 lines, byte-identical)

## Phase 5 - Validation
- [x] `next build` passes
- [x] Final file re-read confirms complete state

## Post-conversion tweaks (user requests)
- [x] Remove hero bottom-left action bar (Skills / Projects / Resume pills + hover preview) — obsolete switcher navigation; `DynamicActionBarDemo` import + Layer 6 JSX removed from `glass-hero.tsx`, build re-verified green

## Your real content (placeholder data is clearly marked with TODO comments)
- [ ] Replace PROJECTS in `components/sections/work.tsx`
- [ ] Replace EXPERIMENTS in `components/sections/experiments.tsx`
- [x] Replace About copy + stats in `components/sections/about.tsx` (shipped via the bluish redesign below)
- [ ] Replace placeholder EMAIL in `components/sections/contact.tsx`

## About bluish redesign (user request)
- [x] Fonts added to `app/layout.tsx`: Space Grotesk 500/700 + Manrope 400/500 + JetBrains Mono 500 via `next/font` (display swap, auto fallbacks); Albert Sans / Fragment Mono kept for hero + other sections
- [x] APPEND-ONLY `ABOUT` block in `app/globals.css`: `--ab-*` variables, ice-blue bg + top-right radial glow, glass card (rgba white 0.65 / sky border / blur 10px / radius 16px / soft shadow), gradient tagline, 60px underline, bio, 4 chips, CURRENTLY rows, pulsing dot, hover lift + glow, reduced-motion, ≤900px single column
- [x] `components/sections/about.tsx` rewritten: semantic HTML (section/h2/p/ul), IntersectionObserver fade-up + blur reveal with 80ms stagger, exact user copy
- [x] `next build` re-verified green (compiled 2.2s, TypeScript 2.9s, 4/4 static pages)
