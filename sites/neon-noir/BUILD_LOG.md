# BUILD_LOG.md — Neon Noir Site Build

**Regenerated:** 2026-07-28
**Archetype:** narrative-scroll
**Kit slug:** neon-noir

## What was built

### Pages (9 HTML + 404)

| Page            | Template         | Notes                                                                     |
| --------------- | ---------------- | ------------------------------------------------------------------------- |
| `index.html`    | narrative-scroll | 5 sections: opener, case-brief, lead-cases, trust-play, closing-act       |
| `features.html` | evidence-board   | All 8 features as evidence cards with monospace serial numbers            |
| `clients.html`  | network-map      | Hub diagram + 5 client cards (no Lux mascot per kit spec)                 |
| `download.html` | interrogation    | Install snippet as security-clearance token, ecosystem as toolkit dossier |
| `hub.html`      | relay-diagram    | Hub relay diagram + 3 feature cards (no Lux mascot per kit spec)          |
| `about.html`    | case-closed      | 3 chapters + FAQ as interrogation transcript with Lux answers             |
| `plugins.html`  | plugin-contract  | LifecycleInterface overview + reference link                              |
| `docs.html`     | link-out         | 6 doc section cards linking to VitePress                                  |
| `404.html`      | dead-end-alley   | Burnt-out neon X, dim Lux, FILE NOT FOUND, recovery links                 |

### CSS (3 files)

- `css/base.css` — Reset, CSS design tokens, @font-face declarations for all 10 font-face rules (Playfair Display 700/900, Bebas Neue 400, IBM Plex Serif 400/500, IBM Plex Sans 400/500/600, IBM Plex Mono 400/600), `<strong>` emphasis rule (IBM Plex Serif 500 + cyan ink)
- `css/theme.css` — Typography scale, site header/topbar with neon-cyan nav links, hero section with neon-flicker animation, section dividers, footer with intensity toggle, scroll reveal classes
- `css/components.css` — All UI components: buttons (primary/secondary/ghost/danger/fab/icon), cards (default/featured/evidence/node), badges, feature cards, FAQ accordion, install block with copy button, trust band, mascot Lux, easter egg effects, hub diagram, CTA banner, repo card, client card, form elements, 404 error page

### JS (1 file)

- `js/main.js` — Nav toggle, active nav highlighting, FAQ accordion, install copy button, seasonal activation (3 date-gated variants with palette overrides), intensity toggle with localStorage, mascot Lux (bottom-right, page whitelist, tips by page, hover-hold easter, dismiss with localStorage), logo-clicks easter egg (5 clicks → fedora tip + neon pulse + "NOIR" text), typed-word "shadow" easter egg (venetian-blind sweep + Lux glances up), scroll reveal via IntersectionObserver, persona vignette reveals

### Meta

- 9 unique `meta description` values across 9 pages
- `og:image` absolute URL: `https://detain.github.io/phlix-website/neon-noir/img/og.png`
- `og:url` absolute canonical URL for each page
- `twitter:card: summary_large_image` on all pages
- `theme-color: #0A0C10` on all pages

### Nav Labels

All 6 from kit: The Case, Evidence Files, The Network, Get Access, Reach Anywhere, Closed Cases. Emphasis levels: default, primary, primary, primary, default, muted — all visually distinguishable.

### 404 Requirements

- `<meta name="robots" content="noindex">` ✓
- Realised as dead-end alley content (not field printed verbatim) ✓
- All asset paths relative ✓
- All `recovery_links` entries: home, features, download ✓

## Deviations / Notes

- **`<strong>` ink color**: Used `#00E5FF` (12.72:1 on bg) per measured contrast table rather than default text color
- **`@font-face` weights**: Did NOT vendor `ibm-plex-serif-700` or `ibm-plex-sans-700` or `ibm-plex-mono-700` — only the declared weights per kit spec (and confirmed in brief's font pool)
- **Intensity toggle**: Implemented as "Case closed" in footer utility row per `intensity_toggle.label`, sets localStorage key `phlix-intensity`
- **Mascot on Clients and Hub**: Excluded per `mascot.behavior.placement` spec ("never on Clients or Hub")
- **Seasonal activation**: Date-gated in JS, Blood Moon October applies surface override `#170810` to `--color-surface` when active (Dec/Oct/Valentine's variants defined but triggered by real system date)
- **`typed-word` easter egg**: Disabled while focus in `input`/`textarea`/`contenteditable`; does not call `preventDefault`; exits on Esc — compliant per §19.8

## Verification

- `@copyright` headers present on all 3 CSS files and 1 JS file — verified via grep
- No CDN font links found — all `@font-face` point to `../../assets/fonts/...`
- No `stylelint --fix` run — all CSS written by hand
- All 6 nav labels from kit (not from predecessor)
- Install command from `content.json.primary.command` verbatim: `curl -fsSL https://raw.githubusercontent.com/detain/phlix-server/master/scripts/install.sh | sudo bash`

## Tool Output

```
node tools/gen-og.mjs --site neon-noir        → img/og.png (PNG, 1200×630)
node tools/gen-sitemap.mjs --site neon-noir  → sitemap.xml + robots.txt
node tools/selfcheck.mjs --site neon-noir     → 1/1 site(s) pass
node tools/render-check.mjs --site neon-noir → PASS
```
