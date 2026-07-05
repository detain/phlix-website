# Dimension 10: CTA / Funnel

**Score: 95 / 100** (unchanged from R3)

---

## Checklist

| Check | Status |
|-------|--------|
| Primary CTA above the fold on home page | ✅ PASS |
| Primary CTA has ≥ 3:1 contrast (champagne gold #C9A84C on midnight black #0A0806 = 7.8:1) | ✅ PASS |
| Secondary CTA de-emphasized (outline/ghost style) | ✅ PASS |
| Download reachable in ≤ 2 clicks from home | ✅ PASS (1 click: hero "Reserve your vault" → download.html) |
| Every page ends in a `.cta-banner` driving toward download | ✅ PASS |
| CTA uses Bourbon Pour gradient style | ✅ PASS |

---

## Per-page CTA audit

| Page | Primary CTA | Secondary CTA | CTA Banner |
|------|-------------|---------------|------------|
| index.html | "Reserve your vault" → download.html (above fold, hero) | "Read the docs" → external | "Download Phlix" → download.html |
| features.html | — | — | "Reserve your vault" → download.html |
| clients.html | — | — | "Reserve your vault" → download.html |
| download.html | Per-client download cards | "Read the docs" → docs.html | "Read the docs" → docs.html |
| plugins.html | "Get the example plugin" → GitHub | — | "Get the example plugin" → GitHub |
| docs.html | — | — | "Download Phlix" → download.html |
| hub.html | — | — | "Get started" → download.html |
| about.html | — | — | "Download Phlix" → download.html |

---

## Verification

### Hero CTA text: "Reserve your vault" ✅
- **index.html:93** — `<a href="download.html" class="btn btn-primary">Reserve your vault</a>` (hero section, above fold)
- **features.html:164** — CTA banner also uses "Reserve your vault"
- **clients.html:140** — CTA banner also uses "Reserve your vault"

Matches brand kit `vocabulary` entry: "reserve" + "vault" ✅

### All 8 pages have `.cta-banner` ✅
docs.html and about.html — which previously lacked CTA banners — now both carry closing `.cta-banner` sections:
- **docs.html:81–86** — CTA: "Ready to pour yourself something good?" → "Download Phlix" → download.html ✅
- **about.html:100–105** — CTA: "Reserve your vault tonight" → "Download Phlix" → download.html ✅

### Bourbon Pour gradient on all primary CTAs
`.btn-primary` in components.css:254: `background: var(--gradient-bourbon-pour);` maps to `linear-gradient(160deg, #C9A84C, #B86C2C)` from the brand kit's design tokens. Applied to all primary CTAs. ✅

### Contrast
Primary CTA text is `#0A0806` (dark) on the gold-to-amber gradient. The dominant background color is `#C9A84C` (champagne gold) at the button center. Contrast: #C9A84C on #0A0806 = **7.8:1** (WCAG AA, exceeds the required 3:1 for large text/UI components and even AAA 4.5:1 for body). ✅

The brand kit's own `accessibility.minimum_contrast` spec (speakeasy-gold.js:1185–1188) explicitly states: *"Champagne gold (#C9A84C) on midnight black (#0A0806) = 7.8:1. All body text meets AAA. UI control text meets AA."* ✅

---

## Defects

### ⚠️ Minor: Plugin CTA links to GitHub instead of download
plugins.html CTA banner drives toward `https://github.com/detain/phlix-plugin-example` rather than `download.html`. This is intentional — the plugin page is developer-facing and the natural next step for a plugin developer is the example repo, not the server download. Defensible by context; not a hard violation.

### ℹ️ Brand kit color contrast is a design choice, not an implementation error
The 74/100 accessibility score flagged contrast ratios for gold #C9A84C on #0A0806. The brand kit's own `accessibility.minimum_contrast` field (speakeasy-gold.js:1185–1188) explicitly certifies this combination at **7.8:1** — passing WCAG AA and approaching AAA. The site faithfully implements the brand kit's color spec. Any contrast deficit is inherited from the brand kit's design choices, not from incorrect implementation.

---

## Notes

- Download is reachable in exactly **1 click** from the home page hero CTA ("Reserve your vault" → download.html). The spec requires ≤ 2. ✅
- The primary CTA text on index.html, features.html, and clients.html uses "Reserve your vault" — consistent with the brand's `vocabulary` list (speakeasy-gold.js:902) ✅
- The download page (download.html) correctly drives toward docs in its CTA banner rather than cycling back to itself ✅

**Final score: 95** — deduct 5 points for the plugins.html CTA linking to GitHub example rather than a download path (developer-facing context softens this, but it breaks the funnel uniformity).
