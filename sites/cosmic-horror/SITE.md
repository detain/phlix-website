# SITE.md — Cosmic Horror Brand Kit Site

## Concept & Vision

The Cosmic Horror brand kit transforms Phlix into something that has always been watching. The site does not invite the visitor — it acknowledges their presence with ancient, patient awareness. Every element exists at the edge of perception: almost correct, almost familiar, carrying the subtle wrongness of something that arrived from somewhere the light does not reach. The archive is open. What you do with it is your concern.

## Layout Archetype

**Immersive** — full-bleed void hero with phosphorescent R'lyeh Rising gradient, cyclopean architecture depth suggested through composition and CSS gradients rather than raster imagery. Features and content emerge from absolute darkness. The architecture extends beyond what the screen can contain. Dense academic information layout, eldritch-green single accents cutting through void-black depths.

## Aesthetic Direction

Lovecraftian cosmic horror. The universe is vast, ancient, indifferent, and populated by entities whose existence human minds cannot fully comprehend. The palette is void-black, eldritch phosphorescent green, void purple, and the particular wrongness of colours between. Typography carries the weight of things older than the institution that preserved it. Motion is subtle and wrong — elements do not move as they should.

## Color Table

| Role             | Name                  | Hex       | Usage |
|------------------|-----------------------|-----------|-------|
| Primary          | Eldritch Green        | `#00CC66` | Primary CTAs, active states, phosphorescent accent |
| Secondary        | Void Purple           | `#3D0080` | Secondary structural accents, architectural depth |
| Tertiary         | Blood Deep            | `#660000` | Destructive actions, critical errors |
| Background       | Cosmic Void           | `#04000A` | Page background — the darkness between stars |
| Surface          | R'lyeh Dark           | `#080014` | Card and panel surfaces |
| Surface Alt      | Non-Euclidean Shadow  | `#0C0520` | Nested panels, hover states |
| Text             | Corrupted White       | `#C8D8C0` | All body and headline text |
| Border           | Obsidian Veil         | `#1A0A2E` | Card borders, dividers |
| Success          | Phosphor Pulse        | `#00AA44` | Success states |
| Warning          | Sallow Amber          | `#CC8800` | Caution states |
| Error            | Ritual Crimson        | `#990011` | Error states |
| Info             | Abyssal Blue          | `#004477` | Informational notices |
| Focus            | Eldritch Pulse        | `#00CC66` | Keyboard focus ring |

## CSS Gradients

| Name                  | Type   | Stops                                      | Usage |
|-----------------------|--------|--------------------------------------------|-------|
| R'lyeh Rising         | linear | `rgba(0,204,102,0.18)` → `#04000A` 180°   | Hero backdrops |
| Cosmic Rift           | radial | `rgba(61,0,128,0.40)` → `rgba(4,0,10,0.0)` | Cosmic background accents |
| Abyssal Depth         | linear | `#080014` → `#04000A` 180°                | Surface-to-background fade |
| Forbidden Manuscript  | linear | `#0C0520` → `#080014` 145°                | Section break gradients |

## Typography Roles

| Role      | Family              | Weights | Tracking   | Line Height | Usage |
|-----------|---------------------|---------|------------|-------------|-------|
| Headline  | Cinzel              | 700, 900 | 0.05em    | 1.1         | Page titles, hero headlines — monumental, carved |
| Display   | Uncial Antiqua      | 400     | 0.02em    | 1.0         | Oversized eldritch display text, illuminated headers |
| Body      | Crimson Text        | 400, 600 | 0.01em    | 1.7         | Descriptions, synopses, long-form reading |
| UI        | EB Garamond         | 400, 500, 600 | 0.02em | 1.35    | Buttons, labels, navigation, chips |
| Mono      | Courier Prime       | 400, 700 | 0.03em   | 1.6         | Code, technical readouts |
| Number    | Cinzel              | 700     | 0.04em    | 1.0         | Stats, counters, runtimes |

**Typography rules applied:**
- Cinzel headlines bold (700+) — their weight is structural
- Uncial Antiqua display only, never at body size
- Headline tracking at 0.05em — letters carved one by one
- Body copy left-aligned (academic tradition)
- No UI copy in Uncial Antiqua

## Spatial System

Spacing scale (px): `4, 8, 12, 16, 24, 32, 48, 64, 96`

Used for all margins, padding, gaps. No other values permitted. Darkness between elements reads as depth, not emptiness.

## Motion Philosophy

Slow and wrong. Everything moves slightly too slowly, as if disturbed rather than activated. Nothing bounces. Nothing springs. Transitions use `cubic-bezier(0.0, 0.0, 0.2, 1)` (ease-in) and `cubic-bezier(0.4, 0, 1, 1)` (enter). Speed is geological: 350–600ms. Hover: 400ms ease-in, eldritch-green glow materialises over the surface. Focus: 250ms. `prefers-reduced-motion` replaces all with static states.

Microinteractions applied:
- Cards: 1px eldritch-green border + phosphorescent glow on hover, 400ms ease-in
- Buttons: brief dim to 80% opacity on press (inverse of normal feedback)
- Focus: 2px eldritch-green ring with 4px void offset + outer glow
- Success: eldritch-green expansion from element center settling to static

## Visual Assets

| Asset              | Description |
|--------------------|-------------|
| `img/logo.svg`     | Cinzel bold wordmark + cyclopean arch/eye sigil on Cosmic Void, 1px eldritch-green border |
| `img/favicon.svg`  | 32x32 sigil mark in Eldritch Green on Cosmic Void |
| `img/og.svg`       | 1200×630 social card: tagline_primary, brand name, void background with cosmic rift gradient |
| `img/PROMPTS.md`   | Exact image generation prompts for all visual assets |
| Inline SVG icons   | 8 feature icons (library, syncplay, transcode, shield, antenna, broadcast, puzzle, hub) — sharp 1.5px outlined, eldritch green on dark |

Feature icon style: 1.5–2px stroke, sharp caps/joins, Corrupted White default, Eldritch Green active state. Vertical symmetry preferred. Icons feel as if transcribed from something older than the icon convention.

## Component Library

| Component           | Spec |
|---------------------|------|
| `.btn-primary`       | Eldritch Green `#00CC66` on Cosmic Void `#04000A`, sharp 1px radius, 44px min height |
| `.btn-secondary`    | Transparent, Corrupted White text, 1px Obsidian Veil border |
| `.btn-danger`       | Blood Deep `#660000` background, Corrupted White text |
| `.btn-ghost`        | Transparent, Corrupt Slate border, understated |
| `.btn-link`         | Eldritch Green inline text link, no border |
| `.feature-card`     | R'lyeh Dark, 1px Obsidian Veil border, hover → eldritch-glow border + shadow |
| `.client-card`      | Same base; status badge (stable=green, beta=amber, deprecated=crimson) |
| `.badge`            | 10px uppercase, 1px border, Cinzel/EB Garamond |
| `.code-block`       | Non-Euclidean Shadow background, top gradient accent bar in eldritch+void-purple |
| `.faq-item`         | 3px left eldritch-green accent bar, sharp corners |
| `.cta-banner`       | R'lyeh Dark, centered Cinzel headline, primary CTA |

## Signature Elements

The following must appear throughout the site per the kit's `signature_elements`:
- Eldritch sigil watermark at very low opacity (CSS background on surface sections)
- Non-Euclidean perspective lines in hero (CSS radial gradients imply depth)
- Bioluminescent green pulse on hover states (phosphorescent glow box-shadow)
- Sharp-cornered cards (no border-radius > 4px)
- The cyclopean arch motif in the logo sigil

## Responsive Behavior

| Breakpoint    | Layout |
|--------------|--------|
| Desktop      | Multi-column, eldritch-glow hover effects, max 1400px, dense academic layout |
| Tablet       | 2–3 column grids, 48px min touch targets, sidebar collapses to icon rail |
| TV (10ft)    | Cinzel at 2× scale, 4px eldritch-green focus ring, poster grids on void |
| Mobile       | Single column, bottom tab bar, full-width posters, sticky play bar, no hover |

## Sound Identity (context only — no audio in site)

The brand's sound identity is documented for brand consistency in other contexts (loading screens, notifications). Sound identity: low resonant drone, deep stone resonance, the sound of something that should not be making sound. Documented in SITE.md as context only. No audio elements in the deployed site.
