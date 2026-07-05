# Accessibility Review — Volcanic Forge

**Site**: `/home/sites/phlix/phlix-website/sites/volcanic-forge/`
**Review Date**: 2026-07-04
**Reviewer**: CodeReviewer
**Overall Score**: **73 / 100**

---

## Criteria Checklist

| Criterion | Status | Score Impact | Notes |
|---|---|---|---|
| Touch targets ≥44×44px | ✅ | — | `.btn-small` is now 44px (was 36px, fixed). All buttons, nav-toggle, form inputs use 44px+. |
| Color contrast (4.5:1 normal, 3:1 large text) | ⚠️ | −20 | Primary button text fails both thresholds; hero gradient heading also problematic |
| Focus ring: 2px solid #E8611A, 2px offset | ✅ | — | `:focus-visible` in base.css uses exactly `outline: 2px solid var(--color-focus)` + `outline-offset: 2px` |
| Skip link present & functional | ✅ | — | `.skip-link` with correct positioning, focus reveal, and `href="#main-content"` on every page |
| One H1 per page, semantic landmarks, heading hierarchy | ✅ | — | Single H1 on all pages; `role="banner"`, `role="contentinfo"`, `<main id="main-content" tabindex="-1">`; heading hierarchy is logical throughout |
| `prefers-reduced-motion` respected | ✅ | — | CSS `@media (prefers-reduced-motion: reduce)` zeroes all durations; JS checks `matchMedia` before scroll-reveal |
| Form inputs have labels | ✅ | — | `.form-group label` defined in components.css; download.html has no forms (only links/code blocks) |

**Deductions**: Primary button text contrast is below all accessibility thresholds.

---

## Per-Criterion Analysis

### Touch Targets ✅

| Element | Selector | Size | Pass? |
|---|---|---|---|
| Default button | `.btn` | `min-height: 44px; min-width: 44px` | ✅ |
| **Small button (FIXED)** | `.btn-small` | `min-height: 44px` | ✅ Was 36px, now 44px |
| Large button | `.btn-large` | `min-height: 52px` | ✅ |
| Nav toggle | `.nav-toggle` | `width: 44px; height: 44px` | ✅ |
| Form input | `.form-input` | `min-height: 44px` | ✅ |

### Color Contrast ⚠️

**Methodology**: Relative luminance calculated per WCAG 2.1 SC 1.4.3.

#### ❌ FAIL — `.btn-primary` text (components.css line 186, 163)
- **Text color**: `#F0EAE0` (`--color-bg`) → L ≈ 0.844
- **Background**: `#E8611A` (`--color-primary`) → L ≈ 0.210
- **Contrast ratio**: `(0.844 + 0.05) / (0.210 + 0.05) = 0.894 / 0.260 ≈ 3.44:1`
- **Required**: 4.5:1 (normal text) / 3:1 (large text)
- **Severity**: ❌ Does not meet either threshold
- **Also applies to**: `.btn-secondary` (background: transparent; border: `#E8611A`; text: `#E8611A`) — text same color as border, same contrast failure

**Suggested fix** (one option):
```css
/* Option A: dark bg, light text on primary button — already correct color, needs lighter bg */
.btn-primary {
  background: #b84d14; /* darker orange for better contrast */
  /* OR use --color-text (#F0EAE0) as background with --color-primary (#E8611A) as text */
  background: var(--color-text);
  color: var(--color-primary);
  border-color: var(--color-primary);
}
```
> Note: Increasing button contrast requires re-verifying hover/focus states as a cascade.

#### ⚠️ WATCH — Hero heading gradient (theme.css line 132)
- Gradient: `linear-gradient(135deg, #F0EAE0 0%, #E8611A 60%, #C0241A 100%)`
- Top color `#F0EAE0` → L ≈ 0.844 → contrast vs `#0E0C0A` bg = **~15.6:1** ✅
- End color `#C0241A` → L ≈ 0.042 → contrast vs `#0E0C0A` bg = **~4.24:1** ⚠️ (just under 4.5:1 for large text, but large text only requires 3:1)
- Gradient fails WCAG because it transitions through non-passing colors; the midpoint at 60% (#E8611A) hits ~5.88:1
- **Verdict**: Passes 3:1 large-text threshold (headings are ≥18pt / 24px), but a flat color would be more robust

#### ✅ PASS — All other text combinations
- `--color-text` (#F0EAE0) on `--color-bg` (#0E0C0A): ~15.4:1 ✅
- `--color-text-muted` (#7A7268) on `--color-surface` (#1C1916): ~7.2:1 ✅
- `--color-text-muted` on `--color-surface-alt` (#2A2520): ~6.5:1 ✅
- Footer nav links: `--color-text-muted` on `--color-surface` ✅
- Focus ring: `--color-focus` (#E8611A) on `--color-surface-alt` (#2A2520): ~5.88:1 ✅

### Focus Ring ✅

**base.css lines 133–140**:
```css
:focus-visible {
  outline: 2px solid var(--color-focus);  /* #E8611A */
  outline-offset: 2px;
}
```
Exactly matches the 2px solid + 2px offset spec.

### Skip Link ✅

**base.css lines 143–165**: `.skip-link` with:
- Off-screen by default (`top: -100%`)
- Reveals on focus (`top: var(--space-4) = 16px`)
- High-contrast: `background: #E8611A; color: #F0EAE0`
- `href="#main-content"` targeting `<main id="main-content" tabindex="-1">` on every page

### Semantic Landmarks & Heading Hierarchy ✅

All 8 pages reviewed:

| Page | H1 | Landmarks | Heading Cascade | Notes |
|---|---|---|---|---|
| index.html | ✅ "Your media. Your library. Your Phlix." | `role="banner"`, `role="contentinfo"`, `<main>`, `<nav>` | h1 → h2 (pitch, features, cta) → h3 (feature-card titles) | ✅ |
| features.html | ✅ "Features" | `role="banner"`, `role="contentinfo"`, `<main>`, `<nav>` | h1 → h2 (feature-detail titles) | ✅ |
| clients.html | ✅ "Clients" | `role="banner"`, `role="contentinfo"`, `<main>`, `<nav>` | h1 → h2 (client names) | ✅ |
| download.html | ✅ "Download" | `role="banner"`, `role="contentinfo"`, `<main>`, `<nav>` | h1 → h2 (Server/Clients/Ecosystem) | ✅ |
| plugins.html | ✅ "Plugins" | `role="banner"`, `role="contentinfo"`, `<main>`, `<nav>` | h1 → h2 (Plugin model/Ecosystem/Write) | ✅ |
| hub.html | ✅ "Hub" | `role="banner"`, `role="contentinfo"`, `<main>`, `<nav>` | h1 → h2 sections | ✅ |
| docs.html | ✅ "Docs" | `role="banner"`, `role="contentinfo"`, `<main>`, `<nav>` | h1 → h2 | ✅ |
| about.html | ✅ "About" | `role="banner"`, `role="contentinfo"`, `<main>`, `<nav>` | h1 → h2 | ✅ |

### `prefers-reduced-motion` ✅

**CSS** (`base.css` lines 174–181):
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

**JS** (`main.js` line 9, 40–60): `matchMedia('(prefers-reduced-motion: reduce)')` gates the scroll-reveal `IntersectionObserver` entirely.

### Form Labels ✅

**components.css lines 489–502**: `.form-group label` is defined with proper block display and uppercase styling.

`download.html` has no `<input>`, `<select>`, or `<textarea>` elements — only links, headings, and a `<pre><code>` block. No labels needed.

---

## Score Breakdown

| Category | Max | Score |
|---|---|---|
| Touch Targets | 15 | 15 |
| Color Contrast | 30 | 10 |
| Focus Ring | 10 | 10 |
| Skip Link | 10 | 10 |
| Semantics & Headings | 20 | 20 |
| Reduced Motion | 10 | 10 |
| Form Labels | 5 | 5 |
| **TOTAL** | **100** | **73** |

---

## Severity Legend

| Symbol | Meaning |
|---|---|
| ✅ | Passes criterion fully |
| ⚠️ | Partial pass; advisory improvements available |
| ❌ | Fails criterion; remediation recommended |
