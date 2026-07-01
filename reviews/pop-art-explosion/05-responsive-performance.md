# Dimension 7: Responsive / Dimension 8: Performance
## Pop Art Explosion — Brand-Kit Site Review

---

## Dimension 7: Responsive — Score: **73**

### Assessment

| Check | Status | Location |
|-------|--------|----------|
| Fluid widths + max-width (no fixed-px layout widths) | ✅ Pass | theme.css:10–14, components.css:16–18 |
| CSS spacing_scale tokens used | ✅ Pass | All CSS files — `--space-*` throughout |
| Mobile nav (hamburger) functions | ⚠️ Partial | `components.css:101` breakpoint 900px; nav toggle itself undersized |
| No horizontal overflow at 320px | ✅ Pass | `base.css:85` `overflow-x: hidden` |
| Body text ≥16px on mobile | ✅ Pass | `base.css:122–124` `clamp()` sizing |

### Findings

**`components.css:101`** — Mobile nav breakpoint is 900px, not the spec-reference 640px. The hamburger appears "early" (at tablet size). Functional but inconsistent with the spec's 320–1920px probe range. Not a hard failure, but worth flagging.

**`components.css:47`** — `.nav-toggle` uses `display: none` → `display: flex` at 900px, but the button itself has only `padding: var(--space-2)` on a `<button>` element containing a 24×24 SVG. Actual touch target is far smaller than 48×48px required by the kit at mobile/tablet (`pop-art-explosion.js:983` "Minimum 48×48px on mobile"). **This is a MUST-FIX ❌ per kit spec.**

**`components.css:325`** — `.btn-icon { width: 44px; height: 44px; }` — 44px is below the 48px mobile touch target minimum per kit spec. **MUST-FIX ❌**

**Kit responsive behavior not implemented:**
- **Mobile no offset shadows**: The spec says "no offset shadows (performance)" at mobile (`pop-art-explosion.js:920`). The hard-offset shadow tokens (`--shadow-md`, `--shadow-lg`) are defined but never suppressed at small viewports. Cards and buttons retain `box-shadow: var(--shadow-md)` on mobile. **❌ NOT IMPLEMENTED**
- **Mobile bottom nav bar**: The kit spec calls for "bottom nav bar in red with white Bangers labels" at mobile (`pop-art-explosion.js:919–920`). The current implementation uses a sticky top header only. **❌ NOT IMPLEMENTED**
- **TV 10-foot UI**: No media query for 72px+ Bangers headlines or 6px yellow focus ring at large viewport. **❌ NOT IMPLEMENTED** (TV mode is a stated kit behavior)

---

## Dimension 8: Performance — Score: **68**

### Assessment

| Check | Status | Location |
|-------|--------|----------|
| JS is `defer`-loaded | ✅ Pass | All HTML files end with `<script src="js/main.js" defer></script>` |
| No Google Fonts CDN (`@import`) | ❌ FAIL | `base.css:7` — `@import url('https://fonts.googleapis.com/…')` |
| CSS uses design tokens (`--color-*`, `--space-*`, etc.) | ✅ Pass | All CSS files use `var(--*)` tokens |
| SVG used for logo, icons, Ben-Day patterns | ✅ Pass | CSS data-URI SVGs for Ben-Day dots; `img/logo.svg`, `img/favicon.svg` |
| Fonts self-hosted WOFF2 | ❌ FAIL | `css/fonts/` directory is empty; fonts loaded via Google CDN |
| CLS budget <0.1 | ⚠️ Risk | Google Fonts @import is render-blocking — causes layout shift |

### Critical Findings (MUST-FIX)

**`base.css:7` — Google Fonts `@import` is a SPEC VIOLATION**

```css
@import url('https://fonts.googleapis.com/css2?family=Anton&family=Bangers&family=Barlow+Condensed:wght@400;600&family=Barlow:wght@600;700&family=Share+Tech+Mono&display=swap');
```

- The spec (`new_site.md §13`) explicitly states: *"No CDN dependencies in the deployed page (no Google Fonts `<link>` to `fonts.googleapis.com`… **CDN font links are an explicit, previously-fixed regression — do not reintroduce them.**"*
- The spec (`new_site.md §13`) also requires: *"Fonts self-hosted WOFF2 with `font-display: swap`"*
- The `css/fonts/` directory is **empty** — no WOFF2 files exist
- The `@import` is **render-blocking** — it delays CSS parsing and can cause CLS
- All 5 font families (Anton, Bangers, Barlow Condensed, Barlow, Share Tech Mono) need to be downloaded as WOFF2, placed in `css/fonts/`, and declared via `@font-face` with `font-display: swap`
- **This is a regression — the spec explicitly calls it out as a "previously-fixed" defect that must not be reintroduced**

**`index.html:12,20` and other pages — `og:image` points to `.svg` not `.png`**

- Meta tags reference `img/og.svg` but the spec (`new_site.md §8`) requires a rasterized `1200×630 **`og.png`**` as the source, with `og.svg` as editable backup only.

---

## Severity Classification

| Dimension | Score | Severity |
|-----------|-------|----------|
| Responsive | 73 | ❌ Below 80 |
| Performance | 68 | ❌ Below 80 |

**Overall: ❌ FAIL — both dimensions below threshold**

---

## ❌ Items That MUST Be Fixed

1. **`base.css:7`** — Remove Google Fonts `@import`. Self-host all 5 font families as WOFF2 in `css/fonts/` with `@font-face` + `font-display: swap`. This is a documented spec regression.
2. **`components.css:47,325`** — Increase `.nav-toggle` padding and `.btn-icon` to meet 48×48px minimum touch target per kit spec (`pop-art-explosion.js:983`).
3. **Mobile offset shadows** — Add a `(width <= 640px)` media query that removes `box-shadow` from cards and buttons, per kit mobile spec (`pop-art-explosion.js:920` "no offset shadows (performance)").
4. **Mobile bottom nav bar** — Implement the kit's red bottom nav with white Bangers labels, per `pop-art-explosion.js:919–920`.
5. **`og.png`** — Rasterize `img/og.png` at 1200×630 and update all `<meta property="og:image">` tags to reference it.
6. **TV mode** — Add a `(width >= 1280px)` media query with 72px+ Bangers headlines and 6px yellow focus ring, per kit spec (`pop-art-explosion.js:915–917`).

---

## What Works Well

- Fluid `clamp()` typography — no fixed-px text
- `overflow-x: hidden` on body prevents horizontal scroll at 320px
- Design tokens used throughout (`--color-*`, `--space-*`, `--shadow-*`, `--border-*`, `--radius-*`)
- Ben-Day dots as inline SVG data URIs — no raster images
- SVG used for logo and favicon
- JS properly `defer`-loaded at end of body
- Reduced motion respected (`prefers-reduced-motion` queries in CSS and JS)
- Mobile nav toggles correctly (aria-expanded, Escape key, outside click)
