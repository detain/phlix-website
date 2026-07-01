# Performance Review — Marina Breeze

**Dimension:** Performance
**Score:** 55/100
**Severity:** ❌ FAIL

---

## Findings

### ❌ FAIL — Google Fonts CDN in @font-face (Render-Blocking Risk)
**File:** `base.css:9-71`

All 8 font-face declarations use URLs from `fonts.gstatic.com`:

```css
@font-face {
  font-family: 'Playfair Display';
  font-weight: 700;
  font-display: swap;
  src: url('https://fonts.gstatic.com/s/playfairdisplay/v37/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKdFvXDXbtY.woff2') format('woff2');
}
```

`new_site.md:84-87` is explicit:
> "No CDN dependencies in the deployed page (no Google Fonts `<link>` to `fonts.googleapis.com`, no script CDNs). **Self-host fonts** as WOFF2 and declare them with `@font-face` + `font-display: swap`."

The distinction between `<link>` and `@font-face` CDN URLs is subtle but the intent is clear: no external font CDNs at all. The BUILD_LOG.md:31 calls this an "Intentional Deviation" but the spec has no allowance for "close enough" on CDN elimination.

While `font-display: swap` is correctly used (prevents render-blocking text delay), the fonts.gstatic.com domain is still an external dependency that:
1. Adds DNS lookup + TCP handshake + TLS negotiation for fonts.gstatic.com
2. Is blocked by privacy-focused browsers or network policies that block Google domains
3. Violates the explicit "self-host" directive

**CSS filesize note:** The total CSS footprint is lightweight (~50KB unminified across 3 files). No render-blocking JS (all `<script>` tags use `defer`). ✅

### ✅ PASS — No Render-Blocking JS
All 8 pages: `<script src="js/main.js" defer></script>` ✅
`defer` attribute ensures JS doesn't block HTML parsing ✅

### ✅ PASS — CLS-Friendly Layout
All layout uses:
- CSS custom properties for dimensions ✅
- `max-width` + fluid grids (no fixed-height images) ✅
- No `<img>` elements with explicit `width`/`height` that could cause layout shift ✅
- CSS gradients instead of raster hero images — zero CLS potential ✅

### ✅ PASS — Lazy-Load Ready (No Below-Fold Images)
The site currently has no raster `<img>` elements. All imagery is CSS gradients or inline SVG. Lazy-loading is not applicable, and there's nothing below the fold that would cause LCP delay.

### ✅ PASS — No Third-Party Scripts
Zero analytics, zero tracking pixels, zero third-party scripts. Pure static HTML/CSS/JS ✅

### ✅ PASS — Critical CSS
The three stylesheets are loaded in order (base → theme → components). All critical CSS (reset, tokens, typography, layout) is inlined in the stylesheets, which load synchronously but are small enough not to be a significant bottleneck.

### ⚠️ WARNING — No Font Subsetting
Even if fonts were self-hosted, no subsetting is applied. The Playfair Display WOFF2 contains the full character set. For a site with primarily English content, subsetting to Latin characters would reduce font file size by ~60%.

### ⚠️ WARNING — No Preconnect Hints
No `<link rel="preconnect">` hints for fonts.gstatic.com (though the proper fix is to self-host, not add preconnect).

---

## Summary

**Score: 55/100 — ❌ FAIL**

The site gets high marks for having no render-blocking JS, no third-party scripts, CLS-safe layout, and no below-fold raster images. The font implementation is technically `defer`-equivalent (via `font-display: swap`) but **uses Google Fonts CDN URLs in @font-face, which directly violates the self-hosting requirement** in new_site.md §8.

The spec says: "No CDN dependencies in the deployed page... Self-host fonts as WOFF2." There is no ambiguity here. Until the WOFF2 files are downloaded and placed in `css/fonts/` (or wherever), this remains a hard failure.

Once fonts are self-hosted and the CSS `@font-face` `src` URLs point to local files, this would score 95+.
