# Image Generation Prompts — Neon Noir Brand Kit

This file records the exact prompts used to generate every image asset in this brand-kit site. Use these to regenerate or refine any asset.

---

## Logo (`img/logo.svg`)

**Prompt:**
```
Design a Neon Noir logo: Playfair Display italic wordmark in ghost-white on
void-black, optional 1px electric-cyan rectangular border, sharp corners,
no warm colors, no rounded shapes.
```

**Implementation:** Hand-crafted SVG — Playfair Display italic "Phlix" wordmark on void-black background with electric-cyan border and animated neon amber accent bar.

**Negative constraints (from kit):**
- No rounded shapes
- No warm colors (no golden, amber except for primary CTA accents)
- No play-button triangle cliché
- No gears or circuits

---

## Favicon (`img/favicon.svg`)

**Prompt:**
```
Sharp square favicon, dark void-black background, neon amber (#F5A623) border,
ghost-white italic "P" letterform, no rounded corners beyond 4px.
```

**Implementation:** 32×32 SVG with void-black background, amber border, and animated cyan glow dot.

---

## Social Share Image (`img/og.svg` → `img/og.png`)

**Prompt:**
```
A neo-noir media landing page social graphic: Playfair Display headline
in neon amber, dark atmospheric key art, city night, rain reflections,
high-contrast noir composition, 1200x630px.
```

**Implementation:** Hand-crafted SVG — city silhouette against void-black with neon window lights, venetian-blind shadow pattern, neon horizon gradient line, "Phlix" headline with cyan glow.

**To generate PNG:** Render `og.svg` to 1200×630 PNG at 2x resolution.

---

## Background Texture (CSS-only)

**Prompt:**
```
Void-black background with subtle rain-texture and faint neon-cyan radial
glow in one corner. No warm light. No text.
```

**Implementation:** Pure CSS — `background: radial-gradient()` + CSS noise/grain via SVG filter embedded in CSS.

---

## Hero Illustration Concept

**Prompt:**
```
{image_prompt_prefix} dramatic neo-noir hero scene: lone silhouette
under neon signs, venetian-blind shadows, rain-slicked streets,
{image_prompt_suffix}
```

**Where:**
- `image_prompt_prefix` = "Neo-noir cinematic illustration, high contrast, deep black shadows, neon city night, electric cyan and magenta neon signs, rain-slicked streets, 1940s noir meets modern neon city,"
- `image_prompt_suffix` = ", dark atmospheric palette (void black, electric cyan, neon magenta, amber), sharp hard shadows, film grain, cinematic composition, high quality."

**Negative prompt:**
```
warm, golden hour, daylight, sunshine, cozy, cheerful, pastel,
soft, cream background, family friendly, cartoonish, rounded bubbles,
corporate clean, flat bright colors
```

---

## Feature Icons (7 inline SVG)

Each icon follows:
```
Sharp outlined minimal icon of {subject}, 1.5px stroke, ghost-white,
no rounded joins, neon-cyan active state, noir aesthetic.
```

| Feature | Icon concept |
|---------|-------------|
| library | Open book with pages |
| syncplay | Clock with sync arrows |
| transcode | Video display with signal |
| auth/shield | Shield with check |
| livetv/antenna | Broadcast antenna wave |
| dlna/broadcast | Radio tower/signal |
| plugins/puzzle | Puzzle piece |
| hub | Network/relay nodes |

**Implementation:** All icons are inline SVGs in the HTML with 1.5px stroke, sharp corners, ghost-white fill, and cyan active states on hover.

---

## Mascot: Lux (CSS/SVG placeholder)

**Prompt:**
```
A sleek silhouetted figure wearing a long trench coat and a fedora whose brim
casts a neon-cyan glow. Their eyes are two points of amber light in the darkness.
Leaning against a rain-slicked wall, arms crossed, noir aesthetic.
```

**Note:** The Neon Noir kit defines mascot "Lux" (anthropomorphic neon sign letter X). For the marketing site, Lux is referenced but not prominently featured — the dark atmospheric photography and neon accents carry the identity instead.

---

## Art Direction Rules Applied

1. Background is always void-black (#0A0C10) or deep-navy (#111827)
2. Maximum two neon accent colors per screen
3. Primary CTA is always neon amber (#F5A623) with void-black text
4. Sharp corners (2px radius) except pill for badge shapes
5. All text must meet WCAG AA against its dark background
6. No warm golden or cream tones
7. Film grain and neon halation on all imagery
8. Venetian-blind shadow patterns as signature dividers
