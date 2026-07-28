# BUILD_LOG.md — Soundwave Studio

## What was built

A complete brand-kit marketing site for the **Soundwave Studio** kit — professional recording studio aesthetic applied to Phlix media server.

### Pages (9 HTML files)

| Page | File | Notes |
|------|------|-------|
| Home | index.html | 5-section narrative: console-rise (hero), the-takes, craft, real-sessions, press-play |
| Features | features.html | Channel-strip grid layout per page_blueprints |
| Clients | clients.html | Monitor-wall gallery per page_blueprints |
| Download | download.html | Mixing-console layout per page_blueprints |
| Plugins | plugins.html | Session-notes format |
| Docs | docs.html | Link-out + ecosystem summary |
| Hub | hub.html | Hub relay diagram + feature cards |
| About | about.html | Session-notes + man-page FAQ per faq_experience |
| 404 | 404.html | Flat-line waveform, no-signal concept, noindex |

### CSS (3 files)

| File | Contents |
|------|----------|
| css/base.css | Reset, design tokens (:root), element defaults, focus, reduced-motion |
| css/theme.css | Typography, layout containers, page structure, components |
| css/components.css | Header/nav, footer, buttons, cards, badges, mascot, easter eggs |

### JS (1 file)

| File | Contents |
|------|----------|
| js/main.js | Mobile nav, reduced-motion, scroll reveals, intensity toggle, easter eggs (logo-clicks, typed tape/signal), mascot companion, seasonal activation |

### Assets

| Asset | File |
|-------|------|
| Logo | img/logo.svg |
| Favicon | img/favicon.svg |
| Social card | img/og.png (generated from og.svg) |
| Prompts | img/PROMPTS.md |

### Config

| File | Purpose |
|------|---------|
| robots.txt | Allow all, sitemap reference |
| sitemap.xml | All 8 canonical pages |
| REGEN_PLAN.md | Change manifest |
| SITE.md | Design rationale |
| BUILD_LOG.md | This file |

## Intentional deviations from generic template

1. **Custom nav labels:** Session / Signal Map / Monitors / Roll Tape / Relay / Credits (per site_architecture)
2. **5-section homepage:** per homepage_narrative.sections[] — not the generic 4-section home
3. **Demoted pages:** Plugins and Docs moved to footer, not primary nav (per site_architecture.demoted_pages)
4. **Mascot:** Waveform companion at bottom-right, per mascot.behavior
5. **Easter eggs:** Logo click (3x), typed "tape", typed "signal"
6. **Intensity toggle:** "Quiet Session" in footer utility row
7. **Seasonal activation:** Live JS date-gate for New Year / Summer / Halloween variants
8. **VU meter nav indicator:** Activity pulse bar in header
9. **Channel-strip grid:** Features page layout per page_blueprints.console
10. **Monitor wall:** Clients page layout per page_blueprints.monitor-wall
11. **Mixing console download page:** 3-section layout per page_blueprints.download

## Known follow-ups

- Replace placeholder og.png with rasterized version from og.svg via tools/gen-og.mjs
- Add actual screenshots to verify render at all breakpoints
