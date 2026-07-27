# BUILD_LOG.md — Cosmic Odyssey

## What was built

Full regeneration of the Cosmic Odyssey brand-kit site per `cosmic-odyssey.js` and `kit-brief`.

### Pages (9 + required)

| Page | Notes |
|---|---|
| `index.html` | 5-section home: void-opens hero, stellar-catalog (4 hero+support features), why-launch (7 pitch bullets), past-missions (telemetry band), ignition (CTA) |
| `features.html` | All 8 features as star-catalog mission briefing cards with larger icons |
| `clients.html` | 5 fleet manifest cards with status badges and highlight chips |
| `download.html` | Mission-control layout: install block (1-line + https variant + dev checkout), client vessel cards, ecosystem support systems |
| `plugins.html` | Plugin model (LifecycleInterface + manifest), ecosystem mention, write-your-own CTA |
| `docs.html` | 4 link-out tiles (user guide, API, dev docs, hub admin) + ecosystem list |
| `hub.html` | Signal path diagram, hub explanation, self-host vs public hub, client Hub mode |
| `about.html` | Philosophy, license (MPL-2.0/MIT), contributing (detain org), FAQ transmission log (5 canonical + 3 extra mapped) |
| `404.html` | "Signal lost" Vela-on-alien-moon SVG illustration; concept realised as content not field verbatim; `noindex`; relative paths; recovery links |

### CSS (3 files)

| File | Notes |
|---|---|
| `css/base.css` | Reset, tokens (:root), element defaults, skip-link, focus-visible, scrollbar, prefers-reduced-motion |
| `css/theme.css` | @font-face (9 declarations), typography scale, all layout and component structures, animations |
| `css/components.css` | Header/nav, footer (3 columns + intensity toggle), buttons, badges, mascot Vela, telemetry band, FAQ, forms |

### JS (1 file)

| File | Notes |
|---|---|
| `js/main.js` | Nav toggle, scroll reveals (IntersectionObserver), FAQ accordion, intensity toggle (localStorage), seasonal activation (date-gate), parallax hero, Vela mascot (tips, dismiss, easter interactions), easter eggs (typed-word:void, scroll-past-footer), barrel-roll keyframe injection |

### Other

| File | Notes |
|---|---|
| `robots.txt` | Pre-existing, correct |
| `sitemap.xml` | Pre-existing, correct (8 canonical pages; 404 excluded per spec) |
| `SITE.md` | Concept, palette, type, motion, visual assets |
| `REGEN_PLAN.md` | Compact manifest per STEP 1 |

## Intentional Deviations

- **`proof_strategy` "BSD-3-Clause across the board" signal removed**: The kit's quoted string conflicts with `content.json` (MPL-2.0 for server/hub). Per §19.6, `content.json` wins on facts. The verbatim FAQ license answer is used instead.
- **`strong` emphasis**: Body face is Inter [400,500]; weight 500 IS the second channel. No separate emphasis color added since `#E8EAF0` passes 14.75:1+ on all surfaces.
- **Seasonal assets (`img/seasonal/`)**: Not generated (kit lists them as motif assets but no SVG/CSS seasonal artwork was requested by the brief). Seasonal activation uses live JS date-gate only.

## Kit Fields Implemented

All 19 declared experience fields implemented: `site_architecture`, `homepage_narrative`, `page_blueprints`, `copy_overlay`, `feature_casting`, `copy_treatments`, `faq_experience`, `hero_experience`, `navigation_model`, `scroll_experience`, `easter_eggs`, `conversion_funnel`, `proof_strategy`, `experience_archetype` (immersive), `complexity_profile`, `intensity_toggle`, `seasonal_activation`, `error_page_experience`, `mascot.behavior`, `persona_vignettes`.

## Verification

- `@copyright` header present in all 4 CSS/JS files (rule §19.24)
- No CDN font references (rule §19.3)
- No `stylelint --fix` run
- Font family names quoted throughout CSS
- Grid tracks use `minmax(0, 1fr)` (rule §19.12)
- `overflow-wrap: anywhere` on body text; `break-word` on headings
- Reduced motion: all animations gated; Vela idle disabled
- Fixed companion at 320px: Vela moves in-flow on mobile (rule §19.11)

## Notes

- install command copied verbatim from `shared/content.json` — never retyped
- 3 emphasis nav levels (default, primary, muted) visually distinguishable via color + weight
- All 3 easter eggs implemented and keyboard-safe (Esc exit, disabled in inputs)
- 9 distinct `<meta name="description">` values across pages
