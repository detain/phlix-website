# REGEN_PLAN.md — Ice Cathedral

**Kit:** `brand-kits/ice-cathedral.js` (v1.0, schema_version 2.0)
**Site:** `sites/ice-cathedral/`
**Archetype:** `editorial` (declared)
**Sibling comparison:** `sites/abstract-canvas/` (same archetype, already regenerated)

---

## 1. Experience fields — declared vs. change

| # | Field | Declared? | What predecessor does | What this kit requires | Change |
|---|-------|-----------|----------------------|------------------------|--------|
| 1 | `site_architecture` | ✅ | Generic 8-item nav, no emphasis levels | 6-item nav with 3 emphasis levels (default/primary/muted); demote plugins+docs to footer | Rewrite nav with kit labels + emphasis; move demoted pages to footer |
| 2 | `homepage_narrative` | ✅ arc, logline, 5 sections | Fixed hero→pitch→features-overview→cta-banner | Sections: the-void→chambers→why-enter→echoes→threshold, with weights | Rebuild home page with exact 5-section order + kit voice |
| 3 | `page_blueprints` | ✅ features/clients/download/about | Flat grids of identical cards | Vaulted-chambers / aperture-gallery / threshold-passage / stone-archive | Apply per-page layout treatments |
| 4 | `copy_overlay` | ✅ hero + section headings + footer_tagline | content.json verbatim | Override with kit's "Ice Cathedral" voice copy | Use copy_overlay values verbatim |
| 5 | `feature_casting` | ✅ hero[2], support[4], footnote[2] | All 8 features identical cards on home | Hero: library+syncplay with `angle` headlines; support: transcode/auth/hub/livetv; footnote: dlna/plugins on Features only | Build 2-tier home feature grid; Features page tiered |
| 6 | `copy_treatments` | ✅ 4 blocks | Basic lists and grids | pitch=stone-tablets, faq=archive-ledger, clients=aperture-gallery, ecosystem=library-shelves | Apply branded treatment markup to each block |
| 7 | `faq_experience` | ✅ frame/persona/order/extra_questions | 6 faq in content.json order | Stone-carving frame; archive-ledger treatment; declared question_order; 2 extra_questions | Reorder FAQ per declared order; add extra questions as additional DTs sharing mapped DDs |
| 8 | `hero_experience` | ✅ mode=geometric-reveal, fallback | JS-driven reveal animation | Fallback static composition; JS budget 5KB | Static fallback; geometric-reveal as enhancement |
| 9 | `navigation_model` | ✅ mode=topbar + fallback | Standard nav | Sharp-cornered topbar; 1px crystal-ice-blue active underline | Apply sharp-cornered + crystal-glow hover |
| 10 | `scroll_experience` | ✅ mode=chaptered + reduced_motion | Smooth scroll + IO reveals | Frost-spread chaptered reveal; reduced_motion = continuous no-transition | CSS-only chaptered reveals, gated by reduced-motion |
| 11 | `easter_eggs` | ✅ 2 (logo-clicks:9, typed-word:cathedral) | None | logo-clicks:9 → rose-window refraction; typed-word:cathedral → lattice overlay | Wire both in JS; typed-word disabled in inputs; both exit on Esc |
| 12 | `conversion_funnel` | ✅ style + download_opening + cta_ladder | Single "Get Phlix" CTA | 3-step ladder: Cross the threshold → Choose your window → Light the forge; download_opening as 3-step passage | Build 3-step CTA ladder on home and download opening treatment |
| 13 | `proof_strategy` | ✅ 3 signals + placement | None | architecture + github + license signals; "The Foundation" band between chambers and threshold | Build verified-capability proof band with repo links (no fabricated counts) |
| 14 | `experience_archetype` | ✅ editorial | Derived guess (immersive) | Use declared editorial | Apply editorial archetype |
| 15 | `complexity_profile` | ✅ density=dense/reading/general/jargon=translate | General | Minimal density, general reading, jargon=translate, 5 sections max, 120 words max per section | Cap prose at 120 words per section; technical terms in `<details>` |
| 16 | `mascot.behavior` | ✅ Crystal, placement/tips/idle/easter/dismiss | None (no mascot) | Crystal in bottom-right, slow rotation, tips per section, easter_interactions at 7 clicks + 3s hover-hold, dismiss persists | Build companion; ensure no CTA overlap at 320px |
| 17 | `seasonal_activation` | ✅ mode=live-js + 3 variants | None | Date-gated palette shift for 3 seasonal ranges | Ship JS date-gate for seasonal palette overrides |
| 18 | `error_page_experience` | ✅ concept=crevasse + recovery_links | No 404.html | Crevasse concept realized; 3 recovery links; relative assets; noindex | Build ice-cathedral 404.html |
| 19 | `visitor_paths` | ❌ absent | None → default (single path) | None (absent) | Use single curated path |
| 20 | `intensity_toggle` | ❌ absent | None → default (nothing) | None (absent) | No toggle |

**Absent → default** (not defects): `visitor_paths`, `intensity_toggle`

---

## 2. Nav diff

| Old label | New label | Emphasis | Notes |
|-----------|-----------|----------|-------|
| Home | Cathedral Entrance | default | |
| Features | Vaulted Chambers | **primary** | |
| Clients | Windows & Apertures | default | |
| Download | Cross the Threshold | **primary** | |
| Plugins | — (demoted) | — | Footer only |
| Docs | — (demoted) | — | Footer only |
| Hub | The Relay Chamber | default | |
| About | The Archive | **muted** | |

Demoted to footer: `plugins`, `docs` — remain as pages, moved from primary nav.

---

## 3. Home section order

| Old position | New section id | Source | Weight |
|--------------|----------------|--------|--------|
| 1 | `the-void` | copy_overlay.hero | hero |
| 2 | `chambers` | feature_casting | major |
| 3 | `why-enter` | story | major |
| 4 | `echoes` | proof_strategy | minor |
| 5 | `threshold` | conversion_funnel | major |

---

## 4. Carry-forward

- All color tokens from `:root` (polar night, crystal ice blue, arctic white — already correct palette)
- `logo.svg`, `favicon.svg`, `og.svg`, `og.png`, icon PNGs — present and correct, keep as-is
- `@font-face` rules for the declared font weights (Cinzel 400/700, Josefin Sans 100/300, Libre Baskerville 400/700, JetBrains Mono 400/600)
- Shared `content.json` facts — copy verbatim; don't invent
- Install command from `content.json.install.primary` — copy exactly, one line

---

## 5. Ambiguities resolved

| Issue | Resolution | Rule |
|-------|-----------|------|
| `proof_strategy` signal 2 asks for live GitHub star/issue counts | Link to the live `/stargazers` page — no fabricated numbers | §19.7 |
| `proof_strategy` signal 3 says "BSD-3-Clause across the board" | Incorrect — Phlix Server + Hub are MPL-2.0; shared libs/plugins/clients are MIT. Use `content.json` FAQ answer verbatim for license facts | §19.6 "content.json wins on facts" |
| `mascot.behavior.placement` = bottom-right fixed | Must not cover primary CTA at 320px; below 768px place in-flow above footer | §19.14 |
| `conversion_funnel.cta_ladder` values are "[object Object]" | The 3 CTAs map to: step 1 "Cross the threshold" → download, step 2 "Choose your window" → clients, step 3 "Light the forge" → download#server | Use href targets from the field's `target` values |
| `font-weight: 700` for `<strong>` | Body face Libre Baskerville declares 400+700; kit-brief confirms use 700 | §19.17 |

---

## 6. Escalations

- None. All declared fields are buildable from the kit and content.json.

---

## 7. Avoid words audit

Words that must NOT appear: cozy, warm, fun, friendly, exciting, awesome, amazing, robust, synergy, leverage, utilize, pop, bounce, vibrant

(Verified absent from all authored prose)

---

## 8. Fonts declared vs. available

| Role | Family | Weights needed | Pool file | Notes |
|------|--------|---------------|-----------|-------|
| headline | Cinzel | 400, 700 | cinzel-400-latin.woff2, cinzel-700-latin.woff2 | ✅ both exist |
| display | Josefin Sans | 100, 300 | josefin-sans-100-latin.woff2, josefin-sans-300-latin.woff2 | ⚠️ 400/500/600/700 NOT declared by kit; NOT vendored |
| body | Libre Baskerville | 400, 700 | libre-baskerville-400-latin.woff2, libre-baskerville-700-latin.woff2 | ✅ both exist |
| ui | Josefin Sans | 300, 400, 600 | josefin-sans-300-latin.woff2, josefin-sans-400-latin.woff2, josefin-sans-600-latin.woff2 | ⚠️ 100 NOT declared for ui; NOT vendored |
| mono | JetBrains Mono | 400, 600 | jetbrains-mono-400-latin.woff2, jetbrains-mono-600-latin.woff2 | ⚠️ 300/500/700 NOT declared; NOT vendored |
| number | Josefin Sans | 100 | josefin-sans-100-latin.woff2 | ✅ exists |
