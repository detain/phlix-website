# REGEN_PLAN — wabi-sabi

## 1. Experience Fields

| Field | Old site | New site |
|-------|---------|----------|
| `site_architecture` | absent nav labels | Full 6-item nav with 3 emphasis levels; plugins/docs demoted to footer |
| `homepage_narrative` | no section ids | 5 sections: `kintsugi-crack`, `the-craft`, `why-imperfection`, `proof-of-presence`, `receive-the-gift` |
| `page_blueprints` | default template | Gallery-plaques (features), spec-table (clients), chapter-scroll (download/about) |
| `copy_overlay` | generic hero | Kit hero: "There is beauty in imperfection" / "The Library Imperfect" |
| `feature_casting` | generic 4-up | 2 hero features (library, syncplay), 3 support, 3 footnote per kit spec |
| `copy_treatments` | absent | haiku-cards (pitch), letters-column (faq), spec-table (clients), bookshelf (ecosystem) |
| `faq_experience` | absent | letters-column frame, persona: Tsugi the bowl, 6 ordered questions + 2 extra |
| `hero_experience` | generic | Static kintsugi crack line, fallback already in spec |
| `navigation_model` | absent | topbar — Noto Serif JP wordmark, Noto Sans JP links, weathered-oak active underline |
| `scroll_experience` | absent | continuous — soft 300ms fade entrances; reduced-motion kills fades |
| `easter_eggs` | absent | `scroll-past-footer` → ink brushstroke appears, settles, fades after 6s |
| `conversion_funnel` | absent | 4-rung ladder: Read philosophy → See craft → Pick vessel → Begin |
| `proof_strategy` | absent | spec-numbers + GitHub links (live star/issue counts) + verbatim phrase from content.json |
| `experience_archetype` | absent | editorial |
| `complexity_profile` | absent | minimal density, plain-language, translate jargon |
| `seasonal_activation` | absent | live-js mode; 3 seasonal overrides wired (no banner) |
| `error_page_experience` | 404 missing | Tsugi on empty shelf, "This page settled elsewhere", recovery links |
| `persona_vignettes` | absent | 3 vignettes: Evening Ritual, Far Distance, Shared Shelf |
| `mascot.behavior` | absent | Tsugi, bottom-right, home/download/about; click:5 + hover-hold:2s easter; dismiss persists via localStorage |
| `visitor_paths` | absent → default | — |
| `intensity_toggle` | absent → default | — |

**Absent → default (never a defect):** `visitor_paths`, `intensity_toggle`.

## 2. Nav Diff

| Old label | New label | Emphasis | Notes |
|-----------|-----------|----------|-------|
| (none) | The Library | default | home |
| (none) | Craft | **primary** | features |
| (none) | Vessels | default | clients |
| (none) | Begin | **primary** | download |
| (none) | The Gateway | default | hub |
| (none) | The Path | muted | about |
| features (old) | plugins (demoted) | — | footer link |
| docs (old) | docs (demoted) | — | footer link |

`extra_pages`: none.

## 3. Home Section Order

| # | id | Source | Old | New |
|---|----|---------|-----|-----|
| 1 | `kintsugi-crack` | copy_overlay.hero | (none) | hero with kintsugi crack growing |
| 2 | `the-craft` | feature_casting | (none) | 2 featured features on worn-paper cards |
| 3 | `why-imperfection` | story | (none) | brand story as long paragraph |
| 4 | `proof-of-presence` | proof_strategy | (none) | quiet trust-signal band |
| 5 | `receive-the-gift` | conversion_funnel | (none) | Begin CTA |

## 4. Carry-forward

- Palette tokens: all --color-* CSS vars already correct
- SVG favicon/logo in `img/` (keep as-is)
- `@font-face` rules for the 6 declared font families (all exist in pool)

## 5. Ambiguities resolved

| Ambiguity | Resolution | Rule |
|-----------|-----------|------|
| Kit says `cta_ladder` = "[object Object]" × 4 | Derived from kit's own copy_overlay + conversion_funnel targets: Read philosophy → See craft → Pick vessel → Begin | §19.6 structured field wins for counts |
| Kit contrast prose wrong for gold (#C8901A) on rice paper | Measured table: 3.08:1 only passes large text. Use #1A1A14 (15.4:1) for small text on rice paper. Derive `#696764` for `buttons.fab.text` on `--color-surface`. | §19.1 measured wins |
| `fonts.ui.usage` says UI face for nav; `navigation_model.spec` says wordmark in display face | More specific field (`navigation_model.spec`) wins for wordmark; ui face for nav links. | §19.6 |
| `proof_strategy` asks for star/issue counts | Static page cannot verify. Link to `/stargazers` + `/issues` with descriptive labels, no printed numbers. | §19.7 + §19.14 |
| Kit says `strong { font-weight: 500 }` but 400→500 is imperceptible alone | Add `--color-text-emphasis: #3d2a1c` (deeper warm brown) clearing 4.5:1 on all surfaces; use it on `<strong>` | §19.17 kit-specific fix |
| `complexity_profile.page_budget.words_per_section_max=100` vs content.json facts | Cap governs authored prose only. Verbatim content.json strings are exempt. | §19.6 |
| `error_page_experience.concept` is prose, not copy | Realise as: Tsugi on empty shelf, heading "This page settled elsewhere.", recovery links to home/features/download | §18.1 + kit spec |
| Install command | Pull verbatim from content.json.install.primary.command — `curl -fsSL https://raw.githubusercontent.com/detain/phlix-server/master/scripts/install.sh \| sudo bash` | §19.22 |
| `page_blueprints.clients` says "5 clients"; content.json has 5 entries (4 + DLNA) | content.json wins on facts (4 native + DLNA). Kit's 5 is wrong. | §19.6 |

## 6. Escalations

- No font files missing; all declared weights exist in pool.
- No family in kit missing from pool.
- No extra_pages needed.

## 7. Avoid-words check

`exciting`, `amazing`, `awesome`, `powerful`, `robust`, `synergy`, `leverage`, `utilize`, `dynamic`, `crushing it`, `epic`, `stunning`, `pop`, `binge`, `content` — must not appear in authored prose.
