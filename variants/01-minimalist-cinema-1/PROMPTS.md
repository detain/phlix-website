# Phlix Website — Variant 01-minimalist-cinema-1

## Design Prompt

Create an **Ultra-Minimal** variant of the Phlix website with a single-column layout, maximum negative space, and blue accents used sparingly.

## Visual Direction
- **Style**: Ultra-minimal, single column, typography-driven
- **Layout**: Single centered column with enormous whitespace
- **Background**: Pure white (#FFFFFF)
- **Text**: Charcoal (#1A1A1A)
- **Accent**: Electric blue (#2D9CFF) only for primary CTAs and key highlights
- **Header motif**: Thin blue underline animation on hover

## Key Design Decisions
- All content in a single centered column (max-width: 42rem for text)
- Massive whitespace between sections (6rem-8rem padding)
- Thin blue underline animation on nav links (header motif)
- X symbol as thin-line, elegant mark in logo
- Rounded buttons (radius: 0.75rem) with subtle shadows
- Primary CTA uses electric blue sparingly
- No gradients, no decorative elements — pure content focus
- Typography: Montserrat ExtraBold for headlines, Inter for body, Roboto for UI

## Layout Rhythm
1. **Hero**: Full-width, massive vertical padding, centered text
2. **Pitch bullets**: Single column, generous line-height
3. **Feature grid**: Single column, cards with subtle borders
4. **Footer**: Dark charcoal (#1A1A1A), grid columns

## Component Notes
- `btn--primary`: Electric blue, subtle blue shadow, hover lifts
- `btn--secondary`: Transparent with 1.5px border
- `feature-card`: White bg, 1px border, hover shadow
- `client-card`: Same card style, status pill (green/yellow)
- Navigation: Thin underline slides in on hover

## Notes
- Font files are placeholders (empty .woff2). For production, replace with real self-hosted WOFF2 fonts.
- CSS is inlined in each HTML page for simplicity. Shared CSS files exist but most styles are duplicated inline to avoid render-blocking external requests.
