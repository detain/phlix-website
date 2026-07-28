# REGEN_PLAN — Wilderness Trail

**Archetype:** `narrative-scroll`
**Siblings (narrative-scroll):** afrofuturism, art-nouveau-garden, autumn-harvest, bioluminescent-reef, bollywood-dreams, celtic-twilight, cottagecore-bloom, desert-horizon, dia-de-muertos, egyptian-dusk, festive-lantern, marina-breeze, mid-century-modern, midnight-jazz, neon-noir, nordic-saga, prairie-bloom, retro-seventies, stardust-observatory (one will be compared for diff; structure is kit-specific per `homepage_narrative.sections[]`)

---

## §1 Experience Fields

| Field | Old site | This build |
|-------|----------|------------|
| `site_architecture` | absent nav labels | Trailhead/Waypoints/Outposts/Set Camp/Relay Station/Field Notes + demoted plugins/docs to footer |
| `homepage_narrative` | no sections | 5 sections: trailhead-call, key-waypoints, why-this-trail, trail-proven, start-hiking |
| `page_blueprints` | generic | features→trail-map-points, clients→outpost-network, download→ranger-station, about→expedition-log |
| `copy_overlay` | absent | hero eyebrow/headline/subheadline/CTAs from kit |
| `feature_casting` | absent | 2 hero features (library, syncplay), support/footnote lists |
| `copy_treatments` | absent | pitch→trail-blazes, faq→campfire-qa, clients→outpost-map, ecosystem→supply-shelf |
| `faq_experience` | absent | campfire-qa frame, 6 content.json questions, Scout persona |
| `hero_experience` | absent | guided-reveal with parallax; fallback static scene in markup |
| `navigation_model` | absent | topbar with trail-blaze diamond separators, campfire ember active |
| `scroll_experience` | absent | chaptered with topo-contour wipe; reduced-motion drops wipes |
| `easter_eggs` | absent | logo-clicks:5 + typed-word:summit |
| `conversion_funnel` | absent | 3-rung ladder + install command from content.json |
| `proof_strategy` | absent | spec-numbers + live GitHub links + verbatim pitch bullet |
| `visitor_paths` | absent | 3-path selector on download page |
| `experience_archetype` | absent | narrative-scroll declared |
| `complexity_profile` | absent | minimal density, plain-language, translate jargon |
| `intensity_toggle` | absent | Dim the Campfire toggle in footer |
| `seasonal_activation` | absent | live-js with 3 seasonal motif banners |
| `error_page_experience` | 404.html missing | Scout at wrong trail sign, 3 recovery links |
| `persona_vignettes` | absent | 3 vignettes |
| `mascot.behavior` | absent | Scout fixed bottom-right on home/download/about; must clear CTA at 320px |
| `mascot.easter_interactions` | absent | click:5 tips hat + hover-hold:2s shows map |

**Absent → default** (0 fields): none — all 20 declared fields are implemented.

---

## §2 Nav Diff

| Old label | New label | Order change |
|-----------|-----------|--------------|
| (none — nav missing) | Trailhead | new |
| — | Waypoints (primary) | new |
| — | Outposts | new |
| — | Set Camp (primary) | new |
| — | Relay Station | new |
| — | Field Notes (muted) | new |
| plugins (header nav) | → footer only | demoted |
| docs (header nav) | → footer only | demoted |
| expedition-guide | extra page (new) | added |

---

## §3 Home Section Order

| Old | New (from `homepage_narrative.sections[]`) |
|-----|--------------------------------------------|
| (none) | 1. `trailhead-call` — hero with Scout pointing to peaks |
| (none) | 2. `key-waypoints` — 2 hero features as trail waypoints |
| (none) | 3. `why-this-trail` — value props as trail blazes |
| (none) | 4. `trail-proven` — ranger placard: specs + live GitHub links |
| (none) | 5. `start-hiking` — CTA ladder + install command |

---

## §4 Carry-forward

- Palette tokens: `#e8d9bc` canvas-tan, `#2d5a27` pine-green, `#1e1e1e` granite-dark, `#f0e6ce` aged-canvas
- Logo SVG (pine silhouette + wordmark) — already kit-conforming
- Green-tinted shadows (`rgba(45,58,43,…)`)
- Campfire orange (`#d4581a`) as single CTA accent
- `shared/content.json` facts: 7 pitch bullets, 8 features, 5 clients, 5 ecosystem repos, 6 FAQ
- Install command: `curl -fsSL https://raw.githubusercontent.com/detain/phlix-server/master/scripts/install.sh | sudo bash` (content.json.primary, line_count:1)
- MPL-2.0 / MIT licence wording from content.json
- Footer 3-column layout from content.json

---

## §5 Ambiguities & Resolutions (per §19.6)

| Issue | Resolution | Rule |
|-------|-----------|------|
| Kit's contrast prose claims pine-green 4.8:1 on canvas-tan | Measured 5.79:1 — kit prose was conservative; use measured (passes AA) | §19.6 + §19.1 |
| Kit's tertiary `#d4581a` on `#e8d9bc` = 2.89:1 (fails AA small) | Use `#a14314` as safe-for-small-text substitute — derived from kit's own hue | §19.1 + §19.6 |
| Kit's `fab.text` `#f0e6ce` on `#d4581a` = 1.12:1 (fails) | Use `#625e54` as safe substitute on dark-fab backgrounds | §19.1 |
| Kit's `secondary.bg` `#2d5a27` on `#3a7ca5` = 1.77:1 (fails) | Use `#aac7d8` as safe-for-small-text for text-on-secondary | §19.1 |
| `site_architecture.demoted_pages` says plugins/docs in footer | Include both as footer links; primary nav has 6 items per nav model | §19.14 |
| Kit asks for `lora-700-latin.woff2` emphasis but 700 not declared for Lora | Use `font-weight: 600` for `<strong>` — 600 is declared and `lora-600-latin.woff2` exists | §19.17 |
| `conversion_funnel.cta_ladder` shows `[object Object]` | All 3 rungs are from kit spec (step 1→download, step 2→clients, step 3→download#server); visible CTA labels from kit | §16 + §19.7 |
| `proof_strategy` signals: github star/issue counts | Static page cannot verify; link to `/stargazers`, `/issues` with descriptive label | §19.14 |
| Install command | Copy verbatim from `content.json.install.primary.command` — never retype | §19.22 |
| Footer licence wording | Copy verbatim from `content.json.footer` → fact from content.json wins | §19.6 |

---

## §6 Escalations

- Font `barlow-condensed-800` and `barlow-condensed-900` exist in pool but are NOT declared for this kit's `ui` role (declared weights: 400,600,700). Declined to vendor them.
- Font `lora-700` and `lora-500` exist in pool but NOT declared for Lora body role (declared: 400,600). Declined to vendor 700 for strong.
- No font family substitutions needed; all declared families exist in pool.

---

## §7 CSS Rules Applied (§19.12)

1. Grid/flex tracks: `minmax(0, 1fr)` — not bare `1fr` — to prevent overflow from unbreakable tokens
2. `overflow-wrap: anywhere` on `p, li, dt, dd, a, span, code, kbd, samp, pre`
3. `overflow-wrap: break-word` + `hyphens: auto` on `h1–h6, blockquote`
4. No `overflow: hidden` on containers whose text must reflow

---

## §8 404.html

- Realised concept: Scout at trail sign reading "This route went cold"
- `<meta name="robots" content="noindex">` + self-canonical
- All 3 recovery links from `error_page_experience.recovery_links`
- Relative asset paths only (root shim injects `<base>`)
