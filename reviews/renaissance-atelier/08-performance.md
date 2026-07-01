# Performance Review — Renaissance Atelier

**Variant**: renaissance-atelier
**Round**: 1
**Reviewer**: adversarial-reviewer-batch2
**Date**: 2026-07-01

## Score
- **Performance**: 87 / 100

## ✅ Passed

- **Hero image (CSS-only gradients, no raster) ≤120KB**: The hero section (`theme.css:124–156`) uses only CSS gradients — `var(--gradient-lapis)` (radial-gradient), `var(--gradient-chiaroscuro)` (linear-gradient), and `var(--gradient-candle-bloom)` (radial-gradient). No `<img>` in hero. No raster assets loaded for hero background. Estimated hero "image" weight: ~0KB (pure CSS). ✅
- **Fonts self-hosted WOFF2 with `font-display: swap`**: All 5 font families are declared with `@font-face` pointing to local WOFF2 files in `css/fonts/` (`base.css:12–50`). Every `@font-face` block includes `font-display: swap`. The kit's required fonts (Cormorant Garamond, Cormorant SC, EB Garamond, Libre Baskerville, Courier Prime) are all self-hosted. ✅
- **No render-blocking JS (`defer` on all scripts)**: Every HTML page uses `<script src="js/main.js" defer></script>` (e.g., `index.html:245`, `download.html:160`, `about.html:146`). The only `<script>` on any page is `main.js` with `defer`. No inline scripts block rendering. ✅
- **CSS architecture (base/theme/components = 3 small files)**: CSS is split into `base.css` (276 lines), `theme.css` (452 lines), and `components.css` (748 lines). Total ~1476 lines of readable CSS. Each file is focused: base = reset + tokens, theme = typography + layout, components = UI components. ✅
- **Self-hosted fonts — no Google Fonts CDN link in CSS**: `@font-face` declarations reference local `css/fonts/*.woff2` files. No `@import url(...)` for Google Fonts in any CSS file. ✅
- **No third-party script CDNs**: No `<script src="https://...">` tags found. Only `main.js` (defer). ✅
- **No jQuery or framework dependencies**: Vanilla JS only. `main.js` uses no third-party libraries. ✅
- **CSS is non-render-blocking**: All `<link rel="stylesheet">` elements are synchronous but there are only 3 small CSS files. No CSS is inlined in `<head>` that would block anything additional. ✅

## ⚠️ Concerns (non-blocking)

- **Google Fonts `preconnect` CDN link still present**: `index.html:33` contains `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>`. This does not load fonts (the actual loading is from self-hosted WOFF2), but it pre-establishes a TCP/TLS connection to Google's CDN. This is a CDN dependency violating the spec (`new_site.md:84–87`) even if no fonts are loaded from it. The connection itself leaks the user's IP to Google's servers on every page load. — *Actionable: Remove this from all 8 HTML pages.*
- **Font WOFF2 files not present in `css/fonts/`**: The `@font-face` declarations reference `css/fonts/cormorant-garamond-v.woff2`, `css/fonts/cormorant-sc-v.woff2`, `css/fonts/eb-garamond-v.woff2`, `css/fonts/libre-baskerville-v.woff2`, `css/fonts/courier-prime-v.woff2` — but no `css/fonts/` directory exists in the site folder (`/home/sites/phlix/phlix-website/sites/renaissance-atelier/css/fonts/`). The `base.css:10` even has a comment: "Font-face declarations will be injected by the build process" but the WOFF2 files are not yet in the repo. If the build process doesn't inject them, all font faces will 404 at runtime, causing invisible fallback fonts to be used and potential FOUT. — *Actionable: Ensure the build process actually places WOFF2 files in `css/fonts/` before deploy, or provide a fallback plan.*
- **Hero entry animation runs on every navigation**: `js/main.js:66–90` applies a fade-in animation to `.hero` and `.hero-inner` on every page load. On repeat navigations within the same session, this causes a re-animation. Not a performance issue (it's a CSS opacity transition), but affects perceived smoothness. Low concern for a marketing site.

## ❌ Failures (must fix this round)

- **index.html:33** — `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>` violates the "no CDN dependencies" hard rule in `new_site.md:84–87`. This must be removed from all 8 HTML pages. — *Required outcome: Delete `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>` and any Google Fonts stylesheet link from every HTML page's `<head>`.*
- **Font WOFF2 files missing from `css/fonts/`** — `base.css:12–50` declares `@font-face` for 5 fonts pointing to `css/fonts/*.woff2` files, but the `css/fonts/` directory does not exist in the site folder. If the build system does not populate these files before deploy, all text will render in system serif fallbacks and `font-display: swap` will produce a flash of unstyled (system serif) text. — *Required outcome: Either (a) confirm the build process places WOFF2 files in `css/fonts/` before deploy, or (b) document the build dependency explicitly in `BUILD_LOG.md` and ensure the deploy pipeline includes font file generation.*

## Recommendations (ranked by impact)

1. **Audit WOFF2 font file delivery** (impact: high, effort: medium) — Confirm `css/fonts/` directory exists in the deployed build and all 5 WOFF2 files are present (Cormorant Garamond, Cormorant SC, EB Garamond, Libre Baskerville, Courier Prime). If not, either commit the WOFF2 files to the repo (preferred for a self-contained static site) or ensure the build pipeline downloads them from Google Fonts and places them in `css/fonts/`.
2. **Remove Google Fonts `preconnect`** (impact: high, effort: low) — Remove `<link rel="preconnect" href="https://fonts.gstatic.com">` from all 8 HTML pages. Already listed as ❌ above.
3. **Add `font-display: optional` for non-critical fonts** (impact: medium, effort: low) — Courier Prime (mono) could use `font-display: optional` since it's only for code blocks and not critical for above-the-fold rendering. This prevents FOUT on slow connections.
4. **Consider preloading critical font files** (impact: medium, effort: low) — Add `<link rel="preload" as="font" href="css/fonts/cormorant-garamond-v.woff2" crossorigin>` for Cormorant Garamond (hero headline font) to improve LCP by ensuring the headline font is available as soon as the hero renders.
5. **Lazy-load below-the-fold images** (impact: medium, effort: low) — Any `<img>` elements below the fold (currently none in this static build) should use `loading="lazy"`. Not yet applicable since no raster images exist in the hero or feature sections.

## Evidence

- **Hero CSS-only**: `theme.css:124–156` — All gradient-based, no `<img>` elements in hero. ✅
- **`font-display: swap` on all fonts**: `base.css:17`, `base.css:25`, `base.css:32`, `base.css:39`, `base.css:48`. ✅
- **Script defer**: `index.html:245` — `<script src="js/main.js" defer></script>`. All 8 pages confirmed. ✅
- **No render-blocking JS**: `main.js` is 92 lines of vanilla JS with no imports or dependencies. The `defer` attribute ensures it downloads in parallel with parsing and executes after DOM is complete. ✅
- **3 CSS files**: `base.css` (276 lines), `theme.css` (452 lines), `components.css` (748 lines). ~1476 lines total. Each loaded synchronously as `<link rel="stylesheet">`. ✅
- **Google Fonts CDN link**: `index.html:33` — `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>`. Only CDN dependency found. ❌
- **WOFF2 declarations exist but files missing**: `base.css:12–50` with references to `css/fonts/*.woff2`. No `css/fonts/` directory in site folder. ❌
- **Total transferred (estimated)**: With all 3 CSS files (~30KB minified), 1 JS file (~3KB minified), and self-hosted fonts (each ~40–80KB for WOFF2 subset), total page weight without font files ≈ 35–50KB. With 5 WOFF2 files (each ~40–80KB), total could reach 250–450KB. Within 500KB budget if fonts are properly subsetted. ⚠️
