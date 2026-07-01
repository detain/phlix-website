# SITE.md — Bamboo Sanctuary for Phlix

## Concept & Vision

Bamboo Sanctuary is the flagship Phlix marketing site dressed in the stillness of a Japanese bamboo grove. Every surface breathes — filtered celadon light through tall culms, raked gravel patterns, moss-covered stone, and considered silence. The experience of visiting this site should feel like stepping into a Kyoto garden at first light: calm, unhurried, and deeply considered. The interface steps back so the content steps forward. Nothing competes for attention.

**Brand DNA (condensed):** Bamboo Sanctuary is the filtered green light of a Kyoto bamboo grove, brought to your screen. It is celadon, charcoal ink, bamboo warmth, and considered silence. It is never cluttered, never loud, never rushed.

---

## Aesthetic Direction

- **Style tags:** Ink wash painting (sumi-e), organic textures, layered translucency, muted natural palette, deliberate negative space
- **Art direction:** Artwork feels like a Japanese ink wash study: loose, confident brushstrokes in charcoal and diluted ink, set against soft warm-white (washi) or celadon washes. Grain is ever-present — like rice paper or weathered stone. Compositions are asymmetric in the Japanese tradition: heaviness on one side, open air on the other. Light arrives — it does not strike.
- **Realism level:** Semi-realistic
- **Depth:** Layered
- **Rendering:** Watercolor + paper grain texture + linocut + vector
- **Lighting:** Neutral temperature, diffuse filtered sunlight through bamboo canopy, soft shadows, low contrast

---

## Color Palette

| Token | Name | Hex | Usage |
|-------|------|-----|-------|
| `--color-primary` | Celadon Grove | `#8FAF9F` | Primary CTAs, active states, key emphasis |
| `--color-secondary` | Bamboo Tan | `#C5A97B` | Secondary actions, warm accents |
| `--color-tertiary` | Muted Sage | `#7A9E89` | Badges, labels, small status indicators |
| `--color-bg` | Washi White | `#F2EDE5` | Default page background |
| `--color-surface` | Morning Mist | `#F8F5F0` | Card and panel surfaces |
| `--color-surface-alt` | Gravel Path | `#E8E3DA` | Alternate surfaces, dividers, nested panels |
| `--color-text` | Charcoal Ink | `#2A2A25` | Primary body and headline text |
| `--color-neutral` | Stone Gray | `#8E8E85` | Muted UI chrome, secondary text, dividers |
| `--color-success` | New Leaf | `#9DC4A8` | Success states, confirmations |
| `--color-warning` | Amber Resin | `#C4924A` | Warnings and caution states |
| `--color-error` | Persimmon | `#B85C4A` | Errors and destructive actions |
| `--color-info` | Still Pond | `#6C9EB0` | Informational banners and tips |
| `--color-focus` | Celadon Focus Ring | `#8FAF9F` | Keyboard focus ring with washi offset |
| `--color-border` | Ink Wash | `#4A4A42` | Subtle dividers, card edges |
| `--color-shadow` | Bamboo Shadow | `rgba(42,42,37,0.12)` | Soft drop shadows |
| `--color-overlay` | Night Grove | `rgba(26,28,22,0.55)` | Modal and scrim overlays |

**Gradients:**
- `Filtered Canopy`: linear 170deg, #C9DDD3 → #F2EDE5 — hero backdrops
- `Morning Mist Veil`: radial, transparent → rgba(248,245,240,0.75) — soft glow behind hero subjects
- `Bamboo Cane`: linear 90deg, #C5A97B → #A8885A — accent bars and dividers

**Color rules applied:**
- Backgrounds always washi white or morning mist — never pure white, never dark
- Celadon Grove reserved for primary CTAs and focus states
- Max 2 accent colors per view
- Shadows cool-charcoal, never warm-tinted or blue
- Persimmon (error) appears only for genuine errors

---

## Typography

| Role | Font | Fallback | Weight | Tracking | Leading |
|------|------|----------|--------|---------|---------|
| Headline | Cormorant Garamond | Garamond, Georgia, serif | 300 | 0.05em | 1.1 |
| Display | Cormorant Garamond | Garamond, serif | 300 | 0.08em | 0.95 |
| Body | Lora | Georgia, Times New Roman, serif | 400, 500 | 0.01em | 1.75 |
| UI | DM Sans | system-ui, Helvetica Neue, sans-serif | 300, 400, 500 | 0.02em | 1.35 |
| Mono | JetBrains Mono | Fira Mono, Courier New, monospace | 300, 400 | 0em | 1.6 |
| Number | Cormorant Garamond | Garamond, serif | 300 | 0.04em | 1.0 |

**Typography rules applied:**
- Headlines always light-weight (300) — never bold
- Body copy uses Lora (serif); UI uses DM Sans (sans-serif) — never mixed at same level
- Body line-length 60–65 characters for comfortable reading
- Display text has generous tracking (0.06em+) to breathe like negative space
- No all-caps except small UI labels and badges

---

## Spatial System

**Spacing scale (px):** 4 · 8 · 16 · 24 · 32 · 48 · 72 · 96

**Corner radius:** sm=3px · md=6px · lg=12px · xl=20px · pill=999px

**Max content width:** 1280px | **Max site width:** 1400px | **Gutter:** clamp(24px, 4vw, 48px)

---

## Motion Philosophy

**Speed:** Slow (700ms major, 400ms component, 200ms micro)

**Easing:** `cubic-bezier(0.4, 0, 0.2, 1)`, `ease-in-out`

**Transitions:** Fade, gentle slide, soft scale-up

**Micro-interactions applied:**
- Cards: rise 1px, barely-there shadow and 1.005 scale over 200ms
- Button press: opacity 0.85 and 0.98 scale — like a stone pressed into gravel
- Focus: celadon focus ring fades in over 180ms with 2px washi-white offset
- Scroll reveal: fade-in-up, 400ms ease-in-out

**Reduced motion:** All animations replaced with simple fades per `prefers-reduced-motion`. No parallax.

---

## Visual Assets

- **Logo:** Cormorant Garamond Light wordmark + single bamboo stalk mark, charcoal ink on washi white. SVG. `img/logo.svg`
- **Favicon:** Celadon ring with center dot on washi white, zen stone/bamboo node aesthetic. SVG. `img/favicon.svg`
- **OG image:** Bamboo grove social card — raked gravel, bamboo silhouettes, centered Phlix wordmark + "Watch with intention." tagline. SVG. `img/og.svg`
- **Feature icons:** 8 hand-authored inline SVG icons (1.5px stroke, outlined, nature-inspired). No CDN icon fonts.
- **Hero backdrop:** Inline SVG bamboo grove with subtle sway animation (CSS). `index.html`
- **No mascot:** Kit's mascot (Sasa the bamboo sprig) not rendered as standalone asset.

---

## Seasonal Variants (documented, not auto-applied)

| Name | Active | Primary override | Motif |
|------|--------|-----------------|-------|
| First Snow | Dec 1 – Feb 28 | `#7A9FA8` primary | Bare bamboo with snow on joints |
| Plum Blossom | Mar 1 – Apr 15 | `#C49BAE` tertiary | Single plum branch with pale blossoms |
| Deep Summer | Jul 1 – Aug 31 | `#6FA08C` primary | Cicada cue; bamboo in deep midday shadow |
| Autumn Moon | Sep 15 – Nov 30 | `#C4904A` secondary | Full moon behind bamboo; falling leaves |

To activate a variant, add its CSS custom property overrides to `theme.css`.

---

## Design Principles Applied

1. Every screen breathes — negative space (ma) is as meaningful as content
2. Imperfection is intentional: subtle grain and irregular brush marks add life
3. Celadon and sage accent, never dominate; charcoal ink lines are the only structural color
4. Motion is slow and purposeful — like bamboo in a gentle wind
5. Let the content speak; the interface is the garden wall, not the garden
6. One focal point per view — resist the urge to fill
7. Touch is gentle: interactions feel like placing a stone, not clicking a machine

---

## Do / Don't Checklist

**Colors:** Washi white/morning mist backgrounds · Celadon for primary CTAs · Nature-derived muted hues · Max 2 accent colors per screen · ❌ Bright/saturated/neon colors, warm-orange or cool-blue shadows, persimmon used decoratively

**Typography:** Cormorant Garamond Light (300) for headlines · Lora for body, DM Sans for UI · Generous tracking on display text · ❌ Bold (700+) headlines, serif + sans mixed at same level, tight tracking on display

**Layout:** Generous whitespace as design element · Single focal point per view · Asymmetric arrangements · Max 1280px content width · ❌ Filling every pixel, exceeding content width, competing focal points

**Motion:** Slow (300ms+) with ease-in-out · Single-element transitions · Honor reduced-motion · ❌ Bounce/spring easing, simultaneous animations, abrupt transitions

**Imagery:** Desaturated cool-muted grade · Sumi-e ink wash style · Asymmetric compositions with negative space · ❌ Warm orange-teal Hollywood grading, cartoon/bright styles, tight crops

**Icons:** 1.5px thin outlined · Nature metaphors welcome · Charcoal default, celadon active · ❌ Filled/duotone, heavy stroke (3px+), unnecessary decorative detail

**Copywriting:** Short, precise sentences · Calm, considered, quietly confident · Nature metaphors used sparingly and genuinely · ❌ Urgency language, promotional superlatives, filler/marketing padding
