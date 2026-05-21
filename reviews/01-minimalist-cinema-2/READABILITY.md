# READABILITY Review — 01-minimalist-cinema-2 (Wave 2)

## Summary

| Check | Status |
|-------|--------|
| Font sizes (min 16px body) | ⚠️ FAIL |
| Line heights (1.5+ body) | ✅ PASS |
| Text contrast | ⚠️ FAIL |
| prefers-reduced-motion | ⚠️ PARTIAL |
| No excessive motion/flash/auto-play | ✅ PASS |

---

## 1. Font Sizes

### Body Text (Minimum 16px)

| Element | Size | File:Line | Pass/Fail |
|---------|------|-----------|-----------|
| `body` | 17px (1.0625rem) | `css/base.css:123` | ✅ PASS |
| `hero-sub` | 17px min (clamp) | `css/components.css:106` | ✅ PASS |
| `pitch-bullets li` | 17px (1.0625rem) | `css/components.css:159` | ✅ PASS |
| `feature-card p` | 15px (0.9375rem) | `css/components.css:215` | ❌ FAIL |
| `client-tagline` | 15px (0.9375rem) | `css/components.css:386` | ❌ FAIL |
| `footer-col a` | 15px (0.9375rem) | `css/theme.css:161` | ❌ FAIL |
| `footer-copy` | 13px (0.8125rem) | `css/theme.css:166` | ❌ FAIL |

### Severity: Major

Four elements fall below the 16px minimum:
- `feature-card p` at 15px (`css/components.css:215`)
- `client-tagline` at 15px (`css/components.css:386`)
- `footer-col a` at 15px (`css/theme.css:161`)
- `footer-copy` at 13px (`css/theme.css:166`)

### Recommendations

1. Increase `feature-card p` from `0.9375rem` to `1rem` (16px)
2. Increase `client-tagline` from `0.9375rem` to `1rem` (16px)
3. Increase `footer-col a` from `0.9375rem` to `1rem` (16px)
4. Increase `footer-copy` from `0.8125rem` to `0.875rem` (14px) — or use `--color-text-muted` which is acceptable for small print

---

## 2. Line Heights

All body text line heights meet or exceed 1.5:

| Element | Line Height | File:Line | Pass/Fail |
|---------|-------------|-----------|-----------|
| `body` | 1.7 | `css/base.css:124` | ✅ PASS |
| `p` (general) | 1.7 | `css/theme.css:47` | ✅ PASS |
| `hero-sub` | 1.8 | `css/components.css:110` | ✅ PASS |
| `pitch-bullets li` | 1.7 | `css/components.css:162` | ✅ PASS |
| `feature-card p` | 1.7 | `css/components.css:218` | ✅ PASS |
| `faq-item dd` | 1.7 | `css/components.css:567` | ✅ PASS |

### Severity: N/A (Pass)

---

## 3. Contrast

### Failed Elements

| Element | Color | Background | Ratio | File:Line | WCAG AA | WCAG AAA |
|---------|-------|------------|-------|-----------|---------|----------|
| `--color-text-muted` | #555 | #fff | 5.15:1 | `css/base.css:67` | ⚠️ Fail (large text only) | ❌ FAIL |

### Notes

- Body text `#1a1a1a` on `#fff` = 16.1:1 ✅ PASS AAA
- Slate gray `#2e2e2e` on `#fff` = 12.6:1 ✅ PASS AA
- Electric blue `#2d9cff` used sparingly (decorative, links) — decorative use acceptable
- `feature-card p` uses `var(--color-slate-gray)` = 12.6:1 ✅ PASS AA

### Severity: Minor

`--color-text-muted: #555` is defined but not heavily used. Primary text uses proper contrast ratios. However, if this color is used anywhere for body text, it would fail AA for normal text.

### Recommendations

1. If `--color-text-muted` is used for body text, increase to `#666` (4.5:1) or higher
2. Current `#555` is acceptable for large text (18px+) or small UI elements

---

## 4. prefers-reduced-motion

### Implementation

**base.css (lines 209-218):**
```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

**components.css (lines 632-640):**
```css
@media (prefers-reduced-motion: reduce) {
  .feature-card:hover,
  .client-card:hover,
  .download-card:hover {
    transform: none;
    border-left-color: var(--color-electric-blue);
  }
}
```

### Analysis

| Aspect | Status | Notes |
|--------|--------|-------|
| Global transition disable | ✅ Good | `transition-duration: 0.01ms` in base.css |
| Scroll behavior override | ✅ Good | `scroll-behavior: auto` in base.css |
| JS smooth scroll | ⚠️ Issue | `main.js:106` uses `behavior: 'smooth'` — not guarded |
| Hover transform removal | ✅ Good | `transform: none` in components.css |

### Severity: Major

The global CSS reset handles most transitions, but JavaScript `scrollIntoView({ behavior: 'smooth' })` at `js/main.js:105-108` is not wrapped in a `prefers-reduced-motion` check.

### Recommendations

1. Guard the smooth scroll in `js/main.js`:
```javascript
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
target.scrollIntoView({
  behavior: prefersReducedMotion ? 'auto' : 'smooth',
  block: 'start',
});
```

---

## 5. Excessive Motion / Flash / Auto-play

### Analysis

| Issue | Status | Notes |
|-------|--------|-------|
| No `<video>` or `<audio>` with autoplay | ✅ Pass | Static site |
| No CSS animations (keyframes) | ✅ Pass | No `@keyframes` found |
| No JavaScript-driven animations | ✅ Pass | Only hover transitions |
| No flashing content | ✅ Pass | No rapid color changes |
| No scroll-jacking | ✅ Pass | Standard scroll behavior |

### Severity: N/A (Pass)

---

## Overall Assessment

**READABILITY: PARTIAL PASS**

- Body text sizes mostly adequate (17px)
- Four elements below 16px minimum (minor issue)
- Line heights excellent (1.7+)
- Contrast generally good with one marginal color
- Motion preferences partially handled (JS smooth scroll not guarded)
- No motion/flash hazards found

### Priority Fixes

1. **High**: Guard JS smooth scroll with `prefers-reduced-motion` check
2. **Medium**: Increase 4 small text elements to 16px minimum
3. **Low**: Verify `--color-text-muted` usage doesn't appear in body text contexts
