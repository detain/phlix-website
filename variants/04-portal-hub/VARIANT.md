# Variant: 04-portal-hub — Portal / Hub Icon

## Overview
This variant embodies the **Portal / Hub Icon** concept from the brand identity kit. It features a dark futuristic UI with neon cyan accents, glassmorphism panels, and animated portal ring motifs that evoke connectivity and streaming.

## Brand Source
- **Concept 4** from `phlix-server/docs/brand/brand_identity.md`
- **SVG prompts** from `phlix-server/docs/brand/svg_prompts.md`

## Design Language

### Color Palette (from brand kit)
- **Primary**: Neon Cyan `#00E5FF`, Midnight Blue `#0A0F1F`, White `#FFFFFF`
- **Secondary**: Deep Navy `#08101C`, Soft Cyan `#7FF6FF`
- **Accent**: Magenta Pulse `#FF00C8`

### Typography
- **Headlines**: Poppins SemiBold
- **Body**: Inter Light
- **UI**: SF Pro Rounded (falls back to system-ui)
- **Code**: IBM Plex Mono

### Visual Style
- Dark futuristic UI with midnight blue backgrounds
- Neon cyan accents used sparingly for emphasis
- Glassmorphism panels using `backdrop-filter: blur(12px)`
- Animated rotating portal ring in hero section
- Smooth CSS transitions and hover states

### Do's & Don'ts (from brand kit)
**Do:**
- Use neon sparingly (cyan and magenta pulse)
- Keep layouts clean with generous spacing
- Use circular/portal motifs

**Don't:**
- Use warm colors (oranges, reds, yellows)
- Use serif fonts
- Add clutter or visual noise

## What's Distinctive

1. **Animated Portal Ring Hero**: The hero section features a dual-ring portal animation (outer ring rotates clockwise, inner counter-clockwise) with a glowing center play button.

2. **Glassmorphism Cards**: Feature cards and other UI panels use `backdrop-filter` for a frosted glass effect against the dark gradient background.

3. **Neon Glow Effects**: Buttons, links, and interactive elements have subtle glow effects using box-shadow with neon colors.

4. **Reduced Motion Support**: All animations respect `prefers-reduced-motion` media query.

5. **Magenta Pulse Accent**: Used as secondary accent (opposite to the cyan primary) for variety and visual interest.

## Technical Notes

### Framework & Dependencies
- Pure vanilla HTML/CSS/JS — no frameworks
- No bundler required
- Google Fonts loaded via CSS `@import` (self-hosted fallback possible)

### File Structure
```
variants/04-portal-hub/
├── index.html
├── features.html
├── clients.html
├── download.html
├── plugins.html
├── docs.html
├── hub.html
├── about.html
├── css/
│   ├── base.css      # Reset, variables, skip-link, focus, reduced-motion
│   ├── theme.css     # Layout, typography, dark futuristic theme
│   └── components.css # Buttons, cards, animations, portal ring
├── js/
│   └── main.js       # Mobile nav, portal parallax, scroll reveal
└── img/
    ├── logo.svg       # Portal ring + wordmark
    ├── favicon.svg    # Mini portal icon
    ├── og.svg         # Social sharing image
    └── PROMPTS.md    # SVG prompts documentation
```

### Accessibility
- Skip link to main content
- Visible focus styles with neon cyan outline
- ARIA labels on navigation toggle and landmark regions
- `aria-current="page"` on active nav items
- All touch targets ≥44px

### Responsive Behavior
- Mobile-first approach
- Breakpoint at 768px for tablet/desktop layout
- Mobile nav collapses to hamburger menu
- Fluid typography with `clamp()`

## Gotchas & Notes
- The portal ring animation uses CSS only (no JS), ensuring smooth 60fps on most devices
- Fonts are loaded via Google Fonts CDN; for true offline operation, they should be self-hosted (WOFF2 files)
- The glassmorphism effect may not render on older browsers; fallback to solid background is provided
- The `code-block` class uses IBM Plex Mono for code snippets
