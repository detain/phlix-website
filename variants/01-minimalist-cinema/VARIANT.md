# Variant: 01-minimalist-cinema

## Concept

**Minimalist Cinema Icon (Film-Strip X)** — A clean, modern streaming-platform aesthetic with high contrast, generous negative space, and electric blue accents. The X symbol doubles as a film-strip and play-button motif.

## Distinctive Elements

### Design Language
- **Typography**: Montserrat ExtraBold for headlines, Inter Regular for body, Roboto Medium for UI, JetBrains Mono for code
- **Colors**: Electric Blue (#2D9CFF) primary, Charcoal (#1A1A1A) text, White (#FFFFFF) background, Neon Aqua (#00F0FF) accent
- **Spatial System**: Wide margins, generous padding, lots of negative space
- **UI Style**: High contrast, rounded buttons with subtle shadows, blue underlines on hover

### Logo Concept
The "X" in Phlix is stylized as a film-strip cross:
- Two diagonal bars forming the X shape
- Circular sprocket holes on each diagonal
- A play-button triangle formed by negative space in the center
- Flat design, no gradients, high contrast

### Navigation
- Sticky header with blue underline animation on hover
- Mobile hamburger menu with slide-in drawer and focus trap
- All navigation items have proper ARIA attributes

### Key Pages
- **Home**: Hero with tagline, pitch bullets, feature cards overview, CTA banner
- **Features**: Detailed feature list with icons, page-header styling
- **Clients**: Client cards with status badges, highlights
- **Download**: Server install block, client download cards, ecosystem list
- **Plugins**: Plugin model explanation with code reference
- **Docs**: Documentation links grid
- **Hub**: Hub explanation with benefits
- **About**: Philosophy, license, contributing, FAQ accordion

## Design Decisions

1. **Blue on White**: Clean white background with electric blue accents
2. **Film-strip Motif**: Consistent X-as-film-strip pattern in logo and decorative elements
3. **High Contrast**: Charcoal text on white, blue accents only where meaningful
4. **Rounded Everything**: Buttons, cards, badges all use generous border-radius
5. **Spacing**: Wide margins and padding create breathing room

## Technical Implementation

- Pure HTML/CSS/JS — no frameworks, no bundlers
- Self-hosted fonts (with Google Fonts CDN fallback for development)
- CSS custom properties for all brand tokens
- Mobile-first responsive design (320px → 1920px)
- Touch targets minimum 44px
- Skip link, focus-visible styles, prefers-reduced-motion support
- Semantic HTML with proper landmarks (header, main, footer, nav)

## Gotchas

- Font files need to be self-hosted in `fonts/` directory for production
- OG image is SVG placeholder — replace with optimized PNG/WebP for production
- FAQ accordion uses JavaScript for accessibility (keyboard support)
- Mobile nav focus trap implemented but may need refinement for complex layouts

## Brand Kit Compliance

All colors, fonts, and voice tokens come exclusively from `shared/data/brand-kits.json`:
- ✅ Primary: Electric Blue, Charcoal, White
- ✅ Secondary: Slate Gray, Soft Blue
- ✅ Accent: Neon Aqua
- ✅ Fonts: Montserrat ExtraBold, Inter Regular, Roboto Medium, JetBrains Mono
- ✅ Voice: Direct, Clear, Helpful, Slightly playful but professional
- ✅ UI Style: High contrast, lots of negative space, blue accents, rounded buttons, subtle shadows
- ✅ Do: Keep spacing wide, use blue sparingly, X symbol consistent
- ✅ Don't: Gradients on wordmark, serif fonts, overcrowded layout
