# img/PROMPTS.md — Venetian Masquerade image generation prompts

> Use these exact prompts to regenerate every image asset for this brand kit.
> Format: `{image_prompt_prefix} {subject} {image_prompt_suffix}`
> All negatives from `brandKit.negative_prompt` apply to every generation.

## Logo

**Primary wordmark lockup**
```
Baroque Venetian carnival illustration, candlelit chiaroscuro, deep midnight-blue
and crimson velvet palette, burnished gold filigree ornamentation, semi-realistic
oil-painting rendering, rich jewel tones, heavy atmospheric shadow,
"Phlix" in Cinzel Decorative typeface, pearl ivory letters on midnight velvet
background, ornate gilded oval cartouche with scroll flourishes, symmetric
Baroque flourish ornaments on sides, elegant theatrical mood,
deep indigo background, pearl ivory highlights, ornate gilded frame composition,
peacock feather accents, theatrical and mysterious mood, high detail, masterwork quality.
```
Negative: flat design, pastel, minimalist, white background, bright daylight, neon, cyberpunk, cartoon, childish, modern sans-serif UI, cool blue light, HDR glare, lens flare, stock photography, cheerful / saccharine, corporate office aesthetic

---

## Favicon

**32×32 Venetian mask favicon**
```
Baroque Venetian carnival illustration, candlelit chiaroscuro, deep midnight-blue
and crimson velvet palette, burnished gold filigree ornamentation, semi-realistic
oil-painting rendering, rich jewel tones, heavy atmospheric shadow,
a miniature volto mask with eye apertures, pearl ivory base with gold filigree
outline, crimson accent on mask, gothic architectural frame, theatrical and
mysterious mood, high detail, masterwork quality.
```
Negative: flat design, pastel, minimalist, white background, bright daylight, neon, cyberpunk, cartoon, childish, modern sans-serif UI, cool blue light, HDR glare, lens flare

---

## OG Image (1200×630)

**Social share card — full hero composition**
```
Baroque Venetian carnival illustration, candlelit chiaroscuro, deep midnight-blue
and crimson velvet palette, burnished gold filigree ornamentation, semi-realistic
oil-painting rendering, rich jewel tones, heavy atmospheric shadow,
large theatrical scene: a gilded Venetian mask centered, candelabra flanking,
gondola prow curves bottom corners, draped crimson velvet curtains at sides,
midnight canal visible at bottom, ornate Baroque frame composition, pearl ivory
and gold color scheme, peacock feather accents in corners, theatrical and mysterious
mood, high detail, masterwork quality.
```
Negative: flat design, pastel, minimalist, white background, bright daylight, neon, cyberpunk, cartoon, childish, modern sans-serif UI, cool blue light, HDR glare, lens flare, stock photography, cheerful / saccharine, corporate office aesthetic

---

## Feature icons (inline SVG)

Each icon: fine 1.5px stroke, ivory (#F2EDDF) on dark, goldsmith precise.
Drawn as inline SVG, not generated.

- **Library**: 3 horizontal lines (bookshelf rows), fine 1.5px stroke
- **SyncPlay**: Circle with clock hands at 4 o'clock
- **Transcode**: Hexagonal gem/diamond shape
- **Auth/Shield**: Classic shield with internal detail
- **Live TV/Antenna**: Broadcast/antenna radiating lines
- **DLNA/Broadcast**: Wifi-like broadcast waves
- **Plugins/Puzzle**: 2-piece puzzle with ornate edge
- **Hub**: Central circle with radiating lines (starburst)

---

## Hero artwork concept

```
Baroque Venetian carnival illustration, candlelit chiaroscuro, deep midnight-blue
and crimson velvet palette, burnished gold filigree ornamentation, semi-realistic
oil-painting rendering, rich jewel tones, heavy atmospheric shadow,
a glamorous masked figure in Baroque finery (crimson velvet cloak, gold trim,
peacock feather headdress) gestures grandly toward an ornate gilded frame that
holds a shimmering canal scene, draped curtains on either side, Murano glass
chandelier above casting warm amber light, ornate arched window frame revealing
a moonlit gondola on still canal waters, theatrical and mysterious mood,
deep indigo background, pearl ivory highlights, ornate gilded frame composition,
high detail, masterwork quality.
```

---

## CSS/SVG artwork notes

All background gradients are achieved via CSS (no raster needed):
- Hero: `radial-gradient` candle glow + layered `linear-gradient` midnight canal
- Cards: `linear-gradient(180deg, #0E0A1A, #1A1230)`
- CTA banner: `linear-gradient(135deg, #8B1A1A, #C9922E)` with radial gold overlay

Baroque mask silhouette accents: inline SVG paths in hero and section dividers.
No raster images needed for decorative elements — pure CSS/SVG implementation.
