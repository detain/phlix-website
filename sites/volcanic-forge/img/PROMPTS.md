# img/PROMPTS.md — Volcanic Forge Asset Generation Prompts

All prompts follow the kit's `illustration_prompt_template`:
> "{image_prompt_prefix} {subject}, in the Volcanic Forge style, {mood}, set against a volcanic or forge backdrop, dramatic orange-amber glow, heavy obsidian shadow {suffix}"

Prefix: `Dark volcanic landscape, dramatic chiaroscuro, molten orange lava glow from within obsidian rock, ember-gold ambient light, painterly concept art style, high contrast, heavy texture, cinematic framing,`

Suffix: `, deep obsidian shadows, warm amber color grade, no blue/cool tones, high detail, cinematic composition, elemental power, Volcanic Forge brand palette.`

Negative: `pastel, soft focus, warm cream, light background, white background, neon blue, acid green, cyberpunk, flat design, cartoonish, cute, gentle lighting, overcast, daylight, studio white, lens flare without heat source, cool gray shadows`

---

## Logo (`img/logo.svg`)

Design a Volcanic Forge logo: Anton bold wordmark in molten orange on obsidian black, with an optional angular forge-medallion badge. No neon. No soft shapes.

- **logo_rules.shape**: Anton wordmark in forge-white or molten orange on obsidian; optionally inside an angular forge-medallion badge.
- **logo_rules.complexity**: Bold and legible at 16px minimum; no thin strokes.
- **logo_rules.negative_space**: At least 16px clearance on all sides of the lockup.
- **logo_rules.colors**: Molten orange on obsidian OR forge-white on basalt-dark. Never lava red for the primary mark.
- **logo_rules.allowed_symbols**: anvil, lava channel, obsidian shard, volcano silhouette, forge flame.

**Generates**: `img/logo.svg`

---

## Favicon (`img/favicon.svg`)

A bold filled square favicon in molten orange (#E8611A) with an angular anvil or lava-channel mark. No soft corners. Legible at 16×16.

**Generates**: `img/favicon.svg`

---

## OG Image (`img/og.svg` / `img/og.png`)

Dark volcanic social share card (1200×630): full-bleed obsidian background, forge-horizon gradient from ember-gold through molten orange to obsidian at the bottom, eruption radial glow from lower-center. Phlix Anton wordmark + tagline_primary "FORGED FOR THE SCREEN." in forge-white. Ember-gold accent rule. Anvil/lava icon mark on the left.

**Generates**: `img/og.svg` → rasterize to `img/og.png` for meta tags.

---

## Feature Icons (inline SVG in HTML)

Bold filled icons of {subject}, angular 2.5px stroke, ash-gray default (#7A7268) with ember-gold (#D4820A) active state, volcanic forge brand, no soft corners.

Subjects:
- `library` — folder / library grid
- `syncplay` — synchronized play circles
- `transcode` — media pipeline cube
- `shield` — security shield
- `antenna` — broadcast antenna / signal waves
- `broadcast` — DLNA signal broadcast
- `puzzle` — plugin puzzle pieces
- `hub` — network hub / relay

**Generates**: 7 inline SVGs in `index.html` and `features.html`

---

## Hero Backdrop

Full-bleed forge-horizon hero: obsidian-to-volcanic-horizon gradient with eruption glow radial, lava crack overlays, cinematic framing. A dramatic eruption column backlit by ember glow. Anvil silhouette in the foreground.

Prompt: `Volcanic eruption at night, obsidian-black volcanic rock foreground, molten lava river cutting through the frame diagonally, eruption plume backlit by ember-gold and orange glow, heavy basalt texture, dramatic cinematic lighting from within, painterly concept art, Volcanic Forge brand`

**Note**: As a static site, this is rendered via CSS gradients (no raster image). For a production render, generate at 2400px wide, WebP, ≤120KB.

---

## Background Texture (`css/`)

Obsidian-black (#0E0C0A) surface with subtle basalt rock grain texture and a faint molten-orange radial glow from lower center, no neon, no cool tones.

Prompt: `Seamless obsidian rock basalt texture, very dark with subtle warm undertones, barely visible crystalline grain, usable as a dark UI background surface, no lava, no fire, no blue tones`

---

## Landing Page Concepts

`Dark volcanic landing page: full-bleed forge-horizon hero, molten-orange CTA button, basalt-dark feature cards, Anton headlines, dramatic ember-gold accents.`

## Dashboard Concepts

`Dark media dashboard on obsidian: big Anton stat numerals in forge-white, ember-gold sparklines, angular basalt-dark cards, single molten-orange hero metric, dense asymmetric grid, volcanic forge brand.`
