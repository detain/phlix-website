# Brand Anti-Checklist Review — pixel-dungeon

**Reviewer:** Final adversarial review  
**Date:** 2026-07-01  
**Dimension:** Brand anti-checklist  
**Score:** 100 / 100  
**Severity:** None

---

## Brand Opposites Check (from brand kit §brand_opposites)

The brand kit defines these as what Pixel Dungeon is NOT. Each was checked across all 8 HTML pages and 3 CSS files.

| Brand Opposite | Found? | Location |
|----------------|--------|----------|
| Not smooth | ✅ NOT FOUND | No `ease`, `ease-in`, `ease-out`, `ease-in-out`, or `cubic-bezier` anywhere in CSS |
| Not organic | ✅ NOT FOUND | No organic/organic-shaped elements |
| Not rounded | ✅ NOT FOUND | `--radius-*: 0px` enforced in base.css:46-50; no `border-radius` except `0` |
| Not gradient-heavy | ✅ NOT FOUND | Only 3 brand-kit-approved gradients: `--gradient-dungeon-depth`, `--gradient-coin-shimmer`, `--gradient-hero-entrance`. No CSS gradient used decoratively beyond these three |
| Not blurry | ✅ NOT FOUND | No `filter: blur()` anywhere; CRT effect uses `transparent 2px, rgba(0,0,0,0.05) 2px` (hard stripe, not blur) |
| Not photorealistic | ✅ NOT FOUND | No `<img>` photography anywhere; only SVG artwork and pixel-art SVG sprites |
| Not 3D-rendered | ✅ NOT FOUND | No 3D CSS transforms, no WebGL, no 3D content |
| Not corporate clean | ✅ NOT FOUND | No white/light backgrounds; Cartridge Black (#0A0A0A) and Screen Black (#151515) everywhere |
| Not minimal-white | ✅ NOT FOUND | Confirmed |
| Not warm editorial | ✅ NOT FOUND | Tone is game-like and retro, not editorial or cinematic |
| Not cinematic | ✅ NOT FOUND | No letterboxing, no film-grain, no parallax; motion is stepped/quantized |
| Not sophisticated | ✅ NOT FOUND | Voice is playful and game-flavored ("Insert Coin", "Quest Complete", "+1 UP") |
| Not serious | ✅ NOT FOUND | Achievement-framing throughout, playful microcopy |

---

## avoid_words Check

The brand kit explicitly forbids these words: `"leverage", "synergy", "utilize", "robust", "seamless", "ecosystem", "paradigm", "disruption", "solution", "scalable", "bandwidth"`

Full case-insensitive grep of all 8 HTML files + 3 CSS files + 1 JS file:

| Word | Found? |
|------|--------|
| leverage | ❌ NOT FOUND |
| synergy | ❌ NOT FOUND |
| utilize | ❌ NOT FOUND |
| robust | ❌ NOT FOUND |
| seamless | ❌ NOT FOUND |
| ecosystem | ❌ NOT FOUND |
| paradigm | ❌ NOT FOUND |
| disruption | ❌ NOT FOUND |
| solution | ❌ NOT FOUND |
| scalable | ❌ NOT FOUND |
| bandwidth | ❌ NOT FOUND |

---

## Visual Brand Anti-Patterns

| Pattern | Status | Notes |
|---------|--------|-------|
| Flat design / Material design | ✅ Avoided | Pixel-art style, CRT scanlines, retro gaming aesthetic |
| Smooth bezier transitions | ✅ Avoided | All transitions use `steps()` easing |
| Modern icon libraries | ✅ Avoided | All icons are custom inline SVGs with fill-based pixel style |
| Anti-aliased / soft edges | ✅ Avoided | 0px corners everywhere, hard pixel borders |
| Rounded corners | ✅ Avoided | `--radius-pill: 0px` in base.css:50; no border-radius > 0 anywhere |
| Drop shadows with blur | ✅ Avoided | All shadows are `2px 2px 0px rgba(0,0,0,1)` — hard offset, zero blur |
| Glow / bloom effects | ✅ Avoided | No `box-shadow` with blur, no CSS `glow` |
| Modern stock photography | ✅ Avoided | No photography in site at all |
| Gradient fills beyond approved | ✅ Avoided | Only 3 brand-kit gradients in use |

---

## Voice Consistency

The writing style throughout uses game vocabulary exclusively:
- "Insert Coin. Begin Story." (tagline)
- "Quest-log ready", "Quest Complete — All Features Unlocked" (section titles)
- "Press Start to Watch.", "+1 UP", "No continues required."
- "Your Party — Every Client Class", "Pick your platform and begin."
- "Choose Your Class" (download page)
- "The dungeon has loot. Level up your server." (plugins CTA)
- "The dungeon map awaits" (docs CTA)
- "Your library follows you anywhere." (hub CTA)
- "Your quest awaits, adventurer." (about CTA)
- "Player 1 Ready" (about page hero)
- "Your library awaits. +1 UP." (home CTA banner)
- "Every title is a new dungeon." (clients CTA)
- "The dungeon remembers you." (about page subtitle)

These all match the brand kit's voice: playful, achievement-oriented, warmly nostalgic, game-flavored. The avoid_words list is clean. The brand_opposites list is fully respected.

---

## Score Breakdown

| Area | Score | Notes |
|------|-------|-------|
| Brand opposites (12 items) | 50/50 | Zero violations |
| avoid_words (11 items) | 50/50 | Zero violations |
| Visual anti-patterns | 50/50 | Fully compliant |
| Voice consistency | 50/50 | Game vocabulary throughout |
| **Total** | **200/200 → 100/100** | |

---

## Verdict

**✅ PASS — Brand Anti-Checklist: 100/100**

The site is a textbook application of the Pixel Dungeon brand kit's anti-checklist. Not a single forbidden word, forbidden visual pattern, or forbidden tone was found across all 8 pages, 3 CSS files, and 1 JS file. The retro-gaming aesthetic is consistent and intentional throughout.
