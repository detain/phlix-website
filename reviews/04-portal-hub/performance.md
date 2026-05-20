# Performance Review — Variant 04-portal-hub

**Reviewer**: Dimension Reviewer
**Dimension**: Performance
**Date**: 2026-05-20

---

## Summary

The variant is a lightweight, SVG-forward static site with good baseline performance characteristics. Total page weight (~50KB) is well within budget, JS is deferred, and font-display: swap is correctly configured. The primary performance risk is the **render-blocking Google Fonts @import**, compounded by **multiple backdrop-filter instances** (glassmorphism) that are known to cause jank on mid/low-end mobile devices during scroll. With fixes to the font loading strategy and minor CSS tuning, this variant should comfortably hit Lighthouse ≥90.

---

## Score: **78 / 100**

> Score reflects render-blocking @import (critical), backdrop-filter on mobile (major), and absence of resource hints (minor). Base score 90 - deductions below.

---

## ✅ Passed Items

| Criterion | Evidence |
|-----------|----------|
| **Page ≤500KB** | HTML: 13.3KB + CSS: 33.1KB + JS: 5.1KB = **~51KB total** (no raster images) |
| **Hero ≤120KB** | Hero uses inline SVG portal ring + text; no large image assets |
| **font-display: swap** | `theme.css:4` — `@import url('...&display=swap')` |
| **No render-blocking JS** | `main.js` loaded with `defer` on all pages (`index.html:230`) |
| **Inline SVGs** | All images are SVGs (favicon 375B, logo 648B, og 1.7KB) — zero raster bloat |
| **Reduced motion support** | `base.css:130–137` and `components.css:336–349` correctly disable animations via `prefers-reduced-motion` |
| **CLS likely <0.1** | All elements have explicit sizing; no dynamically injected content above the fold |
| **JS is minimal** | 134 lines of vanilla JS; no frameworks; passive event listeners used in parallax |

---

## ⚠️ Concerns (Non-blocking)

### 1. Google Fonts @import is Render-Blocking
**Location**: `css/theme.css:4`
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&display=swap');
```

**Why it matters**: CSS @import blocks parallel downloads. While `display=swap` prevents invisible text, the browser cannot render any content using Inter until the font file is fetched. On a slow connection, users see a flash of unstyled (system font) text before Inter loads.

**Impact**: LCP risk on cached/empty cache loads; Lighthouse FCP penalty.

**Fix**: Replace `@import` with `<link rel="preload">` + `<link rel="stylesheet"` in HTML `<head>`:
```html
<link rel="preload" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&display=swap" as="style">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&display=swap">
```

---

### 2. backdrop-filter on Mobile (Glassmorphism)
**Locations**:
- `css/theme.css:29` — `.site-header { backdrop-filter: blur(12px); }`
- `css/components.css:64` — `.glass-card { backdrop-filter: blur(12px); }`

**Why it matters**: `backdrop-filter` forces the browser to composite layers and apply a blur filter to everything beneath the element. On mobile GPUs, this causes **scroll jank and dropped frames**, especially with multiple glass cards on screen simultaneously (the feature-cards grid has 8 glass cards on index.html alone).

**Impact**: INP / scroll responsiveness on mobile; possible Lighthouse Interaction to Next Paint penalty.

**Mitigation present**: Blur is moderate (12px). On high-DPI screens the cost is proportional to the area. No `will-change` is used, which is actually good (avoids excessive memory allocation), but `backdrop-filter` itself is still expensive.

**Recommendation**: Consider mobile-first fallback:
```css
@media (max-width: 768px) {
  .glass-card { backdrop-filter: none; }
  .site-header { backdrop-filter: blur(8px); } /* reduced blur on mobile */
}
```
Or use a static semi-transparent background on mobile as a fallback.

---

### 3. Missing Resource Hints
**No `preconnect` / `dns-prefetch`** for Google Fonts domain. While the `@import` is the primary issue, adding `preconnect` saves DNS+TCP+TLS negotiation time:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
```

---

## ❌ Failures (Must Fix)

### None

> The render-blocking @import is a critical concern but does not rise to a "must fix" blocker for a static marketing page, as `display=swap` provides a functional fallback. However, it should be fixed before production deployment targeting Lighthouse ≥90.

---

## Recommendations (Ranked by Impact)

| Priority | Recommendation | Expected Gain |
|----------|----------------|---------------|
| **1 (High)** | Replace `@import` with `<link rel="preload">` + `<link rel="stylesheet">` for Google Fonts | +5–10 Lighthouse score; eliminates render-blocking |
| **2 (High)** | Add `preconnect` hints for `fonts.googleapis.com` and `fonts.gstatic.com` | -100–200ms FCP on first visit |
| **3 (Medium)** | Add mobile-specific `backdrop-filter` fallback or reduce blur on touch devices | +5–15 INP score on mobile |
| **4 (Low)** | Consider inlining critical CSS (above-the-fold styles) to eliminate a round-trip | Marginal gain since CSS is only 33KB total |
| **5 (Low)** | Consider `content-visibility: auto` on off-screen feature cards | Reduces initial render work |

---

## Evidence

### File Sizes
```
css/base.css       5,268 bytes  (5.1 KB)
css/components.css  9,188 bytes  (9.0 KB)
css/theme.css     14,193 bytes (13.9 KB)
js/main.js         5,264 bytes  (5.1 KB)
────────────────────────────────────────
Total CSS+JS:      33,913 bytes (33.1 KB)
index.html:       13,576 bytes (13.3 KB)
Total (no images): ~46,400 bytes (~45 KB)
```

### Backdrop-Filter Usage
```
css/theme.css:29      — .site-header { backdrop-filter: blur(12px); }
css/components.css:64 — .glass-card { backdrop-filter: blur(12px); }
  ↳ Used on 8 feature-card elements on index.html alone
  ↳ Also used on .site-header (sticky, always visible)
```

### Animation Inventory (CPU cost)
```
portal-rotate  — CSS, 3s linear infinite (border rotation)
portal-pulse   — CSS, 2s ease-in-out infinite (glow)
neon-flicker   — CSS, 4s ease-in-out infinite (text-shadow flicker)
float          — CSS, not actively used on any element
glow-pulse     — CSS, not actively used
gradient-shift — CSS, 8s ease infinite, used on .gradient-accent (cta-banner)
stagger-fade   — CSS, applied to .stagger-fade-in children (8 items max)
JS parallax     — mousemove listener on document (low frequency)
JS scroll-reveal — IntersectionObserver, one-shot per element
```

### JS Defer Confirmation
```html
<!-- index.html:230 -->
<script src="/variants/04-portal-hub/js/main.js" defer></script>
```

### Reduced Motion Coverage
```css
/* base.css:130–137 */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

/* components.css:336–349 — additional overrides for component animations */
```

---

## Verdict

**Approve for launch** with the two high-priority recommendations addressed. The variant is fundamentally performant — small total weight, no render-blocking JS, SVG assets, and correct `font-display: swap`. The Google Fonts loading strategy and `backdrop-filter` cost on mobile are the only meaningful risks, and both are fixable without structural changes.

If deployed as-is (with `@import` and full glassmorphism), expect Lighthouse performance in the **mid-80s** on mobile throttled. After fixing the font loading, the site should comfortably clear **90+**.
