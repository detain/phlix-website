# SITE.md — Neon Noir Design Rationale

## Concept

Neon Noir is a dark film-noir aesthetic fused with neon city lights — rain-slicked streets,
moody shadows, electric pink/cyan/yellow neon signs, 1940s detective fiction meets modern
city night. Cinematic, mysterious, sophisticated, urban.

## Palette

| Token                 | Hex       | Role                                |
| --------------------- | --------- | ----------------------------------- |
| `--color-bg`          | `#0A0C10` | Void Black — page background        |
| `--color-surface`     | `#111827` | Deep Navy — card surfaces           |
| `--color-surface-alt` | `#1C2333` | Charcoal Slate — alternate surfaces |
| `--color-text`        | `#E8EDF5` | Ghost White — primary text          |
| `--color-primary`     | `#F5A623` | Neon Amber — primary CTA            |
| `--color-secondary`   | `#00E5FF` | Electric Cyan — links, accents      |
| `--color-tertiary`    | `#FF2D78` | Neon Magenta — badges, emphasis     |
| `--color-border`      | `#2A3650` | Dim Steel — borders, dividers       |
| `--color-focus`       | `#00E5FF` | Electric Cyan — focus rings         |

All contrast ratios measured against their actual background surfaces and verified per WCAG AA (4.5:1 for normal text, 3:1 for large text/UI). Safe substitutions derived from kit's own pigments where unverified claims failed measurement.

## Typography

| Role     | Family           | Weights       | Notes                                    |
| -------- | ---------------- | ------------- | ---------------------------------------- |
| Headline | Playfair Display | 700, 900      | Dramatic serif; tight tracking (-0.02em) |
| Display  | Bebas Neue       | 400           | Uppercase-only; cinematic numerals       |
| Body     | IBM Plex Serif   | 400, 500      | Editorial; `<strong>` = 500 + cyan ink   |
| UI       | IBM Plex Sans    | 400, 500, 600 | Buttons, nav, labels                     |
| Mono     | IBM Plex Mono    | 400, 600      | Code, typewriter moments                 |

All fonts self-hosted from `shared/assets/fonts/` WOFF2 pool. No CDN links.

## Motion

- **Hero entrance**: Neon flicker-in animation (opacity cycling with step-flicker) on hero text elements
- **Scroll reveal**: Sections fade + translateY into view via IntersectionObserver
- **Section transitions**: Venetian-blind horizontal wipe between page sections (CSS + IntersectionObserver class toggle)
- **Mascot idle**: Lux shifts weight slowly (translateY oscillation, 4s loop)
- **Hover**: Cards lift 3px + gain 1px cyan border glow + cyan box-shadow (200ms ease-out)
- **Reduced motion**: All animations disabled via `prefers-reduced-motion: reduce`; content fully accessible and in correct order

## Spatial System

- Max content width: 1400px
- Grid: `repeat(auto-fill, minmax(0, 1fr))` — `minmax(0, 1fr)` prevents grid blowout at small sizes
- `overflow-wrap: anywhere` on all prose containers — identifiers never overflow
- No `overflow: hidden` on containers whose text must reflow
- Generous section padding (64px–96px vertical)

## Key Signature Elements

- Venetian-blind horizontal rule dividers (repeating-linear-gradient)
- Neon sign halos via `box-shadow` with colored rgba glows
- Case-board / evidence-board layout on features page — monospace serial numbers on cards
- Network-map hub diagram on clients page — connected nodes with dotted connector lines
- Interrogation-transcript FAQ — Lux persona answering from behind the neon
- Intensity toggle in footer — "Case closed" calm mode reduces neon glow intensity via CSS variables
- Seasonal date-gate in JS with palette overrides (Blood Moon October, Valentine's Neon, Midnight New Year)

## Easter Eggs

1. **Logo clicks: 5** — Lux tips fedora, neon pulse expands outward, "NOIR" appears briefly in mono
2. **Typed word: shadow** — Venetian-blind shadow sweep traverses the page, Lux glances up

## Accessibility

- Skip link to main content
- `aria-current="page"` on active nav link
- 2px cyan focus ring with 2px void-black offset + 4px cyan outer glow on all interactive elements
- `<strong>` uses IBM Plex Serif 500 + cyan ink color (12.72:1 on bg) — not just weight alone
- All interactive elements have 44×44px minimum touch target (48×48 on mobile/TV)
- 404.html has `<meta name="robots" content="noindex">` and relative asset paths only
- Mascot tips and close button are `aria-hidden` decorative; no content depends on them
- FAQ accordion uses `aria-expanded` and `aria-hidden` correctly

## Licence

MPL-2.0 for Phlix Server and Hub. Footer links to `https://github.com/detain/phlix-server/blob/master/LICENSE`. Never "no strings attached" or "attribution required" — the one file-level condition is stated factually.
