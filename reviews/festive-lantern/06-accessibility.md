# Dimension 6 — Accessibility (WCAG 2.2 AA) Review

**Site:** Festive Lantern (`/home/sites/phlix/phlix-website/sites/festive-lantern/`)
**Reviewer:** Senior Accessibility & Usability Specialist
**Date:** 2026-07-04

---

## Score: 74 / 100

---

## Contrast Verification

### ✅ Pearl white #F5EFE0 on lacquer black #0F0A08 = 18.8:1
- L(#F5EFE0) = 0.9077, L(#0F0A08) = 0.0032
- Ratio = (0.9077 + 0.05) / (0.0032 + 0.05) = **18.85:1**
- WCAG AAA (7:1) — **PASS**

### ✅ Imperial gold #D4A017 on lacquer black #0F0A08 = 8.1:1
- L(#D4A017) = 0.3602
- Ratio = (0.3602 + 0.05) / (0.0032 + 0.05) = **8.12:1**
- WCAG AA (4.5:1) — **PASS**

### ⚠️ Pearl white #F5EFE0 on midnight indigo #1A1228 — VERIFY
- L(#1A1228) = 0.0199
- Ratio = (0.9077 + 0.05) / (0.0199 + 0.05) = **11.87:1**
- This is the `content-section` / `content-grid` / `feature-card` background
- WCAG AAA (7:1) — **PASS** ✅

### ❌ Jade green #2E8B57 on pearl white #F5EFE0 — VERIFY
- L(#2E8B57) = 0.2075
- Ratio = (0.9077 + 0.05) / (0.2075 + 0.05) = **3.08:1**
- **FAILS** WCAG AA (4.5:1), FAILS WCAG AA Large (3:1) for jade green status text
- Used in: status badges `.status-stable` text on semi-transparent jade background

**Color defect found:** `status-stable` badge: `background: rgba(39,174,96,0.12)` with `color: #27AE60` (Jade Glow #27AE60, not Jade Green #2E8B57).

Re-checking with correct hex:
- `#27AE60` = RGB(39,174,96), L = 0.2697
- Ratio vs #F5EFE0 = (0.9077+0.05)/(0.2697+0.05) = **3.64:1**
- **FAILS** WCAG AA (4.5:1) ✅
- FAILS WCAG AA Large (3:1) — **PASSES** at 3.64:1 ✅

**Finding:** Jade Glow (#27AE60) on pearl white (#F5EFE0) = 3.64:1 — fails WCAG AA normal text (requires 4.5:1), passes WCAG AA large text (requires 3:1).

### ❌ Lucky orange #E67E22 on pearl white #F5EFE0 — VERIFY
- L(#E67E22) = 0.2978
- Ratio = (0.9077 + 0.05) / (0.2978 + 0.05) = **2.96:1**
- **FAILS** WCAG AA (4.5:1), **FAILS** WCAG AA Large (3:1)

**Color defect found:** Lucky Orange text on pearl white in:
- `.status-beta` badge: `color: var(--color-warning)` = `#E67E22` on pearl white background text
- `.pitch-bullets li::before` counter: `color: var(--color-text)` = #F5EFE0 — wait, counter uses `color: var(--color-text)` (pearl white) on vermillion background. Let me re-check.

Actually looking at `pitch-bullets li::before` (theme.css:200-218):
- `background: var(--color-primary)` = `#C0392B` (Vermillion Red)
- `color: var(--color-text)` = `#F5EFE0` (Pearl White)
- Vermillion #C0392B on Pearl #F5EFE0: L(#C0392B) = 0.1141
- Ratio = (0.9077+0.05)/(0.1141+0.05) = **4.05:1**
- **FAILS** WCAG AA (4.5:1), **PASSES** WCAG AA Large (3:1)

The Lucky Orange #E67E22 issue is specifically in `.status-beta`:
- `background: rgba(230,126,34,0.12)` with `color: #E67E22`
- Badge text is 0.6875rem (11px) — very small, definitely not "large text"
- 2.96:1 contrast — **FAILS** all WCAG thresholds

Also: Lucky Orange `#E67E22` used in `pitch-bullets li::before` counter? No — counter uses Vermillion Red as background.

---

## All Other Criteria

### ✅ Focus indicator — 2px gold ring + 4px halo per kit

```css
/* base.css:149-154 */
:focus-visible {
  outline: 2px solid var(--color-focus);      /* #D4A017 Imperial Gold */
  outline-offset: 2px;
  box-shadow: 0 0 0 4px rgba(212,160,23,0.25); /* 4px halo */
}
:focus:not(:focus-visible) { outline: none; }
```

TV/10ft override at `components.css:403-406`: 3px outline + 6px halo at 1280×720+.

**Passes** — but see touch target defects below.

**Files:** `base.css:149-154`, `components.css:403-406`

---

### ⚠️ Touch targets ≥44×44px desktop, ≥48×48px mobile/TV per kit

| Element | Desktop (≥44px) | Mobile (≥48px) | Notes |
|---------|-----------------|-----------------|-------|
| `.nav-menu a` | ⚠️ ~30px | ⚠️ ~30px | padding: 8px 12px; 0.875rem font; fails on mobile |
| `.nav-toggle` | ⚠️ ~30px | ⚠️ ~30px | padding: 8px 8px; only ~30×30px; **critical defect** |
| `.btn` | ⚠️ ~38px | ⚠️ ~38px | padding: 12px 24px; fails on all viewports |
| `.btn-small` | ❌ ~34px | ❌ ~34px | padding: 8px 16px; fails |
| `.btn-large` | ⚠️ ~48px | ⚠️ ~48px | padding: 16px 32px; borderline desktop, passes mobile minimum |
| `.btn` (TV/10ft) | ✅ 52px | N/A | `min-height: 52px` at 1280×720+ |

**Defect:** `.nav-toggle` (the mobile hamburger button) is approximately 30×30px on mobile — below both 44px and 48px minimums.

**Defect:** `.nav-menu a` links are approximately 30px tall on mobile — same issue.

**Defect:** Standard `.btn` is approximately 38px — below 44px.

**Note:** The 48px mobile minimum is met by `.btn-large` (48px), but not by nav elements or standard buttons.

**Files:** `components.css:83-92` (nav-toggle), `components.css:46-58` (nav-menu a), `components.css:166-252` (btn), `components.css:360-387` (mobile nav)

---

### ✅ Layout survives 200% text zoom without horizontal scroll

- All containers use `max-width` with `margin-inline: auto` and `padding-inline`
- Feature grids use `auto-fit` / `minmax()` — reflow gracefully
- No fixed-width overflow elements found
- At 200% zoom, content reflows within viewport

**Files:** `base.css:195-199`, `theme.css:54-76`

---

### ✅ Skip-link: first focusable element, visible on focus, targets #main-content

All 8 pages:
```html
<!-- e.g. index.html:41 -->
<a class="skip-link" href="#main-content">Skip to main content</a>
```

```css
/* base.css:128-146 */
.skip-link {
  position: absolute;
  top: -100%;
  /* ... */
}
.skip-link:focus {
  top: var(--space-4);  /* becomes visible */
  outline: 2px solid var(--color-focus);
  outline-offset: 2px;
}
```

Target: `<main id="main-content" tabindex="-1">` on all 8 pages.

**Passes.** `tabindex="-1"` ensures the target is focusable but doesn't add it to tab order.

**Files:** `index.html:41,68`, `about.html:27,50`, `hub.html:27,50`, `docs.html:27,50`, `plugins.html:27,50`, `download.html:27,50`, `clients.html:27,50`, `features.html:32,55`, `base.css:128-146`

---

### ✅ `aria-current="page"` on current nav link

All 8 pages correctly set `aria-current="page"` on the nav link matching the current page:

| Page | Nav Link |
|------|----------|
| index.html:56 | `<a href="./" aria-current="page">Home</a>` ✅ |
| features.html:44 | `<a href="features.html" aria-current="page">Features</a>` ✅ |
| clients.html:40 | `<a href="clients.html" aria-current="page">Clients</a>` ✅ |
| download.html:41 | `<a href="download.html" aria-current="page">Download</a>` ✅ |
| plugins.html:42 | `<a href="plugins.html" aria-current="page">Plugins</a>` ✅ |
| docs.html:43 | `<a href="docs.html" aria-current="page">Docs</a>` ✅ |
| hub.html:44 | `<a href="hub.html" aria-current="page">Hub</a>` ✅ |
| about.html:45 | `<a href="about.html" aria-current="page">About</a>` ✅ |

**File:** All 8 HTML pages, nav sections

---

### ✅ Landmark roles: one each of role="banner", role="navigation", role="main", role="contentinfo"

| Role | Element | Page |
|------|---------|------|
| `role="banner"` | `<header class="site-header">` | All 8 pages |
| `role="navigation"` | `<nav class="nav-primary" aria-label="Primary navigation">` | All 8 pages |
| `role="main"` | `<main id="main-content" tabindex="-1">` | All 8 pages |
| `role="contentinfo"` | `<footer class="site-footer">` | All 8 pages |

No duplicate landmarks found. `<nav>` also used for footer nav with `aria-label="Footer navigation"`.

**Files:** All 8 HTML pages

---

### ✅ `lang="en"` on html element

All 8 pages: `<html lang="en">`

**Files:** `index.html:2`, `about.html:2`, `hub.html:2`, `docs.html:2`, `plugins.html:2`, `download.html:2`, `clients.html:2`, `features.html:2`

---

### ✅ `prefers-reduced-motion` honored: CSS transitions use it, js/main.js gates animations with matchMedia

**CSS:** `base.css:157-164` — all transitions set to `0.01ms !important` and `scroll-behavior: auto`.

**CSS (selective):** `theme.css:596-598` — `animation: none` for `.hero::before` lantern-rise.

**CSS (selective):** `components.css:410-421` — buttons/cards have `transition: none` under reduced motion.

**JavaScript:** `js/main.js:36` — `matchMedia` gates all IntersectionObserver scroll reveals:
```js
var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!prefersReducedMotion && 'IntersectionObserver' in window) { /* ...reveal animation logic... */ }
else { /* immediately reveal */ }
```

Also: JS injects a `<style>` with reduced motion override for `.scroll-reveal` (line 64).

**Files:** `base.css:157-164`, `theme.css:596-598`, `components.css:410-421`, `js/main.js:35-57,60-66`

---

### ✅ Form labels: all inputs have associated label or aria-label

- `download.html` has no `<form>` or `<input>` elements — informational page only
- No other pages contain form inputs
- **Not applicable** — no forms present

---

## WCAG Contrast Defects Summary

| Element | Foreground | Background | Ratio | Required | Result |
|---------|------------|------------|-------|----------|--------|
| `.status-stable` badge text | #27AE60 (Jade Glow) | pearl white #F5EFE0 | 3.64:1 | 4.5:1 (AA normal) | ❌ FAIL |
| `.status-beta` badge text | #E67E22 (Lucky Orange) | pearl white #F5EFE0 | 2.96:1 | 4.5:1 (AA normal) | ❌ FAIL |
| `.pitch-bullets li::before` counter | #F5EFE0 (Pearl White) | #C0392B (Vermillion) | 4.05:1 | 4.5:1 (AA normal) | ⚠️ BORDERLINE |

**Note on pitch bullets counter:** At 4.05:1, this just barely misses the 4.5:1 threshold for normal text. The counter is 0.75rem (12px) bold — definitely "normal text" by WCAG definition (≤18px regular or ≤14px bold). Recommend darkening the counter text (e.g., use lacquer black) or increasing counter background contrast.

---

## Summary Table

| Criterion | Result | File:Line |
|-----------|--------|-----------|
| Pearl white on lacquer black = 18.8:1 | ✅ PASS | — |
| Imperial gold on lacquer black = 8.1:1 | ✅ PASS | — |
| Pearl white on midnight indigo | ✅ 11.87:1 PASS | — |
| Jade green #27AE60 on pearl white | ❌ 3.64:1 FAIL | `components.css:313-314` |
| Lucky orange #E67E22 on pearl white | ❌ 2.96:1 FAIL | `components.css:319-320` |
| Focus indicator 2px gold + 4px halo | ✅ PASS | `base.css:149-154` |
| Touch targets ≥44px desktop | ⚠️ PARTIAL | `components.css:83-92,166-252` |
| Touch targets ≥48px mobile | ⚠️ PARTIAL | `components.css:83-92,166-252` |
| 200% text zoom no horizontal scroll | ✅ PASS | — |
| Skip link first, visible, targets #main | ✅ PASS | `base.css:128-146` |
| `aria-current="page"` on current nav | ✅ PASS | All 8 HTML files |
| Landmark roles (banner/nav/main/contentinfo) | ✅ PASS | All 8 HTML files |
| `lang="en"` on html | ✅ PASS | All 8 HTML files |
| `prefers-reduced-motion` CSS | ✅ PASS | `base.css:157-164`, `theme.css:596-598`, `components.css:410-421` |
| `prefers-reduced-motion` JS gates animations | ✅ PASS | `js/main.js:36` |
| Form labels | ✅ N/A | — |

**Dimension 6 Score: 74/100**

**Deductions:**
- Jade green status badge text on pearl white: **-10**
- Lucky orange status badge text on pearl white: **-10**
- Pitch bullet counter contrast borderline: **-3**
- Touch targets below minimum on mobile nav (nav-toggle, nav-menu links, standard buttons): **-3**
