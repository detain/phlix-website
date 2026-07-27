# midnight-jazz — REGEN_PLAN.md

## Experience Fields (20 declared)

| Field | Old site | New site |
|-------|---------|----------|
| `site_architecture` | default 8-link nav | Custom 6-link nav: Lobby, Now Showing, Box Office, Get Tickets, The Marquee, Our Story. plugins/docs demoted to footer. |
| `homepage_narrative` | generic sections | 5 sections: curtain-rise (hero), the-set (feature casting), why-this-session (story), the-room (proof), get-in (conversion) |
| `page_blueprints` | — | features=album-shelf, clients=device-lineup, download=ticket-counter, about=chapter-scroll |
| `copy_overlay` | — | Custom hero: "Press play. The night starts now." / "Your library. After dark." CTA: "Get Your Tickets" |
| `feature_casting` | — | Hero: library, syncplay. Support: transcode, auth, hub. Footnote: livetv, dlna, plugins |
| `copy_treatments` | — | pitch=marquee-lines, faq=letters-column, clients=device-lineup, ecosystem=repo-shelf |
| `faq_experience` | — | Letters-column frame with Miles as house usher |
| `hero_experience` | — | Marquee-warmup: bulbs light sequentially, parallax on scroll |
| `navigation_model` | — | topbar: Stage Charcoal bar, Barlow Condensed wordmark, amber separator dots |
| `scroll_experience` | — | chaptered: film-burn wipe on section entry |
| `easter_eggs` | — | logo-clicks:5 → Miles tips mute + vinyl spin; typed-word:deepcut → spotlight sweep |
| `conversion_funnel` | — | 3-rung ladder: Get Your Tickets → Pick Your Seat → Open the Door |
| `proof_strategy` | — | spec-numbers + github link + docs quote in Playfair italic |
| `visitor_paths` | — | Self-select fork: Collector / Sync Night / Anywhere |
| `experience_archetype` | — | narrative-scroll |
| `complexity_profile` | — | minimal density, plain-language, jargon=translate, 5 sections max, 85 words/section max |
| `intensity_toggle` | — | "House lights up" toggle in footer |
| `seasonal_activation` | — | live-js: winter (Dec-Jan) and summer (Jun-Aug) palette overrides |
| `error_page_experience` | — | "This showing sold out" with Miles under empty marquee |
| `mascot.behavior` | — | Miles (trumpet silhouette), bottom-right, tips, easter interactions, dismissible |

## Nav Diff
- Old: generic (no custom labels found)
- New: 6 links + demoted footer-only plugins/docs

## Home Section Order
- Old: none
- New: curtain-rise → the-set → why-this-session → the-room → get-in

## Carry Forward
- Existing img/logo.svg, img/favicon.svg, img/og.svg, img/og.png, img/PROMPTS.md
- Palette tokens (all colors from design_tokens)
- Existing card/icon styling that works

## Font Choices
| Role | Family | Weights |
|------|--------|---------|
| headline | Barlow Condensed | 700 (800 unavailable in pool) |
| display | Playfair Display | 700, 900 |
| body | Inter | 400, 500 |
| ui | Barlow | 400, 500, 600 |
| mono | JetBrains Mono | 400, 600 |
| number | Barlow Condensed | 700 |

## Ambiguities
- `barlow-condensed-800` file exists but brief says "weight 800 NOT declared by this kit" — resolved: use only 700 per brief instruction
- `intensity_toggle` placement: footer utility row beside reduced-motion note
- `typed-word:deepcut` egg: disabled in input/textarea, never preventDefault, exits on Esc

## Escalations
None.
