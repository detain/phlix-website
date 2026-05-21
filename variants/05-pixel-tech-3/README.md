# Pixel Tech V3 — Neon Cyberpunk

**Variant**: 05-pixel-tech-3  
**Brand**: Pixel Tech V3 — Neon Cyberpunk  
**Preview**: https://detain.github.io/phlix-website/variants/05-pixel-tech-3/

---

## Design Identity

Neon Cyberpunk aesthetic with hot pink/magenta neon accents on deep purple-black backgrounds:

- **Primary**: Deep purple-black (#0D0815)
- **Secondary**: Dark purple (#1A1030)
- **Accent**: Hot pink (#FF2D78)
- **Text**: Light lavender-white (#E8E0F0)
- **Animation**: Neon flicker effects, glitch text, hover glow
- **Cards**: Hot pink border accents, hover lift
- **Typography**: Orbitron Bold (headlines), Exo 2 (body) — self-hosted
- **Effects**: Neon glow on buttons, pink-tinted grid texture, sweep animations

## Differentiation from V1 (Terminal/Neon Green) and V2 (Arcade Cabinet)

| Aspect | V1 (Terminal Hacker) | V2 (Arcade Cabinet) | V3 (Neon Cyberpunk) |
|--------|--------------------|--------------------|-------------------|
| Primary accent | Neon green #39FF14 | Neon green #00FF41 | Hot pink #FF2D78 |
| Background | Pure black #000000 | Dark gray #0D0D0D | Purple-black #0D0815 |
| Undertone | Matrix green | Gray/silver | Purple |
| Body font | Inter | Fira Sans | Exo 2 |
| Headline font | Orbitron | Share Tech Mono | Orbitron |
| Animation | Glitch text | Score counters, CRT flicker | Neon flicker, glitch |
| Card style | Border-left accent | Corner bracket accents | Hot pink glow borders |

## File Structure

```
05-pixel-tech-3/
├── css/
│   ├── base.css       # Reset, CSS variables, neon cyberpunk palette (176 lines)
│   ├── theme.css      # Layout, typography, sections, @font-face (860 lines)
│   └── components.css # Buttons, glitch animations, hover effects (430 lines)
├── js/
│   └── main.js        # Mobile nav, neon flicker, scroll reveal (191 lines)
├── img/
│   ├── logo.svg       # Hot pink neon "Ph" → smooth "lix" logo
│   ├── favicon.svg    # 32×32 hot pink pixel "Ph" on purple
│   ├── og.svg         # 1200×630 social preview banner
│   └── PROMPTS.md     # Image generation prompts + style guide
├── fonts/             # Self-hosted fonts (must be downloaded)
│   ├── Orbitron-Bold.*
│   ├── Exo2-Regular.*
│   ├── Exo2-Medium.*
│   └── Exo2-SemiBold.*
└── *.html             # 8 pages (index, features, clients, download, plugins, docs, hub, about)
```

## Pages

| Page | Purpose |
|------|---------|
| `index.html` | Hero with glitch text, pitch bullets, feature cards, CTA |
| `features.html` | 8 feature detail cards with neon styling |
| `clients.html` | 5 client cards with status badges (stable/beta) |
| `download.html` | Server install instructions, client downloads, ecosystem |
| `plugins.html` | Plugin model explanation, example link |
| `docs.html` | Documentation links, ecosystem list |
| `hub.html` | Hub relay explanation, self-host/public options |
| `about.html` | Philosophy, license, contributing, FAQ |

## Color Palette

```css
--color-primary: #0D0815;    /* deep purple-black */
--color-secondary: #1A1030;  /* dark purple */
--color-accent: #FF2D78;      /* hot pink */
--color-text: #E8E0F0;        /* light lavender-white */
--color-muted: #6B5B7B;       /* muted purple */
```

## Self-Hosted Fonts

All fonts are local (no Google Fonts CDN):
- **Orbitron Bold** — Headlines, neon displays
- **Exo 2 Regular** — Body text
- **Exo 2 Medium** — Body medium weight
- **Exo 2 SemiBold** — UI elements, emphasis

All @font-face declarations include `font-display: swap`.

**Note**: Font files must be downloaded and placed in the `fonts/` directory before production use.

## Neon Cyberpunk UI Elements

- **Neon glow buttons** — Hot pink background with pink box-shadow glow, hover lift effect
- **Glitch text animation** — Split-channel text effect on hero headings
- **Neon flicker** — Subtle opacity flicker on hero section (respects prefers-reduced-motion)
- **Pink-tinted grid texture** — Subtle background pattern on body
- **Neon sweep hover** — Pink sweep animation on card hover
- **Hover lift** — Transform translateY(-4px) with enhanced shadow on interactive elements
- **Focus states** — 2px hot pink outline with glow

## Accessibility

- Skip link to main content
- ARIA labels on navigation
- `aria-expanded` on mobile menu toggle
- `aria-current="page"` on active nav item
- Focus visible states (2px hot pink outline with glow)
- `prefers-reduced-motion` support (disables flicker, glitch animations)
- Touch targets ≥44px
- Landmark roles (banner, navigation, main, contentinfo)

## PWA Support

- `manifest.webmanifest` with theme_color: #FF2D78, background_color: #0D0815
- SVG favicon with neon glow effect
- Standalone display mode
- Categories: multimedia, entertainment
