# SITE.md — Ice Cathedral Brand Kit Site

## Concept & Vision

Ice Cathedral is the silence inside a glacier — the absolute cold of polar night broken only by the blue light that lives inside ancient ice. It is gothic cathedral architecture transposed into permafrost: soaring vaulted arches of translucent ice, rose windows rendered in frost crystal, the hush that precedes an avalanche. The site should feel like entering a space of genuine awe — majestic, untouchable, eternal.

## Layout Archetype

**Immersive** — Full-bleed polar gothic hero with vertical axis composition. Every page opens from polar night darkness; content emerges from the ice. The layout mirrors the gothic cathedral's vertical pull — the eye is drawn upward from vaulted hero imagery to content that recedes into the cold. Wide negative space (polar night) is structural, not decorative.

---

## Color System

| Role | Name | Hex | Usage |
|------|------|-----|-------|
| Primary | Crystal Ice Blue | `#A8D8FF` | Primary CTAs, active states, the luminous accent |
| Secondary | Glacial Silver | `#C8EEFF` | Secondary actions, surface highlights |
| Tertiary | Deep Aurora Blue | `#6090FF` | Badges, ratings, emphasis accents |
| Background | Polar Night | `#04101C` | Default page background — absolute Arctic darkness |
| Surface | Ice Cave Depth | `#081828` | Card and panel surfaces |
| Surface Alt | Frost Chamber | `#0C2035` | Hover states, nested panels, striped rows |
| Text | Arctic White | `#EEF5FF` | Primary body and headline text |
| Neutral | Ice Shadow | `#2A4A6A` | Muted UI chrome, dividers |
| Success | Glacial Teal | `#00C9B8` | Success toasts, confirmations |
| Warning | Aurora Amber | `#FFD166` | Warnings — rare warm light against the cold palette |
| Error | Frost Crimson | `#E05070` | Errors, destructive actions |
| Info | Cerulean Depth | `#4AB0E0` | Informational banners |
| Focus | Crystal Focus Pulse | `#A8D8FF` | Keyboard focus ring |
| Border | Ice Vein | `#1A3050` | Card borders, dividers |
| Shadow | Crystal Ice Glow | `rgba(168,216,255,0.12)` | Cold blue glow on cards |
| Overlay | Polar Void | `#020810` | Modal/scrim overlays |

### Gradients

- **Glacial Vault** — `linear-gradient(180deg, #A8D8FF, #04101C)` — Hero backdrops
- **Crystal Radiance** — `radial-gradient(ellipse at center, rgba(168,216,255,0.25), transparent)` — Internal-light effect behind hero subjects
- **Ice Cave Depth** — `linear-gradient(180deg, #081828, #04101C)` — Subtle surface-to-background fade

---

## Typography Roles

| Role | Font | Weights | Tracking | Usage |
|------|------|---------|----------|-------|
| Headline | Cinzel | 400, 700 | 0.08em | Page titles, hero headlines — carved inscription |
| Display | Josefin Sans | 100–300 | 0.25em | Oversized cold-precision display, splash titles |
| Body | Libre Baskerville | 400, 700 | 0em | Descriptions, synopses, long-form reading |
| UI | Josefin Sans | 300–600 | 0.12em | Buttons, labels, navigation, chips — all caps |
| Mono | JetBrains Mono | 400, 600 | 0.02em | Code, tokens, technical readouts |
| Number | Josefin Sans | 100 | 0.15em | Stats, counters, runtimes — thin cold numerals |

### Typography Rules (brand constraints)
- Cinzel carries the weight of carved stone — never use light weights for headlines
- Josefin Sans display text must be ultralight (100–300) and generously tracked (0.2em+)
- Body copy (Libre Baskerville) is always left-aligned for readability — never centered in blocks
- Never set body copy in Cinzel — it is architectural display type only

---

## Spatial System

9-step spacing scale (px): `4, 8, 12, 16, 24, 32, 48, 64, 96`

- Spacing is generous — whitespace is structural silence
- Max content width: **1400px**, centered
- Section padding: 64–96px vertical on desktop, 32–48px on mobile

---

## Motion Philosophy

**Slow crystalline** — Motion in Ice Cathedral is like ice forming: slow, geometric, and inevitable. Transitions use `cubic-bezier(0.3, 0, 0.1, 1)` at 400–700ms. Nothing bounces; nothing springs.

- **Crystalline reveal** — Elements fade in with a slow upward drift, like ice growing on glass
- **Hover** — Cards gain a 1px Crystal Ice Blue border + cold-blue glow over 300ms
- **Focus** — 2px Crystal Ice Blue ring with outer glow, always visible on dark surfaces
- **Loading** — Geometric frost-crystal pattern grows outward from center (fallback: static shimmer)
- **prefers-reduced-motion** — All animations replaced with simple opacity transitions or static states

---

## Visual Assets

| Asset | Description |
|-------|-------------|
| `img/logo.svg` | Wordmark "PHLIX" in Cinzel on polar-night background with gothic arch + rose-window lattice motif |
| `img/favicon.svg` | Gothic pointed arch silhouette in Crystal Ice Blue on polar-night square |
| `img/og.svg` | 1200×630 social card: polar night bg, crystal glow, rose-window radial motif, "Silence. Light. Story." headline |
| `img/PROMPTS.md` | Full prompt library for regenerating every image asset |
| 7 inline feature SVGs | Outlined, 1.5px stroke, sharp geometric — library, syncplay, transcode, shield, antenna, broadcast, puzzle, hub |

### Mascot: Crystal
Crystal is a translucent geometric ice formation — a permanent snowflake. Ancient, patient, knowing. Always lit from within by pale ice-blue light. Used in loading screens and empty states.

---

## Shape Language

- **Gothic pointed arches** — lancet window silhouettes for structural accents
- **Crystal facet geometry** — hexagonal and triangular panels
- **Thin precise rule lines (1px)** — hairline cracks in ice; used for dividers
- **Rose window radial patterns** — decorative motifs in headers and dividers
- **Corner radius** — 0px everywhere (sharp corners are architectural)

---

## Component Style Notes

- **Cards** — Ice Cave Depth background (#081828), 1px Ice Vein border, 2px radius, md shadow. Featured cards gain Crystal Ice Blue border + crystal_glow on hover
- **Buttons** — Primary: Crystal Ice Blue bg, Polar Night text, 0px radius. Ghost: transparent, Ice Vein border. All buttons min 44×44px touch target
- **Navigation** — Topbar on Ice Cave Depth with 1px bottom Ice Vein border. Active indicator: 2px Crystal Ice Blue bottom line on nav link
- **Badges** — Sharp rectangle (0px radius), 1px border. Stable=primary, Beta=amber, Deprecated=error
