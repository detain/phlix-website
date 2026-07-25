# img/PROMPTS.md — Swiss Modernist

Regeneration prompts for every image asset in this site. Each prompt is built from the kit's
`image_prompt_prefix` + subject + `image_prompt_suffix`, with `negative_prompt` applied.

Everything currently shipped is **hand-authored SVG or CSS**, not a raster render — which is
what `new_site.md` §8 prefers, and what the kit demands: `art_direction` replaces
illustration with typographic composition, and there are no photographs of people in brand
contexts. These prompts exist so any asset can be reproduced or varied later.

## Shared fragments

**Prefix** (`image_prompt_prefix`)

> Swiss International Typographic Style illustration, flat graphic, grid-based composition,
> Helvetica-era modernism, off-white background, black structural elements, single Basel Red
> accent (#E8001C), geometric precision,

**Suffix** (`image_prompt_suffix`)

> , flat vector, no gradients, no textures, no shadows, no rounded shapes, mathematical
> proportion, high contrast, white space as structure, professional.

**Negative** (`negative_prompt`)

> warm, cozy, playful, rounded, soft, colorful, gradient, texture, shadow, glow, neon, dark
> background, decorative, illustration with character, mascot, friendly, cute, fun, organic
> shapes, handwritten, sketch, brushstroke

---

## `logo.svg` — wordmark (shipped as SVG; carried forward unchanged)

> Design a Swiss Modernist logo: Inter Black wordmark "Phlix" in Ink Black (#121212) on Grid
> White (#F8F8F4), 0px radius, no symbols, no enclosure, with a 4px Basel Red (#E8001C) rule
> beneath the wordmark in full lockup only.

Constraints from `logo_rules`: wordmark only; no symbol paired with the type; no play-button
triangle; no rounded badge; no colour outside black / white / red; generous negative space.

## `favicon.svg` — square mark (shipped as SVG; carried forward unchanged)

> A 32×32 Swiss Modernist favicon: solid Basel Red (#E8001C) square, sharp corners, a single
> Inter Black capital "P" centred in Grid White (#F8F8F4), tight negative tracking, no
> gradient, no border radius.

## `og.svg` → `og.png` — 1200×630 social card

> {prefix} a Swiss International Style poster for a self-hostable media server: the twelve
> column guides of the grid drawn as 1px Module Gray (#E5E5E0) lines, an oversized Inter Black
> "Phlix" wordmark at the left column edge, a single 8px Basel Red rule beneath it, the
> section numeral "01" at poster scale in Rule Gray (#888888) at the right column edge, and a
> full-width Ink Black readout bar along the bottom holding a monospace technical line
> {suffix}

Rasterise with `node tools/gen-og.mjs --site swiss-modernist` (requires `librsvg2-bin`).
The bottom bar states facts only: `PHP 8.3+ · WORKERMAN 5.X · SERVER + HUB MPL-2.0 · CLIENTS MIT`.

## Feature icons (eight, inline SVG in the pages)

> Sharp outlined minimal icon of {subject}, 1.5px stroke, Ink Black (#121212), mitered joins,
> butt caps, 0px radius, no fill, aligned to a 24px grid, Swiss Modernist aesthetic.

| id          | subject                                           |
| ----------- | ------------------------------------------------- |
| `library`   | a four-module square grid                         |
| `syncplay`  | a circle with two hands set to a shared time      |
| `transcode` | two opposed horizontal arrows                     |
| `shield`    | a shield outline containing a check               |
| `antenna`   | a broadcast antenna as two diagonals and a mast   |
| `broadcast` | a screen rectangle with a stand                   |
| `puzzle`    | three squares of a four-square module, one absent |
| `hub`       | a central square with four orthogonal spokes      |

`icon_rules`: outlines only, never filled in primary usage; Basel Red reserved for a single
active state per view; no rounded or playful icon library.

---

## Product-surface renders (not shipped; specified for later use)

These are seeded from `persona_vignettes` — each vignette names the surfaces to depict and
the features to show, so any future screenshot or mock-up has a brief rather than a guess.

### The systems architect

Audits every dependency, permission and data flow; the PHP core and the explicit contract are
the appeal. Surfaces: **library grid, auth settings, plugin interface.** Features shown:
`library`, `auth`, `plugins`.

> {prefix} a media-server library grid on Grid White with 1px Ink Black card borders, poster
> modules aligned to a 12-column grid, an Inter Black title below each poster, monospace
> metadata in Rule Gray, and one Basel Red play triangle on the focused card {suffix}

### The academic researcher

Runs Phlix over a department collection; grid structure and rational metadata handling matter
more than flash. Surfaces: **library grid, media detail, docs.** Features shown: `library`,
`transcode`.

> {prefix} a media detail view: full-bleed key art at the top separated from the content by a
> 2px Basel Red rule, an Inter Black title, a 2px Ink Black rule, metadata set in Inter 400,
> and an episode rail below, all on Grid White {suffix}

### The methodical collector

Thousands of films ordered by year, resolution and source; file-based scanning, multi-profile
setup and quality profiles match their precision. Surfaces: **profile switcher, library
filters, transcode profiles.** Features shown: `library`, `auth`, `transcode`.

> {prefix} a settings panel: a left sidebar whose active item carries a 4px Basel Red left
> border, a Column White content panel at 900px measure, a striped Module Gray data table of
> transcoding quality profiles, and Barlow Condensed Black numerals for the bitrate column
> {suffix}
