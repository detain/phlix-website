# SITE.md — Retro Seventies

## Concept

Retro Seventies channels the warm, groovy soul of 1970s analog culture — harvest gold kitchens, avocado green appliances, shag carpet, lava lamp glow, and vinyl records. Watching on Phlix in this kit feels like settling into a beanbag chair, dropping the needle on a favourite LP, and letting the good times roll.

This is **not** a streaming app wearing bell bottoms. It is a genuine celebration of the era when movies were an event and television was magic.

## Design Language

### Aesthetic Direction
Warm 1970s editorial — record sleeve art meets Kodachrome photography. Earth tones dominate: burnt orange, harvest gold, and avocado green on a deep mahogany ground. Compositions lean into bold, symmetrical or sunburst-radial geometry. Typography is bold and editorial.

### Color Palette

| Token | Hex | Usage |
|---|---|---|
| `--color-primary` | `#D4570D` | Burnt Orange — primary CTAs, hero warmth |
| `--color-secondary` | `#8B9B3A` | Avocado Green — secondary accents |
| `--color-tertiary` | `#C9A22B` | Harvest Gold — highlights, badges |
| `--color-bg` | `#0F0900` | Deep Mahogany — page background |
| `--color-surface` | `#1A1005` | Dark Walnut — card surfaces |
| `--color-surface-alt` | `#231808` | Warm Espresso — alternate surfaces |
| `--color-text` | `#F5EDD8` | Cream Paper — all text |
| `--color-border` | `#3A2E1A` | Tobacco Line — borders, dividers |
| `--color-focus` | `#C9A22B` | Focus Gold — focus rings |

### Typography

| Role | Family | Weights |
|---|---|---|
| Headline | Playfair Display | 700, 900 |
| Display | Fredoka | 600 (from pool) |
| Body | Lato | 400, 700 |
| UI | Lato | 400, 700, 900 |
| Mono | Courier Prime | 400, 700 |
| Number | Fredoka | 600 (from pool) |

**Note:** Fredoka One is not in the font pool (retired from Google Fonts). The official successor `Fredoka` at weight 600 is used per `shared/data/font-sources.json` resolution. See BUILD_LOG.md for details.

### Motion

- **Slow and warm** — 300–550ms transitions with `ease-in-out` or `cubic-bezier(0.34, 1.56, 0.64, 1)`
- **Vinyl groove reveal** — concentric circles animate outward on hero
- **Lava blob wobble** — mascot Groove has gentle organic pulsing
- **Prefers-reduced-motion** — all animations collapse to instant cross-fades

### Visual Assets

- **Vinyl groove patterns** — concentric circles as section backgrounds
- **Sunburst dividers** — conic gradient rays between sections
- **Lava blob mascot** — Groove the lava lamp character in bottom-right
- **Wood grain texture** — subtle horizontal lines on select surfaces

### Layout

- Max content width: 1400px
- Generous rounded corners (12px+)
- Dark warm backgrounds throughout
- Single dominant burnt-orange CTA per screen

## Pages

1. **The Lobby** (`index.html`) — Narrative-scroll hero + feature shelf + story + proof + CTA
2. **Now Spinning** (`features.html`) — Vinyl-shelf feature grid with two featured highlights
3. **The Equipment** (`clients.html`) — Device cards: Roku, Tizen, Windows, Mobile, DLNA
4. **Get Groovy** (`download.html`) — Install snippet star + client cards + ecosystem
5. **Plugins** (`plugins.html`) — Plugin system overview, demoted from primary nav
6. **Docs** (`docs.html`) — Doc links, demoted from primary nav
7. **The Relay** (`hub.html`) — Hub reverse-tunnel explanation
8. **The Story** (`about.html`) — Brand story + license + FAQ (Groove's questions)
9. **404** (`404.html`) — Groove in empty auditorium, `noindex`

## Navigation

Nav labels from `site_architecture.nav`:

| id | label | emphasis |
|---|---|---|
| home | The Lobby | default |
| features | Now Spinning | primary |
| clients | The Equipment | default |
| download | Get Groovy | primary |
| hub | The Relay | default |
| about | The Story | muted |

Demoted to footer: plugins, docs.

## Home Page Sections

Per `homepage_narrative.sections[]`:

1. `needle-drop` — Full-bleed vinyl-groove hero with animated grooves
2. `the-features` — 8-card vinyl shelf grid
3. `why-retro` — Story section with blob mascot
4. `proof-placard` — Stats band + quote
5. `spin-it-up` — Orange-to-gold gradient CTA with install snippet

## Easter Eggs

1. **Logo clicks:3** — Groove does a spin-dance celebration
2. **Typed word: "groove"** — Cursor gets a vinyl spin overlay

## Mascot

**Groove** — friendly lava lamp blob character, appears on home/features/download/hub. Fades in after 2s. Dismissable to localStorage.

## License

- Phlix Server and Hub: **MPL-2.0**
- Shared libraries, plugins, clients: **MIT**
