# dia-de-muertos brand kit — worklog

## general-purpose — Write dia-de-muertos.js brand kit — 2026-06-30

**Task:** Create a complete Phlix brand kit JS file for the Día de Muertos / Mexican folk art theme.

**Reference:** Read `/home/sites/phlix/phlix-website/brand-kits/neon-noir.js` to understand the
23-section schema (identity, personality, brand story, brand DNA, visual identity, color system,
typography, shapes, iconography, illustration, photography, motion, UI system, media identity,
copywriting, AI generation guidance, design tokens, responsive behavior, sound identity,
seasonal variants, accessibility, do/dont, metadata).

**File written:** `/home/sites/phlix/phlix-website/brand-kits/dia-de-muertos.js`

**Line count:** 1295 lines (requirement: >500).

**All 23 sections confirmed present** — verified by grep of section-separator comments.

**Key design decisions:**
- Background: `#0C0512` "Midnight Cemetery" — deep purple-black, not neutral black, critical for warmth
- Primary: `#FFB800` "Cempasúchil Gold" — the marigold, guides all attention like petals guide souls
- Secondary: `#CC00BB` "Papel Picado Purple" — vivid cut-paper purple, differentiated from bollywood-dreams fuchsia
- Tertiary: `#FF3355` "Calavera Pink" — sugar skull decoration, emotionally energetic
- Typography: Playfair Display (headline) + Cinzel Decorative (display) + Lora (body) — ornate and warm
- Corner radius: 8px standard (rounded, folk-art warm) vs neon-noir 4px (sharp)
- Mascot: "Catrina" — La Catrina skeleton figure in folk-art style, marigold-crowned, smiling
- Archetype: "Magician" (transforms grief into celebration, endings into reunions)
- Seasonal variants: Día de Muertos Peak (10-31..11-02), Posada Season (12-16..12-24), Frida Floral (07-06..07-13)
- Sound: guitarrón + marimba (culturally specific Mexican instruments, not generic)
- Cultural differentiation note included in metadata: distinct from bollywood-dreams (Indian cinema)
  and festive-lantern (East Asian) — different secondaries (purple/pink vs fuchsia/teal)

**Exports:** `export default brandKit;` + `export { brandKit };` — matches neon-noir.js exactly.
