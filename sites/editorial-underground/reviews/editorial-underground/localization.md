## Localization — Score: 68/100

### Findings

#### ✅ 1. `<html lang="en">` set from `site.default_locale`
All 8 pages (`index.html`, `features.html`, `clients.html`, `download.html`, `plugins.html`, `docs.html`, `hub.html`, `about.html`) declare `<html lang="en">`. `content.json` has `site.default_locale: "en"` — correct.

#### ⚠️ 2. Hardcoded strings not traced to content.json
**Spec §2** requires all user-facing substantive copy to come from `content.json`. The following are hardcoded and not present in `content.json`:

| Page | Hardcoded string |
|------|-----------------|
| `features.html` | `"Start streaming on your terms."` (CTA h2) |
| `features.html` | `"Everything you need to run your media on your terms. No subscriptions. No tracking. No corporate middleware between you and your library."` (page-header lead) |
| `index.html` | `"Everything your library needs"` (features-overview h2) |
| `index.html` | `"See all features →"` (features-more link — micro-copy; acceptable) |
| `index.html` | `"Ready to stream?"` (CTA h2) |
| `clients.html` | `"Your library. Your screens."` (CTA h2) |
| `clients.html` | `"Native apps for every screen you own. No browser plugins. No casting tricks. Direct connections from device to your server."` (page-header lead) |
| `download.html` | `"Self-hosted. No subscription. No accounts required. Your server. Your library. Your rules."` (page-header lead) |
| `plugins.html` | `"A real contract. A versioned manifest. Drop in, load up, play. No registry required."` (page-header lead) |
| `hub.html` | `"What the Hub does"` (section h2) |
| `hub.html` | `"Self-host or use the public hub"` (section h2) |
| `hub.html` | `"Hub mode in clients"` (section h2) |
| `hub.html` | `"No NAT. No port forwarding. Just play."` (CTA h2) |
| `about.html` | `"Philosophy"` (section h2) |
| `about.html` | `"License"` (section h2) |
| `about.html` | `"Contributing"` (section h2) |
| All pages | `"Skip to main content"` (skip-link) — this is a UI convention string; not strictly required to come from content.json, but the spec does not exempt it |
| All pages | `© 2026 Phlix — BSD-3-Clause` — **year hardcoded**; not locale-safe |

Micro-copy (brand-flavored section eyebrows, button labels, empty/aside lines per spec §2) is permitted; the page-header leads and CTA headlines above are substantive copy that should come from `content.json`.

#### ✅ 3. No locale-unsafe formatting
- `js/main.js`: No `new Date()`, no locale-specific `Intl` usage, no `toLocaleString()`, no number formatting.
- No locale-unsafe inline scripts in any HTML page.
- Only one inline `<script type="application/ld+json">` in `index.html` — contains only static JSON, no locale-specific behavior.

#### ⚠️ 4. Logical CSS properties — partially implemented
**Good:** Layout containers (`theme.css`) consistently use `margin-inline`, `padding-inline`, `inset`. Most flexbox/grid alignment uses logical properties.

**Violations (physical `left`/`right` instead of logical `inline-start`/`inline-end`):**

| File | Line | Selector | Violation |
|------|------|----------|-----------|
| `theme.css` | 231 | `.pitch-bullets li` | `padding-left: var(--space-6)` → should be `padding-inline-start` |
| `theme.css` | 241 | `.pitch-bullets li::before` | `left: 0` → should be `inset-inline-start: 0` |
| `theme.css` | 440–448 | `.reg-marks::before/::after` | `top: 8px; left: 8px` / `bottom: 8px; right: 8px` → should be logical |
| `components.css` | 72, 80 | `.nav-menu a` | `border-left: 2px solid` / `border-left-color` → should be `border-inline-start` |
| `components.css` | 85 | `.nav-menu a[aria-current='page']` | `border-left: 4px solid` + `padding-left` → `border-inline-start` + `padding-inline-start` |
| `components.css` | 98 | `.nav-menu` (mobile) | `left: 0; right: 0` → `inset-inline: 0` |

For RTL readiness, all border-*inline-direction and padding-*inline-start/end properties should be used on nav and bullet list items. The remaining instances would not break RTL but are inconsistent with the spec's intent.

#### ⚠️ 5. No inline scripts with locale-specific behavior
No inline `<script>` blocks with locale-dependent behavior found. The only inline script is the JSON-LD block in `index.html`, which is data-only. External `js/main.js` is loaded via `defer` and contains no locale-specific logic.

**Additional violation — CDN font links (spec §1 / §13):**
All 8 pages contain:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Anton&family=Oswald:wght@700&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
```
**Spec §1** explicitly forbids CDN dependencies in deployed pages. Fonts must be self-hosted as WOFF2 with `@font-face` + `font-display: swap`. This is a significant regression.

---

### Summary
The site is structurally sound for localization: all pages set the correct `lang` attribute, no `Intl`-unsafe JS patterns exist, and the CSS is largely logical-property-compliant. The main deficiencies are:

1. **Multiple hardcoded user-facing strings** (CTA headlines, page-header leads, section headings) that should be sourced from `content.json` — this is the primary score-deduction driver.
2. **Hardcoded year `2026`** in all footer copyright lines — locale-unsafe.
3. **CDN Google Fonts links** on every page — explicit spec violation; must self-host.
4. **Scattered physical CSS properties** (`left`/`right`/`padding-left`/`border-left`) in nav and list components that should use logical equivalents for full RTL readiness.

Score: **68/100** — localization foundation is correct (lang attr, no locale-unsafe JS), but substantive copy and the CDN font violation lower the score meaningfully.
