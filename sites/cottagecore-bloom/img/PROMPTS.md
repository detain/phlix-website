# img/PROMPTS.md — Cottagecore Bloom

Exact prompts that (re)generate every image asset for this kit, assembled from
the kit's `image_prompt_prefix` + subject + `image_prompt_suffix`, with
`negative_prompt` applied to all of them.

Everything currently shipped is **hand-authored SVG or CSS** — no raster art
except `og.png`, which is `og.svg` rasterised by `tools/gen-og.mjs`. These
prompts exist so the SVGs can be replaced with real watercolour renders later
without re-deriving the art direction.

---

## Shared strings (from the kit)

**PREFIX** — `English cottagecore botanical watercolour illustration, warm ivory
background, soft diffused golden light, abundant hand-painted flowers, Edwardian
botanical illustration style, garden rose and lavender palette,`

**SUFFIX** — `, warm ivory and garden cream tones (rose #C8556A, sage #7A9E6B,
lavender #8B7AB5), soft watercolour washes, delicate ink linework, linen paper
texture, cozy and abundant.`

**NEGATIVE** (apply to every prompt) — `dark, neon, electric, urban, cold,
clinical, stark white, geometric, tech, futuristic, moody, high contrast shadows,
night scene, metallic, harsh lighting, desaturated, gritty, minimalist, flat
vector, corporate, bold sans-serif`

---

## Shipped assets

### `logo.svg` — wordmark lockup

> Design a Cottagecore Bloom logo: Playfair Display italic wordmark "Phlix" in
> Bark Brown (#2A1A10) on Warm Ivory, accompanied by a delicate climbing-rose
> sprig illustration in Garden Rose and Sage Green, soft and hand-drawn in feel.
> Generous airy negative space. No play-button triangle, no gears, no circuits,
> no lightning bolts, no cold abstract geometry.

### `favicon.svg` — square mark

> {PREFIX} a plump softly illustrated bumble bee wearing a tiny flower crown of a
> primrose, a forget-me-not and a sprig of lavender, centred on a rounded Garden
> Rose (#C8556A) square tile, readable at 16 pixels {SUFFIX}

### `og.svg` → `og.png` — 1200×630 social card

> {PREFIX} a cottage garden gate standing open beneath an arch of climbing roses,
> a thatched cottage beyond it, foxgloves and sweet peas in the foreground, and a
> bumble bee mid-flight; wide landscape composition with generous warm ivory space
> on the left for a headline {SUFFIX}
>
> Headline set in Playfair Display 900 "Grow Your Garden."; Dancing Script
> sub-tagline "Where Every Story Blooms." in Garden Rose.

### `seasonal/harvest-berries-and-leaves.svg`

> {PREFIX} a small posy of hedgerow berries, rosehips and turning autumn leaves,
> warm amber and russet, on a single stem, icon-scale {SUFFIX}

### `seasonal/midwinter-holly-sprigs.svg`

> {PREFIX} sprigs of holly with berries and mistletoe beside a dried orange
> slice, deep berry rose and pine-dark sage, beeswax-candle warmth, icon-scale
> {SUFFIX}

### `seasonal/spring-blossom-canopy.svg`

> {PREFIX} a light canopy of cherry blossom over two tulips, blossom-pink and
> young-leaf green, fresh and airy, icon-scale {SUFFIX}

### The hero diorama planes (inline in `index.html`)

Five layered planes for the `diorama-parallax` hero. If replaced with rendered
art, each must be a separate transparent-background layer so the parallax still
works.

1. **sky wash** — `{PREFIX} an empty warm ivory sky wash with three soft
overlapping colour blooms in rose, lavender and sage, no subject {SUFFIX}`
2. **cottage** — `{PREFIX} a distant thatched English cottage with one lit
window, seen across a garden, low contrast and pale as a background layer
{SUFFIX}`
3. **gate and climbing roses** — `{PREFIX} a wooden garden gate standing open
inside a tall arch of climbing roses, viewed straight on, mid-ground layer
{SUFFIX}`
4. **foreground flowers** — `{PREFIX} a dense foreground border of foxgloves,
sweet peas and lavender spires along the bottom edge of the frame {SUFFIX}`
5. **Primrose** — see the mascot prompt below.

### Primrose the mascot (inline `<symbol id="i-bee">`)

> {PREFIX} Primrose, a plump softly illustrated bumble bee with warm
> amber-striped fuzz and rounded watercolour-washed wings, wearing a tiny flower
> crown of a primrose, a forget-me-not and a sprig of lavender, expression of
> perpetual gentle delight {SUFFIX}

Poses to have on hand (kit `mascot.poses`): hovering beside a jam jar overflowing
with sweet peas · resting on the rim of a teacup with wings folded · mid-flight
through a lavender spire carrying a tiny basket of pollen · peering curiously at
a pressed flower in an open book.

For `404.html` specifically: **Primrose standing alone in a bare garden bed,
looking gently puzzled, holding a wayward seed packet labelled "404".**

### Feature icons (inline `<symbol>` sprite)

Twelve outlined marks — library, syncplay, transcode, shield, antenna, broadcast,
puzzle, hub, leaf, sprig, gate, ask.

> Soft rounded outlined icon of {subject}, 1.75px stroke, round caps and joins,
> minimum 3px corner radius, Bark Brown, with a small botanical detail accent (a
> leaf or a petal dot), Garden Rose active state, cottagecore aesthetic. Never
> sharp or angular; never a heavy filled glyph as the default state.

---

## Product mock-ups, cast from `persona_vignettes`

The kit's three vignettes decide which product **surfaces** are worth rendering
and which **features** each should depict. They also seed the
`visitor_paths` fork on the home page, so imagery and self-selection stay aligned.

### 1. The Home Gardener → the `solitary` path (`library`, `auth`, `transcode`)

Surfaces: home hero · media library grid · media player.

> {PREFIX} a quiet cottage evening: a steaming cup of tea on a side table, a
> personal film library shown on a large screen across the room, a bumble bee
> hovering peacefully in the corner of the frame, one film blooming to full
> screen {SUFFIX}
>
> UI overlay: Warm Ivory ground, Garden Cream poster cards at 12px radius with
> 1px Petal Blush borders, Playfair Display titles, a Garden Rose play button.

### 2. The Gathering Host → the `gatherer` path (`syncplay`, `hub`, `livetv`)

Surfaces: SyncPlay lobby · media player · hub connect screen.

> {PREFIX} a Saturday evening in a cottage: friends settled in three different
> rooms, the same film on every screen at the same frame, warm lamplight
> throughout, togetherness without the same sofa {SUFFIX}
>
> UI overlay: a SyncPlay lobby on Garden Cream, Sage Green status chips, elapsed
> time in Courier Prime, a Garden Rose scrubber.

### 3. The Seasonal Keeper → the seasonal date gate (`library`, `auth`)

Surfaces: home hero · seasonal motifs · media grid.

> {PREFIX} the same cottage garden interface in autumn: the palette shifted to
> harvest golds and russets, hedgerow berries and rosehips replacing the summer
> florals, and the bumble bee wearing a tiny acorn cap {SUFFIX}
>
> UI overlay: `--color-primary` #B8621A, `--color-surface` #FFF0DC, the harvest
> motif mark beside the seasonal banner.
