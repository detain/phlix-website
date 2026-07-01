# img/PROMPTS.md — Celtic Twilight Site Image Generation Prompts

> Every image asset that could be regenerated is documented here with the exact
> prompts used to produce it. Prompts are built from the kit's
> `image_prompt_prefix` + subject + `image_prompt_suffix` + `negative_prompt`.

## Brand Kit Reference
- **kit:** Celtic Twilight (base, v1.0)
- **image_prompt_prefix:** "Celtic twilight illustration, ancient mystical aesthetic, illuminated manuscript lineage, Pre-Raphaelite painterly depth, warm lantern-gold against cool dusk purple, vellum texture, knotwork ornamental details, atmospheric mist,"
- **image_prompt_suffix:** ", emerald green and twilight amethyst palette with ancient gold accents, peat-ink linework, organic forms, reverent mood, high quality, no neon, no sharp digital edges, no dark-fantasy grimness."
- **negative_prompt:** "neon, cyberpunk, futuristic HUD, harsh studio lighting, blue cool grade, HDR overprocessed, chrome, glossy plastic, grimdark skulls, horror imagery, corporate stock photo, flat vector with no texture, anime style, cartoon slapstick"

---

## logo.svg
**prompt:** "Design a Celtic Twilight logo: Cinzel wordmark in ancient gold on a dusk-gradient field (emerald to amethyst), knotwork corner ornaments, parchment texture, no play-button clichés, no gears."
**negative:** "play-button triangle, gear, lightning bolt, skull, grimdark imagery, neon"
**result:** `img/logo.svg` — dusk-gradient backing, Cinzel wordmark in ancient gold (#B8860B), organic knotwork corner ornaments in gold, readable at 24px+

---

## favicon.svg
**prompt:** "Simple square favicon in Celtic Twilight: emerald grove (#2D6A4F) background, a small triskelion spiral in ancient gold at centre, 32×32, no text."
**negative:** "text, play button, gear, skull, neon"
**result:** `img/favicon.svg` — 32×32 emerald square with gold triskelion spiral ornament

---

## og.svg / og.png (1200×630)
**prompt:** "A Celtic twilight landing page social card: full-bleed dusk-gradient (emerald → amethyst → deep indigo), logo/wordmark in ancient gold, headline 'Where Every Story Finds Its Fire.' in vellum, a subtle triskelion ornament at bottom, knotwork border at 6% opacity, 1200×630."
**negative:** "neon, corporate stock photo, cartoon, anime, modern digital"
**result:** `img/og.svg` (source) — rendered to `img/og.png` (1200×630 raster)

---

## Feature Icons (7 inline SVGs — hand-crafted to match icon style)
**icon style rules from kit:**
- Outlined, rounded, hand-drawn, organic
- 1.5–2px stroke weight with rounded caps and joins
- Single-color default (peat ink #2C2010 or emerald #2D6A4F); duotone for featured/hero
- Icons may incorporate subtle spiral or knotwork details at larger sizes
- At 16px and below: simplify to essential silhouette only
- Never sharp-cornered or purely geometric

### icon-library.svg (Library / folder organization)
**prompt:** "Hand-drawn outlined icon of open book or folder with cascading pages, 1.5px organic peat-ink stroke, rounded ends, subtle Celtic spiral detail, single-color."
**result:** `img/icon-library.svg`

### icon-syncplay.svg (SyncPlay)
**prompt:** "Hand-drawn outlined icon of two screens or devices in sync with a small glowing triskelion between them, 1.5px organic peat-ink stroke, rounded ends, emerald and gold duotone."
**result:** `img/icon-syncplay.svg`

### icon-transcode.svg (Transcoding)
**prompt:** "Hand-drawn outlined icon of a film strip being transformed/encoded — arrows or wave patterns suggesting quality selection, 1.5px organic peat-ink stroke, rounded ends."
**result:** `img/icon-transcode.svg`

### icon-shield.svg (Auth / security)
**prompt:** "Hand-drawn outlined shield icon with a lock or key inside, 1.5px organic peat-ink stroke, rounded ends, emerald tint."
**result:** `img/icon-shield.svg`

### icon-antenna.svg (Live TV / broadcast)
**prompt:** "Hand-drawn outlined antenna or aerial with broadcast waves, 1.5px organic peat-ink stroke, rounded ends, subtle knotwork curl at base."
**result:** `img/icon-antenna.svg`

### icon-broadcast.svg (DLNA)
**prompt:** "Hand-drawn outlined DLNA/broadcast icon: a device emitting signal waves to multiple receivers, 1.5px organic peat-ink stroke, rounded ends, emerald tint."
**result:** `img/icon-broadcast.svg`

### icon-puzzle.svg (Plugins)
**prompt:** "Hand-drawn outlined puzzle piece with a Celtic knot detail, 1.5px organic peat-ink stroke, rounded ends, single-color."
**result:** `img/icon-puzzle.svg`

### icon-hub.svg (Phlix Hub)
**prompt:** "Hand-drawn outlined network hub icon: a central node with radiating connection lines, all with organic rounded ends, 1.5px organic peat-ink stroke, a tiny triskelion at the centre."
**result:** `img/icon-hub.svg`

---

## Hero Illustration (CSS/SVG — not raster)
Until real renders exist, the hero section uses pure CSS/SVG gradient artwork (the `gradient-dusk` background + atmospheric radial gradients). The exact visual is described by:
**prompt:** "A Celtic twilight hero scene: full-bleed dusk gradient (emerald green fading through twilight amethyst to deep indigo), standing stone silhouettes at the lower third, a slow-rising mist effect using CSS radial gradients, knotwork SVG border framing the content at 4% opacity, lantern-gold glow behind the headline, 16:9 aspect ratio."
**negative:** "neon, photorealistic people, harsh rim lighting, flat digital, grimdark skulls"
