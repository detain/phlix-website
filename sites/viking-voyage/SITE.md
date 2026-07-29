# SITE.md — Viking Voyage Design Rationale

## Concept

Viking Voyage channels the spirit of Norse seafaring — longship expeditions, rune inscriptions, weathered wood, horned helmets, stormy seas, and the aurora borealis. The aesthetic evokes a medieval Scandinavian workshop where precision craftsmanship meets the wild open ocean.

## Palette

| Token             | Hex       | Role                                 |
| ----------------- | --------- | ------------------------------------ |
| `--color-bg`      | `#1A1510` | Deep Night — page background         |
| `--color-surface` | `#2A2118` | Weathered Oak — card surfaces        |
| `--color-surface-alt` | `#4A3728` | Dark Wood — alternate surfaces   |
| `--color-text`    | `#E8DCC4` | Aged Parchment — primary text        |
| `--color-primary`  | `#C9A227` | Viking Gold — primary CTA            |
| `--color-secondary`| `#00CED1` | Aurora Cyan — links, accents         |
| `--color-tertiary` | `#8B4513` | Saddle Brown — tertiary accent      |
| `--color-border`  | `#5A4A38` | Bronze Edge — borders, dividers      |
| `--color-focus`   | `#00CED1` | Aurora Cyan — focus rings            |

All contrast ratios meet WCAG AA (4.5:1 for normal text, 3:1 for large text/UI).

## Typography

| Role     | Family               | Weights   | Notes                              |
| -------- | -------------------- | --------- | ---------------------------------- |
| Headline | Cinzel               | 700, 600  | Ancient Roman-inspired capitals; runic feel |
| Display  | Cinzel               | 700       | Same as headline for cohesion      |
| Body     | Cormorant Garamond   | 400, 500, 600 | Elegant old-style serif; medieval manuscript feel |
| UI       | DM Sans              | 400, 500, 600 | Clean sans-serif for navigation, buttons |
| Mono     | Courier Prime        | 400       | Code, typewriter moments           |

All fonts self-hosted from `shared/assets/fonts/` WOFF2 pool. No CDN links.

## Motion

- **Hero entrance**: Aurora fade-in (opacity + translateY) on hero text elements
- **Scroll reveal**: Sections fade + translateY into view via IntersectionObserver
- **Hover**: Cards lift 3px + gain 1px aurora cyan border glow (200ms ease-out)
- **Reduced motion**: All animations disabled via `prefers-reduced-motion: reduce`; content fully accessible and in correct order

## Spatial System

- Max content width: 1400px
- Grid: `repeat(auto-fill, minmax(0, 1fr))` — `minmax(0, 1fr)` prevents grid blowout at small sizes
- `overflow-wrap: anywhere` on all prose containers — identifiers never overflow
- No `overflow: hidden` on containers whose text must reflow
- Generous section padding (64px–96px vertical)

## Key Signature Elements

- Aurora gradient backdrop in hero section (radial gradients with cyan/gold tints)
- Gold gradient dividers (linear-gradient with gold at center)
- Viking gold primary CTA with subtle glow shadow
- Cormorant Garamond body text for medieval manuscript feel
- Rune-inspired decorative accents (ᚠ ᚢ ᚦ ᚨ unicode characters)

## Accessibility

- Skip link to main content
- `aria-current="page"` on active nav link
- 2px cyan focus ring with 2px offset + 4px cyan outer glow on all interactive elements
- All interactive elements have 44×44px minimum touch target
- 404.html has `<meta name="robots" content="noindex">` and relative asset paths only
- FAQ accordion uses `<details>/<summary>` elements per spec

## Licence

MPL-2.0 for Phlix Server and Hub. Footer links to `https://github.com/detain/phlix-server/blob/master/LICENSE`. Never "no strings attached" or "attribution required" — the one file-level condition is stated factually.
