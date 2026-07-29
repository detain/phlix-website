# Site Design — deep-abyss

## Concept & Vision

deep-abyss is the Mariana Trench of Phlix brand kits. Where other kits offer light, air, and accessibility, deep-abyss goes the opposite direction: into the crushing darkness of the hadal zone, where bioluminescent creatures thrive without a trace of sunlight. This is media hosting taken to its most elemental extreme — software that runs where nothing else can, in conditions that should kill it but don't.

The aesthetic is **abyssal-dark with bioluminescent accent**. The primary background is near-black ocean; the accent is the cold cyan glow of deep-sea life. This is not a cozy kit — it is a serious, high-pressure, almost threateningly competent kit. It says: *your media runs here, in the deepest part of your network, where the pressure is highest and the temperature is lowest*.

---

## Aesthetic Direction

**Reference point:** Deep ocean documentary cinematography — BBC Blue Planet II's hadal zone sequences. Bioluminescent jellies, anglerfish lures, the absolute absence of solar light.

**Mood:** Deep, quiet, alien competence. Not welcoming — fascinating. Like looking at footage from a remotely-operated vehicle at 10,000 meters depth.

**What it is NOT:** This is not a "space" or "cosmic" theme with purple nebulae. It is specifically ocean: the movement, the lighting quality, the sense of vast pressure from above.

---

## Color Table

| Role | Name | Hex | Usage |
|------|------|-----|-------|
| Background | Abyssal black | `#000510` | Page background, nav, footer |
| Surface | Trench navy | `#001122` | Cards, code blocks, section backgrounds |
| Mid | Midnight blue | `#004488` | Borders, decorative gradients, secondary elements |
| Accent | Bioluminescent cyan | `#00CED1` | CTAs, links, icons, glows, active states |
| Text | Hadal white | `#F5F5F5` | Headings, body copy |
| Text muted | Deep current | `#8fa8c0` | Secondary text, captions, meta |

---

## Typography

**Display font:** Georgia / Times New Roman — a serif that reads like a deep-vessel instrument panel. Familiar but serious.

**Body font:** Helvetica Neue / Source Sans Pro — clean, neutral sans-serif for maximum legibility in body text.

**Mono font:** Fira Code / Courier New — for code blocks and technical strings.

No external font CDN — self-hosted via the shared font pool. See `shared/assets/fonts/` and `shared/data/font-sources.json`.

---

## Spatial System

| Token | Value | Usage |
|-------|-------|-------|
| `--space-1` | 0.25rem | Tight gaps |
| `--space-2` | 0.5rem | Small padding |
| `--space-3` | 0.75rem | List item gaps |
| `--space-4` | 1rem | Base unit |
| `--space-6` | 1.5rem | Card padding |
| `--space-8` | 2rem | Section gaps |
| `--space-12` | 3rem | Large section padding |
| `--space-16` | 4rem | Hero/section spacing |
| `--space-24` | 6rem | Major section breaks |

**Max content width:** 1400px (centered).

**Nav height:** 72px (sticky).

---

## Motion Philosophy

**Guiding principle:** Slow, purposeful, inevitable — like a deep current. Nothing snaps or bounces. Everything drifts and settles.

- **Entrance animations:** Fade-up from opacity 0, 500ms ease, staggered 80ms between cards
- **Hover states:** Subtle translateY(-4px) lift, border glow intensifies — like a creature rising slightly in the water column
- **Nav toggle:** Smooth slide-in from right, 300ms
- **CTA glow:** box-shadow pulse on primary buttons — bioluminescent pulse
- **FAQ marker:** + rotates 45° to × on open, 300ms

**Reduced motion:** All animations collapse to instant under `prefers-reduced-motion`. Cards appear immediately at final position.

---

## Visual Assets

### Logo (img/logo.svg)
- Abstract wave/fish mark using the bioluminescent cyan gradient
- Outer ring suggesting a sonar ping or pressure wave
- Inner wave paths suggesting a fish silhouette with an eye
- Wordmark in serif (Georgia) with slight letter-spacing
- Filter applied for subtle glow effect

### Favicon (img/favicon.svg)
- 32×32 square, rounded corners (rx=6)
- Dark background (#000510)
- Simplified version of the logo mark: concentric circle + wave paths + eye dot
- Monochrome cyan on near-black

### OG Image (img/og.png)
- 1200×630 raster image
- Deep ocean background gradient
- Phlix wordmark centered
- Hero headline: "Your media. Your library. Your Phlix."
- Generated via `node tools/gen-og.mjs --site deep-abyss`

### Inline SVG Icons
Eight feature icons, all stroke-based, single-color cyan (#00CED1):
1. **library** — stacked bars with vertical line (content organization)
2. **syncplay** — circle with clock hands (time sync)
3. **transcode** — layered chevrons (quality layers)
4. **shield** — shield outline (authentication)
5. **antenna** — broadcast signal arcs (live TV)
6. **broadcast** — music note with waves (DLNA/audio)
7. **puzzle** — 3D puzzle piece (plugins)
8. **hub** — radiating sun/signal lines (hub connectivity)

### Background Atmosphere
Multi-layer CSS radial gradients:
- Large ellipse at top (midnight blue glow) — suggesting faint light from above
- Smaller ellipse at bottom-right (bioluminescent cyan, very subtle) — life in the dark
- Central darkening radial — the crushing pressure of the abyss

---

## Component Notes

### Cards (feature-card, client-card, download-card)
- Background: rgba(0, 17, 34, 0.6) — a slightly lighter surface than the abyss
- Border: 1px solid rgba(0, 206, 209, 0.1) — barely visible, like pressure
- On hover: border brightens to 0.4 alpha, box-shadow glow appears

### Code Block
- Dark surface background with cyan border
- Monospace font, 0.9rem
- Line numbers not shown (keeps it clean)

### FAQ (<details>/<summary>)
- Native HTML elements, no JS required
- CSS-only marker rotation for open/close
- Clean, no JavaScript dependency

### CTA Banner
- Gradient background (midnight blue to cyan tint)
- Centered text, single primary CTA
- Horizontal rule effect via border-top/border-bottom in cyan tint

---

## Responsive Behavior

| Breakpoint | Layout change |
|------------|---------------|
| >900px | Full nav, 3-column footer |
| ≤900px | Hamburger toggle, slide-in nav panel |
| ≤768px | Single-column footer, hero min-height reduced |

Grid columns use `minmax(0, 1fr)` to prevent overflow at narrow widths. All long words (including technical identifiers like `LifecycleInterface`) use `overflow-wrap: anywhere` to prevent clipping.

---

## WCAG Compliance Notes

- Cyan (#00CED1) on near-black (#000510) achieves >7:1 contrast ratio — passes AAA
- Muted text (#8fa8c0) on dark surface (#001122) achieves ~4.6:1 — passes AA
- All interactive elements have visible focus rings (2px solid cyan, 3px offset)
- Touch targets meet 44×44px minimum

---

## Integrity Checklist

- [x] All 8 pages + 404.html
- [x] CSS in 3 files (base, theme, components)
- [x] Self-hosted fonts (Georgia, Source Sans Pro, Fira Code from shared pool)
- [x] No Google Fonts CDN
- [x] No external JS dependencies
- [x] `@copyright` inside /* */ blocks only
- [x] Grid tracks use `minmax(0, 1fr)` — not bare `1fr`
- [x] 4 native clients + DLNA (never "5" or "Five")
- [x] All 8 features from content.json
- [x] All 6 FAQ items from content.json
- [x] Footer: 3 columns + "Open-source media, on your terms."
- [x] OG + Twitter meta on every page, all absolute URLs
- [x] `twitter:creator=@detain` on all pages
- [x] Install command in hero CTA of index.html AND download.html
- [x] FAQ uses `<details>/<summary>` elements
- [x] robots.txt + sitemap.xml (404 excluded)
- [x] SITE.md + BUILD_LOG.md
