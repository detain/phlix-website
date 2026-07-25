# Accessibility Review — Abstract Canvas

> Supersedes the 2026-06-30 review of the **predecessor** site (recoverable from git history).

**Variant**: abstract-canvas
**Round**: 1 (regen pass, `regen/wave-1`)
**Reviewer**: adversarial reviewer (independent; did not build this site)
**Date**: 2026-07-24

## Score

- **Accessibility**: 62 / 100

## ✅ Passed

- **Contrast — exemplary, and independently verified.** I re-measured every leaf text element on
  all 9 pages at 320px and 1280px, compositing every ancestor `background-color` alpha. **Zero**
  elements below their required ratio (4.5:1 normal, 3:1 large). The kit's `minimum_contrast` prose
  is wrong in four places (Cadmium 5.8→**4.73**, Carbon 16.8→**14.87**, Paint Ink 18→**15.96**, Raw
  Umber 3.32); the site's response — reserve the raw pigments for marks/rules/borders and use
  darkened mixes for small text — is correct, and `css/base.css:48-61` + `SITE.md:51-64` reproduce my
  numbers exactly (5.78/5.32/4.75, 5.94/5.47/4.88, 5.59/5.15/4.59, 5.68/5.23/4.66). §19.1 handled
  properly. The one opacity-reduced text run, `.btn-sub` at 0.85 (`css/components.css:280-283`),
  hand-checks to 4.68:1 — still passing.
- Semantics: exactly one `<h1>` per page, **no heading-level skips** on any of the 9 pages, all four
  landmarks present once (`banner`, `navigation`, `main`, `contentinfo`), skip-link first and
  targeting `#main-content` (`css/base.css:279-298`).
- No positive `tabindex` anywhere (only `main[tabindex="-1"]`); no duplicate `id`s; every
  `aria-labelledby` / `aria-controls` reference resolves; every `<img>` has `alt`.
- Focus is `accessibility.focus_style` implemented literally — 2px ultramarine ring + 2px offset +
  4px halo on `:focus-visible` globally (`css/base.css:305-313`).
- `prefers-reduced-motion` is honoured broadly (`css/base.css:348-360`) and again specifically for
  Palette's idle tilt (`css/components.css:584-588`) and the entrance settle
  (`css/theme.css:1299-1304`); the visitor-facing "Gallery quiet" toggle reaches the same end state
  (`css/base.css:363-372`).
- Easter eggs behave per §19.8: the key-sequence listener bails when focus is in
  `input/textarea/select`/`contenteditable`, never calls `preventDefault`, and both eggs exit on
  `Esc` (`js/main.js:299-324`).
- The mobile menu toggle is 48×48, labelled "Open/Close navigation menu", `aria-expanded` flips,
  outside-click and `Esc` both close it and return focus to the toggle (`js/main.js:52-74`,
  `301-307`). Open-menu links measure 320×56.
- Decorative art is correctly hidden (`aria-hidden` on the hero field, icons, numerals) and the 404
  canvas carries `role="img"` with a real `aria-label` (`404.html`).

## ⚠️ Concerns (non-blocking)

- No-JS at 320px leaves the primary nav unreachable (`.nav-menu` is `display:none`
  `css/components.css:141-153`, the toggle is inert). The footer full-directory mitigates it.
  — ROUND-1 #9.
- `.code-block` is a scrollable region with no keyboard access (axe `scrollable-region-focusable`,
  serious). — ROUND-1 #10.
- Sub-44px controls that are not the blocker below: `.palette-dismiss` 32×32, footer links 32px,
  repo "spine" links ~20px, `.skip-link` 42px. WCAG 2.2 2.5.8 (24px + inline/spacing exceptions) is
  met; §12's 44px floor is not. — ROUND-1 #11, #13, #14.
- Palette's tip bubble is a `role="status" aria-live="polite"` region fired by scroll position, so a
  screen-reader user gets an unrequested announcement mid-page. Kit-declared behaviour, so noted.
- Print/PDF output drops all 13 `.reveal` blocks. — ROUND-1 #24.

## ❌ Failures (must fix this round)

- **`css/theme.css:180-187`, `css/theme.css:227-233`, `css/theme.css:105-108`** — layout does not
  survive 200% text zoom on 5 of 9 pages; on `index.html` the `<h1>` and the primary CTA are visibly
  **clipped** by `.hero{overflow:hidden}` (CTA renders `w=319 right=343` in a 320px viewport). §12
  hard gate + `accessibility.font_scaling`. → ROUND-1 #2.
- **`css/components.css:486-496` + `js/main.js:239`** — the fixed Palette companion overlaps the
  primary hero CTA at 320×640, 320×700, 320×720, 360×640 and 375×667. §19.11 is unconditional.
  → ROUND-1 #3.
- **`js/main.js:277`** — `e.preventDefault()` on every home-page logo click makes a link named
  "Phlix home" inert for both pointer and `Enter`. → ROUND-1 #4.
- **`css/theme.css:478-486`** — `.technical-mark > summary` is 22px tall (208×22 / 226×22 measured)
  yet is the only route to the verbatim technical facts under `jargon_policy: "translate"`. §12
  requires 44px; the kit commits to 48px on mobile. → ROUND-1 #5.

## Recommendations (ranked by impact)

1. Fix the 200%-zoom clipping/overflow chain — `minmax(0,1fr)` on `.wall-grid`, `overflow-wrap` on
   the text roles, lower `.hero-headline` clamp floor (impact: high, effort: low).
2. Keep Palette out of the hero CTA band at ≤700px (impact: high, effort: low).
3. Restore the logo link; count egg clicks in `sessionStorage` (impact: medium, effort: low).
4. Give `summary`, `.palette-dismiss` and footer links real 44/48px hit areas (impact: medium,
   effort: low).
5. `tabindex="0"` on `.code-block`; `@media print { html.js-reveals .reveal { opacity: 1 } }`
   (impact: low, effort: trivial).

## Evidence

- `node tools/selfcheck.mjs --site abstract-canvas` → PASS + kit-contrast warning.
- `node tools/render-check.mjs --site abstract-canvas --shots` → FAIL 1 (download @320).
- Custom puppeteer probes: per-element WCAG contrast with alpha compositing; interactive-target
  geometry; heading/tabindex audit; 200%-zoom sweep over all 9 pages; palette-vs-CTA overlap across
  10 viewports; JS-disabled render; print-media emulation.
- `reviews/abstract-canvas/shots/rev-zoom200-home-320.png` (clipped `<h1>` + CTA);
  `reviews/abstract-canvas/shots/rev-palette-cta-320x700.png` (Palette on the CTA).
- pa11y/axe and Lighthouse were not runnable here; every number above is a direct browser
  measurement, not a tool summary.
