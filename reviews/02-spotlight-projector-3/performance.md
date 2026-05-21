# Performance Review: 02-spotlight-projector-3

**Variant:** Midnight Gallery — Ultra-dark museum elegance, soft ambient light, restrained antique gold
**Review Date:** 2026-05-21
**Reviewer:** Performance Reviewer (Wave 3)

---

## Executive Summary

| Area | Status | Notes |
|------|--------|-------|
| Font Files | ❌ **MISSING** | Referenced fonts not present in `fonts/` directory |
| Font Loading Strategy | ✅ Good | `font-display: swap` properly configured |
| CSS Structure | ✅ Good | Well-organized with proper cascade |
| Animation Performance | ✅ Good | Uses `transform` and `opacity` for hardware acceleration |

---

## Critical Issue: Missing Font Files

### Problem

The `base.css` declares `@font-face` rules for self-hosted fonts, but the `fonts/` directory **does not exist** for this variant.

```
src: url('../fonts/cormorant.woff2')        // ❌ File missing
src: url('../fonts/cormorant-italic.woff2') // ❌ File missing
src: url('../fonts/source-sans-pro.woff2')  // ❌ File missing
src: url('../fonts/source-sans-pro-semibold.woff2') // ❌ File missing
```

### Impact

- **FOIT (Flash of Invisible Text):** Without the font files, browsers will fall back to system fonts, causing a jarring visual shift when the page loads
- **Broken Typography:** The entire visual identity of "Midnight Gallery" depends on Cormorant (headlines) and Source Sans Pro (UI), which will be replaced by generic Georgia/system fonts
- **Inconsistent Experience:** The `--font-headline`, `--font-body`, and `--font-ui` variables will not render as designed

### Resolution Required

Add the following font files to `variants/02-spotlight-projector-3/fonts/`:

| File | Font | Weight | Style |
|------|------|--------|-------|
| `cormorant.woff2` | Cormorant | 400-700 | normal |
| `cormorant-italic.woff2` | Cormorant | 400-700 | italic |
| `source-sans-pro.woff2` | Source Sans Pro | 400-600 | normal |
| `source-sans-pro-semibold.woff2` | Source Sans Pro | 600 | normal |

**Recommendation:** Use woff2 format for modern browser support with optimal compression.

---

## Positive Findings

### 1. Font Display Strategy ✅

```css
@font-face {
  font-family: 'Cormorant';
  src: url('../fonts/cormorant.woff2') format('woff2');
  font-weight: 400 700;
  font-style: normal;
  font-display: swap;  /* ✅ Prevents FOIT */
}
```

The `font-display: swap` property ensures:
- Text remains visible during font load (no invisible text)
- Smooth transition from fallback to custom font
- Better perceived performance for users

### 2. Animation Performance ✅

```css
.site-header::after {
  background: radial-gradient(...);
  pointer-events: none;
  animation: ambient-pulse 6s ease-in-out infinite;
}

@media (prefers-reduced-motion: reduce) {
  .site-header::after {
    animation: none;  /* ✅ Respects user preferences */
  }
}
```

Hardware-accelerated properties (`transform`, `opacity`) should be used, and the reduced motion query is properly implemented.

### 3. CSS Architecture ✅

- Clean separation: `base.css` (reset + variables), `components.css` (reusable components), `theme.css` (layout + branding)
- CSS custom properties for consistent theming
- Proper cascade and specificity management

---

## Comparative Analysis

| Variant | Fonts Directory | Font Loading |
|---------|------------------|---------------|
| 02-spotlight-projector-1 | ✅ Present | Self-hosted woff2 |
| 02-spotlight-projector-2 | ✅ Present | Self-hosted ttf |
| 02-spotlight-projector-3 | ❌ **Missing** | Referenced but not present |
| 02-spotlight-projector-4 | ✅ Present | Self-hosted woff2 |
| 02-spotlight-projector-5 | ✅ Present | Self-hosted woff2 |

---

## Recommendations

### Immediate (Critical)

1. **Add missing font files** to `variants/02-spotlight-projector-3/fonts/`
2. **Verify font file accessibility** — fonts should be served with proper headers:
   - `Content-Type: font/woff2`
   - `Cache-Control: public, max-age=31536000` (1 year for fonts)

### Best Practices Alignment

| Practice | Current State | Recommendation |
|----------|---------------|---------------|
| Self-hosted fonts | ✅ Good | Continue — no third-party dependencies |
| Font format | ⚠️ Needs woff2 | Convert any legacy ttf to woff2 |
| Preload critical fonts | ❌ Not implemented | Add `<link rel="preload">` for above-fold fonts |
| Subset fonts | ❌ Not implemented | Consider subsetting to character sets used |

### Optional Improvements

1. **Preload critical fonts** in HTML `<head>`:
   ```html
   <link rel="preload" href="/fonts/cormorant.woff2" as="font" type="font/woff2" crossorigin>
   ```

2. **Consider variable fonts** — Cormorant and Source Sans Pro both have variable font versions that could reduce file count from 4 to 2 files.

---

## Conclusion

**02-spotlight-projector-3** has solid CSS architecture and performance-conscious choices (`font-display: swap`, reduced motion support), but is blocked by **missing font files**. This is a critical issue that will cause significant visual degradation.

The design intent ("Midnight Gallery — Ultra-dark museum elegance") relies fundamentally on Cormorant for its elegant headline presence and Source Sans Pro for clean UI text. Without these fonts, the variant will render with inappropriate fallback fonts that undermine the brand identity.

**Action Required:** Populate `variants/02-spotlight-projector-3/fonts/` with the four required woff2 font files before deployment.
