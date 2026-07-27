# REGEN_PLAN.md — Bamboo Sanctuary (`bamboo-sanctuary`)

## Experience Fields

| Field | Old Site | New Site |
|-------|----------|----------|
| `site_architecture` | 8-link nav, all in header | 5-link nav (Sanctuary/Collections/Pathways/Begin/Philosophy); plugins/docs/hub demoted to footer |
| `homepage_narrative` | Generic `.hero > .pitch > .features-overview > .cta-banner` | 6 named sections: `#sanctuary-truth` → `#why-quiet` → `#what-you-gather` → `#supporting-craft` → `#proof-of-trust` → `#step-inside` |
| `page_blueprints` | Default | `gallery-cards` for features, `device-wall` for clients, `two-columns` for download, `chapter-scroll` for about (implemented via styling, not new templates) |
| `copy_overlay` | Generic content.json hero | Kit's eyebrow/headline/subheadline/CTA labels: "A sanctuary for your media", "Watch with intention.", "Step inside", "Walk the grounds" |
| `feature_casting` | All 8 features equal grid | Hero: library + syncplay ink-wash vignettes; Support: auth/transcode/livetv/dlna quiet grid |
| `copy_treatments` | Plain lists | Contemplation-cards for pitch bullets |
| `faq_experience` | Simple `<dl>` | Letters-column framing with Sasa persona |
| `hero_experience` | Static bamboo grove | Static (fallback already in place); same content, no JS needed |
| `navigation_model` | 8-link topbar | 5-link topbar + demotions |
| `scroll_experience` | IntersectionObserver reveals | Same, with reduced-motion plain scroll |
| `easter_eggs` | None | `logo-clicks:5` → celadon leaf; `typed-word:breathe` → brief fade |
| `conversion_funnel` | Generic CTA | 3-rung ladder: Step inside → Choose your path → Begin the setup |
| `proof_strategy` | Generic stat block | Stone placard: spec numbers, github link, verbatim docs quote |
| `experience_archetype` | (not declared) | `minimal` — adopted |
| `complexity_profile` | (not applied) | `minimal` density, `plain-language`, `translate` jargon, 6 sections max, 80 words/section cap |
| `seasonal_activation` | (not present) | `live-js` date-gate with 4 seasonal palette overrides |
| `error_page_experience` | 404.html missing | Sasa in empty grove with recovery links |
| `persona_vignettes` | (not rendered) | Inform imagery decisions only (img/PROMPTS.md unchanged) |
| `mascot.behavior` | (not present) | Sasa, lower-right, idle + tips + easter_interactions + dismiss |

**Absent → default** (never a defect):
- `visitor_paths` → single curated path (no fork)
- `intensity_toggle` → null (nothing to tame)

## Nav Diff

| Old | New | Change |
|-----|-----|--------|
| Home | Sanctuary | relabel |
| Features | Collections | relabel + primary emphasis |
| Clients | Pathways | relabel |
| Download | Begin | relabel + primary emphasis |
| Plugins | — | demoted to footer |
| Docs | — | demoted to footer |
| Hub | — | demoted to footer |
| About | Philosophy | relabel + muted emphasis |

**Extra pages:** none

## Home Section Order

| # | Old ID | New ID | Source |
|---|--------|--------|--------|
| 1 | `.hero` | `#sanctuary-truth` | copy_overlay.hero |
| 2 | `.pitch` | `#why-quiet` | story |
| 3 | `.features-overview` | `#what-you-gather` | feature_casting (hero features) |
| 4 | — (missing) | `#supporting-craft` | feature_casting (support features) |
| 5 | — (missing) | `#proof-of-trust` | proof_strategy |
| 6 | `.cta-banner` | `#step-inside` | conversion_funnel |

## Carry-Forward

- Palette tokens, spacing scale, radius tokens, shadow tokens — all already correct
- Logo.svg, favicon.svg, og.svg, og.png, icon PNGs — unchanged
- Bamboo grove SVG backdrop on hero — kept, refined
- Font-face declarations for all declared weights — already correct
- Mobile nav toggle JS (focus trap, Esc, outside click) — kept

## Ambiguities Resolved

| Issue | Resolution |
|-------|------------|
| `primary`/`secondary` on `--color-bg` fail WCAG AA | Use pre-derived safe tokens: primary-text `#5c7066`, secondary-text `#7a6948`. Primary CTA bg `#8FAF9F` + text `#6d6c6a` (not `#F8F5F0` which is 1.07:1) |
| `strong { font-weight: 500 }` — kit caps Lora at [400,500] | Add second channel: ink color `#2A2A25` stays; the 500 weight alone is the declared channel. No additional color needed since 500 vs 400 is perceptible in this face at display sizes. |
| Kit says primary/secondary buttons on FAB bg | FAB text `#6d6c6a` on `#8FAF9F` (4.14:1) — use safe token |
| Kit contrast prose unverified | Use measured values from brief + pre-derived substitutes verbatim |
| `conversion_funnel.cta_ladder` shows `[object Object]` | These are step objects; ladder is: Step inside → Choose your path → Begin the setup |
| Font display weight [300] but headline weight [300,400] | Display uses Cormorant 300 only; headline uses Cormorant 300+400 |
| `@font-face` weights: lora-700 exists but kit caps at 500 | Do NOT vendor 700 — stay within declared 400, 500 |

## Escalations

None — all facts from content.json, fonts from pool, no missing files.

## Implementation Notes

- Season activation uses CSS custom property overrides via JS date gate
- Sasa mascot: fixed position lower-right at ≥768px; in-flow above footer at <768px
- Logo-clicks:5 egg — disabled in input/textarea/contenteditable; does not preventDefault
- Typed-word:breathe — document keydown disabled in inputs; Esc exits
- All 9 pages get unique `<meta name="description">` (not the same string)
- Every CSS/JS file has `@copyright 2026 Joe Huss <detain@interserver.net>` inside comment block
