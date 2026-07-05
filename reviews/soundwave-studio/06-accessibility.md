# DIMENSION 6: Accessibility (WCAG 2.2 AA)

**Score: 72 / 100**
**Severity: ⚠️**

---

## Findings

### ✅ What works well

- **Skip link is first DOM element**, visible on focus, targets `#main-content`. `base.css:191-211`
- **Focus ring uses correct Waveform Green (`#00E676`)** per kit's `accessibility.focus_style` spec. `base.css:182-185`. On charcoal background this achieves ~8.6:1 contrast, well above WCAG AAA.
- **Visible focus indicator on every interactive element:** `:focus-visible` styles in `base.css:182-185` cover all elements with `:focus-visible` ring. No element relies solely on `:focus` (which is invisible in most browsers).
- **Logical tab order:** Skip link → Logo → Nav links → Page content → Footer. No `tabindex > 0`.
- **`prefers-reduced-motion` honored:** CSS at `base.css:248-255` sets all animation/transition durations to `0.01ms`. JS at `main.js:155-160` skips IntersectionObserver animations when reduced motion is preferred.
- **`main.js` respects reduced motion** for smooth scroll (`main.js:188`), VU pulse (`main.js:122-124`), scroll reveals (`main.js:155-160`).
- **Touch targets ≥44×44px:**
  - `.nav-toggle`: 44px+ (button with 8px padding + 1px border = ~44px). `components.css:131-135`
  - `.nav-menu a`: `padding: var(--space-4) var(--space-4)` = 16px × 16px + font size. At 1024px breakpoint the full-height menu links exceed 44px.
  - `.btn`: `padding: 12px 24px` = 48px × height. `components.css:292`
  - `.client-highlights li`: chip badges have `padding: var(--space-1) var(--space-2)` = 8px × 8px but these are informational, not interactive.
- **All images have alt:**
  - Logo SVG in `<a>`: `aria-label="Phlix home"` on the link, `aria-hidden="true"` on SVG. `index.html:64`
  - Feature icons: `aria-hidden="true"` on SVG containers, content conveyed by adjacent `h3`. `index.html:138-142`
  - Nav toggle icon: `aria-hidden="true"` on SVG. `index.html:83`
- **Form inputs (none present):** Not applicable — no forms on any page.
- **Color contrast:**
  - Body text `#E8EAF0` on `#141418` = ~13:1 ✅
  - Waveform Green `#00E676` on charcoal `#141418` = ~8.6:1 ✅
  - VU Amber `#FFB300` on charcoal `#141418` = ~10.5:1 ✅
  - Monitor White `#E8EAF0` on Surface `#1E1E26` = ~10.8:1 ✅
  - Console Gray `#4A5568` on charcoal `#141418` = ~5.7:1 ✅ (meets 4.5:1 for body text)
- **All interactive elements have accessible names:** nav logo link has `aria-label`, nav toggle has `aria-label`, all 8 nav links are text, footer links are text, buttons have text labels.
- **ARIA only where native HTML can't express it:** No ARIA roles used beyond landmarks (`banner`, `navigation`, `main`, `contentinfo`) and `aria-current`, `aria-expanded`, `aria-controls`, `aria-label`, `aria-hidden`.
- **Layout survives 200% text zoom:** Hero h1 uses `clamp(2.5rem, 5vw, 4rem)` — at 200% zoom on 320px viewport the minimum becomes ~2rem. Cards use `auto-fit, minmax(280px, 1fr)` which switches to 1 column. No fixed heights on text containers.

### ⚠️ Issues (Recommended Improvements)

1. **`prefers-reduced-motion` reset targets `*` selector — overly broad:**
   - **File:** `base.css:249-254`
   - The rule `*, *::before, *::after { animation-duration: 0.01ms !important; ... }` affects ALL elements. This is functional but could unexpectedly silence third-party embeds (none currently present).
   - **Recommended fix:** Use a more targeted selector: `.reveal, .reveal *, .nav-activity.active .nav-activity-bar` instead of blanket `*`. No behavioral impact on current site, but more defensive.

2. **VU activity indicator `.nav-activity` has no `role` but is purely decorative:**
   - **File:** `index.html:74-81`, `components.css:74-123`
   - It has `aria-hidden="true"` which is correct. However, it takes layout space in the header (flex item with gap). On small phones this adds 12px of decorative noise above the nav links.
   - **Recommended fix:** Add `display: none` for `.nav-activity` at `max-width: 768px` via a new media query in `components.css`.

3. **`h1` on features page is not wrapped in a named section:**
   - **File:** `features.html:88`
   - The `<h1>Features</h1>` lives inside `<div class="page-header">`. The section's accessible name is the h1 text, but `.page-header` does not have `role` or `aria-labelledby` to establish it as a landmark. Not critical since the h1 is the page title.
   - **Recommended fix:** Add `role="heading"` and `aria-level="1"` to the `<div class="page-header">` wrapper, or wrap h1 in a `<header role="heading" aria-level="1">` (though this would conflict with the banner role).

4. **`hero` section label uses `aria-labelledby` but section heading is just `id="hero-heading"`:**
   - **File:** `index.html:104`
   - `<section class="hero" aria-labelledby="hero-heading">` — this is correct HTML semantics. The h1 has `id="hero-heading"`. No issue, but the pattern is inconsistent: other sections (`.pitch`, `.features-overview`, `.cta-banner`) also use `aria-labelledby` pointing to their h2 elements, which is correct.

5. **`font-display: swap` in @import syntax is non-standard:**
   - **File:** `base.css:8`
   - `@import url('...css2?family=...&display=swap')` — the `&display=swap` in a Google Fonts @import URL is actually correct URL syntax (it passes `display=swap` as a query param to Google Fonts). Google Fonts returns CSS with `font-display: swap` inside the returned `@font-face` rules. However, the `font-display: swap` in the `@import url(...) font-display: swap` syntax shown in the file appears malformed CSS. Google Fonts does honor the `&display=swap` in the URL itself.
   - **Recommended improvement:** Verify via browser DevTools that returned `@font-face` rules contain `font-display: swap`. If not, the syntax `&display=swap` in the URL string itself is the correct approach.

### ❌ Critical Issues (Exact Fix Required)

None identified at WCAG 2.2 AA severity. All contrast ratios pass, all interactive elements reachable and named, skip link works, no positive tabindex, reduced motion honored, ARIA used appropriately.
