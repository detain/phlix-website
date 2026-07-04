# Localization Review — mid-century-modern

**Variant**: mid-century-modern
**Round**: 1
**Reviewer**: adversarial-localization-reviewer
**Date**: 2026-07-01

## Score

- **Localization**: 78 / 100

## ✅ Passed

- All 8 pages (`index.html`, `about.html`, `clients.html`, `download.html`, `features.html`, `hub.html`, `plugins.html`, `docs.html`) have `<html lang="en">` correctly set
- No `toLocaleString()` calls found in `js/main.js` or any HTML
- No date/number formatting logic present anywhere in the site
- No `float: left` or `float: right` found in any CSS — layout uses flexbox and grid correctly
- Fonts (Josefin Sans, Bebas Neue, Libre Baskerville, IBM Plex Mono) are Latin-script only, appropriate for English-only content

## ⚠️ Concerns (non-blocking)

- **No `content.json` exists in the site directory** — All user-facing strings are hardcoded directly in HTML files. The rubric requires "Strings reachable from one place (`content.json`) so a future translator can swap them." While every string in every HTML file is readable and English-only, there is no centralized translation file. A translator must edit 8 HTML files individually. This is not a blocker for the current English-only scope but violates the stated localization architecture. — **Suggested next step**: Extract all user-facing text into `content.json` with keys, and render via a lightweight JS loader or at build time.
- **Physical CSS properties in pseudo-element bullets** — `.client-highlights li::before` (components.css:538–547) uses `left: var(--space-3)` and `left: 0` (pitch bullets at theme.css:316–326). These are decorative pseudo-elements used as bullets, not directional content, so they are unlikely to cause real RTL issues. However, `inset-inline-start` would be the fully correct logical property. — **Suggested next step**: Replace `left: X` with `inset-inline-start: X` in pseudo-element positioning when migrating to full logical properties.

## ❌ Failures (must fix this round)

- None. No blocking localization failures found.

## Recommendations (ranked by impact)

1. **Add `content.json` as the single source of truth for all user-facing strings** (impact: high, effort: medium) — Create a `content.json` at the site root containing all nav labels, headings, body copy, CTAs, footer links, and UI strings. Render via a thin JS template or build-step substitution. This is the core requirement of the localization rubric and enables trivial translation swapping.
2. **Audit and extract all hardcoded strings** (impact: high, effort: medium) — Walk all 8 HTML files and extract every visible string (not SVG paths, not ARIA values used only by assistive tech internally) into `content.json` keys. Common categories: nav items, hero copy, feature card titles/descriptions, CTA button text, footer columns/links.
3. **Adopt logical CSS properties for pseudo-element bullets** (impact: low, effort: low) — Replace `left: var(--space-3)` with `inset-inline-start: var(--space-3)` in `.client-highlights li::before` and `.pitch-bullets li::before`. This future-proofs the CSS for RTL content.

## Evidence

- `ls /home/sites/phlix/phlix-website/sites/mid-century-modern/` — no `content.json` present
- `grep -r "toLocaleString" js/ html/` — no matches
- `grep -r "float:" css/` — no matches
- `grep "lang=" *.html | head -8` — all 8 pages confirmed with `lang="en"`
- `js/main.js` — mobile nav toggle, reduced-motion observer, scroll reveal, active nav highlighting — no locale-aware APIs used
- CSS review: flexbox/grid throughout, `margin-inline`/`padding-inline` used correctly in layout containers, `inset: 0` used for absolute positioning, only physical `left`/`right` in decorative pseudo-elements (`.client-highlights li::before`, `.pitch-bullets li::before`)
