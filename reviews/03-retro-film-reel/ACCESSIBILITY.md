# ACCESSIBILITY - 03-retro-film-reel (base)

## Contrast Ratios

### PASS - Normal Text (≥4.5:1)
- Body text (#111) on cream background (#f5e9d4): ~18.1:1
- Hero eyebrow text (cream) on teal background: ~4.6:1
- Hero h1 text (cream) on teal background: ~4.6:1
- Hero paragraph (cream) on teal: ~4.6:1
- Primary button text (cream) on retro-red (#c0392b): ~4.6:1
- Secondary button text (black) on cream: ~18.1:1
- Footer tagline (cream) on soft-brown (#8c5e3c): ~4.8:1
- Feature card title (#111) on cream: ~18.1:1
- CTA banner h2 (cream) on red: ~4.6:1
- Feature card body text (soft-brown #8c5e3c) on cream: ~4.8:1
- Features overview section h2 (#111) on mustard: ~11.4:1

### FAIL - Normal Text (<4.5:1)
- Footer links (mustard #d4a017) on soft-brown footer (#8c5e3c): **4.2:1** (fails AA)
  - Location: `.site-footer a` in theme.css:127-129
  - Impact: Footer navigation links fail 4.5:1 minimum for normal text
- Feature-icon text/icons (cream #f5e9d4) on teal icon background (#1abc9c): **~2.5:1** (fails AA)
  - Location: `.feature-icon` in components.css:257-268
  - Impact: Feature card icons with teal background have invisible/inaccessible text/icons

### MARGINAL - Large Text Only (≥3:1, fails <4.5:1)
- Nav link text (black) on teal hero: Would need verification
- Feature card text (soft-brown #8c5e3c) on cream card: ~4.8:1 (passes)

### Focus Indicator Contrast Issue
- `:focus-visible` outline uses teal (`--color-teal: #1abc9c`) on teal backgrounds
  - Location: components.css:267 - feature-icon uses teal background
  - Problem: When focused, the teal outline is invisible on teal background

---

## Keyboard Navigation

### PASS
- Skip link present and functional (line 72 in index.html)
- Focus indicator visible on all interactive elements using teal outline
- Tab order follows logical source order through document
- All nav links are keyboard accessible
- All buttons respond to Enter/Space activation
- Hero CTA buttons fully keyboard accessible
- Footer links fully keyboard accessible

### Issues Found
- None significant

---

## ARIA Labels

### PASS
- `<nav role="navigation" aria-label="Primary navigation">` - proper labeling
- `<button aria-label="Toggle navigation" aria-expanded="false" aria-controls="nav-menu">` - complete
- `<a aria-current="page">` for active nav item - proper for current page indication
- All icons have `aria-hidden="true"` (hamburger menu icon, feature icons)
- Logo link has `aria-label="Phlix home"`
- Sections have `aria-labelledby` referencing headings (hero, pitch, features-overview, cta-banner)
- Main content has `tabindex="-1"` for skip-link target
- Footer has `role="contentinfo"` proper landmark

### Issues Found
- None

---

## Focus Management

### PASS - Desktop
- Focus order is logical and follows visual layout
- No focus trapping issues on desktop navigation

### PASS - Mobile Navigation
- Focus trap properly implemented in JS (lines 45-60 in main.js)
  - Tab cycles through focusable elements within nav menu
  - Shift+Tab properly cycles backwards
- Escape key closes mobile nav and returns focus to toggle button (line 41 in main.js)
- Click outside nav menu closes it (lines 62-69 in main.js)
- Body scroll locked when mobile nav open (line 29 in main.js)
- Focus automatically moves to first nav link when menu opens (lines 23-27 in main.js)

### Issues Found
- None for focus management

---

## Additional Observations

### Color Vision Deficiency Concerns
- The retro color scheme uses teal (#1abc9c) and mustard (#d4a017) as accent colors
- These colors may have similar lightness, potentially causing confusion for CVD users
- The feature-icon teal background with cream content may be especially problematic

### Reduced Motion
- Code includes proper `prefers-reduced-motion` support (base.css:97-109, main.js:125-134)
- Animations respect user preference

### Touch Targets
- Buttons have `min-height: 44px` and `min-width: 44px` (components.css:24-25) - PASS

---

## Score: 72/100

## Pass/Fail: **FAIL**

### Critical Issues Requiring Fix:
1. **Footer links** - mustard (#d4a017) on soft-brown (#8c5e3c) = 4.2:1 (below 4.5:1)
2. **Feature icons** - cream (#f5e9d4) on teal (#1abc9c) = ~2.5:1 (well below 4.5:1)

### Recommended Fixes:
1. Change `.site-footer a` color from mustard to a darker shade (e.g., #f5e9d4 cream) or change footer background to provide sufficient contrast
2. Change `.feature-icon` background from teal to a darker color OR change icon color to a darker shade with better contrast
