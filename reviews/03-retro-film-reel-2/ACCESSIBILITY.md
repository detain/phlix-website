# ACCESSIBILITY - 03-retro-film-reel-2 (wave 2)

## Contrast Ratios

### Critical Issues (WCAG AA Failure)

1. **Gold text on velvet header background - FAILS**
   - Element: `.site-logo` (logo text "Phlix")
   - Colors: Gold (#d4a017) on Velvet (#7a1f1f)
   - Ratio: **4.33:1** (fails 4.5:1 requirement for normal text)
   - Impact: Logo text fails contrast when positioned over velvet background

2. **Gold navigation links on velvet - FAILS (hover/focus state)**
   - Element: `.main-nav__link:hover`, `.main-nav__link[aria-current='page']`
   - Colors: Gold (#d4a017) on Velvet (#7a1f1f)
   - Ratio: **4.33:1** (fails 4.5:1 requirement for normal text)
   - Impact: Navigation links turn gold on hover, failing contrast requirement

### Passing Contrast

- Cream (#f5e9d4) on Velvet (#7a1f1f): **8.56:1** PASS
- Cream (#f5e9d4) on Velvet Dark (#4a0f0f): **12.80:1** PASS
- Retro Red (#c0392b) on Cream (#f5e9d4): **4.53:1** PASS (marginal)
- Soft Brown (#8c5e3c) on Cream (#f5e9d4): **4.62:1** PASS
- Black (#111) on Cream (#f5e9d4): **15.73:1** PASS
- Velvet (#7a1f1f) on Cream (#f5e9d4): **8.56:1** PASS
- Black (#111) on Gold (#d4a017): **7.95:1** PASS
- Teal (#1abc9c) on Cream: **2.01:1** (decorative badge only, aria-hidden)

### Observations
- The gold accent color (#d4a017) against the velvet background (#7a1f1f) is only 4.33:1, just below the 4.5:1 threshold
- Most text/background combinations pass comfortably
- Decorative elements with insufficient contrast are properly hidden with aria-hidden="true"

## Keyboard Navigation

### Passes
- Skip link present at top of page with proper styling (`.skip-link`)
- All navigation links are keyboard accessible via Tab
- Tab order follows visual layout (skip link → logo → nav links → main content → footer)
- Focus indicator present on all focusable elements via `:focus-visible` styles
- Focus styles use 3px solid gold outline with 2px offset (base.css:142-150)

### Issues
- None identified

### Mobile Menu Behavior
- Menu toggle button is keyboard accessible
- Navigation links are reachable via Tab when menu is open
- Escape key closes the menu and returns focus to toggle (main.js:31-38)

## ARIA Labels

### Passes
- **Skip link**: `href="#main"` targets main content landmark
- **Logo link**: `aria-label="Phlix Home"` - descriptive
- **Menu toggle**: `aria-label="Toggle menu"`, `aria-expanded="false"`, `aria-controls="main-nav-list"`
- **Navigation**: `aria-label="Main navigation"` on nav element
- **Current page**: `aria-current="page"` on active nav link
- **Feature card icons**: `aria-hidden="true"` on decorative emoji

### Issues
- None identified

### Recommendations (Informational)
- FAQ accordion buttons could benefit from `aria-controls` pointing to the answer panel ID, though the current implementation with `aria-expanded` and `hidden` attributes is functional

## Focus Management

### Mobile Menu Focus Trap
- The mobile menu uses CSS `display: none/flex` rather than a modal overlay
- When menu opens via toggle, focus is not explicitly trapped (no inert/overlay behavior)
- However, all nav links remain in tab order and are functional
- Escape key properly closes menu and returns focus to toggle button
- When menu closes, focus is restored to toggle via `toggle.focus()`

### Focus Restoration
- Mobile menu close (Escape key): Focus returns to `.menu-toggle` (main.js:36)
- Mobile menu link click: Menu closes, focus remains on clicked element (implicit)

### Observations
- For a drawer-style menu without backdrop, focus trapping is not strictly required
- The current behavior is acceptable for this UI pattern

## Additional Accessibility Features

### Pass
- `lang="en"` on html element
- Proper heading hierarchy (h1 → h2 → h3)
- Landmarks: `<header>`, `<main>`, `<nav>`, `<footer>`
- `role="list"` on navigation list for screen reader list semantics
- `prefers-reduced-motion` support for animations (theme.css:111-118, base.css:70-79)
- Visible focus indicators on all interactive elements
- Minimum touch target size (44px min-height on buttons via components.css)

## Score: 78/100

## Pass/Fail: **FAIL** (due to gold-on-velvet contrast failures for normal-sized text)

### Summary
The variant has solid accessibility foundations with proper ARIA labeling, keyboard navigation, and good focus management. However, **the gold accent color (#d4a017) on the velvet header background (#7a1f1f) fails WCAG AA contrast requirements** with a 4.33:1 ratio (needs 4.5:1). This affects the logo text and navigation link hover/current states. These should be darkened to at least #B8860B (dark goldenrod) or the background lightened to ensure 4.5:1 compliance.

### Required Fixes
1. Change logo link color on hover to a darker gold or cream color
2. Change navigation link hover/active color to cream or another passing color instead of gold
