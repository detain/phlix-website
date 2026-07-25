# Site regeneration program — rebuild all 50 brand-kit sites against the experience schema

**Status:** Phase 0 not started. **Owner:** orchestrator agent (delegates; does not author sites itself).
**Created:** 2026-07-24.

---

## 1. Why this program exists

On **2026-07-04** (`f689f5b`) all 50 sites under `sites/<slug>/` were authored. On
**2026-07-13** (`eb95be3`) all 50 `brand-kits/*.js` files gained 21 new
*experience* fields — `site_architecture`, `homepage_narrative`, `page_blueprints`,
`feature_casting`, `copy_overlay`, `copy_treatments`, `faq_experience`,
`persona_vignettes`, `hero_experience`, `navigation_model`, `scroll_experience`,
`easter_eggs`, `conversion_funnel`, `proof_strategy`, `visitor_paths`,
`experience_archetype`, `complexity_profile`, `intensity_toggle`,
`error_page_experience`, plus `mascot.behavior` and `seasonal_activation` — whose
whole purpose is to make each kit a genuinely different *product experience*, not
a palette swap.

**No site has been regenerated since.** The published HTML predates the schema by
nine days. Measured drift:

| Symptom | Count |
| --- | --- |
| Sites not using their kit's `site_architecture.nav` | **43 / 50** |
| Kits declaring `extra_pages` → pages that exist | **16 → 0** |
| Kits declaring `intensity_toggle` → sites implementing it | **34 → 0** |
| Sites referencing `easter_eggs` | **0 / 50** |

`tools/build.mjs` **does not generate sites** — it copies `sites/<slug>/` into
`dist/<slug>/`, minifies CSS, and injects the gallery manifest. Regeneration is an
**authoring pass** (`new_site_prompt.md` + the `new_site.md` rulebook), and its
`sites/` output must be **committed** (`dist/` is gitignored). A force-rebuild push
would republish the same stale HTML.

### Scope note — this is a rebuild, not a touch-up

Each kit's experience fields change *structure*: nav, section order, page
inventory, funnel. That can't be patched into the July-4 HTML incrementally; each
site is re-authored from its kit. Treat the existing site as **prior art to beat**,
not a base to edit.

---

## 2. Phase 0 — repair the toolchain and assets (BLOCKING)

The verification gates are currently red, so a 50-site regen would have **no
signal**. Fix this first. Every item is independently committable.

### 0.1 `npm run meta` is broken outright
`tools/check-meta.mjs:27` globs `variants/` — deleted on 2026-06-30 — and exits 1
on zero matches, so `npm test` can never pass. Point it at `sites/`; exempt
`404.html` from the canonical-collision rule if needed (it is `noindex`).

### 0.2 ~~Two~~ **113** CSS files had real syntax errors — ✅ DONE
The copyright-header commit `77afc8e` injected a bare ` * @copyright …` line
outside any comment block. Only two were visible (prettier reports one syntax
error per file and stops); a comment-mask scan of all 608 files under `sites/`
found the line had landed outside a comment in **113 of the 150 CSS files** —
i.e. **every one of the 50 sites was silently dropping stylesheet rules in
production**. All 113 fixed; `postcss.parse` now clean across all 608 files.
The 50 `.js` files from the same commit were fine.

Still open (cosmetic, deliberately not folded into a syntax repair): 33 CSS files
where the line landed *inside* an existing banner comment — valid CSS, untidy —
and the fact that headers now sit mid-file in 146 CSS files and at line 1 in only
4.

### 0.3 The `Lint` workflow has never passed
`gh run list --workflow=lint.yml --branch master` is **failure on every push back
to at least 2026-07-05**, while `pages.yml` succeeds — the gate is decorative, and
nothing blocks a deploy on it. Current debt:

| Check | State |
| --- | --- |
| `lint:css` (stylelint) | **2570 errors** (1754 auto-fixable) |
| `format:check` (prettier) | **425 files** unformatted + the 2 syntax errors above |
| `lint:html` (htmlhint) | 1 error |
| `lint:js` (eslint) | ✅ clean |
| `linkcheck` | ❌ (also failing on schedule since 2026-07-20) |

**Resolved — `npm run lint` is now green** (`lint:html`, `lint:css`, `lint:js` all
clean) and `npm run format:check` reports 0. How, and the two traps met on the
way:

- **`stylelint --fix` silently strips vendor prefixes.** `stylelint-config-standard`
  enables `property-no-vendor-prefix`, so a plain `--fix` removed 57 `-webkit-`
  declarations — including `-webkit-text-stroke`, which has **no** unprefixed
  equivalent (the effect simply disappears) and `-webkit-background-clip: text`,
  the canonical gradient-text technique. It also turned valid prefixed/unprefixed
  pairs into literal duplicate properties, which is where the 25
  `declaration-block-no-duplicate-properties` errors came from. `property-no-vendor-prefix`
  and `value-no-vendor-prefix` are now **off**; prefix count verified 275 before
  and after. **Never run `stylelint --fix` on this repo without that guard.**
- **stylelint and prettier fought.** With `rule-empty-line-before` and friends on,
  prettier-clean files reported 600+ phantom errors. Since `format:check` is the
  enforced gate, prettier owns formatting: `rule-empty-line-before`,
  `comment-empty-line-before`, `at-rule-empty-line-before`, `function-url-quotes`,
  `font-family-name-quotes` and `keyframes-name-pattern` are disabled. Substantive
  rules stay on, so a red `lint:css` now means a real defect.
- **Real defects found and fixed by the substantive rules** (the reason not to just
  disable everything): 5 `@font-face` blocks using `style:` instead of
  `font-style:`, 4 invalid three-value `font-weight` ranges
  (`400 600 900` — a variable-font range takes two), and 15 duplicate selectors of
  which **8 carried a silently-dead `line-height`/`color` declaration**. The
  duplicates were merged later-block-wins, which is behaviour-preserving because
  the later declaration already won; verified by diffing full computed styles for
  13 affected selectors across 9 sites in a real browser — all identical (the one
  apparent difference was an in-flight `inkDissolve` animation, identical once
  settled).
- One genuine `htmlhint` error fixed: a duplicated `rel` attribute at
  `sites/stardust-observatory/download.html`.

Note for JSON configs: stylelint validates rule names, so `"//": "comment"` keys
are parsed as unknown rules and generate one error per file. Rationale goes here,
not in `.stylelintrc.json`.

### 0.4 Brand typography is broken or absent on 45 of 50 sites
Typography is a primary brand-kit dimension and it is mostly not rendering:

| State | Count | Notes |
| --- | --- | --- |
| Working self-hosted fonts | **5** | `chrome-velocity`, `copper-steampunk`, `cosmic-horror`, `moroccan-bazaar`, `street-mural` |
| **Broken** `@font-face` → silent system fallback | **14** | 131 of 182 `woff2` refs resolve to nothing (e.g. `solarpunk-eden` → `../fonts/*.woff2`, no `fonts/` dir) |
| External Google Fonts CDN | **5** | `editorial-underground`, `holographic-future`, `manga-studio`, `pixel-dungeon`, `soundwave-studio` — violates new_site.md §7 (self-hosted, no CDN) **and** the documented CSP `font-src 'self'` |
| No webfonts at all | **26** | system fonts only |

**Decided (2026-07-24): vendor the real WOFF2 per kit.** Typography is a primary
brand dimension and the point of the program is that kits feel like different
products, so each kit gets the actual families its `fonts{}` block names,
latin-subset, self-hosted under `sites/<slug>/css/fonts/` (the layout
`chrome-velocity` already uses). Requires a per-family licence check — prefer
OFL/Apache families and record the licence in `SITE.md`. An authoring agent cannot
invent font binaries, so the files must be vendored **before** the kit is
re-authored, and `new_site.md` §7 needs this written into it.

Note the 5 CDN sites also violate the documented CSP (`font-src 'self'`), and a
related finding: **`_headers` sets `script-src 'self'` with no `'unsafe-inline'`,
yet `sites/prairie-bloom/index.html` and `sites/psychedelic-groove/index.html` ship
inline footer-year scripts** that the CSP kills. (`_headers` is Cloudflare-format
and inert on GitHub Pages today, so this is latent rather than live — but it will
bite on any move to Cloudflare, and the regen should not add inline scripts.)

### 0.5 Stale tooling paths
- `.github/workflows/linkcheck.yml` PR trigger still filters on `variants/**/*.html` → never fires on `sites/**`.
- `tools/dev-server.mjs:150-198` and `tools/preview-all.mjs` serve the deleted `variants/`, so **`npm run dev` / `npm run preview` do not work** — authoring agents currently have no local preview.
- `shared/data/brand-kits.json` (25 legacy slugs) + `tools/render.mjs` + `tools/scaffold-new-variants.mjs` are dead relative to the deploy path. Delete or clearly mark legacy so agents stop treating them as source of truth.
- `package.json` still carries ~35 `dev:NNNN` / `build:waveN` / `preview:waveN` scripts naming the deleted variant system.

### 0.6 Root pages are unlinted
`lint.mjs` patterns cover `variants/**` and `sites/**` only, so the hand-authored
root `index.html` and `404.html` are never linted. Add them, or note the exclusion
deliberately.

### 0.7 The OG/meta pipeline was broken end to end — ✅ DONE
`gen-og.mjs`, `fix-meta.mjs` and `a11y.mjs` all still globbed `variants/`.
`gen-og.mjs` being dead was the root cause of a live SEO defect: with no `og.png`
ever generated, **305 of 402 pages** advertised `og:image` as a relative `.svg`,
which social platforms will not render. Separately **288 of 402 pages** carried a
spurious `/sites/` segment in `canonical`/`og:url` — build copies `sites/<slug>/`
to `dist/<slug>/`, so every one of those URLs 404s live. `check-meta` reported
**1991 problems**; it now passes clean across all 402 pages.

Two real `gen-og.mjs` bugs surfaced: named XML entities (`&mdash;`/`&nbsp;`/`&bull;`
are undefined in a DTD-less SVG, so libxml2 rejects the whole document — browsers
are lenient, which is how they passed authoring), and SVG rasterisation
(ImageMagick 6 advertises an rsvg delegate but parses SVG with its internal MSVG
renderer, which reads `fill="url(#noise)"` as a colour named `noise` and drops
patterns/filters — rendering now prefers `rsvg-convert`, which needs
**`librsvg2-bin` installed**). It also no longer aborts the batch on the first bad
file.

### 0.8 Broken links: 537 → 166 — mostly RESOLVED

**Correction to an earlier version of this section**, which claimed the docs site
"has **no reference/API page at all**" and put the count near 945. Both were wrong.
The API reference has existed all along at
`https://detain.github.io/phlix-docs/reference/api.html` ("Phlix Media Server API
Reference"). It was missed because the earlier probe guessed at paths
(`api/overview.html`, `dev/api.html`, `reference/overview.html`) and because **the
docs nav has no Reference entry**, so a crawl from the homepage never reaches the
`/reference/` section. The real starting count was **537** broken of 2139 scanned.

The docs site is VitePress with `cleanUrls: false`, so every route is `<path>.html`.
Two measured facts about GitHub Pages that drove the fix:

1. It **already** serves extensionless URLs — `/phlix-docs/faq` → 200, no config.
   So there was never an "extensions" problem to solve.
2. A sibling `<name>.html` **outranks** `<name>/`. Provable live: `/libraries` → 200
   while `/libraries/` → 404, because `docs/libraries.md` exists.

Fact 2 is what made this cheap. The bare paths 404'd only because five sections had
a directory and no sibling page, and VitePress emits no directory index. Adding five
landing pages (`reference`, `developers`, `hub`, `hub-admin`, `dev`) in
**phlix-docs#88** repaired **528 of 537** links with **zero changes to the 50 sites**
— all five verified 200 live. Separately, **#58** repointed `content.json`'s "API
reference" entry at `reference/api.html` so regenerated sites link to the precise
page. The `og.png` class resolved itself on deploy.

**Now at 166**, and the rest is authoring drift that regeneration fixes from
`content.json`, which is already correct:

| Pattern | Files | Verdict |
| --- | --- | --- |
| `github.com/phlix-website/blob/master/LICENSE` | 113 | Malformed — org segment missing. `content.json:186` already has the right URL (200). |
| `detain/phlix-server/blob/master/LICENSE` | 33 | **That repo has no LICENSE file** — see §0.9. |
| `detain/phlix-website/blob/main/LICENSE` | 8 | Wrong branch; it's `master`. |
| `phlix-docs/{developer,user,plugins,guide,development,api}` | ~12 | One-off typos. Map: `developer`/`development` → `/dev`, `user`/`guide` → `/first-run`, `plugins` → `/plugins/developer-guide`, `api` → `/reference/api`. |
| doubled `…/<slug>/stardust-observatory/404.html` | 2 | Path built twice. |

Do **not** hand-fix these in the old HTML — it is throwaway work on files about to
be re-authored. The regen prompt must simply take every URL from `content.json`.

Also note **`npm test` includes `linkcheck`, which validates absolute URLs against
the live deployed site.** That makes it unusable as a strict pre-merge gate for any
newly added asset — new pages and images cannot pass until after they deploy. Treat
`linkcheck` as a post-deploy check with a known-broken baseline, not a merge gate.

### 0.9 The published license claim contradicts the code — BLOCKING, owner decision

All 50 sites state BSD-3-Clause as **fact**, including a FAQ answer sourced from
`content.json`: *"What's the license?" → "BSD-3-Clause across the board."* The
repos say otherwise:

| Repo | Declares |
| --- | --- |
| **phlix-server** | **`"license": "proprietary"`** in `composer.json`, and README: *"Proprietary - All rights reserved."* **No LICENSE file exists.** |
| phlix-hub | MIT |
| phlix-shared | MIT |
| phlix-docs | BSD-3-Clause |
| phlix-website | BSD-3-Clause (has a real BSD-3 `LICENSE`, © 2026 Joe Huss and contributors) |

So "BSD-3-Clause across the board" is not true of any of the three code repos, and
the flagship server is marked proprietary. This is a licensing decision for the
owner — **not** something to normalise automatically, and adding a LICENSE file to
`phlix-server` would contradict its own manifest.

It blocks Phase 1 because the regen prompt requires every fact to trace to
`content.json`; as written, all 50 regenerated sites would republish this claim.
Resolve the intended licensing first, then make `content.json` match.

**Phase 0 exit bar (revised):** `npm run lint`, `npm run format:check` and
`npm run meta` green on master (**all now true**); the font policy decided and
written into `new_site.md` §7 (**decided: vendor real WOFF2 per kit** — still to be
written up and the files vendored); `npm run dev` serves `sites/`; and the
`linkcheck` baseline recorded with the docs-URL decision above made.

---

## 3. Phase 1 — pilot one kit (calibration gate)

Regenerate **exactly one** kit end-to-end and stop. Recommended pilot:
**`abstract-canvas`** — it has a fully specified `site_architecture.nav` that
renames every item and demotes `plugins`/`docs` to the footer
(`brand-kits/abstract-canvas.js:1290-1301`), so "did the experience fields
actually land?" is trivially checkable, and its accent is one of the 6 the 404
shim rejects, exercising that path too.

The pilot answers questions that would otherwise be answered 50 times:

1. Does a regen pass driven by `regen_site_prompt.md` produce a site that is
   *visibly* a different experience from its July-4 predecessor — different nav,
   section order, funnel — or does it converge back on the shared template?
2. How many adversarial review rounds does one kit actually need?
3. What does one kit cost in wall-clock and tokens? (Multiply by 50 for the
   program budget; report it before Phase 2 is approved.)
4. Do the experience fields conflict with the §18 DoD anywhere?

**Do not start Phase 2 until the pilot diff has been reviewed by a human.** If the
pilot converges back on the old template, the prompt is wrong and fixing it once is
worth far more than 50 mediocre regens.

---

## 4. Phase 2 — waves of five

Ten waves × 5 kits. Wave composition should mix archetypes so a systemic prompt
failure shows up early rather than concentrating in one aesthetic family.

Per kit, the cycle is:

| Role | Does | Writes |
| --- | --- | --- |
| **A. Author** | Runs `regen_site_prompt.md` for one slug | `sites/<slug>/**`, `BUILD_LOG.md`, `SITE.md` |
| **B. Reviewer** | Fresh agent, has not seen A's reasoning; all 13 dimensions of `docs/REVIEW_RUBRICS.md` + experience fidelity | `reviews/<slug>/<dimension>.md` |
| **C. Fixer** | Applies every ❌ and reasonable ⚠️ | `sites/<slug>/**` |
| **D. Verifier** | Runs the gates, pastes **actual** output | `reviews/<slug>/FINAL-REVIEW.md` |

Loop B→C until a full round yields no ❌ and no dimension below 90.

### Concurrency and isolation
- **≤3 concurrent authoring agents.** Each agent owns exactly one `sites/<slug>/`
  directory; no two agents ever touch the same path, so no worktree isolation is
  needed for the site trees themselves.
- Shared files (`shared/content.json`, `new_site.md`, root `index.html`,
  `package.json`) are **read-only to authoring agents.** A kit that needs a shared
  change escalates to the orchestrator instead of editing it — concurrent edits to
  shared files are the one real collision risk here.
- The orchestrator runs all `npm` / `git` / `gh` commands. Authoring agents do not
  push.

### Per-wave gate (orchestrator, after each wave of 5)
```bash
npm run lint && npm run linkcheck && npm run meta && npm run a11y
npm run build      # local sanity; dist/ is gitignored
```
Then one PR per wave (5 sites), squash-merged after review. Per-wave PRs keep the
diff reviewable; a single 50-site PR would not be.

---

## 5. Definition of done — per kit

Inherits `new_site.md` §18 in full, plus:

1. **Experience fidelity.** Every experience field the kit declares is *observably*
   implemented: `site_architecture.nav` labels/order match, every `extra_pages`
   entry exists, `homepage_narrative` section order matches, `feature_casting`
   casting is visible, `intensity_toggle` works if non-`null`, `easter_eggs` are
   reachable, `conversion_funnel.cta_ladder` is present. Absent field → default
   behavior, not a defect.
2. **`404.html` ships** (§2A) — realises `error_page_experience.concept`, `noindex`,
   relative asset paths, every `recovery_links` entry offered.
3. **Fonts actually resolve** — every `@font-face` `src` resolves to a file in the
   repo; zero external font requests. (Regression guard for §0.4.)
4. **No net-new lint/format debt** — the site is clean under the Phase 0 baseline.
5. **`BUILD_LOG.md` states what changed versus the July-4 site** and why, so a
   reviewer can check intent, not just output.

---

## 6. Program-level exit bar

- 50 of 50 sites regenerated, each meeting §5.
- `npm test` green on master.
- `npm run build` reports `50 built site(s)` and **50 themed** 404s.
- Pages deploy succeeds and spot-checked live sites show their kit's nav.
- `Lint` workflow green on master for the first time since 2026-07-05.

---

## 7. Honest cost note

50 kits × (1 authoring pass + an adversarial review loop of 2+ rounds) is the
dominant cost of this program, and it is **not** reducible to a script — the
transform is "read a 1300-line design spec, produce a coherent nine-page site,"
which is the authoring agent's job. Phase 1 exists specifically to price this
before committing to the remaining 49. If the pilot comes in expensive, valid
options are: fewer review dimensions per round, a cheaper model for the mechanical
dimensions (spelling, meta, sitemap) reserving the strong model for brand fidelity
and experience fidelity, or regenerating a high-value subset instead of all 50.
