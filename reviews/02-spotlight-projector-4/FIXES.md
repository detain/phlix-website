# Wave 4 Fixes: 02-spotlight-projector-4

## Fix Phase Summary

**Date:** 2026-05-21
**Wave:** 4 of 5
**Variant:** 02-spotlight-projector-4

---

## Critical Issues Found

This variant has **significant brand kit mismatches** requiring fixes:

### Issues
1. **Colors:** Using `--color-amber: #e89b3c` instead of brand kit `gold_spotlight: #F5C542`
2. **Colors:** Using `--color-warm-brown: #1a1208` instead of brand kit `deep_black: #000000`
3. **Colors:** Using `--color-warm-cream: #f5e6c8` instead of brand kit `warm_white: #FFF7E6`
4. **Fonts:** Using `Vollkorn` instead of brand kit `Cinzel Bold` for headlines
5. **Fonts:** Using `Nunito` instead of brand kit `Lora Regular` for body
6. **Theme:** Implemented "Warm Spotlight" instead of "Modern Premium" (clean contemporary luxury)

---

## Fixes Required

The variant needs CSS fixes to match brand kit:

1. **base.css:** Replace font-face declarations for Vollkorn with Cinzel Bold loading from `../fonts/Cinzel-Bold.ttf`
2. **base.css:** Replace font-face declarations for Nunito with Lora Regular loading from `../fonts/Lora-Regular.ttf`
3. **base.css:** Update `--color-amber` from `#e89b3c` to `#f5c542` (or use amber_glow #ffb84d)
4. **base.css:** Update `--color-warm-brown` from `#1a1208` to `#000000`
5. **base.css:** Update `--color-warm-cream` from `#f5e6c8` to `#fff7e6`
6. **theme.css:** Update font-family references from Vollkorn to Cinzel, Nunito to Lora

---

## Files That Need Modification

- `variants/02-spotlight-projector-4/css/base.css`
- `variants/02-spotlight-projector-4/css/theme.css`

---

## Status

❌ **REQUIRES FIXES** - This variant does not match brand kit specification.
