# Responsive Review — Abstract Canvas

> Supersedes the 2026-06-30 review of the **predecessor** site (recoverable from git history).

**Variant**: abstract-canvas
**Round**: 1 (regen pass, `regen/wave-1`)
**Reviewer**: adversarial reviewer (independent)
**Date**: 2026-07-24

## Score

- **Responsive**: 60 / 100

## ✅ Passed

- Breakpoint ladder is coherent and matches `responsive_behavior`: single column → 2 up at 640/700
  → 3–4 up at 900/1100, editorial two-track wall grid only from 900px
  (`css/theme.css:110-116`), nav collapses at 860px (`css/components.css:136-171`).
- No fixed-px layout widths; containers are `width:100%` + `max-width` + `margin-inline:auto`
  (`css/theme.css:89-101`), max content width 1400px per `ui_generation_rules`.
- Body text floor holds: `1rem`/`1.0625rem` everywhere, nothing under 16px on phones (the
  predecessor's fix was not regressed).
- The hero colour-field composition explicitly guards the pilot's shrink-to-fit collapse
  (`css/theme.css:262-272`) and renders correctly at every width I probed; `render-check` reports no
  collapsed elements on any page at 320 or 1280.
- Mobile menu works: 48×48 toggle, full-width panel (320×351 measured), 320×56 link rows, `Esc` and
  outside-click close.
- 8 of 9 pages have zero horizontal scroll at 320px, and all 9 are clean at 1280px.

## ⚠️ Concerns (non-blocking)

- Sub-44px touch targets at 320px: `.palette-dismiss` 32×32, footer links 32px, spine links ~20px,
  `.skip-link` 42px. — ROUND-1 #11, #13, #14.
- Palette's tips are suppressed at ≤700px (`js/main.js:239`), which is the right call per §19.11 —
  but the *figure* was left in the CTA band, which is the ❌ below.
- Fonts: 8 faces (~312 KB) are exercised on a phone's first paint. — ROUND-1 #22.

## ❌ Failures (must fix this round)

- **`css/theme.css:105-108`** — `download.html` scrolls horizontally at 320px: `scrollWidth 354 >
  320`. The single implicit `.wall-grid` track is `auto`, so `.code-block`'s unbreakable
  `git clone https://…` min-content (~412px) inflates the whole column to 330px. `overflow-x:auto`
  on the block child does not stop the propagation. → ROUND-1 #1.
- **200% text zoom breaks 5 of 9 pages** — `features.html` 433>320, `download.html` 632>320,
  `plugins.html` 424>320, `about.html` 366>320, and `index.html` silently **clips** its `<h1>` and
  primary CTA inside `.hero{overflow:hidden}`. `tools/render-check.mjs:279-296` only zoom-tests
  `index.html`, and measures `scrollWidth`, which `overflow:hidden` masks. → ROUND-1 #2.
- **`css/components.css:486-496`** — the fixed companion overlaps the primary hero CTA at 320×640,
  320×700, 320×720, 360×640, 375×667 (measured rects in ROUND-1 #3). §19.11. → ROUND-1 #3.

## Recommendations (ranked by impact)

1. `grid-template-columns: minmax(0, 1fr)` on the base `.wall-grid` — one line, fixes the 320px
   overflow and most of the 200% overflow (impact: high, effort: trivial).
2. `overflow-wrap: break-word` on `.wall-text`, `.plain-line`, `.section-intro`, `.talk dt/dd`,
   `.marginalia-item h3`, `.plugin-model` prose, `.code-block code` (impact: high, effort: low).
3. Lower the `.hero-headline` clamp floor so the longest word fits a 320px column at 200% zoom, and
   re-verify nothing is clipped (impact: high, effort: low).
4. Move/hide Palette clear of `.hero-actions` at ≤700px (impact: high, effort: low).
5. Extend the 200%-zoom pass to all 9 pages when re-verifying — the current tool does not
   (impact: medium, effort: low).

## Evidence

- `node tools/render-check.mjs --site abstract-canvas --shots` → `download.html @mobile: horizontal
  overflow — scrollWidth 354 > viewport 320`.
- Custom probe: per-element bounding boxes at 320px for all 9 pages; `html{font-size:32px}` sweep on
  all 9 pages with the offending leaf elements named; palette-vs-CTA overlap across 10 viewports
  (320×568/640/700/720, 360×640/740, 375×667, 390×844, 414×896, 768×1024).
- `reviews/abstract-canvas/shots/rev-zoom200-home-320.png`, `…/rev-palette-cta-320x700.png`.
