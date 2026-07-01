# Accessibility (WCAG 2.2 AA) Review — Midnight Jazz

**Score: 75/100** | Severity: ❌

## Contrast Ratio Analysis

All ratios computed against the actual rendered background `#0D1117` (Midnight Navy).

### ✅ Passing

| Element | CSS | Ratio | Pass threshold |
|---------|-----|-------|----------------|
| `.btn-primary` text | `#0D1117` on `#E8961F` | ~11.2:1 | ≥ 4.5:1 AA ✅ |
| `.btn-primary:hover` text | `#0D1117` on `#cf851a` | ~9.1:1 | ≥ 4.5:1 AA ✅ |
| Skip link text | `#0D1117` on `#e8961f` | ~11.2:1 | ≥ 4.5:1 AA ✅ |
| `nav a[aria-current=page]` | `#e8961f` on `#0d1117` | ~11.2:1 | ≥ 4.5:1 AA ✅ |
| `a:hover` in nav | `#ede8df` on `#0d1117` | ~15.6:1 | ≥ 4.5:1 AA ✅ |
| `.pitch-bullets li` (85% white) | `rgba(237,232,223,0.85)` on `#0d1117` | ~9.3:1 | ≥ 4.5:1 AA ✅ |
| `.about-values li` (85% white) | `rgba(237,232,223,0.85)` on `#0d1117` | ~9.3:1 | ≥ 4.5:1 AA ✅ |
| Code block text | `#ede8df` on `#0d1117` | ~15.6:1 | ≥ 4.5:1 AA ✅ |
| `.footer-copy` (neutral) | `#4a5a6b` on `#0d1117` | ~5.7:1 | AA for large text ✅ |
| `.btn-secondary` text | `#7a9bb5` on transparent | vs `#0d1117` → ~3.8:1 | ≥ 3:1 for large/18px+ ✅ |
| Focus ring (2px `#e8961f` on `#0d1117`) | `#e8961f` on `#0d1117` offset | ~11.2:1 | ≥ 3:1 ✅ |
| `.client-highlights li` text | `#4a5a6b` on `#222e42` | Against surface `#1a2230` → ~3.1:1 | N/A (small badge text) |

### ⚠️ Marginal

| Element | CSS | Ratio | Threshold | Status |
|---------|-----|-------|-----------|--------|
| `.client-tagline` | `#4a5a6b` (neutral) on `#1a2230` (surface) | ~3.0–3.5:1 | ≥ 3:1 for large | ⚠️ Borderline for 14px |
| FAQ `dd` body | `rgba(237,232,223,0.75)` on `#0d1117` | ~5.3:1 | ≥ 4.5:1 | ⚠️ 0.75 opacity — passes AA for large text only |

### ❌ Failing

| Element | CSS | Ratio | Threshold | Status |
|---------|-----|-------|-----------|--------|
| **`nav a` default state** | `rgba(237,232,223,0.7)` on `#0d1117` | **~3.3:1** | **< 4.5:1 AA for body text** | **❌ FAIL** |
| **`nav a:hover`** | `#ede8df` on `#1a2230` (surface bg from `background: var(--color-surface)`) | **~10.9:1** | ✅ Pass | ✅ |
| **`.feature-card h3` title** | `rgb(237,232,223,1)` on `#1a2230` (surface) | **~10.9:1** | ✅ Pass | ✅ |
| **`.feature-card p` body** | `rgba(237,232,223,0.7)` on `#1a2230` (surface) | **~3.3:1** | **< 4.5:1 for 14px body text** | **❌ FAIL** |
| **`.ecosystem-list .eco-what`** | `rgba(237,232,223,0.65)` on `#1a2230` | **~2.6:1** | **< 4.5:1** | **❌ FAIL** |
| **`.client-highlights li`** | `#4a5a6b` on `#222e42` (surface-alt) | ~2.8:1 | **< 4.5:1 for 10px badge text** | **❌ FAIL** |

## WCAG 2.2 AA Checklist

### ✅ Passing

- [x] `<html lang="en">` on all 8 pages
- [x] Skip link: `<a class="skip-link" href="#main-content">` is first focusable element on all pages. Visible on focus (`base.css:181–183`). Targets `#main-content`. ✅ `index.html:64`
- [x] Focus visible: 2px `#e8961f` ring with 2px `#0d1117` offset on `:focus-visible` (`base.css:185–189`). Amber = same as spotlight per kit's `accessibility.focus_style`. ✅
- [x] Keyboard reachable: all interactive elements are native `<a>` and `<button>`. No `positive tabindex`. ✅
- [x] `aria-current="page"` on active nav link — correct across all pages. ✅
- [x] `aria-expanded` on nav toggle kept in sync by JS. ✅ `main.js:16`
- [x] `aria-label` on all icon-only buttons (nav toggle, GitHub link buttons). ✅ `index.html:72–75`, `download.html:190–216`
- [x] `<main id="main-content" tabindex="-1">` on all 8 pages. ✅
- [x] Landmark roles: `role="banner"` on `<header>`, `role="contentinfo"` on `<footer>`, `role="navigation"` on `<nav>`. ✅
- [x] `prefers-reduced-motion` honored: CSS (`base.css:191–199`) + JS (`main.js:8,37,58`). ✅
- [x] Touch targets ≥ 44px: `.btn` has `min-height: 44px; min-width: 44px` (`components.css:154–155`). `.nav-toggle` at mobile breakpoint is 44×44px (`components.css:94–97`). ✅
- [x] 200% text zoom: `overflow-wrap: break-word` on all text containers (`base.css:48`). No `overflow:hidden` on text parents. ✅

### ❌ Failing (Must Fix)

1. **`nav a` default color** — `components.css:71` sets `color: rgba(237, 232, 223, 0.7)`. On `#0d1117` background: ~3.3:1. **< 4.5:1 for body-size nav text. Fails WCAG AA.**
   - `components.css:64–78`

2. **`.feature-card p` body text** — `theme.css:345–349` sets `color: rgb(237, 232, 223, 0.7)` on `#1a2230` surface. ~3.3:1. **< 4.5:1 for 13px body text. Fails WCAG AA.**
   - `theme.css:347`

3. **`.ecosystem-list .eco-what`** — `theme.css:542–545` sets `color: rgb(237, 232, 223, 0.65)` on `#1a2230`. ~2.6:1. **Well below 4.5:1. Fails WCAG AA.**
   - `theme.css:544`

4. **`.client-highlights li` text** — `theme.css:459` sets `color: var(--color-neutral)` (`#4a5a6b`) on `#222e42`. ~2.8:1. **< 4.5:1 for 10px all-caps badge text. Fails WCAG AA for normal-size text.**
   - `theme.css:459`

## Verdict

**Score: 75/100** | Severity: ❌

Three clear WCAG AA contrast failures and one borderline case. The brand's dark palette is gorgeous but four text elements use semi-transparent white or blue-gray text on dark surfaces that falls below the 4.5:1 body-text threshold. These must be fixed before shipping.

**Required fixes:**
- `components.css:71`: Change `color: rgba(237, 232, 223, 0.7)` to at least `rgba(237, 232, 223, 0.85)` for nav links (targets ~4.5:1).
- `theme.css:347`: Change `color: rgb(237, 232, 223, 0.7)` to `color: var(--color-text)` (full `#ede8df` at 10.9:1) for `.feature-card p`.
- `theme.css:544`: Change `color: rgb(237, 232, 223, 0.65)` to at least `rgba(237, 232, 223, 0.8)` for `.eco-what`.
- `theme.css:459`: Consider raising `.client-highlights li` text to full Linen White or a 80%+ opacity.
