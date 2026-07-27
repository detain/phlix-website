# SITE.md — Solarpunk Eden Design Rationale

## Concept

Solarpunk Eden is the **exhibition archetype** for Phlix — a brand-kit site that presents the media server as a flourishing communal garden. The experience archetype is "exhibition" meaning the design showcases and celebrates the product's richness through abundant visual metaphors, rich decorative motifs, and a warm, optimistic atmosphere.

The guiding metaphor: a **rooftop garden** where neighbors share seeds, tools, and harvests. Phlix is the soil, the sunlight, and the trellis that helps your media library grow into something beautiful and communal.

## Palette

All colors are garden-inspired and earth-grounded. The palette uses warm neutrals (parchment, clay), living greens (canopy, deep-canopy, new-leaf), and solar accents (solar-gold, marigold). The tertiary sky-prism provides cool counterpoint.

| Token | Hex | Role |
|---|---|---|
| `--color-canopy` | #2d7a4f | Primary — the green of a healthy canopy |
| `--color-deep-canopy` | #1a2e1e | Text on light, footer background |
| `--color-solar-gold` | #e8a020 | Accent — ripe fruit, active states |
| `--color-parchment` | #f4efe0 | Warm neutral — light backgrounds |
| `--color-meadow` | #e8f0e2 | Secondary background — dappled lawn |
| `--color-clay` | #8b6347 | Warm earth — muted text, quotes |
| `--color-sky-prism` | #4aadcf | Cool accent — links, secondary actions |
| `--color-rust` | #c0472e | Danger/warning |

## Typography

- **Headlines:** Playfair Display 700/900 — editorial serif with garden-journal character
- **Display:** Cormorant Garamond 600/700 — elegant, romantic, used for wordmark and pull quotes
- **Body:** Source Serif 4 400/600 — highly readable, warm serif for long-form reading
- **UI:** DM Sans 400/500/700 — clean, modern sans for navigation and chrome
- **Mono:** JetBrains Mono 400/700 — for install commands and code blocks

All fonts are self-hosted WOFF2, loaded via `@font-face` with `font-display: swap`.

## Motion

- **Entrance:** Staggered scroll-reveal (IntersectionObserver) with `translateY(20px) → 0`, 280ms base duration, `cubic-bezier(0.25, 0.46, 0.45, 0.94)` easing
- **Hover:** Spring-based micro-interactions (`cubic-bezier(0.34, 1.56, 0.64, 1)`) — cards lift and rotate slightly
- **Frond mascot:** Idle rocking animation (4s ease-in-out infinite), joy spin on easter egg trigger
- **Reduced motion:** All animations collapse to instant; Frond idle disabled

## Visual Motifs

- **Botanical dividers:** Inline SVG vine paths with gold dot accents used as section separators
- **Seed packets:** Feature cards styled as seed catalog packets with grow-labels
- **Garden beds:** Pitch bullets styled as tilled soil rows with leaf bullet markers
- **Frond companion:** Custom SVG character with tendril arms, appears on Home/Features/Download

## Spatial System

- **Container max-width:** 1200px content, 1440px max
- **Spacing scale:** 4/8/12/16/24/32/48/64/96px (base-4)
- **Border radii:** 8/16/24/40/999px (soft, organic feel)
- **Shadows:** Green-tinted (`rgba(45, 122, 79, 0.14–0.22)`) for cohesion with palette

## Seasonal Variants

Four seasonal palette overrides gated by live JS date check:
- **Harvest** (Sep 15–Nov 15): warmer parchment, deeper gold
- **Winter** (Dec 1–Jan 15): darker greens, muted gold
- **Bloom** (Mar 20–May 31): rose-tinted secondary
- **Summer** (Jun 21–Aug 31): bright gold, light parchment

Seasonal data is purely presentational — colors shift to reflect the passage of time in the garden.

## Complexity Profile

Per `complexity_profile`, this kit uses:
- **minimal** density — generous whitespace, 5 sections max on home
- **plain** reading level — no jargon beyond established technical terms
- **translate** jargon policy — technical terms surfaced with plain-language explanations in `<details>`

## Special Elements

- **Frond mascot:** Fixed position companion on Home/Features/Download. Shows contextual tips via IntersectionObserver. Dismissible via localStorage.
- **Easter eggs:** Three discoverable interactions — click:5 (petal shower), typed-word:solarpunk (sepia mode), scroll-to-footer (ant march)
- **Intensity toggle:** "Dim the lights" in footer. Reduces motion and dims the palette via CSS class + localStorage
- **Visitor paths fork:** Self-select prompt near hero for three audience types (family watchers, collection managers, remote access seekers)
