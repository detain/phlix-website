# Dyson Sphere Brand Kit Site

A stellar megastructure-themed brand kit website featuring:

- Central star with animated corona and atmosphere
- Orbiting megastructure rings with rotation animations
- Energy collector hexagons
- Plasma tendril effects
- Solar flare bursts
- Real-time power meter with waveform visualization
- Scroll-reveal animations with `prefers-reduced-motion` support

## Tech Stack

- Pure HTML5, CSS3, and Vanilla JavaScript
- No external dependencies (no frameworks, no CDN fonts/icons)
- CSS custom properties for theming
- Intersection Observer API for scroll animations
- RequestAnimationFrame for smooth animations

## File Structure

```
sites/dyson-sphere/
├── index.html          # Main landing page
├── features.html       # Detailed features page
├── 404.html           # Error page
├── manifest.json      # PWA manifest
├── .htaccess          # Apache configuration
├── css/
│   ├── styles.css     # Main styles
│   ├── animations.css # Keyframe animations
│   ├── components.css # UI components
│   ├── responsive.css # Media queries
│   └── utilities.css # Utility classes
├── js/
│   ├── main.js        # Page initialization
│   ├── stellar.js     # Stellar engine, power meter, waveform
│   ├── particles.js   # Particle system
│   ├── energy-beam.js # Energy beam effects
│   ├── scroll-reveal.js # Scroll reveal module
│   └── navigation.js  # Navigation module
└── img/
    ├── favicon.svg
    ├── dyson-sphere.svg
    ├── collector-icon.svg
    └── power-icon.svg
```

## Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Primary | `#FFB800` | Main accent, headings |
| Secondary | `#FF6B00` | Supporting accent |
| Accent | `#FF4500` | Highlights, borders |
| Dark | `#8B0000` | Deep backgrounds |
| Deepest | `#1A0A00` | Base background |

## Typography

- **Display**: Orbitron (system fallback: Rajdhani)
- **Headings**: Rajdhani (system fallback: Orbitron)
- **Body**: Exo 2 (system fallback: Rajdhani)
- **Mono**: Share Tech Mono (system fallback: Courier New)

## Accessibility

- Full `prefers-reduced-motion` support
- Semantic HTML structure
- ARIA labels where needed
- High contrast color ratios
- Keyboard navigable

## Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## Performance

- No external font CDN (system fonts with web font loading)
- No icon CDN (inline SVGs)
- Optimized animations using CSS transforms
- Lazy initialization for off-screen elements
- RequestAnimationFrame for smooth 60fps animations
