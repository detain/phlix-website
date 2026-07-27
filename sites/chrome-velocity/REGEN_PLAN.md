# Chrome Velocity — Regeneration Plan

## 1. Experience Fields

| Field | Old Site | New Site |
|-------|----------|----------|
| site_architecture | Generic nav (Home/Features/Clients/etc.) | 6-item kit nav: GRID START, THE LINEUP, PIT WALL, RACE KIT, THE RELAY, TELEMETRY. Plugins/docs demoted to footer. |
| homepage_narrative | Default sections | 5 kit sections in order: race-start, the-lineup, speed-formula, pit-credentials, throttle-up |
| page_blueprints | Generic templates | Telemetry-dashboard (features), pit-wall-team (clients), race-briefing (download), telemetry-review (about) |
| copy_overlay | Default content.json | Kit's hero: "Zero to Play" eyebrow, "Pit Wall Precision. Flat Out." headline, "Box This Lap" CTA |
| feature_casting | Default 8-feature grid | Hero: SyncPlay + Library as lead features. Support: transcode, auth, livetv, hub |
| copy_treatments | Generic lists | pitch=Telemetry-specs, clients=Pit-crew-roster, FAQ=Pit-radio-log |
| faq_experience | Default FAQ | Pit-radio-log framing, Vector as guide, specific question_order |
| hero_experience | Static | Static telemetry hero with subtle data stream backdrop |
| navigation_model | Generic topbar | Carbon-black topbar with session-timer in mono, racing-red active underline |
| scroll_experience | Default | Continuous scroll with speed-line sweep on section entry |
| easter_eggs | None | 1. logo-clicks:5 → Vector checkered flag + "Lap record unlocked" 2. typed-word:vector → cursor becomes visor + pose cycle |
| conversion_funnel | Generic CTA | instant-command style, 3-rung ladder: Box This Lap → Pick Your Cockpit → Throttle Up |
| proof_strategy | None | Spec-numbers card + GitHub repo link + verbatim architecture quote as telemetry readout |
| visitor_paths | None | 3-path fork: Racer / Collector / Garage |
| experience_archetype | Not declared | showcase (declared) |
| complexity_profile | Not declared | density=standard, reading_level=technical, jargon=allow, home_sections_max=5 |
| seasonal_activation | Not declared | live-js mode with 3 seasonal variants (Night Race, Championship Decider, Season Opener) |
| error_page_experience | None (404 missing) | DNF concept: Vector with broken helmet, "Page not found" readout, recovery links |
| mascot_behavior | None | Vector (bottom-right HUD figure), idle pulse, tips per section, easter click:5 + hover-hold:2s |
| intensity_toggle | Absent | null → no toggle |
| persona_vignettes | Not declared | 3 vignettes: Solo Qualifier, Pit Crew, Relay Driver |

## 2. Nav Diff

| Old Label | New Label | Emphasis |
|-----------|-----------|----------|
| Home | GRID START | default |
| Features | THE LINEUP | primary |
| Clients | PIT WALL | primary |
| Download | RACE KIT | primary |
| Hub | THE RELAY | default |
| About | TELEMETRY | muted |
| Plugins | (demoted to footer) | — |
| Docs | (demoted to footer) | — |

## 3. Home Section Order

| # | Old Section | New Section | Source |
|---|-------------|-------------|--------|
| 1 | (none) | race-start | copy_overlay.hero |
| 2 | (none) | the-lineup | feature_casting |
| 3 | (none) | speed-formula | story |
| 4 | (none) | pit-credentials | proof_strategy |
| 5 | (none) | throttle-up | conversion_funnel |

## 4. Carry-Forward

- Logo.svg, favicon.svg, og.svg, og.png, icon PNGs — correct, keep as-is
- img/PROMPTS.md — correct, keep as-is
- Color palette tokens already reference kit colors
- Font files exist in shared/assets/fonts/

## 5. Ambiguities & Resolutions

| Ambiguity | Resolution |
|-----------|------------|
| Kit declares Barlow Condensed 700,800 for headline but brief warns about weight 900 existing | Use only 700, 800 per kit declaration |
| Kit caps Barlow at [400,500] for body, but brief says use 600 for strong | Use 600 for strong (ui role) — declared in kit's ui weights |
| Kit's primary CTA "Box This Lap" → download, but WCAG 2.5.3 | Keep label, make href honest: href="download" makes label + destination match |
| install.from_source is not an install | Label it "not an install" per kit instructions |
| seasonal_variants overrides bg/primary/focus | These are live-JS; include them but understand contrast was measured on defaults |

## 6. Font Weights to Vendor

- Barlow Condensed: 700, 800 (headline/display) — from pool
- Barlow: 400, 500, 600 (body/UI) — from pool
- JetBrains Mono: 400, 600 (mono) — from pool
- Barlow Condensed: 700 (number role) — from pool

## 7. Avoid Words

`cozy`, `warm`, `friendly`, `gentle`, `playful`, `nostalgic`, `leverage`, `synergy`, `utilize`, `seamless`, `robust`, `journey` — must not appear in authored prose.

## 8. Copyright Headers

All css/*.css and js/*.js files must contain `@copyright 2026 Joe Huss <detain@interserver.net>` inside the top comment block.
