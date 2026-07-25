# img/PROMPTS.md — Abstract Canvas

Every image asset on this site, with the exact prompt that regenerates it. Prompts are built as
`image_prompt_prefix + subject + image_prompt_suffix`, with the kit's `negative_prompt` as the
avoid-list, per `brand-kits/abstract-canvas.js` §16.

All artwork currently shipped is **CSS or hand-authored SVG** — no raster art beyond `og.png`,
which is rasterised from `og.svg` with `rsvg-convert -w 1200 -h 630`. The prompts below exist so a
painted replacement can be commissioned later without re-deriving the brief.

**Prefix**

```
Fine art abstract expressionist painting, gestural brushwork, warm gallery light,
oil on linen canvas, cadmium red and ultramarine pigments, carbon black marks,
```

**Suffix**

```
, warm gallery-linen ground (hex #F0EDE4), painterly texture, visible brushstrokes,
fine art quality, museum-print composition, no text overlays.
```

**Negative (applies to every prompt below)**

```
cold, neon, digital, dark background, night, fluorescent, corporate, cartoonish,
vector flat, emoji, cheerful stock photo, bright white clinical, pastel candy,
glowing UI, chrome metal
```

---

## 1. Logo — `img/logo.svg` (shipped as SVG)

From `prompt_library.logo`:

```
Design an Abstract Canvas logo: Cormorant Garamond wordmark in carbon black on
gallery linen (#F0EDE4), optional 1px cadmium-red rectangular border, medium
corners, no cold colors, no harsh edges.
```

Built with allowed symbols only — canvas stretcher frame, colour field rectangle, gestural
brushstroke mark. Forbidden symbols avoided: no play-button triangle, no gear or circuit, no neon
glow, no photorealism. The wordmark is set in Georgia (Cormorant Garamond's declared fallback)
because a webfont cannot load inside an `<img>`.

## 2. Favicon — `img/favicon.svg`

```
{prefix} a single square colour field in carbon black holding one serif letter P in
gallery linen, with one cadmium-red brushstroke dragged along its lower edge and a
small ultramarine colour-field square in the upper right {suffix}
```

## 3. Social card — `img/og.svg` → `img/og.png` (1200x630)

From `prompt_library.marketing`, topic = the site itself:

```
{prefix} a fine-art poster-style social graphic for a self-hosted media server:
Cormorant Garamond wordmark "Phlix" in carbon black, the tagline "Every Frame Is a
Brushstroke." in italic raw umber, two Rothko-like floating rectangles in cadmium red
and ultramarine in the right third, one long gestural mark across the lower field,
generous gallery negative space {suffix}
```

## 4. Hero composition — CSS + inline SVG (`.hero-field`, home page)

```
{prefix} a full-bleed gestural hero composition: two Rothko-like floating rectangles
of saturated cadmium red and ultramarine, a Kline-like calligraphic slash across the
lower field, asymmetric and searching, off-center with generous breathing room,
impasto buildup at the edges {suffix}
```

Shipped as two gradient-filled blocks plus a two-stroke inline SVG so it costs no request and
scales to any viewport.

## 5. Palette, the mascot — inline SVG (`js/main.js` companion, `about.html`, `404.html`)

`mascot.description`, rendered as a small gestural figure:

```
{prefix} a painter's palette whose form is suggested by thick paint strokes rather
than clean outlines, carrying colour-field rounds of cadmium red and ultramarine on
its surface, a sable brush tucked behind it like a quill, tilted as if studying the
viewer the way a painter studies a subject {suffix}
```

Poses drawn from `mascot.poses`: _tilted at an angle, studying the viewer_ (companion) and _flat on
a paint-streaked studio table_ (the 404, where Palette faces an unpainted canvas).

## 6. Feature icons — 8 inline SVGs

From `prompt_library.icon`, one per `content.json` feature. 1.5–2px stroke, carbon black default,
cadmium red for the active state, slightly rounded caps (sable-brush quality), medium corner radius,
never filled by default.

```
Outlined editorial icon of {subject}, 1.5px stroke, carbon black, slightly rounded
caps (sable-brush quality), cadmium-red active state, fine-art aesthetic.
```

| Feature id  | `{subject}`                                      |
| ----------- | ------------------------------------------------ |
| `library`   | an open book resting on a shelf edge             |
| `syncplay`  | a clock face with a single sweeping hand         |
| `transcode` | a projector body with its lens throw             |
| `auth`      | a shield with a checked mark inside              |
| `livetv`    | a broadcast signal traced as one continuous line |
| `dlna`      | a screen with an arrow arriving into it          |
| `plugins`   | an interlocking volume, drawn as one solid       |
| `hub`       | a centre node with three satellites              |

## 7. Persona vignettes — three surface studies (`features.html`)

`persona_vignettes` decides _which surfaces_ get depicted. Each is shipped as a hand-drawn SVG
wireframe of the surface itself — drawn, never photographed, so nothing reads as a testimonial.

### Study I — The Collector's Study

Surfaces: home hero, **library grid**, **media detail view**. Features shown: `library`,
`transcode`, `auth`.

```
{prefix} a study of a media library wall: a grid of poster rectangles in canvas cream
on gallery linen, one larger detail panel at the right with a carbon-black play mark
and a single cadmium-red accent bar beneath it {suffix}
```

### Study II — The Family Studio

Surfaces: home hero, **SyncPlay lobby**, **media player**. Features shown: `syncplay`, `auth`,
`hub`.

```
{prefix} a study of three rooms watching one film: three framed screens side by side
in canvas cream, a single shared timeline drawn beneath them as one long gestural
stroke, the playhead a carbon-black round, cadmium red marking elapsed time {suffix}
```

### Study III — The Live Painter

Surfaces: **admin dashboard**, **library upload**, **quality profiles**. Features shown: `library`,
`transcode`, `hub`, `plugins`.

```
{prefix} a study of an admin bench: a top stat bar of carbon-black and ultramarine
blocks, three canvas-cream panels below it, one marked with a cadmium-red edge, and a
descending stack of quality-profile bars in aged ground {suffix}
```

## 8. The unpainted canvas — `404.html` (CSS + inline SVG)

`error_page_experience.concept`, realised rather than printed:

```
{prefix} a blank stretched linen canvas on its stretcher, primed with gesso and
entirely without paint, lit by soft north light, with a painter's palette resting at
its lower right as though the painter has just stepped back to consider it {suffix}
```

## 9. Seasonal motifs — `img/seasonal/*.svg`

`seasonal_activation.motif_assets`, applied by the `js/main.js` date-gate only while a variant's
`active_range` is live.

| File                       | Variant                       | Prompt subject                                                                                                       |
| -------------------------- | ----------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `autumn-leaf-marks.svg`    | Autumn Study (10-01..11-15)   | fallen-leaf shapes as gestural marks in burnt sienna and raw sienna, a warm amber field replacing the cadmium accent |
| `winter-frost-texture.svg` | Winter White (12-01..01-15)   | a cooler, paler fresh-gessoed ground with sparse frost-form marks in Prussian blue and more negative space           |
| `spring-flower-forms.svg`  | Spring Opening (03-15..05-15) | gestural flower-form marks in magenta with viridian stems, the composition lighter and more open                     |

## 10. Photography, if any is ever added

`photography_style` + `photo_rules` govern it: warm Kodak Portra grade, natural north-light studio,
close-up paint and canvas texture welcome, asymmetric composition with breathing room, never cold or
blue-tinted, never generic stock, never over-processed. No photographic asset ships today — the kit's
`realism` is `abstract`, so drawn and CSS artwork is the faithful choice.
