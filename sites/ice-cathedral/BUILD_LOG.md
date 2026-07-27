# BUILD_LOG.md — Ice Cathedral

## What was built

Complete 9-page brand-kit site for the `ice-cathedral` kit, following the `editorial` experience archetype.

### Files produced

| Path | Description |
|------|-------------|
| `index.html` | Home — 5 narrative sections: the-void, chambers, why-enter, echoes, threshold |
| `features.html` | Vaulted Chambers — 8 features in tiered vault layout |
| `clients.html` | Windows & Apertures — 5 clients with unique clip-path aperture shapes |
| `download.html` | Cross the Threshold — 3-step install journey |
| `hub.html` | The Relay Chamber — Hub/NAT traversal explained with relay diagram |
| `about.html` | The Archive — Philosophy, Licence, Contributing, FAQ |
| `plugins.html` | Extensions — Plugin model + ecosystem |
| `docs.html` | Documentation — Link-out to external docs site + ecosystem |
| `404.html` | Crevasse error page with Crystal at chasm edge |
| `css/base.css` | Reset, token block, @font-face, skip-link, focus ring, reduced-motion |
| `css/theme.css` | Typography scale, layout containers, page structures |
| `css/components.css` | Header, nav, footer, buttons, cards, mascot, easter-egg overlays |
| `js/main.js` | Nav toggle, reduced-motion (with change listener), seasonal date-gate, easter eggs (logo-clicks:9, typed-word:cathedral), mascot Crystal |
| `robots.txt` | References sitemap.xml |
| `sitemap.xml` | All 8 canonical pages |
| `REGEN_PLAN.md` | Change manifest |
| `SITE.md` | Design rationale |
| `BUILD_LOG.md` | This file |

---

## Experience fields implemented

All 18 declared fields implemented:

- `site_architecture` — 6-item nav (Cathedral Entrance / Vaulted Chambers / Windows & Apertures / Cross the Threshold / The Relay Chamber / The Archive) + demoted footer nav for plugins+docs
- `homepage_narrative` — 5 sections in exact declared order (the-void → chambers → why-enter → echoes → threshold)
- `page_blueprints` — vaulted-chambers / aperture-gallery / threshold-passage / stone-archive applied
- `copy_overlay` — hero, section headings, footer tagline applied verbatim
- `feature_casting` — 2 hero + 4 support + 2 footnote features
- `copy_treatments` — pitch=stone-tablets, faq=archive-ledger, clients=aperture-gallery
- `faq_experience` — stone-carving frame, declared question_order, 2 extra_questions
- `hero_experience` — static fallback; JS geometric-reveal as enhancement (≤5KB budget)
- `navigation_model` — standard accessible topbar + hamburger mobile menu with ESC close
- `scroll_experience` — chaptered frost-spread CSS; reduced_motion = instant continuous scroll
- `easter_eggs` — logo-clicks:9 (rose-window refraction + bell tone reward) + typed-word:cathedral (lattice overlay)
- `conversion_funnel` — 3-step ladder (Cross the threshold / Choose your window / Light the forge)
- `proof_strategy` — 3 verified signals (architecture / github / licence) in echoes section
- `experience_archetype` — editorial
- `complexity_profile` — minimal density, general reading, jargon=translate, 5 sections max, 120 words max per section
- `mascot.behavior` — Crystal companion (bottom-right desktop / in-flow mobile), tips per section, easter_interactions (click:7 / hover-hold:3s), dismiss with localStorage
- `seasonal_activation` — live-js date-gate for 3 seasonal palette overrides
- `error_page_experience` — 404 as crevasse with Crystal, relative assets, noindex, 3 recovery links

Absent → default (not defects): `visitor_paths`, `intensity_toggle`

---

## Deviations from kit noted in plan

1. **`proof_strategy` signal 3** — Kit says "BSD-3-Clause across the board." Per §19.6 (content.json wins on facts), used MPL-2.0/MIT from content.json verbatim instead of the incorrect BSD claim.

2. **`cta_ladder`** — Values were "[object Object]" in brief data. Resolved to 3 step targets: cross the threshold → download, choose your window → clients, light the forge → download#server.

3. **`typed-word` trigger** — Brief specified `typed-word:cathedral`. Implemented: typing "cathedral" anywhere on the page triggers the rose-window lattice overlay.

---

## Notes

- Install command copied verbatim from `content.json.install.primary` — one line, line_count: 1
- All 5 ecosystem repos included with correct names and descriptions
- 6 FAQ items + 2 extra questions (per faq_experience.extra_questions, maps_to canonical answers)
- `@copyright 2026 Joe Huss <detain@interserver.net>` in every CSS and JS file
- Seasonal variant class application added to `<html>` by JS date-gate (no page reload required)
- All seasonal contrast pairs measured and within WCAG AA (pre-verified by kit-brief)
- No fabricated proof counts — GitHub signals link to live repo, not printed numbers
- Mascot dismissed via localStorage; restore affordance not provided (session-only silence, per kit)
