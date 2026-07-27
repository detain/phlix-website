# REGEN_PLAN.md — Egyptian Dusk

## 1. Experience Fields

| Field | Old site | New site |
|---|---|---|
| `site_architecture` | default nav | Custom nav: "The Kingdom", "Sacred Scrolls", "The Pantheon", "Enter the Tomb", "The Mirror", "The Cartouche" (6 items); demoted: plugins, docs → footer |
| `homepage_narrative` | generic sections | 5 sections: `cartouche-entrance`, `sacred-scrolls`, `why-ascend`, `keepers-testament`, `passage-awaits` |
| `page_blueprints` | generic | Per kit templates: cartouche-gallery, stele-pantheon, temple-entrance, book-of-the-dead, mirror-chamber |
| `copy_overlay` | content.json verbatim | Kit-voiced: "The eternal archive awaits" / "Your media. Your kingdom. Carved forever." / "Enter the Tomb" / "Read the Scrolls" |
| `feature_casting` | all 8 features | Hero: library, syncplay. Support: transcode, auth, hub, livetv. Footnote: dlna, plugins |
| `copy_treatments` | generic | hieroglyphic-register, archive-testimony, stele-pantheon, cartouche-collection |
| `faq_experience` | generic | Kheper persona, re-ordered questions, 3 extra mappings |
| `hero_experience` | static | Guided reveal with layered diorama; fallback = static cartouche |
| `navigation_model` | generic | Topbar with cartouche styling, Cinzel Decorative wordmark, Lapis dividers, Gold active |
| `scroll_experience` | generic | Chaptered: horizontal wipe + gold shimmer per section; reduced: plain scroll |
| `easter_eggs` | none | 3: logo-clicks:7, typed-word:cartouche, scroll-past-footer |
| `conversion_funnel` | generic | 3-step guided; cta_ladder: "Enter the Tomb" → "Choose Your Sanctum" → "Become the Keeper" |
| `proof_strategy` | none | Signals: spec-numbers, github link, quote-from-docs. Placement: register band |
| `visitor_paths` | none | Self-select fork: family-keeper, collection-heir, ritual-tinker |
| `experience_archetype` | — | narrative-scroll |
| `complexity_profile` | — | density:standard, reading_level:general, jargon_policy:translate, home_sections_max:5, words_per_section_max:100 |
| `seasonal_activation` | — | live-js; 3 variants (Opet Festival, Night of Osiris, Winter Solstice Ra) |
| `error_page_experience` | — | "The Tomb is Empty" with Kheper + broken cartouche; recovery links |
| `mascot.behavior` | — | Kheper (scarab), bottom-right, idle rolling sun-disk, tips per section, easter_interactions, dismiss |
| `intensity_toggle` | absent → default | No toggle |
| `persona_vignettes` | — | 3 vignettes → imagery guidance |

## 2. Nav Diff

Old: none → New: "The Kingdom" (home), "Sacred Scrolls" (features, primary), "The Pantheon" (clients), "Enter the Tomb" (download, primary), "The Mirror" (hub), "The Cartouche" (about, muted). Demoted: plugins, docs → footer.

## 3. Home Section Order

1. `cartouche-entrance` (hero, copy_overlay.hero)
2. `sacred-scrolls` (feature_casting, major)
3. `why-ascend` (story/pitch, major)
4. `keepers-testament` (proof_strategy, minor)
5. `passage-awaits` (conversion_funnel, major)

## 4. Carry-forward

- Existing images: logo.svg, favicon.svg, og.svg, og.png, 5 icon PNGs (correct)
- Palette tokens from design_tokens.color
- Font faces already in shared pool
- Working @font-face rules from predecessor

## 5. Ambiguities & Resolutions

- **Fonts.ui.usage vs navigation.topbar**: Kit says nav wordmark in display face; more specific `navigation_model.spec` says Cinzel Decorative wordmark in Pharaoh Gold → kit spec wins for wordmark surface.
- **`copy_overlay.hero.primary_cta` label "Enter the Tomb" vs `site_architecture.nav[3]` "Enter the Tomb"**: Both same; no conflict.
- **`proof_strategy` quote**: No verified person quote exists; use verbatim pitch_bullets[0] attributed to project (§19.7/§19.14 table).
- **`intensity_toggle` absent**: Correctly omitted; no defect.
- **`from_source` labeling**: Kit says not an install; content.json agrees — label "Build from source (development, not an install)".
