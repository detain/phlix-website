# BUILD_LOG — Midnight Jazz

## What was built

Full static site for the Midnight Jazz brand kit. 9 pages + 404, CSS (3 files), JS (1 file), SITE.md, BUILD_LOG.md, REGEN_PLAN.md, robots.txt, sitemap.xml.

## Files created / regenerated

| File | Status |
|------|--------|
| index.html | Full rebuild — custom nav, 5 narrative sections |
| features.html | Full rebuild — album-shelf layout |
| clients.html | Full rebuild — device-lineup layout |
| download.html | Full rebuild — ticket-counter layout |
| plugins.html | Full rebuild |
| docs.html | Full rebuild — summary + link-out |
| hub.html | Full rebuild |
| about.html | Full rebuild — chapter-scroll + FAQ letters-column |
| 404.html | New — "This showing sold out" with Miles SVG |
| css/base.css | Full rebuild — reset, tokens, base elements |
| css/theme.css | Full rebuild — typography, layout, font-face |
| css/components.css | Full rebuild — all component styles |
| js/main.js | Full rebuild — nav, motion, easter eggs, mascot |
| SITE.md | New |
| BUILD_LOG.md | New |
| REGEN_PLAN.md | New |

## Deviation notes

- `intensity_toggle` placed in footer utility row per kit spec
- Barlow Condensed weight 800 not used (file exists but brief says "do not vendor")
- Mascot (Miles) shows on Home and Download only per kit spec

## Verification commands run

```
node tools/gen-og.mjs --site midnight-jazz
node tools/gen-sitemap.mjs --site midnight-jazz
node tools/selfcheck.mjs --site midnight-jazz
node tools/render-check.mjs --site midnight-jazz
```
