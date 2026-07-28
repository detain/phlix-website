# BUILD_LOG.md — Prairie Bloom

## What was built

Full regeneration of the Prairie Bloom brand-kit site per `regen_site_prompt.md` and `new_site.md` rules.

### Pages (10 total)
- `index.html` — narrative-scroll homepage: 5 sections (porch-welcome hero, why-gather pitch, signature-moments feature showcase, good-neighbors proof band, join-the-harvest CTA)
- `features.html` — seed-packet wall layout: 8 feature-detail articles
- `clients.html` — device family scene: 5 client cards (Roku, Tizen, Windows, Mobile, DLNA)
- `download.html` — farmer-setup: install one-liner + client cards + ecosystem list
- `plugins.html` — plugin model + write-your-own + example link
- `docs.html` — link-out to 4 VitePress doc sections + ecosystem list
- `hub.html` — what the Hub does, self-hosted vs. public, client support
- `about.html` — philosophy + license (MPL-2.0/MIT split) + contributing + FAQ
- `gathering-guide.html` — extra_page: 5-step family movie night walkthrough
- `404.html` — "Lost in the Meadow" with confused Sunny SVG

### CSS (3 files)
- `css/base.css` — reset, design tokens, @font-face (self-hosted WOFF2), base elements
- `css/theme.css` — typography, page structure, all component layouts
- `css/components.css` — buttons, nav, mascot companion, badges, seasonal, Easter eggs

### JS
- `js/main.js` — mobile nav toggle, reduced motion guard, scroll reveals, pollen particles, mascot companion (5 tips, dismissal to localStorage), logo click Easter egg (3× → celebration), typed-word Easter egg ("sunflower" → golden tint), seasonal activation (live-js date gate), code block copy button

### Assets
- `img/logo.svg` — folk-art sunflower + Prairie Bloom wordmark
- `img/sunny.svg` — Sunny the sunflower mascot (straw hat, wildflower basket)
- `img/og.svg` — OG card source (meadow scene, sunflower cluster, tagline)
- `robots.txt` — allow all, sitemap reference
- `sitemap.xml` — all 10 pages (canonical + extra_page; 404 excluded)

## Intentional deviations from new_site.md generic spec

- Homepage uses 5-section narrative-scroll structure per `homepage_narrative.sections[]` (not the generic 4-section)
- Nav is 6 links (Plugins + Docs demoted to footer) per kit `site_architecture.demoted_pages`
- Prairie Bloom folk-art color system (not the generic blue/teal)
- Prairie Bloom typography: Zilla Slab / Playfair Display / Lora / Nunito (not the default sans stack)
- Seed-packet one-sheets for feature casting heroes (not generic cards)
- County-fair / farmer-setup copy framing throughout
- Extra page `gathering-guide.html` included per `extra_pages`

## Kit fields implemented

All 19 declared experience fields: site_architecture, homepage_narrative, page_blueprints, copy_overlay, feature_casting, copy_treatments, faq_experience, hero_experience (diorama-parallax fallback), navigation_model (topbar), scroll_experience (chaptered), easter_eggs, conversion_funnel, proof_strategy, visitor_paths, experience_archetype (narrative-scroll), complexity_profile, seasonal_activation (live-js), error_page_experience (Lost in the Meadow), persona_vignettes (3).

## Kit fields NOT implemented (absent)

- `intensity_toggle` — null in kit, not built (§19.9: absence is never a defect)

## Verification

Run: `node tools/selfcheck.mjs --site prairie-bloom` and `node tools/render-check.mjs --site prairie-bloom`
