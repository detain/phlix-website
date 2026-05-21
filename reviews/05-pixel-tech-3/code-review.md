# Code Review: variants/05-pixel-tech-3

## Files Reviewed
- `variants/05-pixel-tech-3/index.html`
- `variants/05-pixel-tech-3/features.html`
- `variants/05-pixel-tech-3/about.html`
- `variants/05-pixel-tech-3/hub.html`
- `variants/05-pixel-tech-3/plugins.html`
- `variants/05-pixel-tech-3/docs.html`
- `variants/05-pixel-tech-3/download.html`
- `variants/05-pixel-tech-3/clients.html`
- `variants/05-pixel-tech-3/css/base.css`
- `variants/05-pixel-tech-3/css/theme.css`
- `variants/05-pixel-tech-3/css/components.css`
- `variants/05-pixel-tech-3/js/main.js`

## Overall Assessment
**APPROVE** — All MUST-NOT-FAIL checks pass. The variant is production-ready pending one minor font-weight gap.

## Summary
A cohesive Neon Cyberpunk static-site variant with solid accessibility, semantic markup, and functional mobile navigation. Fonts are self-hosted (no Google CDN), all meta descriptions are under 160 chars, og:image is present on every page, and the nav toggle/overlay works correctly. One minor gap: the 600-weight Exo 2 `@font-face` is declared but never loaded.

---

## Critical Issues
*None.*

---

## Major Issues
*None.*

---

## Minor Issues

### 🟡 Font weight 600 not loaded (70% confidence)
**File:** `variants/05-pixel-tech-3/css/theme.css` (implied usage)

The CSS uses `font-weight: 600` in multiple selectors (`--font-code`, `.faq-item dt` via bold, `h3` via `font-weight: 700` on parent), but the `@font-face` declarations only define weights 400 and 500 for Exo 2. Orbitron only has 700. Browsers will fall back to synthetic bold or system fonts for 600-weight text.

**Suggested fix** — Add to `theme.css`:
```css
@font-face {
  font-family: 'Exo 2';
  src: url('../fonts/Exo2-Bold.woff2') format('woff2');
  font-weight: 600;
  font-style: normal;
  font-display: swap;
}
```

---

## Positive Observations

- **Google Fonts CDN not used.** Fonts are self-hosted via `@font-face` in `theme.css:9-39`, loaded from `../fonts/`. This is the correct approach.
- **Meta descriptions all under 160 chars.** Verified across all 8 pages:
  - `index.html:7` — 155 chars ✓
  - `features.html:7` — 101 chars ✓
  - `about.html:7` — 87 chars ✓
  - `hub.html:7` — 102 chars ✓
  - `plugins.html:7` — 88 chars ✓
  - `docs.html:7` — 75 chars ✓
  - `download.html:7` — 87 chars ✓
  - `clients.html:7` — 87 chars ✓
- **og:image present on every page** — All 8 pages set `<meta property="og:image" content="./img/og.svg">` at consistent line positions.
- **Mobile nav fully functional** — `js/main.js:11-43` implements:
  - Toggle button with `aria-expanded` toggling
  - Body scroll lock when menu is open
  - Escape key closes menu
  - Click on link closes menu
  - Proper focus management after close
- **Semantic HTML throughout** — Correct use of `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<footer>`, `<dl>` for FAQ.
- **Accessibility fundamentals solid** — Skip link, `aria-label` on nav, `aria-current="page"` for active nav item, `role` attributes, `:focus-visible` styles, `prefers-reduced-motion` respected in CSS and JS.
- **No invented copy** — All descriptive text is factual product description. No lorem ipsum.
- **Self-hosted SVG favicon** at `./img/favicon.svg`.
- **JSON-LD schema** on all pages for SoftwareApplication structured data.
- **No hardcoded secrets or API keys** in any file.
- **CSS custom properties** used correctly for theming consistency.
- **Clean IIFE structure** in `main.js` with no global pollution.

---

## MUST-NOT-FAIL Checklist

| Requirement | Status |
|-------------|--------|
| Google Fonts CDN not used | ✅ PASS |
| No invented copy | ✅ PASS |
| Mobile nav functional | ✅ PASS |
| Meta description < 160 chars (all pages) | ✅ PASS |
| og:image exists (all pages) | ✅ PASS |

---

## Layer Analysis

### Layer 1: Correctness ✅
HTML is well-formed, CSS selectors match semantic elements, JS is in strict mode with proper null guards (`if (!toggle || !menu) return;`).

### Layer 2: Security ✅
No user input handling in static files. No inline event handlers. No sensitive data. External links use `rel="noopener noreferrer"`.

### Layer 3: Performance ✅
No external requests. `defer` on script loading. CSS animations are GPU-accelerated (`transform`, `opacity`). Scroll reveal uses `IntersectionObserver` with `unobserve` after trigger.

### Layer 4: Style & Maintainability ✅
Consistent naming conventions. CSS organized by component. Commentary headers on all files. No DRY violations at this scale.
