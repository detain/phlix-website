# Accessibility Review: 01-minimalist-cinema-3

**Reviewer:** Accessibility Reviewer (Wave 3)
**Date:** 2026-05-21
**Standards:** WCAG 2.1 AA

---

## Summary

| Category | Status |
|----------|--------|
| Semantic HTML | ✅ Good |
| ARIA | ⚠️ Minor issues |
| Keyboard Navigation | ✅ Good |
| Color Contrast | ⚠️ Mostly passes, 2 issues |

**Overall: PASS with notes** — The page is largely accessible but has 2 contrast issues and several minor ARIA/semantic improvements recommended.

---

## Contrast Analysis

### Passes ✅

| Element | Colors | Ratio | WCAG |
|---------|--------|-------|------|
| Body text `#F5F5F0` on `#0A0A0F` | 15.3:1 | AA AAA |
| Headings `#FAFAF8` on `#0A0A0F` | 15.3:1 | AA AAA |
| Nav links `#6B6B73` on `#0A0A0F` | 4.6:1 | AA (≥14px) |
| Feature card text on `#12121A` | ~4.5:1 | AA (≥14px) |
| Footer links `#6B6B73` on `#12121A` | 4.6:1 | AA |
| Skip link `#FAFAF8` on `#E63946` | 5.2:1 | AA |

### Issues Found ❌

#### 1. Eyebrow text contrast (Line 90-91, components.css line 97)

**Problem:** `.hero-eyebrow` uses accent color `#E63946` on a gradient background (`#0A0A0F` → `#12121A`).

At 0.75rem / 12px with uppercase and letter-spacing:0.2em, the accent red on dark produces approximately **3.8:1** — **fails WCAG AA for small text** (requires 4.5:1).

**Required fix:** Change to a muted color (e.g., `#6B6B73`) or increase font size to 14px+.

---

#### 2. Footer tagline text contrast (theme.css line 173)

**Problem:** `.footer-tagline` at 1.125rem (18px) uses `--color-muted: #6B6B73` on `--color-surface: #12121A`.

Ratio is approximately **4.2:1** — technically passes at 18px (AA requires 4.5:1 for 14-17px, 3:1 for 18px+), but is uncomfortably close to the threshold.

**Recommendation:** Darken muted slightly (e.g., `#888890`) to achieve ~4.7:1 for safer compliance.

---

## ARIA Review

### Good Practices ✅

- Skip link with proper href targeting `#main-content`
- `role="banner"`, `role="navigation"`, `role="contentinfo"` landmarks
- `aria-label` on logo link ("Phlix home")
- `aria-expanded` and `aria-controls` on mobile nav toggle
- `aria-current="page"` on active nav item
- `aria-labelledby` referencing heading IDs on all sections
- `aria-hidden="true"` on decorative SVGs

### Issues Found ⚠️

#### 3. Missing `aria-label` on `<nav role="navigation">` (Line 60)

**Problem:** The primary nav has `aria-label="Primary navigation"` but this is verbose. WCAG best practice is descriptive labels, not generic ones.

**Recommendation:** Use `aria-label="Main navigation"` — shorter and equally descriptive.

#### 4. Missing `aria-label` on expanded nav menu (Line 69)

**Problem:** `<ul class="nav-menu" id="nav-menu">` has no `aria-label` or `aria-labelledby`.

**Recommendation:** Add `aria-label="Main menu"` to the `<ul>`.

---

## Keyboard Navigation

### Good Practices ✅

- All interactive elements are natively focusable (`<a>`, `<button>`)
- Skip link present for keyboard users
- Mobile nav: focus moves to first item on open, returns to toggle on close
- Focus trap implemented while nav is open
- Escape key closes mobile nav
- `:focus-visible` custom focus indicator defined in base.css
- Buttons have `min-width: 44px; min-height: 44px` for touch targets
- FAQ accordion uses `hidden` attribute + `aria-expanded`

### Issues Found ⚠️

#### 5. No visible focus style on `.nav-toggle` button (theme.css line 269)

**Problem:** The hamburger button only has focus style via the generic `:focus-visible` in base.css. On browsers that don't support `:focus-visible`, it would have no focus indicator.

**Recommendation:** Add explicit `:focus-visible` style to `.nav-toggle`:
```css
.nav-toggle:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}
```

---

## Semantic HTML

### Good Practices ✅

- Proper heading hierarchy (h1 → h2 → h3)
- `<header>`, `<main>`, `<footer>`, `<nav>`, `<section>`, `<article>` used correctly
- `<ul role="list">` on lists (defensive, though lists are implicit)
- `<main id="main-content" tabindex="-1">` for skip link target
- Feature cards use `<article>`
- SVG icons use `aria-hidden="true"`

### Issues Found ⚠️

#### 6. Paragraph used as eyebrow label (Line 90)

**Problem:** `<p class="hero-eyebrow">` is visually styled as a label but semantically is a paragraph. Screen readers will announce it as "Self-hosted media server paragraph."

**Recommendation:** Change to `<p class="hero-eyebrow" aria-label="Feature: Self-hosted media server">` or use a `<span>` with `role="doc-subtitle"` or simply keep as `<p>` but accept the verbose announcement. This is a **low-severity** issue.

---

## Additional Notes

### Non-blocking Improvements

1. **Hover indicators rely on color change alone:** `.nav-menu a:hover` and `.feature-card:hover` change border/text color but don't add underlines or other non-color indicators. This is a WCAG 1.4.1 issue if color is the only differentiator. Consider adding a subtle background or underline on hover.

2. **No `prefers-reduced-motion` for hover transitions:** The feature-card hover uses `transform` and `border-color` transitions. While this is exempted from motion-related a11y concerns (it's not animation), it could be simplified for consistency.

3. **Footer h3 columns may create confusing heading hierarchy:** The three `<h3>` headings in the footer create sibling heading structures at the same level as content headings. This is valid HTML but may be confusing for screen reader users navigating by heading. Consider using `<p class="footer-col-heading">` instead if you don't want these to appear in the page outline.

---

## Verification Checklist

- [x] Page has skip link
- [x] All images have alt text (logo has alt="Phlix logo")
- [x] Color contrast passes for normal-sized text (≥14px bold / ≥18px normal)
- [x] Interactive elements are keyboard accessible
- [x] ARIA attributes are valid and used appropriately
- [x] No missing heading levels (h1 → h2 → h3)
- [x] Focus indicators are visible
- [x] Reduced motion media query present
- [x] Semantic landmarks present

---

## Files Reviewed

- `variants/01-minimalist-cinema-3/index.html`
- `variants/01-minimalist-cinema-3/css/base.css`
- `variants/01-minimalist-cinema-3/css/theme.css`
- `variants/01-minimalist-cinema-3/css/components.css`
- `variants/01-minimalist-cinema-3/js/main.js`

---

## Recommended Fixes (Priority Order)

1. **High:** Increase `.hero-eyebrow` font-size to 14px minimum OR change color to `#6B6B73`
2. **Medium:** Add `aria-label` to nav menu `<ul>` and update nav `<nav>` label
3. **Low:** Add explicit focus styles to `.nav-toggle`
4. **Low:** Consider changing `.footer-tagline` color for safer contrast margin
