# Variant: 04-portal-hub-3 — Data Terminal / CRT Terminal Aesthetic

## Overview

This variant embodies the **Portal / Hub Icon** concept, evolved into a **Data Terminal / CRT Terminal** aesthetic. It features monospace-dominant typography, scanline and vignette effects, phosphor green glow, and a nostalgic terminal UI language that reinforces Phlix's self-hostable, developer-friendly ethos.

## Brand Source

- **Concept 4** from `phlix-server/docs/brand/brand_identity.md`
- **SVG prompts** from `phlix-server/docs/brand/svg_prompts.md`
- **Parent variant**: `04-portal-hub-2` (Portal Grid — Glassmorphism Focus)

## Design Language

### Color Palette (from brand kit 04-portal-hub-3)

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-primary` | #0D1A0D | Deep green-black primary background |
| `--color-secondary` | #001A00 | Dark green secondary surfaces |
| `--color-accent` | #39FF14 | Terminal bright green for glows/accents |
| `--color-text` | #00FF41 | Phosphor green primary text |
| `--color-muted` | #1A4D1A | Secondary/muted green text |

### Typography

**Self-hosted WOFF2-style fonts** (no external CDN dependency):

| Role | Font | Weights |
|------|------|---------|
| Display | VT323 | Regular (pixel/terminal aesthetic) |
| Body | IBM Plex Mono | Regular (400), Medium (500), Bold (700) |
| UI | IBM Plex Mono | Medium (500) |
| Code | IBM Plex Mono | Regular (system fallback) |

Font files referenced via `@font-face` with `local()` sources for system fallbacks.

### Visual Style

**CRT Scanline Effect** — Repeating linear gradient overlay simulating old monitor scanlines (`rgba(0,0,0,0.15)` at 2px intervals).

**CRT Vignette Effect** — Radial gradient darkening toward screen edges, creating depth and focus.

**Phosphor Glow** — Neon green `box-shadow` and `text-shadow` effects on interactive elements and headings.

**Terminal UI Patterns** — `>` prefix markers on list items, blinking cursor animation, command-prompt aesthetic throughout.

**Grid Background** — Subtle green grid pattern (`rgba(0,255,65,0.02)`) at 40px intervals.

### Motion Philosophy

All animations respect `prefers-reduced-motion: reduce`.

| Element | Animation | Trigger |
|---------|-----------|---------|
| Hero eyebrow | CRT flicker (opacity 0.8→1→0.9→1) | Continuous, 3s cycle |
| Cards/sections | Scroll reveal (fade + translateY) | Intersection Observer |
| Active nav | Highlight on scroll | Intersection Observer |
| Typing effect | Character-by-character reveal | JS-driven, terminal prompts |

## What's Distinctive

1. **CRT Terminal Aesthetic**: Full commitment to retro terminal look — scanlines, vignette, phosphor glow, monospace everything. No glass effects or gradients.

2. **Monospace-Dominant Typography**: VT323 display font gives authentic pixel/terminal feel. IBM Plex Mono for all body text creates unified terminal aesthetic.

3. **Terminal UI Language**: `>` markers on list items, command-prompt styling, code block aesthetics for feature descriptions.

4. **Phosphor Green on Black**: High-contrast green-on-black palette (#39FF14 on #0D1A0D) with glow effects, no other colors.

5. **CRT Flicker Animation**: Subtle opacity fluctuation on hero text simulating CRT phosphor behavior.

## File Structure

```
variants/04-portal-hub-3/
├── index.html           # Home/hero page with terminal aesthetic
├── features.html        # Detailed feature breakdown
├── clients.html         # Client app listings with status badges
├── download.html        # Download/install guide with ecosystem list
├── plugins.html        # Plugin ecosystem documentation
├── docs.html           # Documentation links + ecosystem
├── hub.html            # Hub service explanation (NAT traversal)
├── about.html         # About/FAQ page with philosophy + license
├── css/
│   ├── base.css       # Reset, CRT color variables, scrollbar styles
│   ├── theme.css      # Layout, CRT effects, terminal styling
│   └── components.css # Buttons, animations, terminal-specific components
├── js/
│   └── main.js        # Mobile nav, scroll reveal, typing effect
├── img/
│   ├── logo.svg       # Terminal icon + PHLIX wordmark
│   ├── favicon.svg   # 32px terminal icon
│   ├── og.svg        # 1200×630 social sharing image
│   └── PROMPTS.md    # SVG prompt documentation
├── sitemap.xml        # All 8 pages with priorities
├── robots.txt         # Allow all, sitemap reference
└── manifest.webmanifest  # PWA manifest, theme #39FF14
```

## Accessibility

- Skip link to main content
- Visible focus styles with phosphor green outline (`outline: 2px solid var(--color-accent)`)
- ARIA labels on navigation toggle and landmark regions
- `aria-current="page"` on active nav items
- All touch targets ≥44px
- `prefers-reduced-motion` fully respected (both CSS and JS)

## Responsive Behavior

- Mobile-first approach
- Breakpoint at 768px for tablet/desktop layout
- Mobile nav collapses to hamburger with solid dark backdrop
- Fluid typography with `clamp()`
- Grid layouts collapse to single column on mobile
- CRT effects scale appropriately on smaller viewports

## Technical Notes

### Browser Support
- Modern browsers with CSS `repeating-linear-gradient` and `radial-gradient` support
- All animations respect `prefers-reduced-motion` via CSS and JS checks
- CRT effects use `::before`/`::after` pseudo-elements (GPU-accelerated)

### PWA
- Service worker not included (static site)
- Web app manifest with theme color `#39FF14`, background `#0D1A0D`
- Standalone display mode

### Font Loading
```css
@font-face {
  font-family: 'VT323';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: local('VT323'), local('VT323-Regular'),
       url('../fonts/vt323-regular.woff2') format('woff2');
}
```

`font-display: swap` ensures text remains visible during font load with monospace system fallback.

## Differentiation from Parent (04-portal-hub-2)

| Aspect | Parent (04-portal-hub-2) | This Variant (04-portal-hub-3) |
|--------|--------------------------|-------------------------------|
| Visual metaphor | Glassmorphism with frosted panels | CRT terminal with scanlines and vignette |
| UI density | Data-dense glass panels | Clean terminal-style layouts |
| Accent color | Neon cyan (#00D4FF) | Phosphor green (#39FF14) |
| Typography | Space Grotesk (headlines), DM Sans (body) | VT323 (display), IBM Plex Mono (all text) |
| Glass effect | `backdrop-filter: blur(20px) saturate(150%)` | None — solid surfaces |
| Motion | Parallax, 3D tilt, scroll reveal | CRT flicker, scroll reveal, typing effect |
| Background | Gradient + grid pattern | Gradient + scanlines + vignette |
| Theme feel | Futuristic, ethereal | Nostalgic, developer-focused |

## Gotchas & Notes

- CRT scanline effect uses `position: fixed` pseudo-elements — ensure proper z-index layering
- Vignette effect darkens edges; may reduce contrast on low-quality displays — test accordingly
- VT323 is a pixel font; ensure font-size large enough for readability at small sizes
- All external links use `rel="noopener noreferrer"` for security
- Monospace-dominant design may feel restrictive for long-form content — consider line-length constraints
- Typing effect in JS only triggers on `.terminal-type` elements — ensure elements have proper class if used
