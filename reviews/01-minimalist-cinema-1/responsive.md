# Responsive Review — `01-minimalist-cinema-1`

**Dimension:** Responsive
**Variant:** Minimalist Cinema V1 — Ultra-Minimal
**Review date:** 2026-05-20

---

## Summary

| Check | Status |
|---|---|
| Horizontal scroll prevention | ✅ Pass |
| Touch targets ≥44px | ✅ Pass |
| Mobile navigation implemented | ❌ **FAIL** — no hamburger, no collapse |
| Breakpoint coverage | ⚠️ **Partial** — only 480px and 768px |
| Text readability at small viewports | ✅ Pass |
| Images scale correctly | ✅ Pass |

**Verdict: FAIL** — mobile navigation is not implemented, making the site unusable on small phones despite otherwise sound CSS foundations.

---

## Findings

### 1. Horizontal Scroll — ✅ Pass

`body` has `overflow-x: hidden` (base.css line 136) and `img, svg, video` have `max-width: 100%; height: auto` (base.css line 143–145). No fixed-px widths on layout containers were found. Code blocks use `overflow-x: auto` intentionally.

### 2. Touch Targets ≥44px — ✅ Pass

Global rule in `components.css` lines 375–379:
```css
a, button, [role="button"] {
  min-height: 44px;
  min-width: 44px;
}
```
This applies everywhere, including header nav links.

### 3. Mobile Navigation — ❌ **FAIL (Critical)**

**The hamburger button is absent from the HTML.**

- `js/main.js` (lines 10–29) expects `document.getElementById('nav-toggle')` and a `<nav id="site-nav">` with a `.is-open` toggle class
- The HTML has `<nav id="site-nav">` but **no element with `id="nav-toggle"`** anywhere in any HTML file
- The nav (`display: flex`) is a persistent horizontal row — it never collapses
- At 320px and 375px, the header nav (5 links × 44px min-height + gaps) will overflow the 4rem header height, causing horizontal overflow regardless of `overflow-x: hidden` on body
- The `.is-open` class has no CSS definition anywhere — not in external CSS, not in the HTML's inline critical stylesheet

**Evidence:** `js/main.js` references `document.getElementById('nav-toggle')` but grep finds zero HTML elements with that ID.

### 4. Breakpoint Coverage — ⚠️ **Partial**

Only **two breakpoints** exist:

| Breakpoint | Location | What's adjusted |
|---|---|---|
| `width <= 768px` | `components.css:382`, `theme.css:348` | Reduced spacing tokens, features-grid gap, client-card padding, footer__grid |
| `width <= 480px` | `theme.css:364` | Gutter reduced, nav gap tightened, hero actions → column |

**Rubric asks to probe at 320, 375, 414, 768, 1024, 1280, 1920.**

- **320px, 375px, 414px**: No adaptation. Nav overflow is most severe here.
- **768px**: Only spacing token reduction + footer grid change. Header nav unchanged.
- **1024px, 1280px, 1920px**: No tablet/large-screen breakpoints. The `features-grid` stays 1-column throughout.

### 5. Text Readability — ✅ Pass

- `html { font-size: 16px }` — no root-level font shrinking
- Body text: `p { font-size: 1rem }` — no 12px body found
- Typography uses `clamp()` for headings (e.g., `h1 { font-size: clamp(2.25rem, 5vw, 3.75rem) }`), naturally scaling down on small screens
- No `font-size` values below 0.75rem on body copy

### 6. Images Scale — ✅ Pass

All images have `max-width: 100%; height: auto`. No fixed-px widths found on layout containers.

---

## Critical Issues

### [CRITICAL] Missing Mobile Navigation Button

**Severity:** Critical

The JS toggles a `.is-open` class on `nav` and `navToggle`, but:
1. No `id="nav-toggle"` element exists in any HTML template
2. No CSS defines what `.is-open` does to the nav (no `display: none`, no slide-in, no overlay)
3. At 320–375px, the 5-link horizontal nav (each link ≥44px tall) will overflow the 4rem header, causing horizontal overflow

### [MEDIUM] Narrow Viewport (320–414px) Has Zero Adaptation

**Severity:** Medium

Between 320px and 480px, no CSS changes apply. The nav stays horizontal with `gap: var(--space-3)` (768px) or `gap: 1rem` (480px). At 320px, 5 nav links at 44px height each + gaps ≈ 250px+ in a ~320px viewport, guaranteed overflow.

---

## What's Working Well

- `overflow-x: hidden` on body prevents horizontal scroll at most sizes
- Touch targets globally set to 44px minimum
- All images fluid with `max-width: 100%; height: auto`
- No root font-size reduction; 16px base maintained
- `clamp()` typography scales smoothly without breakpoint dependency
- `pre` / code blocks use `overflow-x: auto` (intentional)
- `prefers-reduced-motion` respected
- `text-size-adjust: 100%` set on `html`

---

## Recommended Fixes (Not Applied)

1. **Add the hamburger button** to all HTML templates inside `.site-header__inner`, after the logo
2. **Add `.is-open` CSS** for the mobile nav state (display, position, background)
3. **Add a breakpoint at ~600px** (or consistently use 768px) to wrap or collapse the nav before overflow occurs
