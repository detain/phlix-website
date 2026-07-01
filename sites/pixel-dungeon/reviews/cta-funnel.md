# Round 2 CTA / Funnel Review — Pixel Dungeon (pixel-dungeon)

## Dimension 8 — CTA / Funnel

**Score: 94/100** ⚠️

---

## Primary CTA above fold on home page: ✅

`index.html:89`:
```html
<a href="download.html" class="btn btn-primary">Get Phlix</a>
```
The hero section (`index.html:81-93`) renders without scrolling on any viewport. The CTA button is vertically centered in `.hero` (min-height: 360px, flexbox centered content) and is above the fold on 320px mobile through 1920px desktop. ✅

---

## Primary CTA ≥ 3:1 contrast: ✅

Mario Red `#E8001A` on Cartridge Black `#0A0A0A` = **4.1:1**

Per brand kit (`pixel-dungeon.js:1104`):
> "Mario Red (#E8001A) on Cartridge Black = 4.1:1 — use only for large text/UI elements"

The primary CTA uses `.btn-primary` with Silkscreen at 0.6875rem (UI label, uppercase, tracked) — classified as a UI element, not body text. 4.1:1 > 3:1 threshold for large text/UI components. ✅

`components.css:267-277` — button uses `background: var(--color-primary)` (#E8001A) and `color: var(--color-text)` (#F5F5F0). The contrast between the button fill and the page background is moot (button is filled, text is on button). For the text-on-button contrast: `#F5F5F0` on `#E8001A` = 3.6:1 — this is the operative contrast for readability of the button label. 3.6:1 > 3:1. ✅

---

## Secondary CTA de-emphasized: ✅

`index.html:90`:
```html
<a href="https://detain.github.io/phlix-docs" class="btn btn-ghost">Read the docs</a>
```
`.btn-ghost` uses `border-color: #333333` on transparent background, no Mario Red fill. Properly de-emphasized relative to the primary CTA. ✅

---

## Download ≤ 2 clicks from home: ✅

Path 1 (shortest):
- index.html → "Get Phlix" button (`.btn.btn-primary`) → download.html — **1 click** ✅

Path 2:
- index.html → "See all features →" link → features.html → ".cta-banner" "Get Phlix" → download.html — **2 clicks** ✅

---

## Every page ends in a `.cta-banner` driving toward download: ⚠️

### Pages with correct download-oriented closing CTA banner:

| Page | CTA title | CTA button | Destination | File:Line |
|---|---|---|---|---|
| index.html | "Your library awaits. +1 UP." | "Get Phlix" | download.html | :197 |
| features.html | "Press Start to Watch." | "Get Phlix" | download.html | :150 |
| clients.html | "Every title is a new dungeon. Pick your class." | "Get Phlix" | download.html | :138 |
| hub.html | "Your library follows you anywhere." | "Get Phlix" | download.html | :137 |
| about.html | "Your quest awaits, adventurer." | "Get Phlix" | download.html | :125 |

✅ 5/8 pages

### pages with non-download CTA (mild leak):

**`plugins.html:100-104`** ❌
```html
<section class="cta-banner" aria-label="Explore Phlix Hub">
  <h2 class="cta-banner__title">The dungeon has loot. Level up your server.</h2>
  <a href="https://github.com/detain/phlix-hub" class="btn btn-primary" rel="noopener noreferrer">Explore the Hub</a>
</section>
```
- Uses `btn btn-primary` (Mario Red) — visually loud, but drives to GitHub Hub, not download
- `new_site.md §5` rule: "Every page ends in a `.cta-banner` that drives toward **download**"
- `new_site.md §3.5` says plugins page ends in a `.cta-banner` — it does — but the target is Hub, not download
- This is a funnel leak. The user who navigates to plugins.html and reaches the bottom is encouraged to "Explore the Hub" (GitHub) instead of downloading the software they just read about
- `−3`

**`download.html:180-185`** ✅ spec-compliant but notable
```html
<section class="cta-banner" aria-label="Read the docs">
  <h2 class="cta-banner__title">Need help setting up? The dungeon map awaits.</h2>
  <a href="https://detain.github.io/phlix-docs" class="btn btn-secondary">Read the docs</a>
</section>
```
- Uses `btn btn-secondary` (Game Blue), not `btn-primary` — correctly de-emphasized
- `new_site.md §3.4`: "closing `.cta-banner` linking to docs" — this matches the spec
- On download.html specifically, linking to docs is the right final action (user is already on download page; docs help them install)
- ✅ Spec-correct, no penalty

**`docs.html:117-121`** ✅
```html
<section class="cta-banner" aria-label="Read the docs">
  <h2 class="cta-banner__title">Your library won't explore itself.</h2>
  <a href="https://detain.github.io/phlix-docs" class="btn btn-secondary" rel="noopener noreferrer">Read the docs</a>
</section>
```
- Uses `btn btn-secondary` — de-emphasized secondary action, not a competing primary
- `docs.html` is a link-out page (per `new_site.md §3.6`); the "docs" CTA driving to external docs is correct destination
- ✅

---

## Summary table

| Check | Status | File:Line |
|---|---|---|
| Primary CTA above fold on home | ✅ | index.html:89 |
| Primary CTA ≥ 3:1 contrast | ✅ (4.1:1 or 3.6:1) | components.css:267-277 |
| Secondary CTA de-emphasized | ✅ | index.html:90 |
| Download ≤ 2 clicks from home | ✅ (1 click via hero CTA) | index.html:89 |
| All pages end in `.cta-banner` → download | ❌ plugins.html leaks to Hub | plugins.html:100-104 |

**Required fix:** Change `plugins.html:103` from `href="https://github.com/detain/phlix-hub"` to `href="download.html"`, or change the CTA from "Explore the Hub" to "Get Phlix" with download.html destination. The current Mario Red (primary) CTA on plugins.html drives to Hub instead of to the download page — it competes with the primary CTA on every other page.
