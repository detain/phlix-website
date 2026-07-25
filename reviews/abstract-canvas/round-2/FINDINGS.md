# abstract-canvas — round 2 findings

> Independent adversarial review; reviewer did not build the site. Its
> `FINDINGS.md` write was rejected by a guardrail, so the orchestrator persisted
> the report. Content is the reviewer's.

**Verdict: does not exit the loop. 2 ❌ / 17 ⚠️. Aggregate 85** (round 1: 79).

Both machines pass — `selfcheck` PASS, `render-check` PASS (9 pages × 4 viewports

- 200% zoom). Everything below is what they cannot see.

## Scores

| Dimension            | Weight | Score  | ❌  | ⚠️  |
| -------------------- | ------ | ------ | --- | --- |
| Accessibility        | 1.5    | **74** | 2   | 7   |
| Performance          | 1.2    | **89** | 0   | 2   |
| Responsive           | 1.2    | **85** | 1   | 4   |
| Branding Consistency | 1.2    | **91** | 0   | 1   |
| Experience Fidelity  | 1.2    | **78** | 1   | 6   |
| Usability            | 1.0    | **80** | 2   | 4   |
| Content Quality      | 1.0    | **89** | 0   | 5   |
| CTA / Funnel         | 1.0    | **93** | 0   | 0   |
| SEO                  | 1.0    | **92** | 0   | 0   |
| Social Metadata      | 0.8    | **87** | 0   | 1   |
| Localization         | 0.6    | **88** | 0   | 1   |
| **Aggregate**        | 11.7   | **85** | —   | —   |

Counts overlap across dimensions; distinct totals are **2 ❌ / 17 ⚠️**. Eight
dimensions below 90.

**All eight round-1 ❌ genuinely landed** — re-measured, not accepted on the
Fixer's word: #1 overflow, #2 zoom clipping, #3 CTA-overlap outcome, #4 logo link
(5 clicks reward, link navigates on click _and_ Enter), #5 summary 48px, #6 three
nav rungs, #7 all 3 motifs wired, #8 one-line install.

---

## ❌ Blockers

### ❌1. The §19.11 guard deletes the mascot instead of moving it — and on the home page at every phone width it deletes it at first paint, taking a declared easter-egg reward with it

`css/components.css:536-538` — `.palette-companion.is-stepped-aside { display: none }`.
`js/main.js:224-234` applies it whenever any control intersects the box.

| Where                                                                 | Result                                                                                                                       |
| --------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `index.html` @ 320×640, 320×720, 360×640, 375×667, 412×915, scrollY=0 | **`display:none` — absent on first paint**                                                                                   |
| `index.html` @ 768×1024, 1280×800, scrollY=0                          | shown                                                                                                                        |
| full scroll @ 320px                                                   | absent 3/20 (index), 4/13 (download), 3/10 (docs)                                                                            |
| `easter_eggs[0]` after 5 logo clicks @ 320 and @ 375                  | `.palette-bubble.textContent === ""`, companion hidden → **declared `reward_copy` never shown on a phone** (correct at 1280) |

The reward is swallowed because `js/main.js:228-231` makes _clearing the bubble
text_ the guard's first de-escalation step, then hides the companion anyway —
`say()` writes the line (`:176`) and immediately calls `guardPalette()` (`:177`),
which erases it.

`mascot.behavior.placement` is "on all pages except the FAQ page itself". §19.11
asks for non-overlap, **not non-existence**, and round-1 #3 explicitly offered
"offset it clear of the CTA band" as the alternative.

**Required:** the companion stays present and visible at every viewport — **move
it, don't remove it.** Either (a) `inset-inline-start` (bottom-left) at ≤700px,
(b) `translateY` above the intersecting control for as long as it is underneath,
or (c) reserve the corner with `padding-inline-end` on `.hero-actions` /
`.cta-rung`. **Never clear an `earned` line in the guard** — the `holdUntil`
mechanism at `js/main.js:174-175` already exists for this. Re-verify:
`easter_eggs[0]` at 320×640 must put the reward line on screen.

### ❌2. Hiding the companion while it holds focus destroys keyboard focus

`js/main.js:233`. Both `.palette-figure` and `.palette-dismiss` are in the tab
order. Measured at 320×640 on `index.html`: focus `.palette-dismiss` → scroll →
`is-stepped-aside=true` → `document.activeElement = BODY`. Focus is silently
discarded and Tab resets to the start of the document. **WCAG 2.2 SC 2.4.3.**

Reachable normally: Tab to Palette then `↓`/`PageDown` (a `<button>` does not
consume arrow keys), or resize — the guard is bound to both `scroll` and `resize`
(`js/main.js:307-308`). `SITE.md:206` claims "never a focus trap", which is true
and beside the point.

**Required:** bail out if `palette.contains(document.activeElement)`, or move
focus deliberately. Fixing ❌1 by repositioning also fixes this, but **both
`display:none` and `visibility:hidden` blur** — verify explicitly.

---

## ⚠️ Concerns (ranked)

**3. `REGEN_PLAN.md:44` (row 26) + `SITE.md:206-208` misdescribe the shipped guard in three specifics.** Row 26 says "at ≤700px … steps aside … for as long as any `.btn` is underneath". Shipped: **no width gate** (`TIP_MAX_WIDTH` at `js/main.js:193`/`:314` gates only the _tips_; the guard runs at 1280px too), the selector is `'a[href], button, input, select, textarea, [tabindex]'` (`js/main.js:194`) not `.btn`, and it is `display:none` not a step-aside. Correct both documents to what ships.

**4. `css/base.css:262-271` vs `css/theme.css:44`** — the `min(clamp(), Nvw)` cap went on the bare `h1`/`h2`/`h3` element selectors only; `.section-title` (`theme.css:44`), the class that paints every section `h2`, is uncapped and beats the element rule. At 320px with `html{font-size:32px}`: `h1` = 51.2px, `h2` = **52.0px** — **heading hierarchy inverted on 7 of 9 pages** (index/features/download/plugins/docs/hub/about). Cap `.section-title` and `.numeral` (`theme.css:27`, `:465`, `:597`) the same way, or drop the caps and use `max-inline-size`.

**5. `css/base.css:262-271`** — the `Nvw` caps mean no heading reaches 200% under text-only zoom: at 320px `h1` 36→51.2px (**142%**), `h2` 26→44.8 (172%), `h3` 20→38.4 (192%). Body copy scales fully (16→34px) so SC 1.4.4 is not breached for reading text, but the no-clipping clause is met by capping rather than reflowing. Prefer a `ch`-based `max-inline-size`.

**6. `img/og.svg:37`** — `stroke="#3A3128"` still ships, in neither `SITE.md`'s palette table (`:38-49`) nor its derived-pigment table (`:59-66`), and `og.png` is rasterised from it and referenced as `og:image` on all 9 pages. `SITE.md:78-80` asserts "**Every** hex … is now either a kit pigment or one of these six documented derivations" — false. (`REGEN_PLAN.md:255` claims only "**the logo's** `#3A3128`" is gone, which _is_ true — `logo.svg` is clean.) Replace with `--color-neutral-ink` `#5F594C`, re-run `gen-og.mjs --site abstract-canvas`, fix `SITE.md:78-80`.

**7. `css/theme.css:725-733`** — the three `.proof-links` anchors on `index.html` are **272×26** at 320px. `.proof-links` is `display:grid`, so they are blockified grid items and WCAG 2.5.8's inline exception does not apply; they miss §12's 44px and the kit's 48px-on-mobile. These were the **only** non-inline sub-44px targets on any of the 9 pages. Give `.proof-links a` `display:inline-flex; align-items:center; min-height:44px` (48px under 600px), exactly as `.shelf-item-name a` does at `theme.css:1071-1075`.

**8. `css/theme.css:665-676`** — `.proof-grid` has no base `grid-template-columns` and its ≥900px override is `1.2fr 1fr 1fr`, not `minmax(0,…)`. `SITE.md:201-203` claims "**every** single-column grid track is `minmax(0,1fr)`" — false. No overflow today, but that is the exact shape that produced round-1 #1. Fix both tracks and soften the claim.

**9. `js/main.js:262` + comment at `:259-261`** — move the companion to `<aside aria-label="Palette, the studio companion">` after `<main>`. `<main>` is spec'd as the _dominant, non-repeated_ content and this companion is on 7 of 9 pages, i.e. site furniture. Delete the obsolete `main[tabindex="-1"]` justification from the comment (that `render-check` false positive is fixed).

**10. `js/main.js:294-304`** — `easter_interactions[1]` (`hover-hold:2s`) is `mouseenter`/`mouseleave` only. Measured: hover 2.6s → reward; **focus 2.6s → nothing**. Keyboard and touch visitors (i.e. everyone at 320–412px where the companion lives) cannot reach 1 of 2 declared interactions. Add a `focus`/`focusout` timer of the same duration, plus a `pointerdown`-hold for touch.

**11. `js/main.js:276-290`** — a single activation of `.palette-figure` (`<button aria-label="Palette, the studio companion">`) has **no observable effect**: `className` and bubble text byte-identical before/after `click()`. An AT user gets a named button that does nothing on 4 of 5 presses. Give the first press a cheap acknowledgement.

**12. `js/main.js:245-246`** — dismissing Palette permanently kills **both `easter_eggs`**, not just the mascot. Measured after dismiss + reload: typing `palette` → nothing; 5 logo clicks → nothing, forever. `easter_eggs` is a top-level field distinct from `mascot.behavior.easter_interactions`. Render the reward in a non-mascot slot when Palette is at rest, or let an egg wake it. (See §19.21 — a persistent dismissal needs a way back.)

**13. `js/main.js:314`** — the `innerWidth <= TIP_MAX_WIDTH` tip gate is evaluated once during `buildPalette()`, so tips never activate for a visitor who loads narrow then widens, and keep firing for one who narrows. Re-evaluate on `resize` (§19.20).

**14. `js/main.js:205`** — `guardTargets = document.querySelectorAll(CONTROLS)` caches a static NodeList forever. `CONTROLS` includes `[tabindex]`, which matches `pre.code-block[tabindex="0"]` (`download.html:212-214`) — a full-width scroll region that is not a CTA, and the reason the companion vanishes 4/13 on `download.html`. Also `js/main.js:226-233` does remove-class → `getBoundingClientRect()` → add-class: a read-after-write forced reflow on every scroll rAF behind ~50 rect reads. No visible jank observed, but it is textbook layout thrash on the scroll path. Narrow to `a[href], button, input, select, textarea, summary`, re-query on resize, and read all rects before writing any class.

**15. `index.html:79-83`** (same block ×9) — the seasonal banner is a `<div>` at top level of `<body>` before `<header role="banner">`, outside every landmark on 9/9 pages. Round-1 #26's _timing_ half is properly fixed (authored markup, nothing injected post-paint — verified); the _placement_ half is not. Make it `<aside aria-label="Seasonal note">` or move it inside `<header>`.

**16. `js/main.js:245` + `about.html` / `404.html`** — `easter_eggs[1]` is inert where `data-palette="off"` suppresses the companion (measured: no reward on those two, works on the other 7). Reachable site-wide, so ⚠️ only.

**17. `download.html:207-211`** — the shipped HTML comment is a broken sentence ("…A `<pre>` so the shell's whitespace is semantic…" — verb missing), and an unescaped `<pre` inside a comment is fragile. Rewrite.

**18. Font cost, measured (WOFF2 actually requested):** `index.html` 218 KB/6 faces (round 1: ~312 KB — #22's Inter-500 removal is **real and verified**; `inter-500-latin.woff2` is requested nowhere), `features.html` 258/7, `about.html` 294/8, **`download.html` 334/9**. In budget, but `download.html`/`docs.html` pull both JetBrains Mono weights (`theme.css:1064-1068` `.shelf-item-name` is the only 500 consumer) and both Lora weights. One mono weight saves ~36 KB on two pages. Low priority — **not** a JS/CSS size finding.

**19. RTL:** 8 physical properties where logical would do — `theme.css:520`, `:579`, `:708`, `:1222` (`padding-left`), `components.css:212` (`margin-right`), `:516` (`right:`), `base.css:322` (`left:`), `theme.css:1284` (`right: 8%`). Zero `float:` rules. Minor, likely programme norm.

---

## Verified clean this round (so depth is legible)

200% text zoom 0/9 pages clipped · no horizontal overflow at 14 widths × 9 pages
(126 combos) · 0 clipped focus rings site-wide (the ring is literally
`accessibility.focus_style`) · `prefers-reduced-motion` → **0** animations and
**0** transitions, `scroll-behavior:auto`, all 13 reveals rendered · intensity
toggle works, persists, and kills the idle · print restores **13/13** reveals ·
no-JS nav 6/6 links at 52px with the toggle hidden, `nojs.css` on 9/9 · summaries
48px mobile / 44–60 desktop · facts verbatim vs `content.json` (7/7 bullets, 8/8
bodies, 5/5 clients, **17/17** highlights, 5/5 ecosystem + descriptions, 6/6 FAQ
Q&A, 12/12 footer labels; the two absent feature _titles_ are correctly replaced
by their `feature_casting` `angle`) · FAQ order + 3 mapped `extra_questions` as
paired `<dt>`s · licence MPL-2.0/MIT consistent ×9, no BSD-3 · vignettes honest
("Drawn, not photographed"), no fabricated counts or testimonials · 0
`avoid_words` in prose, 0 exclamation marks · 1 `h1` and **0 heading skips** per
page, breadcrumbs on both demoted pages, Esc closes the menu and returns focus ·
404 noindex + 3 recovery links + relative assets · 9 unique descriptions
(125–138), titles 15–40, 9/9 canonicals, sitemap 8 URLs + robots correct, JSON-LD
`WebPage`+`BreadcrumbList` ×8 + `SoftwareApplication` on index, `og.png` 1200×630
· 0 console errors / 0 failed requests.

**Anti-convergence strong:** `marble-atrium`, `cyber-tokyo` and `library-amber`
all still ship the default `hero→pitch→features-overview→cta-banner` skeleton with
an 8-item nav; this site is structurally, not cosmetically, different.

## Author's six verification questions — answered

1. **`minmax(0,1fr)` + `min(clamp(),Nvw)` caps — claim mostly holds, one hole.** No display-size regression: `h1`/`.hero-headline` measure 40 / 40 / 51.3 / 57.4 / 72 / 72 px at 320/375/768/900/1280/1400 — `16vw` is 51.2px at 320 and 224px at 1400, so the cap never engages at normal zoom, exactly as claimed. **But** see ⚠️4 (`.section-title` uncapped) and ⚠️8 (`.proof-grid` never got `minmax`).
2. **Nothing is clipped at 200% zoom — verified.** `.hero{overflow:hidden}` is retained and clips nothing. All 9 pages at `html{font-size:32px}`: `scrollWidth == 320` on 9/9 and **0** leaf elements clipped by any `overflow:hidden|clip` ancestor.
3. **The guard works but is the wrong solution — this is where the ❌s are.** Outcome achieved: 0 unguarded overlaps across 7 pages × 5 viewports × full scroll, no jank observed. But it deletes rather than moves; see ❌1/❌2.
4. **Mascot in `<main>` — half-right.** Better than the previous orphan `<body>` child, but the correct home is `<aside>` as a sibling of `<main>`; see ⚠️9.
5. **`#3F3A30` warranted, three levels genuinely distinguishable — clean.** L\* 11.2 / 24.6 / 37.6, ~13 ΔL\* per step, plus 700-vs-600 and a size step on `muted`. The new hex _was_ necessary: the only existing mid-tone token, Raw Umber `#8A8070`, is 3.32:1 on linen and fails AA, and Cormorant ships only 600/700 here so a weight rung is impossible. Documented at `SITE.md:65`.
6. **"One line" — true everywhere now.** `download.html:218` is one chained command; all 7 claims match (`download.html:9/31/43/186/201`, `clients.html:349`, `features.html:582`, `plugins.html:321`, `docs.html:318`, `about.html:355`).

## Single most serious remaining defect

The §19.11 fix solves the CTA overlap by setting `display: none` on the mascot
rather than moving it — deleting a declared kit field from the home page at every
phone width, silently swallowing the `logo-clicks:5` reward on mobile, and
destroying keyboard focus whenever the companion is hidden while focused.
