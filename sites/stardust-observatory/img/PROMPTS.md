# Image Generation Prompts — Stardust Observatory

> These prompts can regenerate every visual asset using the brand kit's `image_prompt_prefix`,
> `image_prompt_suffix`, `negative_prompt`, and `prompt_library` values.

## Logo

**Prompt:**

```
Victorian astronomical observatory logo, Playfair Display wordmark in Constellation Gold
(#C9A84C) on Midnight Navy (#0D1B2A), thin-line observatory dome arc mark paired with
the wordmark, elegant precise scientific draughtsmanship, six-point star at dome apex,
no neon.
```

**Negative prompts:** neon, synthwave, cyberpunk, lens flare, flat minimalism, cartoon

**Usage:** Generate as SVG; use `img/logo.svg` directly.

---

## Favicon

**Prompt:**

```
32x32 favicon, Victorian observatory dome arc in Constellation Gold on deep midnight
navy background, six-point star at dome apex, thin brass meridian ring, minimal
elegant scientific style, no text.
```

**Negative prompts:** neon, bright colors, cartoon, grungy, lens flare

---

## OG Social Image (1200×630)

**Prompt:**

```
Victorian astronomical observatory illustration, antique celestial atlas style, deep
midnight navy background (#0D1B2A), engraved linework in stardust silver (#A8B4C0)
and constellation gold (#C9A84C), warm candlelit amber atmosphere, soft nebula
violet glow, brass telescope instruments, parchment and ink textures, precise
scientific draughtsmanship, luminous star-field depth, spacious atlas-page
composition, high quality, atmospheric. Logo lockup, tagline overlay, star-dense
sky backdrop.
```

**Negative prompts:** neon, synthwave, cyberpunk, lens flare, HDR, oversaturated,
flat minimalism, white background, pastel, cute, cartoon, comic-book, horror,
grungy, gritty texture, chrome gloss, futuristic HUD, pixel art, low-poly

---

## Feature Icons (inline SVG)

For each of the 8 features, use this template:

**Template:** `{image_prompt_prefix} {icon_subject} {image_prompt_suffix}`

**Subjects:**

1. Library — telescope aperture opening to reveal stars
2. SyncPlay — two telescope eyepieces sharing a single star image
3. Transcode — brass refractor lens with light rays in graduated wavelengths
4. Auth — armillary sphere with combination lock at meridian
5. Live TV — antenna tower with constellation lines
6. DLNA — broadcast waves emanating from a brass sextant
7. Plugins — mechanical puzzle piece with star-chart lines
8. Hub — interconnected observatory domes with light paths

**Base icon prompt:**

```
Thin 1.5px outlined scientific icon, stardust silver (#A8B4C0) on midnight navy
(#0D1B2A), precise geometric, single parchment color by default, star and lens
shapes permitted, no rounded blob shapes, observatory-inspired, Victorian
scientific instrument aesthetic.
```

**Negative prompts for icons:** neon, synthwave, thick outlines, rounded blob,
cartoon, modern tech icons (gears, circuits, wifi bars)

---

## Backgrounds & Hero Artwork

**Background prompt:**

```
Deep midnight navy background (#0D1B2A) with subtle hand-engraved star-atlas grid
lines at 6% opacity, faint constellation dot patterns, and a soft nebula violet
bloom (#7B5EA7 at 30% opacity) in the upper quarter. No neon, no harsh light.
Warm candlelit amber primary atmosphere with cold pinpoint starlight highlights.
```

**Hero section prompt:**

```
Full-bleed Victorian astronomical observatory dome opening to a star-dense midnight
sky, engraved copper-plate linework style in stardust silver and constellation gold,
warm candlelight amber atmosphere, soft nebula violet halos, brass refractor
telescope silhouette at center, single focal instrument, wide breathing margins
like atlas page borders, sky fills the frame. No flat minimalism, no lens flares,
no neon, no synthwave.
```

---

## Decorative / Atmospheric

**Star-field:** `radial-gradient dots, stardust silver #A8B4C0 at 4-8% opacity, scattered across midnight navy`

**Nebula glow:** `radial-gradient from nebula violet #7B5EA7 at 30% opacity to transparent`

**Brass shimmer accent:** `linear-gradient(90deg, #B07D3A, #C9A84C, #B07D3A)` — max 1 per screen

---

## Hand-authored SVG assets added in the 2026-07 regeneration

These four are **shipped as inline or file SVG**, not raster renders; the prompts
below describe them so a raster version could replace them later.

### The dome that opens (home hero, inline in `index.html`)

```
Victorian observatory dome seen straight on, its two brass-ribbed halves parted to
reveal a star-dense midnight sky, a brass armillary sphere glowing amber at the
centre of the opening, six-point constellation star at the apex, engraved linework
in constellation gold and brass filigree on midnight navy, spacious symmetrical
atlas-plate composition.
```

### The misaligned telescope (`404.html`, inline)

```
A brass refractor telescope knocked out of alignment inside an observatory dome that
shows no stars at all — empty, starless sky behind the arc — the tube tilted down and
away from the meridian, a small armillary sphere hovering to one side as if watching
apologetically. Engraved copper-plate linework, midnight navy ground, no glow except
the sphere's amber core.
```

### Seasonal motifs (`img/seasonal/*.svg`, 20×20 badge marks)

```
1. perseid-meteor-trail — two meteor streaks and a six-point star, star-point gold.
2. winter-solstice-frost-dome — dome arc with a violet frost crystal on the glass.
3. vernal-equinox-garden — dome arc with two botanical leaves rising from its base.
```

### Persona-vignette surfaces (`clients.html`, seeded by `persona_vignettes`)

Each vignette names the product surfaces to draw if these become illustrations:

- **The Evening Observer** — home hero, media library grid, multi-room player control.
- **The Traveling Scholar** — mobile app, hub connect screen, media player.
- **The Collector's Dream** — library organisation, DLNA device picker, legacy player.

Prompt template: `{image_prompt_prefix} {surface}, rendered as an engraved atlas
plate of a screen, {image_prompt_suffix}`.

---

## Seasonal Variants (for future use)

### Perseid Watch (08-07..08-16)

```
As above, with meteor-trail streaks across hero background, observatory dome
fully open, star-trails arcing over frame. Primary color shifts to #E8D48B.
```

### Winter Solstice (12-18..01-05)

```
Deep winter navy sky #0A1520, frost pattern on observatory dome glass,
constellation Orion prominently sketched in header illustration. Tertiary
color shifts to #9B7AC8.
```

### Vernal Equinox (03-15..04-05)

```
Observatory garden visible through open dome door, star atlas pages edged in
delicate botanical line illustrations. Secondary shifts to #7A9E6A,
neutral shifts to #BACFB5.
```
