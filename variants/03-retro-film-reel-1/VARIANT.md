# Variant: 03-retro-film-reel-1 — Retro Film Reel V1 (Classic Diner)

## Concept & Vision

**"Home Theater, Upgraded."** — This variant channels the warmth and nostalgia of a 1950s American diner, where film reels spun and families gathered for movie nights. It feels playful, approachable, and distinctly Americana — like a neon-lit roadside diner sign glowing on a summer evening.

The visual language borrows from vintage cinema, classic diner aesthetics, and mid-century design: bold red-and-cream contrast, chrome accents, rounded corners everywhere, and a neon sign effect that subtly flickers in the header.

## Design Language

### Aesthetic Direction
- **Reference**: Classic 1950s American diner meets vintage movie palace
- **Mood**: Warm, nostalgic, fun, friendly, approachable
- **Texture**: Subtle halftone dot overlays, chrome/metallic accents

### Color Palette
| Role | Name | Hex |
|------|------|-----|
| Primary | Retro Red | `#C0392B` |
| Primary | Cream | `#F5E9D4` |
| Primary | Teal | `#1ABC9C` |
| Primary | Black Outline | `#111111` |
| Secondary | Mustard | `#D4A017` |
| Secondary | Soft Brown | `#8C5E3C` |
| Accent | Mint | `#A3E4D7` |

### Typography
- **Headlines**: Bebas Neue (bold, retro, cinematic uppercase)
- **Body**: Open Sans (friendly, readable)
- **UI**: Nunito (warm, rounded, approachable)
- **Code**: Cousine (monospace)

### Spatial System
- 4px base unit, scale: xs(4px), sm(8px), md(16px), lg(24px), xl(32px), 2xl(48px), 3xl(64px), 4xl(96px)
- Border radius: 4px (sm) through 9999px (full)
- Cards: 3px black border + 6px offset shadow in black

### Motion Philosophy
- **Primary Animation**: Neon sign flicker effect on logo (subtle, 3s cycle)
- **Hover States**: Cards lift with increased shadow offset (translate -4px, shadow 10px)
- **FAQ Accordion**: Rotate plus to X (45deg rotation)
- **Scroll Animations**: Fade-in-up on card elements (if IntersectionObserver supported)
- **Reduced Motion**: All animations disabled via `prefers-reduced-motion: reduce`

### Visual Assets
- **Icons**: Unicode emoji with CSS styling (lightweight, no CDN icons)
- **Logo**: Film reel motif — concentric circles with spokes and center hub
- **OG Image**: Film strip borders, large central logo, tagline footer
- **Decorative**: Halftone dot pattern overlay (via CSS radial-gradient)

## Layout & Structure

### Page Structure
- **Header**: Sticky, cream background, 4px black bottom border, neon-flicker logo
- **Navigation**: Horizontal list on desktop, hamburger menu on mobile, red underline hover
- **Hero**: Full-width, centered content, eyebrow badge, large headline, subheadline, CTA buttons
- **Content Sections**: Alternating white/cream backgrounds, centered or grid layouts
- **Footer**: Dark (black) background, multi-column links, copyright

### Responsive Strategy
- Mobile-first breakpoints: 320px → 768px → 1200px
- Features/clients/grids collapse to single column on mobile
- Navigation becomes hamburger menu below 768px
- Touch targets minimum 44px

## Features & Interactions

### Navigation
- Sticky header with logo + nav links
- Active page highlighted with red underline
- Mobile hamburger with animated bars, toggle menu open/close
- Escape key closes mobile menu

### Cards (Feature, Client, Download, Plugin, Ecosystem)
- 3px black border, 6px offset shadow
- Hover: translate(-4px, -4px), shadow increases to 10px
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
- Primary: Red background, cream text, 4px offset shadow
- Secondary: Cream background, black text, 4px offset shadow
- Active state: pressed into position (translate 2px, shadow 2px)

## Component Inventory

### Site Logo
- SVG film reel icon + "Phlix" text
- States: default, hover (slight glow), reduced-motion (static glow)

### Navigation Link
- States: default (black), hover (red + underline), active page (red underline)
- Focus: 3px teal outline

### Button (Primary/Secondary)
- States: default, hover (lift), active (pressed), focus (teal outline)
- Min-height: 44px for touch

### Feature Card
- States: default, hover (lift + shadow increase)
- Contains: icon block, title, description

### Client Card
- Contains: name, tagline, highlight badges, status badge, link button
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

## Technical Approach

### Stack
- Pure HTML5, CSS3, Vanilla JavaScript
- No frameworks, no bundlers, no third-party JS at runtime
- Google Fonts loaded via `@font-face` with `font-display: swap`

### CSS Architecture
- `base.css`: Reset, custom properties (tokens), typography, utilities
- `theme.css`: Layout, header, hero, features, clients, buttons, footer
- `components.css`: Plugin cards, FAQ accordion, hub features, ecosystem grid, code blocks, notes

### JavaScript
- `main.js`: IIFE module pattern
- Features: mobile menu toggle, FAQ accordion, smooth scroll, active nav highlighting, scroll animations, logo animation
- No dependencies, no build step

### Accessibility
- Skip link (visually hidden until focused)
- Semantic HTML landmarks (header, main, nav, footer)
- Single h1 per page
- ARIA attributes on interactive elements (aria-expanded, aria-current, etc.)
- Visible focus styles (3px teal outline)
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

## Known Constraints

- Fonts loaded from Google Fonts CDN at build time via @font-face URLs — not truly self-hosted but uses same font files
- No build step: changes to CSS/JS require manual refresh
- OG image is SVG (some social platforms prefer PNG)
- No analytics, tracking, or cookies
- No dark mode toggle (cream is the background, not a toggleable dark theme)
