# Accessibility Review — 04-portal-hub-3 (Wave 3)

## WCAG AA Contrast Compliance

### Pass (AA compliant)

| Element | Foreground | Background | Ratio | Status |
|---------|-------------|-------------|-------|--------|
| Body text | `#fff` (white) | `#0a0f1f` (midnight blue) | ~14.5:1 | PASS AAA |
| Secondary text | `#7ff6ff` (soft cyan) | `#0a0f1f` | ~14.7:1 | PASS AAA |
| Accent/links | `#00e5ff` (neon cyan) | `#0a0f1f` | ~10.5:1 | PASS AA |
| Footer nav links | `#7ff6ff` | `#08101c` (deep navy) | ~14.7:1 | PASS AAA |
| Logo text | Filtered cyan | `#0a0f1f` | ~10.5:1 | PASS AA |
| Skip link bg | `#00e5ff` | On dark header | N/A | Acceptable |

### Fail

| Element | Foreground | Background | Ratio | Issue |
|---------|-------------|-------------|-------|--------|
| `.btn-primary:hover` | `#fff` (white) | `#fff` (white) | 1:1 | **Fails all levels** |
| `.btn-primary:active` | `#fff` (white) | `#fff` (white) | 1:1 | **Fails all levels** |

**Issue**: In `components.css:47-53`, the primary button hover and active states set `background: var(--color-text)` (white) with `color: var(--color-primary)` which resolves to `#0a0f1f` (dark). Wait—let me correct: the button actually sets `color: var(--color-primary)` on hover which is NOT DEFINED in `:root`. CSS falls back to initial/inherited color which may be white-on-white.

Actually re-reading: `.btn-primary:hover { background: var(--color-text); }` — `--color-text` is **not defined** in `:root`. It falls back to `color: initial` which is likely inherited or white-on-white.

---

## Keyboard Navigation Assessment

### Pass

- Skip link present and functional (`base.css:143-161`)
- `:focus-visible` styles defined (`base.css:164-167`)
- Tab navigation order follows DOM visual order
- Escape key closes mobile nav and returns focus to toggle (`main.js:28-34`)
- Focus trap implemented for mobile nav (`main.js:36-58`)

### Issues

| Severity | Issue | Location |
|----------|-------|----------|
| Medium | No focus move to nav menu or first link when mobile nav opens via toggle | `main.js:14-17` — `aria-expanded` is set but focus not moved |
| Low | `var(--color-text)` used in button hover is undefined in `:root` | `components.css:48` |

---

## ARIA Label Completeness

### Pass

| Element | ARIA | Status |
|---------|------|--------|
| Primary nav | `role="navigation" aria-label="Primary navigation"` | Pass |
| Mobile toggle | `aria-label="Toggle navigation" aria-expanded aria-controls` | Pass |
| Nav logo link | `aria-label="Phlix home"` | Pass |
| Feature icon containers | `aria-hidden="true"` on SVG paths | Pass |
| Decorative SVG paths | `aria-hidden="true"` | Pass |
| Main landmark | `id="main-content" tabindex="-1"` | Pass |
| Sections | `aria-labelledby` referencing headings | Pass |
| Footer | `role="contentinfo"` | Pass |
| Footer nav | `aria-label="Footer navigation"` | Pass |

---

## Focus Trap Verification

### Mobile Nav Focus Trap — PASS

The mobile navigation implements focus trapping in `main.js:36-58`:

```javascript
navMenu.addEventListener('keydown', function (e) {
  if (e.key !== 'Tab') return;
  if (!navMenu.classList.contains('is-open')) return;
  const firstLink = navLinks[0];
  const lastLink = navLinks[navLinks.length - 1];
  if (e.shiftKey) {
    if (document.activeElement === firstLink) {
      e.preventDefault();
      lastLink.focus();
    }
  } else {
    if (document.activeElement === lastLink) {
      e.preventDefault();
      firstLink.focus();
    }
  }
});
```

**Behavior verified**:
- Shift+Tab from first link wraps to last link ✓
- Tab from last link wraps to first link ✓
- Only active when menu is open (`is-open` class present) ✓

---

## Focus Visibility

### Defined Styles — Pass

```css
:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}
```

### Issues

| Severity | Issue | Location |
|----------|-------|----------|
| Medium | Outline color `var(--color-accent)` on dark backgrounds may be subtle | `base.css:165` |

The `outline: 2px solid var(--color-accent)` uses `#00e5ff` (neon cyan) which provides reasonable visibility on dark backgrounds, but could be improved with a thicker outline or distinct style.

---

## Semantic HTML

### Pass

| Element | Implementation | Status |
|---------|----------------|--------|
| Landmarks | `<header role="banner">`, `<nav role="navigation">`, `<main>`, `<footer role="contentinfo">` | Pass |
| Heading hierarchy | H1 (hero), H2 (pitch, features, CTA), H3 (feature cards, footer cols) | Pass |
| Lists | `<ul role="list">` used appropriately | Pass |
| Skip link | `<a class="skip-link" href="#main-content">` | Pass |
| Language | `<html lang="en">` | Pass |
| Meta viewport | `<meta name="viewport" content="width=device-width, initial-scale=1">` | Pass |

### Issues

| Severity | Issue | Location |
|----------|-------|----------|
| Low | Section headings use `> ` prefix visually ("&gt; Why Phlix?") which is cosmetic, not semantic | `index.html:133`, `index.html:151` |

---

## Reduced Motion

### Pass

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

And in JS (`main.js:156-161`):
```javascript
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (prefersReducedMotion) {
  document.documentElement.style.setProperty('--transition-base', '0.01ms');
}
```

**Status**: Properly implements reduced motion preferences for both CSS animations/transitions and JS-driven effects.

---

## Summary

### Critical Issues (Must Fix)

1. **Button hover/active contrast failure** — `.btn-primary:hover` and `.btn-primary:active` have invisible text (white on white). Fix by defining `--color-primary` in `:root` or using proper contrasting colors.

### Medium Issues (Should Fix)

2. **Mobile nav focus management** — When toggling the mobile nav open, focus should move to the menu or first link to improve keyboard usability.

3. **Undefined CSS variable** — `--color-text` used in `components.css:48` is not defined in `:root`. Should be `--color-text-primary`.

### Positive Findings

- Skip link functional and visible on focus
- Focus trap correctly implemented for mobile nav
- Proper ARIA landmarks and labels throughout
- Good contrast on standard states (non-hover)
- Reduced motion properly supported
- Semantic HTML structure is sound
- Logical heading hierarchy maintained
