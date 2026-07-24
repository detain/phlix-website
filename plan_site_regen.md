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

### 0.2 Two CSS files have real syntax errors
The copyright-header commit `77afc8e` injected a bare ` * @copyright …` line
outside any comment block:

- `sites/street-mural/css/theme.css:562`
- `sites/manga-studio/css/components.css:761`

Browsers skip to the next parseable rule, so **both sites are silently losing
styles in production**. Fix the comment delimiters and audit the other 48 for the
same mangling.

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

Do `stylelint --fix`, then `prettier --write`, as **one mechanical commit of its
own, before any regen**, so the regen diffs stay readable. Then decide per rule
whether to conform or relax `.stylelintrc.json` — do not leave 2570 errors as
permanent noise, or Phase 2's gate is meaningless again.

### 0.4 Brand typography is broken or absent on 45 of 50 sites
Typography is a primary brand-kit dimension and it is mostly not rendering:

| State | Count | Notes |
| --- | --- | --- |
| Working self-hosted fonts | **5** | `chrome-velocity`, `copper-steampunk`, `cosmic-horror`, `moroccan-bazaar`, `street-mural` |
| **Broken** `@font-face` → silent system fallback | **14** | 131 of 182 `woff2` refs resolve to nothing (e.g. `solarpunk-eden` → `../fonts/*.woff2`, no `fonts/` dir) |
| External Google Fonts CDN | **5** | `editorial-underground`, `holographic-future`, `manga-studio`, `pixel-dungeon`, `soundwave-studio` — violates new_site.md §7 (self-hosted, no CDN) **and** the documented CSP `font-src 'self'` |
| No webfonts at all | **26** | system fonts only |

Decide the font-sourcing policy **before** Phase 1, because every regenerated site
depends on it: either vendor the WOFF2 files each kit's `fonts{}` names, or pick
metric-compatible self-hosted substitutes and record the substitution. An
authoring agent cannot invent font binaries.

### 0.5 Stale tooling paths
- `.github/workflows/linkcheck.yml` PR trigger still filters on `variants/**/*.html` → never fires on `sites/**`.
- `tools/dev-server.mjs:150-198` and `tools/preview-all.mjs` serve the deleted `variants/`, so **`npm run dev` / `npm run preview` do not work** — authoring agents currently have no local preview.
- `shared/data/brand-kits.json` (25 legacy slugs) + `tools/render.mjs` + `tools/scaffold-new-variants.mjs` are dead relative to the deploy path. Delete or clearly mark legacy so agents stop treating them as source of truth.
- `package.json` still carries ~35 `dev:NNNN` / `build:waveN` / `preview:waveN` scripts naming the deleted variant system.

### 0.6 Root pages are unlinted
`lint.mjs` patterns cover `variants/**` and `sites/**` only, so the hand-authored
root `index.html` and `404.html` are never linted. Add them, or note the exclusion
deliberately.

**Phase 0 exit bar:** `npm test` (lint + linkcheck + meta) passes on master, the
font policy is decided and written into `new_site.md` §7, and `npm run dev` serves
`sites/`.

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
