# Brand Fidelity Review — Pixel Dungeon

**Dimension:** Brand fidelity & spirit
**Overall Score:** 65 / 100
**Severity scale:** ✅ (pass) / ⚠️ (warning) / ❌ (fail against brand kit)

---

## Colors

### ✅ All CSS custom properties trace to kit colors
All `:root` color tokens in `css/base.css:12-27` match the brand kit's `design_tokens.color` exactly:
`#E8001A`, `#0055AA`, `#88BB00`, `#0A0A0A`, `#151515`, `#1E1E1E`, `#F5F5F0`, `#666660`, `#00AA44`, `#FFCC00`, `#CC0000`, `#5599FF`, `#333333`, `#000000`.

### ✅ Gradients are kit-approved only
`css/base.css:29-32` defines only the three kit-allowed gradients:
- `gradient-dungeon-depth` (#151515 → #0A0A0A) — kit `Dungeon Depth` ✅
- `gradient-coin-shimmer` (#FFCC00 → #88BB00) — kit `Coin Shimmer` ✅
- `gradient-hero-entrance` (#0055AA → #0A0A0A) — kit `Hero Entrance` ✅

### ⚠️ Mario Red used for multiple interactive hover states (violates one-CTA-per-screen rule)
**Field:** `colors.color_rules[2]` / `brand_dna`: "Mario Red is exclusively for the single primary CTA per screen."
**Citation:**
- `css/components.css:274` `.btn-primary:hover { background: #b50015; border-color: #b50015; }`
- `css/components.css:336` `.feature-card:hover { border-color: var(--color-primary); }`
- `css/components.css:338` `.feature-card:hover .feature-card__icon { color: var(--color-primary); }`
- `css/components.css:51` `.nav-logo:hover .nav-logo__wordmark { color: var(--color-primary); }`
- `css/components.css:73` `.nav-toggle:hover { border-color: var(--color-primary); color: var(--color-primary); }`
- `css/components.css:105-108` nav `aria-current="page"` applies primary color border

Mario Red appears as a hover color on the primary button, feature cards, the logo wordmark, the nav toggle, and the active nav item. The kit rule is explicit: Mario Red is for "the single most important action color per screen." Using it on five separate interactive elements on the same page violates this.

### ✅ No warm/light backgrounds
All backgrounds are `#0A0A0A` (Cartridge Black) or `#151515` (Screen Black) or `#1E1E1E` (Console Dark). No cream, ivory, or light neutral backgrounds anywhere.

---

## Typography

### ✅ Press Start 2P and Silkscreen fonts used; no sans-serif
`css/base.css:53-57` defines all font roles correctly:
- Headline/display/mono → `'Press Start 2P', 'Courier New', monospace` ✅
- Body/UI → `'Silkscreen', 'Courier New', monospace` ✅

### ✅ Line-height ≥ 2.0 for Press Start 2P
`css/base.css:102` `h1, h2, h3, h4, h5, h6 { line-height: 2.0; }` ✅
`css/theme.css:55` `.text-display { line-height: 1.8; }` — display uses 1.8 per kit `fonts.display.line_height` ✅

### ✅ No italic text
No `font-style: italic` or `<em>` in CSS or HTML. Correct per kit: "Never use italic or oblique with Press Start 2P — the font has no slant."

### ❌ Google Fonts CDN links on every HTML page
**Field:** `new_site.md §8` (asset rule): "No CDN dependencies in the deployed page (no Google Fonts `<link>` to `fonts.googleapis.com`... Self-host fonts as WOFF2 and declare them with `@font-face`."
**Citation:**
- `index.html:34-36`
- `features.html:26-28`
- `clients.html:25-27`
- `download.html:25-27`
- `plugins.html:25-27`
- `docs.html:25-27`
- `hub.html:25-27`
- `about.html:25-27`

Every page loads `https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Silkscreen:wght@400;700&display=swap` from CDN. The spec explicitly requires self-hosted WOFF2 fonts. This is a direct, explicit violation on all 8 pages.

### ⚠️ Scroll behavior: smooth instead of stepped
**Field:** `css/base.css:74` `html { scroll-behavior: smooth; }`
The brand kit requires `steps()` easing everywhere. Smooth scroll is not a brand-kit pattern — it should be removed or set to `auto`.

---

## Shapes

### ✅ 0px border-radius everywhere
`css/base.css:46-50`: all radius tokens are `0px`. `css/components.css:258` `.btn { border-radius: 0; }` and `css/components.css:440` `.badge { border-radius: 0; }` confirm explicit zero-radius enforcement.

### ✅ 2px hard drop shadows
`css/base.css:59-65`:
```
--shadow-sm: 2px 2px 0px rgba(0,0,0,1)        ✅ matches kit
--shadow-md: 3px 3px 0px rgba(0,0,0,1)        ✅ matches kit
--shadow-lg: 4px 4px 0px rgba(0,0,0,1)        ✅ matches kit
--shadow-pixel-red: 2px 2px 0px #CC0000       ✅ matches kit
--shadow-pixel-blue: 2px 2px 0px #003377      ✅ matches kit
--shadow-pixel-coin: 2px 2px 0px #558800      ✅ matches kit
```

### ✅ 2px solid borders throughout
All borders use `2px solid` with Dungeon Stone (`#333333`) or brand colors. No rounded corners, no 1px or 3px borders except where the kit specifies (focus ring is 2px, nav active bar is 3px per kit `navigation.sidebar`).

---

## Motion

### ✅ steps() easing on all transitions
`css/components.css:115` nav cursor blink: `steps(1, infinite)` ✅
`css/components.css:123` focus ring: `steps(1)` ✅
`css/components.css:256` button press: `transition: transform 100ms steps(1), box-shadow 100ms steps(1)` ✅
`css/components.css:257` box-shadow with steps(1) ✅
`js/main.js:56` scroll reveal: `transition: 'opacity 300ms steps(4), transform 300ms steps(4)'` ✅
`css/base.css:115` link color transition: `transition: color 100ms steps(1)` ✅

### ✅ Animation duration 100–300ms
Button transitions: 100ms ✅, scroll reveal: 300ms ✅, blink-cursor: 500ms ✅, blip-run: 2000ms (loop, acceptable for ambient).

### ✅ prefers-reduced-motion handled
`css/base.css:178-185` global reduced-motion reset in CSS ✅
`js/main.js:62-67` Blip animation disabled when reduced motion is preferred ✅
`css/components.css:233-236` hero blip and coin sparkle disabled in reduced motion ✅

### ⚠️ Scroll reveal uses opacity + transform in JS but initial state in CSS is not set
**Citation:** `js/main.js:52-57`
```js
el.style.opacity = '0';
el.style.transform = 'translateY(16px)';
el.style.transition = 'opacity 300ms steps(4), transform 300ms steps(4)';
```
The kit requires step-based motion throughout, which is implemented here. However, the CSS base does not define `.reveal` or `.is-hidden` states — this is purely JS-managed. Not a brand violation, but fragile. A CSS class `.will-reveal { opacity: 0; transform: translateY(16px); }` would be more aligned with the token-driven architecture.

---

## Iconography

### ⚠️ All feature icons use stroke-based SVG, not fill-based pixel sprites
**Field:** `icon_rules[3]`: "Fill-based, not stroke-based — pixel art uses solid fill shapes."
**Citation:** `index.html:117-186` (feature card icons)
Every feature icon uses `fill="none" stroke="currentColor" stroke-width="2"` paths — classic SVG line-art icons. The brand kit explicitly requires "Fill-based, not stroke-based — pixel art uses solid fill shapes." and "Never use modern icon libraries (Heroicons, Lucide) unmodified."

These icons are not pixel-art sprites; they are generic geometric line drawings. The kit calls for 16×16 pixel grid, 4-color max, no anti-aliasing. A shield icon in the kit would be drawn with filled rectangles (a pixel sprite), not a stroked path.

Examples:
- Library icon: `rect ... fill="none" stroke="currentColor" stroke-width="2"` — stroke-based ❌
- SyncPlay icon: circle + path strokes — stroke-based ❌
- Shield icon: stroked triangles — stroke-based ❌

### ✅ Icons use 32×32 viewBox, color via currentColor
`index.html:117` `viewBox="0 0 32 32" fill="currentColor"` — size grid and CSS color variable usage are correct.

---

## Voice / Copy

### ✅ Game vocabulary used throughout
The site uses brand-kit vocabulary in micro-copy:
- `index.html:196` "Your library awaits. +1 UP." — +1 UP from kit taglines ✅
- `features.html:54` "Quest Complete — All Features Unlocked" ✅
- `features.html:149` "Press Start to Watch." — from `tagline_secondary` ✅
- `about.html:51` "Player 1 Ready" — from `greetings` ✅
- `about.html:124` "Your quest awaits, adventurer." ✅
- `clients.html:51` "Your Party — Every Client Class" ✅
- `download.html:51` "Insert Coin. Begin Story." — primary tagline ✅
- `hub.html:51` "Your World, Connected" — not in kit vocabulary, but contextual ✅
- `plugins.html:102` "The dungeon has loot. Level up your server." ✅
- `docs.html:51` "The Dungeon Map — Documentation" ✅
- `css/components.css:631` "No continues required." in footer — from `tagline_secondary` ✅

### ✅ No `avoid_words[]` detected
Scanning all 8 pages, none of the forbidden words appear: leverage, synergy, utilize, robust, seamless, ecosystem, paradigm, disruption, solution, scalable, bandwidth.

### ⚠️ Footer "No continues required." is correct kit vocabulary
Per `tagline_secondary[3]`, this is explicitly allowed. The "avoid_words" list does not include "continue" — only the verb form "utilize" etc.

### ✅ No smooth/organic/rounded brand opposites
No `border-radius` except 0. No gradients except the 3 kit-approved ones. No blur shadows. No organic shapes. The CRT scanline overlay (`css/base.css:88-94`) is a brand signature element, not a brand opposite.

### ✅ Not photorealistic, not 3D-rendered, not corporate clean
Pure CSS/SVG, no photography, no realistic rendering. Grid-based layout, dark backgrounds, chunky pixel aesthetic maintained.

---

## Brand Opposites Checklist

| Brand Opposite | Status |
|---|---|
| Not smooth, organic, or rounded | ✅ — 0px radius everywhere, steps() easing |
| Not photorealistic or 3D-rendered | ✅ — pure CSS/SVG, no photography |
| Not corporate clean or minimal-white | ✅ — Cartridge Black backgrounds, game vocabulary |
| Not gradient-heavy or blurry | ✅ — only 3 kit-approved gradients, no blur shadows |
| Not sophisticated or serious | ✅ — playful copy, game vocabulary throughout |
| Not high-DPI-obsessed — lo-fi is the goal | ✅ — CRT scanlines, pixel aesthetic |
| Not warm editorial or cinematic | ✅ — no warm photography, no cinematic motion |

---

## Summary of Brand Fidelity Issues

| # | Severity | Category | Finding | Citation |
|---|---|---|---|---|
| 1 | ❌ | Typography | Google Fonts CDN link on every HTML page (8 pages) | `index.html:34-36` et al. |
| 2 | ❌ | Colors | Mario Red used on hover for multiple distinct elements, not reserved for single primary CTA | `css/components.css:274,336,338,51,73,105-108` |
| 3 | ❌ | Heading hierarchy | features.html: feature-detail articles use h2 then h3, skipping h2 in section heading flow | `features.html:63-141` |
| 4 | ❌ | Heading hierarchy | download.html: client cards use h3 (`.client-card__name`) instead of h2 like clients.html | `download.html:75,87,99,111,123` |
| 5 | ⚠️ | Motion | `scroll-behavior: smooth` on html element | `css/base.css:74` |
| 6 | ⚠️ | Iconography | All feature icons use stroke-based SVG, not fill-based pixel sprites | `index.html:117-186` |
| 7 | ⚠️ | SEO/Meta | about.html, clients.html, hub.html missing `<meta name="keywords">` | `about.html`, `clients.html`, `hub.html` `<head>` |
| 8 | ⚠️ | SEO/Meta | JSON-LD on index.html has `operatingSystem: "PHP 8.3+"` which is not a valid Schema.org OS value | `index.html:46` |

**Brand Fidelity Score: 65 / 100**

Critical failures: CDN fonts violate the self-contained deployment requirement; Mario Red is overused across multiple interactive elements diluting its CTA power; heading hierarchy skips levels on features page; client card heading level inconsistent between clients.html and download.html.

The CSS token system, spacing, border-radius, shadow, and motion foundations are solid. The game vocabulary voice is well-executed and the visual opposites check is clean.
