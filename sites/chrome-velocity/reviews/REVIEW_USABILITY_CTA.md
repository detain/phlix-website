# Review: Usability & CTA/Funnel

## Usability (score: 90/100, severity: ⚠️)
### Issues found

- **docs.html:88** — Page ends with `</main>` and immediately goes to footer; no `.cta-banner` present. Visitor finishes reading with no prominent next action surfaced. (severity: ⚠️)
- **about.html:107** — Page ends with `</main>` and immediately goes to footer; no `.cta-banner` present. Visitor finishes reading the FAQ with no prominent next action surfaced. (severity: ⚠️)
- **docs.html** — The page links externally to `detain.github.io/phlix-docs` and back to GitHub; there is no in-site path that drives the visitor toward download, violating the ≤2-click rule from home through an indirect path (home → docs → download is 2 clicks, which is technically fine by the letter of the spec, but docs page itself has no `.cta-banner` to download). (severity: ⚠️)

### What passes
- **index.html:95** — "Get Phlix" in `.hero-cta` links to `download.html`; download is reachable in 1 click from home. ✅
- **Mobile nav** — All 8 pages have `.nav-toggle` button with `aria-expanded="false"` and `aria-controls="nav-menu"`. JS (main.js:14-17) toggles `aria-expanded` on click; JS (main.js:19-24) closes on outside click; JS (main.js:27-31) closes on Escape and returns focus to toggle. ✅
- **All hrefs** — Every anchor has a valid destination; no `#`, no `javascript:void(0)`, no placeholder values. ✅
- **Consistency** — All 8 pages share the same header nav, footer, and structural conventions. ✅
- **Skip link** — All pages have `<a class="skip-link" href="#main-content">` with correct target. ✅
- **External links** — All outbound links use `rel="noopener noreferrer"`. ✅

---

## CTA / Funnel (score: 85/100, severity: ⚠️)
### Issues found

- **docs.html** — No `.cta-banner` section anywhere in the page. A user arriving from any external referrer or direct link lands with no final CTA nudge toward download. (severity: ⚠️)
- **about.html** — No `.cta-banner` section. The FAQ is the terminal content before the footer; there is no CTA banner driving toward download or docs. (severity: ⚠️)

### What passes
- **index.html:94-97** — `.hero-cta` div contains two buttons: primary "Get Phlix" (`href="download.html"`, `.btn.btn-primary.btn-large`) and secondary "Read the docs" (external, `.btn.btn-secondary.btn-large`). Primary is above fold (`.hero { min-height: 92vh }`). ✅
- **index.html:207** — Bottom `.cta-banner` also has primary CTA "Download Phlix" linking to `download.html`. ✅
- **features.html:165-170**, **clients.html:143-148**, **hub.html:92-97**, **plugins.html:81-86** — All end with `.cta-banner` containing a primary `.btn-primary` CTA driving toward `download.html`. ✅
- **download.html:115-120** — Correctly uses `.btn-secondary` with "Read the docs" linking to `docs.html`, matching the spec rule for the download page's CTA banner. ✅
- **Primary CTA contrast** — `.btn-primary` uses `--color-primary: #C00` on `--color-bg: #0D0D0F`; contrast ratio ≈ 4.7:1, which satisfies ≥3:1. ✅
- **Secondary CTA de-emphasis** — `.btn-secondary` uses transparent background with border; visually clearly subordinate to `.btn-primary`. ✅
