# Wave 2 Fixes - Portal Hub V2 (04-portal-hub-2)

**Date:** 2026-05-21

## Fixes Applied

### 1. Font Families Updated to Brand Kit Spec (CRITICAL)

**Files:** `variants/04-portal-hub-2/css/base.css`

**Issue:** Used Space Grotesk and DM Sans instead of brand kit fonts (Poppins, Inter Light, SF Pro Rounded)

**Fix:** Replaced font declarations with brand kit fonts:
- Headlines: Poppins SemiBold
- Body: Inter Light
- UI: SF Pro Rounded (via CSS variable)

```css
/* Before */
--font-headline: 'Space Grotesk', ...;
--font-body: 'DM Sans', ...;
--font-ui: 'DM Sans', ...;

/* After */
--font-headline: 'Poppins', 'Segoe UI', system-ui, sans-serif;
--font-body: 'Inter Light', 'Inter', system-ui, sans-serif;
--font-ui: 'SF Pro Rounded', 'Inter', system-ui, sans-serif;
```

---

### 2. Color Values Corrected to Brand Kit Spec (CRITICAL)

**Files:** `variants/04-portal-hub-2/css/base.css`, `theme.css`, `components.css`

**Issue:** Used #00d4ff and #0a1628 instead of brand kit #00e5ff and #0a0f1f

**Fix:** Updated all hardcoded color values:
- neon_cyan: #00E5FF (was #00d4ff)
- midnight_blue: #0A0F1F (was #0a1628)
- deep_navy: #08101C (correct, kept)
- soft_cyan: #7FF6FF (correct, kept)

Also updated all `rgb(0, 212, 255` to `rgb(0, 229, 255` to match the exact brand color.

---

### 3. Mobile Nav Focus Trap Added (MEDIUM)

**File:** `variants/04-portal-hub-2/js/main.js`

**Issue:** Mobile navigation lacked focus trap, breaking keyboard navigation

**Fix:** Added focus trap logic to cycle Tab/Shift+Tab through nav links when menu is open:

```javascript
// Focus trap for mobile nav
const navLinks = navMenu.querySelectorAll('a');
if (navLinks.length > 0) {
  navMenu.addEventListener('keydown', function (e) {
    if (e.key !== 'Tab') return;
    if (!navMenu.classList.contains('is-open')) return;

    const firstLink = navLinks[0];
    const lastLink = navLinks[navLinks.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === firstLink) {
        e.preventDefault();
        lastLink.focus();
      }
    } else {
      if (document.activeElement === lastLink) {
        e.preventDefault();
        firstLink.focus();
      }
    }
  });
}
```

---

## Verification

- Build: Passes after fixes
- Lint: Passes after fixes (for wave 2 files)
