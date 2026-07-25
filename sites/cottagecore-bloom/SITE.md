# SITE.md — Cottagecore Bloom

The Phlix marketing site rendered in the **Cottagecore Bloom** brand kit
(`brand-kits/cottagecore-bloom.js`, schema 2.0, base kit, LIGHT background).

Regenerated 2026-07-25 to implement the kit's declared **experience** schema
rather than the generic template. The change manifest is `REGEN_PLAN.md`; what
was built and every deviation is in `BUILD_LOG.md`.

---

## Concept & vision

The warmth of a country kitchen window in late June — sunlight through
hand-stitched curtains, a jam jar stuffed with foxgloves and sweet peas on the
sill, the hum of a bumble bee in the lavender outside.

The site is **one continuous walk through a garden**. That is not a metaphor
applied to a template: the kit declares
`experience_archetype: "narrative-scroll"`, and the home page is six ordered
narrative beats — the gate opens, why this garden, what blooms, the guest rooms,
a word from the keeper, and finally the bed where you plant your own. Each beat
has its own ground tint and is separated from the next by a hand-drawn botanical
rule rather than a hard edge.

A soft aesthetic is **not** a soft information architecture. Every fact on every
page is traceable to `shared/content.json`; the garden only changes the voice and
the order of the walk.

## Aesthetic direction

**Visual style:** English cottagecore · hand-painted botanical watercolour ·
Edwardian botanical illustration plate · abundant floral editorial.

**Art direction:** a page from a beloved Edwardian botanical journal. Warm ivory
ground, soft washes of rose, sage and lavender, loose and slightly imperfect
linework. Compositions are lush and overflowing, never sparse. Light is warm and
diffused — golden hour filtered through garden foliage, never harsh, never cold.

**Lighting:** highlights warm to cream; shadows warm to taupe. No cold grey, no
pure black, no dark surfaces anywhere.

## Colour palette

| Role        | Name          | Hex       | Use here                                                     |
| ----------- | ------------- | --------- | ------------------------------------------------------------ |
| Primary     | Garden Rose   | `#C8556A` | Display type ≥24px, rules, borders, botanical fills, glows   |
| Secondary   | Sage Green    | `#7A9E6B` | **Decorative botanicals only** — 2.88:1, never text or icons |
| Tertiary    | Lavender Mist | `#8B7AB5` | Large/UI accents only — 3.60:1                               |
| Background  | Warm Ivory    | `#FFF8F2` | Page ground, and the label colour on rose buttons            |
| Surface     | Garden Cream  | `#FFF3E8` | Cards, panels, the topbar                                    |
| Surface alt | Butter Soft   | `#FDEEDE` | Striped rows, the proof band, the footer                     |
| Text        | Bark Brown    | `#2A1A10` | All body and headline text — 15.92:1 on Warm Ivory           |
| Neutral     | Warm Taupe    | `#B0A090` | **Decorative only** — 2.41:1 (bookshelf edge, plane strokes) |
| Border      | Petal Blush   | `#E8D5C4` | Card borders, dividers, rules                                |
| Error       | Briar Red     | `#B53040` | Available and text-safe at 5.77:1; not needed on this site   |

**Gradients** (kit `colors.gradients`): _Morning Light_ — the warm rose radial
glow behind the hero and the page headers. _Cream Fade_ — the surface-to-ground
fade on the closing CTA band. _Garden Path_ (rose → lavender) is documented but
not used: two accents per view is a kit rule, and the CTA band already carries
rose.

### Derived ink scale — why it exists

`accessibility.minimum_contrast` in the kit asserts Garden Rose on Warm Ivory is
**4.8:1**. Measured, it is **4.02:1** — and so is Warm Ivory on Garden Rose, i.e.
the primary button label. Sage Green measures 2.88:1 (below even the 3:1 non-text
floor) and Warm Taupe 2.41:1. Trap §19.1 exists for precisely this, and §12 is a
hard gate that a wrong claim in a kit does not lower.

The fix is **not** a new palette. Each ink token below is a mix of one of the
kit's own pigments with the kit's own Bark Brown — a deeper version of the same
hue, not a different one. All ratios measured against Warm Ivory / Garden Cream /
Butter Soft:

| Token               | Mix                      | Hex       | ivory / cream / butter |
| ------------------- | ------------------------ | --------- | ---------------------- |
| `--color-rose-ink`  | Garden Rose ⊕ 30% Bark   | `#99434F` | 6.10 / 5.88 / 5.65     |
| `--color-sage-ink`  | Sage Green ⊕ 40% Bark    | `#5A6947` | 5.63 / 5.42 / 5.21     |
| `--color-lav-ink`   | Lavender Mist ⊕ 35% Bark | `#69587B` | 6.08 / 5.86 / 5.62     |
| `--color-taupe-ink` | Warm Taupe ⊕ 40% Bark    | `#7A6A5D` | 4.93 / 4.75 / 4.57     |
| `--color-herb-ink`  | Herb Green ⊕ 20% Bark    | `#44684A` | 6.00 / 5.79 / 5.55     |
| `--color-honey-ink` | Honey Gold ⊕ 35% Bark    | `#8E5922` | 5.54 / 5.34 / 5.12     |
| button hover fill   | Garden Rose ⊕ 45% Bark   | `#7F3742` | 7.63 / 7.35 / 7.05     |

The pure brand hues keep everything that only needs 3:1 — the Dancing Script
display lines, the focus ring, section rules, card borders, icon botanicals and
the shadow glows — so the identity is unchanged to the eye.

Two further rules follow from the same measurement work:

1. **No text ever sits on a semi-transparent background.** Every surface behind
   text is an opaque palette colour; alpha is reserved for shadows, glows and
   decorative washes.
2. `colors.info` (Cornflower `#5B7FC4`) is **not used at all** — 3.78:1, and the
   kit's own `color_rules` forbid cold tones.

## Typography

| Role     | Family           | Weights  | Where                                                        |
| -------- | ---------------- | -------- | ------------------------------------------------------------ |
| Headline | Playfair Display | 700, 900 | `h1`–`h6`; 900 for the hero and page-header `h1`             |
| Display  | Dancing Script   | 700      | Taglines, the visitor-path prompt, FAQ rephrasings, rewards  |
| Body     | Lora             | 400, 500 | All reading copy, at a 17px base                             |
| UI       | Nunito           | 400–600  | Nav, buttons, labels, chips, badges, plant-label summaries   |
| Mono     | Courier Prime    | 400, 700 | Install snippets, journal dates, plate numbers, swatch hexes |
| Number   | Playfair Display | 700      | Room numerals, step numerals, the proof placard              |

All five are self-hosted WOFF2 from `shared/assets/fonts/` with
`font-display: swap`; ten `@font-face` rules, zero external requests.

**Dancing Script is never set below 1.4rem.** It carries only short accent
phrases — a tagline, a six-word prompt, a rephrased question — because a script
face at label size is a legibility problem, not a flourish. It is never used for
body copy, buttons or navigation, per the kit's own `typography_rules`.

## Spatial system

Kit spacing scale, in **px** (`4 8 12 16 24 32 48 64 96`) — px deliberately, so
that a 200% text zoom cannot multiply structural gutters into horizontal
overflow. Radii `4 / 8 / 16 / 24 / 999px`. Max content width **1400px**, with a
1040px narrow measure for the reading-first beats.

Every grid uses `minmax(min(<n>rem, 100%), 1fr)` and every grid/flex item that
holds prose carries `min-width: 0`, so no track can be widened past the viewport
by a long technical token.

## Motion philosophy

Motion is the breeze through a cottage window: present, gentle, never demanding.
Durations 250–550ms on `cubic-bezier(0.25, 0.46, 0.45, 0.94)` and
`cubic-bezier(0.34, 1.02, 0.64, 1)`.

- **Hero** — `diorama-parallax`: five layered garden planes (sky wash, thatched
  cottage, gate and climbing roses, foreground flowers, Primrose) drift on
  pointer position and scroll offset.
- **Scroll** — `petal-unfold`: each beat blooms in (opacity, 12px drift,
  0.985 → 1 scale); beats already walked past settle to `saturate(0.72)`. The
  kit asks for "soft sepia", but `sepia()` shifts luminance and would drop
  measured contrast, so the luminance-preserving `saturate()` carries the same
  reading. §12 wins over a field (§19.6).
- **Primrose** — drifts up and down as if riding an air current; a delighted
  loop-de-loop and curtsy after five clicks.
- **Reduced motion** — the petal-unfold, the parallax and Primrose's drift all
  stop; sections are full colour and full opacity from the start.
- **"Quiet the Garden"** — the kit's `intensity_toggle`, in the footer utility
  row, does the same on demand and remembers the choice.

## Visual assets

- `img/logo.svg` — Playfair-italic-styled wordmark in Bark Brown beside a
  climbing-rose sprig in Garden Rose, Sage and Lavender. Carried forward from the
  July-4 build. Set in Georgia because an `<img>`-referenced SVG cannot use the
  page's `@font-face` — that is the kit's own declared fallback.
- `img/favicon.svg` — Primrose the bumble bee on a Garden Rose tile. Carried
  forward unchanged; it was already the strongest asset on the old site.
- `img/og.svg` → `img/og.png` — 1200×630, re-authored for the new headline: warm
  ivory ground, linen grain, the gate standing open under climbing roses,
  Primrose mid-flight, "Grow Your Garden." and the tagline. The meta references
  the **PNG** (§19.5).
- `img/seasonal/*.svg` — three new motif marks (harvest berries and rosehips,
  midwinter holly and dried orange, spring blossom and tulips) swapped in by the
  `seasonal_activation` date gate and shown on `seasons.html`.
- **Icons** — one inline `<symbol>` sprite per page: twelve outlined marks at
  1.75px stroke with round caps, plus Primrose. Same-document `<use>`, so it
  works from `file://` and costs no request. No icon fonts, no CDNs.
- **All artwork is SVG or CSS.** There is no raster imagery beyond the rasterised
  OG card, so the hero costs nothing to load and the linen grain is two repeating
  gradients rather than a texture file.

## Layout archetype

**Narrative-scroll** (declared by the kit). Home is a walk; interior pages are
themed rooms of the same cottage — `features.html` is a numbered garden-room
tour, `clients.html` is five made-up guest rooms, `download.html` is a
three-step planting guide, `about.html` is three pages torn from a garden
journal, and `seasons.html` is the year's four moods.

## Signature elements in use

Trailing botanical rules between sections · pressed-flower spot marks · a bee
and leaf accent on every guidepost · the seed-catalog plate metaphor for the two
hero features · linen paper grain on every surface · the ecosystem rendered as a
shelf of mismatched, hand-collected volumes · Primrose as an on-page companion.

## Deliberately not implemented

`sound_identity` — a marketing page that plays audio is a WCAG 1.4.2 hazard, so
the startup chime, notification, click, success and error sounds are recorded
here as identity rather than shipped. `responsive_behavior.tv` (10-foot UI,
D-pad) describes the product's TV clients, not a web page.
