# BUILD_LOG — Wilderness Trail Regeneration

## What was built

### Pages (10)
- `index.html` — Trailhead hero (Scout illustration, parallax CSS), 5 narrative sections, CTA ladder, install command
- `features.html` — Waypoints page, trail-map layout with 8 feature cards
- `clients.html` — Outposts page, outpost-network grid with 5 clients
- `download.html` — Set Camp / ranger-station frame, 3-step guide, install command, Hub relay options, ecosystem shelf
- `hub.html` — Relay Station page, Hub relay explainer, use cases
- `about.html` — Field Notes / expedition-log, 3 chapters, FAQ with Scout persona (6 questions)
- `plugins.html` — Plugin system, LifecycleInterface, manifest schema example
- `docs.html` — Documentation hub, links to all docs sections
- `expedition-guide.html` — First-time walkthrough, 6 waypoints
- `404.html` — Scout at wrong trail sign, 3 recovery links, noindex

### Assets
- `css/base.css` — Font-face declarations (self-hosted), design tokens (color, spacing, radius, shadow, typography), reset, focus, selection, scrollbar, visually-hidden, skip-link
- `css/theme.css` — Layout (header, footer, nav, container), hero, page-hero, topo texture, seasonal variants (data-season), intensity toggle (data-intensity)
- `css/components.css` — All UI: buttons, cards, badges, forms, feature/waypoint cards, outpost/client cards, blaze list, FAQ accordion, proof placard, install block, CTA ladder, mascot, animations, icons, topo wash, supply shelf, expedition log
- `js/main.js` — Nav toggle, reduced-motion listener, scroll reveal, intensity toggle (localStorage), seasonal banner (JS date-based), mascot (Scout fixed bottom-right, tips, dismiss to localStorage), easter egg: logo-clicks:5 (Scout tips hat), easter egg: typed-word:summit (body summit-mode), FAQ accordion, copy button, smooth scroll, visitor path selector
- `robots.txt`
- `sitemap.xml`
- `manifest.webmanifest`
- `img/logo.svg` — SVG wordmark + pine mountain silhouette
- `img/favicon.svg` — SVG favicon

### Meta descriptions (9 unique)
1. index: "Find Your Trail. Press play and step into your library like a wilderness waiting to be explored."
2. features: "Every blaze on the trail marks a waypoint worth stopping at. Library, SyncPlay, Transcoding..."
3. clients: "Five outposts on the trail: Roku, Samsung Tizen, Windows, Mobile (beta), and any DLNA device."
4. download: "Three steps to camp: install the server, choose your outpost, set up your relay."
5. hub: "Phlix Hub relay connects you to your server from anywhere, through any network."
6. about: "The philosophy, licence, and story behind Phlix. Open-source, self-hosted, MPL-2.0."
7. plugins: "Phlix Plugin System: a versioned manifest contract, LifecycleInterface, and a reference plugin."
8. docs: "Phlix documentation: installation guides, configuration reference, API docs, plugin development."
9. expedition-guide: "A grounded walkthrough that turns Phlix facts into a first-time setup guide."
10. 404: "This route went cold — or never existed. The trail continues at the trailhead."

## Kit Fields Implemented (20 declared)
All 20 declared experience fields implemented: site_architecture, homepage_narrative, page_blueprints, copy_overlay, feature_casting, copy_treatments, faq_experience, hero_experience, navigation_model, scroll_experience, easter_eggs (2), conversion_funnel (3-rung ladder), proof_strategy, visitor_paths, experience_archetype, complexity_profile, intensity_toggle, seasonal_activation, error_page_experience, persona_vignettes, mascot.behavior (Scout), mascot.easter_interactions (2)

## Contrast Fixes Applied
- Campfire orange CTA: `#D4581A` → `#a14314` (safe for small text on canvas-tan, 4.73:1)
- Secondary on canvas-tan small text: `#3A7CA5` → `#2f6486` (3.27:1 → 5.37:1)
- FAB text on orange: `#F0E6CE` → `#625e54` (1.12:1 → 5.38:1)
- Muted text on canvas-tan small: `#7A5C3A` → `#785a39` (4.41:1 → 4.67:1)
- `<strong>`: `font-weight: 600` (Lora 600, declared; 700 not used per kit cap)

## Escalations
- `barlow-condensed-800` and `barlow-condensed-900` exist in font pool but NOT declared for this kit's `ui` role (declared: 400,600,700). Declined to vendor.
- `lora-500` and `lora-700` exist in font pool but NOT declared for Lora body role (declared: 400,600). Declined to vendor 700 for strong; used 600 per §19.17.

## Verification
- selfcheck: TBD
- render-check: TBD
