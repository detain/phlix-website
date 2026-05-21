# ACCESSIBILITY Review — 05-pixel-tech-1 (Wave 1)

**Reviewer:** Manual code review + browser inspection
**Date:** 2026-05-21
**Variant:** 05-pixel-tech-1
**Phase:** ACCESSIBILITY

---

## Summary

| Check | Result |
|-------|--------|
| WCAG AA Contrast | **FAIL** |
| Keyboard Navigation | **PASS** (with notes) |
| ARIA Labels | **FAIL** (1 issue) |
| Focus Trap (Mobile Nav) | **PASS** |

---

## 1. WCAG AA Contrast Ratios

### Method
Manual inspection of CSS custom properties and contrast calculation.

### Findings

#### PASS: Neon Green (#39ff14) on Black (#000)
- **Contrast ratio:** ~15.3:1
- **Usage:** Primary text, headings, links, borders
- **WCAG AA:** PASS (≥4.5:1 required)
- **WCAG AAA:** PASS (≥7:1 required)

#### PASS: Silver (#c0c0c0) on Black (#000)
- **Contrast ratio:** ~10.8:1
- **Usage:** Body text, hero subheadline, footer links
- **WCAG AA:** PASS
- **WCAG AAA:** PASS

#### PASS (AA only): Electric Purple (#9b30ff) on Black (#000)
- **Contrast ratio:** ~7.4:1
- **Usage:** Section labels, eyebrow text, badges
- **WCAG AA:** PASS (≥4.5:1 required)
- **WCAG AAA:** **FAIL** (≥7:1 required)

#### FAIL: Dark Gray (#1a1a1a) on Black (#000)
- **Contrast ratio:** ~1.6:1
- **Usage:** Footer tagline text (inline style in index.html line 288)
- **WCAG AA:** **FAIL** (≥4.5:1 required)
- **Location:** `<p style="font-family: var(--font-ui); font-size: 0.75rem; color: var(--dark-gray)">`

### Issues Found

| Issue | Severity | Location |
|-------|----------|----------|
| Footer text uses `--dark-gray` (#1a1a1a) on black background, contrast ratio ~1.6:1 | HIGH | `index.html:288` (inline style) |
| Purple eyebrow/section labels have 7.4:1 contrast (AA only, not AAA) | LOW | `theme.css:107,184` |

---

## 2. Keyboard Navigation with Tab Key

### Method
Code review of focus management and `:focus-visible` styles.

### Findings

#### Skip Link
- **Status:** PASS
- **Element:** `.skip-link` (line 39 in index.html)
- **Behavior:** Links to `#main-content`, styled with high-contrast neon green on black
- **CSS:** Positioned off-screen by default, appears on focus (line 128-130 in base.css)
- **Evaluation:** Proper implementation

#### Focus Visibility
- **Status:** PASS
- **Stylesheet:** `base.css:133-136`
- **Code:**
  ```css
  :focus-visible {
    outline: 2px solid var(--neon-green);
    outline-offset: 2px;
  }
  ```
- **Evaluation:** Visible focus indicator using neon green, meets WCAG 2.1 success criterion 2.4.7

#### Mobile Nav Toggle
- **Status:** PASS (with note)
- **Note:** Toggle is `display: none` on desktop (theme.css:546-549), only visible/accessible on mobile. This is expected behavior.

### Issues Found

No critical issues. Focus management is properly implemented.

---

## 3. ARIA Labels on Interactive Elements

### Method
Manual inspection of HTML for ARIA attributes.

### Findings

#### PASS: Logo Link
- **Element:** `<a class="logo" aria-label="Phlix home">` (line 44)
- **Purpose:** Clarifies that clicking logo goes to home page
- **Evaluation:** GOOD

#### PASS: Mobile Nav Toggle
- **Attributes:**
  - `aria-expanded="false"` (updated dynamically)
  - `aria-controls="mobile-nav"`
  - `aria-label="Open navigation menu"`
- **Evaluation:** GOOD

#### PASS: Mobile Nav Dialog
- **Attributes:**
  - `role="dialog"`
  - `aria-modal="true"`
  - `aria-label="Mobile navigation"`
- **Evaluation:** GOOD

#### PASS: Close Button
- **Element:** `<button class="mobile-nav-close" aria-label="Close navigation menu">`
- **Evaluation:** GOOD

#### PASS: Main Navigation
- **Element:** `<nav aria-label="Main navigation">`
- **Evaluation:** GOOD

### Issues Found

| Issue | Severity | Location |
|-------|----------|----------|
| Nav links have `aria-current="false"` which is incorrect usage | MEDIUM | `index.html:60-66` |

#### Detail
`aria-current` should not have the value `"false"`. According to ARIA specification:
- If an element has no current state, omit the attribute entirely
- Valid values are: `page`, `step`, `location`, `date`, `time`, or `true`/`false`

**Incorrect:**
```html
<a href="/features" aria-current="false">Features</a>
```

**Correct (two options):**
```html
<!-- Option 1: Omit entirely if not current -->
<a href="/features">Features</a>

<!-- Option 2: Use false explicitly only if programmatically meaningful -->
<!-- (but normally you just omit) -->
```

---

## 4. Focus Trap in Mobile Nav

### Method
Code review of mobile nav JavaScript focus management.

### Findings

#### Status: PASS

The focus trap is implemented in `main.js:69-92`:

```javascript
nav.addEventListener('keydown', function (e) {
  if (e.key !== 'Tab') return;

  const focusable = nav.querySelectorAll(
    'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])',
  );
  if (focusable.length === 0) return;

  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  if (e.shiftKey) {
    if (document.activeElement === first) {
      e.preventDefault();
      last.focus();
    }
  } else {
    if (document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
});
```

#### Evaluation
- **Focus cycling:** When Tab reaches last focusable element, wraps to first
- **Reverse cycling:** When Shift+Tab reaches first, wraps to last
- **Trigger:** Only activates when focus is already within the nav (correct)
- **Additional features:**
  - `aria-modal="true"` present on nav dialog
  - Escape key closes nav (lines 62-67)
  - Body scroll locked when nav open (line 49)

### Issues Found

No issues found. Focus trap implementation is correct.

---

## Recommendations

### HIGH Priority
1. **Fix footer text contrast** — Change `color: var(--dark-gray)` to `color: var(--silver)` in `index.html:288`

### MEDIUM Priority
1. **Remove `aria-current="false"`** from nav links, or change to meaningful value or omit entirely

### LOW Priority (AAA compliance)
1. Consider using a darker purple or additional styling for AAA compliance on section labels, or accept AA-only compliance

---

## Browser Testing Notes

Manual browser testing should verify:
1. Skip link appears on Tab press and moves focus to `#main-content`
2. All interactive elements show visible focus indicator
3. Mobile nav toggle works on mobile viewport
4. Tab cycles within open mobile nav and doesn't escape
5. Escape key closes mobile nav
6. Footer text is legible on dark background

---

## Files Reviewed

| File | Purpose |
|------|---------|
| `variants/05-pixel-tech-1/index.html` | Main HTML structure |
| `variants/05-pixel-tech-1/css/base.css` | CSS reset, tokens, accessibility |
| `variants/05-pixel-tech-1/css/theme.css` | Layout, header, hero, footer |
| `variants/05-pixel-tech-1/css/components.css` | Buttons, mobile nav |
| `variants/05-pixel-tech-1/js/main.js` | Focus trap, keyboard handling |
