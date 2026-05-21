# Usability Review — 05-pixel-tech-1 (Round 2)

## Findings

### Navigation (Desktop + Mobile)

**Desktop:**
- Semantic `<nav>` with `aria-label="Main navigation"` — good
- 7 nav items in correct priority order (Features, Clients, Download, Plugins, Docs, Hub, About)
- Skip link present (`#main-content`) — excellent accessibility
- Logo home link functional
- `aria-current="false"` present on nav links (unnecessary but harmless; would be cleaner to omit attribute entirely when false)

**Mobile:**
- Toggle button uses `aria-expanded` and `aria-controls` correctly
- Mobile nav is `role="dialog"` with `aria-modal="true"` — properly declared
- Close button present with clear label
- Focus management: close button receives focus on open; toggle receives focus on close — correct
- Body scroll locked while nav open (`overflow: hidden`) — good
- Escape key closes nav — good
- Focus trap implemented with Tab/Shift+Tab cycling — good
- Click on any mobile link closes nav — good

**Issues:**
- Toggle icon is bare "≡" Unicode character; lacks visual affordance as a menu button
- No indication of active page in mobile nav (desktop nav has `aria-current` but mobile nav items lack it)
- Mobile nav structure is `<div>` not `<nav>` — inconsistent semantics

### Interaction Patterns

- Terminal typing animation fires automatically on load (500ms delay, 50-100ms per char) — may feel busy on repeat visits
- Cursor blink follows typing completion — standard expected behavior
- `prefers-reduced-motion` respected: typing skipped, animations simplified — good
- Staggered card entrance via IntersectionObserver (0.1 threshold) — smooth
- Smooth scroll for anchor links with `behavior: 'smooth'` — good
- No dead buttons or unhandled interactions detected

### FAQ Accordion

**Status: NOT PRESENT**

No FAQ section exists in this page. Cannot evaluate accordion behavior.

### User Flow

- Hero immediately states value proposition ("Your media. Your library. Your Phlix.")
- Hero CTA pair: "Get Phlix" (primary) + "Read the docs" (secondary) — clear binary choice
- Pitch grid below hero previews key benefits in scannable bullet format
- Feature grid uses icon + headline + description pattern — consistent
- Final CTA section reinforces download intent
- Footer navigates to external docs/GitHub links (correctly uses `rel="noopener noreferrer"` on docs link in hero)

**Issues:**
- No breadcrumbs or back-navigation path for deep-linked users
- No indication of user's current location within the site hierarchy
- "Hub" nav item is ambiguous — unclear whether it means the remote relay service or a local content hub

## Score: 78/100

Deduction summary:
- FAQ missing (required for review) — -10
- Mobile nav toggle affordance — -4
- Active page state missing in mobile nav — -4
- Semantic inconsistency (div vs nav for mobile) — -4

## Pass/Fail: MARGINAL PASS

The variant implements solid fundamentals: keyboard navigation, focus management, reduced-motion support, and semantic HTML are all correct. The mobile nav interaction is well-implemented. The terminal animation adds personality appropriate to the tech/developer aesthetic. Minor issues around affordances and active-state labeling do not block the experience but should be addressed in the next round.

### Priority Fixes for Round 3
1. Add FAQ section if accordion review is required
2. Replace "≡" with an SVG hamburger or clear icon
3. Add `aria-current="page"` to mobile nav active item
4. Change mobile nav `<div class="mobile-nav">` to `<nav class="mobile-nav">`
