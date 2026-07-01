# PROMPTS.md — Manga Studio Image Generation Reference

All image assets for the Manga Studio brand kit were generated using the
following prompt templates and rules from `brand-kits/manga-studio.js`.

---

## Logo (`img/logo.svg`)

**Prompt:**
> Design a Manga Studio logo: Black Han Sans wordmark in Ink Black (#0D0D0D) on
> Manga White (#F8F8F4), inside a hard-edged rectangular panel badge. 2px ink-black
> border. A Spot Red (#D0021B) accent underline beneath the wordmark. A small pen
> nib SVG mark in the upper-right corner as a brand symbol. Simple, stark,
> immediate. No rounded corners. No color fill. No gradients.

**Negative:**
> pastel, soft gradients, warm golden tones, neon, rounded bubbly shapes,
> 3D render, photorealistic HDR, full color palette, cel-shading gradients

---

## Favicon (`img/favicon.svg`)

**Prompt:**
> A manga studio icon: a square hard-edged panel in Spot Red (#D0021B) with a
> white inner border. A centered white pen nib silhouette inside. Stark, bold,
> minimal. Legible at 16×16px.

**Negative:**
> pastels, soft gradients, rounded corners, multicolor, 3D

---

## OG Image (`img/og.svg`)

**Prompt:**
> A manga-style editorial social graphic: Manga White background with speed-line
> radial burst from the right side. A large white panel card on the left with a
> Spot Red top accent bar and ink-black 3px border. "PHLIX" in Black Han Sans at
> 72px in Ink Black. Below it: "Every Frame, A Masterpiece." in Rampart One in
> Ink Black. Subtext: "Self-hosted PHP media server" in Noto Sans JP. A Impact
> Yellow star burst in the lower-right of the panel. A large ink-black pen nib
> mark on the right side. A Spot Red vertical accent bar on the far left edge.
> High contrast, no warm tones.

**Negative:**
> pastel, warm golden tones, soft gradients, neon, rounded bubbly shapes,
> 3D render, photorealistic HDR, noise/glitch, full color palette, cel-shading

---

## Hero Art (CSS-generated, no raster prompt needed)

The hero uses CSS-only effects:
- Speed-line radial burst via `repeating-conic-gradient`
- Ink-wash gradient overlay via `linear-gradient`
- Spot-color slash via the `.cta-banner` with `background: #D0021B`

---

## Inline Feature Icons (SVG, stroke-based)

**Prompt for each icon:**
> Sharp-edged manga icon of {subject}, 2px Ink Black stroke, graphic and
> direct, no gradient fill, single-color, no rounded caps. Angular style.
> SVG viewBox 0 0 24 24. Examples: library, syncplay, transcode, shield,
> antenna, broadcast, puzzle, hub.

**Negative for all icons:**
> gradient fills, rounded caps, thin hairlines, multicolor, 3D

---

## Brand Image Generation Rules (from `ui_generation_rules`)

1. Background is always Manga White (#F8F8F4) — never pure white or gray.
2. Card and panel borders are 2px solid Ink Black — never colored, never removed.
3. Hard offset shadows (2–4px) rather than blurred shadows on key UI blocks.
4. Spot Red is reserved for the single most critical action on any screen.
5. Maximum two spot colors per view; the third element must use Ink Black or
   Screentone Gray.
6. Corner radii are near-zero (2–4px) on all structural elements; pills for
   badges only.
7. Typography hierarchy must be dramatic — at least 2× size jump between levels.
8. Spacing scale is in increments of 4px; generous whitespace is structural
   tension.

---

## Page Generation Rules (from `page_generation_rules`)

1. Every page opens with a clear panel hierarchy — one dominant element,
   supporting elements below.
2. Spot Red appears exactly once per page fold as a primary CTA or emphasis mark.
3. Max content width 1440px; inner text columns max 760px.
4. Ink-rule horizontal dividers replace decorative elements between sections.
5. Impact Yellow is used at most once per page, for a single high-priority
   badge or metric.
6. Screentone Gray fills are used for secondary/inactive state areas only.

---

*Generated from manga-studio.js v1.0 — Phlix brand kit*
