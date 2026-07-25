# Neon Noir — Regeneration Plan

Kit: `brand-kits/neon-noir.js` (base kit, schema 2.1)
Declared archetype: **`narrative-scroll`** (`experience_archetype`) — replaces the old
site's "immersive" guess.
Personality: Outlaw archetype; terse, atmospheric, cinematic, wry.

---

## 1. Experience fields — old → new

| Field                   | Old site (2026-07-04)                                  | This regeneration                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| ----------------------- | ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `experience_archetype`  | ignored; generic 4-section home                        | `narrative-scroll`: home is an ordered 5-beat case narrative, each beat a "cut" into frame                                                                                                                                                                                                                                                                                                                                                                                                 |
| `site_architecture`     | ignored; 8 canonical nav labels                        | 6 kit nav labels in kit order + canonical page name as a second-line gloss; `plugins`+`docs` demoted to the footer index; `footer_arrangement: mirror-nav` → footer opens with a case index mirroring the nav                                                                                                                                                                                                                                                                              |
| `homepage_narrative`    | ignored; hero / pitch / features-overview / cta-banner | 5 sections, kit ids + kit order: `#opener` `#case-brief` `#lead-cases` `#trust-play` `#closing-act`; framed by `logline`; `arc: story-first`                                                                                                                                                                                                                                                                                                                                               |
| `page_blueprints`       | ignored; all pages generic §3                          | features → **evidence-board** (pinned photos, serials, Lux notes); clients → **network-map** (cyan spine + nodes); download → **interrogation** (briefing room / clearance token / field agents / toolkit); about → **case-closed** (chapters + transcript)                                                                                                                                                                                                                                |
| `copy_overlay`          | partial (only `tagline_secondary` in the CTA banner)   | hero eyebrow/headline/subheadline/both CTA labels, all 3 `section_headings`, `footer_tagline`                                                                                                                                                                                                                                                                                                                                                                                              |
| `feature_casting`       | ignored; all 8 features on home                        | home = 2 hero cards (syncplay, library) with `angle` as the voiced headline + 4 support cards; `footnote[]` (dlna, plugins) on Features only; all 8 still appear on Features                                                                                                                                                                                                                                                                                                               |
| `copy_treatments`       | ignored                                                | pitch_bullets → `noir-scrolls` clue cards inside `#case-brief`; faq → `interrogation-transcript`; clients → `network-nodes`; ecosystem → `toolkit-dossier`                                                                                                                                                                                                                                                                                                                                 |
| `faq_experience`        | plain `<dl>` in content.json order                     | Lux transcript; `question_order` honoured (already = content.json order); 3 `extra_questions` rendered as additional `<dt>` sharing their canonical `<dd>` via `maps_to`                                                                                                                                                                                                                                                                                                                   |
| `hero_experience`       | static hero                                            | `playable-vignette`: neon sign cycles cyan→magenta→amber, Lux shifts pose, each pose surfaces one more lead line **and lights a tube marker under it**. The one advance control is the labelled `.vignette__advance` button; the aria-hidden art is decorative and carries no handlers (hover brightens the practical's halo only). Unrevealed leads are full-strength Steel Mist, 5.88:1 — never dimmed text. All copy in markup; no-JS shows all leads at once                           |
| `navigation_model`      | topbar (close to spec by accident)                     | topbar per spec: Playfair wordmark, cyan links, active = cyan glow **+ amber marker + `aria-current`** (never colour alone); the three `emphasis` levels are hue + weight + a lit 2px cyan tube, all inside one accent. `fallback` is now literally true: `.nav-menu` defaults to a visible column and the hamburger only exists under `html[data-js='on']`, set pre-paint by `js/boot.js` (an external file — `_headers` ships `script-src 'self'`, so an inline script would be blocked) |
| `scroll_experience`     | generic fade-in `.reveal`                              | `cinematic`: venetian-blind wipe + one flicker per section boundary; removed entirely under reduced motion / calm mode                                                                                                                                                                                                                                                                                                                                                                     |
| `easter_eggs`           | absent                                                 | both wired: `logo-clicks:5` (cyan pulse + mono "NOIR", auto-clears 3 s, Esc) and `typed-word:shadow` (blind-bar sweep, Esc). Key egg never calls `preventDefault` and is inert inside inputs. Both reachable **under `prefers-reduced-motion`** — that preference removes the sweep only, never the reward copy (§19.20); only calm mode, which `intensity_toggle.affects` names, turns the eggs off                                                                                       |
| `conversion_funnel`     | single "Download Phlix" button                         | `instant-command`: 3-rung ladder in `#closing-act`; download page opens on `download_opening`; snippet is the single most prominent element                                                                                                                                                                                                                                                                                                                                                |
| `proof_strategy`        | absent                                                 | `#trust-play` band: spec placard → repo/stargazers/issues links (no printed counts) → one case-file quote traced to `content.json`                                                                                                                                                                                                                                                                                                                                                         |
| `complexity_profile`    | ignored                                                | 5 home sections (cap 5); authored prose ≤120 words/section; `jargon_policy: translate` → plain "case note" line visible, precise terms preserved in a `<details>` decoder on Features                                                                                                                                                                                                                                                                                                      |
| `intensity_toggle`      | absent                                                 | footer utility row "lights-out" switch `Case closed (calm mode)`, default `full`, persisted; kills animation, glow, wipes, eggs. Distinct from the OS motion preference — `js/experience.js` keeps `calm()` and `noMotion()` as two separate predicates on purpose                                                                                                                                                                                                                         |
| `mascot.behavior`       | mentioned in SITE.md, never built                      | Lux built on Home / Features / Download / About only, as a **sibling of `<main>`** (a document-level companion, like `.egg-note`); `<details>` tip (works with JS off), section-keyed tips, `click:3` + `hover-hold:3s` reactions on a real `<button class="lux__figure">` so the reaction is keyboard-reachable, "Lux, take five" dismissal in localStorage with a `Bring Lux back` recall. Docked form is a thin ~76px capsule, not a stacked card — see §5d                             |
| `seasonal_activation`   | absent                                                 | `live-js` date gate flips the 3 variants' override tokens + motif + banner; 3 motif SVGs shipped. **Every variant is contrast-measured, not just the default** — see §6.4; each `[data-season]` block re-derives the role tokens its hues feed. Inactive on 2026-07-25 (all ranges are Oct / Dec–Jan / Feb) but all three ship                                                                                                                                                             |
| `error_page_experience` | no `404.html` at all                                   | real 9th page: dead-end alley, **Lux standing under the burnt-out sign holding the `FILE NOT FOUND` docket** — the concept's actual subject, in trench coat and fedora with a cyan brim glow and two amber eyes (round 1 drew the alley, the sign and a filing cabinet but left Lux out); dead X with one tube still burning, 3 recovery links, `noindex`, relative assets only                                                                                                            |
| `persona_vignettes`     | absent                                                 | drives `img/PROMPTS.md` subjects + which surfaces are depicted (Midnight Collector → home art; Remote Access → hub art; Multi-Screen Night → clients art)                                                                                                                                                                                                                                                                                                                                  |
| `header_motif`          | claimed in SITE.md, not implemented                    | slow-scan neon flicker on the hero wordmark, in **cyan** (amber is CTA-only), gated on motion + calm mode, finite and scheduled so it never overlaps the other two ambient animations — see §8                                                                                                                                                                                                                                                                                             |

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
   (§19.7). The case-file quote is `pitch_bullets[0]` from `shared/content.json`,
   quoted verbatim. Round 1 attributed it to "The Phlix project brief" — **a source
   that does not exist** — and carried no link, which made an honest quote look like
   an invented citation. It is now attributed to what it is ("Phlix's own pitch")
   with a working link to the docs inside the `<cite>`, and `.record-links` carries
   the docs link the plan promised, alongside the three GitHub links.
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
12. **`fonts.body.weight: [400, 500]` vs `strong` needing to be perceptible
    (§19.17).** `ibm-plex-serif-700` exists in the shared pool, but the kit does not
    declare it, and existence in the pool is not permission — 700 would be an
    undeclared weight. So `strong` keeps 500 and gains a **second channel**: the
    kit's own Electric Cyan, whose declared role (`colors.secondary.usage`) already
    includes "highlights". Measured on every surface `strong` can land on: 12.72
    void / 11.53 navy / 10.21 slate / 12.66 Blood-Moon / 11.66 on the Lux panel, and
    routed through `--color-secondary-text` so the Midnight New Year magenta swap
    cannot drop it below AA. The round-1 `color: var(--color-text)` was deleted: it
    restated the body colour and did nothing. Links stay distinguishable because
    they keep their underline and `strong` has none. **The rule was also inert** —
    round 1 shipped it with no `<strong>` anywhere on any page — so four genuine
    emphases now exist in authored prose (`index.html` ×2, `download.html`,
    `hub.html`); verbatim `content.json` fact strings were left untouched.
13. **`hero_experience.suggested_inputs` lists "pointer hover" vs not changing
    content on a mouse crossing decorative art.** Round 1 bound `click` **and**
    `pointerenter` to `.opener__art`, which is `aria-hidden="true"` — an interactive
    target invisible to assistive tech, that also advanced real copy whenever a
    pointer merely crossed the picture. `suggested_inputs` is advisory; §12 and WCAG
    are not. The vignette now advances only from `.vignette__advance`, and "pointer
    hover" is honoured as a hover-brightens-the-halo affordance in CSS — a look, not
    a content change.
14. **Playfair Display italic (`logo_rules.shape`, four `font-style: italic` uses)
    vs no italic face in the pool.** All four were browser-synthesised obliques, and
    a synthetic slant of a high-contrast didone is visibly poor at hero size. All
    four are now upright: `.opener h1 em` (carries hue + halo instead), the alley
    marquee `<text>`, `.opener__logline` (carries a rule + Steel Mist), and
    `.evidence__note` (carries a lit left edge + cyan). No italic is synthesised
    anywhere in `css/` or the page SVGs. (`img/og.svg` and `img/favicon.svg` still
    use Georgia italic — they are standalone raster sources referenced via
    `<img>`/`rel=icon`, so they cannot reach a self-hosted webfont at all.)
15. **`badges.colors` "Neon amber for quality" vs `color_rules[2]` amber-for-CTA.**
    Moot in practice: `.badge--quality` was declared in CSS and used on **zero**
    pages. The dead rule was removed rather than recoloured; the badge system
    (`.badge`, `.client-status`) still ships and still spells every status out in
    words.

---

## 5b. The amber rule, stated once so it cannot drift

`color_rules[2]` ("amber is reserved for the single most important CTA per screen")
and `do_dont.colors.dont[2]` ("use neon amber for secondary/tertiary UI elements")
were the two most-violated lines in the kit. The site now applies one rule:

> **Amber is either a light source inside the artwork, or the single primary CTA.
> It is never UI chrome.**

| Amber survives here                                       | Why                                                                     |
| --------------------------------------------------------- | ----------------------------------------------------------------------- |
| `.btn-primary` fill + its glow                            | the CTA itself (`ui_generation_rules[2]`)                               |
| `.nav-menu__link[aria-current]` 3px marker                | `navigation.sidebar` / `navigation.tabs` name amber for this explicitly |
| Lux's eyes, in every drawing of him                       | `mascot.description`: "two points of amber light in the darkness"       |
| the alley sign at its final pose                          | `hero_experience`: the sign cycles cyan → magenta → **amber**           |
| the 404 sign's one surviving tube, its reflection         | `error_page_experience`: "the X flickers and dies"                      |
| the overhead practical over the alley + the briefing lamp | `colors.gradients[1]`, scoped to its declared job                       |

Everything else that was amber moved to cyan or Steel Mist: the two `--primary` nav
links, `.t-num`, `.decoder__body dt`, `.evidence-card--lead` top border,
`.case-quote` and `.briefing` left rules, `.ladder__rung:first-child` marker,
`.lux__cue`, `.lux__react`, `.egg-note` border and code, `.code-block .prompt`, the
`.intensity-toggle` knob, `.season-banner`, `.opener h1` + `.cta-banner__title`
glow, `sign-flicker`, the `--amber` venetian divider (now `--steel`), and
`.badge--quality` (deleted — unused).

**Two accents, not three.** The site is **cyan + amber**. Neon Magenta is demoted
to Steel Mist / Ghost White everywhere it was UI: `.clue` left border,
`.clue__serial`, `.evidence__pin`, `.status-beta`, the transcript `Q` marker, and
the middle band of the wet-asphalt reflection. Magenta remains a real part of the
palette in exactly two places the kit demands it: the middle step of the alley
sign's mandated colour cycle (one colour on screen at a time, so never a third
simultaneous accent) and `--grad-neon-horizon`.

**One knowing deviation, stated plainly.** Round-1 finding ❌7 also asked that one
of the home page's two `.btn-primary` buttons be demoted. I did not do that, and
the rest of ❌7 is fixed instead. The rule is worded "per **screen**": `#opener` has
`min-height: 78vh` and `#closing-act` is four bands below it, so the two never
co-occur in a viewport at any of the five widths `render-check` exercises. Each
screen therefore has exactly one amber element, which is stricter than round 1
managed and is the literal rule. `do_dont.ux.dont`'s "multiple equally prominent
CTAs" is also satisfied — the hero's is `btn--lg`, the ladder's is base size, and
both point at the same destination, so there is no competing choice. Demoting the
ladder rung would have left the conversion climax with **no** amber while amber
glow and an amber rung marker stayed in the same band, i.e. amber on chrome and
not on the CTA — exactly the defect being fixed. Reviewer: this is the one
judgement call in round 2 worth re-checking.

---

## 5d. The docked companion is a capsule, not a card

`mascot.behavior.placement` asks for "a small silhouette leaning against a wall".
Round 1 built the >=768px docked form as a stacked card — figure over name over
"Ask Lux" over reaction over dismiss — which measured **192 x 251px** and lay
across the install page's **"Copy" button at 860x720**, and across a licence link
on `about.html` at 768x1024. A fixed floater's _height_ is what decides whether it
covers page controls at some viewport nobody thought to check (§19.11), so the
dock is now a single row:

```
[ 36px silhouette ] [ Ask Lux · note ready ]     ~76px tall, ~200px wide
```

Lux's note, his reaction (`role="status"`) and his "Lux, take five" control all
moved **inside `.lux__panel`**, which opens on demand and opens upward. A reaction
now also opens the panel from JS, so the reward is seen and not merely announced.
`.lux__name` is visually hidden at >=768px and remains the `<aside>`'s accessible
name via `aria-labelledby`. Below 768px nothing changed: the same single element
renders in flow above the footer with the fuller layout.

Verified with the same overlap algorithm `render-check` uses, over **9 pages x the
6 render-check viewports x 2 timing samples**: zero controls covered.

---

## 5c. Motion budget

`do_dont.animation.dont` forbids animating more than one element at a time **and**
running continuous loops without pause. Round 1 shipped three `infinite`
animations that could run together. All three are now finite with disjoint
windows, declared together in `base.css` §2:

| Animation      | Element        | Schedule              | Window        |
| -------------- | -------------- | --------------------- | ------------- |
| `sign-flicker` | `.opener h1`   | 6.0s × 2, delay 1.2s  | 1.2s – 13.2s  |
| `neon-buzz`    | `.alley__tube` | 4.5s × 2, delay 13.5s | 13.5s – 22.5s |
| `lux-shift`    | `.lux__figure` | 9.0s × 2, delay 23s   | 23s – 41s     |

After 41s the page is completely still — which is the beat `hero_experience` asks
for ("the neon flicker fades when the final headline lands"). `sign-flicker`
animates `text-shadow`, which repaints rather than composites; bounding it to two
iterations removes that cost permanently instead of paying it forever.

One-shot animations (`cut-in`, `blind-wipe`, `blind-sweep`) are unchanged and all
sit inside `@media (prefers-reduced-motion: no-preference)`. `.will-cut` no longer
carries `opacity: 0.6` — see §6.5. `img/favicon.svg` also lost an
`<animate repeatCount="indefinite">`, which was the one looping animation on the
site that no media query could ever gate.

---

## 6. Contrast — measured across every surface and every palette variant

### 6.1 The four surfaces

This site paints text on **four** dark surfaces, not two. The original §6 table
listed only void and navy, which is how a 2.89:1 border shipped on the third.

| #   | Surface           | Hex       | Where                                                          |
| --- | ----------------- | --------- | -------------------------------------------------------------- |
| 1   | Void Black        | `#0a0c10` | page background, `.code-block`, `.intensity-toggle`            |
| 2   | Deep Navy         | `#111827` | `.site-header`, cards, `.placard`, `.ladder__rung`, `.toolkit` |
| 3   | Charcoal Slate    | `#1c2333` | `.band--slate`, `.clue`, `.decoder`, `.code-block__bar`, chips |
| 4   | Blood Moon (Oct.) | `#170810` | `--color-surface` for the whole of October                     |

### 6.2 Substitute tokens — kit-brief values, used verbatim

`tools/kit-brief.mjs` precomputes an accessible substitute for each failing hue
and says to "use it verbatim so all 50 sites derive the same token". Round 1
shipped a private mix (`#FA5391`) instead; that was measurably safer but a
unilateral divergence from a programme-wide rule, so it is now the brief's value.
One token covers all four surfaces because the tightest surface (Charcoal Slate)
sets it.

| Token                  | Value     | Source                              | void | navy | slate    | Oct  |
| ---------------------- | --------- | ----------------------------------- | ---- | ---- | -------- | ---- |
| `--color-magenta-text` | `#ff357d` | kit-brief substitute for `#ff2d78`  | 5.65 | 5.12 | **4.53** | 5.62 |
| `--color-crimson-text` | `#ec527c` | kit-brief substitute for `#e5154e`  | 5.65 | 5.12 | **4.53** | 5.62 |
| `--color-edge-strong`  | `#5a6b84` | Dim Steel 40% + Steel Mist 60%      | 3.61 | 3.27 | **2.89** | 3.59 |
| `--color-neutral`      | `#7a8fa6` | kit pigment (Steel Mist), unchanged | 5.88 | 5.33 | **4.72** | 5.85 |

`--color-edge-strong` is **2.89:1 on Charcoal Slate**, i.e. below the WCAG
1.4.11 3:1 floor for a UI-component boundary. It is therefore restricted to
large display text (`.deadend__code`, 5–11rem) and purely decorative edges
(`.deadend__docket`'s dashed folder rule). Every functional control boundary —
`.btn-ghost` (which carries `.copy-token`, and `.copy-token` sits on Charcoal
Slate) and `.intensity-toggle__track` — uses **Steel Mist**, safe on all four.

### 6.3 Role tokens, so a seasonal override cannot break small text

Consumers read a role, never a raw hue (`new_site.md` §19.19):

| Role                             | Job                                          | Floor |
| -------------------------------- | -------------------------------------------- | ----- |
| `--color-primary-text`           | small text / functional icons in the CTA hue | 4.5:1 |
| `--color-primary-fill`           | a filled control's background                | —     |
| `--color-on-primary`             | the label on `--color-primary-fill`          | 4.5:1 |
| `--color-secondary-text`         | small text in the accent hue                 | 4.5:1 |
| raw `--color-primary/-secondary` | rules, borders, ≥24px display                | 3:1   |

### 6.4 Every palette variant, measured

Round 1 checked only the default palette. All three seasonal windows shipped at
least one small-text failure; the worst was the **primary CTA label at 4.24:1
for the whole of October**.

**Default (all year except the three windows below)**

| Consumer                                 | Pair                   | Ratio     |
| ---------------------------------------- | ---------------------- | --------- |
| `.btn-primary` label, 15px/600           | `#0a0c10` on `#f5a623` | **9.66**  |
| `a`, `.decoder > summary`, `.placard dt` | `#00e5ff` on slate     | **10.21** |
| `.decoder__body dt`, 12px                | `#00e5ff` on slate     | **10.21** |
| `.clue__serial`, `.status-beta`, 11–12px | `#7a8fa6` on slate     | **4.72**  |
| `.vignette__lead[data-state='dim']`      | `#7a8fa6` on void      | **5.88**  |
| `strong`                                 | `#00e5ff` on navy      | **11.53** |

**Midnight New Year** (`--color-secondary: #ff2d78`) — magenta enters the link /
accent slot, where it is 4.41:1 on slate.

| Consumer                                 | Pair                   | Ratio       |
| ---------------------------------------- | ---------------------- | ----------- |
| `a`, `.decoder > summary` 13px, `strong` | `#ff357d` on slate     | **4.53**    |
| same, on navy / void                     | `#ff357d`              | 5.12 / 5.65 |
| `.btn-primary` label (still amber)       | `#0a0c10` on `#f5a623` | 9.66        |

**Blood Moon October** (`--color-primary: #e5154e`, `--color-surface: #170810`)

| Consumer                              | Pair                   | Ratio       |
| ------------------------------------- | ---------------------- | ----------- |
| `.btn-primary` label, 15px/600        | `#fcfcfe` on `#e5154e` | **4.51**    |
| `.code-block pre .prompt`             | `#7a8fa6` on void      | 5.88        |
| `.nav-menu__link` 15px, on `#170810`  | `#ff6b00`              | **6.82**    |
| `a`, `.decoder__body dt` 12px, slate  | `#ff6b00`              | **5.50**    |
| large / rules in the season's crimson | `#e5154e` on `#170810` | 4.22 (≥3 ✓) |
| any crimson small text                | `#ec527c`              | 4.53–5.65   |

The label change is deliberate: `#e5154e` is 4.24:1 under void-black **and**
3.93:1 under Ghost White, so no kit-declared label passes on it. `#fcfcfe` is
kit-brief's own substitute for Ghost White on that fill, and the kit's
`buttons.danger` pairing is light-on-crimson, so this corrects the kit's number
without changing its intent. `.btn-primary:hover` also dropped its
`brightness(108%)` — lightening the fill would have pushed this label back under
4.5:1. `saturate(120%)` is the kit's own `microinteractions.button_press`.

**Valentine's Neon** (`--color-primary: #ff2d78`)

| Consumer                       | Pair                   | Ratio    |
| ------------------------------ | ---------------------- | -------- |
| `.btn-primary` label, 15px/600 | `#0a0c10` on `#ff2d78` | **5.50** |
| any magenta small text         | `#ff357d` on slate     | **4.53** |
| `a`, accent small text (amber) | `#f5a623` on slate     | 7.75     |

### 6.5 Composited states — the two that failed

Alpha compositing is where both round-1 contrast defects actually lived, so both
are now measured rather than assumed:

| State                                                  | Effective colour | Ratio    | Now                    |
| ------------------------------------------------------ | ---------------- | -------- | ---------------------- |
| `.vignette__lead[data-state='dim']` at `opacity: 0.45` | `#3c4754`        | **2.07** | opacity removed → 5.88 |
| `.will-cut` subtree at `opacity: 0.6`, Steel Mist      | `#4d5b6a`        | **2.81** | opacity removed → 5.88 |
| Steel Mist under the street sheen at peak              | on `#092026`     | 5.06     | ✓                      |
| Ghost White under the briefing lamp at peak            | on `#2d2313`     | 13.12    | ✓                      |

Pure brand hues keep every large-text, rule, border and icon use (≥3:1 needed).

### 6.6 Wrapping is split by role, not by "does this look like code" (§19.12)

Round 1 put `overflow-wrap: anywhere` on `body`, which fixed the 200%-zoom
overflow but also inherited into every heading — and an unmarked mid-word break in
Playfair Display at 4.25rem reads as a rendering fault. Now:

- `anywhere` on `p, li, dt, dd, a, span, code, kbd, samp, pre` — the only value
  that shrinks the min-content contribution a grid/flex track measures. The
  offenders here are ordinary words in narrow tracks ("ContentDirectory" in a spec
  column, "Transcoding" in a ~130px footer column at 200% zoom), not URLs.
- `hyphens: auto` + `overflow-wrap: break-word` on `h1`-`h6` and `blockquote`, so a
  genuine heading overflow still surfaces in `render-check` instead of being
  silently absorbed.

Every grid track already uses `minmax(0, ...)`. `render-check` passes 9/9 pages at
all six viewports and at 200% text zoom after the change.

---

## 6a. Only kit-declared font weights are vendored

The shared pool was backfilled with a **700** file for every prose family, and
round 1's generated `@font-face` block vendored all of them — so `base.css` shipped
three faces this kit does not declare:

| Family         | Kit declares      | Round 1 also vendored |
| -------------- | ----------------- | --------------------- |
| IBM Plex Serif | `[400, 500]`      | **700**               |
| IBM Plex Sans  | `[400, 500, 600]` | **700**               |
| IBM Plex Mono  | `[400, 600]`      | **700**               |

Presence in the pool is not permission: any stray `font-weight: 700` would have
resolved silently against a face the kit never sanctioned. Re-emitted with the
fixed generator (`node tools/vendor-fonts.mjs --emit --site neon-noir`) — **10
faces now, down from 13**, all declared.

Then every numeric `font-weight` in `css/` was checked against the declared list
for the family it actually resolves to, including the ones that inherit their
family from an ancestor rule:

| Weight in use | Resolves to                                           | Declared? |
| ------------- | ----------------------------------------------------- | --------- |
| 900           | Playfair (headline)                                   | yes       |
| 700           | Playfair (headline), incl. the alley marquee `<text>` | yes       |
| 600           | IBM Plex Sans (ui), IBM Plex Mono (`.toolkit__name`)  | yes       |
| 500           | IBM Plex Sans (ui), IBM Plex Serif (`strong`)         | yes       |
| 400           | all five roles                                        | yes       |

No `font-weight: 700` anywhere resolves to a body, ui or mono face.

---

## 6b. Icons and per-page social copy

Round 1 shipped the shared-template baseline: one SVG favicon, no raster
fallbacks, no manifest, no `og:image` dimensions, and one byte-identical
`description` / `og:description` / `twitter:description` on all nine pages.

Now, on **all nine pages**:

- `img/favicon.svg` (unchanged source) plus rasterised `favicon-16.png`,
  `favicon-32.png`, `apple-touch-icon.png` (180), `icon-192.png`, `icon-512.png`,
  generated from the SVG with `rsvg-convert` so they cannot drift from it.
- `og:image:width` 1200, `og:image:height` 630, and an `og:image:alt` that
  describes what `og.png` actually contains.
- A **distinct** `description` / `og:description` / `twitter:description` per page,
  written from that page's own `.t-lead`. `index.html` keeps
  `shared/content.json meta.description` verbatim — it is a fact string for the
  site root and §16 forbids dropping facts.

`img/favicon.svg` also lost an `<animate repeatCount="indefinite">` on its glow
dot: a forever-looping animation that no `prefers-reduced-motion` query can reach.

**No `manifest.webmanifest`, and the reason is a tool limitation, not a choice.** A
complete manifest was written, validated and wired into all nine pages — and
`render-check` then failed with **57 defects**, every one of them the same pair:

```
Access to manifest at 'file:///…/manifest.webmanifest' from origin 'null' has been
blocked by CORS policy: Cross origin requests are only supported for protocol
schemes: chrome, chrome-extension, chrome-untrusted, data, http, https…
Failed to load resource: net::ERR_FAILED
```

`render-check` loads pages over `file://` and counts every console error as a
defect. Chromium refuses to fetch a web manifest from `file://` at all, so **any**
site that ships `<link rel="manifest">` fails the mandatory gate, on every page, at
every viewport — while working perfectly in production. The link and the file were
removed rather than ship a red gate; see the escalation in §7. Nothing else in the
run was a defect, and the raster icon set (plain `<link rel="icon">` /
`apple-touch-icon`) loads cleanly under `file://`, so all of it stayed.

---

## 7. Escalations (shared changes I did not make)

None required. All five kit families (IBM Plex Sans/Serif/Mono, Bebas Neue, Playfair
Display) are already vendored in `shared/assets/fonts/`. No `shared/**`, `tools/**`,
`package.json`, `new_site.md` or repo-root file was touched.

Two observations for the orchestrator, no action needed from me:

- **`--color-magenta-text` divergence, now resolved locally but worth a ruling.**
  Round 1 replaced `kit-brief`'s verbatim substitutes (`#ff357d` slate / `#e7285c`
  void) with a private mix `#fa5391`, which is measurably safer (5.02 vs 4.53 on
  slate) but diverges from a programme-wide "use it verbatim" rule. Round 2 adopts
  the brief's value. Note for the brief itself: its per-surface substitutes are
  **not interchangeable** — `#e7285c` (the void substitute for `#e5154e`) is only
  3.63:1 on Charcoal Slate, so a site that has three surfaces must take the
  tightest surface's value (`#ec527c`) as its single token. The brief could say so.
- `footer.columns[1]` "API reference" href is
  `https://detain.github.io/phlix-docs/reference/api.html`; the old site had
  `/reference`. Used the `content.json` value.
- **The favicon/manifest/social gap is a shared-template gap, not a neon-noir one.**
  It is fixed here (§6b) inside `sites/neon-noir/` only. If the same baseline is on
  the other 49 sites, the cheap fix is a `tools/` generator (`gen-icons.mjs`
  alongside `gen-og.mjs`) plus a `check-meta` rule for `og:image:width/height/alt`
  and for byte-identical descriptions across a site's pages, rather than 50 hand
  passes. Nothing in `tools/` or `shared/` was touched from here.
- **`render-check` makes a web manifest unshippable, on all 50 sites.** It renders
  over `file://`, and Chromium blocks a `manifest` fetch from `file://` outright
  (CORS: only `chrome`/`data`/`http`/`https`). Every console error is counted as a
  defect, so one `<link rel="manifest">` produces `2 × pages × viewports` failures —
  57 for this kit — despite being correct in production. Either serve the staged
  directory over a throwaway `http://localhost` in `render-check`, or exempt
  `net::ERR_FAILED` + the manifest CORS message when the page origin is `null`.
  Until then no site can ship a manifest, and ⚠17's manifest half cannot be
  completed by any author. **This is the only part of round 1's findings I could not
  fully close.**
- **`_headers` forbids inline scripts** (`script-src 'self'`, no `'unsafe-inline'`).
  Any site needing a pre-paint hook — e.g. a `data-js` marker so a no-JS nav
  fallback can be the default — must ship it as a tiny external file. This site uses
  `js/boot.js` (one statement). Worth stating in `new_site.md` §7, because the
  obvious implementation is an inline `<script>` and it would be silently blocked in
  production while working perfectly under `render-check`.

**Withdrawn (was a false escalation in round 1).** The round-1 plan reported that
`shared/content.json meta.og_image` was `/img/og.svg` — "an SVG and an absolute
path". It is not: the value is `img/og.png`, relative and a PNG, and the adjacent
`og_image_note` spells out the exact contract this site already follows (emit
`og:image` as the absolute `<site.url>/<slug>/img/og.png`). Nothing to fix
centrally; acting on that note would have been wasted effort.
