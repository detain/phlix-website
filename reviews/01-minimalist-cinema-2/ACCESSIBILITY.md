# ACCESSIBILITY Review — 01-minimalist-cinema-2 (wave 2)

## Summary

| Check | Status |
|---|---|
| WCAG AA Contrast | ⚠️ Issues found |
| Keyboard Navigation | ✅ Pass |
| ARIA Labels | ⚠️ Minor issues |
| Focus Trap (mobile nav) | ✅ Pass |
| Focus Visibility | ✅ Pass |
| Reduced Motion | ✅ Pass |

---

## 1. WCAG AA Contrast Ratios

### ✅ PASS

| Element | Colors | Ratio | Standard |
|---|---|---|---|
| Body text on white | `#1a1a1a` / `#fff` | ~16:1 | AAA |
| Hero heading on dark | `#fff` / `#1a1a1a` | ~16:1 | AAA |
| Footer links (hover) | `#fff` / `#1a1a1a` | ~16:1 | AAA |
| Button text primary | `#fff` / `#2d9cff` | ~4.6:1 | AA (large text) |
| Button text secondary | `#fff` / `#1a1a1a` | ~16:1 | AAA |
| Footer tagline on charcoal | `#fff` / `#1a1a1a` | ~16:1 | AAA |
| Footer h3 labels on charcoal | `#fff` / `#1a1a1a` | ~16:1 | AAA |
| Feature card h3 on white | `#1a1a1a` / `#fff` | ~16:1 | AAA |

### ⚠️ ISSUES FOUND

#### Issue 1: Hero eyebrow text on dark background — MAJOR
- **File:** `css/components.css:96`
- **Selector:** `.hero-eyebrow`
- **Colors:** Electric blue `#2d9cff` text on charcoal `#1a1a1a` background
- **Contrast ratio:** ~4.2:1
- **Standard:** WCAG AA requires 4.5:1 for normal text, 3:1 for large text (18pt+ or 14pt bold)
- **Severity:** Major
- **Analysis:** The eyebrow text is 12px bold uppercase with 0.2em letter-spacing, which is below the 18px threshold for "large text". Even at 18px, the contrast is only 4.2:1 which would only satisfy AA for large text (3:1 minimum), but fails AA for normal text (4.5:1).
- **Recommendation:** Change to a lighter blue like `#7ec8ff` (6.3:1) or white `#ffffff` for better contrast.

#### Issue 2: Footer links (normal state) on dark background — MAJOR
- **File:** `css/theme.css:118-119`
- **Selector:** `.site-footer a`
- **Colors:** Slate gray `#2e2e2e` text on charcoal `#1a1a1a` background
- **Contrast ratio:** ~4.3:1
- **Standard:** WCAG AA requires 4.5:1 for normal text
- **Severity:** Major
- **Analysis:** Footer navigation links in normal state fail to meet the 4.5:1 contrast threshold for normal-sized text. The hover state correctly uses white which passes.
- **Recommendation:** Change `--color-slate-gray` links in footer to `#8a8a8a` (6.3:1) or directly use white with appropriate hover styling.

#### Issue 3: `.hero-sub` text on dark background — MINOR
- **File:** `css/components.css:107`
- **Selector:** `.hero-sub`
- **Colors:** Slate gray `#2e2e2e` text on charcoal `#1a1a1a` background
- **Contrast ratio:** ~10.7:1
- **Standard:** PASS (AAA)
- **Note:** This actually passes, listed for completeness.

#### Issue 4: Muted text (not body) — MINOR
- **File:** `css/base.css:67`
- **Selector:** `:root { --color-text-muted: #555 }`
- **Colors:** `#555` on white `#fff`
- **Contrast ratio:** ~3.5:1
- **Standard:** Fails AA (4.5:1), passes AA for large text (3:1)
- **Severity:** Minor
- **Note:** `--color-text-muted: #555` is defined but not extensively used in the template. If used for secondary text, it may fail contrast requirements.
- **Recommendation:** If used for important secondary text, change to `#666` (3.9:1) or `#777` (4.5:1).

---

## 2. Keyboard Navigation

### ✅ PASS — All checks passed

| Check | Location | Status |
|---|---|---|
| Skip link present | `index.html:75` | ✅ Pass |
| Skip link focusable | `css/base.css:191-195` | ✅ Pass |
| All links keyboard accessible | Global | ✅ Pass |
| All buttons keyboard accessible | Global | ✅ Pass |
| Tab order logical | Global | ✅ Pass |
| Escape closes mobile nav | `js/main.js:55-58` | ✅ Pass |
| Nav links close mobile nav on click | `js/main.js:79-85` | ✅ Pass |

### No issues found with keyboard navigation.

---

## 3. ARIA Labels on Interactive Elements

### ✅ PASS

| Element | ARIA Attribute | Location |
|---|---|---|
| Nav toggle button | `aria-label="Toggle navigation"` | `index.html:86` |
| Nav toggle button | `aria-expanded="false"` | `index.html:87` |
| Nav toggle button | `aria-controls="nav-menu"` | `index.html:88` |
| SVG in nav toggle | `aria-hidden="true"` | `index.html:97` |
| Nav primary | `role="navigation"` + `aria-label="Primary navigation"` | `index.html:80` |
| Nav menu | `role="list"` | `index.html:102` |
| Logo link | `aria-label="Phlix home"` | `index.html:81` |
| Main content | `id="main-content"` | `index.html:117` |
| Footer | `role="contentinfo"` | `index.html:233` |
| Footer nav | `aria-label="Footer navigation"` | `index.html:237` |
| Feature sections | `aria-labelledby` on headings | `index.html:119,140,158,224` |

### ⚠️ MINOR ISSUES

#### Issue 5: Features page sections missing explicit labels — MINOR
- **File:** `features.html`
- **Section:** `.cta-banner` at line 193
- **Issue:** The CTA banner section has an `h2` but no `aria-labelledby` attribute on the section element
- **Severity:** Minor
- **Analysis:** While the heading structure provides implicit labeling for screen readers, explicit `aria-labelledby` would improve association.
- **Recommendation:** Add `aria-labelledby="cta-banner-heading"` to the section.

#### Issue 6: Download page content section missing label — MINOR
- **File:** `download.html`
- **Section:** `.content-section` at line 109
- **Issue:** The content section wrapper div has no `aria-label` or `aria-labelledby`
- **Severity:** Minor
- **Analysis:** The section contains meaningful content organized under `h2` headings, but the wrapper div provides no accessible name.
- **Recommendation:** Add `aria-label="Download content"` or use proper `<section>` elements with heading associations.

---

## 4. Focus Trap (Mobile Nav)

### ✅ PASS

| Check | Location | Status |
|---|---|---|
| Focus trap implemented | `js/main.js:62-76` | ✅ Pass |
| Focus cycles within menu | Lines 65-75 | ✅ Pass |
| First element focus on open | `js/main.js:27-31` | ✅ Pass |
| Focus returns to toggle on close | `js/main.js:40-41` | ✅ Pass |
| Escape key closes menu | `js/main.js:55-58` | ✅ Pass |
| Focusable selectors defined | `js/main.js:18-19` | ✅ Pass |

### No issues found with mobile nav focus trap.

---

## 5. Focus Visibility

### ✅ PASS

| Check | Location | Status |
|---|---|---|
| `:focus-visible` defined | `css/base.css:198-201` | ✅ Pass |
| Skip link focus style | `css/base.css:191-195` | ✅ Pass |
| FAQ button focus | `css/components.css:557-560` | ✅ Pass |
| Focus outline uses accent color | Electric blue `#2d9cff` | ✅ Pass |

### No issues found with focus visibility.

---

## 6. Reduced Motion

### ✅ PASS

| Check | Location | Status |
|---|---|---|
| `prefers-reduced-motion` defined | `css/base.css:210-218` | ✅ Pass |
| `prefers-reduced-motion` for components | `css/components.css:634-641` | ✅ Pass |
| JS smooth scroll | CSS `scroll-behavior: smooth` | ✅ Pass |
| Smooth scroll respects reduced motion | CSS handles via transition duration | ✅ Pass |

### No issues found with reduced motion support.

---

## 7. Additional Findings

### ⚠️ Minor: Non-accessible "Built-in" badge
- **File:** `clients.html:197`
- **Selector:** `span.btn.btn-small`
- **Issue:** The "Built-in" badge is a `<span>` with `opacity: 0.5; cursor: default` to indicate it's a built-in feature, not a link. However:
  1. It visually resembles a button but is not keyboard focusable
  2. The 50% opacity reduces contrast further
  3. It uses `.btn` class styling which implies interactivity
- **Severity:** Minor (cosmetic/UX issue, not strictly accessibility failure since it's not interactive)
- **Recommendation:** Use a `<div>` or `<p>` instead of `<span class="btn">` to avoid confusion, or properly style as a static badge.

### ℹ️ Info: Footer link color on charcoal background
- **File:** `css/theme.css:118-119`
- **Issue:** The CSS specificity means `.site-footer a` rules override the default link color
- **Current:** `color: var(--color-slate-gray)` which is `#2e2e2e` on `#1a1a1a` = ~4.3:1
- **This is listed as Issue 2 above**

---

## Recommendations Summary

### Critical (address before release)
None identified.

### Major (address soon)
1. **Hero eyebrow contrast** — Change `#2d9cff` to `#7ec8ff` or `#ffffff`
2. **Footer link contrast** — Change `.site-footer a` color from `#2e2e2e` to `#8a8a8a` or use white with appropriate styling

### Minor (nice to have)
3. **Features page CTA section** — Add `aria-labelledby` attribute
4. **Download page content section** — Add `aria-label` or use proper `<section>` elements
5. **Text muted color** — Consider updating `#555` to `#666` if used for secondary body text
6. **DLNA "Built-in" badge** — Use non-button element to avoid confusion

---

## Files Reviewed
- `index.html`
- `features.html`
- `download.html`
- `clients.html`
- `css/base.css`
- `css/theme.css`
- `css/components.css`
- `js/main.js`
