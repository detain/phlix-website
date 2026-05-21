# Performance Review — 04-portal-hub-5 (Wave 5)

## Score: 88/100 — PASS

## What's Working
- All fonts self-hosted in `fonts/` directory (NunitoSans-Regular/Medium/SemiBold/Bold.woff2)
- `font-display: swap` used on all @font-face declarations
- Vanilla JavaScript — no frameworks, no CDN dependencies, no jQuery
- Single JS file (main.js) minified and simple
- No external CSS CDNs — all stylesheets local
- No web font preconnect needed since fonts are self-hosted in same domain
- `will-change` hints not overused
- CSS animations use `transform` and `opacity` only (good for compositor)
- `prefers-reduced-motion` support prevents animations for users who prefer reduced motion (also improves battery/performance)

## Critical Issues (blockers)
- None

## Minor Issues (non-blockers)
1. **CSS syntax error on line 812** — Missing closing parenthesis in `calc(var(--header-height) + var(--space-2xl);` — causes CSS parse warning, may cause layout issues on mobile
2. **Large radial gradient backgrounds** — Hero and CTA sections use large `radial-gradient` with `rgba()` values — these trigger repaints. Consider using static gradient images or simplify
3. **Multiple box-shadow declarations** — Feature cards have multiple shadow values that compound on hover — acceptable but could be simplified
4. **No image optimization** — `img/og.svg` is SVG but no `loading="lazy"` attribute on off-screen images (though there are few images in this variant)

## Recommendations
1. Fix CSS syntax error on theme.css line 812
2. Consider adding `content-visibility: auto` to off-screen content sections for rendering performance
3. Consider preloading the most used font weight (Regular 400) to reduce FOUT
4. SVGs could benefit from `width` and `height` attributes to prevent layout shift
