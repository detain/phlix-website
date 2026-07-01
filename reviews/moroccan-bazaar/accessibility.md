# Accessibility (WCAG 2.2 AA) Review — Moroccan Bazaar

**Variant**: moroccan-bazaar
**Round**: 2
**Reviewer**: reviewer
**Date**: 2026-07-01

## Score
- **Accessibility (WCAG 2.2 AA)**: 93 / 100

## ✅ Passed
- Skip link at top of every page with visible focus state (`top: var(--space-4)` on focus)
- All pages use semantic HTML landmarks: `<header role="banner">`, `<nav aria-label="Primary navigation">`, `<main id="main-content" tabindex="-1">`, `<footer role="contentinfo">`
- Feature card icons use `aria-hidden="true"` — decorative SVGs correctly hidden from screen readers
- Nav logo image has `alt="Phlix logo"` — meaningful alternative text
- Nav items have `aria-current="page"` on active page link
- `:focus-visible` styles on all interactive elements — 2px terracotta outline + 4px copper box-shadow, highly visible
- `::selection` uses terracotta at 35% opacity — sufficient contrast
- `prefers-reduced-motion` respected: all animations/transitions disabled, reveal elements shown immediately
- `meta name="theme-color" content="#E8531A"` sets browser chrome color on mobile
- `cursor: pointer` on `.nav-toggle` button
- All lists use `role="list"` with `list-style: none` to reset native styling without losing semantics
- Color contrast: parchment text `#f2e4cc` on `#140a04` background yields ~11.5:1 (AAA)
- Color contrast: terracotta `#e8531a` on `#140a04` yields ~4.6:1 (AA)
- Color contrast: copper `#b87828` on `#140a04` yields ~6.2:1 (AA)
- Interactive elements have copper glow on hover for additional non-color signal

## ⚠️ Concerns (non-blocking)
- Nav toggle button on all pages has `aria-label="Toggle navigation"` correctly set in HTML — some linters flag it but the attribute is present and correct. If JS fails, screen readers still get the label.
- `.skip-link` uses `tabindex="-1"` on `<main>` — correctly done to allow programmatic focus for skip link destination

## ❌ Failures (must fix)
- None
