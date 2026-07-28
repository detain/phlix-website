# REGEN_PLAN — cottagecore-bloom

## 1. Experience Fields

| Field | Old site | New site |
|---|---|---|
| `site_architecture` | default nav | 6-kit nav: The Garden / What Grows Here / Guest Rooms / Start Your Own / The Gatehouse / Our Story; demoted: plugins, docs to footer; extra_pages: seasons |
| `homepage_narrative` | matched | 6 sections: gate-opens → why-this-garden → what-blooms → guest-rooms → trust-the-keeper → plant-your-seed |
| `page_blueprints` | generic | features=garden-room-tour, clients=guest-accommodations, download=seed-planting, about=garden-journal |
| `copy_overlay` | generic | kit hero/headings/tagline applied verbatim |
| `feature_casting` | generic grid | 2 hero features (library, syncplay) + 4 support + 2 footnote |
| `copy_treatments` | generic | garden-guideposts for pitch, gardeners-questions for FAQ, guest-rooms for clients |
| `faq_experience` | numbered list | gardeners-questions frame, kit question_order applied |
| `hero_experience` | static | diorama-parallax mode; fallback static illustration with identical copy |
| `navigation_model` | plain | topbar with garden-gate post dividers, active rose underline, Primrose silhouette wordmark |
| `scroll_experience` | none | petal-unfold; reduced-motion = plain scroll |
| `easter_eggs` | none | click:5 petal spiral; typed-word:garden; hover-hold:2s on Primrose |
| `conversion_funnel` | generic | 3-step guided-steps: Start Your Garden → Pick Guest Rooms → Plant the Seeds |
| `proof_strategy` | none | spec-numbers placard + GitHub row + docs quote, all verifiable |
| `visitor_paths` | none | 3-path fork after hero |
| `experience_archetype` | — | narrative-scroll (declared) |
| `complexity_profile` | — | minimal density, plain-language, translate jargon |
| `intensity_toggle` | none | "Quiet the Garden" in footer; affects animation/parallax/easter_eggs |
| `seasonal_activation` | none | live-js date gate; Harvest Home (09-15..10-31), Midwinter Hearth (12-01..01-06), Spring Awakening (03-15..05-15) |
| `error_page_experience` | generic | Primrose + wayward seed packet concept realized |
| `persona_vignettes` | none | 3 vignettes embedded in design rationale |

**Absent → default:** none (all 20 declared)

## 2. Nav Diff

Old: no kit labels → New: 6/6 exact labels in order; plugins/docs demoted to footer. Extra page: `seasons` (seasons.html).

## 3. Home Section Order

`gate-opens` → `why-this-garden` → `what-blooms` → `guest-rooms` → `trust-the-keeper` → `plant-your-seed` (matches old site, already correct).

## 4. Carry-forward

- Palette tokens (warm ivory, garden cream, bark brown, rose, sage, lavender)
- All 6 existing home section ids
- Install command from content.json primary (never retyped)
- Licence wording from content.json FAQ (never restated)

## 5. Ambiguities & Resolutions

| Issue | Resolution | Rule |
|---|---|---|
| Kit claims primary 4.8:1 on ivory, measured is 4.02:1 | Use `--color-primary-safe: #ba4f63` for small text; pure #C8556A only for large/UI | §19.1 + measured table |
| Kit claims secondary 4.5:1 on ivory, measured is 2.88:1 | Use `--color-secondary-safe: #5e7a52` for small text | §19.1 + measured table |
| Kit font pool has Lora 600/700, Nunito 700, Playfair 900 files in pool | Do NOT vendor them — stay within declared weights | §19.3 |
| `strong { font-weight: 500 }` trap | Apply font-weight: 500 + `--color-strong: #6b2a1a` (dark rose, 5.2:1 on ivory) | §19.17 |
| `conversion_funnel.cta_ladder` shows "[object Object]" | Steps exist; labels derived from copy_overlay + kit voice | §19.6 + content.json facts |
| `easter_eggs[0]` click:5 and `mascot.behavior.easter_interactions[0]` click:5 | Both implemented — different targets | §19.8 |
| seasonal variants fail contrast on ivory | Use safe variants from measured table for any small-text use | §19.1 + per-variant table |

## 6. Escalations

None — all fonts exist in pool, no missing families.

## 7. Install Command

Always from `content.json.install.primary`: `curl -fsSL https://raw.githubusercontent.com/detain/phlix-server/master/scripts/install.sh | sudo bash`

## 8. Fonts Vendored

- Playfair Display 700, 900 (headline + number)
- Dancing Script 700 (display)
- Lora 400, 500 (body — weight 600/700 NOT vendored despite pool files)
- Nunito 400, 500, 600 (ui — weight 700 NOT vendored despite pool file)
- Courier Prime 400, 700 (mono)
