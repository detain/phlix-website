# RPG Inventory Brand Kit — Build Log

## Date: 2026-07-29

## What Was Built

Complete brand kit site for the `rpg-inventory` theme.

### Files Created

**HTML Pages (9):**
- `index.html` — Home page with hero, pitch bullets, features overview, CTA banner
- `features.html` — All 8 features with detail cards
- `clients.html` — 5 clients (4 native + DLNA)
- `download.html` — Server install, client downloads, ecosystem
- `plugins.html` — Plugin model, ecosystem plugins, write your own
- `docs.html` — Documentation links and ecosystem
- `hub.html` — Hub description, self-host vs public, client support
- `about.html` — Philosophy, license, contributing, FAQ
- `404.html` — Error page with RPG-themed messaging

**CSS Files (3):**
- `css/base.css` — Reset, tokens, accessibility, base styles
- `css/theme.css` — Typography, layout, page sections, code blocks
- `css/components.css` — Header, nav, buttons, cards, footer, animations

**JavaScript (1):**
- `js/main.js` — Mobile nav, scroll reveals, code copy, smooth scroll

**Images (3):**
- `img/logo.svg` — Shield logo with play triangle and PHLIX text
- `img/favicon.svg` — Simplified shield mark
- `img/PROMPTS.md` — Generation prompt documentation

**Config Files (4):**
- `robots.txt` — References sitemap
- `sitemap.xml` — All 8 canonical pages
- `SITE.md` — Design rationale
- `BUILD_LOG.md` — This file

## Compliance Notes

- ✅ 4 native clients + DLNA (never "5")
- ✅ 8 features from content.json
- ✅ 6 FAQ from content.json with `<details>/<summary>`
- ✅ Install command in hero CTA (index.html) AND download.html
- ✅ Footer: 3 columns + "Open-source media, on your terms."
- ✅ CSS `@copyright` inside `/* */` comment blocks
- ✅ Grid: `minmax(0, 1fr)` not bare `1fr`
- ✅ All pages: OG + Twitter meta, `twitter:creator=@detain`
- ✅ No Google Fonts CDN — system fonts with fallbacks
- ✅ MPL-2.0 (server/hub), MIT (clients/plugins) — never "across the board"

## Deviation from Spec

None — all requirements followed per `new_site.md` and `content.json`.

## Follow-ups

- Generate `og.png` using `node tools/gen-og.mjs --site rpg-inventory`
