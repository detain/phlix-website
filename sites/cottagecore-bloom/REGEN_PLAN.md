# REGEN_PLAN.md — cottagecore-bloom

Regeneration manifest. Kit: `brand-kits/cottagecore-bloom.js` (schema 2.0, base kit,
LIGHT background). Declared `experience_archetype: "narrative-scroll"`.
Date: 2026-07-25.

---

## 1. Experience fields — old → new

| Field                   | Old site (2026-07-04)                          | This regeneration                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| ----------------------- | ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `experience_archetype`  | generic "immersive/editorial" guess in SITE.md | Adopt **narrative-scroll** literally: home is one continuous garden walk, six ordered narrative beats, each a landmark section.                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `site_architecture.nav` | generic 8 links (Home…About)                   | **6 links, kit labels + order**: The Garden · What Grows Here · Guest Rooms · Start Your Own · The Gatehouse · Our Story. `emphasis` → primary/default/muted styling tiers.                                                                                                                                                                                                                                                                                                                                                                             |
| `.demoted_pages`        | Plugins + Docs in the primary nav              | Both leave the nav. `plugins` **folded into** `features.html#plugins` ("the specialist's shelf") and kept as a full page; `docs` reachable from the footer only. Both still in `sitemap.xml`.                                                                                                                                                                                                                                                                                                                                                           |
| `.extra_pages`          | absent                                         | New **`seasons.html`** — "Blooming Through the Year", built only from `seasonal_variants` + `tagline_secondary`.                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `.footer_arrangement`   | 3 content.json columns only                    | **mirror-nav**: a top "Garden Paths" row mirroring nav order + the 2 demoted pages, then the 3 verbatim content.json columns below.                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `homepage_narrative`    | hero → pitch → features → cta (4, generic ids) | 6 sections, kit ids/order: `gate-opens` → `why-this-garden` → `what-blooms` → `guest-rooms` → `trust-the-keeper` → `plant-your-seed`. `arc: story-first`; `logline` printed verbatim as the hero deck, `.hero-deck` between the script tagline and the subheadline (`index.html`, beat 1).                                                                                                                                                                                                                                                              |
| `page_blueprints`       | none applied                                   | features = **garden-room-tour** (8 numbered garden rooms); clients = **guest-accommodations** (numbered guest rooms); download = **seed-planting**; about = **garden-journal** + FAQ.                                                                                                                                                                                                                                                                                                                                                                   |
| `feature_casting`       | all 8 features flat on home                    | Home = 2 **hero plates** (library, syncplay) using each `angle` as its headline + 4 **support rows** (auth, transcode, livetv, hub). `footnote` (dlna, plugins) → features page only.                                                                                                                                                                                                                                                                                                                                                                   |
| `copy_overlay`          | content.json hero verbatim                     | Hero eyebrow/headline/subheadline + `secondary_cta.label` ("Peek Inside", declared literal, unexpanded) + 3 section headings + footer tagline from the overlay. content.json hero subheadline retained verbatim as the hero's factual strapline (no fact dropped).                                                                                                                                                                                                                                                                                      |
| `copy_treatments`       | plain `<ul>` / `<dl>` / cards                  | pitch_bullets → **garden-guideposts** (signposts on a winding path); faq → **gardeners-questions**; clients → **guest-rooms**; ecosystem → **bookshelf** (download + docs).                                                                                                                                                                                                                                                                                                                                                                             |
| `faq_experience`        | 6 Q/A in content.json order, no framing        | Framed as "Gardeners' Questions" with the garden's own patient persona. `question_order` == content.json order (no reorder needed). 3 `extra_questions` added as extra `<dt>` on the same `<dd>`.                                                                                                                                                                                                                                                                                                                                                       |
| `persona_vignettes`     | not used                                       | Drive `img/PROMPTS.md` (3 vignette scenes + their `surfaces`/`features_shown`) and align the `visitor_paths` fork emphasis.                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `hero_experience`       | flat hero + drifting-petal overlay             | **diorama-parallax**: 5 layered garden planes (sky wash + pressed-flower field → canopy + thatched cottage → gate piers + climbing roses → foreground border → Primrose) moved by pointer + scroll, ≤5 KB, reduced-motion off. Each plane places its art as framing pieces sized in CSS (`.art-top` / `.art-left` / `.art-right` / `.art-bottom` + 10 `.motif` specimens), so the composition surrounds the copy at every viewport: measured **0 % of the hero carries no illustration** at 375/768/860/1280, against 81/60/37 % in round 1. See §5.10. |
| `navigation_model`      | generic topbar                                 | **topbar** with garden-gate-post dividers, wordmark + Primrose silhouette, rose underline + petal dot on the active link. The plain `<nav>`/`<ul>` **is** the fallback; `Menu` button ≤900px.                                                                                                                                                                                                                                                                                                                                                           |
| `scroll_experience`     | plain IntersectionObserver fade                | **petal-unfold**: each section blooms in (opacity + 12px drift + 0.985→1 scale); passed sections settle to a gentle desaturation. Dropped entirely under reduced motion. See §5.3.                                                                                                                                                                                                                                                                                                                                                                      |
| `easter_eggs`           | none                                           | 3 wired: topbar Primrose sigil ×5 → petal shower + "How lovely that you found me!"; typed `garden` → bee flight path + Primrose dance; hover-hold 2 s on Primrose → "Keep tending." Esc exits all.                                                                                                                                                                                                                                                                                                                                                      |
| `mascot.behavior`       | mascot mentioned in SITE.md only               | **Primrose** built: fixed bottom-right on home/features/download/about only **at ≥900px** (the nav's breakpoint), drift idle (off under reduced motion), 5 anchored tips shown on first engagement rather than on load, `click:5` curtsy, `hover-hold:2s` spiral, dismiss + localStorage **plus a "Wake Primrose" restore control** in the footer utility row (§19.21). See §5.6.                                                                                                                                                                       |
| `conversion_funnel`     | single "Download Phlix" button                 | **guided-steps**: the 3-step `cta_ladder` (Start Your Garden → Pick Your Guest Rooms → Plant the Seeds) rendered as a visible spine on home §6 and as the download page's structure.                                                                                                                                                                                                                                                                                                                                                                    |
| `proof_strategy`        | absent                                         | The 3 signals as one calm band (`#trust-the-keeper`) between what-blooms and plant-your-seed: spec placard, community row (links, **no printed counts**), one true quoted line.                                                                                                                                                                                                                                                                                                                                                                         |
| `visitor_paths`         | absent                                         | "What kind of gardener are you?" fork inside the hero section: solitary → `features.html#library`, gatherer → `features.html#syncplay`, tinkerer → `features.html#plugins`.                                                                                                                                                                                                                                                                                                                                                                             |
| `complexity_profile`    | dense generic prose                            | density minimal; `home_sections_max: 6` respected exactly (6/6); `words_per_section_max: 80` applied to authored prose; `jargon_policy: translate` → plain framing visible, precise content.json body in `<details>`.                                                                                                                                                                                                                                                                                                                                   |
| `intensity_toggle`      | absent                                         | "Quiet the Garden" in the **footer utility row** with a leaf icon, `default: full`, persisted; gates animation/parallax/petal-unfold/easter-eggs. All three eggs are gated the SAME way — calm mode removes the motion (petal shower, bee flight path, curtsy) and never the reward copy (§5.11). Static, not fixed (see §5.4).                                                                                                                                                                                                                         |
| `seasonal_activation`   | documented in SITE.md only                     | **live-js** date gate: flips the `seasonal_variants` override tokens + a motif SVG during each `active_range` and shows the kit's banner **verbatim**, after the season's name. 3 new `img/seasonal/*.svg`. Inactive on 2026-07-25, so all three branches (plus the year-wrapping Midwinter tail) were exercised by forcing the clock, not by trusting today's date — every variant's text pairs measured ≥4.5:1 (§19.19, §5.12).                                                                                                                       |
| `error_page_experience` | **no 404.html at all**                         | New `404.html`: Primrose alone in a bare bed with a "404" seed packet, realised as content; `robots noindex`; relative assets only; recovery links home/features/download.                                                                                                                                                                                                                                                                                                                                                                              |
| `header_motif`          | petal animation present                        | Kept, folded into the diorama's foreground plane.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |

**Absent → default behaviour, no invention:** `navigation_model.keyboard` (null → Tab
order only, no custom key model), `feature_casting.omit_from_home` (empty → nothing
suppressed), and every non-experience section of the kit (identity, palette, type,
shapes, icons, illustration, photography, motion, UI system, media identity,
copywriting, AI-generation guidance, design tokens, responsive, sound, do/don't,
metadata) which is styling/authoring input rather than a structural override.
`sound_identity` is deliberately **not** implemented — a marketing page that plays
audio is a WCAG 1.4.2 hazard; it is documented in `SITE.md` instead.

---

## 2. Nav diff

| Old (8, generic) | New (6, kit labels)                                                | Emphasis | Target          |
| ---------------- | ------------------------------------------------------------------ | -------- | --------------- |
| Home             | **The Garden**                                                     | primary  | `./`            |
| Features         | **What Grows Here**                                                | primary  | `features.html` |
| Clients          | **Guest Rooms**                                                    | default  | `clients.html`  |
| Download         | **Start Your Own**                                                 | primary  | `download.html` |
| Plugins          | — demoted → `features.html#plugins` + footer                       | —        | `plugins.html`  |
| Docs             | — demoted → footer only                                            | —        | `docs.html`     |
| Hub              | **The Gatehouse**                                                  | default  | `hub.html`      |
| About            | **Our Story**                                                      | muted    | `about.html`    |
| —                | (not in nav) **Blooming Through the Year** — footer + home + about | —        | `seasons.html`  |

Footer row 1 (mirror-nav): the 6 nav labels in nav order, then Plugins, The Reference
Library (docs), Blooming Through the Year. Footer rows 2–4: the 3 content.json columns,
labels **verbatim** (including `License (MPL-2.0)`).

## 3. Home section order

| #   | Old              | New id             | Source                    | Weight | Canonical class      |
| --- | ---------------- | ------------------ | ------------------------- | ------ | -------------------- |
| 1   | hero             | `gate-opens`       | `copy_overlay.hero`       | hero   | `.hero`              |
| 2   | pitch            | `why-this-garden`  | `story`                   | major  | `.pitch`             |
| 3   | features (all 8) | `what-blooms`      | `feature_casting`         | major  | `.features-overview` |
| 4   | —                | `guest-rooms`      | `page_blueprints.clients` | minor  | `.content-section`   |
| 5   | —                | `trust-the-keeper` | `proof_strategy`          | minor  | `.content-section`   |
| 6   | cta-banner       | `plant-your-seed`  | `conversion_funnel`       | major  | `.cta-banner`        |

`visitor_paths` is nested at the end of §1 (kit says "near the hero") rather than added
as a 7th section, because `page_budget.home_sections_max` is 6.

## 4. Carry-forward from the old site

- `css/base.css` `vendor-fonts` block — all 10 `@font-face` rules already resolve to
  `../../assets/fonts/*.woff2`. Kept byte-identical; no font escalation needed.
- The `:root` token block (kit `design_tokens` verbatim) — kept, and **extended** with
  the derived "ink" tokens of §5.1.
- `img/favicon.svg` — Primrose the bee on a Garden Rose tile. Excellent already; kept.
- `img/logo.svg` — Playfair-italic-styled wordmark + climbing-rose sprig; kept, motif
  refined. It sets `font-family="Georgia, …serif"` because an `<img>`-referenced SVG
  cannot use the page's `@font-face`; that is correct, not a defect.
- `img/og.svg` → `og.png` pipeline; og.svg re-authored for the new headline.
- Spacing / radius / shadow scales, the `--focus-halo` triple-ring focus treatment, and
  the `prefers-reduced-motion` reset — all kept.
- The canonical class names (`.hero`, `.pitch`, `.features-overview`, `.page-header`,
  `.content-section`, `.content-grid`, `.feature-detail`, `.client-card`,
  `.download-card`, `.code-block`, `.faq-list`) and the `git clone / composer install`
  install snippet.
- **Not** carried forward: the missing `body` background (see §5.5), the
  `rgba()`-tinted active nav link (§5.5), the unresolvable `url(%23n)` in
  `components.css`, and the JSON-LD `license` which claimed **BSD-3-Clause** — a factual
  error; now MPL-2.0 per `content.json`.

## 5. Ambiguities resolved

### 5.1 The kit's contrast arithmetic is wrong (§19.1, §19.6 "field vs §12 → §12 wins")

`accessibility.minimum_contrast` claims Garden Rose on Warm Ivory = **4.8:1** and Warm
Ivory on Garden Rose = **4.8:1**. Measured: both are **4.02:1** — failing AA for small
text, including **the primary button label**. Also measured: Sage Green 2.88:1 (fails
even the 3:1 non-text floor), Lavender Mist 3.60:1, Warm Taupe 2.41:1, Herb Green
4.45:1 on Garden Cream (marginal fail). The kit's own `color_rules` line "Bark Brown on
Warm Ivory = 16:1+" is correct (15.92:1).

Fix per §19.1 — **deeper mixes of the kit's own pigments with its own Bark Brown**, no
new hues. Ratios below are against Warm Ivory / Garden Cream / Butter Soft:

| New token           | Mix                      | Hex       | ivory / cream / butter | Used for                                                |
| ------------------- | ------------------------ | --------- | ---------------------- | ------------------------------------------------------- |
| `--color-rose-ink`  | Garden Rose ⊕ 30% Bark   | `#99434F` | 6.10 / 5.88 / 5.65     | small rose text, **primary button fill**, links         |
| `--color-sage-ink`  | Sage Green ⊕ 40% Bark    | `#5A6947` | 5.63 / 5.42 / 5.21     | sage text, secondary button text + border, icon strokes |
| `--color-lav-ink`   | Lavender Mist ⊕ 35% Bark | `#69587B` | 6.08 / 5.86 / 5.62     | badge text, tertiary accents                            |
| `--color-taupe-ink` | Warm Taupe ⊕ 40% Bark    | `#7A6A5D` | 4.93 / 4.75 / 4.57     | muted/secondary text, captions                          |
| `--color-herb-ink`  | Herb Green ⊕ 20% Bark    | `#44684A` | 6.00 / 5.79 / 5.55     | "stable" status text                                    |
| `--color-honey-ink` | Honey Gold ⊕ 35% Bark    | `#8E5922` | 5.54 / 5.34 / 5.12     | "beta" status text, seasonal accent                     |

Pure `#C8556A` / `#7A9E6B` / `#8B7AB5` / `#B0A090` / `#E8D5C4` are retained for
**display type ≥32px, rules, borders, botanical fills, glows and shadows only** — never
for small text. Pure Garden Rose at 4.02:1 clears the 3:1 large-text/UI bar, so the
Dancing Script display line and the focus ring keep the true brand hue. Pure Sage
(2.88:1) is restricted to **purely decorative** botanicals, which WCAG 1.4.11 exempts.
Briar Red `#B53040` (5.77:1) already passes and is unchanged.

`colors.info` (Cornflower `#5B7FC4`) is **not used anywhere**: it is 3.78:1 and the kit's
own `color_rules` forbid cold tones. Documented, not shipped.

### 5.2 "Two steps" vs "three steps" on Download

`page_blueprints.download.spec` says "Two simple steps"; `conversion_funnel` declares a
**3-step** `cta_ladder` and `download_opening` says "Three steps to blooming".
Per §19.6 (blueprint prose vs structured field) the structured field is the authority for
counts — the page ships **three** steps, honouring the blueprint's planting _shape_.

### 5.3 `scroll_experience` sepia vs §12

The kit asks passed sections to "fade to soft sepia". CSS `sepia()` shifts luminance and
would drop measured text contrast. Per §19.6 (field vs §12 → §12 wins) the effect is
implemented as `saturate(0.72)` plus a 6 % warm-ivory veil, which is luminance-preserving:
Bark Brown on Warm Ivory stays above 13:1 and every ink token stays above 4.5:1. Reads as
the intended warm settling; measurably safe. Dropped entirely under reduced motion.

### 5.4 Two `click:5` eggs (§19.8)

`easter_eggs[0]` and `mascot.behavior.easter_interactions[0]` share `click:5`. Per §19.8
they have different **targets**: 5 clicks on the topbar **Primrose sigil** fire the
full-screen petal shower + reward copy; 5 clicks on **Primrose the companion** fire her
loop-de-loop curtsy. Both implemented. `easter_eggs[2]` and `easter_interactions[1]` are
the same `hover-hold:2s` on Primrose and are implemented once (bubble + petal spiral).

The sigil is a plain `<button>` beside the logo anchor, **not** the logo link itself.
Attaching a click-count egg to an anchor cannot work: the first click navigates and the
counter resets, so the egg is unreachable — the first build did exactly that and a
browser test caught it. The sigil also realises the kit's own
`navigation.topbar` line ("a small botanical motif beside the logo"), and clicks 1–4
return one of the kit's `greetings[]` so the control is never dead.

### 5.5 Two render-only defects inherited from the old site (§19.10)

Both were invisible in source review and both were found by `render-check`:

1. The old `body` had **no `background-color` at all** — so the "warm ivory" kit shipped
   on browser-default white, and `render-check` resolved every text element's backdrop to
   transparent-black and reported 27 false-looking "1.25:1" failures. Fixed by an explicit
   opaque `background-color` on `html` and `body`; any texture is applied with the
   `background-image` longhand so the colour survives.
2. `render-check`'s contrast probe **ignores alpha**, so the old active nav link
   (`background: rgba(200,85,106,.1)` with `color: #C8556A`) measured 1.00:1. Rule adopted
   site-wide: **no semi-transparent background behind text**; text sits on opaque palette
   colours only. Alpha is used solely for shadows, glows and decorative overlays.

### 5.6 `mascot` placement, and why the breakpoint is 900px (§19.11, §19.21)

The kit puts Primrose bottom-right with anchored tips, and also says "never push
unrequested tips on a phone". At 320px there is no room for a companion plus a bubble
without covering the CTA. Resolution: the fixed companion and its tips render at
**≥56.25rem (900px) only** — the same breakpoint the nav collapses at; below that
Primrose appears solely as the inline illustration she already is (hero diorama, 404).
The `intensity_toggle` lives in the static footer, so no two fixed elements can ever
collide.

Round 1 used **720px**, and the 180px disagreement with the nav's 900px was the site's
worst defect: between 720 and 899px the "Primrose, rest now" pill lay across a
`visitor_paths` card and took **7 of 18** clicks aimed at it, permanently, because the
dismissal persists to `localStorage`. Three changes, not one:

1. the breakpoint is now the nav's (a component breakpoint that disagrees with the nav's
   creates a band nobody tests);
2. the dismiss pill is `display: none` until Primrose is hovered, focused or tapped, so
   it is never a standing click target — `display`, not `opacity`/`visibility`, because
   those two leave a real hit box and a real bounding rect that a probe still finds;
3. a **"Wake Primrose"** restore control sits in the footer utility row and appears
   whenever she is resting (§19.21). The kit explicitly asks for `localStorage`
   persistence, so the dismissal stays persistent and gains a way back rather than being
   demoted to session scope.

Re-verified by hit-testing all three path cards at 18 points each: **18/18 return the
card** at 720, 768, 860, 899, 900, 1024 and 1280px.

### 5.7 `proof_strategy` "quotes-from-docs"

I cannot verify an arbitrary sentence in `phlix-docs`, and inventing one would be a
fabrication (§19.7). The quoted line is instead **verbatim from `content.json`'s FAQ
answer on not exposing your server**, attributed to "the Phlix FAQ" and linked to the
docs site. True, traceable, and short.

### 5.8 `seasons.html` scope

`seasonal_variants` describe the **brand kit's** palette calendar, not a Phlix product
feature. The page is written explicitly about how this garden (the theme) changes through
the year, so no product claim is implied. `facts_from` is honoured: content comes only
from `seasonal_variants` and `tagline_secondary`.

### 5.9 `avoid_words` collisions

`content.json` never uses any of the kit's 12 `avoid_words`, so no fact has to be
re-voiced to satisfy the list. Authored copy avoids them; "dark" appears nowhere.

### 5.10 The diorama frames the copy; the `visitor_paths` fork stands in it

`hero_experience` asks for a "gate frame" whose fallback is "a single, hand-painted
cottage garden watercolour", and the kit says "always abundant" four times. Round 1 let
every plane fall to `height: auto`, which made each plane's height width÷aspect and
pinned all five to the bottom edge: a thin strip with the copy floating above it in bare
ivory (81 % of the hero at 375px). The composition is now built from pieces placed and
sized in CSS — a canopy along the top, a rose-covered pier up each side, two dense
bottom bands, and ten pressed-flower specimens scattered across the field — with
percentage heights, px `min-height`s and `slice` fits, so the art CROPS on a narrow
viewport instead of shrinking. Measured coverage: **0 % of the hero with no
illustration** at 375, 768, 860 and 1280px.

Two consequences handled at the same time:

- **The fork no longer fragments the art.** Three opaque `--color-surface` cards cut the
  illustration into disconnected pieces, so the three cards now sit inside **one**
  parchment panel and are outlined rather than filled. The panel is fully opaque, not
  tinted: `render-check`'s contrast probe ignores alpha (§5.5.2), so no text on this
  site sits on a translucent fill. Primrose's plane moved off the card edge she used to
  land on (`margin-inline-start: 62%` → `inset-inline-end: 7%`, mid-height).
- **The right-hand reserve starts at 48rem, not 62rem.** `.hero-copy` is capped at 46ch,
  so between roughly 620 and 992px the right half was claimed by neither the copy nor
  the art. The reserve is now 76 % from 48rem and 62 % from 62rem, and what it reserves
  is the pier, the scatter and Primrose.

### 5.11 Which rose, where (`color_rules` vs §12)

Moving the primary button off pure Garden Rose was forced by measurement (§5.1), but
round 1 then left pure rose painting ~11 non-CTA elements — so the loudest rose on the
page was never the CTA, inverting `color_rules` ("reserved for the single most important
CTA per screen") and `do_dont.colors.dont` ("never for secondary or tertiary UI
elements"). Pure `--color-primary` is now confined to:

- the **nav active state** (underline + petal dot) — the kit's own
  `colors.primary.usage` names "active states";
- the **focus ring** — `--color-focus` is `#C8556A` in `design_tokens`, verbatim;
- **display type** — `.script`, `.numeral`, `.footer-tagline`;
- **hover states on cards** — `cards{}` specifies "on hover a 1px Garden Rose border";
- **decorative botanical fills** — petals, the pressed-flower scatter, the scrollbar.

The plate, garden-sign, seed-box, guidepost, book-spine, mascot-bubble and reward-note
edges are now Petal Blush with a **Sage Ink** accent (2.88 → 5.63:1, so they clear the
3:1 UI bar too), and the bookshelf's alternating spines are sage + lavender ink — one of
the kit's two permitted accent pairs, and rose-free.

The hero diorama and the 404 illustration carry **rose + sage only**; Lavender Mist is
kept for badges/chips and for Primrose's own mixed flower crown, which the kit describes
that way. `seasons.html` still shows all three named pigments in its base-palette swatch
row, and that is deliberate — see §5.13.

### 5.12 Every seasonal variant, not just today's (§19.19)

`seasonal_activation` is inert on 2026-07-25 but ships, and each variant will be live for
weeks. All three branches plus the year-wrapping Midwinter tail (2027-01-03) were forced
with a faked clock and re-measured: Harvest CTA 6.45:1, Midwinter 8.63:1, Spring 6.24:1,
base 6.10:1; the lowest text pair in any variant is the Midwinter `journal-date` at
4.67:1. Every variant overrides its ink tokens alongside its display hues, which is why
they hold.

`seasons.html` prints each `active_range` as English prose so a no-JS visitor can read
it; where JS runs, the label is rewritten from the same integer pairs the date gate uses
(`data-season-range`), so the prose and the data cannot drift.

### 5.13 `seasons.html` swatch labels

Round 1 gave the seasonal swatches invented colour names ("Blossom rose", "Early lilac")
in the same `#HEX Name` format as the three names that really are the kit's.
`seasonal_variants[*]` name no colours, so the labels now say which declared token each
override replaces — "#D46A82 in place of Garden Rose" — and every override is shown, not
a subset: Harvest gained `--color-bg` and Midwinter gained `--color-surface`.

This is also why the base card still shows Garden Rose + Sage Green + Lavender Mist
together. That row is a **specimen chart of the kit's palette**, not a decorative view,
and the honesty fix above requires showing _more_ of each variant's tokens rather than
fewer. Dropping a swatch to satisfy the two-accents-per-view rule would make the palette
page misrepresent the palette.

## 6. Escalations (shared changes I did NOT make)

1. `shared/data/font-sources.json` — **no change needed**; all five families
   (Playfair Display, Lora, Nunito, Dancing Script, Courier Prime) are vendored.
2. `tools/render-check.mjs` line ~210 `parseRgb` drops the alpha channel, so a
   translucent background is scored as opaque (see §5.5.2). Any site that legitimately
   tints a surface with `rgba()` will get a false FAIL. Suggest compositing over the
   nearest opaque ancestor before computing the ratio. **Not changed** — `tools/**` is
   read-only to me and 3 other authors are mid-edit.
3. `tools/selfcheck.mjs` check 4 resolves **every** `url()` in CSS, including SVG
   fragment references like `url(#gradient-id)`, which are same-document and cannot
   resolve on disk. Suggest skipping refs starting with `#` / `%23`. Worked around here
   by using no `url()` other than fonts.
4. `shared/content.json` `meta.og_image` was `/img/og.svg` — an SVG, which
   `check-meta.mjs` rule 5 rejects, and an absolute path. **Already fixed during this
   build** by someone else: it now reads `img/og.png`. No action needed; noted so the
   reviewer knows the `og:image` values on these pages (absolute
   `…/cottagecore-bloom/img/og.png`) agree with it.
5. `tools/render-check.mjs` hardcodes its page list to the 8 canonical pages +
   `404.html`, so a kit-declared `extra_page` is never gated. `seasons.html` was checked
   by hand with the same probes instead (see `BUILD_LOG.md` § Verification). A `--pages`
   flag or a glob over the kit's own HTML would close this.

6. `shared/assets/fonts/` carries `lora-700-latin.woff2` and `nunito-700-latin.woff2`,
   which this kit does not declare (`fonts.body.weight: [400, 500]`,
   `fonts.ui.weight: [400, 500, 600]`). `tools/vendor-fonts.mjs` had emitted `@font-face`
   rules for both; **the two rules are deleted from `css/base.css`** and every computed
   `font-weight` on all ten pages was re-checked against each family's declared list
   (script: resolve `getComputedStyle` per element, compare to the kit) — no undeclared
   weight remains. The generator and `kit-brief` are reported as fixed upstream; noted
   here so the next round knows the two files in the pool are deliberately unreferenced.
