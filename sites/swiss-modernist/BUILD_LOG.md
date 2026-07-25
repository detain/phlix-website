# BUILD_LOG.md — Swiss Modernist

## Regeneration, 2026-07-24 → 2026-07-25

Regenerated from `brand-kits/swiss-modernist.js` so the site implements the kit's declared
**experience** schema rather than the shared 2026-07-04 template. Plan and field-by-field
diff: `REGEN_PLAN.md`. Design rationale and every measured contrast ratio: `SITE.md`.

### Shipped

| File                        | State                                                                        |
| --------------------------- | ---------------------------------------------------------------------------- |
| `index.html`                | Rewritten — 5 bands in `homepage_narrative` order, arc `manifesto-first`     |
| `features.html`             | Rewritten — `page_blueprints.features`, one `.feature-detail` per feature id |
| `clients.html`              | Rewritten — card grid whose bodies are spec tables                           |
| `download.html`             | Rewritten — `conversion_funnel: instant-command`, three ruled blocks         |
| `plugins.html`              | Rewritten — contract / reference implementation / write-your-own             |
| `docs.html`                 | Rewritten — numbered link-out index + ecosystem repo list                    |
| `hub.html`                  | Rewritten — what it does / self-host or public / hub mode in clients         |
| `about.html`                | Rewritten — three ruled blocks + man-page FAQ                                |
| `404.html`                  | **New** — `error_page_experience`, "Missing grid alignment"                  |
| `css/base.css`              | Rewritten; tokens + the generated `@font-face` block (nine faces)            |
| `css/theme.css`             | Rewritten — grid, band structure, typographic roles                          |
| `css/components.css`        | Rewritten — topbar, buttons, modules, spec tables, FAQ, footer, egg          |
| `js/main.js`                | Rewritten — nav toggle + the one easter egg; ~5.5 KB                         |
| `img/og.svg`                | Reworked; `og.png` regenerated with `tools/gen-og.mjs`                       |
| `img/PROMPTS.md`            | Rewritten — seeded from `persona_vignettes`                                  |
| `img/logo.svg`              | Carried forward unchanged (full-identity lockup, keeps its red underrule)    |
| `img/favicon.svg`           | Redrawn — Grid White "P" on Ink Black, not on a Basel Red field              |
| `docs.html` §02             | New — "Read in this order" `spec-rows` index; §03 points at `download.html`  |
| `sitemap.xml`, `robots.txt` | Regenerated with `tools/gen-sitemap.mjs --site swiss-modernist`              |
| `SITE.md`                   | Rewritten                                                                    |
| `REGEN_PLAN.md`             | New                                                                          |

### Defects in the predecessor that this pass fixes

1. **No `404.html`** at all — `new_site.md` §2A requires a real per-kit page. Added.
2. **Stale licence in four places** — the old site said `BSD-3-Clause` in the footer, the
   closing CTA, the JSON-LD `license` field and the `og.svg` bottom bar. `content.json` is
   the authority: `phlix-server` and `phlix-hub` are **MPL-2.0**; the shared libraries,
   plugins and clients are **MIT**. Never stated as one licence across the board (§16).
3. **A hero `01` numeral at 1.19:1** — an invisible watermark that `render-check` failed.
   Treated as a defect, not decoration: section numerals are now real numbered indices
   inside their own heading at Rule Gray `#888888` = **3.33:1**, clearing 3:1 as large
   graphical text. Nothing was marked `aria-hidden` to dodge the check.
4. **Basel Red on Grid White used for small text.** Measured 4.43:1, not the 4.6:1 the kit
   asserts (§19.1). Small text on red now sits on the derived `#CC0018` (5.51:1); pure Basel
   Red is confined to rules, the focus ring and large accents.
5. **Rule Gray `#888888` used as a text colour** at 3.33:1. Small secondary text now uses
   the derived `#5E5E5E` (6.09:1 on Grid White).
6. **A broken footer link** — API reference pointed at `…/phlix-docs/reference`; it is
   `…/phlix-docs/reference/api.html` per `content.json`.
7. **Scroll behaviour contradicting the kit** — the old `main.js` shipped
   `IntersectionObserver` fade-ins with inline `translateY` and a smooth-scroll hijack on
   every in-page anchor. `scroll_experience.mode` is `continuous`; both are removed.
8. **A concatenated install command** rendered as one unreadable line
   (`composer create-project detain/phlix-server cd phlix-server php start.php`). It is now
   a single valid `&&`-joined command inside a `<pre>`.

### Intentional deviations, and why

- **Two red marks in the hero band.** `design_principles` says "once per view";
  `page_generation_rules` demands both a red headline rule and a red CTA. Resolved as one
  red mark per band, with the hero carrying the anchor rule plus the primary action.
  Recorded in `REGEN_PLAN.md` §5.1 and `SITE.md`.
- **`feature_casting.footnote` features appear on the home page.** §2A says "Features page
  only"; `homepage_narrative` says "remaining six features … below". Both honoured:
  `plugins` and `hub` render as compact footnote rows. `REGEN_PLAN.md` §5.5.
- **Ink Black modules on the home page** where `do_dont.colors` says "no dark backgrounds
  anywhere" but the narrative treatment asks for "dark cards". The narrative wins for its
  own section (§19.6); `logo_rules.colors` already sanctions Ink Black surfaces.
  `REGEN_PLAN.md` §5.4.
- **No printed star or issue count.** `proof_strategy` asks for live counts; §19.7 forbids
  unverifiable figures on a static page. Labelled links to `/stargazers` and `/issues`
  instead.
- **The `proof_strategy` docs quote is attributed to the project, not to "docs.phlix".** The
  line is verbatim from `content.json.pitch_bullets[0]`; attributing it to a docs page I
  cannot verify would be a fabrication. `REGEN_PLAN.md` §5.7.
- **`copy_overlay.hero.headline`** once read "Your media. Grid. Grid. Logic." The repeated
  "Grid." was a slip in the kit and has since been corrected upstream; the shipped headline is
  **"Your media. Grid. Logic."** — consistent across `index.html`, `<title>`, the OG/Twitter
  metadata, `img/og.svg`, `img/logo.svg` and `sitemap.xml`.
- **Display type uses `min(<scale step>, <vw>)`** rather than bare px steps. The strict
  scale is honoured exactly at desktop; the clamp is what makes 320px and 200% text zoom
  reflow without horizontal scroll (§12/§14).
- **`overflow-wrap: anywhere` is on body-weight text, off for display roles.** Only `anywhere`
  (not `break-word`) reduces min-content size, and without it ordinary long words set grid-track
  minimums that overflow at 200% text zoom on all nine pages. Applied to `h1`–`h6` it also
  licensed unmarked mid-word breaks in oversized Inter Black and hid future overflow bugs, so
  headings and `blockquote` now use `hyphens: auto` + `overflow-wrap: break-word`: the break is
  marked where English allows it, and min-content stays intact so a real track-sizing bug still
  shows. Tightening it all the way down to `code` + the spec/repo `<dd>`s was tried and failed
  render-check 9/9 (343–389 > 320 at 320px/200%) — the offenders are body copy in narrow grid
  tracks (`.spec-rows`, `.footer-mirror`, `.link-list`, `.feature-detail`), not code strings.
- **Inter 700 and JetBrains Mono 700 are not shipped**, even though `tools/vendor-fonts.mjs`
  backfills a 700 face for every prose family. This kit declares Inter 400/500/600/800/900 and
  JetBrains Mono 400/500; 700 appears in no role, and a file being in the shared pool is not
  permission to use it. `strong`/`b` and the two nav emphasis rules weigh **600**. Nine faces
  ship. Re-running the generator will re-add both blocks — see `REGEN_PLAN.md` §6.

### Verification

```
node tools/gen-og.mjs --site swiss-modernist        → wrote 1 og.png
node tools/gen-sitemap.mjs --site swiss-modernist   → 8 URLs + robots.txt
node tools/selfcheck.mjs --site swiss-modernist     → PASS
node tools/render-check.mjs --site swiss-modernist  → PASS (9 pages x 6 viewports + 200% zoom)
npx prettier --write "sites/swiss-modernist/**"     → clean
```

`selfcheck` emits one WARN — "kit claims contrast 4.5:1 — verify by measurement" — which is
the §19.1 reminder, not a defect. It was verified: see the measured table in `SITE.md`.

## Round-1 review fixes, 2026-07-25

The mechanical gates were already green before this pass, so they prove nothing about these
fixes. Each was verified by measuring computed geometry in headless Chromium.

| What                    | Measured result                                                                                                               |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| Column guides           | guide edge − real container track edge = **0.00px** at 1024 / 1280 / 1440 / 1920 / 2560; guide 9 == `.hero-aside`'s left edge |
| Feature card type scale | label / title / body = **12 / 24 / 18** below 1024px, **12 / 32 / 24** at ≥1024px (was a flat 24 / 24 / 24)                   |
| Hero CTA weight         | primary **176×62.4 = 10,981px²** vs ghost secondary **161.7×62.4 = 10,086px²** at 320 / 375 / 768 / 1280 — primary dominant   |
| Four-up card baselines  | `.spec-table` / `.btn` top spread across the row = **0.0px** at 1024 / 1280 / 1400 (was a 33px stagger)                       |
| Heading outline         | `features.html` = H1 → H2 → H3 ×8 (was H1 → H2 → H2 ×8)                                                                       |
| Header wordmark         | one `<text>` child, no `<rect>` — zero red marks in the nav on all nine pages                                                 |
| Easter-egg live region  | present and empty at load (`role=status`, `aria-live=polite`, `display:none`), fills one frame after the 7th click, held 4s   |
| `aria-expanded`         | open at 700px → `false` and menu closed after resize to 1200px                                                                |
| Nav emphasis ladder     | mobile: primary w600 + 2px rule / default w500 + 1px / muted w500 gray — three distinguishable levels after 700 → 600         |
| `<strong>`              | four uses, all computing to **600** (the kit's declared `ui` emphasis weight)                                                 |

### Known follow-ups

- **`tools/vendor-fonts.mjs` requests 700 for every `body`/`ui`/`mono` role, and for this kit
  that is wrong.** The pool backfill was a real fix for a real gap, but it made the _generator_
  emit weights the kit does not declare: Inter 700 (declared: 400/500/600/800/900) and JetBrains
  Mono 700 (declared: 400/500). Both `@font-face` blocks are removed by hand here and
  `strong`/`b` weigh 600. The generator should intersect the pool with the kit's declared
  per-family weight union instead of assuming 700 — until it does, re-running it re-introduces
  both faces on this site. `REGEN_PLAN.md` §6.
- `og.png` is rasterised by `rsvg-convert`, which does not embed the brand WOFF2 faces, so
  the card's type renders in the system fallback of the Inter / Barlow / JetBrains stacks.
  Fixing that properly means rendering the card in a browser — a `tools/**` change.
