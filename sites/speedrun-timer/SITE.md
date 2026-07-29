# Speedrun Timer Brand Kit — Design Rationale

## Concept & Vision

Speedrun Timer themed site for Phlix — a self-hosted media server. The aesthetic evokes the precision, focus, and competitive culture of speedrunning: neon split times, checkpoint precision, personal best tracking. The site should feel like a premium tool used by someone who cares about milliseconds — dark, precise, and alive with subtle energy.

## Aesthetic Direction

**Theme:** Neon on dark with speedrun/split-timer culture. Millisecond precision aesthetic. Personal best tracking vibes.

## Color Palette

| Role        | Name           | Hex       |
|-------------|----------------|-----------|
| Background  | Void Black     | `#000000` |
| Primary     | Split Green    | `#00FF00` |
| Secondary   | Checkpoint Cyan| `#00FFFF` |
| Accent      | Gold WR        | `#FFD700` |
| Accent Alt  | PB Orange      | `#FF4500` |
| Surface     | Card Dark      | `#0d0d0d` |
| Elevated    | Panel Dark     | `#111111` |
| Border      | Subtle         | `#222222` |
| Text        | Light Gray     | `#e0e0e0` |
| Text Muted  | Dim Gray       | `#888888` |

## Typography

- **Display:** Orbitron (monospace-like, futuristic) for headlines
- **Body:** Share Tech Mono (readable monospace) for body text
- **UI/Mono:** Share Tech Mono throughout for consistency

## Spatial System

- Max content width: 1400px
- Header height: 70px
- Spacing scale: 4px base (0.25rem increments)
- Grid: `minmax(0, 1fr)` for proper shrink behavior

## Motion Philosophy

- Subtle glowing effects on primary elements
- Pulse animations on hero headline
- Flicker effect on eyebrow text
- Scroll-reveal fade-ins on cards (respects reduced motion)
- Timer/scanline decorative elements

## Visual Assets

- **logo.svg:** Stopwatch/timer icon with "PHLIX" text in neon green
- **favicon.svg:** Simplified timer icon in primary green
- **og.svg:** Full social card with timer motif and grid lines
- Inline SVG icons for features (single-color, stroke-based)

## Key Design Elements

- CRT/scanline subtle effects
- Grid overlay pattern on hero
- Glowing text shadows (green primary)
- Border-left accent bars on feature cards and code blocks
- Dark glass-like card surfaces
- Monospace throughout for precision feel
