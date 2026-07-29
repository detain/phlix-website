# Lost City — Brand Kit Site

## Concept & Vision

An ancient civilization reclaimed by jungle — moss-covered ruins, golden artifacts half-buried in rich soil, mysterious hieroglyphs etched into weathered stone, and the warm humidity of dense foliage. The site evokes discovery, mystery, and the passage of time — like wandering through temple ruins where modern media somehow still thrives.

## Aesthetic Direction

**Reference:** Tomb Raider meets National Geographic documentary on Mayan ruins. Deep jungle greens and rich earth tones with gold accents that catch the light like treasure. Textures matter — stone grain, leaf patterns, glyph shapes.

## Color Palette

| Role | Name | Hex | Usage |
|------|------|-----|-------|
| Primary | Jungle Stone | `#2D4A3E` | Headers, nav background, primary buttons |
| Secondary | Moss/Olive | `#7B8B6F` | Borders, muted text, accents |
| Accent | Ancient Gold | `#C9A227` | CTAs, highlights, icons, links |
| Surface | Dark Brown | `#4A3728` | Code blocks, cards, surfaces |
| Highlight | Saddle Brown | `#8B4513` | Decorative elements, hover states |
| Background | Deep Forest | `#1a1a14` | Page background |
| Background Alt | Moss Dark | `#242418` | Alternating sections |
| Text | Aged Parchment | `#e8e4d9` | Body text |
| Text Muted | Weathered Stone | `#b8b4a5` | Secondary text |

## Typography

- **Display/Headlines:** Cinzel (serif) — ancient Roman inscriptional feel, majestic
- **Body:** Crimson Text (serif) — readable, warm, editorial quality
- **UI/Navigation:** Source Sans 3 (sans-serif) — clean contrast for interface elements
- **Code:** JetBrains Mono — technical content in code blocks

## Spatial System

- Spacing scale: 4px base unit (0.25rem increments)
- Container max-width: 1400px
- Generous vertical rhythm — sections breathe
- Decorative glyphs and borders provide visual anchors

## Motion Philosophy

- Subtle fade-ins on scroll (IntersectionObserver)
- Hover states lift cards with shadow glow
- Mobile nav slides from right
- Respects `prefers-reduced-motion`

## Visual Assets

- **Logo:** Stylized "P" with ruin arch frame, gold on deep green
- **Favicon:** Simple "P" mark with glyph accents
- **Icons:** Single-stroke SVG, stroke-width 1.5, rounded joins
- **Decorative:** Hieroglyph-inspired dot patterns, golden glow effects
- **Background:** Subtle noise texture overlay, radial gradient atmospherics

## Component Notes

- Cards have gold accent bar on hover
- Code blocks styled as terminal with gold top-right label
- Feature icons use consistent stroke style
- Badges use subtle color-coded backgrounds
- FAQ uses definition list with decorative separators
