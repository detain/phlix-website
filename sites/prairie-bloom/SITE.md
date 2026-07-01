# SITE.md — Prairie Bloom Brand Kit Site

## Concept & Vision

**Prairie Bloom** is the American heartland made visible on the web — warm sunflower yellows, wildflower violets, and honest barn reds against wide-open hay-cream meadows. Every screen should feel as open and unhurried as a county fair on a golden afternoon. The visual language draws from 1910s–1940s seed packet illustration, hand-stitched embroidery samplers, and folk-art hex signs. This is not a slick streaming service — it is a neighbor's porch, a shared quilt, a sky full of sunflowers. The tone is genuine, community-rooted, and warm. Phlix with Prairie Bloom feels like coming home after a long summer day: familiar, joyful, and a little bit sun-kissed.

---

## Aesthetic Direction

**Style:** American folk-art illustration — seed packet woodblock, embroidery sampler flat art, quilt block geometry.

**Art direction:** Artwork feels like a lovingly illustrated seed packet or a framed embroidery sampler: warm hay-colored paper with visible grain, hand-drawn botanical outlines in deep barn-red or clover ink, confident but slightly imperfect strokes. Color fills are flat with gentle texture, never airbrushed or gradient-heavy. Compositions favor symmetrical folk-art framing — a central sunflower flanked by matched wildflower sprigs, or a folk motif centered on a hex rosette. Lighting is diffuse golden-hour, as if sunlight is filtering through a barn door.

**Realism level:** Illustrated (not photorealistic).

**Rendering:** Woodblock, linocut, paper grain, flat vector.

**Texture:** Medium — subtle paper grain on warm surfaces.

**Depth:** Slightly layered — surfaces have depth through soft shadows and layered elements.

**Lighting:** Warm, golden-hour harvest quality. Soft shadows. Low contrast. No harsh shadows; light should feel like late-afternoon sun filtered through tall grass.

**Composition:** Centered folk-art symmetry, botanical framing (vines and stems as natural borders), single tall focal subject (sunflower, rooster) on generous hay ground.

---

## Color Table

| Role | Name | Hex | Usage |
|------|------|-----|-------|
| `--color-primary` | Sunflower Yellow | `#F2C12E` | Primary CTAs, active states, featured badges |
| `--color-secondary` | Wildflower Violet | `#7B5EA7` | Secondary actions, links, section headers, selected states |
| `--color-tertiary` | Barn Red | `#B83A3A` | Warm emphasis, folk-art outlines, danger actions |
| `--color-neutral` | Clover Green | `#4E7C59` | Success states, botanical outlines, dividers |
| `--color-bg` | Hay Cream | `#F7F0DC` | Default page background — always warm hay |
| `--color-surface` | Warm Linen | `#FBF6EA` | Card and panel surfaces |
| `--color-surface-alt` | Oat Field | `#EDE3C5` | Alternate surface, hover fills, striped rows |
| `--color-text` | Furrow Brown | `#2C1D0E` | Primary body and headline text |
| `--color-success` | Clover Mint | `#A8D5AE` | Success toasts, confirmations |
| `--color-warning` | Hay Gold | `#D9A520` | Warnings, caution states, rating stars |
| `--color-error` | Faded Barn Red | `#9C2A2A` | Errors, destructive actions |
| `--color-info` | Open Sky Blue | `#4A90C4` | Informational banners, sky accents |
| `--color-focus` | Violet Focus Ring | `#7B5EA7` | Keyboard-focus ring |
| `--color-border` | Furrow Outline | `#2C1D0E` | Card borders, dividers |
| `--color-shadow` | Warm Earth Shadow | `rgba(92,61,30,0.22)` | Drop shadows |

**Gradients:**
- `Sunflower Sunrise`: `linear-gradient(160deg, #F2C12E, #D9A520)` — hero backdrops, CTA shimmer
- `Prairie Sky`: `linear-gradient(180deg, #A8CFEA, #F7F0DC)` — tall hero panels
- `Wildflower Bloom`: `radial-gradient(ellipse, rgba(123,94,167,0.18), transparent)` — violet spotlight

**Color rules (hard constraints):**
- Backgrounds always hay cream or hay-tinted surface — never white or grey
- Sunflower yellow is the primary CTA color only — not body text
- Never more than three accent colors in a single view
- Shadows carry warm-earth tint, never cool grey or pure black
- Wildflower violet reserved for secondary actions and selected states
- Barn red signals emphasis — use sparingly, at most once per viewport

---

## Typography Roles

| Role | Font | Weights | Usage |
|------|------|---------|-------|
| Headline | Zilla Slab | 700 | Big folk-art headlines, hero titles, section names |
| Display | Playfair Display | 700, 900 | Oversized display text, splash text, italic hand-lettered numerals |
| Body | Lora | 400, 600 | Paragraphs, descriptions, long-form reading |
| UI | Nunito | 400, 600, 700 | Buttons, labels, navigation, chips, form fields |
| Mono | Fira Code | 400, 500 | Code, tokens, technical readouts |
| Number | Zilla Slab | 700 | Stats, counters, runtimes, dashboard figures |

**Rules:**
- Never use all-caps on body text; reserve caps for short UI labels only
- Zilla Slab 700 carries the folk-art weight — do not replace with a sans
- Body copy uses Lora for warmth; Nunito handles interactive UI only
- Body line-length: 60–72 characters for comfortable prairie-porch reading
- Italic is welcomed in display/headline settings for hand-lettered quality
- Minimum weight 400 everywhere

---

## Spatial System

**Spacing scale (px):** 4, 8, 12, 16, 24, 32, 48, 64, 96

**Content max-width:** 1320px

**Layout archetype:** `showcase` — wide open with big hero illustrations. Generous breathing room, single botanical focal points, centered folk-art symmetry.

**Section rhythm:** Each major section has substantial vertical padding (48–96px). The hay-cream background breathes between sections. No section feels cramped.

---

## Motion Philosophy

**Style:** Gentle, organic, bouncy, warm, unhurried.

**Easing:** `ease-out`, `spring` (cubic-bezier 0.34, 1.56, 0.64, 1).

**Speed:** Medium — 160–300ms for natural feel.

**Transitions:** Fade, Grow from seed, Quilt-slide, Soft-wipe, Scale bloom.

**Header motif (animated):** Sunflower swaying animation with drifting pollen-dot particles. In reduced-motion mode, the sunflower is static.

**Microinteractions:**
- Hover: Cards lift 3px with warm-earth shadow
- Button press: Gentle squash to 0.96 then spring back
- Loading: Sunflower growing from a seed (stem extending, petals unfolding)
- Focus: Wildflower-violet focus ring grows in from the inside over 140ms
- Success: Tiny wildflower burst + clover-green check mark bounce

**Reduced motion:** Honor `prefers-reduced-motion` — replace all animations with simple fades.

---

## Visual Assets

| Asset | Type | Description |
|-------|------|-------------|
| `img/logo.svg` | SVG | Folk-art sunflower wordmark in Zilla Slab 700, sunflower center disk on hay cream |
| `img/favicon.svg` | SVG 32×32 | Hex-rosette sunflower on sunflower-yellow square |
| `img/og.svg` | SVG 1200×630 | Folk-art prairie meadow OG card with Phlix wordmark and tagline |
| `img/PROMPTS.md` | Markdown | All image generation prompts |
| Hero sunflower | Inline SVG | Animated folk-art sunflower in hero section |
| Feature icons | Inline SVG | 7 feature icons, single-color stroke, 24×24 viewBox |

---

## Responsive Behavior

- **Desktop:** Multi-column quilt rails, hover affordances, max 1320px content
- **Tablet:** 2–3 column grids, larger touch targets (44px min), collapsible sidebar to icon rail
- **TV:** 10-foot UI — oversized Zilla Slab titles, bold sunflower-yellow focus rings, D-pad navigation
- **Mobile:** Single column, bottom-friendly nav, full-width posters, sticky sunflower-yellow play bar

---

## Accessibility

- WCAG 2.2 AA contrast (4.5:1 body text, 3:1 large text/UI)
- Wildflower-violet focus ring with 2px hay-cream offset
- Minimum 44×44px touch targets on all interactive elements
- `prefers-reduced-motion` honored throughout
- Layout survives 200% text zoom without clipping or horizontal scroll
- Sunflower yellow never used as body text color (insufficient contrast on hay cream)

---

## Layout Archetype: `showcase`

The `showcase` archetype was chosen because:
1. Prairie Bloom's design principles call for "every screen to feel as open and unhurried as a meadow"
2. The folk-art visual language requires generous negative space (hay ground) to breathe
3. The header motif (animated sunflower) is a hero element best showcased with full-bleed treatment
4. The brand's community-centered identity (Caregiver archetype) benefits from centered, welcoming layouts
5. The layout_patterns.landing from the kit is: "Full-bleed meadow illustration → features → social proof → CTA (sunflower bloom)" — perfectly matched by showcase

The showcase archetype uses:
- Full-bleed hero with sky gradient and centered content
- Generous section padding (48–96px)
- Breathing room between elements — at most 3 accent colors per view
- Single botanical focal points (never competing heroes)
- Quilt-block grid patterns as decorative section dividers
