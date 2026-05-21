# Performance Review: 05-pixel-tech-3 (Wave 3)

## Summary

| Aspect | Rating | Notes |
|--------|--------|-------|
| Font Delivery | ❌ Critical | Fonts directory missing entirely; @font-face src paths 404 |
| Font Format | ✅ Good | WOFF2 format specified (industry best practice) |
| Font-display | ✅ Good | `font-display: swap` on all declarations |
| Animation Performance | ⚠️ Caution | Multiple repaint-triggering animations (text-shadow, box-shadow) |
| Paint Complexity | ⚠️ Concern | Layered gradients, grid background, fixed overlays |
| CSS Efficiency | ✅ Good | Custom properties, reasonable bundle size |
| Reduced Motion | ✅ Good | Full prefers-reduced-motion support |

---

## Critical Issue: Missing Fonts Directory

### 🚨 Font Files Not Found

The CSS declares `@font-face` rules for self-hosted fonts but **the fonts directory does not exist**:

```
variants/05-pixel-tech-3/fonts/   ← MISSING
```

**Referenced fonts (theme.css lines 9-39):**
- `../fonts/Orbitron-Bold.woff2` (Orbitron Bold 700)
- `../fonts/Exo2-Regular.woff2` (Exo 2 Regular 400)
- `../fonts/Exo2-Medium.woff2` (Exo 2 Medium 500)
- `../fonts/Exo2-SemiBold.woff2` (Exo 2 SemiBold 600)

### Impact

1. **404 errors** — Browser requests for missing font files
2. **FOIT (Flash of Invisible Text)** — Text invisible until font load fails
3. **FOUT (Flash of Unstyled Text)** — Fallback fonts displayed, then jarring swap
4. **Unnecessary network requests** — Failed fetches still cost DNS + TCP + TLS overhead

### Resolution

Create `variants/05-pixel-tech-3/fonts/` and add the following font files:

| File | Font | Weight | Style |
|------|------|--------|-------|
| `Orbitron-Bold.woff2` | Orbitron | 700 | normal |
| `Exo2-Regular.woff2` | Exo 2 | 400 | normal |
| `Exo2-Medium.woff2` | Exo 2 | 500 | normal |
| `Exo2-SemiBold.woff2` | Exo 2 | 600 | normal |

**Note:** Compare with 05-pixel-tech-1 (which includes `orbitron-bold-700.woff2`) and 05-pixel-tech-4 (which uses different fonts entirely - FiraSans/FiraCode).

---

## Font Delivery Analysis

### Positive Practices

| Practice | Status | Notes |
|----------|--------|-------|
| Self-hosted | ✅ | No CDN dependency, eliminates DNS/connection overhead |
| WOFF2 format | ✅ | Best-in-class compression (~30% smaller than TTF) |
| font-display: swap | ✅ | Text remains visible during font load |
| Multiple weights | ✅ | Only 400/500/600/700 loaded (no unnecessary weights) |

### Font Stack Fallback

The CSS uses appropriate fallbacks:
```css
--font-headline: 'Orbitron', 'Courier New', courier, monospace;
--font-body: 'Exo 2', system-ui, -apple-system, sans-serif;
```

If self-hosted fonts fail, system fonts will render (less ideal aesthetic but functional).

---

## Animation Performance

### Issue 1: `neon-flicker` on Hero H1 (theme.css line 325)

```css
@keyframes neon-flicker {
  0%, 100% {
    text-shadow:
      0 0 10px var(--color-accent),
      0 0 30px var(--color-accent),
      0 0 60px rgba(255, 45, 120, 0.4);
  }
  /* ... complex mid-animation states ... */
}
```

**Problems:**
- `text-shadow` is **not** GPU-accelerated — triggers **repaints**
- 3-layer text-shadow with blur radii 10px/30px/60px
- Animation duration: 4s infinite — continuous repaint cost
- Keyframe states at 92%, 93%, 94%, 96%, 98% trigger mid-animation flickers

### Issue 2: `neon-pulse` on Site Header (theme.css line 71)

```css
@keyframes neon-pulse {
  0%, 100% {
    opacity: 0.5;
    box-shadow: 0 0 10px var(--color-accent);
  }
  50% {
    box-shadow: 0 0 20px var(--color-accent), 0 0 40px var(--color-accent);
  }
}
```

**Problems:**
- `box-shadow` changes trigger **layout + paint + composite**
- 3s infinite duration

### Issue 3: `neon-sweep` on Buttons (components.css line 107)

```css
@keyframes neon-sweep {
  0% { left: -100%; }
  100% { left: 100%; }
}
```

**Positive:** Uses `transform: translateX()` equivalent (left property). However, the `::before` pseudo-element with `linear-gradient` requires painting.

### Issue 4: `border-flow` on Animated Border (components.css line 281)

```css
@keyframes border-flow {
  0% { background-position: 0% 50%; }
  100% { background-position: 200% 50%; }
}
```

**Positive:** Uses `background-position` which can be GPU-accelerated.

---

## Paint Complexity Concern

### Layered Gradient Backgrounds

**hero::before (theme.css line 284):**
```css
background:
  radial-gradient(ellipse at center, rgba(255, 45, 120, 0.08) 0%, transparent 60%),
  radial-gradient(ellipse at 20% 50%, rgba(26, 16, 48, 0.8) 0%, transparent 50%),
  radial-gradient(ellipse at 80% 50%, rgba(26, 16, 48, 0.8) 0%, transparent 50%);
```

**Issues:**
1. 3 layered `radial-gradient()` = expensive gradient calculations per frame
2. `position: absolute` + `inset: 0` covers parent completely — creates new stacking context
3. Semi-transparent overlays compound compositing cost

### Grid Background Pattern (base.css line 54)

```css
body::before {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background-image:
    linear-gradient(rgba(255, 45, 120, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 45, 120, 0.03) 1px, transparent 1px);
  background-size: 4px 4px;
}
```

**Issues:**
1. `position: fixed` covers entire viewport — affects compositor
2. 4px repeating pattern is fine individually, but layered with gradients above is costly
3. `z-index: -1` still participates in compositing

---

## Positive Performance Practices

### ✅ Reduced Motion Support (base.css line 145)
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

### ✅ Hardware-Accelerated Where Used
- `transform: scale(1.1)` on icon hover (compositor-only)
- `transform: translateX(0)` on mobile nav toggle
- `filter: drop-shadow()` on logo hover (GPU composited)

### ✅ CSS Custom Properties
Efficient variable system avoids code duplication and enables browser optimization.

### ✅ Reasonable CSS Bundle Size
| File | Lines | Assessment |
|------|-------|------------|
| `base.css` | 176 | Light reset + tokens |
| `theme.css` | 860 | Comprehensive styles |
| `components.css` | 430 | Component library |
| **Total** | **1,466** | ✅ Reasonable |

---

## Priority Fixes

| Priority | Issue | Fix |
|----------|-------|-----|
| **P0 - Critical** | Missing fonts directory | Create `variants/05-pixel-tech-3/fonts/` and add WOFF2 font files |
| P1 - High | `neon-flicker` text-shadow | Refactor to use `opacity` or `filter: brightness()` |
| P1 - High | `neon-pulse` box-shadow | Refactor to use `opacity` only |
| P2 - Medium | Layered radial gradients | Reduce to 1-2 gradients or use CSS variables for conditional loading |
| P2 - Medium | Add `will-change` hint | Add `will-change: opacity` to animated elements |
| P3 - Low | Grid background repaints | Consider `contain: layout paint` for body::before |

---

## File Reference

| File | Lines | Purpose |
|------|-------|---------|
| `variants/05-pixel-tech-3/css/base.css` | 176 | CSS reset, custom properties, tokens, grid background |
| `variants/05-pixel-tech-3/css/theme.css` | 860 | Component styles, animations, layout |
| `variants/05-pixel-tech-3/css/components.css` | 430 | Button styles, neon effects, glitch animations |
| `variants/05-pixel-tech-3/fonts/` | ❌ MISSING | Expected 4 WOFF2 font files |

---

## Recommendations

1. **Immediate:** Create fonts directory and add Orbitron Bold + Exo 2 (400/500/600) WOFF2 files
2. **Animation:** Replace `text-shadow`/`box-shadow` keyframe animations with `opacity` + `filter: brightness()` for 60fps
3. **Backgrounds:** Simplify hero gradient layers; consider a single gradient or CSS variable-based conditional loading
4. **Testing:** Use Chrome DevTools Performance panel to measure paint costs before/after fixes
