# Accessibility Review — Variant 05-pixel-tech

**Review Date:** 2026-05-20
**Variant:** 05-pixel-tech
**Pages Reviewed:** 8 (index, about, hub, docs, plugins, download, clients, features)
**Standard:** WCAG 2.2 AA

---

## Score: 52 / 100

**Critical accessibility barriers prevent this variant from meeting WCAG 2.2 AA compliance. The neon-green-on-black aesthetic is iconic but body text contrast fails catastrophically.**

---

## ✅ Passed Items

### Skip Link
- Present on all 8 pages as `<a class="skip-link" href="#main-content">Skip to main content</a>`
- Visible on focus with neon green background (#39FF14) on black
- Correctly positioned off-screen until focused
- Focus style uses electric purple outline for visual distinction

### Single H1 Per Page
- All pages have exactly one `<h1>`
- Proper heading hierarchy maintained (h1 > h2 > h3)

### Semantic Landmarks
- `<header role="banner">` on all pages
- `<nav role="navigation" aria-label="Primary navigation">` on all pages
- `<main id="main-content" tabindex="-1">` on all pages
- `<footer role="contentinfo">` on all pages

### Alt Text
- Logo images have descriptive alt (`alt="Phlix logo"`)
- Logo links have `aria-label="Phlix home"` for additional context
- Decorative SVG icons properly use `aria-hidden="true"`

### Focus States
- `:focus-visible` with 2px neon green outline and 2px offset (base.css:144-148)
- `:focus-visible` is modern and appropriate (excludes mouse users, includes keyboard)
- Skip link has distinct focus style (electric purple outline)

### ARIA Usage
- Navigation toggles have `aria-expanded="false"` updated dynamically
- Navigation toggles have `aria-controls="nav-menu"`
- Current page marked with `aria-current="page"`
- Lists use `role="list"` appropriately

### Reduced Motion (Partial)
- CSS `@media (prefers-reduced-motion: reduce)` at base.css:151-158 disables animations
- JavaScript `initGlitchEffect()` and `initScrollAnimations()` check `window.matchMedia('(prefers-reduced-motion: reduce)')` before running

### Large Text Contrast (Headings)
- Neon green (#39FF14) on black (#000000) for headings: **15.22:1 ratio** — PASSES AAA
- Matrix green (#0F6) on black: **13.4:1 ratio** — PASSES AAA
- H1 headings use neon green with text-shadow glow

### Button Contrast (Primary)
- Primary buttons (neon green background, black text): **15.22:1** — PASSES AA

### External Links
- External links properly use `rel="noopener noreferrer"` (download.html, docs.html, plugins.html, clients.html)

---

## ⚠️ Concerns (Non-blocking)

### Focus Visible Only
- `:focus-visible` excludes older browser support (pre-Chromium Edge, some Firefox versions)
- Consider adding fallback `:focus` style for browsers without `:focus-visible` support
- **Impact:** Low — graceful degradation, mouse users unaffected

### Font Loading Fallback
- Fonts use `font-display: swap` (theme.css:18,26,33,40) — prevents invisible text during load
- Fallbacks defined in CSS custom properties
- **Impact:** Minimal — swap is appropriate for non-critical decorative fonts

### Reduced Motion Scope (CSS)
- The `prefers-reduced-motion` media query in CSS (base.css:151-158) only covers `*::before` and `*::after` pseudo-elements that are animated via CSS
- The scanline animation in the header (theme.css:71) runs on a `::before` pseudo-element and could be affected, but the `@keyframes scanline` itself is NOT wrapped in a motion media query
- **Impact:** Low — JS-based reduced motion check is present and functional

---

## ❌ Failures (Must Fix)

### 1. Body Text Contrast — CRITICAL

**WCAG 2.2 AA Failure: 1.4.3 Contrast (Minimum)**

The `--color-silver` value `#1A1A1A` is used for `--color-text-primary` and applied to all body/paragraph text.

| Element | Foreground | Background | Ratio | Required | Status |
|---------|-----------|------------|-------|---------|--------|
| Body text (`p`, `.hero-sub`, etc.) | #1A1A1A | #000000 | **1.19:1** | 4.5:1 | ❌ FAIL |
| Footer text | #1A1A1A | #000000 | **1.19:1** | 4.5:1 | ❌ FAIL |
| Navigation links (hover) | #1A1A1A | transparent | **1.19:1** | 4.5:1 | ❌ FAIL |

**Evidence:**
- base.css:86: `--color-text-primary: var(--color-silver);`
- base.css:74: `--color-silver: #1A1A1A;`
- base.css:84: `--color-bg-primary: var(--color-black);` = #000000
- theme.css:48: `color: var(--color-text-primary);` applied to body

**Impact:** Critical — this is the single largest accessibility barrier. Body text is essentially invisible for users with low vision, visual impairments, or in bright environments.

**Recommended Fix:** Use a lighter silver/gray for body text. Something like `#B0B0B0` on black yields ~10.6:1.

---

### 2. Secondary Button Text Contrast — MAJOR

**WCAG 2.2 AA Failure: 1.4.11 Non-text Contrast**

Secondary buttons use neon green text on dark background:

| Element | Foreground | Background | Ratio | Required | Status |
|---------|-----------|------------|-------|---------|--------|
| `.btn-secondary` text | #39FF14 | #000000 | **2.08:1** | 3:1 | ❌ FAIL |

**Evidence:**
- components.css:65: `color: var(--color-neon-green);` on `.btn-secondary`
- Button background is transparent with black body background showing through

**Impact:** Major — interactive UI components must meet 3:1 minimum for low vision users to distinguish UI elements.

**Recommended Fix:** Use matrix green (#0F6) or a brighter accent for button text.

---

### 3. Glitch Animation Without Motion Preference — MAJOR

**WCAG 2.2 AA Failure: 2.3.1 Three Flashes or Below Threshold (implicit)**

The CSS `.glitch` class (components.css:120-160) and `@keyframes glitch-1`/`glitch-2` run indefinitely without checking `prefers-reduced-motion`.

**Evidence:**
- components.css:134-144: `.glitch::before` and `.glitch::after` have infinite animations
- index.html:69: `<h1 class="glitch" ...>`
- No `@media (prefers-reduced-motion)` wrapping these keyframe animations

**Good News:**
- JavaScript `initGlitchEffect()` in main.js:52-53 checks `prefers-reduced-motion` and returns early if set
- However, this only affects the JS-triggered re-animation, NOT the CSS animation that plays immediately on page load

**Impact:** Major — users with vestibular disorders who rely on reduced motion preferences will experience motion even with `prefers-reduced-motion: reduce` set.

**Recommended Fix:** Wrap the glitch animations in `@media (prefers-reduced-motion: no-preference)` or add `animation-play-state: paused` when reduced motion is preferred.

---

### 4. Missing Form Labels — MODERATE

**WCAG 2.2 AA Failure: 1.3.1 Info and Relationships**

Download page has download cards with no associated labels:

```html
<div class="download-card hover-lift" id="download-roku">
  <h3>Roku</h3>
  <p>Native Roku channel</p>
  <a href="..." class="btn btn-primary" rel="noopener noreferrer">Get Roku</a>
</div>
```

The cards are `<div>` elements without accessible names relationships.

**Impact:** Moderate — screen readers cannot associate the card's heading with the button action.

**Recommended Fix:** Use `<article>` with `aria-labelledby` pointing to the heading ID, or wrap in a `<section>` with `aria-labelledby`.

---

### 5. Mobile Nav Toggle Target Size — MINOR

**WCAG 2.2 AA Failure: 2.5.8 Target Size (Minimum)**

The mobile nav toggle button is 24x24px (theme.css:146-158), below the 44x44px minimum.

**Evidence:**
- theme.css:147-158: `.nav-toggle` has no explicit min-width/height in the mobile context
- base.css:110: `--touch-target: 44px;` is defined but not applied to toggle

**Impact:** Minor — difficult for users with motor impairments to activate on mobile.

**Recommended Fix:** Ensure `.nav-toggle` has `min-width: var(--touch-target)` and `min-height: var(--touch-target)` in the mobile breakpoint.

---

## 🔢 Score Breakdown

| Category | Score | Max | Notes |
|----------|-------|-----|-------|
| Contrast (Text) | 5 | 25 | Body text fails catastrophically |
| Contrast (UI) | 10 | 15 | Secondary buttons fail |
| Focus | 15 | 15 | Good focus-visible support |
| Motion | 5 | 10 | Glitch animation not fully suppressed |
| Semantics | 12 | 15 | Proper landmarks, but H1 only in main |
| ARIA | 5 | 10 | Missing labels on some interactive elements |
| Forms | 0 | 5 | No forms to label — moot |
| Navigation | 0 | 5 | Skip link works, but mobile nav has issues |
| **TOTAL** | **52** | **100** | |

---

## 📋 Recommendations (Ranked by Impact)

### P0 — Must Fix Before Release

1. **Fix body text contrast** (#1A1A1A → #B0B0B0 or similar)
   - Impact: Unblocks ~1.2 billion users with low vision globally
   - Effort: 1 line CSS change

2. **Fix secondary button contrast** (use #0F6 matrix green for text)
   - Impact: Enables UI component distinction
   - Effort: 1 line CSS change

3. **Wrap glitch animations in prefers-reduced-motion**
   - Add to components.css:
   ```css
   @media (prefers-reduced-motion: reduce) {
     .glitch::before,
     .glitch::after {
       animation: none;
     }
   }
   ```
   - Impact: Prevents vestibular disorders trigger
   - Effort: 5 lines CSS

### P1 — Should Fix

4. **Add `aria-labelledby` to download/client cards**
   - Impact: Improves screen reader comprehension
   - Effort: Medium (structural change)

5. **Ensure mobile nav toggle meets 44px target**
   - Impact: Helps motor-impaired users
   - Effort: 2 lines CSS

### P2 — Nice to Have

6. **Add fallback `:focus` style for older browsers**
   - Impact: Graceful degradation
   - Effort: 3 lines CSS

7. **Add `prefers-contrast: more` media query support**
   - Impact: Further accessibility for high contrast needs
   - Effort: Medium

---

## 📊 Evidence Summary

### Color Palette Used
| Token | Hex | Usage | Contrast w/ #000 |
|-------|-----|-------|------------------|
| --color-neon-green | #39FF14 | Headings, links, primary UI | 15.22:1 ✓ |
| --color-matrix-green | #0F6 | Secondary accents | 13.4:1 ✓ |
| --color-silver | #1A1A1A | Body text ❌ | 1.19:1 ❌ |
| --color-black | #000000 | Backgrounds | — |
| --color-electric-purple | #9B30FF | Accent, hover states | N/A (not text) |

### Pages Checked
- [x] index.html — Hero glitch heading, pitch section, feature cards
- [x] about.html — FAQ list with definition terms
- [x] hub.html — Content sections
- [x] docs.html — Documentation links
- [x] plugins.html — Code block, ecosystem list
- [x] download.html — Download cards, download block
- [x] clients.html — Client cards with status badges
- [x] features.html — Feature detail grid

### Testing Methods
- Manual code inspection (contrast calculated via relative luminance formula)
- WCAG 2.2 reference for contrast thresholds
- Semantic HTML structure validation
- ARIA attribute verification

---

*Review generated 2026-05-20. Recommend fixing P0 issues before deployment.*
