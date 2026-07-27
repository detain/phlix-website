# Chrome Velocity — Build Log

## What Was Built

### Pages (9 total)
- `index.html` — Home with 5 sections: race-start (hero), the-lineup (features), speed-formula (pitch), pit-credentials (proof), throttle-up (CTA)
- `features.html` — All 8 features as telemetry-dashboard cards
- `clients.html` — 5 clients as pit-crew roster cards
- `download.html` — Race briefing layout: server install + client selector + ecosystem
- `plugins.html` — Plugin model documentation
- `docs.html` — Documentation link-out page
- `hub.html` — Phlix Hub relay explanation
- `about.html` — Philosophy, license, contributing, FAQ
- `404.html` — DNF (Did Not Finish) error page with Vector mascot

### Styles (3 files)
- `css/base.css` — Tokens, reset, @font-face, skip-link, focus states, reduced motion
- `css/theme.css` — Typography, layout containers, all section components
- `css/components.css` — Header/nav, footer, buttons, cards, badges, forms, mascot, easter eggs

### JavaScript
- `js/main.js` — Mobile nav toggle, reduced motion detection, mascot Vector, logo click easter egg (5 clicks), typed-word easter egg ("vector"), seasonal activation, scroll reveals

### Config Files
- `robots.txt` — Allow all, sitemap reference
- `sitemap.xml` — All 8 canonical pages
- `REGEN_PLAN.md` — Experience field mapping and decisions
- `SITE.md` — Design documentation

## Intentional Deviations

- **@font-face weights:** Kit asks for Barlow Condensed 700, 800 only for headline/display. Used Barlow 400, 500, 600 for body/UI roles per kit's declared weights pool. JetBrains Mono 400, 600 for mono role.
- **Seasonal variants:** Live-JS seasonal activation is included but the contrast table was measured against default palette. Seasonal variants ship with their declared overrides; contrast was not re-measured per-variant.
- **Mascot at 320px:** Mascot is hidden below 768px per §19.11 (fixed companion must not cover CTA at 320px).
- **Font file naming:** Using the exact pool filenames from `shared/assets/fonts/` with the weights the kit declares.

## Known Follow-ups

- Seasonal motif assets (`img/seasonal/*.svg`) are referenced in the kit but no artwork exists. Declared in BUILD_LOG per instructions — not a defect.
- The kit's `proof_strategy` mentions linking to live GitHub stars. This is implemented as text links to the repos; the static page cannot display verified live counts.
- `intensity_toggle` is absent from the kit (null), so no calm-mode toggle was built.
