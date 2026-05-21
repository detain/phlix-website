# Portal Hub V1 — Clean Tech Minimal

## Variant Overview

**Name:** Portal Hub V1 — Clean Tech Minimal
**Variant ID:** 04-portal-hub-1
**Wave:** Wave 1
**Brand Kit:** Clean futuristic UI with neon accents, maximum clarity

## Design Direction

### Aesthetic
Clean futuristic UI with dark backgrounds and neon cyan accents. Maximum clarity with minimal visual noise. Glassmorphism subtle effects on cards and panels.

### Color Palette
| Token | Hex | Usage |
|-------|-----|-------|
| neon_cyan | #00E5FF | Primary accent, CTAs, active states |
| midnight_blue | #0A0F1F | Primary background |
| white | #FFFFFF | Primary text |
| deep_navy | #08101C | Secondary background, header |
| soft_cyan | #7FF6FF | Secondary text, subtle accents |
| magenta_pulse | #FF00C8 | Accent highlights, special callouts |

### Typography
- **Headlines:** Poppins SemiBold (600)
- **Body:** Inter Light (300)
- **UI:** SF Pro Rounded (fallback to Inter)
- **Code:** IBM Plex Mono

### Visual Motifs
- **Header motif:** Rotating portal ring animation (CSS animation, 8s rotation)
- **Circular rings:** Concentric ring patterns in feature icons and the hub diagram
- **Glow effects:** Subtle box-shadows with neon cyan for interactive elements

### Motion
- Portal ring rotation: continuous, 8s linear infinite
- Feature cards: translateY(-4px) on hover with shadow
- Buttons: translateY(-2px) with glow intensification on hover
- All animations respect `prefers-reduced-motion`

## Layout & Structure

### Header
- Fixed position with glassmorphism (backdrop-filter blur 12px)
- Logo with animated portal ring icon
- Horizontal navigation (hamburger menu on mobile)
- Border-bottom with subtle neon cyan at 10% opacity

### Hero Section
- Radial gradient glow behind content
- Large headline with gradient text (white to soft_cyan)
- Two CTAs: primary (filled) and secondary (outlined)

### Feature Cards
- Grid layout (auto-fit, min 280px columns)
- Glassmorphism background with border
- Hover lift effect with border glow
- Consistent padding (xl = 2rem)

### Footer
- 3-column grid for link sections
- Deep navy background
- Subtle top border

## Pages

1. **index.html** — Hero + pitch bullets + feature grid + CTAs
2. **features.html** — Detailed feature exploration with feature lists
3. **clients.html** — Client cards with status badges
4. **download.html** — Download options, system requirements, quickstart
5. **plugins.html** — Plugin model explanation with flow diagram
6. **docs.html** — Guide cards linking to external VitePress docs
7. **hub.html** — Hub explanation with animated portal diagram
8. **about.html** — Philosophy, license, FAQ accordion, contact

## Accessibility

- Skip link to main content
- Semantic landmarks (header, main, footer, nav, section)
- ARIA labels on icon-only elements
- Focus-visible styles with neon cyan outline
- prefers-reduced-motion support
- Minimum 44px touch targets

## Responsive Breakpoints

- Mobile-first approach
- Breakpoint at 768px for navigation toggle
- Fluid typography with clamp()
- Horizontal scroll prevention (320px minimum)

## Gotchas & Notes

1. **Fonts:** Poppins and Inter Light are specified but may not be available in all environments. Fallbacks to system fonts are provided in base.css.

2. **Self-hosted assets:** No external CDN for fonts or scripts. All fonts use local fallbacks. JS is inline-free (no framework dependencies).

3. **Circular motifs:** The portal ring in the header is purely CSS/SVG - no JavaScript required for rotation animation.

4. **Glassmorphism:** Uses backdrop-filter which has limited support in older browsers. Progressive enhancement - content remains accessible without the effect.

5. **Hub diagram:** The animated portal visual uses CSS animations and is accessible (aria-hidden due to decorative nature).

6. **Theme consistency:** All colors come from CSS custom properties defined in base.css. No inline color values should be added.

## File Structure

```
variants/04-portal-hub-1/
├── index.html
├── features.html
├── clients.html
├── download.html
├── plugins.html
├── docs.html
├── hub.html
├── about.html
├── css/
│   ├── base.css        # Reset, tokens, typography
│   ├── theme.css       # Layout, components, pages
│   └── components.css  # Reusable component patterns
├── js/
│   └── main.js         # Mobile menu, smooth scroll, FAQ accordion
└── img/
    ├── logo.svg        # Portal ring logo
    ├── og.svg          # Open Graph image
    ├── favicon.svg     # Browser tab icon
    └── PROMPTS.md      # Asset documentation
```

## Brand Compliance

- [x] Uses neon sparingly for key elements only
- [x] Layouts are clean with maximum clarity
- [x] Circular motifs throughout (portal rings)
- [x] No warm colors
- [x] No serif fonts
- [x] No clutter
- [x] No excessive neon
