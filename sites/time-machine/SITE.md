# Time Machine Brand Kit — Design Rationale

## Concept & Vision

**Time Machine** is a steampunk clockwork visual identity for Phlix. It evokes Victorian-era futurism — brass mechanisms, copper fittings, ticking gears, and the romance of precision engineering. The aesthetic says "crafted with care, built to last" — which mirrors Phlix's philosophy of self-hostable, owner-controlled media infrastructure.

The design language draws from antique clock faces, nautical instruments, and industrial-age typography. Every visual element should feel like it was machined, not generated.

## Aesthetic Direction

**Reference:** Victorian-era clockwork instruments, brass telescope fittings, aged copper engravings, antique scientific illustrations.

The palette creates warmth against the dark background — the feeling of a well-lit workshop where timepieces are crafted. Accent colors suggest polished brass under gaslight.

## Color Palette

| Role | Name | Hex | Usage |
|------|------|-----|-------|
| Background | Dark | `#1A0A0A` | Page backgrounds, dark surfaces |
| Surface | Deep mahogany | `#241010` | Cards, elevated surfaces |
| Surface raised | Warm dark | `#2D1515` | Hover states, raised elements |
| Primary | Brass | `#B8860B` | CTAs, links, accents, icons |
| Primary light | Bright brass | `#D4A017` | Hover states |
| Secondary | Copper | `#CD853F` | Secondary accents, borders |
| Tertiary | Brown | `#4A3728` | Subtle borders, dividers |
| Text | Cream | `#E8D5B7` | Primary text, headings |
| Text muted | Aged paper | `#C4A882` | Secondary text, body copy |
| Border | Rust brown | `#5C3D2E` | Borders, dividers |
| Border light | Copper brown | `#7A5240` | Hover borders |

## Typography

**Display:** Cinzel (fallback: Georgia, serif) — elegant serif with classical proportions, perfect for Victorian aesthetic.

**Body/UI:** Crimson Text (fallback: Georgia, serif) — readable serif that maintains the period feel.

**Mono:** Courier Prime (fallback: Courier New, monospace) — for code blocks, maintaining the mechanical/typing feel.

All fonts are self-hosted (no Google Fonts CDN).

## Spatial System

- **Base unit:** 8px grid
- **Spacing scale:** xs (4px), sm (8px), md (16px), lg (24px), xl (32px), 2xl (48px), 3xl (64px), 4xl (96px)
- **Border radius:** minimal (2-8px) — sharp edges feel more machined
- **Max content width:** 1400px

## Motion Philosophy

**Principle:** Mechanical precision, not digital smoothness.

- Gear-like transitions (rotation transforms)
- Staggered reveals suggesting clockwork mechanisms engaging
- No bouncy/spring animations — everything turns, not bounces
- `prefers-reduced-motion` respected: instant state changes, no animation

Key animations:
- **Fade in up** with staggered delays (100ms between items) — like gears sequentially engaging
- **Hover lifts** with subtle glow — like brass warming under touch
- **404 page gear rotation** — perpetual motion machine reference

## Visual Assets

### Logo
- Gear/cog motif in brass gradient
- Typography in cream with brass accent line
- Small decorative gear element

### Favicon
- Single gear/cog in brass on dark background
- Square format, all sizes

### Icons
- Stroke-based, single-color (brass)
- Consistent 24×24 viewBox
- Stroke width: 2px
- Examples: clock faces, gears, transmission towers, shields

### Background
- Subtle radial gradient overlays suggesting brass glow
- Fixed background attachment for depth

### Decorative Elements
- Gear teeth motifs in dividers
- Clock/timer symbols in FAQ accordion
- "⚙" character for bullet points (mechanical feel)

## CSS Architecture

```
css/
├── base.css      # Reset, tokens (:root variables), element defaults
├── theme.css     # Typography, layout containers, page structure
└── components.css # Header/nav, footer, buttons, cards, forms
```

All colors defined once in `:root` as CSS custom properties, referenced via `var()` throughout.

## Accessibility Notes

- WCAG 2.2 AA compliant
- Brass on dark provides ~7:1 contrast ratio for text
- Focus states use brass outline
- All interactive elements 44×44px minimum touch target
- `prefers-reduced-motion` fully respected

## Responsive Strategy

- Mobile-first approach
- Breakpoints: 320px, 375px, 414px, 640px, 768px, 1024px, 1280px, 1920px
- Single column on mobile, multi-column grid on desktop
- Grid tracks use `minmax(0, 1fr)` not bare `1fr` to prevent overflow
