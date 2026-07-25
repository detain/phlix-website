# CTA / Funnel Review — Neon Noir

**Variant**: neon-noir
**Round**: 1
**Reviewer**: adversarial reviewer (claude-opus-5)
**Date**: 2026-07-25

## Score

- **CTA / Funnel**: 91 / 100

## ✅ Passed

- Primary CTA `Unlock the Archive` is above the fold at every captured viewport, including 320×640 (`reviews/neon-noir/shots/index-320x640.png`).
- CTA contrast far exceeds the 3:1 floor: amber `#f5a623` against void `#0a0c10` is **9.66:1**, and the void-on-amber label is **9.66:1**.
- Secondary CTA is genuinely de-emphasised: `.btn-secondary` is a transparent cyan-bordered ghost against a solid amber fill — clearly subordinate without being hard to find.
- **Download is one click from home** — well inside the ≤2 requirement — and one click from every other page's closing band.
- `conversion_funnel.cta_ladder` is implemented completely and verbatim, in order, with correct targets and descending visual weight: rung 1 `Unlock the Archive` → `download.html` (`.btn-primary`, amber left-border on the rung), rung 2 `Pick Your Client` → `clients.html` (`.btn-secondary`), rung 3 `Run the Server` → `download.html#server` (`.btn-ghost`) — `index.html:539-564`.
- `conversion_funnel.style: instant-command` and `download_opening` are both realised: the Download page opens on "You came for the archive. Here's the key. Everything else on this page is optional." (`download.html:117-119`), and the install snippet is unambiguously the most prominent element on the page — cyan-bordered, neon-glowed `.code-block` immediately under the `#server` heading.
- `friction_notes` honoured: no signup, no email gate, no interstitial, no forced tour. The one-liner is the prize and it is right there.
- **No CTA label misdescribes its destination (WCAG 2.5.3)**: "Read the Case File" is glossed "(the docs)" because it leaves the site; "Run the Server" goes to the server section; every renamed nav label carries the canonical page name as a visible gloss.
- `.copy-token` is a genuine conversion aid with an honest failure path ("Copy failed — select it by hand") and is `hidden` in markup until JS + `navigator.clipboard` are both confirmed present (`download.html:137-144`, `js/experience.js:355-373`).
- No auto-play media, no sound, no surprise modal on any page.

## ⚠️ Concerns (non-blocking)

- **`index.html:130` and `index.html:546`** — two `.btn-primary` (amber) buttons on the home page, both labelled `Unlock the Archive`. `do_dont.ux.dont` forbids "multiple equally prominent CTAs" and `color_rules[2]` reserves amber for "the single most important CTA per screen". Repeating the same CTA at the top and bottom of a long scroll is defensible practice, but combined with the amber scattered across nav links, numerals, badges and borders (see branding-consistency.md) the amber signal no longer picks out one action. Consider making the ladder's rung-1 button `.btn-secondary`, since the hero already carries the amber.
- **`css/base.css:196-211`** — during the Blood Moon October window `--color-primary` becomes `#e5154e`, and the `.btn-primary` label drops to **4.24:1** — below AA for its 15px/600 label. The site's single most important control fails contrast for a month a year. Filed as a ❌ in accessibility.md; noted here because it is a funnel-critical surface.
- `.btn-ghost` rung 3 (`Run the Server`) has the weakest affordance of the three, and its border token is only 3.27:1 on the `.ladder__rung` navy background — legal, but the least visible rung is the one that describes the actual install.

## ❌ Failures (must fix this round)

None in this dimension. (The seasonal `.btn-primary` contrast failure is filed under Accessibility.)

## Recommendations (ranked by impact)

1. Fix the seasonal `--color-primary` contrast so the primary CTA label clears 4.5:1 in all three windows (impact: high, effort: low).
2. Demote one of the two amber home-page CTAs so amber marks a single action (impact: medium, effort: trivial).
3. Strengthen the `.btn-ghost` border so rung 3 is not the faintest element in the ladder (impact: low, effort: trivial).

## Evidence

- `reviews/neon-noir/shots/index-320x640.png`, `index-desktop.png` — CTA above the fold at both extremes; ladder rendered 3-up at desktop.
- `reviews/neon-noir/shots/download-desktop.png` — install snippet is the dominant element.
- Independent contrast computation: amber/void 9.66:1; void-on-`#e5154e` 4.24:1.
- `brand-kits/neon-noir.js` `conversion_funnel.cta_ladder`, `download_opening`, `friction_notes`; `do_dont.ux`.
