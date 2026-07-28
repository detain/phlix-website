# Wilderness Trail — Site Plan

## Site Overview
- **Slug:** wilderness-trail
- **Archetype:** narrative-scroll
- **Brand:** Vintage National Park Service poster — pine green, campfire orange, canvas tan, topographic contour overlays, Scout the ranger mascot
- **Font families:** Playfair Display (headline), Abril Fatface (display), Lora (body), Barlow Condensed (UI), IBM Plex Mono (mono)
- **License:** MPL-2.0 (Phlix Server + Hub), MIT (shared libs, plugins, clients)

## Nav Labels (site_architecture.nav)
| # | id | label | emphasis |
|---|---|-------|----------|
| 1 | home | Trailhead | default |
| 2 | features | Waypoints | primary |
| 3 | clients | Outposts | default |
| 4 | download | Set Camp | primary |
| 5 | hub | Relay Station | default |
| 6 | about | Field Notes | muted |

Demoted to footer: plugins, docs

## Pages (9 total)
1. `index.html` — Trailhead (home)
2. `features.html` — Waypoints
3. `clients.html` — Outposts
4. `download.html` — Set Camp
5. `hub.html` — Relay Station
6. `about.html` — Field Notes
7. `plugins.html` — Tools (demoted nav)
8. `docs.html` — Docs (demoted nav)
9. `expedition-guide.html` — extra_pages
10. `404.html` — Wrong trail concept

## Homepage Sections (homepage_narrative.sections[])
| # | id | source | treatment |
|---|---|--------|-----------|
| 1 | trailhead-call | copy_overlay.hero | Full-bleed ranger station poster: Scout points to peaks |
| 2 | key-waypoints | feature_casting | 2 hero features as trail waypoints on topo map |
| 3 | why-this-trail | story | 7 pitch bullets as trail blazes on a post |
| 4 | trail-proven | proof_strategy | Ranger placard: specs + live GitHub links |
| 5 | start-hiking | conversion_funnel | 3-rung CTA ladder + install command |

## Contrast-safe colour overrides (measured, not kit prose)
- `--color-tertiary-safe: #a14314` — campfire orange safe for small text on canvas
- `--color-secondary-safe: #2f6486` — sky blue safe for small text on canvas
- `--color-fab-text-safe: #625e54` — fab label text on campfire orange bg
- `--color-text-muted-safe: #785a39` — muted text on canvas-tan for small sizes

## Experience Features Implemented
- `hero_experience`: guided-reveal with Scout SVG + parallax (CSS-only fallback)
- `navigation_model`: topbar with trail-blaze diamond separators, campfire ember active state
- `scroll_experience`: chaptered sections with `section-reveal` animation + topo texture
- `easter_eggs`: logo-clicks:5 (Scout tips hat) + typed-word:summit (peak cursor)
- `mascot.behavior`: Scout fixed bottom-right on home/download/about, dismissible to localStorage
- `intensity_toggle`: "Dim the Campfire" checkbox in footer, persisted to localStorage
- `seasonal_activation`: live-js, applies data-season on html, seasonal banner via JS
- `faq_experience`: campfire-qa frame, 6 questions from content.json, Scout persona
- `error_page_experience`: Scout at wrong trail sign, 3 recovery links

## CSS Rules Applied
1. `minmax(0, 1fr)` on all grid tracks (not bare `1fr`)
2. `overflow-wrap: anywhere` on `p, li, dt, dd, a, span, code, kbd, samp, pre`
3. `overflow-wrap: break-word` + `hyphens: auto` on `h1–h6, blockquote`
4. No `overflow: hidden` on containers with reflowing text
5. `.visually-hidden { overflow: hidden; clip-path: inset(50%); }` (§19.15)
6. `@font-face` self-hosted only — no CDN

## Install Command (from content.json.install.primary)
```
curl -fsSL https://raw.githubusercontent.com/detain/phlix-server/master/scripts/install.sh | sudo bash
```
(copied verbatim, never retyped)
