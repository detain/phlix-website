# Stardust Observatory — site design rationale

Brand kit: `brand-kits/stardust-observatory.js` v1.0 (base kit, Sage archetype).
Experience archetype: **narrative-scroll** (declared in `experience_archetype`).
Regenerated 2026-07-24 against `new_site.md` §2A; the change manifest is
`REGEN_PLAN.md`.

## 1. Concept

A candlelit Victorian observatory. The visitor arrives at a closed dome; it parts
as they scroll, and from there the page reads like a descent through an atlas:
five beats, each closed by a ruled page-turn, each plate numbered. The product
argument is unchanged — self-hosted media that stays yours — but the voice is the
patient astronomer's, and the structure is the atlas's rather than the landing
page's.

Structural consequences (this is where the kit is doing real work, not colour):

- **Nav is renamed and shortened** to six items in the kit's order: The
  Observatory · Instruments · Viewing Rooms · Chart Your Course · Distant
  Observatories · Our Story. Plugins and Docs are demoted to a footer shelf, and
  Plugins is also folded into `features.html#advanced-apertures`.
- **The home page leads with instruments, then the argument** — the kit's
  `homepage_narrative` puts `feature_casting` at beat 2 and the value props at
  beat 3, which is the reverse of the generic template.
- **Only five of eight features appear on the home page**; `feature_casting`
  casts two as hero plates with their own voiced angles, three as support, and
  pushes Live TV, DLNA and Plugins to the Features page.
- **Download is an expedition guide** in three numbered stages, not a list of
  buttons; **Clients are viewing rooms**; **About is a study** of three rooms
  ending in Meridian's letters.

## 2. Colour — role → name → hex

| Role           | Name                            | Hex                   | Used for                                     |
| -------------- | ------------------------------- | --------------------- | -------------------------------------------- |
| background     | Midnight Navy                   | `#0D1B2A`             | every page ground                            |
| surface        | Observatory Indigo              | `#162338`             | plates, rooms, letters, footer               |
| surface_alt    | Deep Meridian                   | `#1E2E45`             | placard, Meridian's bubble, aperture rings   |
| text           | Dome Parchment                  | `#EDE4CC`             | all body and headline text                   |
| primary        | Constellation Gold              | `#C9A84C`             | one CTA per beat, active nav, plate captions |
| secondary      | Telescope Brass                 | `#B07D3A`             | interactive borders, dome ribs, spine edge   |
| tertiary       | Nebula Violet                   | `#7B5EA7`             | the single atmospheric glow behind the hero  |
| neutral        | Stardust Silver                 | `#A8B4C0`             | kickers, captions, the footer whisper        |
| border         | Brass Filigree                  | `#7A5C2A`             | ruled margins, double rules, dividers        |
| focus          | Star-Point Focus                | `#E8D48B`             | 3px focus ring, sparkles, primary hover      |
| success / info | Meridian Green / Refractor Blue | `#5B9E78` / `#3A7BD5` | status badge borders                         |

### Measured contrast (§19.1 — the kit's own arithmetic was not trusted)

Every ratio below is computed, not quoted:

| Pair                               | Measured   | Verdict                                                      |
| ---------------------------------- | ---------- | ------------------------------------------------------------ |
| Parchment `#EDE4CC` on navy        | 13.72:1    | AAA                                                          |
| Parchment on indigo `#162338`      | 12.44:1    | AAA                                                          |
| Gold `#C9A84C` on navy             | **7.61:1** | AA at any size — the kit claimed ~4.8:1 and _understated_ it |
| Gold on indigo                     | 6.90:1     | AA any size                                                  |
| Silver `#A8B4C0` on indigo         | 7.48:1     | AA any size                                                  |
| Navy on gold (primary button)      | 7.61:1     | AA any size                                                  |
| Focus `#E8D48B` on navy            | 11.78:1    | the ring is unmissable                                       |
| Violet `#7B5EA7` on indigo         | 3.00:1     | **fails** — glow and border only                             |
| Brass `#B07D3A` on indigo          | 4.39:1     | **fails small text** — borders only (4.84:1 on navy, ≥3:1)   |
| Refractor Blue `#3A7BD5` on indigo | 3.74:1     | **fails** — border only                                      |

Derived small-text tokens, all **mixes of the kit's own pigments** (no new hues),
declared in `css/base.css`:

| Token                        | Mix                                      | Value     | On indigo                                              |
| ---------------------------- | ---------------------------------------- | --------- | ------------------------------------------------------ |
| `--color-violet-text`        | 35% Nebula Violet → Dome Parchment       | `#A38DB4` | 5.28:1                                                 |
| `--color-brass-text`         | 35% Telescope Brass → Constellation Gold | `#B98C40` | 5.17:1                                                 |
| `--color-info-text`          | 35% Refractor Blue → Dome Parchment      | `#79A0D2` | 5.84:1                                                 |
| `--color-success-text`       | 35% Meridian Green → Dome Parchment      | `#8EB795` | 7.03:1                                                 |
| `--color-border-interactive` | Telescope Brass, unmixed                 | `#B07D3A` | 4.84:1 on navy — only where a border is a control edge |

Status badges carry **no tinted fill**, so the label's measured ratio against the
card surface is the real one.

## 3. Typography

| Role     | Family (self-hosted WOFF2) | Weights       | Where                                                                                 |
| -------- | -------------------------- | ------------- | ------------------------------------------------------------------------------------- |
| headline | Playfair Display           | 700, 900      | h1–h3, plate titles, stage and ladder numerals                                        |
| display  | IM Fell English            | 400           | loglines, plate captions, letter sign-offs, footer whisper — never < 20px, never body |
| body     | Lora                       | 400, 500, 600 | every paragraph and list item                                                         |
| ui       | Jost                       | 300–600       | nav, buttons, kickers, badges, toggle (0.05–0.16em tracking)                          |
| mono     | DM Mono                    | 400, 500      | install commands, plate numbers, path coordinates                                     |

All 13 `@font-face` rules point at `../../assets/fonts/…` in the shared pool; zero
external font requests. Playfair Display doubles as the kit's `number` role.

## 4. Spatial system

The kit's spacing scale only (4/8/12/16/24/32/48/64/96 px), max content width
1360 px, body measure 62–68ch. Radii: 4px controls, 8px plates, 16px on the top
corners of a viewing room (where the dome arc sits). Borders are 1px Brass
Filigree; the kit's double rule (1px + 1px, 3px apart) marks the page-turn
boundaries and the placard's inner margin. Every grid uses
`minmax(min(Npx, 100%), 1fr)` so nothing can force a horizontal scrollbar at
320px.

## 5. Motion

Slow and celestial: 1200ms dome parting, 9s star breath, 6s armillary ring
rotation, 500ms page-turn wipe, `cubic-bezier(0.25, 0.1, 0.25, 1)`. Three ways to
stop it: `prefers-reduced-motion`, the visitor-facing **Steady Gaze** toggle in the
footer utility row (persisted in localStorage), or disabling JavaScript — in which
case the dome is simply already open and every word is still there. Reveals move
position only, never opacity, so no content is ever invisible mid-document.

## 6. Interaction surfaces

- **Hero (`guided-reveal`)** — inline SVG dome; the halves part on intersection.
  The static markup carries the headline, subheadline and both CTAs, which is the
  kit's declared `fallback`.
- **Meridian (`mascot.behavior`)** — a brass armillary sphere on Home, Features
  and Download only. Bottom-right on desktop; bottom-left on phones, where it
  waits for the first scroll so it can never sit on the fold's buttons. Five
  context tips bound to the kit's own selectors, two easter interactions (click ×5
  nova, 2s hover-hold), dismissal persisted in localStorage.
- **Easter eggs** — logo ×5 aligns the dome (sparkles + reward line, Esc clears,
  auto-fades after 5s); typing `aperture` lights the word wherever it appears (the
  listener stands down inside any field, never calls `preventDefault`, Esc exits);
  scrolling past the footer reveals a whisper.
- **Seasonal (`live-js`)** — a date-gate flips the variant's token overrides, swaps
  in the motif SVG and un-hides the banner during an `active_range`. Out of range,
  nothing renders.

## 7. Visual assets

`img/logo.svg` (dome arc + meridian ring + six-point star + wordmark),
`img/favicon.svg`, `img/og.svg` → `img/og.png` (1200×630, rasterised by
`tools/gen-og.mjs`), three `img/seasonal/*.svg` motifs, and two hand-drawn inline
SVGs: the opening dome (home) and the misaligned telescope (404). All eight feature
icons are inline stroke SVGs inside a circular aperture frame. Prompts for
regenerating everything are in `img/PROMPTS.md`.

## 8. Facts

Every claim traces to `shared/content.json`. The licence is stated as
`content.json` states it — Server and Hub MPL-2.0; shared libraries, plugins and
clients MIT — in the footer, the About study and the FAQ. No star counts,
contributor counts or download totals appear anywhere; the proof band links to
`/stargazers` and `/issues` instead.
