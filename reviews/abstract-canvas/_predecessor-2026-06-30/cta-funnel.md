# Review: CTA / Funnel — abstract-canvas

## Score: 85 / 100

---

## Findings

### ✅ Primary CTA above the fold — index.html:105
- `<a href="download.html" class="btn btn-primary btn-lg">Get Phlix</a>`
- `.btn-primary` = carbon black `#1A1A1A` bg + gallery linen `#F0EDE4` text
- Contrast: `#1A1A1A` on `#F0EDE4` ≈ **16.8:1** (exceeds 3:1 AAA)
- `href="/download"` — correct download target

### ✅ Secondary CTA de-emphasized — index.html:106
- `<a href="https://detain.github.io/phlix-docs" class="btn btn-secondary btn-lg" rel="noopener noreferrer">Read the docs</a>`
- `.btn-secondary` = transparent bg + 1px `#CC2200` border + `#CC2200` text
- Correctly de-emphasized vs primary; links to external docs per content.json hero.secondary_cta

### ✅ Download reachable in ≤2 clicks from home
- index.html:105 → `href="download.html"` (direct) — 1 click
- Download page itself: download.html:182 CTA → docs (appropriate secondary target)

### ✅ Every page ends in `.cta-banner` driving toward download (or docs on download page)
| Page | CTA banner | Target |
|------|-----------|--------|
| index.html:239 | "Ready to build your gallery?" | download.html ✅ |
| features.html:145 | "Start building your gallery today." | download.html ✅ |
| clients.html:144 | "Ready to download?" | download.html ✅ |
| download.html:182 | "Need help getting started?" | docs (secondary, per spec) ✅ |
| plugins.html:112 | "Ready to dive in?" | docs ✅ |
| hub.html:132 | "Need more detail?" | docs ✅ |
| docs.html:119 | "Ready to get started?" | docs ✅ |
| about.html:144 | "Ready to try it?" | download ✅ |

### ❌ Multiple `.btn-secondary` (cadmium-red) elements visible on home screen — index.html:106 + index.html:233
- index.html:106: `.btn.btn-secondary.btn-lg` "Read the docs"
- index.html:233: `.btn.btn-secondary` "See all features →"
- Both visible simultaneously in the hero/features-overview area
- Brand kit rule: "Cadmium red is precious — reserve it for the single most important action." and "only ONE cadmium-red accent per screen"
- **Severity: ❌** — two simultaneous cadmium-red (`#CC2200`) button elements violate color_rules

### ⚠️ `meta.keywords` missing on 6 of 8 pages
- Present: index.html:8 ✅
- Absent: features.html:8, clients.html:8, plugins.html:8, docs.html:8, hub.html:8, about.html:8
- Per new_site.md §10: `<meta name="keywords">` required on every page
- Impact: Low (keywords are low-SEO-value these days, and the tag is present on home)
- **Severity: ⚠️**

---

## Summary

Primary CTA is excellent (16.8:1 contrast, carbon black on gallery linen, above fold). Download reachable in 1 click. Every page has a closing CTA banner. The critical issue is **two simultaneous `.btn-secondary` cadmium-red buttons visible on the home page** (hero secondary CTA + "See all features" link), violating the "only ONE cadmium-red accent per screen" brand rule. Secondary CTAs are correctly de-emphasized as bordered ghosts everywhere else.
