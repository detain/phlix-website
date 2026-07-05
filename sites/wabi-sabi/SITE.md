# SITE.md — Wabi-Sabi Brand Kit Site

## Concept & Vision

Wabi-Sabi is the Japanese philosophy of finding beauty in imperfection, incompleteness, and impermanence — a cracked raku bowl repaired with gold is more beautiful than it ever was whole. This site embodies that idea: warm rice-paper surfaces, weathered oak type, kintsugi gold as a single precious accent, and the unhurried pace of ink settling in water. Phlix through the Wabi-Sabi lens is a media library that welcomes its imperfections — the half-watched film, the abandoned series, the gaps in the collection. The library itself is a room worth sitting in.

---

## Aesthetic Direction

**Layout archetype:** `immersive` — full-bleed rice-paper sections, generous negative space, asymmetric ikebana-style composition. The site breathes like a quiet Kyoto tea room. Content is sparse and legible; the warm ivory ground is always present.

**Brand essence:** "Warm ivory backgrounds and muted earth tones — never clinical white, never corporate. Sumi ink type on rice paper, kintsugi gold as accent, and forms that wear their age honestly."

---

## Color Palette

| Role | Name | Hex | Usage |
|------|------|-----|-------|
| Primary | Weathered Oak | `#7C5230` | Primary CTAs, active states, dominant links |
| Secondary | Lichen Green | `#4A5E2C` | Secondary actions, moss-on-stone accents |
| Tertiary | Kintsugi Gold | `#C8901A` | **Single** most precious accent — one per screen |
| Background | Rice Paper | `#F5F0E8` | Default page background — warm ivory |
| Surface | Aged Parchment | `#EDE7D8` | Card and panel surfaces |
| Surface Alt | Worn Paper | `#E5DDC8` | Alternate surface, hover states |
| Text | Sumi Ink | `#1A1A14` | All body and headline text — never lightened |
| Neutral | Clay Gray | `#8A7A6A` | Secondary labels, dividers, metadata |
| Border | Stone Seam | `#C8BCAA` | Card borders, dividers — barely visible |
| Success | Bamboo Shoot | `#3D6B35` | Confirmations |
| Warning | Amber Lacquer | `#A0620E` | Caution states |
| Error | Persimmon Red | `#9B2A1A` | Errors, destructive actions |
| Info | Indigo Ink | `#3A5070` | Informational banners |
| Focus | Kintsugi Focus | `#C8901A` | Keyboard focus ring |

### Gradients
- **Washi Fade** — `#F5F0E8` → `#EDE7D8` — subtle page-to-card depth
- **Kintsugi Glow** — radial gold ambient behind featured items
- **Ink Horizon** — `#4A5E2C` → `#7C5230` — dramatic earth-toned hero overlays

---

## Typography

| Role | Font | Weight | Usage |
|------|------|--------|-------|
| Headline | Noto Serif JP | 500, 700 | Page titles, hero headlines — brushwork feel |
| Display | Cormorant Garamond | 300, 400 | Oversized contemplative text, pull quotes — large only (48px+) |
| Body | Lora | 400, 500 | Synopses, descriptions, long-form — 1.75 line-height |
| UI | Noto Sans JP | 400, 500 | Buttons, labels, navigation — never competes with serif voice |
| Mono | Noto Sans Mono | 400 | Timestamps, technical readouts — minimal use |

**Typography rules applied:**
- Headlines: slightly tight tracking (-0.01em), 500 weight for contemplative tone
- Body: generous 1.75 line-height — slow reading, not scanning
- No ALL CAPS anywhere — conflicts with handmade organic feeling
- Cormorant Garamond only at large scale (48px+)

---

## Spatial System

**Spacing scale (px):** `4 8 12 16 24 32 48 64 96`
No off-scale values. Generous whitespace is the composition — do not fill it.

**Max content width:** `1400px`
**Content area width:** `900px`

---

## Motion Philosophy

Motion is ink in water: slow, spreading, settling, unhurried. Nothing bounces. Nothing snaps.

- **Animation speed:** `very_slow` (400–600ms base)
- **Easing:** `ease-in-out`, `cubic-bezier(0.25, 0.1, 0.25, 1.0)`
- **Transitions used:**
  - Ink dissolve (opacity fade with slight blur)
  - Slow settle (translateY 8–12px into position)
  - Soft gold glow expansion
  - Brush-stroke left-to-right reveal (nav logo)
- **No:** spring, bounce, elastic, looping, or instant transitions
- **Micro-interactions:**
  - Cards: background warms + 1px kintsugi border fades in + lifts 2px
  - Buttons: 10% deeper fill on press, clay-like
  - Focus: 2px kintsugi gold ring grows in over 200ms + warm outer glow
  - Loading: thin gold line drawn left-to-right (like a brush stroke)
- **prefers-reduced-motion:** all animations collapse to simple opacity fades

---

## Visual Assets

- **Logo:** Wordmark in Noto Serif JP / Georgia, kintsugi gold crack accent, sumi ink on rice paper
- **Favicon:** Square mark in weathered oak on rice paper with kintsugi crack
- **OG image:** Warm ivory with wordmark, tagline "Nothing lasts. Nothing is lost. Nothing is finished.", kintsugi accents
- **Textures:** Subtle washi paper fiber noise overlay on body, footer, and hero backgrounds
- **Dividers:** Kintsugi gold horizontal gradient lines (1px, fading at edges) — not stone-seam

---

## Signature Elements

- Kintsugi gold crack lines as decorative dividers (not stone-seam borders)
- Washi paper fiber texture on backgrounds (3–4% opacity noise filter)
- Sumi-e ink aesthetic for feature icons (1.5px stroke, rounded, organic weight variation)
- Asymmetric ikebana-style composition — content in lower-left third of hero
- Raku bowl silhouette in empty states (Tsugi the mascot)
- Warm brown shadows (from weathered oak) — never cool gray

---

## Seasonal Variants (documented, not applied)

- **Sakura Drift** (03-20..04-10): tertiary shifts to soft sakura pink (#D4849A)
- **Autumn Maple** (10-10..11-20): primary shifts to persimmon (#8B3A1A), gold to amber
- **Midwinter Still** (01-05..02-10): secondary shifts to cool stone-blue (#3A4E5C)

---

## Sound Identity (brand context only — no audio in static site)

- **Startup chime:** struck singing bowl note, warm and unhurried
- **Notification:** soft wooden block tap
- **UI click:** clay-on-stone contact (raku bowl on tatami)
- **Success:** breath of wind through bamboo
- **Error:** muted ceramic hairline crack
