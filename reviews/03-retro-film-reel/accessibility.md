# Accessibility Review: 03-retro-film-reel

**Variant:** 03-retro-film-reel
**Reviewer:** Dimension Reviewer (Accessibility)
**Date:** 2026-05-20
**Pages Reviewed:** 8 (index, about, features, hub, docs, plugins, download, clients)

---

## Overall Assessment: REQUEST_CHANGES

The variant demonstrates strong accessibility fundamentals (skip links, semantic landmarks, keyboard navigation, ARIA) but has **4 critical contrast failures** that fail WCAG 2.2 AA requirements.

---

## Score: 78 / 100

---

## ✅ Passed Items

| Criterion | Evidence |
|-----------|----------|
| **Skip link** | Present on all 8 pages (`<a class="skip-link" href="#main-content">`), styled in base.css:157-177, becomes visible on focus |
| **Focus styles** | `:focus-visible` defined in base.css:184-187 with teal outline; sufficient distinction |
| **Alt text** | Logo has `alt="Phlix logo"` on all pages (e.g., index.html:44); decorative SVGs use `aria-hidden="true"` |
| **ARIA landmarks** | `role="banner"` (header), `role="navigation"` with `aria-label`, `role="contentinfo"` (footer), `role="list"` on all lists |
| **Keyboard navigation** | Mobile nav has focus trap (main.js:45-60), Escape closes menu, Tab cycles through items, first item focused on open |
| **prefers-reduced-motion** | Global wrapper in base.css:97-109 disables all animations/transitions; entrance animations check preference (main.js:126-134) |
| **Semantic HTML** | Single `<h1>` per page; proper heading hierarchy; `<main>`, `<nav>`, `<header>`, `<footer>`; `<article>` for cards |
| **aria-current** | Active nav link has `aria-current="page"` on all 8 pages |
| **Section labelling** | `aria-labelledby` on hero, pitch, features-overview, cta-banner sections pointing to heading IDs |
| **Smooth scroll** | Implemented with accessibility focus management (main.js:74-92), sets tabindex and focuses target |
| **No forms** | Static informational site — form label criterion N/A |

---

## ⚠️ Concerns (Non-blocking)

| Issue | Location | Evidence | Impact |
|-------|----------|----------|--------|
| **Footer links not visually distinct on focus** | theme.css:226-233 | `.site-footer a` styles hover (underline) but has no explicit `:focus-visible` rule; teal hover (theme.css:227) may be hard to see on soft-brown background | Low — base.css global focus styles apply, but footer-specific focus would improve UX |
| **Marquee lights not wrapped in prefers-reduced-motion** | components.css:325-356, index.html:70-76 | Keyframes defined outside media query; however, elements have `aria-hidden="true"` and are purely decorative | Minimal — decorative only, animation runs before global CSS disables it on page load |
| **Mobile nav toggle: hover/focus colors same** | theme.css:351-356 | `nav-toggle:hover` and `nav-toggle:focus-visible` both use `--color-black-outline` | Low — 3px border outlines remain visible on focus |

---

## ❌ Failures (Must Fix)

### 1. Footer Copy Text — Contrast Failure
**WCAG 2.2 SC 1.4.3 (AA): Normal Text**
**Pages:** All 8 (index.html:230, about.html:154, etc.)

```css
/* theme.css:278 */
.footer-copy {
  color: rgba(245, 233, 212, 0.7);  /* 70% opacity cream on soft-brown */
}
```

**Contrast Analysis:**
- Cream (#F5E9D4) at 70% opacity ≈ #F5E9D4 at 70% = effective ~rgba(245,233,212,0.7)
- Background: soft-brown (#8C5E3C)
- Estimated contrast: **2.9:1** (fails 4.5:1 requirement)

**Fix:** Increase opacity to 100% or change text color to a darker shade that provides 4.5:1 on soft-brown.

---

### 2. Status Badge (stable) — Contrast Failure
**WCAG 2.2 SC 1.4.3 (AA): Small Text**
**Page:** clients.html:83, 98, 112, 141

```html
<span class="client-status status-stable">stable</span>
```

```css
/* components.css:500-502 */
.status-stable {
  background-color: #1ABC9C;  /* teal */
  color: #F5E9D4;              /* cream */
}
```

**Contrast Analysis:**
- Teal (#1ABC9C) text on Cream (#F5E9D4) background
- Estimated contrast: **2.9:1** (fails 4.5:1 for small/bold text)

**Fix:** Use dark text (#111) on teal background, or use a teal that passes contrast.

---

### 3. Status Badge (beta) — Contrast Failure
**WCAG 2.2 SC 1.4.3 (AA): Small Text**
**Page:** clients.html:127

```html
<span class="client-status status-beta">beta</span>
```

```css
/* components.css:505-507 */
.status-beta {
  background-color: #D4A017;   /* mustard */
  color: #111;                  /* black-outline */
}
```

**Contrast Analysis:**
- Mustard (#D4A017) on Cream (#F5E9D4) background
- Estimated contrast: **1.6:1** (fails 4.5:1 severely)

**Fix:** Use dark text on mustard background or redesign badge with sufficient contrast.

---

### 4. Hero Eyebrow Text — Potential Contrast Failure
**WCAG 2.2 SC 1.4.3 (AA): Large Text (but verify)**
**Page:** index.html:78

```html
<p class="hero-eyebrow">Self-hosted media server</p>
```

```css
/* components.css:143-150 */
.hero-eyebrow {
  color: var(--color-mustard);  /* #D4A017 on teal background */
}
```

**Contrast Analysis:**
- Hero background is teal (#1ABC9C) per components.css:115
- Mustard (#D4A017) text on teal
- Estimated contrast: **1.4:1** — likely fails for any text size

**Note:** "Large text" exception applies at 18px+ (or 14px bold). At ~0.875rem (14px) and uppercase, this is borderline. Using safe assumption (not large text), this fails.

**Fix:** Use cream (#F5E9D4) or other contrasting color for hero eyebrow.

---

## Recommendations (Ranked by Impact)

| Priority | Issue | Fix Effort | Impact |
|----------|-------|-------------|--------|
| **P1** | Status badges (stable, beta) | Change `color` in CSS | High — visible on all client cards |
| **P1** | Footer copy opacity | Remove opacity or darken | High — appears on every page |
| **P1** | Hero eyebrow color | Change to cream | High — above-the-fold on homepage |
| **P2** | Footer link focus styles | Add `:focus-visible` to theme.css | Medium — improves keyboard UX |
| **P3** | Mobile toggle focus colors | Differentiate hover/focus | Low — visual only, focus outline remains |

---

## Detailed Findings

### Focus Management (base.css)

```css
/* base.css:184-187 */
:focus-visible {
  outline: var(--border-medium) solid var(--color-teal);
  outline-offset: 2px;
}
```
Good: Provides clear 3px teal outline with offset. Teal is #1ABC9C providing ~3:1 against cream.

### prefers-reduced-motion (base.css)

```css
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```
Good: Properly disables all animations and transitions.

### Skip Link (base.css)

```css
.skip-link {
  position: absolute;
  top: -100%;  /* Hidden until focused */
  left: var(--space-md);
  z-index: 9999;
  ...
}
.skip-link:focus {
  top: var(--space-md);  /* Visible on focus */
  outline: var(--border-medium) solid var(--color-cream);
}
```
Good: Properly hidden off-screen, visible on focus with cream outline for visibility.

### Semantic Landmarks (index.html example)

```html
<header class="site-header" role="banner">
<nav class="nav-primary" role="navigation" aria-label="Primary navigation">
<main id="main-content" tabindex="-1">
<footer class="site-footer" role="contentinfo">
```
Good: All proper ARIA roles and unique IDs.

### Keyboard Focus Trap (main.js:45-60)

```javascript
navMenu.addEventListener('keydown', function(e) {
  if (e.key !== 'Tab') return;
  const focusableElements = navMenu.querySelectorAll('a[href], button');
  // ... focus trap logic
});
```
Good: Properly traps Tab/Shift+Tab within open mobile nav.

---

## Evidence Summary

| File | Lines | Issue |
|------|--------|-------|
| theme.css | 278 | `rgba(245,233,212,0.7)` for footer-copy |
| components.css | 500-502 | status-stable: teal on cream |
| components.css | 505-507 | status-beta: mustard on cream |
| components.css | 143-150 | hero-eyebrow: mustard on teal |
| theme.css | 226-233 | Missing footer link focus styles |
| theme.css | 351-356 | nav-toggle hover/focus same color |
| base.css | 97-109 | prefers-reduced-motion wrapper (PASS) |
| base.css | 157-177 | skip-link styles (PASS) |
| base.css | 184-187 | :focus-visible styles (PASS) |
| main.js | 45-60 | Focus trap (PASS) |
| main.js | 126-134 | Reduced motion check (PASS) |

---

## Verdict

**Must fix** the 4 contrast failures before production deployment. The foundation (semantic HTML, ARIA, keyboard nav, skip link, reduced motion support) is solid. Fixing the color contrast issues will bring this variant into full WCAG 2.2 AA compliance.
