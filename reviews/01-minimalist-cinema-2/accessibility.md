# Accessibility Review — 01-minimalist-cinema-2

## Findings

### Color Contrast (WCAG AA 4.5:1 minimum)

**Passes:**
- Body text `#2B2D42` on `#F5F5F5` background: **11.15:1** ✓
- Footer tagline `#F5F5F5` on `#1A1A2E` background: **11.15:1** ✓
- Skip link `#F5F5F5` on `#1A1A2E`: **11.15:1** ✓
- Footer heading text `#F5F5F5` on `#1A1A2E`: **11.15:1** ✓
- Button primary text `#F5F5F5` on `#E63946` (hover `#F5F5F5` on `#1A1A2E`): **11.15:1** ✓

**Fails:**
- **Muted text** `#8D99AE` on `#F5F5F5` background: **3.06:1** ✗
  - Used for: hero-sub, feature-card descriptions, pitch bullets, client-card text, download-card text
  - Needs at minimum 4.5:1 for normal text (under 18pt / 14pt bold)
- **Cinema red** `#E63946` on `#F5F5F5` (accent text): **4.16:1** ✗
  - Used for: hero-eyebrow, "See all features →" link, feature-card left border on hover
  - Border/accent use is acceptable; text use at small sizes fails
- **Cinema red** `#E63946` on `#1A1A2E` (deep navy): **2.73:1** ✗
  - Used for: cta-banner heading, page-header heading, nav current page indicator
  - Large heading text (18pt+) has a 3:1 threshold, but these are 24-48pt+

### Keyboard Navigation / Focus Indicators

**Passes:**
- Skip link present and functional (`href="#main-content"`, visible on focus)
- Focus trap correctly implemented in mobile nav (JS lines 60-75)
- Escape key closes mobile nav (JS lines 54-58)
- Focus returned to toggle when closing nav (JS line 40)
- Focus management for smooth scroll anchors (JS lines 109-111)
- `:focus-visible` styles defined (base.css line 196-199)
- Focus outline uses 2px solid cinema-red with 2px offset

**Fails:**
- **Mobile nav toggle icon lacks aria-hidden**: The SVG hamburger icon has `aria-hidden="true"` which is correct, but the parent button may need higher visual prominence for focus
- **No visible focus state for footer links on hover combined with focus**: Footer links only have `color` transition on hover, no distinct focus ring

**Concerns:**
- `:focus-visible` may not show focus ring when clicking (browser-dependent); `:focus` would provide consistency but may be unwanted for mouse users

### ARIA Labels

**Passes:**
- `role="banner"` on header
- `role="navigation"` and `aria-label="Primary navigation"` on nav
- `role="contentinfo"` on footer
- `aria-label="Phlix home"` on logo link
- `aria-expanded="false"` on nav toggle initially
- `aria-controls="nav-menu"` on nav toggle
- `aria-labelledby` pointing to descriptive headings on all sections
- `aria-current="page"` on current nav item
- FAQ accordion correctly uses `aria-expanded` and `hidden` attributes

**Fails:**
- **Nav menu list missing `aria-label`**: The ul#nav-menu would benefit from `aria-label="Main navigation"` for screen readers to distinguish from footer navigation

### Semantic HTML Structure

**Passes:**
- Proper document structure: `<header>`, `<nav>`, `<main>`, `<footer>`
- `role="banner"`, `role="navigation"`, `role="contentinfo"` landmarks
- All headings follow logical hierarchy (h1 → h2 → h3)
- `<article>` for feature cards (no redundant role needed)
- `<ul role="list">` on pitch bullets (technically redundant in HTML5 but harmless)
- Button used for nav toggle (not a div or span)
- All interactive elements are natively focusable or have appropriate tabindex
- `<main id="main-content" tabindex="-1">` correctly manages focus skip

**Concerns:**
- Feature cards (article) contain only heading and paragraph — could use `<a>` wrapper or `article > a` pattern for keyboard accessibility, but current structure is acceptable as informational cards

### Additional Observations

- **Reduced motion**: Properly implemented (base.css lines 208-217, components.css lines 634-641)
- **Touch targets**: Buttons have `min-height: 44px; min-width: 44px` (lines 23-24 of components.css)
- **Font sizing**: Uses `clamp()` for fluid typography; base body text is 1.0625rem (17px)
- **Color-blind considerations**: The design uses a cinema-red (#E63946) accent which may be problematic for deuteranopia/protanopia users, but this is an intentional design choice
- **No form inputs or user-generated content** in this page, so no input-specific concerns

---

## Score: 72/100

### Breakdown
| Category | Score | Notes |
|----------|-------|-------|
| Color Contrast | 14/25 | Muted text (3.06:1) and red accents fail WCAG AA |
| Keyboard/Focus | 20/25 | Excellent JS implementation, minor focus visibility gaps |
| ARIA Labels | 22/25 | Strong, only nav menu label missing |
| Semantic HTML | 16/25 | Excellent structure, one minor card interaction concern |

---

## Pass/Fail: **FAIL**

### Critical Issues Requiring Fix

1. **Muted text color `#8D99AE` fails contrast** (3.06:1 vs required 4.5:1)
   - Impact: All secondary/descriptive text throughout the page
   - Fix: Darken to approximately `#6B7280` (4.51:1) or darker

2. **Cinema red `#E63946` text on light background fails** (4.16:1)
   - Impact: Hero eyebrow text
   - Fix: Either darken the red to `#C53030` or use a darker fallback color for text use

3. **Cinema red `#E63946` text on dark background fails** (2.73:1)
   - Impact: CTA banner headings, page headers on dark background
   - Fix: Use off-white `#F5F5F5` for text on dark backgrounds instead of red

### Recommendations

1. Add `aria-label="Main navigation"` to the nav-menu ul element
2. Ensure footer links have visible focus indicators (consider adding outline to `:focus-visible`)
3. Consider adding `role="main"` to the main element (already has id and tabindex, role is implicit but explicit is better for older assistive tech)
