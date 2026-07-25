# BUILD_LOG.md — Abstract Canvas

**Site:** `sites/abstract-canvas/` · **Kit:** `brand-kits/abstract-canvas.js` v1.0
**Archetype:** `editorial` — taken verbatim from the kit's `experience_archetype`
**Regenerated:** 2026-07-24, pilot of `plan_site_regen.md` Phase 1
**Change manifest:** `REGEN_PLAN.md` (written before any code, per `regen_site_prompt.md` STEP 1)

---

## 1. Why this is a rebuild, not an edit

The predecessor was authored 2026-07-04; the kit gained 21 experience fields on 2026-07-13. Those
fields change **structure**, so the July-4 HTML could not be patched into compliance. `abstract-canvas`
opts into **every** field in `new_site.md` §2A (`extra_pages` is present-but-empty; `keyboard` and
`suggested_inputs` are present-but-null), so this pilot exercises the whole DO-table.

## 2. What changed versus the July-4 site

| Concern                           | Before                                                              | After                                                                                                                                                                           |
| --------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Archetype                         | immersive (a pre-schema guess)                                      | **editorial**, declared: asymmetric wall grid, left-aligned wall text, catalogue numerals in the margin, colour-field band dividers                                             |
| Nav                               | Home · Features · Clients · Download · Plugins · Docs · Hub · About | **The Studio · The Canvas · The Gallery · Get Started · The Frame · The Story**, with per-item `emphasis`                                                                       |
| Demoted pages                     | none                                                                | `plugins.html` + `docs.html` leave the nav, keep their pages, gain breadcrumbs, and are reachable from the footer directory and the Features fold-in panel                      |
| Home sections                     | hero → pitch → 7 feature cards → CTA                                | **`#canvas-primed` → `#the-brushstrokes` → `#why-this-studio` → `#who-has-painted-here` → `#hang-your-work`** (exactly the kit's `homepage_narrative.sections[]`, in order)     |
| Feature treatment                 | 7 identical cards; `hub` missing entirely                           | 2 double-wide focal works with their `angle` as headline, 4 studies, 2 marginalia on the Features page; `hub` restored; all 8 features present                                  |
| Jargon                            | engineer-speak verbatim in every card                               | plain-language line first, verbatim `content.json` body preserved in a `<details>` (`complexity_profile.jargon_policy: "translate"`)                                            |
| Pitch bullets                     | a bulleted list                                                     | seven numbered **gallery wall labels** (`copy_treatments.pitch_bullets`) inside `#why-this-studio`                                                                              |
| Clients                           | one grid of 5 equal cards                                           | **five stacked gallery stations**, alternating rooms, each with numeral, material, artist talk, highlight wall, source button                                                   |
| Download                          | server block → cards → list                                         | **studio setup in three numbered steps**: the ground (install, `#server`) → the stations → the reference shelf, opened with `conversion_funnel.download_opening`                |
| About                             | flat sections + FAQ                                                 | **monograph chapters I–III** + **Artist Talks**, Palette answering, in `faq_experience.question_order`, with 3 `extra_questions` as second `<dt>`s sharing the canonical answer |
| Funnel                            | one repeated "Get Phlix"                                            | **`cta_ladder`** rendered as three numbered rungs (download → clients → `download.html#server`)                                                                                 |
| Proof                             | none                                                                | a quiet placard band: verifiable spec numbers, a repo credits row, one verbatim technical quote                                                                                 |
| Visitor fork                      | none                                                                | `visitor_paths` prompt + three paths in the hero                                                                                                                                |
| Page count                        | 8                                                                   | **9** — `404.html` added, realising `error_page_experience.concept`                                                                                                             |
| Toggles / eggs / mascot / seasons | none                                                                | `intensity_toggle` ("Gallery quiet"), both `easter_eggs`, Palette as an on-page companion, and a live-JS seasonal date-gate                                                     |
| Copy                              | `content.json` verbatim throughout                                  | `copy_overlay` applied to hero, three section headings and the footer tagline; facts unchanged                                                                                  |
| Footer                            | 3 columns                                                           | 4 columns — the 3 canonical ones plus **the studio directory** (`footer_arrangement: "full-directory"`), and a utility row                                                      |

## 3. Predecessor defects repaired on the way

1. `sitemap.xml` / `robots.txt` carried a spurious `/sites/` segment — every URL 404'd live. Both are
   now generated by `node tools/gen-sitemap.mjs --site abstract-canvas`.
2. Licence claim: the site said BSD-3-Clause in the footer, the About page and the JSON-LD.
   `content.json` says **MPL-2.0** (server + hub) and **MIT** (shared libraries, plugins, clients).
   All three now match `content.json`; the footer label is used verbatim (`new_site.md` §5).
3. JSON-LD `license` now points at MPL-2.0.
4. The `hub` feature was missing from the home page.
5. A dead inline `<style>` in `index.html` declared `@font-face { src: local('Cormorant Garamond') }` —
   a no-op. Removed; the real faces come from the `vendor-fonts` sentinel block.
6. `og.png` was referenced but never rendered. `og.svg` was rebuilt with the overlay headline and
   rasterised via `node tools/gen-og.mjs --site abstract-canvas` (74 KB).
7. Centred section titles were forced with inline `style="text-align:center"` — off-archetype and
   unlintable. Gone; the editorial grid is left-aligned by construction.
8. The `@copyright` banner line sat mid-file _inside_ a section comment in all three CSS files. Each
   file now carries it in the header comment at line 1, and without the `*` prefix that
   `new_site.md` §19.2's detector greps for.

## 4. Bugs found by rendering the site, not by reading it

Chromium (`--no-sandbox`, via the repo's own puppeteer) was used to render every page. Three real
defects only became visible that way:

1. **The hero's colour-field composition rendered at zero width.** `.hero-field` held only
   absolutely-positioned children, so with `margin-inline: auto` and no `width` it became
   shrink-to-fit and collapsed — `aspect-ratio` had nothing to work from. `width: 100%` fixes it; the
   comment in `theme.css` says why so nobody "cleans it up" later.
2. **Palette's tip bubble covered the primary CTA at 320px.** Tips are now suppressed below 700px
   (Palette still appears, still reacts, still dismisses), and every bubble self-clears after 9s.
3. **The "Gallery quiet" toggle sat underneath Palette.** The bottom-right corner belongs to the
   companion, so the toggle moved to the inline start of the footer utility row.

Also corrected: the logo's gestural stroke crossed the wordmark's baseline and read as a
strikethrough at nav size; and `proof_strategy`'s "who is watching" link pointed at
`/stargazers`, which returns **404** on this repo (`/watchers` too) — it now points at `/pulse`,
verified 200.

## 5. Deliberate carry-forwards

The `:root` token block, the eight outlined feature icons, carbon-black (not cadmium) icons, the
16px body-text floor, the 48px nav toggle, the focus-ring implementation, the nav-toggle
focus-return, and the logo/favicon/OG compositions — several of which were Round-1 review fixes on
the predecessor and are deliberately not regressed. Full list in `REGEN_PLAN.md` §4.

## 6. Fonts

Unchanged family set (Cormorant Garamond, Bebas Neue, Lora, Inter, JetBrains Mono — all OFL-1.1), so
**`tools/vendor-fonts.mjs` did not need re-running**. The `vendor-fonts:begin/end` block in
`base.css` is preserved byte-for-byte. All ten `@font-face` `src` URLs resolve to files in
`shared/assets/fonts/`; zero external font requests.

## 7. Ambiguities resolved

Twelve, all recorded in `REGEN_PLAN.md` §5 (A1–A12) with the reasoning: `content.json` beats
`new_site.md` on the licence; the pitch block lives inside `#why-this-studio` so the home page stays
at five sections; the 100-word cap governs authored prose, not verbatim facts; the secondary CTA
reads "Browse the Gallery (the docs)" so the label cannot misdescribe its destination;
`feature_casting` outranks the blueprint's arithmetic; no star or contributor **counts** are printed;
the nav uses Cormorant per `navigation_model`; the kit's own contrast arithmetic is wrong and was
re-measured. `new_site.md` §19.1/§19.6/§19.7 were written up from this pilot's escalations and every
resolution matches them.

## 8. Self-checks run (actual output in the review file)

`prettier --check` (clean), `stylelint` (0), `eslint` (0 errors, **0 warnings**),
`htmlhint` (9 files, 0 errors), `node tools/check-meta.mjs` (403 files OK),
`gen-og --site`, `gen-sitemap --site`, the six mechanical greps from `review_site_prompt.md`, an
HTTP probe of all 8 distinct external hosts, WCAG contrast maths for every text/background pair, and
a rendered pass over all 9 pages at 320/1280 plus a 200%-text-zoom pass. Details and numbers in
`reviews/abstract-canvas/SELF-REVIEW.md`.

## 9. Known limitations and open items

| Item                                                                    | Status                                                                                                                                                                                                                                                                            |
| ----------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `robots.txt` points at the **root** `sitemap.xml`, not the per-site one | That is what `tools/gen-sitemap.mjs --site` emits. `new_site.md` §10 says a site's robots references "its" sitemap. Tool output kept for determinism across 50 sites; flagged for the orchestrator.                                                                               |
| Meta `description` is `content.json`'s on all 9 pages                   | `new_site.md` §10 says descriptions come from `meta.description`, and it ships only one. Literal compliance chosen over per-page uniqueness; worth a shared decision.                                                                                                             |
| Palette overlaps a corner of content at 320px                           | Inherent to a fixed companion; it is 48px, keyboard-reachable, dismissible with persistence, and never covers the primary CTA.                                                                                                                                                    |
| `npm run a11y` / `linkcheck` / `build` not run here                     | Repo-wide gates, orchestrator-owned (`regen_site_prompt.md`). `pa11y` cannot launch Chrome in this sandbox without `--no-sandbox`.                                                                                                                                                |
| `img/og.png` is not in `.gitignore`d output                             | Intentional: `check-meta` rule 5 requires a real `.png` in the tree.                                                                                                                                                                                                              |
| Composer bootstrap in the install snippet                               | `git clone` + `cd` + `composer install` are the standard PHP bootstrap for this repo and the page routes the visitor to the docs for the authoritative first run rather than inventing flags. If the project prefers a different published command, it belongs in `content.json`. |
