# SITE.md — Cyber Tokyo by Phlix

## Concept & Vision

Cyber Tokyo is the sensory overload of a Tokyo midnight — hot pink kanji signs bleeding
neon into rain-soaked asphalt, electric lime bullet-train streaks against a near-black
violet sky. This site is not a docile marketing page; it is an electric transmission
from the megacity. Every pixel should feel like stepping into Shibuya crossing at 2am
with a media library that never dims.

The product (Phlix) is dressed in this identity: the same self-hostable PHP media server,
the same SyncPlay and DLNA and Live TV, but rendered as if the interface grew from
neon rain and vertical signage.

---

## Aesthetic Direction

**Layout archetype:** `immersive`

Hyper-dense layering with dramatic full-bleed hero sections. Dense card grids with
sharp-cornered Shinjuku Dark surfaces. Racing-stripe dividers in Circuit Green.
Vertical kanji decorative columns as visual texture. The layout never feels sparse —
Tokyo is always full.

**Visual style tags:** Tokyo cyberpunk cinematic · Hyper-dense neon · J-aesthetic
digital glitch · Anime title-card geometry · High-contrast holographic

**Art direction:** Near-black backgrounds erupting with hot pink and electric lime neon,
dense vertical signage, rain-pooled streets reflecting every color at once. Multi-source
practical neon lighting (pink from left, green from below, orange from above). Glitch
displacement and scan-line artifacts at edges and transitions. Never warm, pastoral,
or quiet.

---

## Color Palette

| Role | Name | Hex | Usage |
|------|------|-----|-------|
| Primary | Neon Sakura | `#FF00AA` | CTAs, active states, dominant neon accent |
| Secondary | Circuit Green | `#00FF41` | Links, secondary actions, data readouts |
| Tertiary | Neon Mandarin | `#FF6600` | Badges, ratings, urgency highlights |
| Background | Tokyo Night | `#050308` | Default page background, near-pure black |
| Surface | Shinjuku Dark | `#0D0918` | Card and panel surfaces |
| Surface Alt | Kabukicho Shadow | `#130E20` | Alternate panels, hover states |
| Text | Screen White | `#F0EEF8` | Primary body and headline text |
| Neutral | Smoke Violet | `#6B5C7C` | Muted chrome, dividers |
| Success | Mizu Green | `#00E676` | Confirmations, success states |
| Warning | Amber Kanji | `#FFB300` | Warnings, caution states |
| Error | Danger Pink | `#FF1744` | Errors, destructive actions |
| Info | Hologram Blue | `#00B0FF` | Informational banners |
| Border | Neon Wire | `#2D1F3D` | Card borders, dividers |

**Gradients:**
- **Shibuya Crossing** (135°): `#FF00AA` → `#00FF41` — hero backdrops, splash screens
- **Akihabara Bloom** (radial): `rgba(255,0,170,0.40)` → transparent — hero subject bloom
- **Shinjuku Depth** (180°): `#0D0918` → `#050308` — surface-to-background fade
- **Circuit Stripe** (90°): `#050308` → `#00FF41` → `#050308` — racing-stripe dividers

---

## Typography

| Role | Font | Weight | Usage |
|------|------|--------|-------|
| Headline | Space Grotesk | 700/900 | Page titles, hero headlines — Japanese-influenced geometric |
| Display | Bebas Neue | 400 | Oversized cinematic titles, stat cards — always uppercase |
| Body | IBM Plex Sans | 400/500 | Descriptions, long-form reading |
| UI | IBM Plex Sans | 400/500/600 | Buttons, labels, navigation, chips |
| Mono | IBM Plex Mono | 400/600 | Code, tokens, technical readouts, glitch displays |
| Number | Bebas Neue | 400 | Stats, counters, runtimes |

**Rules:**
- Space Grotesk headlines: bold (700+) only
- Bebas Neue: always uppercase with wide tracking (0.08em)
- Body copy: never all-caps except micro-labels
- Kanji/katakana decorative text: Noto Serif JP or Noto Sans JP (never faked)

---

## Spatial System

**Spacing scale (9 steps):** 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 px

**Max content width:** 1400px, centered

**Corner radii:** 2 / 4 / 6 / 10 / 999px (pill)

**Borders:** 1px solid, sharp corners (no rounded), Neon Wire color

---

## Motion Philosophy

**Motion style:** Fast · Electric · Glitchy · Precise · Energetic

**Speed:** Fast (80–200ms transitions)

**Easing:** `cubic-bezier(0.25, 0, 0, 1)` · `ease-out` · `steps(4, end)`

**Transitions:** rapid glitch cut (3-frame chromatic aberration dissolve), horizontal
scan-line wipe, vertical kanji-rain curtain reveal, neon-sakura flash frame,
bullet-train speed blur

**Hover:** Cards gain 1px Neon Sakura border glow + 2px lift with pink box-shadow
over 120ms ease-out. 2-frame glitch displacement on enter.

**Focus:** 2px Neon Sakura focus ring + 4px outer pink halo, 100ms fade-in.

**Reduced motion:** `prefers-reduced-motion` — replaces glitch-cut with cross-fades,
katakana-rain loaders with static shimmer, retains opacity-based entrance only.

---

## Visual Assets

| Asset | Type | Description |
|-------|------|-------------|
| `img/logo.svg` | SVG | Phlix wordmark + Neon Sakura border + circuit-trace accent |
| `img/favicon.svg` | SVG | Neon Sakura square with white "P" lettermark |
| `img/og.svg` | SVG | 1200×630 social share: dark cyberpunk scene with logo + tagline |
| 7× inline SVG | icon | Library, SyncPlay, Transcode, Shield, Antenna, Broadcast/DLNA, Puzzle, Hub |

---

## Signature Elements (used throughout)

- Vertical kanji/katakana neon signage as visual texture
- Hot pink neon halos bleeding across dark surfaces
- Electric lime racing stripe dividers
- Glitch displacement artifacts on hover states
- Pixel-grid scan-line overlays at low opacity
- Holographic iridescent sheen on primary surfaces
- Vending-machine light rectangles as card motifs
