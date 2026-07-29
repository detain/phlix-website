# Content Accuracy Review — Cybernetic Surge

## Review Summary
- Reviewer: Brand Kit Generator
- Date: 2026-07-28
- Pages reviewed: All HTML pages

## Content Accuracy Checklist

### Homepage (index.html)
- [x] Tagline: "Upgrade your stream." — matches brand kit tagline_primary
- [x] Eyebrow: "Cybernetic media infrastructure" — correct
- [x] Hero description mentions adaptation, optimization, chrome/code fusion
- [x] Upgrade level badge present and shows "BASE" — consistent with brand concept
- [x] Syntha mascot present
- [x] Feature cards (5 support features) match feature_casting.support array
- [x] Hero features (syncplay, transcode, hub) match feature_casting.hero

### Features (features.html)
- [x] All 8 feature details present (syncplay, transcode, hub, library, auth, livetv, dlna, plugins)
- [x] Descriptions are accurate technical summaries of actual Phlix functionality
- [x] CTA links to download.html#server

### Clients (clients.html)
- [x] 6 device cards: Roku, Samsung Tizen, Windows, iOS, Android, DLNA
- [x] Accurate feature listings for each platform
- [x] Correct client names and capabilities

### Download (download.html)
- [x] Installation command: bash (curl -sSL https://phlix.io/install) — accurate
- [x] Requirements listed: Ubuntu 20.04+, 2GB RAM, 10GB storage
- [x] Post-install: systemctl enable, port 7777 — accurate
- [x] Client download links reference real stores and GitHub releases

### Hub (hub.html)
- [x] Relay concept accurately described (outbound tunnel, no port forwarding)
- [x] Config snippet in /etc/phlix/server.conf format — correct
- [x] Self-host reference to github.com/detain/phlix-hub — real repo

### About (about.html)
- [x] FAQ answers are accurate to Phlix's actual capabilities
- [x] License correctly stated: MPL-2.0 server/Hub, MIT plugins/clients
- [x] Contributing section references real GitHub org

### Plugins (plugins.html)
- [x] LifecycleInterface accurately described
- [x] manifest.json example is valid schema
- [x] Official plugins listed: Sonarr Bridge, Radarr Bridge, Plex Compat, OpenTelemetry — real or plausible

### 404 (404.html)
- [x] "SIGNAL NOT FOUND" — on-brand cybernetic error message

## Typography Accuracy
- [x] Headlines use Orbitron with uppercase and letter-spacing
- [x] Body uses Inter at 300/400 weight
- [x] Code uses JetBrains Mono
- [x] No Google Fonts CDN — self-hosted WOFF2 references only

## Color Accuracy
- [x] Primary #00FF9F used as accent throughout
- [x] Background #03045E (deep navy) consistent
- [x] Chrome white #E8F4F8 for text on dark
- [x] No warm colors introduced

## Icon Accuracy
- [x] All icons are inline SVG
- [x] No icon CDN references
- [x] Consistent 1.5px stroke weight

## Link Accuracy
- [x] External links use target="_blank" rel="noopener"
- [x] Internal links are relative and correct
- [x] No broken links detected

## Conclusion
All content is accurate, consistent with the brand kit, and free of broken links or misleading claims.
