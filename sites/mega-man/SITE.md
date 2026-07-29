# Mega-Man Theme — Site Design

## Concept & Vision

The Mega-Man theme channels the energy of classic 8-bit platformers — robot masters, stage select screens, and the blue bomber legend. Every element evokes the boss-weapon theft mechanic: power-ups earned, victory claimed. The vibe is retro arcade meets modern web, with chiptune-inspired typography and stage-select card layouts.

## Aesthetic Direction

**Reference:** Mega-Man (NES, 1987) + modern indie games with retro pixel aesthetics. The palette is the classic Mega-Man blue (#0077BE) paired with robot master gold (#FFD700) and boss-weapon energy orange (#FF4500).

## Color Palette

| Role | Name | Hex |
|------|------|-----|
| Primary | Mega-Man Blue | #0077BE |
| Primary Bright | Mega-Man Blue Bright | #0099E6 |
| Accent | Robot Master Gold | #FFD700 |
| Accent Dim | Gold Dim | #CCB000 |
| Energy | Boss Weapon Orange | #FF4500 |
| Energy Dim | Orange Dim | #CC3700 |
| Background | Mega Dark | #1A1A2E |
| Surface | Mega Dark Surface | #16162A |
| Surface Elevated | Mega Dark Elevated | #22223A |
| Text | Mega Light | #E0E0E0 |
| Text Muted | Light Dim | #B0B0B0 |
| Text Faint | Faint | #888899 |
| Border | Border | #2D2D4A |

## Typography

- **Display:** Bangers (Google Fonts fallback to Impact) — arcade comic style for headings
- **Body:** Barlow — clean geometric sans-serif for body text
- **Mono:** Courier Prime — clean monospace for code blocks

**Font Scale:**
- h1: 3rem / 4.5rem
- h2: 2.25rem / 3rem
- h3: 1.5rem / 1.875rem

## Spatial System

**Spacing scale (rem):**
- 1: 0.25
- 2: 0.5
- 3: 0.75
- 4: 1
- 5: 1.5
- 6: 2
- 7: 3
- 8: 4
- 9: 6
- 10: 8

**Border radius:** 4px (sm), 8px (md), 12px (lg), 16px (xl)

**Max widths:** 1400px (outer), 1200px (content)

## Motion Philosophy

**Transitions:** Base 250ms ease, arcade-feel 300ms cubic-bezier(0.16, 1, 0.3, 1)

**Scroll reveals:** Feature cards, client cards, hub features fade in on scroll with 50px bottom margin threshold.

**Reduced motion:** All animations disabled when `prefers-reduced-motion: reduce` is set.

**Hover states:** Cards lift with glow shadows (blue for features, orange for clients/downloads).

## Visual Assets

- **Logo:** SVG with "PHLIX" in Impact style with blue gradient and gold underline accent
- **Favicon:** Square blue (#0077BE) with white "P" in Impact
- **Icons:** Single-color stroke-based inline SVGs — 24px base size, gold (#FFD700) for pitch/features, blue (#0077BE) for downloads, themed per context
- **Backgrounds:** Radial gradients with subtle blue/orange/gold overlays on dark base

## Component Patterns

- **Cards:** Dark surface background, subtle border, hover glow in accent color
- **Buttons:** 3D "power-up" style with gradient tops and solid bottom shadows; primary (blue) and secondary (gold border)
- **Code blocks:** Dark surface, blue left border, gold monospace text
- **FAQ:** `<details>`/`<summary>` pattern with gold accent on open state
- **Badges:** Small uppercase labels — blue for stable, gold for beta, orange for deprecated

## Layout Archetype

Single-column mobile → 2-4 column grid on desktop. Hero at 85vh minimum with centered content. Feature grids use CSS Grid with `minmax(0, 1fr)` tracks (not bare `1fr`).

## Responsive Behavior

Breakpoints: 320, 375, 480, 768, 1024, 1280, 1920px. Mobile nav becomes slide-in drawer. Touch targets minimum 44×44px.
