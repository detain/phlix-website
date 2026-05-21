# Performance Review: 05-pixel-tech-2

## Summary

| Aspect | Rating | Notes |
|--------|--------|-------|
| Font Delivery | ⚠️ Adequate | Self-hosted, font-display:swap, but TTF format |
| Animation Performance | ⚠️ Caution | Multiple complex animations, no GPU acceleration hints |
| CSS Efficiency | ✅ Good | Custom properties, hardware-accelerated properties preferred |
| Paint Complexity | ⚠️ Concern | Scanline overlay, heavy box-shadows |

---

## Font Analysis

### Self-Hosted Fonts (Positive)
- ✅ All 4 fonts self-hosted in `variants/05-pixel-tech-2/fonts/`
  - `ShareTechMono-Regular.ttf`
  - `FiraSans-Regular.ttf`
  - `FiraSans-Medium.ttf`
  - `RobotoMono-Regular.ttf`
- ✅ `font-display: swap` used on all @font-face declarations
- ✅ No external CDN dependency (eliminates DNS lookup, connection overhead)

### Font Format Concern
- ⚠️ **TTF format used instead of WOFF2**
  - TTF files are ~30-40% larger than WOFF2
  - Recommend converting to WOFF2 for production
  - WOFF2 provides superior compression, especially for font subsets

### Font Loading Recommendation
```css
/* Current (TTF) */
src: url('../fonts/ShareTechMono-Regular.ttf') format('truetype');

/* Recommended (WOFF2) */
src: url('../fonts/ShareTechMono-Regular.woff2') format('woff2');
```

---

## Animation Performance

### Issues Identified

#### 1. Multiple Concurrent Animations
Three animations running simultaneously on hero elements:
- `arcade-glow` (2s ease-in-out infinite alternate) on `.page-header h1`, `.hero h1`
- `blink` (1s step-end infinite) on `.hero-eyebrow`
- `scan` (3s linear infinite) on `.cta-banner::before`

#### 2. Inefficient Animation Properties
The `arcade-glow` animation uses `text-shadow` changes:
```css
@keyframes arcade-glow {
  from { text-shadow: 0 0 10px var(--color-neon-green), 0 0 30px rgba(0, 255, 65, 0.5); }
  to { text-shadow: 0 0 20px var(--color-neon-green), 0 0 40px rgba(0, 255, 65, 0.7), 0 0 60px rgba(0, 255, 65, 0.4); }
}
```
- `text-shadow` is **not** GPU-accelerated — triggers repaints
- Multiple shadow layers compound the cost

#### 3. Heavy Box-Shadow Usage
- Multiple elements use `box-shadow` with blur radii (20px, 30px, 40px)
- Examples: `.site-header`, `.feature-card:hover`, `.cta-banner h2`
- Large blur shadows trigger **Layout → Paint → Composite** pipeline

### Recommendations
1. **Use `opacity` or `transform` for animations** (compositor-only properties):
```css
@keyframes arcade-glow {
  from { opacity: 0.9; filter: brightness(1); }
  to { opacity: 1; filter: brightness(1.1); }
}
```

2. **Add `will-change` hint** for animated elements:
```css
.hero h1 { will-change: transform, opacity; }
```

3. **Reduce animation scope** — consider reducing `arcade-glow` to trigger less frequently or remove `blink` animation entirely (accessibility/UX concern)

---

## Paint Complexity Concern

### Scanline Overlay (Critical)
```css
body::after {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  pointer-events: none;
  z-index: 9999;
  background: repeating-linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.15) 0,
    rgba(0, 0, 0, 0.15) 1px,
    transparent 1px,
    transparent 2px
  );
  opacity: 0.4;
}
```

**Issues:**
1. `position: fixed` with `z-index: 9999` creates a **new stacking context** covering entire viewport
2. `repeating-linear-gradient` with 2px interval is expensive — Safari particularly struggles
3. Every frame must composite through this layer
4. May cause **scroll jank** on low-end devices

**Recommendation:**
Consider removing or simplifying the scanline effect. If essential to aesthetic:
```css
body::after {
  background: url('data:image/svg+xml,...'); /* SVG is more efficient */
  background-size: 2px 2px; /* Simpler than gradient */
}
```

---

## Positive Performance Practices

### ✅ Hardware-Accelerated Properties Preferred Where Used
- `transform: scale()` on hover states (line 424)
- `opacity` transitions on focus states
- `filter: drop-shadow()` (GPU composited)

### ✅ Reduced Motion Support
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### ✅ CSS Custom Properties
Efficient variable system, avoids code duplication, enables runtime optimization.

### ✅ Efficient Reset & Base Styles
Minimal, performant CSS reset (198 lines total in base.css)

---

## Priority Fixes

1. **[High]** Convert fonts to WOFF2 format (30-40% file size reduction)
2. **[High]** Remove or optimize `body::after` scanline effect
3. **[Medium]** Refactor `arcade-glow` to use `opacity`/`filter` instead of `text-shadow`
4. **[Medium]** Add `will-change: transform, opacity` to animated elements
5. **[Low]** Consider removing `blink` animation (accessibility + performance)

---

## File Reference

| File | Lines | Purpose |
|------|-------|---------|
| `variants/05-pixel-tech-2/css/base.css` | 198 | CSS reset, custom properties, tokens |
| `variants/05-pixel-tech-2/css/theme.css` | 953 | Component styles, animations |
| `variants/05-pixel-tech-2/fonts/` | 4 files | Self-hosted font files |
