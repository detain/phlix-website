# ACCESSIBILITY Review - 02-spotlight-projector-3 (Wave 3)

## Contrast Ratios

**CRITICAL FAILURE - Muted text on dark background:**
- `--color-muted: #3a3a3a` (gray) on `--color-deep-black: #000` background
- Calculated contrast ratio: ~2.88:1
- **WCAG AA requires minimum 4.5:1 for normal text**
- Affected elements:
  - `.hero-sub` (hero subtitle text)
  - `.pitch-bullets li` (pitch section bullet text)
  - `.feature-card p` (feature card descriptions)
  - `.cta-banner p` (CTA banner text)
  - `.footer-col a` (footer navigation links)
  - `.footer-copy` (copyright text)

**Passing contrast ratios:**
- `--color-gold-spotlight: #f5c542` on `#000`: ~11.3:1 (PASS)
- `--color-warm-white: #fff7e6` on `#000`: ~17.7:1 (PASS)
- Button text uses gold on black: ~11.3:1 (PASS)

## Keyboard Navigation

**Pass - All interactive elements reachable:**
- Skip link present and functional (line 77 in HTML, lines 179-199 in base.css)
- Logo links to home
- Primary navigation links are keyboard accessible
- Nav toggle button is keyboard accessible
- All CTA buttons are keyboard accessible
- Footer links are keyboard accessible

**No keyboard traps found** - logical tab order throughout.

## ARIA Labels

**Pass - Interactive elements properly labeled:**
- `<nav aria-label="Primary navigation">` on header nav
- `<nav aria-label="Footer navigation">` on footer nav
- Nav toggle: `aria-label="Toggle navigation"`, `aria-expanded="false"`, `aria-controls="nav-menu"`
- Nav menu items: `aria-current="page"` on home link
- Hero: `aria-labelledby="hero-heading"`
- All sections have `aria-labelledby` pointing to their heading
- Feature icons use `aria-hidden="true"`
- SVGs in nav toggle use `aria-hidden="true"`

## Mobile Nav Focus Trap

**Pass - Focus trap implemented correctly:**
- JS code (lines 32-47 in main.js) implements focus trapping within mobile nav
- Tab cycles through focusable elements (a, button) within the open menu
- Shift+Tab on first element wraps to last element
- Tab on last element wraps to first element
- Escape key closes mobile nav and returns focus to toggle button

## Focus Visibility

**Pass with minor note:**
- `:focus-visible` style defined at line 202-205 in base.css:
  ```css
  :focus-visible {
    outline: 2px solid var(--color-antique-gold);
    outline-offset: 2px;
  }
  ```
- Uses `outline` not `box-shadow` - this is correct and visible
- Gold outline (#c9a84c) contrasts well against dark background
- Skip link has additional `outline: 2px solid var(--color-link-hover)` on focus (line 197)
- 44px minimum touch targets on nav toggle (line 155-156 in theme.css)

## Overall Assessment

**FAIL** - Due to critical contrast failure with muted gray text (#3a3a3a) on black background.

The muted text color used throughout the site fails WCAG AA contrast requirements by a significant margin (2.88:1 vs required 4.5:1). This affects multiple content areas including the hero subtitle, feature card descriptions, and footer text.

**Required fix:** Increase the luminance of `--color-muted`. A value of approximately `#6b6b6b` or lighter would be needed to pass 4.5:1 contrast on black, though `#787878` would be a safer choice to ensure compliance.
