# SITE.md — Holographic Future

## Concept

Holographic Future is a **prismatic holographic chrome** identity for Phlix — a self-hostable PHP media server. The site translates the kit's iridescent foil, AR/VR interface aesthetic into a full dark-mode glassmorphism marketing site. Every surface refracts light into spectrum. Electric blue is the anchor; rainbow iridescence is the spectacle.

**Archetype:** `interactive-demo` — adopts the playable-vignette hero, visitor path self-select fork, and Lux mascot companion.

## Palette

- **Midnight Panel** `#0D1117` — base dark surface
- **Chrome White** `#F0F4F8` — primary text on dark
- **Electric Blue** `#0096FF` — primary accent (6.13:1 on midnight, passes AA)
- **Prismatic Violet** `#8B5CF6` — secondary accent (4.47:1 on midnight, passes AA for large text)
- **Iridescent Cyan** `#22D3EE` — tertiary highlights
- **Platinum Silver** `#C8D0DA` — muted UI chrome
- **Frosted Glass** `#EAEFF6` — light surface variant

All contrast pairs measured against the actual rendered surfaces. The kit's prose claim of 14:1 for chrome white on midnight was not used — 17.12:1 is the measured value (and passes, but we use the measured derivation per §19.14).

## Typography

- **Orbitron** (headlines) — ultra-modern geometric caps, weight 400/700 only (300 not available in pool)
- **Space Grotesk** (display, UI) — geometric sans for display numbers and all UI chrome
- **Inter** (body) — weight 300/400/500, used at 300 as the base body weight
- **JetBrains Mono** (code) — for install command, code blocks, diagnostics

All fonts self-hosted as WOFF2 from the shared pool.

## Motion

- Shimmer sweep on card hover: `::after` pseudo-element with gradient sweep
- Parallax on hero and AR panels under smooth scroll (reduced motion aware)
- Lux mascot idle rotation (8s linear infinite, disabled under `prefers-reduced-motion`)
- Spectrum overlay animation for the logo-clicks:7 easter egg (3s, auto-dismiss)
- Diffraction scanline overlay for the typed-word:refract easter egg (4s timeout)

**Reduce motion:** JS sets `.reduce-motion` class which sets `transition-duration: 0s !important` AND `animation-duration: 0s !important` — both, not just one (trap 2 from §19).

## Experience Fields Implemented

| Field | Implementation |
|-------|---------------|
| `site_architecture` | Custom nav: Signal/Calibrate/Dimensions/Interface/Relay/Spectrum; plugins/docs demoted to footer |
| `homepage_narrative` | 5 sections: hero-reveal, core-dimensions, proof-band, visit-paths, cta-portal |
| `page_blueprints` | features=spec-sheet, clients=device-rack, download=portal-entry, about=chapter-scroll |
| `copy_overlay` | Kit overlay used for hero copy, CTAs, section headings |
| `feature_casting` | 3 hero AR panels (syncplay, transcode, hub) + 5 card grid (library, auth, livetv, dlna, plugins) |
| `copy_treatments` | spec-rows for pitch bullets, man-page for FAQ, device-rack for clients, constellation for ecosystem |
| `faq_experience` | man-page frame with Lux persona, ordered per question_order, 3 extra_questions mapped |
| `hero_experience` | Playable vignette (Lux + AR panel), static fallback |
| `navigation_model` | Topbar with accessible hamburger fallback |
| `scroll_experience` | Continuous scroll with parallax, reduced_motion fallback |
| `easter_eggs` | logo-clicks:7 (spectrum spray), typed-word:refract (diffraction overlay) |
| `conversion_funnel` | showcase-first, 3 rungs: Explore dimensions → See your devices lit up → Calibrate your setup |
| `proof_strategy` | spec-numbers + GitHub badge + quote at proof-band |
| `visitor_paths` | 3-path self-select fork with emphasis features |
| `mascot.behavior` | Lux in bottom-right hero+download, tips per section, dismiss with localStorage |
| `seasonal_activation` | live-js date-gate: Aurora Solstice / Solar Maximum / Void Protocol |
| `error_page_experience` | 404.html "Signal Lost" — Lux in dark dimension, recovery links, noindex |
| `complexity_profile` | standard/technical/allow; 5 sections, 120 words/section cap |
| `experience_archetype` | interactive-demo |

**Absent fields:** `intensity_toggle` → null → no toggle (correct per §19.9)

## Deviation Notes

- `lux.svg` is not in `img/` (brief notes mascot imagery via illustration prompt; no sprite sheet was pre-generated). The mascot element appears as a simple glowing circle placeholder on 404.html and the hero. This is noted in BUILD_LOG.md.
- Orbitron 300 not available in font pool — used 400 as nearest declared weight.
