# Brand Fidelity & Spirit Review — Desert Horizon

**Variant**: desert-horizon
**Round**: 1
**Reviewer**: adversarial-brand-fidelity
**Date**: 2026-07-01

## Score

- **Brand Fidelity & Spirit**: 84 / 100

## ✅ Passed

- All 6 brand palette colors correctly declared in `:root` CSS custom properties with exact kit hex values: terracotta `#C2542A` (base.css:27), mesa turquoise `#2A8C82` (base.css:28), sunset coral `#E07050` (base.css:29), sandstone `#F2E4C8` (base.css:31), adobe dust `#FAF0DC` (base.css:32), burnt umber `#2E1A0E` (base.css:34). No off-palette values found anywhere.
- All 3 brand gradients correctly implemented: `--gradient-golden-horizon` (base.css:56), `--gradient-mesa-dusk` (base.css:57), `--gradient-turquoise-wash` (base.css:58-62).
- All 5 font families correct: Playfair Display headline (base.css:83), Arvo display (base.css:84), Lora body (base.css:85), Source Sans 3 UI (base.css:86), IBM Plex Mono mono (base.css:87) — with proper fallbacks.
- Navajo geometric strip dividers present on hero (`theme.css:119-139`), CTA banner (`theme.css:290-310`), site header (`components.css:30-50`), site footer (`components.css:654-670`), and a reusable `.najo-strip` class (`theme.css:553-566`). Correctly uses terracotta + turquoise + coral + umber repeat pattern.
- Shadow color is warm umber-tinted throughout: `rgba(92, 46, 20, 0.16)` (sm), `rgba(92, 46, 20, 0.20)` (md), `rgba(92, 46, 20, 0.26)` (lg) — not grey or black (`base.css:90-92`).
- Feature card icons use 2px stroke with `stroke-linecap: round` and `stroke-linejoin: round` (`index.html:177`, `index.html:198-200`, etc.).
- Transition timing: `--transition-base: 300ms ease-out` (`base.css:100`), `--transition-slow: 500ms cubic-bezier(0.25, 0.8, 0.25, 1)` (`base.css:101`) — slow and deliberate per kit.
- Scroll reveal animation at 600ms with `ease-out` (`components.css:799-800`).
- Body text `max-width: 70ch` (`theme.css:40`) — within the kit's 60–72ch range.
- No italic headlines; weight contrast used instead (e.g., `h1 { font-weight: 900 }`, `base.css:172`).
- Hero uses Playfair Display (via `font-headline` token) — no geometric sans-serif in hero type.
- No forbidden brand voice words found in body copy: no "leverage", "synergy", "utilize", "disrupt", "cutting-edge", "robust", "seamless", "unlock", or "empower" anywhere in the site.
- Brand opposites avoided: warm earthy palette throughout, no neon, no cyberpunk, no corporate grey, no minimalist-cold styling detected.
- `prefers-reduced-motion` respected with `0.01ms` transitions (`base.css:273-277`) and reveal animations disabled (`components.css:808-814`).
- Focus ring uses turquoise `#2A8C82` (`base.css:223`) with 3px outline and 2px offset per kit's accessibility spec.
- Scrollbar thumb uses `--color-umber` (`base.css:255`), consistent with warm umber theme.

## ⚠️ Concerns (non-blocking)

- **Feature card icon subjects are generic** — the 8 feature icons (hamburger list, clock, ECG polyline, shield, cross pattern, orbital dots, puzzle piece, sunburst) don't follow the kit's directive that "Icon subjects lean Southwest: cacti, arches, mesas, pottery, woven diamonds." These are functional/label icons carried verbatim from `content.json`, not brand-specific. The technical execution (2px stroke, rounded caps) is correct, but the subjects miss the Southwest spirit. — *Impact on brand personality is real but recognized as a structural constraint of shared content icons; no easy fix without breaking content.json contract.*
- **`"ecosystem"` appears twice in copy** — `plugins.html:123` ("As the ecosystem grows…") and as a section heading on `download.html:177`. The kit's `avoid_words` list explicitly includes "ecosystem." Note: this section heading and body text come from `content.json`'s `ecosystem[]` key, which is shared across all brand-kit sites per the content contract — so fixing it requires a `content.json` revision rather than a per-site fix. The CSS class name `.ecosystem-list` does not constitute a voice violation. — *Root cause is shared-content, not site-specific; recommend revising content.json to use "related projects" or "tools" instead.*
- **Feature icon stroke weight is 1.75px** — `features.html` icon SVGs use `stroke-width="1.75"` (e.g., `features.html:125`), while the kit calls for exactly "2px stroke weight." `index.html` feature-cards correctly use `stroke-width="2"`. The inconsistency is across the two icon sizes. — *Subtle visual discrepancy; 1.75px vs 2px is nearly imperceptible but not spec-compliant.*
- **`footer-tagline` is generic boilerplate** — the footer uses `"Open-source media, on your terms."` from `content.json`. While brand-appropriate in tone (not in the avoid_words list), it doesn't carry Southwest voice. The kit's `greetings` and `empty_state_messages` suggest more brand-native copy could be used for micro-text like footer taglines. — *Low impact on brand spirit; the string is contractually required from content.json.*

## ❌ Failures (must fix this round)

- **No critical brand fidelity failures found.** The site largely honors the Desert Horizon kit. All colors, fonts, Navajo strips, shadow warmth, and transition timing are spec-compliant. No forbidden words appear in brand copy. Brand opposites are avoided.

## Recommendations (ranked by impact)

1. **Replace feature icon subjects with Southwest-themed alternatives** (impact: medium, effort: high) — Since the feature icons are defined per `content.json` and shared across all brand kits, this requires either: (a) adding Southwest-themed SVG icons keyed to the feature `id` in each site's `img/` folder, or (b) proposing a `content.json` change. Option (a) is the less disruptive path: add a `desert-horizon-icon-library` map to `SITE.md` and swap the inline SVGs with `<img>` references to brand-specific assets. Priority for icons: library (saguaro book), syncplay (mesa clock tower), transcode (cactus signal), auth (turquoise shield), livetv (antenna yucca), dlna (pottery投), plugins (Navajo diamond), hub (horizon sun).
2. **Revise "ecosystem" heading in download.html** (impact: medium, effort: low) — While the section title and body come from `content.json`, the brand-specific page copy around it ("The plugin contract makes it easy…") on `plugins.html:123` can be rewritten to avoid the word. Change "As the ecosystem grows" → "As more plugins are contributed." This is a one-line change in `plugins.html` that doesn't touch the required `content.json` contract.
3. **Fix stroke-width 1.75 → 2 on features.html detail icons** (impact: low, effort: low) — Change `stroke-width="1.75"` to `stroke-width="2"` in all 8 `.feature-detail-icon` SVG elements in `features.html:125` and surrounding lines.
4. **Self-host or embed Playfair Display for logo wordmark** (impact: low, effort: medium) — The logo SVG at `img/logo.svg:25` uses `font-family="Georgia, 'Rockwell', serif"` rather than declaring Playfair Display. If self-hosted WOFF2 fonts are available, reference them; if not, this is an acceptable fallback-chain usage and not a blocking failure given the site has no CDN font links (per spec §8).

## Evidence

- Color tokens verified against kit spec: `base.css:26-52` — all 15 semantic color roles match kit `design_tokens.color` exactly.
- Font tokens: `base.css:82-87` — Playfair Display headline, Arvo display, Lora body, Source Sans 3 UI, IBM Plex Mono mono — correct families, weights, and fallbacks.
- Navajo strip hero: `theme.css:119-139` — `repeating-linear-gradient` with terracotta/turquoise/coral/umber at 82px repeat.
- Navajo strip CTA: `theme.css:290-310` — similar pattern at 36px repeat with adobe/umber/turquoise.
- Navajo strip header: `components.css:30-50` — 52px repeat with 4 colors.
- Navajo strip footer: `components.css:654-670` — 40px repeat with terracotta/turquoise.
- Warm shadow proof: `base.css:90-92` — `rgba(92, 46, 20, ...)` — deep warm terracotta-brown, never grey.
- Transition timing: `base.css:100-103` — 300ms ease-out, 500ms slow, 150ms fast, matching "slow, deliberate" motion style.
- Body line length: `theme.css:40` — `max-width: 70ch`.
- No forbidden words: `grep -r "leverage|synergy|utilize|disrupt|cutting-edge|robust|seamless|unlock|empower" sites/desert-horizon/` returned zero content-word matches; only `.ecosystem-list` CSS class.
- `ecosystem` in body copy: `plugins.html:123` — "As the ecosystem grows, more plugins will be available from the community."
- `ecosystem` as heading: `download.html:177` — `<h2>Ecosystem</h2>` (from `content.json` contract).
- Feature icon stroke: `index.html:177` — `stroke-width="2"`. `features.html:125` — `stroke-width="1.75"` (concern).
- Logo font: `img/logo.svg:25-29` — uses Georgia serif, not Playfair Display.
