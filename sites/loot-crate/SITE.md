# Loot Crate — Brand Kit Site

## Concept & Vision

A gaming/loot-box themed marketing site for Phlix. The aesthetic evokes mystery crates, RNG rewards, and the thrill of unlocking rare items. Every interaction feels like opening a crate — glowing rarity tiers, surprise mechanics, and the unlock culture of gaming. Dark, atmospheric, with neon glows that evoke a premium gaming UI.

## Aesthetic Direction

Dark mystery crate aesthetic with glowing rarity-tier accents. Deep space purple backgrounds, neon purple/gold/red highlights, and a sense of excitement around "opening" the Phlix media server.

## Color Palette

| Role | Name | Hex |
|------|------|-----|
| Background | Deep Purple | `#1A0A2E` |
| Surface | Dark Violet | `#231040` |
| Surface Alt | Mid Violet | `#2D1556` |
| Primary | Epic Purple | `#9B59B6` |
| Secondary | Gold/Rare | `#F39C12` |
| Accent | Red | `#E74C3C` |
| Highlight | Legendary Gold | `#FFD700` |
| Text | Pale Lavender | `#F0E6FF` |
| Text Muted | Dusty Lavender | `#B8A0D4` |
| Common | Gray | `#AAAAAA` |
| Rare | Blue | `#3498DB` |
| Epic | Purple | `#9B59B6` |
| Legendary | Gold | `#FFD700` |

## Typography

- **Display:** Chakra Petch (gaming/tech feel) — hero headlines, wordmark
- **Body/UI:** IBM Plex Sans — all body text, navigation
- **Mono:** IBM Plex Mono — code blocks, badges, labels

## Spatial System

- Spacing scale: 0.25rem to 6rem (space-1 through space-24)
- Border radii: 4px (sm), 8px (md), 12px (lg), 20px (xl)
- Max content width: 1400px

## Motion Philosophy

- Glow effects on hover for interactive elements
- Subtle color transitions (0.25s ease)
- Card lifts on hover (translateY -2px)
- FAQ accordion with smooth rotate on the + icon
- Reduced motion: all animations disabled under prefers-reduced-motion

## Visual Assets

- **logo.svg:** Crate box with star/loot symbol + PHLIX wordmark in gradient
- **favicon.svg:** 32x32 crate icon in deep purple with gold star
- **og.png:** Generated via `node tools/gen-og.mjs --site loot-crate`
- **Inline SVG icons:** 8 feature icons (library, syncplay, transcode, shield, antenna, broadcast, puzzle, hub) + UI icons (chevron, external, github, copy, menu, close)
- **Rarity badges:** Common (gray), Rare (blue), Epic (purple with glow), Legendary (gold with glow), Beta (gold border)

## Key Design Decisions

1. **Glow effects everywhere** — primary/secondary/highlight glows on cards and buttons create the neon gaming feel
2. **Rarity badge system** — clients get rarity tier badges (Legendary = stable native clients, Epic = DLNA, Beta = mobile)
3. **No Google Fonts CDN** — all fonts self-hosted via `@font-face` pointing to WOFF2 in shared/assets/fonts/
4. **CSS custom properties** — entire design token system in `:root` for easy theming
5. **Grid with minmax(0, 1fr)** — avoids overflow issues at narrow widths

## Compliance

- Install command in hero CTA of index.html AND download.html
- 4 native clients + DLNA (never "5")
- Footer: 3 columns + "Open-source media, on your terms."
- All pages: OG + Twitter meta, twitter:creator=@detain
- FAQ: `<details>/<summary>` elements
- CSS @copyright inside `/* */` comment blocks
- Grid: `minmax(0, 1fr)` not bare `1fr`
