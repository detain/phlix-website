# Accessibility & Responsive Review — Celtic Twilight

**Site:** `/home/sites/phlix/phlix-website/sites/celtic-twilight/`
**Reviewer:** Adversarial A11y + Responsive Agent
**Date:** 2026-06-30

---

## Dimension 6: Accessibility (WCAG 2.2 AA)

**Score: 82/100** — Solid foundation, several minor-medium issues.

### Contrast Ratios

| Element | Colors | Ratio | WCAG AA | Verdict |
|---------|--------|-------|---------|---------|
| Body text on vellum | `#1A1208` on `#F4EDD8` | ~14.5:1 | ≥4.5:1 | ✅ PASS |
| Primary button text | `#FAF7EE` on `#2D6A4F` | ~5.2:1 | ≥4.5:1 | ✅ PASS |
| Nav links on gradient | `rgba(244,237,216,0.85)` on gradient | ~5.5:1 est. | ≥4.5:1 | ✅ PASS |
| Gold on ink (footer h3) | `#B8860B` on `#1A1208` | ~9.4:1 | ≥4.5:1 | ✅ PASS |
| Footer links on ink | `rgba(244,237,216,0.65)` on `#1A1208` | ~7:1 est. | ≥4.5:1 | ✅ PASS |
| **Gold on vellum (decorative)** | `#B8860B` on `#F4EDD8` | ~3.2:1 | ≥4.5:1 | ⚠️ MARGINAL (large text only) |
| Ancient Gold badge text | `#1A1208` on `#B8860B` | ~9.4:1 | ≥4.5:1 | ✅ PASS |

**Findings:**
- ✅ `base.css:16-38` — Brand token colors match the brand kit exactly
- ⚠️ `components.css:143-151` — Footer h3 uses `--color-gold` (`#B8860B`) with `font-size: 0.6875rem` (11px). At 11px bold, WCAG treats this as "small text" requiring 4.5:1. However, gold on dark ink passes at ~9.4:1, so this is actually fine since the footer background is `--color-ink` (`#1A1208`). **No issue here** — the contrast is sufficient.
- ⚠️ Brand kit states explicitly: "Ancient gold (#B8860B) on vellum passes AA for large text only — never use it for small body copy." `base.css:211` uses gold for the skip link background with dark text, which passes.

### Keyboard Reachability & Focus

| Check | Location | Verdict |
|-------|----------|---------|
| Skip link present | `base.css:205-226` | ✅ |
| Skip link visible on focus | `base.css:222-226` | ✅ |
| `:focus-visible` defined | `base.css:229-232` | ✅ |
| Tab order follows DOM | Logical | ✅ |
| Nav toggle keyboard-operable | `components.css:40-52` | ✅ |

**Findings:**
- ✅ `base.css:205-226` — Skip link: `position: absolute; top: -100%` until focus, then `top: var(--space-4)`. Gold background (`#B8860A`) with dark text (`#1A1208`). Properly hidden off-screen when not focused.
- ✅ `base.css:229-232` — `:focus-visible { outline: 2px solid var(--color-focus); outline-offset: 2px; }` — 2px gold ring with offset, as specified in brand kit.
- ✅ `components.css:207-210` — `.btn:focus-visible` has dedicated focus style.
- ✅ `index.html:60` — Nav toggle has `aria-label="Toggle navigation"`, `aria-expanded="false"`, `aria-controls="nav-menu"`.

### Forms

- **N/A** — Static marketing site. No `<form>`, `<input>`, `<textarea>`, or `<select>` elements on any reviewed page.

### ARIA Usage

| Check | Location | Verdict |
|-------|----------|---------|
| `aria-label` on nav | `index.html:58` | ✅ |
| `aria-current="page"` on active nav | `index.html:64`, `components.css:104-111` | ✅ |
| `aria-expanded` on toggle | `index.html:60` | ✅ |
| `aria-controls` on toggle | `index.html:60` | ✅ |
| Decorative SVGs `aria-hidden` | `index.html:102, 106, 110...` | ✅ |
| Landmarks: banner/nav/main/contentinfo | Each page has exactly one each | ✅ |

**Findings:**
- ✅ `index.html:76` — `<main id="main-content" tabindex="-1">` — tabindex=-1 allows skip-link target to receive focus in browsers that don't otherwise make it focusable.
- ✅ `index.html:57` — `<header class="site-header" role="banner">` — explicit landmark role.
- ✅ `index.html:236` — `<footer class="site-footer" role="contentinfo">` — explicit landmark role.
- ✅ `index.html:58` — `<nav class="nav-primary" aria-label="Primary navigation">` — distinguishes from footer nav.

### prefers-reduced-motion

| Check | Location | Verdict |
|-------|----------|---------|
| Global reduced-motion rule | `base.css:256-263` | ✅ |
| JS checks prefers-reduced-motion | `main.js:39-41` | ✅ |
| Scroll reveals gated | `main.js:44` | ✅ |

**Findings:**
- ✅ `base.css:256-262`:
  ```css
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
  ```
- ✅ `main.js:38-69` — IntersectionObserver scroll reveals only attach if `!prefersReducedMotion`.
- ⚠️ **ISSUE — Feature-card hover animation NOT gated**: `theme.css:200-207` has a `transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1)`. This hover lift (translateY -3px + scale 1.015) will still fire even when reduced motion is preferred, because `transition-duration: 0.01ms` on hover states can still trigger. The brand kit explicitly requires this animation to be gated. This is a **moderate issue**.

### Touch Targets

| Element | Size | Required | Verdict |
|---------|------|----------|---------|
| `nav-toggle` | 44×44px | ≥44px | ✅ `components.css:45-46` |
| `nav-menu a` | 44px min-height desktop, 48px mobile | ≥44px | ✅ `components.css:98`, `components.css:484` |
| `.btn` | 44px min-height | ≥44px | ✅ `components.css:203` |
| `.btn-lg` | 52px min-height | ≥44px | ✅ `components.css:324` |

### Layout at 200% Text Zoom

- ✅ `theme.css:186-189` — Features grid uses `repeat(auto-fill, minmax(260px, 1fr))` which reflows to single column.
- ✅ `components.css:498-513` — Mobile breakpoint at 768px forces single column.
- ✅ No fixed widths that would cause clipping on zoom.
- ⚠️ The `min-height: 80vh` on `.hero` at mobile (`components.css:495-496`) could cause slight clipping at very small viewports, but acceptable.

### Images

| Check | Location | Verdict |
|-------|----------|---------|
| Logo has alt | `index.html:59` | ✅ |
| All SVGs `aria-hidden="true"` | Throughout | ✅ |
| No missing alt on `<img>` | None found | ✅ |

**Findings:**
- ✅ `index.html:59` — `<img src="img/logo.svg" alt="Phlix logo" ...>` — descriptive alt text.
- ✅ Decorative inline SVGs (pitch icons, feature icons) all have `aria-hidden="true"`.

### Landmarks

- ✅ Exactly one `role="banner"` per page (`index.html:57`)
- ✅ Exactly one `<nav aria-label="Primary navigation">` (`index.html:58`)
- ✅ Exactly one `<main id="main-content">` (`index.html:76`)
- ✅ Exactly one `role="contentinfo"` footer (`index.html:236`)
- ✅ `aria-labelledby` on sections: `index.html:79` (`aria-labelledby="hero-headline"`), `index.html:94` (`aria-labelledby="pitch-heading"`)

### Skip Link

- ✅ `base.css:205-226` — `.skip-link` with `position: absolute; top: -100%` until `:focus`
- ✅ `:focus` moves it to `top: var(--space-4)` with gold background and dark text
- ⚠️ The skip link background is `--color-gold` (`#B8860B`) which provides 2px solid outline on `:focus` via `outline: 2px solid var(--color-focus)`. This is visible on focus.

---

## Dimension 7: Responsive (320–1920)

**Score: 88/100** — Excellent responsive architecture, one small issue.

### Horizontal Scroll

| Check | Location | Verdict |
|-------|----------|---------|
| `max-width: 1320px` on containers | `base.css:85`, `theme.css:60-64` | ✅ |
| No fixed `width` on containers | All use `width: 100%` + `max-width` | ✅ |
| `overflow-x: auto` only on code-block | `theme.css:412` | ✅ |
| Mobile containers use fluid `gutter` | `components.css:516-518` | ✅ |

**Findings:**
- ✅ `components.css:59-64` — `.container { width: 100%; max-width: var(--max-width); margin-inline: auto; padding-inline: var(--gutter); }`
- ✅ No `overflow-x` issues found across any page width.

### Mobile Nav (Hamburger)

| Check | Location | Verdict |
|-------|----------|---------|
| Toggle is `display: none` desktop | `components.css:41` | ✅ |
| Toggle appears at 768px | `components.css:461-463` | ✅ |
| `aria-expanded` toggles correctly | `main.js:14-18` | ✅ |
| Menu closes on outside click | `main.js:21-26` | ✅ |
| Menu closes on Escape | `main.js:28-35` | ✅ |
| Menu is `position: absolute` overlay | `components.css:467-477` | ✅ |

**Findings:**
- ✅ `components.css:40-52` — `.nav-toggle` is 44×44px, hidden by default (`display: none`).
- ✅ `components.css:461-463` — `@media (width <= 768px)` shows the toggle.
- ✅ `components.css:479-481` — `.nav-menu.is-open { display: flex; }`
- ⚠️ **ISSUE**: The hamburger appears at 768px, which is the standard tablet breakpoint. The brand kit specifies "collapsible sidebar to icon rail" for tablet, but the nav-menu is `position: absolute` overlay on mobile, which is correct. However, the nav toggle at 768px could be problematic for 768px tablets where you'd want a nav rail, not a hamburger. **Minor issue — convention over brand spec.**

### Single-Column Layout on Mobile

| Grid | Mobile Breakpoint | Result | Verdict |
|------|-------------------|--------|---------|
| `.features-grid` | 768px → 1fr | Single column | ✅ `components.css:498-500` |
| `.pitch__list` | reflows at 560px (280px minmax) | 2-col then 1-col | ✅ `theme.css:142-148` |
| `.client-cards` | 768px → 1fr | Single column | ✅ `components.css:506-508` |
| `.download-cards` | 768px → 1fr | Single column | ✅ `components.css:510-512` |
| `.footer-nav__columns` | 768px → 1fr | Single column | ✅ `components.css:489-492` |

### Body Text Never Below ~16px

| Element | Size | Location | Verdict |
|---------|------|----------|---------|
| `html` base | `font-size: 16px` | `base.css:157` | ✅ |
| Body | `font-size: 1rem` | `base.css:162` | ✅ |
| Paragraph | `font-size: 1.0625rem` | `theme.css:41` | ✅ |
| UI text | Never below 0.75rem | Various | ✅ |

**Findings:**
- ✅ `base.css:157` — `font-size: 16px` as base.
- ✅ `theme.css:39-45` — `p { font-family: var(--font-body); font-size: 1.0625rem; ... }` (17px)
- ✅ No text smaller than 12px anywhere (badge text is 11px but badges are UI chrome, not body).

### Touch Targets on Mobile

| Element | Mobile Size | Required | Verdict |
|---------|-------------|----------|---------|
| `nav-menu a` | `min-height: 48px` | ≥44px | ✅ `components.css:484` |
| `.btn` | `min-height: 44px` | ≥44px | ✅ `components.css:203` |
| `.btn-lg` | `min-height: 52px` | ≥44px | ✅ `components.css:324` |
| `nav-toggle` | `44×44px` | ≥44px | ✅ `components.css:45-46` |

### Images and Media Scale Correctly

| Check | Location | Verdict |
|-------|----------|---------|
| `img { max-width: 100%; }` | `base.css:171-174` | ✅ |
| `img { height: auto; }` | implicit via default | ✅ |
| SVG icons scale | `width/height` + `viewBox` | ✅ |
| Hero uses `clamp()` for typography | `theme.css:9` | ✅ |

**Findings:**
- ✅ `base.css:171-174`:
  ```css
  img, video, svg {
    display: block;
    max-width: 100%;
  }
  ```
- ✅ No fixed pixel dimensions on images that would cause overflow.
- ✅ SVG logos use `viewBox` and scaling correctly.

---

## Summary of Issues

### Dimension 6 — Accessibility

| # | Severity | Issue | Location | WCAG |
|---|----------|-------|----------|------|
| 1 | ⚠️ MODERATE | Feature-card hover `transition: transform 0.3s` not gated behind `prefers-reduced-motion`. Card lift animation could trigger for motion-sensitive users. | `theme.css:200-207` | 2.3.3 |
| 2 | ℹ️ INFO | Gold (`#B8860B`) on vellum (`#F4EDD8`) is ~3.2:1 — passes 3:1 for large text but NOT 4.5:1 for small body text. However, gold is reserved for ornamental accents (footer h3, badges) per brand kit. | `components.css:143-151` | 1.4.3 |

### Dimension 7 — Responsive

| # | Severity | Issue | Location | Note |
|---|----------|-------|----------|------|
| 1 | ℹ️ INFO | Nav toggle appears at 768px — standard convention, but brand kit suggests "icon rail" for tablet (768px) and "bottom tab bar" for mobile. The hamburger on tablet is a minor deviation. | `components.css:461-463` | Convention vs brand spec |

---

## Files Reviewed

| File | Lines | Purpose |
|------|-------|---------|
| `index.html` | 274 | Homepage |
| `features.html` | 186 | Feature detail page |
| `clients.html` | 165 | Client listing |
| `download.html` | 159 | Download page |
| `css/base.css` | 263 | Reset, tokens, accessibility base |
| `css/theme.css` | 558 | Typography, layout, sections |
| `css/components.css` | 529 | Components, responsive breakpoints |
| `js/main.js` | 80 | Nav toggle, reduced-motion, scroll reveals |
| `brand-kits/celtic-twilight.js` | 1193 | Brand kit reference |
| `SITE.md` | 150 | Site documentation |

---

## Verdict

**Accessibility Score: 82/100**
**Responsive Score: 88/100**

The Celtic Twilight site is well-built with strong fundamentals. Accessibility is solid: proper landmarks, ARIA usage, focus management, skip link, and mostly-correct contrast ratios. The primary concern is the feature-card hover transition that isn't gated behind `prefers-reduced-motion`. Responsive architecture is excellent with logical breakpoints, proper touch targets, and fluid typography — the single minor issue is the tablet breakpoint convention deviation.

The site correctly follows the brand kit's accessibility requirements including the gold focus ring (`#C9980A`), 44px touch targets, and prefers-reduced-motion handling (with the noted exception of card hover).
