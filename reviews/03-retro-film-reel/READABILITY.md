# READABILITY - 03-retro-film-reel (base)

## Font Sizes
- Body text uses `--text-base: clamp(1rem, 0.9rem + 0.5vw, 1.125rem)` with minimum 1rem (16px) - PASS
- Headings are appropriately sized: h1 up to 4rem, h2 up to 3rem, h3 up to 2rem
- Smallest defined size is `--text-xs: clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)` with minimum 0.75rem (12px)
- `--text-xs` is used for `footer-copy` and `client-status` badges
- Note: 12px is below the 14px minimum for any text, though these are small UI elements not body text

## Line Heights
- Body text line-height: 1.6 - PASS (meets 1.5 minimum)
- Heading line-height: 1.1 - borderlines acceptable (headings use uppercase Bebas Neue which handles tight leading better than body text would)
- Paragraph spacing: `--space-md` (1rem) provides adequate separation

## Text Contrast
- Body text (#111 on cream #f5e9d4): ~16:1 ratio - PASS
- Muted text (--color-soft-brown #8c5e3c on cream): ~2.8:1 - FAIL (below 4.5:1)
- Used on `.feature-card p` descriptions
- Footer links (mustard #d4a017 on soft-brown #8c5e3c): ~2.6:1 - FAIL
- Footer link hover (cream on soft-brown): ~7.5:1 - PASS
- Primary text on dark backgrounds all pass (hero h1, cta-banner h2 on colored backgrounds)

## Reduced Motion
- CSS `@media (prefers-reduced-motion: reduce)` present in base.css:97-109
- Disables all animations and transitions to 0.01ms duration/iteration
- JavaScript `initEntranceAnimations()` checks `window.matchMedia('(prefers-reduced-motion: reduce)').matches` and skips staggered animations if true
- Marquee lights animation will be disabled via CSS media query
- Smooth scroll behavior also disabled in CSS media query

## Motion Safety
- Marquee glow animation: 1.5s duration, color shifts from mustard to cream
- Animation does NOT flash (no rapid on/off), subtle glow fade
- No content flashes more than 3 times per second
- No rapid color changes that could cause photosensitive reactions
- Header scroll effect only adds box-shadow, no layout shift

## Score: 85/100

## Pass/Fail: FAIL

**Reason for failure:** Muted text contrast ratio (2.8:1) on feature card descriptions and footer navigation links (2.6:1) are below the 4.5:1 minimum WCAG AA requirement. These should be darkened to meet contrast standards.
