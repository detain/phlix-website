# img/PROMPTS.md — Marble Atrium brand kit

> Exact prompts that regenerate every raster image asset from the marble-atrium.js kit.
> Until real renders exist, CSS/SVG-only artwork is used. These prompts guide future AI artwork generation.

---

## Image Prompt Construction

**Prefix** (prepend to every prompt):
```
Luxury hotel grand atrium interior aesthetic, cool diffused daylight through glass ceiling,
white Carrara marble surfaces, champagne gold architectural details, deep botanical green accents,
editorial minimalism, fine architectural line quality,
```

**Suffix** (append to every prompt):
```
, marble white background, near-neutral colour palette (ivory, stone grey, gold, deep green),
exquisite negative space, impeccable composition, high resolution editorial photography style.
```

**Negative prompts** (things to avoid):
```
warm golden hour, neon, cyberpunk, cartoonish, busy background,
high saturation, warm tones, rust

ic, cozy casual, film grain, lens flare, HDR, dark moody horror,
clutter, maximalist, retro, vintage, playful, childlike
```

---

## Logo

**Primary wordmark lockup**
```
Prompt: Marble Atrium wordmark in Cormorant Garamond Light, all-caps, tracking 0.3em,
jet black on marble white, flanked by 1px hairline rules above and below.
No icon, no gradient, no warmth.
```
Style: vector, single ink on white, architectural precision.
Colors: Jet Black (#0F0F0E) on Marble White (#F7F5F2).

---

## Background

**Marble surface background**
```
{prefix} Marble-white architectural background with a faint Carrara veining pattern in
pale grey, no warm tones, cool diffused light from above, extreme simplicity {suffix}
```
Style: subtle texture, nearly flat, cool neutral.
Use: CSS/SVG marble veining as background motif on hero sections.

---

## Hero Artwork

**Glass-ceiling atrium hero**
```
{prefix} Wide-angle architectural interior shot of a grand hotel atrium with soaring
glass ceiling, white Carrara marble floors, cool diffused daylight flooding through
overhead, single orchid arrangement in focus against blurred marble background,
champagne gold elevator doors in far background, extreme negative space {suffix}
```
Style: architectural photography, Julius Shulman / Slim Aarons aesthetic.
Composition: low horizon, subject occupies ≤40% of frame, single editorial focal point.

---

## Botanical Divider

**Deep-green leaf silhouette divider**
```
{prefix} Fine-line botanical illustration of a single deep botanical green leaf
silhouette in the style of Victorian natural history plates, single ink on white,
luxury hotel collateral aesthetic {suffix}
```
Style: fine-line illustration, single-ink, no fills.

---

## Photography — Stock Imagery Direction

All photography must follow:
- Cool diffused daylight (no golden hour, no warm artificial light)
- Near-neutral or desaturated colour grading
- Marble, linen, or stone backgrounds — never busy environments
- Editorial talent styling (poised, never candid-casual)
- Wide-angle architectural interiors preferred

**Example shot — library/cinema room:**
```
{prefix} Wide shot of a sophisticated home cinema or library room with warm-neutral
toning removed, cool overcast light through tall windows, white marble surfaces,
polished brass details, deep botanical green plant accents, minimal furnishings,
editorial luxury publication style {suffix}
```

---

## UI Generation Rules (for reference)

From kit §16:
- Marble White (#F7F5F2) background on every surface.
- Champagne Gold is the single accent — use once per view.
- Typography does the heavy lifting: use size, weight, and tracking over colour.
- Corner radius maximum 4px except pills (search bars, badges only).
- Shadows are barely visible — maximum 14% opacity neutral-cool.
- Max content width 1280px; generous side padding (min 48px).
- Spacing scale increments: 4, 8, 16, 32, 64.
- No more than two accent colours visible simultaneously.

---

## Icon Generation

**General icon prompt template:**
```
{prefix} Minimal thin-line icon of {subject}, 1.5px stroke, single jet-black colour,
geometric precision, no fill, no rounded cartoon corners, 24×24px canvas {suffix}
```

**Feature icons (7 total):**
- library: open book / shelf icon
- syncplay: play circle with sync arrows
- transcode: code/brackets / quality wave
- auth/shield: shield with checkmark
- livetv/antenna: broadcast antenna
- dlna/broadcast: screen with signal waves
- plugins/puzzle: puzzle piece
- hub: network/relay globe

All icons: 1.5px stroke weight, outlined, geometric, Jet Black, minimum 24×24px.
