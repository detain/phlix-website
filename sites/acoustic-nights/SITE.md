# acoustic-nights — Site Kit Documentation

## Concept & Vision

A brand kit for **late-night acoustic sessions** — the warmth of a campfire in an intimate venue, string lights casting a gentle amber glow over weathered wood. The site should feel like sitting in a small listening room: cozy, personal, focused on the music. Not corporate, not cold. The glow of a stage lamp in the dark.

---

## Aesthetic Direction

### Mood
Intimate venue, late night, acoustic warmth. Think: a listening room with exposed brick, wooden beams, Edison bulbs, and the soft murmur of a crowd settling in before the show. Warm but not yellow. Dark but not brooding.

### Visual References
- String lights overhead casting soft pools of amber
- Weathered wooden surfaces, dark grain
- Stage lighting: a single warm spotlight cutting through darkness
- Warm amber glow on dark surfaces

---

## Color Palette

| Role | Name | Hex | Usage |
|------|------|-----|-------|
| Background | Charred Wood | `#1A0F0A` | Page background, dark surfaces |
| Background Warm | Deep Bark | `#241610` | Secondary backgrounds |
| Surface | Walnut | `#2D1F15` | Cards, panels |
| Surface Elevated | Dark Mahogany | `#3A2A1D` | Elevated cards, hovers |
| Primary | Warm Amber | `#D4A574` | CTAs, links, accents, icons |
| Primary Muted | Aged Brass | `#B8895A` | Secondary amber tones |
| Accent | Golden Glow | `#FFD700` | Highlights, glows, stars |
| Accent Warm | Ember | `#FFB347` | Hover states for accent |
| Text | Cream | `#FFF8E7` | Primary text, headings |
| Text Muted | Aged Parchment | `#C4B5A0` | Body text, descriptions |
| Text Subtle | Faded Leather | `#8B7355` | Captions, meta text |
| Border | Dark Walnut | `#5C4030` | Borders, dividers |
| Border Subtle | Charred Edge | `#3D2A1E` | Subtle separators |

---

## Typography

### Display / Headings
- **Family**: Cormorant Garamond (serif, elegant, warm)
- **Usage**: All headings h1–h6, display text, section titles
- **Character**: Refined but approachable. The serif adds warmth without being formal.

### Body / UI
- **Family**: Source Sans 3 (humanist sans, readable)
- **Usage**: Body text, navigation, UI elements, buttons
- **Character**: Clean and highly readable at small sizes. Pairs well with Cormorant.

### Mono
- **Family**: Fira Code
- **Usage**: Code blocks, install commands, technical snippets

### Scale
- Headlines: clamp(2.25rem, 5vw, 4.5rem) for h1
- Section titles: clamp(1.875rem, 4vw, 3rem) for h2
- Card titles: clamp(1.5rem, 3vw, 1.875rem) for h3
- Body: 1rem (16px base)
- UI / captions: 0.875rem–0.75rem

---

## Spatial System

### Spacing Scale
Uses a consistent spacing scale based on 0.25rem increments:

| Token | Value | Usage |
|-------|-------|-------|
| `--space-1` | 0.25rem | Tight gaps |
| `--space-2` | 0.5rem | Icon gaps |
| `--space-3` | 0.75rem | Small padding |
| `--space-4` | 1rem | Base padding |
| `--space-6` | 1.5rem | Card padding |
| `--space-8` | 2rem | Section gaps |
| `--space-12` | 3rem | Section padding |
| `--space-16` | 4rem | Large sections |
| `--space-20–32` | 5–8rem | Hero spacing |

### Layout
- Max content width: 1400px
- Max prose width: 800px
- Grid: `minmax(0, 1fr)` (not bare `1fr`) for proper shrink behavior
- Border radius scale: 0.25rem → 1.5rem

---

## Motion Philosophy

### Guiding Principle
Motion should feel like the flicker of candlelight — present, warm, but never distracting. Transitions are smooth and unhurried, like a gentle fade on a stage light.

### Specific Behaviors
- **Hover states**: 250ms ease transitions, subtle lift with glow
- **Scroll reveals**: Elements fade up 20px with 500ms ease (gated behind `prefers-reduced-motion: no-preference`)
- **Ambient**: Subtle CSS glow effects on icons and CTAs (drop-shadow with amber)
- **String light decoration**: Gentle opacity twinkle animation on decorative element

### `prefers-reduced-motion`
All non-essential animation is gated behind a media query check for reduced motion preference. The toggle is re-checked on change (not just read once at load).

---

## Visual Assets

### Icons
- **Inline SVG** — stroke-based, 1.5px stroke weight, rounded caps
- **Style**: Single-color, stroke-based, matches the warm amber palette
- **Uses**: Feature icons, client card icons, download card icons, arrow links
- **No icon font CDNs** — all icons are inline SVG in the HTML

### Logo
- **Format**: SVG, inline-friendly
- **Design**: Sound wave / acoustic motif with warm amber glow text gradient
- **Wordmark**: "Phlix" in Georgia serif with warm gradient
- **Icon**: Circular acoustic wave symbol

### Favicon
- **Format**: SVG, square 32×32 viewBox
- **Design**: Simplified circular icon with acoustic wave arcs
- **Background**: `#1A0F0A` (charred wood)

### OG Image
- **Dimensions**: 1200×630
- **Generated via**: `node tools/gen-og.mjs --site acoustic-nights`
- **Design**: Dark background with amber accents, logo, tagline

### String Light Decoration
- CSS-only decorative element using pseudo-elements
- Twinkle animation with CSS keyframes
- Amber star characters with glow text-shadow

### Wood Texture
- SVG noise filter applied as pseudo-element overlay
- Very subtle (3% opacity) for texture without distraction

---

## Component Highlights

### Hero
- Full-width, centered content
- Radial gradient overlays for depth (amber/gold from above, brown from below)
- Eyebrow → h1 → subheadline → CTAs → install command block
- Text shadow on h1 for warmth

### Feature Cards
- Background gradient (walnut → mahogany)
- Amber icon with drop-shadow glow
- Hover: lift + glow border + shadow

### CTA Banner
- Horizontal gradient stripe (transparent → amber tint → transparent)
- Creates visual separation without hard borders

### Footer
- Tagline in italic serif with amber color and text-shadow glow
- Three-column grid on desktop, single column on mobile
- Copyright line with license info

---

## Accessibility Notes

- All text/background pairs verified against WCAG 2.2 AA (4.5:1 for body, 3:1 for large text)
- Primary amber on dark background provides sufficient contrast
- `prefers-reduced-motion` respected throughout
- Keyboard navigation with visible focus indicators
- Touch targets minimum 44×44px
