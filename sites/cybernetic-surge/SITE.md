# SITE.md — Cybernetic Surge Design Rationale

## Concept & Vision

Cybernetic Surge presents Phlix as a media infrastructure upgrade — a cybernetic layer that adapts to your viewing habits and optimizes your sensory input. The site should feel like looking through a neural augmentation interface: precise geometric HUD elements, chrome surfaces catching light at impossible angles, circuit traces pulsing with electric teal. The experience is surgical-precision meets sci-fi chrome. Every element communicates that this is a system you can *inhabit*, not just use.

## Aesthetic Direction

**Style:** Cybernetic chrome illustration with circuit board trace aesthetics, HUD/heads-up display overlays, holographic interface panels, and bionic/prosthetic silhouettes.

**Reference:** Ghost in the Shell cyberware and augmented reality interfaces, Deus Ex and Cyberpunk 2077 augmentation laboratories, Chrome reflections on wet pavement at night, Neuralink brain-computer interface presentations.

## Color Palette

| Role | Name | Hex | Usage |
|------|------|-----|-------|
| Primary | Electric Teal | `#00FF9F` | CTAs, circuit traces, active states, pulsing glow |
| Secondary | Cyan Surge | `#00B4D8` | Hover states, circuit trace mid-points |
| Tertiary | Deep Ocean | `#0077B6` | Depth layers, subtle background traces |
| Background | Deep Navy | `#03045E` | Primary dark-mode background |
| Surface | Midnight Panel | `#023E8A` | Cards and panel surfaces |
| Surface Alt | Neural Dark | `#010A31` | Darkest surfaces, overlays, modals |
| Text | Chrome White | `#E8F4F8` | Primary body and headline text |
| Muted | Chrome Silver | `#C8D8E8` | Secondary text, chrome reflections |
| Border | Circuit Trace | `rgba(0,255,159,0.25)` | Glowing circuit borders |
| Glow | Teal Glow | `rgba(0,255,159,0.45)` | Glow effects |

## Typography

| Role | Font | Weights | Notes |
|------|------|---------|-------|
| Headlines | Orbitron | 400, 700 | Uppercase/title case, letter-spacing 0.08em |
| Display | Space Grotesk | 300, 700 | Oversized display, upgrade level badges |
| Body | Inter | 300, 400, 500 | Paragraphs, descriptions |
| UI | Space Grotesk | 400, 500, 600 | Buttons, labels, navigation |
| Mono | JetBrains Mono | 300, 400 | Code snippets, diagnostics |

**Rules:**
- Orbitron headlines always in uppercase or title case — never sentence case
- Body text uses Inter at weight 300 or 400; 700 reserved for single-word emphasis
- Upgrade level displayed in Orbitron with teal glow
- On dark backgrounds use chrome white (#E8F4F8); avoid pure #FFFFFF

## Spatial System

**Scale:** 4px base unit — 4, 8, 12, 16, 24, 32, 48, 64, 96px

**Max content width:** 1400px (default), 900px (narrow)

**Corner radius:** 2px (small), 4px (medium), 8px (large), 12px (xl), 999px (pill)

**Borders:** Razor-sharp and precise. Angular chamfered corners preferred over rounded.

## Motion Philosophy

**Primary motif:** Circuit flush — electricity propagating through trace lines, illuminating nodes sequentially.

**Animation speed:** Medium-fast

**Easing:** `cubic-bezier(0.16, 1, 0.3, 1)` for exits, `ease-out` for standard, `linear` for progress

**Microinteractions:**
- Hover: Circuit traces pulse outward from element — teal wave crossing surface
- Button press: Brief chrome flash then snap to active state — 100ms
- Loading: Circuit trace progress bar — teal line drawing itself left to right
- Success: Full circuit flush — electricity fills every trace, then settles

**Reduced motion:** Honor `prefers-reduced-motion: reduce` — replace bounces with fades, remove circuit flush animations.

## Visual Assets

### Icons
- Inline SVG only, single-color, stroke-based
- 1–1.5px stroke weight, angular geometric joins
- Electric teal primary tint on dark surfaces
- No icon CDN, no icon fonts

### Logo
- Wordmark in Orbitron
- Optional hexagonal circuit-trace badge border in electric teal
- Chrome white on deep navy, or Chrome Surge gradient

### Favicon
- Square mark in primary color (#00FF9F) on deep navy
- Simple hexagonal circuit node motif

### Decorative
- Circuit trace grid background pattern at very low opacity (3-4%)
- Angular glassmorphism on cards — semi-transparent navy + backdrop-filter blur + teal glowing border

## Component Notes

### Cards (feature-card, client-card, download-card)
- Background: `rgba(2, 62, 138, 0.3)`
- Border: `1px solid rgba(0, 255, 159, 0.2)`
- Border radius: 8px
- On hover: border brightens to full teal, shadow appears

### Primary Button
- Chrome Surge gradient: `linear-gradient(135deg, #C8D8E8, #00B4D8, #00FF9F)`
- Deep navy text
- Angular radius (4px)
- Teal glow shadow on hover

### Navigation
- Frosted neural bar — backdrop-filter blur
- Active item: teal left-side bar + neural fill
- 6 primary nav items with cybernetic labels (Signal, Calibrate, Interfaces, Install, Relay, System)

### Syntha Mascot
- Simplified holographic chrome form in hero section
- Pulsing teal glow animation (disabled under reduced-motion)
- Present on home, features, download pages

## Accessibility

- WCAG AA: 4.5:1 body text on dark surfaces, 3:1 large text/UI
- Chrome white (#E8F4F8) on deep navy (#03045E) achieves ~13:1
- Focus style: 4px electric teal glow ring
- Touch targets: minimum 48x48px on mobile/TV, 44x44px on desktop
- All layouts must survive 200% text zoom
- Never convey information by color alone — pair with icon, label, or pattern
