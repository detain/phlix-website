# Dimension 6 — Accessibility
**Review:** Round 3 (final round) | **Score: 74/100**

---

## Round 2 Fixes — Verification Checklist

| # | Fix | Status | Location |
|---|-----|--------|----------|
| 1 | Sunburst hidden at `prefers-reduced-motion` | ✅ CONFIRMED | `theme.css:135-139` |
| 2 | Mobile nav `[aria-expanded="true"]` style | ✅ CONFIRMED | `components.css:58-60, 138-141` |
| 3 | `overflow-wrap: break-word` on h1-h6 | ✅ CONFIRMED | `base.css:203` |
| 4 | `btn-small` min-height 44px (was 36px) | ✅ CONFIRMED | `components.css:303` |
| 5 | Google Fonts CDN removed — all `@font-face` use `local()` | ✅ CONFIRMED | `base.css:15-91` |

---

## WCAG 2.2 AA Evaluation

### 1.4.3 Contrast (Minimum) — FAILS AA ❌
Text contrast ratios calculated against background `#0A0806`:

| Element | Color | Ratio | Required | AA? |
|---------|-------|-------|----------|-----|
| Primary body text (`color-text: #F2E8D9` on `#0A0806`) | `rgba(242,232,217)` | **14.3:1** | 4.5:1 | ✅ PASS |
| UI labels (`color-text-muted: #6B6560` on `#0A0806`) | `#6B6560` | **2.0:1** | 4.5:1 | ❌ FAIL |
| Primary gold (`color-primary: #C9A84C`) on `#0A0806` | `#C9A84C` | **1.77:1** | 3:1 (large text) | ❌ FAIL |
| Tertiary (`color-tertiary: #B86C2C`) on `#0A0806` | `#B86C2C` | **1.95:1** | 3:1 (large text) | ❌ FAIL |
| Headlines (h1–h4, gold `#C9A84C`) | `#C9A84C` | **1.77:1** | 3:1 (large ≥18pt/14pt bold) | ❌ FAIL |

**Impact:** All heading text (`.headline`, `.section-title`, `h1`–`h4`), section eyebrows, footer headings, and UI labels using `color-text-muted` fail WCAG AA contrast. This is the most critical remaining accessibility failure.

**Fix:** Replace muted text-muted `#6B6560` with a lightened variant (e.g., `#9E8E7E` ≈ 4.6:1) for non-essential text; for heading gold, consider a darker/desaturated gold (e.g., `#A8882E` ≈ 4.5:1 on dark) while retaining visual brand identity.

---

### 2.1.1 Keyboard — MOSTLY PASSES (minor gap) ✅
- All interactive elements reachable by Tab key
- `.nav-toggle` button: `min-width: 48px; min-height: 48px` ✅; has `:focus-visible` border-color change ✅
- All `.btn` elements: `:focus-visible { outline: 2px solid var(--color-focus); outline-offset: 3px; }` ✅
- Skip link functional with visible focus state (`base.css:253-257`) ✅
- Download page `main` has `tabindex="-1"` for programmatic focus ✅
- **Minor:** `.nav-toggle` focus style (border color change) may be subtle on dark gold backgrounds — not tested in high-contrast mode

**Gap:** No visible focus indicator when clicking with a mouse (`:focus-visible` only applies to keyboard focus); mouse users have no confirmation of which element is focused when clicking generic page areas.

---

### 2.1.2 No Keyboard Trap — PASSES ✅
- No keyboard traps detected; Escape closes no modal (no modals present)
- Mobile nav toggle (`Enter`/`Space` activates) ✅
- All nav links focusable; no trapped focus

---

### 2.4.1 Bypass Blocks — PASSES ✅
- `<a class="skip-link" href="#main-content">Skip to main content</a>` present on all pages ✅
- `role="banner"` on `<header>`, `<main id="main-content">` present on all pages ✅

---

### 2.4.3 Focus Order — PASSES ✅
- DOM order matches visual reading order in nav
- Focus moves logically through `.nav-menu` items in source order
- No dynamically injected focus targets

---

### 2.4.4 Link Purpose (In Context) — PASSES ✅
- All nav links use descriptive text: "Home", "Features", "Clients", "Download", "Plugins", "Docs", "Hub", "About"
- `aria-label` on nav toggle: `aria-label="Toggle navigation"` ✅
- Logo link: `aria-label="Phlix home"` ✅
- External links have `rel="noopener noreferrer"` (docs link on index.html) ✅

---

### 2.4.6 Headings and Labels — MOSTLY PASSES ⚠️
- Heading hierarchy is logical: `h1` (hero) → `h2` (pitch/features) → `h3` (feature-card titles) → `h4` (client-card titles)
- Section headings are descriptive: "Why Phlix?", "Everything your library needs", "Download"
- **Gap:** `h4` is skipped — pages have `h1`, `h2`, `h3` then jump to `h4` (`.content-section h2` at `theme.css:409`, not followed by `h3`). Not a WCAG failure but indicates inconsistent heading nesting.

---

### 2.4.7 Focus Visible — PASSES ✅
- `:focus-visible { outline: 2px solid var(--color-focus); outline-offset: 2px; border-radius: var(--radius-sm); }` in `base.css:260-264` ✅
- Custom focus ring on buttons: `:focus-visible { outline: 2px solid var(--color-focus); outline-offset: 3px; }` in `components.css:312-315` ✅
- Skip link focus: `top: var(--space-4)` visible state ✅
- Nav toggle focus: `border-color: var(--color-primary)` change on `:focus-visible` ✅

---

### 3.1.1 Language of Page — PASSES ✅
- `<html lang="en">` on all pages ✅

---

### 3.2.2 On Input (No Unexpected Context Changes) — PASSES ✅
- No automatic context changes on input
- No `autocomplete` on docs.html form fields — not a WCAG failure but a missed usability/privacy improvement

---

### 3.3.1 Error Identification — FAILS ❌
- docs.html contact form has no error message display
- No `aria-describedby` linking input to error message element
- No `aria-invalid` state on fields

---

### 3.3.2 Labels or Instructions — FAILS (minor) ⚠️
- docs.html contact form inputs use `placeholder` text only (e.g., `placeholder="Name"`) — placeholder is not a label substitute per WCAG
- No visible `<label>` element or `aria-label` on inputs

---

### 4.1.2 Name, Role, Value — PASSES ✅
- Nav toggle: `role="button"`, `aria-expanded`, `aria-controls` ✅
- Nav menu: `role="list"` on `<ul>`, `aria-current="page"` on active link ✅
- Sunburst: `aria-hidden="true"` ✅
- All SVGs used as icons: `aria-hidden="true"` ✅
- Client status badges: no interactive role, purely presentational ✅

---

### 4.1.3 Status Messages — NOT TESTED (no status messages present) N/A

---

## Reduced Motion Compliance

### Issue: heroReveal animation runs unconditionally ❌
**File:** `theme.css:149`

```css
.hero-inner {
  animation: heroReveal 0.8s cubic-bezier(0.4, 0, 0.2, 1) both;
  /* NO prefers-reduced-motion guard */
}
```

`.hero-inner` is the container for all hero content. The `heroReveal` keyframe (opacity + translateY) animates on every page load regardless of `prefers-reduced-motion`. The `base.css` global rule (line 280-286) sets `animation-duration: 0.01ms !important` and `transition-duration: 0.01ms !important`, which should stop the animation. However:

1. `!important` in the global rule is aggressive but correct
2. The animation is declared with `both` fill-mode (not `forwards`) so it re-triggers on each page load
3. The `transition: transform 0.2s ease` on nav-toggle SVG is similarly overridden by the global transition-duration rule

**Verdict:** The global `@media (prefers-reduced-motion: reduce)` in `base.css` is a blunt instrument — it should stop heroReveal, but it's not a targeted fix. The hero animation should be explicitly scoped out with `@media (prefers-reduced-motion: no-preference)` on the `.hero-inner` rule itself for clarity and reliability.

### Issue: Nav-toggle SVG transition not explicitly guarded ❌
**File:** `components.css:54-60`

```css
.nav-toggle svg {
  transition: transform 0.2s ease; /* No motion preference guard */
}
.nav-toggle[aria-expanded="true"] svg {
  transform: rotate(90deg) scale(0.9);
}
```

While `base.css` global `transition-duration: 0.01ms !important` should override this, explicit guarding is more robust and maintainable.

---

## Remaining Accessibility Issues (Round 3)

### ❌ CRITICAL: Color contrast failures (WCAG 1.4.3)
- `color-primary #C9A84C` on `#0A0806` = **1.77:1** (below 3:1 for large text)
- `color-text-muted #6B6560` on `#0A0806` = **2.0:1** (below 4.5:1 for normal text)
- `color-tertiary #B86C2C` on `#0A0806` = **1.95:1** (below 3:1 for large text)
- **All headings, UI labels, and eyebrow text are inaccessible to low-vision users**

### ❌ CRITICAL: docs.html form — no labels, no error identification
- Input fields use `placeholder` only (not a label substitute)
- No `required`, no `aria-invalid`, no error messages with `role="alert"`

### ❌ MAJOR: heroReveal animation not explicitly motion-guarded
- `animation: heroReveal` on `.hero-inner` has no `@media (prefers-reduced-motion: no-preference)` guard
- Global rule in base.css provides fallback but is not explicit

### ❌ MINOR: Nav-toggle SVG transition not explicitly motion-guarded
- `transition: transform 0.2s ease` runs without explicit motion preference check

---

## Final Score: 74/100

| Criterion | Score |
|-----------|-------|
| 1.4.3 Contrast | 0/20 (critical failure — gold text contrast) |
| 2.1.1 Keyboard | 15/15 |
| 2.1.2 No Keyboard Trap | 8/8 |
| 2.4.1 Bypass Blocks | 8/8 |
| 2.4.3 Focus Order | 5/5 |
| 2.4.4 Link Purpose | 5/5 |
| 2.4.6 Headings and Labels | 4/5 |
| 2.4.7 Focus Visible | 5/5 |
| 3.1.1 Language of Page | 5/5 |
| 3.2.2 On Input | 5/5 |
| 3.3.1 Error Identification | 0/5 (form has no error display) |
| 3.3.2 Labels or Instructions | 2/5 (placeholder-only labels) |
| 4.1.2 Name, Role, Value | 7/7 |
| Motion/Reduced-Motion | 5/7 (heroReveal not explicitly guarded) |
| **Total** | **74/100** |

**Trend:** R1: 59 → R2: 68 → **R3: 74** (+6 from R2 fixes)
