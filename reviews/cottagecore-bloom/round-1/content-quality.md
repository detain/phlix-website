# Content Quality Review — Cottagecore Bloom

**Variant**: cottagecore-bloom
**Round**: 1
**Reviewer**: adversarial reviewer (Claude Opus 5)
**Date**: 2026-07-25

## Score

- **Content Quality**: 84 / 100

## ✅ Passed

- **Every fact traces to `shared/content.json`. I checked all of them.**
  7 pitch bullets → 7 guideposts (`index.html:523-590`), verbatim.
  8 features → 8 `.feature-detail` articles with the canonical titles and bodies.
  5 clients with the correct statuses (Roku/Samsung/Windows stable, Mobile beta,
  DLNA stable). 5 ecosystem repos → 5 `.book` spines with the exact repo names.
  6 FAQ answers verbatim, in `content.json` order. Footer: 3 columns, labels and
  hrefs verbatim including `License (MPL-2.0)`.
- **No fabricated counts, and the placard's three numbers are all recountable from
  this site**: "5 ways to watch" (5 clients), "8 features documented on this site"
  (8 features), "5 open repositories: server, hub, shared, docs, and a plugin
  example" (exactly `content.json`'s five). The fourth placard slot deliberately
  carries a *spec* rather than a number.
- **The site explicitly refuses the fabrication that killed the predecessor.**
  `index.html:861-864`: "We will not print a star count on a page that cannot
  verify one. Go and see for yourself" — followed by four real GitHub URLs. No
  star counts, no download totals, no testimonials, no invented users anywhere in
  ten pages.
- **`proof_strategy`'s "quotes-from-docs" signal is handled honestly.** The
  `garden-sign` quote (`index.html:897-901`) is **verbatim** from `content.json`'s
  expose-internet FAQ answer (I diffed it character by character; only the leading
  "No." is dropped, which is correct for a mid-sentence pull-quote), attributed to
  "the Phlix FAQ" and linked to `about.html#faq`, which exists. Quoting a
  verifiable string instead of inventing a plausible sentence from `phlix-docs` is
  the right call under §19.7.
- **The licence claim is correct and the predecessor's error is fixed.** JSON-LD
  now reads `https://www.mozilla.org/en-US/MPL/2.0/` (`index.html:61`) — the old
  build claimed BSD-3-Clause. `.footer-copy` and the FAQ both state the full
  two-part fact (MPL-2.0 apps, MIT libraries/plugins/clients) exactly as
  `content.json` words it.
- **Docs sub-page URLs are not invented.** Only the two `phlix-docs` URLs that
  exist in `content.json` are linked; `docs.html` describes the four documentation
  sections in prose beside the one canonical link, rather than guessing paths. This
  is the third build of this site to face that temptation and the first to resist
  it.
- **Zero `avoid_words`.** I grepped all twelve across all ten pages: no matches.
  "dark" appears nowhere on a site that could easily have said "dark mode".
- **Voice holds across all ten pages** and does not drift into generic marketing.
  Samples from six different pages: "the little building at the end of the lane"
  (hub), "Everything written down, kept in one room off the hall" (docs),
  "Plugins are for the gardener who wants to graft something of their own"
  (plugins), "The evening's programme, gathered before you sit down" (livetv),
  "It reads the room and pours the right measure, every time" (transcode),
  "Primrose has checked the whole bed and there is no page at this address" (404).
  Warm, unhurried, botanical, nurturing — the kit's four `voice` descriptors, with
  no urgency and no FOMO.
- **`jargon_policy: translate` is genuinely bidirectional.** The plain sentence is
  the visible one and the precise `content.json` wording sits one `<details>`
  away — the fact is folded, never dropped (§16).
- **`seasons.html` avoids the trap its own scope creates.** `:340-343` and
  `:352` say the *theme* changes, and that "Phlix itself works exactly the same in
  every season" — no product claim is implied by a palette calendar.
- Grammar and spelling are clean across ~4,000 words. Typography is careful:
  curly apostrophes and em-dashes used consistently, `&amp;` correctly escaped,
  no double spaces.
- Technical claims all check out against `content.json`'s own strings —
  "PHP 8.3+", "Workerman 5.x", "Argon2ID", "JWT auth with refresh tokens",
  "TMDB, TVDB, Fanart.tv, and local NFO with 24-hour cache",
  "CRF 23/28 libx264/libx265", "weighted-mean NTP offset over 5 samples". None is
  embellished.

## ⚠️ Concerns (non-blocking)

- **`index.html:938-946` gives a two-command install that does not work.** The
  seed box is labelled "The whole seed, in one line", shows
  `git clone https://github.com/detain/phlix-server.git`, then says
  "Then `composer install` and you are planted" — omitting the `cd phlix-server`
  that `download.html:363-366` correctly includes. A reader who follows the home
  page alone runs `composer install` in the wrong directory. Not a fabricated
  fact, but incorrect instructions on the highest-traffic page.
  **Fix**: either add `cd phlix-server` to the prose, or replace the second
  sentence with a pointer to the full guide (the link is already there).
- **"the install is four lines" (`seasons.html:499`, `docs.html:465`) vs
  "in one line" (`index.html:938`) — three pages, three answers.** Each phrase is
  locally accurate about its own code block (`download.html`'s block is literally
  four rendered lines including the `# PHP 8.3+ · Workerman 5.x` comment; the home
  block is literally one). But a visitor reading two of the three pages gets a
  contradiction. Settle on one number, counted the same way, and use it in all
  three places.
- **`seasons.html:374, 378, 381, 430, 438, 460, 463, 467` — five invented colour
  names presented in the same `#HEX Name` format as the three real ones.**
  "Garden Rose", "Sage Green" and "Lavender Mist" (`:400, 403, 407`) are the kit's
  own names. "Blossom rose", "Young leaf", "Early lilac", "Rosehip amber",
  "Harvest cream", "Berry rose", "Pine sage" and "Dried lavender" are not — the
  `seasonal_variants` entries name no colours at all. Two of them have no basis
  even in the variants' `motif` prose ("Early lilac"; "Dried lavender" for
  `#A08DB0`, where the midwinter motif mentions dried *orange slices*). The
  uniform presentation implies all eight names are canonical.
  **Fix**: drop the names and show hex + role, or label the row "the theme's own
  working names".
- **`facts_from: ["seasonal_variants", …]` is only partly honoured on
  `seasons.html`.** Harvest shows `--color-surface: #FFF0DC` but omits
  `--color-bg: #FFF8EE`; Midwinter shows `--color-tertiary: #A08DB0` but omits
  `--color-surface: #FFF0EA`; Spring shows all three. Each card shows three
  swatches regardless of how many overrides the variant actually declares, so the
  selection is driven by layout rather than by the data. Show every override, or
  say the row is a selection.
- **`#trust-the-keeper`'s authored framing runs ~96 words against
  `complexity_profile.page_budget.words_per_section_max: 80`.**
  `index.html:815-909` renders 170 words; subtracting the 37-word verbatim FAQ
  quote and the four fact-bearing `.placard-label` strings leaves roughly 96 words
  of authored eyebrow / heading / lead / prose / figcaption. It is the only one of
  the six beats over the cap (the others measure ~30, ~63, ~41–68, ~30 and ~40
  authored words), and it is marginal.
  **Fix**: trim `.section-lead` (`:824-827`) and the `figcaption` (`:903-906`).
  Do **not** drop facts to hit the count — §16 forbids that, and the placard and
  the quote must stay whole.

## ❌ Failures (must fix this round)

_None in this dimension._ Notably, I looked hard for the usual failures — invented
star counts, fabricated testimonials, guessed docs URLs, a licence claim that
drifts, a renamed CTA that lies about its destination — and found none. All three
`cta_ladder` labels point where the kit says they should.

## Recommendations (ranked by impact)

1. Fix the home install prose so the commands actually work (impact: high, effort: low).
2. Reconcile "one line" / "four lines" across the three pages (impact: medium, effort: low).
3. Drop or relabel the five invented swatch names; show every declared override (impact: medium, effort: low).
4. Trim ~16 words of framing from `#trust-the-keeper` (impact: low, effort: low).

## Evidence

- `node -e` dump of `shared/content.json` (`pitch_bullets`, `features`,
  `clients`, `ecosystem`, `faq`, `footer`, `hero`) diffed against the rendered
  strings on all ten pages.
- `grep -rinoE "<the 12 avoid_words>" sites/cottagecore-bloom/*.html` → no output.
- `grep -rn "git clone\|composer install\|four lines\|one line"`.
- Rendered word counts per home section via `element.innerText`
  (`scratchpad/words.mjs`): 126 / 134 / 201 / 68 / 170 / 65.
