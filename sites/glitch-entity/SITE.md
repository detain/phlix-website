# Glitch Entity — Brand Kit Site

## Concept & Vision

**glitch-entity** is a digital being that exists within media corruption. The aesthetic draws from datamosh patterns, broken pixels, and artifact squares — the beautiful chaos that emerges when digital signals degrade or compress incorrectly. It feels like discovering a sentient AI that lives inside corrupted media files, glitching and reforming itself.

The theme embraces imperfection as a feature: scanlines, color channel offsets, flickering artifacts, and digital decay. It's retro-futuristic with a distinctly digital-native personality — not "broken" but "evolving."

## Aesthetic Direction

**Reference:** Digital corruption, datamosh art, CRT artifacts, VHS tracking errors, packet loss in streaming

**Mood:** Cyberpunk-meets-vaporwave with a darker edge. The palette mixes neon primaries against near-black backgrounds, creating high contrast that's both striking and readable.

## Color Palette

| Role        | Name            | Hex       |
|-------------|-----------------|-----------|
| Primary     | Magenta         | `#FF00FF` |
| Secondary   | Lime Green      | `#00FF00` |
| Tertiary    | Electric Blue   | `#0000FF` |
| Accent      | Signal Yellow   | `#FFFF00` |
| Background  | Void Black      | `#0D0D0D` |
| Surface     | Dark Gray       | `#1a1a1a` |
| Text        | White           | `#ffffff` |
| Text Muted  | Gray            | `#a0a0a0` |

## Typography

**Display:** Bebas Neue (bold, condensed impact)
- Headlines, hero text, section titles
- All caps where appropriate for digital feel

**Headlines:** Barlow Condensed (600, 700)
- Subheadings, card titles, navigation

**Body:** Barlow (400, 500, 600)
- Paragraphs, UI elements, descriptions

**Mono:** JetBrains Mono (400)
- Code blocks, eyebrow text, technical elements

**Font Source:** Self-hosted from `shared/assets/fonts/`

## Spatial System

**Spacing scale:** 0.25rem base unit (4px)
- `--space-1`: 0.25rem
- `--space-2`: 0.5rem
- `--space-4`: 1rem
- `--space-6`: 1.5rem
- `--space-8`: 2rem
- `--space-12`: 3rem
- `--space-16`: 4rem
- `--space-20`: 5rem
- `--space-24`: 6rem

**Container max-width:** 1400px

**Header height:** 4rem (64px)

## Motion Philosophy

**Glitch aesthetic:** Motion should feel digital and slightly unstable — not perfectly smooth

- **Glitch text animation:** Hero headline has a periodic RGB offset effect (simulates color channel separation)
- **Hover states:** Slight displacement, border glow effects
- **Scroll reveals:** Fade + slide up, 600ms ease-out
- **Reduced motion:** All animations respect `prefers-reduced-motion`

**Key animations:**
- `glitch-text` — periodic color channel offset on hero headline
- `artifact-flicker` — random opacity fluctuation on decorative squares
- `scanline-scroll` — subtle scanline drift overlay
- `glitch-hover` — hover displacement effect on buttons

## Visual Assets

**Logo:** SVG with glitch filter effect, RGB channel separation, scanline overlay, artifact squares
- Viewbox: 240x80
- Styled wordmark "Phlix" with gradient fill

**Favicon:** SVG square (32x32) with magenta gradient background, stylized "P", glitch artifacts

**Icons:** Inline SVG, stroke-based, single-color (primary by default)
- Stroke width: 2px
- Style: round, linejoin round
- 8 feature icons used

**Decorative elements:**
- Scanline overlay pattern (CSS generated)
- Artifact squares (positioned absolute decorative divs)
- RGB channel offset effects (CSS filters)
- Glitch border effects (animated pseudo-elements)

## Responsive Breakpoints

Tested at: 320, 375, 414, 768, 1024, 1280, 1920

**Strategy:**
- Desktop: Multi-column grids
- Tablet (≤1024px): Reduce columns
- Mobile (≤768px): Single column, stacked navigation
- All breakpoints: No horizontal overflow

**Grid tracks use `minmax(0, 1fr)`** to prevent overflow from long unbreakable strings.

## Accessibility

- WCAG 2.2 AA compliant
- Contrast ratios verified for all text/background pairs
- Keyboard navigation with visible focus states
- `prefers-reduced-motion` respected
- Skip link provided
- Semantic HTML landmarks

## Notes

- No external font CDNs — all fonts self-hosted from `../../../shared/assets/fonts/`
- CSS `@copyright` inside `/* */` comment blocks at end of each CSS file
- Install command from `content.json`: `curl -fsSL https://raw.githubusercontent.com/detain/phlix-server/master/scripts/install.sh | sudo bash`
- License: MPL-2.0 (server/hub), MIT (clients/plugins) — never state a single license across the board
- 4 native clients + DLNA (never say "5" or "Five")
- 8 features from content.json
- 6 FAQ items from content.json
