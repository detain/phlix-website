# script-pages Brand Kit Site — Design Rationale

## Concept & Vision

A film screenplay-themed marketing site for Phlix. The visual language draws from Hollywood production scripts — Courier typeface, scene headings, stage play formatting, dramatic tension on paper. The experience should feel like opening a well-worn screenplay: clean, authoritative, focused on the words.

## Aesthetic Direction

**Reference:** Classic Hollywood production scripts — the kind that land on a director's desk before principal photography. Formal, structured, and deliberately typographic.

## Color Palette

| Role | Name | Hex | Usage |
|------|------|-----|-------|
| Background | Paper | `#F5F5DC` | Main background, like screenplay paper |
| Background Alt | Paper Light | `#FAFAE8` | Card surfaces, subtle contrast |
| Background Dark | Paper Dark | `#E8E8C8` | Alternating sections |
| Primary Text | Ink | `#1A1A1A` | Body text, headings |
| Secondary Text | Charcoal | `#2F2F2F` | Secondary text, metadata |
| Accent | Curtain | `#8B0000` | Primary accent, links, CTAs — the red of stage curtains |
| Accent Alt | Gold | `#C9A227` | Scene headings, highlights, special callouts |
| Accent Hover | Curtain Light | `#A52A2A` | Hover states for accent color |

## Typography

**Primary:** Courier New, Courier, Lucida Console, monospace
- Used for all text — headings, body, UI elements
- The monospace font reinforces the screenplay aesthetic
- Never use proportional fonts on this site

**Style Guidelines:**
- Scene headings: ALL CAPS, letter-spacing 0.15em
- Body text: Normal case, 1.6 line-height
- Section headings: Uppercase with letter-spacing

## Spatial System

Based on an 8px grid with the spacing scale:
- `--space-1`: 0.25rem (4px)
- `--space-2`: 0.5rem (8px)
- `--space-3`: 0.75rem (12px)
- `--space-4`: 1rem (16px)
- `--space-5`: 1.5rem (24px)
- `--space-6`: 2rem (32px)
- `--space-7`: 3rem (48px)
- `--space-8`: 4rem (64px)
- `--space-9`: 6rem (96px)

## Motion Philosophy

Minimal, purposeful motion. The screenplay theme is about content, not distraction.

- **Fade-in-up reveals** on scroll for cards and sections (200ms stagger)
- **Hover transforms** on cards: slight lift + border color change
- **Button hover:** subtle translateY + shadow increase
- **Reduced motion:** all animations disabled, static layout

## Visual Assets

**Icons:** Inline SVGs, stroke-based, single-color matching the theme
**Logo:** SVG wordmark with film strip accent
**Favicon:** Square film frame with "P" letterform
**Background texture:** Subtle horizontal lines evoking screenplay paper

## Key Design Decisions

1. **Paper texture background** — Faint blue horizontal lines suggest screenplay paper without being distracting
2. **Scene headings** — `.scene-heading` class for section titles, styled like screenplay scene headers
3. **Monospace throughout** — No font mixing; Courier is the visual identity
4. **Dark red accent** — `#8B0000` is the primary interactive color, evoking stage curtains
5. **Gold highlights** — `#C9A227` used sparingly for emphasis, like a script note
