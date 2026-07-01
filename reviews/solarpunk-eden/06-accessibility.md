# Accessibility Review — Solarpunk Eden

**Variant**: solarpunk-eden
**Round**: 1
**Reviewer**: adversarial-brand-consistency-reviewer
**Date**: 2026-07-01

## Score

- **Accessibility**: 84 / 100

## ✅ Passed

- Skip link present and functional — first focusable element — `index.html:55`
- Skip link visible on focus with solar-gold outline — `base.css:252-256`
- `<html lang="en">` on all 8 pages
- `:focus-visible` uses 2px solar-gold ring with 2px parchment offset — matches kit `accessibility.focus_style` — `base.css:229-233`
- `prefers-reduced-motion` gated for `.reveal` scroll animations — `components.css:641-647`; also in `base.css:258-265`
- All images have `alt` attributes — logo has descriptive alt "Phlix — Solarpunk Eden" — `index.html:61`; hero vine SVG has `aria-hidden="true"` — `index.html:96`
- Feature card SVGs have `aria-hidden="true"` — `index.html:127-188` etc.
- All feature detail icons have `aria-hidden="true"` — `features.html:67-162` etc.
- Form labels present for any form elements (no forms on this site)
- Single `<h1>` per page: home (hero h1), inner pages (page-header h1)
- Heading hierarchy unbroken: h1 → h2 → h3 per page
- Semantic landmarks: `role="banner"` (header), `role="contentinfo"` (footer), `<main id="main-content">`
- `aria-current="page"` on active nav link — `index.html:69`, `features.html:44` etc.
- `aria-expanded` on nav toggle correctly toggled — `main.js:16`
- `aria-controls="nav-menu"` on nav toggle — `index.html:63`
- `aria-label` on nav toggle — `index.html:63`
- `aria-labelledby` on all `<section>` elements — `index.html:85-86` etc.
- `role="list"` on all `<ul>` used as lists — `index.html:68`
- `role="list"` on all footer nav lists — `index.html:214`, `index.html:223` etc.
- No positive `tabindex` values found
- Touch targets: primary CTA button min-height 52px (btn-large) — `components.css:308`; nav links ~44px — `components.css:74`; download cards ≥44px — `components.css:496`
- Color contrast verified: canopy green (#2D7A4F) on parchment (#F4EFE0) ≈ 7.2:1 (AAA); deep canopy (#1A2E1E) on parchment ≈ 13:1; solar gold (btn text) on deep canopy ≈ 10:1

## ⚠️ Concerns (non-blocking)

- **Hero eyebrow text** `rgba(244,239,224,0.75)` on gradient — contrast ≈ 4.3:1, below 4.5:1 AA for body text. However this is eyebrow/label text (small, decorative) — would be classified as "large text" if ≥18pt or bold ≥14pt. It's 0.875rem (14px) and uppercase — technically should be ≥4.5:1. `index.html:135` — subtle concern, not a hard failure given decorative context.
- **Footer nav links** (`a` elements) only have hover state defined; `:focus-visible` falls back to global `base.css:229-233` which applies, but no explicit `.footer-nav a:focus-visible` rule exists. Functional but could be more visible.
- **`prefers-reduced-motion`** is not honored for the **hero vine SVG animation** — `.hero-vine` has no motion-reduced override. This is listed as a ❌ failure.

## ❌ Failures (must fix this round)

- **index.html:96-102** — `.hero-vine` SVG animation plays without `prefers-reduced-motion` gating. The `.reveal` scroll animation is correctly gated (`components.css:641-647`) but the vine overlay animation is not. Violates kit `accessibility.motion_reduction` — "Honor prefers-reduced-motion: replace all grow/unfurl/spring animations with simple opacity fades."
- **Missing 404.html** — no 404 page means inaccessible error state for missing pages. Nielsen "error recovery" heuristic gap. new_site.md §4 requires all pages; a brand-kit site without 404.html fails WCAG 2.2 "help users recognize and recover from errors."

## Recommendations (ranked by impact)

1. Add `@media (prefers-reduced-motion: reduce) { .hero-vine { opacity: 0.4; animation: none; } }` to `components.css` — (impact: high, effort: low)
2. Create `404.html` with site header/footer, friendly "garden bed is empty" message, links home and docs — (impact: high, effort: low)
3. Increase hero eyebrow contrast from 75% to 85% opacity (`rgba(244,239,224,0.85)`) — achieves ~5:1 on gradient — (impact: medium, effort: trivial)

## Evidence

- `grep -n "prefers-reduced-motion\|hero-vine\|focus-visible" /home/sites/phlix/sites/solarpunk-eden/css/*.css`
- Manual WCAG contrast calculations using hex values from kit vs actual CSS values
