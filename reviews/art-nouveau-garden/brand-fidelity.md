# Brand fidelity & spirit Review — art-nouveau-garden

**Variant**: art-nouveau-garden
**Round**: 1
**Reviewer**: code-reviewer agent
**Date**: 2026-07-01

## Score

- **Brand fidelity & spirit**: 81 / 100

## ✅ Passed

- CSS custom properties (`:root`) match the kit's `design_tokens.color` exactly — all 17 color tokens correct
- No off-palette hex values anywhere in CSS or HTML — every color traces to the kit
- Font families, weights, and roles match the kit exactly: Cormorant Garamond (headline/display), Playfair Display, EB Garamond (body), Josefin Sans (UI), Courier Prime (mono)
- `@font-face` declarations present for all 5 font families with `font-display: swap` — self-hosted WOFF2 as required
- Typography rules honored: generous letter-spacing on UI labels (0.08–0.2em), body line-height 1.7, serif display/headline/body
- Colors avoid pure black/pure white; all nature-derived — sage, rose, ivory, gold, forest green
- No dark mode, no neon, no tech-corporate aesthetic, no cold geometric visuals — all `brand_opposites` avoided
- Organic motion: `cubic-bezier(0.25, 0.46, 0.45, 0.94)` (`--easing-garden`) used consistently; durations slow/medium
- `prefers-reduced-motion` honored in both CSS (`0.01ms` overrides) and JS (gate behind `matchMedia`)
- Botanical decorative SVG (vines, peacock feather ellipses, lily blossoms) present in hero — matches kit's `signature_elements`
- Brand voice present in CTA copy: "cultivate your collection" (home), "step through the gilded gate" (features, download, hub), "wander freely" (clients) — all align with kit `vocabulary`
- No `avoid_words` from kit detected (no "leverage", "synergy", "disrupt", "hack", "scale", "optimize", etc.)
- Gradient names and values match kit: `Golden Hour` (#B8960C→#C08070 @ 145deg), `Vine to Bloom` (#7D9B76→#C08070 @ 160deg), `Parchment Light` (radial), `Peacock Sheen` (#3D7A8A→#7D9B76→#B8960C @ 120deg)
- Shadow tokens use warm moss-tinted rgba(74, 94, 68, …) — no cool grey, as kit requires
- Favicon: square with rounded corners (6px), aged gold primary color — matches kit `logo_rules`

## ⚠️ Concerns (non-blocking)

- **hero title "Your media. Your library. Your Phlix."** — the home `<h1>` uses the default hero headline from `content.json` rather than the kit's `tagline_primary` ("Where the Garden Blooms, the Story Begins."). The kit's tagline appears in og.svg and SITE.md but not in the hero. The brand would feel more distinctive with kit copy here. — Suggest using the tagline_primary as an overlay or variant
- **Secondary CTA label "Read the docs"** — plain and generic; kit `writing_style` calls for "Occasional botanical or horticultural metaphors." "Browse the garden" or "Wander the docs" would fit the voice. — Suggest using kit-branded micro-copy

## ❌ Failures (must fix this round)

- **features.html:68-155, index.html:144-222** — Feature icons are generic geometric SVGs (horizontal lines for library, clock face for syncplay, cube for transcode, shield for auth, radiating lines for antenna, spoke/wheel for broadcast, gear-cog for plugins, sun-burst for hub). The kit's `icon_rules` explicitly prohibit "icons that read as tech, digital, or geometric-modern" and require "nature metaphors: a leaf for 'home', a vine for 'library', a blossom for 'favorites'." All 7 feature icons on index.html + 7 identical ones on features.html violate this. — Replace all 7 feature icons with botanical/outlined SVG icons: library→vines-and-open-book, syncplay→synchronised-blossoms, transcode→layered-petal-cube, auth→ornate-shield-with-leaf, antenna→unfurling-frond, broadcast→peacock-plume, plugins→interlinked-leaves, hub→gilded-gate
- **components.css:64** / **index.html:63** — Nav toggle icon is three horizontal lines (`M3 12h18M3 6h18M3 18h18`), a standard tech-menu glyph. The kit's `icon_rules` mandates "nature metaphors for navigation: leaf, vine, blossom" and the `logo_rules` forbid "gears, play-button triangles, circuits, neon glow, sharp geometric mark." This violates both. — Replace with a delicate botanical leaf-hamburger or vine-spread icon (1.5px stroke, rounded caps)

## Recommendations (ranked by impact)

1. **Replace all 14 feature icons** (impact: high, effort: medium) — This is the single most visible brand-opposites violation. Botanical SVG icons matching the 1.5px stroke, rounded-cap, vine-ink style are achievable and would transform brand feel.
2. **Replace nav toggle icon** (impact: medium, effort: low) — A single SVG substitution; the icon appears on every page and is part of the brand's first impression.
3. **Use kit tagline in hero h1** (impact: medium, effort: low) — "Where the Garden Blooms, the Story Begins." is the brand's primary voice anchor; using it in the hero would immediately differentiate from a generic template.

## Evidence

- Feature icons grep (all identical on index + features): `grep -n "viewBox.*24.*24" sites/art-nouveau-garden/index.html`
- Nav toggle: `index.html:63` — `d="M3 12h18M3 6h18M3 18h18"` — three straight lines, no botanical motif
- CSS tokens vs kit: base.css:20-37 matches brand kit design_tokens.color exactly (17 tokens, same hex values)
- prefers-reduced-motion: base.css:276-283 + components.css:765-777
- Botanical hero SVG: index.html:97-119 (vines, lily blossoms, peacock feather motifs)
- Brand voice CTA examples: index.html:231 "cultivate your collection", features.html:167 "gilded gate", clients.html:143 "wander freely"
