# SITE.md — Wabi-Sabi

## Kit
- **Slug:** `wabi-sabi`
- **Archetype:** editorial
- **Base kit:** wabi-sabi (light background)

## Palette (verified against measured contrast table)

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-bg` | `#F5F0E8` | Rice paper — warm ivory background |
| `--color-surface` | `#EDE7D8` | Aged parchment — card surfaces |
| `--color-surface-alt` | `#E5DDC8` | Worn paper — alternate surfaces |
| `--color-text` | `#1A1A14` | Sumi ink — all body/headline text (15.4:1 on bg) |
| `--color-text-muted` | `#8A7A6A` | Clay gray — secondary labels (fails small text; large/UI only) |
| `--color-text-emphasis` | `#3a2010` | Derived warm brown for `<strong>` — clears 4.5:1 on all surfaces |
| `--color-primary` | `#7C5230` | Weathered oak — CTAs, active nav (5.96:1 on bg) |
| `--color-secondary` | `#4A5E2C` | Lichen green — secondary actions (6.32:1 on bg) |
| `--color-tertiary` | `#C8901A` | Kintsugi gold — single precious accent; large text only (3.08:1 on bg) |
| `--color-border` | `#C8BCAA` | Stone seam — borders, dividers |

**Contrast notes:** kintsugi gold (#C8901A) on rice paper = 3.08:1 — **large text/UI only**, never small body text. Clay gray on rice paper = 3.2:1 — **large/UI only**. Both derived substitutes from the measured table.

**`<strong>` emphasis fix (§19.17):** Dual channel — `font-weight: 500` AND `color: #3a2010`. Both are required; weight alone is imperceptible at a 100-unit step.

## Typography

| Role | Family | Weights | Notes |
|------|--------|---------|-------|
| Headline | Noto Serif JP | 500, 700 | `noto-serif-jp-500-latin.woff2`, `noto-serif-jp-700-latin.woff2` |
| Display | Cormorant Garamond | 300, 400 | `cormorant-garamond-300-latin.woff2`, `cormorant-garamond-400-latin.woff2` |
| Body | Lora | 400, 500 | `lora-400-latin.woff2`, `lora-500-latin.woff2` |
| UI | Noto Sans JP | 400, 500 | `noto-sans-jp-400-latin.woff2`, `noto-sans-jp-500-latin.woff2` |
| Mono | Noto Sans Mono | 400 | `noto-sans-mono-400-latin.woff2` |

All fonts from `shared/assets/fonts/`. No external CDN.

## Navigation

| Label | Emphasis | Page |
|-------|----------|------|
| The Library | default | index.html |
| Craft | **primary** | features.html |
| Vessels | default | clients.html |
| Begin | **primary** | download.html |
| The Gateway | default | hub.html |
| The Path | muted | about.html |

Demoted to footer: plugins.html, docs.html.

## Homepage sections (in order)

1. `#kintsugi-crack` — hero with kintsugi crack SVG growing across rice paper
2. `#the-craft` — 2 featured features on worn-paper cards
3. `#why-imperfection` — brand story as long paragraph
4. `#proof-of-presence` — trust-signal band (live GitHub links, no fabricated numbers)
5. `#receive-the-gift` — Begin CTA

## Seasonal activation
- live-js mode; dates checked at load against 3 seasonal ranges
- Sakura Drift (03-20..04-10): tertiary → #D4849A, surfaces shift pink
- Autumn Maple (10-10..11-20): primary → #8B3A1A, tertiary → #C05A10
- Midwinter Still (01-05..02-10): bg → #F2EEE8, secondary → #3A4E5C

## Easter egg
- `scroll-past-footer` → ink brushstroke SVG appears at bottom-right, fades after 6s
- Disabled while focus in input/textarea/contenteditable (no preventDefault)
- Esc exits the brushstroke

## Mascot (Tsugi)
- Raku bowl with kintsugi gold crack lines — simple inline SVG
- Fixed bottom-right on ≥768px; in-flow on <768px (never covers CTA at 320px)
- Tips on: `#hero`, `.features-overview`, `#server`, `.faq-list`
- Click:5 → settle deeper; hover-hold:2s → gold brushstroke appears
- Dismiss persists via localStorage key `phlix_wabisabi_mascot_dismissed`

## Install command
Pulled verbatim from `content.json.install.primary.command`:
```
curl -fsSL https://raw.githubusercontent.com/detain/phlix-server/master/scripts/install.sh | sudo bash
```

## Licence (exact fact from content.json)
Phlix Server and the Hub are MPL-2.0. The shared libraries, plugins, and clients are MIT. Never state one licence "across the board."
