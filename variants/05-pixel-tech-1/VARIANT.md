# Variant 05 — Pixel Tech V1: Terminal Hacker

## Concept

**"Terminal Hacker"** — A cyberpunk, developer-focused aesthetic that channels the feel of a hacker command line. The entire experience looks like it emerged from a terminal window, with monospace typography dominance, neon green on black, and an atmosphere of technical confidence.

## Design Language

### Colors
- **Primary**: Neon Green `#39FF14`, Black `#000000`, Silver `#C0C0C0`
- **Secondary**: Dark Gray `#1A1A1A`, Matrix Green `#00FF66`
- **Accent**: Electric Purple `#9B30FF`

### Typography
- **Headlines**: Orbitron Bold (futuristic, tech)
- **Body**: Inter Medium (readable, modern)
- **UI/Labels**: Roboto Mono (terminal feel)
- **Code**: JetBrains Mono (developer standard)

### UI Style
- Pure black background (#000000) with green text
- Terminal green (#39FF14) for primary text and highlights
- Monospace dominance throughout UI elements
- Sharp, angular — no rounded corners anywhere
- Cursor blink effect in header (terminal typing animation)
- Command-line prompt styling for bullets and CTAs
- Terminal window components with traffic-light dots
- Scanline overlay texture on hero section

### What Makes This Variant Distinctive
1. **Terminal typing animation** — Hero prompt types out character by character with blinking cursor
2. **Command-line styling** — Pitch bullets prefixed with `$`, highlights prefixed with `[+]`
3. **Traffic-light terminal windows** — Red/yellow/green dots like macOS terminal
4. **Scanline overlay** — Subtle CRT-style scanlines on hero
5. **Terminal prompt decoration** — `>$` and `[ ]` style icon markers
6. **No rounded corners** — Sharp edges throughout, angular geometry

## Design Decisions

### Why These Choices
- Terminal aesthetic directly targets the developer audience
- Monospace typography signals "this is a tool, not a toy"
- Green on black references classic terminal / Matrix aesthetic
- Electric purple accent adds a cyberpunk edge without overwhelming
- Scanline texture adds depth and retro-computing atmosphere

### What I Avoided
- No soft pastel colors (forbidden by brand)
- No serif fonts (forbidden by brand)
- No rounded corners (terminal aesthetic demands sharp edges)
- No decorative flourishes (terminal style is minimal)

## Page Structure

All 8 pages implemented with:
- Semantic HTML5 landmarks (`<header>`, `<nav>`, `<main>`, `<footer>`)
- Single `<h1>` per page
- Proper ARIA labels on navigation
- Skip link for accessibility
- Visible focus styles
- `prefers-reduced-motion` media query respected

### Page Inventory
1. **index.html** — Hero with typing animation, pitch bullets, feature cards, CTAs
2. **features.html** — Deep dive on all 8 core features with detailed descriptions
3. **clients.html** — Platform cards (Roku, Tizen, Windows, Mobile beta, DLNA)
4. **download.html** — Installation commands, system requirements, ecosystem
5. **plugins.html** — Plugin architecture, manifest schema, lifecycle hooks
6. **docs.html** — Documentation links and quick navigation
7. **hub.html** — Hub explanation with terminal-style diagrams
8. **about.html** — Philosophy, license, FAQ, contact

## Technical Approach

### CSS Architecture
- `base.css` — Reset, CSS custom properties (brand tokens), typography, accessibility
- `theme.css` — Layout, terminal styling, section patterns, animations
- `components.css` — Buttons, cards, badges, terminal windows, tables, forms

### JavaScript
- `main.js` — Vanilla JS, no framework
- Terminal typing animation with reduced-motion fallback
- Staggered entrance animations for cards (IntersectionObserver)
- Mobile navigation with escape key handling

### Assets
- SVG logo (triple-bracket mark with opacity progression)
- SVG favicon (same mark, 32x32)
- SVG OG image (1200x630 with grid pattern, logo, tagline)

## Gotchas & Notes

- Fonts loaded from Google Fonts CDN (allowed per contract for fonts)
- JS has no external dependencies
- All animations respect `prefers-reduced-motion`
- Mobile nav overlay uses `position: fixed` with body scroll lock
- Terminal typing animation only starts after DOMContentLoaded + 500ms delay
