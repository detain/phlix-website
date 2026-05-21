# Rebrand Fix: 02-spotlight-projector-5

## Variant
**02-spotlight-projector-5 — Theatrical Drama**

## Issue Summary
Variant 02-spotlight-projector-5 was incorrectly branded as "Copper Luxe" instead of "Theatrical Drama" as defined in the brand kit.

## What Was Wrong

### Wrong Brand Identity
- **Incorrect Brand**: "Copper Luxe — Luxury theater, warm copper/bronze tones, intimate atmosphere"
- **Correct Brand**: "Theatrical Drama — Dramatic reveals, stage lighting effects, curtain parting motifs"

### Wrong Color Palette
| Element | Wrong (Copper Luxe) | Correct (Theatrical Drama) |
|--------|---------------------|---------------------------|
| Primary | #B87333 (copper) | #F5C542 (gold_spotlight) |
| Background | #0D0D0D (deep black) | #000000 (deep_black) |
| Text Primary | #F5E6D3 (warm cream) | #FFF7E6 (warm_white) |
| Secondary Text | #475569 (muted) | #3A3A3A (soft_shadow_gray) |
| Accent | #B87333 (copper) | #FFB84D (amber_glow) |
| Highlight | N/A | #7A1F1F (burgundy) |

### Wrong Font Stack
| Role | Wrong (Copper Luxe) | Correct (Theatrical Drama) |
|------|----------------------|----------------------------|
| Headline | Cormorant | Cinzel Bold |
| Body | Spectral | Lora Regular |
| UI | Spectral | Source Sans Pro |
| Code | N/A | Fira Code |

### CSS Variables Renamed
- `color-copper` → `color-gold-spotlight` (primary accent)
- `color-warm-cream` → `color-warm-white` (text primary)
- `color-deep-black` → `color-deep-black` (kept name, fixed hex value)
- `color-text` → removed (not in brand)
- `color-muted` → `color-text-secondary` (semantic alias to soft_shadow_gray)
- `shadow-copper-glow` → `shadow-gold-glow`
- `shadow-copper-glow-hover` → `shadow-gold-glow-hover`
- Added `color-burgundy` and `color-amber-glow` from brand kit
- Added `--font-code` for Fira Code

## Files Changed
1. `variants/02-spotlight-projector-5/css/base.css` - Complete rewrite of CSS variables and font declarations
2. `variants/02-spotlight-projector-5/css/theme.css` - Updated brand header comment, replaced copper color references with gold
3. `variants/02-spotlight-projector-5/css/components.css` - Updated brand header comment, replaced copper color references with gold

## Verification
- Build: `npm run build` - Passed (30 variants built successfully)
- Lint: `npm run lint` - Passed (no errors in changed files)
