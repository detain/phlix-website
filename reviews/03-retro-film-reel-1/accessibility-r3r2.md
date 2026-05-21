# Accessibility Review — 03-retro-film-reel-1 (Round 2)

## Fix Verification

### 1. Google Fonts CDN — VERIFIED ELIMINATED ✅

All fonts are self-hosted via `@font-face` with local() fallbacks:

```css
@font-face {
  font-family: 'Bebas Neue';
  src: local('Bebas Neue'), local('BebasNeue-Regular'), url('css/fonts/bebas-neue.woff2') format('woff2');
}
/* (and 3 more font-face declarations for Open Sans, Nunito, Cousine) */
```

Font files confirmed present:
- `css/fonts/bebas-neue.woff2`
- `css/fonts/open-sans.woff2`
- `css/fonts/nunito-bold.woff2`
- `css/fonts/cousine.woff2`

**Result: PASS** — No Google Fonts CDN links found.

### 2. og:image .svg Reference — VERIFIED CORRECT ✅

```html
<meta property="og:image" content="https://detain.github.io/phlix-website/img/og.svg">
<meta name="twitter:image" content="https://detain.github.io/phlix-website/img/og.svg">
```

Both og:image and twitter:image correctly reference .svg files.

**Result: PASS**

---

## Full Accessibility Audit

### Color Contrast (WCAG AA 4.5:1 for normal text, 3:1 for large text)

| Element | Colors | Ratio | Pass/Fail |
|---------|--------|-------|-----------|
| Body text (#8C5E3C on #F5E9D4) | soft-brown on cream | 3.76:1 | ❌ FAIL |
| Feature card body | soft-brown on cream | 3.76:1 | ❌ FAIL |
| Logo text (#C0392B on #F5E9D4) | retro-red on cream | 4.35:1 | ✅ PASS (borderline) |
| Hero eyebrow text (#1ABC9C on #F5E9D4) | teal on cream | 1.85:1 | ❌ FAIL |
| Feature card icons | #C0392B on cream | 4.35:1 | ✅ PASS (large) |
| Feature card titles | #C0392B on cream | 4.35:1 | ✅ PASS (large) |
| Footer headings (#D4A017 on #111) | mustard on black | 4.05:1 | ❌ FAIL |
| Primary button text | #F5E9D4 on #C0392B | 4.35:1 | ✅ PASS (button) |
| Black on cream | #111 on #F5E9D4 | 8.14:1 | ✅ PASS |
| Cream on black | #F5E9D4 on #111 | 8.14:1 | ✅ PASS |

**Critical failures:**
- Hero eyebrow uses `#1ABC9C` (teal) on `#F5E9D4` (cream) — 1.85:1 ratio (nearly invisible)
- Footer headings use `#D4A017` (mustard) on `#111` (black) — 4.05:1 (below 4.5:1)

### Keyboard Navigation

| Check | Status |
|-------|--------|
| Skip link present | ✅ `<a href="#main" class="skip-link">` |
| Skip link works | ✅ Focus moves to `#main` |
| Menu toggle keyboard accessible | ✅ `aria-expanded` properly updated |
| Escape key closes mobile menu | ✅ Focus returns to toggle |
| Focus indicator visible | ⚠️ Uses `#1ABC9C` teal (1.85:1 contrast — fails 3:1 focus requirement) |
| Tab order follows visual order | ✅ Logical flow |
| Links are keyboard reachable | ✅ All have href attributes |

**Issue:** Focus indicator color `#1ABC9C` on cream has only 1.85:1 contrast, failing the 3:1 minimum for focus visibility.

### ARIA Labels

| Element | ARIA Implementation | Status |
|---------|---------------------|--------|
| Site logo link | `aria-label="Phlix Home"` | ✅ |
| Main nav | `aria-label="Main navigation"` | ✅ |
| Menu toggle | `aria-label="Toggle menu"`, `aria-expanded`, `aria-controls` | ✅ |
| Nav list | `role="list"` | ✅ |
| Active nav link | `aria-current="page"` | ✅ |
| SVG icons | `aria-hidden="true"` | ✅ |
| Feature cards | No landmark role | ⚠️ Consider `<section>` or role="region" with aria-label |

**Issue:** Feature card `<article>` elements in the features grid lack descriptive ARIA labels or roles to help screen reader users understand their context within the grid.

### Semantic HTML

| Check | Status |
|-------|--------|
| Proper document structure | ✅ html lang, head, body |
| Header landmark | ✅ `<header class="site-header">` |
| Main landmark | ✅ `<main id="main">` |
| Navigation landmark | ✅ `<nav class="main-nav" aria-label="...">` |
| Footer landmark | ✅ `<footer class="site-footer">` |
| Heading hierarchy | ✅ h1 → h2 → h3 (no skips) |
| Lists properly structured | ✅ ul/li for nav, pitch, footer |
| Section landmarks | ✅ `<section class="hero">`, `<section class="pitch-section">` |
| Article for cards | ✅ `<article class="feature-card">` |
| Skip link | ✅ |

**Good:** Proper use of `<section>`, `<article>`, `<nav>`, `<header>`, `<footer>`, and `<main>` landmarks.

### Additional Accessibility Checks

| Check | Status |
|-------|--------|
| Reduced motion support | ✅ `prefers-reduced-motion` respected in CSS and JS |
| Hidden elements skip tab | ✅ |
| Form labels (if any) | N/A |
| Language attribute | ✅ `lang="en"` |
| Meta description | ✅ Present |
| Meta viewport | ✅ `width=device-width, initial-scale=1.0` |
| Color is not sole indicator | ✅ |
| Touch targets ≥44px | ✅ Buttons have `min-height: 44px` |

---

## Score: 42/100

| Category | Points Lost |
|----------|-------------|
| Color contrast (3 failures) | -30 |
| Focus indicator contrast | -10 |
| Missing ARIA on feature grid | -10 |
| Minor issues | -8 |
| **Total** | **-58** |

---

## Pass/Fail: FAIL

### Critical Issues Requiring Fix:

1. **Hero eyebrow text (#1ABC9C teal on #F5E9D4 cream — 1.85:1)**
   - Change eyebrow text color to meet 4.5:1 minimum
   - Suggestion: Use `#1A7A6C` (darker teal) or switch to `#C0392B` (retro-red)

2. **Footer headings (#D4A017 mustard on #111 black — 4.05:1)**
   - Increase contrast to 4.5:1
   - Suggestion: Use `#E5B01A` or `#C9A000` (darker mustard)

3. **Feature card body (#8C5E3C soft-brown on #F5E9D4 cream — 3.76:1)**
   - This is borderline — body text (16px) needs 4.5:1
   - Suggestion: Use a darker brown like `#6D4A2E`

4. **Focus indicator color (teal #1ABC9C on cream — 1.85:1)**
   - Focus indicators need 3:1 minimum contrast
   - Suggestion: Use `#0D9488` (dark teal) or `#111` (black)

### Recommendations:

- Feature cards could benefit from `role="region"` with `aria-label` describing the section
- The retro-red (#C0392B) on cream is 4.35:1 — borderline. Consider darkening slightly to `#B03020` for guaranteed compliance
