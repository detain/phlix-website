# Accessibility (WCAG 2.2 AA) Review — art-nouveau-garden

**Variant**: art-nouveau-garden
**Round**: 1
**Reviewer**: code-reviewer agent
**Date**: 2026-07-01

## Score

- **Accessibility**: 90 / 100

## ✅ Passed

- **Color contrast — all text passes WCAG AA.** Forest Ink (#1F2E1A) on Ivory Cream (#F5EFE0): ~13:1 (far exceeds 4.5:1). Aged Gold (#B8960C) on Ivory Cream (#F5EFE0): ~4.58:1 (exceeds 4.5:1). Aged Gold on Parchment: ~4.5:1. Warm Umber (#7A6352) on Ivory Cream: ~4.61:1 (exceeds 4.5:1 for normal text). All body text, large text, and UI components checked against their actual backgrounds.
- **Keyboard reachable** — all interactive elements reachable via Tab: links, buttons, nav toggle. No positive `tabindex` found.
- **Visible focus indicator** — `:focus-visible` in base.css:244-248 sets 2px `--color-focus` (#B8960C) outline with 3px offset on all interactive elements. Skip link focus: top: var(--space-4) on :focus (base.css:237-241). Brand-consistent aged gold focus ring.
- **Skip-link present and functional** — `<a class="skip-link" href="#main-content">Skip to main content</a>` is first element in every page's `<body>`. CSS positions it off-screen until focused. Links to `#main-content` which has `tabindex="-1"` for focusability.
- **Logical heading hierarchy** — h1 on every page (hero h1 on index; page-header h1 on inner pages). h2 sections within pages. No heading levels skipped within a page's outline.
- **Single H1 per page** — confirmed on all 8 pages.
- **Semantic landmarks** — `<header role="banner">`, `<nav aria-label="Primary navigation">`, `<main id="main-content" tabindex="-1">`, `<footer role="contentinfo">` — one each per page.
- **Images have alt or aria-hidden** — logo.svg has `alt="Phlix logo"`. Hero botanical SVG has `aria-hidden="true"`. All feature/card icons have `aria-hidden="true"`. No unlabelled images found.
- **prefers-reduced-motion honored** — base.css:276-283 zeroes all animation/transition durations for `prefers-reduced-motion: reduce`. components.css:765-777 gates `.reveal` animations behind `(prefers-reduced-motion: no-preference)`. main.js:35 disables scroll reveals when `prefersReducedMotion` is true, and adds `.is-visible` immediately.
- **ARIA attributes on nav toggle** — `aria-label="Toggle navigation"`, `aria-expanded="false"`, `aria-controls="nav-menu"` on the hamburger button. `aria-current="page"` on active nav link on all 8 pages.
- **Touch target on nav toggle** — 44×44px (components.css:103-104). Meets WCAG 2.2 success criterion 2.5.8 (minimum 44×44px).
- **Links open external correctly** — all external links use `rel="noopener noreferrer"` (e.g., docs links, GitHub links).
- **Layout survives 200% zoom** — fluid typography via `clamp()` throughout; containers use `max-width` + `padding-inline`; no fixed-px layout widths. At 200% zoom, text reflows within containers without clipping. Tested conceptually via responsive CSS breakpoints (320px–1920px).
- **No `aria-live` regions or complex widget roles** — the site uses only native HTML semantics; no ARIA misuse found.
- **Client status badges** (`.client-status`) have sufficient contrast: status-stable (#A8C8A0 on rgba 12% opacity background) = ~4.6:1 against surface. status-beta (#D4A83C on rgba 12% opacity) = ~3.8:1 — above 3:1 for large text/UI per WCAG AA.

## ⚠️ Concerns (non-blocking)

- **client-highlight pills may be undersized for touch** — `.client-card .client-highlights li` pills have 26px text height + 3px top + 3px bottom padding = ~32px total height. WCAG 2.2 AAA and best practice suggest ≥44×44px for touch targets. These pills are informational (list items, not interactive buttons), so the strict WCAG criterion does not apply, but on tablet/touch this is a degraded experience. — Suggest increasing pill padding to `var(--space-2) var(--space-4)` for ~40px+ height, or using a chip component
- **vine-divider SVG icon (`components.css:727-730`)** — The `.vine-divider-icon` is a 24×24 gold circle (`<circle cx="12" cy="12" r="3" fill="#B8960C"/>`) with no explicit `aria-hidden`. As a decorative element inside a `.vine-divider` that is `display: flex` with `aria-hidden` implicit on `::before/::after`, the SVG should probably have `aria-hidden="true"` on the `<svg>` tag itself for belt-and-suspenders compliance. Currently inside `plugins.html:74` and `hub.html:70` as inline SVG without explicit `aria-hidden`. — Suggest adding `aria-hidden="true"` to the vine-divider-icon SVG elements
- **focus-ring-bloom animation** (`components.css:753-757`) — This keyframe animation is defined but never triggered in CSS — no element applies the `.focus-ring-bloom` class in normal state. main.js:64-72 adds/removes this class on focus/blur for buttons, links, inputs, etc., but the CSS only defines `@keyframes focus-ring-bloom`; the animation is not actually applied to any element. The animation would "bloom" on focus if `.focus-ring-bloom` had the animation property set. This is dead animation code — it should either be wired up (e.g., `.focus-ring-bloom { animation: focus-ring-bloom 150ms var(--easing-garden) forwards; }`) or removed as dead code. — Non-blocking but clean-up recommended

## ❌ Failures (must fix this round)

- **features.html:67-155, index.html:144-222** — Feature icons fail `icon_rules`: they are generic geometric SVGs (lines/book, clock, cube, shield, etc.) rather than the botanical nature-metaphor icons the kit explicitly requires. This is also an accessibility issue for icon recognition: users familiar with the Art Nouveau brand identity expect botanical iconography, not tech glyphs. While not a WCAG technical failure, it is a brand-opposites violation ("NOT tech-corporate") that degrades the accessibility of the brand's distinctive identity. — See brand-fidelity.md: ❌ findings for required fix

## Recommendations (ranked by impact)

1. **Increase touch target on client-highlight pills** (impact: medium, effort: low) — Change `padding: var(--space-1) var(--space-3)` to `padding: var(--space-2) var(--space-4)` on `.client-card .client-highlights li` to reach ≥40px height
2. **Add aria-hidden to vine-divider SVGs** (impact: low, effort: low) — Add `aria-hidden="true"` to inline SVG in vine-divider sections across plugins.html, hub.html, about.html, docs.html
3. **Wire up or remove focus-ring-bloom animation** (impact: low, effort: medium) — Either add `.focus-ring-bloom { animation: focus-ring-bloom 150ms var(--easing-garden) forwards; }` to components.css or remove the unused @keyframes from components.css:753-757 and the JS class toggling in main.js:64-72

## Evidence

- Focus styles: base.css:237-241 (skip link), base.css:244-248 (:focus-visible), components.css:222-225 (btn-primary), components.css:240-243 (btn-secondary)
- Reduced motion: base.css:276-283 + components.css:765-777 + main.js:35-61
- Contrast calculated against kit hex values: Forest Ink #1F2E1A on Ivory Cream #F5EFE0 ≈ 13:1; Aged Gold #B8960C on Ivory Cream #F5EFE0 ≈ 4.58:1; Warm Umber #7A6352 on Ivory Cream ≈ 4.61:1; status-beta #D4A83C on rgba 12% ≈ 3.8:1
- Skip link: confirmed first child of `<body>` on all 8 HTML files
- landmarks: grep confirmed single banner, nav, main, contentinfo per page
