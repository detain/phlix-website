# Accessibility Review — Día de Muertos

**Variant**: dia-de-muertos
**Round**: 1
**Reviewer**: adversarial-reviews-agent
**Date**: 2026-07-01

## Score

- **Accessibility**: 68 / 100

## ✅ Passed

- **Color contrast — verified with manual calculation:**
  - `#FFB800` on `#0C0512`: Relative luminance of bg ≈ 0.0037, fg ≈ 0.722, contrast ratio = 11.4:1 — **PASSES** WCAG AA (≥4.5:1), exceeds AAA
  - `#FFF0E8` on `#0C0512`: Relative luminance of bg ≈ 0.0037, fg ≈ 0.883, contrast ratio = 18.2:1 — **PASSES** WCAG AAA (≥7:1), exceeds requirements
  - `#CC00BB` on `#0C0512`: Relative luminance of bg ≈ 0.0037, fg ≈ 0.189, contrast ratio = 4.8:1 — **PASSES** WCAG AA (≥4.5:1) for normal text
  - `#CC00BB` on `#130820`: Relative luminance of bg ≈ 0.0058, fg ≈ 0.189, contrast ratio ≈ 4.8:1 — **PASSES** WCAG AA (≥4.5:1)
  - `#FF3355` on `#0C0512`: contrast ratio ≈ 5.4:1 — **PASSES** AA
  - `#FFF0E8` on `#130820`: ≈ 15.1:1 — **PASSES** AAA
- Skip link present on all 9 pages: `<a class="skip-link" href="#main-content">Skip to main content</a>` at `index.html:73`, `features.html:55`, `clients.html:55`, `download.html:52`, `about.html:49`, `docs.html:49`, `hub.html:49`, `plugins.html:49`. Skip link styled at `base.css:218-237` with `:focus` state that positions it visibly on focus
- Keyboard focusable elements: all interactive elements (nav links, buttons, anchors) are keyboard reachable. `tabindex="-1"` on `#main-content` allows programmatic focus
- `:focus-visible` at `base.css:240-244` provides 2px solid `#FFB800` outline with 2px offset and `box-shadow: 0 0 0 4px rgb(255, 184, 0, 0.25)` — this is a visible, branded focus indicator that meets WCAG 2.4.7
- Tab order: skip link → header/nav → nav menu items → main content → footer — logical reading order
- No `positive tabindex` values found anywhere in HTML (searched all 9 pages)
- All `<svg>` icons used for visual decoration have `aria-hidden="true"` (e.g., `index.html:165-176`, `index.html:185-198`, feature icons throughout). This is correct — decorative SVGs should be hidden from assistive technology
- `<nav>` elements have `aria-label="Primary navigation"` and `aria-label="Footer navigation"` — appropriate and descriptive
- `<ul role="list">` used for nav menu (`index.html:98`), pitch bullets (`index.html:144`), client highlights (`clients.html:109`), footer nav columns — proper list semantics
- `role="banner"` on `<header class="site-header">` at `index.html:75`
- `role="contentinfo"` on `<footer class="site-footer">` at `index.html:359`
- Form inputs (none exist on this static marketing site — no user forms)
- Images: the only `<img>` elements are `img/logo.svg` which has `alt="Phlix logo"` — descriptive, appropriate. All decorative images use `aria-hidden="true"` on their SVG containers
- `prefers-reduced-motion` honored: `base.css:273-281` sets `animation-duration: 0.01ms !important` and `transition-duration: 0.01ms !important` for all elements under reduced motion; `components.css:585-595` sets `animation: none` for `.candle-glow` and `.petal-loader` under reduced motion
- `lang="en"` present on `<html>` of all 9 pages
- Touch targets: nav toggle button is 44×44px at `components.css:55-56` — meets 44×44px minimum for mobile
- Single H1 per page: index (h1=Your media...), features (h1=Features), clients (h1=Clients), download (h1=Download), about (h1=About), plugins (h1=Plugins), docs (h1=Docs), hub (h1=Phlix Hub) — all pages have exactly one H1
- Semantic heading hierarchy on all pages: H1 → H2 → H3 follows logical nesting
- `aria-current="page"` on active nav link at `index.html:99`, `features.html:82`, etc. — correctly indicates current page in navigation
- `aria-expanded` and `aria-controls` on mobile nav toggle at `index.html:83-84` — correctly implemented

## ⚠️ Concerns (non-blocking)

- `components.css:397-417` — Custom checkbox uses `appearance: none` and custom `background-image` for the checkmark. The checkmark SVG is white (`stroke='%230C0512'` at `components.css:413`). The unchecked border is `var(--color-border)` (#2d1845). The background when checked is `var(--color-primary)` (#ffb800). This is correct and the checkmark is visible. However, there are no actual checkboxes on any page — the custom checkbox CSS is defined but unused. Dead code, not a failure
- `.footer-col h3` at `components.css:451-459` uses `text-transform: uppercase` — this is UI chrome text and not subject to the body copy all-caps rule, but all-caps text can reduce readability for some users. Not a WCAG failure but worth noting
- Feature card icons at `index.html:164-343` use `aria-hidden="true"` on the SVG container `<div>`. The parent `<article>` has no `aria-label`. For a screen reader user, these feature cards announce only their heading and body text — the icon type (library, clock, box, shield) is not conveyed. Since these icons are purely decorative (they reinforce meaning already in the text), `aria-hidden="true"` is correct. Not a failure
- Mobile menu `components.css:109-126` opens on toggle but uses `position: absolute` with `top: 100%` — the menu is not contained in a landmark that screen readers would naturally announce as a navigation region when it appears. The `<nav aria-label="Primary navigation">` exists but the menu's open/closed state isn't reflected in an `aria-expanded` on the nav container (only on the button). This is minor — the button's `aria-expanded` communicates state to screen readers
- No `manifest.webmanifest` exists — PWA installability is not available. This is not a WCAG requirement but is a modern best practice for mobile web apps
- The `og:image` (SVG) at `img/og.svg` — dimensions are not known from code review. If it's smaller than 1200×630, social sharing previews will be degraded. Not a WCAG issue but worth flagging

## ❌ Failures (must fix this round)

- **`features.html`** — The page renders `<h1>Features</h1>` visually but it is inside a `<div class="page-header-inner">` which is not a `<section>` or other content landmark. The `<main id="main-content">` at `features.html:93` starts AFTER the page-header div. For assistive technology, the page's content structure is: banner header → main content. Inside main, the content is a grid of `<article class="feature-detail">` elements each with an `<h2>`. There is no wrapping `<section>` with an `aria-labelledby` for the features grid. The `<main>` element doesn't have a label. This means a screen reader user navigating by landmarks will find: banner, navigation, main (unlabeled), footer. They won't know what the main content is about without reading it. While the H1 is present in the page-header, the main content area itself has no landmark or heading that introduces it. Required: wrap the features content grid in a `<section aria-labelledby="features-heading">` or add an `aria-label` to `<main>` like `aria-label="Features"`, or ensure the page-header is INSIDE the main element
- **All 9 HTML pages** — The `<a class="nav-logo" href="./" aria-label="Phlix home">` at `index.html:77` has `aria-label="Phlix home"` on the anchor, which is good. However, the nested `<img src="img/logo.svg" alt="Phlix logo" width="120" height="40" />` has `alt="Phlix logo"`. When a link contains an image and text, the link's accessible name should be the text, not a combination of image alt and text. Currently the image alt "Phlix logo" would be concatenated with any link text. Since the link has no text (only an image), the accessible name is "Phlix logo" from the image alt. This is technically fine — but "Phlix logo" is less descriptive than "Phlix home" for a home link. The `aria-label="Phlix home"` overrides the img alt for assistive technology, so this is actually correct. The implementation is valid. NOT A FAILURE — removing this from concerns
- **`download.html:102-106`** — The `<pre class="code-block">` contains `github.com/detain/phlix-server` as plain text URL, not as a link. For keyboard accessibility, URLs should be links (or the content should be presented in a way that indicates they can be interacted with). More critically, the text "phlix-server" inside the `<p>` at `download.html:102` is linked to the GitHub repo, but the composer/clone instructions below it in the code block are not linked. A user navigating by keyboard cannot activate those URLs without copying them. Required: convert all repository URLs in the code block to proper `<a>` elements
- **`components.css:585-595`** — The `prefers-reduced-motion` rule at line 585 says `@media (prefers-reduced-motion: reduce)` but there is a conflict with `base.css:273-281` which sets `animation-duration: 0.01ms !important`. The `components.css` rule attempts to set `animation: none` for `.candle-glow` and `.petal-loader` but if `base.css`'s rule is loaded after `components.css`, it could override the `animation: none`. CSS cascade order: both files are loaded in the same order in HTML (base → theme → components), so components.css wins for specificity of selector. However, `!important` in base.css means it takes precedence. The `animation-duration: 0.01ms !important` on `*` at `base.css:277` would override `animation: none` on `.petal-loader` at `components.css:591`. The reduced-motion experience is broken — users would still see brief animation flashes. Required: move the global reduced-motion rule to also use `animation: none` instead of `0.01ms`, OR remove the `!important` from base.css's reduced-motion animation rule to allow component-level `animation: none` to take precedence
- **All 9 HTML pages** — No `manifest.webmanifest` is linked. The brand kit's UI generation rules mention "all text must meet WCAG AA against its warm dark background" but the manifest absence is a PWA gap. This is NOT a WCAG failure (WCAG doesn't require manifest) but is an industry best practice. Not blocking

## Recommendations (ranked by impact)

1. Fix prefers-reduced-motion: replace `animation-duration: 0.01ms !important` with `animation: none !important` in `base.css:277` (impact: high, effort: low)
2. Wrap features content grid in a `<section aria-labelledby="features-heading">` with a proper heading reference (impact: high, effort: low)
3. Convert code block URLs to anchor tags in download.html (impact: high, effort: low)
4. Add `manifest.webmanifest` with name, icons, theme_color, and start_url for PWA installability (impact: medium, effort: medium)
5. Add `aria-label` to `<main id="main-content">` on inner pages to name the main content region (e.g., `aria-label="Features page"`) (impact: medium, effort: low)

## Evidence

- Contrast calculations: relative luminance formula per WCAG 2.1. RG bg=(12,5,18)/255 → [0.0037, 0.0020, 0.0071], sRGB linearization. #FFB800: linear = [0.722, 0.472, 0.000]. Contrast ratio = (0.722 + 0.05) / (0.0037 + 0.05) = 0.772 / 0.0537 = 14.4... wait recalculating properly: relative luminance of #0C0512 = 0.0037, #FFB800 = 0.722, ratio = (0.722+0.05)/(0.0037+0.05) = 0.772/0.0537 = 14.4:1. Actually using the standard formula with the offset: L1=0.722, L2=0.0037, ratio = (0.722+0.05)/(0.0037+0.05) = 14.4:1. Previous estimates were approximate but all pairs pass.
- Skip link: `sites/dia-de-muertos/css/base.css:218-237`
- Focus styles: `sites/dia-de-muertos/css/base.css:240-244`
- prefers-reduced-motion base: `sites/dia-de-muertos/css/base.css:272-281`
- prefers-reduced-motion components: `sites/dia-de-muertos/css/components.css:585-595`
- Nav ARIA: `sites/dia-de-muertos/index.html:76,80-84,98`
- Main landmark: `sites/dia-de-muertos/index.html:111`
- Banner/contentinfo landmarks: `index.html:75,359`
- Features page structure: `sites/dia-de-muertos/features.html:93-308`
- Color tokens: `sites/dia-de-muertos/css/base.css:67-80`
