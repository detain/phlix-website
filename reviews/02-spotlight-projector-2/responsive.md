# Responsive Review: 02-spotlight-projector-2

**Reviewer:** Responsive Reviewer (Wave 2)
**Date:** 2026-05-20
**Files Reviewed:** `index.html`, `css/theme.css`, `css/base.css`, `js/main.js`

---

## Summary

| Area | Status | Notes |
|------|--------|-------|
| Breakpoints | ⚠️ Needs Work | Single breakpoint, no tablet or large screen variants |
| Mobile Nav | ⚠️ Needs Work | Nav uses `position: absolute` causing overlay issues |
| Overflow | ✅ Acceptable | Key overflow cases handled, minor improvements possible |

---

## 1. Breakpoints

### Analysis

**Current Implementation:**
- Single media query at `width <= 768px` (theme.css line 568)
- CSS Grid `auto-fit` with `minmax(280px, 1fr)` for feature grids (theme.css line 441)

**Defined (but not implemented) breakpoint tiers in base.css:**
```
- Mobile: 320px - 479px
- Tablet: 480px - 767px
- Desktop: 768px - 1023px
- Large: 1024px - 1279px
- Extra large: 1280px - 1919px
- Maximum: 1920px+
```

### Issues

| Issue | Severity | Location | Description |
|-------|----------|----------|-------------|
| Non-standard media query syntax | Medium | theme.css:568 | Uses `width <= 768px` which is newer syntax. Older browsers may not support this. Standard approach: `@media (max-width: 768px)` |
| Missing tablet breakpoint | Low | — | Site jumps from mobile (≤768px) to desktop without tablet-specific styles (480px-767px range) |
| No large screen optimization | Low | — | No media query for 1024px+ to take advantage of larger viewports |

### Recommendations

```css
/* Replace non-standard syntax */
@media (max-width: 768px) {  /* instead of (width <= 768px) */ }

/* Consider adding tablet breakpoint */
@media (min-width: 480px) and (max-width: 767px) {
  .feature-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Consider large screen optimization */
@media (min-width: 1024px) {
  .container {
    padding: 0 var(--space-xl);
  }
}
```

---

## 2. Mobile Nav

### Analysis

**HTML Structure:**
- Menu toggle button: `<button class="menu-toggle" aria-expanded="false" aria-controls="main-nav">`
- Navigation: `<nav class="main-nav" id="main-nav">`
- 8 navigation links

**CSS (theme.css lines 567-593):**
```css
.menu-toggle { display: none; }  /* Shown at 768px */
.main-nav {
  display: none;
  position: absolute;  /* ← Issue: overlay, not push */
  top: 100%;
  left: 0;
  right: 0;
}
.main-nav.is-open { display: flex; }
```

**JavaScript (main.js):**
- Toggle `.is-open` class on click
- Update `aria-expanded`
- Focus first link when opening
- Escape key closes
- Focus trap within nav

### Issues

| Issue | Severity | Location | Description |
|-------|----------|----------|-------------|
| `position: absolute` causes overlay | High | theme.css:575 | When nav opens, it overlays content rather than pushing it down. Content remains scrollable behind the nav. |
| No z-index on header | High | theme.css:40-45 | Header lacks `z-index`, so nav can scroll under page content if page is longer than viewport. |
| No close on outside click | Low | main.js | Mobile users tapping outside the nav expect it to close. Currently only Escape key or toggle button works. |
| Border-top only on nav, not header | Low | theme.css:581 | Nav has gold top border but header does not extend it, creating visual disconnect. |

### Visual Representation

```
Desktop:          Mobile (open):
┌─────────────┐    ┌─────────────┐
│ Logo  Nav  │    │ Logo [☰]   │ ← Nav hidden
└─────────────┘    ├─────────────┤
                  │  Nav items   │ ← Overlays content
Content           │  overlaid    │   rather than
                  └─────────────┘   pushing down
```

### Recommendations

```css
/* Add z-index to header */
.site-header {
  position: relative;
  z-index: 100;  /* Ensure nav sits above content */
}

/* Change position to fixed or add proper stacking */
.main-nav {
  position: fixed;  /* Or use position: absolute with proper container */
  /* ... */
}
```

```javascript
// Add outside click handler
document.addEventListener('click', function(e) {
  if (isOpen && !mainNav.contains(e.target) && !menuToggle.contains(e.target)) {
    mainNav.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
  }
});
```

---

## 3. Overflow

### Analysis

**Current overflow handling:**
- `pre` elements: `overflow-x: auto` (base.css line 186)
- Hero section: `overflow: hidden` (theme.css line 214)
- Images: `max-width: 100%; height: auto;` (base.css line 196-200)

### Issues

| Issue | Severity | Location | Description |
|-------|----------|----------|-------------|
| No scroll-padding for anchor links | Low | base.css | When smooth scrolling to anchors, content may be hidden under fixed/sticky header |
| Very long words in feature cards | Low | theme.css | No `overflow-wrap: break-word` on card text, though currently not an issue |
| No horizontal scroll prevention | Low | base.css | Very small screens (<320px) could cause horizontal overflow with current layout |

### Recommendations

```css
/* Add scroll-padding to html or body */
html {
  scroll-behavior: smooth;
  scroll-padding-top: 80px;  /* Adjust based on header height */
}

/* Add overflow-wrap to long text containers */
.feature-card p {
  overflow-wrap: break-word;
  word-break: break-word;
}
```

---

## Accessibility Notes

| Feature | Status | Notes |
|---------|--------|-------|
| Skip link | ✅ Present | `.skip-link` on line 63 of index.html |
| `aria-expanded` | ✅ Implemented | Correctly toggled in JS |
| `aria-controls` | ✅ Present | Points to `main-nav` |
| Focus trap | ✅ Implemented | In mobile nav JS |
| Focus visible styles | ✅ Present | `:focus-visible` defined for interactive elements |
| `prefers-reduced-motion` | ✅ Handled | Animations disabled when user prefers reduced motion |

---

## Verdict

**Overall: Conditional Pass — Needs Minor Fixes**

The implementation is mostly sound with proper ARIA attributes and focus management. However, the mobile navigation's `position: absolute` approach will cause UX issues on real mobile devices where users expect navigation to push content down, not overlay it.

### Priority Fixes

1. **High:** Change mobile nav positioning to not overlay content
2. **Medium:** Standardize media query syntax to `max-width`
3. **Low:** Add scroll-padding for anchor links
4. **Low:** Consider tablet breakpoint for feature grid

---

## Files Referenced

- `variants/02-spotlight-projector-2/index.html`
- `variants/02-spotlight-projector-2/css/base.css`
- `variants/02-spotlight-projector-2/css/theme.css`
- `variants/02-spotlight-projector-2/js/main.js`
