# BUILD_LOG.md — Día de Muertos site build

## What was built

Full static brand-kit site at `sites/dia-de-muertos/` for Phlix media server,
styled in the Día de Muertos (Mexican Day of the Dead) folk-art identity.

**Archetype:** `narrative-scroll`
**Site structure:** 9 pages (8 + 404)

### Pages
- `index.html` — Home (5-section narrative arc)
- `features.html` — All 8 features on altar-shelves template
- `clients.html` — 5 client paths as honored guests
- `download.html` — 3-step ritual (Prepare / Choose / Open)
- `plugins.html` — Plugin model + phlix-plugin-example link
- `docs.html` — Link-out to 4 VitePress doc areas + ecosystem list
- `hub.html` — Hub as reverse-tunnel relay + self-host options
- `about.html` — Philosophy + License + Contributing + FAQ
- `404.html` — "This path has faded" Catrina-in-cemetery scene

### CSS (3 files)
- `css/base.css` — Reset, tokens, :root variables, :focus-visible, skip-link,
  reduced-motion, overflow-wrap rules
- `css/theme.css` — Typography scale, containers, hero, pitch, features,
  proof-band, cta-banner, page-header, visitor paths, jargon translate,
  scroll reveals, marigold-petal keyframes
- `css/components.css` — Header, nav, footer, buttons, plates, feature cards,
  client cards, download cards, ecosystem list, FAQ list, badges, Catrina
  mascot, intensity toggle, 404 page, form elements

### JavaScript
- `js/main.js` — Nav toggle, reduced-motion (re-read on change), scroll reveals,
  intensity toggle (kills transitions AND animations), Catrina mascot (tips,
  dismiss, easter interactions), easter eggs (click:7 logo dance, typed-word:marigold
  petal shower, time-of-day:20-23 midnight note), seasonal date gate

### Other files
- `robots.txt` — References sitemap
- `sitemap.xml` — All 8 canonical pages
- `SITE.md` — Design rationale
- `REGEN_PLAN.md` — Field mapping table

## Deviations & notes

- `seasonal_activation.motif_assets` (img/seasonal/*.svg) not shipped — no
  seasonal motif assets exist in img/ and the brief says to note this in
  BUILD_LOG.md and move on.
- Kit requests `footer_arrangement: mirror-nav` which has been honored — the
  mirror nav row appears above the 3-column footer nav.
- `intensity_toggle` placement is footer utility row, per kit spec.
- Kit's `copy_overlay.secondary_cta.label` "Walk the Marigold Path" links to
  docs href. Made honest: "Walk the Marigold Path (the docs)" per WCAG 2.5.3.
- Install command copied verbatim from `shared/content.json → install.primary`.
  `from_source` labelled "not an install" per brief.
- All 9 pages have **different** `<meta name="description">` values per §19.4.
- `<strong>` uses Lora 500 (kit caps body at [400,500]) PLUS `#FFB800` color
  as second channel per §19.17.
- `mascot.behavior.easter_interactions[0]` (click:5) implemented for both the
  orb click and logo click:7 (shared trigger count is allowed per §19.8).

## Verification

Run:
```
node tools/selfcheck.mjs --site dia-de-muertos
node tools/render-check.mjs --site dia-de-muertos
```
