# img/PROMPTS.md — Cosmic Horror Brand Kit

> Exact prompts to (re)generate every image asset. Run with your preferred image model.

## Image Generation Philosophy

The Cosmic Horror aesthetic is constructed from the precise tension between **absolute darkness**
and the **unsettling wrongness of phosphorescent green**. Every image must extend the sense that
what you are watching exists in a context larger and older than human experience.

Color palette:
- Cosmic Void: `#04000A` — the darkness between stars
- Eldritch Green: `#00CC66` — phosphorescent, biological, wrong
- Void Purple: `#3D0080` — the space between galaxies
- Corrupted White: `#C8D8C0` — the colour of text read by wrong light

Lighting: cold, phosphorescent, bioluminescent. No warm tones. Shadows are absolute.

---

## Logo (`img/logo.svg`)

**Prompt:**
```
Design a Cosmic Horror logo: Cinzel bold wordmark in Corrupted White (#C8D8C0) on
Cosmic Void (#04000A), optional 1px eldritch-green (#00CC66) rectangular border,
sharp corners, eldritch sigil monogram device at top (cyclopean arch + single
unblinking eye), no warm colours, no rounded forms, ancient monumental aesthetic,
void-black background, phosphorescent green accents.
```

**Negative prompt:**
```
warm, golden hour, daylight, sunshine, cozy, cheerful, playful, cute, cartoonish,
bright colours, pastel, soft, neon lights, modern, chrome, futuristic, fantasy
elf, heroic fantasy, friendly monster, comedy horror, campy, rounded, play
button
```

**Style notes:** Wordmark "PHLIX" in Cinzel 700, tracked wide (0.05em), Corrupted White.
Sigil above wordmark: cyclopean arch + eye motif in Eldritch Green. Sharp 1px border.

---

## Favicon (`img/favicon.svg`)

**Prompt:**
```
Sharp square favicon: Cinzel bold letterform 'P' or sigil on void-black (#04000A)
background, 1px eldritch-green (#00CC66) border, no rounded corners, only the
essential mark, no ornament.
```

**Negative prompt:**
```
rounded, playful, cartoonish, warm colours, sunlight, gradient background
```

---

## Hero artwork (background for `index.html`)

**Prompt:**
```
Lovecraftian cosmic horror illustration: cyclopean stone architecture receding
into void-black depths, lit only by sickly green phosphorescence of things
that should not illuminate anything, tentacular forms implied at composition's
extreme edge, never centered, deep-ocean or ancient ruin, academic engraving
style, non-Euclidean geometry, absolute shadows, no warm tones, 4K detail,
high contrast, void-black (#04000A), eldritch-green (#00CC66), void-purple
(#3D0080), cold phosphorescent light, genuinely unsettling, deep-ocean bioluminescent.
```

**Negative prompt:**
```
warm, golden hour, daylight, sunshine, cozy, cheerful, playful, cute, cartoonish,
bright colours, pastel, soft, neon lights, modern, chrome, futuristic, fantasy
elf, hero subject, centered subject, warm green, lime, yellow, inviting,
comfortable
```

**Usage:** As CSS radial gradient + SVG composition in hero. Do not ship as large raster image.

---

## Feature section backgrounds

**Prompt:**
```
Cyclopean stone wall at deep-ocean depth, near-total darkness, single
phosphorescent green bioluminescent crack of light, Gothic arch proportion,
etched stone texture, 19th-century scientific engraving style, absolute black
and eldritch green only, cold, institutional, ancient, unsettling.
```

---

## Section divider ornaments

**Prompt:**
```
Lovecraftian manuscript illumination: eldritch sigil border ornament in
phosphorescent green (#00CC66) on near-black (#04000A), non-repeating tentacle
form, medieval manuscript tradition corrupted by the Mythos, the scribe's hand
trembled, sharp corners, no warmth, archaic academic aesthetic.
```

---

## Client card key art (clients.html)

**Prompt:**
```
Dark theatrical key art: cyclopean void-black stage, single eldritch-green
phosphorescent spotlight, subtle tentacular shadow at frame edge, the feel of
a deep-ocean submersible porthole, no warm light, sharp composition, high
contrast, deep void, institutional gravity.
```

---

## About page / footer atmosphere

**Prompt:**
```
Ancient forbidden library interior: cyclopean stone shelves extending beyond
visible architecture, void-black depths, single phosphorescent green light
source of wrong quality, medieval manuscript fragments visible, the weight of
knowing too much, absolute silence, no warm tones.
```

---

## HUD / UI mockup assets (if applicable)

**Prompt:**
```
Lovecraftian cosmic horror media player UI on void-black (#04000A), Cinzel
display numerals in eldritch-green (#00CC66), R'lyeh Dark (#080014) panels,
Obsidian Veil (#1A0A2E) borders, phosphorescent green glow on hover, dense
academic instrument panel aesthetic, the feeling of an expedition vehicle
that has returned from somewhere it was not supposed to go.
```

---

## Seasonal variant: "The Stars Are Right" (October)

**Prompt:**
```
As above but intensified: all eldritch-green glow effects doubled in intensity,
cyclopean stone texture more pronounced, Nyarla (ever-shifting eldritch
silhouette, tentacles implied at periphery, internal green glow) appears at
frame edge, the atmosphere of a ritual that is close to completion, October
darkness.
```

**Override:** `#{color-primary}: #00FF77`, `#{color-secondary}: #5500AA`
