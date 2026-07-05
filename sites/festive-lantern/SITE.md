# SITE.md — Festive Lantern Brand-Kit Site

## Concept & Vision

Festive Lantern is the glow of a thousand red-silk lanterns ascending into a lacquer-black New Year sky — vermillion and imperial gold against darkness, paper-cut silhouettes swaying in warm firelight, the resonant beat of a festival drum, and the collective joy of a community gathered to celebrate. Every screen should feel like an illuminated festival space — warm, communal, and full of the joy of shared discovery.

## Aesthetic Direction

East Asian lantern festival at the height of celebration. Layered depth: foreground paper-cut silhouettes, mid-ground floating lanterns, background night sky with firework chrysanthemum bursts. Warm omnidirectional lantern-glow lighting — firelight from below, no cold blue fill. Abundant, joyful, alive.

**Layout archetype: Immersive.** Full-bleed festival-festival hero with glowing lantern motifs, midnight indigo surfaces for cards and panels, gold-framed decorative accents throughout.

---

## Color Palette

| Role            | Name              | Hex       | Usage                                      |
|-----------------|-------------------|-----------|--------------------------------------------|
| Primary         | Vermillion Red    | `#C0392B` | Primary CTAs, active states, lantern bodies |
| Secondary       | Imperial Gold     | `#D4A017` | Crown CTA, hero highlights, tassels        |
| Tertiary        | Jade Green        | `#2E8B57` | Badges, nature motifs, success states       |
| Background      | Lacquer Black     | `#0F0A08` | Primary night-sky background               |
| Surface         | Midnight Indigo   | `#1A1228` | Card and panel surfaces                    |
| Surface Alt     | Deep Plum         | `#261631` | Alternate surfaces, hover states           |
| Text            | Pearl White       | `#F5EFE0` | Primary body and headline text            |
| Border          | Ember Gold Line   | `#8B6914` | Card borders, dividers                    |
| Focus           | Gold Glow Focus   | `#D4A017` | Keyboard focus ring                       |
| Success         | Jade Glow         | `#27AE60` | Success toasts, confirmations             |
| Warning         | Lucky Orange      | `#E67E22` | Warnings, caution states                   |
| Error           | Dragon Fire       | `#A93226` | Errors, destructive actions               |
| Info            | Sky Lantern Blue  | `#5DADE2` | Informational banners                     |

**Gradients:**
- `Lantern Sky` — `linear-gradient(170deg, #1A1228, #0F0A08)` — hero section backgrounds
- `Festival Glow` — `radial-gradient(...)` — warm lantern-glow radial behind hero subjects
- `Dragon Parade` — `linear-gradient(135deg, #C0392B, #D4A017)` — accent banners, CTA hover states
- `Jade Mist` — `linear-gradient(180deg, #2E8B57, #1A1228)` — nature section backdrops

---

## Typography

| Role       | Font                  | Weight | Tracking     | Line-height | Usage                          |
|------------|----------------------|--------|--------------|-------------|--------------------------------|
| Headline   | Noto Serif SC        | 700, 900 | -0.01em    | 1.1         | Hero headlines, page titles    |
| Display    | Cinzel Decorative    | 700, 900 | 0.05em      | 0.95        | Oversized numerals, splash     |
| Body       | Noto Serif           | 400, 500 | 0em         | 1.7         | Synopses, long-form reading    |
| UI         | Inter                | 400–600 | 0.01em      | 1.35        | Buttons, labels, nav, chips     |
| Mono       | JetBrains Mono       | 400, 600 | 0.02em      | 1.5         | Code, technical readouts       |

**Rules enforced:**
- Noto Serif SC headlines always bold (700+)
- Cinzel Decorative for short display text only (all-caps)
- Body copy never set in all-caps
- Pearl white text on lacquer black or midnight indigo only

---

## Spatial System

**Spacing scale (px):** 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96

**Max content width:** 1400px (centered)

**Corner radius scale:** 4px · 10px · 18px · 28px · 999px (pill)

---

## Motion Philosophy

**Speed:** Medium (300–400ms transitions)

**Easing:** `ease-out`, `cubic-bezier(0.25, 0.46, 0.45, 0.94)`, spring

**Reveal transitions:** Lantern-rise (float upward into view), silk-fade dissolve

**Micro-interactions:**
- Hover: Cards lift 3px with vermillion-gold glow shadow
- Button press: Gold shimmer sweep left-to-right
- Focus: 2px imperial-gold ring with 4px outer gold halo
- Success: Firework chrysanthemum burst (3–4 gold sparks, then jade check)

**Reduced motion:** Lantern-rise floats replaced with cross-fades; particle effects replaced with static jade check

---

## Visual Assets

- **logo.svg** — Noto Serif SC wordmark on lacquer black, double-line scroll frame with paper-cut plum blossom accents, gold tassel detail
- **favicon.svg** — Square vermillion badge with P monogram and gold accent dot
- **og.svg** — 1200×630 social card: lacquer-black gradient sky with floating lantern silhouettes, Phlix wordmark in Noto Serif SC, "EVERY NIGHT, A CELEBRATION" in Cinzel Decorative, chrysanthemum burst corner accents
- **Inline feature icons** — 32–48px, 1.5px stroke, rounded caps/joins, pearl-white default, imperial-gold for featured states
- **PROMPTS.md** — Exact image generation prompts for all visual assets

---

## Signature Elements

- Red silk lanterns with gold tassels
- Paper-cut silhouettes of dragons, phoenixes, and plum blossoms
- Firework chrysanthemum bursts
- Gold calligraphy brushstroke accents (decorative, not literal characters)
- Cloud-scroll and wave-pattern decorative borders
- Lumen the mascot (anthropomorphic silk lantern) — used in loading/empty states
