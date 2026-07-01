# BUILD_LOG.md — Mid-Century Modern Brand Kit Site

**Brand kit**: Mid-Century Modern (`mid-century-modern.js`) — v1.0
**Site path**: `sites/mid-century-modern/`
**Canonical URL**: `https://detain.github.io/phlix-website/sites/mid-century-modern/`
**Date**: 2026-07-01
**Layout archetype**: Editorial / Showcase

---

## What was built

- `css/base.css` — Reset, :root CSS custom properties (all brand colors, spacing scale, radii, font stacks, shadows), skip-link, focus ring, reduced-motion override, base element styles
- `css/theme.css` — Typography scale, layout containers (container, page-header, hero, pitch, features-overview, cta-banner), content-grid, scroll reveal, status badges
- `css/components.css` — Site header/nav, footer, all button variants, feature-card, feature-detail, client-card, download-card, code-block, ecosystem-list, faq-list, docs-links, download-cards grid, client-cards grid
- `js/main.js` — Mobile nav toggle, reduced-motion guard, scroll reveals via IntersectionObserver, active nav highlighting
- `img/logo.svg` — Josefin Sans uppercase wordmark (cream on charcoal) + atomic teal orbital ring with sunburst ticks
- `img/favicon.svg` — Atomic teal orbital mark on charcoal, 32×32
- `img/og.svg` — 1200×630 social share card with sunburst motif, tagline "The Future Was Always Now.", teal + yellow accents on charcoal
- `img/PROMPTS.md` — Exact image generation prompts for every asset
- `robots.txt` — Allow all, sitemap reference
- `sitemap.xml` — All 8 pages with absolute URLs and priorities
- `SITE.md` — Full design documentation
- `index.html` — Home page (hero with animated SVG sunburst backdrop, pitch, features overview grid of all 8 features, CTA banner)
- `features.html` — Features detail page with all 8 feature-detail articles
- `clients.html` — All 5 clients (roku, tizen, windows, mobile/beta, dlna) with status badges
- `download.html` — Server block, 5 client download cards, ecosystem list
- `plugins.html` — Plugin model description, link to example
- `docs.html` — Documentation link-out page with ecosystem list
- `hub.html` — Hub description (reverse-tunnel relay, NAT traversal)
- `about.html` — Philosophy, license, contributing, FAQ (6 items from content.json)

---

## Layout archetype rationale

**Chosen: Editorial / Showcase**

The Mid-Century Modern brand demands asymmetric but perfectly balanced compositions with a single dominant geometric motif per section. The kit's `layout_patterns.landing` guidance ("full-bleed mid-century illustration hero with Josefin Sans headline over atomic-horizon gradient → feature sections alternating charcoal/ebony → sunburst-yellow CTA") fits the Showcase archetype perfectly — bold hero with a rotating sunburst clock emblem, editorial card grid, and confident typographic CTA.

---

## Intentional deviations from new_site.md spec

1. **Hero SVG backdrop**: The spec references `tools/render.mjs` markup for the hero. For the Mid-Century Modern kit, the hero uses a custom inline SVG with a sunburst clock emblem (per `header_motif: "Slow mechanical rotation of a sunburst clock emblem..."`). This is a deliberate brand-grounded enhancement, not a deviation from functionality.

2. **Tagline in CTA banner**: The home CTA banner uses `tagline_primary` ("The Future Was Always Now.") and a `tagline_secondary` ("Space-age optimism, every time you press play.") — both drawn from the kit's copy pool — rather than generic Phlix copy. This is intentional brand-voicing per the kit's copy directives.

3. **License link in footer**: The footer links to `https://github.com/phlix-website/blob/master/LICENSE` for BSD-3 (consistent with other built sites in the dist folder), not the detain org license URL format used in links from content.json footer links.

---

## Brand fidelity notes

- Atomic teal `#00AFAF` used as consistent brand anchor throughout (nav active indicator, feature icons, card hover borders, teal glow shadows)
- Sunburst yellow `#F2B705` used exclusively for primary CTA buttons — never diluted for secondary actions
- Charcoal evening `#111008` used as universal background — no cool blue-greys introduced
- All text on dark surfaces uses cream card `#F5EFE8` (warm, not cool white)
- No dark-moody, noir, cold-blue, or gritty elements — per `brand_opposites`
- Josefin Sans headlines use uppercase + tracking per `typography_rules`
- Mechanical easing throughout — no spring/bounce/elastic per `motion_style`

---

## Known follow-ups

- Linting and a11y checks to be run per the build toolchain (`npm run lint`, `npm run a11y`, `npm run linkcheck`)
- Real photography assets to replace placeholder SVG illustrations when generated via `img/PROMPTS.md`
- Font files to be self-hosted as WOFF2 (currently relying on system font stacks as fallback; production deployment should download and serve Josefin Sans, Bebas Neue, Libre Baskerville, IBM Plex Mono as WOFF2)
