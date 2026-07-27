# Midnight Jazz — Site Design Rationale

## Concept & Vision

Midnight Jazz is a late-night jazz club for your media library. The experience is dark, warm where it counts, and never loud — like a basement club where the real music starts after last call. Every design decision echoes a Blue Note Records album cover: deep navy backgrounds, amber spotlights cutting through shadow, bold condensed type, and fine film grain.

## Aesthetic Direction

Art direction references:
- 1950s and 60s Blue Note Records album covers (Reid Miles graphic design)
- Harlem jazz clubs of the bebop era
- Film noir cinematography — chiaroscuro, smoke, wet streets
- Miles Davis "Kind of Blue" liner notes
- West Village basement clubs — low ceilings, candlelit tables

Key visual motifs: amber spotlight cones cutting through dark backgrounds, upright bass and trumpet silhouettes, brushed-metal textures in UI surfaces, bold condensed lettering like a club marquee, worn piano key dividers, vinyl record label shapes as avatar frames, and fine horizontal score-line rules between sections.

## Color Table

| Role | Name | Hex | Usage |
|------|------|-----|-------|
| Primary | Amber Spotlight | #E8961F | Primary CTAs, active states, the single focal spotlight |
| Secondary | Cool Slate | #7A9BB5 | Links, hover states, secondary text, icons |
| Tertiary | Muted Brass | #C4A45A | Decorative accents only, badges |
| Background | Midnight Navy | #0D1117 | Page background — the dark stage |
| Surface | Stage Charcoal | #1A2230 | Card and panel surfaces |
| Surface Alt | Deep Indigo | #222E42 | Hover rows, nested panels |
| Text | Linen White | #EDE8DF | All body and headline text |
| Border | Slate Hairline | #2E3D52 | Card borders, dividers |
| Success | Verdant Green | #4CAF82 | Confirmations |
| Warning | Burnt Ochre | #D4832A | Warnings (seasonal override Dec-Jan) |
| Error | Crimson Mute | #B03A3A | Errors |

## Typography

| Role | Family | Weight | Notes |
|------|--------|--------|-------|
| Headline | Barlow Condensed | 700 | Page and section headlines, marquee text |
| Display | Playfair Display | 700, 900 italic | Editorial pull-quotes, liner-note moments |
| Body | Inter | 400, 500 | Prose, descriptions, metadata |
| UI | Barlow | 400, 500, 600 | Buttons, labels, navigation, chips |
| Mono | JetBrains Mono | 400, 600 | Code blocks, timestamps |
| Number | Barlow Condensed | 700 | Stats, counters |

**Strong emphasis:** Uses `<strong>` at Inter 500 weight + Cool Slate color (#7A9BB5) — a second channel since 500 is only 100 units heavier than body 400.

## Spatial System

- Spacing scale: 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96px
- Corner radius: 3 (sm), 6 (md), 12 (lg), 20 (xl), 999 (pill)
- Max content width: 1400px
- Shadows are cool indigo-black (#080D14), never warm

## Motion Philosophy

Slow, deliberate transitions (300–500ms). Cross-dissolves and fade-to-dark between states. Page content reveals with subtle scroll-driven fade-ins. Marquee warmup: amber border pulses on hero entry. No bounce, no spring, no aggressive translate. Reduced motion: instant cuts only, no animation.

The `intensity_toggle` ("House lights up") switches off all decorative animation via a body class and localStorage persistence.

## Visual Assets

- **Logo:** Wordmark "MIDNIGHT JAZZ" in Barlow Condensed 800 all-caps with amber underline
- **Mascot:** Miles — stylized trumpet silhouette with long valves for legs, a bell that opens into a gentle smile
- **Icons:** Outlined, 1.5px stroke, Cool Slate default / Amber Spotlight active
- **Grain:** Fine film grain overlay on hero backgrounds
- All assets in `img/` are existing and correct — not regenerated
