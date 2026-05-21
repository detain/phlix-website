# Variant: 03-retro-film-reel-2 — Retro Film Reel V2 (50s Movie Theater)

## Concept & Vision

**"Timeless stories. Modern streaming."** — This variant channels the glamour of 1950s movie palaces — the velvet seats, ornate marquee borders, golden spotlight beams cutting through darkness, and the promise of silver-screen magic. It feels warm, nostalgic, and sophisticated — like walking into a classic Hollywood premiere.

The visual language draws from vintage cinema palaces: velvet textures in rich burgundy, art deco gold accents, spotlight effects, and classic film reel motifs. This is cinema royalty, not roadside casual.

## Design Language

### Aesthetic Direction
- **Reference**: 1950s Hollywood movie palace, art deco elegance
- **Mood**: Glamorous, warm, nostalgic, sophisticated
- **Texture**: Velvet gradients, gold foil accents, spotlight effects

### Color Palette
| Role | Name | Hex |
|------|------|-----|
| Primary | Velvet Red | `#7A1F1F` |
| Primary | Velvet Dark | `#4A0F0F` |
| Primary | Mahogany | `#2C1810` |
| Secondary | Vintage Gold | `#D4A017` |
| Secondary | Cream | `#F5E9D4` |
| Accent | Gold | `#D4A017` |
| Text | Dark Text | `#1A0F0A` |
| Muted | Muted Brown | `#8B7355` |

### Typography
- **Headlines**: Bebas Neue (bold, retro, cinematic uppercase)
- **Body**: Open Sans (friendly, readable)
- **UI**: Nunito (warm, rounded, approachable)
- **Code**: Cousine (monospace)

### Spatial System
- 4px base unit, scale: xs(4px), sm(8px), md(16px), lg(24px), xl(32px), 2xl(48px), 3xl(64px), 4xl(96px)
- Border radius: 4px (sm) through 9999px (full)
- Cards: 3px gold border + 6px offset shadow in gold + gradient fill

### Motion Philosophy
- **Primary Animation**: Marquee lights chase effect on logo (2s cycle, gold pulses)
- **Secondary Animation**: Spotlight sweep in hero (8s cycle, subtle rotation)
- **Hover States**: Cards lift with gold glow intensifies (translate -4px, gold shadow 10px)
- **FAQ Accordion**: Plus icon rotates to X (45deg rotation)
- **Scroll Animations**: Fade-in-up on card elements (if IntersectionObserver supported)
- **Reduced Motion**: All animations disabled via `prefers-reduced-motion: reduce`

### Visual Assets
- **Icons**: Unicode emoji with CSS styling (lightweight, no CDN icons)
- **Logo**: Film reel motif — velvet red fill with gold strokes and center hub
- **OG Image**: Film strip borders, velvet texture, gold corner accents, central logo
- **Decorative**: Velvet gradient overlays, gold trim accents, spotlight beam effects

## Layout & Structure

### Page Structure
- **Header**: Sticky, velvet red gradient, 4px gold bottom border, marquee-lights logo
- **Navigation**: Horizontal list on desktop, hamburger menu on mobile, gold underline hover
- **Hero**: Full-width, centered content, eyebrow badge, large headline, subheadline, CTA buttons, spotlight sweep
- **Content Sections**: Cream backgrounds with subtle velvet tint, ornate gold-bordered cards
- **Footer**: Dark mahogany/velvet gradient, gold top trim, multi-column links

### Responsive Strategy
- Mobile-first breakpoints: 320px → 768px → 1200px
- Features/clients/grids collapse to single column on mobile
- Navigation becomes hamburger menu below 768px
- Touch targets minimum 44px

## Features & Interactions

### Navigation
- Sticky header with velvet gradient and gold trim
- Active page highlighted with gold underline
- Mobile hamburger with gold border, toggle menu open/close
- Escape key closes mobile menu

### Cards (Feature, Client, Download, Plugin, Ecosystem)
- 3px gold border, gold offset shadow, cream-to-ede4d3 gradient
- Hover: translate(-4px, -4px), gold shadow increases to 10px, border may change to accent color
- Touch-friendly minimum height

### FAQ Accordion (About page)
- Click question to toggle answer visibility
- Plus icon rotates to X (45deg) when open
- Keyboard accessible (Enter/Space to toggle)
- aria-expanded and hidden attributes updated

### Scroll Animations
- Cards fade in from below on scroll into view (IntersectionObserver)
- Respects `prefers-reduced-motion`

### Buttons
- Primary: Velvet red background, cream text, gold border, gold offset shadow with inner glow
- Secondary: Cream background, black text, gold border, gold offset shadow
- Active state: pressed into position (translate 2px, shadow 2px)

## Component Inventory

### Site Logo
- SVG film reel icon + "Phlix" text
- States: default (marquee lights animation), hover (glow intensifies), reduced-motion (static glow)

### Navigation Link
- States: default (cream), hover (gold + underline), active page (gold underline)
- Focus: 3px gold outline

### Button (Primary/Secondary)
- States: default, hover (lift + glow), active (pressed), focus (gold outline)
- Min-height: 44px for touch

### Feature Card
- States: default (cream gradient + gold border), hover (lift + shadow increase + velvet accent)
- Contains: icon block, title, description

### Client Card
- Contains: name, tagline, highlight badges (gold tint), status badge, link button
- States: default, hover (lift)

### FAQ Item
- States: closed (plus icon), open (X icon + visible answer)
- Keyboard: Enter/Space toggles

### Download Card
- Contains: title, description, code block
- States: default, hover (lift)

### Ecosystem Card
- Contains: name, description, link
- States: default, hover (lift)

### Philosophy Block
- Velvet gradient background with gold border
- Gold decorative corner accents (❧ symbols)

## Technical Approach

### Stack
- Pure HTML5, CSS3, Vanilla JavaScript
- No frameworks, no bundlers, no third-party JS at runtime
- Self-hosted fonts via @font-face with `font-display: swap`

### CSS Architecture
- `base.css`: Reset, custom properties (tokens), typography, utilities
- `theme.css`: Layout, header with marquee lights, hero with spotlight sweep, cards, buttons, footer
- `components.css`: Plugin cards, FAQ accordion, hub features, ecosystem grid, philosophy block, code blocks, note boxes, steps, utilities

### JavaScript
- `main.js`: IIFE module pattern
- Features: mobile menu toggle, FAQ accordion, smooth scroll, active nav highlighting, scroll animations, logo animation
- No dependencies, no build step

### Accessibility
- Skip link (visually hidden until focused)
- Semantic HTML landmarks (header, main, nav, footer)
- Single h1 per page
- ARIA attributes on interactive elements (aria-expanded, aria-current, etc.)
- Visible focus styles (3px gold outline)
- Keyboard navigable (Escape closes menus, Enter/Space activates buttons)
- Reduced motion media query support

### Performance
- Self-hosted fonts via @font-face (no Google Fonts CDN at runtime)
- No JavaScript frameworks
- Minimal JS footprint (~3KB unminified)
- CSS custom properties for consistent theming

## Content Sources

All marketing copy comes from `shared/content.json`:
- Site metadata, hero text, pitch bullets, feature descriptions
- Client data (Roku, Tizen, Windows, Mobile, DLNA)
- Ecosystem projects list
- FAQ entries
- Footer links and columns

## Distinction from -1 (Classic Diner)

While -1 channels the playful, roadside Americana energy of a 1950s diner with red/cream contrast and neon sign flicker, -2 steps into the grandeur of a Hollywood movie palace. The palette shifts from red/cream/teal to velvet red/gold/cream. The motion changes from neon flicker to marquee lights chase and spotlight sweep. The textures evolve from halftone dots to velvet gradients and art deco patterns.

**-1**: Fun, friendly, casual diner energy
**-2**: Glamorous, warm, sophisticated palace elegance
