# REGEN_PLAN.md — Street Mural

## 1. Experience Fields

| Field | Old Site | New Site |
|-------|----------|----------|
| `site_architecture` | generic nav | 6-link kit nav + demoted pages in footer |
| `homepage_narrative` | default sections | 5-section kit order: the-wall, tagged-pieces, why-paint, proof-tag, claim-yours |
| `page_blueprints` | generic | gallery-wall (features), spray-can-family (clients), tag-your-wall (download), crew-stories (about) |
| `copy_overlay` | content.json verbatim | kit hero overlay + section headings + footer tagline |
| `feature_casting` | all 8 features grid | hero 2 (library, syncplay), support 4 (auth, transcode, hub, livetv), footnote 2 (dlna, plugins) |
| `copy_treatments` | plain | pitch=banner-spray, faq=crew-testimonials, clients=spray-can-lineup, ecosystem=block-library |
| `faq_experience` | basic dl | crew-voices framing, ordered per kit, 3 extra questions mapped |
| `hero_experience` | static | spray-reveal animation (scroll-driven, 5kb budget) with fallback |
| `navigation_model` | standard | topbar-tags with accessible fallback |
| `scroll_experience` | basic scroll | kinetic-drip with reduced-motion fade |
| `easter_eggs` | none | logo-clicks:7, typed-word:crew, scroll-past-footer:3x |
| `conversion_funnel` | generic CTA | tag-your-wall style, 3-rung ladder |
| `proof_strategy` | absent | wall-stats placard + github row + quote-from-docs |
| `visitor_paths` | absent | 3-path crew fork near hero |
| `experience_archetype` | not declared | asymmetric (setter) |
| `complexity_profile` | default | standard density, general reading, jargon=allow, 5 sections max, 120 words/section |
| `intensity_toggle` | absent | Volume toggle in footer utility row |
| `seasonal_activation` | absent | live-js with 4 date-gated variants |
| `error_page_experience` | 404.html missing | wrong-wall gag: Cap + blank wall + recovery links |
| `persona_vignettes` | absent | 3 vignettes seed imagery prompts |
| `mascot.behavior` | static cap | interactive Cap bottom-right, tips, easter interactions, dismissible |

**Absent → default** (all others): page_blueprints extras, hero_experience spec not overridden beyond mode, navigation_model keyboard, visitor_paths null paths, intensity_toggle affects beyond spec, seasonal_activation motif_assets beyond the 4 declared.

## 2. Nav Diff

| # | Old | New | Emphasis |
|---|-----|-----|----------|
| 1 | Home | The Wall | default |
| 2 | Features | New Pieces | primary |
| 3 | Clients | Spray Cans | default |
| 4 | Download | Claim Your Space | primary |
| 5 | Hub | Crew Hub | default |
| 6 | About | The Crew | muted |
| — | Plugins | demoted → footer | — |
| — | Docs | demoted → footer | — |

Footer arrangement: mirror-nav (6 links in order) + 3 content.json columns.

## 3. Home Section Order

| # | Old id | New id | Source |
|---|--------|--------|--------|
| 1 | (none) | the-wall | copy_overlay.hero |
| 2 | (none) | tagged-pieces | feature_casting |
| 3 | (none) | why-paint | story |
| 4 | (none) | proof-tag | proof_strategy |
| 5 | (none) | claim-yours | conversion_funnel |

## 4. Carry Forward

- All existing img assets (logo.svg, favicon.svg, og.svg, og.png, icon PNGs)
- Dark concrete palette from existing CSS
- Hard-offset shadow system
- Font stack (Anton, Boogaloo, Barlow Condensed, Barlow, Share Tech Mono)
- Install command from content.json

## 5. Ambiguities & Resolutions

| Issue | Resolution |
|-------|------------|
| `conversion_funnel.cta_ladder` shows "[object Object]" in brief | These are step objects — ladder is {step, cta, target} entries; implement as declared |
| `intensity_toggle.affects` references scroll_experience | §19.6: more specific field wins — scroll_experience stays kinetic-drip, intensity only gates animation speed |
| `mascot.behavior` placement conflicts with CTA at 320px | §19.11: companion is in-flow above footer on mobile; fixed only at 768px+ |
| `seasonal_activation` motif assets missing | Per brief: write one line in BUILD_LOG.md and move on |
| Font weight 700 for Barlow Condensed not declared | §19.17: use declared weight 600 for strong; do not vendor 700 |
| `proof_strategy` github format asks for live counts | §19.7: link to live pages; do not print fabricated numbers |

## 6. Escalations

None — all conflicts resolved via §19.6 table.

## 7. Budget Notes

- home_sections_max: 5 ✓ (all 5 implemented)
- words_per_section_max: 120 — cap governs authored prose only; content.json facts exempt
- js_budget_kb: 5 for hero_experience (with fallback)
- avoid_words: leverage, synergy, utilize, robust, ecosystem, disrupt, seamless, cutting-edge, empower (corporate), journey
