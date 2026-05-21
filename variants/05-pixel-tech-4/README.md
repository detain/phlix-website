# Pixel Tech V4 — Warm Amber Terminal

**Variant**: 05-pixel-tech-4  
**Brand**: Pixel Tech V4 — Warm Amber Terminal  
**Preview**: https://detain.github.io/phlix-website/variants/05-pixel-tech-4/

---

## Design Identity

Cozy dark terminal aesthetic with warm amber glow — like a premium IDE at night:

- **Primary**: Warm brown (#1A1209) on warm cream text (#F5E6C8)
- **Accent**: Amber glow (#FF9500) — CTAs, highlights, hover states
- **Animation**: Amber glow pulse, terminal cursor blink, reveal-on-scroll
- **Cards**: Gradient backgrounds with amber top-border reveal on hover
- **Typography**: Fira Code (headlines), Fira Sans (body), monospace UI elements
- **Effects**: Terminal grid texture, amber glow shadows, warm color temperature

## Differentiation from V2 (Arcade Cabinet)

| Aspect | V2 (Arcade Cabinet) | V4 (Warm Amber Terminal) |
|--------|---------------------|-------------------------|
| Primary background | #0D0D0D (near black) | #1A1209 (warm brown) |
| Accent | #00FF41 (neon green) | #FF9500 (amber) |
| Feel | Retro arcade, high energy | Cozy terminal, focused warmth |
| Text | #E8E8E8 (silver) | #F5E6C8 (warm cream) |
| Animation | CRT flicker, glitch effects | Amber glow, terminal cursor |
| Nav indicator | Joystick arrow (►) | Greater-than prefix (>) |
| Font | Share Tech Mono | Fira Code |

## File Structure

```
05-pixel-tech-4/
├── css/
│   ├── base.css       # Reset, variables, terminal grid texture (173 lines)
│   ├── theme.css      # Layout, typography, amber glow effects (839 lines)
│   └── components.css # Buttons, hover animations, reveal effects (369 lines)
├── js/
│   └── main.js        # Mobile nav, scroll reveal, amber glow (179 lines)
├── img/
│   ├── logo.svg       # Pixel art "Phlix" wordmark with amber glow
│   ├── favicon.svg    # 32×32 pixel "P" favicon
│   ├── og.svg         # 1200×630 social share banner
│   ├── apple-touch-icon.png # Apple touch icon
│   └── PROMPTS.md     # Image generation prompts
├── fonts/
│   ├── FiraCode-Regular.woff2   # Headlines, code
│   ├── FiraCode-Bold.woff2      # Bold headlines
│   ├── FiraSans-Regular.ttf     # Body text
│   └── FiraSans-Medium.ttf      # Medium weight
└── *.html             # 8 pages (index, features, clients, download, plugins, docs, hub, about)
```

## Pages

| Page | Purpose |
|------|---------|
| `index.html` | Hero with terminal cursor, pitch bullets, 8 feature cards, CTA |
| `features.html` | 8 feature detail cards with icon + text layout |
| `clients.html` | Client cards with status badges, ecosystem grid |
| `download.html` | System requirements, download blocks, quickstart |
| `plugins.html` | Plugin system docs, LifecycleInterface example |
| `docs.html` | Links to external VitePress docs (user guide, API, dev) |
| `hub.html` | Hub relay explanation, public vs self-hosted |
| `about.html` | Philosophy, comparison table, FAQ accordion |

## Color Palette

```css
--color-primary: #1A1209;      /* Warm dark brown */
--color-secondary: #2D1F0F;   /* Warm brown-black */
--color-accent: #FF9500;       /* Amber */
--color-text: #F5E6C8;         /* Warm cream */
--color-muted: #8B7355;        /* Warm gray-brown */
```

## Self-Hosted Fonts

All fonts are local (no Google Fonts CDN):
- **Fira Code** — Headlines, code blocks, terminal-style UI
- **Fira Sans** — Body text and interface elements

All font-face declarations include `font-display: swap` for performance.

## Terminal-Specific UI Elements

- **Terminal grid texture** — Subtle amber grid overlay (4px intervals, 2% opacity)
- **Terminal cursor blink** — Blinking underscore on hero h1
- **Nav `>` prefix** — Amber prefix on nav links, revealed on hover
- **Pitch `[+]/[-]` bullets** — Alternating amber/gray terminal-style markers
- **Client `$` prefix** — Terminal prompt prefix on client highlights
- **Ecosystem `#` prefix** — Hash prefix on ecosystem list items
- **Docs `>>` prefix** — Double-arrow prefix on doc links
- **Amber glow effects** — Multi-layer text-shadow on headings
- **Amber sweep** — Light sweep animation on button hover

## Accessibility

- Skip link to main content
- ARIA labels on navigation (role="banner", role="navigation", aria-label)
- `aria-current="page"` on active nav item
- Keyboard navigation with Escape-to-close mobile menu
- Focus visible states (2px amber outline)
- `prefers-reduced-motion` support (disables all animations)
- Touch targets ≥44px
- Landmark roles throughout
- Smooth scroll for anchor links

## PWA Support

- `manifest.webmanifest` with theme_color: #FF9500
- SVG favicon
- Apple touch icon at `./img/apple-touch-icon.png`
- Standalone display mode
- Categories: multimedia, entertainment
