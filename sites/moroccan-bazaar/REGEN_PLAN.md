# REGEN_PLAN.md — Moroccan Bazaar

## Experience Fields Manifest

| Field | What it becomes |
|-------|-----------------|
| `site_architecture.nav` | Primary nav labels: "Enter the Bazaar" (home), "The Masterworks" (features), "Every Screen" (clients), "Your Passage In" (download), "Reach from Afar" (hub), "The Story" (about) — 3 emphasis levels (primary/default/muted) |
| `site_architecture.demoted_pages` | plugins + docs move to footer |
| `site_architecture.extra_pages` | craftsman-guide.html |
| `homepage_narrative.sections` | 5 sections in order: archway-opens (hero), the-treasures (features overview), why-handcraft (story), trusted-artisans (proof), step-inside (conversion) |
| `copy_overlay` | Kit tagline "Every Frame, a Masterwork." + custom hero copy + section headings from kit voice |
| `feature_casting` | 8 features; hero/support split; omit_from_home[] = none (all 8 on home) |
| `copy_treatments` | Pitch bullets as warm artisan list; FAQ as dl; clients as cards |
| `faq_experience` | Standard dl; all 6 canonical answers from content.json |
| `hero_experience` | Static hero with zellige geometric motif; fallback = same content |
| `navigation_model` | Standard topbar; fallback = standard nav |
| `scroll_experience` | Standard scroll; prefers-reduced-motion = cross-fades only |
| `easter_eggs` | logo-clicks:5 → Amir brightens + zellige cascade; typed-word:bazaar → subtle reward |
| `conversion_funnel.cta_ladder` | 3 rungs: "Enter the Bazaar" (home hero) → "Your Passage In" (download) → "Read the docs" |
| `proof_strategy` | Signals at placement in trusted-artisans; verifiable links only |
| `visitor_paths` | null — single curated path |
| `experience_archetype` | `immersive` — adopted |
| `complexity_profile` | density=minimal, reading_level=general, jargon=translate, home_sections_max=5, words_per_section_max=120 |
| `intensity_toggle` | null — nothing loud to tame |
| `mascot.behavior` | Amir, copper lantern, fixed bottom-right on desktop, in-flow on mobile; tips on home/features/download; easter: click:3 + hover-hold:2s; dismissal persists via localStorage |
| `seasonal_activation` | live-js with 3 variants (Ramadan, Harvest, Rose Water); date-gate JS flips tokens |
| `error_page_experience` | 404.html with concept realized as content; recovery links to home/features/download |
| `persona_vignettes` | Seeding img/PROMPTS.md with artisan/media imagery |
| `mascot.placement` | Desktop: fixed bottom-right after 768px; Mobile: in-flow above footer |

## Font Weight Decisions

- Headline (Cormorant Garamond): 600, 700 — both declared in kit; use both
- Display (Cinzel): 400, 700 — both declared; use both
- Body (Lora): 400, 500 — both declared; 500 for `<strong>` + amber-ochre `#B87828` as second channel (4.96:1 on bg, passes AA)
- UI (Nunito Sans): 400, 500, 600 — all declared; use all
- Mono (Fira Code): 400, 500 — both declared; use both
- Number (Cinzel): 400, 700 — both declared; use both

## Contrast Notes

- Secondary `#1A4580` fails on all dark surfaces — use safe substitute `#5f7da6` for any text use; keep pure `#1A4580` for decorative borders/icons only
- Seasonal primary overrides re-checked per variant matrix (brief §19.19)
- `<strong>` uses `font-weight: 500` + `color: #B87828` (copper) — second channel clears 4.96:1 on bg

## Resolution of Ambiguities

- `footer_arrangement`: mirror-nav first, then 3 content.json columns (per §19.14 table)
- `install` command: copied verbatim from content.json install.primary — never retyped
- `mascot.dismiss`: sessionStorage preferred over localStorage per §19.21 resolution; kit says localStorage but §19.14 says sessionStorage for dismissible companions — more specific wins; localStorage is still used for persistent dismissal
- `typed-word` easter egg: disabled in inputs/textarea/contenteditable; no preventDefault; exits on Esc (§19.8)

## Field NOT implemented (not declared by kit)
- `intensity_toggle` — null in kit
