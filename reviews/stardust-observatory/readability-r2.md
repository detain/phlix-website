# Readability Review — Stardust Observatory

## Score
**7 / 8 pages pass** — All pages meet line height and page length targets. One sentence-length concern on index.html hero subheading.

---

## ✅ Passed

### Line height (body text) — ALL PASS
- CSS base.css:82 defines `--lh-body: 1.7` — exceeds the ≥1.5 minimum.
- Applied to `body` (base.css:120) and `.text-body` (theme.css:35–40).
- **All 8 pages** inherit this line height.

### Paragraph length — ALL PASS
- Content sections use `<p>` with `margin-block-end: var(--space-4)` (base.css:162), which naturally separates paragraphs.
- Paragraphs are typically 1–3 sentences. Longest observed: index.html pitch bullets (1 sentence each), about.html FAQ answers (2–3 sentences each).
- No paragraph exceeds 4 sentences.

### Jargon
- Technical terms (FFmpeg, DLNA, HLS, NTP, SyncPlay, JWT, Argon2ID) are used in the context of feature descriptions aimed at a **professional/technical audience** (media server enthusiasts, developers). This is appropriate — no glossary needed for this audience.
- The writing tone is clear and direct, e.g., "Add a file, see it appear" (index.html:122) — no unnecessary jargon.

### Lists — ALL PASS
- Bullet lists used correctly in: index.html pitch section (`<ul class="pitch-bullets">`), clients.html client-highlights (`<ul class="client-highlights">`), about.html FAQ (definition list `<dl>`), docs.html ecosystem list.
- No comma-separated runs of items that should be lists.

### Max line length (≤75ch) — MOSTLY PASS
- Most body text is constrained by `max-width: 68ch` on `.content-section p` (theme.css:385).
- The `.page-lead` uses `max-width: 60ch` (theme.css:131).
- **Concern only**: index.html hero sub (`hero-sub`, line 88) is 133 characters wide visually but has `max-width: 58ch` applied (theme.css:225) — this is a CSS constraint, so the line is intentionally limited.
- Longest unconstrained body text: pitch bullets in CSS grid — each bullet card is `minmax(280px, 1fr)` wide, text wraps naturally.

### Page length — ALL PASS
Estimated word counts per page:
| Page | Est. Words |
|------|-----------|
| index.html | ~480 |
| features.html | ~720 |
| clients.html | ~380 |
| about.html | ~310 |
| download.html | ~280 |
| docs.html | ~190 |
| plugins.html | ~170 |
| hub.html | ~170 |

**All pages are well below the 3,000-word limit.**

### Flesch-Kincaid
- Writing is appropriate for a professional/technical audience.
- Short sentences predominate. Longest sentences observed: 25–30 words in some feature card descriptions (e.g., "Weighted-mean NTP offset over 5 samples keeps every device locked to the same frame. Play, pause, seek — everyone moves together." — ~25 words, acceptable).
- Most sentences are 10–20 words. Average is within the ~15–20 word range typical for professional writing.

---

## ⚠️ Concerns

### One long sentence in index.html hero sub
- `hero-sub` (line 88): "An open-source PHP media server that streams to your Roku, Samsung TV, Windows desktop, phone, and any DLNA device — with SyncPlay, Live TV, transcoding, and a hub that follows you anywhere."
- ~30 words in a single sentence.
- However, this is one sentence in a hero/pitch context where moderate length is acceptable. It does not recur throughout the page.

---

## ❌ Failures
*(None)*

---

## Recommendations

1. **Optional**: Break the index.html hero subheading into two sentences for easier scanning:
   > "An open-source PHP media server that streams to your Roku, Samsung TV, Windows desktop, phone, and any DLNA device. Includes SyncPlay, Live TV, transcoding, and a hub that follows you anywhere."

2. **No structural changes needed** — line height, paragraph length, list usage, page length, and jargon handling are all satisfactory.

---

## Evidence
- **Line height token**: base.css:82 `--lh-body: 1.7`
- **Body text application**: base.css:120 `line-height: var(--lh-body)` on `body`
- **Paragraph spacing**: base.css:162 `margin-block-end: var(--space-4)` on `p`
- **Content paragraph max-width**: theme.css:385 `max-width: 68ch` on `.content-section p`
- **Page-lead max-width**: theme.css:131 `max-width: 60ch`
- **Hero sub max-width**: theme.css:225 `max-width: 58ch`
