# BUILD_LOG.md — Swiss Modernist

## Regeneration, 2026-07-24 → 2026-07-25

Regenerated from `brand-kits/swiss-modernist.js` so the site implements the kit's declared
**experience** schema rather than the shared 2026-07-04 template. Plan and field-by-field
diff: `REGEN_PLAN.md`. Design rationale and every measured contrast ratio: `SITE.md`.

### Shipped

| File                              | State                                                                        |
| --------------------------------- | ---------------------------------------------------------------------------- |
| `index.html`                      | Rewritten — 5 bands in `homepage_narrative` order, arc `manifesto-first`     |
| `features.html`                   | Rewritten — `page_blueprints.features`, one `.feature-detail` per feature id |
| `clients.html`                    | Rewritten — card grid whose bodies are spec tables                           |
| `download.html`                   | Rewritten — `conversion_funnel: instant-command`, three ruled blocks         |
| `plugins.html`                    | Rewritten — contract / reference implementation / write-your-own             |
| `docs.html`                       | Rewritten — numbered link-out index + ecosystem repo list                    |
| `hub.html`                        | Rewritten — what it does / self-host or public / hub mode in clients         |
| `about.html`                      | Rewritten — three ruled blocks + man-page FAQ                                |
| `404.html`                        | **New** — `error_page_experience`, "Missing grid alignment"                  |
| `css/base.css`                    | Rewritten; tokens + the generated `@font-face` block carried forward         |
| `css/theme.css`                   | Rewritten — grid, band structure, typographic roles                          |
| `css/components.css`              | Rewritten — topbar, buttons, modules, spec tables, FAQ, footer, egg          |
| `js/main.js`                      | Rewritten — nav toggle + the one easter egg; ~4 KB                           |
| `img/og.svg`                      | Reworked; `og.png` regenerated with `tools/gen-og.mjs`                       |
| `img/PROMPTS.md`                  | Rewritten — seeded from `persona_vignettes`                                  |
| `img/logo.svg`, `img/favicon.svg` | Carried forward unchanged                                                    |
| `sitemap.xml`, `robots.txt`       | Regenerated with `tools/gen-sitemap.mjs --site swiss-modernist`              |
| `SITE.md`                         | Rewritten                                                                    |
| `REGEN_PLAN.md`                   | New                                                                          |

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
- **`copy_overlay.hero.headline` ships verbatim** as "Your media. Grid. Grid. Logic." — the
  repeated "Grid." looks like a slip in the kit, but the overlay is the declared authority
  for presentation copy. Flagged rather than silently corrected.
- **Display type uses `min(<scale step>, <vw>)`** rather than bare px steps. The strict
  scale is honoured exactly at desktop; the clamp is what makes 320px and 200% text zoom
  reflow without horizontal scroll (§12/§14).
- **`overflow-wrap: anywhere`** is set on text elements site-wide. Only `anywhere` (not
  `break-word`) reduces min-content size, and without it long identifiers
  (`LifecycleInterface`) and bare repo URLs set grid-track minimums that overflowed the
  viewport at 200% text zoom on seven of the nine pages.

### Verification

```
node tools/gen-og.mjs --site swiss-modernist        → wrote 1 og.png
node tools/gen-sitemap.mjs --site swiss-modernist   → 8 URLs + robots.txt
node tools/selfcheck.mjs --site swiss-modernist     → PASS
node tools/render-check.mjs --site swiss-modernist  → PASS (9 pages x 2 viewports)
npx prettier --write "sites/swiss-modernist/**"     → clean
```

`selfcheck` emits one WARN — "kit claims contrast 4.5:1 — verify by measurement" — which is
the §19.1 reminder, not a defect. It was verified: see the measured table in `SITE.md`.

### Known follow-ups

- ~~The shared font pool has no Inter 700, so `strong`/`b` resolve to the 600 face.~~
  **Resolved by the orchestrator:** `inter-700-latin.woff2` is now vendored, and
  `strong`/`b` here are `font-weight: 700`. The gap was systemic rather than
  Inter-specific — no kit ever *declares* 700 (it is what `bolder` on 400 body text
  computes to), so the vendoring pass never fetched it for any family.
  `tools/vendor-fonts.mjs` now always requests 700 for the `body`/`ui`/`mono` roles.
- `og.png` is rasterised by `rsvg-convert`, which does not embed the brand WOFF2 faces, so
  the card's type renders in the system fallback of the Inter / Barlow / JetBrains stacks.
  Fixing that properly means rendering the card in a browser — a `tools/**` change.
