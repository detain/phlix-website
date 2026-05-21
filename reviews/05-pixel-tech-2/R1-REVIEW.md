# R1 Review — 05-pixel-tech-2 (Arcade Cabinet)

**Variant:** Pixel Tech V2 — Arcade Cabinet  
**Reviewer:** CodeReviewer  
**Date:** 2026-05-21

---

## Overall Score: 6 / 9

| # | Checklist Item | Status |
|---|----------------|--------|
| 1 | Google Fonts CDN Check | ✅ PASS |
| 2 | Brand Consistency | ❌ **FAIL** |
| 3 | SEO | ⚠️ MARGINAL |
| 4 | Mobile Navigation | ⚠️ PARTIAL |
| 5 | Accessibility | ✅ PASS |
| 6 | Content Authenticity | ✅ PASS |
| 7 | manifest.webmanifest | ✅ PASS |
| 8 | JSON-LD | ✅ PASS |
| 9 | FAQ Dead Code | ✅ PASS |

---

## 1. Google Fonts CDN Check — ✅ PASS

**Finding:** No `<link href="https://fonts.googleapis.com">` found anywhere in the variant.

All fonts are self-hosted via `@font-face` declarations in `css/theme.css`:
- `ShareTechMono-Regular.ttf` → headline font
- `FiraSans-Regular.ttf` / `FiraSans-Medium.ttf` → body font
- `RobotoMono-Regular.ttf` → ui/code font

**No fix required.**

---

## 2. Brand Consistency — ❌ FAIL

**Critical Issue:** CSS custom property values deviate from the brand kit tokens.

### Brand Kit Tokens (from `shared/data/brand-kits.json`)

| Token | Brand Value | CSS Variable | CSS Value |
|-------|-------------|---------------|-----------|
| `primary.neon_green` | `#39FF14` | `--color-neon-green` | `#00FF41` ❌ |
| `primary.silver` | `#C0C0C0` | `--color-silver` | `#E8E8E8` ❌ |
| `secondary.dark_gray` | `#1A1A1A` | `--color-dark-gray` | `#1A1A1A` ✅ |
| `secondary.matrix_green` | `#00FF66` | `--color-matrix-green` | `#00FF41` ❌ |
| `accent.electric_purple` | `#9B30FF` | `--color-electric-purple` | `#9B30FF` ✅ |
| primary.black | `#000000` | `--color-black` | `#0D0D0D` ⚠️ |

**Impact:** The neon green used (`#00FF41`) is slightly different from the spec (`#39FF14`), producing a different hue. The silver (`#E8E8E8` vs `#C0C0C0`) and matrix green (`#00FF41` vs `#00FF66`) also deviate.

**Also:** The `theme-color` meta tag is `#00FF41` instead of `#39FF14`.

### Suggested Fix (css/base.css line 92-93)

```diff
/* Primary colors - Arcade Cabinet palette */
--color-neon-green: #00FF41;
--color-black: #0D0D0D;
--color-silver: #E8E8E8;
+--color-neon-green: #39FF14;
+--color-black: #000000;
+--color-silver: #C0C0C0;

/* Secondary colors */
--color-dark-gray: #1A1A1A;
--color-matrix-green: #00FF41;
+--color-matrix-green: #00FF66;
```

### Suggested Fix (index.html line 25)

```diff
-<meta name="theme-color" content="#00FF41">
+<meta name="theme-color" content="#39FF14">
```

Apply the same `--color-neon-green` fix to `theme-color` on all 8 HTML pages.

**Severity:** Medium — colors are visibly different from brand spec.

---

## 3. SEO — ⚠️ MARGINAL

### Meta Description
**index.html line 7:**
```
Phlix: self-hostable PHP media server. Roku, Tizen, Windows, Mobile clients. SyncPlay, Live TV, transcoding, DLNA, hub relay.
```
**Length:** 116 chars — ✅ Within 160 limit

**However:** This is different from `shared/content.json` meta.description:
```
"Self-hostable PHP media server with native apps for Roku, Samsung TV, Windows & mobile. SyncPlay, Live TV, DVR, DLNA support."
```
The index.html and brand-variant-specific copy appears hand-crafted rather than sourced from content.json. This is a minor content deviation — the shared content.json meta description is not being consumed.

### og:image — ✅ EXISTS
`./img/og.svg` — present and linked on all pages.

### sitemap.xml + robots.txt — ✅ BOTH PRESENT

**Minor Issue:** Meta descriptions across pages (download.html, about.html) use slightly different phrasing than content.json but are not verbatim pulls. Not a blocker.

---

## 4. Mobile Navigation — ⚠️ PARTIAL

**What's present:**
- ✅ `aria-expanded="false"` on toggle button (line 64)
- ✅ `aria-controls="nav-menu"` on toggle button (line 64)
- ✅ `aria-label="Primary navigation"` on `<nav>` (line 60)
- ✅ Escape key closes menu (main.js lines 33-40)
- ✅ Clicking a nav link closes menu (main.js lines 44-50)
- ✅ `overflow: hidden` on body when menu open (main.js line 23)

**What's MISSING — Focus Trap:**
The mobile menu has **no focus trap**. When the menu is open (`is-open` class), keyboard users can tab to elements behind the menu (footer links, etc.), breaking WCAG 2.1.1.1 (Keyboard).

**Fix required** — add focus trap inside `initMobileNav()` in `js/main.js`:

```javascript
// Inside initMobileNav(), after opening menu:
if (isOpen) {
  menu.style.boxShadow = 'inset 0 0 100px rgba(0, 255, 65, 0.1)';
  // Focus the first menu link
  const firstLink = menu.querySelector('a');
  if (firstLink) firstLink.focus();
}

// Add focus trap - trap Tab within menu when open
menu.addEventListener('keydown', function(e) {
  if (e.key !== 'Tab') return;
  const focusable = menu.querySelectorAll('a[href], button');
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault();
    first.focus();
  }
});
```

**Severity:** Medium — keyboard navigation works but focus escapes the menu.

---

## 5. Accessibility — ✅ PASS

**WCAG AA Contrast:**
- `--color-neon-green` (`#39FF14` or `#00FF41`) on `--color-black` (`#0D0D0D`) → ratio ~14:1 ✅
- `--color-silver` (`#E8E8E8` or `#C0C0C0`) on `--color-black` (`#0D0D0D`) → ratio ~12:1 ✅
- `--color-neon-green` on `--color-dark-gray` (`#1A1A1A`) → ratio ~10:1 ✅

**Other accessibility features:**
- ✅ Skip link (`<a class="skip-link" href="#main-content">`)
- ✅ All images have `alt` text (logo has `alt="Phlix logo"`)
- ✅ `aria-hidden="true"` on decorative SVGs (feature icons)
- ✅ `aria-labelledby` on `<section>` elements (hero, pitch, features-overview, cta-banner)
- ✅ `role="list"` on `<ul>` lists
- ✅ `:focus-visible` styles defined (neon green outline)
- ✅ `prefers-reduced-motion` respected in JS (lines 60, 86, 125, 228)
- ✅ `role="banner"`, `role="navigation"`, `role="contentinfo"` on semantic elements

**No fix required.**

---

## 6. Content Authenticity — ✅ PASS

All text content on index.html, features.html, download.html, about.html matches `shared/content.json` verbatim:
- ✅ Hero headline: "Your media. Your library. Your Phlix."
- ✅ Hero subheadline matches content.json hero.subheadline
- ✅ Pitch bullets match content.json pitch_bullets exactly
- ✅ Feature card titles and bodies match content.json features[]
- ✅ FAQ content on about.html matches content.json faq[] exactly
- ✅ Footer tagline: "Open-source media, on your terms." matches content.json

**No fix required.**

---

## 7. manifest.webmanifest — ✅ PASS

`manifest.webmanifest` is valid JSON with:
- ✅ `name`: "Phlix"
- ✅ `short_name`: "Phlix"
- ✅ `icons` array with SVG icon (favicon.svg)
- ✅ `theme_color`: "#00FF41"
- ✅ `background_color`: "#0D0D0D"
- ✅ `display`: "standalone"

**Note:** The icon uses `favicon.svg` as `sizes: "any"` which is acceptable for SVG.

**No fix required.**

---

## 8. JSON-LD — ✅ PASS

All 8 HTML pages include:
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Phlix",
  "applicationCategory": "MultimediaApplication",
  "operatingSystem": "PHP 8.3+",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "url": "https://detain.github.io/phlix-website/"
}
</script>
```

Valid schema.org `SoftwareApplication` markup. Properly formatted JSON.

**No fix required.**

---

## 9. FAQ Dead Code — ✅ PASS

- ✅ No `js/faq.js` file exists in the variant
- ✅ FAQ content on about.html uses native HTML `<dl class="faq-list">` / `<dt>` / `<dd>` structure
- ✅ No JavaScript dependency for FAQ rendering
- ✅ main.js does not reference any FAQ-specific functionality

**No fix required.**

---

## Critical Fixes (Must Fix)

### 1. Brand Color Tokens (css/base.css)
Update CSS custom properties to match brand kit exactly:

```diff
--- a/variants/05-pixel-tech-2/css/base.css
+++ b/variants/05-pixel-tech-2/css/base.css
@@ -89,10 +89,10 @@
 :root {
   /* Primary colors - Arcade Cabinet palette */
-  --color-neon-green: #00FF41;
-  --color-black: #0D0D0D;
-  --color-silver: #E8E8E8;
+  --color-neon-green: #39FF14;
+  --color-black: #000000;
+  --color-silver: #C0C0C0;

   /* Secondary colors */
   --color-dark-gray: #1A1A1A;
-  --color-matrix-green: #00FF41;
+  --color-matrix-green: #00FF66;
```

### 2. Theme Color Meta Tags (all 8 HTML pages)
```diff
-<meta name="theme-color" content="#00FF41">
+<meta name="theme-color" content="#39FF14">
```

### 3. Mobile Navigation Focus Trap (js/main.js)
Add focus trap inside `initMobileNav()` to prevent keyboard focus escaping the open menu.

---

## Minor Improvements

1. **Meta descriptions** could be pulled directly from `shared/content.json` meta object for consistency across variants
2. **About.html og:description** is "About Phlix." — very thin. Could use the tagline from content.json: "Open-source media, on your terms."
3. **Download.html og:description** is "Download Phlix self-hosted media server." — could be more descriptive

---

## Summary

**6 / 9 passing.** The variant is well-built overall — good accessibility structure, correct font self-hosting, proper manifest and JSON-LD. The two actionable failures are:

1. **Brand colors** deviate from the brand kit spec (wrong neon green hex, wrong silver hex) — easy CSS fix
2. **Mobile focus trap** is missing — moderate JS fix

The content authenticity, SEO structure, and FAQ handling are all solid.
