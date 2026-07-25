# REGEN_PLAN — stardust-observatory

Archetype: **narrative-scroll** (declared in `experience_archetype`).
Kit declares **all 21** §2A experience fields. Nothing is absent; only three
sub-fields are empty/null: `site_architecture.extra_pages: []` (no extra pages),
`feature_casting.omit_from_home: []` (nothing suppressed),
`navigation_model.keyboard: null` (no exotic key model → pointer/tab only).

## 1. Experience fields — old site → new site

| Field                   | Old site (2026-07-04)                                               | This regeneration                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| ----------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `experience_archetype`  | "immersive" (guessed in theme.css comment)                          | narrative-scroll: home is a 5-beat descent, each beat separated by an atlas page-turn rule.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `site_architecture`     | generic 8-link nav (Home…About) + nav-cta "Download"                | 6 kit-labelled nav items in kit order; `plugins`/`docs` demoted to the footer's "Shelved in the library" row; `plugins` also folded into `features.html#advanced-apertures` per `fold_into` (its atlas plate there keeps `id="plugins"`). Footer = mirror-nav row + the 3 verbatim `content.json` columns. Separate `.nav-cta` removed (the two `emphasis:"primary"` items are the CTA).                                                                                                                                                                                                                     |
| `homepage_narrative`    | hero / pitch / features / cta (4 generic sections, no ids)          | 5 sections, ids **exactly** `dome-rising`, `the-instruments`, `why-stardust`, `proven-path`, `chart-course`, in that order (selfcheck check 9 reads them from the kit). `logline` used as the hero aside; arc = story-first.                                                                                                                                                                                                                                                                                                                                                                                 |
| `page_blueprints`       | none of the 4 templates realised                                    | features → **atlas-gallery** (engraved plates, 2-up); clients → **viewing-rooms** (chamber cards w/ furnishing list); download → **expedition-guide** (3 numbered stages); about → **scholar-study** (Philosophy/License/Contributing rooms → hearth FAQ).                                                                                                                                                                                                                                                                                                                                                   |
| `copy_overlay`          | ignored (used kit taglines ad-hoc)                                  | hero eyebrow/headline/sub + both CTA labels, `section_headings.pitch/features/cta_banner`, and `footer_tagline` all taken from the overlay verbatim.                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `feature_casting`       | flat 8-card grid                                                    | home: `hero[]` library+syncplay as two large atlas plates headlined by their `angle`; `support[]` transcode/auth/hub as a 3-up plate row; `footnote[]` livetv/dlna/plugins **not on home** — they appear on `features.html` only. All 8 on features.html.                                                                                                                                                                                                                                                                                                                                                    |
| `copy_treatments`       | plain `<ul>`, plain `<dl>`, plain cards, plain list                 | pitch_bullets → `atlas-entries` (ruled journal entries, gold entry numbers); faq → `meridian-letters` (letter cards from Meridian); clients → `viewing-room-gallery`; ecosystem → `scholar-library` (shelf of spines).                                                                                                                                                                                                                                                                                                                                                                                       |
| `faq_experience`        | 6 FAQs in `content.json` order                                      | reordered `like-plex, expose-internet, formats, mobile-app, plugins, license`; framed as letters answered by Meridian; 3 `extra_questions` rendered as additional visitor letters that route to their `maps_to` canonical answer (answers unchanged).                                                                                                                                                                                                                                                                                                                                                        |
| `persona_vignettes`     | unused                                                              | 3 vignettes seed (a) the surfaces drawn in `img/PROMPTS.md`, (b) an "Three nights at the observatory" strip on `clients.html` naming each vignette's `features_shown`.                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `hero_experience`       | static hero, star-field animation only                              | `guided-reveal`: inline SVG dome whose halves part on intersection (`.is-open`), Meridian's core brightens; headline + both CTAs are in static markup and visible with JS off / reduced motion (the `fallback`). ~1.6 KB of the 4 KB budget. No audio (see §5).                                                                                                                                                                                                                                                                                                                                              |
| `navigation_model`      | generic topbar                                                      | topbar per spec: Playfair wordmark, constellation-line divider, Jost items, active item gold-underlined + glow. Fallback IS the semantic `<nav><ul>` with a labelled hamburger ≤900px.                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `scroll_experience`     | none                                                                | `continuous-with-bookmarks`: a `.page-turn` constellation rule between home sections; a one-shot parchment wipe fires on intersection; fully off under reduced-motion / Steady Gaze.                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `easter_eggs`           | none                                                                | all 3: logo-clicks:5 (sparkle + reward line, auto-fade 5 s, Esc clears), typed-word `aperture` (highlights the word, Meridian tilts; listener ignores inputs/textarea/contenteditable, never `preventDefault`, Esc exits), scroll-past-footer whisper.                                                                                                                                                                                                                                                                                                                                                       |
| `conversion_funnel`     | one "Begin your watch" button, repeated                             | `guided-steps` ladder: 1 **Open Your Dome** → download.html, 2 **Choose Your Viewing Room** → clients.html, 3 **Chart the Zenith (setup)** → download.html#server; download page opens with the `download_opening` expedition header.                                                                                                                                                                                                                                                                                                                                                                        |
| `proof_strategy`        | none                                                                | new `proven-path` band between features and the closing CTA: brass placard of spec-numbers (facts only), an "observatory archive" row linking the real repo/stargazers/issues **without printing counts**, and one engraved principle quoted from `content.json`.                                                                                                                                                                                                                                                                                                                                            |
| `visitor_paths`         | none                                                                | fork inside `dome-rising` under the CTAs: 3 paths → `features.html#library`, `features.html#syncplay`, `plugins.html`; each names its `emphasis` feature ids.                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `complexity_profile`    | unbounded prose                                                     | 5 home sections (≤6 ✓); authored prose ≤120 words/section (verbatim `content.json` facts exempt per §19.6); `jargon_policy: translate` → plain term first, precise term inside a `<details>` ("the precise term") on aperture/NTP/HLS/reverse-tunnel.                                                                                                                                                                                                                                                                                                                                                        |
| `intensity_toggle`      | none                                                                | "Steady Gaze" `<button aria-pressed>` in a new footer utility row; sets `data-intensity="steady"` on `<html>`, persisted in localStorage; kills dome motion, page-turns, star breath, mascot idle. **Not fixed** (kit places it in the footer).                                                                                                                                                                                                                                                                                                                                                              |
| `mascot.behavior`       | mascot not on the site at all                                       | Meridian companion on **home, features, download only**; bottom-right ≥601px, bottom-left ≤600px; CSS ring idle (off under reduced-motion/Steady Gaze); 5 `tips` bound to the kit's own selectors; both `easter_interactions` (click:5 nova, hover-hold:2s tooltip); "Meridian, to the observatory" dismiss persisted in localStorage. Per §19.11 it **arrives only after the first scroll, tap or keystroke** (a fixed companion may not sit on a control that is already on screen — at 320px no corner is free of the hero buttons), and tips are **never** auto-pushed on a phone: tap Meridian for one. |
| `seasonal_activation`   | variants documented in SITE.md only                                 | `live-js` date-gate: inside an `active_range` it sets the variant's token overrides on `<html>`, un-`hidden`s the `banner`, and swaps in the motif SVG. The 3 `motif_assets` are authored as real files in `img/seasonal/`. Out of range → nothing renders.                                                                                                                                                                                                                                                                                                                                                  |
| `error_page_experience` | 404 existed but generic ("The atlas has no page here") + no noindex | Rebuilt as the **Misaligned Telescope**: tilted refractor, star-less dome, Meridian beside it; "Recalibrate your bearings" recovery links = home/features/download; `robots noindex` added (the missing meta this kit was flagged for); relative assets only; no JS dependency.                                                                                                                                                                                                                                                                                                                              |

## 2. Nav diff

| #   | Old label (href)      | New label (href)                                        | Emphasis |
| --- | --------------------- | ------------------------------------------------------- | -------- |
| 1   | Home (`./`)           | **The Observatory** (`./`)                              | default  |
| 2   | Features              | **Instruments** (`features.html`)                       | primary  |
| 3   | Clients               | **Viewing Rooms** (`clients.html`)                      | default  |
| 4   | Download              | **Chart Your Course** (`download.html`)                 | primary  |
| 5   | Plugins               | — demoted → footer + `features.html#advanced-apertures` | —        |
| 6   | Docs                  | — demoted → footer                                      | —        |
| 7   | Hub                   | **Distant Observatories** (`hub.html`)                  | default  |
| 8   | About                 | **Our Story** (`about.html`)                            | muted    |
|     | `.nav-cta` "Download" | removed (duplicate of item 4)                           | —        |

Footer (`footer_arrangement: "mirror-nav"`): row 1 mirrors the 6 nav labels in
nav order, then "Shelved in the library: Plugins · Docs" for the demoted pages;
rows 2–4 are the three `content.json` columns with **verbatim** labels (including
`License (MPL-2.0)`), then the Steady Gaze utility row.

## 3. Home section order

| Old (2026-07-04)       | New (kit `homepage_narrative.sections[]`)                                         |
| ---------------------- | --------------------------------------------------------------------------------- |
| 1 `.hero`              | 1 `#dome-rising` `.hero` — copy_overlay.hero + visitor_paths fork (weight hero)   |
| 2 `.pitch`             | 2 `#the-instruments` `.features-overview` — feature_casting (major)               |
| 3 `.features-overview` | 3 `#why-stardust` `.pitch` — story + pitch_bullets as atlas entries (major)       |
| 4 `.cta-banner`        | 4 `#proven-path` `.proof-band` — proof_strategy placard (minor)                   |
|                        | 5 `#chart-course` `.cta-banner` — conversion_funnel ladder + install line (major) |

Note the swap: features now precede the value props, because the kit's arc is
story-first and its `sections[]` puts `feature_casting` at position 2.

## 4. Carry-forward from the old site

- `css/base.css` token block (all 14 `design_tokens.color` + spacing/radius/shadow/animation) — unchanged.
- The generated `vendor-fonts` `@font-face` block (13 faces: Playfair Display 700/900, Lora 400/500/600, Jost 300/400/500/600, DM Mono 400/500, IM Fell English 400) — all resolve to `shared/assets/fonts/`; no escalation needed.
- `img/logo.svg` (dome arc + meridian ring + six-point star + Playfair wordmark) and `img/favicon.svg` — on-brand per `logo_rules`; kept.
- `img/og.svg` as the editable source; `og.png` re-rasterised via `tools/gen-og.mjs`.
- The star-field/nebula-bloom hero background technique and the `.reveal` IntersectionObserver pattern — but the reveal now animates **position only**, never opacity, so no section is ever blank to a visitor who lands mid-document.
- Canonical class names (`.hero`, `.pitch`, `.features-overview`, `.cta-banner`, `.page-header`, `.content-section`, `.feature-card`, `.client-card`, `.download-card`, `.code-block`, `.faq-list`, `.badge`, `.client-status`).

**Fact defects in the old site, fixed here:** it stated the licence as
`BSD-3-Clause` in the footer copy, the footer link label, and the home JSON-LD
(`opensource.org/licenses/BSD-3-Clause`), and linked a non-existent repo
`github.com/phlix-website/blob/master/LICENSE`. `content.json` is the authority:
Server + Hub are **MPL-2.0**, shared libraries/plugins/clients are **MIT**. The
API-reference href is also corrected to the `content.json` value. The duplicated
`rel` attribute previously fixed on `download.html` is not reintroduced.

## 5. Ambiguities resolved (§19.6 rules)

1. **`error_page_experience` says "schema-only … intentionally OUT OF SCOPE"** while
   `new_site.md` §2A now says a real `404.html` is **required** (the root shim
   exists). The kit comment is stale documentation, not a design field →
   shipped the 404. Also fixed its copy: the concept's "This coordinates don't
   exist" is ungrammatical, so the page uses the alternative it offers, "The dome
   sees nothing here" (concept is a brief, not display copy).
2. **`proof_strategy` "5 native client platforms"** vs `content.json`: there are
   5 clients but one is "Any DLNA device" (not native) and Mobile is `beta`.
   Field-vs-fact → **content.json wins**: the placard reads "Four native clients
   — Roku, Samsung Tizen, Windows, Mobile (beta) — plus any DLNA device."
   Its `github` signal asks for "star count, and issue count (never hard-coded,
   always live)"; a static page cannot fetch them, and §19.7 forbids printing a
   number it cannot verify → linked `/stargazers` and `/issues` instead.
3. **`accessibility.minimum_contrast` claims gold on navy is ~4.8:1** (i.e. large
   text only). Measured it is **7.61:1** — the kit _understates_ it. §12/§19.1:
   measurement governs, so gold is used for small UI text on navy and indigo
   (6.90:1). Derived small-text mixes of the kit's own pigments (documented in
   `SITE.md`): violet `#A38DB4` (5.28:1 on indigo) since pure `#7B5EA7` is only
   3.00:1; info `#79A0D2` (5.84:1) since `#3A7BD5` is 3.74:1; success `#8EB795`;
   brass-for-text `#B98C40` since `#B07D3A` is 4.39:1 on indigo. Pure violet,
   brass and `#7A5C2A` remain in use for glows, rules and borders only, and
   interactive borders use brass `#B07D3A` (4.84:1 on navy ≥ 3:1).
4. **`copy_overlay.hero.secondary_cta` = "Read How"** but the destination is the
   external docs site → §19.7: the visible label is "Read How (the docs)" so the
   accessible name matches the destination.
5. **`hero_experience.spec` asks for a dome-motor sound.** Unprompted audio is a
   WCAG 1.4.2 problem and needs a user gesture in every modern browser →
   implemented as motion + an `aria-label` on the dome mechanism, no audio. §12
   wins over a field.
6. **`mascot.behavior.tips` includes `download:.clients`** and
   `home:.features-overview`; my download page uses `.download-cards` inside a
   `#clients` stage and the home features section keeps the canonical
   `.features-overview` class, so both selectors are honoured literally.
7. **`page_blueprints.download` calls the install "the main achievement"** while
   `conversion_funnel.cta_ladder` step 3 targets `download#server`. Both point at
   the same anchor; `#server` is the stage id.
8. **Orchestrator pre-flight named the home section ids as `void-opens`,
   `stellar-catalog`, `why-launch`, `past-missions`, `ignition`.** Those ids are
   not in this kit and `tools/selfcheck.mjs` check 9 reads the ids out of
   `brand-kits/stardust-observatory.js` itself, so the authoritative set is
   `dome-rising`/`the-instruments`/`why-stardust`/`proven-path`/`chart-course`,
   which is what shipped (verified by a green selfcheck).

## 6. Escalations (shared changes I did **not** make)

- None required. All five families (Playfair Display, Lora, Jost, DM Mono, IM
  Fell English) are already vendored in `shared/assets/fonts/`.
- Observation only, for the orchestrator: `shared/content.json.meta.og_image` is
  `/img/og.svg` — an SVG and a root-absolute path, both of which every site must
  override locally to satisfy `check-meta` rule 5 / §19.5. Worth fixing centrally
  at some point; not touched here.
