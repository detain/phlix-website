# stardust-observatory — round 1 findings

> **Provenance.** Produced by an independent adversarial reviewer that did not
> build the site. The reviewing agent was unable to write into this directory, so
> the orchestrator persisted its report verbatim. Content is the reviewer's;
> only formatting was normalised.

**Verdict: the loop cannot exit.** 4 ❌, 18 ⚠️; Accessibility 78 and four other
dimensions below 90.

**Most serious defect:** `.footer-whisper` (`css/components.css:946-954`) ships
18px IM Fell English at a composited `#727E8C`-on-navy ratio of **4.21:1** — a
hard-gate §12 contrast failure that also breaks the kit's explicit "never set IM
Fell below 20px" Don't.

Both tools were clean before the review began (`selfcheck` PASS; `render-check`
PASS, 9 pages × 4 viewports + 200% zoom), so **every item below is invisible to
them.** The reviewer re-ran both plus two custom Puppeteer harnesses (JS-disabled
rendering; computed-style probes).

## Scores

| Dimension            | Score  | Blocking findings      |
| -------------------- | ------ | ---------------------- |
| Accessibility        | **78** | 3, 5, 6, 7, 8, 15, 16  |
| Branding Consistency | **84** | 1, 2, 3, 11            |
| Usability            | **84** | 2, 6, 17               |
| Experience Fidelity  | **85** | 4, 13, 14              |
| Content Quality      | **88** | 11, 12, 17, 18, 19, 20 |
| Depth                | **88** | 21                     |
| SEO                  | **88** | 16                     |
| CTA / Funnel         | **90** | 2 (in-band)            |
| Responsive           | **92** | 8 (latent)             |
| Localization         | **93** | —                      |
| Performance          | **94** | —                      |
| Anti-convergence     | **96** | —                      |
| Social Metadata      | **96** | —                      |

---

## ❌ Blockers

### 1. `404.html:143` — the eyebrow is unstyled; its only rule is scoped to `.page-header`

`<p class="page-eyebrow">` sits in `.misaligned > div`, but the sole declaration
is `theme.css:631` → `.page-header .page-eyebrow`. Measured computed styles:
`download.html` → `12px Jost / rgb(201,168,76) / uppercase / ls 1.92px`;
**`404.html` → `16px Lora / rgb(237,228,204) / none / normal`** — i.e. plain body
copy, visually identical to the `.page-lead` beneath it.

**Fix:** un-scope the block at `theme.css:631-639` to a bare `.page-eyebrow`
selector, or wrap the 404 copy column in `.page-header`.

### 2. `theme.css:571-576` + `index.html:491` — the home install command renders centre-aligned

`.cta-banner { text-align: center }` cascades into the nested
`<pre class="code-block">`. Measured: `index.html` → `center`;
`download.html:129` (same command, inside `.stage`) → `start`. A four-line shell
command centred line-by-line, on the page's primary conversion band.

**Fix:** add `text-align: start` to `.code-block` (`theme.css:994`).

### 3. `components.css:946-954` — `.footer-whisper` fails AA and breaks the kit's IM Fell floor

`rgb(168,180,192,0.65)` composites to `#727E8C` = **4.21:1** on `#0d1b2a`; at
18px non-bold the threshold is 4.5:1 (large = ≥24px, or ≥19px bold). 18px also
violates `brand-kits/stardust-observatory.js:1166` ("Set IM Fell English below
20px") and contradicts `SITE.md:85` ("never < 20px").

**Fix:** `1.25rem` plus a solid mix ≥4.5:1 — `#a8b4c0` is 8.25:1; `#8f9aa6` is
6.0:1 if it must read fainter.

### 4. `js/main.js:369-378` — `easter_eggs[1].reward_copy` is never rendered

`grep "Precision words"` across the site → **0 matches**. Egg 1 shows its reward
(`main.js:333`), egg 3 shows its whisper (`index.html:613`); the typed-word egg
highlights and silently times out. §2A requires all four keys wired.

**Fix:** render it via the existing `.egg-reward` element
(`components.css:915`); keep the Esc exit.

---

## ⚠️ Concerns

### 5. `index.html:616` + `main.js:199` — no-JS: Meridian renders from first paint as two dead buttons

`.meridian` has no `hidden` in markup; JS sets it. Measured with JS off:
`fixed`, `x16 y640 96×44` @320×700, `x648 y956` @768 — no CTA overlap (§19.11
OK), but `.meridian-orb` ("read a note") and `.meridian-dismiss` are focusable
no-ops, and the "arrives on first interaction" accommodation is untrue.

**Fix:** `hidden` in markup on all three pages; JS removes it in `arrive()`.

### 6. `components.css:171-173` — below 900px the header nav is unavailable without JS

`.nav-menu { display: none }`, with `.is-open` added only by `main.js:71-77`.
Verified inert at 320/375/768. `navigation_model.fallback` + §2A require a
working no-JS fallback; only the footer mirror-nav mitigates.

**Fix:** CSS-only disclosure — `<details>`, checkbox + `:checked`, or `:target`.

### 7. `base.css:139` — `html { font-size: 16px }` discards the visitor's default-size preference

In an otherwise all-`rem` site. None of the four sibling regenerated kits do
this, so it is a predecessor carry-over, not a convention.

**Fix:** `font-size: 100%`.

### 8. `theme.css:174-179` — `.hero { overflow: hidden }`

On the container holding the `h1`, both CTAs and the visitor-path fork. §19.13
forbids exactly this; only the `::before`/`::after` decoration needs clipping.
Latent (render-check clean today).

**Fix:** clip a decorative wrapper instead.

### 9. `base.css:36` — `--color-brass-text: #b98c40` is a private derivation where a canonical one exists

kit-brief publishes `#b2803e` for the failing pair `#b07d3a` on `#162338`;
§19.14 row 1 says use it verbatim. All four mixes were verified independently and
the comments' arithmetic is exact: violet `#a38db4` 5.28:1, brass `#b98c40`
5.17:1, info `#79a0d2` 5.84:1, success `#8eb795` 7.03:1 on indigo.
Violet/info/success are the correct §19.1 response (kit-brief never measured
tertiary/info/success as text). Brass is the only duplicate — and it measures
**4.4964:1 on `--color-surface-alt` `#1e2e45`**, a surface `SITE.md:39` lists as
real.

**Fix:** use `#b2803e`; on `#1e2e45` use kit-brief's `#b98d52` (5.25:1).

### 10. `components.css:713-726` — `.badge-gold` / `.badge-violet` / `.badge-brass` are dead rules

Zero uses across all nine pages, so `--color-violet-text` and
`--color-brass-text` reach no rendered element while `SITE.md:71-72` presents
both as required. (`.client-status status-stable|beta` _are_ used and land on
`--color-surface` at 7.03:1 / 5.84:1 — correct.)

**Fix:** use them (the kit's `badges.labels` are candidates), or delete the rules
and the SITE.md rows.

### 11. `index.html:270,290` — `cast: hero instrument` prints internal vocabulary to the visitor

The kit's `feature_casting` jargon leaks into rendered copy; off-voice for
"Scholarly, Lyrical, Precise".

**Fix:** re-voice ("Principal instrument") or remove — `.plate-hero` sizing
already signals weighting.

### 12. `index.html:406-480` — `#proven-path` is ~139 authored words vs the declared 120 cap

Measured per beat (verbatim `content.json` facts and kit-verbatim
`copy_overlay`/`angle` strings excluded): dome-rising 114 ✅, the-instruments
~110 ✅, why-stardust ~111 ✅, **proven-path 139 ✗**, chart-course 86 ✅. The
placard's six `<dd>` are _re-voiced_, so §19.6's exemption does not cover them;
`REGEN_PLAN.md:29` claims the cap is met.

**Fix:** tighten, or quote verbatim so the exemption applies — and correct the
manifest row.

### 13. `main.js:214-230` — the `home:#hero` tip can never fire from its declared trigger

`#hero` intersects at load, the callback hits `if (!armed …) return`, and
`observe()` has already `unobserve`d (`main.js:55`). Tip 1 of 5 survives only via
a manual orb tap.

**Fix:** don't unobserve until spoken, or re-check intersecting tips inside
`arrive()`.

### 14. `main.js:185` — phone guard is `(width <= 600px)`, read once

§19.14 sets the boundary at 768px, so 601–767px still gets auto-pushed bubbles
from a fixed companion, and rotation never re-evaluates.

**Fix:** 768px plus a `change` listener.

### 15. `main.js:187-190` + `index.html:617-618` — live region written while `hidden`

`bubble.textContent = text` then `bubbleBox.hidden = false`; most screen readers
will not announce a mutation that happened outside the a11y tree, so Meridian's
tips are likely silent to AT.

**Fix:** unhide first, then set text.

### 16. `features.html:135,153,168,182,197,213,228,243` and `clients.html:122,146,168,192,214` — titles at the same level as the section introducing them

`features.html:120` is `<h2>The gallery of plates</h2>` and all eight plates are
`<h2>`; the _same plates on `index.html:265` are `<h3>`_.

**Fix:** demote to `<h3>` on both pages.

### 17. `docs.html:120-133` — three differently-labelled links resolve to one URL

"User guide", "Developer docs — architecture and the plugin contract" and "Hub
admin — running your own relay" all → `https://detain.github.io/phlix-docs`;
`content.json` supplies only the root and `/reference/api.html`. ⚠️ not ❌
because `docs.html:117` discloses it, and two sibling kits solved it by inventing
URLs (worse).

**Fix:** collapse to the two real destinations, or suffix the labels.

### 18. `REGEN_PLAN.md:135-136` — false escalation note

It claims `content.json.meta.og_image` is `/img/og.svg`, root-absolute. It is
**`img/og.png`** — already PNG, already relative, with an `og_image_note`
explaining the absolute rule. The site's own meta is correct (absolute
`…/img/og.png`, verified 1200×630).

**Fix:** delete or correct the note.

### 19. `SITE.md:88,90,106` — three doc claims contradict the CSS

"All 13 `@font-face` rules" (actual 15; selfcheck counts 16); DM Mono listed as
"400, 500" while `base.css:374-380` declares **DM Mono 700 pointed at
`dm-mono-500-latin.woff2`**, plus undeclared Lora 700 / Jost 700; "500ms
page-turn wipe" vs `theme.css:155`'s `--duration-celestial` = 1200ms. The block
is tool-generated, so fix the doc.

### 20. `img/PROMPTS.md:59` — "For each of the 7 features"

There are eight.

### 21. `hub.html:115-167`, `docs.html:116-150`, `plugins.html:115-190` — no brand-native component

features→plates, clients→chambers with dome arcs, download→numbered stages,
about→study+letters, index→dome/page-turns/placard/ladder; these three are plain
`.content-section` prose (hub has no motif at all). No `page_blueprints` entry
exists for them, so **not a spec violation** (§19.9) — but for the only kit
declaring all 21 fields, and with hub at `emphasis: default`, they read visibly
thinner. Enhancement, not a gate.

### 22. `sites/stardust-observatory/reviews/stardust-observatory/FINAL-REVIEW.md`

Confirmed **not published** (`dist/stardust-observatory/` has no `reviews/`). Not
a site defect; it is the only review artefact under `sites/` rather than
`reviews/<slug>/`. Orchestrator-level relocation.

---

## The seven judgement calls the author flagged — all upheld

- **"5 native clients" → "Four … plus any DLNA device"** (`index.html:415`):
  correct, matches §19.14 verbatim; `content.json` has 4 native + `dlna`, mobile
  `beta`. The verbatim pitch bullet (`index.html:382`) is exempt and untouched.
- **Star/issue counts linked, never printed** (`index.html:459-478`): correct; no
  count/total/contributor figure anywhere. The `quotes-from-docs` signal is also
  right — `pitch_bullets[0]` verbatim, attributed to "The project's first
  principle, stated in its own words".
- **Contrast understatement**: correct. Gold re-measured at 7.61:1 (navy) /
  6.90:1 (indigo) / 6.00:1 (Deep Meridian) — small UI text in gold is safe.
  Three of four derived mixes are right; brass is finding 9.
- **404 shipped + headline rewritten**: correct on both. §19.14's last row makes
  the "out of scope" note stale; the concept itself offers "The dome sees nothing
  here" as an alternative, so using it honours the field rather than overriding
  it, and "This coordinates don't exist" must not ship. The page is otherwise
  exemplary — finding 1 is a CSS scoping slip, not a content call.
- **Dome audio dropped for motion + `aria-label`**: correct under §19.6 (field vs
  §12 → §12). Scroll-triggered audio needs a gesture in every modern engine and
  trips WCAG 1.4.2 past 3s; `sound_identity` is an app-surface spec. The
  `fallback` field itself asks for `aria-label` on the dome mechanism, which is
  what shipped (`index.html:141-145`). Optional upside: an opt-in "hear the dome
  motor" button would satisfy the field with no violation.
- **Mascot arrives on first interaction**: correct — one of the two options
  §19.14 names verbatim. Verified no overlap with either hero CTA at 320/375/768.
  Findings 5/13/14 are gaps in the implementation, not objections to the
  approach.
- **Pricing block removed**: confirmed gone.
  `grep -riE "pricing|price|\bplans?\b|tier|subscription|per month|/mo|upgrade|premium|paid|billing|checkout|\$[0-9]"`
  over all nine pages returns exactly one hit — the JSON-LD
  `"offers": {"price":"0","priceCurrency":"USD"}` at `index.html:60`, the shared
  free-software convention, and true. No plan/tier/price language in any rendered
  copy.

## Checked and clean (so depth is auditable)

No-JS dome state is genuinely **open** (`.dome-half-*` default transforms are the
open state; JS _adds_ `data-dome="closed"`), so the declared `fallback` and the
`aria-label` agree — the author got the hard part right. Nav emphasis renders
three distinguishable levels (gold-600 / parchment / silver). Footer is
mirror-row + three verbatim `content.json` columns (§19.14). Licence stated
correctly in three places, never "across the board". All 8 features appear;
footnote trio correctly absent from home. FAQ: 6 canonical verbatim + 3
`extra_questions` reusing the mapped answers with the mapping disclosed.
`persona_vignettes` seed both `clients.html:239-264` (features_shown named
correctly for all three) and `img/PROMPTS.md:155-161`. Seasonal date-gate handles
the year-wrapping Winter range correctly. Esc exits all eggs and closes the menu
with focus return. `.sr-only` has `overflow: hidden` (§19.15). Every grid uses
`minmax(0,·)` / `minmax(min(Npx,100%),1fr)`; `code`/`pre` get `overflow-wrap:
anywhere`. Touch targets 44px+ throughout. `@copyright` correctly inside a
comment block. Zero external font/CDN requests. `og.png` verified 1200×630;
sitemap excludes 404; single `h1` per page; §11 social meta complete and
absolute.

Anti-convergence is strong — nav labels, section ids (`dome-rising` /
`the-instruments` / `why-stardust` / `proven-path` / `chart-course`), and
component vocabulary (dome, plate, atlas-entries, viewing room, spine, letter,
placard, expedition stage) share nothing structural with `abstract-canvas`,
`cottagecore-bloom`, `neon-noir` or `swiss-modernist`.

Per instruction, nothing was filed about the 14.8 KB of JS or the CSS size; the
JS is dependency-free, deferred, and reduced-motion-gated throughout.
