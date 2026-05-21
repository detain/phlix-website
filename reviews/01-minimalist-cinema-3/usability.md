# Usability Review — 01-minimalist-cinema-3

**Reviewer:** Usability Reviewer (Wave 3)
**Date:** 2026-05-21
**Files Reviewed:** `index.html`, `js/main.js`, `css/base.css`, `css/theme.css`, `css/components.css`

---

## Summary

The **01-minimalist-cinema-3** variant presents a dark, cinema-inspired landing page for Phlix media server. The implementation demonstrates solid accessibility fundamentals, clean information architecture, and thoughtful interactive patterns. However, several usability gaps reduce its effectiveness, particularly around interactive feedback, mobile navigation clarity, and content scannability.

**Overall Usability Score: 7.5 / 10**

---

## Strengths

### 1. Strong Accessibility Foundation
- **Skip link** present and functional, allowing keyboard users to bypass navigation
- **ARIA attributes** properly applied to navigation toggle (`aria-expanded`, `aria-controls`)
- **Focus trap** implemented in mobile nav, keeping keyboard focus within the menu when open
- **Focus-visible** styles defined, providing clear visual feedback for keyboard navigation
- **Reduced motion** media query respects user preferences
- **Semantic HTML** throughout: proper heading hierarchy (h1 → h2 → h3), landmark regions (`<header>`, `<main>`, `<footer>`, `<nav>`)

### 2. Clear Information Architecture
The page follows a logical flow that guides users from awareness to action:
1. **Hero** — Clear value proposition with dual CTAs
2. **Pitch** — Concise bullet points answering "Why Phlix?"
3. **Features Overview** — Scannable cards with icons for quick comparison
4. **CTA Banner** — Direct call-to-action to drive conversion

### 3. Responsive Mobile Navigation
The mobile nav toggle is well-implemented:
- **Hamburger icon** uses SVG with `aria-hidden="true"` (decorative)
- **Minimum 44×44px touch target** on toggle button (WCAG 2.2 success criterion)
- **Escape key** closes the menu
- **Auto-close on resize** when switching to desktop view
- **Focus return** to toggle when menu closes (focus management)
- **Nav links close menu** on click, reducing friction

### 4. Readable Typography
- Self-hosted fonts (Bebas Neue + Work Sans) ensure reliability
- **Line-height of 1.6** on body text provides comfortable reading
- **65ch max-width** on paragraphs prevents excessively long lines
- **Clamp-based fluid sizing** for headlines adapts across viewport sizes

### 5. Clean Visual Hierarchy
- Uppercase headlines with letter-spacing create strong section demarcation
- Muted text color (`#6B6B73`) for body text against secondary (`#FAFAF8`) maintains contrast
- Feature cards with icons provide visual anchors for scanning

---

## Usability Issues

### Issue 1: Feature Card Content is Dense and Technical
**Severity:** Medium
**Location:** Feature cards (lines 122–194 in `index.html`)

The pitch bullets use accessible language, but the feature cards employ technical jargon that may confuse prospective users:

> "Folder-watcher hashes mtimes, scanner parses S01E02 / (2020) titles, ItemRepository hydrates metadata_json."

**Recommendation:** Translate technical details into user benefits. For example:
- *Instead of:* "Folder-watcher hashes mtimes, scanner parses S01E02 / (2020) titles"
- *Use:* "Auto-discovers new files the moment you add them to your folder"

### Issue 2: Unlabeled External Links
**Severity:** Low
**Location:** Footer navigation links

Some footer links point to external sites (GitHub, docs) without visual distinction. Users may lose context when clicking away.

**Recommendation:** Add `target="_blank"` with `rel="noopener noreferrer"` AND consider a visual indicator (e.g., small icon) for external links, or at minimum a `title` attribute describing the destination.

### Issue 3: No Visual Differentiation for Visited Links
**Severity:** Low
**Location:** Global

The link styles (`a:hover` defined, `a:visited` not defined) mean returning visitors have no indication they've seen a page before. This is especially noticeable in the navigation menu.

**Recommendation:** Define a subtle `a:visited` style, perhaps slightly reducing opacity or shifting hue, to help users track where they've been.

### Issue 4: Hero CTA Buttons Lack Hover Feedback
**Severity:** Medium
**Location:** `.btn` classes (defined in `components.css`, referenced in `index.html`)

The primary and secondary buttons have no explicit hover state defined in the CSS provided. Users receive no feedback confirming their button press is recognized.

**Recommendation:** Add hover styles:
```css
.btn-primary:hover {
  background-color: /* slightly lighter shade */;
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}
```

### Issue 5: Footer Columns Collapse on Narrow Mobile
**Severity:** Medium
**Location:** `.footer-nav` (lines 177–181 in `theme.css`)

The footer uses `auto-fit` grid which can result in single-column layouts on mobile, stacking the three columns vertically. While functional, this may feel abrupt.

**Recommendation:** Consider adding a subtle gap or separator between footer columns on mobile, or ensuring the transition between column counts feels intentional rather than defaulting to a single stack.

### Issue 6: FAQ Accordion Referenced But Not Present on Index
**Severity:** Low
**Location:** `js/main.js` (lines 117–155)

The JavaScript initializes FAQ accordion behavior targeting `.faq-item` selectors, but the index.html page does not contain any FAQ content. While this doesn't cause errors (the code checks `if (faqItems.length > 0)`), it suggests the accordion is designed for another page (e.g., `docs.html`).

**Recommendation:** Document which page(s) should include `.faq-item` markup, or conditionally load the FAQ script only on pages that need it.

### Issue 7: Navigation Menu Lacks Active State Indication on Mobile
**Severity:** Low
**Location:** Mobile navigation (lines 310–323 in `theme.css`)

On mobile, the current page link only changes color to accent. While functional, the underline animation that exists on desktop (`::after` pseudo-element) is disabled on mobile without any visual replacement.

**Recommendation:** Add a left border or background highlight for the current page link on mobile to provide equivalent visual feedback.

---

## Detailed Assessment

### Navigation Usability

| Criterion | Status | Notes |
|-----------|--------|-------|
| Clear navigation hierarchy | ✅ Pass | h1 → h2 → h3 properly nested |
| Breadth vs. depth balance | ✅ Pass | 8 nav items is reasonable |
| Current page indicator | ⚠️ Partial | Desktop uses underline animation; mobile uses color only |
| Keyboard navigation | ✅ Pass | Focus trap, tab order, escape key all implemented |
| Touch target size | ✅ Pass | 44×44px minimum on mobile toggle |

### Content Usability

| Criterion | Status | Notes |
|-----------|--------|-------|
| Scannable headings | ✅ Pass | Uppercase headlines with icon cards |
| Bullet points scannable | ⚠️ Partial | Pitch bullets are good; feature card text is dense |
| Line length comfortable | ✅ Pass | 65ch max-width enforced |
| Contrast ratio | ✅ Pass | `#FAFAF8` on `#0A0A0F` exceeds 15:1 |

### Interactive Usability

| Criterion | Status | Notes |
|-----------|--------|-------|
| Buttons have hover states | ❌ Fail | No hover feedback on CTA buttons |
| Links have hover states | ✅ Pass | Color transition on hover defined |
| Focus states visible | ✅ Pass | `focus-visible` with accent outline |
| Error states defined | N/A | No form inputs on this page |

### Mobile Usability

| Criterion | Status | Notes |
|-----------|--------|-------|
| Touch targets adequate | ✅ Pass | 44×44px on nav toggle |
| Content reflows properly | ✅ Pass | Responsive grid and flexbox |
| Scrolling is smooth | ✅ Pass | `scroll-behavior: smooth` + JS smooth scroll |
| Nav auto-closes appropriately | ✅ Pass | On link click, resize, and escape |

---

## Recommendations (Priority Order)

1. **Add hover states to CTA buttons** — Users need confirmation their interaction was received
2. **Simplify feature card copy** — Replace technical jargon with benefit-driven language
3. **Define `a:visited` styles** — Help returning visitors track their navigation history
4. **Add visual current-page indicator on mobile nav** — Provide equivalent feedback to desktop underline animation
5. **Indicate external links** — Visually distinguish links that leave the site

---

## Accessibility Compliance Notes

- **WCAG 2.1 Level AA** target appears achievable based on current implementation
- **Target size 44×44px** requirement met on interactive elements
- **Color contrast** exceeds requirements in all text areas
- **Keyboard operability** fully functional with focus trap
- **Screen reader** should handle semantic HTML correctly (proper heading structure, nav landmarks, aria attributes)

---

*Review completed by Usability Reviewer, Wave 3*
