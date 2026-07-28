# SITE.md — Mid-Century Modern

## Concept

Mid-Century Modern for Phlix translates 1950s–60s atomic age optimism into a media server marketing site. The guiding metaphor is **the golden confidence of the Space Age** — Eames chairs, Sputnik chandeliers, Saul Bass title sequences, drive-in theater marquees. Every surface feels like walnut veneer under warm interior light; every interaction feels like pressing a Bakelite switch on a perfectly proportioned control panel.

The experience archetype is **narrative-scroll**: five carefully paced chapters on the home page, each arriving like a new scene in a geometric story. The visitor scrolls through a sunburst hero, two feature showcases, a brand manifesto, a proof-of-concept compass, and a launch-sequence CTA — a complete narrative arc from curiosity to "engage ignition."

## Palette

| Token | Hex | Name | Usage |
|-------|-----|------|-------|
| `--color-bg` | `#111008` | Charcoal Evening | Default page background |
| `--color-surface` | `#1A1710` | Ebony Wood | Cards, panels |
| `--color-surface-alt` | `#231F16` | Dark Walnut | Alternate surfaces |
| `--color-text` | `#F5EFE8` | Cream Card | Primary text |
| `--color-primary` | `#00AFAF` | Atomic Teal | Primary brand anchor, CTAs, active states |
| `--color-secondary` | `#F2B705` | Sunburst Yellow | Primary CTA, highlights |
| `--color-tertiary` | `#E8543C` | Atomic Coral | Badges, accent only |
| `--color-neutral` | `#8C7B6A` | Tan Linen | Secondary text, muted labels |
| `--color-border` | `#2E2A1E` | Warm Dim | Card borders, dividers |

All colors pass WCAG AA (measured). Warm dark surfaces never use cold-toned text — every text/bg combination uses cream on dark or the teal/yellow on charcoal-evening.

## Typography

| Role | Family | Weights |
|------|--------|---------|
| Headline | Josefin Sans | 600, 700 |
| Display/number | Bebas Neue | 400 |
| Body | Libre Baskerville | 400, 700 |
| UI | Josefin Sans | 400, 500, 600 |
| Mono | IBM Plex Mono | 400, 600 |

`<strong>` uses `font-weight: 700` (Libre Baskerville 700, the step the kit declares for emphasis).

Josefin Sans uses `letter-spacing: 0.04em` for headlines, `0.05em` for UI labels, always uppercase for UI items (nav, badges, buttons). Libre Baskerville body copy is never set in all-caps.

## Motion

- Scroll reveals: `.reveal` elements fade + translate-Y on IntersectionObserver threshold 0.12
- All animations disabled under `prefers-reduced-motion`
- Mascot Orbit bobs gently on a 3-second loop
- FAQ accordion rotates icon 180° with `cubic-bezier(0.4,0,0.2,1)` ease
- Hover states: cards lift 2px + gain teal glow; primary buttons compress 2% on press

## Key Design Elements

- **Sunburst motif**: Radial gradient glows behind the hero rocket and at the top of card sections
- **Boomerang accent bars**: 2–3px colored rule lines anchored to section openings
- **Orbit mascot**: Friendly cartoon rocket in atomic teal/sunburst yellow, appears on Home, Download, and About. Bob idle animation disabled under reduced-motion. Dismissed state persisted via localStorage.
- **Sunburst radial glow on hero section**: `radial-gradient(circle, rgba(0,175,175,0.15) 0%, transparent 65%)`
- **Proof compass card**: Compass rose SVG decoration, capability list, real GitHub links

## Homepage Sections (narrative-scroll)

1. `#sunburst-rise` — Full-bleed hero with Orbit rocket illustration, copy_overlay headline, two CTAs, 3 pitch bullets
2. `#what-flies` — Two feature cards for library + SyncPlay, atomic teal sunburst corner accents
3. `#why-launch` — Brand story as manifesto scroll with 3 capability stats
4. `#compass-true` — Proof strategy: capability compass + GitHub links + quote-from-docs card
5. `#ignition` — 3-step CTA ladder (launch sequence metaphor)

## Easter Eggs

- **logo-clicks:5** — Orbit flies across the screen (translateX + translateY animation)
- **typed-word:orbit** — Any h1/h2 briefly glows teal
- **scroll-past-footer** — Small rocket silhouette exits the bottom of the viewport

Key listener disabled in input/textarea/contenteditable, never calls `preventDefault`, exits on Esc.

## Mascot Placement

Orbit appears on Home, Download, and About — never on Docs/Plugins (reading pages). At 320px the mascot does not overlap the primary CTA.

## Accessibility

- All WCAG AA contrast ratios measured and satisfied
- Focus rings: 2px atomic-teal with 2px charcoal offset
- Touch targets: 44×44px minimum
- `prefers-reduced-motion` respected throughout
- Semantic HTML: `<nav>`, `<main>`, `<header>`, `<footer>`, `<article>`, `<section>` with aria-labels
- Keyboard navigation for FAQ accordion and mobile nav

## Install Command

**Source of truth:** `shared/content.json` → `install.primary.command`

```
curl -fsSL https://raw.githubusercontent.com/detain/phlix-server/master/scripts/install.sh | sudo bash
```

Never retyped or invented.
