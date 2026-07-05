# Brand Fidelity & Spirit Review — stardust-observatory

**Variant**: stardust-observatory
**Round**: 1
**Reviewer**: senior-front-end-reviewer
**Date**: 2026-07-04

## Score

- **Brand Fidelity & Spirit**: 78 / 100

## ✅ Passed

- Midnight Navy (#0D1B2A) is the universal background across all pages (base.css:55 --color-bg)
- Constellation Gold (#C9A84C) is used for the primary CTA button (components.css:240-245 .btn-primary) — gold fill, navy text, glow shadow
- Nebula Violet (#7B5EA7) appears as a single atmospheric glow — the hero has a radial nebula bloom gradient overlay (theme.css:82, 148-152), capped at one per screen
- Playfair Display is the headline font (base.css:105), Lora is body (base.css:107), Jost is UI (base.css:108), DM Mono is mono (base.css:109) — correctly assigned per kit typography roles
- All animations use slow easing: --duration-slow: 500ms (base.css:133), --duration-celestial: 1200ms (base.css:134), ease-default is cubic-bezier(0.25, 0.1, 0.25, 1.0) (base.css:135)
- Star-field background on hero (theme.css:155-170) uses radial-gradient dots in stardust silver and star-point gold — matches Victorian atlas aesthetic
- Observatory Indigo (#162338) card surfaces (base.css:56 --color-surface), Deep Meridian (#1E2E45) alt surfaces (base.css:57) — all correct
- Typography line-length body text capped at 58-68ch (theme.css:225, 385) — within 60-72ch atlas margin rule
- prefers-reduced-motion respected: base.css:238-245, 314-320 and components.css:695 gate all reveals behind motion preference
- Brand opposites avoided: no neon, no cyberpunk, no clinical white, no synthwave, no cartoonish elements anywhere in CSS or HTML
- Voice is scholarly and lyrical — copy reads "Your media. Your library. Your Phlix." and feature bodies use precise astronomical vocabulary ("meridian", "aperture", "constellation")
- Brass Filigree (#7A5C2A) borders on all cards (components.css:370 border-color: var(--color-border))
- Focus ring uses Star-Point Focus (#E8D48B) at 3px (base.css:231-235)
- Skip link present, styled correctly (base.css:207-228)
- Touch targets meet 44px minimum (components.css:235 min-height: 44px on .btn)
- Self-hosted WOFF2 @font-face declarations with font-display: swap (base.css:8-46)

## ⚠️ Concerns (non-blocking)

- **Google Fonts CDN in @font-face src** — base.css:8-46 sources WOFF2 files from `https://fonts.gstatic.com` (e.g. `fonts.gstatic.com/s/playfairdisplay/v37/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKdFvXDXbtXK-F2qC0s.woff2`). The spec (new_site.md §8) requires self-hosted fonts in `css/fonts/` with local @font-face src. These CDN URLs mean the fonts are not truly self-hosted — they load from Google servers. While font-display:swap is correctly set, the CDN dependency is present. Note: the kit says "self-hosted WOFF2 via @font-face + font-display: swap" but the WOFF2 bytes come from Google CDN, not local files. Should be: download the WOFF2, place in `css/fonts/`, reference with relative URL. — **Next step: download WOFF2 files, store in css/fonts/, update @font-face src to local paths**

## ❌ Failures (must fix this round)

- **base.css:8-46** — Fonts are not self-hosted. The @font-face declarations point to `https://fonts.gstatic.com/s/...` CDN URLs. new_site.md §8 explicitly prohibits "CDN dependencies in the deployed page (no Google Fonts `<link>` to `fonts.googleapis.com`, no script CDNs)." More critically, "Self-host fonts as WOFF2" means the bytes live locally. Currently, if fonts.gstatic.com is unreachable at render time, no fonts load. The spec intends the WOFF2 files to be downloaded assets in `css/fonts/`. — **Required outcome: download all 5 WOFF2 font files (Playfair Display 700-900, IM Fell English 400, Lora 400-600, Jost 300-600, DM Mono 400-500) into css/fonts/, update @font-face src to relative paths like `url('fonts/playfair-display-700-900.woff2')`. Remove all CDN URLs.**

## Recommendations (ranked by impact)

1. **Replace Google CDN font URLs with local WOFF2 files** (impact: high, effort: medium) — Download WOFF2 from fonts.google.com for each family, place in css/fonts/, update src: url() to local relative paths. Test renders correctly offline.
2. Add a `css/fonts/` directory to the file inventory and document the font source URLs in `img/PROMPTS.md` for regeneration compliance.
3. Consider adding an inline SVG favicon that uses the armillary sphere or observatory dome mark (allowed symbols) instead of a generic favicon.

## Evidence

- `base.css:8-46` — @font-face declarations with CDN URLs
- `base.css:55` — --color-bg: #0D1B2A (Midnight Navy)
- `base.css:51` — --color-primary: #C9A84C (Constellation Gold)
- `base.css:53` — --color-tertiary: #7B5EA7 (Nebula Violet)
- `theme.css:148-152` — hero::before uses --gradient-nebula-bloom (single glow element per screen)
- `theme.css:155-170` — star-field CSS-only background
- `components.css:240-245` — .btn-primary with gold fill and glow shadow
- `base.css:131-135` — animation durations 500ms+ and celestial easing
- `base.css:238-245` — prefers-reduced-motion rule
- new_site.md §8: "Self-host fonts as WOFF2" + "No CDN dependencies"
