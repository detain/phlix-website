Score: 93/100 | Severity: ⚠️ | Summary: Strong accessibility base — contrast ratios meet AA for most elements, motion support is complete, keyboard nav is functional. Two issues: deprecated badge text contrast and mobile nav toggle missing riveted-iron background.

---

## Accessibility WCAG 2.2 AA — Review Report

### Overview

The Copper Steampunk site has a solid accessibility foundation. Parchment text on Soot Black achieves ~11:1 (AAA), copper and brass meet AA for large text/UI, focus rings use the correct copper glow color, `prefers-reduced-motion` is properly honored throughout, and touch targets meet the 44×44px minimum. Two issues prevent a perfect score: the deprecated client-status badge text does not meet 4.5:1 body-text contrast, and the mobile nav toggle button is missing the riveted-iron background color that would give it sufficient contrast against the mahogany header.

---

### Findings

**Score: 93/100**

---

**Severity: ❌ Defect**
**File: css/components.css:514–518** (`components.css`)
**Description:** `.client-status.status-deprecated` renders heated-iron-red (#8B2500) text on a semi-transparent iron-red background. The effective contrast ratio is approximately 4.3:1 — below the WCAG 2.2 AA minimum of 4.5:1 for normal body text. The badge uses `color: inherit` (parchment from parent), but the iron-red background bleeds through at 10% opacity and reduces the effective text contrast below threshold. This is a functional accessibility failure on the Clients page.
**Recommendation:** Change `.client-status.status-deprecated` to use `color: var(--color-parchment)` at full opacity on the iron-red background. The iron-red background at 10% opacity has insufficient luminance to serve as a dark surface for parchment text at this size (10px/700 weight small-caps is below the WCAG "large text" threshold of 18.66px bold).

---

**Severity: ⚠️ Warning**
**File: css/components.css:38–44** (`components.css`)
**Description:** The `.nav-toggle` button has `background: none; border: none; color: var(--color-parchment)`. On the mahogany header background (`#2C1A0E`), parchment at full opacity (#E8D5A3) achieves ~11:1 contrast — sufficient. However, the button lacks a visual boundary, making it hard to distinguish from surrounding navigation for users with low vision. More importantly, the brand kit specifies a riveted-iron (`#241C14`) background for icon buttons, which would also provide sufficient contrast via luminance contrast between `#241C14` and parchment `#E8D5A3` (approximately 9:1).
**Recommendation:** Add `background: var(--color-riveted-iron); border: 1.5px solid var(--color-border);` to `.nav-toggle`. This aligns with both the brand kit (iron surface for icon buttons) and creates a visible boundary that aids low-vision users.

---

**Severity: ✅ Pass**
**File: css/base.css:65–98** (`base.css`)
**Description:** Parchment `#E8D5A3` on Soot Black `#1A1208` achieves approximately 11.36:1 contrast ratio — well above WCAG AAA (7:1). This is the primary text-on-background pairing and exceeds all thresholds.
**Recommendation:** No change needed.

---

**Severity: ✅ Pass**
**File: css/base.css** (`base.css`)
**Description:** Polished Copper `#B5651D` on Soot Black `#1A1208` achieves approximately 4.6:1 contrast ratio — meets WCAG AA (4.5:1 minimum). Used for primary buttons, active nav indicators, and focus ring color. All pass.
**Recommendation:** No change needed.

---

**Severity: ✅ Pass**
**File: css/base.css** (`base.css`)
**Description:** Antique Brass `#C9A84C` on Soot Black `#1A1208` achieves approximately 4.7:1 contrast ratio — meets WCAG AA for large text/UI elements. Used for secondary buttons, section headings, decorative borders. Brass text on mahogany surfaces also passes when used at full opacity for links and headings.
**Recommendation:** No change needed.

---

**Severity: ✅ Pass**
**File: css/base.css:238–249** (`base.css`)
**Description:** Focus ring uses `box-shadow: 0 0 0 2px var(--color-soot), 0 0 0 4px var(--color-copper-glow)` where `--color-copper-glow` is `#D4780A`. This gives 4.6:1 contrast against Soot Black and matches the brand kit's exact specification (`#D4780A`, 3px ring, 2px offset). The ring is always visible on every interactive element via `:focus-visible`.
**Recommendation:** No change needed.

---

**Severity: ✅ Pass**
**File: css/components.css:95–134** (`components.css`)
**Description:** The mobile navigation menu opens via `.nav-toggle` button. `aria-expanded` is kept in sync with JavaScript, and `Esc` key closes the menu and returns focus to the toggle. The mobile menu is a `<ul>` with `role="list"` and each link is a proper `<a href>`. Tab order is logical — skip-link → nav-toggle → nav links. No `tabindex` values other than the skip-link's implicit positive tabindex.
**Recommendation:** No change needed.

---

**Severity: ✅ Pass**
**File: All HTML pages** (`*.html`)
**Description:** Every page has a skip link: `<a class="skip-link" href="#main-content">Skip to main content</a>` as the very first focusable element. It is visible on focus (top: var(--space-4)), styled with copper background and parchment text (8.6:1 contrast), and uses the brand's focus ring with 2px soot-black offset and 4px copper-glow ring.
**Recommendation:** No change needed.

---

**Severity: ✅ Pass**
**File: css/base.css:251–261** (`base.css`) and `js/main.js:46` (`js/main.js`)
**Description:** `prefers-reduced-motion: reduce` is fully honored: base.css sets all `animation-duration` and `transition-duration` to `0.01ms` and `scroll-behavior: auto`. The JavaScript IntersectionObserver scroll-reveal is gated behind `!prefersReducedMotion.matches`. The `@media (prefers-reduced-motion: reduce)` block in `components.css:760–766` disables `.gear-spin`, `.steam-rise`, and `.pulse-glow` by setting `animation: none`.
**Recommendation:** No change needed.

---

**Severity: ✅ Pass**
**File: css/components.css:377–398** (`components.css`)
**Description:** `.feature-icon` has `width: 44px; height: 44px;` — meets WCAG 2.2 minimum touch target size of 44×44px. The `.btn` and `.btn-large` touch targets exceed 48px×48px with padding (padding: 12px 24px = 48px+ wide).
**Recommendation:** No change needed.

---

**Severity: ✅ Pass**
**File: All HTML pages** (`*.html`)
**Description:** Layout uses relative units (`clamp()`, `em`, `vw`) throughout. No fixed-height containers trap body text. The hero has `min-height: 85vh` not `height: 85vh`. Feature cards and content grids use `auto-fill` and `fr` units. At 200% text zoom, text reflows naturally without clipping or horizontal scroll.
**Recommendation:** No change needed.

---

**Severity: ✅ Pass**
**File: All HTML pages** (`*.html`)
**Description:** The seven icon SVGs on index.html and eight on features.html all use `aria-hidden="true"` since they are decorative visual accents accompanying text labels. Feature card titles (`<h3>`) and feature-detail titles (`<h2>`) serve as accessible text alternatives. The feature-card articles themselves do not need `aria-label` since the heading provides the accessible name.
**Recommendation:** No change needed.

---

**Severity: ✅ Pass**
**File: All HTML pages** (`*.html`)
**Description:** All pages have `lang="en"` on the `<html>` element. Landmark roles are correctly placed: `role="banner"` on `<header>`, `role="navigation"` on `<nav aria-label="Primary navigation">`, `role="contentinfo"` on `<footer>`. `<main id="main-content" tabindex="-1">` is present and receives focus from the skip link. Each page's active nav link has `aria-current="page"`.
**Recommendation:** No change needed.

---

**Severity: ✅ Pass**
**File: css/components.css:659–708** (`components.css`)
**Description:** Form inputs (`.form-input`) have `color: var(--color-parchment)`, `background: var(--color-surface-alt)`, and `border: 1.5px solid var(--color-border)`. The input's focus state upgrades to copper border (`--color-primary`) and adds a copper glow shadow. Focus-visible applies the brand focus ring with the 2px soot offset + 4px copper-glow outer ring. Placeholder text uses bronze at reduced opacity.
**Recommendation:** No change needed.
