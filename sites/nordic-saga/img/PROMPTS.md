# img/PROMPTS.md — Nordic Saga Image Generation Prompts

> Exact prompts used to (re)generate every raster image asset for the Nordic Saga brand kit.
> Copy each prompt verbatim into your image generation tool.

---

## Image Prompt Base (prepend to every prompt)

```
Norse mythology epic illustration, Viking Age aesthetic, dark winter fjord
background, forge-fire orange warm light against cold blue-black sky,
knotwork interlace, runestone carved texture,
```

## Image Prompt Suffix (append to every prompt)

```
, dark Nordic palette (fjord-night #060C12, forge-fire #C8700A, fjord-steel #4A8FB5,
rune-violet #8B6DC8, bone-white #E8E0D0), bold carved line work, epic mythological
scale, high quality, saga-weight composition.
```

## Negative Prompt (things to avoid in every generation)

```
warm golden hour, summer, tropical, Celtic, cheerful, pastel,
soft, cozy, modern, futuristic, urban, neon city, sci-fi,
cartoonish, anime, cute, round bubbly shapes, corporate clean
```

---

## Logo

```
Design a Nordic Saga logo: Cinzel bold wordmark in Bone White on fjord-night,
optional 1px Forge Fire knotwork-edged border, sharp corners, no warm softness,
no rounded modern letterforms, Norse mythological weight.
```

**Colors:** bone-white #E8E0D0 wordmark on fjord-night #060C12. Forge-fire #C8700A knotwork border accent.

---

## Hero Illustration

```
Norse mythology epic illustration, Viking Age aesthetic, dark winter fjord background,
forge-fire orange warm light against cold blue-black sky, knotwork interlace, runestone
carved texture, dramatic longship silhouette parting storm-dark fjord waters, ravens
of Odin circling a forge fire on the shore, {mood: epic and weighty}, set against a Norse
winter fjord or mythological landscape.
Suffix: See base suffix above.
```

**Mood:** epic, primordial, weighty, ancient

---

## Background Texture

```
Fjord-night background (#060C12) with subtle knotwork texture at low opacity
and a faint forge-fire radial glow in one corner. No warm fill. No text.
```

**Mood:** subtle, structural, winter dark with forge warmth

---

## Feature Illustrations (repeat template for each feature)

```
Norse mythology epic illustration, Viking Age aesthetic, dark winter fjord
background, forge-fire orange warm light against cold blue-black sky, knotwork
interlace, runestone carved texture, {feature_subject} in the Nordic saga style,
{mood: powerful and mythic}, set against a Norse winter fjord or mythological
landscape. Suffix: See base suffix above.
```

**Feature subjects:**
- Library: ancient runestones arranged as library shelves, carved rune letters glowing
- SyncPlay: two ravens alighting on a longship mast, eyes locked, simultaneous movement
- Transcoding: a forge where molten metal is being shaped into perfect geometric forms
- Auth: Odin's ring on a rune-carved altar, two ravens guarding
- Live TV: Viking carved runestone depicting a feast hall with a blazing hearth
- DLNA: interconnected ravens forming a web of connectivity, Nordic knotwork lines
- Plugins: runestones slotting together like puzzle pieces, forge fire between them
- Hub: a raven perched atop Yggdrasil's branch, stretching across a vast fjord

---

## Client Cards Art

```
Nordic saga poster-style illustration: {client_name} rendered in runestone-carved
style, set in a dark Norse hall with forge-fire accent lighting, knotwork border,
cold fjord-steel highlights, epic composition. Background is fjord-night #060C12.
Forge fire #C8700A is the dominant accent, fjord-steel #4A8FB5 the secondary.
No warm golden tones. No Celtic imagery.
```

---

## Marketing Social Graphics

```
A Nordic saga poster-style social graphic for {topic}: Cinzel headline in
Forge Fire, dark mythological key art, winter fjord, knotwork border,
high-contrast epic Norse composition. Background #060C12, primary accent
#C8700A, secondary accent #4A8FB5, tertiary #8B6DC8.
```

---

## Loading Screen / Empty State (Huginn the Raven)

```
A stylized raven rendered in geometric Nordic knotwork: angular body of
fjord-night dark (#060C12), wings traced in interlaced fjord-steel (#4A8FB5)
lines, a single forge-fire (#C8700A) eye that glows like an ember. Huginn
perched on a runestone, feathers ruffled against winter wind. Background:
deep fjord night with subtle forge-fire radial glow. No warm tones beyond
the single ember eye. High contrast, carved-line aesthetic.
```

---

## Dashboard Illustration

```
A dark Norse-themed media dashboard on fjord-night (#060C12) with Cinzel
forge-fire stats (#C8700A), storm-sea cards (#0A1320) with subtle forge-glow
edges, sharp knotwork-bordered panels, Source Code Pro for secondary data.
Epic Nordic aesthetic, high contrast, no warmth beyond the forge fire accents.
```

---

## UI Icon Generation Rules

- Background is always fjord-night (#060C12) or storm-sea (#0A1320)
- Forge Fire (#C8700A) is the single primary accent — one dominant CTA per screen
- Sharp corners (2px radius) except where knotwork forms require organic curves
- Use the spacing scale; dark surfaces need generous space to feel carved, not cramped
- Max content width 1400px
- All text must meet WCAG AA against its dark background
- Knotwork borders and rune-style dividers are decorative but purposeful, never wallpaper
