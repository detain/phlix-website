# ACCESSIBILITY - 03-retro-film-reel-4 (wave 4)

## Contrast Ratios

### PASS Items
- Headings (`#f5e9d4` cream) on dark bg (`#111`) = **15.73:1** (AA, AAA)
- Body text (`#f5e9d4`) on alt bg (`#1a1a1a`) = **14.49:1** (AA, AAA)
- Muted text (`#d4a017` gold) on alt bg = **7.33:1** (AA, AAA)
- Accent links (`#1abc9c` teal) on dark bg = **7.84:1** (AA, AAA)
- Secondary on primary (`#f5e9d4` on `#c0392b`) = **4.53:1** (AA only)
- Dark text on accent bg (`#1a1a1a` on `#1abc9c`) = **7.22:1** (AA, AAA)
- Muted on dark bg (`#d4a017` on `#111`) = **7.95:1** (AA, AAA)

### FAIL Items
- **CTA Banner heading**: `#c0392b` (red) on `#1abc9c` (teal bg) = **2.26:1** (FAILS AA 4.5:1)
- **Primary button text**: `#1abc9c` (teal) on `#c0392b` (red bg) = **2.26:1** (FAILS AA 4.5:1)
- **Skip link**: `color: #c0392b` on `background: #1abc9c` = **2.26:1** (FAILS AA 4.5:1)
- **Secondary button on accent bg**: `#f5e9d4` on `#1abc9c` = **2.01:1** (FAILS AA 4.5:1)
- **Focus ring visibility**: `outline: 2px solid #1abc9c` on `#c0392b` button backgrounds has insufficient contrast

**Issue**: The red (`#c0392b`) + teal (`#1abc9c`) combination is a Hollywood glamour palette but these colors have nearly identical luminance (~0.174 vs ~0.338) causing poor contrast.

## Keyboard Navigation

### PASS Items
- Skip link present: `<a class="skip-link" href="#main-content">Skip to main content</a>`
- Main content has `tabindex="-1"` for programmatic focus
- `:focus-visible` styles defined with outline and offset
- All nav links have `href` attributes making them keyboard focusable
- Nav toggle button is properly focusable

### FAIL Items
- **Focus indicator on primary buttons**: When `.btn-primary` (teal text on red bg) receives focus, the `:focus-visible` outline uses `#1abc9c` which blends into the button background color, making focus state nearly invisible

**Issue**: Focus rings must have minimum 3:1 contrast against adjacent colors. The teal outline on red button is ~1.5:1.

## ARIA Labels

### PASS Items
- `<nav role="navigation" aria-label="Primary navigation">` properly labeled
- Nav toggle has `aria-label="Toggle navigation"`, `aria-expanded="false"`, `aria-controls="nav-menu"`
- Icon SVGs have `aria-hidden="true"` (decorative)
- Feature card icons have `aria-hidden="true"` (decorative)
- All interactive links have descriptive text
- Footer nav properly labeled: `<nav class="footer-nav" aria-label="Footer navigation">`
- `aria-current="page"` used correctly on active nav item
- All form elements (if any) would have implicit labels

### No Issues Found
ARIA implementation is solid.

## Focus Management

### PASS Items
- Focus trap implemented in mobile nav (lines 46-60 of main.js)
- Escape key closes mobile nav and returns focus to toggle (line 41 of main.js)
- Opening mobile nav moves focus to first menu item (lines 23-27 of main.js)
- Body scroll locked when nav open (line 29 of main.js)
- Click outside closes nav properly (lines 63-69 of main.js)
- `aria-expanded` state properly updated on toggle

### Minor Issue
- When nav is closed via Escape, focus returns to toggle (good), but the skip link should be the next focusable element for users who want to reach main content

## Score: 65/100

## Pass/Fail: FAIL

## Critical Issues Requiring Fix

1. **Button color contrast**: The `#c0392b` + `#1abc9c` combination fails WCAG AA. Recommended fix: use cream (`#f5e9d4`) text on red (`#c0392b`) button background, or white on primary colors.

2. **CTA Banner**: Heading should use a darker color on teal background, not red. Either `#1a1a1a` or `#f5e9d4` would pass.

3. **Focus rings**: On buttons with red background, use an outline color with sufficient contrast (e.g., white `#ffffff` or yellow `#f0a500`).

4. **Skip link**: Use `#c0392b` text on `#f5e9d4` background (or vice versa), not teal/red.
