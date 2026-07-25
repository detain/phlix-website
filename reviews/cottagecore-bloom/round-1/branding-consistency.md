# Branding Consistency Review — Cottagecore Bloom

**Variant**: cottagecore-bloom
**Round**: 1
**Reviewer**: adversarial reviewer (Claude Opus 5)
**Date**: 2026-07-25

## Score

- **Branding Consistency**: 79 / 100

This does not look like a recoloured template — the structure, the motifs and the
voice are all traceable to the kit. What pulls the score down is that the site
breaks two of the kit's *explicitly written* colour "don'ts", and that the hero —
the brand's signature moment — reads sparse in a kit whose loudest instruction is
"never sparse".

## ✅ Passed

- **Anti-convergence is strong.** Structural diff against the four other
  regenerated sites on disk:

  | | nav labels | home section ids | pages |
  | --- | --- | --- | --- |
  | cottagecore-bloom | The Garden / What Grows Here / Guest Rooms / Start Your Own / The Gatehouse / Our Story | gate-opens → why-this-garden → what-blooms → guest-rooms → trust-the-keeper → plant-your-seed | **10** (incl. `seasons.html`) |
  | swiss-modernist | — | manifesto → value-structure → features-grid → proof-placard → install-cta | 9 |
  | neon-noir | — | opener → case-brief → lead-cases → trust-play → closing-act | 9 |
  | abstract-canvas | — | canvas-primed → why-this-studio → who-has-painted-here → hang-your-work | 9 |
  | stardust-observatory | — | dome-rising → the-instruments → why-stardust → proven-path → chart-course | 9 |

  Different nav labels, different section count and ids, a different page
  inventory (the only site with an `extra_page`), and a different CTA ladder.
  This is structural divergence, not cosmetic.
- **Type roles are exactly the kit's.** Playfair Display 700/900 for headlines
  and numerals, Lora 400/500 for body at 17px (kit: "never below 15px"), Nunito
  for UI/buttons/nav/chips, Courier Prime for genuine technical data only
  (`journal-date`, `plate-latin`, `room-number`, `book` spines, code) — never
  decoratively, which is a kit rule people routinely break. Dancing Script is
  confined to display moments and never appears on a button or in body copy.
  Headline tracking is `-0.01em` as specified; body line-height 1.75.
- **Shape and surface language is faithful.** 4/8/12/16/24/999px radii from
  `corner_radius`, 1px `#E8D5C4` Petal Blush borders, `--color-surface` cards at
  12px with 20px padding (kit `cards{}` verbatim), the three warm-tinted shadow
  steps plus the three botanical glows, and a **pure-CSS linen grain** on `body`
  (`base.css:176-178`) that honours the kit's own performance rule
  ("compress texture overlays aggressively / use CSS box-shadow, not glow images").
- **Iconography matches `icon_rules` precisely** — 1.75px stroke, `round` caps and
  joins, outlined, minimum corner radius respected, and every icon carries a
  small botanical accent (the leaf on the library shelf, the sprig, the bee).
  Delivered as one same-document `<symbol>` sprite per page, which also works
  under `file://`. No sharp angular set anywhere.
- **Motion is on-brand.** `animation_speed: "slow"` → 250/400/550ms durations, the
  kit's two easing curves verbatim, entrances are upward drift + gentle scale
  (never bouncy), the card hover is exactly the declared
  `translateY(-2px)` + rose border + rose glow, and `.btn:active` is the declared
  `scale(0.97)` "like pressing a petal". No looping animation without a pause
  state — the toggle *is* the pause state.
- **`signature_elements` are structural, not stuck-on.** Botanical rule lines
  between sections, the pressed-flower sprig, bee and leaf accents, the trug and
  seed packet on 404, the jam-jar-adjacent "bookshelf" container metaphor, and the
  guidepost "sign on a post" for each pitch bullet.
- **Voice is the strongest thing on the site and it holds across all ten pages.**
  "the little building at the end of the lane" (hub), "one room off the hall"
  (docs), "graft something of their own" (plugins), "the evening's programme,
  gathered before you sit down" (livetv), "it reads the room and pours the right
  measure" (transcode). Warm, unhurried, botanical, nurturing — the four `voice`
  descriptors. Zero `avoid_words` across the whole site (I grepped all twelve);
  "dark" appears nowhere; exclamation marks appear once, in an easter-egg reward.
- **`brand_opposites` respected** on the four that matter: not dark, not clinical,
  not neon, not angular. Nothing is cold-toned; `colors.info` (Cornflower, the
  one cold hue) is correctly left unused.
- **The contrast remediation stayed inside the palette.** All six derived tokens
  are mixes of the kit's own pigments with the kit's own Bark Brown — verified
  arithmetically — so there is not one genuinely off-palette hue. The single
  extra hex, `#7f3742` (`components.css:268`), is Garden Rose ⊕ 45% Bark, i.e.
  the same family.
- The logo keeps the Playfair-italic wordmark with a climbing-rose sprig and
  never appears without its botanical companion; no forbidden symbol (no
  play-triangle, gears, bolts or cold geometry) appears anywhere.

## ⚠️ Concerns (non-blocking)

- **Pure Garden Rose is now used on ~nine non-CTA elements while the primary CTA
  is the one element that *isn't* Garden Rose.** This inverts two explicit kit
  rules: `color_rules` — "Garden Rose is reserved for the single most important
  CTA per screen" — and `do_dont.colors.dont` — "Use Garden Rose for secondary or
  tertiary UI elements". `var(--color-primary)` currently paints:
  `components.css:371` (`.plate` border, ×2 on home), `components.css:511`
  (`.guidepost-sign` 3px left edge, ×7 on home), `components.css:177` and `:189`
  (nav active underline + petal dot), `components.css:796` (`.book` spine),
  `components.css:937` (`.footer-tagline` text), `components.css:1153`
  (`.mascot-bubble` left edge), `components.css:1257` (`.reward-note` border),
  `theme.css:451` (`.garden-sign` border), `theme.css:512` (`.seed-box` border +
  rose glow), `theme.css:49` (`.script`), `theme.css:58` (`.numeral`) — while
  `.btn-primary` is `--color-rose-ink` (`components.css:262`).

  Moving the button off pure rose was the right accessibility call. The correct
  consequence, though, was to *thin out* the decorative rose so the darker CTA
  still reads as the loudest thing on the page — not to multiply it. On the home
  page the two rose-bordered plates plus the rose-glowing seed box genuinely
  compete with the CTA ladder for first fixation (see
  `reviews/cottagecore-bloom/shots/index-desktop.png`). Suggest demoting the
  plate / garden-sign / guidepost edges to `--color-border` or
  `--color-sage-ink` and keeping pure rose for the nav active state, the focus
  ring and display type only.
- **Three botanical accent colours appear together in one view in the hero
  diorama**, which the kit forbids twice: `do_dont.colors.dont` — "Scatter all
  three botanical accent colors together in a single view" — and
  `ui_generation_rules` — "At most two botanical accent colors per screen —
  rose + sage, or lavender + sage". The diorama paints all three deliberately:
  `index.html:353-355` (rose + lavender + sage ellipses in `plane-sky`),
  `:384-395` (`#C8556A` rose circles, `#8B7AB5` lavender circles and `#7A9E6B`
  foliage in `plane-gate`), `:410-421` (all three again in `plane-flowers`). Same
  on `404.html:353-357` and in the `seasons.html:400-409` swatch row. Primrose's
  own mixed flower crown is exempt — the kit describes her that way — but the
  diorama is a design decision, not mascot detail. Drop the lavender from
  `plane-gate` / `plane-flowers` and keep it for the mascot and the badge/chip
  layer.
- **The hero reads sparse, in the one kit that says "always abundant".** The kit
  says it four times: `composition` — "Abundant and overflowing, never sparse";
  `brand_opposites` — "Not sparse or empty — always abundant";
  `do_dont.imagery.dont` — "Show stark empty spaces — the aesthetic is always
  abundant"; `page_generation_rules` — "Hero sections feature a lush botanical
  watercolour illustration". Measured, the art occupies only the bottom strip of
  the hero at every viewport: **81 % of the hero carries no illustration at
  375px**, 60 % at 768px, 37 % at 1280px (see `experience-fidelity.md` for the
  table and the cause in `theme.css:168-182`). At 768px the entire right half of
  the hero is bare ivory (`scratchpad/vp-t768.png`). This is the site's signature
  moment and it is the least abundant thing on it.
- **`css/base.css:222-224` — `strong { font-weight: 500 }` is a soft-brand choice
  that lands on the wrong side of usable.** In a warm, low-contrast, hand-made
  brand a light touch is defensible, and the kit *does* cap Lora at
  `weight: [400, 500]`, so 700 would be an undeclared body weight. But 400 → 500
  in a serif at 17px is roughly one stem-pixel and reads as no emphasis at all.
  Add a second, on-brand channel — `color: var(--color-rose-ink)` — rather than a
  heavier face. Also worth noting the practical scope: `<strong>` appears exactly
  once on the whole site (`seasons.html:479`).
- **`seasons.html:374, 378, 381, 430, 438, 460, 463, 467` invent five colour
  names and present them in the same `#HEX Name` format as the three that are
  genuinely the kit's.** Garden Rose / Sage Green / Lavender Mist (`:400, 403,
  407`) are real; "Blossom rose", "Young leaf", "Early lilac", "Rosehip amber",
  "Harvest cream", "Berry rose", "Pine sage" and "Dried lavender" are not —
  `seasonal_variants[*]` name no colours. "Early lilac" and "Dried lavender" have
  no basis even in the variants' `motif` prose. Either drop the names or label the
  row honestly as the theme's own working names.

## ❌ Failures (must fix this round)

_None in this dimension._

## Recommendations (ranked by impact)

1. Give the diorama planes a min-height / side motif so the hero is abundant at every viewport (impact: high, effort: medium).
2. Thin the pure-Garden-Rose decoration back to the nav active state, focus ring and display type (impact: high, effort: low).
3. Remove lavender from the two flower planes so no view carries three botanical accents (impact: medium, effort: low).
4. Add a colour channel to `strong`; drop or relabel the invented swatch names (impact: low, effort: low).

## Evidence

- `brand-kits/cottagecore-bloom.js` §6 `color_rules`, §22 `do_dont.colors`,
  §5 `composition`, §16 `ui_generation_rules` / `page_generation_rules`.
- `reviews/cottagecore-bloom/shots/index-desktop.png`,
  `index-320x640.png`, `seasons-desktop.png`.
- `scratchpad/vp-t768.png`, `scratchpad/hero-m375.png`.
- `grep -inoE "<the 12 avoid_words>" sites/cottagecore-bloom/*.html` → no matches.
- Structural diff: `grep -oP 'id="\K[a-z-]+'` over the `<section>` tags of the
  five regenerated `index.html` files.
