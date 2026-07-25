# Social Metadata Review — Neon Noir

**Variant**: neon-noir
**Round**: 1
**Reviewer**: adversarial reviewer (claude-opus-5)
**Date**: 2026-07-25

## Score

- **Social Metadata**: 84 / 100

## ✅ Passed

- Complete Open Graph set on every page: `og:type`, `og:site_name`, `og:url`, `og:title`, `og:description`, `og:image`.
- `og:image` is an **absolute** URL pointing at a **PNG** (`https://detain.github.io/phlix-website/neon-noir/img/og.png`) — satisfying `check-meta` rule 5 and §11, which reject relative URLs and `.svg`. The site correctly ignores nothing here; `content.json meta.og_image` is already `img/og.png` with an explanatory note, and the site follows the documented contract.
- `og.png` is exactly **1200×630** at 85 KB — correct aspect ratio for a large summary card, and small enough to fetch reliably.
- Twitter card complete: `twitter:card=summary_large_image`, `twitter:title`, `twitter:description`, `twitter:image`, `twitter:creator=@detain`.
- `og:title`/`twitter:title` carry the kit's own `tagline_primary` ("Phlix — Every Frame, a Mystery."), so the share card is brand-voiced rather than generic. The 404 page has its own distinct title ("Dead End — Phlix").
- JSON-LD `SoftwareApplication` block present, well-formed, and factually accurate — including the correct MPL-2.0 licence URL.
- `<meta name="theme-color" content="#f5a623">` uses the kit's primary, so the mobile browser chrome is on-brand.
- Favicon reference is a valid SVG (`img/favicon.svg`, 704 bytes) and resolves.

## ⚠️ Concerns (non-blocking)

- **`index.html:43`** (and identically on all nine pages) — the favicon set is a single `<link rel="icon" type="image/svg+xml">`. The rubric asks for 16, 32, 180 (`apple-touch-icon`), 192, 512 plus `manifest.webmanifest`; none of those exist, and no `manifest.webmanifest` ships in `sites/neon-noir/`. SVG-only favicons are not honoured by iOS home-screen bookmarks or by several share surfaces. This looks like a shared-template baseline across the programme rather than a neon-noir regression, so it needs an orchestrator ruling on scope — but as shipped the dimension is incomplete.
- **`index.html:26-29`** — no `og:image:width` / `og:image:height` / `og:image:alt`. The dimensions let a scraper render the large card before fetching the image, and `og:image:alt` is a straightforward accessibility win on shared cards. The `og.png` is correctly sized, so this is purely declarative.
- **All nine pages share one byte-identical `og:description`/`twitter:description`.** A share of the Features page and a share of the Download page produce indistinguishable cards. Each page already has distinctive `.t-lead` copy that would serve better.
- `img/og.svg` (4.9 KB) ships in the deployed directory but is referenced by nothing — it is the editable source for `og.png`, so keeping it is defensible, but it is unused bytes in the published output.

## ❌ Failures (must fix this round)

None.

## Recommendations (ranked by impact)

1. Ask the orchestrator whether the favicon set + `manifest.webmanifest` is in scope for this programme; if yes, generate 16/32/180/192/512 and a manifest from `img/favicon.svg` (impact: medium, effort: medium).
2. Add `og:image:width="1200"`, `og:image:height="630"` and an `og:image:alt` (impact: low, effort: trivial).
3. Give each page its own `og:description` from its `.t-lead` (impact: low, effort: low).

## Evidence

- PNG header read of `sites/neon-noir/img/og.png` → 1200×630, 85 KB.
- `index.html:18-44`, `404.html:19-45` — full OG/Twitter/favicon blocks.
- `ls sites/neon-noir/` — no `manifest.webmanifest`, no raster favicons.
- `shared/content.json meta.og_image` = `img/og.png` with `og_image_note` describing the absolute-URL contract the site follows.
