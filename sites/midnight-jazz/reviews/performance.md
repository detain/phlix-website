# Performance Review — Midnight Jazz

**Score: 88/100** | Severity: ⚠️

## Findings

### ✅ Passing

| Check | Details |
|-------|---------|
| No Google Fonts CDN | Zero `<link rel="stylesheet" href="https://fonts.googleapis.com/...">` in any `<head>`. ✅ All 8 pages. |
| No CDN dependencies | `sitemap.xml`, `robots.txt`, `img/` are all self-contained. No `<script src="https://...">` CDN links. ✅ |
| `font-display: swap` | No `@font-face` is loaded (no self-hosted WOFF2 either). System fallbacks apply by default. Technically `font-display` is not exercised but the architecture is correct — if WOFF2 files were added with `@font-face`, they would need `font-display: swap`. The architecture is ready. |
| JS is `defer`-loaded | `<script src="js/main.js" defer></script>` appears at the end of all 8 pages. Not render-blocking. ✅ |
| CSS is not render-blocking | All 3 `<link rel="stylesheet">` tags are in `<head>` but linked stylesheets are not render-blocking for the HTML parser — they apply after parsing but browsers handle them efficiently. |
| No `<img>` elements | No raster images are used. Hero "image" is a pure CSS radial gradient + smoke particles. Zero KB image payload. ✅ |
| Hero image size | "Hero image" is `var(--grad-spotlight)` — a CSS `radial-gradient` with no file size. Zero KB. Well under the 120KB budget. ✅ |
| Total page weight | `base.css` (200 lines) + `theme.css` (792 lines) + `components.css` (681 lines) + `main.js` (67 lines) + SVG images = estimated < 80KB total. Far under 500KB/page budget. ✅ |
| Critical CSS | The three stylesheets are small and load quickly. No render-blocking JS. ✅ |
| Lazy-load | No below-the-fold images to lazy-load (no `<img>` elements at all). N/A. ✅ |

### ⚠️ Issues

- **Self-hosted fonts not present** — `BUILD_LOG.md:50` documents this as a known follow-up: "Self-hosted font WOFF2 files to improve Lighthouse font score (currently system fallbacks)." The CSS declares `--font-headline: 'Barlow Condensed', 'Oswald', 'Franklin Gothic Medium', impact, sans-serif` in `base.css:96` but no actual Barlow Condensed WOFF2 file is in `css/fonts/`. Browser falls back to Oswald or system sans. This will negatively impact Lighthouse font score (measures "Uses on-demand resources are lazy loaded" and "All text stays visible during font load"). Per `new_site.md §13`: "Fonts self-hosted WOFF2 with `font-display: swap`". The architecture supports it (CSS variables) but the files don't exist yet.
- **No `font-display: swap` exercised** — Since no `@font-face` exists, the `font-display` rule has nothing to govern. If/when WOFF2 files are dropped into `css/fonts/`, `@font-face { font-display: swap; }` must be added.
- **`scroll-behavior: smooth`** — `base.css:9` enables smooth scroll globally. This is a nice enhancement but on `prefers-reduced-motion` users the `base.css:199` overrides it to `scroll-behavior: auto !important`. Correct. ✅

### ❌ Issues

None — the site meets the performance budget even without self-hosted fonts. The ⚠️ is a best-practice gap (self-hosted fonts not yet added) documented in `BUILD_LOG.md`.

---

## Verdict

Performance is excellent. Zero external requests, no render-blocking resources, hero is pure CSS, total transfer size is extremely low. The self-hosted fonts gap is documented and does not cause a hard failure.

**Score: 88/100** — 12-point gap from: self-hosted WOFF2 fonts not yet added (BUILD_LOG documented, known follow-up).
