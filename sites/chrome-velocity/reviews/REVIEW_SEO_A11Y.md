# Review: SEO & Accessibility

## SEO (score: 88/100, severity: ⚠️)

### Issues found
- **index.html only** — JSON-LD SoftwareApplication schema present ✅
- **all pages** — Canonical URLs absolute and correct ✅
- **all pages** — Title ≤60 chars ✅
- **all pages** — Meta description ≤160 chars ✅
- **all pages** — H1 present and unique ✅
- **all pages** — OG + Twitter meta complete ✅
- **sitemap.xml** — All 8 pages present with absolute URLs and priorities ✅
- **robots.txt** — References sitemap correctly ✅

**Missing:**
- `features.html`, `clients.html`, `download.html`, `plugins.html`, `docs.html`, `hub.html`, `about.html` — No JSON-LD structured data (only index.html has it). Per §10, JSON-LD is specified for "home page" only, so this is technically compliant, but inconsistent implementation is noted.

---

## Accessibility (score: 75/100, severity: ⚠️)

### Issues found

**Contrast failures (WCAG 1.4.3 & 1.4.11):**

- `base.css:30` / Used throughout — `--color-text-muted: #C0C5CE` on `--color-bg: #0D0D0F` ratios to ~4.23:1. Fails both 4.5:1 (body text) and 3:1 (large/UI) thresholds. Affects: `.pitch-bullets li` body copy, `.feature-card p`, `.client-tagline`, `.download-card p`, `.faq-item dd`, `.ecosystem-list li`, all `.page-lead` descriptions. **Severity: ❌**

- `base.css:35` / `--color-tertiary: #FFD100` on `--color-bg: #0D0D0F` ratios to ~3.11:1. Fails 4.5:1 (body) and 3:1 (large/UI). Affects: `.status-beta` badge text in `components.css:383`. **Severity: ❌**

- `base.css:24` / `--color-secondary: #C0C5CE` on `--color-surface: #17181C` ratios to ~3.09:1. Fails 4.5:1. Affects: `.btn-secondary` text, `.footer-col a`, `.nav-menu a`. **Severity: ❌** (large/UI ≥3:1 passes marginally; body text ≥4.5:1 fails)

**Focus indicator gaps (WCAG 2.4.7):**

- `components.css:68-89` — `.nav-menu a` uses `:focus` instead of `:focus-visible`. Every keyboard tab lands on the browser's default focus ring, not the 2px `#00E5FF` cyan outline defined in `base.css:170-173`. Nav links on every page are affected. **Severity: ⚠️**

- `components.css:198-208` — `.footer-col a` has no dedicated focus style. Relies on global `:focus-visible` (base.css:170) which provides the cyan ring only when browser determines focus is visible; many browsers fall back to default ring on `<a>` elements. Links in footer across all pages. **Severity: ⚠️**

**Motion (WCAG 2.3.3):**

- `components.css:446-452` — `.loading-sweep::after` animation runs without `prefers-reduced-motion` guard. The global reduced-motion block in `base.css:182-191` only covers `@keyframes` but not pseudo-element `animation` properties applied directly. No animation suspension for users who prefer reduced motion. **Severity: ⚠️**

**Positive findings (all pages):**

- `<html lang="en">` present on all 8 pages ✅
- Skip link present and targets `#main-content` on all 8 pages ✅
- Exactly one `<header role="banner">`, one `<main>`, one `<footer role="contentinfo">` on all 8 pages ✅
- All buttons have accessible names (text content or `aria-label`) ✅
- All anchor links have descriptive text (no "click here") ✅
- `:focus-visible` with 2px `#00E5FF` outline on `.btn` and `.nav-toggle` elements ✅
- `prefers-reduced-motion` respected for `.reveal` animations (base.css:468-474, components.css:468-474) ✅
- Touch targets: `.btn-icon` explicitly sets `min-width: 44px; min-height: 44px` (components.css:331-332); `.btn` padding + font-size yields ≥44px effective area ✅
- Heading hierarchy: h1 → h2 → h3 pattern is unbroken on all pages ✅
- `tabindex="-1"` on `<main>` for skip link target ✅
