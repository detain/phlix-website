# REGEN_PLAN.md — holographic-future

## 1. Experience Fields

| Field | Old site | New site |
|-------|---------|----------|
| `site_architecture` | generic nav | Custom nav: Signal, Calibrate, Dimensions, Interface, Relay, Spectrum; plugins/docs demoted to footer; `mirror-nav` footer |
| `homepage_narrative` | default sections | 5 sections: hero-reveal → core-dimensions → proof-band → visit-paths → cta-portal |
| `page_blueprints` | generic pages | features=spec-sheet, clients=device-rack, download=portal-entry, about=chapter-scroll |
| `copy_overlay` | content.json verbatim | Kit overlay: eyebrow="Precision media infrastructure", headline="Your library, calibrated across dimensions.", CTA ladder from conversion_funnel |
| `feature_casting` | all 8 on home | Hero: syncplay, transcode, hub; grid: library, auth, livetv; footnote: dlna, plugins |
| `copy_treatments` | default | pitch=spec-rows, faq=man-page, clients=device-rack, ecosystem=constellation |
| `faq_experience` | default dl | man-page frame with Lux persona; question_order=["like-plex","expose-internet","formats","mobile-app","plugins","license"]; extra_questions mapped |
| `hero_experience` | static | playable-vignette (Lux + AR panel), fallback=static illustration with same copy |
| `navigation_model` | generic | topbar, fallback=accessible hamburger nav |
| `scroll_experience` | default | continuous with parallax; reduced_motion=plain scroll |
| `easter_eggs` | none | logo-clicks:7 (Lux spectrum spray), typed-word:refract (diffraction pattern) |
| `conversion_funnel` | generic CTA | showcase-first, 3 rungs: Explore dimensions → See your devices lit up → Calibrate your setup |
| `proof_strategy` | generic | spec-numbers + github + quote-from-docs at proof-band placement |
| `visitor_paths` | none | 3-path self-select fork: sync-seeker / collect-curator / freedom-builder |
| `experience_archetype` | — | interactive-demo |
| `complexity_profile` | — | standard, technical, allow; home_sections_max=5, words_per_section_max=120 |
| `seasonal_activation` | none | live-js: 3 seasonal overrides (Aurora Solstice, Solar Maximum, Void Protocol) |
| `error_page_experience` | none (missing 404) | "Signal Lost" concept: Lux in dark dimension, recovery links home/features/download |
| `persona_vignettes` | — | 3 vignettes for design guidance |
| `mascot.behavior` | — | Lux: bottom-right hero+download, 80px margin, idle rotation, tips per section, easter_interactions, dismiss with localStorage |

**Absent → default:** `intensity_toggle` (null → no toggle)

## 2. Nav Diff

Old nav (generic): Home, Features, Clients, Download, Plugins, Docs, Hub, About  
New nav (6 links, emphasis levels):
1. Signal (primary) → index.html
2. Calibrate (primary) → features.html
3. Dimensions (default) → clients.html
4. Interface (primary) → download.html
5. Relay (default) → hub.html
6. Spectrum (muted) → about.html

Demoted to footer: plugins.html, docs.html (still linked, not in primary nav)

## 3. Home Section Order

Old (default home): hero → pitch → features-overview → cta-banner  
New (homepage_narrative.sections):
1. `#hero-reveal` — copy_overlay.hero, full-viewport prism wipe with Lux AR panel
2. `#core-dimensions` — feature_casting hero features as floating AR panels
3. `#proof-band` — proof_strategy signals
4. `#visit-paths` — visitor_paths self-select fork
5. `#cta-portal` — conversion_funnel portal CTA

## 4. Carry-forward from old site

- All img/ assets (logo.svg, favicon.svg, og.svg, og.png, icon PNGs, PROMPTS.md)
- Color palette tokens (--color-primary #0096FF, --color-secondary #8B5CF6, midnight bg #0D1117, chrome white #F0F4F8)
- Glassmorphism card style (backdrop-blur, semi-transparent fills, white border)
- Chrome Aurora gradient (#0096FF → #8B5CF6)
- Layout structure: max-width 1440px, 8px spacing scale
- JetBrains Mono for code blocks
- Seasonal variants (3 declared in kit, live-js)

## 5. Ambiguities & Resolutions

- **Orbitron 300**: kit asks weight [300,400,700] but only orbitron-400 and orbitron-700 exist. Use 400 for 300 request (nearest available). Documented: no orbitron-300 file in pool.
- **Space Grotesk 400/500/600 (display)**: kit asks [300,700] for display but has 400/500/600 files. These are incidental to the ui face. Use only 300 and 700 for display per kit declaration.
- **<strong> weight**: kit declares Inter at [300,400,500]; brief says font-weight:500 for strong. Use 500 (declared).
- **CTA ladder labels**: step 3 cta="Calibrate your setup (install)" matches docs_url intent without claiming install method.
- **typed-word egg**: must be disabled in input/textarea/contenteditable, never preventDefault, exit on Esc.

## 6. Font Weight Notes (REGEN_PLAN)

- Orbitron (headline): uses 400 and 700 only (no 300 file, no 900 per brief)
- Space Grotesk (display): uses 300 and 700 only (per kit declaration [300,700])
- Space Grotesk (ui): uses 400, 500, 600 (per kit declaration [400,500,600])
- Inter (body): uses 300, 400, 500 (per kit declaration [300,400,500])
- JetBrains Mono: uses 300 and 400 (per kit declaration [300,400])
- Orbitron (number): uses 700 only (per kit declaration [700])
