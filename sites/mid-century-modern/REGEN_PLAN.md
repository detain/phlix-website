# REGEN_PLAN — mid-century-modern

## §1 Experience Fields

| Field | Old site | New site |
|-------|---------|----------|
| `site_architecture` | missing all 8 nav labels | rebuild nav per kit nav[] — 3 emphasis levels (primary/default/muted) |
| `homepage_narrative` | section ids ✅; content defaulted | 5 sections in kit order; copy_overlay hero voice |
| `page_blueprints` | absent/generic | atomic-gallery (features), device-fleet (clients), launch-sequence (download), mission-log (about) |
| `copy_overlay` | absent | hero eyebrow/headline/sub/CTAs from kit; section headings per kit |
| `feature_casting` | all 8 on features page | hero[library,syncplay] + support[transcode,auth,hub,livetv] on home |
| `copy_treatments` | generic | marquee-lines (pitch), oracle-advice (FAQ), device-fleet (clients), repo-constellation (ecosystem) |
| `faq_experience` | generic accordion | oracle-advice frame with Orbit persona answering |
| `hero_experience` | generic | diorama-parallax with Orbit rocket + starburst; always ships fallback |
| `navigation_model` | generic topbar | ebony-wood topbar + atomic-teal active underlines; hamburger on mobile |
| `scroll_experience` | none | chaptered iris-wipe reveals; plain scroll under reduced-motion |
| `easter_eggs` | absent | logo-clicks:5 → Orbit flyby; typed-word:orbit → glow effect; scroll-past-footer → rocket exit |
| `conversion_funnel` | generic | guided-steps with 3 CTA rungs per kit cta_ladder |
| `proof_strategy` | absent | compass-rose card + real GitHub links + quote-from-docs |
| `experience_archetype` | absent | narrative-scroll (adopted) |
| `complexity_profile` | absent | standard density, general reading, translate jargon; 5 sections max, 110 words/section cap |
| `seasonal_activation` | absent | live-js date gate swapping primary/secondary on kit's 3 seasonal variants |
| `error_page_experience` | generic 404 | Orbit confused in empty marquee "404 — Off the Flight Plan"; real content, no field verbatim |
| `persona_vignettes` | absent | 3 vignettes seed tone/imagery |
| `mascot.behavior` | absent | Orbit companion bottom-right on Home/Download/About; bob idle; localStorage dismiss |
| `visitor_paths` | absent | default (single curated path) |
| `intensity_toggle` | absent | default (none) |

**Absent → default:** `visitor_paths: null` (single path), `intensity_toggle: null` (no toggle)

## §2 Nav Diff

| Old label | New label | Order change |
|-----------|-----------|--------------|
| none found | Home | — (1) |
| none found | Features | — (2) |
| none found | Clients | — (3) |
| none found | Download | — (4) |
| none found | Hub | — (5) |
| none found | Plugins | — (6) |
| none found | Docs | — (7) |
| none found | About | — (8) |
| demotions | none | — |
| extra_pages | none | — |

**Problem:** old site missing all 8/8 kit labels. Nav completely rebuilt.

## §3 Home Section Order

| # | Old id | Kit id | Source | Weight |
|---|--------|--------|--------|--------|
| 1 | (missing) | `sunburst-rise` | copy_overlay.hero | hero |
| 2 | (missing) | `what-flies` | feature_casting | major |
| 3 | (missing) | `why-launch` | story | major |
| 4 | (missing) | `compass-true` | proof_strategy | minor |
| 5 | (missing) | `ignition` | conversion_funnel | major |

Old site had section ids correct (`sunburst-rise` etc.) but content defaulted to shared template.

## §4 Carry-Forward

- @font-face rules (9) — already correct, carry forward
- Section id names — already match kit narrative
- Palette CSS tokens (--color-* from design_tokens.color) — already working
- `minmax(0, 1fr)` on grid tracks (§19.12 rule 1) — applied from start
- `overflow-wrap: anywhere` where long identifiers appear (§19.12 rule 2) — applied from start
- No `overflow: hidden` on text containers (§19.12 rule 3) — applied from start

## §5 Ambiguities & Resolutions

| Item | Resolution |
|------|-----------|
| `conversion_funnel.cta_ladder` shows "[object Object]" in brief — resolved from kit: step1="Start the Launch Sequence"→download, step2="Choose Your Spacecraft"→clients, step3="Engage Ignition (Install)"→download#server |
| `fonts.ui` asks for weight 400/500/600 but both 100 and 300 files also exist; kit-brief says use 400/500/600 only — done, undeclared weights not vendored |
| `fonts.mono` weight 700 not declared; `ibm-plex-mono-700-latin.woff2` exists but kit only asks for 400,600 — nearest available is 600; documented but not invented |
| `strong { font-weight: 500 }` vs body font Libre Baskerville 400/700 — use `font-weight: 700` per §19.17 (body renders at 400, 700 is the step the kit declares) |
| `proof_strategy` signals must be verifiable — use real GitHub repo links, no fabricated numbers |

## §6 Escalations

None — all kit fields resolvable from kit module, font pool complete, no shared changes needed.

## §7 @font-face Weights Used

| Role | Family | Weights loaded |
|------|--------|---------------|
| headline | Josefin Sans | 600, 700 |
| display | Bebas Neue | 400 |
| body | Libre Baskerville | 400, 700 |
| ui | Josefin Sans | 400, 500, 600 |
| mono | IBM Plex Mono | 400, 600 |
| number | Bebas Neue | 400 |

`strong { font-weight: 700 }` — Libre Baskerville 700 latin is in the pool.
