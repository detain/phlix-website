# SITE.md — Manga Studio (Phlix brand kit)

## Concept & Vision

Manga Studio dresses Phlix in the energy of a professional manga artist's desk at 2 AM — N-pens lined up by nib size, screentone sheets half-applied, speed lines sketched in blue pencil before being inked. Every decision is committed: stark ink-black on brilliant manga-white, spot red and impact yellow used as weapons of emphasis, never decoration. The site should feel like opening a graphic novel — editorial, panel-based, and completely confident.

## Aesthetic Direction

**Layout archetype:** `editorial` — panel-grid based, high-contrast ink on manga-white, bold Black Han Sans headlines, speed-line radial header motif, spot-color CTA blocks.

The aesthetic draws from Weekly Shōnen Jump page layouts, Osamu Tezuka's compositional mastery, Junji Ito's meticulous ink texture, and the raw energy of a working mangaka's atelier. Every page is a panel; every section is a frame.

## Color Palette

| Role | Name | Hex | Usage |
|------|------|-----|-------|
| Primary | Spot Red | `#D0021B` | CTAs, danger, critical emphasis |
| Secondary | Impact Yellow | `#FFD000` | Accents, badges, highlights |
| Tertiary | Screentone Gray | `#C0C0C0` | Mid-tone fills, dividers |
| Background | Manga White | `#F8F8F4` | Page background (never pure white) |
| Surface | Panel White | `#FFFFFF` | Card interiors |
| Surface Alt | Light Screentone | `#EBEBEB` | Alternate rows, inactive states |
| Text | Ink Black | `#0D0D0D` | All text and borders |
| Neutral | Panel Gray | `#5A5A5A` | Secondary body, captions |
| Success | Studio Green | `#00A86B` | Success states |
| Warning | Deadline Orange | `#FF6600` | Warning states |
| Error | Urgent Red | `#B30015` | Errors, destructive actions |
| Info | Blueprint Blue | `#1A5FB4` | Informational banners |

**CSS gradients:**
- `--grad-ink-wash` — Ink Wash: `linear-gradient(180deg, rgba(13,13,13,0.0), rgba(13,13,13,0.55))`
- `--grad-speed-burst` — Speed Burst: `radial-gradient(rgba(255,208,0,0.18), rgba(255,208,0,0.0))`
- `--grad-spot-slash` — Spot Color Slash: `linear-gradient(112deg, #D0021B, #8B0012)`

## Typography

| Role | Font | Fallback | Notes |
|------|------|----------|-------|
| Headline | Black Han Sans 900 | Anton, Impact | Chapter titles, hero headlines |
| Display | Rampart One 400 | Black Han Sans, Impact | Oversized display text |
| Body | Noto Sans JP 400/700 | Hiragino Kaku Gothic Pro | Body copy, captions |
| UI | M PLUS 1p 400/700/800 | Noto Sans JP, system-ui | Buttons, labels, nav |
| Mono | Source Code Pro 400/700 | Courier New | Code, technical |

**Typography rules (from kit):**
- Headlines use Black Han Sans at 900 weight — never reduced below 900
- ALL CAPS only on button labels and short impact callouts
- Body line-length: 58–72 characters
- Dramatic size jumps between hierarchy levels (no timid gradations)
- Negative tracking on headlines for dense manga-title energy

## Spatial System

Spacing scale (4px increments): `4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96` px

Max content width: `1440px`; inner text column: `1200px`

## Motion Philosophy

Manga pacing is sharp cuts and impact moments — slow motion reads as weakness. All motion is **snappy** and **deliberate**:
- Transitions: cut, panel wipe, speed-line push, flash cut, scale impact
- Speed: fast (≤150ms)
- Easing: `ease-out`, `cubic-bezier(0.22, 1, 0.36, 1)`
- Card hover: 3px diagonal translate + hard shadow snap (no scale)
- Focus ring: Spot Red, 2px, instant snap (no fade)
- `prefers-reduced-motion`: honor with instant cuts / fades

## Visual Assets

- **Logo** (`img/logo.svg`): Black Han Sans wordmark in Ink Black on Manga White, inside a hard-edged rectangular panel with Spot Red top accent bar and pen nib mark
- **Favicon** (`img/favicon.svg`): Square Spot Red panel with white inner border and centered white pen nib
- **OG image** (`img/og.svg`): 1200×630 manga editorial card — speed-line radial, white panel, Spot Red accent bar, Black Han Sans PHLIX wordmark
- **Feature icons**: Inline stroke-based SVG, 2px stroke, angular (no rounded caps), Ink Black default, Spot Red for active
- **CSS-only hero effects**: Speed-line radial burst via `repeating-conic-gradient`, ink-wash gradient overlay

## Do/Don't Checklist

**Do:**
- Keep backgrounds to Manga White (#F8F8F4)
- Use Spot Red for exactly one emphasis element per view
- Let Impact Yellow land like a shock — one hit per screen
- Use Black Han Sans at 900 weight for all headlines
- Use hard offset shadows (2–4px) on key UI blocks
- Corner radii near-zero (2–4px) on structural elements

**Don't:**
- Use warm-toned backgrounds or pastel fills
- Mix more than two spot colors in a single panel
- Use slow, bouncy, or springy motion
- Use gradient fills in icons
- Use rounded borders on structural elements beyond 4px
- Use the kit's avoid_words (leverage, synergy, seamless, robust, cutting-edge, cozy, warm, cuddly, wholesome, delightful)

## Signature Motifs

- Speed line radial burst in hero header
- 2px ink-black panel borders everywhere
- Spot Red top accent bar on cards/panels
- Hard offset drop shadows (no blur)
- Screentone dot pattern overlay (CSS `radial-gradient`)
- Impact Yellow star burst on key CTAs
