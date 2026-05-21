# Performance Review: 04-portal-hub-3 (Wave 3)

**Variant:** Portal Hub — CRT Terminal aesthetic  
**Review Date:** 2026-05-21  
**Reviewer:** Performance Reviewer

---

## Executive Summary

| Area | Status | Notes |
|------|--------|-------|
| Font Loading | ⚠️ Misleading | Claims "self-hosted" but uses `local()` only |
| CSS Complexity | ✅ Good | Well-structured, uses custom properties |
| Animation Performance | ⚠️ Moderate | Many animations; prefers-reduced-motion helps |
| Rendering Effects | ❌ Heavy | CRT scanline + radial gradient overlays |
| Network Requests | ✅ Good | Minimal; no external font CDNs |

---

## 1. Font Analysis

### Current Implementation

```css
/* base.css line 64-68 — claims self-hosted */
--font-display: 'VT323', monospace;
--font-body: 'IBM Plex Mono', monospace;
--font-ui: 'IBM Plex Mono', monospace;
--font-code: 'IBM Plex Mono', monospace;

/* components.css lines 4-26 — only uses local() */
@font-face {
  font-family: 'VT323';
  src: local('VT323'), local('VT323-Regular');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
```

### Issues

1. **False "Self-hosted" Claim**: CSS comments say "self-hosted VT323 + IBM Plex Mono" but no `url()` declarations exist. Fonts are loaded via `local()` only.

2. **Font Availability**: VT323 and IBM Plex Mono are NOT standard system fonts. Most users will fallback to `monospace` before font-display:swap kicks in.

3. **Missing Font Files**: No `variants/04-portal-hub-3/fonts/` directory exists.

### Recommendation

Either:
- **Option A**: Add actual self-hosted fonts via `url()` pointing to local `.woff2` files in a `fonts/` directory
- **Option B**: Change comments to reflect "system font stack with local() preference"

**Preferred**: Option A (add real self-hosted `.woff2` fonts). Modern approach used by 04-portal-hub-5 and other Wave 5 variants.

---

## 2. CSS Architecture

### Strengths

| Practice | Implemented |
|----------|-------------|
| CSS Custom Properties | ✅ Full token system in `:root` |
| Spacing Scale | ✅ Consistent `--space-*` scale |
| Color Semantics | ✅ Primary/secondary/accent tokens |
| Mobile-First | ✅ Responsive at 768px breakpoint |
| Focus Visibility | ✅ `:focus-visible` with outline |

### File Structure

```
04-portal-hub-3/css/
├── base.css       # 170 lines — reset, variables, typography
├── theme.css      # 691 lines — layout, components, animations
└── components.css # 334 lines — buttons, effects, @font-face
```

**Total CSS:** ~1,195 lines across 3 files

---

## 3. Animation & Motion

### Animations Used

| Animation | Target | Duration | Performance Impact |
|-----------|--------|----------|-------------------|
| `flicker` | .hero-eyebrow | 3s infinite | Low (opacity only) |
| `glow-pulse` | .status-dot, .animate-border | 2-3s infinite | Low (box-shadow) |
| `typing` | .terminal-prompt-text | 3s | Medium (width) |
| `blink-caret` | .terminal-prompt-text | 0.75s | Low (border-color) |
| `stagger-fade` | .stagger-fade-in > * | 0.4s | Low (opacity/transform) |
| `border-glow` | .animate-border | 3s infinite | Medium (box-shadow) |
| `cursor-blink` | .cursor-blink::after | 1s infinite | Very Low (opacity) |

### Reduced Motion Support

✅ **Good**: `prefers-reduced-motion: reduce` media query properly disables all animations:

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

---

## 4. Rendering Effects (CRT Aesthetic)

### Body Overlays

```css
/* theme.css lines 4-31 */
body::before {
  /* Scanline effect — repeating 2px transparent/semi-opaque */
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(0, 0, 0, 0.15) 2px,
    rgba(0, 0, 0, 0.15) 4px
  );
  pointer-events: none;
  z-index: 9998;
}

body::after {
  /* Vignette effect — radial gradient from transparent to dark */
  background: radial-gradient(
    ellipse at center,
    transparent 0%,
    transparent 60%,
    rgba(0, 0, 0, 0.4) 100%
  );
  pointer-events: none;
  z-index: 9997;
}
```

### Performance Concerns

| Effect | Severity | Reason |
|--------|----------|--------|
| `repeating-linear-gradient` | Medium | Full-page, repaints on scroll |
| `radial-gradient` | Medium | Full-page, blends with background |
| `pointer-events: none` | — | Prevents interaction but doesn't eliminate paint |
| `z-index: 9997-9998` | — | Pushes to compositor layer |

### Impact

- **Paint area**: Entire viewport on every scroll event
- **Composite**: Requires layer stacking context management
- **Mitigation**: Effects use `pointer-events: none` so they don't block interactions

---

## 5. Box-Shadow Glow Effects

### Usage Pattern

```css
--glow-accent: 0 0 8px var(--color-accent), 0 0 16px var(--color-accent);
--glow-text: 0 0 4px var(--color-text);
```

Applied to: `.btn-primary`, `.hero h1`, `.site-header`, `.nav-logo`, `.feature-card`, many interactive elements.

### Performance Note

Multiple layered `box-shadow` can trigger repaints. Consider using `will-change: box-shadow` sparingly on animated elements only.

---

## 6. Network & Resource Requests

### Current State

| Resource Type | Count | Notes |
|--------------|-------|-------|
| CSS files | 3 | base.css, theme.css, components.css |
| Font files | 0 | None self-hosted |
| External CDNs | 0 | No Google Fonts link |
| Images/SVGs | Several | logo, favicon, og image |

### Comparison with Wave 5 Variants

| Variant | Self-Hosted Fonts | Font Format |
|---------|-------------------|------------|
| 04-portal-hub-3 | ❌ None (local() only) | N/A |
| 04-portal-hub-5 | ✅ Yes | 4x .woff2 (NunitoSans) |

Wave 5 variants properly host fonts locally. Wave 3 should align.

---

## 7. Recommendations Summary

### High Priority

1. **Add self-hosted fonts** — Either add VT323 + IBM Plex Mono .woff2 files to `fonts/` directory with proper `url()` in @font-face, OR update comments to remove "self-hosted" claim

### Medium Priority

2. **Optimize CRT overlays** — Consider adding `contain: layout paint` to body to scope rendering

3. **Review glow effects** — Multiple layered box-shadows on interactive elements may cause repaint thrashing on low-end devices

### Low Priority / Nice-to-Have

4. **Consolidate @font-face** — Move font declarations to base.css or create dedicated `fonts.css`

5. **Consider preload hints** — If self-hosted fonts are added, add `<link rel="preload">` for critical font weights

---

## Files Reviewed

- `/variants/04-portal-hub-3/css/base.css` (170 lines)
- `/variants/04-portal-hub-3/css/theme.css` (691 lines)
- `/variants/04-portal-hub-3/css/components.css` (334 lines)
- `/variants/04-portal-hub-3/index.html` (first 80 lines)

---

## Verdict

**Grade: B-**

The variant demonstrates solid CSS architecture and good accessibility practices (focus-visible, reduced-motion, skip-link). However, the font implementation is misleading and potentially problematic — claiming "self-hosted" while only using `local()` means fonts will likely fallback to system monospace on most user devices.

The CRT visual effects are performant for modern browsers but add paint overhead. Consider compositor-friendly alternatives if targeting lower-end hardware.

**Recommended Action**: Add actual self-hosted font files to align with Wave 5 quality bar and accurate documentation.
