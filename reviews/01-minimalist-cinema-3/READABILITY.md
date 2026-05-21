# READABILITY Review — 01-minimalist-cinema-3 (Wave 3)

## Summary

| Check | Status |
|-------|--------|
| Font sizes (min 16px body text) | ⚠️ MINOR |
| Line heights (1.5+ body) | ✅ PASS |
| Text contrast | ⚠️ MAJOR |
| prefers-reduced-motion | ⚠️ MAJOR |
| Excessive motion/flash/auto-play | ✅ PASS |

---

## 1. Font Sizes (min 16px body text)

**Status:** MINOR ISSUE

### Findings

| Location | Size | Issue |
|----------|------|-------|
| `css/theme.css:224-227` (.feature-card p) | 0.9375rem (15px) | Below 16px threshold |
| `css/components.css:415-418` (.client-tagline) | 0.9375rem (15px) | Below 16px threshold |
| `css/components.css:471-475` (.download-card p) | 0.9375rem (15px) | Below 16px threshold |

### Recommendations

Increase `.feature-card p`, `.client-tagline`, and `.download-card p` to at least 1rem (16px) for better readability, especially for users with visual impairments.

---

## 2. Line Heights (1.5+ for body text)

**Status:** ✅ PASS

### Findings

| Location | Line Height | Status |
|----------|-------------|--------|
| `css/base.css:78` (body) | 1.6 | ✅ Pass |
| `css/theme.css:104` (pre) | 1.5 | ✅ Pass |
| Headings (h1-h6) | 1.1 | Acceptable for headlines |

---

## 3. Text Contrast

**Status:** ⚠️ MAJOR ISSUE

### Failing Combinations

| Location | Foreground | Background | Ratio | WCAG AA (4.5:1) | WCAG AA Large (3:1) |
|----------|------------|------------|-------|-----------------|---------------------|
| `.nav-menu a` (css/theme.css:240-250) | #2e2e2e (muted) | #ffffff | ~7.5:1 | ✅ | ✅ |
| `.pitch-bullets li` (css/components.css:147-153) | #2e2e2e (muted) | #f5f8fa (surface) | ~7.5:1 | ✅ | ✅ |
| Links (default) | #2d9cff (accent) | #ffffff | ~3.9:1 | ❌ FAIL | ✅ |
| `.feature-card p` (css/components.css:224-228) | #2e2e2e (muted) | #f5f8fa (surface) | ~7.5:1 | ✅ | ✅ |

**Critical Issue:** The accent color `#2d9cff` on white `#ffffff` yields a contrast ratio of only ~3.9:1, which **fails WCAG AA** for normal text (requires 4.5:1). This affects:
- All default link styling (`css/base.css:120`)
- Navigation menu items on hover (`css/theme.css:252-255`)
- Skip link text (`css/base.css:137`)

### Severity: MAJOR

Low contrast text is a significant accessibility barrier, especially for users with low vision or color blindness. Approximately 8% of men and 0.5% of women have some form of color vision deficiency.

### Recommendations

1. **Primary fix:** Darken the accent color from `#2d9cff` to `#0077cc` or darker (contrast ratio 5.9:1 on white) to meet WCAG AA.
2. **Alternative:** Use a darker muted color for body text at ~5.5:1 minimum.

---

## 4. prefers-reduced-motion

**Status:** ⚠️ MAJOR ISSUE

### CSS Compliance: ✅ PASS

The CSS properly handles reduced motion preferences:

- `css/base.css:164-173` — Resets all animations and transitions to 0.01ms with `!important`
- `css/base.css:71` — `scroll-behavior: auto` when reduced motion is preferred (overridden by media query)
- `css/components.css:648-654` — Disables hover transform effects for feature-card and client-card

### JavaScript Non-Compliance: ❌ FAIL

**Location:** `js/main.js:96-114`

The smooth scroll implementation does NOT check for `prefers-reduced-motion`. When users have reduced motion enabled, the `scrollIntoView({ behavior: 'smooth' })` call will still animate.

```javascript
// js/main.js:104-107 — PROBLEMATIC
target.scrollIntoView({
  behavior: 'smooth',  // Always smooth, ignores reduced motion
  block: 'start',
});
```

### Recommendations

Wrap smooth scroll in a motion preference check:

```javascript
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;

    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
        block: 'start',
      });
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    }
  });
});
```

---

## 5. Excessive Motion / Flash / Auto-play

**Status:** ✅ PASS

### Findings

- No `<video>` or `<audio>` elements with `autoplay` found
- No CSS animations beyond subtle hover transitions
- No JavaScript-driven motion beyond:
  - Smooth scroll (respects reduced motion when fixed)
  - Mobile nav slide-in (uses `transform`, acceptable)
  - FAQ accordion (no motion, just show/hide)
- No flashing or strobing effects detected

---

## Overall Assessment

| Severity | Count |
|----------|-------|
| Critical | 0 |
| Major | 2 |
| Minor | 1 |

### Priority Fixes

1. **HIGH:** Fix contrast ratio for accent color `#2d9cff` on white backgrounds
2. **HIGH:** Add `prefers-reduced-motion` check to smooth scroll in main.js

### Minor Fixes

3. **LOW:** Increase font size on `.feature-card p`, `.client-tagline`, `.download-card p` to 1rem

---

*Review conducted: 2026-05-21*
*Reviewer: opencode READABILITY phase*
