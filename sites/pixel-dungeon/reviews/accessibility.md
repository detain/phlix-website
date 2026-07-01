# Dimension 3 — Accessibility / WCAG 2.2 AA

**Score: 68 / 100** (severity: ⚠️)

---

## ❌ CRITICAL / FAIL

### `css/components.css:89–93` — Nav link contrast below AA

Pixel Gray (`#666660`, L=0.1446) on Screen Black (`#151515`, L=0.0206) yields **3.9:1**, below the 4.5:1 minimum for normal body text.

```css
.nav-menu a {
  font-size: 0.6875rem; /* 11px — normal text, not large */
  color: var(--color-neutral); /* #666660 */
}
```

WCAG SC 1.4.3. Kit contrast table confirms Mario Red #E8001A on Cartridge Black #0A0A0A = 4.1:1 with note "use only for large text/UI elements" — Pixel Gray was not similarly guarded. 11px Silkscreen body text on dark surface must meet 4.5:1.

**Fix:** `color: var(--color-text)` (#F5F5F0, 18.8:1) or `color: var(--color-warning)` (#FFCC00, 12.3:1).

---

### `css/components.css:55–68` — Nav-toggle touch target < 44×44px

Mobile toggle button has `padding: 8px 16px` and ~11px font, giving a rendered height of ~27px — below the 44×44px WCAG 2.2 SC 2.5.8 minimum.

```css
.nav-toggle {
  padding: var(--space-2) var(--space-3); /* 8px vertical */
  font-size: 0.625rem; /* 10px */
}
```

10px font + 16px vertical padding = ~26px rendered height.

**Fix:** `padding: 14px 16px` or `min-height: 44px`.

---

## ⚠️ WARNINGS

### `css/base.css:120–128` — Focus ring blink not gated for `prefers-reduced-motion`

The `:focus-visible` blink animation runs **indefinitely** (`steps(1) infinite`) while the element is focused. The CSS `@media (prefers-reduced-motion)` resets `animation-duration` and `transition-duration`, but a 0.01ms blink is still a looping animation that fires on every focus event — a vestibular-motion trigger for some users.

```css
:focus-visible {
  animation: blink-cursor 500ms steps(1) infinite;
}
```

The kit spec says: "The border blinks at 500ms intervals (steps(1)) like a game-selection cursor." This should be disabled for `prefers-reduced-motion: reduce` — the blink is not essential to functionality, and the kit's own `motion_reduction` section says to honor the preference.

**Fix:** Add to base.css:
```css
@media (prefers-reduced-motion: reduce) {
  :focus-visible { animation: none; }
}
```

---

### `index.html:34–36` (and all 8 pages) — Google Fonts CDN link violates spec

Every page includes:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Silkscreen:wght@400;700&display=swap" rel="stylesheet">
```

new_site.md §1 explicitly states: *"No CDN dependencies in the deployed page (no Google Fonts `<link>`). Self-host fonts as WOFF2."* The inline comment says "inline CDN here for development." If these pages are the deployed output, this is a spec violation. If the build step is supposed to strip this and inject self-hosted fonts, the build is not producing compliant output.

---

## ✅ PASSED

| Check | Status | Location |
|---|---|---|
| Skip link present, targets `#main-content` | ✅ | All 8 pages, `<a class="skip-link">` |
| Skip link visible on focus | ✅ | `base.css:131–144` — `:focus` moves to `top: var(--space-2)` |
| Landmark count (1 banner, 1 nav, 1 main, 1 contentinfo) | ✅ | All 8 pages — verified no duplicate landmarks |
| `aria-current="page"` on active nav link | ✅ | All 8 pages |
| No positive `tabindex` | ✅ | Verified all 8 pages |
| Blip animation disabled for `prefers-reduced-motion` | ✅ | `base.css:233–236`, `main.js:62–67` |
| Steps() easing on all transitions | ✅ | `components.css` throughout |
| Focus ring: 2px Select Yellow, no blur, no offset | ✅ | `base.css:120–128` — `outline: 2px solid var(--color-focus)`, `outline-offset: 0` |
| Focus ring blink at 500ms `steps(1)` | ✅ | `base.css:120–128`, `blink-cursor` keyframe |
| Focus ring visible on every interactive element | ⚠️ | Buttons/links get `:focus-visible`; native `<button>` nav-toggle uses `:focus-visible` — OK |
| `prefers-reduced-motion` resets transitions globally | ✅ | `base.css:178–184` |
| Images: meaningful alt or `alt=""` decorative | ✅ | `index.html:83` — blip sprite has `alt="" aria-hidden="true"` |
| Form inputs have `<label>` or `aria-label` | ✅ | No forms on these marketing pages |
| `role="list"` on `<ul>` (nav) — minor ARIA overuse | ⚠️ | `index.html:65` — `role="list"` on `<ul>` is redundant; not a WCAG failure |
| Mario Red #E8001A on Cartridge Black #0A0A0A = 4.1:1 | ⚠️ | Used for button backgrounds (large UI elements per kit); kit docs explicitly warn this is for large text/UI only |
| Code blocks use `overflow-x: auto` | ✅ | `theme.css:156` — prevents horizontal overflow |
| Body text at 16px base | ✅ | `base.css:75` — `font-size: 16px` |
| `html { scroll-behavior: smooth }` not gated | ⚠️ | Reset in `@media (prefers-reduced-motion)` at `base.css:183` — acceptable |

---

## Notes

- The `page-header__lead` and footer body text use `color: var(--color-neutral)` (#666660) at 0.875rem (14px). On `#0A0A0A` background (full page section backgrounds), this gives ~7:1 contrast — passes. On `#151515` surface cards, still >5:1 — passes. The contrast failure is **only for nav links on the `#151515` header surface**, where #666660 sits on the darkest element background.
- Badge text (STABLE/BETA) uses `--font-headline` at 0.5rem (8px). These are rendered as all-caps with `text-transform: uppercase`. At 8px, even bold text does not qualify as "large text" under WCAG 1.4.3. The badge borders use success/warning colors at 2px, but the badge text sits on transparent — effectively the badge background is transparent and text is on the card surface (#151515). Badge text color: `#00AA44` for STABLE = 3.4:1 on #151515 — **below 4.5:1**. The kit `badges` spec does not call out contrast for badge text. This is a potential additional failure, but the badge backgrounds are transparent so contrast depends on the card background. If card background = #151515, STABLE text (#00AA44) = ~3.4:1 — FAIL for normal text at 8px.
