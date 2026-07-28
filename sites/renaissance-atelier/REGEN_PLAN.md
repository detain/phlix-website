# REGEN_PLAN — Renaissance Atelier (`renaissance-atelier`)

## 1. Experience Fields

| Field | Old site | New site |
|-------|----------|----------|
| `experience_archetype` | not declared | `editorial` — full editorial layout |
| `site_architecture` | generic nav, 8 links | Kit nav: The Studio, The Palette, The Gallery, Begin Your Work, The Relay, Our Craft |
| `homepage_narrative` | not implemented | 5 sections: studio-light → the-palette → why-we-craft → voices-heard → take-the-brush |
| `page_blueprints` | not declared | Illuminated-folio (features), gallery-salon (clients), workshop-manual (download), scholar-study (about) |
| `copy_overlay` | not implemented | Full overlay: "A Florentine Studio for Your Media" / "Your Library. Illuminated." / both CTAs |
| `feature_casting` | not implemented | 2 hero (library, syncplay), 4 support, 2 footnote |
| `copy_treatments` | not implemented | manifesto-cards, portrait-gallery, docent-dialogue, studio-toolkit |
| `faq_experience` | basic dl | Docent-dialogue with ordered questions + extra mappings |
| `hero_experience` | not impl | Static painterly scene, no JS needed |
| `navigation_model` | generic | Topbar with gold hover underlines |
| `scroll_experience` | not impl | Continuous scroll with sfumato fade-ins |
| `easter_eggs` | not impl | logo-clicks:5 (lantern flare) + typed-word:pigment (brush cursor) |
| `conversion_funnel` | not impl | Guided steps: Begin → Choose Canvas → Light Lamp |
| `proof_strategy` | not impl | spec-numbers + github links + verbatim quote from content.json |
| `visitor_paths` | not impl | 3-path fork after hero (curator/ensemble/tinkerer) |
| `complexity_profile` | not impl | density=minimal, jargon_policy=translate, 5 home sections max |
| `intensity_toggle` | not impl | "Studio Calm" toggle — affects animation/scroll/hero_glow |
| `seasonal_activation` | not impl | 4 seasonal variants (live-js date gate) |
| `error_page_experience` | missing | Piero with dimmed lamp, empty canvas, recovery links |
| `persona_vignettes` | not impl | 3 vignettes (Collector's Study, Studio at Night, Household Archive) |
| `mascot.behavior` | not impl | Piero garzone, bottom-right, lantern idle, 4 contextual tips, easter interactions |
| `avoid_words` | generic | `binge`, `stream`, `disrupt`, `leverage`, `synergy`, `content`, `seamless`, `robust`, `cutting-edge`, `clickbait`, `viral`, `algorithm` |
| absent → default | — | `hero_experience` fallback (static), `navigation_model` fallback (topbar+mobile hamburger) |

## 2. Nav Diff

Old: "Home / Features / Clients / Download / Plugins / Docs / Hub / About" — generic labels, all emphasis=default
New (kit `site_architecture`):
1. `The Studio` (home) — default
2. `The Palette` (features) — **primary**
3. `The Gallery` (clients) — default
4. `Begin Your Work` (download) — **primary**
5. `The Relay` (hub) — default
6. `Our Craft` (about) — muted

`plugins` and `docs` demoted → footer (via `fold_into` and footer columns from content.json respectively).

`extra_pages`: `curation-guide` → `curation-guide.html` (real page, content from pitch_bullets + features + clients)

## 3. Home Section Order

Old: hero → pitch → features-overview → CTA banner (fixed 4-section order)
New (`homepage_narrative.sections[]`):
1. `studio-light` — copy_overlay.hero (full-bleed candlelit hero)
2. `the-palette` — feature_casting (8 tools as gilded manuscript illuminations)
3. `why-we-craft` — story/value props (manifesto cards on vellum)
4. `voices-heard` — proof_strategy (placards with real numbers)
5. `take-the-brush` — conversion_funnel (signature CTA banner)

## 4. Carry-Forward

- All image assets already exist in `img/` (logo.svg, favicon.svg, og.png/og.svg, icon PNGs)
- `img/PROMPTS.md` already exists
- `manifest.webmanifest` already exists
- Install command copy from `content.json.install.primary` (one-liner, never retyped)
- MPL-2.0 licence wording from `content.json` footer / FAQ answer — not hardcoded

## 5. Ambiguities & Resolutions

| Issue | Resolution |
|-------|------------|
| Kit declares `body` weights [400,500] only — `strong` fix | Per §19.17: add second channel — use `--color-secondary` (Burnt Sienna, #A0522D) on vellum/ivory surfaces for `<strong>`, which clears 4.5:1. 500 weight alone is kept but supplemented with sienna ink. |
| Kit `proof_strategy` asks for live star/issue counts | Per §19.7 / canonical resolution table — static page cannot verify numbers. Link to `/stargazers` + `/issues` with descriptive labels; do not print fabricated figures. |
| Kit `proof_strategy` asks for "a quote from the docs" | Canonical resolution: no such quote exists to verify. Use verbatim `pitch_bullets[0]` attributed to the project, not an invented person. |
| Kit `extra_pages` `curation-guide` — `facts_from` includes `clients` | Use client names/platforms from `content.json.clients[]`; framing is the atelier voice. |
| `intensity_toggle` affects animation/scroll/hero_glow | Implementation: `data-calm="true"` on `<html>`, JS toggles it; CSS uses `[data-calm] .animate-...` selectors. |
| `mascot.behavior` placement bottom-right — risk of covering CTA at 320px | Per §19.11 + §2A: below 768px place Piero **in-flow** above the footer; fixed only above 768px. |

## 6. Escalations

- Font `Cormorant Garamond` at weight 700 — already in font-sources.json pool (confirmed via kit-brief output)
- `curation-guide.html` — `extra_pages` requires a real page; content sourced from `pitch_bullets`, `features`, `clients` per kit spec
- No seasonal motif SVGs exist yet (`img/seasonal/*`) — seasonal_activation is `live-js` but site functions without the motif assets (date-gate runs, tokens apply, motif assets are decorative)

## 7. Known Traps Applied

- §19.12: grid tracks use `minmax(0, 1fr)`; `overflow-wrap: anywhere` on body text
- §19.17: `<strong>` uses `font-weight: 700` + `color: var(--color-secondary)` (Burnt Sienna on vellum/ivory = 5.9:1)
- §19.19: seasonal variants traced; contrast re-checked for all 4 variant overrides
- §19.24: `@copyright 2026 Joe Huss <detain@interserver.net>` in every CSS/JS file
- `content.json` facts govern all claims; kit `copy_overlay` is presentation only
- `mascot.behavior` is declared → build companion, dismiss to localStorage, restore affordance present
- §19.22: install command copied verbatim from `content.json.install.primary`
