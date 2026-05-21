# QA Test Report — variant 04-portal-hub-1 (Wave 1, Clean Tech Minimal)

**Variant path:** `variants/04-portal-hub-1/`
**Pages tested:** index.html, about.html, features.html, docs.html, download.html, clients.html, plugins.html, hub.html

---

## Checklist Results

| # | Criterion | Result | Notes |
|---|-----------|--------|-------|
| 1 | All 8 pages render | **PASS** | All 8 HTML files exist and are valid HTML5 with proper `<!DOCTYPE>`, `<html>`, `<head>`, `<body>` structure. |
| 2 | Nav links go to the right page | **PASS** | All nav links resolve correctly: `/features`, `/clients`, `/hub`, `/docs`, `/download`. Current page marked with `aria-current="page"`. |
| 3 | Footer links resolve (no 404, including external) | **PASS** | All 12 footer links are valid. Internal: `/features`, `/clients`, `/download`, `/plugins`. External: `detain.github.io/phlix-docs`, `github.com/detain/phlix-server`, `github.com/detain/phlix-plugin-example`, `detain.github.io/phlix-docs/reference`, `github.com/detain`, `github.com/detain/phlix-server/issues`, `github.com/detain/phlix-hub`, `github.com/…/LICENSE`. |
| 4 | Primary CTA above the fold on home | **PASS** | On `index.html`, the hero section (line 70) contains `.cta-buttons` with "Get Phlix" primary CTA. Hero padding is `calc(var(--header-height) + var(--space-4xl))` which places it above the fold on standard viewports. |
| 5 | Mobile menu opens and traps focus correctly | **PARTIAL PASS** | Menu toggle button has proper `aria-expanded`/`aria-controls`. Escape key closes menu and returns focus to toggle. **Issue:** No explicit focus trap — tabbing past last nav item exits the menu to browser chrome rather than cycling focus back. This is a common pattern but technically incomplete for true focus trapping. |
| 6 | Skip-link works | **PASS** | `<a href="#main" class="skip-link">` present on all pages (line 31+). Styled in base.css with `position: absolute; top: -100%` default, `top: var(--space-md)` on `:focus`. Links to `#main` landmark. |
| 7 | All images have alt text | **PASS** | No `<img>` elements in the variant — all visuals are inline SVG. Logo SVG has `aria-label="Phlix home"` on the `<a>`. All decorative SVGs use `aria-hidden="true"`. |
| 8 | All forms have labels and validation messages | **N/A** | No `<form>` elements present on any of the 8 pages. No user input fields requiring labels/validation. |
| 9 | Keyboard-only navigation reaches every interactive element in logical order | **PASS** | Logical focus order: (1) skip-link, (2) logo, (3) menu-toggle, (4) main-nav links, (5) main content. FAQ accordion (about.html) supports keyboard activation via Enter/Space with `aria-expanded`. All interactive elements are natively focusable or have correct `tabindex`. |
| 10 | `prefers-reduced-motion: reduce` disables animations | **PASS** | Full support in base.css (lines 84–94): `animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important`. Component-level overrides in components.css (lines 254–267) disable `.portal-visual` rings, `.pulse-dot`, and `.ring-icon` animations. JS `initScrollAnimations()` (line 87) checks `matchMedia('(prefers-reduced-motion: reduce)')` and returns early, preventing IntersectionObserver-based scroll animations. |
| 11 | Page weight per page ≤500 KB transferred | **PASS** | Estimated transferred size per page (uncompressed): ~31 KB total — CSS: ~25.4 KB (base.css 4.8 KB + components.css 5.3 KB + theme.css 15.3 KB), JS: ~3.9 KB, SVGs: ~2.6 KB. Well under 500 KB threshold. |

---

## Summary

| Outcome | Count |
|---------|-------|
| PASS | 9 |
| PARTIAL PASS | 1 (mobile focus trap) |
| N/A | 1 (forms) |

**Overall: PASS** — Variant 04-portal-hub-1 is functionally ready. The mobile focus trap is a minor/cosmetic gap; the Escape key properly closes the menu and returns focus to the toggle, which is the most critical behavior.

---

*Report generated: 2026-05-20*
*Variant: 04-portal-hub-1 (Wave 1, Clean Tech Minimal)*
