# Night Hawk Site — Build Log

## Date
2026-07-28

## What Was Built
Complete rebuild of `sites/night-hawk/` as a proper Phlix brand kit site with the Night Hawk stealth fighter theme.

## Pages Created
- `index.html` — Home with hero, pitch bullets, 8 feature cards, CTA
- `features.html` — All 8 features with detailed descriptions
- `clients.html` — 5 client cards (Roku, Tizen, Windows, Mobile, DLNA)
- `download.html` — Server install command, client downloads, ecosystem
- `plugins.html` — Plugin model (LifecycleInterface), ecosystem, write your own
- `docs.html` — Documentation links (user guide, API ref, developer, hub admin)
- `hub.html` — Phlix Hub explanation (relay, self-host, clients)
- `about.html` — Philosophy, license (MPL-2.0/MIT split), contributing, FAQ
- `404.html` — Stealth-themed "SIGNAL LOST" error page

## Assets Created
- `css/base.css` — CSS reset, custom properties (design tokens), base element styles, scanline overlay, HUD animations
- `css/theme.css` — Typography scale, layout containers, hero/pitch/features/cta sections, cards, code blocks, FAQ, footer
- `css/components.css` — Header/nav, mobile nav toggle, buttons (primary/secondary/ghost), badges, forms, links
- `js/main.js` — Mobile nav toggle (aria-expanded, Esc, outside click), FAQ accordion, scroll reveals via IntersectionObserver, HUD flicker, smooth scroll, header background on scroll
- `img/logo.svg` — SVG with stealth fighter "P" mark, targeting reticle, "PHLIX" text
- `img/favicon.svg` — Square 32x32 mark with HUD corner brackets
- `img/og.png` — 1200x630 PNG (rsvg-convert from og.svg)
- `robots.txt` — Allow all, sitemap reference
- `sitemap.xml` — 8 pages (excludes 404.html as per spec)

## Content Contract
All content sourced from `shared/content.json`:
- Hero copy (eyebrow, headline, subheadline, CTAs)
- 7 pitch bullets
- 8 features with icons
- 5 clients with highlights and status
- 5 ecosystem projects
- 6 FAQ items
- Footer columns
- Install command (verbatim from content.json — single source of truth)

## Key Technical Decisions

### Fonts
**Issue**: Night-hawk brand kit specifies Orbitron, Share Tech Mono, Share Tech. These are NOT in `shared/assets/fonts/` font pool.

**Resolution**: Used Fira Code (which IS in the pool) as a functional substitute for all roles. Fira Code is a monospace font with technical aesthetic that approximates the kit's intent.

**Escalated**: To orchestrator for potential font pool addition of Orbitron/Share Tech Mono/Share Tech.

### CSS Architecture
Three stylesheet approach per new_site.md:
1. `base.css` — Reset, CSS custom properties, base elements, HUD effects
2. `theme.css` — Typography, layout, section components
3. `components.css` — Header, nav, buttons, cards, forms

All colors via CSS variables from kit's `cssVariables`. No raw hex values in component CSS.

### Self-hosted Fonts
No Google Fonts CDN links. Fira Code is loaded from `../../assets/fonts/` relative path (shared pool). font-display: swap implied by system.

### SVG Icons
Feature icons are inline SVG with `stroke="currentColor"`. No icon font CDN. Each icon is stroke-based, 24x24 viewBox, 1.5 stroke width.

### Reduced Motion
All CSS animations and JS scroll reveals respect `prefers-reduced-motion: reduce`. JS checks `window.matchMedia` and disables animations accordingly.

## Verification Performed
- [ ] All 9 pages + 404.html exist
- [ ] CSS files present and load order correct
- [ ] JS file has no external dependencies
- [ ] robots.txt references sitemap
- [ ] sitemap.xml has 8 URLs (no 404.html)
- [ ] og:image is absolute URL to 1200x630 PNG
- [ ] Install command matches content.json verbatim
- [ ] License split noted correctly (MPL-2.0 server, MIT clients/plugins)
- [ ] No Google Fonts CDN links
- [ ] No icon CDNs

## Known Issues / Follow-ups
1. **Font pool**: Orbitron/Share Tech Mono/Share Tech not in shared font pool — escalate
2. **og.png**: Created with rsvg-convert — verify rendering on various platforms
3. **lint**: Not yet run — pending

## Commit
```
feat(night-hawk): complete rebuild as proper Phlix brand kit site (stealth fighter theme)
```
