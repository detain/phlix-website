# Brand Fidelity & Spirit Review — Moroccan Bazaar

**Variant**: moroccan-bazaar
**Round**: 2
**Reviewer**: reviewer
**Date**: 2026-07-01

## Score
- **Brand fidelity & spirit**: 97 / 100

## ✅ Passed
- Dark midnight-medina background (`#140a04`) with warm-dark card surfaces — never cold or clinical
- Terracotta Ember (`#e8531a`) reserved exclusively for primary CTAs; never used decoratively
- Warm jewel-tone palette (terracotta + copper + indigo) applied consistently — matches SITE.md spec
- Zellige eight-pointed star SVG dividers in pitch section and zellige-pattern favicon
- Mashrabiya lattice shadow overlay via radial-gradient on `.hero::before`
- Lantern-halo radial gradient in hero section matches "Lantern Halo" design token
- Typography roles precisely as specified: Cinzel (display, uppercase, 700), Cormorant Garamond (headlines, 600-700), Lora (body, 400-500), Nunito Sans (UI), Fira Code (mono)
- Self-hosted WOFF2 fonts with `font-display: swap` — no CDN dependency
- Ornate, unhurried aesthetic maintained across all 8 pages
- `prefers-reduced-motion` respected: reveal animations disabled, hover transforms suppressed
- Warm deceleration curve (`cubic-bezier(0.35, 0, 0.15, 1)`) on transitions per spec

## ⚠️ Concerns (non-blocking)
- `BUILD_LOG.md` still references `og.svg` (now `og.png`) — build artefact not user-facing — update or ignore
- `SITE.md` line 90 references `og.svg` in the Visual Assets section — documentation drift, non-blocking

## ❌ Failures (must fix)
- None
