# ACCESSIBILITY - 03-retro-film-reel-3 (wave 3)

## Contrast Ratios

### PASS: Normal Text on Background
- `#111` (black text) on `#f5e9d4` (cream bg): **15.73:1** — Excellent
- `#c0392b` (red text) on `#f5e9d4` (cream): **4.53:1** — Pass (just above 4.5:1 threshold)
- `#8c5e3c` (muted text) on `#f5e9d4` (cream): **4.62:1** — Pass

### FAIL: Interactive Elements / Special Cases
- **Footer links** (`#8c5e3c` on `#ede4d6` alt background): **4.41:1** — FAILS by 0.09 (need 4.5:1)
- **CTA Banner heading** (`#f5e9d4` cream) on teal background (`#1abc9c`): **2.01:1** — FAILS (even for large text requiring 3:1)
- **Feature icon text** (teal `#1abc9c` on cream): **2.01:1** — FAILS (though icons have `aria-hidden="true"`)

## Keyboard Navigation

### PASS: Core Keyboard Navigation
- Skip link present and functional (focuses on main content)
- All interactive elements reachable via Tab key
- Logical tab order: skip link → logo → nav links → hero CTAs → content → footer
- Focus indicators visible via `:focus-visible` with `2px solid var(--color-teal)` outline

### ISSUE: Mobile Navigation Toggle Visibility
- At viewport width ≤900px, `.nav-toggle` becomes visible via CSS media query
- However, on tablet-sized viewports (768px-900px), the toggle appears but mobile nav menu may be partially unusable due to responsive breakpoint mismatch

## ARIA Labels

### PASS: Proper ARIA Implementation
- `<nav aria-label="Primary navigation">` on primary nav
- `<nav aria-label="Footer navigation">` on footer nav
- Mobile toggle has `aria-label="Toggle navigation"`, `aria-expanded="false"`, `aria-controls="nav-menu"`
- All icon-only buttons have `aria-hidden="true"`
- Logo link has `aria-label="Phlix home"`
- Feature card icons properly hidden with `aria-hidden="true"`
- All nav links have `aria-current="page"` on active item
- Hero section has `aria-labelledby="hero-heading"`
- Pitch section has `aria-labelledby="pitch-heading"`
- Features overview has `aria-labelledby="features-overview-heading"`
- CTA banner has `aria-labelledby="cta-banner-heading"`
- Main content has `id="main-content"` and `tabindex="-1"`

### PASS: Semantic Structure
- Proper landmark roles: `role="banner"`, `role="navigation"`, `role="contentinfo"`
- All lists use `role="list"`
- Sections properly associated with headings via `aria-labelledby`

## Focus Management

### PASS: Mobile Nav Focus Trap (JavaScript Implementation)
The mobile navigation in `js/main.js` implements proper focus management:

1. **Focus on open**: When opening mobile nav, focus moves to first menu item (line 24-27)
2. **Focus trap**: Tab/Shift+Tab cycling within nav menu (lines 46-60)
3. **Escape key**: Closes mobile nav and returns focus to toggle (lines 36-43)
4. **Click outside**: Closes mobile nav (lines 62-69)
5. **Body scroll lock**: Prevents background scrolling when nav is open (lines 28-29, 31)

### PASS: Focus Return on Close
- Mobile nav returns focus to `navToggle` when closed via Escape key (line 41)
- Smooth scroll updates focus for anchor links (lines 87-89)

## Score: 65/100

## Pass/Fail: FAIL

### Critical Issues:
1. **CTA Banner heading contrast**: Cream text (`#f5e9d4`) on teal background (`#1abc9c`) is only 2.01:1, failing even for large text (needs 3:1). The "Ready to stream?" heading is unreadable.
2. **Footer link contrast**: Muted brown text on alt background is 4.41:1, just below the 4.5:1 threshold.

### Recommendations:
1. Darken teal to at least `#0d7c66` to achieve 4.5:1 on cream, or change heading color to white (`#fff`)
2. Darken footer link color to `#7a4f32` or darker to achieve 4.5:1 on alt background
3. Consider increasing feature icon border/text contrast for better visibility
