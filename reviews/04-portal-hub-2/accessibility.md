# Accessibility Review — 04-portal-hub-2

## Findings

### Color Contrast

**Critical Issues:**
- `.footer-copy` uses `rgba(232, 244, 253, 0.4)` on `rgba(6, 16, 24, 0.95)` — approximately **2.2:1 contrast ratio**, failing WCAG AA (requires 4.5:1 for normal text) and WCAG AAA (requires 7:1)
- `.footer-col a` uses `rgba(232, 244, 253, 0.6)` — approximately **3.8:1 contrast ratio**, passing WCAG AA but failing WCAG AAA (requires 4.5:1 for large text fallback)

**Moderate Issues:**
- `.nav-menu a` default state uses `rgba(232, 244, 253, 0.7)` — approximately **5.2:1 contrast ratio**, passing WCAG AA but marginal; hover state correctly uses full `--color-accent` (#00D4FF)
- `.pitch-bullets li` uses `rgba(232, 244, 253, 0.8)` — approximately **6.5:1 contrast ratio**, passing WCAG AA
- Feature card descriptions use `rgba(232, 244, 253, 0.7)` with glassmorphism backgrounds — passes at 5.2:1 but glass blur may reduce perceived contrast

**Good:**
- Skip link: `#00D4FF` on `#0A1628` provides strong contrast (~8.2:1)
- Primary buttons: `#0A1628` text on `#00D4FF` background provides excellent contrast
- Headings use `--color-ice-blue: #E8F4FD` on dark backgrounds — passes
- Body text uses proper contrast with rgba(232, 244, 253, 0.8) — passes

### Keyboard Navigation

**Pass:**
- Skip link present with `href="#main-content"` and proper focus styling
- Focus styles defined via `:focus-visible` with 2px accent outline + offset
- `main` has `tabindex="-1"` for programmatic focus
- Escape key closes mobile nav menu and returns focus to toggle (lines 28-34 in main.js)
- `prefers-reduced-motion` media query disables parallax and animations (lines 145-151, 185-192 in base.css, lines 380-399 in components.css)
- Mobile nav toggle is visible and keyboard accessible

**Issues:**
- Mobile nav menu cannot be navigated with arrow keys — only Escape closes; screen reader/keyboard users cannot move between menu items with arrow keys (ARIA Authoring Practices: navigation menu should support arrow key traversal)
- Focus ring on `.portal-grid` and 3D depth elements may cause visual confusion — `portal-grid` and glass cards apply `perspective()` transforms on `mousemove` (lines 40-44, 124-142 in main.js) which could reposition focus rings unexpectedly
- No explicit `aria-haspopup` or indication that nav menu is a expandable widget on the toggle

### ARIA

**Pass:**
- `role="banner"` on `<header>`
- `role="navigation"` with `aria-label="Primary navigation"` on primary nav
- `role="contentinfo"` on `<footer>`
- `aria-labelledby` on sections referencing heading IDs (hero, pitch, features-overview, cta-banner)
- `aria-current="page"` on current nav item
- `aria-hidden="true"` on decorative SVGs (portal-grid-center, feature-icons)
- `aria-expanded` dynamically updated on nav toggle

**Issues:**
- `aria-controls` on nav toggle (line 59 of index.html) is correct HTML but JavaScript never reads/uses this attribute to connect the toggle to the menu behavior — the association is implied but not functionally established in the accessibility tree
- Missing `role="region"` on sections — while `aria-labelledby` provides labeling, `role="region"` would make sections navigable landmarks in screen readers

### Semantic HTML

**Pass:**
- Proper document structure: `<header>`, `<main>`, `<footer>`, `<nav>`
- Headings follow logical hierarchy: h1 (hero), h2 (section headings), h3 (card titles)
- `<article>` used for feature cards — appropriate for independent content
- `<ul role="list">` used for lists — redundant but not harmful
- Form elements properly linked via `for`/`id` attributes (implied pattern)
- `<button>` used for interactive controls (nav toggle)

**Issues:**
- Footer `<h3>` headings ("Product", "Developers", "Project") have no parent heading establishing section context — violates heading hierarchy expectation; these should be `<h2>` or the footer should wrap content in a `<section>` with appropriate heading
- `<section>` elements missing `id` attributes — combined with `aria-labelledby`, the association works but regions cannot be navigated directly by screen reader landmark shortcuts without explicit `id`
- Feature card icons wrapped in `<div class="feature-icon">` instead of being part of the article content flow or having proper labeling

### Additional Observations

**Positive:**
- JSON-LD structured data for SoftwareApplication
- Open Graph and Twitter Card meta tags present
- Theme color meta tag for browser UI
- Proper `lang="en"` on `<html>`
- Canonical URL specified
- SVG favicon with proper type

**Motion/Animation:**
- Animations respect `prefers-reduced-motion: reduce` via both CSS and JS checks
- Portal grid animations (pulse, grid-pulse) disabled for reduced motion
- Reveal animations on scroll use IntersectionObserver with proper cleanup

**Minor Issues:**
- `.client-status` badge text (#FFA500 / #00D4FF) — orange beta badge may have marginal contrast; `#00D4FF` cyan stable badge passes
- Scrollbar styling uses accent color — fine for visual consistency but may not meet high contrast requirements if custom scrollbars appear on text content

---

## Score: 71/100

### Scoring Breakdown
- **Color Contrast**: 14/20 — footer text fails, nav links marginal
- **Keyboard Navigation**: 16/20 — Escape works, missing arrow key nav
- **ARIA**: 17/20 — good labeling, minor structural gaps
- **Semantic HTML**: 18/20 — good structure, heading hierarchy issue
- **Motion**: 6/6 — properly respects reduced motion preference

---

## Pass/Fail: **FAIL**

### Critical Failures (must fix):
1. **Footer copyright text** at 0.4 opacity fails WCAG AA (2.2:1 vs required 4.5:1) — increase to minimum 0.55 opacity (4.5:1) or use solid color
2. **Mobile nav arrow key navigation** — implement keyboard traversal per ARIA Authoring Practices 1.1

### Moderate Issues (should fix):
3. **Footer nav links** at 0.6 opacity — marginally passes AA, consider increasing
4. **Missing `role="region"`** on sections with `aria-labelledby` — adds landmark navigation
5. **Footer headings** should be h2 (not h3) or wrapped in a section with h2 context

### Suggested Improvements:
6. Add `aria-haspopup="false"` explicitly to nav toggle for clarity
7. Add `role="menu"` / `role="menuitem"` to mobile nav for proper widget semantics
8. Increase glass card text opacity from 0.7 to 0.85 for better legibility
