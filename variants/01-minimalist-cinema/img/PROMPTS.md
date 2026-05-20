# Image Prompts for 01-minimalist-cinema

This document describes the AI image generation prompts for producing visual assets to replace the SVG placeholders in this variant.

Source: `phlix-server/docs/brand/svg_prompts.md` — Concept 1: Minimalist Cinema Icon

---

## Logo (logo.svg)

**Status**: SVG placeholder — ready for AI generation

**Primary prompt**:
```
Create a clean vector logo for "Phlix". Use a bold geometric sans-serif font.
Transform the letter "X" into a stylized film-strip shape with two diagonal bars
containing small circular sprocket holes. The "X" should also subtly resemble a
play button formed by negative space. Use flat colors, sharp edges, and modern
minimalist design. No gradients. High contrast. Professional streaming-platform look.

Colors: Electric Blue #2D9CFF, Charcoal #1A1A1A, White #FFFFFF
```

**Style modifiers**:
- flat icon style
- clean vector lines
- high readability
- tech startup aesthetic

**Variations**:
- Make the X glow slightly with neon aqua
- Use a rounded font instead of geometric
- Add a thin underline under the wordmark

---

## Favicon (favicon.svg)

**Status**: SVG placeholder — ready for AI generation

**Primary prompt**:
```
Square app icon with rounded corners. Centered stylized "X" film-strip symbol
from the Phlix logo. Electric Blue background (#2D9CFF), white icon lines,
minimalist vector style.
```

---

## Open Graph Image (og.svg)

**Status**: SVG placeholder — ready for AI generation

**Primary prompt**:
```
Create a clean vector logo for "Phlix" with the tagline "Your Media. Your Way."
Place the tagline centered beneath the wordmark in a thin sans-serif font.
Use a bold geometric font for "Phlix". Transform the letter "X" into a stylized
film-strip shape with diagonal bars and small circular sprocket holes.
Flat colors, sharp edges, minimalist streaming-platform aesthetic.

Colors: Electric Blue #2D9CFF, Charcoal #1A1A1A, White #FFFFFF
```

**Dimensions**: 1200x630 (standard Open Graph image)

**Style modifiers**:
- clean vector illustration
- modern tech branding
- high contrast
- film/cinema aesthetic

---

## Hero Background (hero-bg.*)

**Status**: Not yet created — optional enhancement

**Primary prompt**:
```
Dark charcoal abstract background with subtle film strip patterns.
Minimalist design, high contrast, modern streaming platform aesthetic.
Electric blue accent elements. No gradients, flat design.

Colors: Charcoal #1A1A1A, Electric Blue #2D9CFF
```

**Recommended format**: SVG or WebP
**Recommended dimensions**: 1920x1080 or larger

---

## Feature Icons

Each feature icon is currently using inline SVG paths. AI-generated alternatives:

| Feature | Prompt |
|---------|--------|
| library | Clean minimalist icon of stacked media shelves or folder |
| syncplay | Two circular arrows with play symbols, synchronized |
| transcode | Wrench and film strip transformation icon |
| shield | Lock/shield with media protection motif |
| antenna | Broadcast/antenna with signal waves |
| broadcast | Multiple devices receiving content |
| puzzle | Interlocking puzzle piece with media motif |
| hub | Central hub with connection spokes |

**Style**: Thin-line icons, rounded corners, geometric shapes, flat (matching brand iconography)

---

## Implementation Notes

1. After generating images, save them to `img/` directory
2. Replace SVG placeholders with generated images
3. Ensure all images have proper alt text in HTML
4. Optimize images for web (compress WebP/PNG)
5. Maintain consistent color palette from brand kit

## Color Palette (Reference)

| Name | Hex | Usage |
|------|-----|-------|
| Electric Blue | #2D9CFF | Primary brand color, accents |
| Charcoal | #1A1A1A | Text, dark backgrounds |
| White | #FFFFFF | Backgrounds, contrast |
| Slate Gray | #2E2E2E | Secondary text |
| Soft Blue | #A7D8FF | Hover states, highlights |
| Neon Aqua | #00F0FF | Accent highlights |
