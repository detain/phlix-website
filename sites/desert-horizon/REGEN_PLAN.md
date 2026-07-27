# REGEN_PLAN.md — Desert Horizon

## 1. Experience Fields

| Field | Old site | New site |
|---|---|---|
| `site_architecture` | generic nav | 6-item nav, 3 emphasis levels (default/primary/muted), demoted pages in footer |
| `homepage_narrative` | generic sections | 6 sections in declared order |
| `page_blueprints` | — | shelf-display (features), gathering-circle (clients), trading-counter (download), around-the-fire (about) |
| `copy_overlay` | — | hero, section headings, footer tagline — kit voice |
| `feature_casting` | — | hero 2 features (library, syncplay), support 3, footnote 3 |
| `copy_treatments` | — | pitch=wooden-plaques, faq=dusty-wisdom, clients=gathering-circles, ecosystem=toolkit-shelf |
| `faq_experience` | — | campfire-chat, Dusty persona, reordered, 3 extra questions |
| `hero_experience` | — | diorama-parallax mode, fallback static |
| `navigation_model` | — | topbar with Navajo strip, mobile hamburger |
| `scroll_experience` | — | chaptered reveals with Navajo dividers, reduced-motion fallback |
| `easter_eggs` | — | 3 eggs: logo-clicks:5, typed-word:horizon, time-of-day:sunset-zone |
| `conversion_funnel` | — | guided-steps, 3-rung ladder |
| `proof_strategy` | — | spec-numbers + github + facts-from-docs, placed in gather band |
| `visitor_paths` | — | 3-path fork: family/collector/craftsperson |
| `experience_archetype` | — | narrative-scroll (declared) |
| `complexity_profile` | — | minimal density, plain-language, translate jargon, 6 sections max, 100 words max |
| `intensity_toggle` | — | "Turn off the parallax" in footer utility row |
| `seasonal_activation` | — | live-js date-gate, 4 variants (monsoon/harvest/solstice/spring) |
| `error_page_experience` | — | Dusty confused on empty desert, torn map, 3 recovery links |
| `persona_vignettes` | — | 3 vignettes drive imagery decisions |
| `mascot.behavior` | — | Dusty, bottom-right, sway idle, 5 tips, 2 easter interactions, dismiss to localStorage |

**Absent → default**: none (all 20 declared + mascot)

## 2. Nav Diff

| Old | New |
|---|---|
| no labels (missing) | "The Trading Post" (home, default), "What's Inside" (features, primary), "Gather 'Round" (clients, default), "Stake Your Claim" (download, primary), "The Relay" (hub, default), "Our Story" (about, muted) |
| all equal | 3 emphasis levels visually distinct |
| plugins/docs in nav | plugins/docs demoted to footer only |

## 3. Home Section Order

| Old | New |
|---|---|
| none (missing) | golden-hour → why-stay → what-you-find → the-rest-of-the-kit → gather → stay-rooted |

## 4. Carry-forward
- Logo SVG, favicon SVG, og.png/og.svg — img/ assets are correct per brief
- Color palette tokens (mapped to measured-safe values where needed)
- Warm umber shadow palette
- Corner radius scale from kit
- Footer demoted nav (plugins/docs)

## 5. Ambiguities & Resolutions (§19.6)

- **`fonts.ui.usage` (Playfair for wordmark) vs `navigation_model` (Source Sans 3 for nav)** → more specific field wins: wordmark = Playfair Display, nav links = Source Sans 3 UI face
- **`copy_overlay` renames CTA "Stake Your Claim" but href goes to download** → keep label as-is, it's honest (→ download page)
- **`complexity_profile.page_budget.words_per_section_max=100` vs facts that must appear** → cap governs authored prose only; verbatim content.json facts exempt (§16)
- **`install.from_source` not an install** → labelled explicitly per §19.22
- **`strong { font-weight: 600 }`** → Lora 600 face exists in pool; applied to `<strong>` elements; no redundant `color` declaration
- **`seasonal_activation` live-js** → date-gate JS included; all 4 variants' override tokens traced and measured (§19.19) — monsoon primary (#2a8c82) fails on default bg (3.23:1 < 4.5:1), Harvest Dusk primary (#a84a10) and Winter Solstice secondary (#2a6a82) both pass
