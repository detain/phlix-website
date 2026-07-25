# Experience Fidelity Review — Neon Noir

**Variant**: neon-noir
**Round**: 1
**Reviewer**: adversarial reviewer (claude-opus-5)
**Date**: 2026-07-25

## Score

- **Experience Fidelity**: 74 / 100

## ✅ Passed

Verified field-by-field against `brand-kits/neon-noir.js`, not against `REGEN_PLAN.md`.

- **`site_architecture`** — all six nav labels present, in kit order, on all nine pages. Three `emphasis` levels are genuinely distinguishable: default cyan, `--primary` amber (`css/components.css:130-137`), `--muted` steel-mist (`:139-141`). `plugins` + `docs` are absent from the primary nav and present in the footer case index with reason glosses (`index.html:620-629`). `extra_pages: []` honoured — exactly 8 canonical pages + `404.html`, no invented page.
- **`homepage_narrative`** — `#opener` `#case-brief` `#lead-cases` `#trust-play` `#closing-act` in that exact order, five sections against a cap of five; `logline` rendered verbatim (`index.html:220-223`); `arc: story-first` reads as an actual case narrative.
- **`page_blueprints`** — all four templates are real, not relabelled: features = evidence board with pins, `EF-0n` serials, per-file Lux notes and jargon decoders (`features.html:125-459`); clients = network map with a cyan trunk `::before` and per-node stub + lit node (`css/theme.css:666-726`); download = briefing room with the clearance token as the dominant element (`download.html:124-166`); about = three numbered chapters + interrogation transcript (`about.html:119-261`).
- **`copy_overlay`** — eyebrow, headline, subheadline, both CTA labels, all three `section_headings` and `footer_tagline` all shipped verbatim.
- **`feature_casting`** — home carries exactly the two `hero` entries as `.evidence-card--lead` cards with the `angle` strings as voiced headlines, plus the four `support` entries in `.support-grid`; the two `footnote` entries appear on Features only; all eight features appear somewhere. Weighting honoured.
- **`copy_treatments`** — all four realised: `noir-scrolls` clue cards, `interrogation-transcript` FAQ, `network-nodes` clients, `toolkit-dossier` ecosystem rows.
- **`faq_experience`** — `question_order` matches `content.json` order exactly; all three `extra_questions` render as additional `<dt>` sharing their canonical `<dd>` via the correct `maps_to` (`about.html:221-238`); Lux persona carried by the `Q`/`LUX` transcript markers.
- **`hero_experience`** — all three lead lines, both CTAs, headline and subheadline are in the markup, so the declared no-JS fallback carries identical copy; the pose cycle drives `--sign` through cyan → magenta → amber; the buzz stops at the final pose exactly as specified (`css/theme.css:332-338`).
- **`scroll_experience`** — a real venetian-blind `clip-path` wipe on the dividers plus a `cut-in` with one flicker at 72%; nothing is ever hidden by the stylesheet (only JS arms below-fold elements), so a JS or CSS failure cannot hide content.
- **`easter_eggs`** — both wired, both §19.8-compliant (see accessibility.md), both with the kit's exact `reward_copy` and Esc exit.
- **`conversion_funnel`** — `instant-command`; all three `cta_ladder` rungs present verbatim with the correct targets (`index.html:546,554,562`); `download_opening` realised as the page's opening line (`download.html:118`).
- **`proof_strategy`** — spec placard, GitHub links with **no** hard-coded counts (correctly refusing to fabricate a star count), and one quote — but see content-quality.md for the attribution defect.
- **`complexity_profile`** — five home sections; `jargon_policy: translate` is genuinely implemented as `<details class="decoder">` blocks on all eight Features entries, which is the strongest single piece of work on the site.
- **`intensity_toggle`** — a real footer switch labelled `Case closed (calm mode)`, `default: full`, persisted in `localStorage`, and it actually kills glow, animation and both eggs via `[data-intensity='calm']` (`css/base.css:381-398`).
- **`seasonal_activation`** — a real `live-js` date gate over all three variants, all three motif SVGs shipped (`img/seasonal/`), banner copy from the kit. Correctly inactive on 2026-07-25.
- **`persona_vignettes`** — drives `img/PROMPTS.md` subjects and surfaces, as claimed.
- **`mascot.behavior`** — **placement is exactly right**: Lux on Home, Features, Download, About; **absent from Clients and Hub** as the kit demands. All four `tips` are keyed correctly (`data-tip-for` = `opener` / `evidence` / `server` / `faq`) with the kit's exact `say` strings, and each target id exists. Both `easter_interactions` are implemented. The `dismiss` affordance is the kit's own label "Lux, take five", persisted in `localStorage`, with a `.lux-recall` restore button on those same four pages only. The tip is a closed `<details>`, so it works with JS off and never auto-pushes.
- **`mascot.behavior` vs §19.11** — the author's account checks out: `position: fixed` only inside `@media (width >= 768px)` (`css/components.css:961-990`); below that the **same single element** renders in flow above the footer, with no duplicated content. At 320px it cannot cover the primary CTA. §19.11 satisfied.
- **`error_page_experience`** — `404.html` ships as a real ninth page: `noindex`, relative asset paths only, all three `recovery_links`, `concept` realised as content rather than printed verbatim.
- **Anti-convergence** — structurally distinct from the other regenerated site on disk (`abstract-canvas`): different nav vocabulary and ordering, five home sections vs four, entirely different section ids, different CTA ladder, different page templates, and a mascot layer the other site does not have. This is not a recoloured template.

## ⚠️ Concerns (non-blocking)

- **`index.html:568`, `features.html:488`, `download.html:324`, `about.html:273`** — `<aside class="lux">` is nested inside `<main>`. Lux is a page-level companion, fixed-position at ≥768px, unrelated to the surrounding section; an `<aside>` complementary to the whole document belongs as a sibling of `<main>` — which is exactly where the equally-floating `.egg-note` already sits (`index.html:602`). Two consequences: the skip target `#main-content` now encloses the companion, and on a page whose tip is keyed to `#opener` a linear reader meets "Lux · night archivist / Ask Lux" only after the closing CTA. With the `main[tabindex="-1"]` render-check false positive now fixed, there is no remaining justification. Move `.lux` out to a sibling of `<main>`, immediately before `.egg-note`.
- **`index.html:567`, `features.html:487`, `download.html:323`, `about.html:272`** — three of the four "Lux, keyed to **#opener** on this page" comments are wrong; only `index.html`'s is accurate.
- `feature_casting.footnote` (`dlna`, `plugins`) is correctly withheld from home, but on Features both render as equal-weight cards; only `plugins` gets a distinct footnote treatment (`.folded-in`, `features.html:461-472`). `dlna` has no footnote weighting anywhere.

## ❌ Failures (must fix this round)

- **`css/components.css:85-94`** with **`js/main.js:19`** — the declared `navigation_model.fallback` does not render. The field states: "A standard accessible `<nav>` … fully keyboard reachable via Tab, collapsing to a labeled hamburger menu on mobile. **The fallback nav is always rendered and always functional.**" In fact `.nav-menu { display: none }` below 900px and only `.is-open` — added by JS — reveals it, so **with JS disabled at any width under 900px the primary navigation is entirely unreachable**, and `.nav-toggle` is still rendered as a dead button. `js/main.js:19` already sets `root.setAttribute('data-js','on')`, but **no CSS rule anywhere consumes `data-js`** (`grep -rn "data-js" css/ *.html` → zero matches) — the progressive-enhancement hook was built and never wired. **Required**: default `.nav-menu` to visible, hide it only under `html[data-js='on']` below 900px, and render `.nav-toggle` only when `data-js='on'`, so the no-JS nav works and the hamburger appears only when it functions.
- **`404.html:129-157`** — `error_page_experience.concept` makes Lux the subject: "**Lux stands under a burnt-out neon sign** (the X flickers and dies), **holding a file marked 'FILE NOT FOUND'**." The shipped `.deadend__art` has the alley walls, the sign box, the dead grey X with one amber stroke still lit, and a filing cabinet — but **no Lux figure at all**: no trench coat, no fedora, no amber eyes (compare the Lux silhouette at `index.html:570-586`, which the author already had to hand). `REGEN_PLAN.md` §1's `error_page_experience` row silently drops Lux from its own restatement of the concept. **Required**: place the Lux silhouette in `.deadend__art` holding the FILE NOT FOUND docket, as the concept states.

## Recommendations (ranked by impact)

1. Wire the existing `data-js` hook so the no-JS nav actually renders below 900px (impact: high, effort: low).
2. Add Lux to the 404 art (impact: high, effort: low — the SVG already exists).
3. Move `.lux` outside `<main>` on all four pages (impact: medium, effort: trivial).
4. Fix the three wrong `data-tip-for` comments (impact: low, effort: trivial).
5. Give `dlna` a footnote weighting to match `plugins` (impact: low, effort: low).

## Evidence

- `node tools/kit-brief.mjs --site neon-noir` — declared-field list (19), nav table, narrative section table, cta_ladder, egg list, mascot requirement.
- `grep -rn "data-js" sites/neon-noir/css sites/neon-noir/*.html` → no matches (the hook is set in `js/main.js:19` and never consumed).
- Per-page presence matrix: Lux on index/about/features/download only; `.lux-recall` on those same four; `copy-token` on download only; `decoder` on features only — all matching the kit.
- Structural diff against `sites/abstract-canvas/` (nav labels, home section ids, CTA ladder, page inventory).
