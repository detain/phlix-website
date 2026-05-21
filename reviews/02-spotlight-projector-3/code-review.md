# Code Review: 02-spotlight-projector-3 (Wave 3)

## Files Reviewed

| File | Lines |
|------|-------|
| `variants/02-spotlight-projector-3/index.html` | 250 |
| `variants/02-spotlight-projector-3/about.html` | 177 |
| `variants/02-spotlight-projector-3/hub.html` | 162 |
| `variants/02-spotlight-projector-3/features.html` | 238 |
| `variants/02-spotlight-projector-3/docs.html` | 173 |
| `variants/02-spotlight-projector-3/plugins.html` | 158 |
| `variants/02-spotlight-projector-3/download.html` | 202 |
| `variants/02-spotlight-projector-3/clients.html` | 216 |
| `variants/02-spotlight-projector-3/sitemap.xml` | 51 |
| `variants/02-spotlight-projector-3/robots.txt` | 4 |
| `variants/02-spotlight-projector-3/css/base.css` | 213 |
| `variants/02-spotlight-projector-3/css/theme.css` | 332 |
| `variants/02-spotlight-projector-3/css/components.css` | 571 |
| `variants/02-spotlight-projector-3/js/main.js` | 123 |

---

## Overall Assessment

**REQUEST_CHANGES**

The variant is well-structured with proper semantic HTML, accessibility features, and a cohesive "Midnight Gallery" design language. However, there are critical issues that must be addressed before approval.

---

## Critical Requirements Check

| Requirement | Status | Details |
|-------------|--------|---------|
| Google Fonts CDN | ✅ PASS | Uses self-hosted fonts via `@font-face` (no external CDN) |
| No invented copy | ✅ PASS | All copy is factual content about Phlix project |
| Mobile nav | ✅ PASS | Properly implemented with ARIA, focus trap, escape key handling |
| Meta desc < 160 chars | ✅ PASS | Longest: 145 chars (`features.html`) |
| og:image exists | ✅ PASS | `img/og.svg` verified to exist |

---

## Critical Issues

### 🔴 1. Missing Font Files

**File:** `css/base.css` lines 10–40

The CSS references self-hosted font files that do not exist in the repository:

```
../fonts/cormorant.woff2
../fonts/cormorant-italic.woff2
../fonts/source-sans-pro.woff2
../fonts/source-sans-pro-semibold.woff2
```

**Impact:** The `fonts/` directory is completely absent. Typography will fall back to Georgia/serif for headlines/body and system-ui for UI elements, breaking the intended "Midnight Gallery" brand typography.

**Recommendation:** Either:
- Add the missing font files to `variants/02-spotlight-projector-3/fonts/`, or
- Switch to Google Fonts CDN (not preferred per guidelines but acceptable as fallback), or
- Use a different system font stack with web-safe fonts

**Confidence:** 95%

---

### 🔴 2. Missing Web Manifest

**File:** All HTML files — line 49

All 8 HTML files reference `./manifest.webmanifest` which does not exist in the variant directory:

```html
<link rel="manifest" href="./manifest.webmanifest">
```

**Impact:** The PWA manifest link returns 404. While this doesn't break functionality, it prevents proper PWA installation and violates the HTML spec references.

**Recommendation:** Either:
- Add `manifest.webmanifest` to the variant, or
- Remove the `<link rel="manifest">` tag from all HTML files

**Confidence:** 95%

---

## Major Issues

### 🟠 1. CSS File Organization Inconsistency

**File:** `css/base.css` line 7

Comment states: *"Fonts: Cormorant (headlines), Source Sans Pro (ui) — self-hosted with font-display: swap"*

This comment promises self-hosted fonts but the files are missing (see Critical Issue #1). The CSS makes no fallback declaration for when fonts fail to load.

**Recommendation:** Add `font-display: swap` was already done, but the comment should clarify this is a fallback stack.

**Confidence:** 90%

---

### 🟠 2. Schema.org JSON-LD Duplicate Descriptions

**File:** Multiple HTML files

The JSON-LD `description` field often differs from the `<meta name="description">` content. For example:

- `about.html` JSON-LD: `"About Phlix: BSD-3 licensed open-source PHP media server..."`
- `about.html` meta desc: `"About Phlix: BSD-3 licensed open-source PHP media server built with PHP 8.3+ and Workerman 5.x. Contribute on GitHub."`

These should match for consistent SEO.

**Confidence:** 85%

---

### 🟠 3. Mobile Nav Focus Management

**File:** `js/main.js` line 18–20

When opening the mobile nav, focus moves to the first nav link:
```javascript
if (isOpen) {
  navMenu.querySelector('a')?.focus();
}
```

However, the mobile nav has `transform: translateY(-100%)` when closed and `transform: translateY(0)` when open. After opening, the `focus()` call may not scroll the menu into visible viewport position if the page has scrolled.

**Impact:** Low — but on pages with long content, the focused link may be off-screen after nav opens.

**Confidence:** 75%

---

## Minor Issues

### 🟡 1. Unused CSS Class

**File:** `css/theme.css` line 315–326

`.site-header::after` uses `animation: ambient-pulse` which is defined in the same file. However, on pages with scroll (like `features.html` with many feature sections), this ambient effect at the top of the viewport may not be visible to users who have scrolled down.

**Confidence:** 60%

---

### 🟡 2. Hardcoded Year in Footer

**File:** Multiple HTML files — line 244 (`index.html`), line 171 (`about.html`), etc.

```html
<p class="footer-copy">&copy; 2026 Phlix — BSD-3-Clause</p>
```

Should use dynamic year (JavaScript or server-side) to avoid yearly maintenance burden. However, since this is a static site generator context, this is low priority.

**Confidence:** 80%

---

### 🟡 3. FAQ Accordion Missing Animation

**File:** `js/main.js` lines 93–113, `css/components.css` lines 498–525

The FAQ accordion toggles `hidden` attribute but CSS has no transition for height or max-height. The FAQ items simply appear/disappear without animation, which feels abrupt compared to the rest of the site's smooth transitions.

**Confidence:** 70%

---

### 🟡 4. `$` in CSS Custom Property Names

**File:** `css/base.css` line 44

CSS custom properties like `--color-deep-black` use dashes, but the naming style is inconsistent with some later declarations using `$` prefixes in comments (not in actual CSS). While not a functional issue, it's a minor style inconsistency.

**Confidence:** 60%

---

## Positive Observations

### 🟢 1. Excellent Mobile Navigation Implementation

The mobile nav in `theme.css` (lines 269–307) and `main.js` (lines 9–48) is exemplary:
- Proper `aria-expanded` state management
- Escape key closes menu
- Focus trap prevents tabbing outside while open
- Smooth CSS transitions for open/close
- Touch-friendly 44px minimum tap targets

**Confidence:** 95%

---

### 🟢 2. Comprehensive Accessibility

All pages include:
- Skip link (`.skip-link`)
- Proper ARIA roles (`role="banner"`, `role="navigation"`, `role="contentinfo"`)
- `aria-label` on all interactive elements
- `aria-current="page"` for active nav item
- `:focus-visible` styles
- `prefers-reduced-motion` media query support

**Confidence:** 95%

---

### 🟢 3. Proper Meta Tags Throughout

All 8 pages have:
- Unique `<title>` tags
- Unique `<meta name="description">` under 160 chars
- Open Graph tags with page-specific content
- Twitter Card tags
- Theme color
- Canonical URLs
- JSON-LD structured data

**Confidence:** 95%

---

### 🟢 4. Semantic HTML Structure

The markup uses proper semantic elements:
- `<header>`, `<nav>`, `<main>`, `<footer>`
- `<section>` with `aria-labelledby`
- `<article>` for feature cards and client cards
- `<dl>`/`<dt>`/`<dd>` for FAQ
- Proper heading hierarchy (h1 → h2 → h3)

**Confidence:** 95%

---

### 🟢 5. Well-Documented CSS

Each CSS file has a docblock explaining:
- File purpose
- Variant name
- Brand concept
- Color palette
- Font approach

**Confidence:** 90%

---

## Philosophy Compliance

### Code Philosophy (N/A — Frontend/Static HTML)

This is a static site variant, not application code. Code philosophy 5 Laws do not apply.

### Frontend Philosophy (5 Pillars)

| Pillar | Status | Notes |
|--------|--------|-------|
| Typography | ⚠️ PARTIAL | Self-hosted fonts missing; falls back to Georgia |
| Color | ✅ PASS | Antique gold (#C9A84C) used consistently with good contrast |
| Motion | ✅ PASS | Smooth transitions throughout, `prefers-reduced-motion` respected |
| Composition | ✅ PASS | Asymmetric hero layout, grid-based feature cards |
| Atmosphere | ✅ PASS | Dark museum aesthetic achieved with subtle gradients and glows |

**Overall:** The visual design is strong but relies on font files that are missing.

---

## Summary

The **02-spotlight-projector-3** variant demonstrates strong craftsmanship in accessibility, semantic markup, and visual design. The "Midnight Gallery" brand aesthetic is well-executed with a sophisticated dark theme and restrained gold accents.

**However**, two critical blockers prevent approval:

1. **Missing font files** — The self-hosted fonts referenced in CSS do not exist in the repository
2. **Missing manifest.webmanifest** — All HTML files reference a PWA manifest that is not present

These must be resolved before this variant can be approved for deployment.

---

*Review generated: 2026-05-20*
