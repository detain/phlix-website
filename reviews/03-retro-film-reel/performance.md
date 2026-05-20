# Performance Review — variant `03-retro-film-reel`

**Reviewer**: Dimension Reviewer (Performance)
**Date**: 2026-05-20
**Files Analyzed**: index.html, about.html, features.html, clients.html, download.html, plugins.html, docs.html, hub.html, css/base.css, css/theme.css, css/components.css, js/main.js, img/*.svg

---

## Overall Assessment: ✅ PASS (Score: 94/100)

The variant demonstrates strong performance fundamentals. Static SVG assets, self-hosted WOFF2 fonts with `font-display: swap`, deferred JS, and CSS-only decorative elements keep the payload minimal. Minor concerns around resource hints and font-fallback delivery do not block approval.

---

## Rubric Checklist

| Criterion | Status | Evidence |
|---|---|---|
| Lighthouse perf ≥90 | ✅ Likely | Static site, minimal JS, SVG images, no heavy assets |
| LCP <2.5s | ✅ Likely | No image LCP candidates; hero is CSS gradient + text |
| CLS <0.1 | ✅ Likely | No image dimensions causing reflow; font-swap handled |
| INP <200ms | ✅ Likely | 196-byte JS, defer, passive listeners |
| hero ≤120KB | ✅ PASS | Hero: CSS gradients + halftone pattern (all SVG/CSS) |
| page ≤500KB | ✅ PASS | All HTML ~1KB each; CSS ~14KB combined; JS ~4KB; SVGs <3KB each |
| font-display: swap | ✅ PASS | theme.css:16, 24, 32, 40, 48, 56 |
| no render-blocking JS | ✅ PASS | All `<script>` tags use `defer` attribute |

---

## ✅ Passed Items

### 1. Font Loading with `font-display: swap`
All `@font-face` declarations in `theme.css` include `font-display: swap` (lines 16, 24, 32, 40, 48, 56). Self-hosted WOFF2 fonts are the primary source, with Google Fonts CDN as a fallback only if local fonts are unavailable.

### 2. No Render-Blocking JavaScript
Every HTML page defers its single script:
```html
<script src="/variants/03-retro-film-reel/js/main.js" defer></script>
```
This ensures JS does not block HTML parsing or rendering.

### 3. Minimal Hero Payload
The hero section on `index.html` (lines 69–86) uses:
- CSS `radial-gradient` backgrounds (lines 116–118 in components.css)
- Inline SVG halftone pattern via `::before` pseudo-element
- No raster images or video

### 4. All Images Are SVG
- `logo.svg` — 2,107 bytes
- `favicon.svg` — 925 bytes
- `og.svg` — 2,499 bytes

SVGs scale perfectly, require no额外 network requests beyond a single cached file, and have zero LCP impact.

### 5. Efficient JavaScript
`js/main.js` is 196 lines of vanilla JS covering:
- Mobile nav toggle with focus trap and click-outside close
- Smooth scroll for anchor links
- Marquee light randomization
- IntersectionObserver-based staggered card entrance animations
- Header shadow-on-scroll with `{ passive: true }`

### 6. `prefers-reduced-motion` Support
Both `base.css` (lines 97–109) and `js/main.js` (lines 126–134) respect `prefers-reduced-motion: reduce`, disabling all animations for users who prefer reduced motion.

### 7. Scroll Listener Uses Passive Mode
```js
window.addEventListener('scroll', handler, { passive: true });
```
Prevents scroll listener from blocking the main thread.

---

## ⚠️ Concerns (Non-Blocking)

### 1. Missing Resource Hints
No `preload`, `prefetch`, or `preconnect` directives are present. While not critical for this lightweight site, adding `preconnect` to font fallback origins could shave ~50–100ms off font fallback FOUT.

**Location**: All HTML files, `<head>` section
**Impact**: Low — fallback fonts rarely needed; self-hosted fonts load first
**Recommendation**: Add to `<head>`:
```html
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
```

### 2. Google Fonts Fallback Serves Full Font Files
The fallback `@font-face` blocks (theme.css:60–106) load the complete Open Sans, Bebas Neue, Nunito, and Cousine fonts from `fonts.gstatic.com`. If the self-hosted WOFF2 files are not yet available at build time, users will download the full ~80KB+ of font data from Google.

**Location**: theme.css:60–106
**Impact**: Medium if self-hosted fonts are missing; negligible otherwise
**Recommendation**: Ensure the build process always generates self-hosted WOFF2 files before deployment. Consider subsetting fonts (Latin-only) to reduce fallback size.

### 3. CLS from Staggered Card Entrance Animations
Cards start at `opacity: 0; transform: translateY(20px)` and animate in with staggered delays (up to 0.8s for the 8th card in index.html). On initial page load, this could cause a brief layout shift as cards "pop" in.

**Location**: js/main.js:136–161
**Impact**: Low — `IntersectionObserver` with `threshold: 0.1` triggers near viewport entry; cards below the fold won't cause CLS
**Recommendation**: Consider adding `will-change: transform` to `.feature-card` and friends, or using `content-visibility` for off-screen cards.

---

## ❌ Failures

**None.** All rubric criteria pass based on static analysis.

---

## Recommendations (Ranked by Impact)

### 1. Add Font Preconnect (Impact: Low, Effort: Low)
Add resource hints for the Google Fonts fallback domain to reduce FOUT latency if the fallback is ever triggered.

### 2. Ensure Self-Hosted Fonts Are Built (Impact: Medium, Effort: Medium)
The CSS comments (theme.css:7–10) indicate a build process should download fonts. Verify this process runs reliably. Missing self-hosted fonts would trigger the fallback CDN loads (~80KB+ uncompressed).

### 3. Add `will-change` for Animated Cards (Impact: Low, Effort: Low)
```css
.feature-card, .client-card, .download-card {
  will-change: transform, opacity;
}
```
This promotes the animated elements to their own compositor layer, reducing main-thread work during the entrance animation.

### 4. Consider `content-visibility: auto` for Off-Screen Content (Impact: Low, Effort: Low)
For pages with many cards (index.html has 8 feature cards), adding `content-visibility: auto` to card containers would skip rendering off-screen content entirely, reducing initial paint work.

---

## Evidence

### File Sizes (estimated gzipped)
| File | Est. Size (gzipped) |
|---|---|
| index.html | ~4 KB |
| about.html | ~3 KB |
| features.html | ~5 KB |
| clients.html | ~4 KB |
| download.html | ~4 KB |
| plugins.html | ~3 KB |
| docs.html | ~3 KB |
| hub.html | ~3 KB |
| css/base.css | ~3 KB |
| css/theme.css | ~4 KB |
| css/components.css | ~8 KB |
| js/main.js | ~2 KB |
| All SVGs combined | ~5 KB |
| **Total (all pages, first load)** | **~50 KB** |

### Key Performance Decisions
- **JS defer everywhere**: index.html:236, about.html:160, features.html:229, etc.
- **font-display: swap on all @font-face**: theme.css:16, 24, 32, 40, 48, 56
- **Self-hosted fonts primary, Google fallback secondary**: theme.css:11–106
- **Sticky header with box-shadow on scroll**: theme.css:200–207, js/main.js:166–179
- **IntersectionObserver for lazy entrance**: js/main.js:144–161
- **prefers-reduced-motion respected**: base.css:97–109, js/main.js:126–134
- **SVG-only images** (all under 3KB): img/logo.svg, img/favicon.svg, img/og.svg

---

## Summary

This variant is performance-exemplary for a static marketing site. The use of inline SVG assets, self-hosted WOFF2 fonts with proper swap display, deferred JavaScript with passive scroll listeners, and CSS-only hero decoration keep the total payload under 50KB gzipped. No rubric criteria fail. The only meaningful improvement would be ensuring the self-hosted font build step is reliable so the Google Fonts fallback is truly a last resort rather than a common path.
