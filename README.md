# phlix-website

[![Pages](https://github.com/detain/phlix-website/actions/workflows/pages.yml/badge.svg)](https://github.com/detain/phlix-website/actions/workflows/pages.yml)
[![Lint](https://github.com/detain/phlix-website/actions/workflows/lint.yml/badge.svg)](https://github.com/detain/phlix-website/actions/workflows/lint.yml)
[![Link Check](https://github.com/detain/phlix-website/actions/workflows/linkcheck.yml/badge.svg)](https://github.com/detain/phlix-website/actions/workflows/linkcheck.yml)
[![Lighthouse](https://github.com/detain/phlix-website/actions/workflows/lighthouse.yml/badge.svg)](https://github.com/detain/phlix-website/actions/workflows/lighthouse.yml)

The marketing / landing site for **[Phlix](https://github.com/detain/phlix-server)** — a self-hostable PHP media server with native clients for Roku, Samsung Tizen, Windows, and Mobile.

This repo ships **one brand-themed site per brand kit**: every kit in `brand-kits/<slug>.js` gets its own subtree under `sites/<slug>/` and consumes the same shared content from `shared/content.json`, so they differ in visual language only. The earlier five-variant `variants/` tree was removed on 2026-06-30 — `tools/render.mjs` is legacy and is no longer part of the deploy path.

| Site                                        | Brand kit                       | Live Preview                                            |
| ------------------------------------------- | ------------------------------- | ------------------------------------------------------- |
| [`stellar-command`](sites/stellar-command/) | `brand-kits/stellar-command.js` | https://detain.github.io/phlix-website/stellar-command/ |
| [`storm-chaser`](sites/storm-chaser/)       | `brand-kits/storm-chaser.js`    | https://detain.github.io/phlix-website/storm-chaser/    |
| [`swiss-modernist`](sites/swiss-modernist/) | `brand-kits/swiss-modernist.js` | https://detain.github.io/phlix-website/swiss-modernist/ |
| [`terraform`](sites/terraform/)             | `brand-kits/terraform.js`       | https://detain.github.io/phlix-website/terraform/       |
| [`velocity-x`](sites/velocity-x/)           | `brand-kits/velocity-x.js`      | https://detain.github.io/phlix-website/velocity-x/      |
| [`void-walker`](sites/void-walker/)         | `brand-kits/void-walker.js`     | https://detain.github.io/phlix-website/void-walker/     |

Every other kit follows the same pattern — `brand-kits/` holds the full set, `sites/` holds the ones already built, and `npm run build` publishes `dist/<slug>/` for each kit that has a site plus a top-level gallery.

## Quick start

```bash
npm install
npm run dev                                       # every site at http://localhost:5173/<slug>/
node tools/dev-server.mjs --site abstract-canvas  # serve a single site
npm run preview                                   # kit index + all sites at http://localhost:5174/
npm run build                                     # static dist/ with each site under dist/<slug>/
npm run test                                      # unit tests + lint + link check (after build) + meta audit
```

Per-site checks used while authoring, reviewing, or fixing a site:

```bash
npm run lint                                       # htmlhint + stylelint + eslint (incl. brand-kits/*.js)
npm run a11y                                       # pa11y-ci sweep (A11Y_STRICT=1 gates on findings)
npm run linkcheck                                  # linkinator over dist/**/*.html — run npm run build first
npm run meta                                       # per-page SEO / social meta audit
node tools/kit-brief.mjs --site <slug>             # everything an authoring agent needs, in one call
node tools/render-check.mjs --site <slug> --shots  # real-browser render defects + PNGs
```

No PHP, no backend — the site is pure static HTML/CSS/JS. The Phlix server itself lives in [`detain/phlix-server`](https://github.com/detain/phlix-server).

## Repo layout

```
phlix-website/
├── brand-kits/<slug>.js      one brand kit per site: palette, type, motion, voice
├── brand-kits/expected-kits.json
│                             the pinned list of kits the build expects (see below)
├── shared/
│   ├── content.json          single source of marketing copy
│   ├── data/                 brand-kits.json, font-sources.json
│   └── assets/fonts/         vendored OFL font families + OFL.txt
├── sites/<slug>/
│   ├── index.html
│   ├── features.html
│   ├── clients.html
│   ├── download.html
│   ├── plugins.html
│   ├── docs.html             link-out + summary
│   ├── about.html
│   ├── hub.html
│   ├── 404.html
│   ├── SITE.md               kit brief the site was built from
│   ├── BUILD_LOG.md
│   ├── robots.txt
│   ├── sitemap.xml
│   ├── css/
│   ├── js/
│   ├── img/                  site-specific brand artwork
│   └── reviews/
├── reviews/<slug>/           review outputs (one md file per dimension)
├── test/                     node:test suites pinning the build + lint/a11y/link gates
├── tools/                    dev-server, build, lint, a11y, og, sitemap, kit-brief,
│                             kit-inventory (shared kit walker), gen-icons
├── new_site.md               brand-agnostic rulebook: what a site must contain
├── orchestrator_prompt.md    agent pipeline driver (spawns author/review/fix workers)
├── new_site_prompt.md        author-worker prompt
├── regen_site_prompt.md      regenerate an existing site against its kit's experience schema
├── review_site_prompt.md     review-worker prompt
├── fix_site_prompt.md        fix-worker prompt
├── docs/
│   ├── PLAN.md               full architecture + agent pipeline
│   ├── AGENT_CONTRACTS.md    worker input/output contracts
│   ├── REVIEW_RUBRICS.md     scoring rubric per review dimension
│   └── HANDOFF_PROMPT.md     paste-into-fresh-session kickoff prompt
└── .github/workflows/
    ├── pages.yml             GH Pages deploy, gated: gates -> build -> deploy
    ├── lint.yml              html/css/js + a11y + node:test unit job
    ├── linkcheck.yml         npm run build, then broken-link sweep of dist/
    └── lighthouse.yml        Lighthouse CI budgets
```

## Brand source of truth

The brand source of truth lives in this repo: copy in
`shared/content.json`, visual language per site in `brand-kits/<slug>.js`.
(The former `phlix-server/docs/brand/` directory was removed after the
phlix-docs merge — server commit `77e681fd` — and those files exist nowhere in
the estate; do not point at it.) Sites must consume the shared content plus
their own kit — do not invent new colors, fonts, or voice.

## Image generation

No AI image-generation model is currently wired in. SVG and CSS-only artwork is preferred. Each site's `img/` folder includes a `PROMPTS.md` with the exact SVG/Midjourney/DALL·E prompt that should produce the artwork once a model is available.

## Historical variant scoring

The legacy `variants/` wave-score summary and the 2026-05-21 Phase I fix list moved to [reviews/COMPARISON.md](reviews/COMPARISON.md#legacy-wave-scores--phase-i-fixes-migrated-from-readmemd-2026-10-15) (2026-10-15).

## Tooling notes

### Adding or removing a brand kit — update `brand-kits/expected-kits.json`

`npm run build` fails if `brand-kits/*.js` does not match the list pinned in
`brand-kits/expected-kits.json`, and it fails if any kit will not `import()`.
Both are deliberate. Adding a kit is therefore a two-file change: drop in
`brand-kits/<slug>.js` **and** add the filename to the pin (`kits` and `count`).
The build error names the exact file and what to do.

Why the pin exists at all: the build used to warn and skip past any kit it
could not load, then report the length of the list it had just filtered. 79 kit
files were reported as "76 brand kit(s), 76 built site(s)", exit 0 — both
numbers counted the survivors, so the sentence was self-consistent no matter
how many kits broke. Three kits had been silently dropped for months, each with
a complete site subtree that was never published. A count taken from the
directory would have caught those, but it still self-adjusts to a _deletion_
(78/78/78 is just as self-consistent), so the expected list is pinned
independently and compared as an exact set in both directions. It is
hand-maintained on purpose: there is no regeneration flag, because a manifest a
tool can rewrite from its own subject is not a pin.

`tools/build.mjs`, `tools/preview-all.mjs` and `tools/vendor-fonts.mjs` all walk
the kits through one shared `tools/kit-inventory.mjs`, so an unloadable kit, an
empty corpus and a pin mismatch are fatal in every one of them.
`node tools/preview-all.mjs --check` validates the corpus and binds no port.
`tools/lint.mjs` checks the same pin against the `brand-kits/*.js` slice of the
`lint:js` corpus.

A kit must be an ES module — this package is `"type": "module"`, so
`module.exports = kit` or `window.X = kit` exports **nothing**. Use
`export default kit`.

### Stylelint v17 / `stylelint-config-standard` v40

The dev stack pins `stylelint@^17`, `stylelint-config-standard@^40`,
and `stylelint-config-recommended@^18`. **Do not** mix these majors —
v17 of stylelint requires the v40 / v18 configs; pairing v17 with the
older v3x configs surfaces a peer-dep conflict at `npm install` time
and `npm` will refuse to resolve. If you need to bump stylelint,
bump all three packages together.

### eslint config

`eslint.config.js` (flat config; `js.configs.recommended` +
`globals.browser`) runs zero-warning on `brand-kits/*.js`, every site in
`sites/`, and `tools/*.mjs`.
Unused parameters are silenced via the standard
`argsIgnorePattern: '^_'` convention — prefix any deliberately-unused
parameter with `_` rather than disabling the rule inline.

### Node 24

`engines.node` is `>=24`. The CI workflows use Node-24-native action
majors (`actions/checkout@v7`, `actions/setup-node@v7`) — the older
`FORCE_JAVASCRIPT_ACTIONS_TO_NODE24` env shim is no longer needed and
has been removed. See
[`phlix-docs / dev / contributing`](https://detain.github.io/phlix-docs/dev/contributing#ci-github-actions-policy)
for the cross-repo action-version policy.

### Production deploys are gated

**Deploy blocked when gates red.** A push to `master` reaches GitHub Pages only
through `pages.yml`'s `gates` job, which mirrors `lint.yml`'s `lint` + `unit`
jobs step-for-step (format check, htmlhint, stylelint, eslint,
`node scripts/audit-gate.mjs`, pa11y, `npm run test:unit`); `build` runs with
`needs: gates` and `deploy` with `needs: build`, so a red gate means no Pages
artifact is ever produced. `test/deploy-gate.test.mjs` pins the mirror
command-for-command as the drift tripwire — it executes in both workflows'
unit legs, so adding or dropping a lint.yml gate without mirroring it
immediately blocks the deploy path instead of silently narrowing it. (GitHub
Actions `needs:` cannot span workflows, which is why the commands are mirrored
rather than referenced.) One caveat lives outside this repo and cannot be
enforced from it: `master` has no branch protection and the `github-pages`
environment is default-only, so required status checks on `Lint`/`unit` and
environment protection rules remain owner settings actions
(`Settings → Branches / Environments`) — the workflow gating closes the
publish path, not a bypass via a differently-triggered action.

**`dist/` is never committed — the deployed site is built from source.** `dist/`
is gitignored; the Pages artifact is produced fresh on every deploy by
`pages.yml`'s `build` job (`npm run build`, then `upload-pages-artifact`). A
claim that reads false on the deployed page is therefore always a SOURCE bug,
and `test/public-hub-truth.test.mjs` guards both layers: it scans every build
input and a real throwaway-root build of them, so the fabricated
public-hub domains (`hub.phlix.io/.org/.dev/.app/.tv`) removed by the
content-truth sweep can never ride back in, and law 4 reddens if the CI ever
stops rebuilding at deploy time (which would make a stale committed tree
load-bearing again).

## Security headers — the honest split (what ships vs what the host must do)

This site is served by **GitHub Pages**, which ignores `_headers` entirely: it
has no custom-response-header mechanism. So the repo separates what it can
enforce from the artifact alone from what only a fronting host could do
(review `website__devops` M-WEBSITE-03):

| Surface                             | Form                                                                                                      | Live on GitHub Pages?                                                                                                          |
| ----------------------------------- | --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `tools/build.mjs` + `tools/csp.mjs` | CSP as `<meta http-equiv>` injected into **every** page emitted to `dist/` (723 HTML files at 2026-10-29) | **Yes** — this is the shipped CSP                                                                                              |
| `_headers` (copied into `dist/`)    | CSP header + `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, `Referrer-Policy`          | Only if the origin is ever fronted by a headers-supporting host (Cloudflare Pages/Workers, nginx, …) — kept ready for that day |
| `tools/dev-server.mjs`              | The header form served locally during `npm run dev`                                                       | Yes (dev only)                                                                                                                 |

What the policy cannot cover on today's host is a **host-config TODO for the
owner**: `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, and
the CSP's own `frame-ancestors 'self'` directive (browsers ignore
`frame-ancestors` inside a `<meta>`) are all unenforced until a
headers-capable front serves `_headers`. Fronting GitHub Pages with Cloudflare
(or moving host) is the decision that makes them real.

The allowances in the policy are measured, not aspirational. `script-src`
ships **without** `'unsafe-inline'` (review `website__writer` R-WEBSITE-06):
the gallery renderer, the 404 shim, and every kit page island were extracted
into js files, and the build fails if any executable inline script or `on*=`
handler ever rides back into `dist/`. `style-src 'unsafe-inline'` remains
because 497 pages carry inline `style=` attributes; the root gallery's Google
Fonts stylesheet is still the only external font source (kits self-host woff2).
`test/csp-gate.test.mjs` pins all of it: meta/header forms split at exactly the
platform boundary, `_headers` byte-matches the single source in
`tools/csp.mjs`, both a constructed fixture build **and** the real repo build
must stamp the meta tag as the first element of every emitted page, and the
shipped tree must contain zero inline executables.

## License

MIT. See [LICENSE](LICENSE).

This repository's own contents are MIT. The fonts vendored under
`shared/assets/fonts/` are **not** ours — all 70 families are under the SIL Open
Font License 1.1 and are redistributed under its terms, which require their
copyright notices to travel with them. Those are in
[THIRD-PARTY-NOTICES.md](THIRD-PARTY-NOTICES.md), with the license text bundled
beside the fonts at `shared/assets/fonts/OFL.txt`. Regenerate both after adding
a family:

```bash
node tools/gen-font-notices.mjs
```

Note that the **sites** this repo builds describe Phlix the software, which is
licensed separately: Phlix Server and the Hub are MPL-2.0, and the shared
libraries, plugins, and clients are MIT. `shared/content.json` is the authority
for what the sites may claim.
