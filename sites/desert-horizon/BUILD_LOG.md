# BUILD_LOG.md — Desert Horizon

## What was built

Full brand-kit site for `desert-horizon` following `narrative-scroll` archetype and all 20 declared experience fields + mascot.behavior.

### Pages (9)
- `index.html` — Home with 6-section narrative scroll + visitor paths fork
- `features.html` — All 8 features as shelf-display detail cards
- `clients.html` — 5 client gathering-circle cards
- `download.html` — Server install block (verbatim from content.json), clients, ecosystem
- `plugins.html` — Plugin model + phlix-plugin-example link
- `docs.html` — Link-out to 4 doc categories + ecosystem list
- `hub.html` — Hub relay, NAT traversal, self-host vs public, client Hub modes
- `about.html` — Philosophy, license, contributing, 9-item FAQ (Dusty campfire-chat)
- `404.html` — Dusty confused on empty desert with torn map, 3 recovery links, `noindex`

### CSS (3)
- `css/base.css` — Reset, 10 @font-face rules (self-hosted WOFF2), design tokens, seasonal variants, skip link, focus ring, `.visually-hidden` (overflow:hidden+clip-path), prefers-reduced-motion
- `css/theme.css` — Typography scale, Navajo-pattern strip, layout containers, hero with parallax layers (ridge/sun), pitch wooden-plaques, feature grid, gather proof band, stay-rooted CTA, scroll reveals, visitor paths
- `css/components.css` — Header/nav (3 emphasis levels), footer (mirror-nav + 3 columns), all button variants (focus ring includes BOTH shadows in one list), status badges, mascot companion, easter egg toast, season banner, intensity toggle switch

### JS (1)
- `js/main.js` — Seasonal activation (date-gate), intensity toggle (localStorage), mobile nav toggle (Esc + outside click), scroll reveals (IntersectionObserver), parallax hero (pointer + scroll), 3 easter eggs (logo-clicks:5, typed-word:horizon, time-of-day:sunset-zone), mascot companion (tips, click:3 + hover-hold:2s easter interactions, dismiss to localStorage), visitor paths fork, FAQ aria

### Config
- `robots.txt` — Sitemap reference
- `sitemap.xml` — 8 pages (404 excluded per noindex)
- `REGEN_PLAN.md` — Compact field manifest, nav diff, section order, carry-forward, ambiguities
- `SITE.md` — Full design rationale
- `BUILD_LOG.md` — This file

## Intentional deviations from predecessor

- All 6 nav labels replaced with kit-declared values ("The Trading Post", etc.)
- All 6 homepage section IDs replaced with declared `homepage_narrative` order
- 404.html created (was missing)
- mascot.behavior implemented (was absent)
- Seasonal activation (live-js date-gate) implemented (was absent)
- Intensity toggle in footer utility row (was absent)
- Visitor paths fork on homepage (was absent)
- All `@font-face` self-hosted from shared font pool (predecessor had CDN links)

## Constraints applied

- `complexity_profile.density: minimal` + `words_per_section_max: 100` enforced for authored prose; verbatim content.json facts exempt
- `avoid_words` list avoided throughout: leverage, synergy, utilize, disrupt, cutting-edge, robust, seamless, ecosystem, unlock, empower
- Install command copied verbatim from `content.json.install.primary` — never retyped
- `install.from_source` labelled "not an install" per §19.22
- `proof_strategy` signals: no invented star counts — GitHub repo links used instead
- All `@copyright` headers in every CSS/JS file (§19.24)
- Grid tracks: `minmax(0, 1fr)` not bare `1fr` (§19.12)
- Body text: `overflow-wrap: anywhere`; headings: `break-word` (§19.12)
- Focus box-shadow: both the control's own shadow AND focus ring in one list (§19.1)
- Reduced motion: `transition-duration: 0.01ms` not just animation removed (§19.20)
- mascot at 320px: `display:none` below 768px (§19.14)

## Assets preserved (not modified)

- `img/logo.svg`, `img/favicon.svg`, `img/og.svg`, `img/og.png` — pre-existing, correct per brief
- `img/PROMPTS.md` — untouched
- Font WOFF2 files — self-hosted from `../../assets/fonts/` pool

## Escalations (none)

No shared changes were needed; all facts resolved from `content.json` and the font pool without substitution.
