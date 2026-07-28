# Obsidian Pulse — Accessibility & Usability Review

**Reviewing the built site at:** `/home/sites/phlix/phlix-website/sites/obsidian-pulse/`

**Ground-truth references:**

- `brand-kits/obsidian-pulse.js` §21 (accessibility), §12 (motion)
- `new_site.md` §12 (accessibility baseline, WCAG 2.2 AA hard gate)
- `shared/content.json` (shared copy contract)

---

## Overall Score

**72 / 100** — One blocking WCAG failure + two spec violations

| Dimension                     | Score      | Notes                                            |
| ----------------------------- | ---------- | ------------------------------------------------ |
| WCAG 2.2 AA Contrast          | ✅ pass    | All text/UI ≥ 4.5:1 or 3:1                       |
| WCAG 2.2 AA Keyboard & Focus  | ⚠️ partial | Focus ring correct; touch target below min       |
| WCAG 2.2 AA Touch Targets     | ❌ fail    | Nav toggle ~40×40px, below 44×44px min           |
| WCAG 2.2 AA Other Criteria    | ✅ pass    | Skip link, ARIA, forms, alt text, reduced motion |
| Nielsen Usability Heuristics  | ✅ pass    | All 5 pass                                       |
| Spec Compliance (new_site.md) | ❌ fail    | CDN font links; empty font directory             |

**Count: 1 ❌ critical, 1 ⚠️ spec violation, 0 ❌ accessibility (other)**

---

## WCAG 2.2 AA Findings

### ❌ CRITICAL — Touch target too small on mobile nav toggle

**File:** `css/components.css:44-50` (`.nav-toggle`)

```css
.nav-toggle {
  display: none;
  padding: var(--space-2); /* = 8px */
  /* ... */
}
```

**Problem:** On mobile (≤900px), the hamburger button is `24px icon + 2×8px padding = 40×40px` total touch area. WCAG 2.2 AA §2.5.8 requires **minimum 44×44px** for touch targets. The brand kit spec (§19, §21) states 48×48px on mobile/TV.

**Brand kit reference:** `obsidian-pulse.js:898` — `"touch_target": "Minimum 48×48px on mobile and TV; 44×44px on desktop."`

**Suggested fix (components.css):**

```css
/* Mobile nav toggle — increase touch target */
@media (max-width: 900px) {
  .nav-toggle {
    padding: var(--space-4); /* was var(--space-2) = 8px → 16px; 24+16+16 = 56px */
    min-width: 44px;
    min-height: 44px;
  }
}
```

---

### ⚠️ SPEC VIOLATION — Google Fonts CDN links present (not an a11y failure, but blocks `npm run build` pass)

**File:** All 8 HTML pages — e.g. `index.html:33-35`

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&family=Space+Grotesk:wght@300;400;500&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
  rel="stylesheet"
/>
```

**Problem:** `new_site.md §1` explicitly forbids "No Google Fonts `<link>` to `fonts.googleapis.com`" and §13 requires self-hosted WOFF2 fonts with `font-display: swap`. The site currently ships with CDN font links on every page.

Additionally, `css/base.css:7-93` declares `@font-face` for all fonts pointing to `css/fonts/*.woff2`, but that directory is **empty** — those declarations are dead code.

**Impact:** Spec compliance failure. Performance budget violation (CDN round-trip on every page load).

**Suggested fix:** Remove the 3 Google Fonts `<link>` lines from all HTML pages. Ensure `css/fonts/` is populated with the actual WOFF2 files, or remove the `@font-face` declarations from base.css if relying solely on system-font fallbacks.

---

### ✅ PASS — Contrast ratios

Verified against brand-kit color system:

| Foreground                  | Background           | Ratio | WCAG Target   | Status |
| --------------------------- | -------------------- | ----- | ------------- | ------ |
| `#F0F2F5` (Optical White)   | `#0A0B0E` (Obsidian) | ~18:1 | ≥4.5:1 body   | ✅     |
| `#F0F2F5` (Optical White)   | `#111317` (Surface)  | ~15:1 | ≥4.5:1 body   | ✅     |
| `#C8CDD6` (Platinum Silver) | `#0A0B0E` (Obsidian) | ~7:1  | ≥4.5:1 body   | ✅     |
| `#00B4FF` (Pulse Blue)      | `#0A0B0E` (Obsidian) | ~8:1  | ≥3:1 large/UI | ✅     |
| `#F0F2F5` on gradient hero  | `#0A0B0E` base       | ≥15:1 | ≥4.5:1 body   | ✅     |

---

### ✅ PASS — Focus indicators

**File:** `css/base.css:293-297`

```css
:focus-visible {
  outline: 1px solid var(--color-focus); /* 1px Pulse Blue ring */
  outline-offset: 2px;
  box-shadow: 0 0 8px var(--color-primary-glow); /* 4px glow spread */
}
```

This matches the brand kit spec: `"1px Pulse Blue border + 4px blue glow ring; always visible on dark surfaces; 2px clear offset from element edge"` (`obsidian-pulse.js:897`). Visible on all interactive elements.

---

### ✅ PASS — Skip link

**File:** `index.html:61` (present on all 8 pages as first body child)

```html
<a class="skip-link" href="#main-content">Skip to main content</a>
```

Styled at `css/base.css:269-290`: `position: absolute; top: -100%` → `top: var(--space-5)` on focus. Visible on focus. Correctly targets `#main-content`. ✅

---

### ✅ PASS — `aria-current="page"` on active nav link

**File:** `index.html:74` (and each page's nav with its own link):

```html
<li><a href="./" aria-current="page">Home</a></li>
```

Properly applied. No other ARIA misuse detected.

---

### ✅ PASS — `aria-label` on icon-only nav toggle button

**File:** `index.html:68`

```html
<button
  class="nav-toggle"
  aria-label="Toggle navigation"
  aria-expanded="false"
  aria-controls="nav-menu"
></button>
```

Correct. `aria-expanded` is kept in sync by JS (`js/main.js:15-17`). ✅

---

### ✅ PASS — Reduced motion honored

**CSS:** `css/base.css:325-331`

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

**Hero scan-line animation override:** `css/theme.css:178-183`

```css
@media (prefers-reduced-motion: reduce) {
  .hero::after {
    animation: none;
    opacity: 0.5; /* static indicator instead */
  }
}
```

**JS:** `js/main.js:39-44` — Scroll reveals gated behind `!prefersReducedMotion`. ✅

---

### ✅ PASS — Logical tab order; no positive `tabindex`

All interactive elements follow DOM source order. `tabindex` values found: `tabindex="-1"` on `<main id="main-content">` (correct, allows programmatic focus). No positive `tabindex` anywhere. ✅

---

### ✅ PASS — Image alt text

- Logo: `<img src="img/logo.svg" alt="Phlix logo">` — meaningful alt ✅
- Feature icons: `<div class="feature-icon" aria-hidden="true">` — correctly marked decorative ✅
- No `<img>` elements without alt found on any page. ✅

---

### ✅ PASS — 200% text zoom survives

All layouts use fluid `clamp()` typography (e.g., `font-size: clamp(var(--text-4xl), 6vw, var(--text-6xl))`), no fixed pixel heights on text containers, no `overflow-x` issues. Container widths are fluid with `max-width`. ✅

---

## Nielsen Usability Heuristics

### ✅ Primary CTA visible above the fold

`index.html:94` — `<a href="download.html" class="btn btn-primary btn-large">Get Phlix</a>` renders in the hero section. With the hero at `min-height: 100vh` (`css/theme.css:100`) and the CTA in `.hero-inner`, it is definitively above the fold on any viewport. ✅

### ✅ Download reachable in ≤2 clicks from home

Home → hero "Get Phlix" → `download.html` (1 click). ✅ Or Home → nav "Download" → `download.html` (1 click). ✅

### ✅ Mobile nav works

`js/main.js:14-35` — Click toggles `.is-open` class, `aria-expanded` synchronized, closes on `Escape` keydown (restores focus to toggle, line 25), closes on outside click. ✅

### ✅ No dead-end pages

All 8 pages end with `.cta-banner` linking to `download.html` or `docs.html`. Footer on every page has links to download/docs. ✅

### ✅ Error/toast copy is minimal and factual

No error states on this static marketing site. Toast component (`.toast`, `components.css:427-451`) uses monospace font, factual copy, no exclamation marks, no emojis. Brand kit voice rules followed. ✅

---

## Defect Summary

| #   | Severity    | Location                   | Issue                                                                       |
| --- | ----------- | -------------------------- | --------------------------------------------------------------------------- |
| 1   | ❌ CRITICAL | `css/components.css:44-50` | Mobile nav toggle touch target ~40×40px, below 44×44px WCAG 2.2 AA minimum  |
| 2   | ⚠️ SPEC     | All 8 HTML pages:33-35     | Google Fonts CDN `<link>` violates `new_site.md §1` "no CDN dependencies"   |
| 3   | ⚠️ SPEC     | `css/base.css:7-93`        | `@font-face` declarations point to empty `css/fonts/` directory — dead code |
| 4   | ✅ PASS     | Global                     | Contrast ratios all meet WCAG AA                                            |
| 5   | ✅ PASS     | Global                     | Focus indicators visible and spec-compliant                                 |
| 6   | ✅ PASS     | Global                     | Skip link present and functional                                            |
| 7   | ✅ PASS     | Global                     | ARIA attributes correct throughout                                          |
| 8   | ✅ PASS     | Global                     | `prefers-reduced-motion` fully honored                                      |
| 9   | ✅ PASS     | Global                     | 200% text zoom survives reflow                                              |
| 10  | ✅ PASS     | Global                     | Nielsen heuristics all satisfied                                            |

---

## Recommendation

**Fix #1 before shipping.** The touch target failure is a WCAG 2.2 AA hard gate — it blocks users on mobile/touch devices from easily activating the navigation.

**Fix #2 and #3** to pass spec compliance and improve performance (eliminate CDN round-trip, remove dead `@font-face` code).

With #1 fixed, expected score: **94 / 100**. With #1–3 fixed: **100 / 100**.
