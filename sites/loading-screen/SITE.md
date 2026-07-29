# Loading Screen Brand Kit — SITE.md

## Concept & Vision

A DOS-era retro loading screen aesthetic — the patience of early computing made into a visual identity. The site evokes the ritual of watching a progress bar crawl, the satisfaction of a successful boot sequence, and the honest simplicity of a command-line interface. It's a love letter to the era when "please wait" was a statement of trust in the machine.

## Aesthetic Direction

**Reference:** Classic DOS boot screens, Microsoft Windows 3.1/95 loading dialogs, early BIOS screens. Monochrome green-on-black phosphor display, blocky progress bars, blinking cursors, scanline effects.

**Mood:** Patient, nostalgic, slightly self-aware. The UI acknowledges that waiting can be part of the experience. The "loading" metaphor is both literal (in the hero animation) and thematic (the Hub's "connecting" experience mirrors a dial-up handshake).

## Color Palette

| Role | Name | Hex |
|------|------|-----|
| Background | Black | `#000000` |
| Primary / Text | Phosphor Green | `#00FF00` |
| White | White | `#FFFFFF` |
| Accent | Royal Blue | `#4169E1` |
| Muted | Gray | `#808080` |
| Surface | Dark Gray | `#333333` |
| Border | Dark Gray | `#333333` |
| Light Gray | Light Gray | `#C0C0C0` |

## Typography

- **Display / UI / Mono:** `'Courier New', Courier, monospace` — self-hosted (system font, no CDN)
- **No external fonts** — the monospace stack is native to every OS

## Spatial System

8px base spacing scale:
- `--space-1: 0.25rem` (4px)
- `--space-2: 0.5rem` (8px)
- `--space-3: 0.75rem` (12px)
- `--space-4: 1rem` (16px)
- `--space-5: 1.5rem` (24px)
- `--space-6: 2rem` (32px)
- `--space-8: 3rem` (48px)
- `--space-10: 4rem` (64px)
- `--space-12: 5rem` (80px)
- `--space-16: 6rem` (96px)

## Motion Philosophy

- **Scanline overlay:** Subtle CRT scanline effect on `body::before` (CSS-only, no JS)
- **Loading bar animation:** JS-driven progress fill in hero, continuous pulse on the fill edge
- **Boot text:** Staggered `opacity` fade-in for boot sequence lines
- **Blink animation:** Eyebrow text blinks like a DOS prompt cursor
- **Glitch effect:** 404 page code has a subtle `translate` glitch
- **Scroll reveals:** `IntersectionObserver`-driven fade-up for cards (respects `prefers-reduced-motion`)
- **No motion on reduced-motion:** All animations gated behind `matchMedia('(prefers-reduced-motion: reduce)')` check

## Visual Assets

- **Logo:** SVG with loading bar motif, "PHLIX" text, animated progress bar, blinking cursor
- **Favicon:** Square 32×32 SVG with black background, green border, mini loading bar, "P" letter
- **OG Image:** 1200×630 PNG with DOS-style terminal aesthetic, green on black, brand wordmark
- **Icons:** Inline SVG stroke icons for features (stroke-based, single-color, matching DOS aesthetic)
- **No raster images** — all visuals are SVG or CSS

## Motion Details

| Element | Animation | Duration |
|---------|-----------|----------|
| Scanlines | `repeating-linear-gradient` overlay | static |
| Loading bar fill | `width` transition + `pulse` keyframe on edge | 0.3s + continuous |
| Boot text lines | `fadeIn` opacity 0→1, staggered | 0.1s each, 0.15s delay |
| Eyebrow | `blink` opacity step-end | 1s step-end infinite |
| 404 glitch | `glitch` translate transforms | 2s infinite |
| Cards reveal | fade + translateY | 0.4s ease |

## Grid Specifications

All CSS grids use `minmax(0, 1fr)` not bare `1fr` to prevent overflow from unbreakable strings:
```css
grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr));
grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
```

## Component States

| Component | Default | Hover | Active |
|-----------|---------|-------|--------|
| Button (primary) | Green bg, black text | White bg, black text | — |
| Button (secondary) | Transparent, green border | Green bg, black text | — |
| Nav link | Green text | Surface bg + green border | Green bg, black text |
| Feature card | Surface bg, border | Green border, translateY(-2px) | — |
| Client card | Surface bg, border | — | — |

## Accessibility

- All text/background pairs measured for WCAG 2.2 AA contrast (4.5:1 for body, 3:1 for large/UI)
- Keyboard navigation with visible `:focus-visible` outline (2px solid green)
- `prefers-reduced-motion` respected — all animation gated/dropped
- Touch targets ≥44×44px
- Skip link first focusable element
- `aria-current="page"` on active nav link
- `<details>/<summary>` for FAQ (no-JS-friendly disclosure)

## Compliance Notes

- Install command: `curl -fsSL https://raw.githubusercontent.com/detain/phlix-server/master/scripts/install.sh | sudo bash`
- License: MPL-2.0 (server/hub), MIT (clients/plugins)
- 4 native clients + DLNA — never "5"
- 8 features from content.json
- 6 FAQ from content.json
- Footer: 3 columns + "Open-source media, on your terms."
- No Google Fonts CDN
- All pages: OG + Twitter meta, `twitter:creator=@detain`
- Install command in hero CTA of index.html AND in download.html
- FAQ: `<details>/<summary>` elements
- CSS `@copyright` inside `/* */` comment blocks
