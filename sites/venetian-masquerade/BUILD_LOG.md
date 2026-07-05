# BUILD_LOG.md — Venetian Masquerade Site Build

**Kit:** venetian-masquerade v1.0 (base kit)
**Built by:** Phlix brand-kit build system
**Date:** 2026-07-04

---

## What was built

Full 8-page static brand-kit site at `sites/venetian-masquerade/`:

```
venetian-masquerade/
├── index.html       Home
├── features.html    Features
├── clients.html     Clients
├── download.html    Download
├── plugins.html     Plugins
├── docs.html        Docs
├── hub.html         Hub
├── about.html       About + FAQ
├── css/
│   ├── base.css         Design tokens (:root CSS variables), reset, font-face
│   ├── theme.css        Typography scale, page structure, layout archetype
│   └── components.css   Header/nav, footer, buttons, cards, badges
├── js/
│   └── main.js          Nav toggle, reduced-motion, scroll reveals
├── img/
│   ├── logo.svg         Baroque cartouche wordmark
│   ├── favicon.svg       Crimson mask silhouette
│   ├── og.svg           Full Baroque hero OG image
│   └── PROMPTS.md       Exact generation prompts for every asset
├── robots.txt
├── sitemap.xml
├── SITE.md              Design rationale and system documentation
└── BUILD_LOG.md         This file
```

---

## Layout archetype

**Immersive** — chosen because:
- `layout_patterns.landing`: "Full-bleed Baroque hero illustration → jewel-tone feature sections → testimonial rail → crimson CTA banner"
- `visual_style`: Baroque oil painting, gilded ornamental illustration
- `depth`: layered (rich fabric, filigree, architecture)
- `composition`: theatrical, stage-like, framed by drapes
- The dark midnight-canal background + gold candlelight radial glow creates a cinematic, full-bleed atmosphere inherent to immersive layouts

---

## Color mapping

All colors map from `brandKit.design_tokens.color` → `:root` CSS custom properties.

| Token | Value | Source field |
|---|---|---|
| `--color-primary` | `#8B1A1A` | `design_tokens.color.--color-primary` |
| `--color-secondary` | `#C9922E` | `design_tokens.color.--color-secondary` |
| `--color-tertiary` | `#0D7377` | `design_tokens.color.--color-tertiary` |
| `--color-bg` | `#0E0A1A` | `design_tokens.color.--color-bg` |
| `--color-surface` | `#1A1230` | `design_tokens.color.--color-surface` |
| `--color-surface-alt` | `#251840` | `design_tokens.color.--color-surface-alt` |
| `--color-text` | `#F2EDDF` | `design_tokens.color.--color-text` |
| `--color-border` | `#9A6E20` | `design_tokens.color.--color-border` |
| `--color-focus` | `#C9922E` | `design_tokens.color.--color-focus` |

Shadows use violet-undertone RGBA (5,2,8) per `shadows` spec; gold glow shadows use (201,146,46,0.35).

---

## Font strategy

`@font-face` declared in `base.css` pointing to `css/fonts/`. **Fonts are NOT yet downloaded** — the declarations are in place for a build-time font download step. The site currently falls back to Georgia/serif stack.

Expected font files (to be downloaded at build time):
- `CinzelDecorative-Regular.woff2`, `CinzelDecorative-Bold.woff2`
- `Cinzel-Regular.woff2`, `Cinzel-SemiBold.woff2`, `Cinzel-Bold.woff2`
- `EBGaramond-Regular.woff2`, `EBGaramond-Medium.woff2`, `EBGaramond-SemiBold.woff2`
- `CormorantGaramond-Regular.woff2`, `CormorantGaramond-SemiBold.woff2`, `CormorantGaramond-Bold.woff2`
- `CourierPrime-Regular.woff2`, `CourierPrime-Bold.woff2`

---

## Intentional deviations from new_site.md

1. **Fonts not self-hosted yet:** `@font-face` declarations reference `css/fonts/` which are not yet populated. This is noted above. The site degrades gracefully to Georgia serif fallbacks.

2. **No separate `css/fonts/` directory populated:** The build system (tools/build.mjs) would need a step to download Google Fonts WOFF2 files into `css/fonts/`. This build did not include that step.

3. **`og.png` not rasterized:** `img/og.svg` exists as the source; the meta tag references `og.png`. The build should convert SVG → PNG at 1200×630. Current meta points to `og.png` which does not yet exist as a raster.

4. **No seasonal variants applied:** Per spec §20, seasonal variants are documented in `SITE.md` and `theme.css` has commented-out override blocks for future use. No auto-apply.

---

## Known follow-ups

- [ ] Download and install self-hosted WOFF2 font files to `css/fonts/`
- [ ] Rasterize `img/og.svg` → `img/og.png` at 1200×630 for OG meta tag
- [ ] Run `npm run lint && npm run linkcheck && npm run a11y` to validate
- [ ] Consider adding scroll-triggered gold filigree divider animation between sections
- [ ] Run adversarial 12-dimension review loop per BUILD_PROMPT
