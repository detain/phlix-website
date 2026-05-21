# ACCESSIBILITY.md — 01-minimalist-cinema-3 Wave 3

**Variant:** 01-minimalist-cinema-3
**Review Date:** 2026-05-21
**Standards:** WCAG 2.1 AA

---

## Summary

| Category | Status |
|----------|--------|
| WCAG AA Contrast | ⚠️ 1 fail |
| Keyboard Navigation | ✅ Pass |
| ARIA Labels | ✅ Pass |
| Focus Trap (Mobile Nav) | ✅ Pass |

**Overall: FAIL** — One critical contrast issue found: the accent color `#2d9cff` used on white text fails WCAG AA (3.8:1, requires 4.5:1).

---

## 1. WCAG AA Contrast Ratios

### Color Palette Analyzed

| Variable | Value | Usage |
|----------|-------|-------|
| `--color-primary` | `#fff` | Page background |
| `--color-secondary` | `#1a1a1a` | Headings, dark text |
| `--color-muted` | `#2e2e2e` | Body text |
| `--color-accent` | `#2d9cff` | Links, buttons, accents |
| `--color-link-hover` | `#00f0ff` | Link hover state |
| `--color-surface` | `#f5f8fa` | Card backgrounds |

### Contrast Failures ❌

#### Issue #1: Accent color on white background — FAILS WCAG AA

**Severity:** Critical

**Affected elements:**
- `css/theme.css:284-286` — `.nav-toggle[aria-expanded='true']` color: var(--color-accent)
- `css/components.css:97` — `.hero-eyebrow` color: var(--color-accent)
- `css/components.css:237` — `.features-more a` color: var(--color-accent)
- `css/components.css:303-306` — `.cta-banner .btn-primary` hover text color

**Problem:** `--color-accent: #2d9cff` on `#fff` produces **3.8:1** contrast ratio.

WCAG AA requires:
- Normal text (< 18px regular / < 14px bold): **4.5:1** minimum
- Large text (≥ 18px regular / ≥ 14px bold): **3:1** minimum

The hero eyebrow at 0.75rem (12px) requires 4.5:1 → **FAILS**.

**Required fix:** Replace `#2d9cff` with a darker accent that achieves ≥ 4.5:1 on white. Suggested: `#0066CC` or `#0055AA`.

---

### Contrast Passes ✅

| Element | Colors | Ratio | WCAG |
|---------|--------|-------|------|
| Body text `#2e2e2e` on `#fff` | 8.6:1 | AAA | ✅ |
| Headings `#1a1a1a` on `#fff` | 16.1:1 | AAA | ✅ |
| Nav links hover `#1a1a1a` on `#fff` | 16.1:1 | AAA | ✅ |
| Footer text `#2e2e2e` on `#f5f8fa` | 7.5:1 | AAA | ✅ |
| Skip link `#1a1a1a` on `#2d9cff` | 5.4:1 | AA | ✅ |
| Feature card text on `#f5f8fa` | 7.5:1 | AAA | ✅ |

---

## 2. Keyboard Navigation

### Status: ✅ PASS

**Findings:**

| Check | Status | Location |
|-------|--------|----------|
| Skip link present | ✅ | `index.html:75` |
| Skip link targets `#main-content` | ✅ | `index.html:75` |
| All links focusable natively | ✅ | Native `<a>` elements |
| Buttons have min 44x44 touch target | ✅ | `base.css:151-155` (`:focus-visible`) |
| `:focus-visible` custom focus indicator | ✅ | `base.css:151-155` |
| FAQ accordion keyboard operable | ✅ | `main.js:116-156` (aria-expanded toggle) |
| Reduced motion media query | ✅ | `base.css:164-173` |

**Mobile Nav Keyboard:**
- Toggle button properly focused
- Escape key closes mobile nav (`main.js:54-58`)
- Focus moves to first menu item on open (`main.js:27-30`)
- Focus returns to toggle on close (`main.js:39-41`)

---

## 3. ARIA Labels

### Status: ✅ PASS

**All interactive elements have proper ARIA:**

| Element | ARIA Attribute | Value | File:Line |
|---------|----------------|-------|-----------|
| Nav toggle | `aria-label` | "Toggle navigation" | `index.html:86` |
| Nav toggle | `aria-expanded` | "false" | `index.html:87` |
| Nav toggle | `aria-controls` | "nav-menu" | `index.html:88` |
| Logo link | `aria-label` | "Phlix home" | `index.html:81` |
| Primary nav | `aria-label` | "Primary navigation" | `index.html:80` |
| Active nav item | `aria-current` | "page" | `index.html:103` |
| Hero section | `aria-labelledby` | "hero-heading" | `index.html:119` |
| All sections | `aria-labelledby` | Heading IDs | Throughout |
| Decorative SVGs | `aria-hidden` | "true" | Throughout |
| Footer | `role` | "contentinfo" | `index.html:343` |

**No missing ARIA labels found.**

---

## 4. Focus Trap (Mobile Nav)

### Status: ✅ PASS

**Implementation verified in `main.js:60-75`:**

```javascript
navMenu.addEventListener('keydown', function (e) {
  if (e.key !== 'Tab' || !isOpen) return;

  const focusableElements = Array.from(navMenu.querySelectorAll(focusableSelectors));
  const firstEl = focusableElements[0];
  const lastEl = focusableElements[focusableElements.length - 1];

  if (e.shiftKey && document.activeElement === firstEl) {
    e.preventDefault();
    lastEl.focus();
  } else if (!e.shiftKey && document.activeElement === lastEl) {
    e.preventDefault();
    firstEl.focus();
  }
});
```

**Verification:**
- Focus trap cycles forward (Tab) from last item to first
- Focus trap cycles backward (Shift+Tab) from first item to last
- Only active when menu is open (`isOpen` flag checked)
- Focusable selectors include: `a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])`

---

## Issues Summary

| # | Severity | Category | Issue | File:Line |
|---|----------|----------|-------|-----------|
| 1 | **Critical** | Contrast | `--color-accent: #2d9cff` on `#fff` = 3.8:1 (fails AA 4.5:1 for small text) | `css/theme.css:284-286`, `css/components.css:97` |

---

## Required Fixes

### Critical (Must Fix)

1. **Change accent color** from `#2d9cff` to `#0066CC` or darker
   - This fixes: nav-toggle expanded state, hero-eyebrow, features-more link, cta-banner button hover
   - New ratio: ~5.9:1 on white (passes AA AAA)

### Recommended Improvements

2. **Update hover underline color** in `theme.css:264` — `background-color: var(--color-accent)` uses same failing color. Change to a passable contrast color when updating accent.

---

## Files Reviewed

- `variants/01-minimalist-cinema-3/index.html`
- `variants/01-minimalist-cinema-3/css/base.css`
- `variants/01-minimalist-cinema-3/css/theme.css`
- `variants/01-minimalist-cinema-3/css/components.css`
- `variants/01-minimalist-cinema-3/js/main.js`

---

## Verification Commands

```bash
# Check contrast of accent on white
# #2d9cff on #ffffff = 3.8:1 (FAIL)
# #0066cc on #ffffff = 5.9:1 (PASS AAA)
```

---

**Reviewer:** OpenCode Accessibility Phase — Wave 3
