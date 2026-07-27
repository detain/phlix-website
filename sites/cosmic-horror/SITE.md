# SITE.md — Cosmic Horror Brand Kit Site

## Concept & Vision

The Cosmic Horror brand kit transforms Phlix into something that has always been watching. The site does not invite the visitor — it acknowledges their presence with ancient, patient awareness. Every element exists at the edge of perception: almost correct, almost familiar, carrying the subtle wrongness of something that arrived from somewhere the light does not reach. The archive is open. What you do with it is your concern.

## Layout Archetype

**Immersive** — full-bleed void hero with phosphorescent R'lyeh Rising gradient, cyclopean architecture depth suggested through composition and CSS gradients rather than raster imagery. Features and content emerge from absolute darkness. The architecture extends beyond what the screen can contain. Dense academic information layout, eldritch-green single accents cutting through void-black depths.

## Aesthetic Direction

Lovecraftian cosmic horror. The universe is vast, ancient, indifferent, and populated by entities whose existence human minds cannot fully comprehend. The palette is void-black, eldritch phosphorescent green, void purple, and the particular wrongness of colours between. Typography carries the weight of things older than the institution that preserved it. Motion is subtle and wrong — elements do not move as they should.

## Color Table (Measured)

| Role | Name | Hex | Ratio on #04000A | Usage |
|------|------|-----|-----------------|-------|
| Primary | Eldritch Green | `#00CC66` | 9.74:1 ✅ AA | Primary CTAs, active states, phosphorescent accent |
| Secondary (safe) | Void Purple safe | `#8b66b3` | ~6:1 ✅ AA | Secondary structural accents (original `#3D0080` fails at 1.50:1) |
| Tertiary | Blood Deep | `#660000` | — | Destructive actions, critical errors |
| Background | Cosmic Void | `#04000A` | — | Page background — darkness between stars |
| Surface | R'lyeh Dark | `#080014` | — | Card and panel surfaces |
| Surface Alt | Non-Euclidean Shadow | `#0C0520` | — | Nested panels, hover states |
| Text | Corrupted White | `#C8D8C0` | 13.91:1 ✅ AAA | All body and headline text |
| Border | Obsidian Veil | `#1A0A2E` | — | Card borders, dividers |
| Success | Phosphor Pulse | `#00AA44` | — | Success states |
| Warning | Sallow Amber | `#CC8800` | — | Caution states |
| Error | Ritual Crimson | `#990011` | — | Error states |
| Focus | Eldritch Pulse | `#00CC66` | — | Keyboard focus ring |

**Contrast note:** Kit's original `#3D0080` Void Purple measures only 1.50:1 on Cosmic Void — failing AA for small text. Safe substitute `#8b66b3` (~6:1) used where secondary color appears as text. Applied per §19.1 and measured table from kit-brief.

## CSS Gradients

| Name | Type | Stops | Usage |
|------|------|-------|--------|
| R'lyeh Rising | linear | `rgba(0,204,102,0.18)` → `#04000A` 180° | Hero backdrops |
| Cosmic Rift | radial | `rgba(61,0,128,0.40)` → `rgba(4,0,10,0.0)` | Cosmic background accents |
| Abyssal Depth | linear | `#080014` → `#04000A` 180° | Surface-to-background fade |
| Forbidden Manuscript | linear | `#0C0520` → `#080014` 145° | Section break gradients |

## Typography Roles

| Role | Family | Weights | Tracking | Line Height | Usage |
|------|--------|---------|----------|-------------|-------|
| Headline | Cinzel | **700, 900** (only declared weights used) | 0.05em | 1.1 | Page titles, hero headlines — monumental, carved |
| Display | Uncial Antiqua | 400 (only) | 0.02em | 1.0 | Oversized eldritch display text, illuminated headers |
| Body | Crimson Text | **400, 600** (strong=600 per kit) | 0.01em | 1.7 | Descriptions, synopses, long-form reading |
| UI | EB Garamond | **400, 500, 600** (no 700 — kit caps at 600) | 0.02em | 1.35 | Buttons, labels, navigation, chips |
| Mono | Courier Prime | 400, 700 | 0.03em | 1.6 | Code, technical readouts |
| Number | Cinzel | 700 | 0.04em | 1.0 | Stats, counters, runtimes |

**Font source:** Self-hosted WOFF2 from `shared/assets/fonts/` pool (referenced as `../../assets/fonts/`). No CDN. All 5 families present in pool: cinzel-700/900, uncial-antiqua-400, crimson-text-400/600, eb-garamond-400/500/600, courier-prime-400/700.

**Typography rules applied:**
- Cinzel headlines bold (700+) — weight is structural
- Uncial Antiqua display only, never at body size
- `<strong>` uses `font-weight: 600` (Crimson Text 600 face — declared and in pool)
- Headline tracking at 0.05em — letters carved one by one
- Body copy left-aligned (academic tradition)
- `overflow-wrap: anywhere` on body text for narrow-track wrapping per §19.12

## Spatial System

Spacing scale (px): `4, 8, 12, 16, 24, 32, 48, 64, 96`

All margins, padding, gaps use only these steps. Darkness between elements reads as depth.

## Motion Philosophy

Slow and wrong. Everything moves slightly too slowly, as if disturbed rather than activated. Nothing bounces. Nothing springs. Transitions use `cubic-bezier(0.0, 0.0, 0.2, 1)` (ease-in) and `ease-in`. Speed is geological: 350–600ms.

**`prefers-reduced-motion`:** All animations and transitions disabled via `animation-duration: 0.01ms` and `transition-duration: 0.01ms` on `.reduce-motion` class (applied via JS change listener, not just initial read — Trap 20).

Microinteractions applied:
- Cards: 1px eldritch-green border + phosphorescent glow on hover, 400ms ease
- Buttons: brief dim to 80% opacity on press (inverse of normal feedback)
- Focus: 2px eldritch-green ring with 4px void offset + outer glow (both shadows in one list per Trap 1)
- Success: eldritch-green expansion settling to static

## Visual Assets

| Asset | Description |
|-------|-------------|
| `img/logo.svg` | Cinzel bold wordmark on Cosmic Void with eldritch sigil mark |
| `img/favicon.svg` | Sigil mark in Eldritch Green on Cosmic Void |
| `img/og.png` | 1200×630 social card — generated from og.svg |
| `img/PROMPTS.md` | Exact image generation prompts |
| Inline SVG icons | 8 feature icons (library, syncplay, transcode, shield, antenna, broadcast, puzzle, hub) — 1.75px stroke, sharp, Corrupted White default, Eldritch Green active |

## Experience Fields Implemented

All 20 declared experience fields are observably implemented:

| Field | Implementation |
|-------|----------------|
| `site_architecture` | 6-item primary nav (The Archive Opens, Catalog of Things, The Watchers, Descending Below, The Relay, What We Know) + demoted plugins/docs in footer |
| `homepage_narrative` | 5 sections: threshold (hero), the-catalog (features), why-descending (story), the-witnesses (proof), the-summons (CTA) |
| `page_blueprints` | Hero, catalog grid, proof blocks, funnel CTA |
| `copy_overlay` | Kit tagline_primary as hero H1, kit voice on micro-copy |
| `feature_casting` | 2 hero features (library, syncplay) + 6 support features |
| `copy_treatments` | Pitch bullets, FAQ, clients rendered in kit component style |
| `faq_experience` | Ordered by content.json, framed with kit voice |
| `hero_experience` | Slow phosphorescent pulse, cosmic-rift radial gradient, staggered fade-rise animation |
| `navigation_model` | Standard accessible topbar (enhancement layer deferred for accessibility) |
| `scroll_experience` | IntersectionObserver fade-ins, geological pace, reduced-motion respected |
| `easter_eggs` | `typed-word:colour` (disabled in inputs, Esc exits, no preventDefault) + `logo-clicks:7` |
| `conversion_funnel` | 3-rung ladder on home + download page CTA |
| `proof_strategy` | Signals with live links (/stargazers, /contributors, /issues) — no fabricated numbers |
| `visitor_paths` | Null — single curated path |
| `experience_archetype` | `immersive` |
| `complexity_profile` | density=standard, reading_level=general, jargon=translate, 5 sections max, 120 words/section |
| `intensity_toggle` | Null |
| `seasonal_activation` | "documented" — date awareness in JS, no live token flip |
| `error_page_experience` | 404.html with eldritch eye motif, recovery links (home, features, download), noindex, relative paths |
| `persona_vignettes` | Seeded img/PROMPTS.md |
| `mascot.behavior` | Nyarla companion — in flow on mobile, fixed bottom-right on desktop, dismiss to localStorage, tips on hover |

## Signature Elements

- Eldritch sigil in mascot companion
- Cosmic Rift radial gradient in hero
- Bioluminescent green pulse on hover states
- Sharp-cornered cards (1–2px radius)
- Phosphorescent glow box-shadows on interactive elements
- The cyclopean arch/eye motif in logo

## Responsive Behavior

| Breakpoint | Layout |
|------------|--------|
| Desktop ≥1024px | Multi-column, eldritch-glow hover effects, max 1400px centered |
| Tablet 768–1023px | 2–3 column grids, 48px min touch targets |
| Mobile <768px | Single column, full-width, nav collapses to hamburger |

`minmax(0, 1fr)` grid tracks throughout (Trap 12). `overflow-wrap: anywhere` on body text. No `overflow: hidden` on containers with reflow text.

## Sound Identity

Documented for brand consistency in other contexts. No audio in deployed site.
