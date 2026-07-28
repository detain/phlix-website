# Pop Art Explosion — Site Summary

## Kit

- **slug**: pop-art-explosion
- **archetype**: immersive
- **experience**: 20 declared fields implemented

## Pages (9 total)

| Page     | Route                              | Purpose                                               |
| -------- | ---------------------------------- | ----------------------------------------------------- |
| Home     | `/pop-art-explosion/`              | Hero + Dotty intro + Feature grid + Proof stats + CTA |
| Features | `/pop-art-explosion/features.html` | 6 comic-panel feature cards                           |
| Clients  | `/pop-art-explosion/clients.html`  | 5 client device cards                                 |
| Download | `/pop-art-explosion/download.html` | Install one-liner + ecosystem repos                   |
| Hub      | `/pop-art-explosion/hub.html`      | Hub feature showcase                                  |
| About    | `/pop-art-explosion/about.html`    | Brand story + FAQ accordion                           |
| Plugins  | `/pop-art-explosion/plugins.html`  | Plugin contract + example                             |
| Docs     | `/pop-art-explosion/docs.html`     | Doc links + quick reference                           |
| 404      | `/pop-art-explosion/404.html`      | Dotty apologizes in speech bubble                     |

## Navigation

6 items in primary nav: KAPOW!, The Panel Grid, Every Screen, BAM! Install, The Scene, Dotty Digs In
Demoted to footer: plugins, docs

## Fonts (self-hosted, from shared pool)

- Bangers 400 (headline)
- Anton 400 (display, number)
- Barlow Condensed 400/600 (body)
- Barlow 600/700 (ui)
- Share Tech Mono 400 (mono)

## Accessibility

- WCAG AA contrast ratios verified against measured table
- `font-weight: 600` for `<strong>` (Barlow Condensed 600 declared)
- Yellow (#FFE600) only used on dark backgrounds or as accent fill, never for small text on white
- Skip link, aria-labels, aria-expanded on accordion, visually-hidden utility

## Seasonal variants (live-js)

- Summer (06-21..09-21): `--color-secondary: #FF6B00`
- Winter (12-01..01-06): `--color-primary: #0028DC` + `--color-secondary: #FFE600`

## Easter eggs

- `logo-clicks:5` — confetti burst
- `typed-word:dots` — dot burst
- `typed-word:kapow` — KAPOW! text explosion

## Mascot

Dotty — bottom-right fixed companion on desktop, in-flow on mobile. Contextual tips by page/section. Dismiss persists via localStorage.

## Install command

From `content.json.install.primary` (the single source of truth):

```
curl -fsSL https://raw.githubusercontent.com/detain/phlix-server/master/scripts/install.sh | sudo bash
```

## Licence

Phlix Server and the Hub: **MPL-2.0**. Shared libraries, plugins, clients: **MIT**.
