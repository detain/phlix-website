# Renaissance Atelier — Site Design Rationale

## 1. Concept & Vision

Renaissance Atelier is the private studio of the discerning media collector — warm
candlelight, lapis lazuli, burnt sienna, and gold on ivory. Every interface element is
placed with the deliberation of a master applying a final glaze. The site is not a
streaming service — it is a patron's private collection, catalogued by a master's hand.

The visual language draws from Italian Renaissance painting: sfumato chiaroscuro lighting,
layered oil glazes, and decisive burnt-sienna underdrawing. Gold leaf is used sparingly
and with reverence. The overall impression is of a grand Florentine bottega — warm,
cultured, meticulous, and timeless.

---

## 2. Aesthetic Direction

- **Style**: Old master oil painting + illuminated manuscript + Renaissance chalk study
- **Mood**: Masterful, contemplative, reverent, cultured, meticulous, humanist
- **Reference**: Da Vinci's Codex Atlanticus, Botticelli compositional studies, Florentine
  quattrocento workshops (bottega), illuminated manuscripts (Book of Kells)
- **Art direction**: All artwork feels as though it was prepared in a Florentine bottega —
  layered oil glazes over a warm ground, chiaroscuro modelling from a single candlelight
  source, decisive burnt-sienna underdrawing visible beneath the final layer.

---

## 3. Color Palette (semantic role → name → hex)

| Role          | Name             | Hex       | Usage |
|---------------|------------------|-----------|-------|
| primary       | Lapis Lazuli     | #2B4A8C   | Primary CTAs, active nav states, key hero accents |
| secondary     | Burnt Sienna     | #A0522D   | Secondary actions, links, underdrawing outlines |
| tertiary      | Ochre Gold       | #C8971A   | Gold leaf accents — used sparingly, always luminous |
| neutral       | Verdigris        | #4A7C6F   | Muted dividers, secondary labels, patina details |
| background    | Ivory Parchment  | #F4ECD8   | Default page background — never pure white |
| surface       | Vellum           | #FAF4E4   | Card/panel surfaces, one step lighter than parchment |
| surface_alt   | Aged Linen       | #EDE1C6   | Table stripes, nested panels, sidebar insets |
| text          | Rich Umber       | #2C1A0E   | Primary body text and headlines on light surfaces |
| success       | Verdant Glaze    | #5A8A5E   | Success toasts, confirmations |
| warning       | Saffron          | #D4961A   | Warnings, caution states |
| error         | Carmine Lake     | #8C1F28   | Errors, destructive actions |
| info          | Cerulean Fresco  | #2A5FA5   | Informational banners, tips |
| focus         | Gold Leaf Focus  | #C8971A   | Keyboard focus ring (2px gold, 2px offset) |
| border        | Underdrawing Brown | #3D1F0A | Card borders, dividers — the visible underdrawing |
| shadow        | Raw Umber Shadow | rgba(44,26,14,0.35) | All drop shadows — warm, never cool |
| overlay       | Deep Shadow Veil | rgba(14,10,6,0.72) | Modal scrims, video overlays |

### Color gradients
- **Chiaroscuro Veil** `linear 160deg`: #2C1A0E → #A0522D → #C8971A — hero backdrop
- **Lapis Ground** `radial`: #2B4A8C → #1A2D5A — dark hero/splash sections
- **Candle Bloom** `radial`: rgba(200,151,26,0.45) → transparent — warm glow behind hero art
- **Gold Illumination** `linear 45deg`: #C8971A → #F0CC6A → #C8971A — drop caps, premium accents

### Color rules (non-negotiable)
- Parchment ivory is the only permitted background — never pure white, never grey
- Lapis lazuli anchors primary actions; must never appear as a background wash
- Gold leaf (ochre gold) used for no more than two focal elements per screen
- All shadows warm umber-tinted; never use cool grey or desaturated black
- Verdigris is muted supporting tone; never dominant
- Burnt sienna outlines but does not fill large areas
- Maximum three accent colours per view

---

## 4. Typography

| Role      | Font               | Weight   | Usage |
|-----------|--------------------|----------|-------|
| headline  | Cormorant Garamond | 600, 700 | Grand display headlines, hero titles, chapter headings |
| display   | Cormorant SC      | 600      | Oversized numerals, small-caps section labels |
| body      | EB Garamond       | 400, 500 | Long-form reading, descriptions, metadata |
| ui        | Libre Baskerville | 400, 700 | Buttons, labels, navigation, chips, table headers |
| mono      | Courier Prime     | 400, 700 | Code samples, API tokens, file paths |
| number    | Cormorant Garamond | 600     | Dashboard statistics, counters |

### Typography rules
- Headlines use Cormorant Garamond exclusively — never a sans-serif headline
- Body copy always EB Garamond; never set body in a display weight
- Small caps (Cormorant SC) for section labels, not ALL CAPS
- Line length: 55–70 characters for body; headlines may run wider
- Never set body copy below 16px / 1rem on screen
- Leading (line-height): 1.7 for body; 1.35 for UI labels

---

## 5. Spatial System

The 8-point spacing scale (from kit `spacing_scale`):
`4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 px`

- Maximum content width: 1400px; hero content centred within 960px
- Generous margins: 48px minimum on desktop, 24px on mobile
- Vertical rhythm: sections alternate between parchment and vellum grounds
- Hero: full-bleed with 90vh minimum height

---

## 6. Motion Philosophy

**Overall character**: Deliberate, stately, sfumato-smooth, weighty. Motion feels like
a master lifting a veil from a canvas — slow, intentional, revealing something worth the wait.

- **Transitions**: Cross-dissolve (sfumato fade), slow reveal from darkness (candle-bloom),
  page-turn curl, gold-leaf shimmer wipe, vignette iris open
- **Speed**: Slow (350–600ms ease-in-out)
- **Easing**: `cubic-bezier(0.4, 0, 0.2, 1)`, `ease-in-out`, `ease-out`
- **Entrance**: Hero content fades in with a 200ms delay and a 20px upward translate
- **Hover states**: Cards gain a warm ochre inner glow + 3px lift + deep umber shadow over 200ms
- **Reduced motion**: All animations replace with `opacity 0→1 instant` via
  `prefers-reduced-motion: reduce` media query

---

## 7. Visual Assets

| Asset         | Description |
|---------------|-------------|
| `logo.svg`    | Phlix wordmark in Cormorant Garamond semibold, ochre-gold double-rule oval tondo frame, lapis on parchment |
| `favicon.svg`  | Lapis lazuli square with ochre tondo + "P" initial |
| `og.svg`      | 1200×630 chiaroscuro lapis-to-ochre gradient, headline in ivory/ochre Cormorant Garamond |
| `PROMPTS.md`  | Full prompt library for every asset |
| Hero bg       | CSS-only via `gradient-lapis` + `gradient-chiaroscuro` + `gradient-candle-bloom` |

Feature icons are inline SVG, 1.5px stroke, burnt-sienna underdrawing brown, outlined,
slightly imperfect quill-pen quality, rounded caps.

---

## 8. Layout Archetype

**Immersive** — full-bleed/cinematic/glow. Full-bleed chiaroscuro hero (lapis-to-ochre
gradient + sfumato atmosphere) → parchment features section → testimonial panel →
ochre-gold CTA strip.

This archetype was chosen because:
- `layout_patterns.landing` in the kit explicitly calls for "Full-bleed chiaroscuro hero"
- `visual_style` includes "Old master oil painting", "Sfumato gradient atmosphere"
- `depth: "layered"` and `texture_level: "heavy"` reinforce a rich, immersive first impression
- The `immersive` archetype best honours the `design_principles` — "One master element per
  page; support it, never compete with it"
