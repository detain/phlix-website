# Spotlight Projector V3 — Midnight Gallery

**Variant**: 02-spotlight-projector-3  
**Brand**: Midnight Gallery — Ultra-dark museum elegance, restrained antique gold, soft ambient light  
**Preview**: https://detain.github.io/phlix-website/02-spotlight-projector-3/

---

## Design Identity

An ultra-dark museum gallery where content is exhibited like precious artifacts under soft, focused illumination:

- **Primary**: Antique Gold (#C9A84C) on Deep Black (#0A0A0C)
- **Animation**: Subtle ambient pulse from header center suggesting diffused gallery lighting
- **Cards**: Faint surface elevations rather than heavy shadows
- **Borders**: Whisper-thin gold lines used with extreme restraint
- **Typography**: Cormorant (headlines/body), Source Sans Pro (UI)

## Differentiation from V1 and V2

| Aspect | V1 (Classic Cinematic) | V2 (Art Deco) | V3 (Midnight Gallery) |
|--------|------------------------|-----------------|----------------------|
| Metaphor | Theater curtain, spotlight cone | Proscenium arch, geometric sunburst | Museum gallery, curated exhibition |
| Background | Pure black (#000) | Deep black (#000) | Ultra-dark (#0A0A0C) |
| Gold usage | Theatrical, bold | Art deco geometric | Restrained, whisper-thin |
| Animation | Horizontal spotlight sweep | Radial pulse and rotation | Subtle ambient pulse |
| Typography | Cinzel Bold (theatrical) | Cinzel Bold (deco) | Cormorant (editorial) |
| Borders | Soft burgundy gradients | Gold foil step lines | Faint surface colors |
| Feel | Theatrical, bold | Geometric precision | Quiet, elegant restraint |

## File Structure

```
02-spotlight-projector-3/
├── css/
│   ├── base.css        # Reset, CSS vars, font-face, skip-link (213 lines)
│   ├── theme.css       # Typography, header/footer, ambient pulse (332 lines)
│   └── components.css  # Buttons, cards, hero, features, clients (571 lines)
├── js/
│   └── main.js         # Mobile nav, smooth scroll, FAQ accordion
├── img/
│   ├── logo.svg        # Elegant "Ph" monogram with ambient glow
│   ├── favicon.svg     # Minimal favicon with subtle glow
│   ├── og.svg          # Social image (1200x630)
│   └── PROMPTS.md      # AI generation prompts
├── fonts/              # Self-hosted WOFF2 fonts (Cormorant, Source Sans Pro)
├── *.html              # 8 pages (index, about, features, clients, download, docs, hub, plugins)
├── sitemap.xml
├── robots.txt
├── manifest.webmanifest
├── BUILD_LOG.md
├── VARIANT.md
└── content.json
```

## Pages

| Page | Purpose |
|------|---------|
| `index.html` | Hero with ambient glow, pitch bullets, feature cards, CTA |
| `about.html` | Philosophy, license, contributing, FAQ |
| `features.html` | 8 feature cards with icons and descriptions |
| `clients.html` | Client cards for Roku, Tizen, Windows, Mobile, DLNA |
| `download.html` | Server download, requirements, ecosystem links |
| `plugins.html` | Plugin system, manifest schema, example reference |
| `docs.html` | Documentation links to external VitePress docs |
| `hub.html` | Phlix Hub remote access, reverse-tunnel relay |

## Color Palette

```css
--color-deep-black: #0A0A0C;      /* Primary background */
--color-museum-white: #FAF9F6;    /* Primary text */
--color-antique-gold: #C9A84C;    /* Accent, CTAs, active states */
--color-text: #1A1A1A;            /* Secondary text (on light) */
--color-muted: #6B6B6B;           /* Tertiary text, disabled */
```

## Typography

- **Headlines**: Cormorant — elegant serif, editorial feel
- **Body**: Cormorant — consistent serif for cohesion
- **UI Elements**: Source Sans Pro — clean, readable sans-serif

## Animation

| Element | Effect | Duration |
|---------|--------|----------|
| Header | Ambient radial pulse from top center | 6s cycle |
| Cards | Subtle gold glow on hover | 250ms |
| Nav links | Gold underline slide-in | 250ms |
| Buttons | Lift + shadow intensify | 150ms |
| Reduced motion | All animations disabled | — |

## Accessibility

- Skip link to main content
- ARIA labels on navigation
- Focus visible states (2px gold outline)
- `prefers-reduced-motion` support
- Touch targets ≥44px
- Semantic HTML landmarks
- Visible focus styles

## Technical Stack

- **Pure HTML5, CSS3, Vanilla JavaScript** — no frameworks, no bundlers
- **Self-hosted fonts** via `@font-face` with `font-display: swap`
- **CSS Architecture**: `base.css` → `theme.css` → `components.css`
- **Minimal JS footprint** — mobile nav, smooth scroll, FAQ accordion

## Brand Voice

- **Personality**: Restrained, Elegant, Quiet confidence, Museum curator
- **Tagline**: "Your story. Our stage."
- **Voice**: Refined, Confident, Slightly poetic, Museum whisper

## Design Do's and Don'ts

### Do's
- Use antique gold sparingly (only for emphasis)
- Keep backgrounds ultra-dark
- Use subtle ambient light effects
- Maintain generous negative space
- Let content breathe like gallery pieces

### Don'ts
- Use bright or saturated colors
- Use heavy borders or glows
- Create visual noise or clutter
- Overuse gradients
- Add decorative elements

## Build Info

- **Build Date**: May 20, 2026
- **Files**: 8 HTML pages, 3 CSS files, 1 JS file, 4 font files (WOFF2), 3 images
- **Font Files Required**: `fonts/cormorant.woff2`, `fonts/cormorant-italic.woff2`, `fonts/source-sans-pro.woff2`, `fonts/source-sans-pro-semibold.woff2`

## SEO & PWA

- `sitemap.xml` — All 8 pages with priorities
- `robots.txt` — Standard allow-all with sitemap reference
- `manifest.webmanifest` — PWA manifest with Midnight Gallery theme colors
- JSON-LD `SoftwareApplication` schema on homepage
- Full Open Graph and Twitter Card meta on all pages
- `<meta name="theme-color" content="#0A0A0C">`
