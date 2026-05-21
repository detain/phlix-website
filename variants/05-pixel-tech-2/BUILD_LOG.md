# Build Log: 05-pixel-tech-2 (Arcade Cabinet)

## Variant Overview
- **Name**: Pixel Tech V2 — Arcade Cabinet
- **Variation**: Retro arcade game aesthetic, pixel art, game UI elements
- **Brand Kit**: Uses 05-pixel-tech-2 tokens from shared/data/brand-kits.json
- **Personality**: Developer-friendly, Futuristic, Gaming, Energetic, Arcade-inspired

## Build Date
2026-05-20

## Key Design Decisions

### Aesthetic: Arcade Cabinet vs Terminal Hacker (-1)
- Different from -1 (terminal hacker) with arcade cabinet styling
- Pixel art elements instead of glitch effects as primary motif
- High score display motifs, joystick direction indicators
- CRT scanline overlay for authenticity
- Coin slot indicators on cards
- "Power-up" style markers on FAQ items

### Color Treatment
- Primary: #00FF41 (matrix green) - same as -1
- Accent: #9B30FF (electric purple) - used differently (more sparingly)
- Background: #0D0D0D (pure dark) - different from -1's #000000
- Secondary: #E8E8E8 (light gray) - different from -1's #C8C8C8

### Typography (Self-Hosted)
- Headlines: Share Tech Mono (downloaded from Google Fonts GitHub repo)
- Body: Fira Sans (downloaded from Mozilla Fira repo)
- UI/Code: Roboto Mono (downloaded from Google Fonts repo)
- No Google Fonts CDN - all fonts in /fonts directory

### UI Elements Specific to -2
- Arcade corner accents on cards (not in -1)
- High Score labels
- Coin slot indicators
- Power-up (+) markers on FAQ
- Joystick direction arrows on nav
- CRT flicker animation (subtle)
- Arcade glow animation on headings
- Score counter animation support

### Files Created
```
variants/05-pixel-tech-2/
├── css/
│   ├── base.css      (CSS reset, variables, arcade palette)
│   ├── theme.css     (Arcade cabinet styled components)
│   └── components.css (Buttons, cards, animations)
├── js/
│   └── main.js       (Mobile nav, arcade effects)
├── img/
│   ├── logo.svg      (Pixel art logo)
│   ├── favicon.svg    (Pixel P favicon)
│   ├── og.svg        (Social share banner)
│   └── PROMPTS.md     (Image generation prompts)
├── fonts/
│   ├── ShareTechMono-Regular.ttf
│   ├── FiraSans-Regular.ttf
│   ├── FiraSans-Medium.ttf
│   └── RobotoMono-Regular.ttf
├── index.html
├── features.html
├── clients.html
├── download.html
├── plugins.html
├── docs.html
├── hub.html
├── about.html
├── sitemap.xml
├── robots.txt
├── manifest.webmanifest
└── BUILD_LOG.md
```

### Technical Requirements Met
- [x] Self-hosted fonts (no Google Fonts CDN)
- [x] font-display: swap on all @font-face declarations
- [x] Mobile hamburger nav with aria-expanded
- [x] SEO metadata (description, keywords)
- [x] Open Graph tags
- [x] Twitter Card tags
- [x] sitemap.xml
- [x] robots.txt
- [x] manifest.webmanifest
- [x] JSON-LD Schema
- [x] All content from shared/content.json
- [x] Same pages as -1

## Differences from -1 (Terminal Hacker)
| Aspect | -1 (Terminal) | -2 (Arcade) |
|--------|-------------|-------------|
| Primary motif | Glitch text | Arcade cabinet |
| Accent usage | Electric purple prominent | Electric purple sparse |
| Background | Pure black #000 | Dark gray #0D0D0D |
| Card style | Border-left accent | Corner bracket accents |
| Animations | Glitch effects | Arcade glow, score counters |
| Nav indicator | Underline | Joystick arrow |
| FAQ markers | None | Power-up (+) symbols |
| CRT effect | Scanlines | Scanlines + flicker |

## Philosophy Checklist
- [x] **Typography**: Distinctive arcade-style (Share Tech Mono headlines, Fira Sans body)
- [x] **Color**: Bold committed palette (neon green dominant, purple accent)
- [x] **Motion**: Arcade glow effects, score counter animations
- [x] **Space**: Generous spacing with arcade cabinet trim elements
- [x] **Depth**: Layered effects (CRT overlay, glow filters, pixel textures)
