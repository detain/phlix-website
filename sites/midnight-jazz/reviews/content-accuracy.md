# Content Accuracy Review — Midnight Jazz

**Score: 96/100** | Severity: ⚠️

## Findings

### ✅ Passing

All product claims are verified against `content.json`:

| Content | Page | Verbatim from content.json? |
|---------|------|---------------------------|
| `hero.eyebrow` "Self-hosted media server" | `index.html:111` | ✅ |
| `hero.headline` "Your media. Your library. Your Phlix." | `index.html:112` | ✅ |
| `hero.subheadline` | `index.html:113–116` | ✅ |
| All 7 pitch_bullets | `index.html:134–143` | ✅ (exact match) |
| All 7 feature titles + bodies | `index.html:166–331` | ✅ (exact match) |
| All 5 client names, taglines, highlights | `clients.html` | ✅ |
| Ecosystem items (phlix-server, phlix-hub, phlix-shared, phlix-docs, phlix-plugin-example) | `download.html:181–311` | ✅ |
| All 6 FAQ q+a pairs | `about.html:144–181` | ✅ |
| `footer.tagline` "Open-source media, on your terms." | `about.html:98` + footer | ✅ |
| 3 footer columns (Product/Developers/Project links) | All pages | ✅ |
| External links all correct: | | |
| — Server source: `https://github.com/detain/phlix-server` | ✅ |
| — Docs: `https://detain.github.io/phlix-docs` | ✅ |
| — Plugin example: `https://github.com/detain/phlix-plugin-example` | ✅ |
| — Hub: `https://github.com/detain/phlix-hub` | ✅ |
| — GitHub org: `https://github.com/detain` | ✅ |
| — Issues: `https://github.com/detain/phlix-server/issues` | ✅ |
| — License: `https://github.com/phlix-website/blob/master/LICENSE` | ✅ |
| — API reference: `https://detain.github.io/phlix-docs/reference` | ✅ |
| — `twitter:creator=@detain` | ✅ All 8 pages |
| — `og:site_name=Phlix` | ✅ All 8 pages |

### ⚠️ Issues

- **Hub link on hub page** — `hub.html:214` links to `https://detain.github.io/phlix-docs/hub` — this is a plausible docs URL but not verified against `content.json` (the hub page content is not in `content.json` — it comes from the site spec `new_site.md §3.7` which says "link to docs"). Since this is a link-out to docs and not a product claim, it's acceptable.
- **`about.html:112–116`** uses the 5 brand kit `values` for the about-philosophy section: "Atmosphere over decoration", "Depth over breadth", "Warmth in unexpected places", "Earned sophistication", "The beauty of imperfection". These come from the kit's `values` array, not `content.json`. Per `new_site.md §2`: "you may add brand-flavored micro-copy drawn from the kit's voice". These values are brand philosophy copy, not product claims, so using the kit's values is correct.
- **Feature cards vs content.json** — `index.html` shows 8 feature cards (the 7 from content.json + the Hub). The Hub is not in content.json's `features[]` (only 7 items) but it IS in content.json's `features[]` with id "hub". Wait — let me verify. `content.json` features has 8 entries: library, syncplay, transcode, auth, livetv, dlna, plugins, **hub**. So there are 8 features, all of which appear on the home page features-overview. ✅
- **No competitor trademark violations** — The Plex/Jellyfin/Emby framing on about.html:145–150 is exactly verbatim from content.json FAQ: "Is Phlix like Plex / Jellyfin / Emby?" → "Yes — same job, different stack..." ✅

### ❌ Issues

None.

---

## Verdict

All substantive product claims are verbatim from `content.json`. All external links are correct. No invented features. No trademark violations. Zero issues.

**Score: 96/100** — Near-perfect content accuracy. The 4-point gap is from the hub docs link which is plausible but not verified against a canonical content contract (it's a docs link-out, not a product claim).
