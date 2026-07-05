# BUILD_LOG.md — street-mural Brand Kit Site

## What was built
- **8 HTML pages**: index, features, clients, download, plugins, docs, hub, about
- **3 CSS files**: base.css (tokens/reset/@font-face), theme.css (type/layout), components.css (header/footer/buttons/cards/badges)
- **1 JS file**: js/main.js (mobile nav, reduced-motion, scroll reveals)
- **8 WOFF2 fonts** in css/fonts/ (self-hosted, font-display: swap)
- **5 image assets**: logo.svg, favicon.svg, og.svg, PROMPTS.md (image generation prompts)
- **2 config files**: robots.txt, sitemap.xml
- **2 doc files**: SITE.md, BUILD_LOG.md

## Layout archetype
**Immersive / Kinetic** — Full-bleed concrete hero, kinetic asymmetric sections, dominant focal elements, heavy visual weight. Asymmetric and commanding — not centered and timid.

## Color palette used
- Background: `#2B2B2B` (Raw Concrete)
- Surface: `#383838` (Weathered Concrete)
- Surface alt: `#1E1E1E` (Charcoal Block)
- Primary: `#E81F1F` (Spray-Can Red)
- Secondary: `#0066FF` (Electric Blue)
- Tertiary/Focus: `#FFD600` (Vivid Yellow)
- Chrome: `#C0C0C0` (Chrome Silver)
- Border/Tag: `#0D0D0D` (Tag Black)
- Text: `#F0F0F0` (White Fill)

## Typography used
- Headlines: Anton (Impact fallbacks) — ALL CAPS, 0.04em tracking, 0.92 line-height
- Display: Boogaloo — for personality accents only
- Body: Barlow Condensed 400/600 — 1.55 line-height, 0.01em tracking
- UI: Barlow 400/600/700 — navigation, labels, buttons
- Mono: Share Tech Mono — code blocks

## Intentional deviations from new_site.md
- SVG icons use inline stroke-based approach; 7 feature icons rendered as inline SVG.
- og.png is SVG-sourced; referenced as og.svg → og.png in meta (deferred rasterization acceptable per new_site.md).
- Container max-width 1440px (per brand kit `responsive_behavior.desktop`) vs spec's 1400px — kit override is intentional.
- Hero gradient uses kit's `chrome-shine` (`linear-gradient(90deg, #888, #F0F0F0, #888)`) instead of custom warm gradient.
- "Ecosystem" section heading renamed to "Tools" (avoid_word per kit's `avoid_words` list).

## Review loop fixes applied
Round 1 → Round 2 fixes:
- Google Fonts CDN `<link>` removed from all 8 HTML pages
- Nav toggle 40×40px → 44×44px (WCAG touch target)
- `max-width: 65ch` added to `.pitch-list li`, `.feature-card p`, `.faq-item dd`
- Hero gradient changed to kit's chrome-shine
- "Ecosystem" → "Tools" (avoid_word removal)
- `@font-face` declarations with `font-display: swap` added to base.css

Round 2 → Round 3 fixes:
- Self-hosted WOFF2 fonts downloaded from Fontsource (jsdelivr CDN), placed in css/fonts/
- 8 WOFF2 files: Anton, Boogaloo, Barlow Condensed (400/600), Barlow (400/600/700), Share Tech Mono

## Known follow-ups
- Rasterize og.svg to proper 1200×630 PNG for OG sharing (SVG source exists)
- When rendering pipeline available, replace SVG hero art with photographic concrete-wall imagery per art_direction spec
- Cap mascot not featured in initial build (per kit: optional); could appear in future seasonal variant
