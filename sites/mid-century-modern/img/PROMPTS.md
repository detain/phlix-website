# img/PROMPTS.md — Mid-Century Modern Brand Kit Image Generation Prompts

> Use these exact prompts to regenerate any image asset for the Mid-Century Modern Phlix site.

## Brand Identity Seed

**image_prompt_prefix (prepend to EVERY image):**
```
Mid-century modern flat geometric illustration, Saul Bass style, atomic age,
1950s-60s design, warm atomic teal and sunburst yellow on very dark charcoal,
clean vector shapes, optimistic Space Age aesthetic,
```

**image_prompt_suffix (append to EVERY image):**
```
, warm charcoal palette (charcoal evening, atomic teal, sunburst yellow,
atomic coral, cream card), clean geometric composition, Kodachrome warmth,
high quality, optimistic mood.
```

**Negative prompts:**
```
noir, dark gritty, neon cyberpunk, cold blue, horror, grungy,
vintage-washed brown, maximalist, ornate baroque, corporate flat,
cold clinical white, harsh shadows, moody, ironic kitsch,
```

---

## Logo (`img/logo.svg`)

**Prompt:**
```
Design a Mid-Century Modern logo: Josefin Sans semibold uppercase wordmark in
cream-card (#F5EFE8) on charcoal-evening (#111008), optional 1px atomic-teal
soft-cornered rectangular border, sunburst companion mark, no cold colours,
no sharp unrounded corners.
```

**Rules applied:**
- Wordmark: Josefin Sans semibold uppercase, cream-card on charcoal-evening
- Companion mark: atomic-teal orbital ring with sunburst ticks
- No script, gothic, cold-blue neon, or dark gritty treatments
- Generous negative space — dark ground is intentional

---

## Favicon (`img/favicon.svg`)

**Prompt:**
```
Clean geometric square favicon: atomic teal (#00AFAF) circular orbital ring
on charcoal evening (#111008) ground. Simple sunburst tick marks, cream-card
center dot. 32×32 viewBox, rounded corners. Minimalist Mid-Century Modern.
```

---

## OG Social Share Image (`img/og.svg`)

**Prompt:**
```
A mid-century modern social share card (1200×630): Josefin Sans wordmark
"PHLIX" in cream-card on charcoal evening, atomic teal sunburst radial glow
top-right, sunburst yellow horizontal rule, tagline "The Future Was Always
Now." in atomic teal, product descriptor in warm tan linen, geometric
boomerang/sunburst accent elements, atomic horizon gradient (teal to yellow)
accents. Clean, optimistic, Saul Bass-inspired layout.
```

---

## Hero SVG Background (inline in index.html)

**Prompt:**
```
Charcoal evening (#111008) background with a subtle sunburst radial glow in
atomic teal from one corner. Warm, clean, geometric Mid-Century Modern
composition with a single sunburst/boomerang motif. No cold light. No text.
Decorative only.
```

---

## Feature Icons (inline SVGs in HTML)

**Prompt:**
```
Clean geometric outlined icon of {subject}, 1.5px stroke, cream-card (#F5EFE8),
soft round joins (6px radius), atomic-teal active state, Mid-Century Modern
aesthetic. One read, instantly readable — Saul Bass simplicity.
```

7 feature icons: library, syncplay, transcode, shield, antenna, broadcast, puzzle, hub

---

## CSS Decorative Patterns

### Sunburst / Starburst Lines
```css
/* Radiating line motif — use as section dividers and corner accents */
.sunburst-line {
  background: conic-gradient(
    from 0deg,
    transparent 0deg,
    #00AFAF 5deg,
    transparent 10deg,
    transparent 30deg,
    #F2B705 35deg,
    transparent 40deg
  );
  /* 12 rays, each 30deg sector, teal + yellow accent rays */
}
```

### Atomic Orbital Ring Decoration
```css
/* Circular orbital ring with dot center — used in cards, empty states */
.orbital-ring::before {
  content: '';
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  border: 1.5px solid var(--color-primary);
  opacity: 0.6;
}
```

---

## Photography Style Guidance

- **Kodachrome warmth**: All photography graded warm-teal + warm-yellow, never orange-teal Hollywood LUT
- **Settings**: Mid-century interiors — Eames chairs, walnut panelling, clerestory light
- **Subjects**: Optimistic, forward-looking, confident — never pensive or brooding
- **Avoid**: Contemporary interiors, digital-era visual cues, cold blue tones

---

## All image_prompt_prefix + subject + image_prompt_suffix combinations

| Asset | Subject |
|-------|---------|
| Logo | "Mid-Century Modern Phlix brand logo with sunburst orbital ring" |
| Favicon | "Atomic teal orbital ring favicon on charcoal" |
| OG image | "Mid-Century Modern social share card for Phlix media server" |
| Hero bg | "Warm charcoal evening with atomic teal sunburst radial glow" |
| Feature icon | "{Library, SyncPlay, Transcode, Shield, Antenna, Broadcast, Puzzle, Hub} feature icon" |
