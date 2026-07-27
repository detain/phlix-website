# SITE.md — Street Mural Brand Kit Site

## Concept & Vision

Street Mural is the energy of an outdoor gallery everyone can see from the street. It is spray-can vivid, concrete-tough, and community-built — electric blue, hot red, chrome silver, and tag black on rough concrete. It is never sanitized, corporate, pastel, or timid.

This site carries that same ethos: a brand-kit marketing site for Phlix rendered entirely in the Street Mural identity. Every screen should feel like a freshly painted wall — commanding, full-color, alive. The product is still Phlix; the kit name is the identity Phlix is dressed in.

---

## Aesthetic Direction

**Layout archetype: Immersive / Kinetic**

Full-bleed concrete hero, kinetic asymmetric sections, dominant focal elements. Nothing centered and timid. Every view is a freshly painted wall — not a brochure.

**Visual style:**
- Aerosol illustration / stencil cut / rough concrete texture
- Spray-fade gradients / thick black outlines / wheat-paste layering
- Heavy texture, layered depth

**Art direction:**
Artwork should feel like it was executed on a concrete wall with aerosol cans and a steady hand. Colors are saturated and opaque, sprayed in sharp-edged stencil zones that bleed slightly at the edge into halo overspray. Backgrounds carry visible concrete aggregate texture — rough, mottled, gray. Black outlines are thick (3–4px equivalent), slightly imperfect, like a painted outline rather than a vector stroke. Composition is asymmetric and kinetic — type breaks the grid, figures are in motion, elements collide at the edges.

---

## Color Palette

| Role | Name | Hex | Usage |
|------|------|-----|-------|
| `--color-primary` | Spray-Can Red | `#E81F1F` | Primary CTAs, hero headlines, high-energy emphasis |
| `--color-secondary` | Electric Blue | `#0066FF` | Secondary actions, links, highlight accents |
| `--color-tertiary` | Vivid Yellow | `#FFD600` | Badges, focus rings, key callouts |
| `--color-chrome` | Chrome Silver | `#C0C0C0` | Metallic bubble letters, chrome type |
| `--color-bg` | Raw Concrete | `#2B2B2B` | Default page background — the wall |
| `--color-surface` | Weathered Concrete | `#383838` | Card and panel surfaces |
| `--color-surface-alt` | Charcoal Block | `#1E1E1E` | Alternate surface, code blocks, inset areas |
| `--color-text` | White Fill | `#F0F0F0` | Primary body and headline text |
| `--color-border` | Tag Black | `#0D0D0D` | Stencil outlines, card borders, dividers |
| `--color-focus` | Nozzle Yellow | `#FFD600` | Keyboard focus ring — instant, no fade |
| `--color-success` | Lime Marker | `#39D353` | Success states |
| `--color-warning` | Orange Zest | `#FF8C00` | Warnings, beta indicators |
| `--color-error` | Danger Red | `#CC0000` | Errors, destructive actions |
| `--color-info` | Sky Spray | `#00BFFF` | Informational banners |

**Gradients:**
- `Spray Blast` — `linear-gradient(120deg, #E81F1F, #FF8C00, #FFD600)` — hero backdrops
- `Blue Fade Wall` — `linear-gradient(180deg, #0066FF, #00BFFF)` — secondary sections
- `Chrome Shine` — `linear-gradient(90deg, #888, #F0F0F0, #888)` — metallic lettering
- `Night Wall` — `linear-gradient(180deg, #1E1E1E, #2B2B2B)` — dark backgrounds
- `Halo Overspray` — `radial-gradient(circle, rgba(232,31,31,0.6), rgba(232,31,31,0))` — overspray halos

**Key rules:**
- Background always dark concrete — never white or light
- Max 3 accent colors per view (red, blue, yellow) + chrome silver
- Vivid yellow reserved exclusively for focus/accessibility — never decorative
- Hard shadows (no blur radius)

---

## Typography

| Role | Family | Weight | Usage |
|------|--------|--------|-------|
| `--font-headline` | Anton | 400 | Blast-cap headlines, hero titles, section names |
| `--font-display` | Boogaloo | 400 | Splash display text, oversized numerals, personality accents |
| `--font-body` | Barlow Condensed | 400, 600 | Paragraphs, descriptions, long-form reading |
| `--font-ui` | Barlow | 400, 600, 700 | Buttons, labels, navigation, chips |
| `--font-mono` | Share Tech Mono | 400 | Code, tokens, technical readouts |

**Rules:**
- Headlines in Anton — ALL CAPS by default; never mix casing
- Body text in Barlow Condensed; never use Anton for body copy
- Body line-length 55–70 characters for readability
- Chrome and gradient fills on large display type only; never on body

---

## Spatial System

Spacing scale (the only allowed steps): `4, 8, 12, 16, 24, 32, 48, 64, 96px`

Max content width: `1440px`

---

## Motion Philosophy

Motion is kinetic, staccato, and punchy — decisive like a thrown can or a stamped stencil.

**Easing:** `cubic-bezier(0.77, 0, 0.18, 1)` (snap/slam), `ease-in-out`, `linear` (for wipes)
**Speed:** Fast — animations feel immediate, not floaty

**Microinteractions:**
- Hover: Cards jolt 3px offset left and up with a hard black shadow drop
- Button press: Instant scale-down to 0.95, snap-back in 80ms with paint-impact feel
- Focus: Vivid-yellow 3px focus ring appears with zero fade — instant, unmissable
- Success: Stencil checkmark stamps in with an overspray halo burst

**Reduced motion:** Honor `prefers-reduced-motion`: replace slam/spray animations with instant state changes; keep color transitions ≤150ms cross-fade.

---

## Visual Assets

- **logo.svg** — Wordmark "PHLIX" in Impact/Anton on concrete panel, spray-red stripe, chrome dot
- **favicon.svg** — Spray-red square with white "P" in Impact
- **og.png** — 1200×630: dark concrete + concrete panel + hero headline with spray-gradient fill + subheadline
- **Feature icons** — Inline SVG, single flat color, filled stencil style, 3px stroke, angular caps/joins
- **Header motif** — Spray-can arc blast animation (SVG) with drip trails

---

## Seasonal Variants (documented; not auto-applied)

1. **Winter Block** (12-01..01-15) — Blue-tinted spray halos on frosted concrete
2. **Summer Jam** (06-21..09-01) — Blazing sun stencil behind hero; heat shimmer on card load
3. **Culture Month** (02-01..02-28) — Pan-African palette layered over concrete
4. **Pride Wall** (06-01..06-20) — Rainbow spray-arc gradient; stencil fists; "Everyone Gets a Wall"

Override token blocks (commented) available in `theme.css` for future activation.

---

## Experience Fields (2026 regen)

### Navigation Model
Kit nav: 6 links (The Wall, New Pieces, Spray Cans, Claim Your Space, Crew Hub, The Crew) with CSS emphasis classes. Plugins and Docs demoted to footer-only (`.nav-demoted`). Logo link: easter egg logo-clicks:7.

### Visitor Paths
On homepage: 3-path crew fork near the hero — "I'm a collector", "We sync watches", "I like to tinker". Each links to relevant features or plugins.

### Homepage Sections (5 max)
1. **the-wall** — Full-bleed hero with spray-arc SVG motif, kit headline copy
2. **tagged-pieces** — Hero features (Library, SyncPlay) + support grid (auth, transcode, hub, livetv) + footnote tags
3. **why-paint** — 7-point pitch list with diamond bullet icons
4. **proof-tag** — Wall stats placard + GitHub row + quote from license
5. **claim-yours** — CTA banner with 3-rung ladder

### Mascot: Cap
Spray-can character fixed bottom-right (desktop) or in-flow above footer (mobile). Page-specific tips, idle shake animation (5-8s interval), dismiss-to-localStorage. Accessible `aria-hidden` when not active.

### Easter Eggs
- **logo-clicks:7** — Spray burst overlay + page filter splatter + Cap tip reward
- **typed-word:crew** — `spray-cursor` CSS cursor + tagline glow + Cap reaction
- **scroll-past-footer:3x** — Footer "thanks for scrolling, crew" message

### Intensity Toggle
Footer utility row: "Volume: LOUD" / "chill" button. Persists to `localStorage`. Sets `data-intensity` on `<html>` and updates motion-state indicator.

### Seasonal Activation
JS date-matches 4 variants (winter 12-01..01-15, summer 06-21..09-01, culture 02-01..02-28, pride 06-01..06-20). Sets `data-season` on `<html>`. CSS variable overrides in `theme.css`.

### 404 Page
wrong-wall gag: Cap standing deflated in front of blank concrete wall. Recovery links: Back to Wall, Browse New Pieces, Claim Your Space.

### Typography
- Chrome fill on hero headlines (background-clip text gradient)
- Anton ALL CAPS headlines
- Barlow Condensed body at 55-65ch max-width
- Hard-shadow drop-shadow on all display type

