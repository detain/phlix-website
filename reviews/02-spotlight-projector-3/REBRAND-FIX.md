# REBRAND-FIX: 02-spotlight-projector-3

## Summary
Fixed misbranding that used the wrong "Midnight Gallery" theme instead of the correct "Film Noir" brand kit.

## What Was Wrong

### Brand Identity
- **Wrong theme**: "Midnight Gallery — Ultra-dark museum elegance, soft ambient light, restrained antique gold"
- **Correct theme**: "Film Noir — High contrast B&W with selective gold color, moody shadow play"

### CSS Variables (base.css)
| Wrong Variable | Wrong Value | Correct Variable | Correct Value |
|---------------|--------------|--------------------| ---------------|
| `--color-deep-black` | `#0a0a0c` | `--color-deep-black` | `#000` |
| `--color-museum-white` | `#faf9f6` | `--color-warm-white` | `#FFF7E6` |
| `--color-antique-gold` | `#c9a84c` | `--color-gold-spotlight` | `#F5C542` |

### Fonts (base.css)
| Element | Wrong Font | Correct Font |
|---------|------------|--------------|
| Headlines | Cormorant | Cinzel |
| Body | Cormorant | Lora |
| Code | (missing) | Fira Code |

### CSS Variable References Updated
- All `var(--color-museum-white)` → `var(--color-warm-white)`
- All `var(--color-antique-gold)` → `var(--color-gold-spotlight)`

### Theme Description Comments
- theme.css header: "Midnight Gallery" → "Film Noir"
- components.css header: "Midnight Gallery" → "Film Noir"
- base.css header: "Midnight Gallery" → "Film Noir"

## Files Modified
- `variants/02-spotlight-projector-3/css/base.css` — Color tokens, fonts, semantic aliases
- `variants/02-spotlight-projector-3/css/theme.css` — CSS variable references, header comment
- `variants/02-spotlight-projector-3/css/components.css` — CSS variable references, header comment

## Correct Brand Kit (shared/data/brand-kits.json)
```json
{
  "name": "Spotlight Projector V3 — Film Noir",
  "colors": {
    "primary": { "gold_spotlight": "#F5C542", "deep_black": "#000000", "warm_white": "#FFF7E6" },
    "secondary": { "burgundy": "#7A1F1F", "soft_shadow_gray": "#3A3A3A" },
    "accent": { "amber_glow": "#FFB84D" }
  },
  "fonts": { "headline": "Cinzel Bold", "body": "Lora Regular", "ui": "Source Sans Pro", "code": "Fira Code" }
}
```

## Verification
- Build: `npm run build` — Passed (30 variants built)
- Lint: `npm run lint` — Passed (pre-existing rgba issues in multiple variants, not related to this fix)
