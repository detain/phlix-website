# REGEN_PLAN.md — Celtic Twilight

## 1. Experience Fields

| Field | Old site | New site |
|---|---|---|
| `site_architecture` | generic nav | 6-item nav with Celtic names (The Hearth, The Library, The Vessels, Begin the Quest, The Far Reach, The Elders Speak); emphasis primary/default; plugins/docs demoted to footer |
| `homepage_narrative` | generic sections | 5 sections: `the-threshold` (hero), `why-gather` (story/pitch), `the-treasures` (hero features), `the-keepers` (proof), `enter-the-circle` (funnel) |
| `page_blueprints` | — | illuminated-pages (features), vessel-shrine (clients), gathering-instructions (download), elder-wisdom-scroll (about) |
| `copy_overlay` | — | Celtic-voiced hero, section headings, CTA labels, footer tagline |
| `feature_casting` | — | hero: syncplay + library; support: transcode, livetv, auth, hub; footnote: dlna, plugins |
| `copy_treatments` | — | pitch= knotwork-tiles, faq= elder-fireside, clients= vessel-circle, ecosystem= lore-archive |
| `faq_experience` | — | elder-fireside frame, Sídhe persona, question_order + 3 extra_questions |
| `hero_experience` | — | diorama-parallax (lantern glow on scroll/pointer); fallback: static illuminated scene |
| `navigation_model` | — | topbar with knotwork dividers; fallback: standard accessible nav with hamburger |
| `scroll_experience` | — | manuscript-unfurl (cross-dissolve between sections) |
| `easter_eggs` | — | hover-hold:.mascot:3s → gold spiral; typed-word:knotwork → border animation |
| `conversion_funnel` | — | guided-steps style; cta_ladder: 3 rungs |
| `proof_strategy` | — | spec-numbers (clients/features), github (real stars/issues), quote-from-docs |
| `visitor_paths` | — | self-select fork: collector / circle / gardener |
| `experience_archetype` | — | narrative-scroll |
| `complexity_profile` | — | minimal density, general reading, translate jargon; home_sections_max=5, words_per_section_max=110 |
| `seasonal_activation` | — | live-js with 4 seasonal variants (Samhain, Imbolc, Bealtaine, Solstice) |
| `error_page_experience` | — | lost traveler + Sídhe guide, 3 recovery links |
| `persona_vignettes` | — | Keeper, Circle, Wanderer |
| `mascot.behavior` | — | Sídhe companion, bottom-right, idle spiral drift + lantern pulse, tips per section, easter_interactions (click:7, hover-hold:3s), dismiss to localStorage |
| `intensity_toggle` | absent → default (no toggle) | — |

## 2. Nav Diff

- Old labels: none (generic template)
- New labels (The Hearth / The Library / The Vessels / Begin the Quest / The Far Reach / The Elders Speak)
- plugins + docs demoted to footer (not in primary nav)

## 3. Home Section Order

Old: (generic)
New: `the-threshold` → `why-gather` → `the-treasures` → `the-keepers` → `enter-the-circle`

## 4. Carry-forward (predecessor site)

- All existing img assets: logo.svg, favicon.svg, og.svg, og.png, 5 icon PNGs
- Palette CSS custom properties (already correct)
- @font-face rules for Cinzel, Cinzel Decorative, EB Garamond, Nunito, DM Mono
- robots.txt + sitemap.xml structure (will regenerate via tool)

## 5. Ambiguities & Resolutions

| Issue | Resolution |
|---|---|
| `proof_strategy` asks for live star/issue counts | Link to live pages (`/stargazers`, `/issues`) per §19.7 — no fabricated numbers |
| `proof_strategy` asks for "quote from docs" | Use `pitch_bullets[0]` verbatim from content.json, attributed to the project per §19.7 |
| `copy_overlay` renames CTA "Light the Fire" but href goes to download | Keep label; visible text reads "Light the Fire" → download — honest per WCAG 2.5.3 |
| `fonts.ui.usage` vs `navigation_model` topbar | navigation_model is more specific for nav surface; wordmark in display face, nav links in ui face |
| `content.json` facts vs kit's stated client count (some kits say "5") | content.json wins: 4 native clients + any DLNA device |
| `seasonal_variants` palette overrides — contrast | §19.19: all seasonal pairs measured in brief; use derived safe tokens verbatim |
| `install.from_source` label | Label it "not an install" per §19.22 |
| `mascot` fixed at 320px vs CTA overlap | §19.11: below 768px, companion in-flow (above footer), never fixed |
| `strong { font-weight: 600 }` — kit caps body at 600 | 600 is declared for EB Garamond body; use 600 for strong |

## 6. Font Weight Notes (§19.17)

- Body face (EB Garamond) declared: 400, 500, 600
- `<strong>` weight: 600 (declared; `eb-garamond-600-latin.woff2` exists)
- `eb-garamond-700-latin.woff2` exists but 700 is NOT declared for this kit — do not use
- Nunito weight 500 NOT declared — do not use
- Cinzel 600/900 NOT declared — do not use
- Cinzel Decorative 900 NOT declared — do not use
- DM Mono 300 NOT declared — do not use
