# Usability Review — 01-minimalist-cinema-5 (Wave 5)

## Score: 82/100 — PASS

## What's Working
- **Skip link**: Present on all pages, visible on focus with 2px accent outline (base.css lines 131–152) ✓
- **Hover states**: All interactive elements have hover states:
  - Nav links: color change + underline animation (theme.css lines 250–264)
  - Buttons: background/border swap on hover (components.css lines 34–48)
  - Feature cards: border-color change + translateY lift (components.css lines 207–209)
  - Client cards: border-color change on hover (components.css lines 387–388)
  - Links: color transition (base.css lines 127–129)
- **Navigation**:
  - Primary nav with 8 links covering all major sections
  - aria-current="page" indicator on active nav link
  - Responsive hamburger menu on mobile (≤768px)
  - Focus trap in mobile nav prevents tabbing outside menu
  - Escape key closes mobile nav
  - Nav closes automatically when link is clicked on mobile
- **FAQ accordion on about.html**:
  - Keyboard accessible (button element, focusable)
  - aria-expanded/aria-hidden states properly toggled
  - Only one item open at a time (mutually exclusive accordion)
  - Visual indicator via border-left accent color
  - Hidden attribute used for collapsed state
- **Keyboard navigation**:
  - All interactive elements are natively focusable
  - :focus-visible styles with 2px accent outline
  - Skip link targets main-content with tabindex="-1"
  - No keyboard traps except the intentional mobile nav focus trap

## Critical Issues (blockers)
1. **No back-to-top button**: index.html has no "back to top" functionality. While the sticky header helps, long-scroll pages benefit from a floating "back to top" link.
2. **No breadcrumb navigation**: Pages like about.html could benefit from breadcrumbs (Home > About) to help users understand their location.
3. **Mobile nav doesn't remember state on page reload**: If a user opens the mobile nav and then refreshes, the nav resets to closed.

## Minor Issues (non-blockers)
1. **FAQ buttons don't have aria-controls**: The FAQ accordion buttons don't have explicit `aria-controls` attributes pointing to their dd element's ID.
2. **No loading state for external links**: The "Read the docs" and external footer links don't indicate they open in a new tab.
3. **Pitch section has black-on-white text** which creates a high contrast section — design consideration, not a usability failure.

## Recommendations
1. Add a floating "back to top" button that appears after scrolling past the hero section
2. Add breadcrumb navigation to inner pages (about.html, features.html, etc.)
3. Add `aria-controls` attribute to FAQ buttons pointing to their dd element's ID
4. Consider adding `target="_blank" rel="noopener noreferrer"` to external links with a visual indicator
5. Add sessionStorage persistence for mobile nav state
6. Add `aria-label` explicitly to all logo links for consistency
