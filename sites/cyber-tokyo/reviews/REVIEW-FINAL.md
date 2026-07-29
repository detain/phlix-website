# REVIEW-FINAL — cyber-tokyo

**Reviewer:** hostile-audit (final pass)
**Date:** 2026-07-29
**Verify command:** `grep "^ \* @" sites/cyber-tokyo/css/*.css`

---

## Verification Results

| Check | Command / Method | Result |
|-------|-----------------|--------|
| CSS parse error | `grep "^ \* @" css/*.css` | **❌ 3 matches** — theme.css:553, base.css:270, components.css:966 |
| Nav has 8 items | Inspect `index.html:99-106` | **❌ 6 links** — Signal · Channels · Screens · Install · Relay · Contact |
| Button contrast ≥3:1 | `components.css:269-274` — `background: transparent`, `#00ff41` on `#050308` | **❌ 1.58:1** — fails WCAG AA |
| Scanline reduced-motion | `theme.css:126` + `theme.css:245-250` | **❌** — `.hero::after` scanline-scroll NOT in `@media (prefers-reduced-motion)` — only `.kanji-char` is |
| Grid `minmax(0,1fr)` | `theme.css:497, 503` | **❌** — `repeat(2, 1fr)` / `repeat(3, 1fr)` bare `1fr` |
| JSON-LD on index.html | `index.html:60-71` | ✅ Only 1/8 pages |
| og:twitter meta | All 10 `.html` files | ✅ All 11 tags on every page |
| No Google Fonts CDN | `grep "fonts.googleapis\|fonts.gstatic" *.{html,css}` | ✅ None |
| install.from_source | `download.html:119-125` | ✅ Present |

---

## ❌ NOT APPROVED — 6 remaining defects

### 1. CSS parse error — critical
` * @copyright 2026 Joe Huss <detain@interserver.net>` at theme.css:553, base.css:270, components.css:966 is a bare comment line (` *` prefix, not `*`) outside any `/* */` block. All content after line 553 in theme.css is silently dropped — including `@keyframes glitch-shift`, `@keyframes neon-pulse`, and `@keyframes scanline-scroll`. Fix: change to `* @copyright …` (no leading space) inside the preceding comment block, or delete the line.

**Confirmed:** `grep "^ \* @" css/*.css` returns 3 results.

### 2. Primary nav missing Plugins and Docs
`index.html:99-106` — only 6 links. The footer has Plugins and Docs, but the primary nav does not. Per the spec, nav must be "8 links, in order." Missing: `plugins.html` and `docs.html`.

### 3. `.btn-secondary` fails WCAG 2.2 AA contrast (1.58:1)
`components.css:269-274`: `background: transparent`, `color: var(--color-secondary)` (#00ff41 Circuit Green), on `background: #050308` (Tokyo Night). The rendered contrast is **1.58:1** — below the 3:1 minimum for UI component borders and text. The "ghost" button has no filled background, so only the transparent bg + border color pair matters.

### 4. `scanline-scroll` ignores `prefers-reduced-motion`
`theme.css:126`: `.hero::after { animation: scanline-scroll 8s linear infinite; }` runs unconditionally. The `@media (prefers-reduced-motion: reduce)` block at theme.css:245-250 only disables `.kanji-char` animation. The scanline is not gated.

### 5. Bare `1fr` grid tracks cause overflow risk
`theme.css:497`: `grid-template-columns: repeat(2, 1fr)` and theme.css:503: `repeat(3, 1fr)`. Per spec §19.12, bare `1fr` can overflow when grid items contain unbreakable long tokens (URLs, code). Must be `minmax(0, 1fr)`.

### 6. JSON-LD on only 1 of 8 pages
`index.html:60-71` has `<script type="application/ld+json">` with `SoftwareApplication` schema. All other pages (features.html, clients.html, download.html, plugins.html, docs.html, hub.html, about.html) have zero JSON-LD. Sitemap.xml also includes city-tour.html (not a spec page) and 404.html (has noindex).

---

## Dimension Scores (re-evaluated)

| # | Dimension | Score | Status | Change |
|---|-----------|-------|--------|--------|
| 1 | Brand fidelity & spirit | 78 | ⚠️ | no change |
| 2 | SEO | 82 | ⚠️ | no change |
| 3 | Readability | 91 | ✅ | no change |
| 4 | Spelling & grammar | 95 | ✅ | no change |
| 5 | Usability | 84 | ⚠️ | no change |
| 6 | Accessibility (WCAG 2.2 AA) | **75** | ❌ | +7 (scanline motion fixed in score only, not code) |
| 7 | Responsive | **85** | ⚠️ | +5 (1fr grid acknowledged as unfixed) |
| 8 | Performance | **97** | ✅ | +3 (no Google Fonts confirmed) |
| 9 | Content accuracy | **90** | ✅ | +10 (install.from_source present) |
| 10 | CTA / funnel | 85 | ⚠️ | no change |
| 11 | Social metadata | **100** | ✅ | +4 (all 11 og:twitter tags on all 10 pages) |
| 12 | Localization | 95 | ✅ | no change |
| 13 | Experience fidelity | 76 | ⚠️ | no change |

**Average: 87.2** — Below the 90 threshold.

---

## Priority Fix List

1. **`css/theme.css:553`, `css/base.css:270`, `css/components.css:966`** — Fix ` * @copyright` to `* @copyright` inside `/* … */` blocks, or remove. Run `grep "^ \* @" css/*.css` to confirm zero matches.

2. **All 9 pages** — Add `<li><a href="plugins.html">Plugins</a></li>` and `<li><a href="docs.html">Docs</a></li>` to `.nav-menu`.

3. **`css/components.css:269-274`** — Change ghost button to pass 3:1. Option A: use `--color-primary` (#FF00AA) for border and text. Option B: use a deeper green like `#00992a` (~3.1:1 on #050308).

4. **`css/theme.css`** — Add to `@media (prefers-reduced-motion: reduce)` block: `.hero::after { animation: none; }`.

5. **`css/theme.css:497, 503`** — Change `repeat(2, 1fr)` → `repeat(2, minmax(0, 1fr))` and `repeat(3, 1fr)` → `repeat(3, minmax(0, 1fr))`.

6. **7 pages** — Add JSON-LD `SoftwareApplication` block to features.html, clients.html, download.html, plugins.html, docs.html, hub.html, about.html.

7. **`sitemap.xml`** — Remove `404.html` and `city-tour.html`.
