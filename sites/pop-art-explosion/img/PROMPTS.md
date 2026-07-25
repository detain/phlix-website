# img/PROMPTS.md — Pop Art Explosion

Every image asset in this kit, with the prompt that regenerates it. All prompts are
built from the kit's own `image_prompt_prefix` + subject + `image_prompt_suffix`,
with `negative_prompt` applied.

**Prefix** (verbatim from `brand-kits/pop-art-explosion.js`):

> Pop art in the style of Roy Lichtenstein and Andy Warhol, bold flat primary
> colors (red #FF1A1A, yellow #FFE600, blue #0028DC), stark white background, thick
> 4px black ink outlines, Ben-Day halftone dot shading, no gradients, no shadows,

**Suffix:**

> , comic-book panel composition, flat vector rendering, high contrast, 1960s pop
> art gallery aesthetic, no photorealism, no pastel colors.

**Negative:** gradients, blur, drop shadows, pastel, muted tones, watercolor,
photorealistic, dark moody, minimalist, glassmorphism, skeuomorphic textures, thin
fonts, serif body text, cool grey.

Almost nothing here is model-generated: `art_direction` calls for clean vector with
the halftone dot grid as the only texture, and `do_dont.performance` asks for SVG
and CSS rather than raster. So the site's artwork is **hand-authored SVG**, and the
prompts below are the regeneration brief for each piece rather than a record of a
model run.

---

## `logo.svg` — the wordmark lockup

Hand-authored vector, carried forward unchanged from the previous build.

```
{prefix} the word PHLIX in Bangers bold white type inside a solid red rectangle,
3px black border, 4px/4px black offset shadow, yellow Ben-Day dot overlay across
the red plate {suffix}
```

Spec: `logo_rules.shape` — "Bangers wordmark 'PHLIX' in stark white inside a solid
red rectangle, 3px black border all around, 4px/4px black offset shadow." Forbidden
per `logo_rules.forbidden_symbols`: gradients anywhere near it, a lone play
triangle, a film reel, gears.

## `favicon.svg` (+ `favicon-16x16.png`, `favicon-32x32.png`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png`)

```
{prefix} a solid red square with a 2px black border and a single bold white
letter P centred in a heavy condensed face, 32x32 {suffix}
```

The wordmark plate reduced to one letter. Carried forward.

## `og.svg` → `og.png` (1200×630)

Rasterise with `node tools/gen-og.mjs --site pop-art-explosion` — never reference
the SVG in `og:image` (§19.5).

```
{prefix} a social share card: full-bleed Kapow Red ground under a white Ben-Day
dot field, a Zap Yellow band across the top and bottom, the PHLIX wordmark on its
red plate at upper left, a giant starburst at lower right containing the word POW!,
and the headline "WHAM! YOUR MEDIA, AMPLIFIED." in outlined Bangers {suffix}
```

Copy on the card is traceable: the headline is `copy_overlay.hero.headline`, the
descriptor is `content.json` `hero.eyebrow`, and the bottom line is
`copy_overlay.footer_tagline`. **Known limitation:** `rsvg-convert` does not resolve
the self-hosted WOFF2 pool from inside the SVG, so the lettering rasterises in a
fallback condensed face. Fixing that means teaching `tools/gen-og.mjs` to register
the pool fonts — a shared change, so it is noted rather than done.

## `seasonal/summer-sunglasses.svg`

`seasonal_variants[0]` "Summer of Love" motif: _"Dotty wears oversized
sunglasses."_ Applied as a background layer behind the hero stage when
`data-season="summer-of-love"`.

```
{prefix} oversized 1960s sunglasses, two rounded square lenses in Campbell's soup
orange joined by a straight bridge, 5px black ink outline, two white Ben-Day
highlight dots in each lens {suffix}
```

## `seasonal/winter-snowflake-pattern.svg`

`seasonal_variants[1]` "Factory Winter" motif: _"snowflake Ben-Day dot pattern
replaces generic dots."_ A 24px tile, repeated by `background-repeat`.

```
{prefix} a single six-armed snowflake struck in Pow Blue at halftone opacity on
white, drawn as a repeating tile, evenly spaced, no other elements {suffix}
```

## `seasonal/winter-foil-stripe.svg`

`seasonal_variants[1]` motif: _"silver foil accent stripe at page top."_ A 40×10
tile repeated along the x-axis at the very top of the document.

```
{prefix} the Factory's crumpled aluminium foil rendered flat as alternating
chevrons in black and Pow Blue at low opacity over Panel White, no gradient
{suffix}
```

Note the deliberate constraint: the kit forbids gradients, so "foil" is expressed as
flat alternating chevrons rather than a metallic ramp.

---

## Inline SVG (no files on disk)

These are authored directly in the HTML so they can inherit the page's fonts and
respond to the seasonal token gate — every fill is `var(--color-primary)`,
`var(--color-secondary)` or `var(--color-tertiary)`, never a literal hex, so the
whole cast recolours when a seasonal variant is live.

| Piece                        | Where                                                  | Brief                                                                                                                                                                                                                                |
| ---------------------------- | ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Dotty**, 5 sizes           | hero stage, mascot, proof bubble, about, 404, egg card | `{prefix} an anthropomorphic Ben-Day dot: a perfect circle face filled with red halftone dots on yellow, oversized speech-bubble earrings, huge Lichtenstein eyes with white highlight reflections, an open shouting mouth {suffix}` |
| **KAPOW / ZAP / POW bursts** | the hero's playable vignette                           | `{prefix} a jagged 20-point explosion starburst with the word KAPOW! lettered inside in Bangers, 6px black ink outline {suffix}`                                                                                                     |
| **8 feature icons**          | home Warhol tiles, features panels                     | `Pop art icon of {library / sync / transcode / shield / antenna / broadcast / puzzle / hub}: flat vector, single primary color fill, 3px black outline, no gradients, 1960s instruction-manual style`                                |
| **2 comic dioramas**         | `#dotty-scene` vignettes                               | Per `persona_vignettes[0].surfaces` and `[1].surfaces`: a Ben-Day-dotted poster grid with a SyncPlay indicator bar; three devices in three time zones locked to one SyncPlay status bar                                              |
| **5 device silhouettes**     | clients lineup + spec sheet, download client grid      | `{prefix} a duotone silhouette of a {streaming box / smart TV / desktop monitor / phone / generic media device}, one primary fill plus white, 4px black ink outline, cropped flat {suffix}` — `photo_rules`: two colours per image   |
| **5 reel canisters**         | The Full Toolkit shelf (download, docs, plugins)       | `{prefix} a film reel canister seen face-on, flat primary fill, four black spindle dots and a white hub, 4px black outline {suffix}`                                                                                                 |
| **Ben-Day dot fields**       | every panel, as CSS `background-image`                 | `{prefix} a repeating Ben-Day dot grid on white in {ink / white / yellow / red / blue}, evenly spaced circles like a Roy Lichtenstein canvas, no other elements {suffix}` — shipped as data-URI SVG in `css/base.css`                |

No photography is used anywhere. `photo_rules` requires every photo to be halftone-
or duotone-treated, and there is no real product photography to treat, so the site
depicts the product surfaces as comic dioramas instead.
