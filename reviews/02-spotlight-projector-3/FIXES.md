# Wave 3 Fixes: 02-spotlight-projector-3

## Fix Phase Summary

**Date:** 2026-05-21
**Wave:** 3 of 5
**Variant:** 02-spotlight-projector-3

---

## Critical Issues Found

This variant has **significant brand kit mismatches** requiring fixes:

### Issues
1. **Colors:** Using `--color-antique-gold: #c9a84c` instead of brand kit `gold_spotlight: #F5C542`
2. **Colors:** Using `--color-deep-black: #0a0a0c` instead of brand kit `deep_black: #000000`
3. **Colors:** Using `--color-museum-white: #faf9f6` instead of brand kit `warm_white: #FFF7E6`
4. **Fonts:** Using `Cormorant` instead of brand kit `Cinzel Bold` for headlines
5. **Fonts:** Using `Cormorant` instead of brand kit `Lora Regular` for body
6. **Theme:** Implemented "Midnight Gallery" instead of "Film Noir" (high contrast B&W with selective gold)

---

## Fixes Required

The variant needs CSS fixes to match brand kit:

1. **base.css line 11-16:** Change font-face for headline font to load Cinzel Bold from `../fonts/Cinzel-Bold.ttf`
2. **base.css line 44:** Change `--color-deep-black` from `#0a0a0c` to `#000000`
3. **base.css line 46:** Change `--color-antique-gold` from `#c9a84c` to `#f5c542`
4. **base.css line 48:** Change muted color to warm equivalent
5. **theme.css:** Replace Cormorant references with Cinzel and Lora

---

## Files That Need Modification

- `variants/02-spotlight-projector-3/css/base.css`
- `variants/02-spotlight-projector-3/css/theme.css`

---

## Status

❌ **REQUIRES FIXES** - This variant does not match brand kit specification.
