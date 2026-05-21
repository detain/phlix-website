# Performance Review: 03-retro-film-reel-3

## Summary

**Status: ⚠️ Fonts Missing — Custom Font Files Not Present**

The CSS is well-structured for performance (woff2 format, `font-display: swap`), but the required font files are missing from the `fonts/` directory, causing the site to fall back to system fonts.

---

## Font Loading Analysis

### ✅ What Was Done Right

| Practice | Status | Notes |
|----------|--------|-------|
| `font-display: swap` | ✅ | Prevents FOIT (Flash of Invisible Text) |
| WOFF2 format | ✅ | Best compression, ~30% smaller than TTF/OTF |
| Self-hosted fonts | ✅ | No CDN dependency, no third-party tracking |
| Multiple weights/variants | ✅ | Oswald (400, 500, 700) + Lora (400, 400i, 600) |

### ❌ Issues Found

#### 1. **CRITICAL: Missing Font Files**

The `fonts/` directory contains only a README — no actual `.woff2` files:

```
variants/03-retro-film-reel-3/fonts/README.md  ← only file present
```

The CSS references 6 font files that don't exist:
- `oswald-400.woff2`
- `oswald-500.woff2`
- `oswald-700.woff2`
- `lora-400.woff2`
- `lora-400-italic.woff2`
- `lora-600.woff2`

**Impact**: Browsers will use system fallback fonts, losing the Film Noir visual identity.

#### 2. **No Font Preloading**

No `<link rel="preload">` tags for critical fonts in the HTML `<head>`. For above-the-fold content, preloading would reduce CLS (Cumulative Layout Shift) from font swaps.

#### 3. **No Font Subsetting**

The README suggests downloading directly from Google Fonts without subsetting. For a Film Noir theme, only ASCII characters may be needed, but this was not specified or implemented.

---

## Recommendations

### Immediate Fix (Required)

Download and place the 6 font files in `variants/03-retro-film-reel-3/fonts/`:

```
wget -P variants/03-retro-film-reel-3/fonts/ \
  https://fonts.gstatic.com/s/oswald/v53/oswald-400.woff2 \
  https://fonts.gstatic.com/s/oswald/v53/oswald-500.woff2 \
  https://fonts.gstatic.com/s/oswald/v53/oswald-700.woff2 \
  https://fonts.gstatic.com/s/lora/v36/lora-400.woff2 \
  https://fonts.gstatic.com/s/lora/v36/lora-400-italic.woff2 \
  https://fonts.gstatic.com/s/lora/v36/lora-600.woff2
```

Or use [Fontsource](https://fontsource.org/) for npm-based self-hosting with automatic subsetting.

### Performance Optimization (Recommended)

1. **Add font preloading** in `<head>`:
   ```html
   <link rel="preload" href="/fonts/oswald-500.woff2" as="font" type="font/woff2" crossorigin>
   <link rel="preload" href="/fonts/lora-400.woff2" as="font" type="font/woff2" crossorigin>
   ```

2. **Consider subsetting** to reduce file size if only Latin characters needed

3. **Variable fonts alternative**: Use `oswald-variable.woff2` and `lora-variable.woff2` to reduce to 2 files instead of 6

---

## Metrics Impact

| Metric | Current | Expected After Fix |
|--------|---------|-------------------|
| Font Load | Fallback only | ~60-80KB total (woff2) |
| FOIT | N/A (fallback) | Prevented by `swap` |
| CLS | May shift on font load | Reduced with preload |
| Theme Fidelity | Broken | Film Noir typography |

---

## Verdict

The CSS architecture is sound. The missing font files are a deployment issue, not a code issue. Once fonts are added and preloaded, this will be a well-performing implementation.
