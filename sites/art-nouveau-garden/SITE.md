# Art Nouveau Garden — Phlix Brand Kit Site

## Concept & Vision

Art Nouveau Garden is a living homage to the Belle Époque — the golden age of Art Nouveau when every salon was a work of art and every frame a garden. Phlix, rendered in this identity, feels like stepping into a lantern-lit cinema where the iron gate curls into lilies and the programme card is a small masterwork. The product is still Phlix; the brand is the identity it wears like a second skin.

**Tagline:** *Where the Garden Blooms, the Story Begins.*

**Brand DNA:** Art Nouveau Garden is the soul of Belle Époque beauty, grown from living vines and peacock feathers. It is sage green and dusty rose, aged gold and cream ivory — never cold, never corporate, never hurried. It moves like a garden in a gentle wind: sinuous, generous, and impossible to rush.

**Archetype:** `narrative-scroll` — the home page is a chaptered scroll through five distinct scenes, literary voice throughout.

## Aesthetic Direction

Inspired by Alphonse Mucha decorative panels, Louis Comfort Tiffany stained glass, Gustav Klimt botanical motifs, and the Paris Exposition Universelle of 1900. Artwork evokes a lovingly painted Art Nouveau salon: ivory vellum paper, lush sage and forest greens, dusty rose petals, and aged gold leaf accents. Compositions are framed by organic borders — curling vines, peacock feathers, lily stems — as if every scene exists inside a Mucha decorative panel. Lighting is soft, diffuse, and warm — the glow of gaslight through stained glass.

## Home Page Narrative (5 sections)

| Section | Content |
|---------|---------|
| `garden-opens` | Hero with visitor-path fork + CTA |
| `blooming-features` | Library + SyncPlay as hero features, then 4 support features |
| `why-tend` | Brand story in ornate framed panel |
| `who-trusts` | Salon placard with real capabilities + GitHub link + docs quote |
| `enter-now` | CTA banner with install command |

## Color Palette

| Role | Name | Hex | Usage |
|------|------|-----|-------|
| `--color-primary` | Aged Gold | `#B8960C` | Primary CTAs, gilded borders, active states |
| `--color-secondary` | Dusty Rose | `#C08070` | Secondary actions, floral accents, hover states |
| `--color-tertiary` | Sage Garden | `#7D9B76` | Badges, tags, vine motif fills |
| `--color-bg` | Ivory Cream | `#F5EFE0` | Default page background |
| `--color-surface` | Parchment | `#FAF5EA` | Card and panel surfaces |
| `--color-surface-alt` | Sage Mist | `#EAF0E6` | Alternate tinted surface |
| `--color-text` | Forest Ink | `#1F2E1A` | Primary body and headline text |
| `--color-text-muted` | Warm Umber | `#7A6352` | Muted text, dividers |
| `--color-border` | Vine Ink | `#2C3D28` | Fine botanical borders, card outlines |

**Safe-for-small-text substitutes** (measured, per §19.1):
- Primary on bg: `#816908` (8.1:1) vs claimed `#B8960C` (2.47:1)
- Secondary on bg: `#926155` (4.9:1) vs claimed `#C08070` (2.79:1)
- Link on bg: `#3b7584` (4.5:1) vs claimed `#3D7A8A` (4.21:1)

## Typography

| Role | Family | Weight | Usage |
|------|--------|--------|-------|
| Headline | Cormorant Garamond | 600, 700 | Grand display headlines, hero titles |
| Display | Playfair Display | 700, 900 | Oversized ornamental text, feature titles |
| Body | EB Garamond | 400, 500 | Paragraphs, descriptions, long-form reading |
| UI | Josefin Sans | 300, 400, 600 | Navigation, labels, buttons, chips |
| Mono | Courier Prime | 400 | Technical readouts, tokens |

**Emphasis:** `strong { font-weight: 500; color: var(--color-text); }` — weight 500 is the heaviest declared for EB Garamond. A second visual channel (color difference) is not available within the kit's declared color tokens.

## Spatial System

Spacing scale: 4, 8, 12, 16, 24, 32, 48, 64, 96px. Max content width 1400px. Generous whitespace — the garden path must breathe.

## Motion Philosophy

**Style:** Flowing, gentle, unhurried, organic, dreamy.

Animations: petal dissolve, vine unfurl, soft iris wipe, cross-fade with golden dust, leaf-fall reveal. Speed: slow. Easing: `cubic-bezier(0.25, 0.46, 0.45, 0.94)`.

Honor `prefers-reduced-motion: reduce` — `matchMedia` listener responds to changes mid-session, not just at load.

## Interactive Elements

- **Mascot Lily:** Fixed upper-right on desktop (hidden on mobile), idle drift animation, click/tap triggers lantern brighten, hover-hold 2s triggers gesture to CTA, dismiss persists via localStorage.
- **Intensity toggle:** "Dim the lights (calm mode)" — reduces animation, simplifies parallax, hides mascot. Persists via localStorage.
- **Easter egg 1:** Logo-clicks:3 — vine unfurl animation + reward toast "The garden remembers the curious visitor."
- **Easter egg 2:** typed-word:garden — background shimmer + reward toast "You speak the garden's language." Both disabled in inputs, both exit on Esc.
- **Seasonal activation:** Date-gate JS applies CSS variable overrides for 4 seasonal variants (Midsummer, Autumn, Winter, Spring).

## Signature Elements

- Flowing vines and tendrils as section borders
- Peacock feathers and plumage in decorative accents
- Lily pads and water blossoms in dividers
- Mucha-style decorative portrait frames
- Gilded organic curves and scroll borders
- Stained-glass color panels

## Known Limitations

- **Emphasis:** The secondary visual channel for `<strong>` (color change) is not implemented because the kit caps EB Garamond at 500 without providing an emphasis-specific color token. This is a known constraint per §19.17.
- **Mascot on mobile:** Hidden on screens < 768px to avoid CTA overlap per §19.11.
