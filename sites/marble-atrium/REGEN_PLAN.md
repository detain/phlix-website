# REGEN_PLAN.md — Marble Atrium (`marble-atrium`)

## 1. Experience Fields

| Field | Old site | New site |
|-------|----------|----------|
| `site_architecture` | default 8-link nav | 6-link nav per kit: The Atrium / The Collection / Every Screen / Your Copy / Everywhere / Our Craft; plugins/docs demoted to footer |
| `homepage_narrative` | 4 sections (hero/pitch/features/cta) | 6 sections per kit: entrance / why-curate / the-library / more-features / the-case / your-library |
| `page_blueprints` | generic editorial | editorial-grid (features), device-family (clients), two-steps (download), chapter-sections (about) |
| `copy_overlay` | content.json verbatim | kit hero (eyebrow: "Five-star media curation", headline: "Your Library, Elevated.", CTA: "Arrange Your Library"), section headings, footer tagline |
| `feature_casting` | all 8 features on home | hero: library + syncplay (per kit angle copy); support: transcode/auth/hub/livetv; footnote: dlna/plugins |
| `copy_treatments` | bare lists | pitch: polished-checklist; FAQ: letters-column (concierge voice); clients: device-showcase; ecosystem: architectural-repos |
| `faq_experience` | plain dl | letters-column frame with concierge persona, 6 canonical + 2 extra questions |
| `hero_experience` | generic hero | static-luxury: marble-white, glass-ceiling grid, centered symmetry, no JS animation |
| `navigation_model` | plain topbar | topbar: wordmark left / nav center / gold CTA right; active: 1px gold underline |
| `scroll_experience` | continuous | continuous plain scroll; hairline dividers between sections |
| `easter_eggs` | none | logo-clicks:5 → marble-vein pulse + concierge toast |
| `conversion_funnel` | "Get Phlix" | guided-steps: 3 rungs (Arrange Your Library → Pick Your Viewing Room → Elevate Your Setup) |
| `proof_strategy` | none | spec-numbers placard + GitHub link (live stars) + verbatim pitch_bullet quote |
| `visitor_paths` | none | self-select fork: curator / family / everywhere |
| `experience_archetype` | — | editorial (declared) |
| `complexity_profile` | — | minimal density, 6 home sections max, 85 words/section max |
| `intensity_toggle` | none | "Dim the lights" toggle in footer utility row |
| `seasonal_activation` | none | live-js date gate; Winter Gala (Dec), Spring Bloom (Mar-May), Midsummer Terrace (Jun-Sep) |
| `error_page_experience` | 404 missing | "Wrong Floor" concierge elevator concept, recovery links to home/features/download |
| `persona_vignettes` | — | informational (seeds img/PROMPTS.md) |
| **Absent → default** | mascot (null), extra_pages (none) | — |

## 2. Nav Diff

| Old label | New label | Emphasis | Notes |
|-----------|-----------|----------|-------|
| Home | The Atrium | default | |
| Features | The Collection | **primary** | gold underline |
| Clients | Every Screen | default | |
| Download | Your Copy | **primary** | gold underline |
| Plugins | _(demoted to footer)_ | — | |
| Docs | _(demoted to footer)_ | — | |
| Hub | Everywhere | default | |
| About | Our Craft | muted | veining-grey color |

Three distinct emphasis levels: default / primary (gold underline) / muted (grey).

## 3. Home Section Order

| # | Old | New (per kit) | Treatment |
|---|-----|---------------|-----------|
| 1 | hero | `entrance` | copy_overlay.hero — marble-white atrium with glass-ceiling grid, centered headline |
| 2 | pitch | `why-curate` | story section — "Why does your media deserve this?" |
| 3 | features | `the-library` | feature_casting — Library + SyncPlay as two hero panels |
| 4 | — | `more-features` | 6 support/footnote features on Carrara Surface cards |
| 5 | — | `the-case` | proof_strategy — spec placard + GitHub + quote |
| 6 | cta | `your-library` | conversion_funnel closing CTA |

## 4. Carry-forward

- CSS token system (`--color-*`, `--space-*`, `--radius-*`, `--shadow-*`, `--font-*`) from existing base.css
- Three stylesheet architecture (base/theme/components.css)
- Font-face rules for Cormorant Garamond 300/600, Cormorant 300, Jost 300/400/500, DM Mono 300/400
- Glass-ceiling grid geometry motif and marble-vein reveal animation (header_motif)
- All existing SVG icons (inline in HTML)
- img/ assets: logo.svg, favicon.svg, og.svg, og.png, icon PNGs

## 5. Ambiguities & Resolutions (per §19.6)

| Conflict | Resolution |
|----------|------------|
| `page_blueprints.about` spec says "BSD-3-Clause"; `content.json` says MPL-2.0 + MIT | `content.json` wins on facts (§19.6 rule 4). License section uses `content.json` phrasing verbatim. |
| `copy_overlay.hero.primary_cta` label "Arrange Your Library" has href="/download" | Make visible text honest: "Arrange Your Library (the download)" per WCAG 2.5.3 §19.7 |
| Kit calls for Cormorant Garamond weight 400 but brief says "weight 400 NOT declared; do not vendor it" | Use weight 300 only for headline face; use weight 600 for emphasis within headline |
| `intensity_toggle` affects "animation, hover-effects, gradient-overlays" but site has minimal animation | Implement as CSS class on `<html>` that removes `.feature-card:hover` transforms and `.hero::before` gradient; default "full" class; calm mode removes it |

## 6. Escalations

- `og.svg` text updated to "Your Library, Elevated." per kit tagline; rasterize with `node tools/gen-og.mjs --site marble-atrium`
- Font `cormorant-garamond-400-latin.woff2` exists in pool but **not declared** by this kit per brief — NOT vendored

## 7. Verification Plan

- `node tools/selfcheck.mjs --site marble-atrium` — must pass
- `node tools/render-check.mjs --site marble-atrium` — must pass at 320px + 1280px + 200% zoom
