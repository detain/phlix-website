# SITE.md — Día de Muertos Brand Kit Site

## Concept & Vision

A Phlix marketing site that feels like standing in a glowing ofrenda altar at midnight — deep purple-black darkness lit by the warm blaze of cempasúchil marigold gold, papel picado purple, and the pink of a painted sugar skull. This is not Halloween horror. It is the joyful Mexican celebration of Día de Muertos: death as reunion, remembrance as celebration, darkness as the altar cloth that makes the offerings glow.

Every screen should feel like looking into an ofrenda — layered, luminous, alive with memory and color. The product (a media server) is honored the way ancestors are honored: with warmth, beauty, and an open invitation to return.

---

## Aesthetic Direction

**Mood:** Candlelit cemetery at midnight during Día de Muertos — not spooky, not macabre, but warm, celebratory, and deeply human. The deep dark exists only to make the gold burn brighter.

**Reference:** Oaxaca cemetery on November 1st, ten thousand candles lit, marigold petals spread from grave to altar, papel picado flags cutting the night sky in purple and pink.

**Art direction:** Ofrenda altar composition — layered tiers from earth to heaven. Warm candlelight and marigold gold as the only light sources. Sugar skull motifs that are ornate, smiling, flower-crowned — never scary.

---

## Color Palette (role → name → hex)

| Role              | Name                  | Hex       | Usage                                      |
|-------------------|-----------------------|-----------|--------------------------------------------|
| Primary           | Cempasúchil Gold      | #FFB800   | Primary CTA, key nav, active states        |
| Secondary         | Papel Picado Purple   | #CC00BB   | Secondary actions, links, decoration       |
| Tertiary          | Calavera Pink         | #FF3355   | Sugar skull accents, badges, emotional emphasis |
| Background        | Midnight Cemetery     | #0C0512   | Default page background                    |
| Surface           | Ofrenda Shadow        | #130820   | Cards and panel surfaces                  |
| Surface Alt       | Altar Dark            | #1A1030   | Alternate panels, hover states             |
| Text              | Candlelight White     | #FFF0E8   | Primary body and headline text             |
| Neutral           | Incense Mauve         | #5A4070   | Muted chrome, dividers, secondary text     |
| Success           | Marigold Bloom        | #E8A000   | Success toasts, confirmations              |
| Warning           | Candle Flame          | #FF7A00   | Warnings, caution states                   |
| Error             | Copal Ember           | #E5154E   | Errors, destructive actions                |
| Info              | Altar Teal            | #00C9B1   | Informational banners                      |
| Focus             | Marigold Focus Pulse  | #FFB800   | Keyboard focus ring                        |
| Border            | Petal Shadow          | #2D1845   | Card borders, dividers                     |
| Overlay           | Cemetery Night        | rgba(12,5,18,0.82) | Modal scrims                         |

### Gradients
- **Ofrenda Glow:** `#CC00BB → #FFB800` at 175° — hero backdrops, dramatic breaks
- **Marigold Candle:** radial `rgba(255,184,0,0.40) → transparent` — candlelight glow behind hero subjects
- **Cemetery Depth:** `#1A1030 → #0C0512` at 180° — surface-to-background fade

---

## Typography

| Role      | Font                   | Weight   | Usage                               |
|-----------|------------------------|----------|-------------------------------------|
| Headline  | Playfair Display       | 700, 900 | Dramatic page titles, hero          |
| Display   | Cinzel Decorative      | 400, 700 | Oversized display, calavera title cards, section headers |
| Body      | Lora                   | 400, 500 | Synopses, long-form reading         |
| UI        | IBM Plex Sans          | 400–600  | Buttons, labels, navigation         |
| Mono      | IBM Plex Mono          | 400, 600 | Code, technical readouts            |
| Number    | Cinzel Decorative      | 700      | Stats, episode numbers              |

**Rules applied:**
- Playfair Display headlines must be bold (700+) — never thin
- Cinzel Decorative is display-only (title cards, hero stats)
- Body copy (Lora) never set in all-caps
- Display tracking: 0.08em (Cinzel Decorative rewards breathing room)

---

## Spatial System

**Spacing scale (8pt grid):** 4, 8, 12, 16, 24, 32, 48, 64, 96px

**Corner radius:** 4 (sm), 8 (md), 16 (lg), 24 (xl), 999px (pill)

**Max content width:** 1400px; content zone: 1100px

**Layout archetype:** `immersive` — full-bleed hero with Cinzel Decorative headline over ofrenda-glow gradient → feature sections on cemetery/ofrenda-shadow alternating → gold CTA banners

---

## Motion Philosophy

Motion should feel like candlelight — warm, flickering, alive, organic, never mechanical.

- **Animation speed:** medium (280–450ms for major transitions)
- **Easing:** `ease-in-out` primary; `cubic-bezier(0.34, 1.56, 0.64, 1)` for decorative/celebratory moments
- **Transitions:** petal fall, candle flame dissolve, papel picado unfurl, altar slide-up
- **Hover microinteraction:** 1px gold border glow + 3px lift with marigold box-shadow
- **Focus:** 2px gold ring with 4px warm outer glow
- **Loading:** floating marigold petals falling gently
- **`prefers-reduced-motion`:** replace petal-fall with static skeleton shimmer; retain only opacity-based fades

---

## Visual Assets

### Generated SVG artwork
- **`img/logo.svg`** — Cinzel Decorative wordmark in cempasúchil gold on midnight cemetery, papel picado geometric border, arch-topped panel echoing ofrenda altar niche form
- **`img/favicon.svg`** — 8-petal marigold flower in gold with calavera pink center on midnight background
- **`img/og.svg`** — 1200×630 social share card: midnight background with warm marigold radial glow, papel picado border pattern, "Phlix" in Cinzel Decorative gold, tagline "Remember. Celebrate. Live."

### Inline SVG icons (7 feature icons)
All icons: outlined, 1.5px stroke, rounded caps/joins, cempasúchil gold active state, candlelight white default.

1. **library** — stack of horizontal lines (film reel / library)
2. **syncplay** — circle with clock hands (time sync)
3. **transcode** — 3D box/diamond (transcoding pipeline)
4. **shield** — classic shield (auth/security)
5. **antenna** — radiating signal lines (Live TV/antenna)
6. **broadcast** — DLNA broadcast/wifi-style signal
7. **puzzle** — puzzle piece (plugin system)
8. **hub** — circle with radiating spokes (Hub relay)

---

## Component Inventory

### Buttons
- **Primary:** `#FFB800` bg, `#0C0512` text, 8px radius — cempasúchil gold CTA
- **Secondary:** transparent bg, `#CC00BB` border/text — papel picado purple ghost
- **Ghost:** transparent bg, `#FFF0E8` text, 1px `#2D1845` border
- **Danger:** `#E5154E` bg — copal ember for destructive actions
- **FAB:** `#FFB800` bg, `#0C0512` text, rounded-lg, marigold glow shadow

### Cards
- Background: `#130820` (Ofrenda Shadow)
- Border: 1px `#2D1845`
- Border-radius: 8px
- Hover: 1px `#FFB800` border + `var(--shadow-marigold)` box-shadow + 3px lift
- Featured cards get papel picado pattern overlay at low opacity

### Badges
- Quality badges (4K/HDR/Dolby Vision): gold border + gold text on transparent
- Status badges (New/Continue Watching): papel picado purple
- Favorite badge: calavera pink

### Navigation
- Sticky header with `backdrop-filter: blur(12px)` on `rgba(19,8,32,0.92)`
- Active link: cempasúchil gold color + bold weight
- Mobile: hamburger toggle → full-width dropdown on midnight cemetery background

### Footer
- Footer tagline in Cinzel Decorative cempasúchil gold
- 3-column grid (Product / Developers / Project)
- Warm dividers, copyright in incense mauve

---

## Branding rules applied

- ✅ Midnight cemetery (#0C0512) and ofrenda shadow (#130820) used for all backgrounds — never neutral black
- ✅ Cempasúchil gold (#FFB800) reserved for primary CTA only
- ✅ At most two vivid accent colors per screen — gold first, purple or pink second
- ✅ Paple picado purple and calavera pink appear with careful balance
- ✅ Never: cool blue, grey, white as accent colors
- ✅ Warm marigold glow via CSS box-shadow, not images
- ✅ WCAG AA met: candlelight white on midnight cemetery = 18.2:1 contrast
- ✅ All animations respect `prefers-reduced-motion`
- ✅ Catrina mascot described in imagery art direction; no actual mascot imagery added to avoid版权 concerns for initial build

---

## Anti-patterns explicitly avoided (from brand_opposites)
- ❌ Halloween horror, gore, or macabre imagery
- ❌ Cold, clinical, or minimalist design
- ❌ Monotone or desaturated palette
- ❌ Fast-food festive (cheap disposable color)
- ❌ Generic "Mexican restaurant" clichés
- ❌ Somber or mournful atmosphere
- ❌ Corporate, flat, or impersonal design
- ❌ Horror-related skull imagery (Western skull-and-crossbones)

---

## Fonts (self-hosted)

Fonts must be self-hosted as WOFF2 in `css/fonts/`. The following need to be acquired:
- Playfair Display 700, 900
- Cinzel Decorative 400, 700
- Lora 400, 500
- IBM Plex Sans 400, 500, 600
- IBM Plex Mono 400, 600

Use `tools/download-fonts.mjs` to fetch from Google Fonts or acquire separately.

**Note:** Until fonts are self-hosted, the CSS falls back to the native stack defined in `font-family` — the site is fully readable and on-brand with fallbacks.
