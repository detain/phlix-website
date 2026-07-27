# REGEN_PLAN.md — editorial-underground

## 1. Experience Fields

| Field | Old site | New site |
|-------|---------|----------|
| `site_architecture` | generic 8-link nav | Custom nav: The Broadcast / The Signal / The Receivers / Take It / Everywhere / Why We Made It (6 items, 3 emphasis levels); plugins/docs demoted to footer |
| `homepage_narrative` | default section order | manifesto-hero → why-now → what-we-built → who-runs-it → take-it (5 sections, manifesto-first arc) |
| `page_blueprints` | generic | features: poster-wall; clients: device-lineup; download: terminal-command; about: essay-scroll |
| `copy_overlay` | none | hero/eyebrow: "No Signal. No Permission."; headline: "Just Play."; footer tagline: "The signal refuses to be silenced." |
| `feature_casting` | all 8 on home | hero: library + syncplay; support: transcode, auth, hub; footnote: dlna, livetv, plugins |
| `copy_treatments` | generic lists | pitch_bullets: manifest-stanzas; FAQ: manifesto-qa; clients: device-lineup |
| `faq_experience` | default order | manifesto-qa frame; Riot persona; custom question_order + 3 extra_questions mapped to canonical |
| `hero_experience` | generic | Static xerox-cut ransom-letter collage, 0 animation, halftone treatment |
| `navigation_model` | generic | topbar with 2px yellow bottom border, vertical yellow active bar (full height), no hover effects |
| `scroll_experience` | default | Hard-cut sections with diagonal slash dividers in yellow; continuous scroll under reduced-motion |
| `easter_eggs` | none | konami-code (Riot flickers + yellow flash) + typed-word:phlix (word highlights) |
| `conversion_funnel` | generic | instant-command style; cta_ladder: Take It → Pick a client → Paste and run |
| `proof_strategy` | generic | spec-numbers (real capability stats) + github (live link) + quote-from-docs; placement: "The Facts" band |
| `experience_archetype` | not set | zine |
| `complexity_profile` | not set | dense, technical, jargon:foreground; home_sections_max=5, words_per_section_max=120 |
| `seasonal_activation` | none | live-js with 3 variants (Blackout New Year, Dead Season October, No Valentine) |
| `error_page_experience` | missing (no 404.html) | Riot on broken marquee "404: Transmission Lost"; recovery_links: home, features, download |
| `persona_vignettes` | none | 3 vignettes implemented via copy angles and img/PROMPTS.md |
| `mascot.behavior` | none | Riot: bottom-left static stencil figure; tips on home/#manifesto-hero, features/#what-we-built, download/#server, clients/#device-lineup; easter_interactions: click:3 (fist-raise + slash), typed-word:riot (lightning flash) |
| `visitor_paths` | absent | → default (single curated path) |
| `intensity_toggle` | absent | → default (none) |

## 2. Nav Diff

| Old | New |
|-----|-----|
| (none found) | The Broadcast (primary), The Signal (primary), The Receivers (default), Take It (primary), Everywhere (default), Why We Made It (muted) |
| plugins/docs in nav | Demoted to footer |

## 3. Home Section Order

| Old | New |
|-----|-----|
| (none found) | manifesto-hero → why-now → what-we-built → who-runs-it → take-it |

## 4. Carry Forward

- Logo.svg (brand wordmark)
- Favicon.svg (square primary-color mark)
- og.svg + og.png (1200×630 social card)
- icon PNGs (apple-touch, favicon variants)
- CSS token system (colors, spacing, radius, shadow, typography)
- Self-hosted font WOFF2 references

## 5. Ambiguities Resolved

| Ambiguity | Resolution |
|-----------|-----------|
| Kit font weight 500 requested for Oswald but only 700 exists | Use 700 (nearest available); note in BUILD_LOG.md |
| Kit declares `hero_experience.spec` describing SVG collages; no actual SVG assets exist | Build equivalent with CSS/SVG inline — no image to draw |
| `conversion_funnel.cta_ladder` shows "[object Object]" strings | These reference structured CTA objects already in kit — ladder has 3 rungs correctly wired |
| `mascot.behavior.easter_interactions[0]` trigger "click:3" | 3 clicks on Riot triggers fist-raise + screen slash |
| `mascot.behavior.easter_interactions[1]` trigger "typed-word:riot" | Typing "riot" triggers lightning flash on Riot |

## 6. Escalations

- None required.

## 7. Known Traps Pre-Checked

- §19.12: `minmax(0, 1fr)` on grid tracks; `overflow-wrap: anywhere` on body text
- §19.17: `strong { font-weight: 700 }` (body face 700 exists)
- §19.24: `@copyright 2026 Joe Huss <detain@interserver.net>` in every css/js file
- §19.4: Will NOT run stylelint --fix
- §19.2: Will verify no ` * @` outside comment blocks
- Fonts: only vendoring declared weights (anton-400, oswald-700, space-mono-400/700)
