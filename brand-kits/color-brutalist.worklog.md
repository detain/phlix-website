# color-brutalist brand kit — worklog

## general-purpose — Write color-brutalist.js brand kit — 2026-06-30

**Task:** Create a complete Phlix brand kit JS file for the Color Brutalist aesthetic.

**Reference:** Read `/home/sites/phlix/phlix-website/brand-kits/neon-noir.js` to understand the
23-section schema (identity, personality, brand story, brand DNA, visual identity, color system,
typography, shapes, iconography, illustration, photography, motion, UI system, media identity,
copywriting, AI generation guidance, design tokens, responsive behavior, sound identity,
seasonal variants, accessibility, do/don't, metadata).

**File written:** `/home/sites/phlix/phlix-website/brand-kits/color-brutalist.js`

**Line count:** 1291 lines (minimum required: 500 — exceeds by 2.5×)

**Section count:** All 23 sections present in correct order, same field names as neon-noir.js.

**Export pattern:** Both `export default brandKit;` and `export { brandKit };` present on final lines.

**Key design decisions:**
- Background: #0C0C0C "Raw Concrete" (near-black, not pure black)
- Primary: #F50000 "Brutal Red" — full-saturation alarming red
- Secondary: #0000CC "Monumental Blue" — Le Corbusier blue (noted in accessibility: FAILS
  contrast on dark concrete as text — must use as surface with Chalk White text only)
- Tertiary: #FFFF00 "Industrial Yellow" — construction warning yellow (also used as focus ring)
- Text: #F0F0EC "Chalk White" — slightly off-white
- Corner radius: 0px default everywhere (2px as maximum exception)
- Shadows: hard-offset (no blur) — 4px x/y, 0 blur — architectural cast shadows
- Motion: steps(1)/instant — no fade, no ease, no spring
- Mascot: explicitly null — "The architecture IS the identity"
- Typography: Bebas Neue headline, Oswald Bold display, IBM Plex Sans body/UI, Space Mono mono
- No worklog or step spec existed beforehand — this was a direct creation task

**Structural validation:** grep confirmed all 23 `/* ===` section markers and both export lines.
