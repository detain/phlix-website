# SITE.md — Midnight Jazz for Phlix

## Concept & Vision

Midnight Jazz is a late-night jazz club translated into a media interface. It is dark, warm in the right places, and never loud — deep navy and charcoal hold the stage, amber spotlights illuminate what matters, cool blue-gray recedes into shadow. Every session is a private late-night set; every title card is a record sleeve; every play is the needle finding its groove.

## Aesthetic Direction

The visual identity draws from 1950s–60s Blue Note Records album covers — stark geometric compositions on near-black backgrounds, a single amber or warm-gold spotlight illuminating a subject, cool blue-gray shadows filling the void. Typography is large, condensed, and authoritative like club marquee lettering. Grain is always present — fine and filmic. The mood is soulful, sophisticated, intimate, and timeless.

## Color Palette

| Role | Name | Hex | Usage |
|------|------|-----|-------|
| `--color-primary` | Amber Spotlight | `#E8961F` | CTAs, focal points, active states |
| `--color-secondary` | Cool Slate | `#7A9BB5` | Secondary actions, links, hover states |
| `--color-tertiary` | Muted Brass | `#C4A45A` | Badges, decorative accents |
| `--color-neutral` | Blue-Gray Smoke | `#4A5A6B` | Muted UI chrome, dividers |
| `--color-bg` | Midnight Navy | `#0D1117` | Page backgrounds |
| `--color-surface` | Stage Charcoal | `#1A2230` | Cards, panels |
| `--color-surface-alt` | Deep Indigo | `#222E42` | Hover rows, nested panels |
| `--color-text` | Linen White | `#EDE8DF` | Primary text |
| `--color-border` | Slate Hairline | `#2E3D52` | Borders, dividers |
| `--color-success` | Verdant Green | `#4CAF82` | Success states |
| `--color-warning` | Burnt Ochre | `#D4832A` | Warnings |
| `--color-error` | Crimson Mute | `#B03A3A` | Errors |
| `--color-focus` | Amber Focus Ring | `#E8961F` | Focus indicators |
| Gradient | Spotlight Fall-Off | radial | Hero backgrounds |
| Gradient | Stage Curtain Fade | linear | Card-to-background fade |

## Typography

| Role | Family | Weights | Usage |
|------|--------|---------|-------|
| `--font-headline` | Barlow Condensed | 700, 800 | Headlines, marquee display |
| `--font-display` | Playfair Display | 700, 900 | Editorial pull-quotes |
| `--font-body` | Inter | 400, 500 | Paragraphs, long-form |
| `--font-ui` | Barlow | 400, 500, 600 | Buttons, labels, nav |
| `--font-mono` | JetBrains Mono | 400, 600 | Code, technical metadata |
| `--font-number` | Barlow Condensed | 700 | Stats, counters |

Key rules: Headlines always Barlow Condensed. Playfair Display italic is editorial only. Never use pure `#FFFFFF` text — always Linen White. Body line-height ≥ 1.6 on dark backgrounds.

## Spatial System

Spacing scale: `4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96` px only.

Max content width: `1400px`. Card padding: `24px`. Border radius scale: `3 / 6 / 12 / 20 / 999` px.

## Motion Philosophy

Slow, deliberate, cinematic. Transitions are 300–500ms cross-dissolves and fade-to-dark. The spotlight is the only warm motion — it pulses slowly (4–6s) to suggest a stage light warming up. All animation respects `prefers-reduced-motion`. No bouncy springs, no jitter, no strobes.

Hero motif: slow-drift smoke particle animation rising through an amber spotlight (disabled for reduced-motion users).

Micro-interactions: cards lift 1px with indigo shadow + faint amber border glow on hover; buttons press to 0.98 scale; focus ring fades in over 200ms.

## Visual Assets

- **Logo**: "PHLIX" wordmark (Barlow Condensed 800 all-caps) in Linen White, with an amber spotlight vinyl-circle glyph to the left and an amber underline rule. No box.
- **Favicon**: Square mark — amber spotlight vinyl circle on Midnight Navy.
- **OG card**: Midnight Navy bg, radial amber spotlight glow, large "PHLIX" wordmark + tagline.
- **Icons**: 1.5px stroke outlined icons, Cool Slate default, Amber on active/selected.
- **Mascot (Miles)**: Stylized art-deco trumpet character. Used for empty states and onboarding — not built yet.
- **Signature elements**: Amber spotlight cones, vinyl record label circles, worn piano key dividers, score-line horizontal rules, upright bass/trumpet silhouettes.

## Layout Archetype

**Immersive** — the dark stage with spotlight focal points. Full-bleed hero with radial amber glow, generous negative space, score-line section dividers, sparse card grids. The darkness does the work; spotlight is precious and concentrated.

Landing pattern: Full-bleed dark hero with spotlight illustration → alternating dark/surface feature rows → amber CTA at the base.
