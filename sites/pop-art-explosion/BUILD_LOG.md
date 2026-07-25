# BUILD_LOG.md — Pop Art Explosion

**Kit:** `brand-kits/pop-art-explosion.js` (v1.0, `kit_type: base`, schema 2.1)
**Rebuilt:** 2026-07-25, regeneration wave 2
**Archetype:** `immersive` — declared by the kit. The predecessor build guessed
`showcase`; that guess is gone. **No `immersive` kit had been regenerated before
this one**, so there was no sibling to diff against and the comparison step was
deliberately skipped (see `REGEN_PLAN.md` §0 for the pattern this site sets).

## What was built

Nine pages: the 8 canonical ones plus `404.html`, which the predecessor did not
have. `site_architecture.extra_pages` is empty, so no extra page was invented.

| Page            | Ground                                   | Blueprint realised                                                                                  |
| --------------- | ---------------------------------------- | --------------------------------------------------------------------------------------------------- |
| `index.html`    | red → white → panel-white → orange → red | The 5 `homepage_narrative.sections[]` in order, as 5 full-bleed panels                              |
| `features.html` | blue                                     | `comic-panels` — 8 feature panels in a 2-up grid with 4px black gutters, each its own primary       |
| `clients.html`  | yellow                                   | `spec-sheet` — a family-of-devices silhouette lineup, then 5 spec-sheet rows with `<dl>` spec rows  |
| `download.html` | red                                      | `spec-sheet` — Installation Panel One → Installation Panel Two → The Full Toolkit                   |
| `plugins.html`  | cream                                    | The plugin contract, the shelf, write-your-own (demoted from nav, folded into features)             |
| `docs.html`     | panel-white                              | Link-out signpost + what is in the docs + the toolkit shelf (demoted from nav)                      |
| `hub.html`      | blue                                     | What the Hub does → self-host or public → Hub mode in the clients                                   |
| `about.html`    | yellow                                   | `chapter-scroll` — three numbered chapters, then "Ask Dotty" as a letters column                    |
| `404.html`      | newsprint ink                            | `error_page_experience` realised as content: a dark marquee, a torn-ticket bubble, 3 recovery links |

Three stylesheets (`base` tokens/reset/fonts, `theme` panel system + page
structures, `components` every bordered thing) and two scripts:

- `js/main.js` — nav, panel-sequence wipes, the sequence rail, the playable hero
  vignette, the "Dim the lights" intensity toggle, the seasonal date gate, all
  three easter eggs, the install copy button.
- `js/dotty.js` — the `mascot.behavior` companion. Loaded **only** on home,
  features, clients and download, because the kit says "never on docs or about
  (reading pages)".

## Deliberate decisions worth knowing about

1. **Fixed companion starts at 62rem, not 48rem.** §19.14 puts the floor at 768px;
   this site waits until 992px because between those two widths the hero is still
   single-column and its playable stage occupies the bottom-right corner — exactly
   where a floater would land on top of it (§19.11). Below 62rem Dotty sits in flow
   above the footer.
2. **Tips are offered, not pushed.** A tip becomes available when its target
   scrolls into view, is advertised by a badge on Dotty, and auto-opens only on a
   wide viewport **and** only after the visitor's first scroll. Nothing appears
   unprompted at load, and phones are never interrupted.
3. **Dismissal persists to `localStorage`** because the kit asks for that
   explicitly — so the footer utility row carries a **"Bring Dotty back"** control
   on every page that has her (§19.21).
4. **The hamburger ships `hidden`** and `js/main.js` unhides it. With JS off the
   menu is simply already open and fully usable; `aria-expanded` only ever exists
   while real behaviour backs it. (The CSP forbids inline script, so the usual
   `<html class="no-js">` trick was not available.)
5. **All artwork fills are `var(--color-…)`**, not literal hex, so the seasonal
   date gate recolours the illustrations too. Half-swapping would have put four
   primaries in one view, which `color_rules` forbids.
6. **`badges.labels`** ("4K", "HDR", "Dolby Vision") are **not** printed — they
   assert capabilities `content.json` does not state (§19.14 settled dispute). The
   `badges.colors` mapping is kept and applied to client status and the site's own
   vocabulary.
7. **No star, contributor or download count is printed anywhere.** The proof band
   links to `/stargazers` and `/issues` instead (§19.7).
8. **The install command is copied byte-for-byte** from `content.json.install`, and
   the one page that mentions `from_source` labels it, in bold, as **not an
   install** (§19.22). The phrase "one line" traces to `install.primary.line_count`.

## Defects found during the build and fixed

Every one of these was invisible in source review. Two came from
`tools/render-check.mjs`, and five more from a scripted per-variant contrast sweep
(all 9 pages × the default, Summer and Winter palettes) written because
`seasonal_activation` is `live-js` and §19.19 requires measuring each variant.

| #   | Defect                                                                                                                                                                 | Fix                                                                                                                |
| --- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| 1   | White `<h3>` on a white card — the reel shelf inside the blue "Full Toolkit" panel inherited `--ink: #ffffff`, **1.00:1**, five headings, six viewports (render-check) | One "paper surfaces" rule that resets `--ink`/`--display-ink`/`--link` for every component painting its own ground |
| 2   | A yellow button label on a yellow button, **1.00:1** on the 404 (render-check)                                                                                         | Link colour no longer comes from a descendant selector at all — see #3                                             |
| 3   | `.link-strong` inside a white card on a blue panel: yellow on white, **1.27:1**                                                                                        | Link ink travels as a `--link` custom property; grounds set it, paper surfaces reset it                            |
| 4   | The hero CTA strip's `<h2>`: white on Zap Yellow, **1.27:1** (2.86:1 under the live Summer palette, which is why the automated invisible-text check let it through)    | `.cta-strip` joins the paper-surface reset with the secondary ground's ink                                         |
| 5   | Links on blue grounds under Summer: orange on blue, **3.13:1**                                                                                                         | Blue/ink grounds use white for links, not the secondary                                                            |
| 6   | Links on red grounds under Winter: black on Pow Blue, **2.05:1**                                                                                                       | Red grounds take `--ink-on-primary`, which the Winter gate flips to white                                          |
| 7   | Dotty's tip badge: white on red at 12px/700, **3.88:1**                                                                                                                | Pow Blue with white text, 8.99:1, and `aria-hidden`                                                                |

Final sweep: **0 sub-AA text nodes across 9 pages × 3 palette states.**

Two cosmetic fixes came from reading the screenshots: the SyncPlay icon's play
triangle fell outside its 48px viewBox, and the white Ben-Day dot field was dense
enough (0.34 alpha) to fuzz body copy on the blue panels, so it is now 0.22.

## Verification

- `node tools/selfcheck.mjs --site pop-art-explosion` → **PASS** (17 checks). One
  warning, which is the tool telling every kit to distrust its own contrast prose.
- `node tools/render-check.mjs --site pop-art-explosion` → 54 reported defects, all
  54 of them the identical line: `failed request …/manifest.webmanifest`.
  **This is a `file://` artefact of the harness, not a site defect.** Chrome fetches
  a web manifest with CORS, and a `file://` document has a null origin, so the fetch
  is blocked for any site that links one. Evidence:
  - re-running the same assertions over HTTP (a local static server, all 9 pages,
    320px and 1280px, 1.5s settle) reports **zero** console errors and **zero**
    failed requests;
  - `abstract-canvas` and `swiss-modernist` — two accepted wave-1 regenerations —
    fail identically, with exactly the same 54 lines. All 50 sites ship
    `rel="manifest"`.
    Removing the link would satisfy the harness by degrading the shipped site and
    desyncing it from 49 siblings, so it stays.
- `node tools/gen-og.mjs` and `node tools/gen-sitemap.mjs` re-run after the rebuild;
  `npx prettier --write` owns formatting.

## Follow-ups

- `img/og.png` renders its lettering in a fallback face, because `rsvg-convert`
  does not resolve the self-hosted Bangers/Barlow WOFF2 from the SVG. Every other
  site in the repo has the same limitation; fixing it properly means teaching
  `tools/gen-og.mjs` to register the pool fonts, which is a shared change and
  therefore not this site's call.
- The three `img/seasonal/*.svg` motifs are wired to `data-season` and were checked
  by forcing the attribute by hand; only Summer of Love is live on today's date, so
  Factory Winter's foil stripe and snowflake field will not be seen in production
  until December.
