# Image prompts — Neon Noir

Every prompt below is built from the kit's own fields:

- **prefix** — `image_prompt_prefix`: "Neo-noir cinematic illustration, high contrast, deep
  black shadows, neon city night, electric cyan and magenta neon signs, rain-slicked streets,
  1940s noir meets modern neon city,"
- **suffix** — `image_prompt_suffix`: ", dark atmospheric palette (void black, electric cyan,
  neon magenta, amber), sharp hard shadows, film grain, cinematic composition, high quality."
- **negative** — `negative_prompt`: warm, golden hour, daylight, sunshine, cozy, cheerful,
  pastel, soft, cream background, family friendly, cartoonish, rounded bubbles, corporate
  clean, flat bright colors.

Palette to hold in every render: void black `#0a0c10`, deep navy `#111827`, electric cyan
`#00e5ff`, neon magenta `#ff2d78`, neon amber `#f5a623`, ghost white `#e8edf5`.

Assets currently shipping as CSS/SVG originals are marked **[shipped as SVG]** — the prompt is
recorded so a real render can replace it later without re-deriving the art direction.

---

## Brand marks

### `logo.svg` **[shipped as SVG]**

> Design a Neon Noir logo: Playfair Display italic wordmark "Phlix" in ghost-white on
> void-black, inside a sharp-cornered rectangular badge with a 1px electric-cyan border, a
> short neon-amber accent bar, and "NEON NOIR" in small letterspaced steel-mist caps. Sharp
> corners, no warm colours, no rounded shapes, no play-button triangle.

Forbidden per `logo_rules`: play-button triangle, gears or circuits, sunbursts, warm
illustration.

### `favicon.svg` **[shipped as SVG]**

> A 32×32 void-black square with a 1px neon-amber border and a bold italic serif "P" in
> ghost-white, plus a single amber neon dot. High contrast, sharp corners, legible at 16px.

### `og.svg` → `og.png` (1200×630)

> {prefix} a city skyline at night seen across wet asphalt, lit windows in deep navy towers, a
> thin neon horizon line, and the wordmark "Phlix" in Playfair Display with a cyan halation
> glow, generous black negative space at the lower left for the headline "Every Frame, a
> Mystery." {suffix}

`og.png` is rasterised from `og.svg` by `node tools/gen-og.mjs --site neon-noir`, because
`og:image` must be a PNG.

---

## Home — the alley diorama **[shipped as SVG]**

Realises `hero_experience.spec` and the `homepage_narrative.sections[0].treatment`.

> {prefix} a lone figure in a trench coat and fedora leaning in a lit doorway of a rain-soaked
> alley, watching a buzzing neon marquee overhead that reads "PHLIX", the brim of the hat
> catching a cyan glow, two points of amber light where the eyes are, magenta and amber
> reflections pooling in the wet asphalt below, venetian-blind shadows falling across the
> brickwork {suffix}

Three pose variants are needed, one per vignette step — the sign changes colour and the figure
shifts:

1. **cyan** — leaning against the wall, arms crossed, looking down the alley.
2. **magenta** — looking back over the shoulder at the flickering sign.
3. **amber** — squared up in the lit doorway, sign fully steady.

---

## Persona vignettes

These three come from `persona_vignettes` and decide which product surfaces are depicted.

### The Midnight Collector — home art and library grid

> {prefix} a dark living room at 2 a.m. lit only by a television showing a poster grid of
> films, a phone face-up on the kitchen counter showing the same film mid-playback, a third
> screen glowing in a bedroom doorway, all three in sync, cyan interface light on every
> surface {suffix}

Surfaces: home hero, media library grid, media player with the SyncPlay indicator.
Features shown: syncplay, library, transcode.

### Remote Access — hub art

> {prefix} a figure on a rain-soaked street at night holding a phone, a thin cyan line
> arcing from the phone across a sleeping skyline to a single lit window far away, the line
> passing cleanly through a dark wall {suffix}

Surfaces: hub connect screen, remote media library, media player.
Features shown: hub, auth, transcode.

### The Multi-Screen Night — clients art

> {prefix} a living-room television playing a noir thriller, and in the far distance through
> a window a second lit apartment showing the identical frame at the identical moment, both
> rooms washed in the same magenta and cyan light {suffix}

Surfaces: media player, SyncPlay overlay, hub network status.
Features shown: syncplay, hub, auth.

---

## 404 — the dead-end alley **[shipped as SVG]**

Realises `error_page_experience.concept`.

> {prefix} a dead-end alley at night, a burnt-out neon sign above a shut door with only one
> stroke of the letter X still glowing amber, a figure in a trench coat holding a paper file
> marked "FILE NOT FOUND", a dented filing cabinet standing in shadow, no way through {suffix}

---

## Feature icons **[shipped as inline SVG]**

Eight icons: library, syncplay (clock), transcode (film), shield, antenna, broadcast, puzzle,
hub.

> Sharp outlined minimal icon of {subject}, 1.5px stroke, ghost-white, square caps and joins,
> no rounded joins, maximum 2px corner radius, electric-cyan active state, noir aesthetic, on
> void black.

Per `icon_rules`: never a rounded playful icon set, never filled by default, one stroke weight
per view.

---

## Seasonal motifs **[shipped as SVG]**

Referenced by `seasonal_activation.motif_assets` and shown by the date gate in
`js/experience.js`.

### `seasonal/champagne-countdown.svg` — Midnight New Year (12-28…01-03)

> {prefix} a champagne flute silhouette against a magenta neon countdown clock, slow-falling
> confetti shaped like film-frame perforations {suffix}

### `seasonal/blood-moon-rooftops.svg` — Blood Moon October (10-01…10-31)

> {prefix} a crescent moon silhouette over rainy rooftops in deep crimson neon, spider-web
> geometry worked into the venetian-blind shadow device {suffix}

### `seasonal/valentine-neon-hearts.svg` — Valentine's Neon (02-10…02-14)

> {prefix} a stylised neon heart sign flickering above a city roofline, rain puddles below
> reflecting pink {suffix}

---

## Backdrops and textures

Per the kit's performance rules these are **CSS only** — no raster textures ship:

- **Film grain** — a 3px radial-dot lattice at 2.8% ghost-white on `body`.
- **Rain** — a 104° repeating hairline cyan gradient, masked to fade downward.
- **Venetian blinds** — a 7px repeating horizontal gradient, skewed −1.1°.
- **Amber interrogation light** — a radial amber-to-transparent gradient behind the hero and
  every CTA banner.

If a raster backdrop is ever added:

> Void-black background with subtle rain texture and a faint neon-cyan radial glow in one
> corner. No warm light. No text.
