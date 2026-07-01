# SITE.md — Marble Atrium for Phlix

## Concept & Vision

Marble Atrium channels the serene opulence of a grand five-star hotel lobby — white Carrara marble, champagne gold accents, whispered elegance, and impeccable attention to detail. The site should feel like stepping into the atrium of the Hôtel de Crillon or The Ritz Paris: immense scale, hushed efficiency, every surface polished to perfection. The product (Phlix) is presented as a concierge service for your media library: understated, precise, deeply luxurious.

---

## Aesthetic Direction

**Reference point:** Grand European hotel lobbies, luxury perfume house interiors (Dior, Chanel), botanical hotel courtyards, architectural photography by Julius Shulman and Slim Aarons.

**Mood:** Prestige, serenity, trust, delight in the details. The feeling of being cared for.

**Archetype:** Ruler — authoritative, composed, quietly confident. Never effusive or playful.

---

## Color Table

| Role | Name | Hex | Usage |
|------|------|-----|-------|
| Primary | Champagne Gold | `#B8960C` | CTAs, active states, gilded rule lines |
| Secondary | Botanical Green | `#2D5016` | Status badges, living accent elements |
| Tertiary | Blush Rose | `#E8C4C4` | Hero section tints, highlighted surfaces |
| Neutral | Veining Grey | `#A0A09A` | Marble veining motifs, secondary text |
| Background | Marble White | `#F7F5F2` | Default page canvas |
| Surface | Carrara Surface | `#EEECE8` | Card and panel surfaces |
| Surface Alt | Pale Stone | `#E5E2DC` | Alternate surfaces, table striping |
| Text | Jet Black | `#0F0F0E` | Primary body and headline text |
| Success | Fern Green | `#C8DDB8` | Success states, confirmations |
| Warning | Pale Gold | `#E8D080` | Warnings, advisory states |
| Error | Garnet | `#8B2635` | Errors, destructive actions |
| Info | Slate Blue | `#5A7A8A` | Informational banners |
| Focus | Gold Focus Ring | `#B8960C` | Keyboard focus indicator |
| Border | Hairline Stone | `#C8C4BC` | Card borders, dividers |

---

## Typography

| Role | Font | Weight | Usage |
|------|------|--------|-------|
| Headline | Cormorant Garamond | 300, 600 | Hero headlines, section titles |
| Display | Cormorant | 300 | Ultra-large decorative numerals |
| Body | Jost | 300, 400 | Paragraphs, descriptions |
| UI | Jost | 400, 500 | Navigation, buttons, labels |
| Mono | DM Mono | 300, 400 | Technical readouts, code |
| Number | Cormorant Garamond | 300 | Dashboard stats, counters |

**Rules:**
- Headlines always thin-to-light serif — never bold display sans.
- Letter-spacing is generous throughout; text should breathe.
- Body copy line-height never falls below 1.6.
- Link underlines are 1px hairlines in Champagne Gold on hover.
- Numeric stats use Cormorant Garamond Light — the engraved-numeral aesthetic.

---

## Spatial System

**Spacing scale (the only allowed steps):**
`4, 8, 12, 16, 24, 32, 48, 64, 96, 128px`

**Max content width:** 1280px with generous side padding (minimum 48px on desktop).

**Layout archetype:** Editorial — wide architectural compositions, dramatic typographic scale, extreme negative space, 1px hairline dividers instead of colour blocks.

---

## Motion Philosophy

**Speed:** Slow and deliberate — maximum 600ms for any transition.

**Style:** Slow, Deliberate, Graceful, Architectural.

**Microinteractions:**
- Cards: lift 1px with whisper-thin stone shadow; gold hairline border fades in over 200ms.
- Button press: imperceptible 0.99 scale over 80ms.
- Focus: Champagne gold 2px focus ring with 2px white offset — engraved-frame effect.
- Loading: gold hairline progress rule draws left-to-right beneath content.
- Success: pale-green fern-leaf icon fades in beside confirmation text.

**Reduced motion:** Honor `prefers-reduced-motion` — replace all transitions with 0-duration fades; disable marble-vein draw-in animation on page load.

---

## Visual Assets

### Logo
Wordmark lockup: "PHLIX" in Georgia/Cormorant Garamond Light, all-caps, 0.25em tracking, Jet Black on Marble White. "MARBLE ATRIUM" kit identity as subtitle in Veining Grey at 0.35em tracking. Flanked by hairline rules above and below.

### Signature Motifs
- **Glass-ceiling grid geometry** — hero background (subtle 80px grid, hairline stone, ~15% opacity)
- **Marble veining patterns** — used as background texture and decorative dividers
- **Champagne gold hairline rules** — section dividers and active-state accents
- **White orchid illustrations** — fine-line botanical in kit style

### SVG Favicon
Square, Champagne Gold (#B8960C), with "P" lettermark in Marble White.

---

## Signature Elements Deployed

1. **Carrara marble veining patterns** — CSS grid background on hero (glass-ceiling grid motif)
2. **Champagne gold rule lines** — hairline rules as section dividers throughout
3. **White orchid illustrations** — not deployed (mascot is null; fine-line SVG botanical dividers used instead)
4. **Soaring glass-ceiling grid geometry** — CSS hero background pattern
5. **Blush rose as hero tint** — subtle background gradient on hero section
6. **Deep botanical green leaf silhouettes** — CSS accent on hub-feature cards
7. **Marble-vein reveal animation** — hero headline uses `reveal-vein` keyframe on load

---

## Component Decisions

- **Cards:** Nearly flat — wide padding (32px), hairline border, almost no shadow. Depth is implied by the border alone.
- **Buttons:** Rectilinear (2px radius), champagne gold fill for primary, ghost Jet Black for secondary.
- **Search bar:** The single pill-radius exception in the kit — marble-white pill with hairline border.
- **Focus ring:** 2px gold + 2px white offset = precision engraved frame.
- **Tables:** Pale Stone header row, alternate rows use surface-alt, hairline bottom border.
- **Navigation:** Sticky marble-white topbar, 2px gold underline on active nav item.
- **Toasts:** Marble-white pill sliding from bottom, hairline border, fern-green or garnet icon.
