# Variant 01-minimalist-cinema-1 — Minimalist Cinema V1 (Ultra-Minimal)

## What's Distinctive

**Ultra-minimal single-column layout.** Every page is a single centered column with enormous whitespace. The layout is almost aggressive in its simplicity — massive padding between sections, tight text blocks surrounded by emptiness. Content breathes; the page never feels crowded.

**Electric blue used as a precision instrument.** Blue (#2D9CFF) appears only on primary CTAs, active nav states, section labels, and the X logo mark. It is never decorative. Every blue element is a decision.

**Thin-line X mark.** The Phlix logo uses a thin-line X (2.5px stroke) rather than a bold cross. It is restrained and elegant, matching the overall aesthetic.

**Header underline motif.** Nav links have a 1.5px blue underline that slides in from left on hover. Simple, unexpected, effective.

## Design Decisions

| Decision | Rationale |
|----------|-----------|
| Single column throughout | Maximum readability, ultra-clean |
| Inlined CSS per page | No render-blocking external CSS requests |
| Sticky header with backdrop-blur | Modern, functional, lightweight |
| 4rem touch targets | Accessibility baseline (44px) |
| `prefers-reduced-motion` respected | Accessibility for motion-sensitive users |
| No JavaScript frameworks | Vanilla JS only; minimal footprint |
| No external CDNs | Fonts would need to be self-hosted for production |

## Font Status

Font files in `fonts/` are **empty placeholders**. The CSS @font-face declarations reference them. For production, replace with real WOFF2 files converted from Google Fonts Montserrat ExtraBold, Inter Regular/Medium, Roboto Medium, and JetBrains Mono.

## Files

```
01-minimalist-cinema-1/
  index.html          — Hero, pitch bullets, 8 feature cards, CTA
  features.html        — All 8 features with icon + description blocks
  clients.html         — 5 client cards (Roku, Tizen, Windows, Mobile, DLNA)
  download.html        — Quickstart, Docker, Docker Compose, requirements
  plugins.html         — Lifecycle hooks, manifest schema
  docs.html            — 4 doc card links (VitePress)
  hub.html             — Hub diagram, public vs self-hosted comparison
  about.html           — Philosophy, license, ecosystem, FAQ
  css/
    base.css          — Reset + tokens + accessibility
    theme.css         — Typography + layout + header/footer
    components.css   — Buttons + cards + lists + callouts
  js/
    main.js           — Mobile nav toggle + smooth scroll
  img/
    logo.svg          — Thin-line X mark + Phlix wordmark
    og.svg            — Open Graph image placeholder
    favicon.svg       — 32px X mark favicon
  fonts/              — (placeholder .woff2 files — replace for production)
  PROMPTS.md           — Design prompt reference
  BUILD_LOG.md         — This build's chronology
```

## Gotchas

- **Fonts won't render in dev**: `fonts/` directory has empty placeholder .woff2 files. CSS `@font-face` declarations point to them. In production, populate with real fonts.
- **CSS inlined**: CSS is duplicated inline in each HTML file to avoid render-blocking. The `css/` directory files are the canonical sources; inline styles are identical copies.
- **OG image is SVG**: Open Graph image is an SVG placeholder. For best sharing results, replace with a proper rasterized PNG at 1200×630px.
