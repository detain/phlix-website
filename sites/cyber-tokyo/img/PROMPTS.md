# img/PROMPTS.md — Cyber Tokyo image generation prompts

All image assets should be regenerated using these prompts. For raster formats,
render the SVG sources through a vector→raster pipeline at the specified dimensions.

---

## logo.svg

**Prompt:**
Design a Cyber Tokyo logo: Space Grotesk bold wordmark in Screen White (#F0EEF8) on Tokyo Night (#050308), 1px Neon Sakura (#FF00AA) rectangular border with sharp corners, pink outer glow, optional katakana mark beside wordmark. Bold and high-contrast — must read on Tokyo Night at all sizes.

**Negative prompt:**
play-button triangle cliché, film reels, cameras, sunbursts, warm or organic illustrations, rounded bubbly logo treatments, light or warm backgrounds.

**Specs:**
- Format: SVG
- Dimensions: 240×60 viewBox
- Style: Sharp-edged, high-contrast, neon glow

---

## favicon.svg

**Prompt:**
A minimal Cyber Tokyo favicon: solid Neon Sakura (#FF00AA) square with a bold white "P" letterform centered, sharp corners only. Reads as a tiny icon.

**Negative prompt:**
rounded corners, gradients, warm tones, organic shapes.

**Specs:**
- Format: SVG
- Dimensions: 32×32 viewBox
- Style: Flat, bold, single-color mark

---

## og.svg / og.png

**Prompt:**
A Cyber Tokyo social share card (1200×630): full-bleed dark Tokyo Night (#050308) background, Space Grotesk wordmark in Screen White, tagline in Neon Sakura (#FF00AA) with a subtle pink neon glow, circuit-trace line accents in Electric Lime (#00FF41), vertical kanji decorative text in hot pink at low opacity, scan-line texture overlay, and ambient multi-color neon radial bloom in the upper right. Feature pills (SYNCPLAY / LIVE TV / HUB RELAY / DLNA / 4K HDR) in sharp-cornered bordered rectangles along the bottom. The word "Phlix" should be prominent and modern.

**Negative prompt:**
warm golden light, daylight, golden hour, pastoral imagery, film reels, rounded bubbly UI, cream or light backgrounds, Western noir restraint, sparse layouts.

**Specs:**
- Format: SVG source, rasterized to PNG
- Dimensions: 1200×630 px
- Style: Hyper-dense Tokyo cyberpunk, anime title-card energy, neon-soaked

---

## hero-background (CSS-generated)

The hero uses a CSS gradient background — no raster image needed:

```css
/* Shibuya Crossing gradient — hot pink to electric lime */
background: linear-gradient(135deg, #FF00AA, #00FF41);

/* Akihabara Bloom radial — neon ambient bloom */
background: radial-gradient(ellipse at center, rgba(255,0,170,0.40), rgba(5,3,8,0.0) 70%);
```

Composition: gradient applied at 15% opacity over Tokyo Night base, with a repeating scan-line overlay at 3% opacity for texture.

---

## Feature card icons (inline SVG, CSS-colored)

Each of the 7 feature icons uses a stroke-based SVG at 1.5px stroke weight, in the duotone style:
- Base: Shinjuku Dark (#0D0918) fill
- Active stroke: Neon Sakura (#FF00AA)

**Icon subjects:**
1. library — stacked lines
2. syncplay — clock circle
3. transcode — 3D cube outline
4. shield — shield outline
5. antenna — broadcast/signal waves
6. broadcast — globe with signal
7. puzzle — puzzle piece
8. hub — central dot with radiating nodes

All styled with sharp 1.5–2px strokes, square corners (2px radius max), Neon Sakura active state.
