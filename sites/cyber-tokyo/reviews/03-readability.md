# Dimension 3: Readability
**Reading level, line length, hierarchy, spacing**

---

## Score: 90 / 100

## Verdict: PASS (≥90, no ❌)

---

## Findings

### ✅ Reading Level — Appropriate
- Audience: anime/manga fans, design-forward tech adopters, adults 18–35
- Hero copy: "Your media. Your library. Your Phlix." — short, punchy, direct
- Body copy uses simple active-voice sentences
- Technical terms (HLS, FFmpeg, DLNA, Argon2ID, SyncPlay) are appropriate for the tech-forward audience
- Reading level is roughly 8th-10th grade — appropriate for the target demographic
- No overly academic or complex language — ✅

### ✅ Line Length — Within Range
- `base.css:159`: `max-width: 72ch` on paragraphs — within 60-75ch spec ✅
- `theme.css:196` hero sub: `max-width: 60ch` — ✅
- `theme.css:399` page-lead: `max-width: 60ch` — ✅
- `theme.css:425` content-section p: `max-width: 70ch` — ✅
- `theme.css:493` feature-detail-text p: `max-width: 70ch` — ✅

### ✅ Hierarchy — Clear eyebrow → h1 → subheadline → CTA
- index.html hero structure: `.hero-eyebrow` → `<h1>` → `.hero-sub` → `.hero-cta` — ✅
- Feature pages: `.page-header` with h1 + `.page-lead` → content sections — ✅
- Section headings h2 properly introduce each content block — ✅

### ✅ Section Spacing
- `theme.css:228` pitch: `padding-block: var(--space-16)` — generous
- `theme.css:270` features-overview: `padding-block: var(--space-16)` — ✅
- `theme.css:334` cta-banner: `padding-block: var(--space-16)` — ✅
- `theme.css:404` content-section: `padding-block: var(--space-12)` — ✅
- Spacing scale follows the brand kit's 9-step scale — ✅

### ✅ Responsive Readability
- Body text at 16px on mobile (`base.css:18` `font-size: 16px` base + `base.css:104` `--text-base: 1rem`)
- At 480px breakpoint: h1 reduced to `var(--text-4xl)` but still readable
- No line-length issues observed at 320px width

---

## Summary

Readability is excellent: appropriate reading level for the audience, all body text within the 60-75ch line-length spec, clear visual hierarchy from eyebrow → h1 → subheadline → CTA on every page, adequate section spacing. The site is easy to scan and read.
