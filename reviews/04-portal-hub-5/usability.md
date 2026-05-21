# Usability Review — 04-portal-hub-5 (Wave 5)

## Score: 78/100 — MARGINAL PASS

## What's Working
- Skip link present at top of body — allows keyboard users to skip to main content
- Navigation has hover states with underline animation
- Navigation shows active state via `aria-current="page"`
- All buttons and links have visible focus states (`focus-visible` outline)
- Mobile hamburger menu works and is accessible
- FAQ accordion present (docs.html) with keyboard support
- Hover effects on feature cards (transform + shadow)
- CTA buttons have distinct primary (filled amber) vs secondary (outlined) styles
- Footer organized in clear columnar layout
- No dead links visible — all navigation links point to valid routes

## Critical Issues (blockers)
1. **CSS syntax error breaks hero mobile layout** — theme.css line 812 missing `)` in calc — on mobile, hero section padding-top fails, causing content to render under/overlap the fixed header
2. **Mobile nav ARIA target mismatch** — `aria-controls="main-nav"` but nav has class not id — menu toggle is not properly connected to nav element

## Minor Issues (non-blockers)
1. **No back-to-top link** — Long pages (features, download) lack a "back to top" action
2. **No breadcrumb navigation** — Users don't know where they are in site hierarchy
3. **No loading states for external links** — Links to GitHub/docs could show inline loading indicator
4. **CTA section button on dark background** — "Get Phlix" button uses amber on near-black which may have contrast issues (amber ~#F59E0B on #1A1A1A background ratio ~5.2:1 — WCAG AA requires 4.5:1 for normal text, passes but barely; for large text like button 3:1 minimum passes)
5. **Feature cards have no explicit link/call to action** — Users must infer the feature is "learn more" but there's no button. Consider adding "Learn more" link or making entire card clickable.
6. **No visual feedback on external links** — Links to external sites (GitHub, docs) don't have icon indicator or open in new tab affordance
7. **Mobile nav has no close button** — Users must use hamburger or Escape key to close — touch users have no explicit close affordance

## Recommendations
1. Fix CSS syntax error on theme.css line 812
2. Fix mobile nav ARIA: change nav to `<nav id="main-nav" class="main-nav" role="navigation" aria-label="Main navigation">`
3. Add "back to top" link at bottom of long pages
4. Add visual indicator (icon + `target="_blank" rel="noopener"`) for external links
5. Consider adding breadcrumbs for deep pages (download, docs)
6. Make feature cards clickable or add explicit "Learn more" CTA
7. Add explicit close (X) button in mobile nav overlay for touch users
