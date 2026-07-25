# Usability Review — Abstract Canvas

> Supersedes the 2026-06-30 review of the **predecessor** site (recoverable from git history).

**Variant**: abstract-canvas
**Round**: 1 (regen pass, `regen/wave-1`)
**Reviewer**: adversarial reviewer (independent)
**Date**: 2026-07-24

## Score

- **Usability**: 74 / 100

## ✅ Passed

- **Download is 1 click from home** (nav "Get Started", hero CTA, and rung 01) — well inside the
  ≤2-click rule.
- Recognition over recall: the renamed nav carries a hidden gloss for every label
  (`index.html:112-140` — "The Studio — home", "The Canvas — features"), so the poetic label never
  hides the destination from a screen-reader user, and `aria-current="page"` plus a cadmium underline
  marks position. The two footer-demoted pages get breadcrumbs precisely because no nav item can be
  current (`plugins.html`, `docs.html`).
- User control: the "Gallery quiet" toggle is a real `aria-pressed` control persisted in
  `localStorage`; Palette can be dismissed permanently ("Palette, rest for a moment"); `Esc` closes
  the menu and both eggs. No modals, no gates, no autoplay.
- Consistency: identical shell, identical closing CTA ladder vocabulary, and the same three step
  names ("Set Up Your Studio" → "Choose Your Stations" → "Prime the Canvas") everywhere they appear.
- Match to the real world: `jargon_policy: "translate"` is genuinely built — a plain line first, the
  verbatim engineering wording one disclosure away, on all 8 features.
- Help/docs: `docs.html` gives four labelled routes into the real docs; the secondary CTA is honestly
  labelled "Browse the Gallery (the docs)" so the click is never a surprise.

## ⚠️ Concerns (non-blocking)

- **No-JS at phone widths has no header navigation at all** — the menu is `display:none` and the
  toggle does nothing. Only the footer directory keeps the site usable. — ROUND-1 #9.
- `.code-block` scrolls horizontally but cannot be scrolled by keyboard. — ROUND-1 #10.
- The snippet uses `<div><code>` + `<br>` rather than `<pre><code>`, so shell whitespace is not
  semantic. — ROUND-1 #12.
- Palette's tips fire from scroll position and auto-clear after 9s (`js/main.js:168-177`) — good
  restraint, but on desktop the bubble can appear over the last card of a grid before it clears.
- 22px `summary` and 32px dismiss/footer targets are fiddly with a thumb. — ROUND-1 #5, #11, #13.

## ❌ Failures (must fix this round)

- **`js/main.js:277`** — on the home page every click (and `Enter`) on the wordmark is
  `preventDefault()`ed, so the "Phlix home" link does nothing. Verified in a browser: URL unchanged
  after both a click and a keyboard activation. A visible, named affordance that never responds is a
  usability failure regardless of the egg it serves. → ROUND-1 #4.
- **Palette covers the primary CTA on phones** — a visitor tapping the bottom-right of "Set Up Your
  Studio" hits the companion instead. → ROUND-1 #3.
- **"One line" is asserted on 7 pages for a 3-command install** — the visitor is told the setup is a
  single line and then handed three. → ROUND-1 #8.

## Recommendations (ranked by impact)

1. Restore the logo link (impact: high, effort: low).
2. Get the companion out of the CTA band on small screens (impact: high, effort: low).
3. Make the install literally one line, or stop claiming it is (impact: medium, effort: trivial).
4. Ship a no-JS-navigable menu (open by default, hidden under a `js` guard) (impact: medium,
   effort: low).
5. `tabindex="0"` + `<pre>` for the snippet (impact: low, effort: trivial).

## Evidence

- Browser-driven checks: logo click + `Enter` navigation test; mobile menu open/close/`Esc`/
  outside-click; JS-disabled render of `index.html`, `features.html`, `404.html`; palette overlap
  measurements; target-size sweep.
- Manual read of all 9 pages against `new_site.md` §3 and the kit's `do_dont.ux`.
