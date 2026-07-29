# Havoc Brand Kit — Site

## Overview

This site is part of the Phlix brand kit system using the **Havoc** identity.

## Havoc Identity

- **Concept**: Controlled chaos — messy but intentional energy
- **Palette**: #F72585 (Explosion Pink), #7209B7 (Deep Purple), #3A0CA3 (Midnight Blue), #4361EE (Electric Blue), #4CC9F0 (Chaos Cyan)
- **Archetype**: Outlaw (chaotic, rebellious, energetic)
- **Experience Archetype**: Immersive

## Key Elements

- Explosion clouds and shockwave effects
- Shake patterns and earthquake wobble
- Jagged edges and fracture lines
- Graffiti splatter accents
- Chaos particles floating in background
- Random glitch bursts during transitions

## Motion Design

All animations respect `prefers-reduced-motion`. When reduced motion is preferred:
- Explosion clouds become instant opacity changes
- Earthquake wobble becomes subtle scale
- Chaos particles become color shifts
- Glitch bursts become instant transitions

## File Structure

```
havoc/
├── index.html          # Landing page
├── features.html        # Features showcase
├── clients.html        # Native clients
├── download.html       # Download page
├── plugins.html        # Plugins directory
├── docs.html           # Documentation
├── hub.html            # Brand kit hub
├── about.html          # About page
├── 404.html            # Error page
├── css/
│   ├── base.css        # Reset, tokens, custom properties
│   ├── theme.css       # Typography, layout, animations
│   └── components.css  # UI components
├── js/
│   └── main.js         # Nav, reveals, chaos effects, glitch
├── img/
│   ├── logo.svg        # Site logo
│   ├── favicon.svg     # Favicon
│   └── og.png          # Social share image
├── robots.txt
└── sitemap.xml
```

## CSS Custom Properties

Colors, fonts, spacing, and animation tokens are defined in `css/base.css` using CSS custom properties for consistency.

## JavaScript Features

- Mobile nav toggle with focus trapping
- Scroll-triggered reveals via IntersectionObserver
- Random glitch burst system
- Screen shake on impact interactions
- Chaos particles on scroll
- Reduced motion detection and fallbacks

## Accessibility

- Skip link for keyboard users
- ARIA labels on navigation
- High contrast focus indicators
- Reduced motion support throughout
- Semantic HTML structure
