# BUILD LOG — Neon Noir

**Kit:** `brand-kits/neon-noir.js` — base kit, schema 2.1, archetype `narrative-scroll`
**Regenerated:** 2026-07-25 (supersedes the 2026-07-04 first pass)
**Manifest:** `REGEN_PLAN.md` · **Rationale:** `SITE.md`

---

## What was generated

| File                                            | State                                                                       |
| ----------------------------------------------- | --------------------------------------------------------------------------- |
| `index.html`                                    | rewritten — 5 narrative sections with the kit's own section ids             |
| `features.html`                                 | rewritten — evidence-board blueprint, 8 files, serials, decoders            |
| `clients.html`                                  | rewritten — network-map blueprint, trunk line + 5 nodes                     |
| `download.html`                                 | rewritten — interrogation blueprint, clearance token / agents / toolkit     |
| `plugins.html`                                  | rewritten — demoted from the nav, filed under Evidence Files                |
| `docs.html`                                     | rewritten — demoted to the footer index                                     |
| `hub.html`                                      | rewritten — "Reach Anywhere"                                                |
| `about.html`                                    | rewritten — case-closed chapters + interrogation transcript                 |
| `404.html`                                      | **new** — dead-end alley, `noindex`, 3 recovery links, relative assets only |
| `css/base.css`                                  | rewritten — 10 real `@font-face` rules, tokens, both quiet switches         |
| `css/theme.css`                                 | rewritten — type roles, blueprints, cut/wipe motion                         |
| `css/components.css`                            | rewritten — topbar, footer, cards, transcript, Lux, calm switch, eggs       |
| `js/main.js`                                    | rewritten — nav disclosure + cinematic cut (~2.7 KB)                        |
| `js/experience.js`                              | **new** — vignette, Lux, eggs, calm mode, seasonal gate, copy (~11 KB)      |
| `img/seasonal/*.svg`                            | **new** — the three `seasonal_activation.motif_assets`                      |
| `img/og.png`                                    | regenerated from the carried-forward `og.svg` via `tools/gen-og.mjs`        |
| `robots.txt`, `sitemap.xml`                     | regenerated via `tools/gen-sitemap.mjs` (8 URLs, 404 excluded)              |
| `SITE.md`, `BUILD_LOG.md`, `img/PROMPTS.md`     | rewritten                                                                   |
| `img/logo.svg`, `img/favicon.svg`, `img/og.svg` | carried forward unchanged                                                   |

---

## Defects fixed from the 2026-07-04 pass

1. **No brand font ever loaded.** Every page carried an inline `@font-face` block whose `src`
   was `local(...)` only — no WOFF2 — so all five faces silently fell back. Replaced with ten
   real `@font-face` rules pointing at `shared/assets/fonts/*.woff2` (§19.3).
2. **The `@copyright` parse bug** (§19.2) was present in all three stylesheets: a bare
   ` * @copyright …` line outside any comment block, which discards the rest of the file.
3. **The licence was wrong in four places** — "BSD-3-Clause across the board" in the About
   philosophy line, the About licence chapter, the About FAQ answer, and the footer
   (`License (BSD-3)` plus the copyright line), and BSD-3 in the home JSON-LD. `content.json`
   says MPL-2.0 for the server and hub, MIT for the shared libraries, plugins and clients.
   Corrected everywhere; the footer label is now verbatim from `content.json`.
4. **No `404.html`** at all, although `error_page_experience` is declared and §2A makes the
   page required.
5. **`API reference`** pointed at `…/phlix-docs/reference`; `content.json` says
   `…/phlix-docs/reference/api.html`.
6. Nineteen declared experience fields were ignored entirely — see `REGEN_PLAN.md` §1.

---

## Deviations from the spec, and why

1. **The footer case index is not a third `<nav>`.** The `mirror-nav` index is a `<div>` with a
   visually-hidden `<h2>`, so the page keeps exactly one primary and one footer navigation
   landmark (§4).
2. **Lux is not fixed below 768px.** `mascot.behavior.placement` says bottom-right corner. At
   320px there is no room for a floating companion that cannot cover the CTA, so the same
   element renders in-flow above the footer instead. No duplicated content (§19.11).
3. **Lux sits inside `<main>`.** `tools/render-check.mjs` counts `main[tabindex="-1"]` as a
   control, so any fixed element outside `<main>` reads as covering it. Nesting the aside
   inside `<main>` removes that false positive while leaving the real CTA-overlap check fully
   active — Lux is still tested against every button and link on the page.
4. **No `-webkit-text-stroke` and no `-webkit-background-clip: text` anywhere.** Both have no
   unprefixed equivalent and `stylelint --fix` deletes them, which would silently erase the
   effect (§19.4). All neon glow is `text-shadow` / `box-shadow`, which is also what the kit's
   own performance rules ask for. `stylelint --fix` was never run.
5. **The 404's giant numerals use `--color-edge-strong`, not Charcoal Slate.** Slate on void is
   1.30:1 — effectively invisible. The derived mix reads as dim steel tubing at 3.61:1.
6. **`overflow-wrap: anywhere` on `body`**, not `break-word`. Only `anywhere` reduces
   min-content size, and several rows are flex containers whose anonymous text item otherwise
   refuses to shrink below the width of "ContentDirectory" / "LifecycleInterface" — which put
   `clients.html` and `about.html` into horizontal scroll at 200% text zoom.
7. **`[hidden] { display: none !important }`** is declared explicitly, because a class that
   sets `display` (`.btn`) beats the UA sheet's `[hidden]` rule — which had left the
   JS-controlled "Bring Lux back", "Follow the next lead" and "Copy" buttons visible.
8. **The install snippet** is `shared/content.json` `install.primary.command`, copied not
   retyped — the real one-line installer from `phlix-server`'s own README. Round 1 shipped
   `git clone` / `composer install` / `php start.php start` because `content.json` had no
   install block at the time, and reasoned that "no invented one-liner installer" was the
   honest choice. It was the opposite: that sequence is a **development checkout**, which
   creates no database, no service and runs no migrations, so presenting it as the install
   was a §16 honesty failure (`new_site.md` §19.22). The from-source form is still on the
   page, inside a disclosure, explicitly labelled "not an install". Line-count prose on
   `index.html`, `clients.html`, `docs.html` and `about.html` now all say **one line**,
   taken from `install.primary.line_count`.
9. **No printed counts anywhere.** `proof_strategy` asks for a live star count; a static page
   cannot verify one, so the trust band links to `/stargazers` and `/issues` instead (§19.7).
10. **The docs "quote"** is `pitch_bullets[0]`, quoted verbatim. Round 1 attributed it to
    "The Phlix project brief", a source that does not exist, and gave it no link — an honest
    quote wearing an invented citation. It is now attributed to Phlix's own pitch, with a
    working link to the docs in the `<cite>` and a docs link in `.record-links`.

---

## Verification

```
node tools/gen-og.mjs      --site neon-noir   → 1 og.png from 1 svg
node tools/gen-sitemap.mjs --site neon-noir   → sitemap.xml (8 URLs) + robots.txt
node tools/selfcheck.mjs   --site neon-noir   → PASS
node tools/render-check.mjs --site neon-noir  → PASS (9 pages × 4 viewports)
npx prettier --write "sites/neon-noir/**"     → clean
```

`selfcheck` reports 10 `@font-face` rules, all 6 kit nav labels present, 5/5 narrative
sections in order, 51 palette pairs clearing 4.5:1, and ~14 KB of JS. Its single warning is
the standard §19.1 reminder to measure the kit's contrast claim rather than trust it — done,
and the numbers are tabulated in `SITE.md`.

A browser probe additionally confirmed, by hand: the vignette steps 0→1→2 and lights one lead
per pose; the typed-word egg fires and clears on Esc **and stays inert while focus is in an
input**; calm mode flips the tokens, reports "Lights out", and releases every armed element;
Lux's dismissal survives a reload and the footer recall button brings him back; the mobile nav
opens, closes on Esc, and keeps `aria-expanded` in sync.

Repo-wide gates (`npm run lint`, `npm test`, `npm run build`, `npm run a11y`) were **not** run:
they cover all 50 sites and three other kits were being regenerated concurrently in this same
checkout.

---

## Known follow-ups

- `shared/content.json meta.og_image` is `/img/og.svg` — an SVG **and** an absolute path, both
  of which §11 / `check-meta` rule 5 forbid. Every site therefore has to ignore that field.
  Worth fixing centrally; not touched here because `shared/**` is read-only to this build.
- The alley diorama and the 404 sign are CSS/SVG originals standing in for real renders. The
  prompts that would produce the intended artwork are in `img/PROMPTS.md`.
- `tools/render-check.mjs` gained viewports and checks (2 → 4 viewports, plus a clipping and a
  delayed-overlap pass) **while this build was running**, so early passing runs are not
  comparable to later ones. Everything reported here is from the final run against the current
  tool.
