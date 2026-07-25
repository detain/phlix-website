# SITE.md — Abstract Canvas for Phlix

**Kit:** `brand-kits/abstract-canvas.js` v1.0 · schema_version 2.0 · `kit_type: base`
**Layout archetype:** **editorial** — declared by the kit's `experience_archetype`, not derived.
**Regenerated:** 2026-07-24 (the 2026-07-04 build predated the kit's experience schema; see
`REGEN_PLAN.md` for the change manifest and `BUILD_LOG.md` for what moved).

## Brand DNA, condensed

Abstract Canvas lives at the intersection of fine-art reverence and gestural energy: warm
gallery-linen ground carrying carbon-black type and cadmium-red accents — the painter's primary
pigments, applied with intention. Never sterile, never cold, never flat-digital. Every surface has
implied texture; every element should feel placed by a hand rather than by a grid.

## Concept & vision

The site is a gallery you walk, not a landing page you scroll. The home page opens in the studio,
hangs two focal works at eye level, states the artist's position on the white wall beside them,
offers a modest placard of verifiable facts, and closes by inviting you to hang your own work. The
nav is a gallery walk (The Studio · The Canvas · The Gallery · Get Started · The Frame · The Story);
reference material and the plugin room sit in the footer directory so the main path stays
contemplative.

## Aesthetic direction — how _editorial_ was built

- Asymmetric two-column wall grid: a narrow left margin carrying a Bebas catalogue numeral and an
  Inter eyebrow, and a wide column carrying the work. Collapses to one column below 900px.
- **Left-aligned** headings and wall text throughout (`page_generation_rules`: content left-aligned
  on wider viewports). Nothing is centre-set except short display phrases.
- Sections alternate gallery-linen and canvas-cream "rooms", separated by horizontal colour-field
  band dividers and palette-knife scrape rules — both `signature_elements`.
- Reading measure capped at 68ch (`typography_rules`: 60–75ch); content width 1080px inside a 1400px
  maximum (`ui_generation_rules`).
- Texture: a two-axis hairline linen grain on `body::before`, no image request, dropped for print.

## Colour palette

| Role                             | Name                                          | Hex                                           | Usage here                                              |
| -------------------------------- | --------------------------------------------- | --------------------------------------------- | ------------------------------------------------------- |
| Background                       | Gallery Linen                                 | `#F0EDE4`                                     | Every page ground                                       |
| Surface                          | Canvas Cream                                  | `#E8E4D8`                                     | Cards, framed studies, topbar                           |
| Surface alt                      | Aged Ground                                   | `#DDD8C8`                                     | Proof placard, code blocks, footer                      |
| Primary                          | Carbon Black                                  | `#1A1A1A`                                     | Headlines, primary CTA, icons                           |
| Secondary                        | Cadmium Red                                   | `#CC2200`                                     | Marks, rules, active nav underline, one accent per view |
| Tertiary                         | Ultramarine                                   | `#0055AA`                                     | Focus ring, structural edges, path markers              |
| Text                             | Paint Ink                                     | `#141210`                                     | Body copy                                               |
| Neutral                          | Raw Umber                                     | `#8A8070`                                     | Non-text chrome only (see below)                        |
| Border                           | Sizing Ground                                 | `#C8C2B0`                                     | Card borders, dividers                                  |
| Success / Warning / Error / Info | Viridian / Yellow Ochre / Alizarin / Cerulean | `#1A7A4A` / `#C8900A` / `#B8001C` / `#1A6BA8` | Status vocabulary                                       |

### Text-safe derived pigments (accessibility)

`accessibility.minimum_contrast` claims Cadmium Red on Gallery Linen is ~5.8:1. Measured, it is
**4.73:1** on linen and **4.35:1** on canvas cream — i.e. _below_ AA for small text on card
surfaces. Raw Umber is 3.32:1 on linen (the kit itself flags it). Since `accessibility` is a hard
commitment, small text uses darkened mixes of the same pigments, and the raw pigments are reserved
for marks, rules and borders:

| Token                   | Hex       | Linen | Cream | Aged  | Derived from                                 |
| ----------------------- | --------- | ----- | ----- | ----- | -------------------------------------------- |
| `--color-cadmium-text`  | `#B31E00` | 5.78  | 5.32  | 4.75  | Cadmium Red, darkened                        |
| `--color-neutral-ink`   | `#5F594C` | 5.94  | 5.47  | 4.88  | Raw Umber, darkened                          |
| `--color-success-text`  | `#146B40` | 5.59  | 5.15  | 4.59  | Viridian, darkened                           |
| `--color-warning-text`  | `#7A5600` | 5.68  | 5.23  | 4.66  | Yellow Ochre, darkened                       |
| `--color-umber-ink`     | `#3F3A30` | 9.65  | 8.89  | 7.92  | Carbon Black warmed towards Raw Umber        |
| `--color-primary-hover` | `#2A2A2A` | 12.26 | 11.29 | 10.07 | Carbon Black lifted 8% towards Gallery Linen |

The last two exist for reasons the first four do not, so they are called out rather than lumped in:

- `--color-umber-ink` is the **middle rung** of `site_architecture.nav[].emphasis`. The ladder needs
  three visibly different levels and Cormorant Garamond ships here in 600 and 700 only, so a
  `font-weight: 500` rung would be snapped to the 600 face and render identically to `primary`.
  Colour carries the middle step instead: 14.87 → 9.65 → 5.94 on linen.
- `--color-primary-hover` is the `.btn-primary` hover/press ground. `buttons.primary` fixes the
  resting state at Carbon Black and says nothing about hover; a lighter carbon is the mark of a
  pressed brush, and it stays inside the pigment.

Every hex the site paints with is now either a kit pigment or one of these six documented
derivations — including `img/logo.svg`, whose gestural umber mark uses `--color-neutral-ink`
`#5F594C` rather than an ad-hoc darkening.

Paint Ink on Gallery Linen measures 15.96:1; Carbon Black 14.87:1; Ultramarine 6.23:1.

### Gradients (from `colors.gradients`)

- **Color Field Dusk** — `linear-gradient(170deg, #CC2200, #0055AA)`: the hero's two floating
  blocks and the band dividers.
- **Studio Light** — radial linen glow behind the hero copy.
- **Canvas Depth** — `linear-gradient(180deg, #E8E4D8, #DDD8C8)`: the 404's primed canvas.

## Typography

| Role     | Family             | Weights   | Where                                                         |
| -------- | ------------------ | --------- | ------------------------------------------------------------- |
| Headline | Cormorant Garamond | 600 / 700 | h1–h6, nav labels, manifesto, artist-talk questions           |
| Display  | Bebas Neue         | 400       | Catalogue numerals and station numbers only, always uppercase |
| Body     | Lora               | 400 / 500 | Wall text, plain-language lines, FAQ answers                  |
| UI       | Inter              | 400 / 600 | Buttons, eyebrows, chips, badges, footer links                |
| Mono     | JetBrains Mono     | 400 / 500 | Code block, repo names, disclosed technical wording           |
| Number   | Cormorant Garamond | 600       | Figures inside wall text                                      |

Fonts are the shared latin-subset WOFF2 pool at `../../assets/fonts/`, declared inside the
`vendor-fonts:begin/end` sentinel block in `base.css` and owned by `tools/vendor-fonts.mjs` — do not
hand-edit. All five families the kit names are **OFL-1.1**. Zero external font requests.
`font-display: swap` on every face.

Rules honoured: Cormorant never below 600 on linen; Bebas uppercase-only and numerals-only; Lora
never all-caps; headline tracking −0.01em; Cormorant italic for captions, the manifesto and
attributions; no geometric sans in a headline slot.

**Known gap, escalated not worked around (`REGEN_PLAN.md` §6.6):** the shared pool has no italic
face for any family, so the 11 `font-style: italic` rules render as a synthetic oblique rather than
the true Cormorant Garamond italic `typography_rules` asks for. §19.3 makes the pool
orchestrator-owned and forbids a CDN, so the honest state is a faux italic plus this note.

Display type is also capped against the viewport (`min(clamp(…), Nvw)` on `h1`/`h2`/`h3` and
`.hero-headline`). The caps sit above every value the fluid clamp produces between 320px and 1400px,
so the rendered scale at normal zoom is unchanged; they only engage under **text-only** 200% zoom,
where a `rem` floor would otherwise grow an `<h1>` to 72px in a 272px column. Body copy is never
capped — reading text scales all the way.

## Spatial system

Only the kit's `spacing_scale` steps (4, 8, 12, 16, 24, 32, 48, 64, 96) appear as `--space-*`.
Radii come from `corner_radius` (3/6/12/18/999px); buttons use the 4px the `buttons{}` block
specifies. Borders are 1px sizing-ground, with 2px cadmium or ultramarine reserved for emphasis
edges — no hairlines that vanish on linen.

## Motion philosophy

`animation_speed: medium`, `motion_style: organic / painterly / deliberate / imperfect`. Transitions
are 150–420ms on the kit's own easing curves. Nothing springs, bounces or snaps. Section entrances
are **opacity-only** settles, which is also what `scroll_experience: continuous` asks for: the page
never hijacks the scroll. Palette's idle is a slow ±4° consideration.

Three independent brakes, any one of which stills the page: `prefers-reduced-motion`, the visitor's
own **"Gallery quiet"** toggle in the footer utility row (`intensity_toggle`, persisted in
localStorage), and the absence of JavaScript.

## Experience contract implemented

`REGEN_PLAN.md` §1 is the row-by-row manifest. In short: the kit's nav and footer demotion, the
five-section `homepage_narrative`, the four `page_blueprints`, `feature_casting` (2 focal / 4 studies
/ 2 marginalia), the `copy_overlay`, all four `copy_treatments`, the Artist Talks FAQ frame with its
three extra questions, the persona vignettes as drawn surface studies, a static hero, a topbar with
its accessible fallback, continuous scroll, both easter eggs, the guided-steps funnel with its
three-rung ladder, verifiable proof signals, the visitor-path fork, `complexity_profile`'s
translate-the-jargon disclosures, the Gallery quiet toggle, Palette as an on-page companion, the
live-JS seasonal date-gate, and a themed `404.html`.

### Seasonal variants (live, not documented-only)

`seasonal_activation.mode` is `live-js`, so `js/main.js` gates on the date and does exactly two
things: sets `data-season` on `<html>` and applies the variant's declared override tokens. Everything
visible is CSS and authored markup — the banner sentence is in all 9 pages, kept `display: none`
until `data-season` appears, and each variant's `motif_assets` SVG is the banner's background mark in
its own `html[data-season='…']` rule (plus a re-tinted `.band` divider). Nothing is inserted into the
document after first paint. None is active on 2026-07-25. To see one out of season, append
`?season=autumn-study` (or `winter-white`, `spring-opening`) to any page URL — the slug is matched
against a fixed list.

| Variant        | Range        | Overrides                                            | Motif mark                          |
| -------------- | ------------ | ---------------------------------------------------- | ----------------------------------- |
| Autumn Study   | 10-01..11-15 | primary `#8B3A00`, secondary `#CC6600`, bg `#F2EBD8` | `img/seasonal/autumn-leaf-marks`    |
| Winter White   | 12-01..01-15 | bg `#F8F6F2`, surface `#EFECE4`, secondary `#003399` | `img/seasonal/winter-frost-texture` |
| Spring Opening | 03-15..05-15 | secondary `#AA2288`, tertiary `#007744`              | `img/seasonal/spring-flower-forms`  |

## Sound identity — context only, never shipped

The kit describes a startup cello note resolving to a warm piano chord, a wood-block notification, a
paper-on-wood click, a two-note success tone and a muted string for errors. This is a static site:
**no audio is shipped.** Recorded here as brand context for the product itself.

## Visual assets

| Asset                                            | Form                                                                                  |
| ------------------------------------------------ | ------------------------------------------------------------------------------------- |
| `img/logo.svg`                                   | Serif wordmark in a canvas stretcher frame, colour-field margin, two gestural strokes |
| `img/favicon.svg`                                | Carbon square, serif P, cadmium drag, ultramarine colour field                        |
| `img/og.svg` → `img/og.png`                      | 1200×630 share card (rasterised with `rsvg-convert`; 73 KB)                           |
| `img/seasonal/*.svg`                             | The three `motif_assets` the kit names                                                |
| 8 feature icons                                  | Inline SVG, 1.75px stroke, rounded caps, carbon black                                 |
| Palette                                          | Inline SVG: the companion, the Artist-Talks persona mark, and the 404's figure        |
| Hero field, 3 vignette studies, the blank canvas | CSS gradients + hand-authored inline SVG                                              |

No raster photography: `realism: abstract` and `do_dont.imagery` both point away from it. Every
prompt is recorded in `img/PROMPTS.md`.

## Accessibility commitments

- WCAG 2.2 AA. Every text/background pair measured (table above); nothing ships below 4.5:1 for
  small text or 3:1 for large text and UI edges.
- Focus: 2px ultramarine ring, 2px offset, 4px ultramarine halo — `accessibility.focus_style`
  implemented literally, never clipped.
- Touch targets: `accessibility.touch_target` is 44px on desktop and 48px on a phone, and that
  applies to the small controls too, not just the obvious ones — the nav toggle (48), buttons (48),
  path links (48), the `<details>` summary that holds every disclosed technical fact (44, 48 under
  600px), Palette's figure and its dismiss (44, 48 under 600px), footer-directory rows (44), the
  reference-shelf spines (44) and the skip link (44).
- `prefers-reduced-motion` drops all animation; the Gallery quiet toggle does the same on request.
- Survives 200% text zoom, verified on all 9 pages at 320px: every single-column grid track is
  `minmax(0, 1fr)` so it can be narrower than its content's min-content width, `overflow-wrap:
break-word` is inherited from `body` so long words reflow instead of inflating a column, buttons
  drop their flex min-width floor so a label wraps rather than being clipped, and display sizes are
  capped against the viewport. No fixed-px layout widths.
- Palette is two labelled buttons plus a polite live region — never a focus trap, and dismissible.
  Per §19.11 it steps aside rather than sit on a call to action at ≤700px, and it never pushes an
  unrequested tip on a phone.
- The install snippet is a `<pre>` with `tabindex="0"`, `role="region"` and a label: it scrolls
  horizontally, and a scrollable region has to be reachable from a keyboard.
- Printing works: `@media print` restores the `.reveal` blocks that an `IntersectionObserver` would
  otherwise leave at `opacity: 0` on a page that was never scrolled.
- With JavaScript off, the phone header still navigates — `css/nojs.css` is loaded from `<noscript>`
  and lays the six nav labels out as a static row.

## Voice

`voice: thoughtful, cultivated, direct, honest`; the register of catalogue wall text. No exclamation
marks. None of `avoid_words` appears in the site's prose (`binge`, `content`, `consume`,
`algorithm`, `awesome`, `amazing`, `exciting`, `leverage`, `synergy`, `utilize`, `robust`,
`seamless`, `game-changing`) — including inside the `<details>` bodies, which are verbatim
`content.json`. The word "content" survives in exactly two non-prose places: `<meta content="…">`
attributes and the mandatory skip-link string "Skip to main content" (`new_site.md` §4). Neither is
the streaming-industry usage the kit is banning.
Facts are `content.json`'s; framing is the kit's `copy_overlay` and `feature_casting.angle`.
