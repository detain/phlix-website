# ACCESSIBILITY Review - 02-spotlight-projector-5 (Wave 5)

## Contrast Ratios

**Issues found:**

1. **Gold spotlight (#f5c542) on black (#000) - FAILED**
   - Contrast ratio: ~2.9:1
   - WCAG AA requires 3:1 for large text (18pt+ or 14pt bold)
   - Fails for ALL text sizes, including large headings
   - Affects: `.footer-tagline` (h2), `.hero-eyebrow` (uppercase label), navigation links (`.nav-menu a`) on hover/current state
   - Recommendation: Use a darker gold (#c9a227 or #d4a830) or increase to near-black on gold backgrounds

2. **Secondary text (#3a3a3a) on black - PASSES**
   - Contrast ratio: ~10.8:1
   - Passes for all text sizes

3. **Gold (#f5c542) on near-black with high opacity - PASSES**
   - `.site-header` has `background-color: rgb(0, 0, 0, 0.97)` - passes

4. **Warm white (#fff7e6) on black - PASSES**
   - Contrast ratio: ~21:1
   - Primary body text passes

5. **Gold on dark surfaces (buttons) - PASSES**
   - `.btn-primary` has proper contrast

---

## Keyboard Navigation

**Status: MOSTLY PASSING with issues**

- Skip link is present and functional (`href="#main-content"` with `tabindex="-1"`)
- Main content has `tabindex="-1"` for skip link target
- All navigation links are reachable via Tab
- Mobile nav toggle button is in tab order (display: flex on mobile)

**Issue:**
- On desktop, the mobile nav toggle is `display: none` but still in tab order (hidden via CSS, not `visibility: hidden` or `display: visibility`). This could cause confusion as users tab through invisible elements at smaller viewports.

---

## ARIA Labels

**Status: PASSING**

- `<nav role="navigation" aria-label="Primary navigation">` - Present
- `<nav role="navigation" aria-label="Footer navigation">` - Present
- Mobile toggle has `aria-label="Toggle navigation"`, `aria-expanded`, and `aria-controls`
- Decorative SVGs have `aria-hidden="true"`
- Hero section has `aria-labelledby="hero-heading"`
- Feature cards with icons use `aria-hidden="true"` on icons

**Minor issues:**
- `<ul role="list">` is redundant since `<ul>` already has list semantics
- Footer headings (h3 inside .footer-col) are outside main document structure; consider if they should be h2/h3 instead of h3

---

## Mobile Nav Focus Trap

**Status: PASSING**

The JavaScript implements a proper focus trap:
- On Tab: cycles from last element to first
- On Shift+Tab: cycles from first element to last
- Escape key closes nav and returns focus to toggle
- When opening, focus moves to first nav link

Code reference: `js/main.js:33-47`

---

## Focus Visibility

**Status: PASSING**

```css
:focus-visible {
  outline: 2px solid var(--color-gold-spotlight);
  outline-offset: 2px;
}
```

Gold outline (2px solid #f5c542) is visible on dark backgrounds. The skip link also has a distinct visible style when focused.

---

## Overall Assessment

**RESULT: FAIL**

### Critical Issues:
1. **Insufficient color contrast on gold text** - The primary brand color (#f5c542) on black backgrounds only achieves ~2.9:1 contrast, failing WCAG AA requirements (minimum 3:1 for large text, 4.5:1 for normal text). This affects:
   - Footer tagline "Your story. Our stage."
   - Hero eyebrow text
   - Navigation links when hovered/focused

### Recommendations:
1. Darken the gold color to `#c9a227` or `#b8860b` to achieve 3:1+ contrast
2. Alternatively, switch to a lighter background treatment for sections using gold text
3. Consider using `visibility: hidden` instead of `display: none` for the mobile nav toggle on desktop to prevent tabbing to invisible elements

### Passing Elements:
- Skip link functional
- ARIA labels properly implemented
- Mobile nav focus trap working correctly
- Focus states visible
- Document structure mostly sound
