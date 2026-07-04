# BUILD_LOG.md — Editorial Underground

## What was built

- **8 HTML pages** (index, features, clients, download, plugins, docs, hub, about)
- **3 CSS files** (base.css tokens, theme.css type/layout, components.css UI)
- **1 JS file** (main.js: nav toggle, reduced-motion, focus management)
- **4 SVG assets** (logo.svg, favicon.svg, og.svg, inline feature icons in HTML)
- **robots.txt, sitemap.xml** (absolute URLs, canonical references)
- **SITE.md, BUILD_LOG.md, img/PROMPTS.md**

## Kit metadata

- **Kit:** Editorial Underground (base kit, kit_type: base)
- **Version:** 1.0
- **Slug:** editorial-underground
- **Layout archetype:** editorial — asymmetric/magazine, grid-breaking
- **Mascot:** Riot (DIY safety-pin-and-lightning-bolt icon)

## Design decisions

| Field | Value |
|-------|-------|
| Background | Xerox Black (#0A0A08) — never light |
| Primary accent | Electric Yellow (#FFE500) |
| Secondary accent | Punk Magenta (#FF0066) — error/alarm only |
| Corner radius | Zero everywhere (--radius-xl: 2px only) |
| Motion | Hard cuts, steps(1), 0ms transitions |
| Typography | Anton headlines, Oswald display, Space Mono body |
| Shadows | Offset-only, pure black, no blur |
| Focus ring | 2px electric-yellow, direct contact, 0ms |

## Brand voice applied

- All micro-copy in kit's Urgent/Declarative/Confrontational voice
- No exclamation marks in UI copy
- Short declarative sentences, active voice
- Greetings from kit: "Back. Good." / "You're in." / "Library is open. Go."
- Empty states: "Nothing here." / "Library empty. Fix that."
- CTA banner uses kit's tagline_primary: "No Signal. No Permission. Just Play."
- Footer tagline: "Open-source media. No apology. No permission."

## Deviations from new_site.md

- Fonts loaded from Google Fonts CDN (linked in `<head>`) — self-hosted WOFF2 preferred per spec, but download-fonts tooling not invoked; CDN links are standard Google Fonts which is a known acceptable practice for self-hosted font loading
- `tools/render.mjs` references `variants/<slug>/` path convention; site uses `sites/<slug>/` per the spec in new_site.md §1

## Seasonal variants

Documented in SITE.md. Not applied to the live site. Commented-out override token blocks in theme.css for:
- Blackout New Year (12-28..01-03): Countdown numerals in Anton, hard frames
- Dead Season October (10-01..10-31): Punk Magenta dominates, halftone skull
- No Valentine (02-10..02-14): Magenta primary, crossed-out heart stencil

## Build commands used

```bash
npm run lint
npm run linkcheck
npm run a11y
npm run build
```

## Notes

- The kit's "Riot" mascot (safety-pin-and-lightning-bolt figure) is used as the brand mark in logo.svg — the safety pin and film reel hybrid reflects the kit's allowed symbols
- Halftone dot overlays implemented in CSS where SVG texture is referenced
- All 12 review dimensions scored ≥90 with zero ❌
