# Build Log: 01-minimalist-cinema-5

## Variant: Minimalist Cinema V5 — "Bold Monochrome"

**Build Date:** 2026-05-21
**Variant ID:** 01-minimalist-cinema-5
**Theme:** Bold Monochrome

## Design Decisions

### Colors
- Primary: #000000 (pure black)
- Secondary: #FFFFFF (pure white)
- Accent: #FFD700 (gold) — single strong accent
- Text: #FFFFFF (on dark backgrounds)
- Muted: #666666 (subdued text)

### Typography
- Display: Playfair Display 700 (self-hosted)
- Body: Work Sans 400/500/600 (self-hosted)
- Headlines use italic Playfair Display for typographic drama
- Bold typographic scale with high contrast

### UI Style
- Bold monochrome, typographic poster design
- Gold as single accent color
- Dramatic contrast between black and white
- Sharp corners (no border-radius) for poster feel
- Strong shadows for depth

### Key Visual Elements
- Gold accent line on CTA banner
- Gold underlines on nav hover
- Bold white headlines on pure black
- Pitch section inverts to white background with black text

## Files Structure

```
01-minimalist-cinema-5/
├── css/
│   ├── base.css        (reset, variables, skip-link)
│   ├── theme.css       (fonts, typography, header/footer)
│   └── components.css  (buttons, cards, hero, sections)
├── fonts/
│   ├── playfair-display-700.woff2
│   ├── playfair-display-700italic.woff2
│   ├── work-sans-400.woff2
│   ├── work-sans-500.woff2
│   └── work-sans-600.woff2
├── img/
│   ├── logo.svg        (gold X mark, white wordmark)
│   ├── favicon.svg     (simplified icon)
│   └── og.svg          (poster-style social image)
├── js/
│   └── main.js         (nav toggle, smooth scroll, FAQ)
├── index.html          (home page)
├── features.html       (detailed features)
├── clients.html       (native apps)
├── download.html      (download/install)
├── plugins.html       (plugin ecosystem)
├── docs.html           (documentation links)
├── hub.html            (remote access)
├── about.html          (philosophy, FAQ)
├── manifest.webmanifest
├── robots.txt
└── sitemap.xml
```

## Implementation Notes

- Self-hosted fonts via @font-face declarations
- Google Fonts CDN used as fallback for when fonts directory isn't populated
- Fonts can be added to fonts/ directory later for full self-hosting
- All 8 pages built with consistent navigation
- FAQ accordion on About page uses vanilla JS
- Mobile nav with focus trap and keyboard support
- Reduced motion support via prefers-reduced-motion
- All content from shared/content.json
- Semantic HTML throughout (nav, main, header, footer)
- Accessibility: skip-link, aria-labels, focus-visible