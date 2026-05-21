# ACCESSIBILITY Review — 01-minimalist-cinema-1 (Wave 1)

## Summary

| Check | Status |
|-------|--------|
| WCAG AA Contrast | **FAIL** |
| Keyboard Navigation | PASS (with issues) |
| ARIA Labels | PASS (with issues) |
| Focus Trap (Mobile Nav) | **FAIL** |

---

## WCAG AA Contrast Ratios

### Critical Issues

#### 1. Electric Blue `#2d9cff` on White `#ffffff`
- **Severity**: Critical
- **Ratio**: 3.0:1 (fails AA 4.5:1, AA Large 3.0:1)
- **Locations**:
  - `index.html:394` — `.hero__eyebrow` (uppercase label, 12px)
  - `index.html:526` — `.section-label` (uppercase, 11px)
  - `index.html:667-673` — `.site-header__nav a[aria-current='page']` (nav active state)
  - `features.html:367` — `.page-header__eyebrow` (uppercase label, 12px)
  - `features.html:388` — `.section-label` (uppercase, 11px)
  - `features.html:573` — nav link with `aria-current="page"`

**Issue**: `#2d9cff` is used for text that does not meet AA contrast requirements. WCAG SC 1.4.3 requires:
- 4.5:1 for normal text (<18pt regular or <14pt bold)
- 3.0:1 for large text (>=18pt regular or >=14pt bold) or UI components

The eyebrow/section labels at ~11-12px do not qualify as "large text" even when bold, so they fail at 3.0:1.

#### 2. Footer Text at 70% White on Dark `#1a1a1a`
- **Severity**: Major
- **Ratio**: ~3.0:1 (fails AA 4.5:1)
- **Locations**:
  - `index.html:357` — `.site-footer__col a` (footer links)
  - `theme.css:280` — Same selector

```
rgba(255, 255, 255, 0.7) over #1a1a1a ≈ 3.0:1 < 4.5:1
```

#### 3. Footer Text at 40% White on Dark `#1a1a1a`
- **Severity**: Critical
- **Ratio**: ~1.6:1 (fails AA 4.5:1 by large margin)
- **Locations**:
  - `index.html:347` — `.site-footer__col h3` (column headings)
  - `index.html:375` — `.site-footer__bottom p` (copyright)
  - `theme.css:267` — Same selector for h3
  - `theme.css:302` — Same selector for bottom p

```
rgba(255, 255, 255, 0.4) over #1a1a1a ≈ 1.6:1 < 4.5:1
```

#### 4. Focus Outline Visibility
- **Severity**: Major
- **Ratio**: `#2d9cff` on `#ffffff` = 3.0:1
- **Locations**:
  - `index.html:177-180` — `:focus-visible` outline using `--color-electric-blue`
  - `base.css:192-195` — Same

**Issue**: The focus indicator uses the same low-contrast blue, making it nearly invisible against white backgrounds. WCAG SC 2.4.7 requires focus indicators to be visible.

### Passing Contrast

| Element | Colors | Ratio | Pass? |
|---------|--------|-------|-------|
| Body text `#1a1a1a` on white | 16.1:1 | ✅ AAA |
| Muted text `#555` on white | 5.7:1 | ✅ AA |
| Primary button `#fff` on `#2d9cff` | 4.6:1 | ✅ AA |
| Skip link `#fff` on `#2d9cff` | 4.6:1 | ✅ AA |
| Footer links `#fff` on `#1a1a1a` | 14.1:1 | ✅ AAA |

---

## Keyboard Navigation

### Passes

- **Skip link** present at `index.html:628` (`href="#main-content"`) ✅
- **Nav toggle button** has correct ARIA attributes at `index.html:656-666` ✅
- **Nav links** have `min-height: 44px` for touch targets at `index.html:290` ✅
- **Buttons** have `min-height: 44px` at `components.css:378-380` ✅
- **Reduced motion** respected via `@media (prefers-reduced-motion: reduce)` at `index.html:234-241` and `base.css:104-111` ✅
- **Scroll behavior** is smooth but respects motion preferences ✅

### Issues

#### Missing Escape Key to Close Mobile Nav
- **Severity**: Minor
- **Location**: `js/main.js:14-28`

**Issue**: The mobile nav can only be closed by clicking the toggle button or clicking outside. Keyboard users expect to close with Escape key.

```javascript
// Current: Only click handlers
navToggle.addEventListener('click', ...)
document.addEventListener('click', ...) // outside click

// Missing: Escape key handler
```

---

## ARIA Labels

### Passes

- **Main landmark** with `id="main-content"` at `index.html:677` ✅
- **Nav landmark** with `aria-label="Main navigation"` at `index.html:667` ✅
- **Nav toggle** with `aria-expanded`, `aria-controls`, `aria-label` at `index.html:656-662` ✅
- **All SVG icons** have `aria-hidden="true"` (e.g., `index.html:633`) ✅
- **Sections** use `aria-labelledby` referencing heading IDs at `index.html:698,716` ✅

### Issues

#### Incorrect `aria-current="false"` Usage
- **Severity**: Minor
- **Location**: `index.html:668-672`

```html
<a href="/features" aria-current="false">Features</a>
<a href="/clients" aria-current="false">Clients</a>
...
```

**Issue**: `aria-current` is not a boolean attribute. Allowed values are:
- `"page"` — current page in a set of navigation links
- `"step"`, `"location"`, `"date"`, `"time"` — other temporal/special values
- Do not use `"false"` — omit the attribute entirely when not current

**Fix**: Remove `aria-current="false"` or only add `aria-current="page"` to the active nav item.

#### Missing `aria-current="page"` on Active Link
- **Severity**: Minor
- **Location**: `index.html:668`

On the homepage (`index.html`), the Features link shows `aria-current="false"` but should show `aria-current="page"` since this IS the current page (for that link).

---

## Focus Trap (Mobile Nav)

### FAIL

- **Severity**: Major
- **Location**: `index.html:583-603`, `js/main.js`

**Issue**: When the mobile nav drawer is open, keyboard focus can move outside the drawer to underlying page content. WCAG 2.1 SC 2.1.2 requires that modal/drawer navigation traps focus so keyboard users cannot escape the drawer without closing it.

**Current behavior**:
1. Drawer opens with `transform: translateX(0)` (slides in)
2. Focus can tab through nav links
3. After last nav link, focus moves to next focusable element in document (footer, etc.)
4. No mechanism prevents focus from leaving the drawer

**Fix required**: Add focus trap when `.is-open` is active:
- On open: save last focused element, move focus to first nav link
- On Escape: return focus to saved element, close drawer
- While open: if focus attempts to leave drawer bounds, return focus to first/last nav item

---

## Recommendations

### High Priority (Critical/Major)

1. **Increase contrast for `#2d9cff` text** — Either use a darker blue (e.g., `#1a6fc4` ~4.6:1 on white) for text, or reserve `#2d9cff` only for decorative/background purposes.

2. **Fix footer text contrast** — Increase opacity for footer text:
   - Footer links: change from `rgba(255,255,255,0.7)` to solid `#fff` (14:1) or at minimum `rgba(255,255,255,0.85)` (~7:1)
   - Footer headings: change from `rgba(255,255,255,0.4)` to `rgba(255,255,255,0.6)` (~3.4:1, still fails) — use solid white

3. **Implement focus trap for mobile nav** — Add keyboard trap per WCAG 2.1.2

4. **Change focus outline color** — Use `#1a1a1a` (16:1 on white) or `#0056b3` (4.8:1 on white) instead of `#2d9cff`

### Medium Priority (Minor)

5. **Remove `aria-current="false"`** — Omit attribute when not applicable, use `aria-current="page"` only for active page link

6. **Add Escape key handler for mobile nav** — Close drawer on Escape press

### Low Priority (Polish)

7. **Consider `aria-current` for footer navigation** — If footer has a "current page" indicator, use proper `aria-current` semantics

---

## Files Reviewed

| File | Lines | Notes |
|------|-------|-------|
| `index.html` | 1-974 | Primary landing page |
| `features.html` | 1-873 | Features page (inline CSS) |
| `css/base.css` | 1-228 | Design tokens, reset, accessibility |
| `css/theme.css` | 1-405 | Typography, layout, header/footer |
| `css/components.css` | 1-396 | Buttons, cards, feature grid |
| `js/main.js` | 1-42 | Mobile nav toggle, smooth scroll |
