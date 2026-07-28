# REGEN_PLAN — Obsidian Pulse

## 1. Experience Fields

| Field                   | Old site                                                      | This build                                                                                          |
| ----------------------- | ------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| `site_architecture`     | 8 pages, no 404, 6/6 nav labels missing                       | 9 pages incl. 404.html; 6-item nav per kit                                                          |
| `homepage_narrative`    | 5 sections in order: hero, features, proof, clients, download | Same 5-section order per kit `sections[]`                                                           |
| `page_blueprints`       | generic                                                       | `spec-sheet` features, `device-rack` clients, `workbench` download, `technical-brief` about         |
| `copy_overlay`          | absent                                                        | Hero: "Precision engineering." / "Silent power." / subheadline; CTA: Download Phlix / Read the docs |
| `feature_casting`       | generic feature grid                                          | 3 hero features (library, syncplay, transcode) as spec cards; support/footnote at bottom            |
| `copy_treatments`       | none                                                          | `spec-rows` pitch bullets, `man-page` FAQ, `device-rack` clients, `repo-list` ecosystem             |
| `faq_experience`        | plain FAQ                                                     | man-page style, 6 questions ordered per `faq_experience.question_order`                             |
| `hero_experience`       | static                                                        | Static obsidian hero + animated Pulse Blue scan line (CSS keyframe); fallback static                |
| `navigation_model`      | unknown                                                       | topbar: logo left, nav centered (Inter), utilities right; active = Pulse Blue underline             |
| `scroll_experience`     | unknown                                                       | continuous; hairline silver dividers; no transition effects                                         |
| `easter_eggs`           | absent                                                        | logo-clicks:5 → triple-pass scan + logo glow 2s                                                     |
| `conversion_funnel`     | generic CTA                                                   | instant-command workbench; install one-liner copyable; client device-picker                         |
| `proof_strategy`        | absent                                                        | 3-signal spec band: capability numbers, repo link, technical blockquote                             |
| `experience_archetype`  | unknown                                                       | `minimal`                                                                                           |
| `complexity_profile`    | unknown                                                       | standard density, technical reading level, foreground jargon                                        |
| `seasonal_activation`   | absent                                                        | live-js; Winter Signal and Midnight Edition variants via CSS vars                                   |
| `error_page_experience` | absent                                                        | Dark "Signal not found" 404; Space Grotesk 300; hairline divider; recovery links                    |
| `persona_vignettes`     | absent                                                        | 3 vignettes in aside blocks on about.html                                                           |
| **Absent → default**    | `visitor_paths`, `intensity_toggle`                           | No mascot, no intensity toggle per kit `mascot: null`                                               |

## 2. Nav Diff

Per `site_architecture.nav` (6 items):

- Home → Features → Clients → Download → Hub → About
- plugins, docs demoted (fold_into features / external) — linked in footer only
- No extra_pages

## 3. Home Section Order

Per `homepage_narrative.sections[]`:

1. `hero-signal` — copy_overlay.hero (full-bleed obsidian + animated scan line)
2. `core-features` — feature_casting.hero as spec cards
3. `precision-proof` — proof_strategy signals as spec band
4. `client-hardware` — page_blueprints.clients as device silhouettes
5. `download-station` — conversion_funnel workbench

## 4. Carry-forward

- Logo: wordmark "phlix" in Space Grotesk 300, Pulse Blue bar beneath
- Footer: full-directory arrangement (mirrored nav index + 3 columns from content.json)
- Fonts resolved to pool: DM Sans, Space Grotesk, Inter, JetBrains Mono — all confirmed in pool
- `@font-face` weight 300 used for headlines/display per kit rules
- `<strong>`: DM Sans 500 weight + `#00B4FF` color for 4.5:1+ on all surfaces (§19.17)
- Seasonal CSS vars: `--color-primary: #60CFFF` for Winter, `--color-primary: #00A3FF` for Midnight

## 5. Ambiguities Resolved

| Issue                                                           | Resolution                                                                                                            |
| --------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| Kit says "5 native clients" but `content.json` has 4 + DLNA     | `content.json` wins on facts per §19.6 row 4: 4 stable + DLNA                                                         |
| Kit `copy_overlay` CTA hrefs not specified                      | primary CTA → /download, secondary CTA → https://detain.github.io/phlix-docs                                          |
| Kit `fonts.ui.usage` vs `navigation_model.spec` conflict        | Per §19.6 row 1: navigation uses **UI face (Inter)** per more specific `navigation_model`; wordmark uses display face |
| Kit `page_budget` 80 words/section cap vs facts in content.json | Cap governs authored prose only per §19.6 row 3; verbatim fact strings are exempt                                     |
| `<strong>` weight 500 alone not perceptible enough              | Add `#00B4FF` color channel for ≥4.5:1 on all surfaces                                                                |

## 6. Escalations

- Font families: all 6 (DM Sans, Space Grotesk, Inter, JetBrains Mono) confirmed in `shared/data/font-sources.json` — no escalation needed
- No CDN links used
- No seasonal motif assets (`img/seasonal/ice-crystal-pattern.svg`, `img/seasonal/midnight-vignette.svg`) created — live-js mode per kit

## 7. CSS Rules from §19.12 Applied

```css
grid-template-columns: repeat(2, minmax(0, 1fr)); /* not bare 1fr */
p,
li,
dt,
dd,
a,
span,
code,
kbd,
samp,
pre {
  overflow-wrap: anywhere;
}
h1–h6,
blockquote {
  hyphens: auto;
  overflow-wrap: break-word;
}
/* no overflow: hidden on containers whose text must reflow */
```

## 8. OG + Sitemap

- `tools/gen-og.mjs --site obsidian-pulse` → `img/og.png`
- `tools/gen-sitemap.mjs --site obsidian-pulse` → `sitemap.xml` + `robots.txt`
