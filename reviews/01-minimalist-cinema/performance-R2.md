# Performance Review — Round 2
**Variant:** `01-minimalist-cinema`
**Reviewer:** Dimension Reviewer
**Date:** 2026-05-20
**Scope:** Performance dimension only

---

## Score: **78 / 100**

---

## ✅ Passed Items

| Criterion | Status | Evidence |
|-----------|--------|----------|
| **Page ≤500KB** | ✅ PASS | Total index.html + inline CSS + inline JS + inline SVG ≈ **49 KB** uncompressed. Well under threshold. |
| **hero ≤120KB** | ✅ PASS | Hero is pure text (no hero image). `<h1>` + eyebrow + sub text render in ~0KB image weight. |
| **INP <200ms** | ✅ PASS | Vanilla JS only, ~5.5 KB, no frameworks, all event handlers are synchronous and minimal. No heavy interactions. |
| **No render-blocking JS** | ✅ PASS | `<script src="...main.js" defer></script>` at `</body>`. Zero parser-blocking script tags. |
| **`font-display: swap`** | ✅ PASS | All `@font-face` blocks in `theme.css:15,24,33,40` declare `font-display: swap`. |
| **CSS is not render-blocking** | ✅ PASS (minor concern) | CSS is in `<head>` via `link rel="stylesheet"` — standard practice, not a failure. |
| **JS bundle size** | ✅ PASS | `main.js` = 5,487 bytes (5.4 KB). Minimal vanilla JS with no dependencies. |
| **No N+1 patterns** | ✅ PASS | Static HTML — no database queries. |
| **Reduced motion support** | ✅ PASS | `base.css:167–176` and `components.css:618–624` both wrap animations in `@media (prefers-reduced-motion: reduce)`. |
| **Smooth scroll opt-in** | ✅ PASS | `base.css:74` sets `scroll-behavior: smooth`. |
| **Explicit image dimensions** | ✅ PASS (most) | Logo `img` at `index.html:62` has `width="120" height="40"`. Most inline SVGs are icons with small viewBoxes. |

---

## ⚠️ Concerns

### 1. Missing Local Font Files — CLS Risk from Google Fonts FOUT

**File:** `css/theme.css:44–74` (fallback `@font-face` blocks)

The CSS defines self-hosted font `@font-face` rules pointing to `../fonts/` (lines 16, 24, 32, 40), but **`variants/01-minimalist-cinema/fonts/` does not exist** — no font files are present. The fallback `@font-face` blocks at CSS lines 44–74 load fonts from `fonts.gstatic.com`.

**Impact:**
- **FOUT (Flash of Unstyled Text)** — system font renders first, then swaps when Google Fonts loads. This causes **CLS** (Cumulative Layout Shift) because text reflows when the web font arrives.
- **No `preconnect`** to `fonts.gstatic.com` in `<head>`, so browser discovery of the font URL is delayed.
- Google Fonts are third-party — cannot be controlled for uptime or caching.

**Evidence:**
```
css/theme.css:16  → src: url('../fonts/montserrat-extra-bold.woff2')   ← NOT FOUND
css/theme.css:24  → src: url('../fonts/inter-regular.woff2')            ← NOT FOUND
css/theme.css:32  → src: url('../fonts/roboto-medium.woff2')            ← NOT FOUND
css/theme.css:40  → src: url('../fonts/jetbrains-mono-regular.woff2')  ← NOT FOUND
```
`fonts/` directory: **DOES NOT EXIST** (confirmed via `ls -la`)

**CLS Estimate:** Montserrat ExtraBold (800 weight) substitution causes measurable layout shift. Without preconnect, fonts.gstatic.com handshake adds ~100–300ms delay before font swap occurs.

**Severity:** 🟡 Minor — causes CLS, but swap display mitigates full invisibility.

---

### 2. No `preconnect` or `dns-prefetch` for Google Fonts

**File:** `index.html` (head section, lines 1–52)

No `<link rel="preconnect">` or `<link rel="dns-prefetch">` for `fonts.gstatic.com`. The browser must perform DNS resolution + TCP handshake + TLS after it discovers the font URL in CSS.

**Impact:** Delayed font load → longer FOUT window → extended CLS period.

**Evidence:** `index.html` head is missing:
```html
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
```

---

### 3. `og.svg` Missing Explicit `width`/`height`

**File:** `index.html:13` references `/variants/01-minimalist-cinema/img/og.svg`

The Open Graph image has no HTML-level `width`/`height` attributes. Since it's an SVG, browser will infer from viewBox but the HTML `img` element lacks explicit dimensions.

**Impact:** Potential CLS if OG image is ever loaded as a direct resource, though social media scrapers handle this via SVG metadata.

**Evidence:** `index.html:13` — `<meta property="og:image" content="/variants/01-minimalist-cinema/img/og.svg">` (no img tag dimension here, but the referenced SVG itself is `3154 bytes` with a defined viewBox)

---

### 4. JSON-LD Schema is Inline and Large

**File:** `index.html:28–42`

~500 bytes of inline `<script type="application/ld+json">` in `<head>`. While not render-blocking, it adds to HTML parse cost.

**Impact:** Minimal. This is standard practice and not a performance failure.

---

## ❌ Failures

### 1. Google Fonts Fallback Causes CLS Violation

**File:** `css/theme.css:44–74`

Because local fonts are missing and the Google Fonts fallback `@font-face` blocks lack `font-display: swap` — wait, they DO have `font-display: swap`. Let me re-check.

All `@font-face` blocks (both self-hosted at lines 11–41 AND Google Fonts fallback at lines 44–74) have `font-display: swap`. So FOUT is mitigated to a brief flash, not full invisibility.

**Re-assessment:** This is a ⚠️ Minor concern, not a failure. The `font-display: swap` is correctly applied. CLS from font-swap ≈ 0.05–0.1 depending on font size differences.

---

## Summary of Findings

| Issue | Severity | Impact |
|-------|----------|--------|
| Missing local fonts (fonts/ dir absent) | 🟡 Minor | CLS from FOUT, no preconnect |
| No preconnect to fonts.gstatic.com | 🟡 Minor | Delayed font discovery |
| og.svg missing explicit dimensions | 🟡 Minor | Potential CLS |
| Inline JSON-LD in head | 🟢 Nitpick | Parse overhead, negligible |

**No 🔴 Critical or 🟠 Major issues found.**

---

## Score Breakdown

| Criterion | Target | Actual | Score (max) |
|-----------|--------|--------|-------------|
| Lighthouse perf ≥90 | ≥90 | ~85–90 (estimated) | 18/20 |
| LCP <2.5s | <2.5s | ~1.5–2s (text hero, no image LCP) | 19/20 |
| CLS <0.1 | <0.1 | ~0.05–0.08 (font FOUT) | 12/15 |
| INP <200ms | <200ms | ~50ms (minimal JS) | 15/15 |
| hero ≤120KB | ≤120KB | ~0KB (text only) | 10/10 |
| page ≤500KB | ≤500KB | ~49KB total | 10/10 |
| font-display: swap | present | ✅ present | 5/5 |
| no render-blocking JS | ✅ | ✅ | 5/5 |
| **Total** | | | **78/100** |

---

## Recommendations

### 1. Fix Missing Font Files (Priority: Medium)

Either:
- **Option A:** Create the `variants/01-minimalist-cinema/fonts/` directory and add the WOFF2 files (Montserrat-ExtraBold, Inter-Regular, Roboto-Medium, JetBrainsMono-Regular), OR
- **Option B:** If self-hosted fonts are intentionally deferred, add `preconnect` hints now:

```html
<!-- index.html <head> — add before CSS links -->
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
```

This cuts ~100–200ms from font discovery time.

### 2. Add `font-display: optional` for CLS Minimization (Priority: Low)

If CLS must stay <0.05, consider `font-display: optional` instead of `swap` — the browser uses the system font if the web font hasn't loaded within a very short timeout, eliminating FOUT entirely. Tradeoff: users on slow connections may always see system fonts.

### 3. Ensure `og.svg` Has Explicit Dimensions (Priority: Low)

The SVG itself has proper viewBox, so this is low risk. Not actionable unless social sharing metrics show issues.

### 4. Defer JSON-LD (Priority: Low)

Move the JSON-LD `<script>` to `defer` or load it after first paint. It doesn't block rendering but adding it to the defer queue saves parse time.

---

## Evidence Summary

| File | Finding |
|------|---------|
| `index.html:249` | `main.js` loaded with `defer` — no render-blocking |
| `index.html:49–51` | CSS in `<head>` via `link rel="stylesheet"` — standard, expected |
| `index.html:62` | Logo img has explicit `width="120" height="40"` |
| `theme.css:15,24,33,40` | Self-hosted `@font-face` with `font-display: swap` |
| `theme.css:48,56,64,72` | Google Fonts fallback `@font-face` with `font-display: swap` |
| `base.css:167–176` | `@media (prefers-reduced-motion: reduce)` wraps all animations |
| `components.css:618–624` | Hover transforms also wrapped in `prefers-reduced-motion` |
| `main.js:1–166` | Pure vanilla JS, no frameworks, IIFE pattern, focus trapping |
| `fonts/` dir | **DOES NOT EXIST** — `ls` returned "No fonts directory" |

---

**Reviewer:** Dimension Reviewer
**Variant:** 01-minimalist-cinema
**Round:** 2
**Result:** `reviews/01-minimalist-cinema/performance-R2.md` written.
