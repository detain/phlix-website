# REGEN_PLAN.md — Nordic Saga

## 1. Experience Fields

| Field | Old site | New site |
|-------|----------|----------|
| `site_architecture` | partial nav (no labels) | Full nav with thematic labels: The Hall, The Arsenal, The Realms, The Forge, The Relay, The Lore |
| `homepage_narrative` | absent section ids | 6 sections: opening-rune, the-saga, featured-halls, full-arsenal, proof-and-honor, the-summons |
| `page_blueprints` | generic | Per-kit copy treatments from brand kit |
| `copy_overlay` | generic hero | Norse-styled hero with torchlit wordmark reveal treatment |
| `feature_casting` | absent | 2 hero features cast as forge-fire accents |
| `copy_treatments` | absent | Rune-burn reveal, carved-stone typography, knotwork dividers |
| `faq_experience` | generic | Skald-announcement style, declarative terse copy |
| `hero_experience` | generic | Full-bleed hero with ember-glow wordmark pulse |
| `navigation_model` | generic | Thematic labels with Cinzel UI font, Fjord Steel hover |
| `scroll_experience` | basic | Slow horizontal wipe, stone-door fade, rune-burn reveal |
| `easter_eggs` | absent | 3 eggs: logo-clicks:5, typed-word:odin, typed-word:rune |
| `conversion_funnel` | generic CTA | "The Summons" as forge-styled CTA with Forge Fire glow |
| `proof_strategy` | absent | Links to live GitHub pages (no fabricated numbers) |
| `visitor_paths` | generic | Narrative-scroll path: hero → story → features → CTA |
| `experience_archetype` | narrative-scroll | narrative-scroll (confirmed) |
| `complexity_profile` | generic | standard density, general reading, translate jargon |
| `seasonal_activation` | absent | live-js mode: Yule Night, Midsummer Saga, Ragnarok Eve |
| `error_page_experience` | missing 404 | Realized as runestone / raven empty state with noindex |
| `persona_vignettes` | absent | Epic/Hero archetype personas from brand kit |
| `mascot.behavior` | absent | Huginn (Odin's raven) in top-right, tips, easter interactions |
| **absent → default** | `intensity_toggle` | Not declared — no toggle, seasonal variants handle variation |

## 2. Nav Diff

| Old label | New label | Emphasis |
|-----------|-----------|----------|
| home | The Hall | default |
| features | The Arsenal | primary |
| clients | The Realms | default |
| download | The Forge | primary |
| hub | The Relay | default |
| about | The Lore | muted |

**Extra pages**: traditions (Way of the Phlix哲学 guide)
**Demoted**: plugins → fold into features, docs → one rune-marker away (link-out only)

## 3. Home Section Order

| Old | New (homepage_narrative.sections[]) |
|-----|-------------------------------------|
| absent | 1. opening-rune (hero, copy_overlay.hero) |
| absent | 2. the-saga (story, major weight) |
| absent | 3. featured-halls (feature_casting, major) |
| absent | 4. full-arsenal (features, major) |
| absent | 5. proof-and-honor (proof_strategy, minor) |
| absent | 6. the-summons (conversion_funnel, major) |

## 4. Carry-forward

- All product facts from `content.json` verbatim (features, clients, install command, FAQ, footer)
- 4-clients + DLNA fact (content.json wins per §19.6)
- MPL-2.0 for server/hub, MIT for plugins/clients
- Install command from `content.json.install.primary`

## 5. Ambiguities & Resolutions

| Conflict | Resolution | Rule |
|----------|------------|------|
| Kit says "5 clients" | content.json says 4 + DLNA; kit wins on design, facts from content.json | §19.6 |
| `proof_strategy` asks for star count | Link to /stargazers instead of fabricating | §19.7 |
| Fonts.ui vs navigation_model | UI face (Cinzel) for nav labels, display face (Uncial Antiqua) wordmark only | §19.6 specific wins |
| Seasonal palette contrast | Measure per variant; Yule Night Amber Ember (#E08B20) on #060C12 = 7.2:1 ✓ | §19.19 |

## 6. Escalations

None — all font families exist in pool, all colors measurable, no missing assets.

## 7. Dev Notes

- `strong { font-weight: 700 }` — Merriweather declared at [400,700] in pool
- Grid tracks use `minmax(0, 1fr)` not bare `1fr`
- `overflow-wrap: anywhere` on p, li, dt, dd, a, span, code, kbd, samp, pre
- `overflow: hidden` avoided on content containers
- @copyright in every css/*.css and js/*.js
- Seasonal live-js mode via `prefers-color-scheme` media query (Yule/Midsummer/Ragnarok)
