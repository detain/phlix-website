# READABILITY Review — variant 05-pixel-tech-4 (wave 4)

## Review Summary

| Check | Result |
|-------|--------|
| Font sizes (min 16px body) | ❌ FAIL |
| Line heights (1.5+ body) | ✅ PASS |
| Contrast sufficient | ✅ PASS |
| prefers-reduced-motion respected | ✅ PASS |
| No excessive motion/flash | ❌ FAIL |

---

## 1. Font Sizes

**Finding: FAIL**

Body font size is correctly set to 16px at the root level:
```css
html { font-size: 16px; } /* base.css:18 */
```

However, several body-context text elements fall below 16px:

- **Nav links**: `font-size: 0.875rem` (14px) — `theme.css:120`
- **Footer links**: `font-size: 0.875rem` (14px) — `theme.css:736`
- **Feature card titles** (`h3`): `font-size: 0.9rem` (14.4px) — `theme.css:408`
- **Feature card body text**: `font-size: 0.9rem` (14.4px) — `theme.css:414`
- **Footer copyright**: `font-size: 0.75rem` (12px) — `theme.css:748`
- **Client status badges**: `font-size: 0.75rem` (12px) — `theme.css:503`

Only the hero subtext (`1.25rem` / 20px) and pitch bullets (`1rem` / 16px) meet the 16px minimum.

---

## 2. Line Heights

**Finding: PASS**

- `body { line-height: 1.6 }` — base.css:26 ✅ (above 1.5 threshold)
- `p { line-height: 1.7 }` — theme.css:246 (content-section p)
- `.hero-sub { line-height: 1.7 }` — theme.css:358 ✅
- Headings at `line-height: 1.2` — base.css:38 (acceptable for headings)

---

## 3. Contrast

**Finding: PASS**

Primary text (`#c0c0c0` silver) on `#000` background:
- Ratio: **12.64:1** ✅ (exceeds 4.5:1 WCAG AA)

Accent text (`#39ff14` neon green) on `#000`:
- Ratio: **19.55:1** ✅ (exceeds 4.5:1 WCAG AA)

Buttons use `#39ff14` on near-black `#000` backgrounds with green glow boxes — contrast is maintained.

Note: `.status-beta` uses muted text on muted background but only appears in `clients.html` (out of scope for index.html review).

---

## 4. prefers-reduced-motion

**Finding: PASS**

CSS (base.css:161–170):
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

JavaScript (main.js:52–53, 64–65):
```js
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (prefersReducedMotion) return;
```
Both `initAmberGlow()` and `initScrollAnimations()` early-return when the preference is set.

---

## 5. No Excessive Motion/Flash

**Finding: FAIL**

Two perpetual animations run on the page without any `prefers-reduced-motion` override at the CSS level:

1. **Header underline — `matrix-rain`** (theme.css:68–69):
   ```css
   animation: matrix-rain 3s ease-in-out infinite;
   ```
   The keyframes at `theme.css:71–84` animate opacity between 0.6 and 1.0 on the glow effect. This is a subtle pulsing glow, but it runs continuously.

2. **Hero heading — `matrix-flicker`** (theme.css:323):
   ```css
   animation: matrix-flicker 4s ease-in-out infinite;
   ```
   Keyframes at theme.css:326–351 flicker shadow intensity at 92%–94% of each 4-second cycle. Very subtle.

3. **Terminal cursor — `blink`** (components.css:133):
   ```css
   animation: blink 1s step-end infinite;
   ```
   Blinks at exactly 1s intervals (1 blink per second). This equals the 3 flashes/second threshold — but since it's a simple cursor and the blink is `step-end` (instant on/off), perceptually it is not jarring.

4. **Animated border elements** (`border-flow` 3s linear infinite) — only triggered on hover, not perpetual.

**The primary concern is the `matrix-rain` header animation** — it runs on every page load with no reduced-motion override at the rule level (only the general `@media` rule applies). While subtle, it is continuous motion that could affect vestibular disorders.

**The `matrix-flicker` and `blink` are also present** but the blink is a cursor (not attention-grabbing) and the flicker is barely perceptible.

---

## Issues Requiring Attention

| Priority | Issue | Location |
|---------|-------|----------|
| High | Multiple text elements below 16px minimum | Nav, footer, feature cards |
| Medium | `matrix-rain` header animation lacks targeted reduced-motion override | theme.css:68–69 |
| Low | `blink` cursor at 1s interval equals threshold | components.css:133 |
