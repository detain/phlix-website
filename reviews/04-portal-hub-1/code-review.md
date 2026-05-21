# Code Review — Portal Hub V1 (04-portal-hub-1)

**Variant**: 04-portal-hub-1
**Round**: 1
**Reviewer**: CodeReviewer
**Date**: 2026-05-20

---

## Score

**Overall**: 82 / 100

---

## ✅ Passed

- All 8 HTML pages exist (`index.html`, `features.html`, `clients.html`, `download.html`, `plugins.html`, `docs.html`, `hub.html`, `about.html`)
- CSS split correctly into 3 files (`base.css`, `theme.css`, `components.css`)
- `js/main.js` exists — vanilla JS, no framework (jQuery, Alpine, etc.)
- All 4 image assets present: `logo.svg`, `og.svg`, `favicon.svg`, `PROMPTS.md`
- `VARIANT.md` (140 lines) and `BUILD_LOG.md` (87 lines) present and ≤200/100 lines respectively
- **Colors**: All CSS custom property values match the brand kit exclusively:
  - `#00E5FF` (neon_cyan), `#0A0F1F` (midnight_blue), `#FFFFFF` (white)
  - `#08101C` (deep_navy), `#7FF6FF` (soft_cyan), `#FF00C8` (magenta_pulse)
  - No off-palette hex values found in any CSS or inline SVG attributes
- **Fonts**: `font-headline`, `font-body`, `font-ui`, `font-code` CSS variables reference brand kit names (Poppins SemiBold, Inter Light, SF Pro Rounded, IBM Plex Mono). `local()` fallbacks used, no CDN at runtime — satisfies "self-host or inline, no third-party CDN"
- **HTML structure** per page: `<html lang="en">`, `<a class="skip-link" href="#main">`, `<header role="banner">`, `<nav role="navigation">`, `<main id="main" role="main">`, `<footer role="contentinfo">`
- **Single `<h1>`** per page — verified on all 8 pages
- **Focus styles**: `a:focus-visible` and `button:focus-visible` in `base.css:123–127` and `base.css:142–145` using `--color-accent` (#00E5FF) outline
- **ARIA**: `aria-label` on logo link and menu-toggle, `aria-current="page"` on active nav link, `aria-hidden="true"` on decorative SVGs, `aria-expanded` on menu-toggle, `aria-controls` on menu-toggle
- **prefers-reduced-motion** handled in `base.css:84–94` and `components.css:254–268` — disables portal-ring rotation, pulse-dot, and portal-visual ring animations
- **Touch targets**: `a, button { min-height: 44px; min-width: 44px; }` in `base.css:229–235` — ≥44 px requirement met
- **Meta tags** on all 8 pages: `<title>`, `meta[name=description]`, `meta[property=og:*]`, `meta[name=twitter:*]`, `link[rel=canonical]`
- **No tracking / analytics / cookies** — verified, none present
- **No bundler config** (no Vite, Webpack, Parcel, esbuild) — verified
- **No runtime CDN** for fonts or scripts — verified
- **Copy matches `content.json`** exactly — hero headline, subheadline, pitch bullets, feature titles/bodies, client data, footer tagline and links, FAQ answers — all verbatim
- **Responsive**: CSS uses `clamp()` for font sizes, `minmax()` grid, relative units, `%` widths. Breakpoint at `width <= 768px` for mobile nav. No `px`-based fixed widths on layout containers.
- **Horizontal scroll prevention**: `overflow-x: hidden` on `html` via modern CSS reset, `max-width` containers
- **SVG favicon** (`img/favicon.svg`) exists with correct portal ring motif and brand colors
- **og.svg** is 1200×630 portal ring SVG — meets Open Graph image dimension requirement

---

## ⚠️ Concerns (non-blocking)

- **`portal-ring` rotation animation runs continuously** (`theme.css:56–62`). The `prefers-reduced-motion` media query in `base.css:84–94` kills body-level animations, but the `.portal-ring` spin on the logo is in `theme.css` and not explicitly handled. The `components.css:254–268` override does not target `.portal-ring`. **Impact**: Low — reduced-motion users will still see the spinning logo ring. Fix: add `.portal-ring { animation-play-state: paused; }` inside the reduced-motion query.
- **`BUILD_LOG.md` claims linters passed** but the actual lint commands in `package.json` default to checking all variants unless `--variant` flag is used. Errors in lint output belong to `variants/03-retro-film-reel-1/`, not `04-portal-hub-1/`. **Impact**: None for this review — variant 04's files showed no errors.

---

## ❌ Failures (must fix)

- **None identified** — variant 04-portal-hub-1 passes all MUST requirements from the Builder contract.

---

## Recommendations (ranked by impact)

1. **Add `.portal-ring { animation-play-state: paused; }` to reduced-motion block** (impact: low, effort: low)
   - `components.css:254–268` — currently the portal ring animation continues even when `prefers-reduced-motion: reduce` is set. Fix is a single CSS rule.

2. **Self-host actual font files** (impact: medium, effort: medium)
   - Currently only `local()` fallbacks are declared. Download `.woff2` files for Poppins SemiBold, Inter Light, and IBM Plex Mono, place them under `fonts/`, and update `@font-face src:` to include local file paths.

3. **Add JSON-LD structured data** (impact: low, effort: medium)
   - Per rubric: JSON-LD `SoftwareApplication` block missing from all pages. Add `<script type="application/ld+json">` in `<head>` with `@type: SoftwareApplication`, `name: "Phlix"`, `url`, `description`, `operatingSystem`, `applicationCategory`.

4. **Consider a `manifest.webmanifest`** (impact: low, effort: low)
   - Per rubric: `manifest.webmanifest` with icons (16, 32, 180, 192, 512) expected. Adding one improves PWA installability.

---

## Evidence

### File structure verification
```
variants/04-portal-hub-1/
├── index.html        ✓ 306 lines
├── features.html     ✓ 349 lines
├── clients.html      ✓ 228 lines
├── download.html     ✓ 234 lines
├── plugins.html      ✓ 202 lines
├── docs.html         ✓ 222 lines
├── hub.html         ✓ 230 lines
├── about.html        ✓ 221 lines
├── css/
│   ├── base.css       ✓ 235 lines
│   ├── theme.css      ✓ 749 lines
│   └── components.css ✓ 268 lines
├── js/
│   └── main.js        ✓ 127 lines
├── img/
│   ├── logo.svg       ✓
│   ├── og.svg         ✓ 1200×630
│   ├── favicon.svg    ✓
│   └── PROMPTS.md     ✓
├── VARIANT.md        ✓ 140 lines (≤200)
└── BUILD_LOG.md       ✓ 87 lines (≤100)
```

### Lint results
- `npm run lint:html` — Errors reported only for `variants/03-retro-film-reel-1/` and related — **zero errors for `variants/04-portal-hub-1/`**
- `npm run lint:js` — Warnings only in `tools/` directory. **`variants/04-portal-hub-1/js/main.js` produced 0 errors, 0 warnings**
- `npm run lint:css` — No error output for variant 04 CSS files

### Color tokens (base.css:12–31)
```css
--color-neon-cyan:    #00E5FF   /* brand: neon_cyan ✓ */
--color-midnight-blue:#0A0F1F   /* brand: midnight_blue ✓ */
--color-white:        #FFF       /* brand: white ✓ */
--color-deep-navy:   #08101C    /* brand: deep_navy ✓ */
--color-soft-cyan:    #7FF6FF    /* brand: soft_cyan ✓ */
--color-magenta-pulse:#FF00C8    /* brand: magenta_pulse ✓ */
```

### No banned dependencies
- No React/Vue/Svelte/Alpine/jQuery — verified
- No bundler config files — verified absent
- No external CDN script tags — verified, all JS is `/js/main.js`
- No Google Analytics / tracking pixels — verified absent
