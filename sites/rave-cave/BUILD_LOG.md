# BUILD LOG — Rave Cave

## Generated 2026-07-29

### What was generated

- **9 HTML pages:** index, features, clients, download, plugins, docs, hub, about, 404
- **3 CSS files:** base.css (design tokens + reset), theme.css (layout + components), components.css (header/footer + utilities)
- **1 JS file:** main.js (mobile nav toggle, scroll reveals, reduced motion)
- **2 SVG assets:** logo.svg, favicon.svg
- **Supporting files:** robots.txt, sitemap.xml, SITE.md, BUILD_LOG.md

### Content sourcing

- All feature/client/ecosystem/FAQ content from `shared/content.json`
- Install command from `content.json.install.primary.command` — single source of truth
- Footer columns from `content.json.footer.columns` verbatim
- License language from `content.json.faq` (last entry)

### Compliance notes

- ✅ 4 native clients (Roku, Samsung Tizen, Windows, Mobile beta) + DLNA — never "5"
- ✅ 8 features from `content.json.features`
- ✅ 6 FAQ items from `content.json.faq`
- ✅ Install command in hero CTA of index.html AND download.html
- ✅ Footer tagline: "Open-source media, on your terms."
- ✅ No Google Fonts CDN — self-hosted font references (fallback to local)
- ✅ CSS `@copyright` inside `/* */` comment blocks on all CSS files
- ✅ Grid: `minmax(0, 1fr)` not bare `1fr`
- ✅ All pages: OG + Twitter meta with `twitter:creator=@detain`
- ✅ `og:image` absolute URL on all pages
- ✅ MPL-2.0 / MIT dual license correctly applied
- ✅ `@copyright` line in JS file banner

### Intentional deviations from spec

- Font family fallbacks use commonly-available system fonts (Orbitron → monospace fallback, etc.) since self-hosted WOFF2 fonts were not available in `shared/assets/fonts/`. The system fonts maintain the monospace/tech aesthetic.
- No seasonal/intensity toggle variants — not declared in the kit brief
- No mascot/easter eggs — not declared in the kit brief

### Known follow-ups

- Generate `img/og.png` with `node tools/gen-og.mjs --site rave-cave`
- Run `npm run lint`, `npm run linkcheck`, `npm run a11y` to validate
- If rendering issues at 320px, check render-check per §19.12
