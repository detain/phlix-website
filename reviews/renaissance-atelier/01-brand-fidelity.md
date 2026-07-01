# Brand Fidelity & Spirit Review — Renaissance Atelier

**Variant**: renaissance-atelier
**Round**: 1
**Reviewer**: adversarial-reviewer-batch1
**Date**: 2026-07-01

## Score
- **Brand Fidelity & Spirit**: 78 / 100

## ✅ Passed

- All 6 palette colors trace exactly to the kit: `#2B4A8C` lapis, `#A0522D` sienna, `#C8971A` ochre, `#F4ECD8` parchment, `#FAF4E4` vellum, `#3D1F0A` underdrawing (`css/base.css:69-88`)
- Typography roles match the kit: Cormorant Garamond headlines, EB Garamond body, Libre Baskerville UI, Courier Prime mono (`css/base.css:116-121`)
- Warm umber-tinted shadows throughout — `rgb(44, 26, 14, N)` — no cool grey/blue-black anywhere
- Border color `#3D1F0A` (underdrawing brown) used consistently on all cards, inputs, code-blocks
- Animation speeds follow the kit's slow/deliberate philosophy: `duration-sfumato: 600ms`, `duration-slow: 350ms`, `easing-in-out` throughout (`css/base.css:137-143`, `js/main.js:72-88`)
- Scroll-reveal uses `IntersectionObserver` gated behind `prefers-reduced-motion` (`js/main.js:37-64`)
- Hero candle-bloom fade-in entry (800ms) matches kit's "slow reveal from darkness" transition principle
- `.reveal` class with sfumato cross-dissolve (600ms) honors kit's "Sfumato in UI means transitions that dissolve, never cut" (`components.css:730-747`)
- No neon, cyberpunk, flat geometric icons, or Swiss modernism detected anywhere on the site
- `prefers-reduced-motion` disables all scroll reveals and hero animation (`js/main.js:37,742-747`)
- Archetype-adjacent voice: "Your media. Your library. Your Phlix." — patron/creator framing rather than casual/tech-bro
- `design_principles` honored: single dominant hero element, golden-ratio spiral via `clamp()` type scaling, warm/lapis contrast, no competing master elements per page
- Icon style: 1.5px stroke, duotone-primary (lapis), hand-drawn feel via organic SVG paths — all match `icon_rules`
- `brand_opposites` avoided: no minimal-cold Swiss, no neon/synthwave, no glossy corporate, no playful/cartoonish, no flat material sterility

## ⚠️ Concerns (non-blocking)

- **og.svg renders as SVG** but meta declares `og:image` without explicit `.png` — `new_site.md:297` prefers a rasterized `og.png`. Minor spec deviation; SVG og:image does render in practice. — *Non-blocking but worth correcting to match spec exactly.*
- **`body { font-feature-settings: 'onum' 1 }`** (`base.css:165`) enables oldstyle numerals site-wide. Kit lists "oldstyle numerals" as a usage for `number` font role only. Displaying them in body copy is a mild deviation but not jarring. — *Acceptable, low impact.*
- Feature-card h3 uses `font-ui` (Libre Baskerville) rather than `font-headline` (Cormorant Garamond) (`components.css:382-388`). Kit specifies Cormorant Garamond for all headlines; UI font on a card heading is a typographic inconsistency. — *Low severity — small text, legible, but technically off-spec.*

## ❌ Failures (must fix this round)

- **`index.html:33`** — `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>` and no `<link>` for Google Fonts stylesheet. Wait — the `<link rel="stylesheet">` for CSS is present but **no Google Fonts `<link>` is present** on any page. However, the self-hosted `@font-face` declarations at `css/base.css:12-50` reference WOFF2 files at `css/fonts/*.woff2` paths. These font files do not exist in the `css/fonts/` directory. The build spec (`new_site.md:84-87`) prohibits CDN font dependencies and requires self-hosted WOFF2, but the WOFF2 files referenced by `@font-face` are not present in the site. This means **all custom fonts will fail to load**, falling back to the generic fallback stacks. — *Required outcome: Either add the self-hosted WOFF2 font files to `css/fonts/` OR serve them via a local route, to make the `@font-face` declarations functional.*

## Recommendations (ranked by impact)

1. **(impact: critical, effort: medium)** Add self-hosted WOFF2 font files to `css/fonts/` — the 5 font families declared in `css/base.css:12-50` must have corresponding binary files. This is a functional brand fidelity blocker since all text will render in fallback serif stacks.
2. **(impact: medium, effort: low)** Add `<?xml` declaration to `sitemap.xml` (currently starts at line 1 with no XML declaration).
3. **(impact: low, effort: low)** Change feature-card h3 from `font-ui` to `font-headline` (`components.css:383`) to align with "Cormorant Garamond for every headline, always."

## Evidence

- Color tokens verified against `renaissance-atelier.js:218-383` — exact hex match.
- Font tokens verified against `renaissance-atelier.js:399-458` — family, weight, and role match.
- avoid_words scan: all 12 words (`binge`, `stream`, `disrupt`, `leverage`, `synergy`, `content`, `seamless`, `robust`, `cutting-edge`, `clickbait`, `viral`, `algorithm`) — **zero occurrences** across all 8 HTML pages (grep -i scan confirmed).
- Fonts directory check: `ls /home/sites/phlix/phlix-website/sites/renaissance-atelier/css/fonts/` returned "no such file or directory."
- Self-hosted `@font-face` declarations present at `css/base.css:12-50` but broken due to missing WOFF2 files.
