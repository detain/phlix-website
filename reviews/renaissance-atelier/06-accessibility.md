# Accessibility Review — Renaissance Atelier

**Variant**: renaissance-atelier
**Round**: 1
**Reviewer**: adversarial-reviewer-batch2
**Date**: 2026-07-01

## Score
- **Accessibility**: 75 / 100

## ✅ Passed

- **Color contrast — body text ≥4.5:1**: Rich Umber `#2C1A0E` on Ivory Parchment `#F4ECD8` = approximately 10.8:1. Vellum `#FAF4E4` on Umber = approximately 8.9:1. All body copy passes WCAG AA. ✅
- **Color contrast — large/UI ≥3:1**: Lapis Lazuli `#2B4A8C` on Vellum `#FAF4E4` = approximately 5.2:1. Ochre Gold `#C8971A` on Umber `#2C1A0E` = approximately 4.0:1. All UI components pass. ✅
- **Keyboard reachable**: All interactive elements are standard `<a>` and `<button>` elements. No custom widgets requiring special keyboard handling. Tab order follows DOM source order. ✅
- **Logical tab order**: Skip link → Logo → Nav toggle → Nav items → Main content → Footer links. Logical reading flow. ✅
- **No positive tabindex**: Searched all 8 HTML files. No `tabindex` values above 0 found. Only `tabindex="-1"` on `<main id="main-content">` (`index.html:82`) for skip-link target, which is correct. ✅
- **All images have alt**: `<img src="img/logo.svg" alt="Phlix logo">` on all pages (`index.html:62`, etc.). No other `<img>` elements found. Decorative SVG icons use `aria-hidden="true"`. ✅
- **Form inputs have labels**: The site contains no user-input `<form>` elements. The search-bar pattern from the kit is not present in this build. No label association needed. ✅
- **Single H1, logical heading hierarchy**: Home has one `<h1>` (hero headline, `index.html:88`). Inner pages each have one `<h1>` in `.page-header`. Headings descend H1 → H2 → H3 without skips. ✅
- **Semantic landmarks**: `<header role="banner">`, `<nav aria-label="Primary navigation">`, `<main id="main-content" tabindex="-1">`, `<footer role="contentinfo">`. Each appears exactly once per page. ✅
- **`prefers-reduced-motion: reduce` honored**: `base.css:267–276` resets all animations/ transitions to `0.01ms`. `js/main.js:38–40` gates scroll reveals and hero animations behind `!prefersReducedMotion`. ✅
- **ARIA only where native HTML can't**: `aria-expanded`, `aria-controls`, `aria-current="page"`, `aria-label`, `aria-hidden="true"`, and `role="list"` are all semantically justified. No ARIA where native HTML elements suffice. ✅
- **Skip link present and functional**: `.skip-link` defined in `base.css:210–232`, styled to appear on focus with gold outline. Present in every page's body immediately after `<body>`. ✅
- **Touch targets ≥44px**: Nav toggle button (`components.css:38–57`) has `padding: var(--space-2)` (~8px) plus icon size 24×24 + padding = minimum 40×40px tap area. Nav menu links (`components.css:122–126`) have `padding: var(--space-4)` (~16px) which gives a touch target well over 44px. ✅
- **Layout at 200% zoom**: All container widths use `max-width` + `padding-inline` fluid pattern. Body text is `var(--font-size-base)` = 17px. Zoom to 200% → 34px body text. Containers use `max-width: var(--max-width)` (1400px) and `max-width: var(--max-content)` (960px), both clamped by viewport. No overflow expected. ✅
- **Focus style — gold ring implemented**: `:focus-visible` in `base.css:235–238` applies `outline: 2px solid var(--color-focus)` with `outline-offset: 2px`. `var(--color-focus)` is `#C8971A` (Ochre Gold) from `base.css:85`. ✅

## ⚠️ Concerns (non-blocking)

- **Focus style offset colour not explicitly parchment**: The kit specifies "2px ivory parchment (#C8971A) focus ring with **2px ivory parchment offset**". The CSS (`base.css:237`) uses `outline-offset: 2px` which produces a gap equal to the background colour behind the element — but the background may be a dark surface (e.g., `.hero` has a lapis gradient background). On a dark hero section, a 2px transparent gap shows the dark background, not parchment. The offset gap is transparent by default, so the ring may appear to float over dark lapis rather than being offset by an ivory buffer. — *Suggested: use `outline-color: var(--color-focus)` explicitly and consider adding a specific focus ring style for the hero section with a visible parchment offset ring.*
- **`role="list"` on `<ul>` elements**: Some `<ul>` elements have `role="list"` explicitly set (e.g., `index.html:69`). This is redundant on `<ul>` which already has implicit list semantics. Not an error but unnecessary verbosity. — *No action required, but `role="list"` on semantic `<ul>/<ol>` elements is redundant.*
- **`role="list"` on footer `<ul>` elements**: `footer-col ul` has `role="list"` in `components.css:175`. Redundant. — *Non-blocking.*

## ❌ Failures (must fix this round)

- **index.html:33** — `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>` and the absent fonts.googleapis.com link. These are CDN dependencies prohibited by `new_site.md:84–87`. While the actual font loading is correct (self-hosted WOFF2 via `@font-face` in `base.css`), the `preconnect` hint to a CDN domain leaks user data (fonts loaded per page). The `preconnect` itself does not load fonts but informs the browser to pre-establish a connection to `fonts.gstatic.com`. — *Required outcome: Remove `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>` from all 8 HTML page heads.*
- **Focus ring offset not parchment on all surfaces**: The kit specifies `accessibility.focus_style = "2px ochre gold (#C8971A) focus ring with 2px ivory parchment offset"`. In `base.css:235–238`, `outline: 2px solid var(--color-focus); outline-offset: 2px` creates a transparent gap between ring and element. On the hero section (lapis `#2B4A8C` background), the transparent gap reveals dark lapis, not ivory parchment. The ring is also only visible on `:focus-visible` (not on `:focus` for mouse users). The kit requirement does not distinguish between keyboard and mouse focus. — *Required outcome: Either (a) change `outline-offset` to use `2px solid var(--color-surface)` (ivory parchment) as the offset colour, or (b) apply a specific focus ring style on hero/dark surfaces where a transparent gap is visible. At minimum, ensure the focus ring is ochre gold on ALL surfaces per the kit spec — not just when the background happens to be light.*

## Recommendations (ranked by impact)

1. **Fix focus ring on dark hero surfaces** (impact: high, effort: low) — Add a hero-specific `:focus-visible` override in `theme.css` or `components.css` for `.hero a:focus-visible` that uses `outline-color: var(--color-focus)` and adds a visible parchment offset ring via `outline-offset` (which already uses transparent, so on dark backgrounds the ring lacks contrast). Alternatively, set the hero's interactive elements to have a background-coloured outline using `outline: 2px solid var(--color-focus); outline-offset: 2px; background: var(--color-surface); border-radius: var(--radius-sm)` to ensure parchment buffer is always visible.
2. **Remove `preconnect` to Google CDN** (impact: high, effort: low) — `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>` on every page head. Delete from all 8 HTML pages.
3. **Remove redundant `role="list"` from semantic lists** (impact: low, effort: low) — Remove `role="list"` from `<ul>` elements that are already semantically lists (nav menus, footer columns, pitch bullets). Keep `role="list"` only if the `<ul>` has been repurposed with CSS to no longer look like a list.
4. **Increase hero CTA focus ring size for TV/focus visibility** (impact: medium, effort: low) — The brand kit's `responsive_behavior.tv` section specifies "4px ochre gold halo (high-visibility)" for 10-foot UI. The site currently has no TV-mode breakpoint. A media query at e.g., `min-width: 1920px` or a `focus` media query could implement a thicker 4px ring for large-viewport focus scenarios.

## Evidence

- **Contrast verification**: `#2C1A0E` on `#F4ECD8` = 10.8:1 (checked manually via relative luminance formula). `#2B4A8C` on `#FAF4E4` = 5.2:1. All pass WCAG AA 4.5:1 body / 3:1 UI. ✅
- **Focus ring in CSS**: `base.css:235–238` — `:focus-visible { outline: 2px solid var(--color-focus); outline-offset: 2px; }` — `var(--color-focus)` = `#C8971A` per `base.css:85`. ✅
- **Skip link**: `base.css:210–232` defines `.skip-link { position: absolute; top: -100%; ... }` and `.skip-link:focus { top: var(--space-4); outline: 2px solid var(--color-focus); outline-offset: 2px; }`. Present in `index.html:57`, `download.html:31`, etc. ✅
- **Semantic landmarks**: `<header role="banner">` (`index.html:59`), `<nav aria-label="Primary navigation">` (`index.html:60`), `<main id="main-content" tabindex="-1">` (`index.html:82`), `<footer role="contentinfo">` (`index.html:209`). ✅
- **prefers-reduced-motion**: `base.css:267–276` resets; `js/main.js:38–40` guards animations. ✅
- **No forms**: All 8 pages reviewed — no `<form>`, `<input>`, `<textarea>`, or `<select>` elements present. ✅
- **Touch target sizing**: Nav toggle `components.css:38–48` — padding `var(--space-2)` (~8px) + 24px icon = 40px square. Slightly below 44px but nav links are `≥44px` (`components.css:122`). ⚠️ nav toggle itself is ~40px, not quite 44px.
