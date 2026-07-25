# SITE.md — Pop Art Explosion

## Concept & vision

Roy Lichtenstein walks into Andy Warhol's Factory and they argue about a media
server. Ben-Day dots screaming on stark white, flat primary blocks, thick black
ink outlines around every single shape, and speech bubbles cutting into the
composition wherever they feel like it. The product underneath is unchanged — the
self-hostable PHP media server, PHP 8.3+ on Workerman — but here it is hung on a
gallery wall and shouted about.

Voice: loud, ironic, punchy, exclamatory. Short sentences. Sometimes one word.

## Aesthetic direction — the PANEL SEQUENCE

**Declared archetype: `immersive`** (`experience_archetype`). No `immersive` kit had
been regenerated before this one, so this site defines the pattern; the reading of
the archetype is spelled out in `REGEN_PLAN.md` §0. In short, `immersive` here means
an **edge-to-edge staged environment**, not a long parallax scroll:

1. **Full-bleed panels.** Every section spans the viewport and owns a flat ground.
   The gutter between them is a literal 4px black rule — the panel's own
   `border-top` — so panels butt straight up against each other with no
   whitespace, exactly like a comic page.
2. **An orientation stamp.** Because full-bleed layout removes the usual page
   landmarks, each panel is labelled `01 — PANEL 01 OF FIVE` in Anton, and the
   topbar carries a red progress rail drawn on its own bottom border.
3. **Arrival, not appearance.** Each panel turns in with a hard left→right
   `clip-path` wipe at 120ms on `cubic-bezier(0.34, 1.56, 0.64, 1)`, plus a
   Ben-Day "dust cloud" that flashes across (`scroll_experience: panel-sequence`).
4. **A playable set-piece.** The hero is a starburst stage you can set off:
   KAPOW → ZAP → POW stamp in around Dotty and the trio rotates a third of a turn
   on every click (`hero_experience: playable-vignette`).
5. **Interior pages are acts.** Each one opens on its own full-bleed ground —
   features blue, clients yellow, download red, plugins cream, docs panel-white,
   hub blue, about yellow, 404 newsprint black — so the immersion survives a click
   on the nav.

## Colour — measured, not claimed

The kit's `accessibility.minimum_contrast` prose is unverified (new_site.md §19.1).
Every pair below was measured; the two **derived inks** are deeper mixes of the
kit's own pigments, taken verbatim from `tools/kit-brief.mjs` so all 50 sites share
one derivation.

| Role                      | Name              | Hex       | Used for                                             |
| ------------------------- | ----------------- | --------- | ---------------------------------------------------- |
| `--color-primary`         | Kapow Red         | `#FF1A1A` | Hero + CTA grounds, buttons, rules, display type     |
| `--color-secondary`       | Zap Yellow        | `#FFE600` | CTA strip, panel stamps, focus ring, badges          |
| `--color-tertiary`        | Pow Blue          | `#0028DC` | Links, informational panels, one Warhol tile         |
| `--color-orange`          | Soup Can Orange   | `#FF6B00` | The proof band only (`proof_strategy.placement`)     |
| `--color-bg`              | Gallery White     | `#FFFFFF` | The canvas                                           |
| `--color-surface`         | Panel White       | `#FAFAFA` | `the-grid` ground                                    |
| `--color-surface-alt`     | Dot Field Yellow  | `#FFFBE0` | Vignette + chapter grounds                           |
| `--color-text`            | Newsprint Black   | `#0A0A0A` | All body text, all 3px outlines, the footer strip    |
| **`--color-primary-ink`** | Kapow Red, deeper | `#E31717` | **Derived.** Red _text_ on white/`#FAFAFA`/`#FFFBE0` |

`kit-brief` also pre-derives an orange ink (`#C25100`), but Soup Can Orange is only
ever a **ground** on this site and never carries small text, so no orange-ink token
is declared — a token nothing references is an inert rule (§19.17).

Measured ratios for every ground → ink pair actually shipped:

| Ground                            | Ink                                   | Ratio       | Verdict                 |
| --------------------------------- | ------------------------------------- | ----------- | ----------------------- |
| `#FFFFFF` / `#FAFAFA` / `#FFFBE0` | `#0A0A0A`                             | 18.97–19.80 | AA small text           |
| `#FFFFFF`                         | `#0028DC` (links)                     | 8.99        | AA small text           |
| `#FF1A1A`                         | `#0A0A0A` (all body copy, all h3/h4)  | 5.10        | AA small text           |
| `#FF1A1A`                         | `#FFFFFF` (h1/h2 + 20px/700 labels)   | 3.88        | AA large text / UI only |
| `#FFE600`                         | `#0A0A0A`                             | 15.62       | AA small text           |
| `#0028DC`                         | `#FFFFFF`                             | 8.99        | AA small text           |
| `#FF6B00`                         | `#0A0A0A`                             | 6.43        | AA small text           |
| `#0A0A0A`                         | `#FFFFFF`                             | 19.80       | AA small text           |
| `#0A0A0A`                         | `#FFE600` (404 marquee, footer links) | 15.62       | AA small text           |

Two structural rules follow from that table, and both are enforced in CSS rather
than left to discipline:

- White on Kapow Red is **large-text-only**. `.panel h2` may take a ground's
  display ink; `.panel h3`/`h4` always take its small-text ink, because an `h3`
  renders at ~22px on a phone where 3.88:1 is not enough. Every button label that
  sits white-on-red is 20px/700, which is "large" under WCAG.
- Any component that paints its own paper ground (`.speech`, `.reel`, `.pennant`,
  `.client-card`, `.code-block`, `.jargon`, `.ladder__rung`, `.chip`, `.badge`,
  `.stage`, `.dotty__panel`, and `.cta-strip`/`.speech--yellow` on the secondary)
  **resets** `--ink`, `--display-ink` and `--link`. Without that it inherits the ink
  of the coloured panel around it — which is exactly how a white `<h3>` ended up on
  a white card inside the blue "Full Toolkit" panel. Link colour in particular is a
  custom property rather than a descendant selector, because
  `[data-ground='blue'] a` cannot know a white card sits in between.

### Seasonal variants — both measured (§19.19)

`seasonal_activation.mode: "live-js"`, so a date gate in `js/main.js` flips tokens
at runtime and both variants really ship.

| Variant            | Window        | Overrides                                                                                      | Contrast consequence                                                                                                                            |
| ------------------ | ------------- | ---------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| **Summer of Love** | 06-21 … 09-21 | secondary → `#FF6B00`                                                                          | Every secondary surface carries black ink, so 15.62:1 → **6.43:1**. Still AA for small text. White never lands on the secondary.                |
| **Factory Winter** | 12-01 … 01-06 | primary → `#0028DC`, plus `--ink-on-primary` → `#FFFFFF` and `--color-primary-ink` → `#0028DC` | Black on Pow Blue would be **2.05:1**, so the gate re-points the ink tokens: white on blue is 8.99:1, better than the white-on-red it replaces. |

`--color-focus` (`#FFE600`) is never overridden by either variant, so the ring is
Zap Yellow all year. **On its own that guarantees nothing**: the ring is drawn on
whatever ground the focused control happens to sit on, and yellow-on-yellow — the
hero's `.cta-strip .btn--primary` — is literally 1:1, while yellow on the red nav
CTAs is 1.27:1. What makes the ring visible is the **black backing ring** the kit
asks for (`accessibility.focus_style`: "3px solid yellow with 2px black offset"),
drawn as `box-shadow: 0 0 0 5px #0A0A0A`; yellow against that backing is 15.62:1,
and the backing against every ground this site paints is ≥ 5.10:1. Round 1 found
the backing being silently replaced: `:focus-visible` in `base.css` is only
`(0,1,0)` specific, so each component's own hard offset shadow — `.btn`,
`.nav-link--primary`, `.nav-link[aria-current]`, `.nav-toggle`, `.stage`,
`.dotty__figure`, `.toggle`, `.skip-link` — overrode it and the ring vanished.
§14.1 of `components.css` now restores both shadows in one list for every such
control (and again at ≥100rem, where the TV pass widens the ring to 6px/9px).
Any new component that declares `box-shadow` must be added there.

All brand artwork (Dotty, the bursts, the dioramas, the
device silhouettes, the reels) is drawn with `fill="var(--color-…)"`, so the
seasonal palette stays coherent instead of half-swapping — which also keeps the
kit's "never more than three primaries in one view" rule true in every season.

## Typography

Only the weights the kit declares, all self-hosted WOFF2 from the shared pool:

| Role     | Family           | Weight   | Used for                                          |
| -------- | ---------------- | -------- | ------------------------------------------------- |
| headline | Bangers          | 400      | h1–h4, onomatopoeia, panel frames, FAQ questions  |
| display  | Anton            | 400      | shares the number role below                      |
| body     | Barlow Condensed | 400, 600 | All prose; 600 is `<strong>` and the `.lede`      |
| ui       | Barlow           | 600, 700 | Buttons, nav, chips, badges, spec labels, toggles |
| mono     | Share Tech Mono  | 400      | The install one-liner and inline identifiers      |
| number   | Anton            | 400      | Panel numerals, chapter numerals, ladder steps    |

`<strong>` is **600** against 400 body copy — a 200-unit step, the widest this kit
permits (Barlow Condensed is declared `[400, 600]`; the pool's 700/800/900 files
exist but are not declared, and existence is not permission, §19.17). No colour
change accompanies it. `<em>` does not slant: comic lettering boxes a word, so it
gets a highlight bar in the secondary colour.

`-webkit-text-stroke: 2px #0A0A0A` gives the outlined lettering the kit asks for on
red and yellow headlines. It has no unprefixed equivalent — never run
`stylelint --fix` on this directory (§19.4).

## Spatial system

The kit's own scale, nothing between the steps: 4 / 8 / 12 / 16 / 24 / 32 / 48 /
64 / 96px. Radii 0 / 4 / 8 / 16 / pill, never above 8px on a panel container.
Content width caps at 1280px. Shadows are **hard offsets** — `2px 2px 0`,
`4px 4px 0`, `6px 6px 0`, solid black, zero blur, zero spread. Every grid track is
`minmax(0, 1fr)` and body-weight text wraps with `overflow-wrap: anywhere`
(§19.12), which is why nothing overflows at 320px or at 200% text zoom.

## Motion philosophy

Punchy, staccato, comic-book. Nothing eases in slowly: the panel wipe is 120ms, a
button press is an 80ms squash to 0.95, the burst stamp is 180ms with a
`steps(4, end)` dust trail. Two independent switches turn it all off — the OS
`prefers-reduced-motion` setting (watched with a `change` listener, not read once)
and the kit's own **"Dim the lights"** toggle in the footer. Under either, the
wipes become instant cuts, the starburst stands still, Dotty stops bobbing — and
**nothing disappears**: every easter egg, tip and reward still arrives, just
without animation (§19.20).

Two things the round-1 review corrected here, because "motion off" is easy to get
half-right. First, the orbit and the three bursts move by `transition`, not by
`animation`, so suppressing `animation` alone left a 220ms 120° sweep running after
"Dim the lights" — `prefers-reduced-motion` only escaped it because `base.css` §6
zeroes `transition-duration` globally. `.motion-off .stage__orbit/.stage__burst`
now set `transition: none`, so a click on the stage still re-arranges the trio (the
response is kept) but as an instant cut. Second, the footer readout beside the
toggle was computed from `prefers-reduced-motion` alone and never repainted, so it
still said "Motion: full-blast" after you pressed the button; it now reports
`dimmed || mqReduce.matches` and repaints on every press. Likewise the hover shift
— `transform: translate(4px, 4px)` on buttons and cards — is now genuinely
**suppressed** under both switches rather than merely accelerated to 1ms, which is
what `accessibility.motion_reduction` ("offset-shadow hover suppressed") asks for.

## Visual assets

| File                                        | What it is                                                                                                                                                    |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `img/logo.svg`                              | Bangers PHLIX wordmark, white on a Kapow Red plate, 3px ink border, 4px offset                                                                                |
| `img/favicon.svg` + 5 rasters               | The red plate reduced to a single letter                                                                                                                      |
| `img/og.svg` → `img/og.png`                 | 1200×630 share card: red ground, dot field, one yellow starburst, the overlay headline                                                                        |
| `img/seasonal/summer-sunglasses.svg`        | `seasonal_variants[0]` motif — Dotty's oversized shades                                                                                                       |
| `img/seasonal/winter-snowflake-pattern.svg` | `seasonal_variants[1]` motif — the snowflake dot field                                                                                                        |
| `img/seasonal/winter-foil-stripe.svg`       | `seasonal_variants[1]` motif — the Factory's foil stripe at the page top                                                                                      |
| Inline SVG (no files)                       | Dotty in five sizes, the three onomatopoeia bursts, 8 feature icons, 5 duotone device silhouettes, 5 reel canisters, 2 comic dioramas, the Ben-Day dot fields |

Everything textural is SVG or CSS. No raster artwork ships beyond the icon set and
`og.png` (`do_dont.performance`).
