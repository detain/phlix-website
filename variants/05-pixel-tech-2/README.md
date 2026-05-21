# Pixel Tech V2 — Arcade Cabinet

**Variant**: 05-pixel-tech-2  
**Brand**: Pixel Tech V2 — Arcade Cabinet  
**Preview**: https://detain.github.io/phlix-website/variants/05-pixel-tech-2/

---

## Design Identity

Retro arcade cabinet aesthetic with pixel art elements, high score displays, and CRT monitor effects:

- **Primary**: Neon green (#00FF41) on dark background (#0D0D0D)
- **Animation**: Arcade glow effects, score counter animations, CRT flicker
- **Cards**: Corner bracket accents, hover glow
- **Borders**: Neon green glow with electric purple (#9B30FF) accent
- **Typography**: Share Tech Mono (headlines), Fira Sans (body), Roboto Mono (UI)
- **Effects**: CRT scanline overlay, pixelated images, glitch text

## Differentiation from V1 (-1 Terminal Hacker)

| Aspect | V1 (Terminal Hacker) | V2 (Arcade Cabinet) |
|--------|--------------------|--------------------|
| Primary motif | Glitch text | Arcade cabinet styling |
| Accent usage | Electric purple prominent | Electric purple sparse |
| Background | Pure black #000000 | Dark gray #0D0D0D |
| Card style | Border-left accent | Corner bracket accents |
| Animations | Glitch effects | Arcade glow, score counters |
| Nav indicator | Underline | Joystick arrow (►) |
| FAQ markers | None | Power-up (+) symbols |
| CRT effect | Scanlines only | Scanlines + flicker |
| Font | Orbitron | Share Tech Mono |

## File Structure

```
05-pixel-tech-2/
├── css/
│   ├── base.css       # Reset, variables, arcade palette, scanline overlay (198 lines)
│   ├── theme.css      # Arcade cabinet visual theme, self-hosted font-face (953 lines)
│   └── components.css # Buttons, arcade display, pixel loader, glitch effects (518 lines)
├── js/
│   └── main.js        # Mobile nav, arcade effects, score counter, CRT flicker (269 lines)
├── img/
│   ├── logo.svg       # Pixel art "Ph" → smooth "lix" logo
│   ├── favicon.svg    # 32×32 pixel "P" favicon
│   ├── og.svg         # 1200×630 social share banner
│   ├── apple-touch-icon.png # Apple touch icon
│   └── PROMPTS.md     # Image generation prompts
├── fonts/
│   ├── ShareTechMono-Regular.ttf   # Headlines
│   ├── FiraSans-Regular.ttf         # Body text
│   ├── FiraSans-Medium.ttf          # Body medium weight
│   └── RobotoMono-Regular.ttf       # UI/Code
└── *.html             # 8 pages (index, features, clients, download, plugins, docs, hub, about)
```

## Pages

| Page | Purpose |
|------|---------|
| `index.html` | Hero with glitch text, feature cards, CTA |
| `features.html` | 8 feature detail cards with arcade icon styling |
| `clients.html` | Client cards with coin slot indicators, status badges |
| `download.html` | Download block with "HIGH SCORE" label, system requirements |
| `plugins.html` | Plugin system with JSON code block |
| `docs.html` | Documentation links with ecosystem list |
| `hub.html` | Hub relay explanation with 3-step feature grid |
| `about.html` | FAQ with power-up (+) markers, ecosystem list |

## Color Palette

```css
--color-neon-green: #00FF41;      /* Primary neon green */
--color-black: #0D0D0D;          /* Background */
--color-silver: #E8E8E8;          /* Text */
--color-dark-gray: #1A1A1A;       /* Cards/sections */
--color-electric-purple: #9B30FF; /* Accent */
--color-matrix-green: #00FF41;   /* Highlight */
```

## Self-Hosted Fonts

All fonts are local (no Google Fonts CDN):
- **Share Tech Mono** — Headlines, arcade displays, score counters
- **Fira Sans** — Body text
- **Roboto Mono** — UI elements, code blocks, navigation

All font-face declarations include `font-display: swap`.

## Arcade-Specific UI Elements

- **CRT scanline overlay** — Repeating linear gradient (body::after)
- **CRT flicker animation** — Random opacity flicker on body
- **Arcade corner accents** — 12×12 pixel corner brackets on cards
- **High score labels** — "HIGH SCORE" positioned labels
- **Coin slot indicators** — Animated coin drop effect on client cards
- **Power-up markers** — "+" symbols on FAQ items
- **Joystick arrows** — "►" indicators on nav hover
- **Arcade glow** — Pulsing neon glow on headings
- **Pixel loader** — 3×3 grid pulsing animation
- **Glitch text** — Split-channel glitch on hero h1

## Accessibility

- Skip link to main content
- ARIA labels on navigation
- `aria-expanded` on mobile menu toggle
- `aria-current="page"` on active nav item
- Focus visible states (2px neon green outline)
- `prefers-reduced-motion` support (disables glitch, flicker, animations)
- Touch targets ≥44px
- Landmark roles (banner, navigation, main, contentinfo)

## PWA Support

- `manifest.webmanifest` with theme_color: #00FF41
- Apple touch icon at `./img/apple-touch-icon.png`
- SVG favicon with maskable purpose
- Standalone display mode
- Categories: multimedia, entertainment