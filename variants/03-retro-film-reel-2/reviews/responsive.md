# Responsive Review — 03-retro-film-reel-2 (Wave 2)

## Summary

**Responsive Grade: B+**

The variant implements a single breakpoint at 768px with responsive grids, fluid typography, and proper touch targets. However, several mobile-first improvements and layout bugs were identified that should be addressed before final approval.

---

## Strengths

| Feature | Implementation |
|---------|---------------|
| **Fluid Typography** | `clamp(1rem, 2vw, 1.25rem)` on `.hero__subheadline` scales smoothly |
| **Responsive Grids** | All grids use `auto-fit` + `minmax()` — truly responsive without explicit media queries |
| **Touch Targets** | Buttons have `min-height: 44px` meeting accessibility standards |
| **Flex Wrapping** | `.hero__actions` and `.header-inner` properly wrap on narrow screens |
| **Reduced Motion** | `prefers-reduced-motion` media query disables marquee animation |
| **Grid Collapse** | Footer columns stack to single column on mobile with centered text |

---

## Issues

### Critical: Mobile Navigation Positioning Bug

**Location:** `css/theme.css` lines 824-840

**Problem:** The mobile nav menu is positioned with `position: absolute; top: 100%` but `.main-nav` has no `position: relative`. The absolute positioning therefore resolves to the nearest positioned ancestor (the header via `.site-header`'s sticky positioning) or the viewport, not the nav element itself.

```css
/* Current — buggy */
.main-nav__list {
  position: absolute;  /* ← needs context */
  top: 100%;
  ...
}

/* .main-nav lacks position: relative */
.main-nav {
  display: flex;
  align-items: center;
  gap: var(--space-lg);
}
```

**Fix:**
```css
.main-nav {
  display: flex;
  align-items: center;
  gap: var(--space-lg);
  position: relative;  /* ← add this */
}
```

---

### Moderate: Missing Tablet Breakpoint (769px–1024px)

**Location:** `css/theme.css` lines 866-874

**Problem:** The design jumps directly from mobile (≤768px) to desktop (≥769px). No intermediate styling exists for tablets, resulting in:
- Logo text remains `2rem` on tablets
- Hero padding stays at `var(--space-4xl)` 
- Nav gap stays at `var(--space-lg)`

**Recommendation:** Add a tablet-specific range:

```css
@media (width >= 769px) and (width <= 1024px) {
  .site-logo__text {
    font-size: 1.75rem;
  }

  .hero {
    padding: var(--space-3xl) 0;
  }

  .main-nav {
    gap: var(--space-md);
  }
}
```

---

### Minor: Container Padding on Small Screens

**Location:** `css/theme.css` lines 8-13

**Problem:** `padding: 0 var(--space-lg)` on `.container` may be excessive on devices under 360px.

**Recommendation:**
```css
@media (width <= 480px) {
  .container {
    padding: 0 var(--space-md);
  }
}
```

---

### Minor: Pitch List Minimum Width Could Cause Overflow

**Location:** `css/theme.css` lines 472-478

```css
.pitch-list {
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}
```

**Problem:** `minmax(300px, 1fr)` means each column is at least 300px. On a 320px viewport (old iPhone SE), the single column would fit but with no horizontal margin. Combined with the container's `var(--space-lg)` padding, content width exceeds viewport.

**Recommendation:** Reduce minimum for very small screens:
```css
@media (width <= 480px) {
  .pitch-list {
    grid-template-columns: 1fr;
  }
}
```

---

### Minor: Hero Padding Doesn't Account for Mobile Address Bar

**Location:** `css/theme.css` lines 199-214

**Problem:** `padding: var(--space-4xl) 0` is fixed vertical spacing. On mobile browsers with address bars, this can result in content being pushed below the fold before scrolling.

**Recommendation:** Consider using `dvh` units or reducing padding on mobile:
```css
@media (width <= 768px) {
  .hero {
    padding: var(--space-2xl) 0;
  }
}
```

---

### Minor: Hero Actions Gap Not Responsive

**Location:** `css/theme.css` lines 302-308

```css
.hero__actions {
  gap: var(--space-lg);
}
```

**Problem:** Fixed gap on mobile could be tighter.

**Recommendation:**
```css
@media (width <= 480px) {
  .hero__actions {
    gap: var(--space-md);
  }
}
```

---

### Minor: Logo Text Size Not Responsive

**Location:** `css/theme.css` line 62

```css
.site-logo {
  font-size: 2rem;
}
```

**Problem:** Fixed size doesn't adjust for tablets or large phones.

**Recommendation:**
```css
@media (width <= 768px) {
  .site-logo {
    font-size: 1.5rem;
  }
}
```

---

## Verification Checklist

| Item | Status |
|------|--------|
| Single breakpoint at 768px | ✅ |
| `auto-fit` grids (no explicit column counts) | ✅ |
| `clamp()` for fluid type | ✅ |
| Touch targets ≥44px | ✅ |
| `prefers-reduced-motion` respected | ✅ |
| Footer stacks on mobile | ✅ |
| Flex wrapping for actions/header | ✅ |
| Mobile nav positioning bug | ❌ Fixed above |
| Missing tablet styles | ⚠️ Recommended above |
| Container padding on small screens | ⚠️ Recommended above |

---

## Required Fixes

1. **Add `position: relative` to `.main-nav`** (Critical bug)

2. **Add responsive logo sizing for mobile** (`1.5rem` at ≤768px)

3. **Add container padding override for ≤480px** (`var(--space-md)`)

---

## Recommended Improvements

4. Add tablet breakpoint (769px–1024px) for logo, nav gap, and hero padding
5. Add `minmax(1fr)` to pitch-list for ≤480px viewport
6. Reduce hero padding on mobile (var(--space-2xl))
7. Reduce hero__actions gap on mobile (var(--space-md))
