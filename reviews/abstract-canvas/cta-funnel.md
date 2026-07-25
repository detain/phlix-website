# CTA / Funnel Review — Abstract Canvas

> Supersedes the 2026-06-30 review of the **predecessor** site (recoverable from git history).

**Variant**: abstract-canvas
**Round**: 1 (regen pass, `regen/wave-1`)
**Reviewer**: adversarial reviewer (independent)
**Date**: 2026-07-24

## Score

- **CTA / Funnel**: 86 / 100

## ✅ Passed

- **Primary CTA above the fold** on home (`index.html:165`, "Set Up Your Studio" → `download.html`),
  measured at `t=612` in a 320×640 viewport and higher on every larger phone; contrast is carbon on
  linen = **14.87:1**, far past the 3:1 requirement.
- **Download is 1 click from home** — nav "Get Started", the hero CTA, and rung 01 all land on
  `download.html`. Inside the ≤2-click rule with room to spare.
- **The declared `cta_ladder` is actually built** as three ordered rungs (`index.html:526-542`):
  "Set Up Your Studio" → `download.html`, "Choose Your Stations" → `clients.html`, "Prime the Canvas"
  → `download.html#server`, with the numerals and a cadmium rule on rung 01 only. The step names then
  recur consistently as the closing CTAs on the other pages.
- **Secondary CTA is de-emphasised and honest**: cadmium *outline* (not a fill) and the visible text
  discloses the destination — "Browse the Gallery **(the docs)**" — so the accessible name matches
  what happens on click (§19.7 / WCAG 2.5.3). Its contrast at `opacity:.85` measures 4.68:1, still AA.
- Every page ends in a `.cta-banner` that drives to download (the download page's own banner drives to
  the docs, per §5).
- **No dark patterns**: no modal, no email gate, no autoplay, no interstitial, no countdown. The
  `visitor_paths` fork under the hero is three plain links to feature anchors, all of which resolve.
- `conversion_funnel.style: "guided-steps"` is legible as a journey rather than a repeated button, and
  `friction_notes` ("respect the contemplative pace") is honoured — the page never nags.

## ⚠️ Concerns (non-blocking)

- The hero exposes **five** competing links below the CTAs (two CTAs + three fork paths) before the
  first scroll. Kit-declared (`visitor_paths`), and `do_dont.ux.dont` warns against "multiple equally
  prominent CTAs" — the fork is visually quieter, so this is within tolerance, but it is the one place
  the funnel widens rather than narrows.
- On `clients.html` the closing banner promotes rung 3 ("Prime the Canvas") as the *primary* and rung 1
  as the ghost, inverting the ladder for a visitor who arrived there first (`clients.html:306-309`).
  Minor.
- "The install itself is one line" appears in three closing banners; see the content ❌.

## ❌ Failures (must fix this round)

- **The primary CTA is physically obstructed on phones.** `.palette-companion` overlaps
  `.hero-actions .btn-primary` at 320×640, 320×700, 320×720, 360×640 and 375×667 — a 41×12px bite out
  of the bottom-right corner of the one button the whole funnel depends on, plus the `×` dismiss
  sitting on it. §19.11. Note that `tools/render-check.mjs:176-179` never tested it, because its CTA
  regex (`/get |download|start|install/`) does not match this kit's renamed label. → ROUND-1 #3.
- **At 200% text zoom the same button is clipped** — it renders `w=319 right=343` in a 320px viewport
  and is sliced by `.hero{overflow:hidden}`. A zoomed visitor sees a cut-off primary action.
  → ROUND-1 #2.

## Recommendations (ranked by impact)

1. Guarantee no fixed element ever intersects `.hero-actions` (impact: high, effort: low).
2. Make the primary CTA fit its column at 200% zoom (impact: high, effort: low).
3. Consider deferring the `visitor_paths` fork until after the first fold on phones, so the hero has
   exactly two actions (impact: low, effort: low).

## Evidence

- Measured CTA and companion rects across 10 viewports; `reviews/abstract-canvas/shots/rev-palette-cta-320x700.png`
  and `…/rev-zoom200-home-320.png`.
- Click-path walk: home → download (1 click) via nav, hero and ladder; every `cta_ladder` target and
  every `visitor_paths` anchor verified to resolve.
