# Findings — Neon Noir, Round 1

**Variant**: neon-noir · **Round**: 1 · **Reviewer**: adversarial reviewer (claude-opus-5) · **Date**: 2026-07-25

Both machine tools pass (`selfcheck` PASS; `render-check` PASS, 9 pages x 4 viewports + 200% zoom), so everything below is something the tools cannot see.

**Totals: 8 ❌ · 17 ⚠️**

| Dimension | Score |
| --- | --- |
| Accessibility | 58 |
| Usability | 72 |
| Responsive | 93 |
| Performance | 88 |
| Localization | 82 |
| CTA / Funnel | 91 |
| Content Quality | 80 |
| Social Metadata | 84 |
| SEO | 86 |
| Branding Consistency | 62 |
| Experience Fidelity | 74 |

**Loop cannot exit**: 8 ❌ outstanding and six dimensions below 90.

---

## ❌ Blockers

### ❌1 — Unrevealed hero lead lines render at 2.07:1
**`css/theme.css:387-391`** (driver: `js/experience.js:92-102,110`)

`.vignette__lead[data-state='dim']` sets `color: var(--color-neutral)` (`#7a8fa6`) **and** `opacity: 0.45`. Composited over void black that is an effective `#3c4754` = **2.07:1**. The text is 17–22px at weight 700, so it needs 4.5:1 (3:1 even under the large-text allowance) and fails both. `paint()` is called unconditionally at load and is **not** gated by `quiet()`, so on every JS-enabled visit two of the three `tagline_secondary` lead lines are low-contrast visible text — including for `prefers-reduced-motion` users. Visible in `reviews/neon-noir/shots/index-desktop.png` and `index-320x640.png`.

**Required change**: unrevealed leads must be either >=4.5:1 or genuinely hidden. Either drop the `opacity` and keep `--color-neutral` at full strength (5.88:1 on void), letting the existing `text-shadow: var(--glow-text-cyan)` on `[data-state='lit']` carry the reveal; or set `hidden`/`aria-hidden` on unrevealed leads in `paint()`. Do not simply raise the opacity to a value still under 4.5:1.

### ❌2 — All three seasonal variants ship small-text AA failures
**`css/base.css:196-211`**

`seasonal_activation: live-js` overrides tokens that feed small text, and no variant was contrast-checked. Measured:

- **Blood Moon October** (`--color-primary: #e5154e`, `--color-surface: #170810`):
  - `.btn-primary` label — `color: var(--color-bg)` on `#e5154e`, 15px/600 → **4.24:1** ✗ (the site's single most important control)
  - `.nav-menu__link--primary` — `#e5154e` on `#170810`, 15px → **4.22:1** ✗
  - `.decoder__body dt` — `#e5154e` on `--color-surface-alt`, 12px → **3.40:1** ✗
  - `.badge--quality` 11px → **4.22:1** ✗; `.lux__react` 12px → **4.22:1** ✗
- **Midnight New Year** (`--color-secondary: #ff2d78`): every `a{}` (`css/base.css:274`) and `.decoder > summary` (13px) on `--color-surface-alt` → **4.41:1** ✗
- **Valentine's Neon** (`--color-primary: #ff2d78`): `.decoder__body dt` on `--color-surface-alt`, 12px → **4.41:1** ✗

`REGEN_PLAN.md` §5.9 correctly identified `#E5154E` on void as 4.24:1 and failing, then mitigated only the *tertiary* hue — the same failing hue is routed into `--color-primary` for the whole of October, unmitigated.

**Required change**: inside each `[data-season]` block, derive text-safe tokens from the kit's own pigments using the same technique as `--color-magenta-text`, and reroute every small-text consumer (`.btn-primary` label, `.nav-menu__link--primary`, `.decoder__body dt`, `.badge--quality`, `.lux__react`, `.lux__cue`, `a{}`, `.decoder > summary`) onto them so all three windows clear 4.5:1. Add the measured table to `REGEN_PLAN.md` §6.

### ❌3 — `.btn-ghost` border is 2.89:1 against the surface it actually sits on
**`css/components.css:245-249`** (instance: **`download.html:137-144`**)

`--color-edge-strong` `#5a6b84` measures 3.61:1 on void and 3.27:1 on navy — but only **2.89:1** on `--color-surface-alt` `#1c2333`, below the WCAG 1.4.11 3:1 floor for a UI-component boundary. The `.copy-token` ghost button lives inside `.code-block__bar`, whose background *is* `--color-surface-alt` (`css/components.css:503`); with a transparent fill that border is the control's only boundary. `REGEN_PLAN.md` §6 tabulates only void and navy, never the third surface.

**Required change**: give `.btn-ghost` a slate-safe border (`--color-neutral` `#7a8fa6` = 4.72:1 on slate) or move `.copy-token` off a surface-alt background. Extend the §6 derivation table to all three surfaces so this gap cannot recur.

### ❌4 — No-JS navigation does not render below 900px; the `data-js` hook was built and never wired
**`css/components.css:85-94`** + **`js/main.js:19`**

`navigation_model.fallback` is a declared field and states: "A standard accessible `<nav>` … fully keyboard reachable via Tab, collapsing to a labeled hamburger menu on mobile. **The fallback nav is always rendered and always functional.**" In fact `.nav-menu { display: none }` below 900px and only `.is-open` (added by JS) reveals it, so with JS disabled at any width under 900px the primary navigation is **entirely unreachable**, and `.nav-toggle` renders as a dead button. `js/main.js:19` sets `root.setAttribute('data-js','on')` for exactly this purpose, but `grep -rn "data-js" css/ *.html` returns **zero** matches.

**Required change**: default `.nav-menu` to `display: flex` (column) below 900px; hide it only under `html[data-js='on'] .nav-menu:not(.is-open)`; render `.nav-toggle` only under `html[data-js='on']`. Verify by loading `index.html` at 375px with JavaScript disabled.

### ❌5 — Lux is missing from the 404 art, contrary to the declared concept
**`404.html:129-157`**

`error_page_experience.concept` makes Lux the subject: "**Lux stands under a burnt-out neon sign** (the X flickers and dies), **holding a file marked 'FILE NOT FOUND'**." The shipped `.deadend__art` has alley walls, the sign box, the dead X with one amber stroke still lit, and a filing cabinet — but no Lux figure: no trench coat, no fedora, no amber eyes. `REGEN_PLAN.md` §1's `error_page_experience` row silently drops Lux from its own restatement of the concept.

**Required change**: add the Lux silhouette to the `.deadend__art` SVG, under the burnt-out sign, holding the FILE NOT FOUND docket. The figure geometry already exists at `index.html:570-586` and can be reused.

### ❌6 — The hero and closing bands read as golden hour, which the kit forbids four times over
**`css/base.css:175-179`** + **`css/theme.css:209-217`** + **`css/theme.css:564-570`**

`--grad-interrogation` is `radial-gradient(circle at 50% 0%, rgb(245,166,35,0.35), rgb(10,12,16,0) 70%)`, painted full-bleed by `.opener::before` at `opacity: 0.85` over a 78vh hero, and again by `.cta-banner::before` at full strength on six of nine pages. The result is unmistakably a warm sunrise wash (clearest in `reviews/neon-noir/shots/index-320x640.png`; both bands in `index-desktop.png`). The kit prohibits this in four places: `color_rules[4]` "Never use warm golden or cream tones — they break the night atmosphere"; `do_dont.colors.dont[3]` "Add warm-golden gradients or sunrise tones"; `art_direction` "Avoid any warm, golden, or sunrise imagery. The world exists entirely at night."; `lighting.notes` "Never warm, golden, or diffuse." The gradient itself is kit-sanctioned, but only as a "**Single overhead light effect behind hero subjects**" — a tight practical, not a diffuse field.

**Required change**: make it read as one overhead practical. Reduce the extent substantially (e.g. `circle at 72% 18%` with a ~28–35% stop rather than `50% 0%` at 70%), position it over the alley/subject rather than centred across the band, and lower the effective alpha so the page reads as night at first glance. Apply the same treatment to `.cta-banner::before`, which currently has no opacity damping at all.

### ❌7 — Amber on secondary/tertiary UI, and three neon accents in one view
**`css/theme.css:55`**, **`css/theme.css:241`**, **`css/components.css:131`**, **`css/components.css:337`**, **`css/components.css:443-445`**, **`css/components.css:564`**, **`css/components.css:923,939,1014`**, **`index.html:130,546`** — plus the magenta sources **`css/components.css:361,391,403`** and **`index.html:212`**

Two explicit, twice-stated kit rules are broken:

- `color_rules[2]` "Neon amber is reserved for the single most important CTA per screen" and `do_dont.colors.dont[2]` "Use neon amber for secondary/tertiary UI elements" — amber currently carries two nav links (`.nav-menu__link--primary`), the step numerals (`.t-num`), quality badges (`.badge--quality`), decoder terms (`.decoder__body dt`), the hero `<em>`, Lux's cue and reaction text, the egg code, the lead-card top borders, **and** two `.btn-primary` instances on the home page.
- `color_rules[1]` / `ui_generation_rules[1]` "At most two neon accent colours in one view" / "Maximum two neon accent colors per screen" — the home page shows amber **and** cyan **and** magenta simultaneously; magenta enters via `.clue` left borders, `.clue__serial`, `.evidence__pin` and the asphalt reflection. Confirmed in `index-desktop.png`.

**Required change**: choose two accents per view (the kit suggests cyan+amber or magenta+amber) and demote the third to ghost-white or steel-mist. Return amber to the single dominant CTA per screen — move `.nav-menu__link--primary`, `.t-num`, `.badge--quality`, `.decoder__body dt`, `.lux__cue`/`.lux__react` and the lead-card top border onto cyan or steel-mist, and make one of the two home-page `.btn-primary` buttons `.btn-secondary`.

### ❌8 — The case-file quote cites a source that does not exist, and the promised docs link is absent
**`index.html:502-507`**

The `#trust-play` quote is attributed to `<cite>The Phlix project brief</cite>`. No source by that name exists — the line is `pitch_bullets[0]` from `shared/content.json` — and the citation carries no link, so the quote is untraceable. `proof_strategy.signals[2]` asks for "One **true short line pulled directly from the docs** about self-hosting", and `REGEN_PLAN.md` §5.3 claims the substitute ships "with a link out to the real docs" — but `.record-links` in that band are three GitHub links (source, stargazers, issues) and there is **no docs link in `#trust-play` at all**. Quote text honest; attribution invented; plan row not done.

**Required change**: either attribute the line to what it is with a working link (e.g. `<cite><a href="https://detain.github.io/phlix-docs">Phlix project pitch — the docs</a></cite>`) or replace it with a real line from the docs, and add the docs link the plan promises to `.record-links`.

---

## ⚠️ Concerns

### ⚠1 — Derived token diverges from the brief's verbatim substitute
**`css/base.css:121`** — `--color-magenta-text: #fa5391` replaces the `kit-brief`-prescribed `#ff357d` (slate) / `#e7285c` (void), which the brief says to "use verbatim so all 50 sites derive the same token". The author's mix is measurably safer (5.02 vs 4.53 on slate), the arithmetic is exactly right, and it is disclosed in `REGEN_PLAN.md` §6 — so this is a good deviation taken unilaterally. **Change**: escalate to the orchestrator for a programme-wide ruling; either adopt the brief value or get the brief amended. Do not silently diverge.

### ⚠2 — `strong { font-weight: 500 }` is imperceptible emphasis
**`css/base.css:294-297`** — `color: var(--color-text)` is identical to body colour so it contributes nothing, leaving emphasis on a single 100-unit weight step in IBM Plex Serif at 16px. `ibm-plex-serif-700` is now in the pool and declared (`css/base.css:476-482`), so 600/700 is legal; the kit's `fonts.body.weight:[400,500]` predates that addition and `typography_rules` says nothing about `strong`. No note explains the choice. **Change**: set `font-weight: 700` and delete the redundant `color`. If 500 is genuinely wanted for noir restraint, add a CSS comment saying so and pair it with a second cue.

### ⚠3 — Both easter eggs are silently disabled under `prefers-reduced-motion`
**`js/experience.js:246,274`** with **`js/experience.js:70-75`** — `quiet()` conflates the OS motion preference with calm mode. `intensity_toggle.affects` legitimately includes `easter_eggs`, but an OS preference is not that toggle, `kit-brief` requires both eggs be reachable, and `accessibility.motion_reduction` asks to *replace* motion, not delete features. **Change**: split `quiet()` into `calm()` and `noMotion()`. Gate the *animations* on `noMotion()` and the *feature* on `calm()`, so reduced-motion users still get the `.egg-note` reward copy and a static end-state.

### ⚠4 — Double-clicking the logo swallows navigation, with no compensating egg
**`js/experience.js:245`** — `if (e.detail >= 2) e.preventDefault()` runs unconditionally, including when `quiet()` is true, so reduced-motion and calm-mode users lose the wordmark link for nothing. **Change**: move the `preventDefault` inside the `!quiet()` branch; better, count clicks on `pointerdown` and never suppress the link.

### ⚠5 — `click:3` Lux reaction is mouse-only and undiscoverable
**`js/experience.js:192-198`** — bound to `.lux__figure`, a `<div>` with no role, no `tabindex`, no key handler and no `cursor: pointer`. **Change**: make the figure a `<button>` with an accessible name (the SVG is already `aria-hidden`), or move the reaction onto the existing `.lux__tip > summary`.

### ⚠6 — Interactive handlers on `aria-hidden` content
**`js/experience.js:116-123`** with **`index.html:153`** — `.opener__art` carries `click` and `pointerenter` handlers while being `aria-hidden="true"`, with no `cursor: pointer`. `.vignette__advance` duplicates the action so no information is lost, but the polarity is wrong, and `pointerenter` advances the vignette when a mouse merely crosses the art. **Change**: make `.vignette__advance` the primary control; keep the art decorative and drop the hover-advance (or require a deliberate `pointerdown`).

### ⚠7 — `.will-cut` dims steel-mist text below 3:1 while armed
**`css/theme.css:876-879`** — `opacity: 0.6` dims a whole subtree, so `--color-neutral` text inside an armed group (`.t-serial` in `.caseboard`, `.case-quote cite` in `.trust__grid`) sits at **2.81:1** until observed. **Change**: use `transform: translateY(14px)` alone for the armed state, or raise armed opacity to >=0.8 (neutral → ~3.9:1).

### ⚠8 — Three simultaneous infinite animations, against an explicit "don't"
**`css/theme.css:937`** (`sign-flicker`), **`css/theme.css:336`** (`neon-buzz`), **`css/components.css:864`** (`lux-shift`) — `do_dont.animation.dont` forbids both "Animate more than one element simultaneously" and "Run continuous looping animations without pause". `sign-flicker` animates `text-shadow`, which repaints rather than composites, forever, on the `<h1>`. **Change**: give each a finite `animation-iteration-count` or a long idle pause, and stagger the delays so at most one runs at a time.

### ⚠9 — Four italic uses with no italic face in the pool
**`index.html:124`** + **`css/theme.css:240-243`**, **`css/theme.css:266`**, **`css/components.css:380`**, **`index.html:190`** — all render as browser-synthesised oblique. A synthetic slant of a high-contrast didone like Playfair is visibly poor, and this is the site's most prominent type; the amber already carries the emphasis. **Change**: drop `font-style: italic` from the Playfair contexts (`.opener h1 em`), or record the synthesis explicitly in `REGEN_PLAN.md` as an accepted tradeoff.

### ⚠10 — Hero marquee is set in a non-brand font and not uppercase
**`index.html:184-195`** — the one place `homepage_narrative.sections[0].treatment` calls for "a neon-lit marquee sign reading 'PHLIX'" is hardcoded `font-family="Georgia, serif"` and set as "Phlix". It reads as a different serif from the wordmark beside it (`index-desktop.png`). **Change**: `font-family="'Playfair Display', Georgia, serif"` and set the text to `PHLIX`.

### ⚠11 — Ten redundant `@font-face` rules
**`css/base.css:19-97`** — duplicates what the generated `vendor-fonts:begin/end` block (`:400-497`) already emits: 23 rules where 13 suffice. Runtime-harmless (identical `src`) but a second source of truth that will drift from `tools/vendor-fonts.mjs`. **Change**: delete lines 19-97 and let the generated block own `@font-face`.

### ⚠12 — Lux nested inside `<main>`
**`index.html:568`**, **`features.html:488`**, **`download.html:324`**, **`about.html:273`** — Lux is a page-level companion, fixed-position at >=768px, unrelated to the surrounding section; a document-level `<aside>` belongs as a sibling of `<main>`, which is exactly where the equally-floating `.egg-note` already sits (`index.html:602`). The nesting puts the companion inside the `#main-content` skip target, and on a page whose tip is keyed to `#opener` a linear reader meets "Ask Lux" only after the closing CTA. Judged purely on structure with the `main[tabindex="-1"]` render-check false positive now fixed, there is no remaining justification. **Change**: move `.lux` out to a sibling of `<main>`, immediately before `.egg-note`, on all four pages.

### ⚠13 — Card titles flatten the heading outline on two pages
**`features.html:147,190,229,271,311,351,395,435`** and **`clients.html:150,186,222,258,294`** — card titles are `<h2>`, siblings of their own section's `<h2>`. `download.html:179,194,209,224,239` correctly uses `<h3>`. No level is skipped so no automated check fires, but the outline loses the parent/child relationship and the site contradicts itself. **Change**: demote to `<h3>`.

### ⚠14 — False escalation to the orchestrator
**`sites/neon-noir/REGEN_PLAN.md:163-165`** — reports that `shared/content.json meta.og_image` is `/img/og.svg`, "an SVG and an absolute path". The actual value is `img/og.png` — relative, PNG — with an `og_image_note` spelling out the exact contract the site already follows. Acting on this note would waste effort on a non-problem. **Change**: correct or delete the note.

### ⚠15 — Comment drift in five places
**`index.html:567`**, **`features.html:487`**, **`download.html:323`**, **`about.html:272`** all say "Lux, keyed to **#opener** on this page" while `data-tip-for` is `opener`/`evidence`/`server`/`faq` — three of four are wrong. Separately, **`css/theme.css:835-836`** says "raw **Charcoal Slate** would have been 1.3:1" where the token being replaced is Dim Steel (`#2a3650`, 1.62:1 on void); Charcoal Slate is a surface, not a text colour. **Change**: correct all five comments.

### ⚠16 — No icon ever uses the kit's default ghost-white state
**`css/components.css:309-316`** — every `.card__icon`, `.feature-card__icon` and `.feature-detail__icon` is `--color-secondary` cyan. `icon_rules[2]` specifies "Single neon accent color for active/featured state; **ghost-white otherwise**", so the featured/default distinction the kit defines does not exist anywhere on the site. **Change**: default icons to `--color-text` and reserve cyan for featured/hero icons (e.g. the two `.evidence-card--lead` cards).

### ⚠17 — Favicon set and social declarations incomplete
**`index.html:43`** (all nine pages) — only `<link rel="icon" type="image/svg+xml">`; no 16/32/180 `apple-touch-icon`, no 192/512, no `manifest.webmanifest`, and no `og:image:width`/`height`/`alt`. `og.png` itself is correct (1200x630, 85 KB). Also, all nine pages share one byte-identical `description`/`og:description`/`twitter:description`. This looks like a shared-template baseline rather than a neon-noir regression. **Change**: needs an orchestrator ruling on scope; if in scope, generate the raster favicon set + manifest and give each page a description from its existing `.t-lead`.

---

## What came back clean (so this can be told from a shallow review)

- Every contrast number in `REGEN_PLAN.md` §5.9 and §6 was recomputed independently and **all are correct**: 16.65, 9.66, 11.53, 4.41, 4.24, and both derived mixes reproduce to the byte (`#FA5391`, `#5A6B84`) with the quoted 6.25/5.67/5.02 and 3.61/3.27. The author caught both AA failures the kit's own prose hides.
- `-webkit-text-stroke` and `-webkit-background-clip: text` appear **nowhere** in `css/`, `js/` or any HTML — the claim is true, and every glow is `text-shadow`/`box-shadow`/`drop-shadow`.
- The stylelint `rgba()` → `rgb()` `--fix` caused **no visual regression**: 0 `rgba(` remain, all 35 `rgb()` calls use the four-argument legacy comma form that CSS Color 4 defines as an exact `rgba()` alias, and the site's baseline already requires much newer features (`@media (width >= 900px)` range syntax, `clip-path`, `inset-block`). The `custom-property-empty-line-before` fix and the two `catch {}` optional catch bindings are likewise inert.
- **§12 colour-alone: clean on all four surfaces checked.** Status badges always spell the word ("Stable"/"Beta"); the calm toggle carries `aria-pressed` plus a spelled-out state string, not just knob position; active nav carries `aria-current` plus a 3px amber marker plus an appended " · you are here"; the `.netmap` node metaphor has no unlit state so no colour-only signal exists.
- **Motion gating: clean.** Every `@keyframes` consumer sits inside `@media (prefers-reduced-motion: no-preference)`, plus a global `*` duration clamp and `scroll-behavior` revert. Nothing animates under the OS preference or calm mode. The `scroll_experience` fallback is genuinely safe: nothing is hidden by CSS alone, so a JS/CSS failure cannot hide content.
- **§19.11 mascot placement: verified correct.** `.lux` is `fixed` only inside `@media (width >= 768px)`; below that the same single element renders in flow above the footer, no content duplicated, and it cannot cover the CTA at 320px.
- **`mascot.behavior` fidelity is exact**: Lux on Home/Features/Download/About and absent from Clients and Hub, all four tips keyed to real existing section ids with the kit's verbatim `say` strings, both `easter_interactions` implemented, dismissal using the kit's own "Lux, take five" label with `localStorage` persistence and a recall button.
- **§19.8 key-sequence egg: fully compliant** — inert in inputs/textareas/selects/contenteditable, never calls `preventDefault`, exits on Esc, ignores modified keys.
- **Anti-convergence: strong pass.** Structurally distinct from `abstract-canvas` on nav vocabulary and order, home section count and ids, CTA ladder, page templates and the mascot layer. Not a recoloured template.
- **Content honesty is otherwise solid**: no fabricated star count (correctly shipped as links), no invented testimonials, the "5 native clients" field-vs-`content.json` conflict resolved in `content.json`'s favour and stated honestly, Mobile always labelled beta, MPL-2.0/MIT correct in all five places it appears, and every CTA label honestly describes its destination.
- `render-check` PASS at 200% text zoom on all nine pages, with a correctly diagnosed `overflow-wrap: anywhere` fix and `minmax(0, …)` on every grid track.
- `og.png` is exactly 1200x630 and referenced as an absolute PNG URL, satisfying `check-meta` rule 5.
- `faq_experience.question_order` matches `content.json` order exactly and all three `extra_questions` render as additional `<dt>` sharing the correct canonical `<dd>`.
- `complexity_profile.jargon_policy: translate` is implemented as real `<details class="decoder">` affordances on all eight Features entries — the strongest single piece of work on the site.
