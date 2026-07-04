# SITE.md — Nordic Saga Design Rationale

## Concept & Vision

Nordic Saga dresses Phlix in the visual and narrative language of Norse mythology and the Viking Age. The brand is forge fire burning against winter dark — the single most important contrast in the Norse visual world. Every screen should feel like the hall before the feast, the moment before the saga is told. The brand name (Nordic Saga) is the identity Phlix is dressed in; the product is still Phlix.

The brand DNA is: *"Nordic Saga is forge fire against winter dark — the single most important contrast in the Norse visual world. Fjord Night backgrounds swallow all casual light; Forge Fire orange cuts through only where the action demands it."*

---

## Aesthetic Direction

**Archetype:** Hero — epic, declarative, weighty

**Moodboard anchors:**
- Oseberg ship burial — intricate knotwork carved into oak
- Runestones of Scandinavia — painted runes on ancient granite
- Yggdrasil, the world-ash tree binding the Nine Worlds
- Odin's ravens Huginn and Muninn — thought and memory
- Thor's hammer Mjolnir — the thunderstrike of divine craft
- Valhalla's mead-hall — eternal feast lit by torchlight

**Visual style tags:** Norse mythology and Viking Age, Runestone aesthetic, Nordic knotwork and interlace, Saga epic illustration, Forge and iron craft

**Art direction:** Dark winter backgrounds — the deep blue-black of a fjord at night — split by the orange-red heat of a forge fire or the cold blue gleam of a drawn blade. Bold, symmetrical compositions anchored by mythological subjects. Line work feels carved, not drawn. Knotwork interlace appears in borders and texture, never as wallpaper.

**Rendering style:** woodcut, linocut, vector, illuminated manuscript — semi-realistic, heavy texture, layered depth

**Lighting:** Forge-fire warm practicals against cold ambient winter blue. Deep and directional shadows cast by torchlight and forge glow. High contrast. The world is winter, dusk, or deep night — the fire is everything.

---

## Color Palette

| Token | Name | Hex | Usage |
|-------|------|-----|-------|
| `--color-primary` | Forge Fire | `#C8700A` | Primary CTAs, active states, the dominant forge-warm accent |
| `--color-secondary` | Fjord Steel | `#4A8FB5` | Secondary actions, links, cold-sea and blade accents |
| `--color-tertiary` | Rune Violet | `#8B6DC8` | Mystical accents — seidr, prophecy, rune magic |
| `--color-bg` | Fjord Night | `#060C12` | Default page background |
| `--color-surface` | Storm Sea | `#0A1320` | Card and panel surfaces |
| `--color-surface-alt` | Deep Current | `#101C2C` | Alternate surface for nested panels, hover states |
| `--color-text` | Bone White | `#E8E0D0` | Primary body and headline text |
| `--color-neutral` | Iron Dust | `#5A6070` | Muted UI chrome, dividers |
| `--color-border` | Cold Iron | `#1E2D3E` | Card borders, dividers |
| `--color-focus` | Forge Focus | `#C8700A` | Keyboard focus ring |
| `--color-success` | Verdant Moss | `#4A9B6F` | Success states |
| `--color-warning` | Amber Ember | `#E08B20` | Warnings |
| `--color-error` | Blood Iron | `#C0392B` | Errors, destructive actions |

**Gradients:**
- `Forge Horizon`: linear 160deg, #C8700A → #8B6DC8 — hero backdrops, dramatic section breaks
- `Forge Halo`: radial, rgba(200,112,10,0.32) → rgba(6,12,18,0.0) — warm radial behind hero/CTA
- `Sea Depth`: linear 180deg, #0A1320 → #060C12 — subtle depth fade in panels/cards

---

## Typography

| Role | Family | Weights | Tracking | Usage |
|------|--------|---------|---------|-------|
| Headline | Cinzel | 700, 900 | 0.05em | Dramatic page titles, saga chapter headings |
| Display | Uncial Antiqua | 400 | 0.08em | Oversized display text, splash title cards, runestone-style labels |
| Body | Merriweather | 400, 700 | 0em | Descriptions, synopses, long-form reading |
| UI | Cinzel | 400, 600 | 0.06em | Buttons, labels, navigation |
| Mono | Source Code Pro | 400, 600 | 0.02em | Code, tokens, runtime counters |
| Number | Cinzel | 700 | 0.04em | Stats, watch counts, dashboard figures |

**Typography rules enforced:**
- Cinzel headlines and UI labels must be heavy (600+) — the rune demands weight
- Uncial Antiqua display text used sparingly: hero moments only
- Body copy (Merriweather) never set in all-caps
- Headline tracking is open (0.05em) — the carved letter needs space
- Avoid centered body copy blocks; left-align for saga-scroll readability
- Never use geometric sans-serif fonts — the brand is rooted in ancient letterforms

---

## Spatial System

**Spacing scale (9 steps, only these values):** 4, 8, 12, 16, 24, 32, 48, 64, 96 px

**Corner radius scale:** 2px (sm), 4px (md), 8px (lg), 16px (xl), 999px (pill)

---

## Motion Philosophy

Motion is **elemental and deliberate** — it moves like water, iron, or stone. Bouncy animation destroys the mythic weight.

- **Style:** Weighty, deliberate, epic, elemental
- **Speed:** Slow — transitions run 300–600ms
- **Easing:** `cubic-bezier(0.4, 0, 0.2, 1)`, `cubic-bezier(0.7, 0, 0.3, 1)`, `ease-in-out`
- **Transitions:** slow horizontal wipe (longship parting fog), stone-door fade, rune-burn reveal, forge-spark scatter, deep cross-fade
- **Hover microinteraction:** cards gain 1px Forge Fire border and lift 4px with forge-warm glow shadow over 250ms
- **Button press:** dims to 80% brightness then rebounds over 180ms
- **Loading:** rune sequence trace animation in Forge Fire
- **Focus:** 2px Forge Fire ring with 4px forge amber outer glow

**Reduced motion:** Honor `prefers-reduced-motion: reduce` — replace rune-burn reveals with instant opacity fades, weight-easing transitions with standard cross-fades.

---

## Visual Assets

- **Logo:** Cinzel bold wordmark "Phlix" in bone-white on fjord-night, ship-prow chevron accents in cold iron, forge-fire glow halo, Yggdrasil branch motif, knotwork terminal dots on runestone-underline. No play button, no Celtic imagery.
- **Favicon:** Square fjord-night with forge-fire ship-prow chevron, fjord-steel accent line, rune-violet dot accents
- **OG image (1200×630):** Dark fjord scene, ship-prow corner decorations, Nordic Saga eyebrow, large Cinzel "Phlix" wordmark with forge-glow text-shadow, "The Story Is Not Over. Neither Are You." tagline in forge fire
- **Feature icons:** 2px stroke, sharp caps and mitered joins (no rounded joins), bone-white at rest, forge fire for active state, angular corners, minimal knotwork terminal details — matching the icon_rules exactly
- **Signature elements:** Norse knotwork interlace borders, runestone-style typography accents, forge-fire radial glow behind hero and primary CTAs, Yggdrasil branch motif in navigation, Huginn raven silhouettes in empty states, ship-prow chevrons in section dividers

---

## Component Design

- **Cards:** Heavy dark storm-sea cards with cold-iron borders (1px #1E2D3E). Featured cards gain 1px Forge Fire border and `forge_glow` shadow on hover. Border-radius 4px (medium).
- **Buttons:** Primary = Forge Fire (#C8700A) on fjord-night text, 2px radius. Secondary = transparent with Fjord Steel border. Ghost = transparent with Cold Iron border. Danger = Blood Iron. No rounded pill buttons in this brand.
- **Forms:** Storm-sea fill, 1px cold-iron border, 2px radius, 14px padding. Focus = 1px Forge Fire border + amber outer glow.
- **Navigation:** Storm-sea topbar with cold-iron bottom border, Cinzel wordmark with faint forge-fire amber text-shadow glow. Active nav link = Forge Fire bottom border (2px) on storm-sea.
- **Toasts:** Sharp-edged, anchored bottom-right, 2px left-edge color bar, slides in from right with stone-door weight easing.
- **Badges:** Rounded-rectangle (2px radius), Cinzel 600 weight uppercase, 10–11px. Quality badges = Forge Fire; status badges = Fjord Steel; favorite = Rune Violet.

---

## Layout Archetype

**Chosen: `showcase`** — dramatic, monumental, lets content breathe against vast dark negative space.

The showcase archetype is the right fit because:
1. The Nordic Saga brand DNA demands "vast negative space — it is winter, and winter is vast"
2. The design principle "create epic scale — let the content feel as large as the myths it carries" maps directly to showcase behavior
3. The hero section fills the full viewport with a forge-fire radial glow, making the first impression mythic and weighty
4. The landing page pattern from the kit: "Full-bleed saga hero illustration with Cinzel headline over Forge Horizon gradient → feature sections alternating fjord-night/storm-sea → Forge Fire CTA"
