# ACCESSIBILITY Review - 02-spotlight-projector-4 (Wave 4)

## Contrast Ratios

### Issues Found:

1. **Undefined `--color-muted` variable** — Elements using `var(--color-muted)` are effectively rendering without a defined color (the variable is never declared in base.css). The `.text-muted` class, hero subtitle, and feature card descriptions use this undefined variable. This could cause unpredictable contrast or invisible text in some browsers.

2. **Insufficient contrast for muted text** — Elements using `--color-soft-shadow-gray` (#3A3A3A) on black (#000):
   - `.feature-card p` — text on dark background
   - `.hero-sub` (if resolved to gray)
   - Footer column text
   - Contrast ratio: ~3.74:1 (fails WCAG AA 4.5:1 for normal text)

3. **Gold on black (large text only)** — `--color-gold-spotlight` (#F5C542) on black (#000) has contrast ratio 4.72:1. Passes for large text (18px+ or 14px bold), but FAILS for normal text (needs 4.5:1, this passes barely).

## Keyboard Navigation

- **Desktop**: All nav links, buttons, and interactive elements are reachable via Tab in logical order.
- **Mobile**: The hamburger toggle button is reachable; when opened, focus is correctly moved to the first nav link.
- **Escape key**: Closes mobile nav and returns focus to toggle button — correct behavior.
- No focus traps on desktop nav.

## ARIA Labels

- **Nav toggle**: `aria-label="Toggle navigation"`, `aria-expanded="false"`, `aria-controls="nav-menu"` — all present and correctly updated on toggle.
- **Nav links**: Proper anchor tags with meaningful text; `aria-current="page"` on Home link.
- **Logo link**: `aria-label="Phlix home"` on the logo anchor.
- **Decorative SVGs**: `aria-hidden="true"` correctly set on all icon SVGs.
- **Sections**: `aria-labelledby` attributes correctly reference heading IDs throughout.
- **Main content**: `tabindex="-1"` on `<main>` for skip link target.

## Mobile Nav Focus Trap

- **Focus trap implemented correctly** (main.js lines 32-47):
  - Listens for Tab keydown within nav menu
  - Traps focus by cycling: Shift+Tab on first element → last element, Tab on last element → first element
  - Works correctly with multiple focusable elements (links only in desktop nav)
- **No return focus to background**: When mobile nav is open, focus is correctly trapped within nav menu.

## Focus Visibility

- **`:focus-visible` style defined** (base.css lines 201-204): `outline: 2px solid var(--color-gold-spotlight); outline-offset: 2px;`
- **Gold outline on dark background** provides visible focus indicator
- **No fallback for browsers that don't support `:focus-visible`**: Older browsers would show no visible focus ring without a separate `:focus` rule.

## Overall Assessment

**FAIL** — The undefined `--color-muted` variable is a critical issue that could cause text to become invisible. Additionally, several text elements use `--color-soft-shadow-gray` (#3A3A3A) on black which fails WCAG AA contrast requirements (3.74:1 vs required 4.5:1 for normal text). The `--color-muted` variable must be defined, and contrast ratios should be verified/fixed for all text elements.

### Recommended Fixes:

1. Define `--color-muted` in base.css (e.g., `--color-muted: #B8B0A0;` or similar readable warm gray)
2. Change muted text elements to use colors with ≥4.5:1 contrast on dark backgrounds, OR lighten the background surfaces
3. Add `:focus` fallback style alongside `:focus-visible` for older browser compatibility
