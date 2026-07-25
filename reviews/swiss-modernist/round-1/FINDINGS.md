# FINDINGS — swiss-modernist, round 1

**Reviewer**: adversarial reviewer (claude-opus-5) · **Date**: 2026-07-25
**Tools**: `kit-brief` read · `selfcheck` **PASS** · `render-check --shots` **PASS** (9 pages ×
4 viewports + 200% zoom). Everything below is something the tools cannot see.

**Totals: 7 ❌ · 18 ⚠️.** The loop **cannot** exit: 7 blockers, and 8 dimensions below 90
(Branding 62, Content 70, Experience 74, Accessibility 76, CTA/Funnel 76, SEO 82, Responsive 84,
Usability 84; Social 86, Performance 92, Localization 92).

Per the owner ruling (`new_site.md` §2A) **no finding is filed against JS or CSS byte size**, and
this site is explicitly judged **not** under-built — see `performance.md`.

---

## ❌ Blockers

### F1 — The drawn column guides are not the grid

**`css/theme.css:113-121`**
The `repeating-linear-gradient` is painted on the `.band--guides` **section**, whose padding box
is the whole viewport, so guides are pitched at `viewport / 12`. The real columns live in
`.container` (`max-width: 1400px`, `padding-inline: 24px`, `gap: 24px`).
Measured at 1280: guides `0, 106.7, 213.3, 320, 426.7, 533.3, 640, 746.7, 853.3, 960, 1066.7,
1173.3`; real column edges `24, 128.7, 233.3, 338, 442.7, 547.3, 652, 756.7, 861.3, 966, 1070.7,
1175.3`. Per-column error `24, 22, 20, 18, 16, 14, 12, 10, 8, 6, 4, 2` px — **no guide coincides
with any column edge**. `.hero-aside` starts at 861.3; nearest guide 853.3.
At 1920 it fully decouples: container 1400px wide at x=260, guides 0→1920 at a 160px pitch vs a
real 114.67px pitch, so a third of the guide field is drawn in the page margins.
This is the declared archetype's only visible expression (`experience_archetype: "grid"`;
`REGEN_PLAN.md:5-7` calls it "the differentiator"), it violates `design_principles` #1 and #6,
and it makes `404.html:154` ("The red line marks where column 1 actually is") self-contradicting.
**Required change**: derive the guides from the same tracks the content uses. Move the gradient to
`.band--guides > .container` with `background-origin: content-box; background-clip: content-box`
and pitch `calc((100% - 11 * var(--grid-gutter)) / 12 + var(--grid-gutter))`, or render 12 empty
children inside a `repeat(12, minmax(0,1fr))` grid. **Verify by measurement that a guide edge
equals `.hero-aside`'s left edge at both 1280 and 1920.**

### F2 — `.module-index` never gets its declared 12px; feature cards read 24/24/24

**`css/components.css:266-273`** overridden by **`283-286`**, **`347-349`**, **`391-395`**,
**`415-418`**
`.module-index` (specificity 0-1-0) sets `font-size: var(--text-xs)`, but `.module p`,
`.module--footnote p` and `.feature-detail p` (0-1-1 / 0-2-1) all out-specify it, so the 12px
**never applies anywhere**. Measured computed sizes: `.feature-detail .module-index` = **24px** at
≥1024px, `.module--support .module-index` = 16px, `.module--footnote .module-index` = 14px.
Consequence on `features.html`: all 8 cards render label 24px mono / title 24px Inter 800 / body
24px Inter 500, so the gray metadata label is the loudest element in every card — louder than the
title (see `../shots/features-desktop.png`, "01 · LIBRARY", "02 · AUTH"). Inverts
`page_generation_rules` #7 and contradicts every label spec in the kit (`badges.typography` 10px,
`tables.headers` 12px, `thumbnail_style` 14px).
**Required change**: add, after the `p` rules, `.module .module-index, .feature-detail
.module-index { font-size: var(--text-xs); line-height: var(--lh-ui); }` (or use `p.module-index`),
**and** raise `.feature-detail h2/h3` to `var(--text-2xl)` at ≥1024px so the card reads 12 / 32 / 24.

### F3 — `features.html` heading hierarchy is broken

**`features.html:145` + `152, 164, 176, 187, 200, 213, 226, 238`** and **`css/components.css:383`**
The section heading `<h2>01 The inventory</h2>` and the eight feature titles inside that section
are all `<h2>`, giving `H1 → H2 → H2 ×8` with no level-3 tier. `index.html` marks the identical
content as `<h3>`, so the site contradicts itself. Breaks heading navigation for AT users and the
rubric's "Heading hierarchy unbroken".
**Required change**: the eight `.feature-detail` titles become `<h3>`; retarget
`.feature-detail h2` → `.feature-detail h3` in `css/components.css:383-389` (keep `font-weight:
800`; apply the F2 size change at the same time).

### F4 — Basel Red underrule inside the navigation wordmark, on all nine pages

**`index.html:82`** and the identical inline SVG in **`404.html`, `about.html`, `clients.html`,
`docs.html`, `download.html`, `features.html`, `hub.html`, `plugins.html`**
`<rect x="0" y="30" width="56" height="4" fill="#E8001C" />`. `logo_rules.colors` is explicit:
"A 2px Basel Red underrule may appear beneath the wordmark **only in full-identity lockup (not in
navigation)**." It is also 4px, not 2px. This is the un-counted fifth red mark on the home page,
present in every viewport at once, and the only one the kit forbids outright.
**Required change**: delete the `<rect>` from the header wordmark SVG on all nine pages. Keep the
underrule in `img/logo.svg` and `img/og.svg` (those are lockups). The header still reads as the
kit's `header_motif` via the existing 2px bottom border on `.site-header`.

### F5 — FAQ answers pasted as body prose, leaving dangling answer particles

**`about.html:158-162`** — third paragraph of **Philosophy** is `content.json.faq[0].a` verbatim,
opening "**Yes —** same job, different stack…" with no question preceding it; the identical text
reappears as Q1's answer at `about.html:277-281`.
**`hub.html:154`** — inside **01 What the Hub does**, `content.json.faq[1].a` verbatim, opening
"**No.** Run Phlix on your LAN…" with no question preceding it.
Two instances make it systematic, not a typo, on a kit whose rule is "every word audited".
**Required change**: rewrite both as declarative prose in the kit's voice, with no answer particle
and no verbatim reuse of an FAQ answer. Suggested — Philosophy: "The stack is the differentiator:
PHP 8.3+ on Workerman, a versioned plugin contract, and a hub that reaches servers behind NAT
without a third-party tunnel." Hub: "The server stays on your LAN. The relay reaches it from a
phone or a Roku at a friend's house, and the hub itself is self-hostable or public."

### F6 — Malformed comment ships 13 dead declarations inside the design-token block

**`css/base.css:131-145`**
The comment opens `/* Tracking + leading, per the kit's fonts{` and does not close until
`} roles */`, swallowing 13 duplicated custom-property declarations — a template-interpolation
artifact. Two of them (`--tracking-number`, `--lh-number`) exist nowhere else, so the token set is
not what the file appears to declare, and editing the first `--tracking-headline` would silently
do nothing.
**Required change**: delete lines 131-145 entirely; keep the live block at 146-156 with a one-line
comment. (Confirmed safe: `--tracking-number` and `--lh-number` have zero `var()` references.)

### F7 — The secondary CTA outweighs the primary in the hero

**`index.html:153-164`** + **`css/components.css:177-244`**
Measured at 375px: `Install` = 97 × 48 px (**4,673 px²**); `Read the spec / phlix-docs` =
161 × 62 px (**10,019 px², 2.1×**). The `.btn-note` sub-label forces the secondary to two lines
and widens it, so the black block dominates the red one (`../shots/index-320x700.png`). Fails the
rubric's "Secondary CTA distinguishable but **de-emphasized**" and inverts `do_dont.ux.do`
("Provide a single dominant CTA per screen in Basel Red").
**Required change**: make the primary the largest mark — either give `.btn-primary` a matching
two-line box (e.g. a `phlix-server` sub-label, or `min-height` matched to the secondary), or demote
"Read the spec" to `.btn-ghost` (the kit's declared tertiary weight, `buttons.ghost`) and move the
`phlix-docs` note to a `.readout` line beneath. Re-measure so `primary.area >= secondary.area` at
320, 375, 768 and 1280.

---

## ⚠️ Concerns

### F8 — Four-up card rules do not share a baseline

**`css/components.css:444-454`** (`clients.html`), same pattern at **`642-648`** (`download.html`)
`.client-card h3` is a wrapping flex row of name + badge, so head-row heights are
**28 / 58 / 28 / 60** px and the internal `.spec-table` rules land at y **549 / 580 / 549 / 582**
at 1280 — a 33px stagger across the row (Samsung Tizen's badge wraps; "Mobile (iOS + Android)"
wraps to two lines and pushes BETA to a third). Fails `composition` ("Strong horizontal rule lines
anchoring sections") and `do_dont.layout.do`. `download.html`'s captured screenshot shows the same
wrap and is one font-metric away from the same stagger.
**Required change**: give `.client-card` / `.download-card` a fixed head row, e.g.
`display: grid; grid-template-rows: minmax(3.5rem, auto) auto 1fr auto`, or move `.client-status`
out of the `h3` onto its own line unconditionally. Verify the `.spec-table` tops are equal across
the first four cards at 1024 and 1280.

### F9 — `overflow-wrap: anywhere` is too broadly scoped

**`css/base.css:44-63`**
The technique is right (`anywhere` is the only value that reduces min-content size) and the cause
is real, but the offending strings live only in `code`, `.spec-table`/`.repo-list`/`.manpage-head`
`<dd>`, and bare-URL `<a>`. Applying it to `h1`–`h6` and `blockquote` licenses unhyphenated
mid-word breaks in oversized Inter Black display type, and it masks future overflow bugs.
**Required change**: scope to `code, kbd, samp, pre, .spec-table dd, .repo-list dd, .manpage-head
dd, .link-list a, .proof-links a, .faq-entry dd`, then re-run `render-check` at 200% zoom to
confirm all nine pages still reflow. If a heading genuinely needs it, use `hyphens: auto` there so
the break is marked.

### F10 — `REGEN_PLAN.md` / `BUILD_LOG.md` misdescribe the shipped site in four places

**`REGEN_PLAN.md:21`**, **`REGEN_PLAN.md:129-132`**, **`BUILD_LOG.md:77-79`** still claim the h1
ships "Your media. Grid. **Grid.** Logic." The kit typo has been fixed and the site correctly ships
"Your media. Grid. Logic." (`index.html:148`) — **confirmed clean in all 9 HTML files, all CSS, JS,
`img/og.svg`, `img/logo.svg`, `sitemap.xml` and the `<title>`/OG/Twitter metadata**. The doubled
word survives only in these three doc lines.
**`REGEN_PLAN.md:52`** claims `--color-gray-deep` is `#666`, 5.4:1; the shipped token is `#5e5e5e`,
6.09:1 (`css/base.css:98`) — `SITE.md:58` is correct, `REGEN_PLAN` is stale.
**`REGEN_PLAN.md:20`** claims man-page labels `NAME`/`SYNOPSIS`/`QUESTIONS`/`SEE ALSO`; shipped are
`Name`/`Synopsis`/`Section` + `See also` (`about.html:260-273`).
**Required change**: correct all four rows so the manifest describes what shipped.

### F11 — `SITE.md` still documents the pre-`inter-700` workaround

**`SITE.md:106-107`**
"Nine faces: Inter 400/500/600/800/900, Barlow Condensed 800/900, JetBrains Mono 400/500." and
"The pool has no Inter 700, so `strong`/`b` resolve to the 600 face." `css/base.css` now declares
**eleven** faces including `inter-700` and `jetbrains-mono-700`, and `strong, b { font-weight: 700 }`
(`css/base.css:265-268`). `REGEN_PLAN.md:76` carries the same stale nine-face list.
**Verified for the orchestrator**: the 700 change reads correctly, and **nothing else assumes 600
is the bold** — all seven `font-weight: 600` uses (`base.css:342`, `components.css:186, 504, 537,
898`, `theme.css:51, 172`) are legitimate `fonts.ui.weight: [500,600]` label/button roles.
**Required change**: update `SITE.md:106-107` and `REGEN_PLAN.md:76` to eleven faces and 700 bold.

### F12 — Invented facts on `plugins.html`

**`plugins.html:158-161`** — a `<pre>` asserts a concrete on-disk layout
(`plugins/my-plugin/plugin.json`, `plugins/my-plugin/Plugin.php`). Neither path is in
`content.json`. **`plugins.html:183`** — "Metadata providers are the most common plugin shape" is
an unverifiable popularity claim.
**Required change**: replace the code block with the manifest/interface *names* (both in
`content.json`) or drop it; reword to "The reference plugin is a metadata provider, so a new
provider slots into an existing pipeline rather than inventing one."

### F13 — Home page prints all eight full feature bodies, so `features.html` adds nothing

**`index.html:259-359`** vs **`features.html:147-243`**
All eight `content.json` bodies appear verbatim on both pages, so `feature_casting`'s
hero/support/footnote weighting is expressed only in box size, never in disclosure.
**Required change**: on the home page let the two hero casts carry body + `angle`, the four support
casts carry a single clause, and the two footnote casts carry the title only. Full bodies stay on
`features.html`.

### F14 — Ecosystem list duplicated verbatim across two indexable pages

**`docs.html` §02 Ecosystem** and **`download.html` §03 Ecosystem** — the same five-repo
`repo-list`. **Required change**: keep it on `download.html` and have `docs.html` link to it.

### F15 — Easter-egg reward is announced unreliably, then removed after 1s

**`js/main.js:89-99`** — the `role="status"` element is appended with its text already set; a live
region must exist before its content changes for most screen readers to announce it, and 1000ms is
below the reliable window.
**Required change**: insert an empty `.egg-reward` live region on load (or insert the empty node and
set `textContent` in a `requestAnimationFrame`), and hold it ~4s before clearing.

### F16 — Stale `aria-expanded` across the 900px breakpoint

**`js/main.js:34-44`** — no resize handling, so an open menu leaves `aria-expanded="true"` on a
`display:none` toggle once the viewport widens.
**Required change**: add a `matchMedia('(min-width: 900px)')` `change` listener that calls
`closeMenu(false)`.

### F17 — Favicon puts the wordmark letter on a solid Basel Red field

**`img/favicon.svg:3-4`** — Grid White "P" on `#E8001C`. `do_dont.branding.dont`: "Apply the logo
on colored backgrounds (red, gray) without inversion approval"; `logo_rules.colors` allows only
Ink-Black-on-Grid-White or Grid-White-on-Ink-Black. Carried forward from the predecessor, but it is
the most-reproduced brand asset and it disagrees with `og.svg` about the brand ground.
**Required change**: invert to `#121212` ground with a `#F8F8F4` "P".

### F18 — Card hover red line has no 80ms transition

**`css/components.css:262-264, 323-325, 374-376, 440-442, 655-657`** — the red inset appears at
0ms; `microinteractions.hover` specifies "over 80ms linear". `.btn` is the only element carrying
`--motion-snap`.
**Required change**: add `transition: box-shadow var(--motion-snap);` to `.module`,
`.feature-detail`, `.client-card`, `.download-card`.

### F19 — The 5th card spans 12 columns and leaves ~1000px of dead measure

**`css/components.css:483-485, 678-680`** — `.client-card:last-child` /
`.download-card:last-child` span 12 while their siblings span 3, and `.spec-table .spec-row`
stays `grid-template-columns: 1fr` inside them, so at 1280 the DLNA card is ~1230px wide carrying
~200px of content. It also breaks the five-way comparison the grid exists to support.
**Required change**: either give the 5th card `span 3` and leave the 4th slot of row 2 empty (which
*is* Swiss asymmetry), or switch spec rows inside a full-width card to the two-column
`minmax(0,12rem) minmax(0,1fr)` form already used by `.manpage-head`.

### F20 — Redundant landmark roles on all nine pages

**`index.html:67, 457`** and the same two lines in the other eight pages — `role="banner"` on
`<header>` and `role="contentinfo"` on `<footer>` duplicate the native semantics.
**Required change**: remove both attributes on all nine pages. (Leave the `role="list"` on
`list-style: none` lists — that one is a deliberate Safari/VoiceOver workaround.)

### F21 — Proof-band lead narrates the build instead of the product

**`index.html:368-371`** — "Live figures are not printed here, because a static page cannot verify
them — the links go to the source." A build note, and it hedges, in a voice specified as
"Declarative / Unsentimental / Factual over emotional".
**Required change**: "Counts you can check against the repositories. Stars and issues are live on
GitHub."

### F22 — `docs.html` is the thinnest page and repeats its own heading

**`docs.html:135, 146`** — `<h1>06 Documentation</h1>` immediately followed by `<h2>01
Documentation</h2>`; the whole page is 141 words of body copy across two sections. No
`page_blueprints.docs` is declared so the default is not a defect, but it is under-built next to
`plugins.html` and `hub.html`.
**Required change**: rename the inner section (e.g. "Where the docs live") and add a third numbered
section — a `.spec-rows` "read in this order" index would use vocabulary the site already owns.

### F23 — Long prose sentence set in monospace

**`download.html`, the `.code-caption` under §01 Server** — a two-line sentence in JetBrains Mono
at `--color-gray-deep`. `fonts.mono.usage` reserves mono for "counters, technical readouts,
runtimes, durations, file sizes, code… used sparingly."
**Required change**: set the caption in Inter 400 (`--text-sm`); keep mono for the `<code>` itself.

### F24 — No `<strong>`, `<b>` or `<em>` exists anywhere on the site

`css/base.css:265-268` (`strong, b { font-weight: 700 }`) is therefore inert and the newly
vendored `inter-700` face will never be requested for body copy. Not wrong — this kit builds
hierarchy from weight and size, not inline emphasis — but the Fixer should know the 700 rule is
currently unexercised, and `jetbrains-mono-700` / `barlow-condensed-800` are declared faces no
rule can match. **No change required**; do not add emphasis just to exercise the face.

### F25 — Favicon set is SVG-only; no `manifest.webmanifest`

**`index.html:16`** — only `rel="icon" type="image/svg+xml"`. The rubric asks for 16/32/180/192/512
plus a webmanifest. This is the shared baseline for most sites in the programme (though
`copper-steampunk` does ship one), so it is an orchestrator decision rather than a per-site
regression. **No per-site change required**; raise upstream.

---

## Checked and clean (so the orchestrator can tell depth from breadth)

- **Anti-convergence — PASS, and not marginally.** Structural diff against `neon-noir`: home
  section ids `manifesto/value-structure/features-grid/proof-placard/install-cta` vs
  `opener/case-brief/lead-cases/trust-play/closing-act`; component vocabulary `spec-rows /
  spec-table / repo-list / manpage-head / module-grid / footer-mirror / link-list / band--guides`
  vs `caseboard / clue / alley / lux / case-quote / clue-scrolls / intensity-toggle`. Only the
  shared chassis (`container`, `band`, `btn`, `cta-banner`, `footer-nav/-tagline/-copy`) is common.
  Nav labels/order and the 9-page inventory match other kits **because this kit declares them**
  (`site_architecture.nav`, `extra_pages: []`) — kit-mandated, not convergence.
- **Contrast** — every text/background pair recomputed independently from `kit-brief`'s table; the
  derived `#cc0018` (5.51:1), `#b40015` (6.68:1) and `#5e5e5e` (6.09:1) all check out, as does
  `#888888` = 3.33:1 used only at ≥38px/900 weight. `.status-beta`'s `#888` border on `#efefeb`
  = 3.07:1, clears the 3:1 non-text floor.
- **Accent count** — the four counted red marks are correct and the accent is **not** overused;
  one red *role* per band is the right reading of `page_generation_rules` vs "once per view", and
  no two marks share a viewport at any tested height. The problem is the fifth, uncounted mark
  (F4), not the count.
- **Section numerals as real indices** (`REGEN_PLAN.md:136-140`) — correct reading of
  `signature_elements` / `art_direction`; legible, inside the heading, nothing `aria-hidden`.
- **`page_blueprints.features` 18px→24px step** — a faithful reading, not a downgrade; both values
  are on the kit's strict scale and `fonts.body.usage` names 16–18px as the reading optimum. The
  defect is the *title* not stepping up with it (F2).
- **JS size** — 4.1 KB is the right amount for a kit that declares a static hero (`js_budget_kb:
  0`), continuous scroll, no mascot, no intensity toggle and "no accordion behavior". Not
  under-built; the richness is in the CSS vocabulary and markup.
- Doubled "Grid." — **clean in every HTML page, stylesheet, script and SVG asset**; stale only in
  the three doc lines in F10.
- Overflow sweep at 320/375/768/1024 × 9 pages → zero horizontal overflows.
- Licence facts, feature bodies, pitch bullets, client capabilities, ecosystem repos and FAQ Q/A
  all verbatim from `content.json`; no fabricated star count, no fabricated docs attribution.
- Focus ring, skip link, `prefers-reduced-motion`, no-JS nav fallback, DOM==visual tab order,
  single `<h1>` per page, `noindex` + relative paths on `404.html`, `sitemap.xml` 8 URLs,
  `og.png` 1200×630, RTL-safe logical properties throughout.
