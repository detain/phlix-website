# DIMENSION 1: Brand Fidelity & Spirit — Swiss Modernist Site Review

## Score: 65 / 100

---

## Severity Scale
- ✅ Correct (matches kit)
- ⚠️ Minor deviation (technically wrong but brand impact is low)
- ❌ Major violation (actively undermines Swiss Modernist identity)

---

## 1. Color System

### Token Accuracy
| Token | Value | Kit Value | Verdict |
|-------|-------|-----------|---------|
| `--color-primary` | `#E8001C` | `#E8001C` | ✅ |
| `--color-secondary` | `#1A1A1A` | `#1A1A1A` | ✅ |
| `--color-tertiary` | `#888888` | `#888888` | ✅ |
| `--color-bg` | `#F8F8F4` | `#F8F8F4` | ✅ |
| `--color-surface` | `#EFEFEB` | `#EFEFEB` | ✅ |
| `--color-surface-alt` | `#E5E5E0` | `#E5E5E0` | ✅ |
| `--color-text` | `#121212` | `#121212` | ✅ |
| `--color-focus` | `#E8001C` | `#E8001C` | ✅ |

Base tokens are correct across all three CSS files.

### Basel Red (#E8001C) — EXCEEDS once-per-view rule ❌

**Rule broken:** "Basel Red is applied once per view to the single most important element." (`design_principles[2]`)

The home page (`index.html`) uses Basel Red **8 times** across these elements:
1. `<meta name="theme-color" content="#E8001C">` (line 28)
2. Logo SVG `<rect>` underrule (line 130)
3. `.hero-headline-rule` div (line 196, CSS `base.css:239`)
4. Pitch item `::before` bullets (line 281, CSS `theme.css`)
5. `.features-link:hover` color (line 369, CSS `theme.css`)
6. `.nav-link[aria-current="page"]` border-bottom (line 236, CSS `components.css`)
7. `.pitch-item::before` (CSS `theme.css:281`)
8. `.btn-primary` (line 161)

Only one of these — the primary CTA button — qualifies as the "single most important element." The logo underrule and hero-headline-rule are structural Basel Red elements permitted by the header_motif, but the pitch bullets, hover states, and active nav indicator are extractions of Basel Red into non-primary contexts.

**Severity: CRITICAL** — this is the single most brand-defining rule of the Swiss Modernist kit. Diluting the single red accent to a common UI color destroys the surgical precision that defines the identity.

**Affected files:**
- `index.html:28` — `<meta name="theme-color">`
- `index.html:130` — logo SVG rect
- `index.html:161` — `.btn.btn-primary`
- `index.html:196` — `.hero-headline-rule`
- `css/theme.css:281` — `.pitch-item::before`
- `css/theme.css:369` — `.features-link:hover`
- `css/components.css:236` — `.nav-link[aria-current="page"]`

---

## 2. Typography

### Font Stacks ✅
All three declared typefaces are present:
- `Inter` for headline/body/UI — correct
- `Barlow Condensed` for display — present (woff2 via local() fallback)
- `JetBrains Mono` for mono — present (woff2 via local() fallback)

### Self-Hosted Fonts ⚠️

**Violation:** The spec (`new_site.md §8`) requires: "Self-host fonts as WOFF2 and declare them with `@font-face` + `font-display: swap`. No CDN dependencies in the deployed page (no Google Fonts `<link>` to `fonts.googleapis.com`)."

Two violations:

1. **Google Fonts CDN link** — `index.html:31-32`:
   ```html
   <link rel="preconnect" href="https://fonts.googleapis.com" crossorigin>
   ```
   This is a CDN dependency. Google Fonts is explicitly prohibited.

2. **`@font-face` sources use `local()` only** — `index.html:34-96`:
   ```css
   @font-face {
     font-family: 'Inter';
     src: local('Inter Black'), local('Inter-Black');
   }
   ```
   No actual WOFF2 files are hosted at `css/fonts/`. The fonts resolve to whatever is installed locally. If no Inter is installed, the browser falls back to system sans-serif. Barlow Condensed and JetBrains Mono are **not declared at all** in any `@font-face` block, meaning they also rely on whatever the system provides.

**Severity: MAJOR** — Typography is "the entire visual identity of this system" (kit §7). A site without confirmed font files is a site without confirmed typography.

### Typography Rules Compliance

| Rule | Status | Notes |
|------|--------|-------|
| Inter is the only typeface | ✅ | No other typefaces found |
| Headlines use 800–900 weight | ✅ | All h1/h2/h3 use 900 |
| Tight negative tracking (-0.04em) | ✅ | Applied on headlines |
| Left-aligned body copy | ✅ | No justified text found |
| Strict type scale | ⚠️ | `clamp()` used for hero; breaks exact 12/14/16/18/24/32/48/64/96 scale |
| Uppercase for category labels only | ✅ | Correct usage on eyebrow, nav, badges |
| Line height body 1.6 | ✅ | `--line-height-normal: 1.6` correct |

**Minor:** `clamp(var(--text-3xl), 5vw, var(--text-4xl))` at `theme.css:186` produces sizes outside the strict 12/14/16/18/24/32/48/64/96px scale mandated by `typography_rules`.

---

## 3. Motion

### Violations

**`scroll-behavior: smooth`** — `base.css:16-17`:
```css
html {
  scroll-behavior: smooth;
}
```
The kit specifies "Motion is mechanical and instantaneous: elements snap, they do not drift." and "Snap to position — no easing curve." Smooth scrolling is the literal opposite of this. Swiss Modernist is hard cuts and snap positions only.

**Severity: MAJOR**

---

**Scroll Reveal Animation** — `js/main.js:73`:
```js
entry.target.style.transition = 'opacity 200ms ease, transform 200ms ease';
```
The `ease` keyword is not in the permitted easing list (`linear`, `steps(1, end)`, `cubic-bezier(0.0, 0.0, 0.2, 1)`). The 200ms duration also exceeds the "fast" classification and the 100ms minimum. This animation appears on `.feature-card`, `.client-card`, and `.download-card` elements.

**Severity: MAJOR**

---

**Nav transitions** — `components.css:226`:
```css
transition: border-color 80ms linear, color 80ms linear;
```
80ms is within the permitted range ("100ms — the fastest acceptable transition" — 80ms is faster, which is acceptable), and `linear` is in the allowed easing list. ✅

**Button press transitions** — `components.css:24`:
```css
transition: background-color 80ms linear, border-color 80ms linear;
```
80ms + `linear` — acceptable. ✅

---

## 4. Shapes

| Element | Kit Rule | Implementation | Verdict |
|---------|----------|----------------|---------|
| Primary UI border radius | 0px | `--radius-sm: 0px` | ✅ |
| Card corners | 0px | `border-radius: 0px` on all cards | ✅ |
| Button corners | 0px | `border-radius: var(--radius-sm)` = 0px | ✅ |
| Input corners | 0px | `border-radius: var(--radius-sm)` = 0px | ✅ |
| Badge corners | 0px | `border-radius: var(--radius-sm)` = 0px | ✅ |
| FAB | 0px | `border-radius: 0px` | ✅ |

All corner radii are correct. No rounded corners on primary UI.

---

## 5. Grid & Layout

- 12-column grid defined at `theme.css:112-116` ✅
- 8px base spacing scale used throughout (`--space-*` tokens) ✅
- 24px gutters (`--grid-gutter`) ✅
- Max width 1400px ✅
- Heavy horizontal rule dividers (2px–4px) used as structural anchors ✅

---

## 6. Logo

`img/logo.svg:1-7` — Wordmark in Inter Black on Grid White, 4px Basel Red underrule. Correct per `logo_rules`. ✅

`img/favicon.svg:1-5` — Square favicon in Basel Red with white "P". The full-red background is a deviation from the kit's favicon guidance (which says "square mark in the kit's primary color") but the shape is sharp (0px radius) and the color is correct. Acceptable. ✅

---

## 7. No Mascots / No Photographs of People

No mascots, no character illustrations, no photographic images of people found anywhere. ✅

---

## 8. Brand Opposites Checklist

| Brand Opposite | Avoided? | Notes |
|----------------|----------|-------|
| Not warm or cozy | ✅ | Sharp geometry, no soft tones |
| Not playful or decorative | ✅ | No decorative elements |
| Not colorful | ✅ | Only black, white, grays, and one red |
| Not rounded or soft | ✅ | 0px corners throughout |
| Not expressive or emotional | ⚠️ | "Your server, your rules" is slightly emphatic; not explicitly forbidden |
| Not dark-background | ✅ | All backgrounds are Grid White or Column White |
| Not chaotic | ✅ | Strict grid alignment throughout |

---

## Summary of Critical Findings

| # | Issue | Severity | File:Line |
|---|-------|----------|-----------|
| 1 | Basel Red appears 8× on home page (rule: once) | ❌ CRITICAL | `index.html` |
| 2 | Google Fonts CDN link present | ❌ CRITICAL | `index.html:31-32` |
| 3 | No actual WOFF2 font files; only `local()` fallbacks | ⚠️ MAJOR | `index.html:34-96` |
| 4 | Barlow Condensed and JetBrains Mono not declared | ⚠️ MAJOR | `index.html` |
| 5 | `scroll-behavior: smooth` on `<html>` | ❌ MAJOR | `base.css:16` |
| 6 | Scroll reveal uses `200ms ease` (non-compliant easing) | ❌ MAJOR | `js/main.js:73` |

---

## What Works

- Color tokens are accurate and complete
- All corner radii are 0px on primary UI
- 12-column grid with 8px base unit correctly implemented
- Typography hierarchy via weight and size (not color)
- No mascots, no people photography, no decoration
- Logo follows kit rules exactly
- No `border-radius` violations anywhere
- Heavy horizontal rules as structural anchors
- Inter is the sole typeface
- No dark backgrounds
- `prefers-reduced-motion` handling present in CSS and JS
- `focus-visible` uses Basel Red ring with offset ✅
- Brand opposites respected (no warmth, playfulness, softness)
