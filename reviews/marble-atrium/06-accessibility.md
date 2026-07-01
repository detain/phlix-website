# Accessibility — marble-atrium

**Score: 55/100** — Many WCAG 2.2 AA foundations are correct, but one contrast failure and the dead-span buttons create real accessibility problems.

## Findings

- `css/base.css:178-181` ✅ `:focus-visible` with 2px gold ring + 2px offset — matches kit accessibility.focus_style "precision engraved frame." Proper visible focus on all interactive elements.
- `css/base.css:169-172` ✅ Skip link: visible on focus, targets `#main-content`.
- `index.html:57` ✅ Skip link is first focusable element in DOM.
- `css/components.css:56-84` ✅ Nav links have `min-height: 44px` and `min-width: 44px` — touch targets ≥44px ✅.
- `css/components.css:168-176` ✅ Buttons: `min-height: 44px`, `min-width: 44px` ✅.
- `css/components.css:86-100` ✅ Nav toggle: 44×44px touch target ✅.
- `index.html:64-81` ✅ All landmark roles present once: `role="banner"`, `role="navigation"`, `id="main-content"`, `role="contentinfo"` — correct ARIA landmark usage.
- `index.html:73` ✅ Home nav link has `aria-current="page"`.
- `index.html:62` ✅ Logo link has `aria-label="Phlix home"`.
- `index.html:65` ✅ Nav toggle has `aria-label="Toggle navigation"`, `aria-expanded`, `aria-controls`.
- `features.html:75-142` ✅ All 7 feature-detail articles have `id` attributes matching feature IDs from content.json — supports skip-links and deep linking.
- `about.html:94-126` ✅ FAQ uses proper `<dl>` with `<div class="faq-item">` wrapping each `<dt>`/`<dd>` pair — semantically correct definition list.
- `css/theme.css:438-444` ✅ `@media (prefers-reduced-motion: reduce)` disables all animations and sets `transition-duration: 0.01ms` — matches kit accessibility.motion_reduction requirement.
- **Contrast — body text ≥4.5:1:**
  - `css/theme.css:165` Hero headline: `#0F0F0E` on `#F7F5F2` → ~17.7:1 ✅
  - `css/theme.css:171` Hero subheadline: `#0F0F0E` at 85% opacity on `#F7F5F2` → effectively ~15:1 ✅
  - `css/theme.css:156` Hero eyebrow: `#A0A09A` (Veining Grey) on `#F7F5F2` → **3.59:1 ❌** — WCAG AA body text requires 4.5:1. The kit explicitly states Veining Grey is for "secondary text, dividers, disabled states" with contrast_targets ["marble_white"]. The eyebrow text is a primary section label, not secondary. This fails AA. The kit's own color table marks Veining Grey as suitable only for contexts where it has contrast_targets of marble_white, but the actual contrast ratio doesn't support body text use. ⚠️ severity: the eyebrow text is small (0.6875rem) and uppercase — arguably large text (≥18pt or bold ≥14pt) would give a 3:1 minimum, but 0.6875rem (11px) is neither, so 4.5:1 is required.
  - `css/theme.css:222` Pitch bullet text: `#0F0F0E` at 90% opacity → ~16:1 ✅
  - `css/components.css:74-76` Nav hover: `#B8960C` on `#F7F5F2` → 4.66:1 ✅ (large/UI text minimum 3:1 met; body text minimum 4.5:1 — borderline, passes for large text use)
  - `css/components.css:199-201` `btn-secondary`: `#0F0F0E` on `#F7F5F2` → ~17.7:1 ✅
  - `css/components.css:180-183` `btn-primary`: `#B8960C` on `#F7F5F2` → **4.66:1 ❌** for body text at 13px (0.8125rem). The kit's accessibility.minimum_contrast explicitly states: "Champagne Gold on Marble White must be verified — use at minimum 18pt or bold for AA compliance." The button text is 0.8125rem (13px) and not bold — this is below the 18pt threshold the kit itself identifies as safe. 4.66:1 technically meets WCAG AA for large text (3:1) but NOT for regular body text (4.5:1). ⚠️ The kit's own documentation flags this exact issue, and it remains unverified per BUILD_LOG.md:91.
  - `css/components.css:226-228` `btn-ghost`: `#A0A09A` on transparent → 3.59:1 on `#F7F5F2` (bg) ❌ — ghost button text is also Veining Grey, same 3.59:1 failure. Used on DLNA "Built in" spans (which are additionally dead spans, compounding the issue).
  - `css/components.css:612-613` Footer links: `#0F0F0E` at 80% opacity → ~14:1 ✅
  - `css/components.css:621` Footer h4: `#A0A09A` → 3.59:1 ❌ — but 0.6875rem all-caps label (11px), arguably decorative/label text. WCAG 2.2 allows 3:1 for text that is less than 18pt. This is borderline. Use with caution.
- `css/components.css:129` ❌ **DLNA card: `<span class="btn btn-ghost" style="cursor: default;">` — dead interactive element** (also flagged in usability). Not keyboard-reachable, no role, no accessible name mechanism.
- `css/theme.css:397-409` ✅ `.sr-only` utility present for screen-reader-only content.
- Layout survives 200% text zoom — container uses fluid `max-width` + fluid fonts (`clamp`) ✅.

## Verdict

**Fail** — while skip links, focus rings, ARIA landmarks, touch targets, and reduced-motion are all correctly implemented, the contrast failures on the hero eyebrow text (#A0A09A on #F7F5F2 at 3.59:1), primary button text (gold on marble-white at 4.66:1 for 13px body text, below the kit's own 18pt threshold), ghost button text (same Veining Grey issue), and the dead-span button on DLNA cards are real WCAG 2.2 AA failures. The kit's own documentation flagged the gold-on-marble-white contrast as needing verification — it hasn't been verified and the numbers suggest it fails for body-text use.
