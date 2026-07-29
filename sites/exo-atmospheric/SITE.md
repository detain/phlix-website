# SITE.md — Exo-Atmospheric

## Concept & Vision

Exo-Atmospheric is the view beyond Earth's veil — a cosmic observatory perched at the edge of the breathable world. The site feels like a spacecraft window into infinite space: deep void blacks, stellar whites, aurora green CTAs, and nebula violet accents. Every screen is a viewport to forever. The experience is contemplative, vast, and humbling — the sage who has looked upward and understood our place in the cosmos.

---

## Aesthetic Direction

**Theme:** Deep space / cosmic observatory. Inspired by NASA deep field imagery, aurora borealis, ISS viewport photography, and the Voyager 1 Pale Blue Dot perspective.

**Art direction:** Deep void black background with layered parallax star fields. Nebula wisps in violet and magenta curl through compositions. Orbit paths arc as golden threads. Aurora borealis waves ripple in emerald green and cyan at panel edges. Subjects float weightless in the void — nothing touches the edges, silence breathes.

**Reference:** "Spacecraft window meeting planetarium dome" — immersive, contemplative, infinite.

---

## Color Table

| Role | Name | Hex |
|------|------|-----|
| Primary | Aurora Green | `#00D9A5` |
| Secondary | Nebula Violet | `#7B2D8E` |
| Tertiary | Corona Orange | `#E85D04` |
| Background | Void Black | `#000428` |
| Surface | Deep Space | `#001B3A` |
| Surface Alt | Oort Cloud | `#002855` |
| Text | Stellar White | `#FFFFFF` |
| Neutral | Space Grey | `#52616B` |
| Border | Starline | `#C9D6DF` |
| Focus | Aurora Cyan | `#00D9FF` |
| Success | Nebula Teal | `#00B894` |
| Warning | Solar Flare | `#FDCB6E` |
| Error | Mars Red | `#E74C3C` |
| Info | Cosmic Blue | `#004E92` |

### Color rules (from kit)
- Never use warm terrestrial colors — no browns, tans, creams.
- Backgrounds always void black or deep space variants.
- Aurora green is primary accent — reserved for CTAs and key highlights.
- Nebula violet provides secondary cosmic accent.
- Keep contrast high — stellar white on void black for legibility.
- Shadows are void-tinted, not pure black.
- No more than 3 accent colors in a single view.

---

## Typography

| Role | Family | Weights | Notes |
|------|--------|---------|-------|
| Headline | Orbitron | 400, 700, 900 | Geometric, space-age precision. Letter-spacing 0.08em. |
| Display | Orbitron | 400, 700 | Oversized display text. Line-height 0.95. |
| Body | Exo 2 | 300, 400 | Clean, readable, slightly futuristic. Line-height 1.7. |
| UI | Rajdhani | 400, 500, 600, 700 | Mission-control feel. Letter-spacing 0.05em. |
| Mono | Share Tech Mono | 400 | Code and technical readouts. |

All fonts are self-hosted WOFF2 from `shared/assets/fonts/`. No Google Fonts CDN.

---

## Spatial System

Spacing scale (4px base):
- `4px` `--space-1`
- `8px` `--space-2`
- `12px` `--space-3`
- `16px` `--space-4`
- `24px` `--space-6`
- `32px` `--space-8`
- `48px` `--space-12`
- `64px` `--space-16`
- `96px` `--space-24`

Corner radius: 4px (sm), 8px (md), 16px (lg), 24px (xl), 999px (pill).

---

## Motion Philosophy

**Style:** Floaty, slow, ethereal, purposeful.

**Speed:** Slow — animations feel weightless, not rushed.

**Easing:** `ease-in-out` and `cubic-bezier(0.25, 0.1, 0.25, 1)`.

**Key animations:**
- Starfield parallax: CSS-animated star layers drift at 120s/180s — respects reduced motion.
- Aurora wave: subtle gradient pulse on section edges, 8s ease-in-out cycle — respects reduced motion.
- Scroll reveal: IntersectionObserver fade-ins on cards and features.
- Nav hover: 2px float upward with aurora glow intensification.
- Focus: Aurora cyan ring with soft outer glow.

**Reduced motion:** Stars become static, aurora waves slow to gentle glow, all transitions instant.

---

## Visual Assets

| Asset | Description |
|-------|-------------|
| `img/logo.svg` | Orbit arc + planet mark + "Phlix" wordmark in Orbitron |
| `img/favicon.svg` | Square deep-space mark with orbit arc and planet |
| `img/og.png` | 1200×630 social share: void black bg, orbit arc, aurora green wordmark, tagline |
| CSS starfield | Layered radial-gradient stars, CSS-animated drift |
| CSS aurora wave | Gradient overlay on hero and section edges |
| Feature icons | Single-color stroke SVG, 1.5px weight, geometric/minimal |

---

## Layout Archetype

Full-bleed parallax hero → features with nebula wisps → social proof → CTA. Floating card grid on void-black. Spacious, contemplative, precise.

Max content width: 1400px. Mobile-first fluid widths.
