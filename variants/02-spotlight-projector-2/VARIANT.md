# Variant: 02-spotlight-projector-2 — Art Deco Elegance

## Brand Identity
**Name:** Spotlight Projector V2 — Art Deco Elegance
**Concept:** 1920s Hollywood glamour meets geometric precision. Gold foil accents, symmetrical layouts, sunburst motifs.

## Design Philosophy
Art Deco is characterized by:
- **Geometric patterns** — Stepped forms, chevrons, sunburst rays
- **Symmetrical compositions** — Balanced, centered focal points
- **Gold foil accents** — Luxurious metallic highlights
- **Sharp corners** — No rounded organic shapes
- **Angular frames** — Polygonal and stepped border treatments

## Differentiation from V1
| Aspect | V1 (Classic Cinematic) | V2 (Art Deco Elegance) |
|--------|----------------------|----------------------|
| Metaphor | Theater curtain, spotlight cone | Proscenium arch, geometric sunburst |
| Animation | Horizontal sweep | Radial pulse and rotation |
| Cards | Soft glow hover | Geometric corner accents |
| Borders | Soft burgundy gradients | Gold foil step lines |
| Typography | Standard letter-spacing | Expanded letter-spacing |

## Color Palette
```css
--gold-spotlight: #F5C542;      /* Primary gold */
--deep-black: #000000;         /* Background */
--warm-white: #FFF7E6;         /* Text */
--burgundy: #7A1F1F;           /* Accent */
--soft-shadow-gray: #3A3A3A;   /* Secondary */
--amber-glow: #FFB84D;         /* Hover/active gold */
```

## Typography
- **Headlines:** Cinzel Bold (self-hosted)
- **Body:** Lora Regular (self-hosted)
- **UI:** Source Sans Pro (self-hosted)
- **Code:** Fira Code (self-hosted)

## Animation Motif
**Art Deco sunburst animation** — A radial burst of gold rays that slowly rotates and pulses from the center of the hero section, creating an Art Deco "starburst" effect.

## Component Styling
- **Cards:** Gold corner accents (L-shaped borders on hover)
- **Buttons:** Uppercase with expanded letter-spacing
- **Dividers:** Stepped gold line gradients
- **Background:** Layered radial gradients with geometric patterns

## Icon Style
Angular, geometric SVG icons with 1.5px stroke width. No rounded corners.

## File Structure
```
02-spotlight-projector-2/
├── css/
│   ├── base.css       # Reset, fonts, CSS vars
│   ├── theme.css      # Art Deco visual theme
│   └── components.css # Component styles
├── js/
│   └── main.js        # Interactions
├── img/
│   ├── logo.svg       # Art Deco medallion
│   ├── favicon.svg    # Geometric favicon
│   ├── og.svg         # Social image
│   └── PROMPTS.md     # Design prompts
└── *.html             # All pages
```
