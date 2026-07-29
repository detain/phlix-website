# Terraform Brand Kit — BUILD_LOG.md

## Build Summary

**Date:** 2026-07-29
**Slug:** terraform
**Archetype:** Magician
**Theme:** Planetary terraforming

## What Was Built

Complete static marketing site for the Terraform brand kit — 22 files:

### HTML Pages (9)
- `index.html` — Home page with hero, pitch bullets, features overview, CTA
- `features.html` — All 8 features with detail cards
- `clients.html` — 5 clients (4 native + DLNA)
- `download.html` — Server install command, client cards, ecosystem list
- `plugins.html` — Plugin model documentation
- `docs.html` — Documentation link-out page
- `hub.html` — Phlix Hub description
- `about.html` — Philosophy, license, contributing, FAQ
- `404.html` — Not found page with terraforming theme

### CSS Files (3)
- `css/base.css` — Reset, design tokens, base styles
- `css/theme.css` — Typography, layout, page sections
- `css/components.css` — Header, nav, footer, buttons, cards

### JavaScript (1)
- `js/main.js` — Mobile nav toggle, reduced motion, scroll reveals, code block copy

### Images (4)
- `img/logo.svg` — Wordmark with orbital ring planet
- `img/favicon.svg` — Square favicon with planet/ring
- `img/og.svg` — Source for Open Graph image
- `img/og.png` — Generated 1200x630 social share image

### Config Files (2)
- `robots.txt` — References sitemap
- `sitemap.xml` — All 8 canonical pages

### Documentation (2)
- `SITE.md` — Design rationale, palette, typography, motion
- `BUILD_LOG.md` — This file

## Content Source

All factual content sourced from `shared/content.json`:
- Hero copy
- 8 features with icons
- 5 clients (4 native + DLNA)
- 6 FAQ items
- Footer with 3 columns
- Install command (single line)

## Deviation Notes

- 404 page themed with "Lost in the void" copy to match planetary theme
- CSS animations use the kit's timing values (2.5s pulse, 4s terraform, 3s glow)
- Cards use `overflow-wrap: anywhere` for text wrapping per spec §19.12
- Grid tracks use `minmax(0, 1fr)` to prevent overflow issues

## Verification

- [ ] All 22 files exist
- [ ] og.png generated (171844 bytes)
- [ ] CSS variables all reference `--tf-*` tokens
- [ ] No raw hex colors in component CSS
- [ ] All 8 features present
- [ ] All 5 clients present (stable/beta badges correct)
- [ ] All 6 FAQ present
- [ ] Footer has 3 columns
- [ ] Install command matches content.json
- [ ] License split correct (MPL-2.0 server, MIT clients/plugins)
