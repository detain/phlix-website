# SITE.md — Obsidian Pulse

## Design identity

- **Archetype**: `minimal` (same as bamboo-sanctuary sibling)
- **Theme**: Dark premium tech — polished obsidian surfaces, electric blue pulse lines, precision-machined aesthetic
- **Personality**: Sophisticated, precise, authoritative, reserved, powerful, refined

## Color system

| Token                 | Hex       | Usage                                           |
| --------------------- | --------- | ----------------------------------------------- |
| `--color-bg`          | `#0A0B0E` | Obsidian — default page background              |
| `--color-surface`     | `#111317` | Matte Black — card surfaces                     |
| `--color-surface-alt` | `#16191F` | Gloss Black — hover, elevated surfaces          |
| `--color-primary`     | `#00B4FF` | Pulse Blue — single accent, CTAs, active states |
| `--color-secondary`   | `#C8CDD6` | Platinum Silver — dividers, captions            |
| `--color-text`        | `#F0F2F5` | Optical White — all body text on dark           |
| `--color-border`      | `#2A2E38` | Hairline Silver — 1px borders                   |

**Contrast**: Optical White (#F0F2F5) on Obsidian (#0A0B0E) = ~18:1. All text passes WCAG AA easily.
`<strong>` uses DM Sans 500 + `#00B4FF` color for ≥4.5:1 on all surfaces.

**Seasonal variants** (live-js, §20): Winter Signal (12-01–01-15): `--color-primary: #60CFFF`, `--color-bg: #07090D`. Midnight Edition (07-01–07-31): `--color-surface: #0D0F14`, `--color-primary: #00A3FF`.

## Typography

- **Headline**: DM Sans 300, tracking 0.08em
- **Display**: Space Grotesk 300, tracking 0.12em
- **Body**: DM Sans 400/500, tracking 0.01em
- **UI**: Inter 400/500/600, tracking 0.02em
- **Mono**: JetBrains Mono 400/500
- **Number**: Space Grotesk 300
- All fonts self-hosted WOFF2 from `shared/assets/fonts/`.

## Experience fields implemented

`site_architecture`, `homepage_narrative`, `page_blueprints` (spec-sheet/device-rack/workbench/technical-brief), `copy_overlay`, `feature_casting`, `copy_treatments`, `faq_experience`, `hero_experience` (animated pulse scan), `navigation_model` (topbar), `scroll_experience` (continuous), `easter_eggs` (logo-clicks:5), `conversion_funnel` (workbench), `proof_strategy`, `experience_archetype` (minimal), `complexity_profile`, `seasonal_activation` (live-js), `error_page_experience`, `persona_vignettes`.

**Absent (→ default)**: `visitor_paths`, `intensity_toggle`, `mascot` (null in kit).

## Layout rhythm

- Home: 5 sections — hero (scan line), features (3-card grid), proof (spec-band), clients (5-device rack), download (workbench)
- Max content width: 1400px, min side margin: 48px
- Grid tracks: `minmax(0, 1fr)` per §19.12
- All prose text: `overflow-wrap: anywhere`

## Key design decisions

1. One Pulse Blue filled button per view — primary CTA only
2. `overflow: hidden` avoided on any container whose text must reflow
3. `<strong>` weight 500 + Pulse Blue color (not weight alone, per §19.17)
4. Install command: verbatim from `content.json.install.primary.command` — never retyped
5. Footer LICENSE link: `https://github.com/detain/phlix-server/blob/master/LICENSE`
6. `mascot: null` → no companion element, no fixed overlay at 320px
