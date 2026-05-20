# Variant: 03-retro-film-reel

## Concept
**Retro Film Reel Badge** — A nostalgic, playful, vintage cinema-themed website variant evoking 1950s movie theater aesthetics.

## What's Distinctive

### Visual Identity
- **Cream backgrounds** (#F5E9D4) — warm, inviting base
- **Retro red buttons** (#C0392B) with thick black outlines
- **Teal accents** (#1ABC9C) for icons and highlights
- **Mustard** (#D4A017) and **soft brown** (#8C5E3C) for secondary elements
- **Bold black outlines** (3-4px) on all interactive elements per brand "Do"

### Typography
- **Bebas Neue** for headlines — bold, condensed, uppercase
- **Open Sans** for body text — readable, friendly
- **Nunito** for UI elements — rounded, approachable
- **Cousine** for code — clean monospace

### Design Elements
- **Marquee lights animation** in hero — retro header motif per brand "Header Motif"
- **Halftone dot textures** via CSS radial gradients (subtle, per UI Style)
- **Rounded cards** with heavy drop shadows
- **Film reel logo** — circular badge with vintage film reel and "Phlix" banner
- **Star decorations** using brand's mustard accent color

### Interactions
- Staggered entrance animations on cards (fade + slide up)
- Marquee light glow animation (cycling through on/off states)
- Hover transforms with subtle rotation on cards
- Smooth scroll behavior
- Mobile nav with focus trap and escape key handling

## Design Decisions

1. **Chose warm cream background** over white for vintage feel
2. **Used thick black borders** on cards/buttons per brand "Do: Use bold outlines"
3. **Added halftone texture overlays** as CSS radial gradients (very subtle, 3-5% opacity)
4. **Created marquee lights** with CSS animation in hero sections
5. **Used box shadows offset** (not blur) for retro poster effect
6. **Added stars** as decorative elements using mustard accent
7. **Kept animations subtle** with `prefers-reduced-motion` support

## Files Created
```
03-retro-film-reel/
├── index.html
├── features.html
├── clients.html
├── download.html
├── plugins.html
├── docs.html
├── hub.html
├── about.html
├── css/
│   ├── base.css      (reset, variables, focus, skip-link)
│   ├── theme.css     (fonts, header/footer, nav)
│   └── components.css (buttons, cards, hero, marquee)
├── js/
│   └── main.js       (nav toggle, focus trap, animations)
├── img/
│   ├── logo.svg      (vintage film reel badge)
│   ├── og.svg        (social share image)
│   ├── favicon.svg   (simplified badge icon)
│   └── PROMPTS.md    (SVG prompts from brand docs)
├── VARIANT.md
└── BUILD_LOG.md
```

## Gotchas & Notes

- Fonts use dual-source: self-hosted WOFF2 first, then Google Fonts CDN fallback
- Marquee lights only animate when visible (no page-load flash)
- Card hover animations include slight rotation for playful feel
- Touch targets all ≥44px for mobile accessibility
- Responsive breakpoints at 900px (nav) and 768px (content)
