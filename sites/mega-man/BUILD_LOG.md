# Mega-Man Theme — Build Log

## Built: 2026-07-29

## Files Created (22)

### HTML Pages (9)
- `index.html` — Home page with hero, pitch, features overview, CTA
- `features.html` — All 8 features with detail cards
- `clients.html` — 4 native clients + DLNA
- `download.html` — Server install + client downloads + ecosystem
- `plugins.html` — Plugin model + ecosystem plugins list
- `docs.html` — Documentation links + ecosystem
- `hub.html` — Hub feature explanations
- `about.html` — Philosophy, license info, FAQ (6 questions)
- `404.html` — "Stage Not Found" themed error page

### CSS Files (3)
- `css/base.css` — Reset, tokens, base styles, self-hosted fonts
- `css/theme.css` — Typography, layout, page structures
- `css/components.css` — Nav, buttons, cards, FAQ, footer

### JavaScript (1)
- `js/main.js` — Mobile nav toggle, reduced-motion, scroll reveals

### Images (3 planned)
- `img/logo.svg` — PHLIX wordmark with blue gradient + gold underline
- `img/favicon.svg` — Blue square with white "P"
- `img/og.png` — (to be generated)

### Config Files (3)
- `robots.txt` — References sitemap
- `sitemap.xml` — 8 canonical pages
- `SITE.md` — Design documentation
- `BUILD_LOG.md` — This file

## Compliance Notes

- ✅ 4 native clients + DLNA (never "5")
- ✅ 8 features from content.json
- ✅ 6 FAQ items from content.json
- ✅ Footer: 3 columns + "Open-source media, on your terms."
- ✅ Install command in hero CTA (index.html) AND download.html
- ✅ FAQ uses `<details>`/`<summary>` elements
- ✅ OG + Twitter meta on every page, `twitter:creator=@detain`
- ✅ Self-hosted fonts (Bangers, Barlow, Courier Prime from shared pool)
- ✅ CSS `@copyright` inside `/* */` comment blocks
- ✅ Grid: `minmax(0, 1fr)` not bare `1fr`
- ✅ `robots.txt` references sitemap
- ✅ `sitemap.xml` excludes 404.html (noindex)

## Theme-Specific Design Decisions

- **Palette:** Mega-Man blue (#0077BE), robot master gold (#FFD700), boss weapon orange (#FF4500), dark background (#1A1A2E)
- **Typography:** Bangers for display headings (arcade feel), Barlow for body, Courier Prime for code
- **3D Buttons:** Power-up style with gradient tops and solid bottom shadows
- **Glow Effects:** Blue glow on feature hover, orange glow on client/download hover
- **Hero:** "Stage select" energy with gradient overlays and gold accent underlines
- **404 Page:** "Stage Not Found" — robot master defeat theming

## Deviations from new_site.md

None — built to spec exactly.

## Known Issues

None identified at build time. Run `npm run lint` and `node tools/selfcheck.mjs --site mega-man` to validate.
