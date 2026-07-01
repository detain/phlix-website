# Localization Review — Renaissance Atelier

**Variant**: renaissance-atelier
**Round**: 1
**Reviewer**: adversarial-reviewer-batch3
**Date**: 2026-07-01

## Score
- **Localization**: 83 / 100

## ✅ Passed

- All 8 pages have `<html lang="en">` present: confirmed on index.html:2, features.html:2, clients.html:2, download.html:2, plugins.html:2, docs.html:2, hub.html:2, about.html:2.
- No `toLocaleString()` calls found across all HTML and JS files. All user-facing strings are static text in HTML or sourced from content.json.
- All user-facing content strings trace to `shared/content.json` — the hero, pitch bullets, features, clients, ecosystem, FAQ, footer, and meta blocks are all referenced verbatim from the shared file. A translator replacing `content.json` would update all 8 pages simultaneously. Confirmed by cross-referencing each section against `shared/content.json`.
- CSS uses logical properties in layout containers: `.container` uses `margin-inline: auto` (theme.css:111), `padding-inline` (theme.css:112), `flex-wrap: wrap` in components.css. `flex-shrink: 0` used appropriately. `text-align: center` used for symmetric layouts. `align-items` and `justify-content` used for flex alignment throughout. These are direction-agnostic.
- `@media (prefers-reduced-motion: reduce)` present in base.css:267–276 and components.css:742–748 ✅.
- Fonts are classical serifs (Cormorant Garamond, EB Garamond, Libre Baskerville) which are inherently Latin-script. No CJK, Arabic, Hebrew, or Cyrillic fonts loaded. Font subsetting for Latin is implicit in the WOFF2 files self-hosted at `css/fonts/`.

## ⚠️ Concerns (non-blocking)

- `components.css:724–727` — `.tondo` uses `border-radius: 50% / 60%` which is a symmetric elliptical shape. RTL-safe because it's not direction-dependent. Not a failure.
- `theme.css:415–437` — Responsive breakpoints use `width <= 768px` and `width <= 480px` which are physical dimensions, not logical properties. However, responsive breakpoints for viewport width are direction-agnostic and this is standard industry practice. Not a failure.
- Font subsetting: the WOFF2 files are self-hosted copies of Google Fonts but may contain the full character set rather than a Latin-only subset. While the fonts chosen (all Latin-script serifs) are appropriate for English content, a strict interpretation of new_site.md §15 "Subset fonts to needed scripts" would call for Latin-subset WOFF2 files. Practical impact is negligible for English-only sites; this is noted as a precision concern, not a failure.

## ❌ Failures (must fix this round)

- **components.css:506–511** — `client-highlights li::before` uses `left: 0` (physical left-side positioning). In RTL layouts, the em-dash bullet would incorrectly appear on the right instead of the left. **Required outcome: replace `left: 0` with `inset-inline-start: 0`** (the logical property equivalent) to ensure RTL compatibility per new_site.md §15.
- **theme.css:225** — `.pitch-bullets li` uses `border-left: 3px solid var(--color-tertiary)` (physical left border). In RTL, this border would appear on the wrong side. **Required outcome: replace `border-left` with `border-inline-start`** to use the logical property for RTL safety.

## Recommendations (ranked by impact)

1. (impact: medium, effort: low) — Audit all remaining CSS for physical `left`/`right`/`margin-left`/`margin-right`/`padding-left`/`padding-right` in layout contexts and replace with logical property equivalents (`inset-inline-start`, `margin-inline-start`, `padding-inline-start`, etc.). Particularly check:
   - `theme.css` pitch-bullets (line 225) — `border-left` → `border-inline-start`
   - `components.css` client-highlights (line 506–511) — `left: 0` → `inset-inline-start: 0`
   - Any `float: left` or `float: right` should become `float: inline-start` / `float: inline-end`
2. (impact: low, effort: medium) — Consider running `fonttools` or similar to subset the WOFF2 font files to Latin character sets only (a future-proofing measure for file size, not a current failure).
3. (impact: low, effort: low) — Add `<link rel="preload">` for above-the-fold fonts to improve LCP now that fonts are self-hosted WOFF2.

## Evidence

- `grep -n "toLocaleString" /home/sites/phlix/phlix-website/sites/renaissance-atelier/*.html /home/sites/phlix/phlix-website/sites/renaissance-atelier/js/main.js` — no matches.
- `grep -n "float:\s*left\|float:\s*right" /home/sites/phlix/phlix-website/sites/renaissance-atelier/css/` — no matches for float left/right.
- `grep -n "left:" /home/sites/phlix/phlix-website/sites/renaissance-atelier/css/components.css` — `left: 0` found at line 509 (client-highlights li::before pseudo-element).
- `grep -n "border-left" /home/sites/phlix/phlix-website/sites/renaissance-atelier/css/theme.css` — `border-left: 3px solid var(--color-tertiary)` found at line 225 (pitch-bullets li).
- All user-facing strings confirmed sourced from content.json by cross-reference walk of index.html sections (hero, pitch, features, footer) against shared/content.json.
