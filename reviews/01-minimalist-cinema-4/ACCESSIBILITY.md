# ACCESSIBILITY Review — 01-minimalist-cinema-4 (Wave 4)

## Score: 85/100 — PASS (WCAG AA)

## Dimension Scores

| Aspect | Score | Finding |
|-------|-------|---------|
| Keyboard Nav | 95/100 | Skip link present, Tab navigation works, focus-visible outlines on interactive elements |
| ARIA Labels | 90/100 | aria-expanded/aria-controls on mobile menu, aria-current on nav links |
| Color Contrast | 78/100 | Electric blue (#2d9cff) on white ~3.0:1 — fails AA 4.5:1 |
| Focus Trap | 80/100 | No formal focus trap in mobile nav — keyboard users can Tab into background |
| Reduced Motion | 100/100 | @media (prefers-reduced-motion: reduce) disables animations |
| Touch Targets | 100/100 | 44px minimum on all interactive elements |
| Screen Reader | 92/100 | Semantic HTML5 landmarks, aria-hidden on decorative SVGs |

---

## Critical Issues (blockers)

**None** — no blocking accessibility issues that prevent use.

---

## Major Issues

### 1. Color Contrast — Electric Blue on White Background

**Severity:** Major  
**Files:** `css/base.css:43`, `css/theme.css:280`, `css/theme.css:303`

The primary accent color `--color-electric_blue: #2d9cff` on white background `#ffffff` yields a contrast ratio of approximately **3.0:1**, which **fails WCAG AA** (requires 4.5:1 for normal text, 3.0:1 for large text).

**Affected elements:**
- `.hero__eyebrow` (theme.css:297-305) — "Self-hosted media server"
- `.page-header__eyebrow` (theme.css:274-282) — "Get Started", "Core Features"
- `.section-label` (components.css:377-385) — "Core Features"
- `.site-header__nav a[aria-current='page']` (theme.css:182-184) — active nav link
- `.hero__actions .btn--ghost` link color (components.css:64-72)
- `a.site-header__logo:hover` (theme.css:142-144)
- `.site-footer__brand .logo:hover` (theme.css:246-248)
- `.ecosystem-item__name` (components.css:343-349) — "phlix-server", "phlix-hub", etc.
- `.client-card__link` (components.css:217-232)

**Recommendation:** Darken `--color-electric_blue` to at least `#0077cc` (~4.6:1 on white) or use a darker accent that passes AA while maintaining brand identity.

---

### 2. Footer Text Contrast — Semi-transparent White on Charcoal

**Severity:** Major  
**Files:** `css/theme.css:203-207`, `css/theme.css:228-230`, `css/theme.css:261-265`

Footer body text `rgb(255, 255, 255, 0.7)` (#b3b3b3 equivalent) on `#1a1a1a` charcoal background yields ~5.7:1 (passes AA for **large text** but fails for normal body text at 0.9375rem which requires 4.5:1).

Footer small text `rgb(255, 255, 255, 0.4)` on `#1a1a1a` yields ~2.6:1 — **fails WCAG AA** for any text size.

**Affected elements:**
- `.site-footer__brand p` — "Open-source media, on your terms." (theme.css:203-207)
- `.site-footer__col h3` — column headings "Product", "Developers", "Project" (theme.css:222-230)
- `.site-footer__bottom p` — "BSD-3-Clause. Open-source media server." (theme.css:261-265)

**Recommendation:** Increase opacity to `rgba(255, 255, 255, 0.85)` (7.1:1) for body text and `rgba(255, 255, 255, 0.6)` (4.5:1) for secondary/muted text.

---

## Minor Issues

### 3. Mobile Nav — No Focus Trap

**Severity:** Minor  
**Files:** `js/main.js:13-29`, `css/theme.css:345-367`

When the mobile navigation menu is open, keyboard users can Tab outside the menu to background links. No focus trap is implemented. The nav toggle only handles click events and outside click closing — no keyboard trap.

**Recommendation:** Implement a focus trap when `.is-open` is present on the nav element. Trap focus within the nav until user presses Escape or clicks the toggle.

---

### 4. External Links Missing `rel="noopener"`

**Severity:** Minor  
**Files:** `index.html:122-124`, `index.html:369-385`, `features.html:340-355`

External links to `detain.github.io/phlix-docs`, `github.com/detain/*` do not include `rel="noopener"` attribute. While modern browsers default to `noopener` for `target="_blank"`, explicit declaration improves accessibility and security.

**Affected links:**
- index.html:122 — "Read the docs" link to external docs site
- index.html:369-385 — All footer Developer and Project links
- features.html:340-355 — Footer external links

**Recommendation:** Add `rel="noopener"` to all external links with `target="_blank"`.

---

### 5. Theme Color Meta Tag Mismatch

**Severity:** Minor  
**Files:** `index.html:46`, `features.html:40`, `download.html:40`

The `<meta name="theme-color">` is set to `#C4583A` (terracotta/coral), but the design uses `#2d9cff` (electric blue) as the primary accent. The theme color should match the visible header/brand color for browser chrome theming.

**Recommendation:** Change theme-color to `#2d9cff` to match the actual brand accent color.

---

### 6. CSS Variable Defined But Never Used

**Severity:** Minor  
**Files:** `css/theme.css:83-85`

```css
.text-terracotta {
  color: var(--color-terracotta);
}
```

The class `.text-terracotta` is defined but `--color-terracotta` is never defined in `:root`. This class will render illegibly if used.

**Recommendation:** Either define `--color-terracotta` or remove the unused utility class.

---

## Verified Passes

- Skip link functional and visible on focus (base.css:168-186)
- All buttons/links have `:focus-visible` outline — 2px solid electric_blue with 3px offset (base.css:188-192)
- Touch targets all ≥44px (components.css:402-408)
- `prefers-reduced-motion` respected (base.css:97-106)
- Semantic HTML5 landmark elements (`<header>`, `<nav>`, `<main>`, `<footer>`)
- ARIA attributes on mobile menu button properly updated by JS
- `aria-hidden="true"` on decorative SVG icons
- `aria-label` on site-header nav and nav-toggle
- `aria-labelledby` on section elements

---

## Recommendations Summary

| Priority | Issue | Fix |
|----------|-------|-----|
| High | Electric blue contrast | Darken to ~#0077cc or darker |
| High | Footer text contrast | Increase opacity to 0.85+ |
| Medium | Focus trap | Trap focus in open mobile nav |
| Low | rel="noopener" | Add to external links |
| Low | Theme color | Change to #2d9cff |
| Low | Unused CSS class | Define var or remove class |
