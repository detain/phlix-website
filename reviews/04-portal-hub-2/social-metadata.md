# Social Metadata Review: 04-portal-hub-2

## Summary

| Aspect | Status |
|--------|--------|
| Open Graph Tags | ✅ Pass |
| Twitter Card Tags | ✅ Pass |
| OG Image | ✅ Pass |
| Schema.org JSON-LD | ✅ Pass |
| Theme Color | ✅ Pass |

---

## Open Graph Tags

| Tag | Value | Verdict |
|-----|-------|---------|
| `og:title` | "Phlix — Connect everything. Control everything." | ✅ Strong, brand + value prop |
| `og:description` | "Phlix — a self-hostable, open-source PHP media server with native clients for Roku, Samsung Tizen, Windows, and Mobile. SyncPlay, Live TV, transcoding, DLNA, hub relay." | ✅ Keyword-rich, lists platforms and features |
| `og:image` | `./img/og.svg` | ✅ Valid relative path |
| `og:url` | `https://detain.github.io/phlix-website/` | ✅ Canonical URL |
| `og:type` | `website` | ✅ Correct |
| `og:site_name` | `Phlix` | ✅ Correct |

---

## Twitter Card Tags

| Tag | Value | Verdict |
|-----|-------|---------|
| `twitter:card` | `summary_large_image` | ✅ Appropriate for rich OG image |
| `twitter:title` | "Phlix — Connect everything. Control everything." | ✅ Matches OG |
| `twitter:description` | "Phlix — a self-hostable, open-source PHP media server with native clients for Roku, Samsung Tizen, Windows, and Mobile. SyncPlay, Live TV, transcoding, DLNA, hub relay." | ✅ Matches OG |
| `twitter:image` | `./img/og.svg` | ✅ Matches OG |

---

## OG Image: `img/og.svg`

| Attribute | Value | Verdict |
|-----------|-------|---------|
| Dimensions | 1200×630 | ✅ Standard social share size |
| Format | SVG | ⚠️ Works on most platforms but LinkedIn prefers PNG/JPG |
| Color Palette | Dark navy (#0A1628) + cyan (#00D4FF) | ✅ Consistent with portal-hub theme |
| Typography | Space Grotesk (brand), DM Sans (supporting) | ✅ Intentional font choices |
| Imagery | Concentric portal rings, play icon, grid overlay | ✅ Hub/relay visual metaphor appropriate |
| Text Content | "Phlix" / "Connect everything. Control everything." / "Self-hosted PHP media server" | ✅ Hierarchy is clear |

**Image Notes:**
- The portal imagery (concentric rings + play button) reinforces the "hub" concept — good thematic alignment
- Glow effects and grid pattern create depth; not too busy for thumbnail size
- The cyan-on-dark scheme matches `theme-color: #00D4FF`

---

## Schema.org JSON-LD

```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Phlix",
  "description": "Self-hostable open-source PHP media server",
  "applicationCategory": "MultimediaApplication",
  "operatingSystem": "PHP 8.3+",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "url": "https://detain.github.io/phlix-website/"
}
```

| Field | Verdict |
|-------|---------|
| `@type: SoftwareApplication` | ✅ Appropriate |
| `applicationCategory: MultimediaApplication` | ✅ Correct |
| `offers: price: "0"` (free) | ✅ Accurate |
| `operatingSystem` | ✅ PHP 8.3+ is informational |

---

## Theme Color

```html
<meta name="theme-color" content="#00D4FF">
```

| Aspect | Verdict |
|--------|---------|
| Value | `#00D4FF` |
| Alignment | ✅ Matches OG image primary accent and CSS theme |

---

## Minor Observation

The OG description lists specific clients and features but does not mention **VPN-less remote access** or **hub relay** as a headline benefit — which is the differentiating claim of the portal-hub wave. The tagline "Connect everything. Control everything." hints at it, but if sharing context is limited to the description, remote access might not be immediately apparent. However, this is a minor copy nuance, not a metadata structural issue.

---

## Verdict

**✅ PASS** — All required social metadata tags are present and correctly formed. The OG image is thematically aligned with the portal-hub wave. No blocking issues detected.
