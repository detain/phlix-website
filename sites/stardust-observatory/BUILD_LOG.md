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
- **New interactive layer**, all hand-written vanilla JS (19.5 KB after the round-1
  fixes; `selfcheck` only warns as a runaway signal at 40 KB): hero guided-reveal,
  page-turn bookmarks, Meridian the companion with 5 tips + 2 easter interactions +
  persisted dismissal, 3 easter eggs, the Steady Gaze intensity toggle, and the
  seasonal `live-js` date-gate. The mobile nav is **not** in here — it is CSS-only.
- **New assets** — `img/seasonal/{perseid-meteor-trail,winter-solstice-frost-dome,vernal-equinox-garden}.svg`
  (the three `seasonal_activation.motif_assets`), an inline opening-dome SVG on the
  home hero and an inline misaligned-telescope SVG on the 404.
- **CSS**: `base.css` keeps its token block, gains six measured small-text tokens
  plus the `data-intensity` motion kill-switch, and now trims the generated
  `vendor-fonts` block down to the 12 faces the kit actually declares (see the
  round-1 section below); `theme.css` and `components.css` were rewritten around
  the new page structures.

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
- **Meridian is hidden until the first interaction.** The kit places it in the
  bottom-left corner on mobile, where at 320px it would sit on the hero's secondary
  CTA — §19.11 forbids that, so it slides in once the visitor moves, and it never
  pushes an unrequested tip at or below 768px (the §19.14 boundary). It is `hidden`
  in the markup, so with scripting off it is absent rather than inert.

## Round-1 review fixes (2026-07-25)

The round-1 reviewer filed 4 blockers and 18 concerns, none of which `selfcheck` or
`render-check` could see. Everything material to this log:

- `.page-eyebrow` was scoped to `.page-header`, so the 404's eyebrow rendered as
  plain body copy; the selector is now un-scoped.
- `.cta-banner`'s `text-align: center` cascaded into the home install command;
  `.code-block` now sets `text-align: start`.
- The footer whisper shipped 18px IM Fell at 4.21:1 — both an AA failure and a
  breach of the kit's own "never set IM Fell below 20px". Now 20px at 6.30:1.
- `easter_eggs[1].reward_copy` had never rendered; the typed-word egg now shows it.
- The ≤900px nav needed JavaScript to open. It is now a CSS-only checkbox
  disclosure, which is what `navigation_model.fallback` actually promises.
- `html { font-size: 16px }` overrode the visitor's default text size → `100%`.
- `.hero` clipped its own content with `overflow: hidden` (§19.13); the star field
  and nebula bloom moved into a `.hero-decor` wrapper.
- `--color-brass-text` was a private `#B98C40` derivation where `kit-brief.mjs`
  publishes a canonical `#B2803E`; adopted verbatim (§19.14 row 1).
- The three unused `.badge-*` rules now carry each atlas plate's classification
  mark, which is also what replaced the leaked "cast: hero instrument" jargon.
- `#proven-path` was 139 authored words against a 120 cap → 103, no fact dropped.
- Meridian: `home:#hero` could never fire its tip (it intersects at load, and the
  observer unobserved before arrival); the phone guard was 600px and read once; and
  the live region was written while `hidden`. All three fixed.
- **Heading outline (§19.16), fixed on all four affected pages.** `features.html`
  and `clients.html` had card titles at the same level as the visible section
  heading introducing them → demoted to `h3`. `download.html` and `about.html` had
  the same defect behind an `.sr-only` group label, and there the fix is **two
  levels at once**, because the group is three deep, not two:

      h2   "The three stages" / "The study"   (the .sr-only group label)
      h3   each stage title / study room       (was h2)
      h4   each .download-card / .spine        (was h3)

  Demoting only the stage would have put it level with the cards nested inside it,
  which is why a one-level fix looked like a dead end. Font sizes are unchanged at
  every level, so nothing reads differently: stage 26px, card 17px, spine 16px,
  study room 30px. `.spine-body :is(h3, h4)` covers the spine at both levels, since
  it stays an `h3` on `docs.html` and `plugins.html` where no stage wraps it.

- `docs.html` had three differently-labelled links resolving to one URL → two real
  destinations plus a reading index that describes the rest.
- `hub.html`, `docs.html` and `plugins.html` had no brand-native component — they
  now carry a sight line, a reading index and a lens bench respectively.
- **Font faces**: `tools/vendor-fonts.mjs` had emitted Lora 700, Jost 700 and a DM
  Mono 700 pointing at the 500 file — none declared by this kit. Removed; 12 faces
  ship, `<strong>` is Lora 600, and `REGEN_PLAN.md` §6 escalates the generator bug.
- **§19.19**: every seasonal variant's overridden text pair was re-measured. None
  introduces a failure (table in `SITE.md` §2).
- **§19.20**: `prefers-reduced-motion` and the 768px boundary now carry `change`
  listeners instead of being latched at load.

## Verification

```
node tools/gen-og.mjs --site stardust-observatory       # og.png regenerated
node tools/gen-sitemap.mjs --site stardust-observatory  # 8 URLs + robots.txt
node tools/selfcheck.mjs --site stardust-observatory    # PASS, 0 warnings
node tools/render-check.mjs --site stardust-observatory # PASS (9 pages × 6 viewports)
npx prettier --write "sites/stardust-observatory/**"
```

Neither tool can see any of the round-1 findings, so the fixes were also verified
directly in a browser: JavaScript disabled at 320/375/768/899 (nav reachable,
Meridian absent), computed-style probes for every contrast and heading claim, and
scripted runs of the typed-word egg, the `#hero` tip, the 768px rotation boundary
and a mid-session `prefers-reduced-motion` flip. 31 of 31 assertions passed.

Screenshots from the last clean run are in `reviews/stardust-observatory/shots/`.

## Known follow-ups

- The five download-cards in stage two get tight at exactly 1280px (the "Mobile
  (iOS + Android)" title wraps to two lines). Legible, but a 4-up wrap would look
  calmer.
- None outstanding on the heading outline: all nine pages now have exactly one `h1`
  and zero level skips, verified in a browser rather than by inspection.

## Corrected claims from an earlier revision of this log

- It listed the `.sr-only`-labelled heading groups on `download.html` and
  `about.html` as a deliberate exception, on the grounds that demoting the stage
  titles would put them level with their own children. The premise was right and the
  conclusion was wrong: the group is three levels deep, so both levels demote
  together. Fixed, and the follow-up withdrawn.
- `tools/vendor-fonts.mjs` was escalated as over-emitting faces and **has since been
  fixed upstream** (`afe745d`): it had been force-injecting 700 into every prose role
  and emitting clamped weights at the requested weight while pointing at a different
  weight's file. The generator now produces the same 12 faces this site arrived at by
  hand, so the in-marker deletion survives a regeneration and the ⚠ comment in
  `css/base.css` stands as history rather than as a live warning.
- It said `shared/content.json.meta.og_image` is `/img/og.svg` — an SVG on a
  root-absolute path — and that every site must override it. **That was wrong.** The
  value is `img/og.png`: already a PNG, already relative, and shipped with an
  `og_image_note` spelling out the absolute-URL rule each page must apply. This
  site's meta already emits the absolute `…/stardust-observatory/img/og.png`
  (1200×630 verified). Nothing is owed to the orchestrator on this point.
