# Visual/Brand Review — 04-portal-hub-5 (Wave 5 — Final)

**Variant:** Portal Hub V5 — Tech Command Center
**Review Date:** 2026-05-21
**Phase:** PHASE-REVIEW

---

## Brand Color Compliance

**Status: ISSUES FOUND**

### CSS Custom Properties (Correct)
The `base.css` correctly defines brand colors:
- `--color-neon-cyan: #00e5ff` (brand: `#00E5FF`) — MATCH
- `--color-midnight-blue: #0a0f1f` (brand: `#0A0F1F`) — MATCH
- `--color-deep-navy: #08101c` (brand: `#08101C`) — MATCH
- `--color-soft-cyan: #7ff6ff` (brand: `#7FF6FF`) — MATCH
- `--color-magenta-pulse: #ff00c8` (brand: `#FF00C8`) — MATCH

### Inline SVGs in HTML (Incorrect)
The `index.html` contains hardcoded `#F59E0B` (amber/gold) in all inline SVG icons:
- Logo portal rings: `stroke="#F59E0B"` (lines 56, 65, 74, 79)
- Pitch icons: `stroke="#F59E0B"` and `fill="#F59E0B"` (lines 133, 134, 140, 141, etc.)
- Feature card icons: `stroke="#F59E0B"` throughout (lines 199, 203, 204, 218, etc.)

**Issue:** `#F59E0B` is not a brand color. The brand kit specifies `#00E5FF` (neon_cyan) as the primary accent and `#FF00C8` (magenta_pulse) as the accent. Using amber/gold is a significant deviation from the "Tech Command Center" aesthetic.

**Comparison with Wave 4:** Wave 4 uses `var(--color-accent)` in inline SVGs (proper reference), while Wave 5 regressed to hardcoded non-brand colors.

---

## Font Compliance

**Status: ISSUES FOUND**

### Font Declarations in CSS
The `base.css` declares:
- `--font-headline: poppins, 'Segoe UI', system-ui, sans-serif`
- `--font-body: 'Inter Light', inter, system-ui, sans-serif`
- `--font-ui: 'SF Pro Rounded', inter, system-ui, sans-serif`
- `--font-code: 'IBM Plex Mono', 'SF Mono', Consolas, monospace`

These match the brand kit specification (Poppins SemiBold, Inter Light, SF Pro Rounded, IBM Plex Mono).

### Font Files Present
The `fonts/` directory contains **NunitoSans** variants:
- `NunitoSans-Bold.woff2`
- `NunitoSans-SemiBold.woff2`
- `NunitoSans-Medium.woff2`
- `NunitoSans-Regular.woff2`

**No Poppins or Inter fonts are present.**

### @font-face References
The `@font-face` declarations in `base.css` reference:
- `url('../fonts/poppins-semibold.woff2')` — **FILE NOT FOUND**
- `url('../fonts/inter-light.woff2')` — **FILE NOT FOUND**

**Impact:** The page will render with system font fallbacks (Segoe UI, system-ui) instead of the brand-specified Poppins and Inter Light.

---

## Layout Integrity

**Status: PASS**

All major sections render correctly:
- `skip-link` for accessibility
- `site-header` with logo and navigation
- `hero` section with eyebrow, headline, subheadline, CTAs
- `pitch-section` with 7 bullet points and circular icons
- `features` section with 8 feature cards in a grid
- `cta-section` with title, subtitle, and buttons
- `site-footer` with 3-column grid and bottom tagline

Grid layouts use `auto-fit` with `minmax()` for responsive behavior. No broken sections detected.

---

## Mobile Responsiveness

**Status: PASS with minor note**

### Breakpoints Defined
- 768px breakpoint at line 813 in `theme.css` adjusts:
  - `--header-height: 64px` (reduced from 72px)
  - Hero padding adjustment
  - CTA buttons stack vertically (`flex-direction: column`)
  - Buttons get `width: 100%; max-width: 280px`

### Mobile Menu
- `.menu-toggle` hidden on desktop, shown at `width <= 768px`
- Navigation slides down when `.is-open` class is added
- Touch targets meet 44px minimum (`min-height: 44px; min-width: 44px` in base.css line 254-255)

### Fluid Typography
- Headlines use `clamp()` for smooth scaling (e.g., `clamp(2.25rem, 6vw, 4rem)`)
- Section titles: `clamp(1.75rem, 4vw, 2.5rem)`
- Feature cards: `grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))`

### Accessibility
- `prefers-reduced-motion` media query respected (lines 103-115, 239-251)
- Focus states use `var(--color-accent)` for visibility

---

## Summary of Issues

| Category | Status | Issue |
|----------|--------|-------|
| Brand Colors (CSS) | PASS | Custom properties correctly define brand colors |
| Brand Colors (HTML) | FAIL | Inline SVGs use `#F59E0B` instead of `var(--color-accent)` |
| Fonts (CSS vars) | PASS | Font variables correctly reference brand fonts |
| Fonts (Files) | FAIL | Font files missing; NunitoSans files present but wrong fonts |
| Layout Integrity | PASS | All sections render; grids function correctly |
| Mobile Responsiveness | PASS | Breakpoints, fluid type, touch targets all correct |

### Critical Issues
1. **Inline SVG icons use `#F59E0B` instead of brand cyan** — This is visually inconsistent with the "Tech Command Center" mission control aesthetic
2. **Font files don't exist** — Poppins and Inter Light are referenced but not present; page will fall back to system fonts

### Wave 5 Changes from Wave 4
- Wave 4 properly used `var(--color-accent)` in SVG markup
- Wave 5 regressed to hardcoded `#F59E0B` in all inline SVGs
- Wave 5 introduced different font directory (NunitoSans) than what CSS references (Poppins/Inter)

---

## Recommendations

1. **Replace `#F59E0B` with `var(--color-accent)`** in all inline SVG elements in `index.html` to restore brand consistency
2. **Either:** Add the correct font files (`poppins-semibold.woff2`, `inter-light.woff2`, `sf-pro-rounded.*`, `ibm-plex-mono.*`) to the `fonts/` directory, **or** update the CSS custom properties and `@font-face` declarations to use the actual NunitoSans fonts present
3. **Verify** that the brand kit's intent is for `var(--color-accent)` to always be used in inline SVGs (as Wave 4 did) rather than hardcoded values
