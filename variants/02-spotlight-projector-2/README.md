# Spotlight Projector V2 — Art Deco Elegance

**Variant**: 02-spotlight-projector-2
**Brand**: Projector Beam V2 — Art Deco Elegance
**Preview**: https://detain.github.io/phlix-website/02-spotlight-projector-2/

---

## Design Identity

Art Deco 1920s Hollywood glamour meets geometric precision:

- **Primary**: Gold foil (#F5C542) on deep black (#000000)
- **Animation**: Radial sunburst pulse and rotation from hero center
- **Cards**: Gold corner accents (L-shaped borders on hover)
- **Borders**: Stepped gold line gradients
- **Typography**: Cinzel Bold (headlines), Lora (body), Source Sans Pro (UI)

## Differentiation from V1

| Aspect | V1 (Classic Cinematic) | V2 (Art Deco Elegance) |
|--------|------------------------|------------------------|
| Metaphor | Theater curtain, spotlight cone | Proscenium arch, geometric sunburst |
| Animation | Horizontal sweep | Radial pulse and rotation |
| Cards | Soft glow hover | Geometric corner accents |
| Borders | Soft burgundy gradients | Gold foil step lines |
| Typography | Standard letter-spacing | Expanded letter-spacing |

## File Structure

```
02-spotlight-projector-2/
├── css/
│   ├── base.css       # Reset, fonts, CSS vars (279 lines)
│   ├── theme.css      # Art Deco visual theme (469 lines)
│   └── components.css # Component styles (571 lines)
├── js/
│   └── main.js        # Interactions (123 lines)
├── img/
│   ├── logo.svg       # Art Deco sunburst medallion
│   ├── favicon.svg    # Geometric favicon
│   ├── og.svg         # Social image
│   └── PROMPTS.md     # Design prompts
├── fonts/             # Self-hosted TTF fonts
└── *.html             # 8 pages (index, about, features, clients, download, docs, hub, plugins)
```

## Pages

| Page | Purpose |
|------|---------|
| `index.html` | Hero with rotating sunburst animation, feature cards |
| `about.html` | Brand story with Art Deco dividers |
| `features.html` | 8 feature cards with geometric corner accents |
| `clients.html` | Client showcase |
| `download.html` | Download CTA with gold foil styling |
| `docs.html` | Documentation links |
| `hub.html` | Ecosystem hub |
| `plugins.html` | Plugin integrations |

## Color Palette

```css
--gold-spotlight: #F5C542;      /* Primary gold */
--deep-black: #000000;            /* Background */
--warm-white: #FFF7E6;           /* Text */
--burgundy: #7A1F1F;             /* Accent */
--soft-shadow-gray: #3A3A3A;      /* Secondary */
--amber-glow: #FFB84D;           /* Hover/active gold */
```

## Self-Hosted Fonts

All fonts are local (no CDN):
- **Cinzel Bold** — Headlines
- **Lora Regular** — Body text
- **Source Sans Pro** — UI elements
- **Fira Code** — Code blocks

## Accessibility

- Skip link to main content
- ARIA labels on navigation
- Focus visible states
- `prefers-reduced-motion` support
- Touch targets ≥44px
