# Performance Review — Desert Horizon

**Variant**: desert-horizon
**Round**: 1
**Reviewer**: adversarial-performance
**Date**: 2026-07-01

## Score

- **Performance**: 65 / 100

## ✅ Passed

- No CDN dependencies — zero Google Fonts `<link>` tags, zero CDN JS script tags across all 8 HTML pages
- All JS is `defer`-loaded — every page uses `<script src="js/main.js" defer>` (index.html:428 and all other pages)
- CSS is in external stylesheets — three separate `<link rel="stylesheet">` tags per page (base.css, theme.css, components.css), none inline
- Hero section uses inline SVG via data URI — theme.css:107–116 embeds a desert landscape SVG as a background-image data URI, avoiding an extra network request
- Scroll reveal animation gated by `prefers-reduced-motion` — main.js:92 checks `matchMedia('(prefers-reduced-motion: reduce)')` and only initializes the IntersectionObserver if `!reducedMotion`; CSS also resets animations for `prefers-reduced-motion: reduce` in base.css:269 and components.css:808–814

## ⚠️ Concerns (non-blocking)

- Hero inline SVG data URI is ~6 KB of encoded SVG in CSS — not render-blocking but increases stylesheet size; acceptable for a single background image — monitor if more inline SVGs are added
- Total page weight has not been measured with an actual Lighthouse run — the inline SVG hero, external CSS (3 files), and the 118-line main.js are all lightweight, but real-world LCP/CLS metrics should be confirmed with Lighthouse before claiming budget compliance

## ❌ Failures (must fix this round)

- **css/base.css:83–87** — `font-face` declarations are entirely absent. The CSS declares `--font-headline`, `--font-display`, `--font-body`, `--font-ui`, and `--font-mono` using Google Fonts family names (`'Playfair Display'`, `'Arvo'`, `'Lora'`, `'Source Sans 3'`, `'IBM Plex Mono'`) but provides zero `@font-face` rules and no self-hosted WOFF2 files. The `css/fonts/` directory does not exist. Browsers fall back to system serif/sans-serif, completely breaking the brand's typography identity. — **Required: Add `@font-face` declarations for all 5 font families (Playfair Display, Arvo, Lora, Source Sans 3, IBM Plex Mono) with self-hosted WOFF2 files in `css/fonts/`, including `font-display: swap`**
- **css/base.css:83–87** — No `font-display: swap` declared — because no `@font-face` exists at all. Per new_site.md §13: "Fonts self-hosted WOFF2 with `font-display: swap`" — **Required: Add `font-display: swap` to all `@font-face` rules**

## Recommendations

1. Download WOFF2 files for Playfair Display (700, 900), Arvo (700), Lora (400, 600), Source Sans 3 (400, 600, 700), and IBM Plex Mono (400, 600) from a trusted open-source font source (e.g. fonts.gstatic.com via self-hosted download, or Font Squirrel), place them in `css/fonts/`, and add `@font-face` blocks in `css/base.css` with `font-display: swap` (impact: high, effort: medium)
2. Verify Lighthouse performance score ≥90 mobile/desktop once fonts are self-hosted (impact: high, effort: low — run `npx lighthouse https://detain.github.io/phlix-website/sites/desert-horizon/ --view`)
3. Confirm CLS < 0.1 once fonts load with `font-display: swap` preventing FOIT (impact: high, effort: low)

## Evidence

- `grep -r "fonts\.googleapis\|cdnjs\|jsdelivr\|unpkg" /home/sites/phlix/phlix-website/sites/desert-horizon/` → no matches
- `grep -r "@font-face" /home/sites/phlix/phlix-website/sites/desert-horizon/css/` → no matches
- `grep -r "defer" /home/sites/phlix/phlix-website/sites/desert-horizon/*.html` → all 8 pages: `<script src="js/main.js" defer>`
- theme.css:107–116: hero background via `url("data:image/svg+xml,...")` inline SVG
- main.js:92: `const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;`
- base.css:269: `@media (prefers-reduced-motion: reduce) { * { animation-duration: 0.01ms ... } }`
- components.css:808–814: `.reveal` reduced-motion override
- `ls /home/sites/phlix/phlix-website/sites/desert-horizon/css/fonts/` → directory does not exist
- css/base.css:83–87: font-family variables declared with no corresponding `@font-face`
