# SITE.md — Volcanic Forge Brand-Kit Site

## Concept & Vision

Volcanic Forge dresses Phlix in the primordial drama of active volcanoes and ancient forges. The site should feel like standing at the edge of a caldera — obsidian-black depths cut through by rivers of molten orange, dramatic, high-contrast, and unapologetically bold. This is not a soft or approachable brand; it is for viewers who feel watching as much as they see.

**Brand DNA**: "Volcanic Forge is the raw heat of a volcano and the precision of an ancient forge, fused into a dark, intense media interface. It is obsidian-black surfaces cut through by rivers of molten orange and ember gold — dramatic, high-contrast, and unapologetically bold. It is never soft, pastel, or corporate; it is the feeling of standing at the edge of a caldera."

## Layout Archetype: Immersive

Full-bleed cinematic heroes, volcanic horizon gradients, a single ignition CTA per screen. Feature grids on obsidian backgrounds with basalt-dark cards. Dark-to-hot contrast drives every composition. Dense information architecture suits the TV/power-user audience.

## Color Palette

| Role | Name | Hex |
|------|------|-----|
| Primary | Molten Orange | `#E8611A` |
| Secondary | Lava Red | `#C0241A` |
| Tertiary | Ember Gold | `#D4820A` |
| Background | Obsidian | `#0E0C0A` |
| Surface | Basalt Dark | `#1C1916` |
| Surface Alt | Cooled Lava | `#2A2520` |
| Text | Forge White | `#F0EAE0` |
| Text Muted | Ash Gray | `#7A7268` |
| Border | Forge Iron | `#3D3530` |
| Success | Forge Green | `#4A8C5C` |
| Warning | Sulfur Yellow | `#C8A80E` |
| Error | Pyroclastic Red | `#A01810` |
| Info | Caldera Blue | `#2A6080` |
| Focus | Incandescent Ring | `#E8611A` |
| Shadow | Magma Shadow | `rgba(26,10,0,0.55)` |

**Gradients**:
- `Magma Channel` (135deg): `#E8611A → #C0241A → #6B0D08` — hero highlights, CTA halos
- `Eruption Glow` (radial): `rgba(232,97,26,0.35) → transparent` — heat radiance behind hero
- `Forge Horizon` (180deg): `#D4820A → #E8611A → #0E0C0A` — full-bleed hero backdrop
- `Cinder Fade` (90deg): `rgba(212,130,10,0.0) → rgba(212,130,10,0.18)` — edge-warm card glow

## Typography

| Role | Font | Usage |
|------|------|-------|
| Headline | Anton | ALL CAPS, eruption-scale hero headlines, section titles |
| Display | Barlow Condensed | Oversized stat figures, countdown numerals |
| Body | Barlow | Paragraphs, descriptions |
| UI | Barlow Semi Condensed | Buttons, nav, labels, chips, badges |
| Mono | JetBrains Mono | Code blocks, technical readouts |

**Typography rules enforced**:
- Headlines always ALL CAPS in Anton
- Never use weight 100–300 on dark backgrounds
- Body text min 15px on dark surfaces
- Barlow Semi Condensed for all UI elements

## Spatial System

Spacing scale: `4, 8, 12, 16, 24, 32, 48, 64, 96px` — nothing off-scale.

Corner radius: `3px (sm), 6px (md), 10px (lg), 16px (xl), 999px (pill)`

## Motion Philosophy

Weighty, dramatic, slow-build-to-fast-release. Motion echoes the forge: deliberate, powerful, conclusive.

- **Easing**: `cubic-bezier(0.22, 1, 0.36, 1)` (slow start, decisive end)
- **Hover**: Cards lift 3px + molten-orange border glow, 200ms ease
- **Button press**: Hard press to 0.96, snap back to 1.02, settle — like an anvil strike
- **Loading**: Radial lava-fill progress ring, "Forging…" text
- **Scroll reveals**: 300ms fade + 12px translateY, IntersectionObserver gated

`prefers-reduced-motion: reduce` replaces all particle/lava animations with instant opacity fades.

## Visual Assets

- **Logo**: Phlix wordmark (Anton) + angular anvil badge + lava accent stripe, forge-white on obsidian
- **Favicon**: Molten orange (#E8611A) square with anvil silhouette
- **OG Image**: 1200×630 volcanic scene, forge-horizon gradient, Phlix wordmark + "FORGED FOR THE SCREEN"
- **Feature icons**: Bold filled angular SVGs, ash-gray default / ember-gold active
- **Background texture**: CSS gradients (forge-horizon, eruption glow radial) — no raster hero image required

## Signature Elements

- Rivers of flowing magma / lava channels
- Obsidian rock face textures and facets
- Anvil and hammer silhouettes
- Eruption plume backlit by ember glow
- Glowing forge iron — white-to-orange gradient metal
- Ash and cinder particle fields
- Sulfur crystal formations in amber-gold

## Design Principles (hard constraints)

1. Every screen should feel like looking into a forge — dark depths, bright points of heat.
2. Contrast is intentional: obsidian black holds the eye; molten orange commands attention.
3. Typography is heavy and condensed — headlines should feel stamped, not set.
4. Texture is non-negotiable: rock grain, hammered metal, and ash residue ground every surface.
5. One ignition point per screen — a single red-hot CTA that pulls the eye immediately.
6. Motion echoes the forge: slow heavy buildup followed by fast decisive release.
7. Backgrounds are never pure black; they hold the depth of cooled lava — near-black with warmth.
8. Shadows carry heat: they tint orange-amber, never cool gray.
