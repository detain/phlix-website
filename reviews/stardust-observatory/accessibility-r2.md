# Accessibility Review — stardust-observatory

**Variant**: stardust-observatory
**Round**: 2
**Reviewer**: Senior Front-End Reviewer
**Date**: 2026-07-04

## Score

- **Accessibility**: 72 / 100

## ✅ Passed

- `.nav-menu a` color uses `var(--color-text)` at full opacity — `components.css:80` → `color: var(--color-text)`
- `.footer-col a` color uses `var(--color-text)` at full opacity — `components.css:195` → `color: var(--color-text)`
- Focus ring: 3px `var(--color-focus)` (`#E8D48B`) with 2px `outline-offset` present — `base.css:194-198` and `base.css:187-191` (skip-link also uses same 3px/2px pattern)
- Skip link present on all 8 pages and visible on focus via `top: var(--space-4)` transition — `base.css:170-191`, rendered in every HTML file (e.g. `index.html:56`)
- `prefers-reduced-motion` handling present in CSS — `base.css:201-208` and `base.css:276-284` disable animations for `prefers-reduced-motion: reduce`
- `prefers-reduced-motion` handling present in JS — `js/main.js:11-13` reads the media query, line 54 skips scroll-reveal init, line 83 uses `behavior: prefersReducedMotion ? 'auto' : 'smooth'` for anchor scrolling
- `lang="en"` on `<html>` of all 8 pages — verified on every page (e.g. `index.html:2`)

## ⚠️ Concerns (non-blocking)

- **`.feature-card p` opacity** — `components.css:411-416` applies `var(--color-text)` correctly at full opacity ✅ — however `.feature-detail p` on the features page (`components.css:465`) uses `rgb(237, 228, 204, 0.8)` at 80% opacity — contrast on midnight navy is ~10.3:1 (passes WCAG AA) but violates the "full opacity" requirement — impact: contrast still passes AA but spec compliance is broken
- **Multiple body/label text elements using reduced opacity** — `theme.css:224` (`.hero-sub` 0.85), `theme.css:384` (`.content-section p` 0.85), `theme.css:427` (`.ecosystem-list li` 0.85), `theme.css:460` (`.faq-item dd` 0.8) — all bypass `var(--color-text)` with raw RGB opacity — contrast ratios remain ≥9:1 on dark navy so WCAG AA is met, but the "no opacity modifier on body text" rule is violated across multiple selectors
- **`.page-lead` uses `--color-neutral`** (`theme.css:130`) — `#A8B4C0` on `#0D1B2A` gives ~5.4:1 contrast, which passes WCAG AA for normal text (≥4.5:1) but is the weakest text contrast in the design system — consider elevating to a warmer neutral or the `--color-text` value

## ❌ Failures (must fix this round)

- **`.feature-card p` — builder report does not match current state** — `components.css:411` correctly shows `var(--color-text)` at full opacity, but the rubric requirement was specifically for `.feature-card p` to use full-opacity `var(--color-text)` — this IS now fixed ✅. However, `.feature-detail-text p` (`components.css:465`) and all theme-level body text listed above are still using raw RGB opacity. The three specific selectors the user asked about are fixed, but the broader opacity pattern persists across the codebase.

## Recommendations (ranked by impact)

1. Replace `rgb(237, 228, 204, 0.8)` / `rgb(237, 228, 204, 0.85)` on body/paragraph text with `var(--color-text)` — this applies to `components.css:465`, `theme.css:224`, `theme.css:384`, `theme.css:427`, `theme.css:460` — impact: high, effort: low
2. Add a `text-body-muted` utility using `--color-neutral` for secondary paragraphs if the muted tone is intentional, rather than raw opacity on the primary text color — impact: medium, effort: low
3. Verify `.page-lead` contrast at 0.875rem — `~5.4:1` passes AA but is the minimum in the system; if a slightly warmer neutral is desired, consider a tint closer to parchment — impact: low, effort: low

## Evidence

- `grep -n "\.nav-menu a\|color.*var(--color-text)" /home/sites/phlix/phlix-website/sites/stardust-observatory/css/components.css | head -10` → line 80 full opacity
- `grep -n "\.footer-col a" /home/sites/phlix/phlix-website/sites/stardust-observatory/css/components.css` → line 195 full opacity
- `grep -n "\.feature-card p" /home/sites/phlix/phlix-website/sites/stardust-observatory/css/components.css` → line 415 full opacity
- `grep -n "focus-visible\|outline.*focus\|outline-offset" /home/sites/phlix/phlix-website/sites/stardust-observatory/css/base.css` → lines 194-198 confirm 3px `#E8D48B` + 2px offset
- `grep -n "skip-link" /home/sites/phlix/phlix-website/sites/stardust-observatory/css/base.css` → lines 170-191 confirmed
- `grep -n "prefers-reduced-motion" /home/sites/phlix/phlix-website/sites/stardust-observatory/` → `base.css:201,277`, `main.js:11,54,83`
- `grep -l 'lang="en"' /home/sites/phlix/phlix-website/sites/stardust-observatory/*.html` → all 8 files
- `grep -n "rgb(237, 228, 204, 0" /home/sites/phlix/phlix-website/sites/stardust-observatory/css/*.css` → `components.css:465`, `theme.css:224,384,427,460`
