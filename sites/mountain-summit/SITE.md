# Mountain Summit — Brand Kit Site

## Concept & Vision

Towering mountain peak, thin crisp air, sunrise glow. Rocky granite, snow caps, alpine clarity. The mountain-summit theme evokes the feeling of standing at elevation — clean, crisp, and expansive. The palette draws from granite rock faces, the rich purples and reds of alpenglow at dawn, and the sharp amber of sunrise hitting a snow cap.

## Aesthetic Direction

**Mood:** High-altitude clarity. Sharp contrasts, crisp edges, generous breathing room. The sense that you're above the noise — everything is clean and purposeful.

**Imagery:** Stylized mountain iconography, geometric peak shapes, subtle topographic patterns. Not photorealistic — abstract geometry with strong color anchors.

**Motion:** Purposeful and restrained. Like wind across a ridge — present but not distracting. Scroll reveals that feel like objects coming into view at elevation.

## Color Table

| Role | Name | Hex | Usage |
|------|------|-----|-------|
| Primary | Deep Slate | `#2C3E50` | Body text, headers, grounding elements |
| Secondary | Alpenglow Purple | `#8E44AD` | Accent interactions, links, highlights |
| Accent | Sunset Red | `#E74C3C` | Primary CTAs, urgent actions, warmth |
| Highlight | Sunrise Amber | `#F39C12` | Eyebrow labels, special callouts, glow |
| Surface | Crisp Snow | `#ECF0F1` | Backgrounds, cards, light surfaces |

## Typography Roles

| Role | Font | Usage |
|------|------|-------|
| Display / Headlines | Crimson Pro | Hero h1, section titles, impact moments |
| Body / UI | Source Sans 3 | Paragraphs, navigation, buttons |
| Monospace | JetBrains Mono | Code blocks, technical strings |

All fonts are self-hosted via WOFF2 from the shared font pool. No external CDN.

## Spatial System

- **Base unit:** 4px
- **Spacing scale:** 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128px
- **Corner radius:** Subtle — 4px to 16px max, preferring sharp or barely-rounded
- **Max content width:** 1400px
- **Grid:** CSS Grid with `minmax(0, 1fr)` tracks to prevent overflow

## Motion Philosophy

**Principle:** Controlled reveals that suggest altitude clearing. Elements fade and rise into view — never bounce or playful spring. The aesthetic is wind and light, not playfulness.

- Scroll reveals: fade-in-up at 0.6s ease
- Hover states: subtle lift (translateY -2px to -4px) with shadow deepening
- CTAs: glow pulse on hover for primary actions
- Respect `prefers-reduced-motion: reduce` — all animation drops gracefully

## Visual Assets

| Asset | Description |
|-------|-------------|
| `img/logo.svg` | Mountain peak with sun, wordmark "Phlix", palette accent colors |
| `img/favicon.svg` | Square mark, mountain + sun on slate background |
| `img/og.png` | Social share card — mountain silhouette, brand text, sunrise gradient |

## CSS Architecture

Three stylesheets, loaded in order:

1. **base.css** — Reset, custom properties (colors/spacing/radii/shadows/fonts), base elements, accessibility utilities
2. **theme.css** — Typography scale, layout containers, structural sections (hero, pitch, features, CTA)
3. **components.css** — Header, footer, buttons, cards, FAQ accordion, 404 error page, animations

## Technical Notes

- CSS custom properties throughout — every color/spacing/radius is a variable
- Grid tracks use `minmax(0, 1fr)` to prevent overflow from unbreakable strings
- No JavaScript required for core content — nav works via CSS, FAQ uses `<details>/<summary>`
- All interactive elements have visible focus states
- Touch targets ≥ 44×44px throughout
