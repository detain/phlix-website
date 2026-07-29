# Desert Mirage — Site Design Rationale

## Concept & Vision

Desert Mirage captures the shimmering vastness of the open desert — where hot air
bends light into the illusion of water across endless sand. The design blends warm
ochre earth tones with cool sky blue to create a visual language of heat shimmer
and oasis promises. It is warm, dreamlike, calm, and timeless — a media server
that feels like a cool oasis in a noisy streaming landscape.

## Aesthetic Direction

**Mood:** Vast, warm, dreamlike, calm. The horizon stretches on forever. The contrast
of scorched sand and impossible cool sky is the soul of every screen.

**Visual references:** Sahara dunes at midday with heat shimmer, empty quarter Arabian
desert, the mirage — water that isn't there but beauty that is, rippled sand patterns
in the wind.

**Art direction:** Soft gradient washes on warm wheat backgrounds, wide dune
silhouette horizons, subtle ripple texture patterns, oasis blue accents against
amber earth tones. No harsh shadows, no cold colors.

## Color Table

| Role          | Name           | Hex       | Usage                                     |
|---------------|----------------|-----------|-------------------------------------------|
| Primary       | Desert Sand    | #D4A574   | Primary CTAs, active nav, emphasis        |
| Secondary     | Oasis Sky      | #87CEEB   | Links, focus rings, interactive elements   |
| Tertiary      | Wheat Light    | #F5DEB3   | Hero gradients, badge highlights           |
| Neutral       | Tan Dust       | #C19A6B   | Muted text, dividers, secondary elements   |
| Background    | Wheat          | #F5DEB3   | Universal page background                  |
| Surface       | Pale Sand      | #FAF4E8   | Card and panel surfaces                   |
| Surface Alt   | Warm Sand      | #EDD9B8   | Alternate rows, nested panels             |
| Text          | Saddle Brown   | #8B4513   | Primary body and headline text            |
| Border        | Saddle Border  | #8B4513   | Card outlines, dividers                    |
| Success       | Oasis Green    | #4A9E6B   | Success states                             |
| Warning       | Amber Dune     | #C9872A   | Warnings, caution                          |
| Error         | Burnt Sienna   | #9B3A1A   | Errors, destructive actions                |
| Focus         | Oasis Focus    | #87CEEB   | Keyboard focus rings                       |

## Typography

| Role      | Family                  | Weights    | Notes                                     |
|-----------|-------------------------|------------|-------------------------------------------|
| Headline  | Cinzel                  | 600, 700   | Serif display — ancient, elegant         |
| Display   | Cinzel                  | 600        | Oversized numerals and callouts           |
| Body      | Hind                    | 400, 600   | Warm, readable sans-serif for long text    |
| UI        | Quicksand               | 500, 600   | Rounded, friendly buttons and labels       |
| Mono      | IBM Plex Mono           | 400, 600   | Code, tokens, file paths                   |

**Fonts are self-hosted** from `shared/assets/fonts/`. No CDN, no Google Fonts links.

## Spatial System

Spacing scale: 4, 8, 12, 16, 24, 32, 48, 64, 96px

Corner radii: sm=4px, md=10px, lg=18px, xl=32px, pill=999px

Max content width: 1400px

## Motion Philosophy

Motion should feel smooth and dreamlike — like heat shimmer across the sand.
Transitions are slow, ambient, and never jarring. Oasis blue shimmer bloom for
focus states. Heat wave ripple for loading states. No spring bounce, no fast
elastic motion. `prefers-reduced-motion` is fully respected.

## Visual Assets

- **Logo:** Wordmark "Phlix" in Cinzel serif over a dune horizon silhouette with
  a subtle sky blue shimmer line.
- **Favicon:** Square mark in desert sand with a sky blue band and dune silhouette.
- **Icons:** 2px stroke, saddle brown default, oasis blue for active states.
  Rounded caps and joins for a soft, approachable feel.
- **Dividers:** 4px ripple-pattern strip in tan/oasis blue alternating gradient.
- **og.png:** Generated via `node tools/gen-og.mjs --site desert-mirage`
