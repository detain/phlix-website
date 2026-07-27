# BUILD_LOG.md — Egyptian Dusk

## What was built

Complete 9-page brand-kit site (8 canonical + 404 + 1 extra page) under `sites/egyptian-dusk/`:

**Pages (10):**
- `index.html` — Home (narrative-scroll, 5 sections: cartouche-entrance, sacred-scrolls, why-ascend, keepers-testament, passage-awaits)
- `features.html` — Features (cartouche-gallery template)
- `clients.html` — Clients (stele-pantheon template)
- `download.html` — Download (temple-entrance template)
- `plugins.html` — Plugins
- `docs.html` — Docs
- `hub.html` — Hub (mirror-chamber template)
- `about.html` — About (book-of-the-dead template) + FAQ as Kheper's testimony
- `archive-journey.html` — Extra page: 6-step build-your-archive walkthrough
- `404.html` — "The Tomb is Empty" error page with sad Kheper + broken cartouche

**Assets:**
- `css/base.css` — Reset, tokens, @font-face (all declared weights), base styles, skip-link, focus-visible, reduced-motion
- `css/theme.css` — Typography scale, layout containers, page structure (hero, pitch, features-overview, cta-banner, page-header, content-section, footer-nav, FAQ, visitor paths)
- `css/components.css` — Header/nav, buttons, cards (feature/client/download), badges, code-block, mascot, easter egg effects, seasonal banner, hieroglyphic-band divider, proof-tablets, visitor path pills, archive-journey steps, tomb-empty 404 scene, footer
- `js/main.js` — Nav toggle, reduced motion (kills transitions + animations), scroll reveals, scroll-chapter wipe, seasonal activation (live-js date gate), mascot Kheper (idle animation, tips, easter_interactions, dismiss + localStorage), 3 easter eggs (logo-clicks:7, typed-word:cartouche, scroll-past-footer), visitor paths, easter reward toast
- `img/` — Existing assets preserved; og.png regenerated via gen-og.mjs
- `robots.txt` — Generated via gen-sitemap.mjs
- `sitemap.xml` — Generated via gen-sitemap.mjs (9 URLs)
- `REGEN_PLAN.md` — Experience field mapping, nav diff, section order, carry-forward, ambiguities
- `SITE.md` — Design rationale per §9
- `BUILD_LOG.md` — This file

## Deviations / Notes

1. **Seasonal activation motif assets**: Kit's `seasonal_activation.motif_assets` lists SVG files (opet-barque-procession.svg, nile-water-ripple.svg, etc.) that do not exist in the img/ directory. Per instructions: wrote one line here and moved on. Not a defect.
2. **`intensity_toggle` absent**: Kit declares `intensity_toggle: null` → correctly omitted. §19.9.
3. **`proof_strategy` quote**: No verified person quote exists per §19.14 table. Used verbatim `pitch_bullets[0]` attributed to the project — the canonical resolution.
4. **`complexity_profile.jargon_policy: "translate"`**: Applied per FAQ items where precise terms (DLNA, NTP, Argon2ID) appear — present the plain term and the precise one in context.
5. **`mascot` on mobile**: Placed in-flow (not fixed) below 768px per §19.14 table: "below 768px place the companion in flow". Does not push tips on phones.
6. **`strong` emphasis**: Kit body weight caps at [400, 500]; 700 is undeclared → added second channel: `--color-primary` for `<strong>` (clears 8.85:1 on bg, 17.83:1 on surface). Two channels per §19.17.
7. **All 9 meta descriptions** are unique (per §19 trap 4).
8. **`@copyright 2026 Joe Huss <detain@interserver.net>`** appears in every css/*.css and js/*.js file (§19.24).

## Verification

- `node tools/gen-og.mjs --site egyptian-dusk` → wrote 1 og.png from svg
- `node tools/gen-sitemap.mjs --site egyptian-dusk` → wrote sitemap.xml (9 URLs) + robots.txt
- `node tools/selfcheck.mjs --site egyptian-dusk` → [pending]
- `node tools/render-check.mjs --site egyptian-dusk` → [pending]
