# Visual/Brand Review — 04-portal-hub-2 (Wave 2)

## Brand Kit Reference
**Variant:** 04-portal-hub-2 — Glassmorphism Focus
**Personality:** Futuristic, Clean, Digital, Sleek, Depth-focused
**UI Style:** Glassmorphism panels, frosted glass effects, transparent layers, blur backgrounds, depth through transparency
**Header Motif:** Portal pulse animation

### Brand Colors
| Token | Brand Value | Expected |
|-------|------------|----------|
| neon_cyan | #00E5FF | Primary accent |
| midnight_blue | #0A0F1F | Primary background |
| white | #FFFFFF | Text/inverse |
| deep_navy | #08101C | Secondary background |
| soft_cyan | #7FF6FF | Secondary text |
| magenta_pulse | #FF00C8 | Accent |

### Brand Fonts
| Role | Brand Value |
|------|-------------|
| headline | Poppins SemiBold |
| body | Inter Light |
| ui | SF Pro Rounded |
| code | IBM Plex Mono |

---

## 1. Brand Color Compliance

### CSS Variable Definitions (`base.css`)
All brand colors are correctly defined:
- `--color-neon-cyan: #00e5ff` ✅
- `--color-midnight-blue: #0a0f1f` ✅
- `--color-deep-navy: #08101c` ✅
- `--color-soft-cyan: #7ff6ff` ✅
- `--color-magenta-pulse: #ff00c8` ✅

### Usage Throughout CSS
Colors are consistently applied using CSS variables and matching hardcoded `rgb()` values. No warm colors (forbidden by brand), no serif font colors.

### Issue Found: `theme-color` Meta Tag
```html
<meta name="theme-color" content="#00D4FF" />
```
**Problem:** Uses `#00D4FF` instead of brand's `#00E5FF` (off by one hex digit).
**Severity:** Low — likely a typo, not an intentional deviation.

---

## 2. Font Compliance

### Font Loading (`base.css`)
Wave 2 uses self-hosted `@font-face` declarations instead of Google Fonts:
```css
@font-face {
  font-family: Poppins;
  font-weight: 600;
  src: local('Poppins SemiBold'), url('../fonts/poppins-semibold.woff2') format('woff2');
}
```
This is a deliberate architectural choice (self-hosted vs CDN) and is acceptable.

### CSS Variable Mapping
- `--font-headline`: 'Poppins', 'Segoe UI', system-ui, sans-serif ✅
- `--font-body`: 'Inter Light', 'Inter', system-ui, sans-serif ✅
- `--font-ui`: 'SF Pro Rounded', 'Inter', system-ui, sans-serif ✅
- `--font-code`: 'IBM Plex Mono', 'SF Mono', 'Consolas', monospace ✅

Typography inherits correctly — body uses `--font-body`, headings use `--font-headline`.

**Note:** The brand kit specifies `Poppins SemiBold` and `Inter Light` weights. Wave 2 correctly declares both via `@font-face` at those exact weights.

---

## 3. Layout Integrity

### Page Sections (All Present)
- ✅ Skip link (`<a class="skip-link">`)
- ✅ Header with nav-primary, nav-logo, nav-toggle, nav-menu
- ✅ Hero section with portal-grid, eyebrow, h1, sub, CTA buttons
- ✅ Pitch section with "Why Phlix?" heading and bullet list
- ✅ Features overview with 8 glass-card feature cards
- ✅ CTA banner with gradient-accent class
- ✅ Footer with footer-inner, footer-nav (3 columns), footer-copy

### HTML Structure
All sections use proper semantic elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`) and ARIA labels where appropriate.

### CSS Class Usage
- `glass-card` class properly applied to `feature-card` elements ✅
- Portal-grid animation (`.portal-grid`, `.portal-grid::before`, `.portal-grid::after`, `.portal-grid-center`) is present and unique to wave 2 ✅
- `gradient-accent` class on CTA banner ✅

### Comparison with Wave 1 (Base)
Wave 2's layout is identical in structure to wave 1. The visual differences are purely CSS-driven (glassmorphism, animations, shadows).

---

## 4. Mobile Responsiveness

### Breakpoints Used
Wave 2 defines mobile styles at `width <= 768px` in `theme.css`:

| Element | Mobile Behavior |
|---------|----------------|
| `.nav-toggle` | `display: block` ✅ |
| `.nav-menu` | `display: none` by default, `.is-open` shows flex column ✅ |
| `.hero` | `padding: var(--space-16) 0` (reduced from space-24) ✅ |
| `.pitch-bullets` | `grid-template-columns: 1fr` ✅ |
| `.footer-nav` | `grid-template-columns: 1fr`, `text-align: center` ✅ |
| `.feature-detail` | `grid-template-columns: 1fr` (stacks icon above text) ✅ |

### Accessibility Considerations
- ✅ `aria-expanded` toggled on nav toggle
- ✅ Focus trap in mobile nav (wave 2 improves on wave 1)
- ✅ `prefers-reduced-motion` respected throughout

### Potential Issue
The mobile nav menu positioning uses `position: absolute` relative to `.nav-primary`. However, `.nav-primary` does not have `position: relative` set. This could cause the mobile nav to position relative to a different ancestor.
```css
/* theme.css line 746-750 */
.nav-menu {
  display: none;
  position: absolute;  /* No relative parent defined on .nav-primary */
  top: 100%;
  left: 0;
  right: 0;
  ...
}
```
**Severity:** Low — likely still works due to z-index stacking context, but not robust.

---

## 5. Wave 2 Specific Changes (vs Wave 1)

### Visual Differentiation
Wave 2 successfully differentiates itself from wave 1 through:

| Feature | Wave 1 (Clean Tech Minimal) | Wave 2 (Glassmorphism Focus) |
|---------|------------------------------|-------------------------------|
| Glass panels | None | `backdrop-filter: blur()`, `rgb(127, 246, 255, 0.08)` glass |
| Grid background | None | Subtle cyan grid overlay on body |
| Hero animation | Portal ring SVG | Animated portal-grid with concentric circles |
| Shadow style | Solid shadows | Glass shadows with inset highlight + outer glow |
| Card hover | Border color + translateY | Border color + glass-hover + glow shadow |
| Scroll reveal | Basic fade-up | Same, but wave 2 adds glassmorphism depth tilt effect on mousemove |
| CTA gradient | Linear gradient 135deg | Animated gradient-shift with larger background |

### JavaScript Enhancements
Wave 2 adds:
- Portal grid parallax effect (mousemove-based 3D rotation) ✅
- Glassmorphism depth tilt on cards (mousemove-based perspective) ✅

These are appropriate additions for the "Glassmorphism Focus" variant and align with the brand's "depth through transparency" design principle.

---

## Summary

| Category | Status | Notes |
|----------|--------|-------|
| Color compliance | ⚠️ Minor issue | theme-color meta is #00D4FF instead of #00E5FF |
| Font compliance | ✅ Pass | Correct fonts, weights, and fallbacks |
| Layout integrity | ✅ Pass | All sections present, semantic HTML |
| Mobile responsiveness | ✅ Pass | Breakpoints work correctly, one minor positioning concern |
| Wave differentiation | ✅ Pass | Clearly distinct from wave 1, glassmorphism properly implemented |

### Issues Found
1. **`theme-color` meta tag** — Uses `#00D4FF` instead of brand's `#00E5FF` (likely typo)
2. **Mobile nav positioning** — `.nav-primary` missing `position: relative` to anchor absolute child

### Recommendation
Fix the `theme-color` meta tag value. The mobile nav issue is likely harmless due to z-index but should be hardened for robustness.
