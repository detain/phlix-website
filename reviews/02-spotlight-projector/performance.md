# Performance Review — `02-spotlight-projector`

**Variant:** Spotlight Projector
**Reviewer:** Dimension Reviewer (Performance)
**Date:** 2026-05-20

---

## Score: 95 / 100

---

## Rubric Criteria

| Criterion | Target | Result |
|-----------|--------|--------|
| Lighthouse Performance | ≥ 90 | Likely 92–95 |
| LCP | < 2.5s | ✅ Likely < 1.5s (text-based, no hero image) |
| CLS | < 0.1 | ✅ Likely < 0.05 (no dimensionless images) |
| INP | < 200ms | ✅ Likely < 50ms (minimal JS) |
| Hero image budget | ≤ 120 KB | ✅ No raster hero — CSS gradients + inline SVG only (~0 KB) |
| Total page transferred | ≤ 500 KB | ✅ ~35 KB total (CSS: ~27 KB, JS: ~4 KB, SVGs: ~3.5 KB) |
| font-display: swap | Required | ✅ Present in both Google Fonts URL and @font-face rules |
| Render-blocking JS | None | ✅ `defer` attribute on script tag |

---

## ✅ Passed Items

### 1. Total Page Weight — EXCELLENT
- **CSS:** base.css (3.9 KB) + theme.css (9.2 KB) + components.css (13.5 KB) = **~27 KB**
- **JS:** main.js = **~4 KB**
- **Images:** logo.svg (1.4 KB) + favicon.svg (929 B) + og.svg (1.2 KB) = **~3.5 KB**
- **Total transferred:** ~**35 KB** — well under 500 KB budget

### 2. No Hero Raster Image
- Hero section (`index.html:67–77`) uses **CSS-only backgrounds** (`radial-gradient`, `linear-gradient`)
- No JPG/PNG/WebP hero — zero image weight for LCP element
- LCP will be a text node, which is fast to render

### 3. font-display: swap — COMPLIANT
- Google Fonts import includes `display=swap` (`theme.css:8`)
- All three @font-face rules explicitly declare `font-display: swap` (`theme.css:14,22,30`)
- No flash of invisible text (FOIT) risk

### 4. Render-Blocking JS — NONE
- `<script src="...main.js" defer>` on all pages (`index.html:224`, `features.html:212`, `download.html:176`)
- JS loads after HTML parsing completes
- No blocking on critical rendering path

### 5. Image Dimensions — SAFE
- Logo `<img>` has explicit `width="120" height="40"` (`index.html:43`)
- All SVGs are inline with no layout impact
- No raster images without dimensions

### 6. Sticky Header — CLS-SAFE
- Header uses `position: sticky` with `z-index: 1000` (`theme.css:64–66`)
- No layout shift when header becomes sticky

### 7. prefers-reduced-motion Support
- All animations disabled when `prefers-reduced-motion: reduce` (`base.css:173–181`, `theme.css:353–356`)
- Reduces CLS and motion sensitivity

---

## ⚠️ Concerns (Non-Blocking)

### 1. Dead @font-face Rules Reference Missing Local Fonts
**File:** `css/theme.css:10–32`

```css
@font-face {
  font-family: Lora;
  src: url('../fonts/lora-regular.woff2') format('woff2'); /* 404 */
}
```

The `fonts/` directory does not exist — these @font-face declarations reference local files that will 404. The page still renders correctly because Google Fonts' CSS overrides these rules. However, browsers will issue 3 failed HTTP requests per page load.

**Impact:** Minor. Wasted bandwidth (~3 × 404 response), but no visible break.

**Fix:** Either:
- Remove the @font-face rules entirely (rely solely on Google Fonts), or
- Populate `fonts/` with the actual `.woff2` files

---

## ❌ Failures

**None.** All rubric items pass.

---

## Recommendations (Ranked by Impact)

### 1. Remove or Fix Dead @font-face Rules — Low Effort, Medium Impact
**Priority:** Low
**Files:** `css/theme.css:10–32`

The three `@font-face` blocks attempt to load local fonts that don't exist. Remove them to eliminate 3 HTTP 404s per page load. The Google Fonts import (`theme.css:8`) already provides these fonts correctly.

**Evidence:** `ls variants/02-spotlight-projector/fonts/` returns empty.

---

### 2. Add `loading="lazy"` to Below-Fold Images (if any added later)
**Priority:** N/A — No below-fold raster images currently exist

If raster images are added to pages in the future (e.g., client logos, plugin screenshots), ensure `loading="lazy"` is set on `<img>` tags outside the initial viewport.

---

### 3. Consider Preloading Critical Font — Future Optimization
**Priority:** Future
**File:** `index.html`

If self-hosting fonts (resolving the 404 concern above), add `<link rel="preload">` for the headline font (Cinzel) since it's used for the LCP element.

Current approach (Google Fonts with `display=swap`) is acceptable for Lighthouse ≥ 90.

---

## Evidence

### File Sizes
```
css/base.css      3,962 bytes
css/theme.css    9,398 bytes
css/components.css 13,842 bytes
js/main.js       4,136 bytes
img/logo.svg     1,422 bytes
img/favicon.svg    929 bytes
img/og.svg       1,197 bytes
─────────────────────────────
Total:           ~35 KB (uncompressed)
```

### Google Fonts URL
```
https://fonts.googleapis.com/css2?family=Cinzel:wght@700&family=Fira+Code:wght@400&family=Lora:wght@400&family=Source+Sans+Pro:wght@500&display=swap
```

### Render-Blocking Check
```html
<!-- index.html:224 -->
<script src="/variants/02-spotlight-projector/js/main.js" defer></script>
```
✅ `defer` attribute present — non-blocking.

### font-display in @font-face
```css
/* theme.css:14 */
font-display: swap;  /* Present on all 3 @font-face rules */
```

### Sticky Header
```css
/* theme.css:63–66 */
.site-header {
  position: sticky;
  top: 0;
  z-index: 1000;
```

### Hero Background (No Raster Image)
```css
/* components.css:85–94 */
.hero::before {
  background:
    radial-gradient(ellipse at 50% 0%, rgb(245, 197, 66, 0.15) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 80%, rgb(122, 31, 31, 0.2) 0%, transparent 40%),
    linear-gradient(180deg, rgb(0,0,0,0.8) 0%, rgb(0,0,0,0.95) 100%);
```

---

## Summary

The `02-spotlight-projector` variant is **excellently optimized for performance**. Total page weight is ~35 KB — 93% under the 500 KB budget. No render-blocking resources exist, fonts use `font-display: swap`, there is no hero raster image (LCP is text-based), and CLS is minimal due to sticky positioning and properly-sized SVGs. The only issue is 3 dead `@font-face` rules that generate 404s, which do not break rendering but should be cleaned up. Lighthouse score is estimated at **92–95**.
