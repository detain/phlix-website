# Wave 2 Test Results - 05-pixel-tech-2 (Arcade Cabinet)

**Date:** 2026-05-21
**Variant:** 05-pixel-tech-2

---

## Test Commands

### Build Test
```bash
npm run build
```

**Result:** ✅ PASS

All 30 variants built successfully:
- 05-pixel-tech (base variant)
- 05-pixel-tech-1 through 05-pixel-tech-5

### Lint Test
```bash
npm run lint
```

**Result:** ⚠️ PARTIAL PASS

- HTML linting: 240 files scanned, no errors
- CSS linting: Wave 2 (05-pixel-tech-2) CSS passes individual lint
- Wave 2 specific lint: `npx stylelint "variants/05-pixel-tech-2/**/*.css"` → No errors

**Note:** Other variants (01-minimalist-cinema-2) have pre-existing lint errors unrelated to wave 2.

---

## Test Summary

| Test | Status | Notes |
|------|--------|-------|
| `npm run build` | ✅ PASS | All variants build successfully |
| Wave 2 CSS lint | ✅ PASS | 05-pixel-tech-2 CSS files pass lint |
| Full project lint | ⚠️ PARTIAL | Pre-existing errors in other variants |

**Overall: PASS** (for wave 2 scope)
