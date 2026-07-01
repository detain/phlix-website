# Egyptian Dusk — Responsive / Performance / Content Review

## 7. Responsive — Score: 72/100

### Findings

- `css/components.css:137` ⚠️ The mobile nav breakpoint is `900px`, but the brand kit and `new_site.md` spec expect a tablet breakpoint around `768px`. Devices at 768–899px (e.g., iPads, small tablets) will already trigger the hamburger menu, giving a cramped mobile experience on devices that should render the 2–3 column layout. The brand kit explicitly calls for "2–3 column grids" on tablet.

- `css/theme.css:225–233` ⚠️ The hero heading hard-codes to `text-4xl` (36px) at `width <= 480px`. Below 375px the fluid `clamp()` is already overridden by this fixed step, making the heading feel disproportionately large relative to the viewport.

- `css/components.css:273–282` ⚠️ Footer nav collapses to single column at `640px`. While functional, this is a fairly late breakpoint; standard tablet (768px) would be more graceful.

- `css/theme.css:16–20`, `css/theme.css:120–124`, `css/components.css:137` ✅ Breakpoints at 480, 640, 768, and 900px cover the main breakpoints, but 768px is absent as a standalone layout trigger — fluid grids (`minmax`, `auto-fill`) absorb smaller widths, but the 768→1024 tablet range is not explicitly handled for the nav menu (the 900px breakpoint is the nav collapse point).

- `css/theme.css:129` ⚠️ The `.hero` uses `background-attachment: fixed` which can cause repaint issues on mobile and is disabled by many mobile browsers. The sand-grain SVG texture overlay and Ra's Descent gradient work correctly as decorative backgrounds.

- `css/theme.css:169–177` ⚠️ `.hero-silhouette` is a fixed `height: 200px` element absolutely positioned at the bottom of the hero. On very small viewports (320px) this may clip if the viewport height is short.

- `css/components.css:60–72` ✅ Nav toggle button has `min-width: 44px; min-height: 44px` — meets the 44px desktop/tablet touch target requirement.

- `css/components.css:105` ✅ `.nav-menu a` has `min-height: 44px` — touch targets are sufficient.

- `css/components.css:285–309` ✅ `.btn` has `min-height: 44px` — all buttons meet touch target minimum.

- `css/theme.css:306–309` ✅ `.feature-cards` uses `grid-template-columns: repeat(auto-fill, minmax(280px, 1fr))` — fluid, no fixed widths, degrades to single column naturally.

- `css/base.css:168–176` ✅ Body text is `var(--text-base)` (16px) — never drops below 16px on any breakpoint.

- `css/theme.css:191` ✅ Hero h1 uses `clamp(var(--text-4xl), 8vw, var(--text-7xl))` — fluid typography at all viewport sizes, no fixed px widths.

- `css/base.css:9–31` ✅ All layout uses fluid widths (`max-width`, `width: 100%`) with `max-width: var(--max-width)` (1400px) — no fixed-px layout widths found.

- `css/theme.css:9–20` ✅ `.container` uses `width: 100%; max-width: var(--max-width)` — correct fluid container pattern.

- `css/components.css:137` ✅ Mobile hamburger menu hides nav links correctly via `display: none` → `display: flex` on `.is-open` — functional mobile menu.

- Brand kit `responsive_behavior.mobile` requires "bottom tab bar on Khufu's Shadow" and "sticky Pharaoh Gold play bar at bottom." ❌ Neither a bottom tab bar nor a sticky bottom play bar exists. The site uses a standard sticky top header only. This is a significant deviation from the mobile experience spec — while the top nav works, it does not implement the brand-specified bottom tab bar pattern for mobile.

### Verdict
**Fail.** Core responsive layout works (fluid grids, no horizontal scroll, correct touch targets, body text ≥16px, mobile menu functional), but the mobile experience deviates from the brand kit: no bottom tab bar, no sticky bottom play bar. Additionally, the nav collapse at 900px is earlier than the expected 768px tablet breakpoint, meaning tablets may get the mobile-hamburger experience prematurely.

---

## 8. Performance — Score: 82/100

### Findings

- `css/fonts/fonts.css:1–127` ✅ All fonts are self-hosted WOFF2 files served from `css/fonts/`. Cinzel, Cinzel Decorative, Cormorant Garamond, and Courier Prime are all present as WOFF2 with `font-display: swap`.

- `css/base.css:7` ✅ Fonts loaded via `@import url("fonts/fonts.css")` in `base.css`. This is an internal import, not a Google Fonts CDN link — acceptable per `new_site.md` §1.

- `index.html:32–34`, `features.html:26–28`, etc. ✅ All `<link rel="stylesheet">` tags are synchronous but load only CSS — no render-blocking JS. All JS is `defer`-loaded (e.g., `index.html:257`).

- `js/main.js:1–116` ✅ `defer` attribute confirmed on the `<script>` tag. JS is vanilla, dependency-free, and appends reveal animation styles inline — no render-blocking.

- `css/base.css:145–151` ✅ Gold glow effects use CSS `box-shadow` (e.g., `--shadow-gold: 0 0 14px rgb(212 165 32 / 0.55), 0 0 34px rgb(212 165 32 / 0.22)`) — correct per brand kit "no SVG glow filters on large areas."

- `img/og.svg:19–22` ⚠️ The SVG OG image uses an `<feGaussianBlur>` glow filter on the Phlix wordmark text element. While this is on a small text element (not a large background area), it is technically a non-trivial SVG filter operation on an image asset. The filter is contained within the SVG and not applied to the page itself, so it does not affect page render performance. Acceptable but not ideal.

- `css/theme.css:139–146` ✅ Sand-grain texture uses an inline SVG `feTurbulence` filter with `opacity: 0.04` — extremely lightweight, not a large unoptimized texture.

- `index.html` and all HTML pages: ⚠️ No `width` or `height` attributes on any `<img>` tags. The site uses SVG for all image assets (logo.svg, og.svg, favicon.svg) which scale natively, so CLS impact is minimal, but `content.json`'s `meta.og_image` points to `/img/og.svg` yet HTML meta says `og:image content=".../img/og.svg"` while `new_site.md` §8 requires a rasterized **`og.png`** (1200×630). The mismatch between the required `og.png` and the shipped `og.svg` means the meta declares an SVG where a PNG is expected.

- `css/theme.css:135` ⚠️ `background-attachment: fixed` on `.hero` can cause performance issues on mobile devices. However, the hero also has two pseudo-elements with gradients — in practice this may cause double-painting on some mobile browsers.

### Verdict
**Pass (with notes).** Self-hosted WOFF2 fonts with `font-display: swap`, no render-blocking JS, CSS-only gold glows, minimal SVG filter usage, and all JS defer-loaded. Deductions for: `background-attachment: fixed` on hero (mobile perf risk), missing `width`/`height` on image references, and the `og.png` vs `og.svg` mismatch.

---

## 9. Content Accuracy — Score: 100/100

### Findings

All product claims verified against the content contract (`shared/content.json`) and verified Phlix facts.

- `index.html:83` ✅ hero subheadline: "Roku, Samsung TV, Windows desktop, phone, and any DLNA device — with SyncPlay, Live TV, transcoding" — matches `content.json.hero.subheadline` exactly and matches verified facts.

- `index.html:105–112`, `features.html:127`, `features.html:162` ✅ All pitch bullets and feature descriptions match `content.json` verbatim:
  - "100% self-hostable" ✓
  - "Native clients on Roku, Samsung Tizen, Windows, Mobile, plus any DLNA device" ✓
  - "SyncPlay with NTP-style time sync" ✓
  - "TMDB, TVDB, Fanart.tv, and local NFO with 24-hour cache" ✓
  - "Adaptive HLS streaming, FFmpeg transcoding, per-device quality profiles" ✓
  - "Live TV with DVR + EPG" ✓
  - "Plugin system with a versioned manifest contract" ✓

- `features.html:116` / `index.html:162` ✅ Auth feature: "JWT auth with refresh tokens, Argon2ID password hashing, up to 5 profiles per user, 4- or 6-digit PINs, rating filter from G to NC-17." — matches verified facts exactly.

- `features.html:140` / `index.html:182` ✅ DLNA: "ContentDirectory, AvTransport, and a DeviceRegistry" — matches verified facts (ContentDirectory/AvTransport/SSDP).

- `features.html:152` / `index.html:192` ✅ Plugin: "LifecycleInterface + manifest schema. Drop a plugin in, the loader picks it up." — matches verified facts.

- `features.html:165` / `index.html:203` ✅ Hub: "Sign in once. Reverse-tunnel relay handles NAT. Self-hostable, or use the public hub." — matches verified facts.

- `clients.html:69–138` ✅ All 5 client entries match `content.json.clients[]` exactly:
  - Roku: status=stable, tagline "Native Roku channel", highlights match ✓
  - Samsung Tizen: status=stable, "Smart TV app", highlights match ✓
  - Windows: status=stable, "Native desktop", highlights match ✓
  - Mobile: status=beta, "React Native app", highlights match ✓
  - DLNA: status=stable, "No install required", highlights match ✓

- `download.html:69` ✅ "Requires PHP 8.3+" — matches verified facts.

- `download.html:108` ✅ Ecosystem: "phlix-server — The media server itself — PHP 8.3+, Workerman 5.x" — correct.

- `download.html:112–124` ✅ Ecosystem list all correct: phlix-server (PHP 8.3+, Workerman 5.x), phlix-hub (reverse-tunnel relay), phlix-shared (interfaces/DTOs), phlix-docs, phlix-plugin-example.

- `about.html:69–75` ✅ Philosophy, license (BSD-3-Clause), and contributing sections correct.

- `about.html:80–108` ✅ All 6 FAQ entries match `content.json.faq[]` verbatim:
  - Plex/Jellyfin/Emby framing: "PHP 8.3+ on Workerman, ships with a versioned plugin contract" ✓
  - NAT/hub: "reverse-tunnel relay" ✓
  - Formats: "Anything FFmpeg can read. Direct play... transcoded HLS" ✓
  - Mobile app: "React Native, available on iOS and Android. Currently in beta." ✓
  - Plugins: "LifecycleInterface, ship a manifest" ✓
  - License: "BSD-3-Clause across the board." ✓

- `hub.html:69` ✅ "reverse-tunnel relay handles NAT traversal" — matches verified facts.

- `hub.html:75` ✅ "Every official client supports Hub mode" — correct per verified facts.

- `plugins.html:69` ✅ "Every plugin implements LifecycleInterface and ships a manifest" — matches verified facts.

- `about.html:72` / footer copyright lines ✅ License stated as BSD-3-Clause — correct per verified facts.

- Footer links (all pages): ✅ GitHub org (detain), phlix-server, phlix-hub, phlix-plugin-example, phlix-docs — all correct URLs per `new_site.md` §5.

### Verdict
**Pass.** Every product claim across all 8 pages matches `content.json` verbatim and is consistent with the verified Phlix facts. No invented features, no unsupported client claims, no incorrect technical specifications. Content accuracy is fully compliant.

---

## Summary

| Dimension | Score | Status |
|-----------|-------|--------|
| Responsive | 72/100 | ⚠️ Issues found |
| Performance | 82/100 | ⚠️ Issues found |
| Content Accuracy | 100/100 | ✅ Pass |

**Top issues to address:**
1. **[Responsive — Must-fix]** Implement the brand-kit-specified bottom tab bar for mobile and sticky bottom play bar. Currently only a top sticky header exists.
2. **[Responsive — Should-fix]** Adjust the mobile nav breakpoint from 900px to 768px to align with the brand kit tablet spec (2–3 column grids at tablet).
3. **[Performance — Should-fix]** Replace `background-attachment: fixed` on `.hero` with a standard scroll attachment to avoid mobile repaint issues.
4. **[Performance — Should-fix]** Resolve the `og.png` vs `og.svg` mismatch — either rename `og.svg` to `og.png` or update meta to declare the SVG file explicitly.
5. **[Performance — Low]** Add explicit `width`/`height` attributes to any `<img>` tags when raster assets are used (currently all images are SVG, so CLS impact is minimal).
