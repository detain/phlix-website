# SITE.md — Cosmic Odyssey brand kit site

## Concept & Vision

Cosmic Odyssey dresses Phlix in the boundless wonder of deep space. Every page feels like a viewport into the infinite — sweeping nebulae in violet and magenta, ancient star fields, and the quiet awe of a spacecraft drifting against the cosmos. The brand DNA is "the stillness of deep space made tangible": deep obsidian backgrounds, stardust gold highlights, and an astronaut's sense of limitless possibility. This is a brand that invites exploration, not one that crowds the screen.

## Aesthetic Direction

**Theme**: Deep space astrophotography meets NASA golden-age mission poster. Near-black void backgrounds with luminous nebula bloom gradients. Color appears as light emerging from darkness — never flat paint. Typography is crisp and legible against the void; gold and magenta are precious, reserved for the most important moments.

**Layout archetype**: `immersive` — Full-bleed parallax star field hero, vast negative space, layered depth, luminous focal points. Each screen anchors to a single dominant light source.

**Mood**: Wondrous, Expansive, Curious, Awe-inspiring, Serene, Bold.

**Archetype**: Explorer (mission-briefing copy, cosmic metaphors, quiet epic tone).

## Color Table

| Role             | Name              | Hex       | Usage                                         |
|------------------|-------------------|-----------|-----------------------------------------------|
| `--color-primary`    | Nebula Violet     | `#7B3FBE` | Primary CTAs, active states, highlight rings  |
| `--color-secondary`  | Cosmic Magenta    | `#C0399A` | Secondary actions, hover states               |
| `--color-tertiary`   | Stardust Gold     | `#E8C44A` | Ratings, most important element per screen    |
| `--color-neutral`   | Stellar Blue      | `#3A7FBF` | Informational chrome, hyperlinks              |
| `--color-bg`         | Deep Space Black  | `#080B14` | Universal page background                    |
| `--color-surface`    | Void Panel        | `#111827` | Card and panel surfaces                       |
| `--color-surface-alt` | Nebula Haze      | `#1E2640` | Hover rows, nested panels, selected states   |
| `--color-text`       | Star White        | `#E8EAF0` | Primary body and headline text                |
| `--color-success`    | Aurora Green      | `#34D399` | Success states, confirmed states              |
| `--color-warning`    | Solar Flare       | `#FBBF24` | Caution states, buffering indicators          |
| `--color-error`      | Red Dwarf         | `#EF4444` | Error states, destructive actions             |
| `--color-info`       | Pulsar Blue       | `#60A5FA` | Informational banners, tooltips               |
| `--color-focus`      | Cosmic Focus Ring | `#A78BFA` | Keyboard focus ring                           |
| `--color-border`     | Constellation Line| `#2D3A5E` | Hairline borders, panel dividers               |

## Gradients (CSS-ready)

| Name             | Type   | Stops                                     | Usage                            |
|------------------|--------|------------------------------------------|----------------------------------|
| Nebula Bloom      | radial | `#7B3FBE` → `#C0399A` → `#080B14`       | Hero backdrops, onboarding       |
| Starfield Sweep  | linear | `#080B14` → `#111827` → `#1E2640`       | Page background gradient         |
| Stardust Trail   | linear | `#E8C44A` → `#C0399A`                    | Accent bars, progress fills     |
| Aurora Curtain   | linear | `#34D399` → `#3A7FBF` → `#7B3FBE`        | Success banners, seasonal effect |

## Typography

| Role       | Family         | Weight     | Tracking   | Line-height | Usage                              |
|------------|----------------|------------|------------|--------------|------------------------------------|
| headline   | Orbitron       | 700, 900   | 0.08em     | 1.05        | Hero headlines, section titles       |
| display    | Exo 2          | 300, 400   | 0.18em     | 0.92        | Cinematic title cards, watermark    |
| body       | Inter          | 400, 500   | 0.01em     | 1.7         | Paragraphs, descriptions             |
| ui         | Rajdhani       | 400–600    | 0.05em     | 1.25        | Buttons, nav labels, badges, chips  |
| mono       | Space Mono     | 400, 700   | 0.03em     | 1.6         | Code, coordinate readouts           |
| number     | Orbitron       | 400, 700   | 0.04em     | 1.0         | Telemetry numerals, stats           |

**Rules**: Orbitron for headlines only. Body copy ≤65ch. All-caps for Rajdhani UI labels. No italic on headlines.

## Spatial System

Spacing scale: `4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96px`
Content max-width: `1200px` | Max site width: `1440px` | Gutter: `64px` (responsive to `24px` at 768px, `16px` at 480px)

## Motion Philosophy

- **Speed**: Slow — 600ms+ transitions feel weightless (orbital mechanics)
- **Easing**: `cubic-bezier(0.22, 0.61, 0.36, 1)` — smooth deceleration; `linear` for star drift
- **Style**: Orbital, purposeful, weightless — never bouncy or jerky
- **Reduced motion**: All animations collapse to simple cross-fades via `prefers-reduced-motion: reduce`
- **Microinteractions**: Cards lift 3px + violet glow on hover. Button press flash (opacity pulse). Focus ring pulses violet.

## Visual Assets

| Asset       | Type  | Notes                                                |
|-------------|-------|------------------------------------------------------|
| logo.svg    | SVG   | Orbitron PHLIX wordmark, stardust-gold orbital arc   |
| favicon.svg | SVG   | Square, nebula violet, Orbitron "P"                  |
| og.svg      | SVG   | 1200×630 social card, star field + nebula + logo    |
| Feature icons | inline SVG | 1.5px stroke, rounded caps, violet single-color |
| Hero backdrop | CSS+SVG | Radial nebula bloom + star field dots, animated  |

## Signature Elements (from kit §4)

- Star fields and nebula clouds — hero CSS backdrop
- Orbital arcs — logo accent, badge borders
- Star-atlas grid lines — constellation-line (#2D3A5E) borders and dividers
- Lens-flare starburst — card hover glow, badge shimmer
- Glowing cosmic dust — stardust-gold dot accents in CSS
- Mission-patch shapes — badge rect with 4px radius, pill outline

## Sound Identity (context only — no audio in static site)

- Startup: deep sub-bass pulse rising to crystalline sustain
- Notification: short sonar-ping in cool register
- Success: three ascending tones, quiet mission-accomplished

## Seasonal Variants (not applied — documented for future)

- **Perseid** (08-10..08-14): stardust-gold meteor trails across hero
- **Winter Solstice** (12-18..01-06): aurora curtain green→blue→violet
- **Galaxy Season** (03-01..05-31): magenta-violet Milky Way background texture
