# Variant 05: Pixel-Tech Hybrid

## Overview
Dark cyberpunk hacker aesthetic for developer-friendly media server. Pixel motifs, neon green highlights, electric purple accents, sharp edges (no rounded corners), and animated glitch effects.

## Brand Tokens (from brand-kits.json)

### Colors
- **Primary**: Neon Green `#39FF14`, Black `#000000`, Silver `#C0C0C0`
- **Secondary**: Dark Gray `#1A1A1A`, Matrix Green `#00FF66`
- **Accent**: Electric Purple `#9B30FF`

### Typography
- **Headlines**: Orbitron Bold (self-hosted WOFF2)
- **Body**: Inter Medium (self-hosted WOFF2)
- **UI**: Roboto Mono (self-hosted WOFF2)
- **Code**: JetBrains Mono (self-hosted WOFF2)

## Design Decisions

### Dark Hacker Aesthetic
- Pure black `#000000` backgrounds for maximum contrast
- Dark gray `#1A1A1A` for cards and elevated surfaces
- Grid texture overlay on body for digital feel
- Neon green `#39FF14` used sparingly for emphasis and CTAs

### No Rounded Corners
- All borders and UI elements use sharp 90-degree corners
- Buttons, cards, inputs all have `border-radius: 0`
- This enforces the pixel/cyberpunk digital aesthetic

### Glitch Effects
- Hero headline has CSS glitch animation with color offset shadows
- Buttons have shimmer effect on hover using pseudo-elements
- `prefers-reduced-motion` respected for all animations

### Pixel Motifs
- Logo: "Ph" in pixelated blocks transitioning to smooth "lix"
- SVG icons use consistent 1.5px stroke weight
- Grid pattern background texture
- Scanline effects on certain sections

### Self-Hosted Fonts
- Google Fonts downloaded as WOFF2 at build time
- No runtime CDN dependency
- Font-face declarations in theme.css

## Accessibility
- Skip link with neon green highlight
- Visible focus styles using 2px neon green outline
- `prefers-reduced-motion` media query disables all animations
- Touch targets minimum 44px
- Proper landmarks: `<header>`, `<main>`, `<footer>`, `<nav>`
- Single `<h1>` per page
- All interactive elements keyboard accessible

## Responsive Breakpoints
- 320px minimum (mobile)
- 768px tablet (nav toggle appears)
- 480px small mobile (CTA stacks)
- 1400px max content width

## File Structure
```
variants/05-pixel-tech/
├── index.html
├── features.html
├── clients.html
├── download.html
├── plugins.html
├── docs.html
├── hub.html
├── about.html
├── css/
│   ├── base.css      (reset, variables, skip-link, focus)
│   ├── theme.css     (layout, typography, sections)
│   └── components.css (buttons, glitch, animations)
├── js/
│   └── main.js       (mobile nav, glitch, scroll animations)
└── img/
    ├── logo.svg      (pixelated Ph → smooth lix)
    ├── og.svg        (1200x630 social preview)
    ├── favicon.svg    (pixelated P icon)
    └── PROMPTS.md    (Concept 5 SVG prompts)
```

## Gotchas
- Fonts loaded from Google Fonts CDN at build time only - WOFF2 files downloaded
- Logo uses SVG filters for glow effects which may not work in all RSS readers
- CSS Grid used throughout - graceful degradation to single column on older browsers
- The glitch text animation runs continuously but with random intervals (3-10s) to feel organic

## Build Commands
```bash
npm run lint    # htmlhint, stylelint, eslint
npm run build   # builds variant
```

## Verification
- All 8 pages pass htmlhint, stylelint, eslint with zero errors
- No third-party runtime dependencies
- No tracking, analytics, or cookies
- All content from shared/content.json rendered verbatim
