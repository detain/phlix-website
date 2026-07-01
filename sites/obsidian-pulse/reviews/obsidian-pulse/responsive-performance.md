# Obsidian Pulse — Responsive & Performance Review

**Score: 65 / 100**
**Review Date:** 2026-07-01
**Reviewer:** CodeReviewer (adversarial responsive + performance)

---

## Summary

| Dimension | Score | ❌ | ⚠️ | ✅ |
|-----------|-------|----|----|----|
| **Responsive Behavior** | 70/100 | 1 | 2 | 9 |
| **Performance** | 60/100 | 1 | 2 | 4 |
| **Overall** | **65/100** | **2** | **4** | **13** |

---

## Performance Findings

### ❌ CRITICAL — Google Fonts CDN Used + Self-Hosted Fonts Missing

**Spec violation (new_site.md §1, §13):** No CDN dependencies permitted; fonts must be self-hosted WOFF2.

- `index.html:33-35` — Google Fonts CDN link present
- `about.html:33-35` — Google Fonts CDN link present
- `features.html:33-35` — Google Fonts CDN link present

```html
<!-- All pages have this: -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&family=Space+Grotesk:wght@300;400;500&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

Additionally, `css/base.css:7-93` declares `@font-face` src URLs pointing to `fonts/dm-sans-300.woff2` etc., but the `css/fonts/` directory is **completely empty**. The self-hosted font files were never generated/shipped.

**Result:** Fonts fall back to system defaults. The Google Fonts CDN link (line 35) is present AND the self-hosted WOFF2 files are missing, creating a double failure.

**Suggested fix:** Either (a) remove the Google Fonts CDN link and generate/procure the WOFF2 font files in `css/fonts/`, or (b) if CDN is acceptable in staging only, strip the link before deployment per spec.

---

### ⚠️ Google Fonts CDN — Spec Violation, Not Render-Blocking

The Google Fonts link is `preconnect` + stylesheet — it is render-*adjacent*, not render-*blocking* (browsers handle it asynchronously). However, the spec explicitly forbids it (new_site.md §1: "No CDN dependencies in the deployed page...self-host fonts as WOFF2"). Marked ⚠️ not ❌ because it doesn't block rendering.

**File:** `index.html:33-35`

---

### ✅ JS is defer-loaded

- `index.html:243` — `<script src="js/main.js" defer></script>`
- `about.html:153` — `<script src="js/main.js" defer></script>`
- `features.html:223` — `<script src="js/main.js" defer></script>`

No render-blocking JS detected.

---

### ✅ Hero Uses CSS Gradient

- `theme.css:103` — `background: var(--gradient-pulse-horizon);`
- `theme.css:166-176` — Animated pulse scan line via CSS `@keyframes`
- No raster hero image. Lightweight.

---

### ✅ CSS Split into 3 Stylesheets

- `css/base.css` — reset, tokens, base elements (332 lines)
- `css/theme.css` — typography, layout, page structure (655 lines)
- `css/components.css` — header/nav, footer, buttons, cards (500 lines)

All loaded in correct order with `rel="stylesheet"`.

---

### ⚠️ font-display: swap Declared but Unused

- `base.css:9,17,25` etc. — All `@font-face` blocks include `font-display: swap;`
- However, since the WOFF2 font files don't exist in `css/fonts/`, these declarations are inert.

---

### ✅ All Images Are SVG

- `img/logo.svg` — vector wordmark
- `img/favicon.svg` — vector square
- `img/og.svg` — vector social card
- `img/PROMPTS.md` — prompt documentation

No raster images present. All inline SVGs are stroke-based, matching the kit's icon rules (1px stroke, sharp corners, single color).

---

## Responsive Findings

### ❌ CTA Buttons Below 44×44px Touch Target Minimum

**Spec (obsidian-pulse.js:898):** "Minimum 48×48px on mobile and TV; 44×44px on desktop."

- `.btn` (standard): `padding: var(--space-4) var(--space-6)` = `12px 24px` vertical/horizontal
  - Height: ~40px (text ~16px + 12px top + 12px bottom) — **below 44px**
- `.btn-large`: `padding: var(--space-5) var(--space-8)` = `20px 32px`
  - Height: ~56px — **acceptable**
- `.btn-small`: `padding: var(--space-2) var(--space-4)` = `8px 16px`
  - Height: ~32px — **well below 44px**

**File:** `components.css:129-248`

**Suggested fix:**
```css
/* Increase vertical padding to hit 44px minimum height */
.btn {
  padding: 14px var(--space-6); /* 14+14+16 = 44px */
}
.btn-small {
  padding: 10px var(--space-4); /* 10+10+14 = 34px — still undersized, recommend 12px+16px */
}
```

---

### ⚠️ Nav Toggle Touch Target Might Be Tight at 900px Breakpoint

- `.nav-toggle` at `components.css:44-50`: `padding: var(--space-2)` = 8px on a 24×24px SVG icon = ~40×40px tap area
- Below the 44×44px minimum for mobile/TV (obsidian-pulse.js:898)
- At 900px breakpoint the hamburger becomes visible

**File:** `components.css:44-50`

**Suggested fix:**
```css
.nav-toggle {
  padding: 10px; /* 10+24+10 = 44px */
}
```

---

### ✅ Fluid Typography with clamp()

- `theme.css:16` — `h1: clamp(var(--text-4xl), 6vw, var(--text-6xl))`
- `theme.css:24` — `h2: clamp(var(--text-3xl), 4vw, var(--text-4xl))`
- `theme.css:32` — `h3: clamp(var(--text-xl), 2.5vw, var(--text-2xl))`
- `theme.css:141` — `.hero h1: clamp(var(--text-4xl), 7vw, var(--text-7xl))`
- `theme.css:145` — `.hero-sub: clamp(var(--text-base), 2vw, var(--text-xl))`

Fluid typography deployed correctly throughout.

---

### ✅ Body Text Never Below ~16px

- `base.css:149` — `--text-base: 1rem` (16px base)
- `base.css:214` — `font-size: var(--text-base)` on body
- No hardcoded px values for body text

---

### ✅ Single Column on Mobile, Multi-Column on Desktop

Responsive breakpoints verified:
- **768px** (`theme.css:594-638`): pitch grid → 1 column; content grid → 1 column
- **480px** (`theme.css:640-654`): feature cards → 1 column
- **900px** (`components.css:93`): nav collapses to hamburger

Grid layouts use `auto-fill` / `auto-fit` with `minmax()` for fluid multi-column-to-single-column transitions.

---

### ✅ Navigation Adapts Correctly

- Desktop (>900px): horizontal `nav-menu` with flexbox
- Mobile (≤900px): hamburger toggle + vertical dropdown (`nav-menu.is-open`)
- JavaScript toggle at `main.js:13-18` with `aria-expanded` sync
- Close on Escape at `main.js:21-27`
- Close on outside click at `main.js:30-35`

---

### ✅ No Fixed-px Layout Widths

- All layout containers use fluid `width: 100%` + `max-width`
- Spacing uses CSS custom properties (`--space-*`) from the kit's scale
- No hardcoded pixel widths on layout containers

---

### ⚠️ Horizontal Scroll — Not Directly Verifiable Without Browser

Cannot confirm zero horizontal scroll at 320px, 375px, 414px, 768px, 1024px, 1280px, 1920px without live browser testing. CSS analysis shows:
- All containers use fluid widths + `max-width`
- `overflow-x: hidden` not present on body/html (correct — should not be needed if layout is fluid)
- Risk: the `pitch-bullets` grid at `theme.css:204` uses `minmax(300px, 1fr)` which could cause overflow at very narrow viewports if a single column wider than 300px is forced

**Recommend:** Manual verification at all 7 breakpoints.

---

## Recommendations (Priority Order)

1. **[CRITICAL]** Generate/procure self-hosted WOFF2 fonts and place in `css/fonts/`, OR remove Google Fonts CDN link from all HTML pages per spec
2. **[HIGH]** Increase `.btn` vertical padding to meet 44×44px touch target minimum
3. **[HIGH]** Increase `.nav-toggle` padding to meet 44×44px touch target minimum
4. **[MEDIUM]** Verify zero horizontal scroll at all 7 required breakpoints (320, 375, 414, 768, 1024, 1280, 1920px)

---

## Scoring Rationale

- **Performance (60/100):** Major deduction for CDN font dependency + missing self-hosted fonts. JS loading, hero gradient, and CSS architecture are all correct.
- **Responsive (70/100):** Deduction for touch target sizes below spec minimum. Otherwise solid — fluid type, responsive grids, working mobile nav.
- **Overall (65/100):** Functional site that violates the self-hosting mandate and undershoots touch targets. Brand implementation (colors, typography roles, spacing scale, SVG icons) is otherwise faithful to the kit.
