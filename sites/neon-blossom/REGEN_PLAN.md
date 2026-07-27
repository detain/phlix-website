# REGEN_PLAN.md — neon-blossom

## Experience Fields

| Field | Old site | New site |
|-------|----------|----------|
| `site_architecture` | Default template nav | Kit-driven: Home, Features(primary), Clients, Download(primary), Hub, About(muted); plugins/docs demoted to footer |
| `homepage_narrative` | Default sections | 6 sections: garden-gate (hero) → why-bloom (story) → features-hero (feature_casting) → pitch-garden (pitch_bullets) → proof-glow (proof_strategy) → get-in (conversion_funnel) |
| `page_blueprints` | — | Not declared; default pages |
| `copy_overlay` | — | Kit voice applied: bioluminescent night garden, poetic/ethereal tone |
| `feature_casting` | — | Hero features: syncplay, hub, library; support: remaining 5; omit none |
| `copy_treatments` | — | Default content.json verbatim |
| `faq_experience` | — | Default content.json FAQ with kit framing |
| `hero_experience` | — | Default static hero with fallback |
| `navigation_model` | — | Default topbar with fallback |
| `scroll_experience` | — | Default continuous scroll; reduced-motion: instant opacity |
| `easter_eggs` | — | 2: logo-clicks:7 (Lumia spiral), typed-word:"lumia" (firefly burst) |
| `conversion_funnel` | — | 4-rung CTA ladder from content.json |
| `proof_strategy` | — | Signals at placement using content.json facts |
| `visitor_paths` | — | Not declared |
| `experience_archetype` | — | immersive — adopted |
| `complexity_profile` | — | density:minimal, reading_level:plain-language, jargon:translate; home_sections_max:6, words_per_section_max:75 |
| `intensity_toggle` | — | Not declared — none |
| `seasonal_activation` | — | live-js: date-gate flips seasonal_variants tokens during active_range |
| `error_page_experience` | — | Real 404.html with garden-gate concept, noindex, relative paths, recovery links |
| `persona_vignettes` | — | Used to seed img/PROMPTS.md |
| `mascot.behavior` | — | Lumia moth companion; bottom-right on Home/Features/Download; idle flutter; tips; easter:click:3 spiral, hover-hold:2s land; dismissible via localStorage; NOT fixed below 768px |

## Nav Diff

| Old | New |
|-----|-----|
| (no labels found) | Home, Features, Clients, Download, Hub, About |
| — | plugins, docs demoted to footer |

## Home Section Order

| Old | New (homepage_narrative.sections[]) |
|-----|-------------------------------------|
| (none) | garden-gate → why-bloom → features-hero → pitch-garden → proof-glow → get-in |

## Carry-Forward

- Logo.svg, favicon.svg, og.svg, og.png, icon PNGs (all correct; leave untouched)
- img/PROMPTS.md (leave untouched)
- Font files from shared pool
- Palette tokens (design_tokens.color.*)
- CSS custom-property system

## Ambiguities Resolved

| Ambiguity | Resolution |
|-----------|-----------|
| `strong` emphasis uses 400 weight only (body cap) | Use `font-weight: 400` AND `color: var(--color-primary)` for second channel; brief confirms Lato caps at 400 |
| `secondary` #9b30ff fails small-text contrast on dark surfaces | Use `#a13cff` as safe-for-small-text on bg #08010f |
| Kit contrast prose unverified | Use measured values from kit-brief; safe substitutes used verbatim |
| `install.from_source` not an install | Presented as "not an install" developer checkout only |
| `easter_eggs[0]` logo-clicks:7 is a different target than `mascot.easter_interactions[0]` click:3 | Both implemented as separate triggers |
| Mascot fixed positioning at 320px | Below 768px: in-flow above footer; never auto-push tips on phone |

## Font Weight Notes

- Headline: Cormorant Garamond 300, 600 — **600 NOT 700**; nearest available weight
- Display: Cormorant Garamond 300 — only 300 declared
- Body: Lato 300, 400 — 700 exists but NOT declared; stay within 300,400
- UI: DM Sans 400, 500, 600 — 700 exists but NOT declared; stay within 400,500,600
- Mono: Fira Code 400, 500 — 700 exists but NOT declared; stay within 400,500
- Number: Cormorant Garamond 300 — only 300 declared

## Focus Style (per §19.17)

`box-shadow: 0 0 0 3px var(--color-focus), 0 0 0 5px var(--color-bg)` — combined shadows so both control and focus ring are visible.

## Reduced Motion

`transition: none` AND `animation: none` both applied under `prefers-reduced-motion: reduce`.
