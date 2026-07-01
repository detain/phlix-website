# R2 — Social Metadata

## Round 1 Fixes: VERIFIED

| # | Issue | Status | Evidence |
|---|-------|--------|----------|
| 3 | og:image updated from og.svg to og.png | ✅ UPDATED | All 8 pages: `<meta property="og:image" content="https://detain.github.io/phlix-website/marble-atrium/img/og.png">` ✅ |
| 3 | og:image also updated in Twitter meta | ✅ UPDATED | All 8 pages: `<meta name="twitter:image" content="...og.png">` ✅ |

---

## NEW ISSUES

### ❌ CRITICAL: og.png does not exist — social shares will fail

- **Severity:** Critical (complete failure of social metadata)
- **File:** All 8 HTML pages meta tags; img/ directory
- **Evidence:**
  - All 8 pages reference `<meta property="og:image" content="https://detain.github.io/phlix-website/marble-atrium/img/og.png">`
  - `ls img/` shows: `favicon.svg logo.svg og.svg PROMPTS.md` — **og.png does NOT exist**
  - The og.svg source file IS present at img/og.svg, but it was never rasterized to PNG
- **Impact:**
  - **Facebook:** Will show a broken image or no image preview. Facebook requires JPEG/PNG for og:image.
  - **LinkedIn:** Will show broken/no image preview
  - **Slack:** Will show broken/no image preview
  - **Twitter/X:** Requires PNG/JPEG; will show broken/no image
  - **Google SGE/AI:** May use og:image for rich previews — will fail
- **Spec violation:** new_site.md §11: "Ship og.svg as the editable source if used, but reference a rasterized og.png in meta" — the rasterization step was not completed.

### ⚠️ HIGH: og:image URL uses hard-coded domain — relative path would be more portable

- **Severity:** Low (spec §11 actually requires absolute URLs)
- **Evidence:** All pages: `https://detain.github.io/phlix-website/marble-atrium/img/og.png` — this is actually **correct** per spec §11 which explicitly requires absolute URLs. The spec also explicitly calls out that a relative og:image is a known past bug.
- **Not a violation** — spec compliance. This note is for context only.

### ✅ SOCIAL METADATA STRUCTURE — ALL OTHER ELEMENTS CORRECT

| Element | Pages | Status |
|---------|-------|--------|
| `og:type=website` | All 8 | ✅ |
| `og:site_name=Phlix` | All 8 | ✅ |
| `og:url` (absolute) | All 8 | ✅ |
| `og:title` | All 8 | ✅ (matches page title) |
| `og:description` | All 8 | ✅ (matches meta description) |
| `og:image` (absolute URL) | All 8 | ✅ (but file missing) |
| `twitter:card=summary_large_image` | All 8 | ✅ |
| `twitter:title` | All 8 | ✅ |
| `twitter:description` | All 8 | ✅ |
| `twitter:image` (absolute URL) | All 8 | ✅ (but file missing) |
| `twitter:creator=@detain` | All 8 | ✅ |
| `theme-color=#B8960C` | All 8 | ✅ (Champagne Gold per brand kit) |
| Favicon `type="image/svg+xml"` | All 8 | ✅ |

---

## og:image CONTENT ANALYSIS (if it existed)

Had og.png been created from og.svg, the content would be:

- 1200×630 canvas ✅ (correct dimensions)
- Marble white background (#F7F5F2) ✅
- Glass-ceiling grid pattern (subtle, hairline) ✅
- PHLIX wordmark (Georgia serif fallback) ✅ (brand-kit compliant per fallbacks)
- Tagline "Your Library, Elevated." ✅
- Kit identity "MARBLE ATRIUM" ✅

**Content is brand-appropriate** — once the file is actually created. The SVG source is correctly designed.

---

## TWITTER CARD SPECIFIC CHECK

| Element | Requirement | Implementation | Status |
|---------|-------------|----------------|--------|
| twitter:card | summary_large_image | `summary_large_image` ✅ | ✅ |
| twitter:image | ≥300×157px | 1200×630 ✅ | ✅ (if file existed) |
| twitter:title | ≤70 chars | "Phlix — Your Library, Elevated." (31 chars) ✅ | ✅ |
| twitter:description | ≤200 chars | ~100 chars ✅ | ✅ |
| twitter:creator | @handle | @detain ✅ | ✅ |

---

## SCORE: 35/100

| Factor | Score | Notes |
|--------|-------|-------|
| og:type | 100 | website ✅ |
| og:site_name | 100 | Phlix ✅ |
| og:url | 100 | Absolute URL ✅ |
| og:title | 100 | Page-specific ✅ |
| og:description | 100 | Matches meta description ✅ |
| **og:image** | **0** | **File does not exist — complete failure** |
| twitter:card | 100 | summary_large_image ✅ |
| twitter:title | 100 | Correct ✅ |
| twitter:description | 100 | Correct ✅ |
| twitter:image | **0** | **File does not exist** |
| twitter:creator | 100 | @detain ✅ |
| theme-color | 100 | #B8960C ✅ |
| Favicon | 100 | SVG ✅ |
| **Overall** | **35** | **og:image missing is a complete social metadata failure** |

**Pass threshold: 80** — ❌ Does not pass.

### Required fix
1. **Create og.png** — Rasterize img/og.svg to exactly 1200×630px PNG
   - The SVG source is already correct and brand-appropriate
   - Save as `img/og.png`
   - Verify file exists: `ls img/og.png`

### How to create og.png (commands)
```bash
# Option: use ImageMagick
convert -background '#F7F5F2' img/og.svg -resize 1200x630 img/og.png

# Option: use rsvg-convert
rsvg-convert -w 1200 -h 630 img/og.svg > img/og.png

# Option: use Inkscape export
inkscape img/og.svg --export-filename=img/og.png --export-width=1200 --export-height=630
```
