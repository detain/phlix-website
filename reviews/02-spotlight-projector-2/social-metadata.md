# Social Metadata Review: 02-spotlight-projector-2

## Summary
**PASS** — All Open Graph and Twitter Card metadata is present and correctly configured.

## Open Graph Tags

| Tag | Value | Status |
|-----|-------|--------|
| `og:title` | "Phlix — Your media. Your library. Your Phlix." | ✅ Present |
| `og:description` | "Phlix — a self-hostable, open-source PHP media server with native clients for Roku, Samsung Tizen, Windows, and Mobile. SyncPlay, Live TV, transcoding, DLNA, hub relay." | ✅ Present |
| `og:image` | `img/og.svg` | ✅ Present |
| `og:url` | `https://detain.github.io/phlix-website/variants/02-spotlight-projector-2/` | ✅ Present |
| `og:type` | `website` | ✅ Present |
| `og:site_name` | `Phlix` | ✅ Present |

## Twitter Cards

| Tag | Value | Status |
|-----|-------|--------|
| `twitter:card` | `summary_large_image` | ✅ Present |
| `twitter:title` | "Phlix — Your media. Your library. Your Phlix." | ✅ Present |
| `twitter:description` | "Phlix — a self-hostable, open-source PHP media server with native clients for Roku, Samsung Tizen, Windows, and Mobile. SyncPlay, Live TV, transcoding, DLNA, hub relay." | ✅ Present |
| `twitter:image` | `img/og.svg` | ✅ Present |

## og:image Analysis (`img/og.svg`)

| Attribute | Value | Status |
|-----------|-------|--------|
| Dimensions | 1200×630 | ✅ Correct (Open Graph/Twitter recommended size) |
| Format | SVG | ✅ Valid |
| Background | `#000000` (black) | ✅ Consistent with theme |
| Brand elements | Logo, tagline, feature hints | ✅ Complete |
| Text content | "Phlix", "Your media. Your library. Your Phlix.", features | ✅ Readable |

## Additional Metadata

- `theme-color`: `#000000` — ✅ Present
- `canonical`: ✅ Present with correct URL
- JSON-LD: ✅ Present with `SoftwareApplication` schema

## Notes

- All social metadata tags are properly structured and complete
- The `og:image` and `twitter:image` reference the same SVG file (`img/og.svg`)
- Twitter Card uses `summary_large_image` type which displays the image prominently
- Both OG and Twitter descriptions are consistent with the page content
