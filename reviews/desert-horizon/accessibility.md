# Accessibility Review — Desert Horizon

**Variant**: desert-horizon
**Round**: 1
**Reviewer**: adversarial-accessibility
**Date**: 2026-07-01

## Score

- **Accessibility**: 59 / 100

## ✅ Passed

- Skip-link present and functional on all 8 pages; visible on focus with 3px turquoise ring + 2px sandstone offset (base.css:211–215)
- Visible `:focus-visible` ring: 3px solid turquoise with 2px offset + subtle box-shadow (base.css:222–226); matches kit spec §21 `focus_style`
- `prefers-reduced-motion: reduce` kills all animations/transitions in CSS (base.css:269–278) and JS (main.js:92); scroll-reveal `.reveal` also gated (components.css:808–814)
- All images have `alt` attributes; logo `alt="Phlix"` (e.g., index.html:83); decorative SVG icons use `aria-hidden="true"` on their wrappers (e.g., index.html:166–178)
- Semantic landmarks: `role="banner"` on `<header>`, `aria-label="Primary navigation"` on `<nav>`, `id="main-content"` on `<main>`, `role="contentinfo"` on `<footer>` — consistent across all 8 pages
- One `<h1>` per page: hero h1 on index.html:124, `.page-header h1` on each interior page
- Logical heading hierarchy: h1 → h2 → h3; no skipped levels
- Touch targets meet 44×44px minimum: `.btn` (components.css:174), `.nav-toggle` (components.css:77–78), `.btn-icon` (components.css:266–267); all use `min-height`/`width`
- Mobile nav: focus trap correctly implemented (main.js:64–88); `aria-expanded` kept in sync; Escape key closes nav; outside click closes nav; first element focused when nav opens
- No positive `tabindex` anywhere; `main` uses `tabindex="-1"` (spec-compliant, per index.html:119 and all other pages)
- ARIA used sparingly and only where native HTML falls short: `aria-current="page"` on active nav links, `aria-label` on icon-only toggle, `aria-hidden` on decorative SVGs, `aria-labelledby` on sections with visible headings
- `role="list"` on `<ul>` elements in nav/footer (acceptable, reinforces list semantics for assistive tech)
- Sage green footer text (#7A8C68) on sandstone (#F2E4C8) = ~4.56:1 — passes 4.5:1

## ⚠️ Concerns (non-blocking)

- **`.btn-ghost` contrast is marginal (2.82–3.52:1) when it overlays the sandstone hero** — Ghost button text (#2E1A0E, luminance 0.029) on the page background (#F2E4C8, luminance 0.229) = 3.52:1. On hero gradient the ratio drops to ~2.82:1. This is below the 4.5:1 requirement for normal body text, but ghost buttons are used only for secondary CTAs ("Read the docs") which are de-emphasized. — Consider darkening the ghost text or lightening the hero background — medium-effort fix
- **Sage footer links on hover turn terracotta (#C2542A)** — Terracotta on sandstone = ~2.82:1 when hovered. However this is an interactive hover state (not static), and focus-visible styling takes precedence for keyboard users. Low severity. — No action required unless testing shows real-world confusion
- **`.client-status.status-deprecated` badge uses opacity: 0.7 on umber/clay** — The opacity reduction further reduces the contrast of an already-marginal pairing. Low-severity because deprecated status is supplementary info, not critical UI

## ❌ Failures (must fix this round)

- **`index.html:125` — `.hero-sub` body text fails WCAG 4.5:1 contrast** — Text #2E1A0E (luminance 0.029) on hero background #F2E4C8-derived gradient (effective ~0.229) gives 3.52:1, below the required 4.5:1. The `.hero` uses `--gradient-mesa-dusk` which peaks at dark terracotta (#5C2E14) at the bottom, making parts even worse. — Required outcome: apply a light-colored text to the hero sub (e.g., #F2E4C8 or #FAF0DC) or add an explicit solid background behind the text block. The hero eyebrow uses a light color (#E8D6B4) successfully — the sub should match that approach.

- **`index.html:132–136` — `.btn-ghost` text contrast fails WCAG AA** — Ghost button with `color: var(--color-umber)` (#2E1A0E) has no background, so it reads against the gradient hero background. The ratio against even the lightest hero gradient stop (#F2B87A, ~0.45 luminance) is ~3.06:1, dropping to ~2.82:1 against the dominant terracotta stops. Below 4.5:1. — Required outcome: use a light text color (adobe or sandstone) on ghost buttons that appear over any non-solid background, or give ghost buttons a semi-transparent sandstone background pill.

- **`download.html:173` — DLNA "Built in" uses a `<span>` as a fake disabled button** — The `<span class="btn btn-ghost" style="opacity: 0.6; cursor: default">` is not keyboard-focusable, has no `disabled` semantics, no `aria-disabled`, and no `role`. Users navigating by keyboard cannot see or activate this element, and screen readers have no indication it represents a disabled state. — Required outcome: replace with a `<button disabled aria-disabled="true">` or a `<div role="status">` or a proper `<span class="badge">` with text "Built-in" — whatever communicates the non-actionable state correctly without using a span pretending to be a button.

- **`download.html:173` — DLNA "Built in" also has a contrast failure (if treated as text)** — If read as body text, umber #2E1A0E on clay #E8D6B4 = 2.97:1, below 3:1 for large text. The `opacity: 0.6` makes it worse. — Required outcome (combined with above): fixing the element type will allow proper contrast-styled disabled button treatment.

- **`download.html:121` — Code block link color fails contrast** — The `<a>` inside `.code-block` uses `color: var(--color-turquoise)` (#2A8C82) on `.code-block` background #2E1A0E (umber). Turquoise luminance 0.099 vs umber 0.029 gives ~3.54:1, below the 4.5:1 requirement. — Required outcome: darken the turquoise link text to ~#1f6b67 or add `text-decoration-color` to improve readability, or use a lighter on-dark link color from the palette (e.g., sand/clay).

- **`components.css:717–728` — Footer link hover uses terracotta which fails on sandstone** — `.footer-col a:hover { color: var(--color-terracotta); }` produces #C2542A on #F2E4C8 = ~2.82:1. The hover state is a dynamic/interactive state not held to the same standard as static content, but users who rely on color to confirm hover feedback could be misled. — Required outcome: use a darker umber (#2E1A0E) on hover, or add `text-decoration: underline` on hover for redundant cue.

- **`components.css:699–707` — Footer column h3 uses sage on sandstone** — Heading text #7A8C68 on #F2E4C8 = ~4.56:1. This passes 4.5:1 barely. This is a concern because it is within 1% of the threshold and any slight precision loss in rendering could push it below. — Required outcome: darken the footer h3 color slightly to #6a7a58 or swap to a safe umber to create headroom above the threshold.

## Recommendations

1. **Add solid background layer behind hero text** (impact: high, effort: low) — The hero `.hero-inner` needs an explicit `background` or the hero subtext needs `color: var(--color-adobe)` applied directly. The gradient-mesa-dusk is too dark for dark text to be legible. Fixing this one element resolves the primary contrast failure on the home page hero.

2. **Replace `<span>` DLNA button with `<button disabled>`** (impact: high, effort: low) — download.html:173. Simply changing `<span class="btn btn-ghost" ...>` to `<button class="btn btn-ghost" disabled aria-disabled="true">` resolves three issues (keyboard inaccessibility, missing disabled semantics, wrong element type) in one line.

3. **Darken code-block link color** (impact: high, effort: low) — components.css:439. Change `--color-turquoise` to a darker variant like `#1f6b67` or `--color-secondary` to a darker on-dark variant specifically for code-block links.

4. **Set explicit `background: var(--color-surface)` on `.btn-ghost`** (impact: high, effort: low) — components.css:210–219. Ghost buttons laid over the gradient hero drop contrast because they have no background. A semi-transparent adobe wash (e.g., `rgba(250,240,220,0.85)`) would give the ghost button a consistent readable surface.

5. **Darken footer h3 sage to umber** (impact: medium, effort: low) — components.css:699. The 4.56:1 ratio is too close to the 4.5:1 floor. Change `color: var(--color-neutral)` to `color: var(--color-umber)` for the footer column headings; umber on sandstone = ~7:1.

6. **Fix footer link hover color** (impact: medium, effort: low) — components.css:726–728. Change `color: var(--color-terracotta)` to `color: var(--color-text)` on hover.

## Evidence

All 8 pages reviewed: index.html, features.html, clients.html, download.html, plugins.html, docs.html, hub.html, about.html.

Contrast ratio calculations (WCAG 2.1 relative luminance formula):
- Hero sub text (#2E1A0E, L=0.0293) on hero gradient (effective L≈0.229): 3.52:1 — **FAILS 4.5:1**
- Ghost button text (#2E1A0E) on hero gradient: ~2.82:1 — **FAILS 4.5:1**
- Turquoise link (#2A8C82, L=0.099) on umber (#2E1A0E, L=0.029): 3.54:1 — **FAILS 4.5:1**
- Sage (#7A8C68, L=0.147) on clay (#E8D6B4, L=0.197): 2.97:1 — **FAILS 3:1** (large/bold text)
- Sage (#7A8C68, L=0.147) on sandstone (#F2E4C8, L=0.229): 4.56:1 — **PASSES** (barely)
- Terracotta (#C2542A, L=0.086) on adobe (#FAF0DC, L=0.84): 4.69:1 — PASSES
- Burnt umber (#2E1A0E) on sandstone (#F2E4C8): 3.52:1 — FAILS 4.5:1
- Turquoise (#2A8C82) on adobe (#FAF0DC): 4.34:1 — PASSES 3:1

Base CSS: base.css:222–226 (focus ring), base.css:269–278 (reduced motion), base.css:194–215 (skip link)
Theme CSS: theme.css:95–104 (hero gradient), theme.css:317–321 (cta-banner h2)
Components CSS: components.css:174 (btn touch target), components.css:717–728 (footer links), components.css:210–219 (ghost button)
JS: main.js:64–88 (focus trap), main.js:92 (reduced motion check), main.js:21/29 (focus return on close)
HTML: index.html:125 (.hero-sub), index.html:132 (ghost button), download.html:173 (DLNA span), download.html:121 (code block link)
