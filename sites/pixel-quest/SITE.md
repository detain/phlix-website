# Pixel Quest — Brand Kit Site

## Concept & Vision

Pixel Quest is an 8-bit pixel-art adventure, retro RPG map aesthetic applied to the Phlix brand. It evokes the feeling of booting up a classic dungeon crawler — the map screen, the inventory, the quest log — translated into a modern web experience. Every surface feels like a tile from a 1990s handheld RPG: blocky, vivid, and full of character. The goal is to make self-hosting feel like an adventure, not a sysadmin task.

---

## Aesthetic Direction

**Reference:** Classic 8-bit/16-bit RPGs (Final Fantasy, Dragon Quest on Game Boy Color/early handheld era), dungeon crawler UI screens, sprite-based game menus. Think pixel fonts, scanline textures, and inventory-screen box borders.

**Mood:** Nostalgic, adventurous, slightly mysterious — like an old game you found in a drawer. But clean and legible, not cluttered or hard to navigate.

---

## Color Palette

| Role             | Name         | Hex       | Notes                                    |
|------------------|--------------|-----------|------------------------------------------|
| Background       | Void Black  | `#0D0D0D` | Primary dark — pixel-art night sky       |
| Primary / Accent | Terminal Green | `#00FF00` | Classic CRT phosphor green               |
| Secondary        | Gold        | `#FFD700` | Treasure, coins, achievement highlights  |
| Tertiary         | Royal Blue  | `#4169E1` | Interactive elements, DLNA, hub          |
| Highlight        | Orange Red  | `#FF4500` | Warnings, errors, important CTAs         |
| Surface Dark     | Dark Navy   | `#1a1a2e` | Card backgrounds, elevated surfaces     |
| Surface Mid      | Dungeon Blue | `#16213e` | Alternate grid lines, borders            |
| Text Muted       | Stone Gray  | `#888888` | Secondary text, meta information         |
| Text Dark        | Charcoal    | `#333333` | Code backgrounds, subtle borders         |
| Dim Green        | Dark Green  | `#00aa00` | Borders, disabled states, shadows       |
| Dim Gold         | Aged Gold   | `#cc9900` | Subdued gold elements                    |
| Dim Blue         | Deep Blue   | `#2a4a9a` | Card borders, secondary borders         |
| Dim Orange       | Burnt Orange| `#cc3700` | Tertiary borders                         |
| Glow Green       | Green Aura  | `#00ff0080` | Box-shadow glows (40% opacity)          |
| Glow Gold        | Gold Aura   | `#ffd70060` | Gold box-shadow glows                    |
| Glow Blue        | Blue Aura   | `#4169e160` | Blue box-shadow glows                    |

---

## Typography

| Role        | Font Stack                                      | Usage                              |
|-------------|------------------------------------------------|------------------------------------|
| Display     | `'Press Start 2P', 'Courier New', monospace`   | Headlines, hero text, pixel labels |
| Body        | `'Courier New', 'Lucida Console', monospace`   | Paragraphs, descriptions           |
| Mono / Code | `'Courier New', 'Lucida Console', monospace`  | Code blocks, install commands      |

**Note:** No Google Fonts CDN. A self-hosted WOFF2 `Press Start 2P` would be ideal if available in the shared font pool. The fallback stack achieves a monospaced pixel-grid aesthetic. The monospace body font (Courier New) aligns cleanly with the retro terminal vibe.

---

## Spatial System

- **Base unit:** 8px
- **Scale:** 8, 16, 24, 32, 40, 48, 64, 80, 96, 128px
- **Max content width:** 1400px, centered
- **Grid:** `minmax(0, 1fr)` used throughout to avoid overflow with long unbreakable tokens (per spec §19.12)
- **Border-radius:** 2px, 4px, 8px — blocky, not rounded

---

## Motion Philosophy

- **Entrance animations:** Staggered fade-up on scroll (IntersectionObserver), 80ms between children
- **Hover states:** 4px translate-Y lift + glow shadow on cards, color shift on buttons
- **Ambient:** Subtle CSS glow pulses on hero text
- **Respects `prefers-reduced-motion`:** All animations gated; falls back to instant visibility

**No aggressive motion.** The pixel art theme already has personality — animations are present but not distracting.

---

## Visual Assets

| Asset          | Description                                               |
|----------------|-----------------------------------------------------------|
| `img/logo.svg` | Pixel-art wordmark "PHLIX" + controller icon + tagline   |
| `img/favicon.svg` | Square pixel "P" mark with gold border + orange corners |
| `img/og.png`   | 1200×630 social share card (auto-generated from SVG)      |
| Inline SVG     | 8 feature icons (stroke-based, single color, 24×24 viewBox) |
| Background     | CSS-only pixel grid pattern (4px + 32px layered lines)   |

---

## Icon Set (Inline SVG — Single Color)

All feature icons are inline SVG, stroke-based, matching the terminal-green single-color style:

1. **library** — `M4 19V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v14l-8-4-8 4z` (book/library)
2. **syncplay** — `circle cx="12" cy="12" r="10"` + `polygon points="10 8 16 12 10 16 10 8"` (play)
3. **transcode** — `path d="M12 2v4M12 18v4M4.93 4.93..."` (spinning gears)
4. **auth** — `path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"` (shield)
5. **livetv** — `rect x="2" y="7" width="20" height="15" rx="2"` + antenna line (tv/antenna)
6. **dlna** — `path d="M5 12.55a11 11 0 0 1 14.08 0..."` (broadcast/wifi waves)
7. **plugins** — `path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67..."` (puzzle/heart)
8. **hub** — `circle cx="12" cy="12" r="10"` + global lines (globe/hub)

---

## Key Design Decisions

1. **Pixel grid background:** Pure CSS multi-layer gradient pattern creates a subtle dungeon-map grid feel without images.
2. **Pixel-style borders:** `box-shadow: 4px 4px 0 var(--color-black)` gives a chunky 3D pixel border effect without needing image assets.
3. **Monospaced everything:** Courier New as body font (not ideal for long reading, but intentionally retro). The display font makes headings distinctive.
4. **Glow effects:** `text-shadow` and `box-shadow` with semi-transparent green/gold/blue create CRT-monitor glow vibes.
5. **Section dividers:** `⚔` sword emoji as decorative divider — fits the RPG theme and avoids image dependencies.
6. **404 page:** Pixel skull SVG + "ROOM NOT FOUND" — a dungeon-crawler "you found a secret room with no loot" joke.

---

## Compliance Notes

- CSS `@copyright` inside `/* */` comment blocks (not bare ` * @copyright` lines) — verified against spec §19.2
- Grid tracks use `minmax(0, 1fr)` — not bare `1fr` — per spec §19.12
- Footer tagline "Open-source media, on your terms." verbatim from content.json
- Install command on both `index.html` hero and `download.html` server section
- 4 native clients + DLNA (never "5")
- All meta (OG + Twitter) absolute URLs, `twitter:creator=@detain`
- FAQ uses `<details>/<summary>` elements
