# PROMPTS.md — Prairie Bloom Image Generation Reference

This file records the exact generation prompts for every image asset in the Prairie Bloom brand kit site. Regenerate assets using these prompts whenever the visual identity needs to be refreshed.

## Brand DNA (prepend to every prompt)

> Prairie Bloom is the American heartland made visible — sunflowers, hand-stitched quilts, folk-art roosters, and open skies. It is warm yellow, wildflower violet, and honest barn red. It is never corporate, never cold, never slick. Every surface should feel like it was made by caring hands.

## Global Negative Prompt

```
neon, cyberpunk, futuristic HUD, harsh lighting, lens flare,
blue/cool color grade, HDR, chrome/glossy, dark moody, horror,
urban, corporate, minimalist-white, sterile, cold grey
```

## Image Prompt Prefix (prepend to every prompt)

```
American folk-art meadow illustration, seed-packet woodblock style, flat
warm color fills with subtle paper grain, hand-drawn furrow-brown outlines,
golden-hour diffuse light, sunflowers and wildflowers framing the subject,
```

## Image Prompt Suffix (append to every prompt)

```
, cohesive prairie palette (sunflower yellow, wildflower violet, barn red,
hay cream, clover green), wholesome, community-centered, rounded shapes,
high quality, balanced botanical composition.
```

---

## Logo

**Prompt:**
```
Design a Prairie Bloom logo: Zilla Slab 700 wordmark in sunflower yellow on hay
cream, optional hex-rosette badge with a sunflower center, simple, legible, no neon.
```
- Shape: Wordmark in Zilla Slab 700, optionally inside a rounded hex-rosette badge
- Colors: Sunflower yellow on hay cream, or hay cream on wildflower violet
- Allowed symbols: sunflower, hex rosette, wildflower sprig, rooster silhouette
- Forbidden: gears, circuits, neon, play-button triangle alone, corporate crest
- Complexity: Simple and legible at 24px and above
- Negative space: Generous — let the sunflower breathe around the type

---

## Hero Illustration (CSS-only, SVG inline)

The hero uses a **CSS + inline SVG sunflower** motif. No raster image is needed for the hero decoration. The folk-art sunflower is drawn inline in SVG with:
- 12 petals using Zilla Slab color `#F2C12E` (Sunflower Yellow)
- Center disk using `#2C1D0E` (Furrow Brown)
- Seed dots using `#4E7C59` (Clover Green)
- Subtle sway animation (CSS `@keyframes sunflower-sway`)

---

## OG Image (1200×630 SVG)

**Subject:** Folk-art prairie meadow scene — sunflowers flanking a centered seed-packet-style card with Phlix wordmark and "Stories Worth Gathering For." tagline.

**Prompt:**
```
A warm Prairie Bloom landing page: full-bleed sunflower meadow illustration hero,
sunflower-yellow CTA pill, hay-cream sections, rounded folk-art cards, generous
whitespace, quilted-border section dividers.
```

The existing `og.svg` was hand-crafted as a folk-art SVG at 1200×630. Update by re-drawing the SVG following this composition:
1. Prairie Sky gradient background (`#A8CFEA` → `#F7F0DC` → `#EDE3C5`)
2. Wildflower bloom radial gradient overlay
3. Two large sunflower SVG illustrations at left and right edges
4. Wildflower scatter dots (violet `#7B5EA7`, barn red `#B83A3A`, clover green `#4E7C59`)
5. Central seed-packet card on hay cream with furrow-brown border
6. Phlix wordmark in Georgia serif bold
7. Tagline in italic Georgia
8. Bottom banner with "BSD-3-Clause · Self-hostable · No lock-in"

---

## Icon Set (inline SVG, 24×24 viewBox)

All 7 feature icons are inline SVG paths in the HTML. They follow these rules:
- 2px stroke weight; rounded caps and joins
- Single-color by default (furrow brown `#2C1D0E` or wildflower violet `#7B5EA7`)
- Preter botanical and farmstead subjects where relevant — leaf, sun, home, basket
- No sharp angular corners or ultra-thin hairline strokes

| Icon ID | Subject | SVG Path |
|---------|---------|---------|
| library | folder lines | `<path d="M4 6h16M4 12h16M4 18h12"/>` |
| syncplay | clock circle | `<circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>` |
| transcode | box 3D | `<path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>` |
| shield | shield | `<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>` |
| antenna | broadcast | `<path d="M4.93 4.93l14.14 14.14M6.34 17.66l11.31 11.31M2 12l4-4 4 4M12 2l4 4-4 4M22 12l-4 4-4-4M12 22v-4"/>` |
| broadcast | dlna | `<path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9M7 16.5c3-3 7.5-3.5 10.5-1.5M9 9.5c3.5-3.5 9-3.5 12.5 0M12 5c3 0 5.5 2.5 5.5 5.5S15 16 12 16 6.5 13.5 6.5 10.5 9 5 12 5z"/>` |
| puzzle | puzzle | `<path d="M19.439 7.85c-.049.322.059.648.289.878l1.568 1.568c.47.47.706 1.087.706 1.704s-.235 1.233-.706 1.704l-1.611 1.611a.98.98 0 01-.837.276c-.47-.07-.802-.48-.968-.925a2.501 2.501 0 10-3.214 3.214c.446.166.855.497.925.968a.979.979 0 01-.276.837l-1.61 1.61a2.404 2.404 0 01-1.705.707 2.402 2.402 0 01-1.704-.706l-1.568-1.568a1.026 1.026 0 00-.877-.29c-.493.074-.84.504-1.02.968a2.5 2.5 0 11-3.214-3.214c.464-.18.894-.527.967-1.02a1.026 1.026 0 00-.289-.877l-1.568-1.568A2.402 2.402 0 013.455 10.5c0-.617.236-1.234.706-1.704L5.773 7.185a.98.98 0 01.837-.276c.47.07.802.48.968.925a2.501 2.501 0 113.214-3.214c-.446-.166-.855-.497-.925-.968a.979.979 0 01.276-.837l1.61-1.61a2.404 2.404 0 011.705-.707c.617 0 1.234.236 1.704.706l1.568 1.568c.23.23.556.338.877.29.493-.074.84-.504 1.02-.968a2.5 2.5 0 013.214 3.214c-.464.18-.894.527-.967 1.02z"/>` |
| hub | hub network | `<circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>` |

---

## Favicon

**Prompt:**
```
Outlined folk-art sunflower favicon, 32×32, hex-rosette badge with sunflower center
in sunflower yellow on furrow-brown seed packet background.
```

---

## Background Texture (CSS)

The hay-cream background uses no raster image. It is the natural `#F7F0DC` color of the page background. Paper grain is simulated via a subtle CSS background texture using `box-shadow` and `background` layered subtly.

---

## Marketing Graphics

For future social media graphics, use this template:

**Prompt:**
```
A folk-art seed-packet social graphic for {topic}: bold Zilla Slab headline,
painted botanical key art, hay-cream border with stitched dash frame, wholesome.
```

---

## Dashboard Mockup

**Prompt:**
```
A spacious media dashboard on hay cream with big Zilla Slab numerals in furrow
brown, sunflower-yellow and wildflower-violet stat cards, rounded quilt-block layout.
```
