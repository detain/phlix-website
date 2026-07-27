# SITE.md — Autumn Harvest

## Concept & Vision

Autumn Harvest is a brand-kit site for Phlix that carries the warmth of an October afternoon indoors. The site should feel like stepping into a farmhouse kitchen where the fire is already lit — unhurried, generous, and completely at ease. Every screen invites you to settle in rather than rush past.

## Aesthetic Direction

**Theme:** Cozy fall harvest — warm almanac illustration meets farmhouse comfort. Inspired by late-Victorian botanical prints, hand-painted gouache harvest scenes, and the specific golden-hour light of October afternoons.

**Mood:** Grounding, nostalgic, abundant, warm. Never cold, clinical, or corporate.

## Color Palette

| Role | Name | Hex |
|------|------|-----|
| Primary | Maple Red | #b5321a |
| Secondary | Burnt Orange | #d4601a |
| Tertiary | Harvest Gold | #c8901a |
| Accent | Forest Green | #2d5016 |
| Background | Harvest Cream | #f7edd8 |
| Surface | Warm Parchment | #faf2e2 |
| Surface Alt | Linen Bisque | #ede0c4 |
| Text | Hearthstone | #1e140a |
| Border | Walnut Line | #3d2510 |
| Focus | Cider Glow | #d4601a |

Strong emphasis uses `#b05016` (supplemental channel — clears 4.5:1 on background).

## Typography

| Role | Family | Weight |
|------|--------|--------|
| Headline | Playfair Display | 700 |
| Display | Playfair Display | 900 |
| Body | Lora | 400, 500 |
| UI | Nunito | 400, 600, 700 |
| Mono | Inconsolata | 400, 700 |
| Number | Playfair Display | 700 |

All fonts self-hosted from the shared WOFF2 pool. Body line-height: 1.7 (relaxed). Body max-width: 72ch.

## Spatial System

- Max site width: 1440px
- Content width: 1200px
- Spacing scale: 4, 8, 12, 16, 24, 32, 48, 64, 96px
- Border radius scale: 4, 10, 18, 28, 999px (pill)

## Motion Philosophy

Slow, unhurried, organic. Leaf-drift animations, warm ease-out transitions, gentle settle easing. `cubic-bezier(0.22, 0.68, 0, 1.2)` for spring feel. Animations disabled under `prefers-reduced-motion` — both transitions AND animations per §19.20.

## Visual Assets

- **Logo:** Playfair Display wordmark in maple red on harvest cream, with a small maple leaf flourish
- **Favicon:** Square mark in maple red
- **OG image:** 1200×630 — harvest cream background, Playfair headline, leaf motif
- **Illustrations:** SVG maple leaf decorations in hero (drifting animation)
- **Mascot:** Mabel — anthropomorphic maple leaf in cream sweater with plaid scarf, holding a cider mug. Appears on Home, Features, Download, About pages.

## Layout & Structure

**Home page (narrative-scroll archetype):** Five sections in order:
1. `welcome` — hero with Golden Hour gradient + drifting leaves + tagline
2. `why` — pitch bullets (7 items)
3. `features` — 8 feature cards in auto-fill grid
4. `proof` — client grid + ecosystem repo links
5. `gather` — CTA section with 3-rung ladder

**Primary nav:** Home, Features (primary), Clients, Download (primary), About — with a `nav-menu__link--primary` emphasis class for Features and Download. Plugins, Docs, Hub demoted to footer columns.

**Responsive:** Mobile-first, 320px minimum. Nav collapses to hamburger at 768px. Cards reflow to single column.

## Component Inventory

- **Buttons:** primary (maple red pill), secondary (burnt orange pill), tertiary (parchment fill + walnut border), ghost, danger
- **Cards:** feature-card, client-card, download-card — all with walnut border, warm parchment surface, hover lift
- **FAQ:** `<details>/<summary>` pattern, no-JS compatible, warm copy
- **Nav:** sticky header, pill active state in maple red, hamburger on mobile
- **Footer:** 3-column grid (Product, Developers, Project) + tagline + licence note

## Interactions

- **Mabel mascot:** Fixed bottom-right, tip bubble, idle rocking animation, dismissible (sessionStorage)
- **Easter eggs:** logo-clicks:5 → leaf dance; typed "cider" → Mabel response; 18:00–22:00 → evening greeting
- **Scroll reveals:** IntersectionObserver fade-up on sections, disabled under reduced-motion
- **Nav toggle:** Keyboard accessible (Esc to close), focus trapped, outside-click to close

## Accessibility

- WCAG 2.2 AA baseline throughout
- Focus visible ring: 2px burnt orange with cream offset
- All interactive elements ≥44×44px touch target
- Layout survives 200% text zoom without clipping
- `prefers-reduced-motion` honored for all animations and transitions

---
@copyright 2026 Joe Huss <detain@interserver.net>
