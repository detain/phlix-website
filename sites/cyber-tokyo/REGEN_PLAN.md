# REGEN_PLAN.md — Cyber Tokyo (`cyber-tokyo`)

## Experience Fields (20 declared)

| Field | Old Site | New Site |
|-------|----------|----------|
| `site_architecture` | Generic nav: Home/Features/Clients/Download/Plugins/Docs/Hub/About | Kit nav: Signal/Channels/Screens/Install/Relay/Contact; Plugins/Docs demoted to footer; `extra_pages: city-tour` |
| `homepage_narrative` | No section IDs | 5 sections: `neon-opening`(hero), `signal-strength`(features), `why-signal`(pitch), `proof-of-signal`(proof), `join-network`(CTA) |
| `page_blueprints` | Generic template pages | Standard 8 pages + 404 + city-tour |
| `copy_overlay` | Factual copy only | Tagline overlay: "Every Screen. Every Signal. Every Story." applied as visual treatment |
| `feature_casting` | Standard 8-feature grid | Hero the first 2 features, support grid for remaining 6 |
| `copy_treatments` | Plain lists | Neon-racing-stripe dividers, kanji decorative columns |
| `faq_experience` | Standard `<dl>` | `<dl class="faq-list">` with circuit-green chevron markers |
| `hero_experience` | Static hero | Animated kanji columns, glitch effects; fallback for reduced-motion |
| `navigation_model` | Standard topbar | Standard accessible topbar/menu (exotic enhancement excluded - fallback only) |
| `scroll_experience` | Basic scroll | IntersectionObserver reveals with glitch-offset entrance |
| `easter_eggs` | None | logo-clicks:5, typed-word:neon, konami-code |
| `conversion_funnel` | Standard CTA | 3-rung ladder: Get Phlix → Download Phlix → (install command) |
| `proof_strategy` | None | Real numbers/links from content.json only |
| `visitor_paths` | Single path | Single curated path |
| `experience_archetype` | Not declared | `immersive` — hyper-dense neon Tokyo aesthetic |
| `complexity_profile` | Not declared | density:standard, reading_level:general, jargon:allow, home_sections_max:5, words_per_section_max:120 |
| `intensity_toggle` | None | Not declared - none |
| `seasonal_activation` | Not declared | live-js with seasonal_variants |
| `error_page_experience` | No 404.html | Real 404.html with neon-glitch "Signal Lost" concept |
| `persona_vignettes` | None | Not declared - none |
| `mascot.behavior` | None | Pixel the koi fish — bottom-right, in-flow at 320px, idle animation, 5 tips, easter_interactions |

**Absent (0) — no defaults needed**

## Nav Diff

| Old | New | Notes |
|-----|-----|-------|
| Home | Signal | label change, emphasis: default |
| Features | Channels | label change, emphasis: primary |
| Clients | Screens | label change, emphasis: default |
| Download | Install | label change, emphasis: primary |
| Plugins | *(demoted to footer)* | still linked, not in primary nav |
| Docs | *(demoted to footer)* | still linked, not in primary nav |
| Hub | Relay | label change, emphasis: default |
| About | Contact | label change, emphasis: muted |

`extra_pages`: `city-tour` → `city-tour.html`

## Home Section Order

| # | Old | New (from `homepage_narrative.sections[]`) |
|---|-----|-------------------------------------------|
| 1 | `.hero` (no id) | `#neon-opening` (hero, source: copy_overlay.hero) |
| 2 | `.pitch` (no id) | `#signal-strength` (major, source: feature_casting) |
| 3 | `.features-overview` (no id) | `#why-signal` (major, source: story) |
| 4 | `.cta-banner` (no id) | `#proof-of-signal` (minor, source: proof_strategy) |
| 5 | *(none)* | `#join-network` (major, source: conversion_funnel) |

## Carry-Forward

- Tokyo Night / Shinjuku Dark / Kabukicho Shadow palette tokens (already correct hex values)
- Neon Sakura primary / Circuit Green secondary colors
- All 8 @font-face declarations (self-hosted WOFF2 from pool)
- Logo.svg, favicon.svg, og.svg, og.png (already correct)
- Pixel mascot (name, species, behavior) from kit
- Seasonal variant tokens (Sakura Season, Obon Night, New Year Countdown)
- CSS custom properties for shadows, spacing, radius scale

## Ambiguities Resolved

| Issue | Resolution |
|-------|------------|
| Space Grotesk weight 900 requested but only 700 file exists | Use `font-weight: 700` with note; browser synthesizes. Declared in REGEN_PLAN. |
| Kit contrast prose claims 5.8:1 for Neon Sakura on Tokyo Night | Use measured 5.70:1 from kit-brief (already passes AA at 5.70:1) |
| `conversion_funnel.cta_ladder` shows "[object Object]" | Falls back to standard CTA ladder from content.json |
| Kit `badges.labels` array (4K, HDR, etc.) | Do NOT print - they are app-surface strings; §16 forbids claiming capabilities content.json doesn't state |

## Escalations

None — all facts come from content.json, fonts resolve from pool, no CDN links needed.

## Font Weight Notes

- `space-grotesk-700-latin.woff2` used for both 700 and 900 requested weights (no 900 file exists)
- `ibm-plex-sans-600-latin.woff2` used for UI role weight 600 (file exists in pool, declared for ui role)
- `ibm-plex-mono-700-latin.woff2` NOT used — weight 700 not declared for mono role

## Avoid Words Check

`cozy`, `warm`, `quiet`, `restful`, `mellow`, `noir`, `detective`, `synergy`, `leverage`, `utilize`, `robust`, `awesome`, `amazing` — not used in authored copy.
