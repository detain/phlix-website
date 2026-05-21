# Usability Review — 05-pixel-tech-4 (Wave 4)

## Score: 82/100 — PASS

## What's Working
- Skip link present
- Hover lift effects on cards
- Consistent layout
- Keyboard accessible
- Mobile menu closes on link click
- FAQ accordion on about.html

## Critical Issues (blockers)
None

## Minor Issues (non-blockers)
1. **No breadcrumbs**: No location indicator on inner pages
2. **No search**: No site search
3. **"Hub" label ambiguous**: No tooltip or clarification
4. **No back-to-top button**
5. **No visited-link styling**: Can't tell which pages visited
6. **Terminal cursor animation**: Could be distracting; needs prefers-reduced-motion verification
7. **Fixed header**: z-index: 1000 may cause mobile browser issues

## Recommendations
1. Add breadcrumbs
2. Add visited-link styling
3. Verify cursor animation disabled by prefers-reduced-motion
4. Test fixed header on iOS Safari
5. Consider back-to-top button
