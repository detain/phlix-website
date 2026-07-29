# Boss-Battle Theme — SITE.md

## Concept & Vision

The boss-battle theme channels the intensity of Dark Souls / Final Fantasy boss encounters into a media server marketing site. Every interaction should feel like entering a decisive battle — dramatic gradients, health-bar motifs, glowing accents, and the satisfaction of conquering your library. This is media server marketing that doesn't apologize for being epic.

## Aesthetic Direction

Dark, atmospheric, and dramatic. The void-black background (#0D0D0D) creates a sense of power and mystery, while blood red (#8B0000) and gold (#FFD700) create the visual tension of a boss fight. Purple (#4A0080) adds a mystical/magical element. The overall feel: you've just entered the arena.

## Color Palette

| Role | Name | Hex | Usage |
|------|------|-----|-------|
| Background | Void | `#0D0D0D` | Page background, main surfaces |
| Primary | Blood | `#8B0000` | Primary buttons, accents, health-bar fills |
| Accent | Gold | `#FFD700` | Headlines, icons, highlights, focus states |
| Secondary | Purple | `#4A0080` | Secondary accents, DLNA elements |
| Tertiary | Flame | `#FF4500` | Danger states, hover accents |
| Surface | — | `#1A1A1A` | Cards, elevated surfaces |
| Text | — | `#E8E8E8` | Body text |
| Text Muted | — | `#999999` | Secondary text |
| Border | — | `#333333` | Dividers, card borders |

## Typography

- **Display Font:** Cinzel (serif, dramatic, uppercase)
  - Used for: headlines, h1-h3, eyebrow text, nav links, buttons, footer headings
  - Letter-spacing: 0.04-0.15em for that epic feel
- **Body Font:** Source Sans Pro (clean, readable)
  - Used for: body text, paragraphs
- **Mono Font:** JetBrains Mono / Fira Code / Consolas
  - Used for: code blocks, technical identifiers

**Self-hosted:** Fonts should reference local WOFF2 files in `../../shared/assets/fonts/` if available, otherwise fallback to system serif/sans-serif stacks.

## Spatial System

- Spacing scale: 0.25rem base (space-1 through space-10)
- Max content width: 1400px (default), 1200px (--narrow variant)
- Section padding: var(--space-9) default, var(--space-7) for compact sections
- Card gaps: var(--space-5) standard
- Border radius: 4px (sm), 8px (md), 12px (lg), 16px (xl)

## Motion Philosophy

- **Entrance animations:** fade-in-up with staggered delays (100ms-800ms)
- **Hover effects:** translateY(-4px) with glow shadows (blood for primary, purple for clients)
- **Health-bar motif:** gradient fills that pulse subtly
- **Reduce motion:** All animations respect `prefers-reduced-motion: reduce`

## Visual Assets

- **Logo:** Shield + crossed swords + P letter with gold glow
- **Favicon:** Dark red (#8B0000) square with gold P
- **OG Image:** Dark void background, shield shapes, large gold P, tagline
- **Icons:** Single-color stroke-based inline SVGs (gold for features, themed for clients)
- **Decorative:** Crossed line patterns, gradient dividers with sword emoji (⚔)

## Component Inventory

### Hero
- Full viewport height (85vh minimum)
- Background radial gradients (blood top, purple right)
- Gradient headline text (gold)
- Subtitle with muted text
- Primary + secondary CTA buttons
- Install command code block

### Feature Cards
- Dark surface with blood border on hover
- Gold icon centered above title
- fade-in-up entrance animation

### Client Cards
- Purple border on hover (different from features)
- Badge for status (stable=green, beta=gold)
- Highlights list with gold bullet points

### CTA Banner
- Gradient background (blood → purple)
- Gold border top/bottom
- Centered content with generous padding

### FAQ (About page)
- `<details>/<summary>` elements with gold plus/minus icon
- Smooth icon rotation on open
- Blood border on hover

### 404 Page
- Large "404" with blood gradient
- "Player Not Found" messaging (boss-battle flavor)
- Recovery links to home, features, download

## Responsive Behavior

- Mobile nav: hamburger toggle → full-screen overlay menu
- Grid: `minmax(0, 1fr)` for all grid columns (no bare `1fr`)
- Breakpoints: 320, 375, 414, 768, 1024, 1280, 1920
- Text never below ~16px on phones
- Layout containers use fluid widths + max-width (no fixed-px layout widths)

## Accessibility

- WCAG 2.2 AA compliance
- Body text ≥ 4.5:1 contrast
- Large text & UI ≥ 3:1 contrast
- Visible focus indicators (gold outline)
- Keyboard navigation with logical tab order
- `prefers-reduced-motion` respected

## File Structure

```
sites/boss-battle/
├── index.html
├── features.html
├── clients.html
├── download.html
├── plugins.html
├── docs.html
├── hub.html
├── about.html
├── 404.html
├── css/
│   ├── base.css (reset, tokens, elements)
│   ├── theme.css (typography, layout, sections)
│   └── components.css (header/nav, footer, buttons, cards)
├── js/
│   └── main.js (nav toggle, reduced motion, scroll reveal)
├── img/
│   ├── logo.svg
│   ├── favicon.svg
│   └── og.svg
├── robots.txt
├── sitemap.xml
├── SITE.md (this file)
└── BUILD_LOG.md
```
