# img/PROMPTS.md — SVG Generation Prompts for Variant 04-portal-hub-3

## Brand Kit: Data Terminal / CRT Terminal Aesthetic

**Theme**: CRT monitor, green phosphor terminal, scanline effects
**Colors**: primary #0D1A0D, secondary #001A00, accent #39FF14, text #00FF41, muted #1A4D1A
**Typography**: VT323 (display), IBM Plex Mono (body) — self-hosted

## Logo SVG

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 36">
  <!-- Terminal icon with glow effect -->
  <rect x="2" y="4" width="24" height="18" rx="2" fill="none" stroke="#39FF14"/>
  <path d="M6 10 L10 13 L6 16" stroke="#39FF14" fill="none"/>
  <line x1="12" y1="16" x2="18" y2="16" stroke="#39FF14"/>
  <!-- Phlix text in terminal green -->
  <text x="32" y="21" font-family="monospace" fill="#00FF41">PHLIX</text>
</svg>
```

**Key Elements**:
- Terminal/monitor icon (rectangle with play triangle)
- Monospace "PHLIX" wordmark
- Green phosphor color palette (#39FF14, #00FF41)
- Optional: blinking cursor element

## Favicon SVG

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <!-- Dark terminal background -->
  <rect width="32" height="32" fill="#0D1A0D"/>
  <!-- Mini terminal icon -->
  <rect x="4" y="6" width="20" height="14" rx="1" fill="none" stroke="#39FF14"/>
  <path d="M8 11 L12 14 L8 17" stroke="#39FF14" fill="none"/>
  <line x1="14" y1="17" x2="20" y2="17" stroke="#39FF14"/>
</svg>
```

**Key Elements**:
- Square 32x32 viewport
- Dark background (#0D1A0D)
- Simplified terminal icon
- Green stroke only, no fill

## OG Image SVG

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630">
  <!-- Deep green-black background -->
  <rect width="1200" height="630" fill="#0D1A0D"/>
  <!-- Optional grid pattern (subtle) -->
  <!-- Terminal icon (large, centered-left) -->
  <!-- PHLIX wordmark (monospace, terminal green) -->
  <!-- Tagline below -->
</svg>
```

**Key Elements**:
- 1200x630 viewport (standard OG image)
- Dark green background
- Large terminal icon
- Bold "PHLIX" in terminal green
- Subtle grid/scanline effects for CRT feel

## CRT Effects (CSS)

```css
/* Scanline overlay */
body::before {
  content: '';
  position: fixed;
  inset: 0;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(0, 0, 0, 0.15) 2px,
    rgba(0, 0, 0, 0.15) 4px
  );
  pointer-events: none;
  z-index: 9998;
}

/* Vignette */
body::after {
  content: '';
  position: fixed;
  inset: 0;
  background: radial-gradient(
    ellipse at center,
    transparent 0%,
    transparent 60%,
    rgba(0, 0, 0, 0.4) 100%
  );
  pointer-events: none;
  z-index: 9997;
}
```

## Color Palette (CSS Variables)

```css
:root {
  --color-primary: #0D1A0D;   /* Deep green-black bg */
  --color-secondary: #001A00; /* Dark green */
  --color-accent: #39FF14;    /* Terminal bright green */
  --color-text: #00FF41;      /* Phosphor green text */
  --color-muted: #1A4D1A;     /* Muted green */
}
```

## Typography

- **Display**: VT323 (Google Font, pixel/terminal style)
- **Body**: IBM Plex Mono (self-hosted or Google Font)
- **Fallbacks**: 'Courier New', monospace

## Build Notes

- All fonts loaded via local references or self-hosted WOFF2
- No external CDN dependencies for fonts
- SVG icons use currentColor for flexibility
- Animations respect prefers-reduced-motion
