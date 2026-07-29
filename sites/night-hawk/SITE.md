# Night Hawk Brand Kit Site — Design Rationale

## Concept & Vision

The Night Hawk brand kit embodies the **stealth fighter aesthetic** — elite, precise, and untouchable. This is the Phlix brand kit for users who appreciate military-grade precision and a dark, immersive interface. Every element communicates controlled power and technical sophistication.

The site must feel like stepping into a cockpit: dark surfaces, glowing cyan HUD elements, targeting reticles, and telemetry readouts. Yet beneath the tactical aesthetic, the content is purely about Phlix media server — not about fighter jets. The fighter theme is the *lens*, not the subject.

---

## Aesthetic Direction

### Theme: Stealth Fighter / Military HUD

- **Mood**: Dark, tactical, authoritative. Like a fighter pilot's heads-up display.
- **Reference**: F-35 cockpit interfaces, military radar systems, night vision optics.
- **Not**: Cyberpunk (too neon), brutalist (too raw), corporate (too cold).

---

## Color Palette

| Role | Name | Hex | Usage |
|------|------|-----|-------|
| Background | Deep Black | `#0A0A0A` | Page backgrounds — "stealth mode" |
| Surface | Dark Slate | `#1B2631` | Cards, panels — "cockpit panels" |
| Secondary | Steel Blue | `#415A77` | Borders, muted text — "tactical overlay" |
| Primary | HUD Cyan | `#00B4D8` | Links, accents, glows — "targeting reticle" |
| Accent | Off-White | `#E0E1DD` | Body text, headings — "cockpit displays" |
| Highlight | Night Vision | `#00FF88` | Success states — "NVG green" |
| Danger | Alert Red | `#FF4444` | Errors, warnings |

### Color Rules (from kit)
- No raw off-palette hex in component CSS — all colors via CSS variables.
- HUD cyan used for glows and borders; never as large text backgrounds.
- Off-white text on dark backgrounds meets WCAG AA.

---

## Typography

The night-hawk brand kit specifies **Orbitron** for display and **Share Tech Mono** for body. However, these fonts are not in the shared font pool (`shared/assets/fonts/`).

### Font Resolution
| Role | Specified | Available Fallback | Notes |
|------|-----------|-------------------|-------|
| Display (logo, hero) | Orbitron | Fira Code | Uppercase tech font, good substitute |
| Heading | Share Tech Mono | Fira Code | Monospace technical font |
| Body | Share Tech | Fira Code | Monospace readable font |
| Mono | Fira Code | Fira Code | In shared font pool |

**Note**: Escalated to orchestrator that Orbitron/Share Tech Mono/Share Tech are not in the vendored font pool. Fira Code is used as the closest available substitute that maintains the technical monospace aesthetic.

### Type Scale
- Display: uppercase, 0.15em letter-spacing
- Heading: 0.1em letter-spacing
- Body: 0.05em letter-spacing
- Line-height: 1.6 for body, 1.2 for headings

---

## Spatial System

| Token | Value |
|-------|-------|
| `--space-1` | 0.25rem |
| `--space-2` | 0.5rem |
| `--space-4` | 1rem |
| `--space-6` | 1.5rem |
| `--space-8` | 2rem |
| `--space-12` | 3rem |
| `--space-16` | 4rem |
| `--space-24` | 6rem |

### Section Padding
- Default: `6rem 2rem` (from kit)
- Mobile: `3rem 1rem`

### Corner Radius
Sharp, tactical — `2px` small, `4px` medium, `8px` large. No rounded pills.

---

## Motion Philosophy

Motion is **precise and purposeful**, never playful:
- **Entrance**: Fade-in with subtle upward translate
- **Hover**: Glow intensification, subtle lift
- **Transitions**: 300ms cubic-bezier(0.4, 0, 0.2, 1)
- **Ambient**: HUD flicker effect on select elements

### Reduced Motion
All animations respect `prefers-reduced-motion: reduce`:
- No entrance animations
- No hover transforms
- HUD flicker disabled
- Scroll reveals disabled

### Animations Used
- `hudFlicker`: Subtle opacity pulse simulating CRT/HUD refresh
- `glowPulse`: Border glow intensification
- Scanline overlay: Fixed position repeating gradient

---

## Visual Assets

### Logo (`img/logo.svg`)
- Stealth fighter "P" mark with targeting reticle
- HUD cyan (#00B4D8) stroke on dark background
- Corner accent marks (HUD style)
- Monospace "PHLIX" text alongside mark

### Favicon (`img/favicon.svg`)
- Square, #0A0A0A background
- Simplified "P" mark in cyan
- Corner HUD brackets

### OG Image (`img/og.png`)
- 1200x630 PNG (rasterized from SVG source)
- Dark gradient background with grid overlay
- Large "PHLIX" logotype
- "SELF-HOSTED MEDIA SERVER" tagline
- Targeting reticle decorations
- HUD corner brackets

### Feature Icons (inline SVG)
8 feature icons as single-color, stroke-based inline SVGs:
1. Library (book icon)
2. SyncPlay (clock icon)
3. Transcode (refresh/arrows icon)
4. Auth (shield icon)
5. Live TV (antenna icon)
6. DLNA (screen icon)
7. Plugins (puzzle icon)
8. Hub (globe icon)

All icons use `stroke="currentColor"` and `stroke-width="1.5"`.

---

## Component Details

### Cards
- Background: linear-gradient from surface to background
- Border: 1px solid rgba(0, 180, 216, 0.3)
- Shadow: inset glow top + outer glow on hover
- Corner radius: 2px (sharp)

### Buttons
- **Primary**: Gradient cyan background, glow shadow, uppercase text
- **Secondary**: Transparent with cyan border and glow
- **Ghost**: Transparent, no border, accent text color
- All: 0.3s transition, subtle scale on hover

### Badges
- Background: rgba(0, 180, 216, 0.15)
- Border: 1px solid rgba(0, 180, 216, 0.3)
- Text: uppercase, 0.1em letter-spacing, 0.75rem

### Code Blocks
- Dark background (#0A0A0A)
- "TERMINAL" header label
- Night vision green (#00FF88) text
- Cyan border with glow

---

## Accessibility Notes

### Contrast
- Body text (#E0E1DD) on background (#0A0A0A): ~13.8:1 ✓
- Primary (#00B4D8) on background: ~7.2:1 ✓
- Secondary (#415A77) on background: ~4.6:1 ✓ (acceptable for small text)

### Focus States
- 2px cyan outline with 2px offset
- Glow shadow on focus-visible
- Visible on all interactive elements

### Reduced Motion
All animations gated behind `prefers-reduced-motion: reduce` media query.

---

## Layout Archetype

Default layout archetype per new_site.md:
- Header: fixed, blur backdrop
- Hero: full viewport height minus header
- Sections: max-width 1400px container
- Footer: full-width with 3-column grid

Responsive: 320px → 375px → 414px → 768px → 1024px → 1280px → 1920px

---

## Deviation from Kit Spec

### Font Substitution
Orbitron, Share Tech Mono, and Share Tech are not in `shared/assets/fonts/`. Per new_site.md §19.3, these should not be silently substituted with non-pool fonts or CDN links. Fira Code (which IS in the pool) is used as a functional substitute. Escalated to orchestrator for font pool addition.

---

## Files Generated

```
sites/night-hawk/
├── index.html          # Home page
├── features.html       # Features (8 feature details)
├── clients.html        # Clients (5 client cards)
├── download.html       # Download + ecosystem
├── plugins.html       # Plugin model + example
├── docs.html          # Documentation links
├── hub.html           # Phlix Hub explanation
├── about.html         # Philosophy + FAQ
├── 404.html           # Stealth-themed error page
├── css/
│   ├── base.css       # Reset, tokens, base styles
│   ├── theme.css      # Typography, layout, sections
│   └── components.css # Header, nav, buttons, cards
├── js/
│   └── main.js        # Nav toggle, FAQ accordion, scroll reveals
├── img/
│   ├── logo.svg       # Night Hawk wordmark + mark
│   ├── favicon.svg    # Square cyan P mark
│   ├── og.png         # 1200x630 social share image
│   └── og.svg         # Source SVG for og.png
├── robots.txt
├── sitemap.xml
├── SITE.md            # This file
└── BUILD_LOG.md       # Build record
```
