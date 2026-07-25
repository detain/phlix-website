# REGEN_PLAN — stardust-observatory

Archetype: **narrative-scroll** (declared in `experience_archetype`).
Kit declares **all 21** §2A experience fields. Nothing is absent; only three
sub-fields are empty/null: `site_architecture.extra_pages: []` (no extra pages),
`feature_casting.omit_from_home: []` (nothing suppressed),
`navigation_model.keyboard: null` (no exotic key model → pointer/tab only).

## 1. Experience fields — old site → new site

| Field                   | Old site (2026-07-04)                                               | This regeneration                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| ----------------------- | ------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `experience_archetype`  | "immersive" (guessed in theme.css comment)                          | narrative-scroll: home is a 5-beat descent, each beat separated by an atlas page-turn rule.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `site_architecture`     | generic 8-link nav (Home…About) + nav-cta "Download"                | 6 kit-labelled nav items in kit order; `plugins`/`docs` demoted to the footer's "Shelved in the library" row; `plugins` also folded into `features.html#advanced-apertures` per `fold_into` (its atlas plate there keeps `id="plugins"`). Footer = mirror-nav row + the 3 verbatim `content.json` columns. Separate `.nav-cta` removed (the two `emphasis:"primary"` items are the CTA).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `homepage_narrative`    | hero / pitch / features / cta (4 generic sections, no ids)          | 5 sections, ids **exactly** `dome-rising`, `the-instruments`, `why-stardust`, `proven-path`, `chart-course`, in that order (selfcheck check 9 reads them from the kit). `logline` used as the hero aside; arc = story-first.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `page_blueprints`       | none of the 4 templates realised                                    | features → **atlas-gallery** (engraved plates, 2-up); clients → **viewing-rooms** (chamber cards w/ furnishing list); download → **expedition-guide** (3 numbered stages); about → **scholar-study** (Philosophy/License/Contributing rooms → hearth FAQ). The field names only those four; the three pages it is silent about (hub, docs, plugins) get a motif of the site's own invention rather than plain prose — hub a **sight line** of three signal stations on a dashed meridian rail, docs a **reading index** with brass dot leaders, plugins a **lens bench** of three ground lenses. §19.9 means absence is not a defect; it does not mean those pages may read thinner.                                                                                                                                                                                                                                                                       |
| `copy_overlay`          | ignored (used kit taglines ad-hoc)                                  | hero eyebrow/headline/sub + both CTA labels, `section_headings.pitch/features/cta_banner`, and `footer_tagline` all taken from the overlay verbatim.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `feature_casting`       | flat 8-card grid                                                    | home: `hero[]` library+syncplay as two large atlas plates headlined by their `angle`; `support[]` transcode/auth/hub as a 3-up plate row; `footnote[]` livetv/dlna/plugins **not on home** — they appear on `features.html` only. All 8 on features.html. The casting is now shown to the visitor as a plate **classification mark** — "Principal instrument" / "Supporting instrument" / "Deep-sky work" — rendered with the kit's `badges` component and its `badges.colors` mapping (gold / brass / violet). Round 1 found the raw field vocabulary printing as "cast: hero instrument"; that string is gone, and the three previously-dead `.badge-*` rules are now the thing that carries it.                                                                                                                                                                                                                                                         |
| `copy_treatments`       | plain `<ul>`, plain `<dl>`, plain cards, plain list                 | pitch_bullets → `atlas-entries` (ruled journal entries, gold entry numbers); faq → `meridian-letters` (letter cards from Meridian); clients → `viewing-room-gallery`; ecosystem → `scholar-library` (shelf of spines).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `faq_experience`        | 6 FAQs in `content.json` order                                      | reordered `like-plex, expose-internet, formats, mobile-app, plugins, license`; framed as letters answered by Meridian; 3 `extra_questions` rendered as additional visitor letters that route to their `maps_to` canonical answer (answers unchanged).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `persona_vignettes`     | unused                                                              | 3 vignettes seed (a) the surfaces drawn in `img/PROMPTS.md`, (b) an "Three nights at the observatory" strip on `clients.html` naming each vignette's `features_shown`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `hero_experience`       | static hero, star-field animation only                              | `guided-reveal`: inline SVG dome whose halves part on intersection (`.is-open`), Meridian's core brightens; headline + both CTAs are in static markup and visible with JS off / reduced motion (the `fallback`). ~1.6 KB of the 4 KB budget. No audio (see §5).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `navigation_model`      | generic topbar                                                      | topbar per spec: Playfair wordmark, constellation-line divider, Jost items, active item gold-underlined + glow. Fallback IS the semantic `<nav><ul>`, and the ≤900px hamburger is **CSS-only** — a focusable `.nav-check` checkbox carrying the accessible name plus `:checked ~ .nav-menu`, so the nav works with scripting off (round 1: the JS-class version left it unreachable below 900px). JS adds only click-outside and Esc-to-close.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `scroll_experience`     | none                                                                | `continuous-with-bookmarks`: a `.page-turn` constellation rule between home sections; a one-shot parchment wipe fires on intersection; fully off under reduced-motion / Steady Gaze.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `easter_eggs`           | none                                                                | all 3, and each one's `reward_copy` actually renders: logo-clicks:5 (sparkles + "The dome is aligned perfectly…", auto-fade 5 s, Esc clears), typed-word `aperture` (highlights the word, Meridian tilts, **and shows "Precision words bring precision sight." in the same `.egg-reward` surface** — round 1 found it highlighting and then timing out silently; listener ignores inputs/textarea/contenteditable, never `preventDefault`, Esc exits), scroll-past-footer whisper (`reward_copy: null`, the whisper itself is the effect — now 20px so it clears both AA and the kit's IM Fell floor).                                                                                                                                                                                                                                                                                                                                                     |
| `conversion_funnel`     | one "Begin your watch" button, repeated                             | `guided-steps` ladder: 1 **Open Your Dome** → download.html, 2 **Choose Your Viewing Room** → clients.html, 3 **Chart the Zenith (setup)** → download.html#server; download page opens with the `download_opening` expedition header.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `proof_strategy`        | none                                                                | new `proven-path` band between features and the closing CTA: brass placard of spec-numbers (facts only), an "observatory archive" row linking the real repo/stargazers/issues **without printing counts**, and one engraved principle quoted from `content.json`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `visitor_paths`         | none                                                                | fork inside `dome-rising` under the CTAs: 3 paths → `features.html#library`, `features.html#syncplay`, `plugins.html`; each names its `emphasis` feature ids.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `complexity_profile`    | unbounded prose                                                     | 5 home sections (≤6 ✓); authored prose ≤120 words/section (verbatim `content.json` facts exempt per §19.6). Round 1 measured `#proven-path` at 139 authored words — over the cap, because the placard's six `<dd>` are re-voiced rather than quoted, so the exemption did not cover them. Tightened to **103** (measured with the verbatim `pitch_bullets[0]` blockquote excluded) with every fact intact; the other four beats were already inside the cap. `jargon_policy: translate` → plain term first, precise term inside a `<details>` ("the precise term") on aperture/NTP/HLS/reverse-tunnel.                                                                                                                                                                                                                                                                                                                                                     |
| `intensity_toggle`      | none                                                                | "Steady Gaze" `<button aria-pressed>` in a new footer utility row; sets `data-intensity="steady"` on `<html>`, persisted in localStorage; kills dome motion, page-turns, star breath, mascot idle. **Not fixed** (kit places it in the footer).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `mascot.behavior`       | mascot not on the site at all                                       | Meridian companion on **home, features, download only**; bottom-right above 768px, bottom-left at or below it (the §19.14 boundary in both CSS and JS, re-read on `change` so 601–767px is no longer auto-pushed and a rotation re-evaluates); CSS ring idle (off under reduced-motion/Steady Gaze); 5 `tips` bound to the kit's own selectors — a tip target **stays observed until it has been spoken** and arrival re-checks what is on screen, because `home:#hero` intersects at load and would otherwise never fire; both `easter_interactions` (click:5 nova, hover-hold:2s tooltip); "Meridian, to the observatory" dismiss persisted in localStorage. Per §19.11 it **arrives only after the first scroll, tap or keystroke** and is `hidden` **in the markup**, so with JS off it is absent rather than two focusable no-op buttons. The bubble is un-hidden before its text is written, so the live region is in the a11y tree when it changes. |
| `seasonal_activation`   | variants documented in SITE.md only                                 | `live-js` date-gate: inside an `active_range` it sets the variant's token overrides on `<html>`, un-`hidden`s the `banner`, and swaps in the motif SVG. The 3 `motif_assets` are authored as real files in `img/seasonal/`. Out of range → nothing renders.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `error_page_experience` | 404 existed but generic ("The atlas has no page here") + no noindex | Rebuilt as the **Misaligned Telescope**: tilted refractor, star-less dome, Meridian beside it; "Recalibrate your bearings" recovery links = home/features/download; `robots noindex` added (the missing meta this kit was flagged for); relative assets only; no JS dependency.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |

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
- The generated `vendor-fonts` `@font-face` block — **12 faces** ship: Playfair Display 700/900, Lora 400/500/600, Jost 300/400/500/600, DM Mono 400/500, IM Fell English 400 — all resolving to `shared/assets/fonts/`. The generator emitted 15; three were removed because this kit does not declare them (Lora 700, Jost 700, and a DM Mono 700 whose `src` was `dm-mono-500-latin.woff2`). See §6 — the generator itself needs the fix.
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
   3.00:1; info `#79A0D2` (5.84:1) since `#3A7BD5` is 3.74:1; success `#8EB795`.
   kit-brief never measures tertiary/info/success as text, so those three are the
   correct §19.1 response. **Brass is the exception and round 1 was right about
   it:** kit-brief _does_ publish a canonical substitute for
   `--color-secondary #B07D3A` on `--color-surface`, so the private `#B98C40`
   derivation was replaced with **`#B2803E`** verbatim per §19.14 row 1 (4.54:1 on
   indigo, 5.01:1 on navy). It is deliberately not used on
   `--color-surface-alt #1E2E45`, where it measures 3.95:1 — kit-brief's
   substitute there is `#B98D52`, and nothing puts brass text on that surface.
   Pure violet, brass and `#7A5C2A` remain in use for glows, rules and borders
   only, and interactive borders use brass `#B07D3A` (4.84:1 on navy ≥ 3:1).
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

9. **`badges.labels` are app-surface labels** (4K, HDR, Dolby Vision, Continue
   Watching, New, Favorite, Rare) — printing them on a marketing page would claim
   library capabilities `content.json` does not state. But the `badges` component
   itself is a real design field, and three of its variants were rendering on
   nothing. Resolution: keep the kit's `badges.colors` **mapping** (gold for the
   principal pair, brass for the supporting three, violet for the deep-sky three)
   and give it honest labels drawn from the site's own vocabulary — which is also
   what re-voices the leaked `feature_casting` jargon. All three variants now sit
   on `.plate` (Observatory Indigo), measured 6.90 / 4.54 / 5.28:1.
10. **`docs.html` had four labelled links and two real URLs.** `content.json`
    supplies only the published root and `/reference/api.html`; the extra two
    labels ("Developer docs", "Hub admin") resolved to the root, so three
    different names pointed at one page. Two sibling kits solved this by inventing
    URLs, which is worse (§19.7). Resolution: link the two real destinations, and
    describe the three readings `content.json` names ("End-user, developer, and
    hub-admin docs") in the reading index as chapters inside the guide, with no
    link of their own.
11. **`hero_experience` clipping vs §19.13.** `.hero` carried
    `overflow: hidden` for the nebula/star-field decoration, on the box that also
    holds the h1, both CTAs and the visitor-path fork. The decoration moved into a
    `.hero-decor` wrapper that is the only clipping box, per §19.13's "clip
    decoration, not content".
12. **A media query read once at load never sees the visitor change it (§19.20).**
    Both `prefers-reduced-motion` and the 768px companion boundary now carry
    `change` listeners; asking for calm mid-session settles the dome open and every
    reveal in place rather than leaving either stranded.
13. **Heading depth where a group label is `.sr-only` (§19.16).** On
    `download.html` and `about.html` the group heading is a screen-reader-only
    label ("The three stages", "The study"), which made it look as though the
    members could stay at the label's level. They cannot — but the group is
    **three** levels deep, not two, so the fix is to demote two levels at once:
    the label stays `h2`, stage titles and study rooms become `h3`, and the
    `.download-card` / `.spine` titles nested inside a stage become `h4`. Demoting
    only the middle level would have put a stage title level with its own
    children, which is why a one-level fix reads as a dead end. Sizes are pinned
    at every level so nothing changes visually, and `.spine-body :is(h3, h4)`
    covers the spine on both `download.html` (h4, inside a stage) and
    `docs.html` / `plugins.html` (h3, directly under a section heading).

## 6. Escalations (shared changes I did **not** make)

- All five families (Playfair Display, Lora, Jost, DM Mono, IM Fell English) are
  already vendored in `shared/assets/fonts/`; no font file is missing.
- **`tools/vendor-fonts.mjs` over-emitted (round-1 escalation — raised here,
  since `tools/` is read-only to a site fixer; the orchestrator has since fixed the
  generator in `afe745d`, and it now produces exactly the 12 faces below).** For
  this kit it generated three `@font-face` rules the kit does not declare, because
  the shared pool was backfilled with a 700 for every prose role and the generator
  treated file existence as permission — and separately, it emitted a clamped
  weight at the _requested_ weight while pointing at a _different_ weight's file:
  - `Lora 700` — kit declares Lora `[400, 500, 600]`.
  - `Jost 700` — kit declares Jost `[300, 400, 500, 600]`.
  - `DM Mono 700` **pointing at `dm-mono-500-latin.woff2`** — a 700 declaration
    whose `src` is the 500 file lies to the font matcher, so every
    `font-weight: 700` on DM Mono silently rendered the 500 face. The kit declares
    DM Mono `[400, 500]`.
    All three were deleted from `css/base.css` inside the
    `vendor-fonts:begin/end` markers. The fixed generator intersects the pool
    with the kit's declared weights, so the deletion now survives a regeneration
    and the ⚠ comment in that block reads as history, not as a live warning.
- **Earlier note about `content.json.meta.og_image` was wrong and is withdrawn.**
  It claimed the value is `/img/og.svg` — root-absolute and an SVG. The actual
  value is **`img/og.png`**: already a PNG, already relative, and accompanied by
  an `og_image_note` that spells out the absolute-URL rule each site must apply
  when emitting the meta tag. This site's meta already emits the absolute
  `https://…/stardust-observatory/img/og.png` (1200×630 verified). Nothing to fix
  centrally, and nothing was escalated on this point.
