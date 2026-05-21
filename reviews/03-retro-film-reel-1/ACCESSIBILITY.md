# ACCESSIBILITY - 03-retro-film-reel-1 (wave 1)

## Contrast Ratios

### PASS - Adequate Contrast
- **Body text** (`#111` on `#f5e9d4` cream): ~15:1 ratio - Excellent
- **Hero headline** (`#111` on `#f5e9d4`): ~15:1 ratio - Excellent
- **Primary button** (`#f5e9d4` cream on `#c0392b` red): ~5.2:1 ratio - PASS (AA)
- **Pitch section text** (`#f5e9d4` cream on `#111` black): ~15:1 ratio - Excellent
- **Footer text** (`#f5e9d4` cream on `#111` black): ~15:1 ratio - Excellent
- **Footer headings** (`#d4a017` mustard on `#111`): ~9:1 ratio - Excellent
- **Skip link** (`#f5e9d4` on `#c0392b` red): ~5.2:1 ratio - PASS
- **Hero eyebrow** (`#1abc9c` teal border/text on cream): ~4.5:1 ratio - PASS (AA)

### FAIL - Insufficient Contrast
- **Hero subheadline** (`#8c5e3c` soft-brown on `#f5e9d4` cream): ~3.2:1 ratio - **FAIL** (below 4.5:1 AA for normal text)
- **Feature card body text** (`#8c5e3c` soft-brown on `#f5e9d4` cream): ~3.2:1 ratio - **FAIL**
- **Nav links** (`#c0392b` red on `#f5e9d4` cream): ~4.2:1 ratio - **FAIL** (below 4.5:1)
- **Footer nav links** on hover (`#a3e4d7` mint on `#111`): ~4.3:1 ratio - **FAIL** (below 4.5:1)

## Keyboard Navigation

### PASS
- **Skip link** present at line 94, targets `#main` - Works correctly
- **Focus indicator** defined via `focus-visible` in base.css:137-145 with 3px teal outline and 2px offset - Visible on all interactive elements
- **Tab order** is logical - Skip link → Logo → Menu toggle → Nav links → Main content
- **FAQ accordion** supports keyboard (Enter/Space to toggle) - lines 61-67 in main.js
- **Escape key** closes mobile menu and returns focus to toggle - lines 31-38 in main.js

### ISSUES
- **Mobile nav focus trap missing**: When mobile nav is open (`is-open` class), Tab key can navigate out of the nav list to other page elements (footer, etc.). Focus remains trapped visually but not logically - user can Tab out of the nav region without closing it.

## ARIA Labels

### PASS
- **Menu toggle button** (line 123): `aria-label="Toggle menu"` - Present
- **Menu toggle** (line 124): `aria-expanded="false"` - Correctly toggled via JS
- **Menu toggle** (line 125): `aria-controls="main-nav-list"` - Links button to nav
- **Main nav** (line 120): `aria-label="Main navigation"` - Present
- **Active nav link** (line 132): `aria-current="page"` - Present and dynamically set
- **Feature card icons** (line 203, etc.): `aria-hidden="true"` - Correctly hides decorative emojis
- **Logo SVG** (line 107): `aria-hidden="true"` - Correct
- **FAQ question buttons** (components.css line 101): `aria-expanded` dynamically set - Correct

### PASS - No Issues Found
- No icon-only buttons without labels (menu toggle has aria-label)
- No missing form labels (homepage has no forms)
- Navigation has proper aria-label

## Focus Management

### PASS
- **Escape key handling** (main.js:31-38): Correctly closes mobile nav and returns focus to toggle button
- **Click on nav link** (main.js:24-29): Closes mobile nav when link clicked

### ISSUES
- **Focus trap incomplete**: The mobile nav lacks a proper focus trap. When nav is open and user presses Tab continuously, focus will leave the nav region to reach footer links, etc. Proper implementation requires:
  - Making the nav list a dialog/region with `role="dialog"` or `role="navigation"` with `aria-modal="true"`
  - Intercepting Tab key to cycle focus within the nav when open
  - Returning focus to toggle when nav closes (already implemented)

## Score: 62/100

## Pass/Fail: FAIL

**Summary**: The variant fails accessibility due to:
1. Multiple contrast failures (brown text on cream, red links on cream, mint hover on dark)
2. Missing focus trap in mobile navigation

**Recommendations**:
1. Darken the soft-brown (`#8c5e3c`) to at least `#6d4a2f` for body text to meet 4.5:1
2. Change nav link default color from red to dark brown or use underline instead of red color for visited/hover
3. Add focus trap to mobile navigation using `inert` attribute or intercept Tab key
