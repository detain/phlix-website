# DIMENSION 5: Usability

**Score: 68 / 100**
**Severity: ⚠️**

---

## Findings

### ✅ What works well

- **Download reachable in ≤2 clicks from home:** Home has "Get Phlix" primary CTA → download.html. Confirmed. `index.html:110`
- **Skip link present and visible on focus:** `.skip-link` is first focusable element, styled with green background, becomes visible on `:focus`. `base.css:191-211`
- **Consistent HTML shell across all 8 pages:** Same header/footer/nav structure, same class names. `index.html:62-98`
- **Correct `aria-current="page"`** on current nav link on every page.
- **Semantic landmarks:** `role="banner"`, `role="navigation"`, `role="contentinfo"` each appear once per page.
- **Mobile nav toggle** has `aria-expanded`, `aria-controls`, `aria-label`. `index.html:82`
- **Esc key closes mobile nav** and focus returns to toggle. `main.js:60-65`
- **Outside click closes mobile nav.** `main.js:67-76`
- **Focus trap within open nav.** `main.js:79-99`
- **`prefers-reduced-motion` honored:** Both CSS (`base.css:248-255`) and JS (`main.js:17-19, 155-160`) gate animations.
- **`transform`/`opacity` for all CSS animations:** `components.css:113-116` (VU pulse uses opacity/transform), `components.css:821-829` (reveal uses opacity/translateY).
- **Primary CTA "Get Phlix" has 8.6:1 contrast** (waveform green `#00E676` on charcoal `#141418`), exceeding the ≥3:1 requirement for large/UI text.
- **All 8 pages include a CTA banner** driving toward download.

### ⚠️ Issues (Recommended Improvements)

1. **Mobile nav breakpoint is too wide (1024px):**
   - **File:** `components.css:176`
   - The hamburger toggle appears at `max-width: 1024px`, which means tablets in landscape orientation (1024px) show a broken nav state — toggle visible, but full desktop nav hidden beneath an off-canvas menu with no visual affordance that it can be opened.
   - **Fix:** Change `@media (max-width: 1024px)` to `@media (max-width: 768px)` in `components.css:176`. Tablets at 768–1024px should still see the horizontal nav.

2. **VU activity indicator occupies header space on mobile with no function:**
   - **File:** `index.html:74-81`, `components.css:74-123`
   - `.nav-activity` (VU bars) is `aria-hidden="true"` but takes `gap: var(--space-2)` and layout space in the header on all screen sizes. On phones it adds clutter without providing any functional value.
   - **Recommended fix:** Hide `.nav-activity` at `max-width: 768px` with `display: none`.

3. **`hover` state adds `transform: translateY(-1px)` to all `.btn` elements:**
   - **File:** `components.css:301-303`
   - On the sticky `.site-header`, `:hover { transform: translateY(-1px) }` on the nav logo creates a visual disconnect between logo and header border, and the transform applies to all 8 nav links equally.
   - **Recommended fix:** Remove `transform: translateY(-1px)` from `.nav-menu a:hover` (keep color/background only) or restrict it to `.btn` class specifically.

4. **Inconsistent `.content-section` usage** on features page vs. spec:
   - **File:** `features.html:94-198`
   - The spec says features page has `.content-section > .content-grid`. Features page wraps content in `<div class="content-section">` but the h2 "Features" heading is not inside it — it lives in `.page-header`. This is visually correct but structurally different from spec.
   - **Recommended improvement:** Move the "Features" `<h2>` back into `.content-section` for consistency with the spec's section structure.

### ❌ Critical Issues (Exact Fix Required)

None identified at the ❌ severity level. No interaction traps, no dead links, primary action obvious.

---

## Score Breakdown

| Heuristic | Status |
|-----------|--------|
| Visibility of system status | ✅ |
| Match system ↔ real world | ✅ |
| User control & freedom | ✅ |
| Consistency & standards | ✅ |
| Error prevention | ✅ |
| Recognition not recall | ✅ |
| Flexibility & efficiency | ⚠️ (mobile nav breakpoint) |
| Aesthetic & minimalist design | ⚠️ (VU bars mobile clutter) |
| Help users recover | ✅ |
| Help & documentation | ✅ |
| Download in ≤2 clicks | ✅ |
| Mobile nav works | ⚠️ (breakpoint too wide) |
| No interaction traps | ✅ |
| Primary action obvious | ✅ |
| No dead links | ✅ |
