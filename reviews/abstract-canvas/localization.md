# Localization Review — Abstract Canvas

> Supersedes the 2026-06-30 review of the **predecessor** site (recoverable from git history).

**Variant**: abstract-canvas
**Round**: 1 (regen pass, `regen/wave-1`)
**Reviewer**: adversarial reviewer (independent)
**Date**: 2026-07-24

## Score

- **Localization**: 88 / 100

## ✅ Passed

- `<html lang="en">` on all 9 pages, matching `content.json.site.default_locale`.
- **No locale-unsafe formatting anywhere**: zero `toLocaleString`, `toLocaleDateString`,
  `Intl.*` or `new Date().toLocale…` calls in `js/main.js`. The only date logic is the seasonal gate,
  which builds an `MM-DD` string with `padStart` from `getMonth()`/`getDate()`
  (`js/main.js:369-380`) — locale-independent by construction, and the year-wrap case is handled.
- **RTL hygiene is genuinely good** — the CSS uses logical properties throughout:
  `margin-inline`, `padding-inline`, `padding-block`, `inset-inline`, `border-block`,
  `padding-left`/`border-left` only on decorative rules. `float` is never used. `.nav-menu`'s mobile
  panel uses `inset-inline: 0`, and the wall grid is direction-agnostic.
- Fonts are latin-subset WOFF2s from the shared pool — correctly scoped to the one supported script,
  no unnecessary ranges shipped.
- All **facts** are traceable to the single `shared/content.json`, so a translator swapping that one
  file gets every spec claim, client, licence sentence and FAQ answer.
- Text is never baked into an image: the logo/OG SVGs use real `<text>`, and every icon is decorative
  with `aria-hidden`.

## ⚠️ Concerns (non-blocking)

- **The authored presentation copy is hard-coded in 9 HTML files** — the kit voice ("Two works hang at
  eye level", the five station talks, the three chapter texts, the 404 line) plus the seven
  `wall-label` bullets. Facts stay in `content.json`, which is what §15 asks for, but a translator
  faces ~2,900 words spread across nine documents plus three strings inside `js/main.js` (the tip
  texts, the reward lines and the seasonal banner, `js/main.js:141-157`, `217-228`, `291`, `317`,
  `362`). Inherent to the program's static-HTML approach; flagged so it is a known cost, not a
  surprise.
- **`© 2026` is hard-coded** in the footer of all 9 pages (e.g. `index.html:634`) — a date literal that
  will be wrong on 1 Jan and cannot be localised. `content.json` has no year field; the shell spec
  (§4) does say `&copy; <year>`.
- The licence line in the footer is a re-voiced sentence rather than the `content.json` label string
  (the label is used verbatim on the *link*, which is what §5 requires) — traceable to the FAQ answer,
  so correct, but it is one more sentence a translator must find.
- Bebas Neue is uppercase-only by design (`text-transform: uppercase` on `.numeral`/`.display`), which
  will not survive a script without capitals. Only used for roman/arabic numerals here, so harmless.

## ❌ Failures (must fix this round)

- None.

## Recommendations (ranked by impact)

1. Derive the copyright year at build time (or drop the year) so it cannot go stale (impact: low,
   effort: low).
2. If the program ever adds a second locale, lift the JS-resident strings (tips, reward lines, seasonal
   banner) into a small data block so they are not buried in logic (impact: low, effort: low).

## Evidence

- `grep` sweeps for `toLocale`, `Intl.`, `float:`, `left:`/`right:` and `text-align` across
  `css/*.css` and `js/main.js`.
- `<html lang>` and hard-coded-year checks across all 9 pages.
- Read of `js/main.js` for every user-visible string.
