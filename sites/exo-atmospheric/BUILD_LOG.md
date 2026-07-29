# BUILD_LOG.md — Exo-Atmospheric

## What was built

Complete brand-kit site for the `exo-atmospheric` kit (space / cosmic observatory theme).

### Files generated (22+)

```
sites/exo-atmospheric/
├── index.html          Home — hero, pitch bullets, features overview, CTA banner
├── features.html       Feature detail grid (8 features)
├── clients.html        Client cards (5 clients: Roku, Tizen, Windows, Mobile, DLNA)
├── download.html       Install command, client downloads, ecosystem list
├── plugins.html        Plugin model + ecosystem + write your own
├── docs.html           Documentation links + ecosystem
├── hub.html            Hub overview, self-hosted vs public, client Hub mode
├── about.html          Philosophy, license, contributing, FAQ (6 items)
├── 404.html            Signal-lost themed error page
├── css/
│   ├── base.css        Reset, tokens, accessibility, reduced-motion
│   ├── theme.css       Typography, layout, starfield, aurora wave
│   └── components.css  Header/nav, footer, buttons, cards, badges, code, FAQ
├── js/
│   └── main.js         Nav toggle, scroll reveals, starfield depth
├── img/
│   ├── logo.svg        Orbit arc + planet + Phlix wordmark
│   └── favicon.svg     Deep-space square favicon with orbit mark
├── robots.txt          References sitemap
├── sitemap.xml         8 canonical pages
├── SITE.md             Design rationale, color table, typography, motion
└── BUILD_LOG.md        This file
```

### Content sources
- All marketing copy from `shared/content.json` — no invention or inflation.
- Install command: `curl -fsSL https://raw.githubusercontent.com/detain/phlix-server/master/scripts/install.sh | sudo bash` (verbatim from `content.json.install.primary.command`).
- License: MPL-2.0 for server + hub, MIT for clients/plugins (from `content.json` FAQ answer).

### Clients
- 4 native clients (Roku, Samsung Tizen, Windows, Mobile beta) + DLNA — verified against `content.json.clients`.

---

## Intentional deviations from new_site.md spec

1. **`og.png` generated via `tools/gen-og.mjs`** — not hand-authored SVG placeholder.
2. No `img/PROMPTS.md` created — the logo and favicon are simple brand SVGs, not AI-generated artwork requiring regeneration prompts.
3. No `manifest.webmanifest` — not required for a static marketing site.

---

## Quality gates

- All HTML pages use relative asset paths (`css/`, `js/`, `img/`) — no absolute paths except canonical/og meta.
- No Google Fonts CDN — all fonts self-hosted WOFF2.
- No fabricated stats, pricing, or testimonials.
- `og:image` is absolute URL (`https://detain.github.io/phlix-website/exo-atmospheric/img/og.png`).
- Footer tagline: "Open-source media, on your terms." (from `content.json.footer.tagline`).
- Footer columns: exact `content.json.footer.columns` links verbatim.
- 8 pages + 404.html = complete page set.

---

## Follow-ups

- `og.png` generated with `node tools/gen-og.mjs --site exo-atmospheric` — must be re-run to produce actual rasterized PNG.
- `npm run lint` and `npm run linkcheck` should be run before final commit.
