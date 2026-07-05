# SITE.md — Swiss Modernist Brand Kit Site

## Concept & Vision

Phlix in the Swiss International Typographic Style — the design language of pure function. The site is built on the premise that every element earns its position by solving a problem. White space is not empty: it is the grid made visible. The single red accent — Basel Red, `#E8001C` — appears exactly once per view, placed with surgical precision on the primary action or the lead structural element. Typography is the entire visual identity: Inter Black headlines at large scale, left-aligned body copy, tight negative tracking.

This is not a minimalism trend site. This is the discipline of the International Style applied to a media server — austere, rational, mathematical, and uncompromising in its clarity.

---

## Aesthetic Direction

Swiss International Typographic Style (Internationale Typografische Stilrichtung). Emil Ruder's *Typographie* (1967) and Josef Müller-Brockmann's grid system posters are the canonical references. Massimo Vignelli's NYC subway signage. Otl Aicher's 1972 Munich Olympics identity. The Neue Grafik magazine (1958–1965). Every element derives from the grid — columns, gutters, and baseline grids that are visibly structural. No decorative elements. No illustration beyond typographic composition. No photography of people in brand contexts.

---

## Color Table

| Role | Name | Hex | Usage |
|------|------|-----|-------|
| primary | Basel Red | #E8001C | Single accent per view — primary CTA only |
| text | Ink Black | #121212 | Headlines and body text |
| secondary | Type Black | #1A1A1A | Structural elements, rule lines, borders |
| tertiary | Rule Gray | #888888 | Metadata labels, dividers, inactive navigation |
| neutral | Grid Gray | #AAAAAA | Light structure, disabled states |
| background | Grid White | #F8F8F4 | Default page background |
| surface | Column White | #EFEFEB | Card and panel surfaces |
| surface_alt | Module Gray | #E5E5E0 | Striped rows, hover states, nested panels |
| success | System Green | #006B3C | Success states |
| warning | Signal Amber | #B35C00 | Warnings, caution |
| error | Error Red | #C8001A | Errors, destructive actions |
| info | System Blue | #00408A | Informational states, links |
| focus | Focus Red | #E8001C | Keyboard focus ring (same as primary) |

---

## Typography

Single typeface: **Inter** for all roles — headline, display, body, and UI. Barlow Condensed for oversized display numerals. JetBrains Mono for technical readouts (runtimes, file sizes, code).

| Role | Family | Weight | Usage |
|------|--------|--------|-------|
| headline | Inter | 900 (Black) | Page titles, hero headlines, 0px radius, tight tracking (-0.04em) |
| display | Barlow Condensed | 800 | Oversized numerals, section numbers |
| body | Inter | 400 | Body copy, descriptions |
| ui | Inter | 500–600 | Buttons, navigation, labels |
| mono | JetBrains Mono | 400 | Technical data, code |

Typography rules enforced:
- Never use weights below 700 for headlines
- Body text always left-aligned (justified text forbidden)
- Strict typographic scale: 12, 14, 16, 18, 24, 32, 48, 64, 96px
- Line height for body: 1.6 (Swiss measure)
- Uppercase used only for category labels and navigation

---

## Spatial System

8px base unit. Only allowed spacing steps: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128px. 12-column grid, 24px gutters, 1400px max-width. Every element aligns to the grid or is removed.

---

## Motion Philosophy

**Mechanical. Instantaneous. Snap.**

The Swiss Modernist system rejects decorative motion entirely:
- Snap to position — no easing curve
- Hard cut — no dissolve or fade
- Opacity change at 100ms — the fastest acceptable transition
- No bounce, no spring, no elastic
- Hover states: 80ms linear (card gains 2px Basel Red left border; button darkens 12%)

**Reduced motion:** Honor `prefers-reduced-motion`. Replace snap transitions with 100ms opacity-only change. Remove the loading sweep line.

---

## Visual Assets

- **Logo:** Inter Black wordmark in Ink Black on Grid White, 4px Basel Red underrule in full lockup only
- **Icons:** Sharp-outlined SVG icons, 1.5px–2px stroke, zero border radius, Ink Black; Basel Red for active/selected
- **No photography of people** in brand contexts — only media content imagery and type
- **OG image:** 1200×630, Grid White background, oversized Inter Black headline, 4px Basel Red rule, strictly typographic
- **No mascots** — the brand system is principled in its refusal of anthropomorphism

---

## Layout Archetype

**Grid** — systematic, modular, brutalist. The 12-column grid is visible in the layout structure. Heavy horizontal rule dividers anchor sections. Asymmetric but mathematically proportioned. Large typographic blocks as visual field, not just labels. Generous white space used structurally.

---

## Signature Elements (must appear throughout)

1. Heavy black horizontal rule dividers (2px–4px) as structural anchors
2. Oversized Inter Black type as primary visual element
3. Strict modular grid — 12-column, 8px base unit
4. Single Basel Red (#E8001C) accent per view, used precisely once
5. Near-zero border radius — all corners are right angles
6. Large asymmetric type blocks used as visual field, not just label
7. Negative space as deliberate compositional element

---

## Sound Identity (brand context only — not implemented in static site)

- Startup: single clean piano note, middle C, 440Hz, 0.3 seconds, no reverb
- Notification: dry two-pitch click, low-high, 60ms each
- Success: two ascending piano notes at perfect fifth interval, 100ms each
