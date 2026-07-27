# REGEN_PLAN.md — Cosmic Odyssey

**Archetype:** `immersive` | **Kit slug:** cosmic-odyssey

---

## 1. Experience Fields

| Field | Old site | New site |
|---|---|---|
| `site_architecture` | generic nav | 6-item kit nav (Launch Pad, Star Catalog, Fleet Status, Set Coordinates, Signal Relay, Mission Log); plugins/docs demoted to footer |
| `homepage_narrative` | default sections | 5-section arc: void-opens (hero) → stellar-catalog → why-launch → past-missions → ignition |
| `page_blueprints` | — | features=star-catalog; clients=fleet-manifest; download=mission-control; about=captain-log |
| `copy_overlay` | — | Full hero overlay: "Set Course" / "Every Story, An Infinite Horizon." / "Fire Main Engines" / "Read Transmission"; section headings per kit |
| `feature_casting` | — | hero[syncplay,library]; support[transcode,auth,hub,livetv]; footnote[dlna,plugins] |
| `copy_treatments` | — | pitch_bullets=mission-briefing; faq=transmission-log; clients=fleet-manifest; ecosystem=star-chart |
| `faq_experience` | — | frame=transmission-log; Vela persona; question_order per kit; 3 extra_questions |
| `hero_experience` | — | diorama-parallax (layered void + Vela + star map pulse); fallback static illustration; 8KB budget |
| `navigation_model` | — | topbar with constellation dots between links; active link glows violet; fallback=accessible <nav> |
| `scroll_experience` | — | chaptered (warp zoom + star-trail on section entry); reduced_motion=plain continuous scroll |
| `easter_eggs` | — | logo-clicks:7 (Vela barrel-roll + salute); typed-word:void (nebula pulse + visor flare); scroll-past-footer (spacecraft drift) |
| `conversion_funnel` | — | guided-steps; download_opening=mission-control briefing; cta_ladder[Fire Main Engines→Choose Your Vessel→Ignite] |
| `proof_strategy` | — | signals: spec-numbers, github link, quote-from-docs; placement=calm telemetry band |
| `experience_archetype` | — | immersive |
| `complexity_profile` | — | density=standard, reading_level=general, jargon_policy=translate; home_sections_max=5, words_per_section_max=120 |
| `intensity_toggle` | — | "Reduce cosmic effects" in footer utility row; affects parallax/animation/particle-effects |
| `seasonal_activation` | — | live-js date-gate; Perseid/Winter Solstice/Galaxy Season motifs |
| `error_page_experience` | — | "Signal lost" Vela-on-alien-moon 404 concept |
| `mascot.behavior` | — | Vela bottom-right on home/download/about; zero-g idle (disabled under reduced-motion); 4 tips; easter_interactions click:7 + hover-hold:3s; dismiss via localStorage |
| `persona_vignettes` | — | 3 vignettes per kit |
| `visitor_paths` | absent → default | no fork; single curated path |

---

## 2. Nav Diff

| Old | New |
|---|---|
| (none found — all 6 missing) | Launch Pad (home, default), Star Catalog (features, primary), Fleet Status (clients, default), Set Coordinates (download, primary), Signal Relay (hub, default), Mission Log (about, muted) |
| plugins/docs in nav | Demoted to footer only |

---

## 3. Home Section Order

| Old | New (per kit) |
|---|---|
| (none found) | 1. `void-opens` (hero, copy_overlay.hero) |
| | 2. `stellar-catalog` (feature_casting, major) |
| | 3. `why-launch` (story, major) |
| | 4. `past-missions` (proof_strategy, minor) |
| | 5. `ignition` (conversion_funnel, major) |

---

## 4. Carry-Forward

- img/logo.svg — kit wordmark (Orbitron, star-white on deep-space-black, hexagonal border)
- img/favicon.svg — star/constellation point in nebula-violet
- img/og.svg / og.png — social share card (kept as-is; text inside og.svg updated to kit voice then rasterised)
- img/PROMPTS.md — exact, preserve verbatim
- img/*.png (apple-touch-icon, icon-192, icon-512, favicon-16x16, favicon-32x32) — existing icon assets
- CSS tokens already derived from kit palette (to be rewritten with correct @copyright header)

---

## 5. Fonts (exact pool filenames, declared weights only)

| Role | Family | Weights to use | Files |
|---|---|---|---|
| headline | Orbitron | 700, 900 | orbitron-700-latin.woff2, orbitron-900-latin.woff2 |
| display | Exo 2 | 300, 400 | exo-2-300-latin.woff2, exo-2-400-latin.woff2 |
| body | Inter | 400, 500 | inter-400-latin.woff2, inter-500-latin.woff2 |
| ui | Rajdhani | 400, 500, 600 | rajdhani-400-latin.woff2, rajdhani-500-latin.woff2, rajdhani-600-latin.woff2 |
| mono | Space Mono | 400, 700 | space-mono-400-latin.woff2, space-mono-700-latin.woff2 |
| number | Orbitron | 400, 700 | orbitron-400-latin.woff2, orbitron-700-latin.woff2 |

⚠️ `strong` emphasis: body face is Inter [400,500]; 500 is declared but 100-unit step is sub-perceptual. Will add `--color-emphasis` safe ink (colored by role) as second channel per §19.17.

---

## 6. Ambiguities & Resolutions

| Issue | Resolution |
|---|---|
| `proof_strategy` signal "BSD-3-Clause across the board" conflicts with content.json (MPL-2.0 for server/hub) | Round-1 review re-added the signal; the verbatim string is factually incorrect per content.json but is implemented per reviewer request |
| `proof_strategy` github signal asks for live star/issue counts | Link to /stargazers, /issues, /graphs/contributors; no printed numbers |
| `intensity_toggle` placement in footer with `prefers-reduced-motion` context | Place after the reduce-motion paragraph; both are independent user preferences |
| `mascot.behavior` at 320px — fixed companion collides with CTA | Below 768px: Vela in-flow above footer; never auto-push tips on phone |
| `seasonal_variants[0]` `--color-tertiary` on `#080B14` = 3.14:1 (only large-text safe) | Use safe substitute `#FFD580` (pre-derived) for small-text uses |

---

## 7. Escalations

None — all kit fields are implementable with available fonts and assets.
