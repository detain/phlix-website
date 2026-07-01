# Neon Noir — Phlix Brand-Kit Site

## Concept & Vision

Neon Noir is the electric romance of rain-soaked city streets at 2 a.m. — deep shadows cut by razor-thin neon light, the hum of a detective's typewriter beneath the glow of a pink marquee. This site dresses Phlix in that identity: a cinematic, atmospheric marketing presence that feels like stepping into a neo-noir thriller.

The kit fuses 1940s film noir aesthetics with modern neon city energy. Every page is a scene — taut, cinematic, unforgettable. Darkness is canvas, not absence.

---

## Aesthetic Direction

**Visual style:** Neo-noir cinematic, high contrast dark, neon glow halation, hard shadow expressionism, art deco geometry.

**Mood:** Mysterious, sophisticated, bold, atmospheric, intriguing — never warm, cozy, or playful.

**Reference:** Blade Runner, Drive, Sin City, 1940s detective pulp covers, Art Deco architecture at night, neon-lit Tokyo back alleys.

---

## Color Palette

| Role | Name | Hex | Usage |
|------|------|-----|-------|
| `--color-primary` | Neon Amber | `#F5A623` | Primary CTAs, active states, most important glow accent |
| `--color-secondary` | Electric Cyan | `#00E5FF` | Secondary actions, links, highlights, neon details |
| `--color-tertiary` | Neon Magenta | `#FF2D78` | Badges, ratings, emphasis accents |
| `--color-bg` | Void Black | `#0A0C10` | Default page background — never pure black |
| `--color-surface` | Deep Navy | `#111827` | Card and panel surfaces |
| `--color-surface-alt` | Charcoal Slate | `#1C2333` | Alternate surfaces, hover states |
| `--color-text` | Ghost White | `#E8EDF5` | Primary body and headline text |
| `--color-neutral` | Steel Mist | `#7A8FA6` | Muted UI chrome, dividers, secondary text |
| `--color-success` | Cyan Spark | `#00C9A7` | Success toasts, confirmations |
| `--color-warning` | Flicker Amber | `#FFB300` | Warnings, caution states |
| `--color-error` | Danger Magenta | `#E5154E` | Errors, destructive actions |
| `--color-info` | Cold Blue | `#29ABE2` | Informational banners |
| `--color-border` | Dim Steel | `#2A3650` | Card borders, dividers |

**Gradients:**
- **Neon Horizon:** `linear-gradient(160deg, #FF2D78, #00E5FF)` — hero backdrops
- **Amber Interrogation:** `radial-gradient(rgba(245,166,35,0.35), rgba(10,12,16,0))` — single overhead light
- **City Depth:** `linear-gradient(180deg, #111827, #0A0C10)` — surface-to-background fade

---

## Typography

| Role | Font | Weight | Usage |
|------|------|--------|-------|
| `--font-headline` | Playfair Display | 700, 900 | Dramatic page titles, hero headlines |
| `--font-display` | Bebas Neue | 400 | Oversized cinematic numerals, splash titles |
| `--font-body` | IBM Plex Serif | 400, 500 | Descriptions, synopses, long-form reading |
| `--font-ui` | IBM Plex Sans | 400, 500, 600 | Buttons, labels, navigation, chips |
| `--font-mono` | IBM Plex Mono | 400, 600 | Code, tokens, technical readouts, typewriter effects |

**Rules applied:**
- Headlines: Playfair Display bold (700+), tight tracking (-0.02em)
- Bebas Neue: always uppercase
- Body copy: IBM Plex Serif, left-aligned, never all-caps
- Monospace: typewriter/code moments only

---

## Spatial System

**Spacing scale:** `4, 8, 12, 16, 24, 32, 48, 64, 96` px

**Content width:** max 1400px, centered

**Corner radius:** sharp — 2px (sm), 4px (md), 8px (lg), 12px (xl), 999px (pill)

**Borders:** 1px solid, sharp corners — never rounded unless specified

---

## Motion Philosophy

**Speed:** Slow and deliberate (300–500ms transitions)

**Easing:** `ease-in-out`, `cubic-bezier(0.4, 0, 0.2, 1)`, `steps(8, end)` — no spring, bounce, or elastic

**Signature effects:**
- **Header motif:** Slow-scan neon flicker animation on the hero wordmark
- **Card hover:** 1px neon-cyan border glow + 3px lift + cyan box-shadow (200ms ease-out)
- **Focus:** 2px electric-cyan ring + 4px cyan outer glow
- **Loading:** Horizontal neon scan-line sweep (left to right)
- **Reduced motion:** All animations replaced with simple fades or disabled

**Principles:** Motion should feel like a camera move — purposeful, weighted, never frivolous.

---

## Signature Elements

1. **Venetian-blind shadow bars** — horizontal rule dividers with repeating gradient
2. **Neon sign halos** — `box-shadow` glow on cards and key UI
3. **Hard-edged silhouettes** — against neon backgrounds
4. **Film grain texture** — CSS noise filter on backgrounds
5. **Art deco geometric grid lines** — panel dividers
6. **Neon flicker** — animated accent bars, loading states

---

## Visual Assets

- **Logo:** Playfair Display italic "Phlix" wordmark on void-black, 1px cyan border, animated amber accent bar
- **Favicon:** 32×32 void-black square, amber border, ghost-white "P" letterform
- **OG image:** 1200×630 city silhouette at night, neon window lights, "Phlix" headline with cyan glow, neon horizon gradient
- **Icons:** 7 inline SVG feature icons — 1.5px stroke, sharp corners, ghost-white, cyan hover state
- **Mascot:** Lux (neon sign letter X silhouette) — referenced in kit but not prominently featured on marketing site

---

## Layout Archetype

**Immersive** — dark, cinematic, full-bleed hero sections with dramatic typography, generous negative space (darkness as structural element), asymmetric compositions.

The hero is a full-viewport dark scene with neon glow effects. Content sections alternate void-black and deep-navy. The CTA banner uses an amber radial glow. Every section has at least one neon accent element.

---

## Responsive Strategy

| Breakpoint | Behavior |
|------------|----------|
| Desktop (1024+) | Multi-column poster grids, hover glow affordances, max 1400px content |
| Tablet (768–1024) | 2–3 column grids, 48px min touch targets, collapsible sidebar |
| Mobile (<768) | Single column, bottom nav, full-width cards, press animations instead of hover |
| TV (10-foot) | 2× Bebas Neue scale, 4px neon-amber focus ring |

---

## Accessibility Commitments

- WCAG 2.2 AA minimum: 4.5:1 body text, 3:1 UI/icons
- Ghost-white on void-black = 17.5:1 contrast
- Neon amber on void-black = 7.2:1 contrast
- 2px cyan focus ring with 2px void-black offset + 4px cyan outer glow
- Minimum 44×44px touch targets on mobile/TV
- `prefers-reduced-motion` honored — all animations respect this
- 200% browser text zoom supported without clipping

---

## Do / Don't Checklist

**Colors:**
- ✓ Use void-black or deep-navy backgrounds
- ✓ Apply neon amber exclusively to primary CTA
- ✓ Crush blacks to near-void for depth
- ✗ Never use warm, cream, or light backgrounds
- ✗ Never scatter multiple neon colors indiscriminately
- ✗ Never use neon amber for secondary/tertiary elements

**Typography:**
- ✓ Playfair Display bold for hero headlines
- ✓ IBM Plex Serif for editorial body copy
- ✓ Bebas Neue uppercase only
- ✗ Never use light weight for headlines
- ✗ Never center long body copy blocks

**Layout:**
- ✓ Deep negative space — darkness is structural
- ✓ Sharp geometric grids
- ✓ Asymmetric compositions with clear focal points
- ✗ Never exceed 1400px content width

**Animation:**
- ✓ Slow, deliberate transitions (300–500ms)
- ✓ Cinematic easing
- ✗ Never spring, bounce, or elastic easing

**Imagery:**
- ✓ Night city photography with neon color grades
- ✓ Rain, reflections, silhouettes, hard shadows
- ✗ Never daylight, warm-toned, or golden-hour photography
