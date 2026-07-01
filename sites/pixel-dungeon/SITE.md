# Pixel Dungeon — Site Design Document

## Concept & Vision

Pixel Dungeon is the satisfying crunch of an 8-bit coin collected, the thrill of a
level-up fanfare, the glow of a CRT monitor in a dark bedroom at midnight. The site
is a love letter to the NES era — deliberately limited palette, chunky pixel geometry,
and the deeply satisfying sound of a coin collected — applied to modern streaming.
Every page feels like pressing Start on a new adventure.

## Aesthetic Direction

**Art style:** 8-bit pixel art, retro gaming / NES era, CRT scanline aesthetic.
All artwork from a strict 16-color palette, hard pixel edges, dithering where shading
is needed, and chunky outlined sprites with black outlines. Compositions are frontal
and symmetric — dungeon rooms viewed from above or side-scrolling environments.
Never smooth gradients, never photorealistic.

**Mood:** Nostalgic, playful, achievement-oriented. The site should feel like a game
UI — every interaction earns a reward, every completed section is a CLEARED flag.

## Color Table

| Role            | Name                 | Hex       | Usage                                        |
|-----------------|----------------------|-----------|----------------------------------------------|
| Primary         | Mario Red            | `#E8001A` | Single most important CTA per screen         |
| Secondary       | Game Blue            | `#0055AA` | Secondary actions, links, navigation         |
| Tertiary        | Coin Yellow-Green    | `#88BB00` | Rewards, achievements, scores                |
| Neutral         | Pixel Gray           | `#666660` | Secondary text, inactive UI chrome            |
| Background      | Cartridge Black      | `#0A0A0A` | Default page background                      |
| Surface         | Screen Black         | `#151515` | Card and panel surfaces                      |
| Surface Alt     | Console Dark         | `#1E1E1E` | Alternate surface, hover states              |
| Text            | Screen White         | `#F5F5F0` | Primary body and headline text               |
| Success         | 1UP Green            | `#00AA44` | 1UP moments, success toasts                   |
| Warning         | Low Health Yellow    | `#FFCC00` | Warnings, low-health indicators              |
| Error           | Game Over Red        | `#CC0000` | Errors, destructive actions                  |
| Info            | Sky Blue             | `#5599FF` | Informational banners, tips                  |
| Focus           | Select Yellow        | `#FFCC00` | Keyboard focus ring (2px hard border)        |
| Border          | Dungeon Stone        | `#333333` | Card borders, panel dividers                 |

## Typography

| Role       | Font             | Size guidance                                  |
|------------|------------------|------------------------------------------------|
| Headline   | Press Start 2P   | 8px–24px only (whole-pixel sizes), line-height 2.0 |
| Display    | Press Start 2P   | 10px–32px splash text, level announcements     |
| Body       | Silkscreen       | 12px–14px body copy, line-height 1.8           |
| UI         | Silkscreen       | 10px–12px labels, buttons, nav, line-height 1.5 |
| Mono       | Press Start 2P   | 8px–12px counters, debug readouts              |
| Number     | Press Start 2P   | Score displays, watch counts, episode numbers   |

**Rules:** Press Start 2P has only one weight — never simulate bold.
Silkscreen used for body copy where Press Start 2P is too wide.
No italic or oblique. No system-ui or sans-serif anywhere.

## Spatial System

8px grid. Allowed spacing steps: 4, 8, 16, 24, 32, 48, 64, 96, 128px.
Layout max-width: 1280px. All elements align to 8px or 16px grid increments.

## Motion Philosophy

**Non-negotiable: steps() easing only. No bezier, no ease-in-out.**

- Hover: Element gains 2px Mario Red or Coin Yellow border and shifts 2px down+right
  in steps(1) — no smooth transition.
- Button press: Shifts 2px down+right (shadow vanishes) in steps(1) — physical key press.
- Loading: Blip sprite runs across a progress bar in 2-frame walk cycle using steps(2).
- Focus: 2px Select Yellow border, blinking at 500ms interval (steps(1)).
- Success: 3 coin sprites fly upward in steps(8) over 300ms, then '+1 UP' flashes twice.
- Scroll reveals: 16px discrete steps (not smooth), 4 steps total.

## Visual Assets

- **Logo:** Wordmark "PHLIX" in Press Start 2P, Screen White on Cartridge Black,
  2px Mario Red rectangular border, 2px hard black drop shadow, 0px radius.
- **Mascot:** Blip — 16×16 pixel hero sprite (red tunic, blue trousers, white eyes).
  Runs across hero area with coin sparkle trail.
- **Feature icons:** Inline SVG, 16×16 grid, fill-based pixel art, max 4 colors per icon.
- **CRT scanline overlay:** repeating 2px horizontal stripe at 5% black opacity.
  Applied via CSS on body (::after pseudo-element pattern).
- **Decorative:** Coin sprites (5-point star polygon in Coin Yellow-Green), pixel hearts
  as bullet points, NES cartridge sticker badges for status labels.

## Component Notes

- **Cards:** Screen Black (#151515), 2px Dungeon Stone border, 2px hard drop shadow.
  Featured: Mario Red or Coin Yellow border. Hover: 2px down+right shift.
- **Buttons:** 0px radius, 2px drop shadow, steps() press. Primary = Mario Red.
- **Focus:** 2px Select Yellow border, blinking 500ms. No blur, no offset.
- **Nav active:** Mario Red 3px left bar + blinking `>` cursor indicator.
- **Badges:** Hard rectangle 0px radius, 2px border. Press Start 2P 6-8px uppercase.
  Quality (4K/HDR) = Coin Yellow-Green. Status = Mario Red. Cleared = 1UP Green.
