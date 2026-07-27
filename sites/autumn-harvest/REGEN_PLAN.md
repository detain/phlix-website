# REGEN_PLAN.md — autumn-harvest

## Experience Fields

| Field | Old site | New site |
|-------|----------|----------|
| site_architecture | wrong nav (8 items, no primary emphasis) | 5-item nav, Features+Download are `nav-menu__link--primary` |
| homepage_narrative | missing all 5 section ids | `welcome`, `why`, `features`, `proof`, `gather` in order |
| page_blueprints | present but generic | fully brand-aligned per kit |
| copy_overlay | generic | kit voice + tagline_primary "Settle In. The Season Is Perfect." |
| feature_casting | present | 8 features from content.json |
| copy_treatments | generic | warm, unhurried, Lora body, Playfair headlines |
| faq_experience | generic accordion | 6 FAQ items with `<details>` + warm copy |
| hero_experience | generic gradient | Golden Hour gradient + drifting leaves + Mabel mascot tips |
| navigation_model | 8-item nav | 5 primary nav + 3 footer columns |
| scroll_experience | basic | scroll-reveal fades + leaf drift animation |
| easter_eggs | none | logo-clicks:5, typed-word:cider, time-of-day:18:00..22:00 |
| conversion_funnel | absent | 3-rung CTA ladder |
| proof_strategy | absent | client logos + ecosystem repos |
| visitor_paths | absent | clear CTAs on every page |
| experience_archetype | narrative-scroll | narrative-scroll |
| complexity_profile | absent | minimal density, plain-language, 100 words/section max |
| seasonal_activation | absent | live-js mode, 4 seasonal variants |
| error_page_experience | absent | 404.html with warm content + recovery links |
| persona_vignettes | absent | hero copy speaks to families + cozy-media lovers |
| intensity_toggle | absent (→ default: off) | default behavioral intensity |
| mascot.behavior | absent | Mabel in bottom-right on Home/Features/Download/About |

## Nav Diff

| Old | New |
|-----|-----|
| Home, Features, Clients, Download, Plugins, Docs, Hub, About | Home, Features, Clients, Download, About |
| plugins/docs/hub in primary nav | demoted to footer columns |

**Demoted to footer:** `plugins`, `docs`, `hub`

## Home Section Order

| # | old → new |
|---|-----------|
| 1 | (was hero) → `welcome` (copy_overlay.hero) |
| 2 | (was pitch) → `why` (story/major) |
| 3 | (was features overview) → `features` (feature_casting) |
| 4 | (was client logos) → `proof` (proof_strategy/minor) |
| 5 | (was CTA) → `gather` (conversion_funnel/major) |

## Carry-forward from old site

- Palette tokens (already correct)
- Font declarations (Playfair 700/900, Lora 400/500, Nunito 400/600/700, Inconsolata 400/700)
- SVG leaf decorations in hero
- Card radius/border/shadow tokens
- Warm bark-brown shadow colors
- Logo SVG and favicon SVGs
- CSS reset and base token set

## Ambiguities resolved

- **Strong emphasis**: kit caps Lora at 400/500 — using 500 alone is sub-perceptual per §19.17. Adding `--color-text-accent: #b05016` (safe 4.5:1 on bg) as second channel for `<strong>`.
- **Seasonal contrast**: all seasonal variants computed against the brief's contrast table; Deep Harvest primary (#a82b14) at 5.98:1 ✓, First Frost Eve tertiary (#b87d12) measured.
- **CTA ladder**: kit declares 3 rungs `[object Object]` × 3 — will use content.json primary_cta + secondary_cta + download CTAs.
- **Mabel mascot**: `placement: bottom-right` — must not overlap primary CTA at 320px (§19.11). Position: fixed bottom-right with `right: env(safe-area-inset-right, 16px)` and z-index below CTA.

## Known issues carried forward

- img/ directory has logo.svg, favicon.svg, og.svg, og.png, icon PNGs — artwork for mascot not yet rendered; BUILD_LOG notes this.

---
@copyright 2026 Joe Huss <detain@interserver.net>
