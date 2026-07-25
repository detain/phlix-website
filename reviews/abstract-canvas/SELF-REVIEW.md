# Self-Review — Abstract Canvas (regeneration pilot)

**Variant**: abstract-canvas
**Round**: 0 (author's own pass — **not** a substitute for the independent reviewer)
**Reviewer**: the authoring agent. I built this site, so treat every score below as the _most_
generous defensible reading. The orchestrator's fresh reviewer has not seen my reasoning and should
be believed over me where we disagree.
**Date**: 2026-07-24

`regen_site_prompt.md` STEP 3 normally spawns a fresh reviewer; I cannot spawn agents, so this file
is the honest self-check plus the evidence a reviewer needs. Findings I already know about are listed
as ⚠️ rather than hidden.

---

## Scores

| #   | Dimension               | Score | Severity |
| --- | ----------------------- | ----- | -------- |
| 1   | Brand fidelity & spirit | 93    | ✅       |
| 2   | SEO                     | 91    | ✅       |
| 3   | Readability             | 93    | ✅       |
| 4   | Spelling & grammar      | 95    | ✅       |
| 5   | Usability               | 91    | ✅       |
| 6   | Accessibility           | 92    | ✅       |
| 7   | Responsive              | 92    | ✅       |
| 8   | Performance             | 93    | ✅       |
| 9   | Content accuracy        | 92    | ✅       |
| 10  | CTA / funnel            | 93    | ✅       |
| 11  | Social metadata         | 95    | ✅       |
| 12  | Localization            | 88    | ⚠️       |
| 13  | Experience fidelity     | 94    | ✅       |
| 14  | Manifest compliance     | 95    | ✅       |
| 15  | Anti-convergence        | 97    | ✅       |

Weighted aggregate (rubric weights, dimensions 1–13 + the two regen checks): **92**.
One dimension is below 90 (localization) and I have not fixed it because the fix is a **shared**
change — see below.

---

## Evidence — commands actually run, with output

```
$ npx prettier --check sites/abstract-canvas/**            → All matched files use Prettier code style!
$ npx stylelint --config .stylelintrc.json sites/abstract-canvas/css/*.css   → exit 0, 0 problems
$ npx eslint sites/abstract-canvas/js/main.js              → exit 0, 0 errors, 0 warnings
$ npx htmlhint --config .htmlhintrc sites/abstract-canvas/*.html
                                                           → Scanned 9 files, no errors found
$ node tools/check-meta.mjs                                → OK — 403 html file(s) have correct per-page meta
$ node tools/gen-og.mjs --site abstract-canvas             → wrote 1 og.png file(s) from 1 svg(s)   (74,880 bytes, 1200x630 RGB)
$ node tools/gen-sitemap.mjs --site abstract-canvas        → wrote sitemap.xml (8 URLs) + robots.txt
```

`review_site_prompt.md` mechanical checks:

```
grep -rho "url([^)]*)" css/         → 10 refs, all ../../assets/fonts/*.woff2
                                      all 10 exist in shared/assets/fonts/ (verified per file)
grep -rn "fonts.googleapis|gstatic|cdn\."   → EMPTY  (pass)
grep -n "^ \* @" css/*.css                  → EMPTY  (pass — §19.2 detector)
grep -n "robots" 404.html                   → line 15: <meta name="robots" content="noindex" />
grep -n 'href="/|src="/' 404.html           → EMPTY  (pass — relative only)
internal links + fragments (17 distinct)    → all resolve, incl. #library, #syncplay, #dlna,
                                              #server, #main-content
```

**Note for the reviewer:** the prompt's link grep is `href="[^"#h][^"]*"`, whose `h` exclusion also
skips **`hub.html`**. I re-ran it without that exclusion; `hub.html` resolves. The pattern will hide
any internal page starting with `h` on all 50 kits.

HTTP probe of every external target (curl, follow redirects):

```
200 https://detain.github.io/phlix-docs                     200 …/phlix-docs/dev
200 https://detain.github.io/phlix-docs/hub-admin           200 …/phlix-docs/reference/api.html
200 https://github.com/detain/phlix-server                  200 …/phlix-server/blob/master/LICENSE
200 …/phlix-server/graphs/contributors                      200 …/phlix-server/pulse
404 …/phlix-server/stargazers   ← found and removed before shipping (also /watchers 404s)
```

`…/blob/master/LICENSE` now returns **200**, so the 33-file broken-link class in
`plan_site_regen.md` §0.8 and the "no LICENSE file exists" claim in §0.9 are **stale** — worth
correcting in the plan.

Rendered pass (repo puppeteer, `--no-sandbox`), all 9 pages:

```
horizontal scroll @320  → false        horizontal scroll @1280 → false
horizontal scroll @ root font-size 32px (≈200% zoom) → false
JS console/page errors  → none (only file:// font 404s, expected: ../../assets/fonts resolves in dist)
hero-field box          → 460 x 575 px (was 0 x 0 before the fix)
mobile menu             → aria-expanded true, aria-label "Close navigation menu", 48px rows
"Gallery quiet" toggle  → aria-pressed true, <html data-intensity="quiet">, persisted
easter egg 1 (logo x5)  → "The work is well-made — keep painting." → Esc clears it
easter egg 2 (type)     → "Palette recognizes its own name…", figure .is-lifted, Esc clears
Palette click x5        → "Palette spins, sets itself down…"
Palette dismiss         → widget gone, localStorage phlix-ac-palette=rest, still gone after navigation
seasonal ?season=autumn-study → data-season set, --color-primary #8B3A00, banner rendered
seasonal today (07-24)  → data-season null, no banner (correctly inert)
```

Contrast, computed (WCAG 2.x, sRGB):

```
Paint Ink #141210 on linen 15.96 / cream 14.70 / aged 13.11
Carbon    #1A1A1A on linen 14.87 / cream 13.69 / aged 12.21
Ultramarine #0055AA        6.23 / 5.74 / 5.12
cadmium-text #B31E00       5.78 / 5.32 / 4.75      neutral-ink #5F594C  5.94 / 5.47 / 4.88
success-text #146B40       5.59 / 5.15 / 4.59      warning-text #7A5600 5.68 / 5.23 / 4.66
linen on carbon (primary button) 14.87
REJECTED for small text: cadmium #CC2200 (4.73 / 4.35 / 3.88), umber #8A8070 (3.32 / 3.06 / 2.73),
ochre #C8900A (2.41 / 2.22 / 1.98) — used only for marks, rules, borders and fills.
```

---

## Per-dimension notes

### 1. Brand fidelity & spirit — 93 ✅

Every colour is a `design_tokens` value or a documented darkened mix of one (`SITE.md`); every
typeface role is used per `fonts{}` and `typography_rules` (Bebas confined to numerals and always
uppercase; Cormorant never under 600; Lora never capitalised; italic Cormorant for captions and
attributions). `signature_elements` present: gestural brushstroke marks (hero SVG, logo, band),
colour-field blocks (hero, OG, logo margin), palette-knife scrape rule, colour-field band dividers,
linen grain on `body::before`, handwritten-register italic captions. `design_principles` honoured
including "the canvas is always warm" (no `#fff` anywhere) and "cadmium is precious". `brand_opposites`
avoided: nothing dark, neon, corporate, cartoonish or rushed.

- ⚠️ The pure cadmium `#CC2200` appears as a mark or edge in several places per page (nav underline,
  hero bar, focal-work hover, wall-label numeral in `--color-cadmium-text`). I read "reserve it for
  the single most important action" as governing _filled actions_, and the primary CTA is carbon
  black per `buttons.primary`. A stricter reviewer could call this scattering — it is the one
  judgement call in the palette. `theme.css:147` (`.band`), `components.css:84`
  (`.nav-link[aria-current]`), `theme.css:251` (`.hero-actions::before`).
- ⚠️ `header_motif` is "slow gestural brushstroke animation revealing the hero wordmark
  left-to-right". `hero_experience.mode` is `static` with `js_budget_kb: 0`, and §2A makes the
  static fallback mandatory, so I shipped the brushstroke as a **static** mark rather than an
  animated reveal. Defensible (the newer, more specific field wins) but it is a real tension between
  two kit fields, and the reviewer should judge it.

### 2. SEO — 91 ✅

Titles 15–40 chars, all page-specific; one `<h1>` per page (verified 9/9); no skipped heading
levels; canonical + `og:url` identical and absolute on all 9 (check-meta green); JSON-LD
`SoftwareApplication` on the home page with the MPL-2.0 licence URL; sitemap (8 URLs, 404 excluded)
and robots generated by the tool; descriptive anchor text throughout ("View the source for Roku",
not "click here").

- ⚠️ All 9 pages share `content.json`'s single `meta.description`. §10 says descriptions come from
  `meta.description`, and only one exists — literal compliance vs. per-page uniqueness. Duplicate
  descriptions are a mild SEO smell. The fix is a `content.json` addition, i.e. a shared change.

### 3. Readability — 93 ✅

`complexity_profile` is `minimal` / `plain-language` / `translate`. Every feature now leads with one
plain sentence and hides the engineering wording behind "The technical mark", which is the single
biggest readability change from the predecessor. Measure capped at 68ch; body text 16–17px, never
below 16px; left-aligned per `typography_rules`; no wall of text longer than three sentences.

### 4. Spelling & grammar — 95 ✅

Read end to end. Consistent en-GB-neutral spelling in authored prose; `content.json` quotes left
untouched (they use US spellings — deliberate, they are verbatim facts). No `avoid_words` in prose:
scanned all 13, zero hits. "content" survives only in `<meta content=…>` attributes and the
mandatory "Skip to main content" link.

### 5. Usability — 91 ✅

Download is **1 click** from the home hero and reachable from every page; one dominant CTA per
screen; the two footer-demoted pages get breadcrumbs so a visitor is never orphaned by an
`aria-current`-less nav; nav labels carry a visually-hidden gloss ("The Frame — Phlix Hub") so the
gallery metaphor never costs comprehension; the mobile menu closes on Esc and on outside click and
returns focus to the toggle.

- ⚠️ At 320px Palette's 48px figure overlaps a corner of the hero's **secondary** CTA. Tips are
  suppressed below 700px and the widget is dismissible with persistence, and it never covers the
  primary CTA — but it is a real overlap and the reviewer may want it hidden entirely on phones.
- ⚠️ The kit renames the nav, which is inherently a comprehension cost ("The Gallery" = clients).
  Mitigated by the hidden glosses and the footer's plain-labelled Product column, but it is the
  kit's choice, not a defect I can fix.

### 6. Accessibility — 92 ✅

Every text/background pair measured (table above) — nothing small below 4.5:1. Focus ring implements
`accessibility.focus_style` literally. Touch targets: buttons 48px min, nav rows 48px, toggle 48px.
Landmarks once each; skip link first and functional; `<details>` are native disclosure, no ARIA
needed; Palette is two labelled buttons plus a `role="status"` polite region; the typed-word egg is
disabled while focus is in a field and never calls `preventDefault` (§19.8). Reduced motion and
"Gallery quiet" both drop all animation. Survives 200% text zoom with no horizontal scroll.

- ⚠️ Not verified with `pa11y`/axe: Chrome will not launch in this sandbox without `--no-sandbox`,
  which `pa11y` does not pass. My checks are manual plus rendered geometry. **The orchestrator's
  `npm run a11y` is the real gate here** and I would not be surprised by a finding.
- ⚠️ The focal-work `h3` values are full sentences (the kit's `angle`). Correct per §2A, but long
  headings are a minor screen-reader-navigation cost.

### 7. Responsive — 92 ✅

Probed 320 and 1280 rendered, plus a 200%-root-font pass: no horizontal scroll in any case. All
layout containers are fluid grids with `minmax(0, 1fr)` tracks and ch/rem measures — no fixed-px
layout widths. Breakpoints at 600/620/640/700/800/860/900/1000/1100px follow content, not devices.

- ⚠️ I did not render 375/414/768/1024/1920 individually (§14 lists seven widths). The grids are
  all `auto`/`minmax` and the two extremes plus zoom are clean, so I expect them fine — but that is
  inference, not measurement, and I am flagging it rather than claiming it.

### 8. Performance — 93 ✅

Three CSS files (~40 KB authored, minified at build), one 13 KB deferred JS file, zero third-party
requests, zero web-font requests beyond the five self-hosted families with `font-display: swap`. All
artwork is CSS/inline SVG except `og.png` (74 KB, never fetched by the page itself). No layout
thrash: the only animation is opacity, plus one rotation on a 38px SVG. `width`/`height` on the logo
`<img>` so it reserves space (CLS).

- ⚠️ Lighthouse not run (no Chrome-with-CI in this sandbox). Budget compliance is inferred from
  asset weights, which is the part I can measure.

### 9. Content accuracy — 92 ✅

Every fact traces to `content.json`; every re-voiced line traces to `copy_overlay`,
`feature_casting.angle`, or is a plain-language restatement of a `content.json` body with the
verbatim original one disclosure away. Licence now matches `content.json` (MPL-2.0 / MIT) rather
than the stale BSD-3 line. `proof_strategy` prints no counts (§19.7) and quotes the FAQ verbatim.

- ⚠️ `download.html` shows `git clone … && cd … && composer install`. The repo URL is a fact from
  `content.json`; the two shell lines are the standard PHP bootstrap and **not** stated anywhere in
  `content.json`. I judged this the smallest honest install snippet §3.4 requires, and routed the
  visitor to the docs for the authoritative first run. If the reviewer disagrees, this is the line
  to cut. `download.html:~150`.
- ⚠️ Client "artist talk" sentences (`clients.html`) are authored prose built from each client's
  `tagline` + `highlights[]`. No new capability is claimed, but they are the longest authored
  passages on the site and deserve a fact-by-fact read.

### 10. CTA / funnel — 93 ✅

`conversion_funnel.style: guided-steps` is literal: three numbered rungs in the closing home
section, in the kit's order, with the declared labels and targets. Primary CTA above the fold at
1280 and 320, carbon black on linen (14.87:1, far past 3:1). Secondary de-emphasised as a cadmium
outline. No modal, no email gate, no autoplay. Download reachable in one click from anywhere.

### 11. Social metadata — 95 ✅

OG type/site_name/url/title/description/image and Twitter card/title/description/image/creator on
all 9 pages, all absolute, image a real 1200×630 PNG (check-meta rule 5 green). `theme-color` is the
kit primary. Favicon is SVG.

- ⚠️ The rubric also asks for a 16/32/180/192/512 favicon set plus `manifest.webmanifest`;
  `new_site.md` §11 asks only for the SVG favicon. I followed §11. Shared decision if the rubric is
  the stricter authority.

### 12. Localization — 88 ⚠️ (the one dimension below 90)

`<html lang="en">`; logical properties throughout (`margin-inline`, `padding-block`, `inset-inline`,
`border-inline`) so RTL stays possible; fonts subset to latin; no `toLocaleString`; no locale-unsafe
date or number formatting.

- ⚠️ **The reason for 88:** presentation copy that the kit authors — nav labels, CTA labels, section
  headings, tips, reward lines, the manifesto, station talks — is inline in HTML and in
  `js/main.js`, not centralized in one file a translator could swap. That is inherent to the current
  architecture (`content.json` holds facts; kits hold voice in JS objects the sites do not read at
  runtime), and every one of the 50 sites has it. **I did not "fix" it, because any real fix is a
  shared-architecture change and `shared/**` is read-only to me.** Flagging honestly rather than
  scoring myself 90 on a structural gap.

### 13. Experience fidelity — 94 ✅

All 21 declared fields implemented; the row-by-row mapping is `REGEN_PLAN.md` §1 and the
verification is in this file's evidence block. Both mandatory fallbacks ship (static hero with the
same copy; standard `<nav><ul><li><a>` topbar plus labelled hamburger). Opt-in JS is 13 KB total,
dependency-free, reduced-motion-safe, inside the ~15 KB budget, and the hero needs **zero** of it
(`js_budget_kb: 0`).

- ⚠️ `faq_experience.question_order` is byte-identical to `content.json`'s order, so "reordered" is
  a no-op on this kit. Stated in the manifest so nobody scores it as unimplemented.
- ⚠️ `seasonal_activation` is genuinely inert today (no range covers 2026-07-24). Verified by
  forcing `?season=autumn-study`; a reviewer should use that hook rather than concluding it is
  missing.

### 14. Manifest compliance — 95 ✅

Every `REGEN_PLAN.md` §1 row is implemented and independently checkable. Nothing was claimed and
skipped. Two rows were _refined_ after rendering (Palette tips suppressed below 700px; the utility
row's toggle moved to the inline start) — both are now described in `BUILD_LOG.md` §4 rather than
left as silent drift.

### 15. Anti-convergence — 97 ✅

Measured against three other kits' sites in the same tree:

|                                                 | abstract-canvas                                                                                      | afrofuturism                                   | swiss-modernist     | wabi-sabi           |
| ----------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ---------------------------------------------- | ------------------- | ------------------- |
| Nav items                                       | 6, all renamed                                                                                       | 8 generic                                      | 8 generic           | 8 generic           |
| Home sections                                   | 5 (`canvas-primed`, `the-brushstrokes`, `why-this-studio`, `who-has-painted-here`, `hang-your-work`) | 4 (hero, pitch, features-overview, cta-banner) | same 4              | same 4              |
| Page count                                      | **9**                                                                                                | 8                                              | 8                   | 8                   |
| Feature treatment                               | 2 focal + 4 studies + 2 marginalia, jargon disclosed                                                 | 7 identical cards                              | 7 identical cards   | 7 identical cards   |
| Clients                                         | 5 stacked gallery stations                                                                           | one card grid                                  | one card grid       | one card grid       |
| Funnel                                          | 3-rung CTA ladder                                                                                    | repeated single CTA                            | repeated single CTA | repeated single CTA |
| Proof / fork / toggle / eggs / mascot / seasons | all present                                                                                          | none                                           | none                | none                |

The difference is structural, not cosmetic. Drop the stylesheets entirely and the information
architecture still reads as a different product.

---

## What I would look at first if I were the independent reviewer

1. `download.html`'s install snippet — the only place I put non-`content.json` shell lines on screen.
2. `clients.html`'s five authored "artist talk" paragraphs — the longest authored prose on the site.
3. Cadmium-red frequency per view against `color_rules[3]` and `do_dont.colors.dont[2]`.
4. `header_motif` (animated brushstroke reveal) versus `hero_experience.mode: static` — I chose
   static; confirm that is the right precedence call.
5. Real `pa11y`/axe on all 9 pages, and Lighthouse — the two gates I could not run here.
6. Palette at 320px over the secondary CTA.
