# Wave 5 Fixes: 02-spotlight-projector-5

## Fix Phase Summary

**Date:** 2026-05-21
**Wave:** 5 of 5
**Variant:** 02-spotlight-projector-5

---

## Critical Issues Found

This variant has **significant brand kit mismatches** requiring fixes:

### Issues
1. **Colors:** Using `--color-copper: #b87333` instead of brand kit `gold_spotlight: #F5C542`
2. **Colors:** Using `--color-deep-black: #0d0d0d` instead of brand kit `deep_black: #000000`
3. **Colors:** Using `--color-warm-cream: #f5e6d3` instead of brand kit `warm_white: #FFF7E6`
4. **Fonts:** Using `Cormorant` instead of brand kit `Cinzel Bold` for headlines
5. **Fonts:** Using `Spectral` instead of brand kit `Lora Regular` for body
6. **Theme:** Implemented "Copper Luxe" instead of "Theatrical Drama" (dramatic reveals, curtain parting)

---

## Fixes Required

The variant needs CSS fixes to match brand kit:

1. **base.css:** Replace font-face declarations for Cormorant with Cinzel Bold loading from `../fonts/Cinzel-Bold.ttf`
2. **base.css:** Replace font-face declarations for Spectral with Lora Regular loading from `../fonts/Lora-Regular.ttf`
3. **base.css:** Update `--color-copper` from `#b87333` to `#f5c542`
4. **base.css:** Update `--color-deep-black` from `#0d0d0d` to `#000000`
5. **base.css:** Update `--color-warm-cream` from `#f5e6d3` to `#fff7e6`
6. **theme.css:** Update font-family references from Cormorant to Cinzel, Spectral to Lora
7. **theme.css:** Add theatrical stage effects (spotlight on hero, curtain parting animation, dramatic reveal)

---

## Files That Need Modification

- `variants/02-spotlight-projector-5/css/base.css`
- `variants/02-spotlight-projector-5/css/theme.css`

---

## Status

❌ **REQUIRES FIXES** - This variant does not match brand kit specification for "Theatrical Drama" theme.
