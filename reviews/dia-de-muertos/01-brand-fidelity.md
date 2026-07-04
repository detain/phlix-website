# Brand Fidelity & Spirit Review — Día de Muertos

**Variant**: dia-de-muertos
**Round**: 1
**Reviewer**: adversarial-reviews-agent
**Date**: 2026-07-01

## Score

- **Brand Fidelity & Spirit**: 32 / 100

## ✅ Passed

- CSS custom properties in `base.css:65-143` correctly match brand kit `design_tokens` hex values: `--color-primary: #ffb800`, `--color-secondary: #c0b` (expands to `cc00bb`), `--color-tertiary: #f35` (expands to `ff3355`), `--color-bg: #0c0512`, `--color-surface: #130820`, `--color-surface-alt: #1a1030`, `--color-text: #fff0e8`, `--color-success: #e8a000`, `--color-warning: #ff7a00`, `--color-error: #e5154e`, `--color-info: #00c9b1`, `--color-border: #2d1845` — all color values are correct
- Typography roles in CSS match brand kit: body uses `'Lora'` (`--font-body: 'Lora'` at `base.css:109`), UI uses `'IBM Plex Sans'` (`--font-ui` at `base.css:110`), headline uses `'Playfair Display'` (`--font-headline` at `base.css:107`), display uses `'Cinzel Decorative'` (`--font-display` at `base.css:108`), mono uses `'IBM Plex Mono'` (`--font-mono` at `base.css:111`)
- Icon style in `components.css` uses 1.5px stroke weight (`stroke-width="1.5"` on feature icons in `index.html:174`) — matches icon_rules of 1.5px–2px stroke weight
- Shadow tokens match brand kit exactly: `--shadow-sm`, `--shadow-md`, `--shadow-lg`, `--shadow-marigold`, `--shadow-purple`, `--shadow-calavera` all correct at `base.css:125-131`
- Gradient tokens correct: `--grad-ofrenda` (`175deg`, `#c0b` → `#ffb800`), `--grad-marigold` (radial), `--grad-cemetery` (`180deg`, `#1a1030` → `#0c0512`) at `base.css:83-86`
- `prefers-reduced-motion` respected: `base.css:273-281` sets `animation-duration: 0.01ms !important` and `transition-duration: 0.01ms !important` globally; `components.css:585-595` disables `.candle-glow` and `.petal-loader` animations under reduced motion
- No avoid_words from brand kit appear anywhere in copy: "spooky", "scary", "horror", "grim", "gloomy", "morbid", "creepy", "eerie", "haunted", "terrifying", "synergy", "leverage", "utilize", "robust", "awesome" — none found across all 9 HTML pages
- Brand opposites avoided: no Halloween horror, no gore, no cold/minimalist styling detected; site is warm dark palette throughout
- Border-radius scale matches brand kit: `--radius-sm: 4px`, `--radius-md: 8px`, `--radius-lg: 16px`, `--radius-xl: 24px`, `--radius-pill: 999px` at `base.css:100-104`
- Skip link present at `base.css:218-237` and rendered in all HTML pages

## ⚠️ Concerns (non-blocking)

- `Cinzel Decorative` tracking is `0.04em` in `theme.css:151` for `.hero h1`, but the brand kit's `typography_rules` specify `0.08em` for Cinzel Decorative display text. The `display` utility class in `theme.css:33` correctly sets `letter-spacing: 0.08em`, but the hero H1 overrides it to `0.04em` — reduced from the spec, diluting the ceremonial breathing room the brand requires
- The hero wordmark on `index.html:149` uses Cinzel Decorative at `0.04em` tracking (`theme.css:151`). Brand kit requires `0.08em` for display type to "breathe". This is a divergence from the ceremonial grandeur the brand specifies
- Focus ring in `base.css:240-244` uses `outline-offset: 2px` but brand kit specifies `outline-offset: 2px` with `box-shadow: 0 0 0 4px rgba(255,184,0,0.25)` — the CSS has this outer glow but it's only applied via `:focus-visible`, not as the primary focus indicator design. Implementation is functionally correct but the glow intensity may not match the marigold spec exactly
- Font files are commented-out placeholders in `theme.css:16-27` — no self-hosted WOFF2 fonts shipped in the kit. Site falls back to system serif/sans-serif stacks. While readable, this means the brand's distinctive Cinzel Decorative and Playfair Display typefaces are absent, weakening brand identity significantly
- `components.css:490-514` defines a `candleflicker` keyframe animation but it is never applied to any element in the HTML. The brand kit's `header_motif` specifies "Slow candlelight flicker animation on the hero wordmark, warm amber glow pulsing" — this motif is completely absent from the site

## ❌ Failures (must fix this round)

- **`index.html:6`, `features.html:6`, `clients.html:6`, `download.html:6`, `about.html:6`, `docs.html:6`, `hub.html:6`, `plugins.html:6`** — Page `<title>` elements are generic "Phlix — Remember. Celebrate. Live." / "Features — Phlix" / etc. None incorporate the Día de Muertos brand name or identity. The brand kit's `name` is "Día de Muertos" and the site should reflect that identity. A user visiting this brand-kit site sees no indication it is a Día de Muertos branded experience — the title is indistinguishable from any other Phlix page. Required: page titles should include "Día de Muertos" or the Phlix brand name in a way that signals the variant. E.g., "Phlix — Día de Muertos" or "Phlix: Remember. Celebrate. Live. (Día de Muertos)"
- **All 9 HTML pages** — The site copy is entirely generic Phlix product marketing. Not a single instance of the brand kit's `vocabulary` words ("marigold", "altar", "celebrate", "honor", "return", "glow", "petals", "beloved", "story") appears in any page's visible copy. Not one Día de Muertos greeting from `greetings` appears ("Welcome back. Your stories are waiting.", "The altar is lit. Time to remember and celebrate."). The `tagline_primary` "Remember. Celebrate. Live." appears in the index title but not in body copy. The `empty_state_messages` are never used. The site feels like a generic tech product page wearing a Día de Muertos color skin — the soul of the brand is entirely absent. Required: all visible copy should be rewritten to use brand vocabulary, greetings, and voice. The hero eyebrow "Self-hosted media server" should be something culturally resonant with the Día de Muertos theme
- **All 9 HTML pages** — Zero signature elements from the brand kit appear anywhere in the site. The brand kit's `signature_elements` list includes: "Papel picado geometric cut-paper patterns as surface overlays and dividers", "Marigold petal scatter animations and decorative borders", "Sugar skull motifs in icon treatments", "Candle flame micro-animations on loading states", "Ofrenda layered-shelf composition", "Intricate floral mandala patterns in background textures", "Catrina silhouette in illustration and empty states". None of these appear in the site. While there is a `.papelpicado-divider` in `theme.css:712-720` with an inline SVG data URI, it is only used once on the hero of index.html and nowhere else. No Catrina mascot, no marigold petal loaders on initial page load, no candle flame micro-animations, no sugar skull motifs, no ofrenda-layered compositions. The site has the color palette of Día de Muertos but none of its soul
- **`theme.css:107-111`** — Font stack fallbacks use incorrect casing: `'Lora', palatino, georgia, serif` (lowercase `palatino`) and `'IBM Plex Sans', 'Helvetica Neue', system-ui, sans-serif` (lowercase `sans-serif`). Brand kit specifies `'Lora', Palatino, Georgia, serif` and `'IBM Plex Sans', system-ui, Helvetica Neue, sans-serif`. While functionally equivalent for rendering, these deviate from the brand kit's exact specification and would fail a token-matching audit
- **`theme.css:151`** — Hero H1 uses `letter-spacing: 0.04em` for Cinzel Decorative. Brand kit `typography_rules` specify Cinzel Decorative tracking must be `0.08em`. This makes the display type feel cramped rather than ceremonial and breathing. Required: change to `0.08em`
- **`index.html:135`**, **`features.html:148`** — Feature card `<h3>` elements use `font-family: var(--font-headline)` (Playfair Display) but brand kit `do_dont.typography` says "Set body copy in Cinzel Decorative or Playfair Display" is a DON'T, and body copy should be Lora. Feature card titles are display text (product feature names), but they use Playfair Display while client-card titles use `.client-card-header h2` with `font-headline`. This is inconsistent — feature card titles (h3) and client card titles (h2) should both follow the same role. Currently feature card h3 uses Playfair Display and client card h2 uses Playfair Display, which is acceptable for display headlines but should be reviewed for consistency with Cinzel Decorative where ceremonial display is appropriate

## Recommendations (ranked by impact)

1. Rewrite ALL visible copy to use Día de Muertos brand vocabulary, greetings, and celebratory voice (impact: high, effort: high) — this is the single most critical brand fidelity failure
2. Add Catrina mascot SVG to loading states and empty states per brand kit mascot spec (impact: high, effort: medium)
3. Add papel picado pattern overlays to feature card surfaces and section dividers throughout site (impact: high, effort: medium)
4. Add candle flame flicker animation to hero wordmark per `header_motif` spec (impact: medium, effort: low)
5. Fix Cinzel Decorative hero tracking from `0.04em` to `0.08em` (impact: medium, effort: low)
6. Add marigold petal fall loader to initial page load for returning visitors or first-time users (impact: medium, effort: low)
7. Ship self-hosted WOFF2 font files and uncomment `@font-face` declarations in `theme.css:16-27` (impact: medium, effort: medium)

## Evidence

- Brand kit: `brand-kits/dia-de-muertos.js:106` tagline_primary, `brand-kits/dia-de-muertos.js:810` vocabulary list, `brand-kits/dia-de-muertos.js:153-161` signature_elements, `brand-kits/dia-de-muertos.js:444-448` typography rules, `brand-kits/dia-de-muertos.js:520-537` mascot definition
- CSS tokens: `sites/dia-de-muertos/css/base.css:65-143`
- Font stacks: `sites/dia-de-muertos/css/theme.css:107-111`
- Hero typography: `sites/dia-de-muertos/css/theme.css:147-156`
- Papelpicado divider only used on index hero: `sites/dia-de-muertos/index.html:134-137`
- Searched all HTML files for "marigold", "altar", "ofrenda", "catrina", "cempasuchil" — zero matches across all 9 pages
