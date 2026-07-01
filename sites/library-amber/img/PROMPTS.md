# Library Amber — Image Generation Prompts

> These prompts are derived directly from `brand-kits/library-amber.js` and
> can regenerate every image asset in this site. Use the `image_prompt_prefix`,
> `image_prompt_suffix`, and `negative_prompt` from the kit, composed with the
> subject-specific templates below.

## Global Prefix (prepend to every prompt)
```
Victorian private library illustration, amber reading lamp warm glow,
deep mahogany and hunter green, antique cream vellum tones, fine pen-and-ink
engraving with warm watercolor wash, scholarly and distinguished atmosphere,
```

## Global Suffix (append to every prompt)
```
, cohesive palette (amber gold, mahogany dark, hunter green, antique cream,
burnished brass), layered depth, tactile textures, dignified composition,
high detail, no neon, no cool light.
```

## Negative Prompt (omit from generation)
```
neon, cyberpunk, futuristic, cartoon, pastel, cool blue lighting,
HDR glow, lens flare, harsh studio lighting, pop art, minimalist flat,
dark horror, electric colors, chrome glossy surfaces,
```

---

## logo.svg
Prompt: `Library Amber logo: Playfair Display 'Phlix' wordmark in amber gold (#C8861A) set inside an antique cartouche frame on deep mahogany; clean, refined, no neon.`

Subject: Wordmark logo lockup with cartouche frame
Mood: Distinguished, timeless, restrained

---

## favicon.svg
Prompt: `Library Amber favicon: open book silhouette in amber gold on deep mahogany square, brass border, Victorian engraving style, 32x32px.`

Subject: Open book icon mark
Mood: Scholarly, warm, refined

---

## og.svg (1200×630 social share card)
Prompt: `A Library Amber media server landing page: mahogany hero with amber glow illustration, antique-cream feature sections, Playfair Display headlines, amber-gold CTA button, brass rule dividers, dignified and warm.`

Subject: Full-bleed marketing social card
Mood: Warm, prestigious, inviting

---

## Hero background (CSS-only, no raster needed)
- Radial amber lamp glow via CSS `radial-gradient(ellipse at 40% 60%, rgba(200, 134, 26, 0.22) 0%, rgba(122, 78, 16, 0.12) 35%, transparent 70%)`
- Herringbone pattern: CSS `repeating-linear-gradient(45deg, ...)` at 4% opacity
- Lamp glow pulse: `@keyframes lamp-glow-pulse` with 4s ease-in-out infinite

---

## Inline feature icon SVGs (7 icons, stroke-based, 1.5px stroke)
All icons follow: fine-line outlined, amber gold or mahogany ink, slightly rounded ends, old-world engraving aesthetic.

### library.svg
Prompt: `Fine-line outlined icon of open book with spine, 1.5px stroke, amber gold, slightly rounded ends, old-world engraving aesthetic, no sharp corners.`

### syncplay.svg
Prompt: `Fine-line outlined icon of clock face, 1.5px stroke, amber gold, slightly rounded ends, old-world engraving aesthetic, no sharp corners.`

### transcode.svg
Prompt: `Fine-line outlined icon of film frame/play triangle, 1.5px stroke, amber gold, slightly rounded ends, old-world engraving aesthetic, no sharp corners.`

### shield.svg
Prompt: `Fine-line outlined shield icon, 1.5px stroke, amber gold, slightly rounded ends, old-world engraving aesthetic, no sharp corners.`

### antenna.svg (Live TV)
Prompt: `Fine-line outlined antenna/broadcast tower icon, 1.5px stroke, amber gold, slightly rounded ends, old-world engraving aesthetic, no sharp corners.`

### broadcast.svg (DLNA)
Prompt: `Fine-line outlined DLNA/screen-cast icon, 1.5px stroke, amber gold, slightly rounded ends, old-world engraving aesthetic, no sharp corners.`

### puzzle.svg (Plugin)
Prompt: `Fine-line outlined puzzle-piece icon, 1.5px stroke, amber gold, slightly rounded ends, old-world engraving aesthetic, no sharp corners.`

---

## Section divider ornament
Brass shimmer rule: `linear-gradient(90deg, transparent 0%, #A8792A 20%, #C8861A 50%, #A8792A 80%, transparent 100%)`

## Mascot: "The Librarian"
> Per kit, mascot is defined but NOT used as the wordmark or primary brand mark. Only use as an optional decorative illustration element, never in place of the wordmark.

Prompt template: `{image_prompt_prefix} The Librarian owl character {pose}, in the Library Amber style, {mood}, set within a warm mahogany private library context {image_prompt_suffix}`

Poses from kit: Reading in the armchair · Offering a recommended title · Turning a globe deliberately · Peering over spectacles with measured approval

Expressions: Contemplative · Welcoming · Mildly amused · Encouraging
