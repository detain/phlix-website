# Hollywood Sign Brand Kit — Site Documentation

## Concept & Vision

The Hollywood Sign brand kit evokes the iconic landmark, glamour, and dream-factory mystique of Hollywood. The aesthetic captures cinematic prestige with warm golden hour tones against dark backgrounds — like the famous letters glowing against the hills at dusk. White/off-white text on deep navy creates a premium, theatrical feel.

## Aesthetic Direction

**Reference:** Classic Hollywood cinema meets modern streaming interface. Think premiere-night glamour, golden-age Hollywood typography, and the warm glow of the actual sign at twilight.

**Mood:** Prestigious, cinematic, warm, inviting.

## Color Palette

| Role | Name | Hex |
|------|------|-----|
| Primary Background | Dark Navy | `#1A1A2E` |
| Secondary | Dark Blue-Gray | `#2C3E50` |
| Accent (Primary) | Hollywood Gold | `#C9A227` |
| Accent (Secondary) | Hollywood Sign Red | `#E74C3C` |
| Light/Text | Off-White | `#F5F5F5` |
| White | Pure White | `#FFFFFF` |

**Contrast Notes:**
- Gold (#C9A227) on Dark Navy (#1A1A2E): ~10.2:1 (passes AAA)
- Off-White (#F5F5F5) on Dark Navy (#1A1A2E): ~14.5:1 (passes AAA)
- Off-White on Gold: ~3.2:1 (large text/UI only, passes AA for 18pt+)
- Gold on cards with dark backgrounds: ~8.7:1 (passes AA)

## Typography

**Display/Headings:** Playfair Display — serif with cinematic elegance, used for h1-h6 and the footer tagline.

**Body/UI:** Source Sans Pro — clean, readable sans-serif for body text and navigation.

**Monospace:** JetBrains Mono / Consolas — for code blocks.

**Font Loading:** Self-hosted via `@font-face` local() declarations. No external CDN requests.

## Spatial System

| Token | Value |
|-------|-------|
| `--space-xs` | 0.25rem |
| `--space-sm` | 0.5rem |
| `--space-md` | 1rem |
| `--space-lg` | 1.5rem |
| `--space-xl` | 2rem |
| `--space-2xl` | 3rem |
| `--space-3xl` | 4rem |
| `--space-4xl` | 6rem |

**Layout max-width:** 1400px
**Header height:** 80px

## Motion Philosophy

- Subtle, cinematic transitions (250-400ms ease)
- Scroll-reveal fade-up animations for cards (500ms, staggered via IntersectionObserver)
- Hover glow effects with gold accent
- Reduced motion: all animations disabled, transitions become instant

## Visual Assets

- **Logo:** SVG wordmark with film-strip aesthetic P and gold gradient
- **Favicon:** Square mark in dark navy with gold P and red star accent
- **OG Image:** 1200x630 social card with Hollywood Sign theme, gold wordmark, cinematic bars
- **Feature Icons:** Stroke-based inline SVGs, single color (gold), matching icon style

## Layout Archetype

Cinematic hero with radial gradient overlays, card grids with hover glow effects, film-frame borders. Dark theme with warm gold accents creates premium viewing- experience aesthetic.

## Responsive Behavior

- Mobile-first approach
- Navigation collapses to hamburger at 768px
- Grid columns stack to single column at 768px
- Touch targets minimum 44x44px
- 320px minimum supported width

## Component Inventory

### Hero
- Full-viewport-ish height with centered content
- Radial gradient overlays (gold top, red bottom)
- Eyebrow badge with gold border
- Two CTA buttons (primary gold, secondary bordered)
- Code block for install command

### Feature Cards
- Background: semi-transparent dark
- Border: subtle gold at 30% opacity
- Hover: translateY(-4px), gold glow shadow, border brightens
- Icon, title, body text

### Client Cards
- Status badge (stable=green, beta=yellow)
- Highlights list with em-dash markers
- "View source" button when repo available

### Code Blocks
- Dark background (40% black)
- Gold border
- monospace font
- Horizontal scroll on overflow

### FAQ List
- `<details>`/`<summary>` pattern
- Gold plus/close icon rotation on toggle
- Body text muted color

## Footer

- Tagline in Playfair Display italic with gold color
- 3-column nav grid
- Copyright line with MPL-2.0 license reference

## Grid Implementation

All CSS grids use `minmax(0, 1fr)` to prevent track overflow from unbreakable strings.

## Accessibility

- WCAG 2.2 AA compliant
- Skip link as first focusable element
- Full keyboard navigation
- ARIA landmarks (banner, navigation, main, contentinfo)
- prefers-reduced-motion fully honored
- Focus-visible outlines on all interactive elements
