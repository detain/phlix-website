# Vinyl Vault — Brand Kit Site

## Concept & Vision

Vinyl Vault is a brand kit site for Phlix with an analog record collection aesthetic. The design evokes the warmth of a vintage record store — groove textures, warm sepia tones, and vintage radio dial influences. Every surface should feel like it belongs in a well-curated listening room, not a sterile tech product page.

## Aesthetic Direction

**Theme:** Analog record collection / vintage audio equipment
**Mood:** Warm, tactile, nostalgic but not kitschy — the sophistication of a serious collector

### Color Palette

| Role | Name | Hex | Usage |
|------|------|-----|-------|
| Primary | Deep Brown | `#2D1810` | Background, headers |
| Secondary | Warm Tan | `#C4956A` | Borders, accents, muted text |
| Accent | Gold | `#FFD700` | CTAs, highlights, interactive elements |
| Surface | Cream | `#E8D5B7` | Body text, card backgrounds |
| Surface Dark | Saddle Brown | `#8B4513` | Secondary borders, dividers |

### Typography

- **Display:** Playfair Display (700, 900) — elegant serif for headlines
- **Body:** Crimson Text (400, 600, 700) — readable classic serif for prose
- **UI:** Barlow (400, 500, 600, 700) — clean sans for navigation, labels, buttons
- **Mono:** Courier Prime (400) — code blocks

### Spatial System

- **Spacing scale:** 0.25rem base unit (0.25, 0.5, 0.75, 1, 1.5, 2, 3, 4, 5, 6, 7 rem steps)
- **Border radius:** 0.25rem (sm), 0.5rem (md), 1rem (lg), 9999px (full/pills)
- **Max content width:** 1200px
- **Max site width:** 1400px

### Motion Philosophy

- Subtle, purposeful animations only
- Scroll-triggered fade-in reveals for cards
- Hover lifts on interactive cards (translateY -4px)
- Glow effect on primary CTA hover
- Vinyl groove texture overlay in hero (decorative, CSS-only)
- All motion respects `prefers-reduced-motion: reduce`

### Visual Assets

- **Logo:** SVG with vinyl record icon + "Vinyl Vault" wordmark
- **Favicon:** Simple vinyl record mark in primary color (#2D1810)
- **Icons:** Inline SVG, stroke-based, single-color gold (#FFD700) for feature icons
- **Decorative elements:** Repeating radial gradient grooves in hero, gradient dividers with ornament

## Layout & Structure

### Page Structure

- **Header:** Sticky, dark background with blur, logo + 8 nav links + mobile hamburger
- **Hero:** Centered, eyebrow tag, h1, subheadline, two CTAs
- **Content sections:** Alternating with vintage dividers (gradient lines with diamond ornament)
- **Footer:** Tagline, 3-column nav, copyright

### Responsive Behavior

- Breakpoints: 320, 375, 414, 768, 1024, 1280, 1920
- Mobile-first approach
- Mobile nav: slide-out drawer from right
- Grid columns collapse from multi-column to single at 768px
- Touch targets minimum 44×44px

## Features & Interactions

### Navigation

- 8 primary nav links: Home, Features, Clients, Download, Plugins, Docs, Hub, About
- Current page indicated with `aria-current="page"` and gold accent color
- Mobile hamburger toggle with slide-out menu, close on outside click or Escape
- Focus trapped in open mobile menu

### Cards & Grids

- Feature cards: icon + title + body, hover lift effect
- Client cards: name + status badge + tagline + highlights list + source link
- Download cards: title + description + action button

### Forms & Controls

- Focus-visible outlines in gold
- Input border highlights on focus
- Buttons have min-height 44px (touch target)

### Scroll Animations

- IntersectionObserver-based fade-in reveals
- Only on elements with `.feature-card`, `.client-card`, `.download-card`, `.feature-detail`
- Disabled entirely under `prefers-reduced-motion: reduce`

## Component Inventory

### Buttons

| Variant | Background | Text | Border |
|---------|------------|------|--------|
| Primary | #FFD700 (gold) | #2D1810 (dark) | #FFD700 |
| Secondary | transparent | #E8D5B7 (cream) | #E8D5B7 |
| Small | inherits | inherits | inherits |

- Primary hover: brighter gold, lift, glow shadow
- All buttons: 44px min-height, 2px border, rounded-md

### Badges

| Status | Background | Text |
|--------|------------|------|
| Stable | rgba(76,175,80,0.2) | #81c784 |
| Beta | rgba(255,215,0,0.2) | #FFD700 |
| Deprecated | rgba(244,67,54,0.2) | #e57373 |

### Code Blocks

- Dark background (rgba 45,24,16,0.9)
- Border 1px solid #8B4513
- Padding 2rem
- Font: Courier Prime
- Scrollable horizontally

### Dividers

- Horizontal gradient lines (transparent → border color → transparent)
- Diamond ornament (◆) centered
- Margin 3rem vertical

## Technical Approach

- **Framework:** None — vanilla HTML, CSS, JavaScript
- **Fonts:** Self-hosted WOFF2 from `../../../shared/assets/fonts/`
- **Icons:** Inline SVG (no CDN, no icon font)
- **JS:** Vanilla ES5+, defer-loaded, no dependencies
- **CSS architecture:** Three files (base.css, theme.css, components.css) with CSS custom properties

## Content Notes

- 8 features from content.json
- 4 native clients + DLNA (never "5" or "Five")
- 6 FAQ items from content.json
- License: MPL-2.0 (server/hub), MIT (clients/plugins) — read from content.json, not hardcoded
- Install command: `curl -fsSL https://raw.githubusercontent.com/detain/phlix-server/master/scripts/install.sh | sudo bash`
- Footer tagline: "Open-source media, on your terms."
