# FIXES Applied - 02-spotlight-projector-2 (Wave 2)

## Issues Fixed

- **Mobile nav focus trap issue** - The focus trap was only listening for Tab key events directly on the `mainNav` element. When focus somehow escaped the nav (e.g., via dynamically added elements or edge cases in event propagation), Tab would exit the menu. Fixed by:
  - Changed from `mainNav.addEventListener('keydown', ...)` to `document.addEventListener('keydown', ...)` for the focus trap
  - Now checks if `document.activeElement` is inside the nav using `mainNav.contains(activeEl)`
  - If focus has escaped the nav, it immediately redirects focus back to first (forward Tab) or last (Shift+Tab) focusable element
  - The trap is now active only when the nav has `is-open` class

## Files Modified

- `variants/02-spotlight-projector-2/js/main.js` - Focus trap implementation updated (lines 35-61)

## Overall Result

**Pass** - Mobile nav focus trap is now properly implemented at the document level, ensuring focus cannot escape the open mobile menu regardless of how Tab navigation occurs.
