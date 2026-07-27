# REGEN_PLAN.md — Solarpunk Eden (`solarpunk-eden`)

## Experience Fields

| Field | Old site | New site |
|---|---|---|
| `site_architecture` | Generic nav, 9 links | 6-link nav with kit labels, demoted pages to footer |
| `homepage_narrative` | Fixed 3-section (hero/pitch/features) | 5 named sections in kit order |
| `page_blueprints` | Generic template | Seed catalog (features), garden rooms (clients), planting guide (download), garden story (about) |
| `copy_overlay` | content.json verbatim | Kit's hero/CTA/section headings verbatim |
| `feature_casting` | 8-feature grid | 3 hero seeds + 5 support seeds on home |
| `copy_treatments` | None | Pitch=garden beds, FAQ=garden questions, Clients=garden rooms, Ecosystem=compost |
| `faq_experience` | Plain definition list | Frond persona answering, question_order applied |
| `hero_experience` | Static gradient hero | Guided reveal with Frond growing scene, scroll-triggered |
| `navigation_model` | Plain topbar | Parchment topbar with leaf bullet active indicator |
| `scroll_experience` | Instant | Chaptered with vine-border fade per section |
| `easter_eggs` | None | 3 eggs: click:5, typed-word:solarpunk, scroll-past-footer |
| `conversion_funnel` | Generic CTA | 3-rung ladder with garden metaphors |
| `proof_strategy` | None | Garden placard with real GitHub links |
| `visitor_paths` | None | Self-select fork near hero |
| `experience_archetype` | N/A | `exhibition` (declared) |
| `complexity_profile` | Generic | minimal density, plain-language, 5 sections max |
| `intensity_toggle` | None | Footer "Dim the lights" toggle |
| `seasonal_activation` | None | 4 seasonal palettes, live-js date-gated |
| `error_page_experience` | Generic 404 | Frond + wilted garden bed, recovery links |
| `persona_vignettes` | None | 3 vignettes informing imagery decisions |

**Absent → default (no kit declaration):** `mascot.behavior` (null originally, now built as declared), `extra_pages` (none)

## Nav Diff

| Old | New |
|---|---|
| Home, Features, Clients, Download, Plugins, Docs, Hub, About | The Garden, Seeds to Sow, Garden Rooms, Get Started, **The Commons, Our Story** |
| Plugins+Docs in nav | **Demoted to footer** (links still present, not in primary nav) |

## Home Section Order

| Old | New (from `homepage_narrative.sections[]`) |
|---|---|
| hero (eyebrow/headline/sub) | `eden-welcome` (copy_overlay.hero) |
| pitch (7 bullets) | `why-grow` (story) |
| features overview (8 cards) | `core-seeds` (feature_casting.hero as seed packets) |
| (none) | `gather-proof` (proof_strategy signals) |
| CTA banner | `grow-together` (conversion_funnel CTA) |

## Carry Forward

- All CSS tokens, fonts, and color system from predecessor
- Vine motif dividers and botanical decorations
- Scroll-reveal animation system
- `@font-face` rules for all declared weights
- Green-tinted shadow system
- `overflow-wrap: anywhere` on body text (base.css §19.12)
- `minmax(0, 1fr)` grid tracks (base.css §19.12)
- `@copyright` banners in all CSS/JS files

## Ambiguities Resolved

- **§19.6**: `fonts.ui.usage` says nav in UI face; `navigation_model.spec` says Playfair Display lockup — resolved: wordmark uses display face, nav links use UI face (more specific field wins).
- **§19.17**: `<strong>` uses `font-weight: 600` — Source Serif 4 declared at 400/600, 600 is a declared weight, correct step for emphasis.
- **Seasonal contrast**: All 4 variants use the measured safe substitutes from the brief for secondary when ratio fails AA.
- **`conversion_funnel.cta_ladder`**: Values printed as "[object Object]" in brief — the actual cta objects are: step 1 "Plant Your Server" → download, step 2 "Pick Your Garden Room" → clients, step 3 "Grow Together (invite)" → download#multi-user.
- **`proof_strategy` signals**: No fabricated numbers — use real GitHub links only per §19.7/§19.14.
- **`install.from_source`**: Label explicitly says "not an install" per content.json notes.

## Escalations

- None — all fonts in pool, no missing families, all kit fields implementable.

## Self-Verification Checklist (pre-report)

- [ ] `@copyright` line in base.css, theme.css, components.css, main.js
- [ ] 6 nav links with 3 distinct emphasis levels (primary/default/muted)
- [ ] 5 home sections in correct order with correct ids
- [ ] Demoted pages (plugins, docs) linked in footer not nav
- [ ] Seasonal JS gated by date
- [ ] Frond mascot placed only on Home, Features, Download (not on reading pages)
- [ ] Intensity toggle "Dim the lights" in footer
- [ ] 3 easter eggs wired with proper exit conditions
- [ ] 404.html with Frond + wilted garden, meta noindex, relative asset paths, recovery links
- [ ] Install command copied verbatim from content.json primary
- [ ] Footer has 3 columns from content.json footer
- [ ] All 8 features present somewhere
- [ ] 5 clients present on clients page
- [ ] MPL-2.0 only on Phlix Server + Hub; MIT on libraries/plugins/clients
- [ ] 9 unique meta descriptions (one per page)
