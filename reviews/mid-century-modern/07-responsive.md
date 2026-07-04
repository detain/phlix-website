# Responsive Behavior Review — Mid-Century Modern

**Variant**: mid-century-modern
**Round**: 1
**Reviewer**: adversarial-responsive-reviewer (LLM)
**Date**: 2026-07-01

---

## Score

- **Responsive**: 64 / 100

---

## ✅ Passed

- No horizontal scroll at any tested breakpoint — `* { box-sizing: border-box }` is set, images have `max-width: 100%`, all containers use fluid `width: 100%` with `max-width` constraints
- `.container` correctly caps at `1400px` via `--content-width` CSS custom property
- `.container-wide` exists at `1600px` but is unused in HTML (minor — not causing layout issues)
- Grid layouts use `auto-fill minmax()` pattern — inherently fluid, adapts to all widths
- Footer nav collapses from 3-column grid to single column at `width <= 640px`
- `.content-grid` collapses from multi-column to single column at `width <= 768px`
- Nav hamburger menu correctly shows/hides via `.is-open` class toggle at `width <= 900px`
- Mobile nav JS is solid: click toggle, Escape key closes, click-outside closes, `aria-expanded` kept in sync
- Body font-size is `1rem` (16px) on `body` — meets minimum for readable text
- `img { max-width: 100% }` in base.css prevents fixed-px image breakout
- `html { text-size-adjust: 100% }` prevents iOS text inflation
- Hero section uses `clamp()` for title: `clamp(2.5rem, 6vw, 5rem)` — scales fluidly
- Multiple `clamp()`-based type scales in theme.css (.headline-xl, .headline-lg, .headline-md, .display-xl, .number-xl, .hero-title, .hero-sub) — good fluid scaling on those elements
- `prefers-reduced-motion` correctly disables scroll reveals in both CSS and JS
- `.nav-toggle` has `min-width: 48px; min-height: 48px` — meets 48px mobile touch target requirement
- `.btn-icon` has `min-width: 48px; min-height: 48px` — meets 48px mobile touch target requirement
- Skip link present and functional — keyboard accessibility not blocked by responsive issues

---

## ⚠️ Concerns (non-blocking)

- **`.client-status` at `components.css:507`** — Font size is `0.6875rem` (11px). At 11px, this text is essentially unreadable on any device, let alone phones. Falls far below WCAG minimums and the kit's own mobile guidance. — *Increase to at least 0.75rem (12px) minimum; ideally 0.8125rem (13px) to be safely readable*

- **`.ui-label-sm` at `base.css:76`** — Font size `0.75rem` (12px). The kit's mobile guidance specifies "text never drops below ~16px on phones" for body text, and while labels are UI text, 12px on a phone is marginal at best. — *Recommend raising to 0.8125rem (13px) minimum for mobile*

- **`.hero-eyebrow` at `theme.css:226`** — Font size `0.75rem` (12px). This eyebrow/supplemental text appears in the hero at all sizes. On a 320px phone screen, 12px text for a label that introduces the main headline is too small to be accessible. — *Recommend using `clamp(0.75rem, 2vw, 0.875rem)` or at minimum `0.8125rem`*

- **`.footer-copy` at `components.css:211`** — Font size `0.75rem` (12px). Small footer meta text. While footer text is lower priority, 12px on phones is below the stated readable floor. — *Consider increasing to 0.8125rem (13px)*

- **`.body-sm` at `theme.css:61`** — Font size `0.875rem` (14px). This falls below 16px and the kit's stated mobile floor of ~16px for body text. Used in feature-card descriptions and client-card taglines. — *Increase to 1rem to meet the kit's mobile readability standard*

- **Nav breakpoint at `900px` (`components.css:104`)** — All other responsive breakpoints are at `640px` or `768px`. The 900px hamburger trigger is unusually high — most conventions use 768px for tablet/mobile split. This means a user on an iPad in portrait (768px–1024px) will see the hamburger menu rather than the full nav, which may not be the intended tablet behavior per the kit's "2–3 column grids" tablet guidance. — *Consider lowering nav breakpoint to 768px to align with the content-grid breakpoint*

- **No TV-mode handling** — The kit specifies a 10-foot UI with "Bebas Neue numerals at 2× scale" and "bold 4px focus ring" for TV viewport. There is no `@media (min-width: 1920px)` or TV-specific rule anywhere in the CSS. While this is a specialized use case, the kit explicitly calls it out. — *Add TV breakpoint if TV-mode support is intended*

- **`font-size` on fixed-size elements not using `clamp()`** — `.feature-card h3` (1.125rem), `.client-card h2` (1.25rem), `.download-card h3` (1.125rem), `.faq-item dt` (1rem) are all hardcoded with no responsive scaling. On a small phone these are acceptable but could be more robust with `clamp()`. — *Low priority: these are readable at their current sizes*

---

## ❌ Failures (must fix this round)

- **`base.css:76` / `.ui-label-sm`** — `font-size: 0.75rem` (12px). Several interactive and structural elements use this size: `.ui-label-sm` itself, `.hero-eyebrow` (theme.css:226), `.footer-copy` (components.css:211), and the `.client-status` badge at `components.css:507` at a mere `0.6875rem` (11px). These violate the kit's mobile guidance that "text never drops below ~16px on phones" for any visible body/label text, and fail WCAG 2.2 AA minimum for touch interfaces (14px minimum for low-vision accessibility, 12px absolute floor for rare exceptions). — *Required: raise all text nodes below 16px to at least 14px on mobile; ideally use `clamp()` for fluid scaling across all breakpoints*

- **No bottom tab bar** — The kit's mobile guidance explicitly specifies "bottom tab bar" for the mobile experience. The current implementation has only a sticky header nav that collapses to a hamburger at 900px. There is no mobile bottom navigation bar, no full-width poster layout below the header, and no sticky play bar. The site presents the same single-column stack on mobile that it does on desktop, without the kit's prescribed mobile navigation pattern. — *Required: add a mobile-specific bottom navigation bar with primary destination links (Home, Features, Download, About), styled per the kit's teal/cream palette*

- **No sticky play bar** — The kit specifies a "sticky play bar at bottom" for mobile. There is no sticky bottom element of any kind on any page. — *If the site has playable content, add a sticky bottom play bar per kit spec; if no playable content exists, document this as an intentional exception*

- **`components.css:104` — nav breakpoint at 900px creates tablet gap** — The content grid and feature detail sections collapse at `768px`, but the nav menu doesn't collapse until `900px`. This means between 768px–899px, the multi-column content coexists with a full horizontal nav — a layout inconsistency. On iPad portrait (768px) a user gets hamburger but full-width content; on a 900px laptop screen they get full nav alongside multi-column content. — *Required: align the nav breakpoint to 768px to match the content collapse point*

---

## Recommendations (ranked by impact)

1. **Add bottom tab bar for mobile navigation** (impact: high, effort: medium) — The kit's mobile spec requires a bottom tab bar. Implement a fixed-bottom `<nav>` with icon+label links for primary destinations. Use `.nav-bottom` with `position: fixed; bottom: 0; z-index: 100`. Hide on desktop/tablet via `@media (width >= 768px) { display: none }`. This is the most visible gap between the current implementation and the kit's mobile guidance.

2. **Align nav breakpoint to 768px** (impact: high, effort: low) — Change `width <= 900px` to `width <= 768px` in components.css media query. The current 900px breakpoint creates a gap where content columns collapse but nav doesn't.

3. **Audit and raise all font-sizes below 14px** (impact: high, effort: low) — Systematic pass through CSS to raise any `font-size` declared below `0.875rem` (14px). Priority targets: `.client-status` (11px), `.ui-label-sm` / `.hero-eyebrow` / `.footer-copy` (12px), `.body-sm` (14px). Use `clamp()` where possible for fluid behavior.

4. **Fix body-sm to 1rem** (impact: medium, effort: zero) — Change `.body-sm { font-size: 0.875rem }` to `1rem` in theme.css. This meets the kit's 16px floor for readable text on phones.

5. **Add TV-mode breakpoint for 10-foot UI** (impact: medium, effort: low) — Add `@media (min-width: 1920px)` block that scales `.number-xl` and `.number-md` up via `clamp()`, and adds `outline-width: 4px` to `:focus-visible`. Documents intent for TV-mode even if not fully implemented.

6. **Add sticky play bar** (impact: medium, effort: medium) — Per kit mobile spec. Requires understanding whether the site has playable media. If so, implement `position: fixed; bottom: 0; left: 0; right: 0` bar with playback controls.

7. **Consider clamp() on card headings** (impact: low, effort: low) — Apply `clamp(1rem, 2.5vw, 1.25rem)` to `.feature-card h3`, `.client-card h2`, and `.download-card h3` for fluid scaling.

---

## Evidence

### Breakpoints found in CSS

```bash
rg '@media.*width' /home/sites/phlix/phlix-website/sites/mid-century-modern/css/
# theme.css:261 — (width <= 640px) — hero, cta-banner
# theme.css:411 — (width <= 640px) — cta-banner h2
# theme.css:727 — (width <= 768px) — feature-detail, content-grid
# components.css:104 — (width <= 900px) — nav-toggle, nav-menu
# base.css:138 — (prefers-reduced-motion: reduce) — global motion disable
```

### Font sizes below 14px (potential readability issues)

```bash
rg 'font-size.*[0-9]\.(7|8|9)[0-9]*rem' /home/sites/phlix/phlix-website/sites/mid-century-modern/css/
# base.css:69  — .ui-label: 0.8125rem (13px) — OK, just above floor
# base.css:76  — .ui-label-sm: 0.75rem (12px) — ⚠ too small
# base.css:79  — .ui-label-sm: 0.75rem (12px)
# theme.css:41 — .headline-sm: 1.125rem — OK
# theme.css:61 — .body-sm: 0.875rem (14px) — ⚠ below 16px floor
# theme.css:226 — .hero-eyebrow: 0.75rem (12px) — ⚠ too small
# components.css:211 — .footer-copy: 0.75rem (12px) — ⚠ too small
# components.css:507 — .client-status: 0.6875rem (11px) — ❌ critically small
# components.css:324 — .btn-icon min-width: 48px — ✅ touch target OK
# components.css:325 — .btn-icon min-height: 48px — ✅ touch target OK
```

### Touch target verification

```bash
rg 'min-width.*48|min-height.*48' /home/sites/phlix/phlix-website/sites/mid-century-modern/css/
# components.css:40-41 — .nav-toggle: min-width: 48px; min-height: 48px — ✅
# components.css:324-325 — .btn-icon: min-width: 48px; min-height: 48px — ✅
```

### Mobile menu JS behavior

```bash
rg 'is-open|aria-expanded' /home/sites/phlix/phlix-website/sites/mid-century-modern/js/main.js
# Lines 15-16: classList.toggle('is-open') + aria-expanded sync — ✅
# Lines 21-22: click-outside closes menu — ✅
# Lines 27-30: Escape key closes + focus returns to toggle — ✅
```

### Layout container analysis

```bash
rg 'max-width.*[0-9]{4}px' /home/sites/phlix/phlix-website/sites/mid-century-modern/css/
# base.css:133 — --content-width: 1400px — ✅ correct per kit
# theme.css:119 — .container-wide: max-width: 1600px — ⚠ exceeds kit (unused)
# components.css:900px breakpoint — nav breakpoint higher than 768px content break — ❌
```
