# BUILD_LOG.md — Mid-Century Modern Brand Kit Site

**Brand kit**: Mid-Century Modern (`mid-century-modern.js`) — v1.0
**Site path**: `sites/mid-century-modern/`
**Canonical URL**: `https://detain.github.io/phlix-website/mid-century-modern/`
**Date**: 2026-07-27 (regen)
**Layout archetype**: narrative-scroll

---

## What was built

### CSS
- `css/base.css` — Reset, :root CSS custom properties (all brand colors, spacing scale, radii, font stacks, shadows), skip-link, focus ring, reduced-motion (animation + transition), sr-only class, base element styles
- `css/theme.css` — Typography scale, layout containers (container, page-header, hero, pitch, features-overview, cta-banner, compass-section), content-grid, scroll reveal, status badges, reduced-motion override
- `css/components.css` — Site header/nav (8 links with 3 emphasis levels), footer (3-column grid), all button variants, feature-card, feature-detail, client-card, download-card, code-block, ecosystem-list, faq-list, docs-links, proof-grid, sunburst/orbital decorative, responsive helpers

### JavaScript
- `js/main.js` — Mobile nav toggle, reduced-motion guard (with change listener), scroll reveals via IntersectionObserver, active nav highlighting, easter eggs (logo-clicks:5 sunburst burst, typed-word:orbit message, scroll-past-footer starfield), mascot Orbit (bottom-right rocket, idle bobbing, dismiss to localStorage, click-launch animation, hover tips)

### Pages (8 + 404)
- `index.html` — Home with 5 narrative sections: sunburst-rise (hero), what-flies (features overview), why-launch (pitch bullets), compass-true (proof signals), ignition (CTA banner)
- `features.html` — All 8 feature-detail articles with unique meta description
- `clients.html` — All 5 clients with status badges and unique meta description
- `download.html` — Correct install command from content.json (one-line curl), 5 client cards, ecosystem list, unique meta description
- `plugins.html` — Plugin model (LifecycleInterface + manifest), ecosystem plugins, link to phlix-plugin-example
- `docs.html` — Link-out to external docs with ecosystem list
- `hub.html` — Reverse-tunnel relay description, self-host or public hub, hub mode in clients
- `about.html` — Philosophy, license (MPL-2.0 per content.json), contributing (detain org), FAQ (6 items)
- `404.html` — Themed 404 with sunburst SVG backdrop, "Out of Orbit" concept, recovery links to home/features/download, noindex meta

### Assets / Config
- `robots.txt` — Allow all, sitemap reference
- `sitemap.xml` — 9 pages (8 + 404 excluded per spec)
- `SITE.md` — Full design documentation
- `REGEN_PLAN.md` — Section mapping and field implementation log

---

## Changes in this regen (2026-07-27)

1. **404.html added** — was missing, required per §2A error_page_experience
2. **Nav order fixed** — Hub moved before Plugins (was reversed in original build)
3. **Unique meta descriptions** — all 8 pages now have distinct descriptions (trap 19.4)
4. **Homepage section IDs** — corrected to match `homepage_narrative.sections[]` order and IDs
5. **compass-true proof section** — added between features-overview and CTA banner with GitHub repo links (verifiable signals only, no fabricated numbers)
6. **Install command corrected** — download.html now uses `curl -fsSL...install.sh | sudo bash` (the primary install from content.json), not composer
7. **Easter eggs implemented** — logo-clicks:5 (sunburst burst), typed-word:orbit (message, disabled in inputs, Esc exits), scroll-past-footer (starfield canvas)
8. **Mascot Orbit built** — bottom-right rocket with idle bobbing, dismiss to localStorage, click-launch animation, hover tips on key sections
9. **Footer license URL corrected** — now points to `https://github.com/detain/phlix-server/blob/master/LICENSE` (per content.json footer columns)
10. **sr-only class added** — proper visually-hidden pattern per trap 19.15

---

## Intentional deviations from new_site.md spec

1. **Hero SVG backdrop**: Custom inline SVG with sunburst clock emblem per `header_motif` — deliberate brand enhancement, not a functional deviation.

2. **Tagline in CTA banner**: Uses `tagline_primary` ("The Future Was Always Now.") from the kit's copy pool — brand-voicing per kit copy directives.

3. **Proof section**: Uses links to GitHub repos rather than fabricated counts per trap 19.7 — verifiable signals only.

---

## Brand fidelity notes

- Atomic teal `#00AFAF` used as consistent brand anchor (nav active, feature icons, card hover, teal glow)
- Sunburst yellow `#F2B705` exclusively for primary CTA — never diluted
- Charcoal evening `#111008` universal background — no cool blue-greys
- Cream card `#F5EFE8` text on dark surfaces — warm, not cool white
- No dark-moody, noir, cold-blue, gritty elements per `brand_opposites`
- Josefin Sans headlines uppercase + tracking per kit rules
- Mechanical easing only — no spring/bounce/elastic per `motion_style`

---

## Known follow-ups

- `img/og.svg` text may need updating if hero headline changes — run `node tools/gen-og.mjs --site mid-century-modern` to re-rasterize
- Seasonal activation JS date-gate not yet fully wired — seasonal variants are CSS-only tokens
