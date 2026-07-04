# Localization Review — Cosmic Horror

**Variant**: cosmic-horror
**Round**: 1 (adversarial)
**Reviewer**: adversarial-code-reviewer
**Date**: 2026-07-04

## Score

- **Localization**: 93 / 100

## ✅ Passed

- **`<html lang="en">` present**: index.html:2 (`<html lang="en">`) — correct; `content.json` specifies `"default_locale": "en"` ✓; verified on all 8 pages
- **All user-facing strings trace to content.json**: Hero, pitch bullets, feature titles/bodies, client data, ecosystem list, FAQ, footer tagline, footer nav columns — all from `content.json` (single source of truth). A translator swaps one file.
- **No `toLocaleString()` or locale-unsafe formatting**: No date/number formatting in static HTML — all content is hardcoded strings
- **No hardcoded date/number formats**: Year in copyright is `2026` (static, not dynamically generated) — acceptable for a static site
- **RTL safety — logical CSS properties used throughout**:
  - `margin-inline: auto` (not `margin: 0 auto` or `margin-left/right`) ✓
  - `inset-inline: 0` (not `left/right: 0`) ✓
  - `inset-inline-start` used on skip link (`base.css:309`) ✓
  - `padding-inline: var(--space-4)` on container at mobile (`theme.css:124-126`) ✓
  - `border-inline-start: 3px solid` on pitch bullets and faq items ✓
  - `text-align: center` (not directional) ✓
  - `justify-content: center` / `align-items: center` (not directional) ✓
  - `padding-inline-start` on nav menu items (`components.css:106`) ✓
- **Font subset**: Fonts are woff2 format (already subset to used glyphs when downloaded from Google Fonts with subset selection)
- **Strings centralized**: All visible copy comes from `content.json` or brand kit static micro-copy — no inline hardcoded marketing strings except page-specific custom headings (CTA banners use brand kit taglines, not content.json)

## ⚠️ Concerns (non-blocking)

- **Brand micro-copy not in content.json**: Some visible strings like CTA banner headings ("The stars are correct. Press play.", "Begin the descent", "Consult the documentation") are drawn from the brand kit (tagline_secondary, design_principles) rather than content.json. These would require translation by a translator who knows the kit, not just content.json. — *impact: low — accepted trade-off for brand expression; documented in new_site.md §2 "brand-flavored micro-copy drawn from the kit's voice"*
- **`lang="en"` only, no hreflang alternatives**: Site is single-locale (en only per content.json site.supported_locales: ["en"]). This is correct for this build. — *impact: negligible*

## ❌ Failures (must fix this round)

None — no blocking issues in this dimension.

## Recommendations (ranked by impact)

1. Document brand kit micro-copy strings separately so a future translator knows which strings come from the kit and need kit-aware translation (impact: low, effort: low)
2. No other changes needed — RTL safety is well implemented with logical properties

## Evidence

- index.html:2 — `<html lang="en">` on all pages confirmed
- `theme.css:119` — `margin-inline: auto` on .container
- `theme.css:272` — `border-inline-start: 3px solid var(--color-primary)` on pitch bullets
- `components.css:463` — `border-inline-start: 3px solid var(--color-primary)` on faq-item
- `base.css:309` — `inset-inline-start: var(--space-4)` on .skip-link
- `components.css:106` — `inset-inline: var(--space-3)` on nav menu a::after
- Grep for `float: left` and `float: right` — zero matches in CSS files
- Grep for `border-left` and `border-right` — zero matches (all border properties use logical inline/start/end)
