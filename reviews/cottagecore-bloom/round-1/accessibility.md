# Accessibility Review — Cottagecore Bloom

**Variant**: cottagecore-bloom
**Round**: 1
**Reviewer**: adversarial reviewer (Claude Opus 5)
**Date**: 2026-07-25

## Score

- **Accessibility**: 78 / 100

## ✅ Passed

- **Every contrast claim independently re-measured and all six derived ink tokens
  verified.** I recomputed the WCAG relative-luminance ratios from scratch rather
  than trusting `SITE.md` or `REGEN_PLAN.md`. All six "ink" hexes are *exactly*
  the mix the author claims (`mix(pigment, #2A1A10, pct)` reproduces each hex
  byte-for-byte), and every ratio is right to ±0.01:

  | token | hex | ivory `#FFF8F2` | cream `#FFF3E8` | butter `#FDEEDE` |
  | --- | --- | --- | --- | --- |
  | `--color-rose-ink` | `#99434F` | 6.10 | 5.88 | 5.65 |
  | `--color-sage-ink` | `#5A6947` | 5.63 | 5.42 | 5.21 |
  | `--color-lav-ink` | `#69587B` | 6.08 | 5.86 | 5.62 |
  | `--color-taupe-ink` | `#7A6A5D` | 4.93 | 4.75 | 4.56 |
  | `--color-herb-ink` | `#44684A` | 6.00 | 5.79 | 5.55 |
  | `--color-honey-ink` | `#8E5922` | 5.54 | 5.34 | 5.12 |

  All twelve small-text combinations clear 4.5:1. The kit's own prose
  (`accessibility.minimum_contrast`) is wrong — Garden Rose on Warm Ivory is
  **4.02:1**, not 4.8:1, and ivory-on-rose is the same 4.02:1, so the kit's
  recommended primary-button pairing fails AA. The author caught this and moved
  the button fill to `--color-rose-ink` (`css/components.css:260-265`), giving
  the label **6.10:1**. `#7f3742` (the hover fill, `components.css:268`) measures
  7.60:1. Correct call, correctly executed.
- **The seasonal variants keep their headroom.** `js/main.js:369-416` overrides
  the ink tokens alongside the display hues, so no variant silently drops a text
  ratio. I checked all three against their own backgrounds: the worst case is
  `--color-taupe-ink` on Harvest's `#FFF0DC` at **4.63:1** — still passing.
- **§19.8 fully satisfied for the key-sequence egg.** `js/main.js:335-362`:
  returns early on `INPUT|TEXTAREA|SELECT`, `isContentEditable` and
  `role="textbox"`; never calls `preventDefault`; ignores modifier chords; exits
  on `Escape`. There is no way for it to swallow typing or shadow a shortcut.
- Skip link works and is real (`base.css:274-296`, `main` carries `tabindex="-1"`).
- Focus treatment matches the kit exactly — 2px rose ring, 2px offset, 4px halo
  (`base.css:157-160, 299-304`) — and is never clipped.
- `prefers-reduced-motion` is honoured in three independent places: the global
  reset (`base.css:352-364`), the petal-unfold pre-state (`theme.css:760-766`),
  and Primrose's idle drift (`components.css:1139-1143`). The reveal system also
  has a 2500 ms safety net (`js/main.js:117`) so nothing can stay invisible.
- The 200%-zoom traps are genuinely fixed, not papered over: `.visually-hidden`
  carries `overflow: hidden` (`base.css:337-347`) and `overflow-wrap: anywhere`
  is applied to the text elements that need min-content shrinking
  (`base.css:55-69`). Both fixes are correct and the reasoning in the comments is
  accurate.
- Decorative SVG discipline is consistent across all ten pages: `aria-hidden` +
  `focusable="false"` on every icon, real `alt` on the three seasonal motifs,
  `alt="Phlix logo"` on the wordmark, `aria-label` on the sigil button
  (`index.html:310`), and a `visually-hidden` name on the mascot button
  (`index.html:966`).
- The mascot bubble is a pre-existing `role="status"` element wired with
  `aria-describedby` (`index.html:961-962`) — more careful than most sites in
  this program.
- Touch targets: `min-height: 48px` on `.btn` / `.nav-toggle`, 44px on
  `.nav-sigil`, `.nav-menu a`, `.footer-mirror a`, `.calm-toggle`,
  `.mascot-dismiss`, `.plant-label > summary`. Nothing under 44.
- No positive `tabindex` anywhere. No forms, so no label defects possible.

## ⚠️ Concerns (non-blocking)

- **`js/main.js:191-208` — the first Primrose tip fires as a pop-up on page
  load**, which is exactly what the comment on `:195-196` promises it does not
  do. The home tip is anchored to `.hero`, and the hero is intersecting at load,
  so `IntersectionObserver` calls `say()` immediately. Verified: at both 768px
  and 1280px `.mascot-bubble.hidden === false` with a filled bubble within
  900 ms of `networkidle0`. It auto-hushes after 7 s and it does not cover the
  CTA, so this is not a blocker — but an unrequested speech bubble on load is a
  distraction for AT and for low-vision users, and the code's own claim is false.
  Delay the first tip until a scroll or interaction, or correct the comment.
- **`css/base.css:222-224` — `strong { font-weight: 500 }` is below the
  perceptual threshold.** Lora 400 → 500 at 17px is roughly a one-stem-pixel
  difference; there is no second channel, so emphasis is effectively invisible to
  a low-vision reader and to anyone with a substituted fallback face (Georgia has
  no 500). Note this is *not* a case of a missing weight: the kit constrains Lora
  to `fonts.body.weight: [400, 500]`, so jumping to 700 would introduce an
  undeclared body weight. The right fix is a second, non-weight cue —
  `color: var(--color-rose-ink)` (6.10:1) or a subtle
  `text-underline-offset` — rather than a heavier face. Scope is small:
  `<strong>` occurs exactly once on the entire site (`seasons.html:479`), which
  is itself thin use of emphasis across ten pages of prose.
- **`css/components.css:143` vs `:151-153` — two of the three nav `emphasis`
  tiers are distinguished only by a 100-unit Nunito step at 15px.** `default` is
  `font-weight: 500`, `primary` is `600`, and only `muted` gets a second channel
  (colour, `:155-157`). kit-brief requires all three tiers to be "visually
  distinguishable"; at 0.9375rem the 500/600 difference is at the edge of
  perceptible and vanishes entirely on a fallback stack. Give `primary` a second
  channel.
- **`css/components.css:882-888` — Dancing Script carries real content at its
  smallest size in the site's lowest-contrast text colour.**
  `.faq-list dt.faq-rephrase` sets the three `faq_experience.extra_questions` in
  Dancing Script 700 at 1.4rem (22.4px) in `--color-taupe-ink` (4.93:1 measured).
  Both numbers pass — 22.4px bold clears the large-text bar and 4.93 clears the
  small-text bar — so this is legal, not a failure. But a cursive face's
  effective x-height at 22.4px is comparable to an 11–12px roman, and these are
  *questions a reader must parse* (`about.html:437, 452, 473`), not a flourish.
  Every other Dancing Script use on the site is safe: `.script` ≥24px
  (`theme.css:48-55`), `.paths h2` 21.6–30.4px in `--color-text`,
  `.footer-tagline` 24–34.4px, `.reward-note` 21.6px in `--color-text`. Move the
  rephrase to `--color-text` or `--color-rose-ink` (6.10:1) and ≥1.6rem.
- **`js/main.js:63-69` — the parallax transforms are not cleared when the visitor
  asks for stillness.** Turning on "Quiet the Garden" calls `closeEggs()` but
  leaves the inline `translate3d(...)` that `draw()` wrote at `:143` on all five
  `.hero-plane` elements, so the diorama stays frozen mid-drift rather than
  returning to register. There is also no `reduceMotion.addEventListener('change', …)`,
  so flipping the OS setting mid-session has the same effect. Clear
  `el.style.transform` when `isStill()` becomes true.

## ❌ Failures (must fix this round)

- **`css/components.css:1088-1101` + `sites/cottagecore-bloom/index.html:954-969`
  — the fixed Primrose companion steals clicks from a `visitor_paths` card
  between 720px and ~899px.** `.mascot` becomes `position: fixed; z-index: 60`
  at `width >= 45rem` (720px). At 768×1024 the second path card
  ("I host movie nights") occupies (390,916)–(736,974) and the
  `.mascot-dismiss` button ("Primrose, rest now") plus the `.mascot-bee` button
  sit on top of its right-hand portion: **7 of 18 hit-test points inside the card
  resolve to `mascot-dismiss` instead of the card.** At 860px the same happens to
  "I like to build my own paths" (5/18). A tablet visitor aiming at a declared
  `visitor_paths` control gets Primrose dismissed instead of navigating to
  `features.html#syncplay`. Clean at ≥900px, and correctly hidden below 720px.

  `render-check` cannot see this: it gates only the *primary CTA* (per §19.11)
  and its four viewports are 320×640, 320×700, 375×667 and desktop — it never
  probes the 720–899px band where the companion exists but the nav is still
  collapsed. Reproduction:

  ```js
  // 768x1024, index.html, after load
  document.elementFromPoint(615, 959)  // → button.mascot-dismiss
  // expected: a.path-card  (card 2 spans x 390-736, y 916-974)
  ```

  **Required outcome**: raise the companion's breakpoint to
  `width >= 56.25rem` so it matches the nav's own 900px breakpoint (the band
  where the mascot and the fork collide then does not exist), or move the fixed
  column clear of the `visitor_paths` grid. Every interactive control must remain
  hittable across its whole box at every viewport, not only the primary CTA.

- **Heading hierarchy is flattened on six of the ten pages: card titles are
  `<h2>`, the same level as the `<h2 class="section-title">` that introduces
  them.** Worst on the least-scrutinised page —
  `sites/cottagecore-bloom/seasons.html:349` is
  `<h2 class="section-title">Four moods, one garden</h2>`, and `:364`, `:389`,
  `:420`, `:451` are four `<h2>` season names *inside that same `<section>`*,
  followed by `:475` `<h2>How the change happens</h2>`. The page's outline is
  therefore `h1` + **ten flat `h2`** with no `h3` at all, so a screen-reader user
  browsing by heading cannot tell that four of those headings are cards nested
  inside another. The same inversion is at `features.html:350` vs
  `:363, 381, 398, 412, 426, 440, 454, 468`; `clients.html`; `plugins.html`;
  `hub.html`; `download.html:350` vs `:355, 376, 458`.

  The CSS proves the intent is subordinate, not peer:
  `components.css:911` `.season-card h2 { font-size: 1.35rem }` and
  `components.css:713-715` `.feature-detail h2 { clamp(1.35rem, 3vw, 1.85rem) }`
  are both *smaller* than `theme.css:65-67`
  `.section-title { clamp(1.65rem, 3.6vw, 2.6rem) }`. Visual hierarchy contradicts
  the programmatic hierarchy — WCAG 1.3.1. `index.html` gets this right (cards use
  `<h3>` at `:623, 644, 660, 677, 694, 711, 760, 938`), so the home page and the
  interior pages also contradict each other.

  **Required outcome**: demote card / room / season / step titles to `<h3>` and
  retarget `components.css:537, 583, 713, 756, 802, 911` and
  `theme.css:662` accordingly. `<article>` does not rescue this — the HTML outline
  algorithm was never implemented by any browser or AT.

## Recommendations (ranked by impact)

1. Raise `.mascot`'s breakpoint from `45rem` to `56.25rem` (impact: high, effort: low).
2. Demote interior-page card titles `h2 → h3` and retarget the CSS (impact: high, effort: medium).
3. Give `.faq-rephrase` `--color-text` and `≥1.6rem` (impact: medium, effort: low).
4. Add a colour cue to `strong` and to `[data-emphasis='primary']` (impact: medium, effort: low).
5. Clear `.hero-plane` transforms and delay the first tip (impact: low, effort: low).

## Evidence

- `node tools/selfcheck.mjs --site cottagecore-bloom` → PASS (1 advisory: "kit
  claims contrast 4.5:1 — verify by measurement").
- `node tools/render-check.mjs --site cottagecore-bloom --shots` → PASS,
  10 pages × 4 viewports.
- Independent contrast recomputation:
  `scratchpad/contrast.mjs` (all 16 foregrounds × 6 backgrounds + the six mix
  reconstructions).
- Puppeteer hit-test sweep at 720/768/800/860/900/960/1024/1100/1280/1440 px on
  `index.html`, `features.html`, `download.html`, `about.html`
  (`scratchpad/sweep.mjs`) — only `index.html` at 720–860px reports blocking.
- `scratchpad/vp-t768.png` — the dismiss pill visibly lying across the second
  path card.
