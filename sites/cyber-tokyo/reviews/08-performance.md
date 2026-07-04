# Dimension 8: Performance

## Score: 30/100

## Severity: ❌

## Findings

**CRITICAL**: Font files referenced by `@font-face` declarations do not exist. The `css/fonts/` directory is missing entirely. All `@font-face` src URLs will 404 at runtime, causing FOIT (Flash of Invisible Text) or fallback font rendering.

- `theme.css:4-11`: `@font-face` for Space Grotesk Medium + Bold — `../fonts/SpaceGrotesk-Medium.woff2` and `../fonts/SpaceGrotesk-Bold.woff2` — files do not exist (the `css/fonts/` directory is absent from the site)
- `theme.css:21-27`: Bebas Neue Regular — `../fonts/BebasNeueRegular.woff2` — does not exist
- `theme.css:29-36`: IBM Plex Sans Regular + Medium — `../fonts/IBMPlexSans-Regular.woff2` and `../fonts/IBMPlexSans-Medium.woff2` — do not exist
- `theme.css:38-45`: IBM Plex Mono Regular + SemiBold — `../fonts/IBMPlexMono-Regular.woff2` and `../fonts/IBMPlexMono-SemiBold.woff2` — do not exist

**Verification**: `ls /home/sites/phlix/phlix-website/sites/cyber-tokyo/css/fonts/` returns "FONTS_DIR_MISSING". The fonts directory was never created; no `.woff2` files are present anywhere in the site folder.

## What passed

- **No CDN dependencies**: No `<link>` tags to `fonts.googleapis.com` or any external font CDN ✅
- **JavaScript is deferred**: `<script src="js/main.js" defer>` on all pages — non-render-blocking ✅
- **CSS loaded via `link rel=stylesheet`** (not inline) — allows parallel fetching ✅
- **Hero has no heavy raster image**: The hero uses only CSS gradients (`var(--gradient-shibuya)`, `var(--gradient-akihabara)`) and CSS scan-line overlays — zero image weight ✅
- **`font-display: swap` declared on all @font-face rules** (`theme.css:10,18,26,35,44`) — prevents invisible text during font load ✅
- **No render-blocking JS** — all JS is `defer`-loaded ✅
- **Icons are inline SVG** — no icon font CDN, no raster icon images ✅
- **Scroll reveal animations are optional** and disabled when `prefers-reduced-motion` is set (`js/main.js:38`) ✅
- **Glitch animations gated by `prefers-reduced-motion`** (`js/main.js:61`) ✅

## Required fix

The `css/fonts/` directory must be created and populated with the 7 self-hosted WOFF2 font files referenced in `theme.css`:
- `SpaceGrotesk-Medium.woff2`, `SpaceGrotesk-Bold.woff2`
- `BebasNeueRegular.woff2`
- `IBMPlexSans-Regular.woff2`, `IBMPlexSans-Medium.woff2`
- `IBMPlexMono-Regular.woff2`, `IBMPlexMono-SemiBold.woff2`

The spec (new_site.md §8) states: "Self-host fonts as WOFF2 and declare them with `@font-face` + `font-display: swap`." The `@font-face` declarations are correct, but the referenced files are absent.
