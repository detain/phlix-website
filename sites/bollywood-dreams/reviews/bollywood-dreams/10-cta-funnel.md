# CTA / Funnel

**Score: 80/100**  
**Severity: ⚠️**

## Findings

### ⚠️ WARNING: Download not reachable in ≤2 clicks from home (index.html:138)
Primary CTA "Get Phlix" on index.html goes to `download.html`. On download.html, there is NO direct download link for the Phlix server — only "View on GitHub" and "Installation docs" links. The actual server requires: `composer create-project detain/phlix-server` (a CLI command, not a download). The clients section shows client cards with "View source" buttons but no binary download links.

Per spec §5: "the download goal must be reachable in ≤2 clicks from home." If "download" means "get the server running", clicking "Get Phlix" → download.html counts as 2 clicks. But the download page's CTAs are "Read the docs" and "See all docs pages" — both secondary, not the "Get Phlix" primary CTA path.

The spec's own §3.4 defines the download page as having "Download Phlix" as primary CTA → which should link somewhere actionable. Currently download.html's CTA banner at bottom links to docs, not download.

**Fix:** Either add an explicit "Download Phlix Server" button (linking to GitHub releases or installation instructions) on download.html, or confirm that `composer create-project` instructions + GitHub link satisfy the "download in ≤2 clicks" requirement.

### ⚠️ WARNING: download.html CTA banner at bottom does not drive toward download (download.html:280–300)
The download page's closing CTA banner has "Read the docs" (primary) and "See all docs pages" (ghost). For the download page, the primary CTA should arguably be something else (e.g., "View on GitHub" or "Get started"). The current CTA makes the download page's own bottom CTA feel like an exit to docs rather than completion of the download funnel.

**Fix:** Consider making "View on GitHub" (primary) and "Read the docs" (secondary) on download.html's CTA banner.

### ⚠️ WARNING: Secondary CTA "Read the docs" competes with primary on download page
download.html:290–294: Primary is "Read the docs" (→ external docs), secondary is "See all docs pages" (→ docs.html). Neither drives to download/install. The page is titled "Download Phlix" but its own bottom CTA doesn't offer a download path.

## What Passed

- ✅ Primary CTA "Get Phlix" above fold on home page hero (index.html:138)
- ✅ Primary CTA "Get Phlix" on features.html above-fold area of page (features.html:301)
- ✅ Primary CTA "Download Phlix" on clients.html CTA banner (clients.html:214)
- ✅ Primary CTA "Get Phlix" on features.html CTA banner
- ✅ Primary CTA "Get Phlix" on plugins.html CTA banner (plugins.html:247)
- ✅ Primary CTA "Read the docs" on docs.html CTA banner (docs.html:233)
- ✅ Primary CTA "Download Phlix" on hub.html CTA banner (hub.html:217)
- ✅ Primary CTA "Get Phlix" / "Download Phlix" on about page — not present; about page has no explicit download CTA (acceptable for about page)
- ✅ Marigold gold (#F5A800) primary CTA button with midnight-mandir text — contrast ~11.3:1, far exceeds 3:1 requirement
- ✅ Primary CTA uses `.btn-primary` class with brand-specified marigold gold + glow shadow
- ✅ Secondary CTA uses `.btn-secondary` (fuchsia ghost) or `.btn-ghost` (burnished copper) — properly de-emphasized
- ✅ Clear visual hierarchy: primary buttons have `box-shadow: var(--shadow-marigold)` glow; secondary buttons have no glow
- ✅ Download reachable in 2 clicks: Home → "Get Phlix" → download.html (where server install instructions are shown)
- ✅ All CTAs have descriptive, non-generic labels ("Get Phlix", "Read the docs", "Explore features", "See all features")
