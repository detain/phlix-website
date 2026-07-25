# ROUND-1 — Abstract Canvas (regen pass)

**Variant**: abstract-canvas
**Round**: 1 (regen pass, `regen/wave-1`)
**Reviewer**: adversarial reviewer (independent; did not build this site)
**Date**: 2026-07-24

**Verdict: DOES NOT EXIT THE LOOP.** 8 ❌ and 18 ⚠️. Aggregate (rubric weights) **79**, not
the author's self-reported 92. Two of the ❌ are invisible to `selfcheck` **and** to
`render-check` because of blind spots in the tools themselves (documented per finding).

## Scores

| Dimension            | Weight | Score  | ❌  | ⚠️  |
| -------------------- | ------ | ------ | --- | --- |
| Accessibility        | 1.5    | **62** | 4   | 5   |
| Performance          | 1.2    | **87** | 0   | 4   |
| Responsive           | 1.2    | **60** | 3   | 3   |
| Branding Consistency | 1.2    | **88** | 0   | 4   |
| Experience Fidelity  | 1.2    | **80** | 2   | 2   |
| Usability            | 1.0    | **74** | 3   | 5   |
| Content Quality      | 1.0    | **82** | 1   | 4   |
| CTA / Funnel         | 1.0    | **86** | 2   | 3   |
| SEO                  | 1.0    | **88** | 0   | 4   |
| Social Metadata      | 0.8    | **86** | 0   | 4   |
| Localization         | 0.6    | **88** | 0   | 4   |
| **Aggregate**        | 11.7   | **79** | —   | —   |

(Per-dimension ❌/⚠️ counts overlap — several findings are graded in more than one dimension. The
distinct totals are **8 ❌ / 18 ⚠️**, numbered below.)

Machine baseline for this round:

```
node tools/selfcheck.mjs    --site abstract-canvas   → PASS (1 warning: kit's own contrast claim)
node tools/render-check.mjs --site abstract-canvas   → FAIL 1: download.html @mobile
                                                        scrollWidth 354 > viewport 320
```

---

## ❌ Failures (must fix this round)

### 1. `download.html` overflows horizontally at 320px — the grid track, not the code block

**`css/theme.css:105-108`** (`.wall-grid`) — the base rule is `display: grid` with no
`grid-template-columns`, so at <900px the single implicit track is sized `auto`, i.e.
**floored at its content's min-content width**. `.code-block` (`css/theme.css:906-914`)
contains the unbreakable `git clone https://github.com/detain/phlix-server.git`
(`download.html:165`), whose min-content is ~412px, so the whole wall column renders 330px
wide inside a 320px viewport (measured: `div.wall-margin` and every sibling at
`left=24 right=354`). `overflow-x: auto` on `.code-block` does not stop the propagation,
because the scroll container is a *block child* of the grid item, not the grid item itself.

**Required change:** add `grid-template-columns: minmax(0, 1fr);` to the base `.wall-grid`
rule (the `@media (width >= 900px)` override at `css/theme.css:110-116` already sets its own
two-track template, so it is unaffected). Re-run `render-check` until clean.

### 2. Layout does **not** survive 200% text zoom on 5 of 9 pages — including clipped hero copy and a clipped primary CTA

§12 hard gate ("Layout survives **200% text zoom** without clipping or overlap") and the
kit's own `accessibility.font_scaling` ("without clipping or horizontal scroll"). Measured at
320px with `html{font-size:32px}`:

| Page            | Result                                                                     |
| --------------- | -------------------------------------------------------------------------- |
| `index.html`    | **no scrollbar but content is CLIPPED** — `.hero-headline` renders `right=343` and the primary CTA `a.btn` renders `w=319 right=343` against a 320px viewport; both are cut off by `.hero{overflow:hidden}` (`css/theme.css:180-187`). Screenshot: `reviews/abstract-canvas/shots/` reference image reproduced from `rev-zoom200-home-320.png` — the word "collection." reads "collectio" and the black CTA is sliced. |
| `features.html` | horizontal overflow 433 > 320 (`article#dlna.marginalia-item`, `h3`, `.plain-line`) |
| `download.html` | horizontal overflow 632 > 320 (`.code-block`, `span.code-comment` w=503)   |
| `plugins.html`  | horizontal overflow 424 > 320 (`code` "LifecycleInterface", `.wall-text`)   |
| `about.html`    | horizontal overflow 366 > 320 (`.talk dt`, `.talk dd`)                      |

**Why the tools missed it:** `tools/render-check.mjs:279-296` runs the 200% pass on
`index.html` only, and tests `documentElement.scrollWidth` — which `overflow:hidden` on
`.hero` masks. The clipping is real; the metric is not.

**Required change:** (a) finding 1's `minmax(0, 1fr)`; (b) `overflow-wrap: break-word` on the
long-form text roles — `.wall-text` (`css/theme.css:52-57`), `.plain-line` (`:77-83`),
`.section-intro` (`:752-757`), `.talk dt`/`.talk dd` (`:1116-1148`), `.marginalia-item h3`
(`:524-528`), `.plugin-model` prose (`:1009-1018`), `.code-block code` (`:916-921`);
(c) `.hero-headline` (`css/theme.css:227-233`) must not exceed its column at 200% — lower the
`clamp()` floor and add `overflow-wrap: break-word`; (d) confirm nothing is clipped by
`.hero{overflow:hidden}` afterwards. Verify all 9 pages at 320px × 200%, not just home.

### 3. Palette (fixed companion) covers the primary hero CTA on common phone sizes — §19.11

`css/components.css:486-496` pins `.palette-companion` bottom-right at every width; only the
*tip bubble* is suppressed on phones (`js/main.js:239`), while the 48px figure + 32px dismiss
remain. Measured overlap of the palette box with `.hero-actions .btn-primary`
("Set Up Your Studio"):

| Viewport | CTA rect            | Palette rect         | Overlap        |
| -------- | ------------------- | -------------------- | -------------- |
| 320×640  | l43 t612 r257 b674  | l216 t576 r304 b624  | **YES** 41×12px |
| 320×700  | same                | l216 t636 r304 b684  | **YES**        |
| 320×720  | same                | l216 t656 r304 b704  | **YES**        |
| 360×640  | same                | l256 t576 r344 b624  | **YES**        |
| 375×667  | l43 t572 r257 b633  | l271 t603 r359 b651  | **YES**        |

Visual confirmation: Palette and its `×` button sit on the bottom-right corner of the black
CTA. §19.11 is unconditional: "It must not overlap the primary CTA."

**Why the tool missed it:** `tools/render-check.mjs:176-179` selects CTAs by
`/get |download|start|install/` against the link text. This kit's `copy_overlay` renames the
primary CTA to "**Set Up Your Studio**", which matches none of those, so the CTA is never
tested against the floaters. The check the tool exists for did not run on this kit.

**Required change:** guarantee no intersection between `.palette-companion` and
`.hero-actions` at ≤700px — e.g. keep Palette hidden until the hero has scrolled out of view
on small viewports, or offset it clear of the CTA band. Verify at 320×640, 320×700, 320×720,
360×640, 375×667.

### 4. The home-page logo link is dead — every activation is suppressed

**`js/main.js:272-295`**, specifically `e.preventDefault();` at **`js/main.js:277`**, runs on
*every* click of `.nav-logo` while `pageId === 'home'`, not only on the fifth. Verified in a
browser: mouse click does not navigate, and `Enter` on the focused link does not navigate. The
element is announced as a link named "Phlix home" (`index.html:73`) and does nothing — a
broken affordance for anyone who uses the wordmark to return to the top, and a WCAG 3.2.4 /
2.1.1 expectation failure. The kit's `easter_eggs[0].exit` does not license disabling the
link.

**Required change:** remove the unconditional `preventDefault()`. Persist the click count in
`sessionStorage` so it survives the self-navigation, or move the counter to a non-navigating
element. Click and `Enter` must both activate the link on every press.

### 5. The `<summary>` disclosures that hold every technical fact are 22px tall

**`css/theme.css:478-486`** — `.technical-mark > summary` measures **208×22** and **226×22** at
320px (measured on `index.html`, `features.html`). §12 requires ≥44×44 and the kit commits to
`touch_target: "Minimum 48×48px on mobile and TV"`. These are not decorative: under
`complexity_profile.jargon_policy: "translate"` the disclosure is the **only** route to the
verbatim `content.json` feature bodies, so a missed tap costs the visitor the facts.

**Required change:** give `.technical-mark > summary` `min-height: 44px` with vertical padding,
and ≥48px inside `@media (width <= 600px)`.

### 6. `site_architecture.nav[].emphasis` renders as two levels, not three — and `REGEN_PLAN` row 1 claims a ladder that is not in the CSS

**`css/components.css:89-100`** styles only `[data-emphasis='primary']` (`--color-primary`
`#1A1A1A`) and `[data-emphasis='muted']`. There is **no** `[data-emphasis='default']` rule, so
`default` inherits `.nav-link { color: var(--color-text) }` = `#141210` at weight 600 — a 0.4%
lightness difference from `primary` at the identical weight. "The Canvas" (primary) and "The
Gallery" (default) are indistinguishable on screen; the declared three-step emphasis is
unobservable.

**`REGEN_PLAN.md:19`** claims "primary = ink 600; **default = ink 500**; muted = deep-umber
**400**". Actual: 600 / 600 / 500. A manifest row claimed and not delivered.

**Required change:** implement three visibly distinct levels (e.g. primary 600 ink, default 500
raw-umber-ink, muted 400 + smaller) **and** correct `REGEN_PLAN.md:19` to describe what ships.

### 7. `seasonal_activation.motif_assets` ship as files but are rendered by nothing

`img/seasonal/autumn-leaf-marks.svg`, `winter-frost-texture.svg`, `spring-flower-forms.svg`
exist, and `REGEN_PLAN.md:45` presents them as delivered. `grep -rn "seasonal/" css/ js/ *.html`
returns **zero** references. The live-js gate (`js/main.js:331-396`) flips colour tokens and the
banner; `css/theme.css:1257-1267` re-tints `.band` only. The declared per-season **motif** is
therefore not observable in any state of the site, and three assets are dead weight.

**Required change:** reference each asset from its `html[data-season='…']` rule (e.g. as the
motif mark on `.seasonal-banner` / `.band`), verified via `?season=autumn-study`; or delete the
three files and record the deviation in `REGEN_PLAN.md` §5 — do not leave a claimed asset unwired.

### 8. "One line" is asserted on 7 pages; the install is three commands

The snippet at **`download.html:163-168`** is three commands (`git clone …`, `cd phlix-server`,
`composer install`). The copy claims otherwise, repeatedly:

- `download.html:141` "Canvas and brushes — **one line to paint**"
- `download.html:156` same, as the `<h2>`
- `clients.html:303-304` "The install itself is **one line**."
- `features.html:537` "The server is **one line**"
- `plugins.html:270` "That part is **one line**."
- `docs.html:273` "the server install is still **one line**"
- `about.html:310` "The rest is **one line** and a folder of files."

`conversion_funnel.download_opening` asks for a "one-liner server install", but `content.json`
supplies no install command at all, so the kit's framing cannot be honoured by assertion. §16 /
§19.7 forbid copy that misdescribes what the visitor will actually do.

**Required change:** either make it literally one line
(`git clone https://github.com/detain/phlix-server.git && cd phlix-server && composer install`)
or re-voice all seven claims to match the three-command reality. One of the two, applied
consistently.

---

## ⚠️ Concerns (non-blocking, ranked)

9. **No-JS mobile navigation is unreachable.** With JS disabled at 320px, `.nav-menu` computes
   `display: none` (`css/components.css:141-153`) and `.nav-toggle` is inert — measured. Only the
   footer directory keeps the site navigable. `navigation_model.fallback` nominally requires a
   working no-JS fallback (§2A). Cheap fix: ship the menu open by default and hide it only under a
   `html.js`/`:has()` guard, or use a `<details>` menu. Program-wide pattern, so ⚠️ not ❌.
10. **`.code-block` is a scrollable region with no keyboard access** (`css/theme.css:906-914`) —
    axe `scrollable-region-focusable`, serious. Add `tabindex="0"` (plus `role="region"` +
    `aria-label`), or render the snippet in `<pre>`.
11. **`.palette-dismiss` is 32×32** (`css/components.css:545-558`) — below §12's 44px and the
    kit's 48px mobile commitment, and it is the control that makes the companion go away.
12. **Snippet markup is `<div class="code-block"><code>` + `<br>`** (`download.html:162-169`)
    rather than `<pre><code>`; shell commands lose their whitespace semantics.
13. **Footer links are 32px tall** (`css/components.css:390-397`) and the repo "spine" links are
    ~20px (`css/theme.css:995-999`). WCAG 2.2 2.5.8 is satisfied (inline / spacing exceptions) but
    §12's 44px floor is not.
14. **`.skip-link` measures 178×42** (`css/base.css:279-292`) — 2px under the 44px floor.
15. **The kit's contrast prose is wrong in four places**, not one. Measured: Cadmium Red on
    Gallery Linen **4.73** (kit says 5.8), Carbon Black **14.87** (kit says 16.8), Paint Ink
    **15.96** (kit says ~18), Raw Umber 3.32. The site's response is correct and honest — the
    four derived mixes in `css/base.css:48-61` and `SITE.md:51-64` reproduce my measurements
    **exactly** (5.78/5.32/4.75, 5.94/5.47/4.88, 5.59/5.15/4.59, 5.68/5.23/4.66), and I found
    **zero** live text below its required ratio on any page at either viewport. Keep the kit-file
    escalation (`REGEN_PLAN.md:201`) open.
16. **No italic face exists in the shared font pool**, so all 11 `font-style: italic` rules —
    `.manifesto`, `.footer-tagline`, `.station-talk`, `.proof-quote p`, `.hero-logline`,
    `figcaption`, `.talk dt + dt`, `.seasonal-banner p` — render as synthetic oblique Cormorant /
    Lora. `typography_rules` explicitly calls for "Cormorant Garamond italic". `REGEN_PLAN.md:206`
    concluded "no `vendor-fonts.mjs` re-run required", which is true for families but wrong for
    styles. Orchestrator-owned (§19.3): escalate, do not add a CDN.
17. **Two hex values are off-token and undocumented:** `#2a2a2a` (`css/components.css:245-246`,
    `.btn-primary:hover`) and `#3A3128` (`img/logo.svg`, the umber gestural mark). Both are
    plausible darkenings/mixes, but `SITE.md`'s derived-pigment table lists four tokens, not six.
    Either add them to the table as mixes or replace them with existing tokens.
18. **Every page ships the same `<meta name="description">`, `og:description` and
    `twitter:description`** (identical 125-char string, 9/9 pages). Lengths pass; duplicate
    descriptions weaken per-page SEO. Page-level descriptions are authored presentation copy and
    therefore permitted.
19. **JSON-LD exists on `index.html` only** (0/8 other pages). Matches the program norm; flagged
    because the rubric lists the block under Social Metadata.
20. **Favicon set is `favicon.svg` alone** — no 16/32/180/192/512 PNGs and no
    `manifest.webmanifest` (rubric: Social Metadata). Every other site in `sites/` has the same
    gap, so this is a shared change, not a per-kit one.
21. **`plugins.html:294-297`** — "a provider you write sits beside the built-in TMDB, TVDB,
    Fanart.tv and local-NFO sources **rather than underneath them**" is an architectural claim
    with no basis in `content.json` (which says only "Reference metadata-provider plugin"). Soften
    to what is traceable.
22. **First-paint font cost is ~312 KB** (8 of the 10 declared faces are actually exercised;
    3 Inter weights alone are 145 KB, and Inter 500 appears to be used only by `.skip-link`).
    Inside the 500 KB page budget, but it is the single largest cost and Lighthouse could not be
    run to confirm LCP.
23. **`REGEN_PLAN.md` §5 A8 and §6.1 / §6.5 are stale.** `new_site.md` §2A's DO-table now *requires*
    the per-kit 404 (the "schema-only" row the plan argues against is gone), and §19.5 documents the
    `--site` flags on `gen-og.mjs` / `gen-sitemap.mjs` that §6.5 says do not exist. A reviewer
    reading the plan is misled about what was contested.
24. **Printing or PDF-exporting a page loses every `.reveal` block.** `css/theme.css:1291-1293`
    sets `html.js-reveals .reveal { opacity: 0 }` and only an `IntersectionObserver` hit restores it;
    `@media print` (`css/base.css:374-378`) resets only the canvas grain. Measured under print
    emulation on a freshly-loaded `index.html`: **13 of 13** reveal blocks print blank — the 2 focal
    works, the 4 studies and all 7 gallery-label pitch bullets. One-line fix:
    `@media print { html.js-reveals .reveal { opacity: 1 } }`.
    *(Related, and NOT a defect: the `*-desktop.png` shots in this directory show those same sections
    empty. That is a `fullPage` capture artefact — scrolling a real browser reveals all 13, measured
    13 → 0. Do not "fix" the reveals.)*
25. **Cadmium-red frequency is at the edge of the kit's own Don't** ("Scatter cadmium red across
    multiple elements indiscriminately"). On `index.html` red appears ~12 times: the hero eyebrow,
    the secondary button border+label, the `.band` divider, **seven** `.wall-label-no` catalogue
    numerals (`css/theme.css:578-584`), three consecutive `.proof-links` anchors, the `01` rung rule
    and the marginalia border. The judgement call: the seven identical red numerals in one section
    and the three stacked red links read as decoration rather than emphasis, and they dilute the one
    place red should pull the eye. The primary CTA is correctly carbon black per `buttons.primary`,
    and `colors.secondary.usage` does licence red for links — so this is a ⚠️, not a ❌. Suggested:
    demote `.wall-label-no` to `--color-neutral-ink` and keep at most one red mark per section.
26. **`js/main.js:388-395`** injects the seasonal `<aside>` *before* `<header class="site-header">`,
    i.e. as a top-level complementary landmark ahead of `banner`, after first paint — an
    out-of-landmark region plus a layout shift whenever a season is live. Inert today (no active
    range), so ⚠️ only; prefer server-side markup hidden by default, or insert inside `<header>`.

---

## What came back clean (so the depth of this round is legible)

- **Contrast**: independent per-element WCAG measurement over all 9 pages × {320, 1280},
  compositing every ancestor background alpha — **no** text below 4.5:1 (or 3:1 where large).
  The four derived pigments verify to the decimal. The one opacity-reduced text run,
  `.btn-sub` at `opacity: 0.85` (`css/components.css:280-283`), was hand-checked separately:
  #B31E00 @85% over linen = **4.68:1**, still passing.
- **Structure**: no duplicate `id`s, no broken `aria-labelledby`/`aria-controls`, no broken
  internal anchors (`features.html#library|#syncplay|#dlna`, `download.html#server` all resolve),
  every `<img>` has `alt`, no inline `style=`, no positive `tabindex` (only `main[tabindex="-1"]`),
  exactly one `<h1>` per page and **no heading-level skips** on any of the 9 pages.
- **No-JS**: hero eyebrow/headline/logline/subheadline and **both** CTAs render; zero `.reveal`
  elements are stuck at `opacity: 0`; `404.html` stands alone.
- **`@copyright` trap (§19.2)**: `grep -n "^ \* @" css/*.css` is empty.
- **Fonts (§19.3)**: 10 `@font-face` rules, all pointing at existing shared WOFF2s, all
  `font-display: swap`; zero external font requests.
- **`og:image` (§19.5)**: `img/og.png` verified 1200×630; referenced absolutely on all 9 pages.
- **Facts**: all 7 pitch bullets, all 8 feature titles/bodies, all 5 clients with their **full**
  highlight lists, all 5 ecosystem rows and all 6 FAQ answers are verbatim `content.json`; the
  licence is MPL-2.0 + MIT everywhere (footer, About chapter II, FAQ, JSON-LD) and never "across
  the board"; `proof_strategy` prints **no** star/contributor counts and links `/graphs/contributors`
  instead; the docs quote is a verbatim substring of the FAQ answer; the secondary CTA is honestly
  labelled "Browse the Gallery (the docs)".
- **Voice**: zero `avoid_words` in visible prose (the only "content" on the page is the mandated
  "Skip to main content"), zero exclamation marks across 9 pages.
- **Experience fields**: 19 of the 21 declared fields are observably implemented (see
  `experience-fidelity.md`); `faq_experience.question_order` + all 3 `extra_questions` map correctly
  to shared `<dd>`s; the mascot is correctly suppressed on `about.html` (the FAQ page) and
  `404.html` via `data-palette="off"`; `sitemap.xml` (8 URLs, no 404) and `robots.txt` carry the
  correct live paths.
- **Anti-convergence**: structurally, not cosmetically, different from the default skeleton — 6-item
  renamed nav, 2 pages demoted with breadcrumbs, 5 narrative home sections in the declared order,
  a 4-tier gallery-wall features page, 5 stacked client "stations", a 3-step studio-setup download,
  an artist-monograph About. This is the strongest part of the build.
