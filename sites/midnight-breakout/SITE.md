# Midnight Breakout — Site Design Rationale

## Concept & Vision

Midnight Breakout is a prison-escape themed brand for Phlix: the moment a prisoner breaks through the final barrier to freedom. The brand is dramatic, cinematic, and tense — like the final act of an escape film. The visual language is dark industrial with searchlight drama, chain-link patterns, and the satisfying crack of breaking glass. The tagline: **"Break Free. Own Your Media."**

This brand serves users who chafe at subscription media services and want full ownership of their library — the "I'm done paying monthly for my own files" crowd.

---

## Aesthetic Direction

**Reference:** Escape-from-prison film sequences (The Shawshank Redemption, Escape from Alcatraz), surveillance camera aesthetics, security monitor imagery, industrial architecture photography.

**Mood:** Urgent, dramatic, cinematic, industrial — not cozy or inviting, but liberating and empowering. Like the breath of fresh air after the cell door swings open.

**Composition:** Tension-filled diagonal compositions. Silhouettes against bright floodlit zones. Chain-link fence grid patterns as structural overlays. Spotlight pools of light revealing content. Escape route dotted path lines tracing routes through the page.

---

## Color Palette

| Role | Name | Hex | Usage |
|------|------|-----|-------|
| Primary | Prison Navy | `#2C3E50` | Headers, primary surfaces, main backgrounds |
| Secondary | Alert Red | `#E74C3C` | Primary CTAs, jailbreak unlock moments, danger |
| Tertiary | Searchlight Amber | `#F39C12` | Spotlights, hover states, guides, highlights |
| Accent | Glass Shard White | `#ECF0F1` | Text on dark, broken glass shards, bright highlights |
| Background | Midnight Black | `#1A1A1A` | Deep backgrounds, overlays |
| Surface | Concrete Dark | `#232323` | Cards and panels |
| Surface Alt | Steel Gray | `#3D3D3D` | Alternating rows, nested panels |
| Text | Searchlight White | `#ECF0F1` | Primary text on dark |
| Text Muted | Fog Gray | `#95A5A6` | Secondary text, captions |
| Success | Escape Green | `#27AE60` | Success states, unlocked status |
| Warning | Alert Amber | `#F39C12` | Warnings |
| Error | Lockdown Red | `#E74C3C` | Errors, locked states |
| Border | Chain Steel | `#4A4A4A` | Borders, dividers |

---

## Typography

| Role | Font | Weight | Usage |
|------|------|--------|-------|
| Headline | Oswald | 700 | Hero titles, section headlines, display numbers |
| Display | Oswald | 600 | Feature card titles, stat numerals |
| Body | Source Sans 3 | 400, 600 | All body copy, descriptions |
| UI | Source Sans 3 | 600, 700 | Buttons, navigation, labels, badges |
| Mono | JetBrains Mono | 400, 700 | Code blocks, install commands, technical readouts |
| Number | Oswald | 700 | Stats, counters, version numbers |

**Rule:** NEVER use italic text. ALL CAPS only for eyebrows and short labels.

---

## Spatial System

8px base grid: 4, 8, 12, 16, 24, 32, 48, 64, 96px.

Corner radii: 4 / 8 / 12 / 16 / 999px (pill).

---

## Motion Philosophy

**Core animations:**
- `searchlight-rotate`: A conic-gradient spotlight beam that rotates continuously in the hero background — represents a searchlight sweeping the prison yard
- `spotlight-sweep`: A left-to-right light sweep that plays when sections enter the viewport (scroll reveal)
- `alert-pulse`: A slow red radial pulse in the CTA banner area — signals urgency and the "jailbreak" unlock moment
- `lock-rotate`: A conic amber glow that rotates on "jailbreak" feature cards
- `breakout-flash/msg`: The Konami code easter egg flash and "YOU BROKE FREE!" message

**Reduced motion:** All animations become instant fades under `prefers-reduced-motion: reduce`.

**Micro-interactions:**
- Hover: Card lifts 3px + amber glow border
- Button press: Sharp snap — 50ms down, immediate release
- Focus: Amber glow ring fades in over 150ms

---

## Visual Assets

### Logo
- "PHLIX" wordmark in Oswald 700, with an amber "L" to create a visual break — suggesting a broken chain link
- Chain-link grid pattern to the left as an accent
- Amber underline sweep beneath the wordmark

### Favicon
- Square, Prison Navy (#2C3E50) background
- Chain-link grid overlay at 25% opacity
- "P" letterform in Searchlight White
- Amber underline bar at the bottom

### OG Image (1200×630)
- Midnight Black background
- Chain-link grid corners
- Central searchlight radial glow
- "PHLIX" headline in Oswald 700
- Amber underline sweep
- "BREAK FREE. OWN YOUR MEDIA." tagline
- Bottom bar in Prison Navy with site identifier

### Feature Icons (8× inline SVG)
- All stroke-based, 1.5px weight, `stroke-linecap: sharp` / `stroke-linejoin: miter`
- Single-color: amber by default for hero, white for cards on hover
- Sharp, geometric, industrial — like security system icons

---

## Layout Archetype

**experience_archetype: `immersive`**

Dark, cinematic, high-contrast, drama-forward. Every page element feels like it's being revealed by a searchlight. Layout is bold and slightly tense — not relaxed. The visual language says "something is being unlocked or broken open."

**Key layout decisions:**
- Hero: Full-width, spotlight sweep background, chain-link overlay, conic-gradient searchlight rotation
- Feature cards: Dark steel with amber left-border accent on hover
- CTA banners: Pulsing red radial glow — the "breakout moment"
- 404: Cell block theme — "This cell is empty"
- All content sections on dark backgrounds (never white/light)

---

## Signature Elements

1. **Chain-link grid pattern** — CSS `repeating-linear-gradient` applied as section overlays and hero backgrounds
2. **Searchlight sweep** — conic-gradient `::after` on the hero that rotates 360°/12s
3. **Spotlight reveal** — `::after` pseudo-element that sweeps left-to-right when sections become visible
4. **Alert pulse** — red radial gradient on the CTA banner that pulses at 4s intervals
5. **Amber glow focus** — `box-shadow` ring in amber for all `:focus-visible` states
6. **Broken-glass / conic-rotate overlay** — jailbreak cards have a rotating amber conic gradient overlay
7. **Escape route dotted path** — decorative dotted amber lines connecting elements (CSS animation)
8. **Konami code easter egg** — `up-up-down-down-left-right-left-right-b-a` triggers "YOU BROKE FREE!" flash

---

## Technical Notes

- All fonts self-hosted from `shared/assets/fonts/` (Oswald, Source Sans 3, JetBrains Mono)
- No Google Fonts CDN — all font-face declarations point to local WOFF2 files
- No icon CDNs — all 8 feature icons are inline SVGs in the HTML
- CSS custom properties for all design tokens — zero raw hex in component CSS
- `prefers-reduced-motion: reduce` gate on all animations
- `og:image` requires rasterization: `node tools/gen-og.mjs --site midnight-breakout`
