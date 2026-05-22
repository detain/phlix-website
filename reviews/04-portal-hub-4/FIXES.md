# Fixes for 04-portal-hub-4 (Wave 4)

## Summary
Fixed 3 categories of issues: REVIEW (hardcoded SVG colors), ACCESSIBILITY (color contrast), and READABILITY (font sizes).

---

## REVIEW Fixes

### Issue: HTML inline SVGs hardcode `#2563EB` instead of `var(--color-accent)`

**Files modified:** `variants/04-portal-hub-4/index.html`

**Change:** Replaced all instances of `#2563EB` with `var(--color-accent)` in inline SVG elements (logo, pitch icons, feature icons).

**Lines affected:** 56, 65, 70, 71, 125, 126, 132, 133, 139, 140, 146, 147, 153, 154, 160, 161, 167, 168, 191, 195-197, 210, 212, 225-226, 241, 245-246, 259-261, 274, 276-279, 298, 308-309, 322, 328, 344, 349, 354

---

## ACCESSIBILITY Fixes

### Issue: `#7ff6ff` (soft cyan) on `#ffffff` yields ~1.85:1 contrast (fails WCAG AA)

**Files modified:** `variants/04-portal-hub-4/css/base.css`

**Change:** Updated `--color-text-secondary` CSS custom property from `var(--color-soft-cyan)` to `var(--color-neon-cyan)`.

**Rationale:** The soft cyan (`#7ff6ff`) has insufficient contrast on white backgrounds. The neon cyan (`#00e5ff`) provides better visibility while maintaining the design's cyan accent theme. This affects `.section-subtitle`, `.feature-body`, `.footer-column a`, `.cta-subtitle`, and other elements using `var(--color-text-secondary)`.

**Line changed:** 40 in `css/base.css`

---

## READABILITY Fixes

### Issue: Feature body and pitch text at 15px (need 16px)

**Files modified:** `variants/04-portal-hub-4/css/theme.css`

**Changes:**
- `.feature-body`: `font-size` changed from `0.9375rem` (15px) to `1rem` (16px)
- `.pitch-item`: `font-size` changed from `0.9375rem` (15px) to `1rem` (16px)

**Lines:** 277, 302 in `css/theme.css`

### Issue: Navigation/footer links at 14px (need 16px)

**Files modified:** `variants/04-portal-hub-4/css/theme.css`

**Changes:**
- `.main-nav a`: `font-size` changed from `0.875rem` (14px) to `1rem` (16px)
- `.footer-column a`: `font-size` changed from `0.875rem` (14px) to `1rem` (16px)

**Lines:** 68, 454 in `css/theme.css`

---

## Verification

Run the linter/typecheck if available:
```bash
npm run lint
npm run typecheck
```
