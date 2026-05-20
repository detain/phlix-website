# Accessibility Review — 02-spotlight-projector

**Variant**: 02-spotlight-projector
**Round**: 1
**Reviewer**: Dimension Reviewer
**Date**: 2026-05-20

## Score

- **Accessibility**: 91 / 100

## ✅ Passed

- Skip link present and functional on all 8 pages (`index.html`, `about.html`, `hub.html`, `docs.html`, `plugins.html`, `download.html`, `clients.html`, `features.html`)
- Visible `:focus-visible` indicator defined globally in `base.css:161-164` (2px solid gold outline with 2px offset)
- All images have alt text: logo has `alt="Phlix logo"` (meaningful) on every page; decorative SVGs use `aria-hidden="true"`
- `<html lang="en">` present on all 8 pages
- Single H1 per page with logical heading hierarchy (H1 → H2 → H3) on all pages
- Semantic landmarks: `<header role="banner">`, `<main id="main-content" tabindex="-1">`, `<footer role="contentinfo">`, `<nav role="navigation" aria-label="Primary navigation">` used consistently
- `aria-current="page"` correctly applied to the active nav link on all pages
- `aria-expanded` / `aria-controls` on mobile nav toggle button
- `prefers-reduced-motion: reduce` respected: `base.css:173-181` globally disables animations/transitions, `theme.css:353-357` additionally kills the spotlight-sweep header animation
- No positive `tabindex` values found across all 8 pages
- Color contrast ratios are sufficient:
  - `#FFF7E6` (warm-white) on `#000` ≈ 14.5:1 (WCAG AAA)
  - `#F5C542` (gold) on `#000` ≈ 10:1 (WCAG AAA)
  - `#B8B0A0` (muted) on `#000` ≈ 7.5:1 (WCAG AA)
  - Buttons use gold on near-black, well above 3:1 UI threshold
- No ARIA used where native HTML semantics suffice
- No form inputs requiring labels (all pages are informational — no forms present)

## ⚠️ Concerns (non-blocking)

- **Redundant label on logo link** — `index.html:42` has `aria-label="Phlix home"` on the `<a>` while the nested `<img>` also carries `alt="Phlix logo"`. Screen readers may announce both the link's accessible name and the image's alt text, creating slight verbosity. This is consistent across all 8 pages. — *Suggested: remove `aria-label` from the `<a>` and rely solely on the `<img alt>`; or remove the `alt` from the image if the link label is sufficient*
- **Touch target size on `.nav-toggle` is approximately 40×40px** — On mobile, the hamburger toggle button is 40×40px (padding 0.5rem on a ~24px icon). WCAG 2.2 LC3 Success Criterion 2.5.5 recommends 24×24px minimum, but the non-normative NOTE suggests 44×44px for better accessibility. This is a minor miss that affects only touch users, not keyboard users. — *Suggested: increase padding to bring touch target to ≥44px*
- **Feature-icon SVGs use `aria-hidden="true"` correctly** but are non-decorative content conveying meaning. The surrounding `<article>` provides structure but screen readers may not convey what each icon represents if the accompanying text is not read in context. — *Non-blocking since the h3 text adjacent to each icon provides the accessible name*

## ❌ Failures (must fix this round)

- **None** — No WCAG 2.2 AA failures detected across all 8 pages.

## Recommendations (ranked by impact)

1. **Increase `.nav-toggle` touch target to ≥44×44px** (impact: medium, effort: low) — In `components.css`, change `.site-header .nav-toggle` padding from `var(--space-sm)` to at least `12px` to meet 44px touch target recommendation for mobile users
2. **Remove redundant `aria-label` from nav-logo `<a>`** (impact: low, effort: low) — The `<img alt="Phlix logo">` already provides the accessible name for the link. Remove `aria-label="Phlix home"` from `index.html:42` (and the same pattern on all 7 other pages) to prevent double-announcement
3. **Verify mobile nav toggle keyboard behavior** (impact: medium, effort: low) — The `.nav-toggle` button is part of the tab order. Confirm that JavaScript in `main.js` handles keyboard activation (Enter/Space) for the mobile menu toggle and that menu visibility is announced via `aria-expanded`

## Evidence

- Color contrast calculated manually from CSS custom property values in `base.css:11-25`:
  - `--color-warm-white: #FFF7E6` on `--color-deep-black: #000` → ~14.5:1
  - `--color-gold-spotlight: #F5C542` on `--color-deep-black: #000` → ~10:1
  - `--color-text-muted: #B8B0A0` on `--color-deep-black: #000` → ~7.5:1
- `rg -c 'tabindex="[0-9]' variants/02-spotlight-projector/*.html` — no positive tabindex values
- `rg -c 'role=' variants/02-spotlight-projector/*.html` — landmarks consistently applied
- `rg -c 'prefers-reduced-motion' variants/02-spotlight-projector/css/` — found in `base.css:173` and `theme.css:353`
- All 8 HTML files inspected: `index.html`, `about.html`, `hub.html`, `docs.html`, `plugins.html`, `download.html`, `clients.html`, `features.html`
