# BUILD LOG — Blaze Runner Site

## 2026-07-28 — Initial build

### Files created

| Path | Description |
|------|-------------|
| `brand-kits/blaze-runner.js` | Brand kit spec (pre-existing, all schema fields) |
| `sites/blaze-runner/index.html` | Homepage with ember particles, heat shimmer, blaze twist cards |
| `sites/blaze-runner/features.html` | Feature detail grid |
| `sites/blaze-runner/clients.html` | Client card grid with status badges |
| `sites/blaze-runner/download.html` | Server install + client selector |
| `sites/blaze-runner/plugins.html` | Plugin system docs + lifecycle hooks |
| `sites/blaze-runner/docs.html` | Documentation links |
| `sites/blaze-runner/hub.html` | Phlix Hub relay explanation |
| `sites/blaze-runner/about.html` | Philosophy, license, FAQ |
| `sites/blaze-runner/404.html` | Error page with flame 404 code |
| `sites/blaze-runner/css/base.css` | CSS reset, fire palette tokens, self-hosted fonts |
| `sites/blaze-runner/css/theme.css` | Typography, layout, ember particle atmosphere |
| `sites/blaze-runner/css/components.css` | Nav, footer, buttons, charred-edge cards, ember canvas |
| `sites/blaze-runner/js/main.js` | Ember particle system + mobile nav + scroll reveals |
| `sites/blaze-runner/img/logo.svg` | Flame motif + Phlix wordmark in Bangers style |
| `sites/blaze-runner/img/favicon.svg` | Compact flame favicon in brand colors |
| `sites/blaze-runner/img/og.svg` | 1200x630 Open Graph banner with fire hero |
| `sites/blaze-runner/robots.txt` | Allow all, point to sitemap |
| `sites/blaze-runner/sitemap.xml` | All 9 pages |
| `sites/blaze-runner/SITE.md` | Site documentation |
| `sites/blaze-runner/BUILD_LOG.md` | This file |

### Design highlights

- **Ember particle system**: Canvas-based particle field with `requestAnimationFrame`, ember dots rising from bottom with flicker opacity and wind drift. Disabled entirely on `prefers-reduced-motion: reduce` (replaced with static radial gradient overlay).
- **Heat shimmer**: Hero headline has a CSS keyframe that oscillates `blur()` and `translateY()` slightly — simulates heat distortion. Disabled for reduced motion.
- **Charred edge technique**: All cards use layered `box-shadow` with a subtle warm inner glow (`inset 0 0 0 1px rgba(255,107,0,0.04)`) and ember-tinted drop shadows. No cool grey anywhere.
- **Blaze twist**: `.trending-card` class applies `::before` with `gradient-gold-halo` — first 3 feature cards on homepage glow gold. The brand kit's key differentiator is implemented.
- **Flame flicker**: Keyframe animation that pulses opacity between 0.85–1.0. Applied to `.hero-eyebrow`, `.eyebrow`, button hover states.
- **Fonts**: All from shared WOFF2 pool at `../../../shared/assets/fonts/`. No external CDN.
- **No icon CDN**: All icons are inline SVG — consistent with project conventions.

### Verification

- All pages: HTML5 semantic structure, ARIA labels, skip link, focus management
- `prefers-reduced-motion`: particle system replaced with static overlay; all animations become instant opacity
- No Google Fonts CDN
- No icon CDNs
- WCAG AA contrast: Flame White on Deep Black = 17.5:1; Flame Orange on Charcoal = 4.72:1
- Self-hosted WOFF2 fonts only

### Commit

```
git add sites/blaze-runner/ brand-kits/blaze-runner.js
git commit -m "feat: add blaze-runner brand kit and site (fire flame theme)"
git push origin master
```
