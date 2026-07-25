# Experience Fidelity Review — Cottagecore Bloom

**Variant**: cottagecore-bloom
**Round**: 1
**Reviewer**: adversarial reviewer (Claude Opus 5)
**Date**: 2026-07-25

## Score

- **Experience Fidelity**: 83 / 100

The kit declares **20** experience fields plus `mascot.behavior`. I verified each
one against the built output rather than against `REGEN_PLAN.md`. Eighteen are
genuinely implemented, one is claimed-but-absent, and two the author reports as
out-of-scope.

## ✅ Passed

- **`site_architecture.nav`** — all six labels, in kit order, on all ten pages
  (`index.html:331-338`). `emphasis` is a real three-tier system via
  `data-emphasis` + `components.css:151-157` (see the concern below about tier
  legibility). `aria-current="page"` is correct on every page.
- **`site_architecture.demoted_pages`** — `plugins` and `docs` are out of the
  primary nav, both still exist as full pages, both are linked from the
  mirror-nav footer (`index.html:984-985`), and `plugins` is genuinely folded into
  `features.html#plugins` (`features.html:461`), which is also the target of the
  `tinkerer` visitor path. Both are in `sitemap.xml`.
- **`site_architecture.extra_pages`** — `seasons.html` exists as a real 10th page,
  is in `sitemap.xml`, and `facts_from: ["seasonal_variants", "tagline_secondary"]`
  is honoured: the four `tagline_secondary` lines appear as the four `.script`
  pull-lines (`seasons.html:370, 397, 426, 457`) and the card prose is the kit's
  own `motif` strings. No product claim is smuggled in — `:352` explicitly says
  "Phlix itself works exactly the same in every season."
- **`site_architecture.footer_arrangement: "mirror-nav"`** — row 1 is the six nav
  labels in nav order plus the two demoted pages and the extra page
  (`index.html:977-987`); rows 2–4 are the three `content.json` columns with
  labels and hrefs verbatim, including `License (MPL-2.0)`.
- **`homepage_narrative`** — all six section ids present, in order, as real
  `<section id>` (`gate-opens`, `why-this-garden`, `what-blooms`, `guest-rooms`,
  `trust-the-keeper`, `plant-your-seed`), each with the declared source and a
  treatment that actually matches the prose (guideposts stepping in and out along
  a curve via `theme.css:332-338`; a seed-catalog with "Plate i / Plate ii" and
  `<details>` plant labels; a placard; a garden bed). `arc: story-first` is real —
  beat 2 is the kit's `story`, not a feature list.
- **`page_blueprints`** — all four templates are visible, not nominal.
  `features` = `garden-room-tour` (8 numbered rooms, `room-plaque` numerals);
  `clients` = `guest-accommodations`; `download` = `seed-planting` with three
  `<article class="step">` (`#server`, `#seeds`, `#bed`);
  `about` = `garden-journal` (`journal-page` with ruled-paper background,
  `journal-date`) ending in Gardeners' Questions.
- **`feature_casting`** — exactly as declared, which is rare. Home carries the
  two `hero` features as `.plate` articles using each `angle` **as the headline**
  (`index.html:623-626, 644-646`), the four `support` features as `.catalog-row`,
  and the two `footnote` features (dlna, plugins) deferred to a prose footnote
  (`:728-739`) that names both. All eight features appear in full on
  `features.html`. `omit_from_home: []` respected.
- **`copy_overlay`** — eyebrow, headline, three section headings and the footer
  tagline are verbatim; `content.json`'s hero subheadline is retained verbatim as
  `.hero-fact` (`index.html:442-449`) so no fact is dropped, and
  `content.json`'s `secondary_cta` "Read the docs" survives as the
  "Prefer to read first?" line (`:454-460`). Good `jargon_policy: translate`
  discipline throughout.
- **`copy_treatments`** — all four realised: `garden-guideposts` (signposts on
  posts), `gardeners-questions`, `guest-rooms`, `bookshelf` (a real shelf with
  6px `--color-neutral` bottom edge and alternating spine colours,
  `components.css:771-823`).
- **`faq_experience`** — 6 answers verbatim from `content.json` in exactly
  `question_order`; all three `extra_questions` present as a second `<dt>` on the
  correct `<dd>` (expose-internet, formats, plugins) with no new facts;
  `frame: "gardeners-questions"` and the patient garden persona are both audible.
- **`persona_vignettes`** — all three drive `img/PROMPTS.md` and align with the
  `visitor_paths` emphasis, as claimed.
- **`hero_experience.mode: "diorama-parallax"`** — five real planes with
  `data-depth` (sky 0.15 → cottage 0.35 → gate 0.6 → flowers 1 → Primrose 1.4),
  driven by pointer + scroll (`js/main.js:125-164`), rAF-throttled, mouse-only,
  clamped to the diorama height, and stilled by `isStill()`. ~1.4 KB against a
  5 KB budget. The declared fallback is what the markup ships (planes are static
  and `aria-hidden`; the copy is normal flow) so no-JS and reduced-motion carry
  identical copy. (See the concern about the composition itself.)
- **`navigation_model.mode: "topbar"`** — gate-post dividers via
  `li + li { border-inline-start }` (`components.css:130-132`), wordmark plus a
  Primrose sigil, rose underline **and** petal dot on the active link drawn with
  borders rather than an alpha fill. The plain `<nav><ul>` *is* the fallback;
  JS only adds the disclosure, which has `aria-expanded`, Esc-to-close and
  click-outside. `keyboard: null` correctly left at Tab order.
- **`scroll_experience.mode: "petal-unfold"`** — `.reveal` on exactly the five
  non-hero beats, opacity + 12px drift + 0.985→1 scale, `is-past` settle
  (`theme.css:740-756`). Dropped entirely under reduced motion *and* under calm
  mode (`:760-772`). The `sepia()` → `saturate(0.72)` substitution is the right
  call and the stated reason is correct — `sepia()` does shift luminance.
- **`easter_eggs`** — all three reachable and correctly separated from the two
  `mascot.easter_interactions` that share triggers (§19.8): sigil ×5 = petal
  shower + reward copy; Primrose ×5 = curtsy; hover-hold 2s = bubble + spiral
  (with `focus`/`blur` as the keyboard equivalent, `js/main.js:244-245`). Putting
  the click-count target on a `<button>` beside the logo instead of on the logo
  anchor is the correct fix and the reasoning at `:302-307` is right.
- **`conversion_funnel`** — `guided-steps` visible as a three-rung spine on home
  (`index.html:924-934`) with a descending button ladder (primary → secondary →
  ghost), and as the download page's structure. All three `cta_ladder` targets
  match the kit (`download`, `clients`, `download#server`), so WCAG 2.5.3 holds.
  `download_opening`'s "Three steps to blooming" is the visible page lead
  (`download.html:341`). Download is **one** click from home.
- **`proof_strategy`** — one calm band between what-blooms and plant-your-seed,
  exactly as `placement` asks. All three signals present: a spec placard, a
  community row that links to the real repo/stargazers/contributors/issues and
  explicitly refuses to print a star count (`index.html:861-864`), and one true
  quoted line. The quote is **verbatim** from `content.json`'s expose-internet FAQ
  answer, attributed to "the Phlix FAQ" and linked to `about.html#faq` (which
  exists, `about.html:420`). §5.7's reasoning is sound and honest.
- **`visitor_paths`** — the fork is built with the kit's prompt and all three
  labels/targets, nested at the end of beat 1 so `home_sections_max: 6` still
  holds. The reasoning for nesting rather than adding a 7th section is correct.
- **`experience_archetype: "narrative-scroll"`** — genuinely adopted: one
  continuous walk, alternating ground tints (`beat-cream` / `beat-butter`),
  botanical rules instead of hard edges, no tabs or carousels.
- **`complexity_profile`** — 6/6 home sections; `density: minimal` visible in the
  spacing; `jargon_policy: translate` is the site's best idea (plain sentence
  visible, precise `content.json` body one `<details>` away, fact never dropped).
- **`intensity_toggle`** — "Quiet the Garden" in the footer utility row beside the
  accessibility note with a leaf icon, exactly as `placement` says;
  `aria-pressed`, label flips to "Wake the Garden", persisted in `localStorage`
  with a try/catch, `default: full`. Deliberately not `position: fixed` — good
  call given the pilot's fixed-element collision.
- **`seasonal_activation`** — I verified the gate independently. `inRange`
  (`js/main.js:419-424`) handles the year-wrapping Midwinter range correctly
  (`a <= b ? at >= a && at <= b : at >= a || at <= b`). On 2026-07-25 `at = 725`
  and no range matches (harvest 915–1031, midwinter ≥1201 or ≤106, spring
  315–515) — **confirmed inert today**. When triggered it sets `data-season`,
  writes the override tokens *including pre-measured ink tokens*, and injects the
  banner with the correct motif SVG and a real `alt`. There is no `?season=`
  override, so the only way to exercise it is a faked clock — which is what the
  author did. All three `motif_assets` exist on disk with the declared filenames.
- **`error_page_experience`** — the best page on the site. The `concept` is
  *drawn*, not printed: a bare bed, the last of the season still standing, an
  empty trug, a tilted seed packet with "404" in `#99434F` on `#FDEEDE`
  (5.65:1), Primrose hovering above it, two drifting petals
  (`404.html:337-395`). `robots noindex` present, relative assets only, and all
  three `recovery_links` offered as a descending button ladder.
- **`mascot.behavior`** — all five `tips[]` are present, one per declared page,
  and four match their selectors **exactly** (`.features-overview`,
  `.feature-grid` — the features container carries
  `class="room-tour feature-grid"` for that purpose, `#server`, `.faq-list`).
  Present on exactly Home / Features / Download / About. Idle drift, curtsy,
  hover-hold, and the "Primrose, rest now" dismiss with `localStorage`
  persistence are all built.

## ⚠️ Concerns (non-blocking)

- **`copy_overlay.hero.secondary_cta.label` is declared as `"Peek Inside"`; the
  site ships `"Peek Inside the Garden"`** at `index.html:452`,
  `clients.html:482` and `plugins.html:471`. The `copy_overlay` row of
  `REGEN_PLAN.md:21` claims the hero copy comes "from the overlay" and does not
  record any CTA deviation. The expansion is harmless and arguably better, but a
  declared literal was silently altered. Use the declared label or record the
  change.
- **`seasonal_activation.banner` is paraphrased, not reproduced.** The kit's
  string is "The garden is blooming in its season — come see what's growing."
  `js/main.js:446` emits
  `` `${season.name} — the garden is blooming in its season, come see what's growing.` `` —
  lower-cased and with the em-dash demoted to a comma. Prefixing the season name
  is a good addition; the declared sentence should survive intact inside it.
- **`intensity_toggle.affects` includes `easter_eggs`, but the three eggs are
  gated inconsistently.** The typed-word egg is fully suppressed in calm mode
  (`js/main.js:355`), but the sigil egg still shows its reward toast (`:317-328`
  — only `petalShower` is stilled, via `isStill()` at `:284`) and the hover-hold
  egg still shows "Keep tending." (`:233-236`). Pick one rule — either calm mode
  stills only the *motion* of the eggs, or it disables them — and apply it to all
  three.
- **The `hero_experience` composition does not read as the declared "gate
  frame".** `theme.css:168-182` sets `.hero-plane { height: 100% }` but the inner
  `svg` is `inset-block-end: 0; width: 100%; height: auto`, so each plane's real
  height is width÷aspect and every plane is pinned to the bottom edge. Measured:

  | viewport | hero height | tallest plane | hero with no art |
  | --- | --- | --- | --- |
  | 375 × 667 | 1109 px | 210 px | **81 %** |
  | 768 × 1024 | 1067 px | 430 px | 60 % |
  | 1280 × 900 | 1138 px | 717 px | 37 % |

  The kit asks for a diorama that *frames* the copy ("gate frame, climbing roses
  … The gate opens and the headline emerges as if stepping through") and whose
  `fallback` is "a single, hand-painted cottage garden watercolour with the gate
  already open". What ships is a thin garden strip along the bottom edge with the
  copy floating above it in empty ivory. Give the planes a min-height or carry the
  botanical motif up the sides.
- **The `visitor_paths` fork fragments the illustration rather than standing in
  it** (the author's own uncertainty (b), confirmed). At 375px and 768px the
  opaque `--color-surface` `.path-card` fills (`components.css:317`) sit directly
  on `plane-gate` and `plane-flowers` and cut the art into disconnected pieces,
  and `plane-bee` (`theme.css:207-211`, `margin-inline-start: 62%`) lands on a
  card edge. It reads as clutter behind cards, not cards in a meadow. Drop the
  flower plane's opacity behind the fork or move `.paths` below the botanical
  rule.

## ❌ Failures (must fix this round)

- **`sites/cottagecore-bloom/REGEN_PLAN.md:18` claims
  "`logline` printed as the hero deck". It is nowhere on the site.**
  `homepage_narrative.logline` is "Step through the garden gate and discover your
  own corner to cultivate — a place where watching feels like home."
  `grep -i "own corner to cultivate\|Step through the garden gate"` across all ten
  HTML files returns nothing, and the hero (`index.html:434-449`) carries only
  eyebrow → h1 → `.script` tagline → `.hero-sub` → `.hero-fact`. A manifest row
  claimed-but-not-done is a ❌.
  **Required outcome**: render the logline as a real deck line in `#gate-opens`
  (between the script tagline and `.hero-sub` is the natural slot, and it is the
  one place on the page that carries no other declared string), or strike the
  claim from `REGEN_PLAN.md:18`.

## Notes on the two fields reported as out of scope

I judged both, as asked:

- **`sound_identity`** — I accept this as **not** an unimplemented declared field.
  All five entries describe *sounds* (a music-box chime, a plucked harp note, a
  wooden clack); a marketing page has no event that any of them could
  legitimately attach to, and wiring a UI-click sound to a nav link on a page
  with no mute control is a WCAG 1.4.2 hazard. It is documented in `SITE.md` as
  identity. Correct call.
- **`responsive_behavior.tv`** — also acceptable. `responsive_behavior` is not in
  the declared-experience-field list at all; the `tv` entry describes a 10-foot
  product UI with D-pad spatial navigation, which is a client-app spec, not a web
  page behaviour. Note that `desktop`, `tablet` and `mobile` *are* honoured
  (1400px cap, 2–3 column grids, 48px targets, single column, press-not-hover).

## Recommendations (ranked by impact)

1. Ship the logline in the hero (impact: high, effort: low) — it closes the only ❌.
2. Give the diorama planes a min-height so the frame surrounds the copy (impact: high, effort: medium).
3. Restore the declared `secondary_cta` label and the declared banner sentence (impact: medium, effort: low).
4. Make calm mode treat all three eggs the same way (impact: low, effort: low).

## Evidence

- `node tools/kit-brief.mjs --site cottagecore-bloom` — declared-field list (20),
  nav table, narrative table, egg list.
- `node tools/selfcheck.mjs` → "6 nav label(s), all present; 6/6 narrative
  sections in order".
- `node tools/render-check.mjs --shots` → PASS, 10 pages (seasons.html now gated).
- Puppeteer measurement of `.hero` vs `.hero-plane svg` at 375 / 768 / 1280
  (`scratchpad/probe.mjs`).
- Manual date-gate trace of `inRange` for 2026-07-25 against all three ranges.
