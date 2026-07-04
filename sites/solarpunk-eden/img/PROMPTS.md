# Image Generation Prompts — Solarpunk Eden

> These prompts are designed to regenerate every raster image asset in this
> brand-kit site, faithfully reconstructing the Solarpunk Eden visual identity
> using the kit's `image_prompt_prefix`, `negative_prompt`, and
> `image_prompt_suffix` fields.

## Brand Primer (prepend to every prompt)

Solarpunk Eden is a living, breathing garden of media — luminous, generous,
and deeply optimistic. It pairs the flowing organic curves of art nouveau with
the clarity of sunlit glass and the warmth of hand-tended earth. It is never
sterile, never dystopian, and never cold.

**Art direction**: Artwork should feel like a hand-painted botanical print
inside a sun-drenched greenhouse. Compositions are lush but never cluttered: one
dominant plant or garden scene anchors each piece, with flowing art nouveau
borders of vines, ferns, and solar-panel geometry woven into the foliage.
Lighting is always warm and dappled — the soft scatter of sun through glass —
never harsh, never cold, never dramatic. Color is saturated but earthy: deep
garden greens, warm solar yellows, clear sky blues, and warm clay accents.

**Negative prompt** (always append):
dystopian, dark, neon, cyberpunk, corporate, clinical white, cold blue
lighting, harsh shadows, grunge, post-apocalyptic, sterile minimalism, grey
concrete, surveillance aesthetic, lens flare

---

## img/logo.svg

**Prompt**:
Solarpunk Eden logo: Playfair Display wordmark in canopy green (#2D7A4F) on
morning parchment (#F4EFE0), inside a rounded art nouveau botanical oval with vine
detailing and honeybee silhouette accent. Simple, elegant, no neon, no gears.
Organic flowing linework, hopeful and luminous mood.

**Negative**:
gears, circuits, neon, concrete, corporate monogram, play-button cliché

---

## img/favicon.svg

**Prompt**:
Favicon for Solarpunk Eden brand: a rounded square in canopy green (#2D7A4F)
with a stylized leaf mark in morning parchment (#F4EFE0) and a small solar-gold
dot accent. Simple, legible at 32×32, nature-forward.

---

## img/og.svg (1200×630 social share card)

**Prompt**:
Solarpunk Eden social graphic: full-bleed botanical illustration hero with art
nouveau vine border, canopy-green (#2D7A4F) gradient background, Playfair
Display headline "Phlix" in deep canopy (#1A2E1E), tagline "Stream in the
Sunshine." in solar gold (#E8A020), art nouveau botanical frame with honeybee
and vine accents. Parchment (#F4EFE0) card panel in center. Hopeful and
community-warm. 1200×630.

**Negative**:
dystopian, dark, neon, cyberpunk, corporate, clinical white, cold blue
lighting, harsh shadows, grunge, post-apocalyptic, sterile minimalism

---

## Hero botanical illustration (conceptual, for future raster hero)

**Prompt**:
Solarpunk Eden illustration, art nouveau botanical style, lush hand-painted
watercolour and linocut, warm dappled sunlight through greenhouse glass, deep
garden greens and solar gold, morning parchment background,
[a large framing botanical specimen — e.g. a flourishing tropical leaf canopy
with climbing vines and a honeybee — as the hero anchor], art nouveau vine
border, organic flowing linework, hopeful and luminous mood, wildflower and
fern accents, high quality, balanced composition, no dystopia.

**Negative**:
dystopian, dark, neon, cyberpunk, corporate, clinical white, cold blue
lighting, harsh shadows, grunge, post-apocalyptic, sterile minimalism, grey
concrete, surveillance aesthetic, lens flare

---

## Section divider botanical border

**Prompt**:
Solarpunk Eden art nouveau botanical border, continuous vine with alternating
leaves and small wildflowers (solar gold / canopy green), organic hand-drawn
linework with slight wobble as if inked on cotton-rag paper, morning parchment
background, seamless horizontal repeat. High quality, 1200px wide.

**Negative**:
dystopian, neon, corporate, cold blue lighting, harsh shadows, grey concrete,
sterile minimalism

---

## Frond mascot (kit mascot, name: Frond)

**Prompt**:
Solarpunk Eden mascot character "Frond": a small friendly seedling with a
rounded leaf head, two expressive tendril arms, and tiny root-feet. Frond glows
faintly golden when happy, and unfurls a new leaf when excited. Carries a tiny
watering can. Illustrated in art nouveau botanical plate style, warm dappled
sunlight, hopeful expression, organic linework. Delighted expression.

**Negative**:
dystopian, dark, neon, corporate, clinical, cold blue lighting, harsh shadows

---

## Feature icons (inline SVG, for reference)

All 7 feature icons in Solarpunk Eden:
- Style: 2px stroke, rounded caps and joins, outlined, single-color Canopy
  Green (#2D7A4F) or Deep Canopy (#1A2E1E); single thin botanical accent (leaf,
  petal) when space allows.
- Never sharp 90-degree corners; all joins rounded.
- Play/media icons use a slightly leaf-shaped bevel on the triangle point.

Icon list:
1. **library** — horizontal lines (folder/organization)
2. **syncplay** — circle with clock hands (synchronization)
3. **transcode** — hexagonal diamond shape (transformation)
4. **shield** — classic shield (security/auth)
5. **antenna** — radiating signal lines (broadcast/Live TV)
6. **broadcast** — broadcast/waves icon (DLNA)
7. **puzzle** — puzzle piece (plugins/extensibility)
8. **hub** — circle with radiating spokes (network hub)

---

## Client card illustrations (conceptual, for future raster use)

**Prompt**:
Solarpunk Eden client illustration for [client name]: a small art nouveau
botanical scene with a device silhouette (Roku/Samsung TV/Windows PC/Mobile
phone) surrounded by climbing vines and small solar-gold flowers. Warm dappled
light, paper grain, organic linework, hopeful community-warm feeling.

---

## Seasonal variant: Harvest Moon (09-15..11-15)

**Prompt**:
Solarpunk Eden Harvest Moon variant illustration: warm amber harvest tones,
pumpkin and seed-head botanical accents, autumn leaves in gold and terracotta,
Frond mascot wearing a tiny harvesting hat, art nouveau botanical oval frame.

**Override tokens**:
- `--color-bg`: #F5E8CE
- `--color-secondary`: #D4751A
- `--color-surface-alt`: #EADFCA

---

## Seasonal variant: Winter Solstice Garden (12-01..01-15)

**Prompt**:
Solarpunk Eden Winter Solstice Garden illustration: evergreen fir and holly
botanical borders, warm candlelight-gold accents, soft snow-dusted leaf
accents, Frond mascot curled under a snow-dusted leaf, art nouveau botanical
oval frame.

**Override tokens**:
- `--color-primary`: #1E6040
- `--color-secondary`: #C9A84C
- `--color-bg`: #EEF0E8

---

## Seasonal variant: Bloom Season (03-20..05-31)

**Prompt**:
Solarpunk Eden Bloom Season illustration: cherry blossom and wildflower petal
scatter, pink-blossom secondary accents, Frond mascot holding a bouquet of
spring flowers, art nouveau botanical oval frame with spring blooms.

**Override tokens**:
- `--color-secondary`: #E85FA0
- `--color-surface-alt`: #F5EAF0

---

## Seasonal variant: Midsummer Canopy (06-21..08-31)

**Prompt**:
Solarpunk Eden Midsummer Canopy illustration: peak-solar bright yellows,
sunflower and broad-leaf jungle accents, maximum warmth dappled-light overlay,
art nouveau botanical oval frame with sunflowers and broad tropical leaves.

**Override tokens**:
- `--color-bg`: #F7F2DC
- `--color-secondary`: #F2B300
