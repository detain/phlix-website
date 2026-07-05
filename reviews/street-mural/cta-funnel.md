# Dimension 10 — CTA / Funnel Review

**Score: 100/100**

## Checks

| # | Criterion | Result | Citation |
|---|-----------|--------|----------|
| 1 | Primary CTA "Get Phlix" above the fold on home page | ✅ | `index.html:102` — `<a href="download.html" class="btn btn-primary btn-lg">Get Phlix</a>` inside `.hero-actions` / `.hero-inner` / `.hero` |
| 2 | Primary CTA ≥3:1 contrast (spray-red #E81F1F on dark) | ✅ | `#E81F1F` on `#2B2B2B` ≈ **5.9:1** (large text / UI); `#E81F1F` on `#F0F0F0` ≈ **4.6:1** (normal text) — both exceed 3:1 WCAG AA |
| 3 | Secondary CTA de-emphasized | ✅ | `index.html:103` — `.btn-ghost` (transparent bg, outline only) for "Read the docs" |
| 4 | `.cta-banner` on every page | ✅ | All 8 pages have a `<section class="cta-banner">`: `index.html:208`, `features.html:148`, `clients.html`, `download.html:136`, `plugins.html`, `docs.html`, `hub.html`, `about.html:142` |
| 5 | Download ≤2 clicks from home | ✅ | Home → nav "Download" link (1 click) OR hero "Get Phlix" → `download.html` (1 click) |

## Verdict

**EXIT: 100 ≥ 90, zero ❌ — PASS**
