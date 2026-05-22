# READABILITY Review — 05-pixel-tech-3 (wave 3, brand 05-pixel-tech)

**Reviewer:** Claude (automated readability review)
**Date:** 2026-05-21
**Phase:** READABILITY

---

## Summary

| Criterion | Result |
|-----------|--------|
| Font sizes (min 16px body) | **FAIL** |
| Line heights (1.5+ body) | **PASS** |
| Contrast (sufficient) | **PASS** |
| prefers-reduced-motion respected | **FAIL** |
| No excessive motion/flash | **PASS** |

---

## 1. Font Sizes

**Method:** CSS source inspection (base 16px = 1rem)

**Findings:**

| Selector | Computed size | Pass/Fail |
|----------|--------------|-----------|
| `html` | 16px (1rem) | ✅ PASS |
| `.hero-sub` | 20px (1.25rem) | ✅ PASS |
| `.pitch-bullets li` | 16px (1rem) | ✅ PASS |
| `.feature-card p` | 14.4px (0.9rem) | ❌ FAIL |
| `.nav-menu a` | 14px (0.875rem) | ❌ FAIL |
| `.client-highlights li` | 14px (0.875rem) | ❌ FAIL |
| `.footer-col a` | 14px (0.875rem) | ❌ FAIL |
| `.footer-copy` | 12px (0.75rem) | ❌ FAIL |
| `.client-status` | 12px (0.75rem) | ❌ FAIL |

**Issue:** Four distinct selectors render body/UI text below the 16px minimum, used on feature card descriptions, navigation links, footer links, footer copyright, and client status badges.

---

## 2. Line Heights

**Method:** CSS source inspection

| Selector | Line-height | Pass/Fail |
|----------|-------------|-----------|
| `body` | 1.6 | ✅ PASS |
| `.hero-sub` | 1.7 | ✅ PASS |
| `.feature-card p` | 1.6 | ✅ PASS |
| `.content-section p` | 1.7 | ✅ PASS |

All body-text line-heights exceed the 1.5 threshold. No issue.

---

## 3. Contrast

**Method:** WCAG relative luminance formula on computed CSS color values

| Foreground | Background | Ratio | WCAG AA (4.5:1) | WCAG AAA (7:1) |
|-----------|-----------|-------|-----------------|----------------|
| `#c0c0c0` (silver) | `#000000` (black) | **11.54:1** | ✅ PASS | ✅ PASS |
| `#39ff14` (neon-green) | `#000000` (black) | **15.49:1** | ✅ PASS | ✅ PASS |
| `#c0c0c0` (silver) | `#1a1a1a` (dark-gray) | **9.57:1** | ✅ PASS | ✅ PASS |

All text color combinations exceed WCAG AAA. The CRT monitor aesthetic (bright text on pure black) actually provides excellent contrast. No issue.

---

## 4. prefers-reduced-motion

**Method:** CSS source inspection of all `@media (prefers-reduced-motion)` rules and all `@keyframes` declarations

**Findings:**

- **base.css line 159–168**: Global reset for `prefers-reduced-motion: reduce` using `*` selector with `!important` that zeroes all `animation-duration`, `animation-iteration-count`, `transition-duration`, and sets `scroll-behavior: auto`.
- **components.css line 202–207**: Specific override for `.glitch::before, .glitch::after` setting `animation: none`.
- **CSS cascade order problem**: components.css is loaded after base.css. The `*` selector in base.css's reduced-motion block has higher effective specificity than `.glitch::before, .glitch::after` due to `!important`. Since base.css's rule is last in cascade order, it wins — the `animation-duration: 0.01ms !important` from the global reset overrides the explicit `animation: none` in components.css.

**Additionally missing reduced-motion overrides for:**
- `@keyframes neon-flicker` — animates `.hero h1` text-shadow continuously every 4s
- `@keyframes crt-flicker` — animates the sticky header's bottom-glow pseudo-element continuously every 3s

These two keyframe animations have **no corresponding rule inside any `@media (prefers-reduced-motion: reduce)` block**, so they will animate indefinitely for users with that preference enabled.

**Issue:** prefers-reduced-motion is not correctly implemented for `.glitch` (specific override is overridden by global reset), and `neon-flicker` and `crt-flicker` have no reduced-motion handling at all.

---

## 5. Excessive Motion / Flash

**Method:** Keyframe animation analysis (frequency, seizure-risk)

| Animation | Duration | Effect | Flash risk |
|----------|----------|--------|------------|
| `crt-flicker` | 3s cycle | opacity 0.5→1→0.5 (2 changes/cycle ≈ **0.67 Hz**) | ✅ none |
| `neon-flicker` | 4s cycle | text-shadow chromatic shift, very subtle | ✅ none |
| `glitch-1` / `glitch-2` | 3–4s cycle | clip-path + translate shift (no opacity/colour flash) | ✅ none |
| `neon-sweep` | 0.5s | triggered on hover only, not ambient | ✅ not ambient |

No ambient animation exceeds the 3 Hz flash threshold. Hover-triggered animations (`.hover-lift`, `.neon-sweep`) are interaction-gated. No issue.

---

## Verdict

**READABILITY: FAIL** — Font sizes below 16px on multiple UI elements, and `prefers-reduced-motion` not fully respected (global reset overrides specific glitch override; neon-flicker and crt-flicker have no reduced-motion block at all).

### Required fixes

1. **Font sizes**: Raise to 16px minimum:
   - `.feature-card p` (0.9rem → 1rem)
   - `.nav-menu a` (0.875rem → 1rem)
   - `.client-highlights li` (0.875rem → 1rem)
   - `.footer-col a` (0.875rem → 1rem)
   - `.footer-copy` and `.client-status` are secondary/meta text; acceptable at 12–14px with `rem` but should be kept at 14px minimum

2. **prefers-reduced-motion**: Either:
   - Move the global `*` reduced-motion reset **after** the specific `.glitch` override in the cascade (load order), OR remove `!important` from the global reset and let the more specific rule win, AND
   - Add `@media (prefers-reduced-motion: reduce) { .site-header::after { animation: none; } }` to suppress `crt-flicker`
   - Add `@media (prefers-reduced-motion: reduce) { .hero h1 { animation: none; } }` to suppress `neon-flicker`
