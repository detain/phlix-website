# PROMPTS.md — Chrome Velocity Image Generation Reference

> Every image asset in this site can be regenerated from the prompts below.
> Follow the kit's `image_prompt_prefix`, `image_prompt_suffix`, and `negative_prompt`
> fields exactly. Do not introduce warm tones, organic shapes, rounded corners,
> or anything that violates the brand opposites list.

---

## Image Prompt Prefix (prepend to every prompt)
```
Chrome Velocity motorsport aesthetic — carbon fiber black background,
stadium floodlights, hard directional lighting, racing red and chrome silver accents,
sharp angular geometry, high contrast, technical precision,
```

## Image Prompt Suffix (append to every prompt)
```
, dramatic motorsport atmosphere, cool color grade, dynamic diagonal composition,
cinematic quality, high detail, no warm tones, no soft edges.
```

## Negative Prompt (always include)
```
warm tones, golden hour, cozy, soft, pastel, rounded corners,
organic, nature, watercolor, hand-drawn, cartoon, childish,
lens flare (decorative), low contrast, flat lighting, lifestyle casual
```

---

## Logo
**Prompt:**
`Chrome Velocity logo: 'CHROME VELOCITY' wordmark in Barlow Condensed 800, all caps, racing red on carbon black, inside an angular parallelogram badge. Sharp, no rounding. Optional speed-line undercut.`

**Rules from kit:**
- Shape: Wordmark in Barlow Condensed 800, optionally inside an angular parallelogram badge.
- Complexity: Two-weight wordmark — 'CHROME' heavy, 'VELOCITY' slightly lighter, or single-weight all caps.
- Negative space: The angular cut of the badge does the visual work — do not crowd it.
- Colors: Racing red on carbon black, or chrome silver on carbon black. Signal white version for light backgrounds.
- Allowed symbols: checkered flag element, speed line, angular wedge, helmet visor silhouette.
- Forbidden symbols: organic shapes, film reels, circular emblems, gears without racing context.

---

## Hero Background
**Prompt:**
`{prefix} F1 race car cockpit view at 200mph, motion blur speed streaks, carbon fiber dashboard, stadium floodlights, racing red telemetry displays, dark carbon interior {suffix}`

---

## Feature Section Artwork
**Prompt:**
`{prefix} abstract technical racing livery vector illustration, data visualization overlay, checkered flag grid cells, carbon fiber panel textures {suffix}`

---

## Client Section Background
**Prompt:**
`{prefix} pit lane F1 team garage at night, stadium floodlights, carbon fiber tool chests, tire stacks, chrome helmet reflections, dramatic cool lighting {suffix}`

---

## Brand Pattern / Texture
**Prompt:**
`Carbon black background with subtle carbon fiber weave texture, faint speed-line streaks in the lower third, no warm color, cool and dark.`

---

## Social Media Graphics
**Prompt:**
`{prefix} {topic} racing-livery social graphic for Phlix: bold Barlow Condensed headline in signal white, carbon black background, racing-red accent stripe, angular badge design {suffix}`

---

## Mascot — Vector (if applicable)
The kit defines mascot `Vector`:
- Species: Anthropomorphic racing data stream / HUD silhouette
- Personality: Relentless, precise, always one lap ahead — speaks in split-times.
- Description: A sleek helmet-wearing figure built from telemetry lines and data readouts.
- Poses: Pointing ahead at full lean, arms raised on podium, crouched at race-start, reviewing telemetry on pit board.

**Prompt:**
`{prefix} Vector the racing data stream mascot: sleek helmet-wearing figure built from telemetry lines and data readouts, determined focused expression, full FIA firesuit, chrome visor showing live data, pointing forward at apex, dark carbon background, stadium floodlight {suffix}`
