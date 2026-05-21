# Performance Review — variant `03-retro-film-reel-2`

**Reviewer**: Dimension Reviewer (Performance)
**Date**: 2026-05-20
**Files Analyzed**: index.html, about.html, features.html, clients.html, download.html, plugins.html, docs.html, hub.html, css/base.css, css/theme.css, css/components.css, js/main.js, css/fonts/*

---

## Overall Assessment: ⚠️ CONDITIONAL PASS (Score: 84/100)

The variant demonstrates strong performance fundamentals similar to Wave 1: self-hosted WOFF2 fonts with `font-display: swap`, CSS-only decorative elements, and SVG-only images. However, one significant regression from Wave 1 and two non-blocking concerns require attention before final approval.

---

## Rubric Checklist

| Criterion | Status | Evidence |
|---|---|---|
| Lighthouse perf ≥90 | ✅ Likely | Static site, minimal JS, SVG images, no heavy assets |
| LCP <2.5s | ✅ Likely | No image LCP candidates; hero is CSS gradient + text |
| CLS <0.1 | ✅ Likely | No image dimensions causing reflow; font-swap handled |
| INP <200ms | ⚠️ Uncertain | 196-byte JS, but NOT deferred (see ❌ Regression) |
| hero ≤120KB | ✅ PASS | Hero: CSS gradients + spotlight animation (all CSS) |
| page ≤500KB | ✅ PASS | All HTML ~3-5KB each; CSS ~15KB combined; JS ~4KB; SVGs <3KB each |
| font-display: swap | ✅ PASS | Inline @font-face in every HTML head (lines 31-58) |
| no render-blocking JS | ❌ FAIL | `js/main.js` NOT deferred (index.html:250) |

---

## ❌ Critical Regression from Wave 1

### JavaScript Not Deferred

**Location**: index.html:250
```html
<!-- Scripts -->
<script src="js/main.js"></script>
```

Wave 1 (03-retro-film-reel) correctly used `defer` on all script tags:
```html
<script src="/variants/03-retro-film-reel/js/main.js" defer></script>
```

Wave 2 is missing the `defer` attribute. This causes `js/main.js` to:
1. Block HTML parsing during fetch
2. Execute before DOM is ready
3. Delay Time to Interactive (TTI)

**All 8 HTML files have this issue**: index.html:250, about.html, clients.html, docs.html, download.html, features.html, hub.html, plugins.html

**Fix**: Add `defer` to all script tags:
```html
<script src="js/main.js" defer></script>
```

---

## ✅ Passed Items

### 1. Font Loading with `font-display: swap`
All `@font-face` declarations in `index.html` (lines 31-58) include `font-display: swap`. Self-hosted WOFF2 fonts are the primary source with `local()` fallbacks.

### 2. Self-Hosted WOFF2 Fonts
- `css/fonts/bebas-neue.woff2` — Bebas Neue (headlines)
- `css/fonts/open-sans.woff2` — Open Sans (body)
- `css/fonts/nunito-bold.woff2` — Nunito Bold (UI, 700 weight)
- `css/fonts/cousine.woff2` — Cousine (code)

WOFF2 format provides excellent compression (~70% smaller than TTF).

### 3. All Images Are SVG
- `img/logo.svg`
- `img/favicon.svg`
- `img/og.svg`

SVG assets scale perfectly, require no additional network requests, and have zero LCP impact.

### 4. Minimal Hero Payload
The hero section uses CSS-only decoration:
- `radial-gradient` backgrounds (theme.css:201-210)
- `::before` velvet texture overlay (theme.css:217-224)
- `::after` spotlight sweep animation (theme.css:227-241)
- No raster images or video

### 5. CSS-Only Animations
All decorative animations use CSS `@keyframes`:
- `marquee-lights` (theme.css:74-109)
- `spotlight-sweep` (theme.css:243-259)

### 6. `prefers-reduced-motion` Support (Partial)
Theme.css (lines 115-122) disables the marquee-lights animation for users who prefer reduced motion:
```css
@media (prefers-reduced-motion: reduce) {
  .site-logo__text {
    animation: none;
    /* ... */
  }
}
```

---

## ⚠️ Concerns (Non-Blocking)

### 1. Duplicate @font-face Declarations

Each HTML file contains identical inline @font-face blocks (lines 21-24 in about.html, clients.html, docs.html, download.html, features.html, hub.html, plugins.html, and lines 31-58 in index.html).

**Impact**: 
- ~800 bytes duplicated 8 times = ~6.4KB of duplicated CSS
- No runtime impact (browser caches), but increases total page weight

**Recommendation**: Extract to `css/fonts.css` and link it:
```html
<link rel="stylesheet" href="css/fonts.css">
```

### 2. Missing `prefers-reduced-motion` for Hero Spotlight

The `spotlight-sweep` animation on `.hero::after` (theme.css:243-259) runs continuously at 8s intervals but is NOT wrapped in a `@media (prefers-reduced-motion: reduce)` query. Only the `marquee-lights` animation on `.site-logo__text` respects this preference.

**Location**: theme.css:227-259
**Impact**: Low — animation is subtle and disabled via base.css global rule (base.css:70-78) for users with `prefers-reduced-motion: reduce`
**Note**: base.css:70-78 globally disables all animations and transitions for `prefers-reduced-motion: reduce`, so the spotlight-sweep IS actually disabled globally. This concern is already mitigated.

### 3. No `will-change` on Animated Elements

Elements with entrance animations (`.feature-card`, `.client-card`, `.ecosystem-card`, etc.) lack `will-change: transform, opacity`. During staggered entrance animations, the browser must promote these elements to compositor layers on the fly.

**Location**: js/main.js (staggered entrance), theme.css (card hover states)
**Impact**: Low — animation triggers are off-screen via IntersectionObserver

### 4. CSS Gradient Complexity

Many elements use multiple layered gradients:
- `.site-header`: 1 linear-gradient + 2 radial-gradient (::before)
- `.hero`: 3 radial-gradient + 1 linear-gradient + 2 pseudo-element overlays

Modern browsers handle this efficiently via GPU compositing, but extremely old devices may show degraded scroll performance.

**Location**: theme.css:26-30, 200-210
**Impact**: Very Low — GPU-accelerated in modern browsers

### 5. Box-Shadow Layering

Cards and buttons use multiple box-shadow layers:
```css
box-shadow:
  6px 6px 0 var(--color-gold),
  inset 0 0 20px rgba(212, 160, 23, 0.05);
```

**Impact**: Minimal — shadows are simple solid colors and inset colors, not blur-heavy

---

## ❌ Failures

| Criterion | Status | Reason |
|---|---|---|
| no render-blocking JS | ❌ FAIL | `js/main.js` missing `defer` attribute |

All other rubric criteria pass. The JS regression is correctable.

---

## Recommendations (Ranked by Impact)

### 1. Add `defer` to All Script Tags (Impact: High, Effort: Low)
Fix the regression by adding `defer` to `<script src="js/main.js">` in all 8 HTML files.

**Files**: index.html, about.html, clients.html, docs.html, download.html, features.html, hub.html, plugins.html

**Before**:
```html
<script src="js/main.js"></script>
```

**After**:
```html
<script src="js/main.js" defer></script>
```

### 2. Extract @font-face to External CSS (Impact: Low, Effort: Low)
Reduce inline CSS duplication by moving @font-face declarations to `css/fonts.css`.

**Benefit**: Single HTTP request for fonts across all pages, better caching

### 3. Add `will-change` for Animated Cards (Impact: Low, Effort: Low)
```css
.feature-card, .client-card, .ecosystem-card {
  will-change: transform, opacity;
}
```

Promotes animated elements to their own compositor layer, reducing main-thread work during entrance animations.

### 4. Consider `content-visibility: auto` for Off-Screen Cards (Impact: Low, Effort: Low)
For pages with many cards, adding `content-visibility: auto` to card containers would skip rendering off-screen content entirely.

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
| css/theme.css | ~5 KB |
| css/components.css | ~7 KB |
| js/main.js | ~2 KB |
| All SVGs combined | ~5 KB |
| **Total (all pages, first load)** | **~50 KB** |

### Key Performance Decisions (Wave 2)
- **Self-hosted WOFF2 fonts with font-display: swap**: Inline in every HTML head
- **CSS-only hero decoration**: gradients + spotlight animation
- **SVG-only images**: All under 3KB each
- **Sticky header**: box-shadow on scroll via JS
- **IntersectionObserver for staggered entrance**: js/main.js
- **prefers-reduced-motion respected**: base.css global + theme.css specific

### Comparison to Wave 1 (03-retro-film-reel)
| Criterion | Wave 1 | Wave 2 |
|---|---|---|
| `defer` on scripts | ✅ Yes | ❌ No (regression) |
| Self-hosted fonts | ✅ Yes | ✅ Yes |
| font-display: swap | ✅ Yes | ✅ Yes |
| prefers-reduced-motion | ✅ Yes | ✅ Yes (partial) |
| CSS-only hero | ✅ Yes | ✅ Yes |

---

## Summary

Wave 2 maintains the strong performance foundations of Wave 1: self-hosted WOFF2 fonts with proper swap display, CSS-only hero decoration, and SVG-only images keep the payload minimal. The sole blocking issue is the missing `defer` attribute on script tags, which represents a regression from Wave 1's implementation. Adding `defer` to all 8 HTML files will restore compliance. Non-blocking recommendations include extracting duplicate @font-face declarations and adding `will-change` for animated cards.
