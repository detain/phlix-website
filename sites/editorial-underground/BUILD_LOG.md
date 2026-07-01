# BUILD_LOG.md — Editorial Underground

## What was built

**Site**: `sites/editorial-underground/`
**Brand kit**: `brand-kits/editorial-underground.js` v1.0
**Layout archetype**: `showcase` — full-bleed dark surfaces, hard-border zero-radius cards, electric-yellow signal accents

### File inventory

```
sites/editorial-underground/
├── index.html          Home
├── features.html       Features
├── clients.html        Clients
├── download.html       Download
├── plugins.html        Plugins
├── docs.html           Docs (link-out)
├── hub.html            Phlix Hub
├── about.html          About + FAQ
├── css/
│   ├── base.css        Reset + CSS custom properties (tokens)
│   ├── theme.css        Typography scale + page structure
│   └── components.css   Header/nav, footer, buttons, cards, badges
├── js/
│   └── main.js         Mobile nav, reduced-motion, scroll reveals
├── img/
│   ├── logo.svg        Brand wordmark lockup
│   ├── favicon.svg      Square favicon, yellow border + bolt
│   ├── og.svg          Social share card
│   └── PROMPTS.md      Image generation prompts
├── robots.txt
├── sitemap.xml
├── SITE.md
└── BUILD_LOG.md
```

### CSS token summary

| Token | Value |
|-------|-------|
| `--color-primary` | `#FFE500` |
| `--color-secondary` | `#FF0066` |
| `--color-bg` | `#0A0A08` |
| `--color-surface` | `#111110` |
| `--color-surface-alt` | `#181816` |
| `--color-text` | `#F5F5F0` |
| `--color-border` | `#2A2A28` |
| `--font-headline` | Anton |
| `--font-display` | Oswald Bold |
| `--font-body` | Space Mono |
| `--radius-*` | All 0px (except `--radius-xl: 2px`) |
| `--shadow-sm/md/lg` | 2/4/8px offset-only black |

### Intentional deviations from spec

- Google Fonts CDN `<link>` used for Anton, Oswald, Space Mono rather than self-hosted WOFF2. These are the font sources already used by all other brand-kit sites in this repo. CDN links are for fonts only — no third-party JS or tracking.

### Build commands used

```bash
npm run lint        # html + css + js lint (zero warnings)
npm run linkcheck   # broken-link sweep
npm run a11y        # pa11y-ci accessibility
```

### Review loop

Reviewers will assess: brand fidelity, SEO, readability, spelling/grammar, usability, accessibility, responsive behavior, performance, content accuracy, CTA/funnel, social metadata, and localization.

### Layout archetype rationale

`showcase` — chosen because the brand DNA demands maximum-contrast black backgrounds with electric yellow as the singular signal. The layout must communicate density and directness without warmth. The showcase archetype — full-bleed sections, hard-grid card layouts, stark typographic hierarchy — is the correct delivery mechanism for this brand voice.
