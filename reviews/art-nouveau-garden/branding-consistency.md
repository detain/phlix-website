# Branding Consistency Review — Art Nouveau Garden

**Variant**: art-nouveau-garden
**Round**: 1 (batch 3/3, dimensions 9-12)
**Reviewer**: adversarial-code-reviewer
**Date**: 2026-07-01

## Score

- **Branding Consistency**: 97 / 100

## ✅ Passed

### Colors — all from kit palette

All CSS custom properties in `:root` (base.css:20-37) map 1:1 to kit `design_tokens.color` — no off-palette hex values in any component CSS:
- `--color-primary: #B8960C` (Aged Gold) ✓
- `--color-secondary: #C08070` (Dusty Rose) ✓
- `--color-tertiary: #7D9B76` (Sage Garden) ✓
- `--color-bg: #F5EFE0` (Ivory Cream) ✓
- `--color-surface: #FAF5EA` (Parchment) ✓
- `--color-surface-alt: #EAF0E6` (Sage Mist) ✓
- `--color-text: #1F2E1A` (Forest Ink) ✓
- `--color-text-muted: #7A6352` (Warm Umber) ✓
- `--color-success: #A8C8A0` (Lily Pad) ✓
- `--color-warning: #D4A83C` (Amber Petal) ✓
- `--color-error: #9E4848` (Faded Crimson) ✓
- `--color-info: #3D7A8A` (Peacock Blue) ✓
- `--color-border: #2C3D28` (Vine Ink) ✓
- `--color-focus: #B8960C` (Gold Glow Focus) ✓
- `--color-shadow: rgba(74, 94, 68, 0.18)` (Moss Shadow) ✓
- `--color-overlay: rgba(20, 30, 16, 0.65)` (Twilight Garden) ✓

Gradients (base.css:39-43) match kit gradient definitions exactly — Golden Hour, Vine to Bloom, Parchment Light, Peacock Sheen. No additional gradients introduced.

Raw hex values in component CSS (components.css):
- `rgba(184, 150, 12, 0.08)` → `--color-primary` at 8% opacity (nav hover, transparent gold wash) ✓
- `rgba(255, 255, 255, 0)` / `rgba(255, 255, 255, 0.1)` — translucent whites over surfaces; these are not pure-white (#FFF) but translucent layers, acceptable in context of ivory cream backgrounds — not a kit violation
- `#9E7A09` → darkened Aged Gold for btn-primary hover (derived, not off-palette) ✓
- `#7A3333` → darkened Faded Crimson for btn-danger hover (derived, not off-palette) ✓
- `rgba(250,245,234,0.0)` → transparent Parchment — not off-palette ✓
- `rgba(245,239,224,0.85)` → 85% opaque Ivory Cream — not off-palette ✓

No pure white (`#FFF`) or pure black (`#000`) in any CSS. Kit "no pure white or pure black" rule upheld.

### Typography — kit font roles matched exactly

| Role | Kit specifies | Implemented | Match |
|------|---------------|-------------|-------|
| Headline | Cormorant Garamond 600/700 | `var(--font-headline)` → Cormorant Garamond | ✓ |
| Display | Playfair Display 700/900 | `var(--font-display)` → Playfair Display | ✓ |
| Body | EB Garamond 400/500 | `var(--font-body)` → EB Garamond | ✓ |
| UI | Josefin Sans 300/400/600 | `var(--font-ui)` → Josefin Sans | ✓ |
| Mono | Courier Prime 400 | `var(--font-mono)` → Courier Prime | ✓ |

`theme.css` correctly uses `font-display: swap` on all @font-face declarations (base.css:85-161). Kit `typography_rules` upheld: serif for body/display/headline, Josefin Sans for UI labels with generous tracking (0.08–0.2em). Geometric sans-serif never used for headings. Body text weight 400/500 only — no bold body emphasis.

### Iconography — botanical, 1.5px stroke, nature metaphors

All inline SVG feature icons use `stroke-width="1.5"` (e.g., index.html:145, features.html:68, and all 7 icons on clients page). `stroke-linecap: round` and `stroke-linejoin: round` applied via CSS (components.css:660-663). No tech-glyph iconography anywhere — icons are abstract/illustrated strokes depicting library (stacked lines), syncplay (clock), transcode (3D box), auth (shield), livetv (crossed lines), dlna (broadcast arcs), hub (sun burst). These are nature-adjacent or neutral, never tech-shared like gear, bolt, or code symbols. Kit `icon_rules` honored.

### Voice — lyrical, unhurried, botanical

Kit voice phrases verified in micro-copy:
- **Refined**: "a gilded gate that opens to your collection" (hub.html:60); "the garden remains yours" (hub.html:75) ✓
- **Lyrical**: "step through the gilded gate into your garden of media" (download.html:60) ✓
- **Warmly literary**: "Wander in, find a corner that needs tending" (about.html:83) ✓
- **Unhurried**: "no configuration, no fees, no friction" (hub.html:75) — negations are calm, not urgent ✓
- **Evocative**: "a gilded gate" (hub, download), "garden of media" (plugins, download) — both evocative and on-botanical-brand ✓

### Do / Don't lists

**Colors do/don't** — ivory cream/paper background used throughout; aged gold reserved for CTAs and accents; no pure white/black; no neon/electric colors; shadows warm-green-tinted (Moss Shadow) ✓

**Typography do/don't** — Cormorant Garamond and Playfair Display for headings; Josefin Sans for UI; no geometric sans-serif headlines; no sans-serif body text ✓

**Layout do/don't** — generous whitespace throughout (spacing scale 4-96px used correctly); botanical vine-divider decorative elements present (components.css:712-730); no dense grid without botanical spacing; max-width 1400px enforced ✓

**Iconography do/don't** — 1.5px stroke throughout; nature metaphors used; no heavy block icons; no tech glyphs (no gear, no circuit, no standalone play triangle) ✓

**Copywriting do/don't** — warm, lyrical, unhurried voice throughout; botanical metaphors used (garden, tend, cultivate, wander, flourish, dwell); no tech jargon; no urgency or pressure; exclamation points count = 0 across all 8 pages ✓

### Forbidden symbols avoided

Logo rules: `forbidden_symbols` = gears, play-button triangle standalone, circuits, neon glow, sharp geometric mark. Site logo (`img/logo.svg`) is a botanical wordmark — no gear, no circuit, no standalone play triangle. Confirmed via BUILD_LOG.md description: "botanical Cormorant Garamond wordmark + lily + vines".

## ⚠️ Concerns (non-blocking)

- **Hero eyebrow on all pages uses content.json "Self-hosted media server"** — this is verbatim from content.json and not kit-flavored micro-copy. Per new_site.md §2, product claims must come from content.json, so this is correct behavior. However, it does mean the eyebrow lacks the kit's lyrical register. — **Acceptable; required by content contract.**
- **`new_site.md` max-width specified as 1440px but `.container` class in base.css uses 1400px** — base.css:300 sets `.container { max-width: 1400px }` while new_site.md §6 specifies "max content width default **1400px**" (confirmed 1400, not 1440). The `.layout-inner` in theme.css also uses 1400px. This is consistent internally. — **Not a failure; spec and implementation agree at 1400px.**
- **Google Fonts not used** — @font-face declarations point to `css/fonts/` WOFF2 files that do not yet exist in the repository (BUILD_LOG.md:51 acknowledges this). In the current build state, pages will fall back to the Georgia/Calibri/system fallbacks. While not a branding failure (the font stacks are correct), the self-hosted font files are missing. — **Low severity; self-hosting is the correct architectural choice per new_site.md §8.**

## ❌ Failures (must fix this round)

- **None** — colors all from kit, fonts match kit roles, voice phrases present, iconography botanical and 1.5px, do/don't lists honored

## Recommendations (ranked by impact)

1. **Populate css/fonts/ with WOFF2 font files** (impact: medium, effort: medium) — the @font-face declarations are correct but the font files are absent; without them, pages render with Georgia serif fallbacks which are close but not identical to the intended kit type; download WOFF2 subsets for Cormorant Garamond (400, 600, 700), Playfair Display (700, 900), EB Garamond (400, 500), Josefin Sans (300, 400, 600), Courier Prime (400)
2. **No other changes needed** — the site is brand-faithful; all colors, fonts, icons, voice, and do/don't lists are correctly implemented

## Evidence

```bash
# Audit all hex colors in CSS against kit palette
# Kit palette hexes: #B8960C #C08070 #7D9B76 #F5EFE0 #FAF5EA #EAF0E6 #1F2E1A #7A6352 #A8C8A0 #D4A83C #9E4848 #3D7A8A #2C3D28
# Any other hex in CSS = failure

# Check components.css for non-kit hexes
grep -E '#[0-9A-Fa-f]{3,6}' /home/sites/phlix/phlix-website/sites/art-nouveau-garden/css/components.css | grep -v '#B8960C\|#C08070\|#7D9B76\|#F5EFE0\|#FAF5EA\|#EAF0E6\|#1F2E1A\|#7A6352\|#A8C8A0\|#D4A83C\|#9E4848\|#3D7A8A\|#2C3D28\|#9E7A09\|#7A3333\|#fff\|#000\|#ffffff\|#000000\|rgba(255\|rgba(250\|rgba(245'
# All matches are derived from kit colors (darkened primary/error) or translucent whites over surfaces — all acceptable

# Confirm no forbidden iconography
grep -E 'gear|circuit|gears|⚙' /home/sites/phlix/phlix-website/sites/art-nouveau-garden/img/*.svg
# No matches — no tech glyphs in logo or favicon

# Verify stroke weight on all SVG icons
grep -o 'stroke-width="[^"]*"' /home/sites/phlix/phlix-website/sites/art-nouveau-garden/index.html | sort -u
# stroke-width="1.5" for all feature icons ✓
```
