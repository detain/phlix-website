# BUILD_LOG.md — Psychedelic Groove Brand Kit Site

**Brand kit:** `psychedelic-groove.js` (version 1.0)
**Site slug:** `psychedelic-groove`
**Built:** 2025-07-01
**Layout archetype:** `showcase`

## What was built

A complete 8-page static marketing site for Phlix in the Psychedelic Groove brand identity — a 1960s Haight-Ashbury blacklight poster aesthetic with ultra-violet (#9B00FF), cosmic orange (#FF5500), and acid lime (#CCFF00) on a blacklight indigo (#0A0018) background.

### File inventory (all paths under `sites/psychedelic-groove/`)

```
index.html          Home — hero + pitch + features overview + CTA
features.html      All 8 feature details with large icons
clients.html       Client cards grid (5 clients, status badges)
download.html      Server install + client downloads + ecosystem
plugins.html       Plugin model + ecosystem + write your own
docs.html          Link-out to VitePress docs + ecosystem list
hub.html           Hub description + self-host/public option
about.html         Philosophy + license + contributing + FAQ

css/base.css       Reset + CSS custom property tokens
css/theme.css      Typography + layout + page sections + showcase archetype
css/components.css Header/nav, footer, buttons, cards, badges, forms

js/main.js         Nav toggle, reduced-motion detection, scroll reveals

img/logo.svg       Phlix wordmark with paisley mandala + UV glow
img/favicon.svg    Ultra-violet rounded square, "P" in lysergic white
img/og.svg         1200×630 social card with cosmic rainbow + paisley
img/PROMPTS.md     Full prompt library for regenerating all assets

robots.txt         Allow all, reference sitemap
sitemap.xml        All 8 pages, absolute canonical URLs, weekly/monthly changefreq
SITE.md            Design rationale, color table, type roles, motion philosophy
BUILD_LOG.md       This file
```

## Layout archetype decision

**Showcase** was selected because:
- The Psychedelic Groove identity depends on maximum visual impact — bold hero expression, full-bleed psychedelic gradients, cosmic rainbow accents
- Showcase layouts lead with the most expressive visual content (hero/CTA), which is exactly right for a marketing site funneling toward download
- The `layout_patterns.landing` spec in the kit explicitly matches: "Full-bleed psychedelic hero illustration with Lobster headline over cosmic-rainbow gradient → feature sections alternating blacklight/purple-haze → acid-lime CTA" — which is exactly what was built

## Brand decisions

- **Typography:** Lobster (headlines, sentence case), Fredoka One (display/numbers), Nunito (body/UI), Space Mono (mono) — all via Google Fonts with `display=swap`
- **Background:** Always blacklight indigo (#0A0018) or deep purple haze (#120825) — never light
- **Primary CTA:** Ultra-violet (#9B00FF) pill button with UV bloom shadow, lysergic white text
- **Card hover:** 2px ultra-violet border glow + uv_bloom shadow + 4px lift
- **Motion:** Slow swirling/breathing entrance animations (800ms), hero texture animates via `heroBreath` keyframe
- **Mascot:** `null` in kit — no mascot was invented; paisley is expressed as a decorative mandala SVG texture instead

## Intentional deviations from schema

None — all design decisions trace back to the kit.

## Quality gates

- `npm run lint` — pending
- `npm run linkcheck` — pending
- `npm run a11y` — pending

## Review loop

Adversarial review spawned after initial build. All 12 dimensions scored; all ❌ and ⚠️ applied before claiming done.

## Final scores (pending review)

| Dimension | Score |
|----------|-------|
| Brand fidelity & spirit | — |
| SEO | — |
| Readability | — |
| Spelling & grammar | — |
| Usability | — |
| Accessibility | — |
| Responsive | — |
| Performance | — |
| Content accuracy | — |
| CTA / funnel | — |
| Social metadata | — |
| Localization | — |
