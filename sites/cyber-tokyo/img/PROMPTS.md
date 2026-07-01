# Cyber Tokyo — Image generation prompts

> These prompts were derived from `phlix-website/brand-kits/cyber-tokyo.js`
> and can be used to regenerate all raster image assets for this site.

---

## Generation template

```
{prefix} {subject}, in the Cyber Tokyo style, {mood}, set in a neon-blazing
Tokyo midnight megacity {suffix}
```

**Prefix** (always prepend):
> Tokyo cyberpunk cinematic illustration, hyper-dense neon city, hot pink kanji signs,
> electric lime accents, Shibuya midnight, Neo Tokyo aesthetic, anime-influenced,

**Suffix** (always append):
> dark atmospheric palette (Tokyo Night #050308, Neon Sakura #FF00AA, Circuit Green #00FF41,
> Neon Mandarin #FF6600), multi-source neon lighting, glitch displacement details,
> high saturation, cinematic composition, high quality.

**Negative prompts** (exclude these from every generation):
> warm, golden hour, daylight, sunshine, cozy, cheerful, film noir,
> Western noir, pastel, soft, cream background, family friendly,
> rounded bubbly, corporate clean, flat bright background, nature, rural

---

## Asset prompts

### logo.svg
```
Design a Cyber Tokyo logo: Space Grotesk bold wordmark "Phlix" in Screen White (#F0EEF8)
on Tokyo Night (#050308), 1px Neon Sakura (#FF00AA) rectangular border, pink outer glow,
sharp 2px corners, optional katakana mark beside wordmark, circuit-trace accent.
```
**Mood:** electric, precise, brand-faithful
**Output:** `img/logo.svg` (SVG, inline-safe)

---

### favicon.svg
```
Square favicon for Cyber Tokyo: 32×32px, Neon Sakura (#FF00AA) fill, sharp-cornered square,
"P" lettermark in Tokyo Night (#050308), circuit-trace detail in Circuit Green (#00FF41).
```
**Mood:** bold, minimal
**Output:** `img/favicon.svg` (SVG)

---

### og.png (1200×630 social share card)
```
A Cyber Tokyo media landing page social graphic: full-bleed dark cyberpunk hero with
"Phlix" wordmark in Screen White, "Your media. Your library. Your Phlix." tagline,
Neon Sakura (#FF00AA) accent elements, Shinjuku Dark (#0D0918) card sections, circuit-wire
dividers, hot-pink and electric-lime accent lights, vertical kanji decorative columns.
```
**Mood:** immersive, high-energy
**Output:** `img/og.png` (1200×630 PNG)

---

### Hero artwork (index.html background suggestion)
```
Hyper-dense Neo Tokyo street scene at midnight: hot pink kanji neon signs blazing over
rain-pooled streets, electric lime racing stripes, Shibuya crossing crowds at 2am,
multi-source neon practicals (pink/green/orange), scan-line overlay, anime-influenced
cel-shaded flat color.
```
**Mood:** overwhelming, electric, beautiful
**Output:** CSS gradient fallback (Shibuya Crossing gradient) until rendered

---

### Feature section background
```
Neo Tokyo alley at midnight: vending machine light rectangles, pachinko parlor neon
eruptions, rain reflections in neon mandarin and circuit green, dense vertical
signage, subtle glitch displacement at frame edges.
```
**Mood:** dense, electric, city-at-night
**Output:** CSS pattern fallback (circuit-grid texture at 3% opacity)

---

## UI generation rules (for future AI UI rendering)
```
Background is always Tokyo Night (#050308) or Shinjuku Dark (#0D0918).
Neon Sakura is the dominant accent — it may appear on multiple elements in one view.
Primary CTA is always Neon Sakura with Tokyo Night text.
Sharp corners (2px radius) except pill for tag/chip shapes.
Use the spacing scale; density is intentional — tighter spacing is acceptable at high information density.
Max content width 1400px.
All text must meet WCAG AA against its dark background.
Glitch effects and scan-line overlays are approved decorative elements.
```

---

## Page generation rules (for future AI page rendering)
```
Background is always Tokyo Night — every page begins in near-pure darkness.
Hero sections feature a dramatic cyberpunk Tokyo cityscape or anime-style illustration.
CTA buttons are Neon Sakura, sharp-cornered, with pink glow shadow.
Reveal content with fast glitch-cut entrance animations (no slow fades).
Maximum page width 1400px; content centered on wider viewports.
Every page should have at least one Neon Sakura element and one Circuit Green element.
Vertical kanji text as decorative column elements is approved on hero and feature sections.
```
