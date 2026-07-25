# cottagecore-bloom — round 1 findings

> Independent adversarial review; reviewer did not build the site. Its
> `FINDINGS.md` write was rejected by a guardrail, so the orchestrator persisted
> the report. The 11 per-dimension files in this directory are the reviewer's own.

**3 ❌ · 24 ⚠️. Loop cannot exit** — 3 blockers, and 8 of 11 dimensions below 90.

## Scores

| Dimension              | Weight | Score  |
| ---------------------- | ------ | ------ |
| Accessibility          | 1.5    | **78** |
| Usability              | 1.0    | **80** |
| Responsive             | 1.2    | **80** |
| Performance            | 1.2    | **93** |
| Branding Consistency   | 1.2    | **79** |
| Experience Fidelity    | 1.2    | **83** |
| Content Quality        | 1.0    | **84** |
| CTA / Funnel           | 1.0    | **86** |
| SEO                    | 1.0    | **85** |
| Social Metadata        | 0.8    | **88** |
| Localization           | 0.6    | **92** |
| **Weighted aggregate** |        | **84** |

---

## ❌ Blockers

### 1. The fixed Primrose companion steals clicks from a `visitor_paths` card at 720–899px

`css/components.css:1088-1101` (`@media (width >= 45rem)` on `.mascot`), markup
`index.html:954-969`.

At 768×1024 the "I host movie nights" `.path-card` spans (390,916)–(736,974) and
the `.mascot-dismiss` pill + `.mascot-bee` lie across its right side — **7 of 18
hit-test points inside the card return `button.mascot-dismiss`**; at 860px it is
the third card (5/18). `document.elementFromPoint(615, 959)` →
`button.mascot-dismiss`.

The mis-hit is **unrecoverable**: dismissal is written to `localStorage`
(`js/main.js:249-252`) with no "bring Primrose back" control. So a tablet visitor
trying to pick a path irreversibly dismisses a declared experience field on their
first visit.

`render-check` structurally could not see this — §19.11 and the tool gate the
_primary CTA_, and its viewports (320×640, 320×700, 375×667, desktop) include no
tablet width.

**Fix:** `@media (width >= 56.25rem)`, matching the nav's own breakpoint, then
re-hit-test at 768 and 860. Also add a restore affordance (§19.21).

### 2. `REGEN_PLAN.md:18` claims the `homepage_narrative.logline` is "printed as the hero deck"; it is nowhere on the site

`grep -i "own corner to cultivate\|Step through the garden gate"` across all ten
pages returns nothing. The hero (`index.html:434-449`) has only eyebrow → h1 →
script tagline → sub → fact.

**Fix:** render it between `:437` and `:438`, or strike the manifest claim (§19.23).

### 3. Heading hierarchy flattened on 6 of 10 pages — card titles are `<h2>`, peer to the `<h2>` section title that introduces them

Worst: `seasons.html:349` (`.section-title`) vs `:364, 389, 420, 451` (four `<h2>`
season names _inside that section_) then `:475` — the outline is `h1` + **ten flat
`h2`, no `h3` at all**. Same at `features.html:350` vs
`:363,381,398,412,426,440,454,468`; `download.html:350` vs `:355,376,458`; also
`clients.html`, `plugins.html`, `hub.html`, `about.html`.

The CSS proves subordinate intent — `components.css:911` (1.35rem) and `:713-715`
(1.35–1.85rem) are _smaller_ than `theme.css:65-67` (1.65–2.6rem).
`index.html` does it right with `<h3>`, so home and interior pages disagree.
`<article>` does not rescue this. See §19.16.

**Fix:** demote to `<h3>`, retarget `components.css:537,583,713,756,802,911` and
`theme.css:662`.

---

## ⚠️ Concerns

### Branding

**4.** Pure Garden Rose paints ~11 non-CTA elements while the CTA is a _different_
rose, inverting `color_rules` and `do_dont.colors.dont`:
`components.css:371,511,177,189,796,937,1153,1257`, `theme.css:451,512,49,58` vs
`.btn-primary` at `components.css:262`.

**5.** Three botanical accents in one view in the diorama, forbidden twice by the
kit: `index.html:353-355, 384-395, 410-421`; also `404.html:353-357`,
`seasons.html:400-409` (the mascot's crown is exempt).

**6.** The diorama is a bottom strip, not a frame: `theme.css:168-182`; hero
**81 % empty at 375px** (1109px tall vs 210px tallest plane), 60 % at 768, 37 % at
1280 — against "always abundant" ×4 in the kit.

**7.** `visitor_paths` cards fragment the art (`components.css:317` opaque fills;
`plane-bee` at `theme.css:207-211` lands on a card edge). Compounds ⚠️6.

### Content

**8.** `index.html:938-946` gives a two-command install that **does not work**: it
omits the `cd phlix-server` that `download.html:363-366` has. (§19.22 — this is
the conversion step.)

**9.** "four lines" (`seasons.html:499`, `docs.html:465`) vs "one line"
(`index.html:938`): three pages, three answers, each locally accurate.

**10.** `seasons.html:374,378,381,430,438,460,463,467` invent five colour names in
the same `#HEX Name` format as the three real ones (`:400,403,407`); `facts_from`
also only partly honoured (Harvest omits `--color-bg`, Midwinter omits
`--color-surface`).

**11.** `#trust-the-keeper` authored framing ~96 words vs `words_per_section_max:
80` (the only beat over). Trim `index.html:824-827` and `:903-906`; do **not**
drop facts.

### Experience fidelity

**12.** Declared `secondary_cta.label` is "Peek Inside"; the site ships "Peek
Inside the Garden" (`index.html:452`, `clients.html:482`, `plugins.html:471`),
undocumented in `REGEN_PLAN.md:21`.

**13.** `seasonal_activation.banner` paraphrased at `js/main.js:446` (lower-cased,
em-dash → comma).

**14.** `intensity_toggle.affects` includes `easter_eggs` but gating is
inconsistent: typed-word fully suppressed (`:355`), sigil still shows its toast
(`:317-328`), hover-hold still says "Keep tending." (`:233-236`).

### Interaction / JS

**15.** `js/main.js:272-280`: `showReward` never clears its `closeEggs` timer, so
clicks 1–4 destroy the 5th click's petal shower after ~1.1 s instead of the
declared "~3s". Use the `bubbleTimer` pattern from `:175-181`.

**16.** `js/main.js:63-69`: calm mode leaves `translate3d` from `:143` on all five
planes, and there is no `reduceMotion` `change` listener (§19.20).

**17.** `js/main.js:191-208`: the `.hero`-anchored tip fires as a pop-up **on
load**, contradicting its own comment at `:195-196` (verified `hidden === false`
at 768 and 1280).

### Typography / a11y detail

**18.** `base.css:222-224` `strong { font-weight: 500 }` is sub-perceptual (Lora
400→500 at 17px, no second channel; the Georgia fallback has no 500). **Do not
escalate to 700** — the kit caps Lora at `[400, 500]`, so 700 is an undeclared
weight. Add `color: var(--color-rose-ink)` instead. Scope: `<strong>` occurs
_once_ site-wide (`seasons.html:479`). See §19.17 and the "### Emphasis" block in
`node tools/kit-brief.mjs --site cottagecore-bloom`.

**19.** Nav `emphasis` tiers `primary`/`default` differ only by Nunito 600 vs 500
at 15px (`components.css:143` vs `:151-153`); only `muted` gets a second channel.

**20.** `components.css:882-888`: Dancing Script 700 at 1.4rem in
`--color-taupe-ink` (4.93:1) carries the three `extra_questions` at
`about.html:437,452,473` — passes AA, but a cursive x-height at 22.4px reads like
11–12px roman for text a reader must parse. Every _other_ script use is safe.

### Code quality

**21.** `base.css:141-144`: the comment opened on 141 does not close until 144, so
**`--tracking-body: 0em` on line 143 is never declared** (unreferenced, so no
visual symptom, but the kit's `fonts.body.tracking` is unrepresented and the
comment is garbled). See §19.18 — a second kit shipped the same defect in the same
region of `base.css`.

### SEO / performance

**22.** `404.html:15-19` has `robots noindex` _and_ a self-canonical.

**23.** `theme.css:230-236`: `.hero-inner { max-width: 62% }` only from `62rem`, so
620–992px leaves the hero's right half empty.

**24.** `theme.css:173`: `will-change: transform` unconditional on five planes,
including touch devices and reduced motion.

**25.** `base.css:28`: `scroll-behavior: smooth` slows the skip link.

### Programme-scope (rubric-named, not this author's regression)

**26.** No favicon set (16/32/180/192/512) and no `manifest.webmanifest`;
`ls sites/*/img/*.webmanifest` matches nothing repo-wide — needs a
`tools/gen-icons.mjs`. **Orchestrator item.**

**27.** Strings not centralised: **14 visible strings live only in `js/main.js`**
(`:60, 219, 221, 234, 308-312, 327, 357, 436, 446` + three motif `alt`s at
`:379,391,405`), and the three season date ranges are duplicated as English prose
at `seasons.html:365,421,452` vs integers at `js/main.js:373-414`.

---

## Author's six flagged questions — judged

1. **Contrast — the author is right and the kit is wrong.** All six ink tokens
   re-derived from scratch: each hex is byte-identical to
   `mix(pigment, #2A1A10, pct)`, and all 18 ratios (6 tokens × 3 surfaces) match
   the claims to ±0.01 and clear 4.5:1. Garden Rose on Warm Ivory is **4.02:1 in
   both directions** — the kit's 4.8:1 is wrong and its recommended primary-button
   pairing fails AA. The CTA now measures **6.10:1**, hover 7.60:1. Sage 2.88 and
   Taupe 2.41 confirmed and confined to decoration. Seasonal variants also
   override their ink tokens; worst case 4.63:1. **Nothing to fix here.**
2. **`strong: 500`** — a deliberate soft-brand choice that lands on the wrong side
   of usable, but the free-choice framing is off: the constraint is
   `fonts.body.weight: [400, 500]` for **Lora**, not Nunito, so 700 would be an
   undeclared body weight. Filed as ⚠️18 with a colour cue, not a heavier face.
3. **Dancing Script** — confined to display sizes everywhere (≥21.6px, bold) and
   never on a button or in body copy. One genuine weak spot: the three FAQ
   rephrase _questions_ at 22.4px in the lowest-contrast ink token (⚠️20).
4. **The three uncertainties** — (a) `home:#hero` → `.hero` is **correct**
   (`homepage_narrative` owns the ids; same element). (b) **Confirmed real** — the
   cards do fragment the illustration (⚠️7, compounding ⚠️6). (c)
   `sound_identity` and `responsive_behavior.tv` are **legitimately out of scope**
   — all five sounds need an event a marketing page does not have (1.4.2 hazard),
   and `responsive_behavior` is not in the declared-field list at all while
   `desktop`/`tablet`/`mobile` _are_ honoured. Not counted as unimplemented.
5. **`seasonal_activation`** — traced by hand: `at = 725` on 2026-07-25 matches
   none of 915–1031, ≥1201‖≤106, 315–515. **Inert today**, and the year-wrapping
   Midwinter branch is correct. No `?season=` override exists. All three motif SVGs
   on disk with real `alt`. (But see §19.19 — inert today still ships.)
6. **`intensity_toggle` + eggs** — all reachable; both `click:5` collisions
   correctly separated by target; sigil-as-`<button>` is the right call. §19.8
   fully satisfied (no `preventDefault`, disabled in `INPUT|TEXTAREA|SELECT` /
   `contenteditable` / `role=textbox`, exits on Esc). Two ⚠️: the truncating timer
   (⚠️15) and inconsistent calm gating (⚠️14).

**`seasons.html` under extra scrutiny** carried three of the findings (❌3 worst
case, ⚠️9, ⚠️10) plus the site's only `<strong>` and its only inline styles — the
extra attention was warranted.

## Most serious defect

Between 720px and ~899px the fixed Primrose companion's "Primrose, rest now"
dismiss button lies across a `visitor_paths` card and swallows 7 of 18 clicks
aimed at it, so a tablet visitor trying to pick a path irreversibly dismisses the
mascot instead — a defect `render-check` structurally could not see, because it
gates only the primary CTA and probes no tablet viewport.
