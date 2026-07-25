# SEO Review — Cottagecore Bloom

**Variant**: cottagecore-bloom
**Round**: 1
**Reviewer**: adversarial reviewer (Claude Opus 5)
**Date**: 2026-07-25

## Score

- **SEO**: 85 / 100

## ✅ Passed

- **Titles are all well under 60 characters and all kit-voiced**, not generic:
  `Our Story — Phlix` (17), `Guest Rooms — Phlix` (19), `The Gatehouse — Phlix`
  (21), `Start Your Own — Phlix` (22), `What Grows Here — Phlix` (23),
  `The Reference Library — Phlix` (29), `This bloom didn't take — Phlix` (30),
  `The Specialist's Shelf — Phlix` (30), `Phlix — Where Every Story Blooms` (32),
  `Blooming Through the Year — Phlix` (33).
- Meta description is 124 characters — inside the 160 cap — and comes verbatim
  from `content.json`'s `meta.description`, so no fact is invented.
- **Canonical URL on every page**, each pointing at its own absolute GitHub Pages
  URL. No cross-page copy-paste errors (I checked all ten).
- Exactly **one `<h1>` per page**, all ten.
- `sitemap.xml` is correct: **9 URLs, `404.html` properly excluded, and
  `seasons.html` included** — the `extra_page` is discoverable, which is the thing
  most likely to have been missed. `robots.txt` present.
- `404.html` carries `<meta name="robots" content="noindex">` (`:15`).
- **Semantic HTML throughout**: `<header role="banner">`, `<nav aria-label>`,
  `<main id>`, `<section aria-labelledby>` on the content sections,
  `<footer role="contentinfo">`, `<article>` for cards, `<figure>/<blockquote>/
  <figcaption>` for the pull-quote (with a `cite` attribute), `<dl>/<dt>/<dd>` for
  the FAQ with the spec-legal `<div>` grouping wrapper.
- **Internal anchor text is descriptive everywhere** — "See all eight features",
  "Look inside every room", "The full planting guide", "Read the rest of the
  questions", "Who has contributed". Not one "click here", "learn more" or bare
  URL.
- JSON-LD `SoftwareApplication` on the home page validates structurally and its
  `license` is now factually correct (`https://www.mozilla.org/en-US/MPL/2.0/`) —
  the predecessor claimed BSD-3-Clause.
- Fragment targets all resolve: `features.html#library`, `#syncplay`, `#plugins`
  (all three `visitor_paths` targets exist as real ids), `download.html#server`,
  `about.html#faq`.
- No render-blocking script (`defer`), fonts `font-display: swap` — both help LCP,
  which is now a ranking input.

## ⚠️ Concerns (non-blocking)

- **`404.html:15-19` declares `robots noindex` *and* a self-referential
  `rel="canonical"`.** The two directives contradict each other — a canonical is a
  consolidation hint for an indexable URL. Harmless in practice but it is
  incoherent markup on the one page where crawler instructions actually matter.
  **Fix**: drop the `<link rel="canonical">` from `404.html`.
- **All ten pages share one meta description.** This is the honest choice —
  `content.json` supplies exactly one `meta.description` string and inventing nine
  more would risk fabrication — but it means nine of ten pages present the same
  snippet in search results, and the `seasons.html` snippet in particular says
  nothing about the page. If the program later allows per-page descriptions
  assembled from `content.json` facts plus `copy_overlay`, this page inventory
  would benefit most. Flagging as program-scope, not as this author's regression.
- **`seasons.html` gets a stronger `<title>` than its content signals.** The
  `<h1>` is "Blooming Through the Year" and the page is entirely about the theme's
  own palette calendar, but nothing in the `<title>`, description or opening
  paragraph carries a product keyword, so the page competes for nothing. Since it
  is in `sitemap.xml`, it is a crawlable page with no target query. Consider
  letting the lead sentence carry one honest product noun.

## ❌ Failures (must fix this round)

- **Heading hierarchy is not unbroken: card titles are `<h2>` at the same level as
  the `<h2>` section title that introduces them, on six of ten pages.** The
  rubric's SEO criterion is "heading hierarchy unbroken", and the outlines are
  flat:

  | page | outline |
  | --- | --- |
  | `seasons.html` | `h1` + **10 × h2**, no `h3` at all |
  | `features.html` | `h1` + 13 × h2, no `h3` |
  | `clients.html` | `h1` + 10 × h2, no `h3` |
  | `hub.html` | `h1` + 7 × h2, no `h3` |
  | `about.html` | `h1` + 9 × h2, no `h3` |
  | `index.html` | `h1` + h2/h3 correctly nested ✅ |

  The clearest case is `seasons.html:349`
  (`<h2 class="section-title">Four moods, one garden</h2>`) followed by `:364`,
  `:389`, `:420`, `:451` — four `<h2>` season names *inside that same
  `<section>`* — and then `:475` `<h2>How the change happens</h2>`. Same shape at
  `features.html:350` vs `:363, 381, 398, 412, 426, 440, 454, 468`, and
  `download.html:350` (a `visually-hidden` h2 "The three planting steps") vs
  `:355, 376, 458`.

  The CSS confirms the cards are meant to be subordinate:
  `components.css:911` `.season-card h2 { font-size: 1.35rem }` and
  `components.css:713-715` `.feature-detail h2 { clamp(1.35rem, 3vw, 1.85rem) }`
  are both smaller than `theme.css:65-67` `.section-title
  { clamp(1.65rem, 3.6vw, 2.6rem) }`. `index.html` uses `<h3>` for the equivalent
  cards, so the home page and the interior pages disagree about the site's own
  document structure. Wrapping a heading in `<article>` does not fix this — no
  crawler or AT implements the HTML outline algorithm.

  **Required outcome**: demote card / room / season / step titles from `<h2>` to
  `<h3>` and retarget `components.css:537, 583, 713, 756, 802, 911` and
  `theme.css:662` to match. Verify each page's outline is `h1 → h2 → h3` with no
  peer-level card titles.

## Recommendations (ranked by impact)

1. Demote interior-page card titles to `<h3>` (impact: high, effort: medium).
2. Remove the canonical from `404.html` (impact: low, effort: trivial).
3. Give `seasons.html` one honest product noun in its lead (impact: low, effort: low).

## Evidence

- `grep -oE '<h[1-6][ >]'` per page, tabulated above.
- `grep -h '<title>'` with lengths measured.
- `sites/cottagecore-bloom/sitemap.xml` read in full — 9 `<loc>`, `seasons.html`
  present, `404.html` absent.
- `node tools/selfcheck.mjs --site cottagecore-bloom` → PASS.
