# SITE.md — Nordic Saga

## Concept

Nordic Saga is the Norse mythology and Viking Age brand kit for Phlix. The experience is designed to feel like stepping into a torchlit mead hall before the skald begins a tale — powerful, ancient, and carved rather than printed. Every frame feels like it was illuminated on parchment or carved into stone.

## Design Language

### Palette

| Name | Hex | Usage |
|------|-----|-------|
| Forge Fire | `#C8700A` | Primary CTA, active states — the hammer blow |
| Fjord Steel | `#4A8FB5` | Secondary actions, links, cold-sea accents |
| Rune Violet | `#8B6DC8` | Mystical accents — seidr, prophecy |
| Fjord Night | `#060C12` | Default page background — winter dark |
| Storm Sea | `#0A1320` | Card and panel surfaces |
| Deep Current | `#101C2C` | Alternate surface, striped rows |
| Bone White | `#E8E0D0` | Primary text — carved bone / aged parchment |
| Iron Dust | `#5A6070` | Muted UI chrome, dividers |

### Typography

| Role | Font | Weights |
|------|------|---------|
| Headline | Cinzel | 700, 900 |
| Display | Uncial Antiqua | 400 |
| Body | Merriweather | 400, 700 |
| UI / Nav | Cinzel | 400, 600 |
| Mono | Source Code Pro | 400, 600 |

**Strong tag**: `font-weight: 700` — Merriweather declares [400,700] and 700 is available.

### Motion

- **Animation speed**: Slow / deliberate / epic / weighty
- **Easing**: `cubic-bezier(0.4, 0, 0.2, 1)` and `cubic-bezier(0.7, 0, 0.3, 1)`
- **Entrance**: Rune-burn reveal — opacity + translateY, 600ms weight easing
- **Hover**: Cards lift 4px with forge-warm glow shadow
- **Hero wordmark**: Subtle ember-glow pulse animation

### Shape Language

- Heavy rectangles with carved-edge feel
- Shield shapes (rounded top, pointed base) for featured cards
- Chevron and ship-prow angles in section dividers
- Knotwork border insets on panels
- Corner radius: 2px (small), 4px (medium), 8px (large)

## Layout & Structure

### Navigation

Thematic labels that replace generic ones:
- The Hall (home)
- The Arsenal (features, primary emphasis)
- The Realms (clients)
- The Forge (download, primary emphasis)
- The Relay (hub)
- The Lore (about, muted emphasis)

### Homepage Narrative

Six sections in order:
1. **opening-rune** — Full-bleed hero with torchlit wordmark glow and ember-glow pulse on the title
2. **the-saga** — Brand story told as ancient wisdom on storm-sea surface
3. **featured-halls** — Two hero features (SyncPlay, Library) as forge-glow cards
4. **full-arsenal** — Six remaining features as carved stone plaques
5. **proof-and-honor** — Proof points (MPL-2.0, 100% self-hostable, 5+ clients)
6. **the-summons** — CTA with install command and forge glow backdrop

### Responsive Strategy

- Desktop: Multi-column poster rails, full forge/fjord glow effects
- Tablet: 2-3 column grids, 48px touch targets
- Mobile: Single column, bottom tab bar on storm-sea, no hover states

## Mascot — Huginn

Odin's raven appears in the top-right corner on Home, Features, and Download pages.

- **Idle behavior**: Wings ruffle gently, head watches viewer; disabled under `prefers-reduced-motion`
- **Tips**: Contextual tips appear after 3s delay on relevant sections
- **Easter interactions**: Click 5 times triggers wing-spread animation
- **Dismissal**: "Huginn, rest" button persists to localStorage; hidden on mobile

## Easter Eggs

1. `logo-clicks:5` — Logo click 5 times triggers Huginn wing-spread animation
2. `typed-word:odin` — Type "odin" anywhere triggers flash effect + tip
3. `typed-word:rune` — Type "rune" anywhere triggers flash effect + tip

## Seasonal Variants (live-js mode)

- **Yule Night** (Dec 21 – Jan 6): Amber Ember primary, purple secondary, rune tertiary
- **Midsummer Saga** (Jun 20 – Jun 24): Forge Fire primary, Verdant Moss secondary
- **Ragnarok Eve** (Oct 28 – Nov 1): Rune Violet primary, Blood Iron secondary, violet surfaces

All via `prefers-color-scheme` media query (Yule/Ragnarok) and date-based detection (Midsummer).

## Accessibility

- WCAG AA minimum: 4.5:1 normal text, 3:1 large text/UI
- Bone White on Fjord Night = 14.97:1 (AAA)
- Forge Fire on Fjord Night = 5.4:1 (AA)
- Fjord Steel on Fjord Night = 5.51:1 (AA)
- `prefers-reduced-motion` honored: all animations replaced with instant opacity fades
- 2px Forge Fire focus ring with 4px forge-amber outer glow
- 48px minimum touch targets on mobile

## Technical Notes

- Grid tracks use `minmax(0, 1fr)` not bare `1fr`
- `overflow-wrap: anywhere` on all body-weight text (p, li, dt, dd, a, span, code, kbd, samp, pre)
- No `overflow: hidden` on content containers
- All CSS/JS files include `@copyright 2026 Joe Huss <detain@interserver.net>` in banner comment
- Fonts self-hosted from shared pool at `../../assets/fonts/`
- Seasonal variants implemented via CSS media queries, not JS

## Files

- `index.html` — Homepage with 6 narrative sections
- `features.html` — All 8 features with two-column alternating layout
- `clients.html` — 5 clients (Roku, Tizen, Windows, Mobile beta, DLNA)
- `download.html` — Install commands (primary, HTTPS, from-source)
- `plugins.html` — Plugin system with manifest example (demoted, links to features)
- `docs.html` — Link-out to VitePress docs (demoted)
- `hub.html` — Phlix Hub description with how-it-works
- `about.html` — Brand story, values, FAQ
- `404.html` — Runestone empty state with noindex, relative paths only
