# Accessibility Review — Retro Seventies

## Score: 76/100 — ⚠️ Warning

### ❌ Hard Failures

**None identified.** All WCAG 2.2 AA baseline requirements appear to be met.

---

### ⚠️ Warnings

**1. `outline: 2px solid` + `box-shadow` — unconventional focus ring implementation**

`base.css:208-212`:
```css
:focus-visible {
  outline: 2px solid var(--color-focus);
  outline-offset: 2px;
  box-shadow: 0 0 0 4px rgb(201 162 43 / 0.25);
}
```

The brand kit §21 specifies: "2px harvest-gold focus ring with 2px mahogany offset; an additional 4px warm gold outer glow (rgba(201,162,43,0.25))"

This CSS achieves the visual effect but uses `box-shadow` spread for the outer glow rather than the more standard `outline` + `outline-offset` layered approach. The implementation is non-standard but visually correct.

**Severity:** Warning — works correctly but could be more idiomatic (use a second `outline` or the `box-shadow` spread is technically non-standard for a glow ring).

**2. Font weight 900 not available in self-hosted WOFF2**

`base.css:17-22` — Playfair Display WOFF2 is only loaded for weight 700, but `theme.css:131` uses `font-weight: 900` on the hero h1:
```css
.hero h1 {
  font-weight: 900;
  ...
}
```

The WOFF2 `@font-face` at `base.css:17-22` only declares weight 700 and 900 for Playfair Display, but both point to the same WOFF2 URL (the 700 weight file). Browsers will render weight 900 as weight 700 (closest available match) rather than true 900 bold.

**Severity:** Warning — the page will still render with Playfair Display, but the hero won't have the full-weight 900 as intended. The font-display:swap is correctly applied.

**3. `.client-highlights li` — color contrast of list item text**

`components.css:376-386`:
```css
.client-highlights li {
  color: var(--color-text); /* #F5EDD8 on surface-alt #231808 */
}
```

Contrast: #F5EDD8 on #231808 = approximately 14.6:1 ✅ (well above AA)

This passes contrast requirements, but these are chip/badge-like items and the text is using `font-weight: 700` uppercase small text — WCAG 3:1 for large/UI text applies and this passes at ~10:1.

**Actually passes ✅ — no issue here.**

**4. Avocado green `#8B9B3A` for link color — not used as link color**

No links use the secondary avocado green color. All links use harvest gold (`#C9A22B`) or burnt orange (`#D4570D`), both of which pass AA against mahogany.

---

### ✅ PASS

**Contrast ratios**
- `#D4570D` (primary) on `#0F0900` (bg): 4.7:1 — passes AA (4.5:1) ✅
- `#C9A22B` (tertiary) on `#0F0900` (bg): 5.8:1 — passes AA ✅
- `#F5EDD8` (text) on `#0F0900` (bg): 18.2:1 — passes AAA ✅
- `#F5EDD8` on `#1A1005` (surface): ~15.5:1 — passes AAA ✅
- `#F5EDD8` on `#231808` (surface-alt): ~14.6:1 — passes AAA ✅
- Muted text `rgb(245 237 216 / 0.7)` on bg: ~12.7:1 — passes AA ✅
- `#5C8A3C` (success) on `#0F0900`: ~7.3:1 — passes AA ✅
- `#E0A020` (warning) on `#0F0900`: ~6.2:1 — passes AA ✅
- `#C0391B` (error) on `#0F0900`: ~5.1:1 — passes AA ✅

**Keyboard accessibility**
- Skip link present: `index.html:52` — targets `#main-content`, visible on focus ✅
- All interactive elements keyboard reachable ✅
- Visible focus indicator on every interactive element via `:focus-visible` ✅
- Logical tab order (nav links → main content → footer links) ✅
- No positive `tabindex` ✅

**ARIA**
- `aria-label` on nav toggle: "Toggle navigation" ✅
- `aria-expanded` on nav toggle updated on open/close ✅
- `aria-controls="nav-menu"` on toggle ✅
- `aria-current="page"` on active nav link ✅
- `aria-labelledby` on all major `<section>` elements ✅
- `role="list"` on all `<ul>` elements inside nav/footer ✅

**Touch targets**
- `.btn` minimum: `min-height: 44px; min-width: 44px` (components.css:154-155) ✅
- `.nav-toggle`: 44×44px click area (components.css:53-60) ✅
- `.nav-menu a`: `padding: var(--space-3) var(--space-4)` at mobile (components.css:121) ✅

**prefers-reduced-motion**
- `base.css:287-296` — `@media (prefers-reduced-motion: reduce)` disables all animations/transitions ✅
- `main.js:8` — `reducedMotion` gate before setting up IntersectionObserver ✅
- `theme.css:575-582` — reveal animation disabled when reduced-motion preferred ✅

**200% text zoom survival**
- Layout uses fluid widths (`max-width: var(--max-width)`, `clamp()` for text) — no fixed px widths blocking zoom ✅
- `base.css:300-303` — padding reduced at 1200px+ viewport to prevent overflow ✅
- `overflow-x: hidden` on body (base.css:177) prevents horizontal scroll ✅
- No text truncation with `text-overflow: ellipsis` on body text anywhere ✅

**Forms** — No forms on marketing site, so form label requirement is N/A.

**Language** — `<html lang="en">` on all 8 pages ✅

**Images** — All SVG icons have `aria-hidden="true"`. Logo has descriptive `alt="Phlix logo"`. No raster images requiring alt text. ✅

---

### ❌ FAIL — None

No WCAG 2.2 AA hard failures identified. Site meets the accessibility baseline.
