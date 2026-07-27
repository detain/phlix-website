# BUILD_LOG.md — Neon Blossom

## What was built

Regenerated complete brand-kit site following `neon-blossom.js` design spec and `new_site.md` rules.

### Pages (9)
- `index.html` — 6 narrative sections: garden-gate, why-bloom, features-hero, pitch-garden, proof-glow, get-in
- `features.html` — All 8 features with hero features first; `<details>` jargon translations
- `clients.html` — All 5 clients from content.json with status badges
- `download.html` — Install command, HTTPS variant, requirements, dev checkout (labelled "not an install"), ecosystem table
- `hub.html` — Hub explanation with 3-step flow
- `about.html` — License detail card + 6 FAQ items with accordion
- `plugins.html` — Plugin contract, LifecycleInterface, ideas, reference link
- `docs.html` — Link-out + summary of 6 doc areas + ecosystem links
- `404.html` — Bioluminescent garden 404, noindex, relative paths, 3 recovery links

### CSS
- `css/base.css` — Design tokens (CSS custom properties), reset, accessibility, reduced motion
- `css/theme.css` — Typography scale, layout containers, hero, cards, proof, CTA sections
- `css/components.css` — Header/nav, buttons (primary/secondary/ghost/danger/fab), cards, badges, footer, FAQ accordion, install block, ecosystem table, mascot (Lumia), reduce-motion toggle

### JS
- `js/main.js` — Nav toggle, reduced motion toggle (with localStorage persistence + media query listener), mascot Lumia (tip, click 3× spiral, hover-hold 2s tip, dismiss with localStorage persistence, restore), easter egg: logo clicks:7, easter egg: typed-word:"lumia", FAQ accordion, seasonal activation (date-gated 4 seasonal palettes), scroll reveal

### Assets
- `robots.txt`, `sitemap.xml`
- `SITE.md`, `BUILD_LOG.md`, `REGEN_PLAN.md`
- `manifest.webmanifest` (carried from existing site)

### Images (carried, not modified)
- `img/logo.svg`, `img/favicon.svg`, `img/og.svg`, `img/og.png`
- `img/icon-192.png`, `img/icon-512.png`, `img/apple-touch-icon.png`
- `img/favicon-16x16.png`, `img/favicon-32x32.png`
- `img/PROMPTS.md`

## Deviations/Notes

1. **`lato-400-latin.woff2`** — weight 400 not explicitly declared for Lato by this kit (only 300 declared), but required for body text legibility at 400. Used with brief guidance on body-weight emphasis.

2. **`font-weight: 400` for `<strong>`** — Lato caps at 400 weight (700 not declared for this kit), so emphasis uses `font-weight: 400` AND `color: var(--color-primary)` as second channel per §19.17.

3. **`secondary` color at small text** — `#9B30FF` fails 4.5:1 on `#08010f`. Kit brief provides `#a13cff` as safe substitute. Used `#a13cff` for all small-text uses of secondary.

4. **`install.from_source`** — rendered verbatim from content.json, labelled "development, not an install" per brief.

5. **`mascot.behavior`** — Lumia moth. Below 768px: in-flow above footer (not `position: fixed`), to avoid covering CTAs at 320px per §19.11.

6. **`easter_eggs`** — 2 implemented: logo-clicks:7 spiral, typed-word:"lumia" burst. Key listener disabled while focus in input/textarea/contenteditable, no `preventDefault`, exits on Esc.

7. **`seasonal_activation`** — `live-js` mode implemented with 4 date-gated palette overrides (Midnight Winter Bloom, Spring Awakening, Midsummer Firefly Festival, Autumn Dusk Garden). Each overrides CSS custom properties directly on `:root`.

8. **`@copyright` in all CSS/JS** — `base.css`, `theme.css`, `components.css`, `main.js` each have `@copyright 2026 Joe Huss <detain@interserver.net>` as last line of banner comment.

9. **`@font-face` in HTML** — Used inline `<style>` blocks in each HTML page's `<head>` for the critical font-face declarations to avoid FOIT. Full declarations also in `theme.css`.

10. **`proof_strategy`** — Uses content.json facts (MPL-2.0, MIT, 4 client platforms, 1-line install). No fabricated numbers.

11. **9 different `meta description`** — Each page has its own unique description.

12. **`overflow-wrap: anywhere`** on `p, li, dt, dd, a, span, code, kbd, samp, pre` per §19.12 to prevent overflow in narrow grid tracks at 200% zoom.
