# Self-Hosted Fonts

This directory contains self-hosted fonts for variant 01-minimalist-cinema-3.

## Required Fonts

Download these fonts and place them here:

### Bebas Neue
- `bebas-neue-regular.woff`
- `bebas-neue-regular.woff2`

Source: https://fonts.google.com/specimen/Bebas+Neue (download from GitHub releases or similar)

### Work Sans
- `work-sans-regular.woff`
- `work-sans-regular.woff2`
- `work-sans-medium.woff`
- `work-sans-medium.woff2`
- `work-sans-semibold.woff`
- `work-sans-semibold.woff2`

Source: https://fonts.google.com/specimen/Work+Sans (download from GitHub releases or similar)

## Why Self-Host?

This variant follows the requirement of NO Google Fonts CDN.
Self-hosting fonts ensures:
- Privacy (no external requests)
- Performance (fonts load with page, no CDN latency)
- Offline capability
- Consistent rendering

## Font Loading

Fonts are loaded via @font-face in `../css/theme.css`:
```css
@font-face {
  font-family: 'Bebas Neue';
  src: url('../fonts/bebas-neue-regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
```
