# CTA / Funnel Review — Cottagecore Bloom

**Variant**: cottagecore-bloom
**Round**: 1
**Reviewer**: adversarial reviewer (Claude Opus 5)
**Date**: 2026-07-25

## Score

- **CTA / Funnel**: 86 / 100

## ✅ Passed

- **Primary CTA above the fold at every viewport.** Measured position of
  `.hero-actions .btn-primary`: `y = 586` at 375×667, `y = 604` at 768×1024,
  `y = 722` at 1280×900. Visible without scrolling in all three.
- **Contrast well above the 3:1 requirement — and this is where the kit's own
  arithmetic failed.** The kit asserts ivory-on-Garden-Rose = 4.8:1; it measures
  **4.02:1**, which fails AA for a button label. The author moved the fill to
  `--color-rose-ink` `#99434F` (`components.css:260-265`), giving the label
  `#FFF8F2` on `#99434F` = **6.10:1**, and the hover fill `#7f3742` = **7.60:1**.
  Both independently verified. The button also clears 3:1 against the page ground
  as a UI component (`#99434F` vs `#FFF8F2` = 6.10:1).
- **Secondary CTA is distinguishable and de-emphasised without being invisible.**
  `.btn-secondary` is a transparent fill with a `--color-sage-ink` border and text
  at **5.63:1** (`components.css:278-287`) — a legitimate WCAG-passing outline
  button, not a grey ghost.
- **Download is one click from home** — well inside ≤2.
- **The full `conversion_funnel.cta_ladder` ships, with a visible weight
  hierarchy.** `index.html:924-934` renders the three rungs as an `<ol>` with a
  descending button ladder: rung 1 `btn-primary`, rung 2 `btn-secondary`, rung 3
  `btn-ghost`. A visitor can see the intended order rather than having to infer it.
- **Every CTA label honestly describes its destination (WCAG 2.5.3).** I checked
  all three ladder rungs against the kit's declared targets:
  "Start Your Garden" → `download.html` (kit: `download`) ✅;
  "Pick Your Guest Rooms" → `clients.html` (kit: `clients`) ✅;
  "Plant the Seeds" → `download.html#server` (kit: `download#server`) ✅.
  The metaphorical labels are the kit's own and each lands where the kit says.
  The 404 recovery ladder is equally honest — "Back to The Garden" → `./`,
  "See What Grows Here" → `features.html`, "Start Your Own" → `download.html`,
  matching the nav labels those pages carry.
- **`conversion_funnel.style: "guided-steps"` and `download_opening` are both
  real.** `download.html:341` opens with the declared "Three steps to blooming"
  as visible lead copy, then three `<article class="step">` sections
  (`#server` "Prepare the soil", `#seeds` "Choose your seeds", `#bed`
  "Let the bed fill in"), each with a Playfair numeral. The
  "two steps" / "three steps" conflict between `page_blueprints.download.spec`
  and `conversion_funnel` was resolved in favour of the structured field, which is
  the correct precedence.
- **`visitor_paths` is a genuine second funnel, not decoration.** Three
  self-select cards in the hero routing to three real feature anchors
  (`features.html#library`, `#syncplay`, `#plugins`), with the `tinkerer` path
  deliberately pointing at the folded-in demoted page.
- **No dark patterns at all**: no modal, no email gate, no autoplay, no urgency
  copy, no scarcity claim, no interstitial. The one non-CTA interruption — the
  Primrose tip bubble — never overlaps the primary CTA at any viewport (verified:
  bubble at (952,670) vs CTA at (32,722) at 1280px; (483,770) vs (32,604) at
  768px).
- Exactly one Garden-Rose-family primary action per screen, satisfying
  `do_dont.ux` "Provide one clear rose-coloured CTA per screen".

## ⚠️ Concerns (non-blocking)

- **The `visitor_paths` fork — the site's secondary funnel — is partly
  unclickable between 720px and ~899px.** The fixed Primrose companion's dismiss
  pill overlays the right-hand portion of one path card (7 of 18 hit-test points at
  768px resolve to `button.mascot-dismiss`; 5 of 18 at 860px). The primary CTA is
  unaffected, so this is filed as a ❌ under Accessibility / Usability / Responsive
  rather than here — but the funnel consequence is worth stating: a tablet visitor
  aiming at "I host movie nights" gets Primrose dismissed instead of reaching
  `features.html#syncplay`, and the dismissal is persisted with no undo.
- **`copy_overlay.hero.secondary_cta.label` is declared as "Peek Inside"; the
  hero ships "Peek Inside the Garden"** (`index.html:452`, and the same expansion
  at `clients.html:482` and `plugins.html:471`). The longer label is arguably
  clearer, but the deviation is not recorded in `REGEN_PLAN.md:21`. Use the
  declared label or record the change.
- **The secondary CTA competes with a third link in the same hero block.**
  Below the two buttons, `index.html:454-460` adds "Prefer to read first?
  Read the docs" — which is `content.json`'s *own* `secondary_cta`. Retaining it is
  correct (no fact dropped) and it is styled down to `.muted`, but the hero now
  offers three onward routes plus a three-card fork. Against the kit's
  `do_dont.ux.dont` "Use multiple equally prominent CTAs that compete for
  attention" it is defensible — the weights are genuinely different — but it is
  the densest CTA cluster on the site and the one place `density: minimal` is
  strained.
- **Pure Garden Rose decorates ~nine non-CTA elements while the CTA itself is a
  different, darker rose.** On the home page the two rose-bordered `.plate`
  articles and the rose-glowing `.seed-box` compete with the CTA ladder for first
  fixation (see `shots/index-desktop.png`), and the kit's `color_rules` reserve
  Garden Rose "for the single most important CTA per screen". Detailed in
  `branding-consistency.md`; the funnel effect is that the loudest colour on the
  page is not the button.

## ❌ Failures (must fix this round)

_None in this dimension._ (The mascot click-theft defect is filed as a ❌ under
Accessibility, Usability and Responsive; it damages the secondary funnel but does
not touch the primary CTA, which is the criterion this dimension owns.)

## Recommendations (ranked by impact)

1. Fix the 720–899px mascot overlap so the `visitor_paths` fork is fully clickable (impact: high, effort: low).
2. Thin the decorative Garden Rose so the CTA is unambiguously the loudest element (impact: medium, effort: low).
3. Restore the declared "Peek Inside" label, or record the deviation (impact: low, effort: trivial).

## Evidence

- Measured `.btn-primary` / `.btn-secondary` / `.mascot-bubble` geometry at
  375 / 768 / 1024 / 1280 (`scratchpad/probe.mjs`, `probe2.mjs`).
- Independent contrast computation for `#FFF8F2` on `#99434F` (6.10),
  `#7f3742` (7.60) and — for comparison — the kit's recommended `#C8556A`
  (**4.02**, fails) (`scratchpad/contrast.mjs`).
- `cta_ladder` targets cross-checked against `brand-kits/cottagecore-bloom.js:1450-1454`.
- 57-point per-card hit-test at 768px (`scratchpad/probe3.mjs`).
