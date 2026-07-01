# Image Generation Prompts — Ice Cathedral

These prompts can regenerate every visual asset for the Ice Cathedral brand kit site.
All prompts follow the kit's `image_prompt_prefix` → `{subject}` → `image_prompt_suffix` template
and incorporate the full `negative_prompt` list.

---

## Logo (`img/logo.svg`)

**Prompt:**
```
Polar gothic Ice Cathedral logo: Cinzel wordmark in arctic-white on polar-night,
optional 1px crystal-ice-blue sharp rectangular border, pointed-arch decorative
element, no warm colors, no rounded shapes.
```
**Negative prompt:** warm, golden hour, sunshine, cozy, cheerful, green wilderness, tropical, fire, orange, red accents, playful, cartoonish, rounded bubbles, corporate clean, iridescent tech, neon city.

---

## Hero Illustration (`index.html` hero background)

**Prompt:**
```
Polar gothic illustration, ice cathedral architecture, cold blue interior light,
ancient glacier, crystal refraction, vaulted ice arches, gothic geometry in ice,
a lone figure standing before a vast vaulted ice cavern, shafts of cold blue light
descending from above, polar night darkness surrounding, frost crystal lattice
details, high contrast, architectural sublime, cold and majestic.
```
**Negative prompt:** warm, golden hour, sunshine, cozy, cheerful, green wilderness, tropical, fire, orange, red accents, playful, cartoonish, rounded bubbles, corporate clean, iridescent tech, neon city.

---

## Feature Icons (7 inline SVGs — library, syncplay, transcode, shield, antenna, broadcast, puzzle, hub)

**Prompt:**
```
Sharp outlined minimal icon of {subject}, 1px stroke, arctic-white,
no rounded joins, crystal-ice-blue active state, gothic-architectural aesthetic.
```
Individual icon subjects: library (layers/list), syncplay (clock + sync), transcode (cube/process), shield (security), antenna (broadcast/tv), broadcast (signal/waves), puzzle (plugin), hub (network nodes).
**Negative prompt:** warm colors, rounded playful icons, filled icons, organic curves.

---

## Background Texture (`*` page backgrounds)

**Prompt:**
```
Polar-night background with subtle frost-crystal lattice texture and faint
crystal-ice-blue radial glow from center. No warm light. No text.
```
**Negative prompt:** warm, golden, sunshine, cozy, cheerful, green wilderness.

---

## Landing Page Hero (`index.html`)

**Prompt:**
```
A polar gothic media landing page: full-bleed ice-cave hero with Cinzel headline,
crystal-ice-blue CTA button, ice-cave-depth card sections, frost-lattice dividers,
crystal-ice-blue and deep-aurora-blue accent elements, gothic arch motifs.
```
**Negative prompt:** warm, golden hour, sunshine, cozy, cheerful, green wilderness, tropical, fire, orange, red accents, playful, cartoonish, rounded bubbles, corporate clean.

---

## Dashboard (`*` if future dashboard page)

**Prompt:**
```
A dark media dashboard on polar-night with Josefin Sans ultralight crystal-ice-blue
stats, ice-cave-depth cards with subtle internal-ice glow, sharp corners,
JetBrains Mono for secondary data.
```
**Negative prompt:** warm colors, rounded corners, playful UI, pastel tones.

---

## Marketing / Social Graphics (`*`)

**Prompt:**
```
A polar gothic poster-style social graphic for {topic}: Cinzel headline in arctic-white,
cold ice-cave atmospheric key art, crystal refraction light, gothic arch framing,
high-contrast cold composition.
```
**Negative prompt:** warm, golden hour, sunshine, cozy, cheerful, green wilderness, tropical, fire, orange, red accents, playful, cartoonish, rounded bubbles, corporate clean, iridescent tech, neon city.

---

## Mascot — Crystal

Crystal is a translucent geometric ice formation — a permanent snowflake. The mascot should never be invented if `mascot: null` — but Ice Cathedral has a mascot:

**Prompt (Crystal):**
```
A translucent geometric ice formation, a permanent snowflake, ancient and patient,
lit from within by pale ice-blue light, casting refracted light patterns,
appearing in a polar night void, slow crystalline presence, serene and monumental.
```
**Negative prompt:** warm, golden, sunshine, cheerful expressions, organic nature forms, playful character design, rounded soft edges.
