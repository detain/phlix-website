# Brand fidelity & spirit Review — Cyber Tokyo

**Variant**: cyber-tokyo
**Round**: 1
**Reviewer**: Senior Front-End Code Reviewer
**Date**: 2026-07-01

## Score

- **Brand Fidelity & Spirit**: 72 / 100

## ✅ Passed

- All CSS color tokens trace to the kit: `--color-primary: #FF00AA` (Neon Sakura), `--color-secondary: #00FF41` (Circuit Green), `--color-tertiary: #FF6600` (Neon Mandarin), `--color-bg: #050308` (Tokyo Night), `--color-surface: #0D0918` (Shinjuku Dark), `--color-surface-alt: #130E20` (Kabukicho Shadow), `--color-text: #F0EEF8` (Screen White), `--color-neutral: #6B5C7C` (Smoke Violet), `--color-border: #2D1F3D` (Neon Wire) — all match `cyber-tokyo.js` §6 exactly.
- All font stacks match kit §7: `Space Grotesk` for headlines, `Bebas Neue` for display, `IBM Plex Sans` for body/UI, `IBM Plex Mono` for mono.
- All border-radius values match kit §8: `--radius-sm: 2px`, `--radius-md: 4px`, `--radius-lg: 6px`, `--radius-xl: 10px`.
- All spacing scale steps match kit §6: 4, 8, 12, 16, 24, 32, 48, 64, 96px.
- Brand opposites avoided: no warm/cream backgrounds, no quiet/moody copy, no Western noir framing, no pastel colors.
- Primary CTA uses Neon Sakura `#FF00AA` with Tokyo Night text `#050308` — exactly as kit §6/§22 dictate.
- Hero eyebrow uses IBM Plex Mono (circuit-green) per kit's mono role.
- Circuit Green used for secondary accents, borders-left on pitch bullets, and circuit dividers — consistent with kit's secondary-path definition.
- `prefers-reduced-motion` respected in both `base.css` (line 236–242) and `main.js` (line 6, line 38, line 61).
- No avoid_words from kit §15 present in any HTML: no "cozy", "warm", "quiet", "restful", "mellow", "noir", "detective", "synergy", "leverage", "utilize", "robust", "awesome", or "amazing".

## ⚠️ Concerns (non-blocking)

- **Missing kanji/katakana decorative text**: Kit §4 explicitly calls for "kanji and katakana letterforms as valid visual texture, not decorative cliché" and §900 says "vertical kanji text as decorative column elements is approved on hero and feature sections." The hero has zero Japanese text and no vertical kanji columns. This is a significant missed brand signature element — the site would feel more like Cyber Tokyo with even a decorative kanji watermark or katakana accent. — Consider adding at minimum a decorative vertical kanji text column in the hero background.
- **`og.png` reference vs `og.svg` source**: All HTML pages reference `og.png` but only `og.svg` exists in `img/`. The site scaffolding spec §8 requires `og.png` (1200×630 raster). If a build step rasterizes `og.svg` → `og.png`, fine; if not, social previews will break. — Verify the build pipeline rasterizes `og.svg` to `og.png`.
- **Font WOFF2 files unreferenced in directory**: `theme.css` lines 4–45 declare `@font-face` for self-hosted WOFF2 files at `../fonts/`. The `fonts/` directory was not found in the site folder. The build must supply these WOFF2 files or fonts will fail to load and fall back to system fonts, breaking the brand typography entirely. — Ensure the build pipeline copies or generates `fonts/SpaceGrotesk-*.woff2`, `fonts/BebasNeueRegular.woff2`, `fonts/IBMPlexSans-*.woff2`, `fonts/IBMPlexMono-*.woff2`.

## ❌ Failures (must fix this round)

- **`theme.css:165–172` — Scan-line overlay on hero**: The kit §900 lists "pixel-grid scan-line overlays at low opacity" as a signature element, and §4's page_generation_rules says "Glitch effects and scan-line overlays are approved decorative elements." The `theme.css` scan-line animation `scanline-scroll` is defined (line 520–522) but never applied. The hero `::after` pseudo-element (line 160–173) has a scan-line gradient but the animation is not applied to it. — Apply `animation: scanline-scroll 8s linear infinite` to the hero's `::after` pseudo-element with `opacity: 0.4` to complete the approved signature element.

## Recommendations (ranked by impact/effort)

1. **Add scan-line animation to hero `::after`** (impact: high, effort: low) — One CSS property on `.hero::after { animation: scanline-scroll 8s linear infinite; }`. Completes an approved signature element. File: `css/theme.css:173`.
2. **Add decorative kanji/katakana text column in hero** (impact: medium, effort: medium) — Add a `<span aria-hidden="true" class="kanji-column">東京</span>` positioned absolutely in the hero background with vertical writing mode. Requires careful CSS positioning but is a direct kit signature element from §4 and §900. File: `index.html` + `css/theme.css`.
3. **Verify WOFF2 font pipeline** (impact: high, effort: medium) — Confirm the build supplies `fonts/` directory. If not present, brand typography silently degrades to system fonts. File: build pipeline / `theme.css:4-45`.
4. **Verify `og.png` rasterization** (impact: medium, effort: low) — Check build pipeline converts `og.svg` → `og.png` or add `og.png` explicitly. File: all HTML `<head>`.

## Evidence

- `grep -r "#FF" /home/sites/phlix/phlix-website/sites/cyber-tokyo/css/` — all hex values found as CSS variables in `base.css:12-25`.
- `grep -r "Space Grotesk\|Bebas Neue\|IBM Plex" /home/sites/phlix/phlix-website/sites/cyber-tokyo/css/` — found in `base.css:67-71` and `theme.css:47-82`.
- `grep -E "cozy|warm|quiet|restful|mellow|noir|detective|synergy|leverage|utilize|robust|awesome|amazing" /home/sites/phlix/phlix-website/sites/cyber-tokyo/*.html` — zero matches.
- `ls /home/sites/phlix/phlix-website/sites/cyber-tokyo/fonts/` — directory not found.
- `ls /home/sites/phlix/phlix-website/sites/cyber-tokyo/img/` — `og.svg` found, `og.png` not found.
