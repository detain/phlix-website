# Arctic Passage — Site Design Documentation

## Concept & Vision

**Arctic Passage** evokes the experience of navigating through frozen waterways — a journey through ice passages, guided by the northern lights. The site feels cold, vast, and serene, with a sense of silent, crystalline depth. The aesthetic draws from polar expedition imagery, glacier textures, and aurora borealis phenomena. Every element should feel as if it emerged from ice and starlight — clean, luminous, and untouched.

## Aesthetic Direction

The Arctic Passage brand kit uses the visual language of polar silence: deep arctic night blues, glacial ice surfaces, and the rare, beautiful glow of aurora borealis. Typography is sharp and crystalline. Animations are slow and deliberate, like light shifting through ice.

**Mood keywords:** expansive, crystalline, serene, luminous, cold precision

## Color Palette

| Role | Name | Hex | Usage |
|------|------|-----|-------|
| Primary | Deep Arctic Night | `#0A1A2A` | Backgrounds, headers |
| Secondary | Glacier Blue | `#1E3A5F` | Cards, sections |
| Accent | Aurora Cyan | `#5DADE2` | CTAs, highlights, links |
| Surface | Ice Blue | `#A8D8EA` | Text accents, borders |
| White | Polar White | `#FFFFFF` | Primary text |

**Functional color mappings:**
- Background: `--color-primary` → `#0A1A2A`
- Text: `--color-white` → `#FFFFFF`
- Text muted: `--color-surface` → `#A8D8EA`
- Accent/CTA: `--color-accent` → `#5DADE2`
- Card backgrounds: `--color-secondary` with gradients

## Typography

**Display/Headings:** Cinzel (serif, classical, sharp serifs that read as ice-crystal edges)

**Body:** Quicksand (geometric sans, friendly but distinctive, legible at all sizes)

**Mono/Code:** IBM Plex Mono (technical elements, installation commands)

**Font scale:**
- Display: Cinzel, 4.5rem/72px, 400 weight
- H1: Cinzel, 3.5rem/56px
- H2: Cinzel, 2.5rem/40px
- H3: Cinzel, 1.5rem/24px
- Body: Quicksand, 1rem/16px, line-height 1.6-1.8
- UI labels: Quicksand, 0.875rem/14px, 500 weight
- Code: IBM Plex Mono, 0.875rem/14px

## Spatial System

**Spacing scale (in `rem`):**
- xs: 0.25rem / 4px
- sm: 0.5rem / 8px
- md: 1rem / 16px
- lg: 1.5rem / 24px
- xl: 2rem / 32px
- 2xl: 3rem / 48px
- 3xl: 4rem / 64px
- 4xl: 6rem / 96px

**Layout:** Max content width 1400px, centered, with responsive 16px-24px gutters.

**Border radius:** 4px (sm), 8px (md), 16px (lg), 24px (xl), 9999px (full/pills)

## Motion Philosophy

Motion in Arctic Passage suggests the slow, deliberate movement of light through ice:

- **Aurora shimmer:** Subtle gradient animation on the hero headline (8s cycle, gentle color shift)
- **Aurora wave:** Background layer with slow elliptical drift (20s cycle)
- **Glacial reveal:** Scroll-triggered fade-up on cards with staggered delays (50ms between items)
- **Hover lifts:** Cards rise 4px with a glow shadow on hover (spring easing)
- **Reduced motion:** All animations collapse to instant transitions under `prefers-reduced-motion`

**Key timing values:**
- Fast: 150ms (micro-interactions)
- Base: 250ms (state changes)
- Slow: 400ms (reveals)
- Spring: 300ms cubic-bezier(0.34, 1.56, 0.64, 1) (hover lifts)

## Visual Assets

**Logo:** An ice crystal (8-pointed snowflake/star) combined with the "PHLIX" wordmark. Aurora gradient on the crystal, clean white text.

**Favicon:** Ice crystal in aurora cyan (#5DADE2) on deep arctic night (#0A1A2A) background.

**Icons:** Single-color stroke-based inline SVGs. Stroke width 1.5. Each feature has a unique icon (library, syncplay, transcode, shield, antenna, broadcast, puzzle, hub).

**Background effects:**
1. Radial gradient aurora at hero (subtle, 8-15% opacity)
2. SVG noise texture overlay at 3% opacity for glacial grain
3. Northern lights wave animation in hero section

**Social/OG image:** 1200×630. Deep arctic night background with aurora gradient, centered wordmark "PHLIX", tagline "Your media. Your library. Your Phlix." in white.

## Component Inventory

### Header/Navigation
- Sticky positioning with backdrop blur (12px)
- Semi-transparent background: rgba(10, 26, 42, 0.85)
- Logo: inline SVG, 120×40px
- Nav links: Quicksand 14px, uppercase tracking, hover underline animation
- Mobile: hamburger toggle, slide-in menu

### Hero
- Full viewport height minus header
- Centered content with max-width 900px
- Gradient text on h1 (white → ice blue → aurora cyan)
- Aurora shimmer animation on headline
- Two CTAs: primary (aurora cyan) and secondary (ghost/outline)

### Feature Cards
- Background: linear gradient from glacier blue to deep arctic
- Border: 1px solid rgba(168, 216, 234, 0.2)
- 48×48 icon (stroke SVG)
- Title: Cinzel 18px
- Body: Quicksand 14px, muted ice blue
- Hover: translateY(-4px), glow shadow

### Client Cards
- Similar structure to feature cards
- Header row with badge (stable=cyan, beta=ice blue)
- Highlights list with diamond markers
- "View source" button with GitHub icon

### Download Cards
- Centered layout
- Badge below tagline
- "View source" or "No download needed" text

### CTA Banner
- Full-width section with radial aurora glow
- Centered h2 + muted text + primary CTA button

### FAQ (About page)
- `<details>/<summary>` elements with + rotation on open
- Smooth border accent when open
- Padding on answer

### Code Blocks
- Background: rgba(10, 26, 42, 0.9)
- Border: 1px solid rgba(168, 216, 234, 0.2)
- 16px padding, 8px radius
- IBM Plex Mono, ice blue (#A8D8EA)

### Footer
- 3-column grid (Product, Developers, Project)
- Footer tagline: Cinzel, centered, ice blue
- Copyright: tiny, muted, centered

## Technical Notes

- CSS custom properties for all design tokens
- Three CSS files: base (reset + tokens), theme (typography + layout), components (UI components)
- Self-hosted fonts from `../../../shared/assets/fonts/`
- No external CDN dependencies
- Vanilla JavaScript with no dependencies
- Mobile-first responsive breakpoints: 320, 375, 414, 768, 1024, 1280, 1920
- Accessibility: WCAG 2.2 AA contrast (4.5:1 body, 3:1 large text)
- All grid tracks use `minmax(0, 1fr)` to prevent overflow
- `overflow-wrap: anywhere` on body text for narrow columns
