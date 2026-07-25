# Experience Fidelity Review — Swiss Modernist

**Variant**: swiss-modernist
**Round**: 1
**Reviewer**: adversarial reviewer (claude-opus-5)
**Date**: 2026-07-25

## Score

- **Experience Fidelity**: 74 / 100

## Declared-field audit (18 declared, 2 absent)

| Field | Verdict | Evidence |
| --- | --- | --- |
| `site_architecture.nav` | ✅ | 8 labels, kit order, on all 9 pages. Three emphasis levels distinguishable: `is-primary` = 700 + 2px top rule (`components.css:118-120, 164-166`), default = 500 Ink Black, `is-muted` = 500 `#5e5e5e` (`122-125`). |
| `site_architecture.footer_arrangement: mirror-nav` | ✅ | `.footer-mirror` mirrors all 8 destinations with the same indices, then the 3 `content.json` columns verbatim (`index.html:462-572`). |
| `site_architecture.extra_pages/demoted_pages` | ✅ | Both empty; none invented. 9 pages exactly. |
| `homepage_narrative` | ✅ | `manifesto → value-structure → features-grid → proof-placard → install-cta`, in order, 5 = cap. Treatments match: single-sentence manifesto hero, subheadline-as-lead + spec-rows, 2 inverted hero modules + 4 support + 2 footnote, Barlow numerals + one red bar, single red button. |
| `page_blueprints.features` | ⚠️ | 8 cards, one per `features[]` id, Module Gray, 1px border, 0 radius, red rule on `#library` only. But the 24px body arrives without the title stepping up, so the card reads 24/24/24 — see ❌ below. |
| `page_blueprints.clients` | ⚠️ | 4-col grid, 5 clients, `h3` + status badge, spec-table body, repo links. Row rules do not align — see `responsive.md`. |
| `page_blueprints.download` | ✅ | Server / Clients / Ecosystem, each opened by a rule + `01/02/03`, `#clients` anchor present, ecosystem as a `repo-list` `<dl>`. |
| `page_blueprints.about` | ✅ | Philosophy / License / Contributing as `.split` blocks + a two-column FAQ `<dl>`, no accordion. |
| `copy_overlay` | ✅ | eyebrow, headline (now correctly "Your media. Grid. Logic."), subheadline as the `value-structure` lead, "Install" / "Read the spec", all three section headings, footer tagline. |
| `feature_casting` | ⚠️ | Weighting is honoured in *layout* (hero span 6 inverted, support span 3, footnote span 6 compact) and every feature appears. But all 8 print their full body, so weighting is not honoured in *disclosure*. |
| `copy_treatments` | ✅ | `spec-rows` (numbered, ruled), `spec-table`, `repo-list`, `man-page` all four built as distinct components, not restyled `<ul>`s. |
| `faq_experience` | ✅ | `frame: man-page` with a Name/Synopsis/Section header block; exact `question_order`; both `extra_questions` as `SEE ALSO` aliases cross-linking the canonical answer. Best-executed field on the site. |
| `hero_experience` (static, 0 KB JS) | ✅ | Zero JS touches the hero; `fallback` == active mode. |
| `navigation_model` (topbar) | ✅ | Sticky with no transition, 2px bottom rule, 20px-equivalent wordmark, 8 right-aligned links, hamburger below 900px, plain-`<nav>` no-JS fallback, `aria-current` + 700 + bottom rule. |
| `scroll_experience` (continuous) | ✅ | No observers, no smooth-scroll hijack, every band opens on a 2px Ink Black rule (`theme.css:102-105`). The predecessor's fade-ins are genuinely gone. |
| `easter_eggs[0]` `logo-clicks:7` | ⚠️ | Reachable, click-based (never swallows typing), Esc cancels, sweep element does not exist until fired, reduced-motion draws it statically. But the reward is announced unreliably — see `accessibility.md`. |
| `conversion_funnel` (instant-command) | ⚠️ | `download.html` opens on the one-line command; ladder step 1 "Install" (hero) → step 2 "Pick your client" (`download.html#clients`) present on 5 pages; ≤2 clicks home→download. But the hero's secondary CTA outweighs the primary — see `cta-funnel.md`. |
| `proof_strategy` | ✅ | "By the numbers" band between the grid and the closing CTA, 4 Barlow 900 numerals, one red bar under the lead metric, repo links with no printed figure, one verbatim quoted line. |
| `experience_archetype: grid` | ❌ | See ❌ below. |
| `complexity_profile` | ✅ | 5 home sections = cap; technical register; jargon foregrounded (`ItemRepository`, `metadata_json`, `CRF 23/28`, `LifecycleInterface` all unglossed, as `jargon_policy: foreground` requires). |
| `seasonal_activation: documented` | ✅ | Recorded in `SITE.md`; no date-gate JS. Correct for `mode: "documented"`. |
| `error_page_experience` | ✅ | Concept realised as content, never printed verbatim: `Expected: column 1 · row 1` / `Actual: column 3 · off-grid`, content offset by `100%/6` (= column 3), a red guide line at the real column 1, `noindex`, relative asset paths, all three `recovery_links` with descriptions. Strong. |
| `persona_vignettes` | ✅ | Drives `img/PROMPTS.md` subjects; no on-page section (home cap is 5). Legitimate use. |
| `mascot.behavior: null` | ✅ | No mascot, no companion. Absence is principled and respected. |
| `visitor_paths` (absent) | ✅ | Default; not a defect. |
| `intensity_toggle` (absent) | ✅ | Default; not a defect. |

## ✅ Passed

Every declared field is observably present. Nothing was silently dropped, and nothing absent
was invented. The four `copy_treatments` are real components with their own CSS, which is the
main thing that keeps this site from being a recoloured template.

## ⚠️ Concerns (non-blocking)

- `feature_casting` weighting is layout-only (see `content-accuracy.md`).
- The easter-egg reward is very likely never announced (see `accessibility.md`).

## ❌ Failures (must fix this round)

- **`css/theme.css:113-121` — `experience_archetype: "grid"` is implemented as decoration
  rather than as structure.** The declared archetype's single visible expression is the drawn
  column guide field, and that field is pitched on viewport twelfths instead of the container's
  12-column tracks: measured per-column error `24, 22, 20, 18, 16, 14, 12, 10, 8, 6, 4, 2` px at
  1280, and total decoupling at 1920 (guides at a 160px pitch across 0→1920 while the content
  grid is 1400px wide at a 114.67px pitch, starting at x=260). A guide field that does not mark
  the grid is, by this kit's own definition, an element that solves no problem — and on
  `404.html` it actively contradicts the page's own copy ("The red line marks where column 1
  actually is"). Full detail and the required fix are in `brand-fidelity.md`.

- **`css/components.css:391-395, 413-418` — `page_blueprints.features`' 24px body is honoured in
  isolation and destroys the card's hierarchy.** The body reaches `--text-xl` (24px, Inter 500)
  at ≥1024px as specified, but `.feature-detail h2` stays at `--text-xl` too, and the
  `.module-index` label is dragged to 24px by the specificity bug — so all three lines of every
  card are 24px. Answering the author's flagged question directly: **the 18px-below-1024px step
  is a faithful reading, not a downgrade** (both values sit on the kit's strict scale, and
  `fonts.body.usage` names 16–18px as the reading optimum), but honouring the 24px body
  *without* raising the title is a quiet downgrade of `page_generation_rules` #7. **Required
  outcome**: `.feature-detail h2/h3` → `--text-2xl` (32px) at ≥1024px so the card reads
  12 / 32 / 24.

## Recommendations (ranked by impact)

1. Derive the guide field from the real column tracks (impact: high, effort: low).
2. Step the feature-card title to 32px and restore the 12px label (impact: high, effort: low).
3. Reduce home-page feature disclosure so `feature_casting` weighting means something
   (impact: medium, effort: medium).

## Evidence

- `node tools/kit-brief.mjs --site swiss-modernist` declared-field list (18/2 split).
- `node tools/selfcheck.mjs --site swiss-modernist` → 8/8 nav labels, 5/5 narrative sections in order.
- Puppeteer geometry measurements; computed-style probe; heading-outline dump for all 9 pages.
