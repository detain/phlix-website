# img/PROMPTS.md — Editorial Underground

## Overview
This file records the exact generation prompts used to create every image asset in this site. Each prompt is constructed from the brand kit's `image_prompt_prefix` + subject + `image_prompt_suffix` + `negative_prompt`.

---

## Brand Kit Prompt Constants

**image_prompt_prefix:**
> Punk zine illustration, high contrast black and electric yellow, xerox photocopy aesthetic, stencil and linocut style, DIY screen print, cut-and-paste collage,

**image_prompt_suffix:**
> , extreme black palette (#0A0A08), electric yellow (#FFE500) as sole accent, halftone dot screen, heavy grain, zero gradients, flat stencil rendering, underground press aesthetic, high quality.

**negative_prompt:**
> warm, golden, cozy, soft, pastel, cheerful, rounded, gradients, glow, neon ambient, photorealistic, smooth, polished, corporate, clean minimal, colorful, rainbow, friendly

---

## Asset Prompts

### Logo (`img/logo.svg`)
```
Design an Editorial Underground logo: Anton uppercase wordmark in Paper White on Xerox Black, 2px electric-yellow rectangular border, zero radius, no gradients, no rounded shapes, no warm colors.
```
Rendered as SVG — no external generation required.

---

### OG Social Card (`img/og.svg`)
```
Punk zine poster-style social graphic for Phlix media server: Anton headline in electric yellow on Xerox Black, halftone-treated key art, cut-and-paste collage composition, zero gradients, stencil illustration. Main headline: "YOUR MEDIA. YOUR LIBRARY. YOUR PHLIX."
```
Rendered as SVG — no external generation required.

---

### Background Texture (`img/background.svg`)
```
Xerox Black background with subtle halftone dot texture and faint distressed photocopy grain. No color. No warm light. No glow. No text.
```

---

### Hero Illustration Concept
```
Punk zine illustration of a media server streaming to multiple screens (Roku, TV, phone, desktop) — cut-and-paste collage, electric yellow and black only, stencil aesthetic, DIY screen print, xerox photocopy grain, high contrast, zero gradients.
```

---

### Mascot — Riot
```
DIY safety-pin-and-lightning-bolt icon character named Riot, static upright pose, safety pin locked, bolt aimed at viewer, electric yellow on black, stencil-cut, no gradients, no shading, no softness. Confrontational expression.
```

---

### Feature Icons (all 7)
Each icon rendered as inline SVG with stencil-cut style:
- **library**: Stencil-cut stacked-lines icon, Paper White stroke, electric yellow on hover.
- **syncplay**: Clock/stopwatch stencil, Paper White stroke, electric yellow on active.
- **transcode**: Box/package stencil, Paper White stroke, electric yellow on active.
- **shield**: Shield stencil, Paper White stroke, electric yellow on active.
- **antenna/signal**: Broadcast waves stencil, Paper White stroke, electric yellow on active.
- **broadcast/DLNA**: Wi-fi/signal icon, Paper White stroke, electric yellow on active.
- **puzzle**: Puzzle-piece stencil, Paper White stroke, electric yellow on active.
- **hub**: Sun/rays stencil, Paper White stroke, electric yellow on active.

All icons: 2px stroke, square caps/joins, zero corner radius, 24x24 viewBox.

---

### Landing Page Hero Concept
```
A punk zine media landing page hero: full-bleed Xerox Black background with Anton headline in electric yellow, zero-radius electric-yellow CTA button, Bleed Black card sections, diagonal slash dividers, Space Mono body copy, cut-and-paste ransom-letter typography collage.
```

---

## Notes
- All SVG assets are self-contained and require no external generation.
- Photography, when added, must be converted to near-monochrome with halftone dot screen treatment.
- No warm tones permitted. Electric yellow (#FFE500) is the sole accent.
- All visual elements earn their place by communicating — not by decorating.
