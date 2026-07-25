# SITE.md — Swiss Modernist

## Concept & vision

Phlix in the Swiss International Typographic Style. The premise of the regenerated site is
that the grid is not scaffolding for the design — **the grid is the design**. It is drawn,
not implied: 1px column guides run behind the hero, the feature grid, the proof band and the
404; every section opens on a 2px Ink Black rule; every section and every navigation
destination carries a two-digit index; and content arrives as specifications (spec rows,
spec tables, a repo list, a manual page) rather than as marketing prose.

White space is structure, not emptiness. Typography carries the entire visual weight: Inter
Black at the largest size the column permits, left-aligned body copy, tight negative
tracking. Basel Red is a surgical instrument — the headline anchor, the primary action, one
proof bar, the 404 guide line. Nothing else is coloured.

Declared archetype: `experience_archetype: "grid"`.

---

## Aesthetic direction

Emil Ruder's _Typographie_ (1967) and Josef Müller-Brockmann's grid-system posters are the
canonical references, with Massimo Vignelli's NYC subway signage behind the numbered
navigation and Otl Aicher's 1972 Munich system behind the section indices. Neue Grafik
(1958–1965) is the tonal target: austere, rational, unsentimental. No decorative element
exists on any page. There is no illustration beyond typographic composition, no photography
of people, and — by the kit's principled decision — **no mascot**.

---

## Colour

| Role        | Name         | Hex       | Usage on this site                                           |
| ----------- | ------------ | --------- | ------------------------------------------------------------ |
| text        | Ink Black    | `#121212` | All body and headline type; inverted module fill             |
| secondary   | Type Black   | `#1A1A1A` | Rules, borders, secondary button fill, mono captions         |
| primary     | Basel Red    | `#E8001C` | 4px headline rule, focus ring, proof bar, 404 guide line     |
| tertiary    | Rule Gray    | `#888888` | Section indices (large display type only) and dividers       |
| neutral     | Grid Gray    | `#AAAAAA` | Hairline row rules — never text                              |
| background  | Grid White   | `#F8F8F4` | Every page background                                        |
| surface     | Column White | `#EFEFEB` | Client/download cards, code blocks, footer                   |
| surface_alt | Module Gray  | `#E5E5E0` | Feature modules, drawn column guides, quote box, FAQ aliases |
| success     | System Green | `#006B3C` | Declared; not used on this static site                       |
| warning     | Signal Amber | `#B35C00` | Declared; not used                                           |
| error       | Error Red    | `#C8001A` | Declared; reserved for destructive actions, not used         |
| info        | System Blue  | `#00408A` | Declared; not used (links are Ink Black + underline)         |
| focus       | Focus Red    | `#E8001C` | 2px ring, 2px offset, no animation                           |

### Derived tokens (mixes of the kit's own pigments, not new hues)

`accessibility.minimum_contrast` claims Basel Red on Grid White is 4.6:1. **Measured, it is
4.43:1** — failing AA for small text. Per `new_site.md` §19.1 the fix is a deeper mix of the
kit's own pigment, not a new colour:

| Token                   | Value     | Derivation                                          | On Grid White |
| ----------------------- | --------- | --------------------------------------------------- | ------------- |
| `--color-primary-deep`  | `#CC0018` | the kit's own `microinteractions.button_press` red  | **5.51:1**    |
| `--color-primary-press` | `#B40015` | `#CC0018` darkened ~12% further, per the same field | **6.68:1**    |
| `--color-gray-deep`     | `#5E5E5E` | Rule Gray mixed toward Ink Black                    | **6.09:1**    |

Pure Basel Red is kept wherever only 3:1 is required — rules, the focus ring, the proof bar
and the 404 guide line.

### Measured ratios for every pair actually shipped

| Pair                                            | Ratio | Gate                 |
| ----------------------------------------------- | ----- | -------------------- |
| Ink Black on Grid White (body)                  | 17.60 | AA/AAA body          |
| Ink Black on Column White (cards)               | 16.25 | AA/AAA body          |
| Ink Black on Module Gray (modules)              | 14.82 | AA/AAA body          |
| Grid White on Ink Black (inverted hero modules) | 17.60 | AA/AAA body          |
| Module Gray label on Ink Black                  | 14.82 | AA body              |
| Grid White on `--color-primary-deep` (CTA)      | 5.51  | AA body              |
| Grid White on `--color-primary-press` (hover)   | 6.68  | AA body              |
| Grid White on Type Black (secondary button)     | 16.35 | AA body              |
| `--color-gray-deep` on Grid White               | 6.09  | AA body              |
| `--color-gray-deep` on Column White             | 5.63  | AA body              |
| `--color-gray-deep` on Module Gray              | 5.13  | AA body              |
| Rule Gray on Grid White (section indices)       | 3.33  | AA large / graphical |
| Basel Red on Grid White (rules only)            | 4.43  | AA large / graphical |
| Grid Gray on Grid White                         | 2.18  | non-text rules only  |

### Where the red goes

`design_principles` says Basel Red is applied "once per view"; `page_generation_rules` asks
for both a red headline rule **and** a red primary CTA. The site resolves this as **one red
mark per band**, with the hero carrying two — the 4px anchor rule and the primary action,
both belonging to the single most important element on the page. Red never appears on hover
states, ordinary borders, or decoration.

---

## Typography

| Role     | Family           | Weight  | Where                                                                            |
| -------- | ---------------- | ------- | -------------------------------------------------------------------------------- |
| headline | Inter            | 900     | `h1`, band headings, footer tagline, CTA headings                                |
| headline | Inter            | 800     | `h3` card/module titles, feature titles, repo names                              |
| display  | Barlow Condensed | 900     | Section indices (`01`–`08`, `404`) and proof numerals                            |
| body     | Inter            | 400     | All body copy, leads, feature bodies, FAQ answers                                |
| ui       | Inter            | 500/600 | Nav labels, buttons, uppercase category labels                                   |
| mono     | JetBrains Mono   | 400/500 | Nav indices, spec-row indices, readouts, man-page labels, code, footer copyright |

Self-hosted WOFF2 only, from the shared pool (`../../assets/fonts/…`), `font-display: swap`.
Nine faces: Inter 400/500/600/800/900, Barlow Condensed 800/900, JetBrains Mono 400/500.
The pool has no Inter 700, so `strong`/`b` resolve to the 600 face.

Rules enforced: no headline below weight 800; body always left-aligned (never justified);
uppercase only for category labels and the nav; line-height 1.6 for body.

**Scale.** The strict 12 / 14 / 16 / 18 / 24 / 32 / 48 / 64 / 96 px scale is expressed in
`rem`, so body and UI type honours the reader's own font size. Display roles are written
`min(<scale step>, <vw>)`: the scale holds exactly at desktop, while 320px and 200% text
zoom clamp against the viewport instead of overflowing it.

---

## Spatial system

8px base unit; only the steps 4, 8, 12, 16, 24, 32, 48, 64, 96, 128 are used. 12 columns and
24px gutters at ≥1024px, 8 at ≥768px, 4 below — the kit's `responsive_behavior` expressed as
column counts. Max measure 1400px. Corners are right angles: `--radius-sm/md` are `0`.

Structural rules: 1px for card borders and row hairlines, 2px for section-opening rules and
the 404 guide, 4px for the headline anchor and the closing CTA rule.

---

## Motion philosophy

Mechanical, instantaneous, snap. The only transition on the site is `background-color 80ms
linear` on buttons. Card hover draws a 2px Basel Red inset line — an inset shadow, so
nothing reflows and nothing lifts. The sticky topbar has no transition: it snaps. There are
no scroll reveals and no smooth-scroll hijack (`scroll_experience.mode: "continuous"`).

Under `prefers-reduced-motion: reduce` the one animation on the site — the easter-egg sweep
— is drawn rather than swept, and the global duration reset applies.

---

## Interaction surfaces

| Surface             | Declared                    | Built                                                                                                                                                                                                                                                                                                                   |
| ------------------- | --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `hero_experience`   | `static`, `js_budget_kb: 0` | Fully static markup; no script touches the hero. Fallback is the active mode.                                                                                                                                                                                                                                           |
| `navigation_model`  | `topbar`                    | Sticky Grid White topbar, 2px bottom rule, numbered index, emphasis ladder. Fallback: a plain `<nav><ul>` of links, keyboard-reachable, with a hamburger disclosure below 900px.                                                                                                                                        |
| `scroll_experience` | `continuous`                | Plain scroll; each band opens on a 2px rule. Nothing to remove under reduced motion.                                                                                                                                                                                                                                    |
| `easter_eggs[0]`    | `logo-clicks:7`             | Seven logo clicks draw one 1s left-to-right 2px Basel Red sweep plus a `role="status"` line, "Grids on grids." `Esc` cancels. The element is created on trigger, so it can never cover a CTA for anyone who has not found it, and a logo click is only intercepted when the link points at the page you are already on. |
| `intensity_toggle`  | `null`                      | Nothing built — nothing on this site is loud enough to tame.                                                                                                                                                                                                                                                            |
| `mascot`            | `null`                      | Nothing built. The absence is the kit's principled position, not an omission.                                                                                                                                                                                                                                           |

Total site JS: ~4 KB, hand-written, dependency-free, `defer`-loaded.

---

## Visual assets

- **`img/logo.svg`** — Inter Black wordmark in Ink Black with a Basel Red underrule (full
  lockup). Carried forward unchanged. The header uses an inline SVG of the same lockup, so
  the wordmark costs no request.
- **`img/favicon.svg`** — Basel Red square, Grid White `P`. Carried forward unchanged.
- **`img/og.png`** (1200×630, rasterised from `og.svg`) — Grid White field with the twelve
  column guides drawn, the wordmark, one Basel Red rule, the `01` numeral at poster scale in
  Rule Gray, and an Ink Black readout bar. The stale `BSD-3-Clause` line the July-4 version
  carried is corrected to the real licence split.
- **Icons** — eight inline SVGs, stroke-only, 1.5px, `stroke-linecap: butt`,
  `stroke-linejoin: miter`, `currentColor`, sized on the 8px grid (32px / 40px).
- **No photography.** `art_direction` forbids photographs of people in brand contexts and a
  marketing site has no media artwork to reproduce, so every graphic here is type, rule or
  geometry.

`img/PROMPTS.md` records the regeneration prompt for each asset, seeded from the kit's
`image_prompt_prefix`/`suffix`, `negative_prompt`, and the three `persona_vignettes`.

---

## Seasonal variants (`seasonal_activation.mode: "documented"`)

Recorded only — no date-gate script ships.

| Variant          | Range         | Override tokens                                          | Motif                                                                              |
| ---------------- | ------------- | -------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| New Year Grid    | 12-29 … 01-02 | `--color-primary` `#E8001C`, `--color-surface` `#EFEFEB` | Oversized Inter Black year numeral as full-width hero; 4px Basel Red rule beneath. |
| Winter Module    | 12-01 … 12-24 | `--color-bg` `#F5F5F2`, `--color-surface` `#EBEBE7`      | Slightly cooler off-white; a 6-point Ink Black asterisk built on the 8px grid.     |
| Anniversary Rule | 01-03         | `--color-primary` `#E8001C`                              | A single 8px Basel Red rule across the full page width, below the navigation.      |

---

## Sound identity

Documented in the kit, not implemented — a static marketing site plays nothing: a single
middle-C piano note at startup, a dry two-pitch click for notifications, two ascending notes
at a perfect fifth for success.

---

## Signature elements, and where each one appears

1. **Heavy black rule dividers (2px–4px)** — the opening rule of every band, the 2px rule
   above every spec table, the 4px rule opening each closing CTA.
2. **Oversized Inter Black type as the primary visual element** — the hero headline, every
   page `h1`, the footer tagline.
3. **Strict modular grid, 12 columns, 8px unit** — drawn as 1px guides on the hero, the
   feature grid, the proof band and the 404.
4. **A single Basel Red accent, precisely placed** — see "Where the red goes".
5. **Near-zero radius** — `0` everywhere; the kit's `2px` and `999px` steps go unused because
   nothing on this site is a large panel or a pill tag.
6. **Large asymmetric type blocks as visual field** — the 7-of-12 hero, the 4-of-12 heading
   column in `.split`, the deliberately off-grid 404 block.
7. **Negative space as composition** — the empty 8th column of the hero, the unfilled
   trailing columns of the module grid, the air above every band rule.
