# CTA / Funnel

## Score: 95/100 ✅

## Severity: ✅ (was ❌)

## Findings
- **FIXED**: `download.html:73-99` — All 5 download client cards now use `.btn.btn-secondary` (pine green). Confirmed on lines 78, 83, 88, 93, 98. No campfire-orange buttons on the download page cards. ✅
- `download.html:115` — CTA banner "Need help getting started?" uses `.btn.btn-secondary` "Read the docs" — secondary action, not primary. ✅
- **Per-view campfire orange count** (brand rule: max 1 per view):
  - `index.html` hero: 1× `.btn-primary` ("Get Phlix") ✅
  - `index.html` CTA banner: 1× `.btn-primary` ("Download Phlix") ✅
  - `features.html` CTA banner: 1× `.btn-primary` ("Download Now") ✅
  - `clients.html` CTA banner: 1× `.btn-primary` ("Download Now") ✅
  - `hub.html` CTA banner: 1× `.btn-primary` ("Get started") ✅
  - `plugins.html` CTA banner: 1× `.btn-primary` ("Get the example plugin") ✅
  - `download.html`: 0× `.btn-primary` ✅ — download page cards are ALL secondary (pine green)
  - `docs.html`: 0× `.btn-primary` ✅ (no CTA)
  - `about.html`: 0× `.btn-primary` ✅ (no CTA)
- The download page funnel is now correctly non-primary for campfires — it drives users to the docs as a secondary path, while client cards use pine green CTAs. This follows the brand rule that campfire orange is "the single flame on the screen."

## What passes
- All 8 pages have at most 1 campfire-orange CTA per view. ✅
- Hero primary CTA is above the fold on home page. ✅
- Download page client cards all use `.btn-secondary` (pine green). ✅
- Primary funnel path (Home → download) is visible above the fold on home. ✅

## Verdict
The critical Round 1 defect (3 campfire-orange buttons on download page) is completely fixed. Score jumps from 40→95. The one remaining note is that the download page has no primary (campfire orange) CTA of its own — the page drives to docs as a secondary action rather than back to download. This is a deliberate design choice consistent with the brand's "one flame per view" rule, though it means the download page itself is less of a direct conversion driver. Not a defect.
