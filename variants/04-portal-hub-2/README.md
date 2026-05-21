# Variant: 04-portal-hub-2 — Glassmorphism Focus

## Overview

This variant embodies the **Portal / Hub Icon** concept, evolved into a **Glassmorphism Focus** aesthetic. It features transparent panels with frosted glass effects, layered depth through semi-transparent surfaces, and a portal grid motif that reinforces Phlix's connectivity theme.

## Brand Source

- **Concept 4** from `phlix-server/docs/brand/brand_identity.md`
- **SVG prompts** from `phlix-server/docs/brand/svg_prompts.md`
- **Parent variant**: `04-portal-hub` (Portal Ring — Clean Tech Minimal)

## Design Language

### Color Palette (from brand kit 04-portal-hub-2)

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-deep-navy` | #0A1628 | Primary background |
| `--color-bg-secondary` | #061018 | Secondary background |
| `--color-ice-blue` | #E8F4FD | Text highlights, inverse text |
| `--color-neon-cyan` | #00D4FF | Accent, glows, interactive elements |
| `--color-text-primary` | #0F1C2E | Body text on light backgrounds |
| `--color-muted` | #5B7A99 | Secondary/muted text |
| `--color-bg-glass` | rgba(232,244,253,0.08) | Glass card backgrounds |
| `--color-bg-glass-hover` | rgba(232,244,253,0.12) | Glass card hover state |

### Typography

**Self-hosted WOFF2 fonts** (no external CDN dependency):

| Role | Font | Weights |
|------|------|---------|
| Headlines | Space Grotesk | Bold (700), SemiBold (600), Medium (500) |
| Body | DM Sans | Regular (400), Medium (500), Bold (700) |
| UI | DM Sans | Medium (500) |
| Code | IBM Plex Mono | Regular (system fallback) |

Font files located in `/fonts/`:
- `space-grotesk-bold.woff2`
- `space-grotesk-semibold.woff2`
- `space-grotesk-medium.woff2`
- `dm-sans-regular.woff2`
- `dm-sans-medium.woff2`
- `dm-sans-bold.woff2`

### Visual Style

**Portal Grid Motif** — Concentric circles with grid lines emanating outward, creating a tech-forward portal/hub icon that differentiates from the parent's solid ring approach.

**Glassmorphism Panels** — Heavy use of `backdrop-filter: blur(20px) saturate(150%)` for frosted glass effect against layered backgrounds.

**Grid Pattern Background** — Subtle cyan grid overlay (`rgba(0,212,255,0.03)`) across the entire page surface.

**Glow Effects** — Neon cyan box-shadows on interactive elements: buttons, cards, navigation links.

### Motion Philosophy

All animations respect `prefers-reduced-motion: reduce`.

| Element | Animation | Trigger |
|---------|-----------|---------|
| Portal grid (hero) | Pulse scale + opacity | Continuous, 3s ease-in-out |
| Portal grid (hero) | Parallax tilt | Mouse move |
| Glass cards | 3D tilt on hover | Mouse move |
| Feature cards | Scroll reveal (fade + translateY) | Intersection Observer |
| CTA gradient | Background position shift | Continuous, 10s ease |
| All transitions | `300ms cubic-bezier(0.4, 0, 0.2, 1)` | State change |

## What's Distinctive

1. **Portal Grid Animation**: Concentric rings with grid lines pulse and respond to mouse movement, creating an immersive "entering the portal" feeling.

2. **Data-Dense Glass Panels**: More visual layering than parent variant — glass cards with hover glow, depth shadows, and 3D tilt effects.

3. **Extensive Neon Cyan Usage**: Cyan used on glass surfaces, not just dark backgrounds — creates glowing, ethereal quality.

4. **Self-Hosted Typography**: Space Grotesk + DM Sans WOFF2 files bundled, eliminating Google Fonts CDN dependency.

5. **Layered Background Depth**: Fixed grid pattern overlay + radial glow + glass header creates three-dimensional atmosphere.

## File Structure

```
variants/04-portal-hub-2/
├── index.html           # Home/hero page with portal grid animation
├── features.html       # Detailed feature breakdown with glass cards
├── clients.html        # Client app listings with status badges
├── download.html       # Download/install guide with ecosystem list
├── plugins.html        # Plugin ecosystem documentation
├── docs.html           # Documentation links + ecosystem
├── hub.html            # Hub service explanation (NAT traversal)
├── about.html         # About/FAQ page with philosophy + license
├── css/
│   ├── base.css       # Reset, variables, focus, scrollbar, Space Grotesk + DM Sans @font-face
│   ├── theme.css      # Layout, glassmorphism, hero, cards, footer
│   └── components.css # Buttons, glass-card, portal-grid, animations, neon effects
├── js/
│   └── main.js        # Mobile nav, portal parallax, scroll reveal, 3D tilt
├── img/
│   ├── logo.svg       # Portal grid icon + Space Grotesk wordmark
│   ├── favicon.svg   # 32px portal grid icon
│   ├── og.svg        # 1200×630 social sharing image
│   └── PROMPTS.md    # SVG prompt documentation
├── fonts/             # Self-hosted WOFF2 fonts
│   ├── space-grotesk-bold.woff2
│   ├── space-grotesk-semibold.woff2
│   ├── space-grotesk-medium.woff2
│   ├── dm-sans-regular.woff2
│   ├── dm-sans-medium.woff2
│   └── dm-sans-bold.woff2
├── sitemap.xml        # All 8 pages with priorities
├── robots.txt         # Allow all, sitemap reference
└── manifest.webmanifest  # PWA manifest, theme #00D4FF
```

## Accessibility

- Skip link to main content
- Visible focus styles with neon cyan outline (`outline: 2px solid var(--color-accent)`)
- ARIA labels on navigation toggle and landmark regions
- `aria-current="page"` on active nav items
- All touch targets ≥44px
- `prefers-reduced-motion` fully respected

## Responsive Behavior

- Mobile-first approach
- Breakpoint at 768px for tablet/desktop layout
- Mobile nav collapses to hamburger with glass backdrop
- Fluid typography with `clamp()`
- Grid layouts collapse to single column on mobile
- Portal grid scales down for smaller viewports

## Technical Notes

### Browser Support
- Modern browsers with CSS `backdrop-filter` support
- Fallback to solid backgrounds for older browsers (progressive enhancement)
- All animations respect `prefers-reduced-motion`

### PWA
- Service worker not included (static site)
- Web app manifest with theme color `#00D4FF`, background `#0A1628`
- Standalone display mode

### Font Loading
```css
@font-face {
  font-family: 'Space Grotesk';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: local('Space Grotesk Bold'), local('SpaceGrotesk-Bold'),
       url('../fonts/space-grotesk-bold.woff2') format('woff2');
}
```

`font-display: swap` ensures text remains visible during font load with system fallback.

## Differentiation from Parent (04-portal-hub)

| Aspect | Parent (04-portal-hub) | This Variant (04-portal-hub-2) |
|--------|------------------------|-------------------------------|
| Visual metaphor | Portal ring with rotating concentric circles | Portal grid with concentric rings + radiating grid lines |
| UI density | Clean minimal with ample whitespace | Data-dense glass panels with more visual layering |
| Accent usage | Neon cyan sparingly on dark backgrounds | Neon cyan extensively on glass surfaces with glow effects |
| Typography | Poppins (headlines), Inter Light (body), Google Fonts | Space Grotesk (headlines), DM Sans (body), Self-hosted WOFF2 |
| Glass effect | `backdrop-filter: blur(12px)` | `backdrop-filter: blur(20px) saturate(150%)` |
| Motion | CSS-only portal ring rotation | JS-driven parallax + 3D card tilt |
| Background | Gradient + subtle portal glow | Gradient + grid pattern overlay + radial glow |

## Gotchas & Notes

- Portal grid parallax requires JS; falls back gracefully without it
- 3D tilt effect on glass cards uses `perspective(1000px)` transform — may cause layout shifts on low-end devices
- Glassmorphism may not render on older browsers (tested: Safari 14+, Chrome 87+, Firefox 78+)
- All external links use `rel="noopener noreferrer"` for security
- Self-hosted fonts require WOFF2 files in `/fonts/` directory; system fallbacks used if missing
