# Spotlight Projector V4 — Warm Spotlight

**Variant**: 02-spotlight-projector-4
**Brand**: Warm Spotlight — Modern premium luxury, warm amber glows, cozy theater atmosphere
**Preview**: https://detain.github.io/phlix-website/02-spotlight-projector-4/

---

## Design Identity

Warm theater-inspired luxury with amber glows and cozy atmosphere:

- **Primary**: Amber (#E89B3C) on warm dark brown (#1A1208)
- **Animation**: Ambient spotlight pulse animation in header
- **Cards**: Warm glow hover states with amber accents
- **Typography**: Vollkorn (headlines, warm serif), Nunito (body/UI, modern sans)
- **Feel**: Premium, inviting, theatrical warmth

## Differentiation from Previous Versions

| Aspect | V1 (Classic Cinematic) | V2 (Art Deco) | V3 (Midnight Gallery) | V4 (Warm Spotlight) |
|--------|------------------------|---------------|----------------------|----------------------|
| Metaphor | Theater curtain | Proscenium arch | Museum gallery | Cozy theater |
| Background | #000000 | #000000 | #0A0A0C | #1A1208 |
| Accent | Gold #F5C542 | Gold #F5C542 | Antique #C9A84C | Amber #E89B3C |
| Typography | Cinzel Bold | Cinzel Bold | Cormorant | Vollkorn |
| Text | #FFF7E6 | #FFF7E6 | #FAF9F6 | #F5E6C8 |
| Feel | Theatrical bold | Geometric | Quiet elegant | Warm cozy luxury |

## File Structure

```
02-spotlight-projector-4/
├── css/
│   ├── base.css       # Reset, CSS variables, @font-face (245 lines)
│   ├── theme.css      # Typography, header/footer, animations (332 lines)
│   └── components.css # Buttons, cards, sections (571 lines)
├── fonts/             # Self-hosted WOFF2 fonts (~382KB)
│   ├── Vollkorn-*.woff2   # Regular, Medium, SemiBold, Bold
│   └── Nunito-*.woff2    # Regular, Medium, SemiBold, Bold
├── img/
│   ├── logo.svg       # Brand logo with amber glow
│   ├── favicon.svg    # Minimal Ph monogram
│   └── og.svg         # Social image (1200×630)
├── js/
│   └── main.js        # Nav toggle, FAQ accordion (123 lines)
├── *.html             # 8 pages
├── manifest.webmanifest
├── robots.txt
└── sitemap.xml
```

## Pages

| Page | Purpose |
|------|---------|
| `index.html` | Hero with spotlight animation, feature cards, warm atmosphere |
| `about.html` | Brand story with FAQ accordion |
| `features.html` | 8 feature cards with warm glow hover states |
| `clients.html` | Native client showcase |
| `download.html` | Download CTA with amber accents |
| `docs.html` | Documentation links |
| `hub.html` | Phlix Hub relay |
| `plugins.html` | Plugin integrations |

## Color Palette

```css
--color-primary:    #1A1208;  /* Warm dark brown (background) */
--color-secondary:  #F5E6C8;  /* Warm cream (text) */
--color-accent:     #E89B3C;  /* Amber (highlights/CTAs) */
--color-text:      #3D2B1F;  /* Warm dark text */
--color-muted:     #8B7355;  /* Muted text */
```

## Typography

**Headlines**: Vollkorn (serif) — warm, theatrical, characterful
**Body/UI**: Nunito (sans-serif) — readable, modern, friendly

```css
--font-headline: 'Vollkorn', Georgia, serif;
--font-body: 'Nunito', system-ui, sans-serif;
```

## Accessibility

- Skip link to main content
- ARIA labels on navigation (`aria-label`, `aria-expanded`, `aria-controls`)
- Focus visible states and focus trap in mobile nav
- `prefers-reduced-motion` support
- Touch targets ≥44px
- Keyboard navigation for FAQ accordion

## Technical Notes

- **Fonts**: Self-hosted WOFF2 with `font-display: swap` for performance
- **CSS**: 3-layer architecture (base → theme → components)
- **JS**: Single file with `defer`, no render-blocking
- **PWA**: manifest.webmanifest, service-worker ready structure
- **SEO**: Complete meta tags, JSON-LD structured data, sitemap.xml
