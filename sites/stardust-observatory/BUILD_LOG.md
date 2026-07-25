# BUILD_LOG.md — Stardust Observatory

|                  |                                                                                                  |
| ---------------- | ------------------------------------------------------------------------------------------------ |
| Brand kit        | Stardust Observatory v1.0 (base, schema 2.0)                                                     |
| Slug             | `stardust-observatory`                                                                           |
| Layout archetype | **narrative-scroll** (declared `experience_archetype`; the 2026-07-04 build guessed "immersive") |
| First built      | 2026-07-04                                                                                       |
| Regenerated      | 2026-07-24 — implements the kit's experience schema per `new_site.md` §2A                        |

## What the regeneration changed

- **9 pages rewritten** — the 8 canonical pages plus `404.html`. No `extra_pages`
  (the kit declares `extra_pages: []`).
- **Nav rebuilt from `site_architecture.nav`** (6 kit labels, kit order, kit
  emphasis); `plugins` + `docs` demoted to the footer shelf; `plugins` folded into
  `features.html#advanced-apertures`; footer arranged `mirror-nav` above the three
  verbatim `content.json` columns; the duplicate `.nav-cta` removed.
- **Home rebuilt to `homepage_narrative.sections[]`** with the kit's ids in order:
  `dome-rising` → `the-instruments` → `why-stardust` → `proven-path` →
  `chart-course` (5 of a permitted 6).
- **Four `page_blueprints` realised** — atlas-gallery (features), viewing-rooms
  (clients), expedition-guide (download), scholar-study + meridian-letters (about).
- **New interactive layer**, all hand-written vanilla JS (14.7 KB total, ~15 KB
  budget): hero guided-reveal, page-turn bookmarks, Meridian the companion with 5
  tips + 2 easter interactions + persisted dismissal, 3 easter eggs, the Steady
  Gaze intensity toggle, and the seasonal `live-js` date-gate.
- **New assets** — `img/seasonal/{perseid-meteor-trail,winter-solstice-frost-dome,vernal-equinox-garden}.svg`
  (the three `seasonal_activation.motif_assets`), an inline opening-dome SVG on the
  home hero and an inline misaligned-telescope SVG on the 404.
- **CSS**: `base.css` keeps its token block and the generated `vendor-fonts` block
  untouched, and gains five measured small-text tokens plus the `data-intensity`
  motion kill-switch; `theme.css` and `components.css` were rewritten around the
  new page structures.

## Factual corrections to the 2026-07-04 build

1. The licence was stated as **BSD-3-Clause** in every footer, in the footer link
   label, and in the home JSON-LD (`opensource.org/licenses/BSD-3-Clause`). Per
   `shared/content.json` it is **MPL-2.0 for Server and Hub, MIT for the shared
   libraries, plugins and clients** — corrected everywhere, and the JSON-LD now
   points at `mozilla.org/en-US/MPL/2.0/`.
2. The footer licence link pointed at a non-existent repository
   (`github.com/phlix-website/blob/master/LICENSE`) → now
   `github.com/detain/phlix-server/blob/master/LICENSE`.
3. "API reference" linked to `…/phlix-docs/reference` → now the `content.json`
   value `…/phlix-docs/reference/api.html`.
4. `download.html` carried an invented **"Choose Your Plan" pricing** section.
   Phlix has no plans or pricing; that section is gone.
5. `404.html` lacked `<meta name="robots" content="noindex">` (flagged by
   `tools/selfcheck.mjs`) — added, and the page now realises the kit's
   Misaligned-Telescope concept instead of a generic message.
6. `js/main.js` bound a `touchend` handler to every link, button and **input** that
   called `preventDefault()` and re-dispatched `click()` — that breaks text fields
   and double-fires links on touch devices. Removed.
7. `robots.txt` pointed at `/sites/stardust-observatory/sitemap.xml`; regenerated
   via `tools/gen-sitemap.mjs` to the correct `/stardust-observatory/` path.

## Deviations from the kit, and why

- **No dome-motor audio** in the hero, although `hero_experience.spec` asks for it:
  unprompted sound is a WCAG 1.4.2 failure and browsers block it without a
  gesture. The mechanism is conveyed by motion plus an `aria-label` (§12 wins).
- **`error_page_experience` carries a note calling per-kit 404s "out of scope"**.
  That note predates the root 404 shim; `new_site.md` §2A now requires the page, so
  it shipped. Its headline uses the concept's second option ("The dome sees nothing
  here") because the first is ungrammatical.
- **`proof_strategy` asks for live star and issue counts.** A static page cannot
  verify a number, so the placard links to `/stargazers` and `/issues` rather than
  printing figures (§19.7).
- **The placard says "5 native client platforms"**; `content.json` shows four
  native clients plus DLNA (which is not an app), and Mobile is `beta`. Facts win,
  so the placard says exactly that.
- **Meridian is hidden on phones until the first scroll.** The kit places it in the
  bottom-left corner on mobile, where at 320px it would sit on the hero's secondary
  CTA — §19.11 forbids that, so it slides in once the visitor moves, and it never
  pushes an unrequested tip on a phone.

## Verification

```
node tools/gen-og.mjs --site stardust-observatory       # og.png regenerated
node tools/gen-sitemap.mjs --site stardust-observatory  # 8 URLs + robots.txt
node tools/selfcheck.mjs --site stardust-observatory    # PASS, 0 warnings
node tools/render-check.mjs --site stardust-observatory # PASS (9 pages × 320/1280 + 200% zoom)
npx prettier --write "sites/stardust-observatory/**"
```

Screenshots from the last clean run are in `reviews/stardust-observatory/shots/`.

## Known follow-ups

- The five download-cards in stage two get tight at exactly 1280px (the "Mobile
  (iOS + Android)" title wraps to two lines). Legible, but a 4-up wrap would look
  calmer.
- `shared/content.json.meta.og_image` is still `/img/og.svg` — an SVG and a
  root-absolute path — so every site has to override it locally. Fixing it is a
  shared change and was left to the orchestrator.
