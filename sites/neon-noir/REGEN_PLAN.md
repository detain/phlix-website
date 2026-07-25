# Neon Noir — Regeneration Plan

Kit: `brand-kits/neon-noir.js` (base kit, schema 2.1)
Declared archetype: **`narrative-scroll`** (`experience_archetype`) — replaces the old
site's "immersive" guess.
Personality: Outlaw archetype; terse, atmospheric, cinematic, wry.

---

## 1. Experience fields — old → new

| Field                   | Old site (2026-07-04)                                  | This regeneration                                                                                                                                                                                                                                           |
| ----------------------- | ------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `experience_archetype`  | ignored; generic 4-section home                        | `narrative-scroll`: home is an ordered 5-beat case narrative, each beat a "cut" into frame                                                                                                                                                                  |
| `site_architecture`     | ignored; 8 canonical nav labels                        | 6 kit nav labels in kit order + canonical page name as a second-line gloss; `plugins`+`docs` demoted to the footer index; `footer_arrangement: mirror-nav` → footer opens with a case index mirroring the nav                                               |
| `homepage_narrative`    | ignored; hero / pitch / features-overview / cta-banner | 5 sections, kit ids + kit order: `#opener` `#case-brief` `#lead-cases` `#trust-play` `#closing-act`; framed by `logline`; `arc: story-first`                                                                                                                |
| `page_blueprints`       | ignored; all pages generic §3                          | features → **evidence-board** (pinned photos, serials, Lux notes); clients → **network-map** (cyan spine + nodes); download → **interrogation** (briefing room / clearance token / field agents / toolkit); about → **case-closed** (chapters + transcript) |
| `copy_overlay`          | partial (only `tagline_secondary` in the CTA banner)   | hero eyebrow/headline/subheadline/both CTA labels, all 3 `section_headings`, `footer_tagline`                                                                                                                                                               |
| `feature_casting`       | ignored; all 8 features on home                        | home = 2 hero cards (syncplay, library) with `angle` as the voiced headline + 4 support cards; `footnote[]` (dlna, plugins) on Features only; all 8 still appear on Features                                                                                |
| `copy_treatments`       | ignored                                                | pitch_bullets → `noir-scrolls` clue cards inside `#case-brief`; faq → `interrogation-transcript`; clients → `network-nodes`; ecosystem → `toolkit-dossier`                                                                                                  |
| `faq_experience`        | plain `<dl>` in content.json order                     | Lux transcript; `question_order` honoured (already = content.json order); 3 `extra_questions` rendered as additional `<dt>` sharing their canonical `<dd>` via `maps_to`                                                                                    |
| `hero_experience`       | static hero                                            | `playable-vignette`: neon sign cycles cyan→magenta→amber, Lux shifts pose, each pose surfaces one more lead line. All copy in markup; no-JS shows all leads at once (~2.1 KB of the 5 KB budget)                                                            |
| `navigation_model`      | topbar (close to spec by accident)                     | topbar per spec: Playfair wordmark, cyan links, active = cyan glow **+ amber marker + `aria-current`** (never colour alone); hamburger < 900px; nav works with JS off                                                                                       |
| `scroll_experience`     | generic fade-in `.reveal`                              | `cinematic`: venetian-blind wipe + one flicker per section boundary; removed entirely under reduced motion / calm mode                                                                                                                                      |
| `easter_eggs`           | absent                                                 | both wired: `logo-clicks:5` (cyan pulse + mono "NOIR", auto-clears 3 s, Esc) and `typed-word:shadow` (blind-bar sweep, Esc). No `preventDefault`, inert inside inputs                                                                                       |
| `conversion_funnel`     | single "Download Phlix" button                         | `instant-command`: 3-rung ladder in `#closing-act`; download page opens on `download_opening`; snippet is the single most prominent element                                                                                                                 |
| `proof_strategy`        | absent                                                 | `#trust-play` band: spec placard → repo/stargazers/issues links (no printed counts) → one case-file quote traced to `content.json`                                                                                                                          |
| `complexity_profile`    | ignored                                                | 5 home sections (cap 5); authored prose ≤120 words/section; `jargon_policy: translate` → plain "case note" line visible, precise terms preserved in a `<details>` decoder on Features                                                                       |
| `intensity_toggle`      | absent                                                 | footer utility row "lights-out" switch `Case closed (calm mode)`, default `full`, persisted; kills animation, glow, wipes, eggs                                                                                                                             |
| `mascot.behavior`       | mentioned in SITE.md, never built                      | Lux built on Home / Features / Download / About only; `<details>` tip (works with JS off), section-keyed tips, `click:3` + `hover-hold:3s` reactions, "Lux, take five" dismissal in localStorage                                                            |
| `seasonal_activation`   | absent                                                 | `live-js` date gate flips the 3 variants' override tokens + motif + banner; 3 motif SVGs shipped. Inactive on 2026-07-24 (all ranges are Oct / Dec–Jan / Feb)                                                                                               |
| `error_page_experience` | no `404.html` at all                                   | real 9th page: dead-end alley, burnt-out X, `FILE NOT FOUND` docket, 3 recovery links, `noindex`, relative assets only                                                                                                                                      |
| `persona_vignettes`     | absent                                                 | drives `img/PROMPTS.md` subjects + which surfaces are depicted (Midnight Collector → home art; Remote Access → hub art; Multi-Screen Night → clients art)                                                                                                   |
| `header_motif`          | claimed in SITE.md, not implemented                    | slow-scan neon flicker on the hero wordmark (gated on motion + calm mode)                                                                                                                                                                                   |

**Absent → default behaviour:** `visitor_paths` (`null` → single curated path, no
fork), `keyboard` inside `navigation_model` (`null` → no extra key model beyond Tab),
`extra_pages` (`[]` → exactly 8 canonical + `404.html`). Absence is not a defect (§19.9).

---

## 2. Nav diff

| #   | Old label | New label      | id       | emphasis | note                               |
| --- | --------- | -------------- | -------- | -------- | ---------------------------------- |
| 1   | Home      | The Case       | home     | default  | gloss "Home"                       |
| 2   | Features  | Evidence Files | features | primary  | amber marker                       |
| 3   | Clients   | The Network    | clients  | default  |                                    |
| 4   | Download  | Get Access     | download | primary  | amber marker                       |
| 5   | Hub       | Reach Anywhere | hub      | default  | moved up, was 7th                  |
| 6   | About     | Closed Cases   | about    | muted    | dimmed                             |
| —   | Plugins   | —              | plugins  | demoted  | footer index, folded into Features |
| —   | Docs      | —              | docs     | demoted  | footer index only                  |

`extra_pages: []` → no new pages. Page count stays 9 (8 canonical + `404.html`).
`footer_arrangement: mirror-nav` → footer starts with a "Case index" row mirroring
the nav order and naming both demoted pages, then the three canonical
`content.json` columns (labels verbatim, incl. `License (MPL-2.0)`).

---

## 3. Home section order

| #   | Old                  | New id         | source              | weight | contents                                                                                               |
| --- | -------------------- | -------------- | ------------------- | ------ | ------------------------------------------------------------------------------------------------------ |
| 1   | `.hero`              | `#opener`      | `copy_overlay.hero` | hero   | playable vignette, one `<h1>`, both CTAs, 3 lead lines                                                 |
| 2   | `.pitch`             | `#case-brief`  | `story`             | major  | problem/solution brief + all 7 `pitch_bullets` as noir-scroll clue cards ("Why Phlix solves the case") |
| 3   | `.features-overview` | `#lead-cases`  | `feature_casting`   | major  | "Evidence Files": 2 hero cards (angle headlines) + 4 support cards + link to Features                  |
| 4   | —                    | `#trust-play`  | `proof_strategy`    | minor  | spec placard, live repo links, one case-file quote                                                     |
| 5   | `.cta-banner`        | `#closing-act` | `conversion_funnel` | major  | "The pieces fit. Now get access." + 3-rung CTA ladder                                                  |

---

## 4. Carry-forward from the old site

- Palette tokens and names (all 14 `design_tokens.color` entries) — unchanged.
- `img/logo.svg`, `img/favicon.svg`, `img/og.svg` — kept as-is; `og.png` regenerated.
- Working `@font-face` block in `base.css` pointing at `../../assets/fonts/*.woff2`.
- The three kit gradients (Neon Horizon / Amber Interrogation / City Depth).
- Venetian-blind divider, neon-glow shadow, film-grain ideas from the old `SITE.md`.
- Feature icon geometry (1.5px stroke, sharp joins).

**Fixed from the old site:** the licence was stated as `BSD-3-Clause` in the footer,
the footer label, and the JSON-LD (`content.json` says MPL-2.0 for server + hub, MIT
for shared libs/plugins/clients — §16/§19.6 fact rule); the bare ` * @copyright` line
outside a comment in all three CSS files (§19.2); a dead inline `@font-face` block
using `local()` only, so **no** brand font actually loaded (§19.3); `API reference`
pointed at `/reference` instead of the `content.json` href; no `404.html`.

---

## 5. Ambiguities and how they were resolved

1. **"5 native clients" (`proof_strategy.signals[0]`) vs `content.json`.**
   `clients[]` has 5 entries but one is "Any DLNA device — no install required", which
   is not a native client. Placard reads **"Four native clients, plus any DLNA device"**.
   Rule: field vs `content.json` on a fact → `content.json` wins (§19.6).
2. **`proof_strategy.placement` ("between the hero and the feature overview") vs
   `homepage_narrative.sections[]` (trust-play is 4th, after lead-cases).**
   Rendered 4th. Rule: the structured field is the authority for order; the prose is
   a shape hint (§19.6). The band still reads as a calm field summary, per the prose.
3. **"a one-line quote from the docs" (`proof_strategy`) — unverifiable.**
   A static build cannot verify a docs quotation, and inventing one is a fabrication
   (§19.7). The case-file quote is `pitch_bullets[0]`, attributed to the project brief,
   with a link out to the real docs. Traceable, honest.
4. **"live GitHub star count" (`proof_strategy.signals[1]`).** Explicitly "never
   hard-coded" in the kit and forbidden by §19.7 anyway. Shipped as labelled links to
   `/stargazers` and `/issues`; no numbers printed.
5. **`hero_experience` "each pose reveals a different headline" vs one `<h1>` per page.**
   §4/§12 and `selfcheck` check 7 are hard gates. The `<h1>` is fixed
   (`copy_overlay.hero.headline`); the poses surface three _lead lines_ from
   `tagline_secondary` + `homepage_narrative.logline` as display-class text, never a
   second `<h1>`. Rule: field vs §12 → §12 wins (§19.6).
6. **`footer_arrangement: mirror-nav` vs §5's three verbatim `content.json` columns.**
   Both shipped: mirror-nav index row first (the more specific field wins for its own
   concern — footer _arrangement_), then the three canonical columns with labels
   verbatim, because those links and the licence label are facts (§5, §19.6).
7. **`complexity_profile.words_per_section_max: 120` vs the facts that must appear.**
   The cap governs authored framing only; verbatim `content.json` strings (7 pitch
   bullets, 8 feature bodies, 6 FAQ answers) are exempt (§19.6).
8. **`mascot.behavior.placement` (fixed bottom-right) vs §19.11 at 320px.** Lux is
   `position: fixed` bottom-right only at ≥768px; below that the same single element
   renders in-flow as an aside above the footer. No duplicated content, and it can
   never cover the CTA on a phone. Tips are never auto-pushed — the tip is a closed
   `<details>`, so it also works with JS off.
9. **Kit contrast prose is wrong in both directions (§19.1).** Measured: ghost/void
   **16.65:1** (kit claims 17.5), amber/void **9.66:1** (kit claims 7.2), and
   "cyan on deep-navy is tight" is actually **11.53:1**. Two real failures the kit
   does not mention: Neon Magenta `#FF2D78` on Charcoal Slate = **4.41:1** and Danger
   Magenta `#E5154E` on void = **4.24:1** — both fail AA for small text. Derived
   mixes of the kit's own pigments are used for small text instead (see §6).
10. **`navigation.topbar` says the wordmark is Playfair vs `fonts.ui.usage` assigning
    nav to IBM Plex Sans.** The more specific field wins for its own concern: wordmark
    = Playfair, nav links = IBM Plex Sans (§19.6).
11. **Kit-voiced CTA labels vs honest destinations (§19.7).** "Read the Case File"
    goes to the external docs, so the visible label is **"Read the Case File (the
    docs)"**. Every noir nav label carries the canonical page name as a visible gloss.

---

## 6. Derived tokens (mixes of the kit's own pigments, not new hues)

| Token                  | Mix                                | Hex       | Why                                                                                                             |
| ---------------------- | ---------------------------------- | --------- | --------------------------------------------------------------------------------------------------------------- |
| `--color-magenta-text` | Neon Magenta 80% + Ghost White 20% | `#FA5391` | Magenta small text: 6.25 void / 5.67 navy / **5.02 slate** (raw fails at 4.41)                                  |
| `--color-edge-strong`  | Dim Steel 40% + Steel Mist 60%     | `#5A6B84` | Functional (meaning-bearing) edges need 3:1 — 3.61 void / 3.27 navy; raw Dim Steel is 1.47 and stays decorative |

Pure brand hues keep every large-text, rule, border and icon use (≥3:1 needed).

---

## 7. Escalations (shared changes I did not make)

None required. All five kit families (IBM Plex Sans/Serif/Mono, Bebas Neue, Playfair
Display) are already vendored in `shared/assets/fonts/`. No `shared/**`, `tools/**`,
`package.json`, `new_site.md` or repo-root file was touched.

Two observations for the orchestrator, no action needed from me:

- `shared/content.json meta.og_image` is `/img/og.svg` — an SVG and an absolute path,
  both of which `check-meta` rule 5 / §11 forbid. Every site therefore has to ignore
  that field and point at its own `img/og.png`. Worth fixing centrally one day.
- `footer.columns[1]` "API reference" href is
  `https://detain.github.io/phlix-docs/reference/api.html`; the old site had
  `/reference`. Used the `content.json` value.
