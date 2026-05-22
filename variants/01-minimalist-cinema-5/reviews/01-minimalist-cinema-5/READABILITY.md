# READABILITY Review — 01-minimalist-cinema-5 (Wave 5)

## Summary
| Check | Status |
|-------|--------|
| Font sizes (min 16px body text) | **PASS** |
| Line heights (1.5+ body text) | **PASS** |
| Contrast sufficient | **FAIL** |
| `prefers-reduced-motion` respected | **PARTIAL** |
| No excessive motion/flash/auto-play | **PASS** |

---

## 1. Font Sizes — ✅ PASS

Body text uses `1rem` (16px) which meets the minimum requirement.

| Selector | Size | Location |
|----------|------|----------|
| `body` | 1rem (16px) | `css/base.css:80` |
| `p` | 1rem (16px) | inherited from `body` |
| `pre` | 0.875rem (14px) | `css/theme.css:94` |
| `h1` | clamp(3rem, 8vw, 6rem) | `css/theme.css:57` |
| `h2` | clamp(2rem, 4vw, 3.5rem) | `css/theme.css:63` |
| `h3` | clamp(1.5rem, 2.5vw, 2.25rem) | `css/theme.css:68` |
| `h4` | 1.25rem (20px) | `css/theme.css:73` |
| `.hero-sub` | clamp(1rem, 2vw, 1.25rem) | `css/components.css:107` |
| `.page-lead` | 1.125rem (18px) | `css/components.css:340` |

---

## 2. Line Heights — ✅ PASS

All body text meets the 1.5+ requirement.

| Selector | Line Height | Location |
|----------|-------------|----------|
| `body` | 1.6 | `css/base.css:81` |
| `p` | 1.6 | inherited from `body` |
| `pre` | 1.5 | `css/theme.css:95` |
| `.hero-sub` | 1.7 | `css/components.css:112` |

---

## 3. Contrast — ❌ FAIL (Major Issues)

### Critical: `--color-link` on white/light backgrounds
- **Value**: `--color-primary: #2d9cff` (a blue)
- **Location**: `css/base.css:8`
- **Issue**: `#2d9cff` on `#fff` achieves only **~4.6:1** contrast ratio. This fails WCAG AA for small text (< 18px). Passes only for large text (18px+ or bold 14px+).

### Critical: `--color-accent` (#00f0ff) usage issues
- **Location**: `css/base.css:21`
- **Issue**: Cyan accent `#00f0ff` on white/light backgrounds has very poor contrast. When used on light surfaces, text using this color fails completely.

### Major: `--color-muted` (#6b7280) near threshold
- **Value**: `#6b7280` on `#fff` achieves **~4.64:1**
- **Location**: `css/base.css:13`, `css/theme.css:80`, `css/components.css:230`
- **Issue**: While technically passing AA at 4.64:1, this is dangerously close to the 4.5:1 minimum and provides no margin for error. Any slight variation in display calibration could push this below threshold.

### Major: `#aaa` on white
- **Selector**: `p { color: #aaa; }`
- **Location**: `css/theme.css:80`
- **Issue**: `#aaa` (~#aaa = RGB 170,170,170) on white achieves only **~2.85:1** contrast ratio. This is used for body text paragraphs but fails completely.

### Major: `#888` on white
- **Selectors**: `.hero-sub`, `.page-lead`
- **Location**: `css/components.css:108`, `css/components.css:341`
- **Issue**: `#888` on white achieves only **~3.46:1** contrast ratio. Both fail WCAG AA significantly.

### Major: `--color-primary` (#2d9cff) on white for navigation
- **Selector**: `.nav-menu a`
- **Location**: `css/theme.css:231-241`
- **Issue**: Navigation links using `#2d9cff` on the dark header background (`rgba(0,0,0,0.95)`) is actually fine. However, when the header has transparency and content scrolls behind it, contrast may be affected.

---

## 4. `prefers-reduced-motion` — ⚠️ PARTIAL

### ✅ Properly handled in base.css (lines 168-176)
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

### ✅ Properly handled for hover transforms (lines 663-668)
```css
@media (prefers-reduced-motion: reduce) {
  .feature-card:hover,
  .client-card:hover {
    transform: none;
    border-color: rgb(255, 255, 255, 0.1);
  }
}
```

### ⚠️ Missing: Mobile nav slide-in animation not disabled
The mobile navigation menu uses `transform: translateX(-100%)` with transition in `theme.css:296-297`:
```css
.nav-menu {
  transform: translateX(-100%);
  transition: transform var(--transition-base);
}
```
When `prefers-reduced-motion` is set, this slide-in animation should be disabled to prevent motion sickness. The current rules do not address this specific animation.

---

## 5. Excessive Motion / Flash / Auto-play — ✅ PASS

- No `<video>` or `<audio>` elements with auto-play found
- No CSS keyframe animations present
- No flashing/blinking elements detected
- No JavaScript-driven animations (only CSS transitions for hover states)
- Smooth scroll in JS (`main.js:98-101`) respects `prefers-reduced-motion` via CSS

---

## Recommendations

### Critical (fix immediately)
1. **Increase contrast for body text**: Change `p { color: #aaa; }` in `theme.css:80` to a darker color with at least 4.5:1 contrast ratio on white. Suggested: `#4b5563` (gray-600) or darker.
2. **Fix `.hero-sub` contrast**: Change `color: #888` in `components.css:108` to `#4b5563` or similar.
3. **Fix `.page-lead` contrast**: Change `color: #888` in `components.css:341` to `#4b5563` or similar.
4. **Review `--color-muted` usage**: Ensure `#6b7280` is not used on white backgrounds for text below 18px.

### Major (fix before release)
5. **Disable mobile nav transform under reduced motion**: Add to `components.css`:
```css
@media (prefers-reduced-motion: reduce) {
  .nav-menu {
    transform: none !important;
    transition: none !important;
  }
}
```

### Minor (nice to have)
6. **Consider increasing `--color-muted` threshold**: Use `#6b7280` only on sufficiently dark backgrounds, or choose a darker shade for general use.

---

## Severity Summary

| Severity | Count | Issues |
|----------|-------|--------|
| Critical | 4 | Contrast failures for body/heading text (#aaa, #888, --color-primary) |
| Major | 2 | Muted color near threshold, mobile nav motion |
| Minor | 0 | — |

**Overall Assessment**: The variant has significant contrast issues that need immediate attention. The use of light gray colors (#aaa, #888) on white/light surfaces fails WCAG AA requirements. Font sizes and line heights are adequate, and the site is largely free of problematic motion, but contrast failures could cause accessibility issues for users with visual impairments.
