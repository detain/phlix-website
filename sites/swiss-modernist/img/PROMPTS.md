# img/PROMPTS.md — Swiss Modernist Brand Kit

> Exact prompts used to generate every image asset in this brand-kit site.
> These can be re-run with an AI image generator to reproduce or vary the originals.

---

## Logo

**Prompt:**
Swiss International Typographic Style logo, Inter Black wordmark in Ink Black (#121212) on Grid White (#F8F8F4), optional 1px Ink Black rectangular border, 0px radius, no color, no symbols, with a 2px Basel Red (#E8001C) rule beneath in full lockup only. Maximum simplicity — wordmark only. Type IS the logo. Generous negative space as structure. High contrast, professional, grid-aligned.

**Negative prompt:**
warm, cozy, playful, rounded, soft, colorful, gradient, texture, shadow, glow, neon, dark background, decorative, illustration with character, mascot, friendly, cute, fun, organic shapes, handwritten, sketch, brushstroke

**Output:** `img/logo.svg`

---

## Favicon

**Prompt:**
Swiss Modernist favicon, square format, simple P letterform in Inter Black on Basel Red (#E8001C) background, 0px radius, flat vector, high contrast.

**Negative prompt:**
rounded, gradient, shadow, glow, decorative, colorful beyond red/black/white, 3D, photorealistic

**Output:** `img/favicon.svg`

---

## OG Image (1200×630)

**Prompt:**
Swiss Modernist social sharing image, 1200x630, flat graphic, Grid White (#F8F8F4) background, oversized Inter Black headline text as the visual field, 4px Basel Red (#E8001C) rule beneath headline, strict grid alignment, zero decoration, single Basel Red accent element, high contrast, professional typographic poster style.

**Negative prompt:**
illustration with character, mascot, rounded shapes, gradient backgrounds, warm tones, decorative elements, texture, shadow, glow, photographic, cinematic, decorative typography

**Output:** `img/og.svg` (rasterize to `og.png` for production use)

---

## Feature Icons (inline SVG)

All feature icons are inline SVGs drawn to match the Swiss Modernist icon system:
- **Style:** Outlined, Sharp, Geometric, Minimal
- **Stroke:** 1.5px–2px, sharp caps and mitered joins
- **Corners:** Zero border radius — all right angles
- **Color:** Ink Black (#121212) default; Basel Red (#E8001C) for active/selected only
- **Grid alignment:** 8px base unit, icon grids align to 8px

### Icon List

| ID | Subject | Swiss Modernist Icon Prompt |
|----|---------|---------------------------|
| library | 2×2 grid of squares | Sharp outlined icon of a 2x2 grid, 1.5px stroke, Ink Black, no rounded joins, 0px radius |
| syncplay | Clock/sync symbol | Sharp outlined circle with clock hands, 1.5px stroke, Ink Black, no rounded joins |
| transcode | Stacked layers | Sharp outlined stacked layers, 1.5px stroke, Ink Black, geometric, no rounded joins |
| shield | Shield/protection | Sharp outlined shield, 1.5px stroke, Ink Black, no rounded joins |
| antenna | Broadcast/antenna | Sharp outlined broadcast antenna, 1.5px stroke, Ink Black, geometric |
| broadcast | DLNA symbol | Sharp outlined rectangle with cross, 1.5px stroke, Ink Black, geometric |
| puzzle | Plugin/extension | Sharp outlined 2×2 grid of squares, 1.5px stroke, Ink Black, no rounded joins |
| hub | Globe/network | Sharp outlined globe with crosshairs, 1.5px stroke, Ink Black, geometric |

---

## Image Generation Notes

All image prompts follow the brand kit's `image_prompt_prefix` and `image_prompt_suffix`:

**Prefix:**
`Swiss International Typographic Style illustration, flat graphic, grid-based composition, Helvetica-era modernism, off-white background, black structural elements, single Basel Red accent (#E8001C), geometric precision,`

**Suffix:**
`, flat vector, no gradients, no textures, no shadows, no rounded shapes, mathematical proportion, high contrast, white space as structure, professional.`

**Negative prompt array:**
`warm, cozy, playful, rounded, soft, colorful, gradient, texture, shadow, glow, neon, dark background, decorative, illustration with character, mascot, friendly, cute, fun, organic shapes, handwritten, sketch, brushstroke`
