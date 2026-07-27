# REGEN_PLAN.md — copper-steampunk

## Experience Fields

| Field | Old site | New site |
|-------|----------|----------|
| `site_architecture` | Generic 8-link nav | 6-item nav: The Workshop, Instruments, Engineering Gallery, Commission an Engine, The Relay Station, The Logbook; plugins/docs demoted to footer |
| `homepage_narrative` | Default hero → pitch → features → CTA | 5-section story: boiler-rise (hero), the-apparatus, why-this-workshop, proof-of-craft, commission-now |
| `page_blueprints` | Generic template | Instrument-panel features, engineering-gallery clients, workshop-counter download, logbook-chapters about |
| `copy_overlay` | content.json verbatim | Kit voice: "Precision engineering meets collection mastery", "Your Collection, Masterfully Engineered.", CTA: "Commission Your Engine" / "Tour the Workshop" |
| `feature_casting` | All 8 on home | Hero: library + syncplay; Support: transcode, auth, hub, livetv; Footnote: dlna, plugins |
| `copy_treatments` | Generic lists | workshop-readout bullets, logbook-entries FAQ, engineering-specifications clients, tools-on-a-workbench ecosystem |
| `faq_experience` | Plain `<dl>` | Cogsworth persona, logbook style, question_order per kit |
| `hero_experience` | Static | Diorama-parallax (spec), static fallback |
| `navigation_model` | Generic | Mahogany-beam topbar with gear animation |
| `scroll_experience` | None | Chaptered with iris-wipe; reduced-motion = continuous |
| `easter_eggs` | None | logo-clicks:5, typed-word:catalogue, hover-hold:2s |
| `conversion_funnel` | Generic | Guided-steps style; cta_ladder rung 1→2→3 |
| `proof_strategy` | None | 3 signals: spec-numbers, github, quote-from-docs; placement: brass gauge band |
| `visitor_paths` | None | 3-path fork: collector/synchronizer/engineer |
| `experience_archetype` | — | interactive-demo |
| `complexity_profile` | — | density:standard, reading_level:technical, jargon:allow |
| `intensity_toggle` | None | "Workshop lights down" in footer utility row |
| `seasonal_activation` | None | live-js date-gate |
| `error_page_experience` | None (404 missing) | "Apparatus Miscalibrated" Cogsworth + broken gear scene |
| `mascot.behavior` | None | Cogsworth bottom-right, idle key-wind, 4 tips, easter_interactions |
| `persona_vignettes` | None | 3 vignettes seed design decisions |

**Absent → default:** all other default behaviors retained.

---

## Nav Diff

| Old | New |
|-----|-----|
| (none found) | The Workshop (home, default) |
| — | Instruments (features, primary) |
| — | Engineering Gallery (clients, default) |
| — | Commission an Engine (download, primary) |
| — | The Relay Station (hub, default) |
| — | The Logbook (about, muted) |
| — | **Footer: plugins, docs** (demoted) |

---

## Home Section Order

| Old | New (per kit) |
|-----|---------------|
| (none) | 1. `#boiler-rise` (hero) |
| — | 2. `#the-apparatus` (feature_casting) |
| — | 3. `#why-this-workshop` (story) |
| — | 4. `#proof-of-craft` (proof_strategy) |
| — | 5. `#commission-now` (conversion_funnel) |

---

## Carry-forward

- Logo SVG (img/logo.svg) — already correct
- Favicon SVG (img/favicon.svg) — already correct  
- OG image source (img/og.svg → img/og.png) — already correct
- img/PROMPTS.md — untouched
- Palette tokens from previous pass (good: soot-black, mahogany, parchment, copper, brass)
- Font declarations (Playfair, Cinzel, Crimson, Josefin, Share Tech Mono, Oswald)

---

## Font Weight Clarifications (from kit-brief)

| Face | Allowed | Pool file | Note |
|------|---------|-----------|------|
| Cinzel Decorative | 400, 700 | cinzel-decorative-400-latin.woff2, cinzel-decorative-700-latin.woff2 | 900 exists but NOT declared by kit |
| Crimson Text | 400, 600 | crimson-text-400-latin.woff2, crimson-text-600-latin.woff2 | 700 exists but NOT declared by kit |

---

## Contrast Fixes (measured, per kit-brief)

| Pair | Kit claim | Measured | Fix |
|------|-----------|----------|-----|
| #b5651d on #1a1208 | 4.6:1 | **4.27:1** ❌ | Use #b86b26 for small text; #b5651d safe for large/UI only |
| #b5651d on #2c1a0e | — | **3.84:1** ❌ | Use #bc7434 for small text |
| #8b4a00 on #1a1208 | — | **2.71:1** ❌ (seasonal) | Use #a6743b |

---

## Ambiguities Resolved

1. **`conversion_funnel.cta_ladder` shows "[object Object]"** — The cta_ladder array exists in the kit with 3 steps; I will implement it as defined in `conversion_funnel.style = "guided-steps"`.

2. **`feature_casting.footnote` = dlna + plugins** — These are "moved to features page only" per kit spec; I implement as footnotes on features.html, not on home page.

3. **`site_architecture.footer_arrangement: "full-directory"`** — Full three-column footer from content.json, plus the mirrored nav index row.

---

## Escalations

None — all facts sourced from content.json or kit-brief.

---

## Avoid Words Check

`avoid_words`: amazing, awesome, supercharge, leverage, synergy, utilize, seamless, disrupt, vibrant, exciting journey, onboarding — **not used**.

---

## Build Checklist (Known Traps)

- [ ] §19.12: `grid-template-columns: repeat(n, minmax(0, 1fr))` — not bare `1fr`
- [ ] §19.12: `overflow-wrap: anywhere` on p/li/dt/dd/a/span/code/kbd/samp/pre
- [ ] §19.1: Primary button text #e8d5a3 on #b5651d — measured 4.27:1 ❌ small text — use #b86b26 OR keep large text only
- [ ] §19.2: `@copyright` inside `/* */` on every css/js file
- [ ] §19.8: key-sequence egg disabled in inputs, never preventDefault, exits on Esc
- [ ] §19.11: Cogsworth fixed position checked at 320px — does not cover CTA
- [ ] §19.21: Cogsworth dismiss has restore affordance
- [ ] §19.20: reduceMotion switches off `transition` AND `animation`
- [ ] §19.17: `strong { font-weight: 600 }` — 600 is declared for Crimson Text body
- [ ] 404.html: relative paths, noindex, recovery_links offered
- [ ] 9 different `<meta name="description">` per page
