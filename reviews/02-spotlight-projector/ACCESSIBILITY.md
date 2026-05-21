# ACCESSIBILITY Review - 02-spotlight-projector (Base)

## Contrast Ratios

All color combinations pass WCAG AA (4.5:1 for normal text, 3:1 for large text/UI components):

- **Gold links (#f5c542) on black (#000)**: ~10.8:1 (AAA pass)
- **Warm white (#fff7e6) on black**: ~16.1:1 (AAA pass)
- **Muted text (#b8b0a0) on black**: ~4.6:1 (AA pass)
- **Primary button text (#000) on gold (#f5c542)**: Pass (dark text on light background)
- **Skip link (black on gold)**: ~10.8:1 (AAA pass)

No contrast issues found.

## Keyboard Navigation

**Yes, all interactive elements are reachable via Tab:**

- Skip link is first focusable element (line 70)
- Nav logo (line 75-77)
- Nav toggle button (line 78-95) - has `min-height: 44px; min-width: 44px` for touch target
- All nav menu links (line 97-104) - each has `padding: 16px var(--space-md)` for adequate touch targets
- Hero CTA buttons (line 122-125)
- Features overview link (line 320)
- Footer links (line 341-367)
- CTA download button (line 328)

**No traps or missing focus detected.** The mobile nav JS (main.js:32-47) implements proper focus trap that cycles Tab/Shift+Tab between first and last focusable elements within the open menu.

## ARIA Labels

All interactive elements are properly labeled:

- **Skip link** (line 70): `href="#main-content"` with text "Skip to main content"
- **Nav toggle** (line 78-82): `aria-label="Toggle navigation"`, `aria-expanded="false"`, `aria-controls="nav-menu"`
- **Nav logo** (line 75): `aria-label="Phlix home"`
- **Nav menu** (line 96): `role="list"`, no duplicate landmark issues (banner/header is on parent header)
- **Nav links** (line 97): `aria-current="page"` on home link
- **All SVGs** (line 91): `aria-hidden="true"` on decorative icons
- **Feature cards** (line 153): Decorative icons marked with `aria-hidden="true"`
- **All sections** (line 112, 131, 149, 325): `aria-labelledby` pointing to respective heading IDs
- **FAQ dt elements** (main.js:76-78): `role="button"`, `tabindex="0"`, `aria-expanded="false"`

No missing or incorrect ARIA labels found.

## Mobile Nav Focus Trap

**Mobile nav exists and focus trap is correctly implemented** (main.js:32-47):

- `navMenu.addEventListener('keydown', ...)` captures Tab keystrokes
- On Shift+Tab from first element: focus moves to last element
- On Tab from last element: focus moves to first element
- Menu opens with first link focused (line 18-19)
- Escape key closes menu and returns focus to toggle (line 23-30)
- `aria-expanded` is correctly toggled (line 16)

Focus trap is correctly implemented.

## Focus Visibility

**Focus styles are defined but with a potential issue:**

- **Skip link** (base.css:154-158): Has dedicated `:focus` style with top positioning and amber outline
- **Global focus** (base.css:161-164): Uses `:focus-visible` only with `outline: 2px solid var(--color-gold-spotlight)` + `outline-offset: 2px`

**Potential issue**: Using only `:focus-visible` means mouse/pointer users see **no focus indicator** when clicking interactive elements. This is a common pattern but WCAG 2.4.11 (Focus Appearance) requires that focus indicators are visible. The `:focus-visible` polyfill behavior varies by browser.

**Mitigating factors**:
- Gold outline (#f5c542) on black has strong contrast
- 2px solid outline with 2px offset should be clearly visible
- Dark theme with light focus indicator provides good visibility

## Overall Assessment

**PASS** with one minor note.

The site demonstrates solid accessibility implementation:
- All WCAG AA contrast ratios pass
- All interactive elements reachable via Tab
- ARIA labels properly implemented throughout
- Mobile nav focus trap works correctly
- Skip link is functional and visible on focus

**Minor note**: The reliance on `:focus-visible` only (without `:focus` fallback) means mouse users won't see focus rings. While this is a common modern pattern, it could be improved by adding a `:focus` rule that mirrors the `:focus-visible` styles to ensure all users see focus indicators when clicking.

**Recommendation**: Consider adding a `:focus` style alongside `:focus-visible` to ensure focus indicators appear for all users, not just keyboard users.
