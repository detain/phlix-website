# REGEN_PLAN.md — swiss-modernist

Archetype (declared): **grid** (`experience_archetype: "grid"`). Swiss / International
Typographic Style. The differentiator is that **the grid is the interface**: a visible
12-column guide field, numbered sections (`01`–`0n` in Barlow Condensed 900), a 2px Ink
Black rule opening every band, and spec-table / man-page content components instead of
generic prose cards.

## 1. Experience fields — declared → what changes

| Field                                      | Old site (2026-07-04)                                | This regen                                                                                                                                                                                                                                                                                                                                                          |
| ------------------------------------------ | ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `experience_archetype: grid`               | generic template; no visible grid                    | 12-col CSS grid at ≥1024px; visible 1px column guides on the hero + proof bands + 404, drawn as **12 real grid tracks inside `.container`** (measured 0px error against the content grid at 1024/1280/1440/1920/2560); asymmetric column spans, 2px rule per band                                                                                                   |
| `site_architecture.nav`                    | 8 plain links, no emphasis                           | 8 links as a **numbered signage index** (`01`–`08` in JetBrains Mono); `emphasis:primary` (Features, Download) = Inter 600 + 2px Ink Black rule; `muted` (Docs, About) = deep-gray 500                                                                                                                                                                              |
| `site_architecture.footer_arrangement`     | 3 content.json columns only                          | footer opens with a **mirror of the numbered nav** (all 8, same indices), then the 3 content.json columns verbatim                                                                                                                                                                                                                                                  |
| `homepage_narrative` (arc manifesto-first) | default hero → pitch → features → cta                | 5 sections in declared order: `manifesto`, `value-structure`, `features-grid`, `proof-placard`, `install-cta` (see §3)                                                                                                                                                                                                                                              |
| `page_blueprints.features`                 | 8 uniform cards                                      | 12-col grid, one `.feature-detail` per `features[]` id; card reads **12 / 24 / 18** below 1024px and **12 / 32 / 24** above it (label / `h3` title / Inter 500 body); 4px Basel Red top rule on `#library` only                                                                                                                                                     |
| `page_blueprints.clients`                  | cards with bullet list                               | 4-col card grid (5 cards, all `span 3` — row 2 carries one card and three empty columns), `.card-head` = `h3` name then `.client-status` badge on its own line over a **reserved 5.5rem head row** so all four spec tables in a row start on one baseline (measured 0px spread at 1024/1280/1400); body as a **spec table** (`copy_treatments.clients: spec-table`) |
| `page_blueprints.download`                 | server → clients → ecosystem, no rules               | same three blocks, each opened by a 2px Ink Black rule + numbered `01/02/03`; `#clients` anchor added for the CTA ladder; ecosystem as a repo-list `<dl>`                                                                                                                                                                                                           |
| `page_blueprints.about`                    | Philosophy/License/Contributing + plain FAQ dl       | three full-width blocks split by 2px rules; FAQ as a **man-page** two-column `<dl>` with `Name`/`Synopsis`/`Section` + `See also` mono labels, no accordion                                                                                                                                                                                                         |
| `copy_overlay.hero`                        | content.json verbatim                                | eyebrow "Structure. Precision. Control."; h1 "Your media. Grid. Logic."; subheadline → lead of `value-structure`; CTAs "Install" / "Read the spec"                                                                                                                                                                                                                  |
| `copy_overlay.section_headings`            | "Why Phlix?" / "Everything you need"                 | "Built on principle" / "The grid. Complete." / "Start now."                                                                                                                                                                                                                                                                                                         |
| `copy_overlay.footer_tagline`              | "Grid. Type. Truth."                                 | "Structure is everything."                                                                                                                                                                                                                                                                                                                                          |
| `feature_casting`                          | 8 identical cards                                    | Weighting expressed as **disclosure, not just box size**: on the home page the 2 hero casts carry `angle` + full body, the 4 support casts one clause each, the 2 `footnote[]` casts (plugins, hub) title only. Full `content.json` bodies for all 8 live on `features.html`. `library` + `auth` are **Ink Black inverted modules**                                 |
| `copy_treatments`                          | plain `<ul>` / `<dl>`                                | `pitch_bullets` → numbered **spec-rows**; `clients` → spec-table; `ecosystem` → repo-list; `faq` → man-page                                                                                                                                                                                                                                                         |
| `faq_experience`                           | content.json order, 6 items                          | order `like-plex, expose-internet, formats, mobile-app, plugins, license` (Q1–Q6) + 2 `extra_questions` as `SEE ALSO` aliases cross-linking the canonical answer                                                                                                                                                                                                    |
| `hero_experience` (static, 0 KB JS)        | static already                                       | unchanged-static; zero JS in the hero; `fallback` == active mode                                                                                                                                                                                                                                                                                                    |
| `navigation_model` (topbar)                | static topbar                                        | `position: sticky; top:0` with no transition ("snaps"); plain `<nav><ul>` fallback works with JS off; hamburger <768px                                                                                                                                                                                                                                              |
| `scroll_experience` (continuous)           | IntersectionObserver fade-ins + smooth-scroll hijack | **both removed** — plain continuous scroll; every band opens with a 2px Ink Black rule                                                                                                                                                                                                                                                                              |
| `easter_eggs[0]` logo-clicks:7             | absent                                               | 7 logo clicks → one 1s left-to-right 2px Basel Red sweep + `role="status"` reward "Grids on grids."; `Esc` cancels; gated by reduced-motion                                                                                                                                                                                                                         |
| `conversion_funnel` (instant-command)      | marketing-shaped download page                       | download opens on the one-line install command; ladder step 1 "Install" (hero) → step 2 "Pick your client" (`download.html#clients`)                                                                                                                                                                                                                                |
| `proof_strategy`                           | absent                                               | `#proof-placard` band "By the numbers": 4 spec numerals (Barlow 900) + 4px Basel Red bar under the lead metric, repo links (no printed counts), one quoted line                                                                                                                                                                                                     |
| `complexity_profile`                       | 4 home sections, marketing register                  | 5 home sections (cap = 5), technical register, jargon foregrounded (no plain-language translation layer)                                                                                                                                                                                                                                                            |
| `error_page_experience`                    | **no 404.html**                                      | new `404.html`: content block deliberately off-grid with a 2px Basel Red guide line at the correct column edge + mono `expected/actual` readout; recovery links home/features/download                                                                                                                                                                              |
| `persona_vignettes`                        | not used                                             | drives `img/PROMPTS.md` subjects (library grid, auth settings, plugin interface, media detail, transcode profiles) — no on-page vignette section (home cap is 5)                                                                                                                                                                                                    |
| `seasonal_activation: "documented"`        | not recorded                                         | recorded in `SITE.md` only; no date-gate JS                                                                                                                                                                                                                                                                                                                         |

Absent / `null` → **default behaviour, not a defect** (§19.9): `mascot.behavior` (kit has no
mascot, principled), `intensity_toggle`, `visitor_paths`, `site_architecture.demoted_pages`,
`site_architecture.extra_pages`, `navigation_model.keyboard`, `faq_experience.persona`,
`page_blueprints` for plugins/docs/hub — those three pages use the default three-numbered-section
structure. On `docs.html` that is **01 Where the docs live** (link-list), **02 Read in this order**
(`spec-rows` reading index), **03 Ecosystem** (a pointer to `download.html#ecosystem`, which owns
the five-repo `repo-list` — it is not printed on two indexable pages).

## 2. Nav diff

| #   | id       | label    | emphasis | rendering                                        |
| --- | -------- | -------- | -------- | ------------------------------------------------ |
| 01  | home     | Home     | default  | Inter 500 Ink Black                              |
| 02  | features | Features | primary  | Inter 600 + 2px Ink Black rule                   |
| 03  | clients  | Clients  | default  | Inter 500 Ink Black                              |
| 04  | download | Download | primary  | Inter 600 + 2px Ink Black rule                   |
| 05  | plugins  | Plugins  | default  | Inter 500 Ink Black                              |
| 06  | docs     | Docs     | muted    | Inter 500, `--color-gray-deep` (#5E5E5E, 6.09:1) |
| 07  | hub      | Hub      | default  | Inter 500 Ink Black                              |
| 08  | about    | About    | muted    | Inter 500, `--color-gray-deep`                   |

Order is the canonical order (the kit does not reorder); the **emphasis ladder and the
numeric index are the structural change**. No demotions, no `extra_pages`. Current page:
`aria-current="page"` + Inter 600 + 2px Ink Black bottom border. Docs links to `docs.html`
(consistent everywhere); the external docs site is linked from inside that page.

## 3. Home section order

| old (2026-07-04)     | new (`homepage_narrative.sections[]`) | source            | weight | realisation                                                                                                        |
| -------------------- | ------------------------------------- | ----------------- | ------ | ------------------------------------------------------------------------------------------------------------------ |
| `.hero`              | `#manifesto`                          | brand_dna         | hero   | eyebrow + h1 (overlay) + 4px Basel Red rule + one-sentence manifesto + Install / Read-the-spec + mono spec readout |
| `.pitch`             | `#value-structure`                    | copy_overlay.hero | major  | h2 "Built on principle", overlay subheadline as lead, 7 `pitch_bullets` as numbered spec-rows                      |
| `.features-overview` | `#features-grid`                      | feature_casting   | major  | h2 "The grid. Complete."; 2 inverted hero modules; 4 support modules; 2 footnote rows; "See all features"          |
| —                    | `#proof-placard`                      | proof_strategy    | minor  | "By the numbers" band — spec numerals, repo links, quoted line                                                     |
| `.cta-banner`        | `#install-cta`                        | conversion_funnel | major  | h2 "Start now." + single Basel Red "Get Phlix" + "Pick your client" step-2 link                                    |

5 sections = `complexity_profile.page_budget.home_sections_max: 5`.

## 4. Carry-forward from the old site

- Palette tokens and their names (`--color-*`, Grid White / Column White / Module Gray / Ink Black / Basel Red) — unchanged hexes.
- The generated `@font-face` block in `base.css` — **nine** faces: Inter 400/500/600/800/900, Barlow Condensed 800/900, JetBrains Mono 400/500 → `../../assets/fonts/…`; verified to resolve. The generator's backfilled `inter-700` and `jetbrains-mono-700` faces are deliberately removed (see §5.15 and §6).
- `img/logo.svg` (Inter Black wordmark + Basel Red underrule) — unchanged, it is a full-identity lockup.
- `img/favicon.svg` — **redrawn**: the predecessor set a Grid White "P" on a solid Basel Red field, which `logo_rules.colors` and `do_dont.branding.dont` both forbid. Now Grid White on Ink Black.
- The inline SVG wordmark used in the header (**minus** its 4px Basel Red underrule — `logo_rules.colors` allows that only in a full-identity lockup, "not in navigation"; viewBox tightened 34→30 so the mark is not letterboxed), and the 8 feature icon paths (re-declared stroke-only, mitered joins).
- `img/og.svg` composition (grid lines, oversized numeral, wordmark, red rule) — kept, with the stale `BSD-3-Clause` bottom bar corrected to the real licence split.
- Spacing / radius / shadow / typographic-scale token names.
- `SITE.md` colour + type tables (extended with the two derived mixes and the seasonal record).

Everything else (all 8 pages, `theme.css`, `components.css`, `js/main.js`) is rewritten.

## 5. Ambiguities resolved

1. **"Basel Red exactly once per view" vs. `page_generation_rules`** which asks for _both_ a
   4px Basel Red rule under the headline _and_ a Basel Red CTA. Read as one red **role** per
   view (the single most important element and the rule that anchors it), not one red region.
   Red therefore appears only as: headline rule, primary CTA, focus ring, the proof bar, the
   404 guide line, active-state marks. Never decorative, never on hover of ordinary text.
2. **`accessibility.minimum_contrast` claims Basel Red on Grid White is 4.6:1** — measured
   **4.43:1**, i.e. failing AA for small text (§19.1). Per §19.6 (a11y wins) the solid CTA
   fill uses a **derived mix of the kit's own red**, `#CC0018` (the kit's own
   `microinteractions.button_press` value) = **5.51:1** with Grid White text; hover/press
   `#B40015` = 6.68:1. Pure `#E8001C` is kept for rules, borders, focus ring and large
   display accents, which need only 3:1. Documented as mixes in `SITE.md`.
3. **Rule Gray `#888888` is specced for "metadata labels, placeholder text"** but measures
   **3.33:1** on Grid White — fine for rules and large numerals, failing for small text.
   Derived `--color-gray-deep: #5E5E5E` (Rule Gray mixed toward Ink Black, **6.09:1**) for
   all small secondary text; `#888888` retained for rules, dividers and the large section
   numerals. §19.6: §12 wins over a colour-usage note.
4. **`homepage_narrative.sections[2]` asks for "dark cards"; `do_dont.colors.dont` says
   "no dark backgrounds anywhere".** §19.6: the more specific field wins for its own
   concern, so the two hero features are Ink Black **modules** (not a dark page), which
   `logo_rules.colors` already sanctions ("On dark surfaces: Grid White wordmark on Ink
   Black"). Grid White on Ink Black = 17.0:1.
5. **`feature_casting.footnote` ("Features page only" per §2A) vs. the narrative's
   "remaining six features … below".** Both honoured: all 6 non-hero features appear on the
   home page, but `plugins` and `hub` render as compact **footnote rows** below the four
   support modules — present, at footnote weight. Every feature still appears somewhere.
6. **`proof_strategy` wants a "live star count and issue count"** — §19.7 forbids printing
   an unverifiable number on a static page. Realised as labelled links to
   `/stargazers` and `/issues` with no figure printed.
7. **`proof_strategy` wants a docs quote "attributed to docs.phlix".** No such verbatim line
   exists in a source I can verify, and inventing an attribution is a fabrication (§19.7).
   The quoted line is taken **verbatim from `content.json.pitch_bullets[0]`** and attributed
   to the Phlix project with a link to the docs site.
8. **CTA label conflict: `copy_overlay.hero.primary_cta` = "Install" and `cta_ladder` step 1
   = "Install", but `homepage_narrative` `install-cta` says the button reads "Get Phlix".**
   Each field governs its own slot: hero CTA = "Install" (ladder step 1), closing band =
   "Get Phlix". No blending.
9. **`copy_overlay.hero.secondary_cta` = "Read the spec" but the href is the docs site.**
   Per §19.7 the accessible name must match the destination, so the label carries a signage
   sub-label: "Read the spec — phlix-docs".
10. **Licence.** The old site said `BSD-3-Clause` in four places (footer, CTA band, JSON-LD,
    og.svg). `content.json` wins on facts: Server + Hub **MPL-2.0**, shared libraries,
    plugins and clients **MIT**. Never stated as one licence across the board (§16).
11. **`copy_overlay.hero.headline`** once read "Your media. Grid. Grid. Logic." The doubled
    "Grid." was a slip in the kit and has since been corrected upstream; the site ships
    "Your media. Grid. Logic." (`index.html`, `<title>`, OG/Twitter, `img/og.svg`,
    `img/logo.svg`, `sitemap.xml`).
12. **`page_blueprints.features` specifies a 24px Inter 500 body.** Honoured at ≥1024px;
    18px below it (both on the kit's strict scale) so the 12-column grid still holds at
    320px without overflow. The **title steps with it** — `--text-2xl` (32px) at ≥1024px —
    because a 24px title over a 24px body is not a hierarchy (`page_generation_rules` #7).
13. **The old `01` hero numeral rendered at 1.19:1** (invisible watermark) and
    `render-check` fails it. Treated as a **defect, not a watermark**: numerals are the
    Swiss section-index device and are meant to be read, so they are now real numbered
    section indices inside their own heading at Rule Gray `#888888` = **3.33:1**, clearing
    3:1 as large graphical text. Nothing is `aria-hidden` to dodge the check.
14. **`typography_rules` demands a strict px scale; §12/§14 demand 200%-zoom reflow.** Body,
    UI and mono type use `rem` steps that land exactly on the scale at the default root
    size; display type uses `min(<scale step>, <vw>)` so the scale holds at desktop while
    320px and 200% text zoom cannot overflow.
15. **Inter 700 exists in the shared pool but is not declared by this kit.** `fonts{}` gives
    Inter as headline [800,900], body [400,500], ui [500,600] — the family's declared union
    is **400/500/600/800/900** and 700 appears in no role. The pool was backfilled with a 700
    face for every prose family, but presence in the pool is not permission. So: `strong`/`b`
    are **600** (a 200-unit step from the 400 body, and the kit's own `ui` emphasis weight),
    the two nav emphasis rules that used 700 are now 600, and the `inter-700` and
    `jetbrains-mono-700` `@font-face` blocks are **removed** (JetBrains Mono is declared
    [400,500], so its 700 was undeclared for the same reason). Nine faces ship.
16. **`microinteractions.hover` ("2px Basel Red on the left edge over 80ms linear") vs.
    `do_dont.animation.dont` ("animate colour or shadow properties").** §19.6: the more
    specific field wins for its own concern, so `.module`, `.feature-detail`, `.client-card`
    and `.download-card` carry `transition: box-shadow var(--motion-snap)`. Nothing else
    animates a shadow.
17. **Five cards on a 12-column grid.** The fifth card previously spanned 12, which left
    ~1000px of dead measure carrying ~200px of content and destroyed the five-way comparison
    the grid exists to support. All five are now `span 3`; row 2 is one card and three empty
    columns, which is the asymmetry `do_dont.layout.do` asks for.
18. **`overflow-wrap: anywhere` covers body-weight text only; display roles are excluded.**
    Only `anywhere` reduces min-content size, so it stays on `p`, `li`, `dt`, `dd`, `a`, `span`,
    `code`, `kbd`, `samp`, `pre`. It is **off** for `h1`–`h6` and `blockquote`, which get
    `hyphens: auto` + `overflow-wrap: break-word` instead: the break is marked where English
    allows it rather than being an unmarked mid-word chop in oversized Inter Black, and because
    `break-word` leaves min-content intact a genuine track-sizing bug behind a heading still
    surfaces as overflow rather than being silently absorbed. Verified by measurement that no
    heading overflows its box at 320px / 200% zoom on any of the nine pages.

    Confining `anywhere` further — to `code` plus the spec/repo `<dd>`s, as round-1 F9 proposed —
    was tried and **fails**: all nine pages then overflow at 320px / 200% zoom (343–389 > 320).
    The real offenders are narrow grid tracks holding ordinary body copy — `.spec-rows`
    (`transcoding,` in a 164px track), `.footer-mirror` (`Features` in a 132px column),
    `.link-list` and `.feature-detail` — not code strings. Long PHP identifiers in prose
    (`LifecycleInterface`) are nonetheless marked up as `<code>`, which is the semantically
    correct element regardless.

## 6. Escalations (shared changes I did **not** make)

- **`tools/vendor-fonts.mjs` backfills a 700 face for every prose family.** For this kit that
  emits `inter-700` and `jetbrains-mono-700`, neither of which the kit declares (§5.15). Both
  blocks have been removed from `sites/swiss-modernist/css/base.css` by hand, inside the
  `vendor-fonts:begin/end` markers — **re-running the generator will put them back.** The
  generator should intersect the pool with the kit's declared per-family weight union rather
  than backfilling. Not fixed here: `tools/**` is read-only.
- **No `manifest.webmanifest` and an SVG-only favicon set** (no 16/32/180/192/512 PNGs). This
  is the shared baseline for the programme rather than a per-site regression, so it is an
  orchestrator decision; raised, not patched. (`copper-steampunk` does ship one.)
- Untouched by design: `shared/**`, `tools/**`, `package.json`, `new_site.md`, root
  `index.html` / `404.html`.
