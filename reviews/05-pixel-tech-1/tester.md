# QA Tester Report — variant `05-pixel-tech-1`

**Tester**: TestEngineer agent  
**Date**: 2026-05-20  
**Variant**: `05-pixel-tech-1` (Wave 1, Terminal Hacker)  
**Pages tested**: index.html, about.html, hub.html, docs.html, plugins.html, download.html, clients.html, features.html

---

## Checklist Results

| # | Criterion | Status | Notes |
|---|-----------|--------|-------|
| 1 | All 8 pages render | **PASS** | index, about, hub, docs, plugins, download, clients, features — all exist and are valid HTML5 with proper document structure |
| 2 | Nav links go to the right page | **PASS** | All 8 pages share consistent nav: links to /, /features, /clients, /download, /plugins, /docs, /hub, /about — paths match expected file-to-URL mapping |
| 3 | Footer links resolve (no 404, including external) | **PASS** | Internal footer links use consistent relative paths (/features, /clients, /download, /plugins). All external footer links point to real github.com/detain URLs (phlix-docs, phlix-server, phlix-plugin-example, phlix-hub, etc.) — these are valid, live URLs |
| 4 | Primary CTA above the fold on home | **PASS** | index.html hero section (line 77-80) contains two CTAs: "Get Phlix" (.btn.btn-primary) and "Read the docs" (.btn.btn-secondary). The primary CTA is first and appears early in the hero-ctas div, which renders above the fold on standard viewport heights |
| 5 | Mobile menu opens and traps focus correctly | **FAIL** | Mobile nav has aria-modal="true" and JS moves focus to closeBtn on open (line 50 main.js) and back to toggle on close (line 56). However there is no focus trap — Tab key can escape the modal to background elements. aria-modal="true" alone does not prevent focus escape without explicit JS focus containment |
| 6 | Skip-link works | **PASS** | Present and identically placed on all 8 pages (line 25: `<a href="#main-content" class="skip-link">Skip to main content</a>`). Styled in base.css (lines 112-128) with neon-green background, positioned off-screen until focused, scrolls to #main-content |
| 7 | All images have alt text | **PASS** | No `<img>` elements in any of the 8 pages. Decorative SVG logo uses `aria-hidden="true"` (index.html line 31 — present identically on all pages). This satisfies WCAG requirement for non-text content |
| 8 | All forms have labels and validation messages | **PASS** | No `<form>` elements, `<input>`, `<select>`, or `<textarea>` elements on any of the 8 pages. Criterion is trivially satisfied — no forms exist to fail |
| 9 | Keyboard-only navigation reaches every interactive element in logical order | **PASS** | Skip-link provides keyboard entry to main content. Navigation links and buttons use `:focus-visible` for visible focus rings (base.css line 131-134). Mobile nav close button is reachable via keyboard (Escape key closes it per main.js line 64). Logical tab order follows DOM source order. Minor: no explicit focus trap in mobile nav (see #5) |
| 10 | prefers-reduced-motion: reduce disables animations | **PASS** | **CSS**: base.css line 137 — `@media (prefers-reduced-motion: reduce)` sets `animation-duration: 0.01ms`, `animation-iteration-count: 1`, `transition-duration: 0.01ms`, `scroll-behavior: auto`. **JS**: main.js lines 11-13 and 79-85 check `window.matchMedia('(prefers-reduced-motion: reduce)')` and skip typing animation and stagger entrance respectively. Both layers are covered |
| 11 | Page weight per page ≤500 KB transferred | **PASS** | Self-contained variant with no external network dependencies except self-hosted woff2 fonts. Estimated per page: ~50-70KB HTML + ~33KB CSS + ~4KB JS + ~30KB fonts (5 woff2 files) + ~5KB img/SVG ≈ **≤150KB transferred** — well below 500KB threshold |

---

## Summary

| Result | Count |
|--------|-------|
| **PASS** | 10 |
| **FAIL** | 1 |

**Critical issue**: Mobile menu does not trap focus. While the nav opens with correct ARIA attributes and focus is moved programmatically, keyboard users can Tab outside the modal overlay to background links. A proper focus trap (e.g., cycling Tab/Shift+Tab within the modal) should be implemented to fully satisfy WCAG 2.1 Level A / criterion 2.1.2.

All other criteria pass. The variant is functionally sound with good accessibility foundations; the single failure is in mobile focus containment specifically.
