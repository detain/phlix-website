# Popcorn Palace — Site Design Document

## Concept & Vision

Popcorn Palace is a brand kit site for Phlix with a **classic movie theater** aesthetic — buttery popcorn, velvet seats, and Art Deco marquee signage. The visual language evokes the golden age of cinema with warm golds, deep reds, and the glow of marquee bulb lights. Every visitor should feel like they're entering a premium movie palace, not a tech startup's product page.

## Aesthetic Direction

**Theme:** Art Deco Movie Palace — ornate but elegant, warm but dramatic, nostalgic but modern in execution.

The design draws from 1920s-30s movie theater architecture:
- Geometric patterns (chevrons, sunbursts, ziggurats)
- Bold metallic accents (gold on dark surfaces)
- Dramatic lighting effects (glows, gradients)
- Luxurious materials (velvet reds, brass golds)

## Color Palette

| Role | Name | Hex | Usage |
|------|------|-----|-------|
| Primary | Gold | `#FFD700` | Headlines, CTAs, accents, marquee glow |
| Secondary | Dark Red | `#8B0000` | Velour accent, highlights, emphasis |
| Tertiary | Wheat | `#F5DEB3` | Body text, popcorn reference |
| Background | Deep Burgundy-Black | `#1A0A0A` | Page backgrounds, dramatic base |
| Surface | Dark Gray | `#2D2D2D` | Cards, elevated surfaces |
| Surface Alt | Warm Gray | `#3A3535` | Alternating sections |
| Text | Wheat | `#F5DEB3` | Body text (warm, readable) |
| Text Muted | Muted Wheat | `#C4A882` | Secondary text, captions |
| Border | Warm Border | `#4A4040` | Dividers, card borders |
| Marquee Glow | Orange Glow | `#FF6B35` | Animated marquee bulb effect |

## Typography

- **Headlines:** Playfair Display (700, 900) — elegant serif with Art Deco character
- **Body:** Lato (400, 400 italic) — clean, readable sans-serif
- **Mono:** Fira Code (400) — for code blocks and technical content
- **Numbers:** Playfair Display (700) — for numerical emphasis

All fonts are self-hosted from the shared font pool (`../../assets/fonts/`).

## Spatial System

- **Base spacing unit:** 4px
- **Spacing scale:** 4, 8, 12, 16, 24, 32, 48, 64, 96px
- **Max content width:** 1400px
- **Border radius:** 2px (sm), 4px (md), 8px (lg), 12px (xl), 50px (pill)
- **Shadows:** Soft ambient shadows with warm undertones

## Motion Philosophy

**Art Deco Animated Flourishes:**

- **Marquee Lights:** Gentle pulsing glow on decorative bulb elements. 2s ease-in-out infinite cycle. Respects `prefers-reduced-motion` — becomes static when reduced motion is preferred.
- **Scroll Reveals:** Fade-up on intersection (opacity 0→1, translateY 20px→0, 400ms ease-out). Feature cards and content sections animate in as user scrolls.
- **Button Hovers:** Subtle lift and glow intensification (translateY -2px, shadow expansion).
- **Card Hover:** Gentle lift with gold glow shadow.

## Visual Assets

### Logo
- Art Deco marquee-style logo with popcorn bucket icon
- Gold (#FFD700) primary color on dark (#1A0A0A) background
- Decorative border with inner red accent line
- Animated marquee bulb lights (subtle pulsing)

### Favicon
- 32x32 square in Art Deco style
- Gold (#FFD700) circular elements on dark background
- Film reel/popcorn motif

### Icons
- Single-color stroke-based SVG icons
- Gold (#FFD700) color for feature icons
- Consistent 1.5px stroke width

### Decorative Elements
- Marquee light bulbs (animated with CSS keyframes)
- Art Deco corner decorations (gold brackets)
- Gradient overlays on hero sections

## Component Patterns

### Cards (Feature, Client, Download)
- Dark surface (#2D2D2D) background
- 1px warm border (#4A4040)
- 8px border radius
- Subtle shadow on hover with gold glow
- Left border accent on hub-feature items

### Buttons
- **Primary:** Gold (#FFD700) background, dark text, gold glow shadow
- **Secondary:** Transparent with gold border
- 44px minimum touch target
- Hover: lift + intensified glow

### FAQ
- Uses `<details>/<summary>` elements
- No-JS accessible (native HTML)
- Gold plus/close indicator
- Smooth expand/collapse

### Navigation
- Sticky header with blur backdrop
- Gold underline on current page
- Mobile: slide-in drawer from right

## Responsive Behavior

- **Desktop (1024px+):** Multi-column grids, full navigation
- **Tablet (768px-1024px):** 2-column grids, condensed spacing
- **Mobile (<768px):** Single column, hamburger menu, full-width buttons
- **Touch targets:** Minimum 44x44px on all interactive elements

## Accessibility

- **Contrast ratios:**
  - Primary gold on dark background: ~12.5:1 (passes AAA)
  - Body text on dark background: ~9.5:1 (passes AAA)
  - Muted text: ~5.8:1 (passes AA for large text)
- **Focus indicators:** 3px gold (#FFD700) outline with 2px offset
- **Motion:** All animations respect `prefers-reduced-motion: reduce`
- **Semantic HTML:** Proper heading hierarchy, landmarks, ARIA where needed

## Technical Notes

- Pure static HTML/CSS/JS — no frameworks or build tools required
- CSS custom properties for all design tokens
- Mobile-first responsive approach
- Self-hosted fonts only (no external CDN)
- Grid uses `minmax(0, 1fr)` to prevent overflow issues
- `overflow-wrap: anywhere` on body text for proper wrapping in narrow columns
