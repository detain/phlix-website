# Autumn Harvest — Phlix Site

## Concept & Vision

Autumn Harvest is the warmth of an October afternoon carried indoors — burnt orange, maple red, harvest gold, and the deep quiet of a bark-brown hearth. Every screen should feel like the first evening you light a fire for the season. The site is cozy, unhurried, and completely at ease — like the best kind of October afternoon that stretches longer than it has any right to.

## Brand Identity

- **Kit:** Autumn Harvest v1.0
- **Archetype:** Caregiver — warm, generous, inviting, grounded
- **Tagline:** "Settle In. The Season Is Perfect."
- **Personality:** Grounding, Generous, Warm, Nostalgic, Unhurried, Abundant

## Color Palette

| Role | Name | Hex | Usage |
|------|------|-----|-------|
| `--color-primary` | Maple Red | `#B5321A` | Primary CTAs, active states |
| `--color-secondary` | Burnt Orange | `#D4601A` | Secondary actions, highlights |
| `--color-tertiary` | Harvest Gold | `#C8901A` | Badges, ratings, warm accents |
| `--color-accent` | Forest Green | `#2D5016` | Sparingly used evergreen contrast |
| `--color-bg` | Harvest Cream | `#F7EDD8` | Page background — always warm |
| `--color-surface` | Warm Parchment | `#FAF2E2` | Card and panel surfaces |
| `--color-surface-alt` | Linen Bisque | `#EDE0C4` | Alternate surfaces, striped rows |
| `--color-text` | Hearthstone | `#1E140A` | Body and headline text |
| `--color-border` | Walnut Line | `#3D2510` | Card borders, dividers |
| `--color-success` | Sage Meadow | `#7DAF6A` | Success states |
| `--color-warning` | Amber Lantern | `#D4860A` | Warnings |
| `--color-error` | Ember Red | `#9B2215` | Errors, destructive actions |
| `--color-focus` | Cider Glow | `#D4601A` | Focus rings (burnt orange) |

## Typography

| Role | Family | Fallbacks | Usage |
|------|--------|-----------|-------|
| Headline | Playfair Display 700 | Georgia, Palatino, serif | Hero headlines, section titles |
| Display | Playfair Display 900 | Georgia, serif | Oversized decorative titles |
| Body | Lora 400/500 | Georgia, Times New Roman, serif | Paragraphs, long-form reading |
| UI | Nunito 400/600/700 | Open Sans, system-ui, sans-serif | Buttons, labels, navigation |
| Mono | Inconsolata 400/700 | Courier New, monospace | Code, tokens, timestamps |

Typography rules enforced:
- Playfair Display carries authority — never below 18px for UI copy
- Body text in Lora only
- No ALL CAPS on body text or descriptions
- Body line-length 60–72 characters

## Spatial System

Spacing scale (8-point):
`4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96` px

Corner radius scale:
`4px (sm) · 10px (md) · 18px (lg) · 28px (xl) · 999px (pill)`

## Motion Philosophy

- Speed: **slow** — nothing should feel rushed
- Easing: ease-out, ease-in-out, `cubic-bezier(0.22, 0.68, 0, 1.2)` (soft spring)
- Leaf-drift animation in hero (CSS/SVG, no GIF)
- Cards lift 3px on hover with warm hearth-shadow
- All animations respect `prefers-reduced-motion`

## Visual Assets

- **Logo:** Playfair Display wordmark + maple leaf flourish, maple red on harvest cream
- **Favicon:** Square mark with 5-lobed maple leaf on harvest cream
- **OG image:** Orchard-dusk gradient, harvest cream surfaces, maple-red CTA pill
- **Feature icons:** Outlined SVG, botanical subject, 1.5–2px warm walnut stroke, rounded joins
- **Mascot:** Mabel — anthropomorphic maple leaf with cream sweater and plaid scarf
- **Header motif:** Drifting maple leaf fall animation (amber, crimson, gold)

## Layout Archetype

**Immersive** — full-bleed orchard-dusk hero (cinematic gradient backdrop), generous negative space, warm parchment/linen surface alternation, leaf motifs throughout, plaid-rule dividers.

## Pages

| Page | Purpose |
|------|---------|
| `index.html` | Home — hero, pitch, feature overview, CTA |
| `features.html` | Feature deep-dives (8 features) |
| `clients.html` | Client apps (5 clients with status badges) |
| `download.html` | Server + client download cards, ecosystem list |
| `plugins.html` | Plugin model explanation |
| `docs.html` | Link-out to external docs + ecosystem list |
| `hub.html` | Phlix Hub explanation |
| `about.html` | Philosophy, license, contributing, FAQ |

## Accessibility

- WCAG 2.2 AA baseline
- Focus: 2px burnt-orange ring with 2px harvest-cream offset
- Touch targets: minimum 44×44px
- `prefers-reduced-motion` honored throughout
- Layout survives 200% text zoom
- Never rely on color alone for status
