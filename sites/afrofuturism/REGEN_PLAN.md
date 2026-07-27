# REGEN_PLAN.md — Afrofuturism (`afrofuturism`)

## 1. Experience Fields

| Field | Old site | New site |
|-------|----------|----------|
| `site_architecture` | Generic nav labels | 6-nav with kit labels: The Starfield, Constellations, Your Portals, Begin the Journey, The Bridge Home, Our Genesis |
| `homepage_narrative` | No sections | 5 sections: cosmic-rise, stellar-features, ancestral-truth, proof-of-cosmos, gateway-call |
| `page_blueprints` | Default templates | Cosmic-temple (features), portal-array (clients), initiation-rite (download), starfire-scroll (about) |
| `copy_overlay` | Generic hero | Kit eyebrow/headline/subheadline/CTAs from `copy_overlay.hero` |
| `feature_casting` | All features equal | Hero: SyncPlay + Library; Support: transcode, auth, hub; Footnote: livetv, dlna, plugins |
| `copy_treatments` | Default | kente-proclamations, orisha-counsel, portal-constellation, starfire-library |
| `faq_experience` | Generic | oracle-fire frame via Orisha persona, ordered Qs |
| `hero_experience` | Static | celestial-revelation — Orisha + star burst + kente geometry |
| `navigation_model` | Generic | celestial-beacon — topbar with gold active line, scroll darkens |
| `scroll_experience` | Basic | cosmic-unfoldment — gold flash + upward push + kente wipe |
| `easter_eggs` | None | 3: logo-clicks:7, typed-word:heritage, scroll-past-footer |
| `conversion_funnel` | Generic | ritual-revelation with 3-step CTA ladder |
| `proof_strategy` | Numbers | Kente-bordered placard + GitHub row + verbatim quote |
| `visitor_paths` | None | 3-path selector: heritage-keeper, collector, architect |
| `experience_archetype` | — | narrative-scroll |
| `complexity_profile` | — | minimal density, plain-language, translate jargon |
| `intensity_toggle` | None | "Dim the cosmic light" — affects animation/glow |
| `seasonal_activation` | None | live-js date gate with banner |
| `error_page_experience` | Missing 404 | Star-went-dark concept with Orisha + torn star-map |
| `persona_vignettes` | None | 3 vignettes per kit spec |
| `mascot.behavior` | None | Orisha companion — bottom-right, in flow on mobile, tips, easter interactions |

**Absent → default:** `scroll_experience`, `proof_strategy`, `visitor_paths`, `intensity_toggle`, `seasonal_activation`, `error_page_experience`, `persona_vignettes` — all declared, implement all.

## 2. Nav Diff

| Old label | New label | Emphasis |
|-----------|-----------|----------|
| Home | The Starfield | default |
| Features | Constellations | primary |
| Clients | Your Portals | default |
| Download | Begin the Journey | primary |
| Plugins | (demoted to footer) | — |
| Docs | (demoted to footer) | — |
| Hub | The Bridge Home | default |
| About | Our Genesis | muted |

**Extra pages:** `collective-screening.html` — Collective Screening walkthrough page.

## 3. Home Section Order

| # | ID | Source | Weight |
|---|-----|--------|--------|
| 1 | `cosmic-rise` | copy_overlay.hero | hero |
| 2 | `stellar-features` | feature_casting | major |
| 3 | `ancestral-truth` | story | major |
| 4 | `proof-of-cosmos` | proof_strategy | minor |
| 5 | `gateway-call` | conversion_funnel | major |

## 4. Carry-forward

- Cosmic Earth (#080510) / Wakanda Night (#0E0A1A) / Starfield Earth (#150F25) palette — correct
- Kente Gold (#F0B800) / Cosmic Violet (#6600CC) / Tribal Red (#CC1A1A) accents — correct
- All 10 `@font-face` rules present in the shared pool (montserrat-800/900, montserrat-500/600/700, jetbrains-mono-400/600, bebas-neue-400, nunito-400/600); 500/600/700 are in the pool but not explicitly declared by this kit — pool backfill is documented, selfcheck passes
- Warm Star White (#F5EDD8) text — correct
- Logo SVG, favicon SVG, og.svg — keep as-is
- Shadow tokens — correct

## 5. Ambiguities (per §19.6)

| Conflict | Resolution |
|----------|------------|
| `fonts.ui.usage` (Montserrat) vs `navigation_model` (wordmark in display face) | More specific field wins: wordmark stays in headline (Montserrat Black), nav links in UI face (Montserrat 600) |
| `complexity_profile.page_budget.words_per_section_max: 85` vs content.json facts | Cap governs authored prose only; verbatim content.json strings are exempt (§16) |
| `copy_overlay.hero.primary_cta: "Begin the exodus"` → `download` | CTA label matches kit; honest destination (download page) |
| `copy_overlay.secondary_cta: "Witness the constellations"` → `features` | Label matches kit; honest destination (features page) |
| Kit contrast prose vs measured table | Measured values from kit-brief control; use safe substitutes verbatim |
| `mascot.behavior.placement` bottom-right, 320px companion overlap risk | Below 768px: in-flow above footer; above: fixed bottom-right clearing CTA |
| `intensity_toggle` — reduced motion removes Orisha animations | Attach `change` listener, not just load-time read; keep opacity transitions |

## 6. Escalations

- `seasonal_activation.motif_assets` (img/seasonal/*.svg) do not exist in img/ — noted in BUILD_LOG, site ships without them
- `extra_pages.collective-screening` requires new page — will create

## 7. Font-weight note (§19.17)

Body face: Nunito [400, 600]. Kit caps body at 600. `<strong>` gets `font-weight: 600` (declared weight, not 500). Do NOT add `color` on strong — would merely restate body color.

## 8. Avoid words

`disruption`, `synergy`, `leverage`, `utilize`, `streamline`, `edgy`, `raw`, `gritty`, `dark`, `undergoing`, `hustle`, `niche`, `exclusive`, `elite` — not used in authored copy.
