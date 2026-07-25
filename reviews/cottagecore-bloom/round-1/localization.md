# Localization Review — Cottagecore Bloom

**Variant**: cottagecore-bloom
**Round**: 1
**Reviewer**: adversarial reviewer (Claude Opus 5)
**Date**: 2026-07-25

## Score

- **Localization**: 92 / 100

## ✅ Passed

- `<html lang="en">` on all ten pages.
- **No locale-unsafe formatting anywhere.** `js/main.js` contains no
  `toLocaleString`, `toLocaleDateString`, `Intl.*` or `NumberFormat` call. The only
  `Date` use is `now.getMonth() + 1` / `now.getDate()` compared against integer
  month/day pairs (`:428-429`, `:419-424`) — locale-independent by construction,
  and correctly local-time rather than UTC, which is the right choice for a
  "what season is it where the visitor is" gate.
- **RTL safety is unusually good.** The CSS uses logical properties almost
  everywhere: `margin-inline`, `padding-inline`, `padding-inline-start`,
  `inset-inline`, `inset-inline-start/end`, `inset-block-start/end`,
  `border-inline-start`, `border-block`, `margin-block`, `padding-block`. I found
  **no** `float: left/right`, and no `margin-left/right`, `padding-left/right`,
  `left:`/`right:` or `top:`/`bottom:` longhand in any of the three stylesheets.
  Even the fiddly cases are logical: `.hero-plane { inset-inline: -6% }`
  (`theme.css:171`), `.plane-bee svg { margin-inline-start: 62% }` (`:210`),
  `.guidepost-path > li:nth-child(even) { margin-inline-start: 8% }` (`:332-338`),
  `.guidepost-sign { border-inline-start: 3px }` (`components.css:511`),
  `.mascot-bubble { border-inline-start: 3px }` (`:1153`),
  `.reward-note { inset-inline-start }` (`:1254`),
  `.book { border-inline-start: 6px }` (`:796`). This is the cleanest RTL story I
  have seen in this program.
- **Fonts are subset to latin only** — all twelve `@font-face` rules reference
  `*-latin.woff2` from the shared pool, so no unnecessary script data is shipped.
  Each family declares a real fallback stack (`Georgia`, `Crimson Text`,
  `system-ui`, `Courier New`, `Great Vibes`), and the kit's own note that
  "Dancing Script display text degrades gracefully to Georgia" is honoured by the
  `--font-display` stack.
- **No text baked into images.** Every string on the site is real text in the DOM.
  The one exception is the "404" glyph inside the 404 illustration
  (`404.html:376-386`), and that is correct: it is a numeral on a drawn seed
  packet, the figure is `aria-hidden`, and the page's actual message is live text
  beside it. `logo.svg`'s `font-family="Georgia, …serif"` is also the right call —
  an `<img>`-referenced SVG cannot use the page's `@font-face`.
- Typographic punctuation is used consistently (curly apostrophes, em-dashes,
  `&amp;` escaped), so a translator inherits clean source strings rather than
  straight-quote noise.
- `dir` is not hardcoded anywhere, so an RTL build would only need
  `<html dir="rtl">`.

## ⚠️ Concerns (non-blocking)

- **Authored strings are not reachable from one place.** All ~4,000 words of
  authored copy are hardcoded inline in the ten HTML files; only the *facts* come
  from `shared/content.json`. A future translator would have to edit ten HTML
  files rather than one data file. This is how all 50 sites in this program are
  built and there is no per-site remedy — the `copy_overlay` / narrative strings
  live in the kit, and the build has no string-extraction step. **Program-scope,
  not this author's regression**, but the rubric names it ("strings reachable from
  one place so a future translator can swap them") so it is recorded.
- **A few UI strings are generated in JS rather than markup**, which puts them
  outside even an HTML-level extraction pass:
  `js/main.js:60` ("Wake the Garden" / "Quiet the Garden"),
  `:219` ("Still plenty blooming over here."),
  `:221` ("A curtsy, just for you."),
  `:234` ("Keep tending."),
  `:308-312` (the three `greetings[]`),
  `:327` ("How lovely that you found me!"),
  `:357` ("This is where it all blooms."),
  `:436` / `:446` (the seasonal banner sentence and its `aria-label`),
  `:379, 391, 405` (the three motif `alt` texts).
  Fourteen visible strings, including three `alt` attributes and one `aria-label`,
  exist only inside the script. If a string table ever lands, these need to be in
  it. (Two of them — the greetings and the reward copy — are quoted from the kit,
  so they are at least traceable.)
- **One date range is hand-written in English prose in three places and in
  integers in a fourth.** `seasons.html:365, 421, 452` spell out
  "15 March – 15 May", "15 September – 31 October", "1 December – 6 January" as
  literal text, while `js/main.js:373-414` holds the same ranges as
  `from: [3, 15]` / `to: [5, 15]` pairs. Besides being duplicated data that can
  drift, the prose form is D-M ordering, which a US-locale reader may misread and a
  translator must reformat. Deriving the labels from the same integers would fix
  both.

## ❌ Failures (must fix this round)

_None._

## Recommendations (ranked by impact)

1. If a string table is ever introduced, seed it with the fourteen JS-resident
   strings listed above (impact: medium, effort: medium, partly program-scope).
2. Derive the three `seasons.html` date labels from the same integer pairs
   `js/main.js` uses, so the ranges cannot drift (impact: low, effort: low).

## Evidence

- `grep -rn "toLocaleString\|toLocaleDateString\|Intl\.\|NumberFormat" js/ ` → no
  matches.
- `grep -rnE "float:|margin-(left|right)|padding-(left|right)|(^|[^-])(left|right|top|bottom):" css/`
  → no physical-direction declarations found.
- `grep -c "latin.woff2" css/base.css` → 12 of 12 `@font-face` rules.
- `grep -c 'lang="en"' *.html` → 1 per page, 10 pages.
- Full read of `js/main.js` for user-visible string literals.
