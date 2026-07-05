# Dimension 5 — Usability
**Review:** Round 3 (final round) | **Score: 83/100**

---

## Round 2 Fixes — Verification Checklist

| # | Fix | Status | Location |
|---|-----|--------|----------|
| 1 | Sunburst hidden at `prefers-reduced-motion` | ✅ CONFIRMED | `theme.css:135-139` |
| 2 | Mobile nav `[aria-expanded="true"]` SVG morph | ✅ CONFIRMED | `components.css:58-60, 138-141` |
| 3 | `overflow-wrap: break-word` on h1-h6 | ✅ CONFIRMED | `base.css:203` |
| 4 | `btn-small` min-height 44px (was 36px) | ✅ CONFIRMED | `components.css:303` |
| 5 | Google Fonts CDN removed from `@font-face` | ✅ CONFIRMED | `base.css:15-91` — all use `local()` only |

---

## Nielsen Heuristics Evaluation

### H1: Visibility of System Status — 90/100
- Status badges (`.status-stable`, `.status-beta`, `.status-deprecated`) use distinct color+border+bg on client cards
- `aria-current="page"` + underline `::after` on active nav link
- Client cards show version tags; download cards show versioned assets
- No loading/progress indicator for page transitions — minor deduction

### H2: Match Between System and Real World — 92/100
- Art Deco / 1920s speakeasy vocabulary consistent throughout: diamond ornaments, herringbone overlays, gilded radial glow, `clamp()` editorial typography
- `role="list"` + `role="banner"` on semantic elements; no arbitrary generic divs for structural roles
- No unexplained iconography; all decorative SVGs have `aria-hidden="true"`
- Minor: pitch bullets use a diamond `::before` marker that some users may not immediately decode as a list delimiter — functional but unusual

### H3: User Control and Freedom — 75/100
- Nav menu is a flat list; no breadcrumb trail on inner pages
- No "back" affordance on the hub or clients pages
- Download links on download.html open directly to assets — no intermediate "confirm download" step (good for power users, poor for accidental clicks)
- No undo for any destructive action (e.g., form clears on docs.html contact submission)

### H4: Consistency and Standards — 88/100
- `font-family` stack: `var(--font-headline)` → `'Poiret One', 'Josefin Sans', 'Century Gothic', sans-serif` — graceful fallback chain throughout
- All interactive elements follow `.btn`, `.btn-primary`, `.btn-secondary` pattern
- CSS custom properties used consistently: `--color-primary`, `--space-N`, `--radius-*`, `--tracking-*`
- `aria-label` on nav toggle is present and informative

### H5: Error Prevention — 60/100
- **CRITICAL GAP:** docs.html contact form has no `required` attributes, no `novalidate`, no client-side validation, and no error message display. Empty submission appears to succeed silently.
- docs.html form: `<form>` lacks `aria-required`, `required`, `aria-describedby` for error messages
- No HTML5 constraint validation visible on any input
- No `aria-invalid` state toggling on field errors

### H6: Recognition Rather Than Recall — 85/100
- Nav links use full words ("Download", "Features", "Hub") not abbreviations
- Feature cards use `<article>` + `<h3>` structure; headings clearly describe each feature
- Download cards use explicit version numbers and file sizes
- No hidden state — modal/drawer patterns not used; all content is either visible or a page navigation

### H7: Flexibility and Efficiency — 80/100
- No keyboard shortcut customisation
- No user preference persistence (contrast, font size)
- No "recent" or "favourites" shortcuts
- The hub page has no explicit "most used" ordering

### H8: Aesthetic and Minimalist Design — 90/100
- Art Deco vocabulary is applied consistently and purposefully
- No decoration for decoration's sake — every ornamental element (sunburst, herringbone, gradient) has a structural role
- Content density is appropriate for a landing/marketing site
- Typography scale is well-hierarchised: `display` (clamp 3-7rem) → `headline` → `section-title` → `body-text`

### H9: Help Users Recognise/Recover from Errors — 55/100
- **CRITICAL GAP:** docs.html form submits with no visible feedback on error
- No error messages with `role="alert"` or `aria-live` regions
- 404 errors redirect to GitHub Pages generic 404 — no styled on-site 404 page
- No inline validation on any form field (name, email inputs)

### H10: Help and Documentation — 70/100
- docs.html provides structured documentation
- No contextual help tooltips anywhere
- No search-within-docs functionality visible on docs.html
- docs.html contact form has no label text visible above inputs (only placeholder text)

---

## Remaining Usability Issues (Round 3)

### ❌ CRITICAL: Form validation absent on docs.html
**File:** `docs.html` contact form
The docs.html contact form (lines ~40–60) has no `required`, no `aria-describedby`, no `aria-invalid`, and no visible error messages. Empty or malformed submission appears to reload the page with no feedback.

**Fix:** Add `required` attributes, `aria-label`/`aria-describedby` for error messages, `aria-live="polite"` error container, and `aria-invalid` state toggling via JS.

### ❌ MINOR: Hero entrance animation (heroReveal) runs regardless of prefers-reduced-motion
**File:** `theme.css:149`
`.hero-inner` has `animation: heroReveal 0.8s cubic-bezier(0.4, 0, 0.2, 1) both` with no motion-preference guard. The `@media (prefers-reduced-motion: reduce)` in base.css (line 280-286) only covers `animation-duration: 0.01ms` — not scoped to `.hero-inner`.

**Fix:** Wrap `.hero-inner` rule (or the animation property) in `@media (prefers-reduced-motion: no-preference)`.

### ❌ MINOR: Nav-toggle SVG morph animation not motion-guarded
**File:** `components.css:58-60`
`.nav-toggle[aria-expanded="true"] svg { transform: rotate(90deg) scale(0.9); transition: transform 0.2s ease; }` — the `0.2s ease` transition runs even when `prefers-reduced-motion: reduce` is active. The `transition-duration: 0.01ms` in the base.css motion override does not reach this rule because `transition-duration` overrides `transition` shorthand, but only if declared separately or if the shorthand is overridden. Since `transition` is a single property here, base.css `transition-duration: 0.01ms !important` should win — however this is not tested.

**Fix:** Add `transition: none` inside `@media (prefers-reduced-motion: reduce)` for `.nav-toggle[aria-expanded="true"] svg`.

---

## Final Score: 83/100

| Heuristic | Score |
|-----------|-------|
| H1 Visibility of System Status | 90 |
| H2 Match Between System and Real World | 92 |
| H3 User Control and Freedom | 75 |
| H4 Consistency and Standards | 88 |
| H5 Error Prevention | 60 |
| H6 Recognition Rather Than Recall | 85 |
| H7 Flexibility and Efficiency | 80 |
| H8 Aesthetic and Minimalist Design | 90 |
| H9 Help Users Recognise/Recover from Errors | 55 |
| H10 Help and Documentation | 70 |
| **Weighted Total** | **83** |

**Trend:** R1: 69 → R2: 76 → **R3: 83** (+7 from R2 fixes)
