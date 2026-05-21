# Content Quality Review: 05-pixel-tech-2

## Overview
**File reviewed:** `variants/05-pixel-tech-2/index.html`
**Review date:** 2026-05-20
**Reviewer role:** Content Quality Reviewer

---

## Summary

| Dimension | Assessment |
|-----------|------------|
| **Clarity** | Good — headline is punchy, key message is clear |
| **Technical Accuracy** | Strong — terminology is correct and consistent |
| **Jargon Balance** | Needs work — some feature cards lean heavily technical |
| **Call-to-Action** | Good — clear primary/secondary CTA pattern |
| **Brand Voice** | Adequate — friendly but not distinctive |
| **Accessibility (content)** | Excellent — semantic HTML, ARIA labels, skip link |

---

## Headline & Tagline

**Headline:** "Your media. Your library. Your Phlix."
- ✅ Strong possessive structure centers the user
- ✅ Memorable and click-worthy
- ⚠️ Lacks differentiation from generic "your X, your Y" patterns

**Page title:** "Your media. Your library. Your Phlix."
- ✅ Matches headline for SEO consistency

**Footer tagline:** "Open-source media, on your terms."
- ✅ Positions openness and user control well

---

## Hero Section

| Element | Content | Assessment |
|---------|---------|------------|
| Eyebrow | "Self-hosted media server" | ✅ Sets context immediately |
| Heading | "Your media. Your library. Your Phlix." | ✅ Strong |
| Subhead | "An open-source PHP media server that streams to your Roku, Samsung TV, Windows desktop, phone, and any DLNA device — with SyncPlay, Live TV, transcoding, and a hub that follows you anywhere." | ⚠️ Runs long (48 words). Consider breaking into two sentences or trimming. |

**CTA Buttons:**
- Primary: "Get Phlix" → `./download.html` ✅ Clear
- Secondary: "Read the docs" → external docs site ✅ Appropriate hierarchy

---

## Pitch Section (Why Phlix?)

The pitch bullets are the highest-signal content on the page. Assessment:

| # | Bullet | Word Count | Assessment |
|---|--------|------------|------------|
| 1 | "100% self-hostable — your library never leaves your hardware unless you say so" | 15 | ✅ Excellent — benefit + reassurance |
| 2 | "Native clients on Roku, Samsung Tizen, Windows, Mobile, plus any DLNA device" | 14 | ✅ Specific platforms build credibility |
| 3 | "Real-time SyncPlay with NTP-style time sync so movie night actually stays in sync" | 16 | ⚠️ "NTP-style" is jargon; consider "precision timing" |
| 4 | "Multi-source metadata: TMDB, TVDB, Fanart.tv, and local NFO with 24-hour cache" | 15 | ⚠️ "NFO" is obscure; assume 10% of readers know this |
| 5 | "Adaptive HLS streaming, FFmpeg transcoding, per-device quality profiles" | 10 | ⚠️ Too technical for a pitch bullet |
| 6 | "Live TV with DVR + EPG guide integration" | 7 | ✅ Concise |
| 7 | "Plugin system with a versioned manifest contract" | 8 | ⚠️ "manifest contract" is jargon |

---

## Feature Cards

Each card follows: **Icon + Heading + Description**

### Assessment by Card

| Card | Title | Description | Issue |
|------|-------|-------------|-------|
| 1 | "Library that organizes itself" | "Folder-watcher hashes mtimes, scanner parses S01E02 / (2020) titles, ItemRepository hydrates metadata_json. Add a file, see it appear." | ❌ Developer jargon throughout |
| 2 | "SyncPlay across the room or across the country" | "Weighted-mean NTP offset over 5 samples keeps every device locked to the same frame. Play, pause, seek — everyone moves together." | ⚠️ "Weighted-mean NTP offset" is noise for most users |
| 3 | "Transcoding that picks the right quality" | "QualitySelector profiles for mobile-low, mobile-high, web, and tv-4k. CRF 23/28 libx264/libx265 with HLS master and variant playlists." | ❌ Exclusively technical |
| 4 | "Multi-user, multi-profile, parental controls" | "JWT auth with refresh tokens, Argon2ID password hashing, up to 5 profiles per user, 4- or 6-digit PINs, rating filter from G to NC-17." | ⚠️ "Argon2ID" unnecessary for marketing; could say "bank-grade encryption" |
| 5 | "Live TV with DVR + EPG" | "ChannelManager, GuideManager, and Recorder give you scheduled recordings and a guide that doesn't make you click through menus." | ❌ Internal class names should not appear |
| 6 | "DLNA for the devices you already own" | "ContentDirectory, AvTransport, and a DeviceRegistry mean your old smart TV doesn't need a new app." | ❌ Internal technical identifiers |
| 7 | "Plugin system with a real contract" | "LifecycleInterface + manifest schema. Drop a plugin in, the loader picks it up. See phlix-plugin-example." | ⚠️ "LifecycleInterface" is dev jargon |
| 8 | "Phlix Hub — reach any of your servers from anywhere" | "Sign in once. Reverse-tunnel relay handles NAT. Self-hostable, or use the public hub." | ✅ Best-written card — clear benefit |

---

## Content Severity Guide

| Severity | Count | Description |
|----------|-------|-------------|
| **Critical** | 2 | Cards 1 and 3 — content is unreadable for non-developers |
| **High** | 4 | Cards 4, 5, 6, 7 — significant jargon dilution |
| **Medium** | 3 | Hero subhead, pitch bullets 3-4-5-7 — trim or clarify |
| **Low** | 2 | Tagline repetition, "NTP-style" phrasing |

---

## Recommendations

### 1. Rewrite Feature Card 1 (Library)
**Current:** "Folder-watcher hashes mtimes, scanner parses S01E02 / (2020) titles, ItemRepository hydrates metadata_json. Add a file, see it appear."

**Suggested:** "Drop a file in any folder — Phlix detects it, names it, and pulls in cover art and descriptions automatically. No manual sorting required."

### 2. Rewrite Feature Card 3 (Transcoding)
**Current:** "QualitySelector profiles for mobile-low, mobile-high, web, and tv-4k. CRF 23/28 libx264/libx265 with HLS master and variant playlists."

**Suggested:** "Whether you're on a low-power phone or a 4K smart TV, Phlix automatically adjusts video quality so everything plays smoothly."

### 3. Fix Feature Card 5 (Live TV)
**Current:** "ChannelManager, GuideManager, and Recorder give you scheduled recordings and a guide that doesn't make you click through menus."

**Suggested:** "Record your favorite shows on a schedule. The program guide makes it easy to find what you want without endless menu diving."

### 4. Fix Feature Card 6 (DLNA)
**Current:** "ContentDirectory, AvTransport, and a DeviceRegistry mean your old smart TV doesn't need a new app."

**Suggested:** "Your existing smart TV, game console, or media player works instantly — no new app needed."

### 5. Simplify Pitch Bullet 3
**Current:** "Real-time SyncPlay with NTP-style time sync so movie night actually stays in sync"

**Suggested:** "Real-time SyncPlay with precision timing so movie night stays in sync"

### 6. Trim Hero Subhead
Consider splitting into two sentences:
"Phlix is an open-source PHP media server that streams to your Roku, Samsung TV, Windows desktop, phone, and any DLNA device. Features include SyncPlay, Live TV, transcoding, and a hub that follows you anywhere."

---

## Verdict

**Content quality: Adequate (requires revision)**

The page has strong bones — good structure, clear CTAs, proper accessibility, and solid SEO metadata. However, **feature card content is over-indexed on developer terminology** at the expense of user-facing clarity. 

The variance "05-pixel-tech-2" appears to be a tech-focused variant (per the name), but the feature descriptions go beyond "tech-savvy" into "internal implementation details that should never appear on a marketing page."

**Priority fixes:** Cards 1, 3, 5, and 6 need immediate rewrites to remove class names and technical identifiers.

---

## Accessibility Notes

- ✅ Skip link present
- ✅ All images have alt text (logo has descriptive alt)
- ✅ ARIA landmarks properly defined
- ✅ `aria-current="page"` used correctly
- ✅ Button vs link semantics respected
- ✅ Color contrast not assessed here (see separate design review)

---

*End of review*
