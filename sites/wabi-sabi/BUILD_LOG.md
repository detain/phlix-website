# BUILD_LOG.md — wabi-sabi

## Build
- **Date:** 2026-07-28
- **Builder:** coder agent
- **Archetype:** editorial

## Files written

### CSS (3)
- `css/base.css` — reset, typography, layout primitives, a11y, overflow-wrap, animations
- `css/theme.css` — surfaces, hero, sections, feature cards, client rows, proof band, FAQ, CTA, download chapter, install block, seasonal motifs
- `css/components.css` — buttons (primary/secondary/danger/ghost/fab), cards, badges, form elements, tables, kintsugi divider, footer, mascot, easter brushstroke, haiku cards, 404, utilities

### JS (1)
- `js/main.js` — nav active state, scroll reveals (IntersectionObserver), mascot (Tsugi tips, click:5, hover-hold:2s, dismiss via localStorage), scroll-past-footer easter egg (Esc to exit, disabled while typing), seasonal activation (3 ranges)

### HTML (9)
- `index.html` — 5 narrative sections: kintsugi-crack hero, the-craft features, why-imperfection story, proof-of-presence band, receive-the-gift CTA
- `features.html` — gallery-plaques, all 8 features
- `clients.html` — spec-table, 5 clients + 5 ecosystem repos (bookshelf)
- `download.html` — chapter-scroll, server + vessels, verbatim install command from content.json
- `hub.html` — Hub explained, 4 key points
- `plugins.html` — plugin system, LifecycleInterface, phlix-plugin-example link
- `docs.html` — 4 doc links
- `about.html` — 3 chapters (philosophy, license, contributing) + FAQ (8 items, letters-column)
- `404.html` — Tsugi on empty shelf, "This page settled elsewhere.", 3 recovery links, `noindex`, relative paths only

### Config
- `robots.txt` — generated via `tools/gen-sitemap.mjs`
- `sitemap.xml` — generated via `tools/gen-sitemap.mjs`
- `manifest.webmanifest` — retained from previous build
- `REGEN_PLAN.md` — this build plan
- `SITE.md` — design decisions and contrast table

## Kit fields implemented (18 declared)
`site_architecture`, `homepage_narrative`, `page_blueprints`, `copy_overlay`, `feature_casting`, `copy_treatments`, `faq_experience`, `hero_experience`, `navigation_model`, `scroll_experience`, `easter_eggs`, `conversion_funnel`, `proof_strategy`, `experience_archetype`, `complexity_profile`, `seasonal_activation`, `error_page_experience`, `persona_vignettes`

## Kit fields absent (2, defaulted)
`visitor_paths`, `intensity_toggle`

## Mascot
Tsugi — inline SVG raku bowl with kintsugi crack lines; placed on index.html, download.html, about.html

## Avoid-words compliance
Checked: no `exciting`, `amazing`, `awesome`, `powerful`, `robust`, `synergy`, `leverage`, `utilize`, `dynamic`, `crushing it`, `epic`, `stunning`, `pop`, `binge`, `content` in authored prose.

## CSS @copyright header
Present on all 3 CSS files and js/main.js as first comment block.

## Verification
- `selfcheck.mjs`: 17 static checks
- `render-check.mjs`: 320px, 375px, 768px, 1280px + 200% text zoom per page
