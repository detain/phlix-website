# Content Quality Review — Swiss Modernist

**Variant**: swiss-modernist
**Round**: 1
**Reviewer**: adversarial reviewer (claude-opus-5)
**Date**: 2026-07-25

## Score

- **Content Quality**: 70 / 100

## ✅ Passed

- **Licence honesty is exact.** Every one of the five places the licence appears states the
  real split, never one blanket licence: `index.html:185` (hero readout), `index.html:446`
  (CTA band), `index.html:575` (footer), `about.html:174-198` (a licence spec table), and
  `img/og.svg:41` ("SERVER + HUB MPL-2.0 · CLIENTS MIT"). The predecessor's four `BSD-3-Clause`
  claims are gone. JSON-LD `license` points at the MPL-2.0 text.
- **No fabricated counts.** `proof_strategy` asks for a "live star count and issue count";
  the site prints no figure and links to `/stargazers` and `/issues` instead
  (`index.html:395-420`). Correct call under §19.7.
- **No fabricated attribution.** `proof_strategy` asks for a quote "attributed to docs.phlix";
  the site quotes `content.json.pitch_bullets[0]` verbatim and attributes it to the project
  with a link to the docs (`index.html:421-437`). Correct call.
- All four proof numerals are verifiable against `content.json`: 5 clients, 8 features, 5
  ecosystem repos, 4 transcode profiles (the last traceable to `features[transcode].body`:
  "mobile-low, mobile-high, web, and tv-4k").
- All 8 feature titles and bodies, all 7 pitch bullets, all 5 clients with their capability
  lists and status badges, all 5 ecosystem repos, all 6 FAQ Q/A pairs, and all 3 footer
  columns are `content.json` verbatim. Zero invented features, zero unsupported clients.
- Technical claims spot-checked and correct: PHP 8.3+, Workerman 5.x, Argon2ID, JWT +
  refresh tokens, TMDB/TVDB/Fanart.tv/NFO with 24h cache, CRF 23/28 libx264/libx265, HLS
  master + variant playlists, ChannelManager/GuideManager/Recorder,
  ContentDirectory/AvTransport/DeviceRegistry, LifecycleInterface.
- The install one-liner is a single valid `&&`-joined command inside a `<pre>` and is not
  reflowable (`components.css:570-578` sets `overflow-wrap: normal` on it — good craft).
- `faq_experience.question_order` is honoured exactly, and the two `extra_questions` are
  rendered as honest `SEE ALSO` aliases that cross-link the canonical answer rather than
  inventing a second answer (`about.html:318-333`). This is the best-executed field on the site.
- No `avoid_words` anywhere. No exclamation marks. Voice is genuinely declarative and
  unsentimental across all nine pages — "Structure builds itself.", "Nothing more.",
  "Answers are cheaper than assumptions.", "The Hub needs a server first."

## ⚠️ Concerns (non-blocking)

- **`plugins.html:158-161`** — a `<pre>` asserts a concrete on-disk plugin layout:
  `plugins/my-plugin/plugin.json` and `plugins/my-plugin/Plugin.php`. Neither path is in
  `content.json`, which says only "LifecycleInterface + manifest schema. Drop a plugin in, the
  loader picks it up." A directory listing presented as fact is exactly the kind of detail
  §16 wants traceable. **Fix**: either replace the block with the manifest/interface *names*
  (both of which are in `content.json`) or drop the block.
- **`plugins.html:183`** — "Metadata providers are the most common plugin shape" is an
  unverifiable popularity claim. `content.json` only says `phlix-plugin-example` is a
  "Reference metadata-provider plugin". **Fix**: "The reference plugin is a metadata provider,
  so a new provider slots into an existing pipeline rather than inventing one."
- **`index.html:368-371`** — the `#proof-placard` lead explains the site's own construction to
  the visitor: "Live figures are not printed here, because a static page cannot verify them —
  the links go to the source." This is a build note, and it hedges, in a voice specified as
  "Confident without arrogance / Factual over emotional / no hedging". **Fix**: "Counts you can
  check against the repositories. Stars and issues are live on GitHub."
- **`index.html:259-359` vs `features.html:147-243`** — the home `#features-grid` prints all
  eight features' *full* `content.json` bodies, so `features.html` adds nothing but a different
  box layout and one red rule. `feature_casting`'s hero/support/footnote weighting is then
  expressed only in box size, never in disclosure. **Fix**: on the home page, let the two hero
  casts carry their body plus the `angle`, the four support casts carry a single clause, and
  the two footnotes carry the title only — the full bodies belong on `features.html`.
- **`docs.html` §02 Ecosystem vs `download.html` §03 Ecosystem** — the same five-repo
  `repo-list` verbatim on two pages. One of them should link to the other.
- **`docs.html`** — 141 words of body copy across two sections is the thinnest page on the
  site, and `<h1>06 Documentation</h1>` is immediately followed by `<h2>01 Documentation</h2>`
  (`docs.html:135,146`) — the same word at two levels. No `page_blueprints.docs` is declared so
  the default is not a defect, but the page is under-built relative to `plugins.html` and
  `hub.html`. **Fix**: rename the inner section (e.g. "Where the docs live") and add a third
  numbered section — the man-page/spec-row vocabulary this site already owns would carry a
  "read in this order" index cheaply.
- **`download.html:~200`** (the `.code-caption`) — a two-line prose sentence set in JetBrains
  Mono at `--color-gray-deep`. `fonts.mono.usage` reserves mono for "counters, technical
  readouts, runtimes, durations, file sizes, code… used sparingly". Set it in Inter 400.
- **No `<strong>`, `<b>` or `<em>` exists on any of the nine pages.** In ~6,000 lines of markup
  there is not one emphasised phrase. `css/base.css:265-268` (`strong, b { font-weight: 700 }`)
  is therefore inert, and the newly vendored `inter-700` face will never be requested for body
  copy. Not wrong — this kit does hierarchy with weight and size, not inline emphasis — but the
  Fixer should know the 700 rule is currently unexercised.

## ❌ Failures (must fix this round)

- **`about.html:158-162` and `hub.html:154`** — two `content.json` FAQ *answers* have been
  pasted into authored-prose slots, where they read as answers to questions that were never
  asked:
  - `about.html:158-162`, third paragraph of **Philosophy**: "Yes — same job, different stack.
    Phlix is built in PHP 8.3+ on Workerman, ships with a versioned plugin contract, and
    includes a hub for accessing remote servers behind NAT without a third-party tunnel." This
    is `content.json.faq[0].a` verbatim. The paragraph opens with a bare "**Yes —**" that
    answers nothing, and the identical text appears again 120 lines later as the answer to Q1
    on the same page (`about.html:277-281`).
  - `hub.html:154`, inside **01 What the Hub does**: "No. Run Phlix on your LAN and use the
    Phlix Hub's reverse-tunnel relay to reach it from your phone or Roku at a friend's house.
    You can self-host the hub, or use the public one." This is `content.json.faq[1].a`
    verbatim, opening with a bare "**No.**" answering nothing.

  Two instances of the same mistake make it a systematic authoring defect, not a typo, and it
  is the most visible copy failure on a site whose kit says "every word audited" and "nothing
  present that has no function". **Required outcome**: rewrite both paragraphs as declarative
  prose in the kit's voice with no answer-particle and no verbatim duplication of the FAQ —
  e.g. Philosophy: "The stack is the differentiator: PHP 8.3+ on Workerman, a versioned plugin
  contract, and a hub that reaches servers behind NAT without a third-party tunnel."; Hub:
  "The server stays on your LAN. The relay reaches it from a phone or a Roku at a friend's
  house, and the hub itself is self-hostable or public."

## Recommendations (ranked by impact)

1. Rewrite the two dangling FAQ-answer paragraphs (impact: high, effort: low).
2. Make the home feature grid disclose less than `features.html` so the pages differ in
   information, not only in layout (impact: high, effort: medium).
3. Remove or re-source the invented plugin directory listing and the "most common shape"
   claim (impact: medium, effort: low).
4. Rewrite the proof-placard lead so it stops narrating the build (impact: medium, effort: low).
5. Deduplicate the ecosystem list and add a third section to `docs.html` (impact: medium, effort: medium).

## Evidence

- Cross-diff of every `<p>/<dd>/<li>` over 60 chars against `shared/content.json` and across
  the nine pages (duplicate report reproduced in `FINDINGS.md`).
- `node -e` dumps of `content.json` `pitch_bullets`, `features`, `clients`, `ecosystem`, `faq`.
- `node tools/kit-brief.mjs --site swiss-modernist` licence fact.
