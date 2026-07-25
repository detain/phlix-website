# CTA / Funnel Review — Swiss Modernist

**Variant**: swiss-modernist
**Round**: 1
**Reviewer**: adversarial reviewer (claude-opus-5)
**Date**: 2026-07-25

## Score

- **CTA / Funnel**: 76 / 100

## ✅ Passed

- Primary CTA is above the fold at every probed viewport (320, 375, 768, 1024, 1280, 1920).
- CTA contrast: `#cc0018` fill with `#f8f8f4` label = **5.51:1**, well past the 3:1 floor and
  past 4.5:1 for the small label. The author correctly refused pure `#e8001c` (4.43:1) for a
  text-bearing surface.
- Download is 1 click from home (hero "Install" → `download.html`), and the ladder's step 2
  ("Step 2 — pick your client" → `download.html#clients`) is a real anchor to a real section
  (`download.html` §02 Clients). Both `cta_ladder` rungs exist and both labels honestly
  describe their destination.
- `conversion_funnel.style: "instant-command"` is real: `download.html` opens on the one-line
  `composer create-project …` command in a `<pre>`, then the five clients, then the ecosystem.
  No marketing preamble, no email gate, no modal, no autoplay.
- The CTA-label conflict in the kit (`copy_overlay.hero.primary_cta` = "Install" vs
  `homepage_narrative.install-cta` = "Get Phlix") is resolved per-slot rather than blended, and
  each label still describes `download.html` honestly (WCAG 2.5.3 satisfied).
- `copy_overlay.hero.secondary_cta` = "Read the spec" points at the docs site, and the button
  carries a `phlix-docs` sub-label so the accessible name is "Read the spec phlix-docs" —
  the destination is disclosed. Good §19.7 handling.
- Every page ends on a `cta-banner` with its own voiced headline ("Install it and read the
  code.", "Pick one and install the server.", "Read before you run.", "Get the server, then the
  starter.", "Documentation reads better with a server running.", "The Hub needs a server
  first.", "Answers are cheaper than assumptions.") — no repeated boilerplate CTA copy.

## ⚠️ Concerns (non-blocking)

- **Accent count on the home page is five, not four.** The author counted the hero rule, Install,
  the proof bar and Get Phlix, and missed the 4px Basel Red underrule inside the header wordmark
  (`index.html:82`). On the accent question asked: the four *counted* marks are defensible —
  `page_generation_rules` demands both an anchor rule and a red action, so one red *role* per
  band is the right reading, and no two of them share a viewport at any tested viewport height.
  The accent is **not** overused. The fifth mark, however, is the one the kit explicitly
  forbids (`logo_rules.colors`: "not in navigation") and it is present on every page and in
  every viewport at once — filed as a ❌ in `brand-fidelity.md`, not here.
- Two red `btn-primary` buttons exist on the home page ("Install", "Get Phlix"). They are
  ~1,900px apart vertically and each is field-mandated by a different declared field, so
  `do_dont.ux` "single dominant CTA per screen" holds per screen. Acceptable as built.

## ❌ Failures (must fix this round)

- **`css/components.css:177-244` + `index.html:153-164`** — the secondary CTA is more prominent
  than the primary. Measured at 375px: `Install` = 97 × 48 px (4,673 px²); `Read the spec /
  phlix-docs` = 161 × 62 px (**10,019 px², 2.1× the area**). The `.btn-note` sub-label forces the
  secondary button to two lines and widens it, so the black block dominates the red one — see
  `../shots/index-320x700.png`, where the black button is visibly the heavier mark in the hero.
  This fails the rubric's "Secondary CTA distinguishable but **de-emphasized**", inverts
  `do_dont.ux.do` ("Provide a single dominant CTA per screen in Basel Red") and undoes the whole
  point of the single accent, which is that the red mark is where the eye goes.
  **Required outcome**: keep the primary the largest mark. Either give `.btn-primary` the same
  two-line box (e.g. a `phlix-server` sub-label, or `min-height` matched to the secondary), or
  demote "Read the spec" to `.btn-ghost` (transparent, 1px Ink Black border — the kit's declared
  tertiary weight, `buttons.ghost`) and move the `phlix-docs` note to a `.readout` line beneath.
  Re-measure so `primary.area >= secondary.area` at 320, 375, 768 and 1280.

## Recommendations (ranked by impact)

1. Rebalance the hero button pair so the red mark is the dominant one (impact: high, effort: low).
2. Remove the wordmark's red underrule so the home page carries four red marks, not five
   (impact: medium, effort: low — tracked in `brand-fidelity.md`).

## Evidence

- Puppeteer `getBoundingClientRect()` on `.hero .btn` at 375×800:
  `[{t:'Install',w:97,h:48,area:4673},{t:'Read the spec/phlix-docs',w:161,h:62,area:10019}]`.
- `reviews/swiss-modernist/shots/index-320x700.png`, `index-desktop.png`.
- Contrast of `#cc0018`/`#f8f8f4` recomputed independently: 5.51:1.
