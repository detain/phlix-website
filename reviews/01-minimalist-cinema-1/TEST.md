# Wave 1 Test Results — 01-minimalist-cinema-1

**Date:** 2026-05-21
**Variant:** 01-minimalist-cinema-1

## Build Test

**Command:** `npm run build`

**Result:** ✓ PASS

```
All 25 variants built successfully:
  ✓ 01-minimalist-cinema through 01-minimalist-cinema-5
  ✓ 02-spotlight-projector through 05-pixel-tech-5
```

## Lint Test

**Command:** `npm run lint`

**Result:** ✗ FAIL (project-wide)

### Errors Found (not in 01-minimalist-cinema-1)

| File | Line | Error |
|------|------|-------|
| variants/04-portal-hub-1/css/theme.css | 186:26 | Expected "rgba" to be "rgb" (color-function-alias-notation) |

**Note:** This lint error is in `04-portal-hub-1`, which is outside the 01-minimalist-cinema variant scope. The error is not present in any 01-minimalist-cinema-1 through 01-minimalist-cinema-5 files.

### Individual Lint Verification for 01-minimalist-cinema-1

**Command:** `npx --no-install stylelint variants/01-minimalist-cinema-1/css/*.css`

**Result:** ✓ PASS (no errors)

### Summary

- **01-minimalist-cinema-1 lint status:** PASS
- **Project-wide lint status:** FAIL (due to 04-portal-hub-1)
- **Action required:** Coordinator for 04-portal-hub must fix the rgba→rgb issue

## Test Artifacts

- Build artifacts available in `variants/01-minimalist-cinema-{N}/` directories
- CSS files: base.css, components.css, theme.css
- JS files: main.js
- Fonts: 5 self-hosted woff2 files
- Images: favicon.svg, logo.svg, og.svg
