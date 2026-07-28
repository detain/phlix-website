# Storm Chaser Site

Wild weather chaos brand kit site for Phlix media server.

## Brand Identity

**Palette:** Storm Navy `#1B1464`, Electric Amber `#F7981D`, Dark Slate `#2C3A47`, Danger Red `#C0392B`, Storm Gray `#7F8C8D`

**Archetype:** Outlaw — wild, powerful, chaotic

**Experience:** Immersive — the storm grows with your library

## Pages

| Page | Purpose | Route |
|------|---------|-------|
| index.html | Homepage | / |
| features.html | Capabilities | /features |
| clients.html | Client apps | /clients |
| download.html | Downloads | /download |
| plugins.html | Extensions | /plugins |
| docs.html | Documentation | /docs |
| hub.html | Remote access | /hub |
| about.html | About/FAQ | /about |
| 404.html | Error page | /404 |

## Design Language

### Typography
- **Headlines:** Bebas Neue, uppercase
- **Body:** IBM Plex Sans
- **Mono:** IBM Plex Mono

### Motion
- Swirling vortex animations in hero
- Rain particle system
- Lightning flash effects
- All effects respect `prefers-reduced-motion`

### Atmosphere
- Dark storm-glass backgrounds
- Radial gradient overlays
- Rain streak textures
- Amber lightning accents

## File Structure

```
storm-chaser/
├── index.html
├── features.html
├── clients.html
├── download.html
├── plugins.html
├── docs.html
├── hub.html
├── about.html
├── 404.html
├── css/
│   ├── base.css
│   ├── theme.css
│   └── components.css
├── js/
│   └── main.js
├── img/
│   ├── logo.svg
│   ├── favicon.svg
│   └── og.svg
├── robots.txt
└── sitemap.xml
```

## Fonts

Fonts loaded from Google Fonts CDN:
- Bebas Neue
- IBM Plex Sans
- IBM Plex Mono
- Oswald

## JavaScript Features

- **StormIntensity:** Dynamic storm level based on library size
- **RainSystem:** Canvas-based rain particle animation
- **LightningSystem:** Random lightning flash effects
- **VortexSystem:** Animated vortex rings in hero
- **Toast notifications:** User feedback system
- **Accordions:** Expandable FAQ sections
- **Tabs:** Content switching panels
- **Smooth scroll:** Anchor link navigation

## Build Notes

- No build step required — pure static HTML/CSS/JS
- CSS custom properties for theming
- Semantic HTML throughout
- WCAG AA contrast compliance
