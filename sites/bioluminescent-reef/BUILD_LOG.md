# BUILD_LOG.md — Bioluminescent Reef

## What was built

Full brand-kit site for `bioluminescent-reef` in `sites/bioluminescent-reef/`.

## Pages (9 HTML files)

| Page | Route | Notes |
|---|---|---|
| Home | `/` | 5 sections: the-descent, the-creatures, why-phlix, good-seats, dive-deeper |
| Features | `/features.html` | All 8 features from content.json |
| Clients | `/clients.html` | 5 clients from content.json |
| Download | `/download.html` | Install commands from content.json install block |
| Plugins | `/plugins.html` | Ecosystem repos from content.json |
| Docs | `/docs.html` | Nocturnal Library — docs links from content.json |
| Hub | `/hub.html` | Hub feature + ecosystem repos |
| About | `/about.html` | About + FAQ (6 items from content.json) |
| 404 | `/404.html` | Themed error page with recovery links (home, features, download) |

## CSS files (3)

- `css/base.css` — Reset, design tokens, element defaults, @font-face (9 self-hosted WOFF2)
- `css/theme.css` — Typography scale, hero, creatures, why-phlix, good-seats, dive-deeper, features, clients, download, FAQ, seasonal, animations
- `css/components.css` — Header/nav (6 kit labels), footer (3-column), buttons (primary/secondary/amber/ghost/danger/fab), mascot (Abyss jellyfish), easter egg notification, intensity toggle, forms, repo cards, CTA rows

## JS files

- `js/main.js` — Nav toggle, scroll reveals, reduced-motion (transition + animation off), intensity toggle, seasonal activation (live-js, 3 variants), Abyss mascot (bottom-right, tips, dismiss to localStorage, hover-hold + logo-clicks easter eggs), typed-word easter egg (abyss), egg notification

## Experience fields implemented

| Field | Implementation |
|---|---|
| `site_architecture.nav` | 6 labels: Descent, The Creatures, Portals, Dive Gear, The Relay, Pressure Log — 3 emphasis levels |
| `homepage_narrative.sections` | 5 sections in order: the-descent, the-creatures, why-phlix, good-seats, dive-deeper |
| `feature_casting` | 2 leads (SyncPlay + Library) + 4 support on home; all 8 on features.html |
| `copy_overlay` | Hero headline: "In the Dark, Life Finds a Way." with themed subheadline |
| `proof_strategy` | Placard grid (clients, syncplay, streaming, access, live-tv) + verbatim pitch_bullets[0] quote |
| `conversion_funnel` | 3-rung ladder (Begin the Descent → Choose Your Portal → Run the Server) |
| `easter_eggs` | logo-clicks:5 (Abyss spiral) + typed-word:abyss (egg note) |
| `mascot.behavior` | Abyss jellyfish, bottom-right, tips per section, hover-hold interaction, dismiss to localStorage |
| `intensity_toggle` | Calm mode toggle in footer — disables all animation + transition durations |
| `seasonal_activation` | live-js, 3 variants (New Year's, Halloween, Valentine's) — CSS custom property overrides |
| `error_page_experience` | 404.html with themed concept ("The darkness is complete"), noindex, recovery links (home, features, download), relative asset paths |
| `faq_experience` | 6-item FAQ on about.html using `<details>` disclosure |
| `mascot.behavior.placement` | Bottom-right on home, features, download — hidden below 768px mobile |

## Fonts (9 self-hosted WOFF2, from kit pool)

Cormorant Garamond 600, 700 · Inter 400, 500, 600 · JetBrains Mono 400, 500 · Raleway 100, 200

## Notes / deviations

- `secondary` (#7700ff) fails small-text contrast (3.05:1 < 4.5:1) — used for large/UI text only; decorative elements
- `error` (#cc1a4a) fails small-text contrast (3.60:1 < 4.5:1) — used for button labels only
- install.from_source labelled "not an install" per §19.22 — it is a dev checkout, not an install
- Abyss mascot hidden on mobile (<768px) — per §19.14 (companion boundary)
- Seasonal activation only applies CSS custom property overrides; no seasonal motif assets generated
- img/PROMPTS.md kept as-is

## Verification

```
node tools/gen-og.mjs --site bioluminescent-reef   ✓ wrote 1 og.png
node tools/gen-sitemap.mjs --site bioluminescent-reef  ✓ wrote sitemap.xml + robots.txt
```
