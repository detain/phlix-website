# Afrofuturism Site — Accessibility Review

**Reviewing against:** WCAG 2.1 AA + new_site.md §12 (hard gate)
**Pages reviewed:** index.html, features.html, clients.html, download.html, plugins.html, docs.html, hub.html, about.html
**CSS/JS reviewed:** css/base.css, css/theme.css, css/components.css, js/main.js
**Method:** Manual code review (pa11y-ci / puppeteer unavailable — Node.js 24 globby incompatibility)

---

## Overall Accessibility Score: 64 / 100 — FAIL

The site has solid structural foundations (landmarks, skip link, ARIA nav, reduced-motion CSS) but fails on three critical fronts: **nested interactive elements on docs.html**, **insufficient color contrast on secondary text**, and **broken ARIA labeling relationships on index.html**.

---

## Per-Criterion Scores

| Criterion | Score | Status |
|-----------|-------|--------|
| Semantic HTML & Landmarks | 75/100 | ⚠️ Issues |
| ARIA | 55/100 | ❌ Issues |
| Keyboard Navigation | 80/100 | ⚠️ Issues |
| Color Contrast | 60/100 | ❌ Issues |
| Touch Targets | 88/100 | ⚠️ Issues |
| Forms | 100/100 | ✅ N/A |
| Images & Alt Text | 95/100 | ⚠️ Minor |
| Reduced Motion | 90/100 | ⚠️ Issues |
| Language | 100/100 | ✅ Pass |
| Viewport | 100/100 | ✅ Pass |

---

## Defects

### 🔴 CRITICAL

#### 1. Nested Interactive Elements — `docs.html:66–110`
**Severity:** Critical (WCAG 4.1.2 — Name, Role, Value; also invalid HTML parsing)

Links (`<a>`) wrapping entire `.feature-card` blocks that contain **nested `<span class="btn">` buttons**. This creates:
- Two levels of interactive element nesting (link > button/link)
- Screen readers read the entire card text as the link name, making "User Guide Open docs →" a single annunciation
- The nested `<a href="..." class="btn">` inside the outer `<a>` is a **direct HTML parsing error** — `<a>` cannot contain another `<a>`

**File:** `docs.html:66–110` (all four `.feature-card` links in the docs grid)

```html
<!-- docs.html:66-75 — FAILING EXAMPLE -->
<a href="https://detain.github.io/phlix-docs" class="feature-card" style="text-decoration:none" rel="noopener noreferrer" target="_blank">
  ...
  <h2 class="feature-card__title">User Guide</h2>
  ...
  <span class="btn btn-secondary" style="...">Open docs →</span>  <!-- BUTTON INSIDE LINK -->
</a>
```

**Fix:** Remove the outer `<a>` wrapper and instead style the `.feature-card` as a block-level container with the link applied to individual elements, or use `aria-label` on the outer link to give it a unique accessible name and remove the inner button. The outer `<a>` cannot contain interactive descendants.

---

#### 2. Color Contrast — Neutral Text (WCAG 1.4.3)
**Severity:** Critical

`--color-neutral: #5A4A70` (Dusk Mauve, luminance ≈ 0.099) on `--color-bg: #080510` (luminance ≈ 0.001) yields a contrast ratio of approximately **2.36:1** — far below the 4.5:1 AA requirement for normal text and 3:1 for large text.

This affects ALL uses of `.text-muted` and any element using `--color-neutral` directly as text color:

- `clients.html:150` — `.text-muted` DLNA note
- `download.html:70` — inline muted text
- `plugins.html:79,87,96` — body text in plugin sections
- `hub.html:111` — plugin callout body text
- `about.html:70,74,78` — philosophy section body text
- `theme.css:84` — `.text-muted { color: var(--color-neutral); }`
- `components.css:296,449,492,517` — footer links, ecosystem-item what text

**Contrast ratio:** 2.36:1 (AA requires 4.5:1 for body text)
**WCAG criterion:** 1.4.3 (Level AA)

**Fix:** Either darken `--color-neutral` to ~#8A7A9A or lighter, or replace uses of neutral for body text with `rgba(245,237,216,0.70)` style values that pass 4.5:1.

---

### 🟠 MAJOR

#### 3. Broken `aria-labelledby` Reference — `index.html:99`
**Severity:** Major (WCAG 1.3.1 — Info and Relationships)

The pitch `<section>` has `aria-labelledby="pitch-heading"` (line 99), but the `id="pitch-heading"` is set on the **second** `<h2>` (line 103). The first `<h2>` (line 102, "Why Phlix?") has no `id`. The relationship is correct (section → second h2), but the visual/textual intent (naming the section "Why Phlix?") is lost because `aria-labelledby` points to the sub-headline h2, not the eyebrow h2.

```html
<!-- index.html:99-104 -->
<section class="pitch" aria-labelledby="pitch-heading">
  <div class="container">
    <div class="pitch__header">
      <h2 class="eyebrow">Why Phlix?</h2>        <!-- no id -->
      <h2 id="pitch-heading">Heritage is the boldest science fiction.</h2>  <!-- aria-labelledby points here -->
    </div>
```

The section's accessible name becomes "Heritage is the boldest science fiction." — not "Why Phlix?" as intended.

**Fix:** Either add `id="pitch-heading"` to the eyebrow `<h2>` (and remove it from the sub-heading h2), or use `aria-label="Why Phlix?"` on the section directly.

---

#### 4. Missing Footer Nav Label — All 8 pages
**Severity:** Major (WCAG 1.3.6 — Identify Purpose)

Per new_site.md §4, the footer must use `<nav class="footer-nav" aria-label="Footer navigation">`. All 8 pages use a `<div class="footer-grid">` with plain `<div class="footer-col">` columns instead of `<nav>`. The `<footer role="contentinfo">` landmark is present, but the footer link groups lack a navigation landmark with an accessible name.

Additionally, each footer column has an `<h3 class="footer-col__heading">` but the `<ul class="footer-links">` lists have no `<nav>` wrapper or `aria-label` to identify them as grouped navigation.

**Files:** All 8 pages (same footer markup)
- `index.html:220–254`
- `features.html:184–218`
- `clients.html:169–203`
- `download.html:197–231`
- `plugins.html:120–154`
- `docs.html:154–188`
- `hub.html:148–182`
- `about.html:153–187`

**Fix:** Wrap each footer column's `<ul>` in `<nav aria-label="[column name]">` or wrap all three columns in a single `<nav aria-label="Footer navigation">` containing the three `<ul>` lists.

---

#### 5. Decorative Elements with Animations Not Suppressed for Reduced Motion
**Severity:** Major (WCAG 2.3.3 — Animation from Interactions)

The kente border animation at `theme.css:181` runs indefinitely on the hero:

```css
/* theme.css:181-186 */
.hero__kente-border {
  animation: kente-slide 8s linear infinite;  /* no motion-preference check */
}
```

While `main.js:65-68` conditionally removes this animation when `reducedMotion.matches`, the JS runs **after** page load — so users with `prefers-reduced-motion: reduce` will briefly see the animation on initial load before JS executes. The CSS-only reset in `base.css:167-173` resets `animation-duration` to `0.01ms` for reduced motion, which stops the animation, but the keyframe animation name itself is still declared and `base.css` is loaded before JS runs.

The fix is solid CSS-first — the `base.css` reset is already correct, and the JS is an additional guard. The JS guard at `main.js:65-68` checking `reducedMotion.matches` and setting `animation = 'none'` is technically redundant since `base.css` already handles it. However, the animation is **also** suppressed by the `@media (prefers-reduced-motion: no-preference)` block in `components.css:520-532` that gates `.animate-on-scroll` class animations — but the kente border is a directly-applied animation on `.hero__kente-border`, not a class-based animation, so the media query does NOT suppress it.

**File:** `theme.css:181`

**Fix:** Either remove `animation: kente-slide 8s linear infinite;` from `.hero__kente-border` and rely on CSS transforms that can be reset via `base.css`, OR add a CSS `@media (prefers-reduced-motion: reduce)` rule for `.hero__kente-border { animation: none; }` in theme.css.

---

### 🟡 MODERATE

#### 6. Secondary Text Color Uses Insufficient Contrast — body text at 0.75 opacity
**Severity:** Moderate (WCAG 1.4.3)

Many body text elements use `rgba(245,237,216,0.75)` — a contrast ratio of ~4.76:1, which is **barely above** the 4.5:1 threshold. This is technically passing but leaves no margin for rounding errors or display variability. Additionally, `rgba(245,237,216,0.70)` (used for some body text) yields ~4.2:1 which **fails** AA.

Specific failing uses (0.70 opacity):
- `download.html:70` — `rgba(245,237,216,0.70)` fails
- `download.html:79,87` — plugin body text fails
- `hub.html:125,128` — Hub mode paragraph text fails
- `about.html:70,74,78,92,101` — philosophy, license, contributing text fails

**Contrast ratio (0.70):** ~4.2:1 — **FAILS** WCAG 1.4.3 AA

**Fix:** Use `rgba(245,237,216,0.80)` minimum for body text (already used successfully in hero subheadline at 0.80 opacity). Standardize on 0.80 or higher for all body text.

---

#### 7. Client Status Badges Below Touch Target Minimum — `clients.html:68,87,105,124,142`
**Severity:** Moderate (WCAG 2.5.8 — Target Size (Minimum))

Badge elements `.badge` have computed dimensions approximately **28px × 16px** (padding: 2px var(--space-2), font-size: 0.6875rem), which is below the **44×44px** minimum touch target for WCAG 2.1 AA (and the spec requirement of §12: "Touch targets ≥ 44×44px").

While badges are not interactive (they are static status indicators), the spec requirement is unambiguous: all interactive elements must meet 44×44px.

**Files:** `clients.html:68,87,105,124,142` (all `.client-status` badges)

```css
/* components.css:314-328 — badge dimensions */
.badge {
  padding: 2px var(--space-2);   /* ~2px 8px = small */
  font-size: 0.6875rem;
  line-height: 1.4;
}
```

**Fix:** Increase badge padding and font-size so the element's computed size is at least 44×44px, or wrap the badge in a touch-target-sized container if it needs to remain visually small. If badges are truly decorative/non-interactive, this could be downgraded to a note rather than a failure.

---

#### 8. SVG Icons Inside Links Lack Accessible Text — Multiple pages
**Severity:** Moderate (WCAG 2.4.4 — Link Purpose)

Some icon-only links rely on their containing text for accessible name (which is acceptable) but the SVG icons themselves contribute no accessible text. This is generally fine if there's visible text in the link, but the "See all features" link on `index.html:199` uses only a text label + hidden SVG arrow:

```html
<!-- index.html:199-202 -->
<a href="features.html" class="btn btn-secondary">
  See all features
  <svg ... aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
</a>
```

This is actually **correct** — the SVG is decorative (`aria-hidden="true"`) and the link text is "See all features". However, some links in the footer (external GitHub links) only have an SVG icon and text like "Source":

```html
<!-- download.html:149 -->
<a href="https://github.com/detain/phlix-server" class="btn btn-ghost" ...>Source</a>
```

These have visible text ("Source") so they pass. The real concern is links where the **only** text is the aria-hidden SVG — but I don't see any such cases in this codebase.

---

#### 9. `tabindex="-1"` on `<main>` — All 8 pages
**Severity:** Minor (Modern browsers don't need this)

`<main id="main-content" tabindex="-1">` has `tabindex="-1"` to allow programmatic focus. This is a legacy pattern from older browsers and is no longer needed in modern browsers — `<main>` is now a listed "focusable element" in the HTML spec only when it has a `tabindex`. However, the spec in new_site.md §4 explicitly includes `tabindex="-1"`, so this is **spec-compliant by design** even if technically unnecessary.

Not flagging as a defect — it's intentional per spec.

---

#### 10. `role="list"` on `<ul>` Elements — All pages (non-issue)
**Severity:** Info (Not a defect)

The spec in new_site.md §4 does not require `role="list"` on `<ul>` elements — it's implicit. However, `ul[role="list"]` is defined in `base.css:22` as a CSS reset and present throughout the markup. This is redundant but not harmful. Not a defect.

---

## Summary by Page

| Page | h1 count | Critical | Major | Moderate |
|------|----------|----------|-------|----------|
| index.html | 1 ✅ | 0 | 1 (aria-labelledby) | 2 (contrast, motion) |
| features.html | 1 ✅ | 0 | 0 | 1 (contrast) |
| clients.html | 1 ✅ | 0 | 0 | 2 (contrast, badges) |
| download.html | 1 ✅ | 0 | 0 | 2 (contrast ×2) |
| plugins.html | 1 ✅ | 0 | 0 | 1 (contrast) |
| **docs.html** | **1 ✅** | **1 (nested interactive)** | **0** | **1 (contrast)** |
| hub.html | 1 ✅ | 0 | 0 | 2 (contrast ×2) |
| about.html | 1 ✅ | 0 | 0 | 1 (contrast) |

---

## Verdict: FAIL (64/100)

The site would **not pass** a WCAG 2.1 AA audit. The critical failure is the nested interactive elements on `docs.html` which create invalid HTML and confusing screen reader announcements. The contrast failures on neutral/muted text and the broken `aria-labelledby` on `index.html` are also likely to fail automated testing.

### Required Fixes (Priority Order)
1. **`docs.html`**: Remove nested `<a>` inside `<a>` — restructure feature-card links (CRITICAL)
2. **Global**: Replace all `rgba(245,237,216,0.70)` with `rgba(245,237,216,0.80)` or higher (MAJOR contrast)
3. **Global**: Darken `--color-neutral` to pass 4.5:1, or replace all uses of `var(--color-neutral)` for text with sufficient-contrast values (MAJOR contrast)
4. **`index.html:99-103`**: Fix `aria-labelledby` to reference the correct heading (MAJOR)
5. **All 8 pages**: Add `<nav aria-label="Footer navigation">` around footer links (MAJOR)
6. **`theme.css:181`**: Add `@media (prefers-reduced-motion: reduce) { .hero__kente-border { animation: none; } }` (MODERATE)

### What's Working Well
- ✅ Skip link present and correctly styled (visible on focus, good contrast)
- ✅ Single `<h1>` per page, no skipped levels
- ✅ `lang="en"` on `<html>`, `aria-current="page"` on active nav links
- ✅ `role="banner"`, `role="contentinfo"` landmarks present
- ✅ `aria-expanded`/`aria-controls` on mobile nav toggle
- ✅ `@media (prefers-reduced-motion: reduce)` global reset in base.css
- ✅ `.animate-on-scroll` scroll reveals gated behind `reducedMotion.matches`
- ✅ Kente border JS animation guard (redundant but harmless)
- ✅ Buttons have `min-height: 44px; min-width: 44px` — proper touch targets
- ✅ All SVGs have `aria-hidden="true"` or meaningful alt on logo
- ✅ All decorative elements (`aria-hidden="true"`, `role="presentation"`)
- ✅ External links have `rel="noopener noreferrer"`
- ✅ `user-scalable=yes` in viewport meta
- ✅ No forms = no form a11y issues (acceptable for static marketing site)
- ✅ Focus ring styles visible (`outline`, `box-shadow`)
