# Variant: 04-portal-hub-4 — Light Minimal / Clean Content-First Aesthetic

## Overview

This variant embodies the **Portal / Hub Icon** concept, evolved into a **Light Minimal** aesthetic. It features clean white surfaces, a focused blue accent, content-first layouts, and modern sans-serif typography that prioritizes readability and accessibility over decorative effects.

## Brand Source

- **Concept 4** from `phlix-server/docs/brand/brand_identity.md`
- **SVG prompts** from `phlix-server/docs/brand/svg_prompts.md`
- **Parent variant**: `04-portal-hub-3` (Data Terminal — CRT Terminal Aesthetic)

## Design Language

### Color Palette (from brand kit 04-portal-hub-4)

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-white` | #FFFFFF | Clean white primary background |
| `--color-cool-gray` | #F0F4F8 | Secondary surfaces, callouts |
| `--color-blue` | #2563EB | Accent for interactive elements, portals |
| `--color-text-primary` | #1E293B | Dark slate primary text |
| `--color-text-secondary` | #64748B | Muted slate secondary text |

### Typography

**Google Fonts** (web-native, CDN-loaded):

| Role | Font | Weights |
|------|------|---------|
| Display/Headlines | Plus Jakarta Sans | 600 (SemiBold), 700 (Bold) |
| Body | Inter | 400 (Regular), 500 (Medium) |
| UI | Inter | 500 (Medium) |

Font loading uses `font-display: swap` for performance — text remains visible during load with system sans-serif fallback.

### Visual Style

**Clean White Surfaces** — No heavy backgrounds, just pure white (#FFFFFF) with subtle gray (#F0F4F8) for section differentiation.

**Minimal Portal Mark** — Concentric circles in blue (#2563EB) representing connectivity, rendered as a simple SVG icon.

**Subtle Shadows** — Light, refined shadows (0 1px 3px rgba(0,0,0,0.08)) for card elevation — no harsh drop shadows.

**Thin Borders** — 1px borders in cool gray for card delineation, creating structure without visual weight.

**Blue Focus States** — All interactive elements use the blue accent with proper focus rings for accessibility.

### Motion Philosophy

All animations respect `prefers-reduced-motion: reduce`.

| Element | Animation | Trigger |
|---------|-----------|---------|
| Cards | Scroll reveal (fade + translateY) | Intersection Observer |
| Buttons | Hover lift (translateY -2px) + shadow | Continuous, CSS only |
| Feature cards | Hover lift (translateY -4px) | Continuous, CSS only |
| Mobile nav | Slide down + fade | CSS transition |

**No decorative motion** — this variant avoids flashy animations. Motion serves clarity and feedback, not decoration.

## What's Distinctive

1. **Light Minimal Aesthetic**: Full commitment to clean white surfaces — no gradients, no overlays, no heavy effects. Content is the hero.

2. **Content-First Layouts**: Generous whitespace, clear visual hierarchy, cards with breathing room. Information density is balanced with readability.

3. **Modern Sans-Serif Typography**: Plus Jakarta Sans for headlines gives geometric friendliness. Inter for body text provides exceptional readability at all sizes.

4. **Blue on White**: High-contrast blue accent (#2563EB) on clean white creates a professional, trustworthy feel — different from the neon/warm accents of other variants.

5. **Subtle Interactivity**: Hover states are refined — slight lifts, soft shadow increases — providing feedback without being distracting.

## File Structure

```
variants/04-portal-hub-4/
├── index.html           # Home/hero page with clean minimal aesthetic
├── features.html        # Detailed feature breakdown
├── clients.html         # Client app listings with status badges
├── download.html        # Download/install guide with ecosystem list
├── plugins.html        # Plugin ecosystem documentation
├── docs.html           # Documentation links + ecosystem
├── hub.html            # Hub service explanation (NAT traversal)
├── about.html         # About/FAQ page with philosophy + license
├── css/
│   ├── base.css       # Reset, CSS variables, Google Fonts import
│   ├── theme.css      # Layout, all component theming, responsive
│   └── components.css # Reusable component patterns, animations
├── js/
│   └── main.js        # Mobile nav, smooth scroll, FAQ accordion, scroll animations
├── img/
│   ├── logo.svg       # 32×32 minimal portal mark
│   ├── favicon.svg   # 32×32 portal icon (same as logo)
│   └── og.svg        # 1200×630 social sharing image
└── fonts/            # (not used — Google Fonts CDN for this variant)
```

## Accessibility

- Skip link to main content
- Visible focus styles with blue outline (`outline: 2px solid var(--color-accent)`)
- ARIA labels on navigation toggle and landmark regions
- `aria-current="page"` on active nav items
- All touch targets ≥44px
- `prefers-reduced-motion` fully respected (both CSS and JS)
- Color contrast ratios meet WCAG AA for all text

## Responsive Behavior

- Mobile-first approach
- Breakpoint at 768px for tablet/desktop layout
- Mobile nav collapses to hamburger with solid white backdrop
- Fluid typography with `clamp()`
- Grid layouts collapse to single column on mobile
- Cards stack vertically on small viewports

## Technical Notes

### Browser Support
- Modern browsers with CSS Grid, CSS Custom Properties, and IntersectionObserver support
- All animations respect `prefers-reduced-motion` via CSS and JS checks
- Google Fonts loaded via CDN with preconnect hints

### Performance
- No external font files to self-host — Google Fonts with `font-display: swap`
- Minimal CSS — no preprocessors, no complex transforms
- Scroll animations use GPU-accelerated properties (opacity, transform)
- Images are inline SVGs (no HTTP requests)

### Font Loading
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Plus+Jakarta+Sans:wght@600;700&display=swap');
```

Preconnect for performance:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
```

## Differentiation from Parent (04-portal-hub-3)

| Aspect | Parent (04-portal-hub-3) | This Variant (04-portal-hub-4) |
|--------|--------------------------|-------------------------------|
| Theme | Dark (CRT terminal) | Light (clean white) |
| Visual metaphor | CRT scanlines, vignette, phosphor glow | Minimal surfaces, subtle shadows |
| UI density | Terminal-style clean | Content-first with cards |
| Accent color | Phosphor green (#39FF14) | Blue (#2563EB) |
| Typography | VT323 (pixel), IBM Plex Mono (monospace) | Plus Jakarta Sans (headlines), Inter (body) |
| Effects | CRT flicker, typing animation | Scroll reveal, hover lift |
| Background | Deep green-black (#0D1A0D) | Pure white (#FFFFFF) |
| Theme feel | Nostalgic, developer-focused | Modern, accessible, professional |

## Gotchas & Notes

- Google Fonts require external CDN connectivity — if using in offline/air-gapped environments, consider self-hosting fonts
- Clean white design shows dirt/smudges easily on screens — test on various displays
- Blue accent may feel "corporate" to some — ensure it fits the Phlix brand personality
- Minimal design requires strong content — there's nowhere to hide weak copy or images
- Subtle shadows may not provide enough depth on certain displays — test across monitor types
- All external links use `rel="noopener noreferrer"` for security
- Mobile-first CSS means desktop styles build upon mobile — ensure breakpoints make sense
