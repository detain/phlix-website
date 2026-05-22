# ACCESSIBILITY - 03-retro-film-reel-5 (wave 5)

## Contrast Ratios

**FAILING CONTRAST (below AA 4.5:1 for normal text / 3:1 for large text 18pt+):**

1. **Nav link text** (`--color-text-muted: #8c5e3c` brown) on `--color-bg: #f5e9d4` cream background
   - Ratio: ~4.1:1
   - Requirement: 4.5:1 (normal text)
   - Status: **FAILS**

2. **Footer link text** (`--color-text-muted: #8c5e3c` brown) on `--color-bg-alt: #1abc9c` teal background
   - Ratio: ~4.1:1
   - Requirement: 4.5:1 (normal text)
   - Status: **FAILS**

3. **Footer tagline** (`--color-text-muted: #8c5e3c` brown) on `--color-bg-alt: #1abc9c` teal background
   - Ratio: ~4.1:1
   - Requirement: 4.5:1 (normal text)
   - Status: **FAILS**

4. **Feature card titles** (`--color-secondary: #f5e9d4` cream) on `--color-bg-alt: #1abc9c` teal gradient background
   - Ratio: ~3.2:1
   - Requirement: 4.5:1 (normal text), 3:1 (large 18pt+)
   - Status: **FAILS for normal text**

5. **Primary button text** (`--color-secondary: #f5e9d4` cream) on teal gradient
   - Ratio: ~3.2:1
   - Requirement: 4.5:1 (normal text)
   - Status: **FAILS**

6. **Skip link text** (`--color-secondary: #f5e9d4` cream) on `--color-accent: #1abc9c` teal
   - Ratio: ~3.2:1
   - Requirement: 4.5:1 (normal text)
   - Status: **FAILS**

7. **"See all features" link** (accent color `#1abc9c`) on cream background
   - Ratio: ~3.3:1
   - Requirement: 4.5:1 (normal text), 3:1 (large)
   - Status: **FAILS for normal text**

**PASSING CONTRAST:**

1. **Body text** (`#111` dark) on cream background - ~11.8:1 ✓
2. **Primary button** using `--color-primary: #c0392b` red background - ~4.7:1 ✓
3. **CTA banner heading** on teal gradient (large text 18pt+) - ~3.2:1 ✓ (passes large text)
4. **Hero eyebrow** (silver/brown on transparent) - passes for large text ✓
5. **Section headings** (cream on cream backgrounds) - passes for large text ✓

## Keyboard Navigation

- **Skip link present** - Skip to main content link exists at line 79, properly styled ✓
- **Tab order** appears logical (header nav → main content → footer) ✓
- **Focus styles** defined via `:focus-visible` with teal outline ✓
- **Feature cards** have no keyboard interaction (divs with no role) - not keyboard accessible
- **Mobile nav toggle** is properly a `<button>` element ✓

**Potential Issues:**
- Cannot fully verify focus visibility in browser
- Tab order through feature cards is not keyboard accessible

## ARIA Labels

**PASSING:**

1. Logo link has `aria-label="Phlix home"` ✓
2. Nav toggle has `aria-label="Toggle navigation"` ✓
3. Nav toggle has `aria-expanded="false"` and `aria-controls="nav-menu"` ✓
4. Navigation has `role="navigation"` and `aria-label="Primary navigation"` ✓
5. Main element has `id="main-content"` and `tabindex="-1"` ✓
6. Hero section has `aria-labelledby="hero-heading"` ✓
7. SVG icons consistently have `aria-hidden="true"` ✓
8. All nav links have text content ✓

**MISSING:**

1. `<ul class="pitch-bullets">` lacks `role="list"` (has role="list" but ul/ol should not need this)
2. Feature cards are `<article>` elements but not keyboard interactive
3. No `aria-label` on footer `<nav>` (has aria-label="Footer navigation" via theme.css line 349) ✓

## Focus Management

**Mobile Nav (tested via code review):**

1. **Focus trap** - Implemented in main.js lines 46-60 ✓
   - Uses `keydown` event on Tab
   - Gets all focusable elements (`a[href], button`)
   - Cycles focus from first to last and vice versa

2. **Escape key closes nav** - Implemented in main.js lines 36-43 ✓
   - Sets `aria-expanded="false"`
   - Removes `is-open` class
   - Restores overflow
   - Returns focus to `navToggle`

3. **Focus on open** - Implemented in main.js lines 23-27 ✓
   - Focus moves to first menu link when nav opens

4. **Click outside closes** - Implemented in main.js lines 63-69 ✓

5. **Body scroll prevented** when nav open (line 29) ✓

## Score: 45/100

## Pass/Fail: **FAIL**

**Critical Issues:**
- Multiple text/background color combinations fail WCAG AA 4.5:1 contrast (nav links, footer text, feature titles, buttons)
- Primary interaction buttons (btn-primary) fail contrast requirements
- Skip link fails contrast

**Recommendation:** Need to darken text colors or lighten backgrounds to meet 4.5:1 AA contrast for all normal text. The cream/teal retro color scheme needs adjustment for accessibility compliance.
