# Accessibility Review — 01-minimalist-cinema-1 (Round 2)

## Fix Verification

- **Mobile nav focus trap: NOT FIXED** — The mobile navigation (`#site-nav`) still lacks a keyboard focus trap. When the nav is open, keyboard users can tab through the 5 nav links but will exit the nav to the next focusable element outside (footer links, etc.) without any mechanism to return or close the nav. The JS (`main.js` lines 13-28) only handles:
  - Click toggle → opens/closes nav
  - Click outside → closes nav
  - No `inert` attribute applied to hide background content
  - No escape key handler to close nav
  - No focus trap — tab sequence is not constrained to the open nav

- **Google Fonts CDN: ELIMINATED** — Confirmed no `fonts.googleapis.com` or `fonts.gstatic.com` references in any of the source files. All fonts are declared via self-hosted `@font-face` in `css/base.css` (lines 6-45) and inline in `index.html` (lines 26-31) with local `url('../fonts/...')` paths.

---

## Full Accessibility Audit

### Color Contrast (WCAG AA minimum 4.5:1 for normal text)

| Element | Colors | Ratio | Status |
|---------|--------|-------|--------|
| Body text on white | `#1A1A1A` on `#FFF` | ~16:1 | PASS |
| Headings on white | `#1A1A1A` on `#FFF` | ~16:1 | PASS |
| Nav links on white | `#1A1A1A` on `#FFF` | ~16:1 | PASS |
| Primary buttons | `#FFF` on `#2D9CFF` | ~4.6:1 | PASS |
| Skip link | `#FFF` on `#2D9CFF` | ~4.6:1 | PASS |
| **Muted text (.lead, p.color-text-muted)** | **`#555` on `#FFF`** | **~3.9:1** | **FAIL** |
| **Footer link default** | **`rgba(255,255,255,0.7)` on `#1A1A1A`** | **~3.2:1** | **FAIL** |
| **Client-card stable badge** | **`#2E7D32` on `#E8F5E9`** | **~2.9:1** | **FAIL** |
| **Client-card beta badge** | **`#F57F17` on `#FFF8E1`** | **~2.8:1** | **FAIL** |

**Issue:** `.lead` class, feature card descriptions, and any `color: var(--color-text-muted)` elements use `#555` on white which fails WCAG AA normal text (requires 4.5:1). Footer links at 70% opacity on dark also fail.

### Keyboard Navigation / Focus Indicators

- `:focus-visible` is defined in `css/base.css` (line 192-196) with a 2px electric blue outline + 3px offset — **visible and adequate**
- Skip link has `:focus` state moving it into view (line 186-190) — **works correctly**
- Mobile nav toggle button has `min-height: 44px` — **touch target met**
- Nav links have `min-height: 44px` via `components.css` (line 376-379) — **touch target met**
- Buttons in `.hero__actions` have `min-height: 44px` — **touch target met**
- **ISSUE: No mobile nav focus trap** — keyboard users cannot escape the open mobile nav via tab navigation alone; must click outside or use a non-keyboard method

### ARIA Labels

- `aria-label="Phlix home"` on logo link — **PASS**
- `aria-expanded="false"` / `aria-controls="site-nav"` on toggle — **PASS**
- `aria-label="Main navigation"` on `<nav>` — **PASS**
- `aria-hidden="true"` on all decorative SVGs — **PASS**
- `aria-labelledby` on sections with visually hidden headings — **PASS**
- **ISSUE: `aria-current="false"` on nav links (lines 77-81)** — This is invalid. `aria-current` should either be absent or `"page"` (or `"true"`, `"step"`, `"location"`, `"date"`, `"time"`). Setting it to `"false"` is meaningless and can confuse assistive technology. Should simply be removed when not current.

### Skip Links

- Skip link present at line 59: `<a href="#main-content" class="skip-link">Skip to main content</a>`
- Styled and positioned correctly (line 172-190 of `base.css`)
- `:focus` state brings it into view — **PASS**

### Form Labels and Error Handling

- **N/A** — No forms present on this page

### Image Alt Text

- Logo SVG (line 64) has `aria-hidden="true"` — decorative, correctly hidden
- Feature card SVGs all have `aria-hidden="true"` — decorative, correctly hidden
- No `<img>` elements with missing alt text — **PASS**

### Semantic HTML Structure

- Proper document outline: `<header>`, `<main>`, `<footer>` with `<nav>` inside header — **PASS**
- Headings in correct order: h1 (hero headline) → h2 (section headings) → h3 (card titles) — **PASS**
- Sections use `<section>` with `aria-labelledby` pointing to hidden or visible headings — **PASS**
- Feature cards use `<article>` — **appropriate**
- `<button>` for actions, `<a>` for navigation links — **correct distinction**
- `<ul>` for lists, proper `<li>` structure — **PASS**

---

## Score: 68/100

## Pass/Fail: FAIL

### Critical Issues (must fix)
1. **Mobile nav no focus trap** — keyboard users can tab out of nav while it's open, and background content remains keyboard accessible (no `inert` or equivalent)
2. **Muted text color `#555` on white fails 4.5:1** — `.lead`, feature card descriptions use this
3. **`aria-current="false"` on nav links** — invalid attribute value

### Moderate Issues (should fix)
4. Footer links at 70% opacity on dark background fail contrast (~3.2:1)
5. Client status badges (stable: green, beta: yellow) fail contrast (~2.9:1 and ~2.8:1)

### What's Working Well
- Skip link functional
- Self-hosted fonts (no Google CDN)
- `:focus-visible` indicators visible
- Touch targets ≥44px throughout
- Semantic HTML structure correct
- All SVGs properly `aria-hidden`
- Heading hierarchy correct
