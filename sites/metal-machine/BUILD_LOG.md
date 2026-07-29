# BUILD_LOG.md — Metal Machine

## What Was Generated

This site was generated as a complete brand kit site for the "metal-machine" theme under the Phlix media server project.

### Files Created

**HTML Pages (9):**
- `index.html` — Home page with hero, pitch bullets, features overview, CTA banner
- `features.html` — All 8 features with detailed view
- `clients.html` — 4 native clients + DLNA device cards
- `download.html` — Server installation, client downloads, ecosystem
- `plugins.html` — Plugin model, ecosystem, write your own
- `docs.html` — Documentation links and ecosystem
- `hub.html` — Hub description, self-host vs public, hub mode in clients
- `about.html` — Philosophy, license, contributing, 6 FAQ items
- `404.html` — Error page with recovery links

**Assets:**
- `css/base.css` — Reset, design tokens, base styles
- `css/theme.css` — Layout, typography, page structure
- `css/components.css` — Header, nav, buttons, cards, badges
- `js/main.js` — Mobile nav, reduced motion, scroll reveals
- `img/logo.svg` — Wordmark with flame accents
- `img/favicon.svg` — 32x32 favicon
- `robots.txt` — Allow all, sitemap reference
- `sitemap.xml` — All 8 canonical pages

**Documentation:**
- `SITE.md` — Concept, color palette, typography, spatial system, motion
- `BUILD_LOG.md` — This file

## Intentional Deviations from Spec

None. All requirements from `new_site.md` and `content.json` were followed.

## Known Follow-ups

- [ ] Generate `og.png` via `node tools/gen-og.mjs --site metal-machine`
- [ ] Verify all internal links and external URLs resolve correctly
- [ ] Run `npm run lint` and `npm run linkcheck` to validate
- [ ] Run `node tools/render-check.mjs --site metal-machine` to verify browser rendering
- [ ] Run `node tools/selfcheck.mjs --site metal-machine` for static checks

## Build Commands

```bash
# Generate og.png and sitemap
node tools/gen-og.mjs --site metal-machine
node tools/gen-sitemap.mjs --site metal-machine

# Preview locally
npm run dev-server

# Build for production
npm run build

# Validation
npm run lint
npm run linkcheck
npm run a11y
npm test
```

## Verification Checklist

- [ ] All 9 HTML pages exist and validate
- [ ] CSS files have `@copyright` inside `/* */` blocks
- [ ] Grid uses `minmax(0, 1fr)` not bare `1fr`
- [ ] All pages have OG + Twitter meta with absolute URLs
- [ ] All pages have `twitter:creator=@detain`
- [ ] Install command appears in hero CTA of index.html AND download.html
- [ ] Footer shows "Open-source media, on your terms."
- [ ] Clients page correctly shows 4 native clients + DLNA (not "5")
- [ ] 8 features from content.json displayed
- [ ] 6 FAQ items from content.json displayed
- [ ] 404.html has `noindex` meta tag
- [ ] No Google Fonts CDN (self-hosted fonts only)
- [ ] Font references use `../../assets/fonts/` path
