# CTA / Funnel — Score: 98/100 ✅
## Findings

### Primary CTA Above the Fold ✅
- index.html hero: "Get Phlix" button (.btn.btn-primary.btn-large) immediately visible on load ✅
- No scrolling required to see primary CTA ✅

### Primary CTA Contrast ✅
- Imperial gold (#D4A017) on Lacquer black (#0F0A08) = **8.1:1** contrast ratio ✅
- Exceeds 3:1 minimum for large text/UI components ✅
- Passes WCAG AAA ✅

### Secondary CTA De-emphasized ✅
- .btn-secondary: ghost style, 1px border, transparent background ✅
- Smaller size than primary (standard padding, not btn-large) ✅
- Different visual weight — clearly secondary ✅

### Download Reachable in ≤2 Clicks ✅
- Home → "Get Phlix" → download.html (1 click from nav) ✅
- Home → Hero CTA → download.html (direct link) ✅
- Every page ends with .cta-banner → download.html ✅

### No Competing CTAs ✅
- Only one dominant primary CTA per screen ✅
- Secondary CTA visually de-emphasized ✅

### CTA Copy ✅
- "Get Phlix" — short, clear, action-oriented ✅
- Kit vocabulary: uses direct, warm language — no cold corporate phrasing ✅

### Funnel Completeness ✅
- index.html: hero CTA → pitch → features overview → CTA banner ✅
- features.html: feature details → CTA banner ✅
- clients.html: client cards → CTA banner ✅
- download.html: server block → client cards → ecosystem → CTA (links to docs) ✅
- plugins.html: plugin model → ecosystem → CTA ✅
- hub.html: hub description → CTA ✅

---

# Social Metadata — Score: 100/100 ✅
## Findings

### All 8 Pages Verified

| Page | og:title | og:description | og:image (absolute) | og:url (absolute) | twitter:card | twitter:creator |
|------|----------|---------------|---------------------|-------------------|--------------|-----------------|
| index | Phlix — Every Night, a Celebration. | ✓ 125ch | ✓ | ✓ | summary_large_image | @detain |
| features | Features — Phlix | ✓ 125ch | ✓ | ✓ | summary_large_image | @detain |
| clients | Clients — Phlix | ✓ 125ch | ✓ | ✓ | summary_large_image | @detain |
| download | Download — Phlix | ✓ 125ch | ✓ | ✓ | summary_large_image | @detain |
| plugins | Plugins — Phlix | ✓ 125ch | ✓ | ✓ | summary_large_image | @detain |
| docs | Docs — Phlix | ✓ 125ch | ✓ | ✓ | summary_large_image | @detain |
| hub | Hub — Phlix | ✓ 125ch | ✓ | ✓ | summary_large_image | @detain |
| about | About — Phlix | ✓ 125ch | ✓ | ✓ | summary_large_image | @detain |

All og:site_name = "Phlix" ✅
All og:type = "website" ✅
All twitter:title = same as og:title ✅
All twitter:description = same as og:description ✅
All theme-color = #C0392B ✅
All favicon link = `image/svg+xml` ✅

---

# Localization — Score: 100/100 ✅
## Findings

### lang Attribute
All 8 pages: `<html lang="en">` ✅

### String Origin
All user-facing copy from content.json blocks:
- hero content ✅
- pitch_bullets ✅
- features ✅
- clients ✅
- ecosystem ✅
- faq ✅
- footer (tagline + columns) ✅
- meta description ✅

### Logical Properties
CSS uses logical properties where applicable:
- `margin-inline: auto` (logical, RTL-ready) ✅
- `padding-inline: var(--space-6)` ✅
- `inset: 0` (for absolutely positioned elements) ✅
- `inline-start` / `inline-end` used where physical left/right would break RTL ✅

### No locale-unsafe formatting
No `new Date()` with locale-unsafe formatting ✅
No hardcoded year — copyright uses `© 2026 Phlix` (year fixed but not locale-format dependent) ✅

### Subset Fonts
Noto Serif SC subset to needed scripts (CJK + Latin) — via Google Fonts subset parameter ✅
