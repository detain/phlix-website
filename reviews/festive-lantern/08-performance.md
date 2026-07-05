# Dimension 8 — Performance

## Score: 78/100

### No CDNs for JS (only Google Fonts for font loading — acceptable)

**✅ No third-party JS CDNs** — No `<script src="https://...">` tags found. `main.js` is a single local file loaded with `defer`. No jQuery, no Bootstrap JS, no analytics scripts.

**✅ Google Fonts used as stylesheet (not JS embed)** — theme.css:7:
```css
@import url('https://fonts.googleapis.com/css2?family=...');
```
This is the acceptable font-loading pattern. No `<script>` font loader CDN.

### All scripts use `defer`

**✅ Every `<script>` has `defer`** — Verified across all 8 HTML pages:
- index.html:232 → `<script src="js/main.js" defer></script>`
- about.html:149 → same
- hub.html:123 → same
- docs.html:121 → same
- plugins.html:121 → same
- download.html:161 → same
- clients.html:183 → same
- features.html:220 → same

### Images are SVG (vector, lightweight)

**✅ All images are SVG** — Verified file extensions in the `img/` directory and all `<img>` src attributes:
- `img/logo.svg`, `img/favicon.svg`, `img/og.svg` — all vector, no raster alternatives
- No `<img>` tags reference `.jpg`, `.png`, `.webp`, or `.gif` files
- All icons are inline SVG within the HTML (e.g., hero section, feature cards)

### CSS uses custom properties from base.css tokens (no redundant values)

**✅ Design tokens in base.css** — All color, spacing, radius, font, shadow, and gradient values are defined as CSS custom properties on `:root` at base.css:14–85. No raw color values found in components.css or theme.css.

**⚠️ Literal values in components.css** — Several hardcoded color values appear:
- `components.css:201`: `background: #e6b41c` (hover state for btn-primary, should be a token)
- `components.css:203`: `box-shadow: 0 0 20px rgba(212,160,23,0.7), 0 0 48px...` (literal instead of token)
- `components.css:237`: `background: #c0392b` (btn-danger hover, literal)
- `components.css:238`: `border-color: #c0392b` (same)
- `components.css:313`: `rgba(39,174,96,0.12)` (status-stable background — close to `--color-success` token but wrapped in rgba)
- `components.css:318`: `rgba(230,126,34,0.12)` (status-beta background — close to `--color-warning`)
- `components.css:324`: `rgba(107,58,42,0.3)` (status-deprecated background)

These are minor but represent deviations from the pure token system. Token references would be `var(--color-success)`, not `rgba(39,174,96,0.12)`.

### font-display: swap used for web fonts

**❌ font-display not specified** — theme.css:7 uses Google Fonts `@import`:
```css
@import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700;900&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;600&family=Noto+Serif+SC:wght@700;900&family=Noto+Serif:wght@400;500&display=swap');
```

The `display=swap` parameter IS included in the URL (`&display=swap`), which enables `font-display: swap` behavior at the Google Fonts infrastructure level. However, `font-display: swap` is not declared via a `@font-face` rule in the site's CSS.

**⚠️ Clarification** — Google Fonts serves fonts with `font-display: swap` by default when the `&display=swap` parameter is present in the request URL. Since the site uses `&display=swap` in the import URL, swap IS effectively enabled. A purely self-hosted `@font-face` declaration would make this more explicit and certifiable. However, this passes the stated requirement as written.
