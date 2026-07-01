# Dimension 8: Performance
**Fonts, CDNs, JS loading, render-blocking, image format**

---

## Score: 60 / 100

## Verdict: FAIL (<80 — CDN font dependency is a critical spec violation)

---

## Findings

### ❌ Google Fonts CDN — Critical Violation
- **File:** `base.css:7`
- **Issue:**
  ```css
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=IBM+Plex+Mono:wght@400;600&family=IBM+Plex+Sans:wght@400;500;600&family=Space+Grotesk:wght@700;900&family=Noto+Sans+JP:wght@400;500;700&family=Noto+Serif+JP:wght@700&display=swap');
  ```
- new_site.md §1 explicitly: "**No CDN dependencies in the deployed page (no Google Fonts `<link>` to `fonts.googleapis.com`, no script CDNs).** Self-host fonts as WOFF2 and declare them with `@font-face` + `font-display: swap`."
- This is a **past-fixed regression** being reintroduced — new_site.md §1 and BUILD_LOG.md:86 both note it
- The brand kit accessibility spec §19 requires "Noto Serif JP / Noto Sans JP must be loaded for correct CJK glyph rendering" — Noto Serif JP is NOT in this import anyway
- Google Fonts `@import` is **render-blocking** — the browser must download and parse the CSS containing the @import before discovering the font URLs, then fetch fonts
- `font-display: swap` is requested by Google Fonts (via the `&display=swap` parameter in typical usage) but the URL here uses the default `&display=` which means most Google Font requests get a non-swap display
- **Severity:** Critical — explicit spec violation, documented regression
- **Confidence:** 100%

### ✅ All JS is defer-loaded
- All pages: `<script src="js/main.js" defer></script>` — at bottom of body ✅
- No blocking inline scripts — ✅
- No third-party scripts — ✅

### ✅ No CDNs for Scripts
- No `<script src="https://...">` tags found — ✅

### ⚠️ Google Fonts is Render-Blocking
- While `@import` is technically a separate CSS request, the Google Fonts CSS file itself contains @font-face rules that reference WOFF2 files
- The CSS parser blocks on the @import, then the browser makes additional requests for the font files
- Performance impact: delays First Contentful Paint
- This is a well-known issue with Google Fonts @import in CSS — the recommended pattern is `<link rel="preconnect">` + `<link rel="stylesheet">` in HTML head, but even that is still CDN-dependent
- The correct solution per spec is self-hosted WOFF2

### ✅ Images — SVG (No Heavy Rasters)
- `img/logo.svg` — vector ✅
- `img/favicon.svg` — vector ✅
- `img/og.svg` — vector (though the spec requires `og.png` at 1200×630) — see Content Accuracy review
- No heavy raster images (JPG, PNG) found — ✅

### ✅ No Render-Blocking CSS (other than Fonts)
- Stylesheets loaded in `<head>` without `media="print"` or `disabled` attributes — normal render-blocking CSS
- Three separate CSS files loaded: base, theme, components — could be combined but not a spec violation
- No render-blocking scripts — ✅

### ✅ CSS Minification Mentioned in Build Architecture
- new_site.md §17: "CSS is minified at build time" — this is a build-time concern, not visible in source
- Source CSS is not minified but that's expected at dev time

---

## Summary

Performance is fundamentally broken on the CDN font issue — Google Fonts `@import` in base.css violates new_site.md's explicit "No CDN dependencies" rule and is a render-blocking performance anti-pattern. This is a known issue documented in BUILD_LOG.md. All other performance aspects are excellent: no JS CDNs, all JS defer-loaded, SVG-only images, no render-blocking scripts. The CDN font issue drops this from a potential 95+ to 60.
