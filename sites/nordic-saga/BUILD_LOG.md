# BUILD_LOG.md — Nordic Saga

## Build Summary

Regenerated 2026-07-27. This is a fresh regen from the Nordic Saga brand kit, following the narrative-scroll archetype.

## What Was Built

### Pages (9 HTML files)
- `index.html` — 6-section homepage: opening-rune hero, the-saga story, featured-halls (2 features), full-arsenal (6 features), proof-and-honor, the-summons CTA
- `features.html` — All 8 features in alternating two-column layout with icons
- `clients.html` — 5 clients (Roku, Tizen, Windows, Mobile beta, DLNA) as cards
- `download.html` — Three install blocks (primary, HTTPS, from-source), requirements, ecosystem
- `plugins.html` — Plugin system description (demoted page, fold into features)
- `docs.html` — Link-out to VitePress docs
- `hub.html` — Phlix Hub description, how-it-works, self-host option
- `about.html` — Brand story, values, FAQ accordion with all 6 questions from content.json
- `404.html` — Runestone empty state, noindex, relative paths

### CSS (3 files)
- `css/base.css` — Reset, design tokens, element defaults, seasonal variants
- `css/theme.css` — @font-face declarations, typography, layout, hero, section structure, animations
- `css/components.css` — Header/nav, footer, buttons, cards, forms, badges, FAQ accordion, install block, mascot, error page

### JS (1 file)
- `js/main.js` — Nav toggle, scroll reveals (rune-burn), FAQ accordion, easter eggs (logo-clicks:5, typed-word:odin/rune), mascot (Huginn) behavior, seasonal class, reduced motion

### Assets
- `img/huginn.svg` — Geometric Nordic raven mascot SVG with ember-glow eye animation
- `img/og.png` — Generated from og.svg via tools/gen-og.mjs
- `sitemap.xml` — Generated via tools/gen-sitemap.mjs
- `robots.txt` — Generated via tools/gen-sitemap.mjs

### Documentation
- `REGEN_PLAN.md` — Field mapping, nav diff, section order, carry-forward, ambiguities, escalations
- `SITE.md` — Design rationale, palette, type, motion, layout, mascot, easter eggs, seasonal variants
- `BUILD_LOG.md` — This file

## Experience Fields Implemented

All 19 declared fields:
- site_architecture (thematic nav labels)
- homepage_narrative (6 sections)
- page_blueprints (per-kit copy treatments)
- copy_overlay (hero treatment)
- feature_casting (2 hero features)
- copy_treatments (rune-burn, carved-stone, knotwork)
- faq_experience (skald-announcement style)
- hero_experience (full-bleed + ember-glow)
- navigation_model (Cinzel UI labels)
- scroll_experience (slow wipe, stone-door fade)
- easter_eggs (3: logo-clicks:5, typed-word:odin, typed-word:rune)
- conversion_funnel (forge-styled CTA)
- proof_strategy (live GitHub links, no fabricated numbers)
- visitor_paths (narrative-scroll path)
- experience_archetype (narrative-scroll)
- complexity_profile (standard density, general reading, translate jargon)
- seasonal_activation (live-js via CSS media queries)
- error_page_experience (runestone/raven 404)
- persona_vignettes (Hero archetype from brand kit)
- mascot.behavior (Huginn with tips, easter interactions, dismissal)

Absent field (intensity_toggle) → default behavior, no toggle.

## Known Deviations / Notes

- Client count: Kit says "5 native clients" but content.json says 4 + DLNA = 5 total. Used content.json structure (4 named + DLNA) which matches the stated 5.
- Mobile client card shows "Mobile (iOS + Android)" as one entry per content.json structure
- `intensity_toggle` absent → no toggle implemented; seasonal variants handle color variation

## Verification

- selfcheck: pass
- render-check: pass
