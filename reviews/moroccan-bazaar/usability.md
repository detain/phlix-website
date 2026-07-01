# Usability Review — Moroccan Bazaar

**Variant**: moroccan-bazaar
**Round**: 2
**Reviewer**: reviewer
**Date**: 2026-07-01

## Score
- **Usability**: 94 / 100

## ✅ Passed
- Skip link (`<a class="skip-link">`) at top of every page links to `#main-content`
- All interactive elements (buttons, links) have visible `:hover` and `:focus` states
- Focus states use 2px terracotta outline + 4px copper box-shadow — clearly visible against dark backgrounds
- Primary CTA button "Get Phlix" uses `btn-primary` (terracotta) — maximum visual prominence
- Button minimum sizes: `min-height: 44px; min-width: 44px` on `.btn` — meets touch target requirements
- Hamburger nav toggle uses `aria-expanded` and `aria-controls` correctly; opens/closes on click
- Escape key closes mobile nav menu (keyboard accessibility)
- Outside-click closes mobile nav menu — standard mobile pattern
- `defer` attribute on `<script src="js/main.js">` prevents render blocking
- All form elements (`input`, `button`, `textarea`, `select`) inherit `font: inherit` — prevents browser-default font jarring
- `scroll-behavior: smooth` on `html` for anchor navigation
- Feature cards have hover lift (`translateY(-4px)`) + copper glow — clear interactivity signal

## ⚠️ Concerns (non-blocking)
- **all HTML files:80-97** — The hamburger nav-toggle button (`<button class="nav-toggle">`) has `aria-label="Toggle navigation"` set in HTML, which is correct and accessible. Some automated checkers might flag it if JS fails, but the HTML attribute is properly set — no action needed.
- `about.html:164` and `about.html:291` both show "License (BSD-3)" footer link — double link in same section, minor visual noise

## ❌ Failures (must fix)
- None
