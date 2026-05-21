# Visual/Brand Review — 04-portal-hub-1 (wave 1)

**Review date:** 2026-05-21
**Brand:** 04-portal-hub
**Variant:** 04-portal-hub-1 (Portal Hub V1 — Clean Tech Minimal)
**Reviewer:** Brand Compliance Check

---

## 1. Brand Color Compliance

### CSS Custom Properties (base.css:14-32)

| Token | Brand Value | Implemented | Status |
|-------|-------------|-------------|--------|
| `--color-neon-cyan` | #00E5FF | #00e5ff | PASS |
| `--color-midnight-blue` | #0A0F1F | #0a0f1f | PASS |
| `--color-white` | #FFFFFF | #fff | PASS |
| `--color-deep-navy` | #08101C | #08101c | PASS |
| `--color-soft-cyan` | #7FF6FF | #7ff6ff | PASS |
| `--color-magenta-pulse` | #FF00C8 | #ff00c8 | PASS |

**Result:** All colors match (case-insensitive hex values). Brand colors are correctly defined in CSS custom properties.

---

## 2. Font Compliance

### Fonts (base.css:35-38)

| Role | Brand Spec | Implementation | Status |
|------|-------------|-----------------|--------|
| Headline | Poppins SemiBold | `Poppins SemiBold` | PASS |
| Body | Inter Light | `Inter Light` | **FAIL** |
| UI | SF Pro Rounded | `SF Pro Rounded` | PASS |
| Code | IBM Plex Mono | `IBM Plex Mono` | PASS |

**Issue:** The `Inter Light` font is never loaded. The base variant (04-portal-hub) includes `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&display=swap')` in theme.css (line 4) to load Inter Light. Variant 1's CSS files have **no Google Fonts import at all**.

Without this import, `--font-body: 'Inter Light', 'Inter', system-ui, sans-serif` falls back to system fonts, which may not include Inter Light.

---

## 3. Layout Integrity

### Page Structure (index.html)

| Section | Present | Notes |
|---------|---------|-------|
| `<header class="site-header">` | Yes | Fixed positioning with glassmorphism |
| Hero section | Yes | Eyebrow + headline + subheadline + CTAs |
| Pitch section | Yes | 7 pitch bullet items with circular icons |
| Features grid | Yes | 8 feature cards |
| CTA section | Yes | Title + subtitle + buttons |
| Footer | Yes | 3-column link grid + tagline |

**Structural differences from base (04-portal-hub):**
- Header: base uses `position: sticky`; variant 1 uses `position: fixed`
- Header class: base uses `.nav-primary`; variant 1 uses `.container` inside `.site-header`
- Nav class: base uses `.nav-menu`; variant 1 uses `.main-nav ul`
- Feature grid: base has overview with pitch section; variant 1 has separate `.pitch-section` and `.features` sections
- Portal ring: variant 1 uses inline SVG logo; base uses a different `.portal-ring` element approach

**Assessment:** Layout is intact. All sections render. Wave 1 introduced structural changes that deviate from the base but maintain functional integrity.

---

## 4. Mobile Responsiveness

### Breakpoints (theme.css:110-145, 737-754)

**Header/Mobile menu (line 110):**
- Uses `width <= 768px` media query
- Menu toggle hidden on desktop, shown on mobile
- Mobile nav uses `position: fixed` with `transform: translateY(-100%)` / `is-open` class pattern

**Hero responsive (line 739-744):**
- Reduced header height for mobile
- Hero padding adjusted via `calc(var(--header-height) + var(--space-2xl))`

**CTA buttons (line 746-754):**
- Flex direction column
- Buttons get `width: 100%; max-width: 280px`

**Features grid (line 259-261):**
- Uses `grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))`
- Cards will wrap on smaller screens

**Assessment:** Mobile styles exist. However, only one breakpoint (768px) is used. The buttons' `min-width: 140px` from base.css (line 209) is not overridden in the mobile query — buttons will never be narrower than 140px even on small screens where `max-width: 280px` should allow smaller buttons.

---

## 5. Additional Findings

### Tagline Mismatch
- **Brand kit tagline:** "Stream Everything."
- **index.html line 14:** `<title>Phlix - Stream Everything.</title>` — PASS
- **index.html line 116:** `Your media. Your library. Your Phlix.` — Uses different headline

The brand spec defines `tagline_primary: "Stream Everything."` as the primary tagline, but the hero headline does not use it. This may be intentional for the hero copy, but should be verified.

### Rotating Portal Ring
- **Brand header_motif:** "Rotating portal ring"
- **theme.css:53-67:** `@keyframes portal-rotate` animation defined, applied to `.portal-ring`
- **index.html:52-81:** Inline SVG with multiple concentric circles
- **Result:** PASS — motif is present and animated

### Selection Color Difference
- **variant 1 (base.css:181-184):** Background uses `--color-accent` (cyan)
- **base (base.css:196-199):** Background uses `--color-magenta-pulse` (magenta)

Not a brand spec violation since selection color isn't specified, but inconsistent between variants.

### CSS Spacing Scale Difference
- **variant 1:** Uses `--space-xs` through `--space-4xl` (4-step scale)
- **base:** Uses `--space-1` through `--space-24` (named after REM multiples)

Both define equivalent values, but the mismatch means CSS cannot be freely mixed between variants.

---

## Summary

| Category | Status |
|----------|--------|
| Brand Colors | PASS |
| Font Loading | **FAIL** — Inter Light not loaded |
| Font Stack Definitions | PASS |
| Layout Integrity | PASS |
| Mobile Responsiveness | PARTIAL — functional but limited breakpoint coverage |
| Header Motif (Portal Ring) | PASS |

---

## Required Fixes

1. **Add Google Fonts import** to variant 1's CSS to load Inter Light:
   ```css
   @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&display=swap');
   ```
   Should be added to `css/base.css` or `css/theme.css` before any rules that use Inter Light.

2. **Verify button sizing on mobile** — current `min-width: 140px` on `.btn` in theme.css may be too large for small screens.

---

*Review generated for wave 1 of 04-portal-hub-1 variant.*
