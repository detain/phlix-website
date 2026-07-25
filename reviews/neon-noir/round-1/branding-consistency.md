# Branding Consistency Review — Neon Noir

**Variant**: neon-noir
**Round**: 1
**Reviewer**: adversarial reviewer (claude-opus-5)
**Date**: 2026-07-25

## Score

- **Branding Consistency**: 62 / 100

## ✅ Passed

- Every colour in `:root` is `design_tokens.color` verbatim, all 14 entries, with the kit's own pigment names in comments (`css/base.css:104-118`). Only two additions, both documented mixes of kit pigments.
- Type roles are correct and specific: Playfair 700/900 for headings, Bebas 400 for `.t-num` (always `text-transform: uppercase` — the kit's "no lowercase" rule is honoured everywhere), IBM Plex Serif for body, IBM Plex Sans for `.btn`/nav/labels, IBM Plex Mono confined to typewriter moments (`.t-typed`, `.t-serial`, `.clue__serial`, `.toolkit__name`, transcript `Q`/`LUX` markers) — not general UI, as `typography_rules[5]` demands.
- Headline tracking is `-0.02em` and `line-height: 1.05` throughout (`css/base.css:284-292`), matching `fonts.headline`.
- Shape language: `--radius-sm: 2px` on buttons/badges/chips, `4px` on cards, 1px solid borders, no rounded-bubbly anything. Sharp-cornered as specified.
- Signature elements are actually built, not just named: venetian-blind dividers (`.rule-venetian`, skewed `-1.1deg`), the `.page-header__blinds` slat overlay, a rain lattice (`.opener__rain`), a pushed-grain dot lattice on `body`, `.evidence__pin` pins, art-deco `.netmap` trunk-and-node geometry.
- All glow is `box-shadow` / `text-shadow` / `drop-shadow`; **no glow images and no SVG glow filters** — `do_dont.performance` honoured exactly. `-webkit-text-stroke` and `-webkit-background-clip` appear nowhere.
- Motion easing is the kit's: `cubic-bezier(0.4,0,0.2,1)`, `steps(8,end)` for the neon buzz, 460ms/620ms cuts. No spring, bounce or elastic anywhere.
- Layout follows the "don't" list: `max-width: 1400px`, deliberately asymmetric grids (7fr/5fr opener, 6fr/5fr brief, 8fr/4fr clearance, 5fr/6fr deadend), and `.netmap` is explicitly held off the right edge so the dark half stays structural.
- Voice matches `voice`/`tone`/`writing_style` closely and consistently across all nine pages — terse, declarative, wry, zero exclamation marks, zero `avoid_words`. "Your server never leaves the building. You do." is exactly the register the kit asks for.
- `@media (hover: hover)` gates all card hover lift/glow (`css/components.css:298-307`), honouring `responsive_behavior.mobile` "No hover states".
- The stylelint `rgba()` → `rgb()` rename introduced **no visual regression**: all 35 remaining `rgb()` calls use the four-argument legacy comma form, which CSS Color 4 defines as an exact alias of `rgba()`. Zero `rgba(` remain, so there is no mixed-syntax hazard, and the site's baseline already requires far newer features (`@media (width >= 900px)` range syntax, `clip-path`, `inset-block`). Confirmed clean.

## ⚠️ Concerns (non-blocking)

- **`css/theme.css:937`, `css/theme.css:336`, `css/components.css:864`** — three `infinite` animations (`sign-flicker`, `neon-buzz`, `lux-shift`) can run simultaneously on the home page. `do_dont.animation.dont` forbids this twice over: "Animate more than one element simultaneously" and "Run continuous looping animations without pause". Give them a finite iteration count or a long pause, and stagger them.
- **`index.html:124`** with **`css/theme.css:240-243`**, plus `css/theme.css:266` and `css/components.css:380` — four italic uses with **no italic face in the pool**. All render as browser-synthesised oblique; a synthetic slant of a high-contrast didone like Playfair is visibly poor, and this is the site's most prominent type. The amber colour already carries the emphasis; drop `font-style: italic` in the Playfair context or record the synthesis in `REGEN_PLAN.md`.
- **`index.html:184-195`** — the hero marquee, the one place `homepage_narrative.sections[0].treatment` calls for "a neon-lit marquee sign reading 'PHLIX'", is hardcoded `font-family="Georgia, serif"` and set as "Phlix", not "PHLIX". It reads as a visibly different serif from the wordmark beside it (see `reviews/neon-noir/shots/index-desktop.png`). Use `'Playfair Display', Georgia, serif` and uppercase it.
- **`css/components.css:309-316`** — every icon on the site is `--color-secondary` cyan. `icon_rules[2]` says "Single neon accent color for active/featured state; **ghost-white otherwise**" — no icon uses the default ghost-white state, so the featured/default distinction the kit specifies does not exist.
- **`css/base.css:19-97`** — ten hand-authored `@font-face` rules duplicate what the generated `vendor-fonts:begin/end` block (`:400-497`) already emits, giving 23 rules where 13 suffice. Runtime-harmless (identical `src`), but it is now a second source of truth that will drift from `tools/vendor-fonts.mjs`.
- **`css/theme.css:835-836`** — the comment claims "raw **Charcoal Slate** would have been 1.3:1"; the token being replaced is Dim Steel (`#2a3650`, 1.62:1 on void). Charcoal Slate is a surface, not a text colour.

## ❌ Failures (must fix this round)

- **`css/base.css:175-179`** with **`css/theme.css:209-217`** and **`css/theme.css:564-570`** — the hero and the closing band are dominated by a **warm golden wash**. `--grad-interrogation` is `radial-gradient(circle at 50% 0%, rgb(245,166,35,0.35), rgb(10,12,16,0) 70%)`, painted full-bleed by `.opener::before` at `opacity: 0.85` over a 78vh hero, and again by `.cta-banner::before` at full strength on six of nine pages. The result reads unmistakably as sunrise / golden hour (`reviews/neon-noir/shots/index-320x640.png` is the clearest instance; `index-desktop.png` shows both bands). The kit forbids this in four separate places: `color_rules[4]` "Never use warm golden or cream tones — they break the night atmosphere"; `do_dont.colors.dont[3]` "Add warm-golden gradients or sunrise tones"; `art_direction` "Avoid any warm, golden, or sunrise imagery. The world exists entirely at night."; `lighting.notes` "Never warm, golden, or diffuse." The gradient *is* kit-sanctioned — but as a "**Single overhead light effect behind hero subjects**", i.e. a tight practical over the subject, not a diffuse full-width field. **Required**: reduce the radius substantially, offset it over the alley/subject rather than `50% 0%` at 70% extent, and drop the intensity, so the page still reads as night at first glance.
- **`css/theme.css:55`**, **`css/components.css:131`**, **`css/components.css:337`**, **`css/components.css:443-445`**, **`css/components.css:564`**, **`css/components.css:923,939,1014`**, **`css/theme.css:241`**, **`index.html:130,546`** — amber is scattered across secondary and tertiary UI, and three neon accents appear in one view. Both are explicit, twice-stated kit prohibitions.
  - `color_rules[2]` "Neon amber is reserved for the single most important CTA per screen" and `do_dont.colors.dont[2]` "Use neon amber for secondary/tertiary UI elements": amber currently carries two nav links, the step numerals, quality badges, decoder terms, the hero `<em>`, Lux's cue and reaction text, the egg code, the lead-card top borders, and **two** `.btn-primary` instances on the home page.
  - `color_rules[1]` and `ui_generation_rules[1]` "At most two neon accent colours in one view" / "Maximum two neon accent colors per screen": the home page shows amber **and** cyan **and** magenta at once — magenta enters via `.clue` left borders (`css/components.css:391`), `.clue__serial` (`:403`), `.evidence__pin` (`:361`) and the asphalt reflection (`index.html:212`). Confirmed in `index-desktop.png`, where all three are visible in a single scroll position.
  **Required**: choose two accents for each view (the kit itself suggests cyan+amber or magenta+amber), demote the third to ghost-white or steel-mist, and return amber to the one dominant CTA per screen.

## Recommendations (ranked by impact)

1. Tighten `--grad-interrogation` into a real overhead practical and stop it reading as sunrise (impact: high, effort: low).
2. Pick two accents per view; move nav emphasis, numerals, badges and decoder terms off amber (impact: high, effort: medium).
3. Give the three infinite animations finite counts or pauses, and stagger them (impact: medium, effort: low).
4. Set the marquee in Playfair, uppercase, and drop synthetic Playfair italic (impact: medium, effort: trivial).
5. Introduce a ghost-white default icon state so `icon_rules[2]`'s featured/default distinction exists (impact: low, effort: low).
6. Delete the duplicated hand-authored `@font-face` block (impact: low, effort: trivial).

## Evidence

- `brand-kits/neon-noir.js` §6 `color_rules`, §12 `motion_style`/`easing`, §16 `ui_generation_rules`, §22 `do_dont.colors`/`.animation`/`.imagery`.
- `reviews/neon-noir/shots/index-desktop.png` — amber wash on `#opener` and `#closing-act`; amber + cyan + magenta simultaneously visible across `#case-brief` and `#lead-cases`.
- `reviews/neon-noir/shots/index-320x640.png` — hero background reads as golden-hour at mobile width.
- `grep -c "rgba(" css/*.css` → 0; `grep -c "rgb(" css/*.css` → 35, all legacy-comma-with-alpha (valid CSS Color 4 alias).
- `grep -rn "infinite" css/` → 3 hits. `grep -rn "font-style: italic\|<em" css/ *.html` → 4 hits, no italic `@font-face` declared.
