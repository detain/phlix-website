# SITE.md — power-up brand kit

## Concept & Vision

A retro arcade game power-up collectibles theme — the kind of vibe you'd hear at an 80s arcade: coins clinking, invincibility stars spinning, achievement reward fanfare. Every page feels like you've just collected a power-up: bright gold glows against a dark warm background, animated stars and coins drifting across the screen. The design leans into the joy of collecting and leveling up — your media library is a treasure trove you're building.

## Aesthetic Direction

Arcade pickup aesthetic: dark warm backgrounds reminiscent of an arcade cabinet's interior, gold coin primary accents for brand identity, orange-red fire for secondary/action elements, and cyan invincibility stars as the highlight accent. Typography is bold and game-forward, with display fonts that feel like scoreboard lettering.

## Color Palette

| Role | Name | Hex |
|------|------|-----|
| Background | Arcade Black | `#1A0A00` |
| Background Alt | Cabinet Brown | `#2D1200` |
| Surface | Deep Mahogany | `#3D1800` |
| Primary | Gold Coin | `#FFD700` |
| Primary Dim | Tarnished Gold | `#B8960A` |
| Secondary | Fire Orange | `#FF4500` |
| Secondary Dim | Ember Red | `#CC3700` |
| Highlight | Invincibility Cyan | `#00CED1` |
| Highlight Dim | Deep Cyan | `#009A9C` |
| Text | Off-White | `#F5F5F5` |
| Text Dim | Arcade Gray | `#C4C4C4` |
| Border | Bronze | `#5C3A00` |

## Typography

- **Display font**: `Bangers` (self-hosted WOFF2 from shared/assets/fonts/bangers-400-latin.woff2) — used for all headings, hero text, and UI labels. Chunky arcade scoreboard feel.
- **Body font**: `Barlow` / `Barlow Semi Condensed` (self-hosted) — clean, highly readable for product copy.
- **Fallbacks**: `Boogaloo` for display, `sans-serif` for body.

## Spatial System

Uses the standard spacing scale from base.css: `--space-1` through `--space-24` with 0.25rem base unit. Generous padding in hero sections, tighter in feature cards. Layout max-width: 1400px.

## Motion Philosophy

- **Ambient float**: Gold coins float up and down continuously; cyan stars spin slowly — creates the "collectibles drifting in a bonus round" feeling.
- **Glow pulse**: Hero headline has a pulsing text-shadow glow in gold — like an arcade marquee.
- **Hover lift**: Cards lift up 4px on hover with glowing shadow matching their accent color.
- **FAQ accordion**: Smooth 45-degree rotation on the `+` icon when opening/closing.
- **Reduced motion**: All animations collapse to instant/opacity-only under `prefers-reduced-motion: reduce`.

## Visual Assets

- **logo.svg**: Phlix wordmark with animated gold coin (left) and spinning cyan star (right), fire-orange gradient underline, retro arcade feel.
- **favicon.svg**: 32×32 dark background with gold coin and "P" letterform.
- **og.png**: Generated via `node tools/gen-og.mjs --site power-up`.
- **Icons**: Inline SVG stroke-based icons for all 8 features, matching the single-color cyan/gold palette.

## Layout Archetype

Standard topbar navigation → hero → sections → CTA banner → footer. Content grids use `repeat(auto-fit, minmax(min(100%, 320px), 1fr))` which is a fluid responsive pattern. No fixed breakpoints for columns — the auto-fit grid handles everything.

## Component Inventory

- **Nav**: Sticky top bar with frosted glass backdrop blur, logo left, 8 nav links, hamburger on mobile.
- **Hero**: Centered text, eyebrow badge, animated glow headline, two CTA buttons, install command code block below CTAs.
- **Feature cards**: Dark card with top gradient border, icon, title, body, lift-on-hover.
- **Client cards**: Similar to feature cards with status badge, name, tagline, highlights list, source link.
- **Code block**: Dark background (#0D0500), gold monospace text, dollar prompt prefix.
- **FAQ**: `<details>/<summary>` accordion with rotating `+` icon.
- **Footer**: 3-column nav grid, centered tagline in display font, copyright line.

## Technical Notes

- No Google Fonts CDN — fonts loaded from `../../shared/assets/fonts/` as WOFF2.
- CSS grid uses `minmax(0, 1fr)` pattern throughout to prevent overflow at narrow widths.
- All pages are standalone static HTML with no runtime template.
- `og:image` must be absolute URL — rule is enforced by check-meta.mjs.
