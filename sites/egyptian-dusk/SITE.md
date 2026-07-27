# SITE.md — Egyptian Dusk

## Concept & Vision

Egyptian Dusk is the hour when Ra descends behind the pyramids and the Nile turns to molten gold — the threshold between the living world and the eternal kingdom of the dead. This brand-kit site channels that liminal grandeur into every pixel: watching becomes a ceremonial act, every frame a hieroglyph, every session a passage through the Hall of Two Truths. The site must feel like a royal tomb fresco come to life, not a generic media server landing page.

## Aesthetic Direction

Ancient Egyptian ceremonial. Rich lapis lazuli and pharaoh gold dominate. Deep black Nile silt as the eternal ground. Compositions are symmetrical and processional — figures face in profile, elements arranged in registers. Lighting is warm and directional: amber-gold from low angles, deep violet in the shadows. Everything feels carved, deliberate, and eternal.

## Color Palette (role → name → hex)

| Role | Name | Hex |
|---|---|---|
| Primary | Pharaoh Gold | `#D4A520` |
| Secondary | Lapis Lazuli | `#1A4890` |
| Tertiary | Terracotta Fire | `#C8440A` |
| Neutral | Sandstone | `#7A6040` |
| Background | Black Silt Night | `#0A0603` |
| Surface | Khufu's Shadow | `#130C05` |
| Surface Alt | Desert Night | `#1C1008` |
| Text | Papyrus Cream | `#FFF5D8` |
| Success | Nile Reed Green | `#2E7D52` |
| Warning | Desert Amber | `#E8900A` |
| Error | Cobra Red | `#B82020` |
| Info | Faience Blue | `#3A82C4` |
| Border | Ancient Stone | `#2C1E0A` |
| Focus | Golden Focus Pulse | `#D4A520` |

Safe substitutes from measured contrast (brief, §19.1):
- `#5678AD` — secondary-safe on bg
- `#507CB9` — secondary-safe on surface
- `#cc531e` — tertiary-safe on surface

Seasonal variants: Opet Festival (gold +40%, lapis shift), Night of Osiris (terracotta + violet), Winter Solstice Ra (gold +10%).

## Typography Roles

| Role | Family | Weight | Notes |
|---|---|---|---|
| Headline | Cinzel | 700, 900 | Dramatic page titles; classical Roman/Egyptian authority |
| Display | Cinzel Decorative | 700, 900 | Oversized ceremonial display; monumental only |
| Body | Cormorant Garamond | 400, 500 | Descriptions, long-form; editorial elegance |
| UI | Cinzel | 400, 600 | Buttons, labels, navigation; authoritative and legible |
| Mono | Courier Prime | 400, 700 | Technical readouts, tomb-inscription moments |
| Number | Cinzel | 700 | Stats, runtimes; inscribed numerals |

## Spatial System

Spacing scale (from kit): 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96px.

Max content width: 1400px, centred. Layout uses `minmax(0, 1fr)` grid tracks to prevent overflow at 320px and 200% text zoom (§19.12).

Corner radii: small=1px, medium=3px, large=6px, xl=10px, pill=999px. Borders are thin (1px) and nearly square.

## Motion Philosophy

Ceremonial, processional, weighted, slow. The header wordmark carries a slow golden shimmer animation — Ra's sun-disk crossing the sky. Each homepage section arrives like a hieroglyphic chapter unrolling: horizontal wipe + gold shimmer at section boundary. Hover states: cards gain 1px Gold border + warm gold box-shadow over 280ms ease-in-out. Button press: brief Pharaoh Gold lighten (lighten 10%) then return in 180ms.

Under `prefers-reduced-motion`: all animations replaced with instant state; scroll reveals show immediately; Kheper idle animation stops.

## Visual Assets

All imagery is absent from this build (no image assets were requested — kit asks for artwork that does not exist → noted in BUILD_LOG.md, not a defect). The img/ directory contains: logo.svg, favicon.svg, og.svg, og.png, apple-touch-icon.png, icon-192.png, icon-512.png, favicon-16x16.png, favicon-32x32.png.

Inline SVG icons for features (library, syncplay, transcode, auth, livetv, dlna, plugins, hub) — single-color stroke-based, Pharaoh Gold active state.

The mascot Kheper (golden scarab with lapis lazuli wings) appears bottom-right on desktop (fixed) and in-flow on mobile.

## Layout Archetype

`narrative-scroll` — 5-section home page with story-first arc. Sections: cartouche-entrance (hero), sacred-scrolls (hero feature castings), why-ascend (pitch), keepers-testament (proof), passage-awaits (conversion). Each section enters with a ceremonial chapter wipe.

Nav: 6 primary items ("The Kingdom", "Sacred Scrolls", "The Pantheon", "Enter the Tomb", "The Mirror", "The Cartouche") + 2 demoted to footer ("Plugins", "Docs").

Extra page: archive-journey.html — 6-step ceremonial walkthrough to become the keeper.

## Component Inventory

- **Buttons**: primary (Pharaoh Gold bg), secondary (transparent + Gold border), ghost (Stone border), danger (Cobra Red), fab (Pharaoh Gold + gold_glow shadow).
- **Cards**: feature-card (grid), feature-detail (full-page), client-card (stele-pantheon styling), download-card.
- **Badges**: stable (green), beta (amber), deprecated (terracotta), quality (cartouche oval).
- **Code block**: Black Silt bg, 1px Stone border, 3px Gold left border, Courier Prime mono.
- **FAQ list**: archive-testimony style — Khufu's Shadow cards, 3px Gold left border, Kheper persona framing.
- **Mascot**: Kheper SVG scarab with lapis wings, idle sun-disk roll animation, contextual tips, easter interactions (click:7 wings shimmer, hover-hold:3s wings spread).
