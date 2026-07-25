# REGEN_PLAN.md — swiss-modernist

Archetype (declared): **grid** (`experience_archetype: "grid"`). Swiss / International
Typographic Style. The differentiator is that **the grid is the interface**: a visible
12-column guide field, numbered sections (`01`–`0n` in Barlow Condensed 900), a 2px Ink
Black rule opening every band, and spec-table / man-page content components instead of
generic prose cards.

## 1. Experience fields — declared → what changes

| Field                                      | Old site (2026-07-04)                                | This regen                                                                                                                                                                                   |
| ------------------------------------------ | ---------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `experience_archetype: grid`               | generic template; no visible grid                    | 12-col CSS grid at ≥1024px, visible 1px column guides on the hero + proof bands, asymmetric column spans, 2px rule per band                                                                  |
| `site_architecture.nav`                    | 8 plain links, no emphasis                           | 8 links as a **numbered signage index** (`01`–`08` in JetBrains Mono); `emphasis:primary` (Features, Download) = Inter 700 + 2px Ink Black top rule; `muted` (Docs, About) = deep-gray 500   |
| `site_architecture.footer_arrangement`     | 3 content.json columns only                          | footer opens with a **mirror of the numbered nav** (all 8, same indices), then the 3 content.json columns verbatim                                                                           |
| `homepage_narrative` (arc manifesto-first) | default hero → pitch → features → cta                | 5 sections in declared order: `manifesto`, `value-structure`, `features-grid`, `proof-placard`, `install-cta` (see §3)                                                                       |
| `page_blueprints.features`                 | 8 uniform cards                                      | 12-col grid, one `.feature-detail` per `features[]` id, 18px→24px Inter 500 body, 4px Basel Red top rule on `#library` only                                                                  |
| `page_blueprints.clients`                  | cards with bullet list                               | 4-col card grid (5 cards), `h3` name + `.client-status` badge, body rendered as a **spec table** (`copy_treatments.clients: spec-table`)                                                     |
| `page_blueprints.download`                 | server → clients → ecosystem, no rules               | same three blocks, each opened by a 2px Ink Black rule + numbered `01/02/03`; `#clients` anchor added for the CTA ladder; ecosystem as a repo-list `<dl>`                                    |
| `page_blueprints.about`                    | Philosophy/License/Contributing + plain FAQ dl       | three full-width blocks split by 2px rules; FAQ as a **man-page** two-column `<dl>` with `NAME`/`SYNOPSIS`/`QUESTIONS`/`SEE ALSO` mono labels, no accordion                                  |
| `copy_overlay.hero`                        | content.json verbatim                                | eyebrow "Structure. Precision. Control."; h1 "Your media. Grid. Grid. Logic."; subheadline → lead of `value-structure`; CTAs "Install" / "Read the spec"                                     |
| `copy_overlay.section_headings`            | "Why Phlix?" / "Everything you need"                 | "Built on principle" / "The grid. Complete." / "Start now."                                                                                                                                  |
| `copy_overlay.footer_tagline`              | "Grid. Type. Truth."                                 | "Structure is everything."                                                                                                                                                                   |
| `feature_casting`                          | 8 identical cards                                    | `library` + `auth` as **Ink Black inverted modules** with their `angle` as the voiced headline; `support[]` 4 as Module Gray modules; `footnote[]` (plugins, hub) as 2 compact footnote rows |
| `copy_treatments`                          | plain `<ul>` / `<dl>`                                | `pitch_bullets` → numbered **spec-rows**; `clients` → spec-table; `ecosystem` → repo-list; `faq` → man-page                                                                                  |
| `faq_experience`                           | content.json order, 6 items                          | order `like-plex, expose-internet, formats, mobile-app, plugins, license` (Q1–Q6) + 2 `extra_questions` as `SEE ALSO` aliases cross-linking the canonical answer                             |
| `hero_experience` (static, 0 KB JS)        | static already                                       | unchanged-static; zero JS in the hero; `fallback` == active mode                                                                                                                             |
| `navigation_model` (topbar)                | static topbar                                        | `position: sticky; top:0` with no transition ("snaps"); plain `<nav><ul>` fallback works with JS off; hamburger <768px                                                                       |
| `scroll_experience` (continuous)           | IntersectionObserver fade-ins + smooth-scroll hijack | **both removed** — plain continuous scroll; every band opens with a 2px Ink Black rule                                                                                                       |
| `easter_eggs[0]` logo-clicks:7             | absent                                               | 7 logo clicks → one 1s left-to-right 2px Basel Red sweep + `role="status"` reward "Grids on grids."; `Esc` cancels; gated by reduced-motion                                                  |
| `conversion_funnel` (instant-command)      | marketing-shaped download page                       | download opens on the one-line install command; ladder step 1 "Install" (hero) → step 2 "Pick your client" (`download.html#clients`)                                                         |
| `proof_strategy`                           | absent                                               | `#proof-placard` band "By the numbers": 4 spec numerals (Barlow 900) + 4px Basel Red bar under the lead metric, repo links (no printed counts), one quoted line                              |
| `complexity_profile`                       | 4 home sections, marketing register                  | 5 home sections (cap = 5), technical register, jargon foregrounded (no plain-language translation layer)                                                                                     |
| `error_page_experience`                    | **no 404.html**                                      | new `404.html`: content block deliberately off-grid with a 2px Basel Red guide line at the correct column edge + mono `expected/actual` readout; recovery links home/features/download       |
| `persona_vignettes`                        | not used                                             | drives `img/PROMPTS.md` subjects (library grid, auth settings, plugin interface, media detail, transcode profiles) — no on-page vignette section (home cap is 5)                             |
| `seasonal_activation: "documented"`        | not recorded                                         | recorded in `SITE.md` only; no date-gate JS                                                                                                                                                  |

Absent / `null` → **default behaviour, not a defect** (§19.9): `mascot.behavior` (kit has no
mascot, principled), `intensity_toggle`, `visitor_paths`, `site_architecture.demoted_pages`,
`site_architecture.extra_pages`, `navigation_model.keyboard`, `faq_experience.persona`,
`page_blueprints` for plugins/docs/hub (→ §3.5/3.6/3.7 default structure).

## 2. Nav diff

| #   | id       | label    | emphasis | rendering                                    |
| --- | -------- | -------- | -------- | -------------------------------------------- |
| 01  | home     | Home     | default  | Inter 500 Ink Black                          |
| 02  | features | Features | primary  | Inter 700 + 2px Ink Black top rule           |
| 03  | clients  | Clients  | default  | Inter 500 Ink Black                          |
| 04  | download | Download | primary  | Inter 700 + 2px Ink Black top rule           |
| 05  | plugins  | Plugins  | default  | Inter 500 Ink Black                          |
| 06  | docs     | Docs     | muted    | Inter 500, `--color-gray-deep` (#666, 5.4:1) |
| 07  | hub      | Hub      | default  | Inter 500 Ink Black                          |
| 08  | about    | About    | muted    | Inter 500, `--color-gray-deep`               |

Order is the canonical order (the kit does not reorder); the **emphasis ladder and the
numeric index are the structural change**. No demotions, no `extra_pages`. Current page:
`aria-current="page"` + Inter 700 + 2px Ink Black bottom border. Docs links to `docs.html`
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
- The generated `@font-face` block in `base.css` (Inter 400/500/600/800/900, Barlow Condensed 800/900, JetBrains Mono 400/500 → `../../assets/fonts/…`) — verified to resolve; not re-derived.
- `img/logo.svg` (Inter Black wordmark + Basel Red underrule) and `img/favicon.svg` — unchanged.
- The inline SVG wordmark used in the header, and the 8 feature icon paths (re-declared stroke-only, mitered joins).
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
   Derived `--color-gray-deep: #666666` (Rule Gray mixed toward Ink Black, **5.39:1**) for
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
11. **`copy_overlay.hero.headline` reads "Your media. Grid. Grid. Logic."** — "Grid." twice
    looks like a slip in the kit, but `copy_overlay` is the declared authority for
    presentation copy, so it ships **verbatim**. Flagged for the reviewer rather than
    silently "fixed".
12. **`page_blueprints.features` specifies a 24px Inter 500 body.** Honoured at ≥1024px;
    18px below it (both on the kit's strict scale) so the 12-column grid still holds at
    320px without overflow.
13. **The old `01` hero numeral rendered at 1.19:1** (invisible watermark) and
    `render-check` fails it. Treated as a **defect, not a watermark**: numerals are the
    Swiss section-index device and are meant to be read, so they are now real numbered
    section indices inside their own heading at Rule Gray `#888888` = **3.33:1**, clearing
    3:1 as large graphical text. Nothing is `aria-hidden` to dodge the check.
14. **`typography_rules` demands a strict px scale; §12/§14 demand 200%-zoom reflow.** Body,
    UI and mono type use `rem` steps that land exactly on the scale at the default root
    size; display type uses `min(<scale step>, <vw>)` so the scale holds at desktop while
    320px and 200% text zoom cannot overflow.

## 6. Escalations (shared changes I did **not** make)

- None required. All three families (Inter, Barlow Condensed, JetBrains Mono) are already in
  `shared/assets/fonts/`. The `inter-700` gap raised here has since been **fixed** by the
  orchestrator: 700 is vendored for every `body`/`ui`/`mono` family, and `strong`/`b` on this
  site are now `font-weight: 700`.
- Untouched by design: `shared/**`, `tools/**`, `package.json`, `new_site.md`, root
  `index.html` / `404.html`.
