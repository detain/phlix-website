# img/PROMPTS.md — Pop Art Explosion

> Exact prompts used to (re)generate every raster/illustrated image asset in this kit.
> Pop Art Explosion identity: Roy Lichtenstein / Andy Warhol, Ben-Day dots,
> primary colors (red/yellow/blue), thick black ink outlines, halftone shading,
> comic-book panel compositions, silk-screen print aesthetic.

---

## Logo (`img/logo.svg`)

**Type:** Vector SVG (hand-crafted, not AI-generated)

```
Pop art logo: the word PHLIX in Bangers bold white type inside a solid red
rectangle, 3px black border, 4px black offset shadow, stark white background
with yellow Ben-Day dot overlay, no gradients, 1960s pop art gallery aesthetic.
```

**Spec applied:** `brandKit.logo_rules` — "Bangers wordmark 'PHLIX' in stark white
inside a solid red rectangle, 3px black border all around, 4px/4px black offset shadow."

---

## Favicon (`img/favicon.svg`)

**Type:** Vector SVG

```
Pop art favicon: solid red (#FF1A1A) square with 2px black border, bold white
letter P in Impact/Arial Black, no gradients, no shadows, 32×32px.
```

---

## OG Social Share Image (`img/og.svg` → `img/og.png`)

**Type:** Raster (1200×630px) — render from og.svg source

**SVG source prompt:**
```
Pop art social graphic: full-bleed #FF1A1A red background with Ben-Day yellow
dot overlay. White card in center with 4px black border. Bangers bold white
PHLIX wordmark (140px) inside the card. Below: "WHAM! Your media, AMPLIFIED."
in Bangers bold #FFE600 with black offset. Top and bottom: #FFE600 accent
bands with black dot pattern. Starburst shapes in top corners. No gradients,
flat vector rendering, 1960s pop art aesthetic. 1200×630px.
```

**Generation command (ImageMagick):**
```bash
# Convert SVG source to optimized PNG
convert -resize 1200x630 img/og.svg img/og.png
# or with rsvg-convert:
rsvg-convert -w 1200 -h 630 img/og.svg > img/og.png
```

---

## Hero Art (CSS/SVG — no raster needed)

**Treatment:** Full-bleed red hero with Ben-Day dot CSS background pattern (inline SVG data URI). No raster image required — the aesthetic is achieved entirely via CSS.

---

## Feature Icons (Inline SVG — 7 icons)

All 7 feature icons are inline SVGs in `theme.css` and `components.css`. They use:
- Single-color stroke: `stroke: var(--color-primary)` (#FF1A1A)
- Stroke width: 2px (content) / 1.5px (detail)
- Flat vector, no fill, no gradients
- Comic-panel aesthetic per `icon_rules`

Icon subjects (from `content.json` features):
1. **library** — `<path d="M4 6h16M4 12h16M4 18h12"/>` (list lines)
2. **syncplay** — `<circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>` (clock face)
3. **transcode** — Diamond/dice shape (transcode pipeline)
4. **shield** — Shield with path (security)
5. **antenna** — Broadcast signal lines (Live TV)
6. **broadcast** — Broadcast waves (DLNA)
7. **puzzle** — Puzzle piece (plugins)
8. **hub** — Central node with radiating lines (Hub)

**Icon generation prompt:**
```
Pop art icon: flat vector, single solid primary red fill (#FF1A1A), 2px
black outline, no gradients, no drop shadows, 1960s comic instruction manual
style, sharp 90-degree corners, 24×24 viewBox.
```

---

## Ben-Day Dot Patterns

Generated as inline SVG data URIs in `base.css`:
```css
/* Black dots on white (general background texture) */
background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%3E%3Ccircle cx='4' cy='4' r='2.5' fill='%230A0A0A' fill-opacity='0.12'/%3E%3C/svg%3E");

/* Yellow dots (on red hero) */
background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='6' height='6'%3E%3Ccircle cx='3' cy='3' r='1.8' fill='%23FFE600' fill-opacity='0.25'/%3E%3C/svg%3E");
```

---

## Negative Prompts (never generate these)

From `brandKit.negative_prompt[]`:
- gradients
- blur
- drop shadows
- pastel
- muted tones
- watercolor
- photorealistic
- dark moody
- minimalist
- glassmorphism
- skeuomorphic textures
- thin fonts
- serif body text
- cool grey

---

## Art Direction Notes

Every generated image must follow:
1. Thick 3–4px flat black ink outlines — no tapers, no brush strokes
2. Flat primary color fills only — red (#FF1A1A), yellow (#FFE600), blue (#0028DC), white
3. Ben-Day halftone dot overlay for shading illusion
4. Stark white background as the canvas
5. Never: drop shadows, gradients, soft blur, realistic photography
