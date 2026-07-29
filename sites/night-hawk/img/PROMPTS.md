# Night Hawk — Image Generation Prompts

This file records the exact generation prompts used to create each image asset in `img/`. Use these to regenerate artwork later.

## Image Prompt Prefix (from kit)
Stealth fighter aesthetic — dark HUD, military precision, night vision green accents

## Image Prompt Suffix (from kit)
Negative: colorful, playful, warm, cartoonish, corporate

---

## img/logo.svg

**Prompt**:
```
Night Hawk logo for "PHLIX" media server brand, stealth fighter aesthetic. Dark background (#0A0A0A). Stylized "P" letter mark with targeting reticle overlay in cyan (#00B4D8). Monospace "PHLIX" text in off-white (#E0E1DD). HUD corner brackets as decorative elements. Military aviation inspired, precise lines, tactical feel.
```

**Source**: Hand-crafted SVG using kit colors
**Tool**: Native SVG

---

## img/favicon.svg

**Prompt**:
```
Minimal favicon for "PHLIX" brand, stealth fighter theme. 32x32 pixels. Dark background. Single "P" letter in cyan (#00B4D8) with targeting crosshair overlay. HUD corner brackets in corners. Square format, clean at small sizes.
```

**Source**: Hand-crafted SVG
**Tool**: Native SVG

---

## img/og.png (and og.svg source)

**Prompt**:
```
1200x630 social share card for "PHLix" self-hosted media server brand. Dark stealth fighter theme with grid overlay. Large "PHLIX" wordmark in off-white. Tagline "YOUR MEDIA. YOUR LIBRARY" in cyan monospace. "SELF-HOSTED MEDIA SERVER" at bottom in muted steel blue. Targeting reticle decorative elements in corners. Dark gradient background (#0A0A0A to #1B2631). Military aviation HUD aesthetic.
```

**Source**: SVG converted to PNG via rsvg-convert
**Tool**: rsvg-convert

---

## Regeneration Command
```bash
# After updating SVG source:
rsvg-convert -w 1200 -h 630 img/og.svg -o img/og.png
```
