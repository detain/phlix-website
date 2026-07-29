# VOID WALKER — Site Design Rationale

## Concept & Vision

Void Walker is the art of traversing the emptiness between dimensions. The site should feel like standing in the membrane between realities — not empty, but full of swirling potential. Every element suggests the portal light of dimensional rifts piercing through the void. The experience is eerie and inviting simultaneously: the beauty of the uncanny.

## Aesthetic Direction

**Theme:** Interdimensional void, portals, dimensional rifts, shadow creatures
**Archetype:** Magician — mysterious, interdimensional, transformative

## Color Palette

| Role | Name | Hex | Usage |
|------|------|-----|-------|
| Background | Deep Void | `#0A0A0F` | Primary page background — absolute dimensional darkness |
| Surface | Dimensional Surface | `#1A1A2E` | Cards, panels — the membrane between dimensions |
| Surface Alt | Shadow Purple | `#2D2D44` | Hover states, nested panels |
| Primary | Rift Violet | `#6C63FF` | CTAs, links, portal glow — the light of dimensional tears |
| Accent | Shadow Coral | `#FF6B6B` | Warning, error, shadow creature eyes |
| Text | Membrane White | `#E8E8F0` | All body and headline text |

## Typography

| Role | Font | Weight | Notes |
|------|------|--------|-------|
| Headlines | Orbitron | 700 | Mission-critical hero headlines — the gravity well |
| Display | Exo 2 | 300 | Oversized stats, background watermarks |
| Body | Inter | 400, 500 | Paragraphs, descriptions |
| UI | Rajdhani | 400, 500, 600 | Buttons, navigation, badges |
| Mono | Space Mono | 400, 700 | Code, technical metadata |

## Spatial System

- Base unit: 4px
- Spacing scale: 4, 8, 12, 16, 24, 32, 48, 64, 96px
- Max content width: 1400px
- Corner radius: 4px (sm), 8px (md), 16px (lg), 24px (xl)

## Motion Philosophy

Motion is **threshold-crossing** — entering and exiting, never bouncing. Portals swirl open, rifts flicker and stabilize, debris orbits gravity wells.

- **Hover:** Cards gain violet portal glow border and lift 3px
- **Transitions:** Portal swirl — content spirals open like a dimensional gateway
- **Easing:** `cubic-bezier(0.22, 0.61, 0.36, 1)` — slow, inevitable

Under `prefers-reduced-motion`: glow pulses replace swirls, parallax becomes static gradient.

## Visual Assets

- **Logo:** Orbitron wordmark inside circular portal border in rift violet
- **Icons:** 1.5px stroke, circular forms preferred, rift violet fill
- **Favicon:** Portal circle in rift violet on deep void background

## Navigation Labels (Kit Override)

Per the Void Walker brand kit, navigation uses dimensional metaphors:

| Page | Label |
|------|-------|
| Home | The Crossing |
| Features | Portals |
| Clients | Void Walker |
| Download | Step Through |
| Hub | Between |
| About | The Void |

Plugins and Docs are demoted to footer-only (auxiliary systems for those who have crossed).

## Brand Don'ts

- Not bright, cheerful, fast, snappy, or bouncy
- Not flat, minimal, playful, or cute
- Never warm tones except shadow coral accents
- No solid ground imagery

## Accessibility

- WCAG AA minimum: 4.5:1 for body text
- Focus ring: 2px rift violet with 2px void offset + 4px violet outer glow
- Touch targets: minimum 44×44px (48px preferred)
- Reduced motion respected throughout
