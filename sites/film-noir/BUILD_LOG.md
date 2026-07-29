# Film-Noir Brand Kit Site — Build Log

## Date
2026-07-29

## Site
- **Slug:** film-noir
- **Theme:** Film noir — cinematic shadows, venetian blind light stripes, smoky atmosphere
- **Palette:** #0D0D0D (noir black), #F5F5F5 (off-white), #D4AF37 (gold), #8B0000 (dark red), #1A1A1A (charcoal)

## Pages Created (9 HTML files)
1. `index.html` — Home page with hero, pitch bullets, 8 features overview, CTA banner
2. `features.html` — All 8 features with detail layout
3. `clients.html` — 5 clients (4 native + DLNA) with status badges
4. `download.html` — Server install (with install command), client downloads, ecosystem list
5. `plugins.html` — Plugin model explanation, ecosystem, write your own CTA
6. `docs.html` — Documentation links, developer docs, ecosystem list
7. `hub.html` — Hub explanation, self-host vs public, client Hub mode
8. `about.html` — Philosophy, license (split MPL-2.0/MIT), contributing, FAQ
9. `404.html` — "Scene not found" themed error page

## Files Created

### CSS
- `css/base.css` — Reset, CSS custom properties (tokens), element defaults, @copyright comment
- `css/theme.css` — Typography, layout containers, hero/features/pitch sections, code blocks, FAQ
- `css/components.css` — Header/nav, footer, buttons, badges, feature cards, animations, @copyright comment

### JavaScript
- `js/main.js` — Mobile nav toggle, reduced motion handling, scroll reveals, @copyright comment

### Images
- `img/logo.svg` — Film reel + play button icon + "PHLIX" wordmark in gold
- `img/favicon.svg` — Film reel mark in gold on charcoal square

### Config
- `robots.txt` — Allows /film-noir/, references sitemap
- `sitemap.xml` — 8 URLs (excludes 404.html as per spec)

### Docs
- `SITE.md` — Design rationale, color table, typography, motion philosophy
- `BUILD_LOG.md` — This file

## Compliance Notes

### Content
- ✅ Install command from content.json.primary — verbatim
- ✅ 8 features from content.json.features
- ✅ 6 FAQ from content.json.faq
- ✅ Footer tagline: "Open-source media, on your terms."
- ✅ Footer 3 columns from content.json.footer.columns
- ✅ 4 native clients + DLNA (never "5")

### Technical
- ✅ OG + Twitter meta on all pages
- ✅ twitter:creator=@detain
- ✅ @copyright inside /* */ comment blocks
- ✅ Grid: minmax(0, 1fr) for strict tracks (not bare 1fr)
- ✅ <details>/<summary> for FAQ
- ✅ Install command in hero CTA of index.html AND download.html
- ✅ Self-hosted styling only (no Google Fonts CDN)
- ✅ Accessible: skip link, aria-current, landmarks, focus-visible

### Theme-Specific
- ✅ Film noir aesthetic: venetian blind light stripes (CSS overlay)
- ✅ Smoky atmosphere (radial gradient overlays)
- ✅ High contrast black/white with amber gold accent
- ✅ Cinematic typography: Bebas Neue (display), Source Serif 4 (body)

## Deviations from Spec
None — all requirements met.

## Follow-up
- Run `node tools/gen-og.mjs --site film-noir` to generate og.png
- Commit and push to origin master
