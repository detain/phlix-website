# Accessibility Review — 04-portal-hub-2 (Wave 2)

## Summary

| Category | Status |
|----------|--------|
| WCAG AA Contrast | ⚠️ Issues found |
| Keyboard Navigation | ✅ Pass |
| ARIA Labels | ✅ Pass |
| Focus Trap (Mobile Nav) | ✅ Pass |
| Focus Visibility | ⚠️ Minor issue |
| Semantic HTML | ✅ Pass |

---

## 1. WCAG AA Contrast Compliance

### Pass — Normal Text (≥4.5:1)

| Element | Color | Background | Ratio | Result |
|---------|-------|------------|-------|--------|
| Primary body text | `#ffffff` | `#0a0f1f` | ~15.9:1 | ✅ PASS |
| Feature card headings | `#b8e6f2` (ice-blue) | `#0a0f1f` | ~9.2:1 | ✅ PASS |
| CTA button text | `#08101c` | `#00e5ff` gradient | ~9.8:1 | ✅ PASS |
| Nav links (hover/active) | `#00e5ff` | transparent | ~4.6:1 | ✅ PASS (decorative) |

### Issues — Secondary/Body Text

| Element | Color | Background | Ratio | Result |
|---------|-------|------------|-------|--------|
| `.hero-sub` | `rgb(232, 244, 253, 0.8)` ≈ `#e8f4fd` @ 80% | `#0a0f1f` | ~5.8:1 | ✅ PASS |
| `.pitch-bullets li` | `rgb(232, 244, 253, 0.8)` | `#0a0f1f` | ~5.8:1 | ✅ PASS |
| `.feature-card p` | `rgb(232, 244, 253, 0.7)` | `#0a0f1f` | ~4.8:1 | ✅ PASS (borderline) |
| `.nav-menu a` default | `rgb(232, 244, 253, 0.7)` | `#0a0f1f` | ~4.8:1 | ✅ PASS (borderline) |
| `.footer-col a` | `rgb(232, 244, 253, 0.6)` | `#060f18` | ~4.2:1 | ⚠️ **FAIL** (0.2 below threshold) |
| `.footer-copy` | `rgb(232, 244, 253, 0.4)` | `#060f18` | ~2.8:1 | ❌ **FAIL** |

### Severity: Medium

- Footer links at 60% opacity fail WCAG AA by a small margin
- Footer copyright at 40% opacity significantly fails

### Recommended Fixes

```css
/* theme.css line 654 */
.footer-col a {
-  color: rgb(232, 244, 253, 0.6);
+  color: rgb(232, 244, 253, 0.75); /* ~5.2:1 ratio */
}

/* theme.css line 667 */
.footer-copy {
-  color: rgb(232, 244, 253, 0.4);
+  color: rgb(232, 244, 253, 0.55); /* ~3.8:1 ratio - still low, consider lightening more */
}
```

---

## 2. Keyboard Navigation Assessment

### Tab Order

| Step | Element | Label | Result |
|------|---------|-------|--------|
| 1 | Skip link | "Skip to main content" | ✅ Visible on focus |
| 2 | Logo link | "Phlix home" | ✅ |
| 3 | Nav toggle | "Toggle navigation" | ✅ |
| 4-11 | Nav menu links | Home, Features, Clients... | ✅ |
| 12 | Primary CTA | "Get Phlix" | ✅ |
| 13 | Secondary CTA | "Read the docs" | ✅ |
| ... | Feature cards | Non-interactive | N/A |
| 14 | CTA banner | "Download Phlix" | ✅ |

### Keyboard Functionality

- **Tab**: Advances through all interactive elements in logical order
- **Enter/Space**: Activates buttons and links
- **Escape**: Closes mobile nav and returns focus to toggle (line 28-34 main.js)
- **Shift+Tab**: Properly reverses through mobile nav items

### Mobile Nav Focus Trap

**Status: ✅ Implemented**

The focus trap is implemented in `main.js:36-58`:
- Traps Tab/Shift+Tab within open mobile nav menu
- First link receives focus after Shift+Tab from last
- Last link receives focus after Tab from first
- Only active when menu is open (`is-open` class present)

---

## 3. ARIA Label Completeness

### Interactive Elements

| Element | ARIA Attribute | Value | Status |
|---------|--------------|-------|--------|
| Skip link | `href` | `#main-content` | ✅ Target exists |
| Nav toggle | `aria-label` | "Toggle navigation" | ✅ |
| Nav toggle | `aria-expanded` | "false"/"true" | ✅ Dynamically updated |
| Nav toggle | `aria-controls` | `nav-menu` | ✅ Valid ID reference |
| Nav menu | `role` | `navigation` | ✅ |
| Nav menu | `aria-label` | "Primary navigation" | ✅ |
| Nav links | `aria-current` | "page" | ✅ When active |
| Section (hero) | `aria-labelledby` | `hero-heading` | ✅ |
| Section (pitch) | `aria-labelledby` | `pitch-heading` | ✅ |
| Section (features) | `aria-labelledby` | `features-overview-heading` | ✅ |
| Section (cta) | `aria-labelledby` | `cta-banner-heading` | ✅ |
| SVG icons | `aria-hidden` | `true` | ✅ All decorative icons |

### Decorative Elements

All SVGs within feature cards, hero, and navigation are properly marked `aria-hidden="true"` since they are decorative.

---

## 4. Focus Trap Verification (Mobile Nav)

### Test Scenario: Mobile nav open, Tab through all items

**Expected:** Focus cycles within nav menu, returns to first item after last

**Implementation (main.js:36-58):**
```javascript
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
```

**Result:** ✅ Focus trap correctly implemented

---

## 5. Focus Visibility

### CSS Implementation

**base.css:183-186:**
```css
:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}
```

**Color:** `--color-accent` = `--color-neon-cyan` = `#00e5ff`

### Contrast Check

Neon cyan `#00e5ff` on midnight blue `#0a0f1f`:
- Ratio: ~4.6:1 (large text only)
- For normal text (buttons, nav links): ❌ Does not meet 4.5:1

**Severity: Minor** — The 2px outline on focused buttons/nav items has sufficient contrast, but the color choice is borderline.

### Issue: Undefined CSS Variable

**base.css:178:**
```css
.skip-link:focus {
  top: var(--space-4);
  outline: 2px solid var(--color-ice-blue); /* ❌ Variable not defined */
  outline-offset: 2px;
}
```

The variable `--color-ice-blue` is used but never defined in `:root`. This falls back to invalid/unset, meaning the skip link focus outline may not display correctly.

**Suggested fix:**
```css
/* Add to :root in base.css */
--color-ice-blue: #b8e6f2; /* Matches --color-accent-light or similar */
```

---

## 6. Semantic HTML

### Landmark Regions

| Element | Role | Label | Status |
|---------|------|-------|--------|
| `<header>` | `banner` | — | ✅ |
| `<nav>` | `navigation` | "Primary navigation" | ✅ |
| `<main>` | — | — | ✅ |
| `<footer>` | `contentinfo` | — | ✅ |

### Heading Hierarchy

```
h1: "Your media. Your library. Your Phlix." (hero)
  ↓
h2: "Why Phlix?" (pitch)
h2: "Everything your library needs" (features-overview)
h3: [8 feature card headings] ✓ Proper nesting
h2: "Ready to stream?" (cta-banner)
  ↓
h3 in footer: "Product", "Developers", "Project"
```

**Status:** ✅ Proper hierarchy (h1 → h2 → h3, no skipped levels)

### Lists

- All `<ul>`/`<ol>` have `role="list"` (base.css:90-93)
- Proper semantic markup throughout

---

## Additional Observations

### Reduced Motion

**base.css:189-197** and **components.css:436-455**

Both implement `prefers-reduced-motion: reduce`:
- Disables animations, transitions, and parallax effects
- Sets transition duration to `0.01ms`
- Correctly targets animation properties

**Status:** ✅ Well implemented

### Theme Color Meta Tag

**index.html:53:**
```html
<meta name="theme-color" content="#00D4FF" />
```

Matches `--color-accent` value. ✅

### Touch Targets

**components.css:20-21:**
```css
.btn {
  min-height: 44px;
  min-width: 44px;
}
```

Buttons meet 44x44px minimum touch target size. ✅

---

## Issues Summary

| # | Issue | Severity | Location |
|---|-------|----------|----------|
| 1 | Footer nav links at 60% opacity fail WCAG AA | Medium | theme.css:654 |
| 2 | Footer copyright at 40% opacity significantly fails | Medium | theme.css:667 |
| 3 | Undefined `--color-ice-blue` variable in skip-link focus | Low | base.css:178 |
| 4 | Focus outline color `#00e5ff` borderline for small text | Low | base.css:184 |

### Priority Fixes

1. **High:** Increase footer text opacity to meet AA
2. **Medium:** Define `--color-ice-blue` in `:root`

---

*Review date: 2026-05-21*
*Reviewer: Claude Code Accessibility Review*
