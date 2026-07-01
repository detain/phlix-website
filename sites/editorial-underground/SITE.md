# SITE.md — Editorial Underground

## Concept & Vision

Editorial Underground is the visual language of the copy shop at midnight — black ink bleeding through cheap paper, electric yellow highlighter dragged across a headline that demands to be read. It is Factory Records sleeve art and CBGB bathroom walls, Jamie Reid ransom-note lettering and Guy Debord Situationist pamphlets run off on a dying photocopier. Anti-corporate, anti-aesthetic, anti-permission.

The Phlix Editorial Underground site channels that energy directly: every element is a deliberate provocation against polished SaaS aesthetics. The site feels like it was assembled at speed with ink-stained hands — raw, confrontational, honest. Nothing is soft. Nothing apologizes.

---

## Aesthetic Direction

**Layout archetype**: `showcase` — full-bleed Xerox Black backgrounds, electric yellow signal cut-through, high-density card grids, hard-cut offset shadows, zero rounded corners anywhere.

**Mood**: Urgent. Confrontational. Authentic. Anti-corporate. The visual language of a photocopied manifesto slammed on a wall at 2 a.m.

**Key references**: Sex Pistols Never Mind the Bollocks artwork (Jamie Reid), Factory Records sleeve designs (Peter Saville), CBGB sticker walls, Punk Magazine, Richard Hell Voidoids, Guy Debord Situationist pamphlets, DIY screen printing, risograph printing.

---

## Color Palette

| Role | Name | Hex | Notes |
|------|------|-----|-------|
| Primary | Electric Yellow | `#FFE500` | Sole warm cut-through signal |
| Secondary | Punk Magenta | `#FF0066` | Alarm/error states only |
| Tertiary | Newsprint White | `#FFFFFF` | Tertiary accents only |
| Background | Xerox Black | `#0A0A08` | Default page background |
| Surface | Bleed Black | `#111110` | Card/panel surfaces |
| Surface Alt | Print Register | `#181816` | Alternate surfaces |
| Text | Paper White | `#F5F5F0` | Body/headline text |
| Neutral | Halftone Gray | `#555550` | Muted UI chrome |
| Border | Ink Line | `#2A2A28` | Default borders |
| Success | Safety Green | `#00CC44` | Success states |
| Info | Cold Static | `#AAAAAA` | Informational |

**Gradients**: Only two approved — `Manifesto Burn` (linear 180deg, #FFE500→#0A0A08) and `Xerox Overexpose` (radial, yellow glow on dark). No other gradients permitted.

---

## Typography

| Role | Font | Weight | Notes |
|------|------|--------|-------|
| Headline | Anton | 400 | Always uppercase, 0.92 lh, zero tracking |
| Display | Oswald | 700 | Section headers, bold only |
| Body | Space Mono | 400, 700 | 1.7 lh, -0.01em tracking |
| UI | Space Mono | 400, 700 | Buttons, labels, nav |
| Mono | Space Mono | 400, 700 | Code, tokens |

**Key rules**: Anton headlines always uppercase. Space Mono body copy never set in all-caps. Left-align always — manifestos do not center. Electric yellow highlight bars applied BEHIND text, never as text color on dark.

---

## Spatial System

Spacing scale (px): 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96

Max content width: 1400px. Gutters: 24px. Zero rounded corners — all radii zero except `--radius-xl: 2px`.

---

## Motion Philosophy

**Hard cuts only.** No easing. No spring. No bounce. No transitions that imply softness.

- Hover states: instant border-color switch (0ms)
- Button press: instant color inversion (0ms)
- Focus rings: instant appear (0ms)
- Page content: present or absent — no fade-in

Easing: `steps(1, end)` or `steps(1, start)`. No cubic-bezier, no ease-in-out.

Reduced motion: already compliant — all animations are step-function or instant.

---

## Visual Assets

- **Logo**: Anton uppercase wordmark, electric yellow on Xerox Black, 2px yellow rectangular border with zero radius, lightning bolt accent, registration-mark corners.
- **Favicon**: Square, Xerox Black background, 2px yellow border, lightning bolt mark.
- **OG card**: Xerox Black background, halftone dot texture, "YOUR MEDIA. YOUR LIBRARY. YOUR PHLIX." in Anton, diagonal slash accents, registration marks.
- **Icons**: 2px stencil-cut outlined, square caps/joins, zero radius, 24x24 viewBox. Paper White default, electric yellow on hover/active.
- **Dividers**: Diagonal slash separators (yellow), full-width horizontal rules with yellow glow gradient.
- **Mascot**: Riot — safety-pin-and-lightning-bolt collage figure, electric yellow on black.

---

## Signature Elements

- Cut-and-paste ransom-letter typographic collage headlines
- High-contrast halftone dot patterns on surface areas
- Safety-pin graphic device as structural divider
- Diagonal slash separators
- Electric yellow highlight bars behind key text
- Distressed overprint texture on dark backgrounds
- Stencil-style icon rendering
- Xerox bleed and registration-mark corner accents

---

## Layout Patterns

**Landing (home)**: Full-bleed Anton headline on Xerox Black, electric yellow → Space Mono body → hard-border feature sections → electric-yellow CTA. Hero minimum 90vh.

**Features**: Page header → full-width feature detail grid with zero-radius cards, diagonal slash section dividers.

**Clients**: Client card grid, each card gaining instant electric-yellow border on hover.

**Download**: Full-width code block with Ink Line border, client cards, ecosystem list.

**Plugins**: Numbered step list with Anton counter, zero-radius cards.

**Docs**: Link-out page. Hub-style link cards.

**Hub**: Stacked text sections with slash dividers.

**About**: Philosophy → license → contributing → FAQ list with zero-radius items.
