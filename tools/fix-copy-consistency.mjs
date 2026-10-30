#!/usr/bin/env node
/**
 * tools/fix-copy-consistency.mjs
 *
 * One-shot copy-consistency sweep for the W-min193/194/196/197 website minors
 * batches (minors-space IDs). Twelve passes, each measured before it fires:
 *
 *  P1 orthography (M-WEBSITE-24): British → US spellings in VISIBLE text
 *     only — HTML text runs, meta/title attribute values. Deliberately NOT
 *     renamed: CSS/HTML identifiers (e.g. pop-art-explosion's `footer-licence`
 *     class, 11 sites/*.css hits), tooling comments whose wording test/
 *     literals pin (tools/gen-*.mjs "rasterise" family). They are invisible
 *     to every reader of the shipped artifact.
 *  P2 Oxford comma (M-WEBSITE-27): the three-item license clause
 *     "…libraries, plugins and clients are MIT" → "…, plugins, and clients",
 *     in every shipped prefix form (SSOT "the shared libraries, …" plus the
 *     kit-voice re-casts swiss-modernist/apex-predator/psychedelic-groove
 *     carry), matching the already-correct SSOT sentence in
 *     shared/content.json. The two-item clause ("; plugins and clients are
 *     MIT" — obsidian-pulse) needs no serial comma and stays untouched.
 *  P3 title separator (M-WEBSITE-26): the 19 storm-chaser/thunder-strike/
 *     android-dreams pages whose <title> joined clauses with " | " while all
 *     1317 other titles use " — ".
 *  P4 security link (M-WEBSITE-23): inserts a footer <li> linking the
 *     documented disclosure policy
 *     https://detain.github.io/phlix-docs/security/vulnerability-disclosure.html
 *     (authority: phlix-docs docs/security/vulnerability-disclosure.md, live
 *     in the published dist) directly before each footer's License (MPL…) li.
 *     Pages with two <footer> blocks are matched on the one holding the
 *     License li (five kit index pages ship a decorative footer first).
 *
 *  P5 feature revoice (M-WEBSITE-07/10, W-min194): the eight flagship feature
 *     bodies — rewritten jargon→plain in shared/content.json — swapped verbatim
 *     into every kit page that still carries the old sentence ("Sign in once.
 *     Reverse-tunnel relay handles NAT" family, 243 files; Weighted-mean 243,
 *     QualitySelector 237, Argon2ID 231, ItemRepository 31). Kit-voice re-casts
 *     that already paraphrase into plain language are untouched; P5b sweeps the
 *     near-verbatim jargon families that survive inside kit-shaped sentences.
 *  P6 cost line (M-WEBSITE-08): the footer tagline gains the plain price answer
 *     ("free" appeared in visible copy zero times across canonical variants).
 *     Same swap mechanism; the root index.html footer moves with it.
 *  P7 releases tell (M-WEBSITE-12): each kit's download.html gains a one-line link
 *     to the server's GitHub releases (version + changelog tell) right after the
 *     primary install-command block — first block only, idempotent on the URL,
 *     per-file misses reported.
 *  P8 extended bodies (M-WEBSITE-15/20, W-min196): the grown auth/transcode/
 *     plugins/hub bodies (identity providers, hardware profiles, named scrobblers,
 *     hub-to-hub federation) — litGrow keeps the old head intact and appends the
 *     new tail; guards prevent double-application.
 *  P9 roster bullet mirror (M-WEBSITE-18/19, W-min197): the pitch_bullets
 *     client enumeration — lives in REVOCED (it mirrors content.json exactly).
 *  P10 roster claims (M-WEBSITE-18/19, W-min197): ROSTER_CLAIMS — kit narrative
 *     sentences that count the SSOT roster (4 + DLNA → 7 surfaces); page-internal
 *     grid counts are deliberately untouched (authoring wave disclosed in-report).
 *  P11 natives re-adjudication (M-WEBSITE-18/19, W-min197): RENATIVES — the
 *     four→five native-client count the §19.14 law binds, swept across sites/
 *     AND brand-kits/ copy sources (the kit spec files are copy data for the
 *     engine's law-5 pairings).
 *  P12 cost line on kit-voiced footers (M-WEBSITE-08 r2, W-min194 review): P6
 *     swapped only the verbatim canonical tagline, so the 38 deployed kits
 *     shipping a kit-voiced footer tagline never answered the cost question
 *     (327/721 deployed pages carried it, 38 kits zero). The footer tagline is
 *     the one text carrier shipped on every canonical page of a kit: append
 *     the plain cost sentence inside it (class-token match across the three
 *     shipped shapes; targeted footer-scoped carriers for three footers without
 *     a classed tagline paragraph; brand-kits footer_tagline strings move with
 *     their pages). Pages that ship no tagline carrier are reported, not
 *     invented into; per-kit misses disclosed in the batch report.
 *
 * House doctrine (carved by tools/fix-license-facts.mjs PASS 2): matching is
 * whitespace-tolerant because Prettier owns wrapping and mid-sentence breaks
 * silently defeat single-line literals; every pass is idempotent; --dry-run
 * reports per-pass counts without writing. Run `npm run format` after
 * applying so inserted markup adopts each file's prettier shape.
 *
 *   node tools/fix-copy-consistency.mjs --dry-run
 *   node tools/fix-copy-consistency.mjs
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { globSync } from 'glob';

const DRY = process.argv.includes('--dry-run');

const SEC_URL =
  'https://detain.github.io/phlix-docs/security/vulnerability-disclosure.html';

// Explicit stem pairs; occurrence census (tip, shipped scope) drove the list.
const BRIT = [
  ['licence', 'license'],
  ['rasterise', 'rasterize'],
  ['behaviour', 'behavior'],
  ['theatre', 'theater'],
  ['colour', 'color'],
  ['favourite', 'favorite'],
  ['centre', 'center'],
];
function restyle(us, match) {
  if (/^[A-Z]{2,}$/.test(match)) return us.toUpperCase();
  if (/^[A-Z]/.test(match)) return us[0].toUpperCase() + us.slice(1);
  return us;
}

const VISIBLE_ATTRS = /\b(content|alt|title|aria-label|placeholder)="([^"]*)"/g;

function ortho(text) {
  let n = 0;
  for (const [uk, us] of BRIT) {
    const re = new RegExp(`\\b${uk}(?:s|d)?\\b`, 'gi');
    text = text.replace(re, (m) => {
      n++;
      const suffix = m.slice(m.toLowerCase().indexOf(uk) + uk.length);
      return restyle(us, m) + suffix;
    });
  }
  return [text, n];
}

// Text runs between tags. [^<>] spans newlines, so Prettier-wrapped copy is
// matched as one run (fix-license-facts PASS 2 lesson).
function sweepHtml(t) {
  let count = 0;
  t = t.replace(/>([^<>]+)</g, (_m, run, off) => {
    const [fixed, n] = ortho(run);
    count += n;
    return n ? `>${fixed}<` : _m;
  });
  t = t.replace(VISIBLE_ATTRS, (m, attr, val) => {
    const [fixed, n] = ortho(val);
    count += n;
    return n ? `${attr}="${fixed}"` : m;
  });
  return [t, count];
}

function sweepTitles(t) {
  let n = 0;
  t = t.replace(/<title>([^<]*)<\/title>/g, (m, inner) => {
    if (!inner.includes(' | ')) return m;
    n++;
    return `<title>${inner.replaceAll(' | ', ' — ')}</title>`;
  });
  return [t, n];
}

// The three-item license clause in all its shipped prefixes: SSOT form
// ("the shared libraries, …") plus the kit-voice re-casts "swiss-modernist"
// kept un-swept and apex-predator/psychedelic-groove carry. The two-item
// clause ("; plugins and clients are MIT" — obsidian-pulse) takes NO serial
// comma and is deliberately NOT matched: the pattern anchors on "libraries,".
const OXFORD = /libraries,\s+plugins\s+and\s+clients\s+are\s+MIT/gi;
function sweepOxford(t) {
  let n = 0;
  t = t.replace(OXFORD, (m) => {
    n++;
    return m.replace(/plugins\s+and\s+clients/, 'plugins, and clients');
  });
  return [t, n];
}

// Whole <footer> blocks only; insert before the li whose visible text starts
// at "Licen[cs]e (MPL" — bounded hop that cannot cross into a nested li.
// Shape 1 (1064+ files): <li ...> ... License ... </li>
// Shape 2 (root index.html, foot-links divs): bare <a> ... License ... </a>
const LIC_LI =
  /([ \t]*)(<li[ >](?:(?!<li[ >]|<\/li>)[\s\S]){0,300}?Licen[cs]e\s*\(MPL[\s\S]*?<\/li>)/;
const LIC_A =
  /([ \t]*)(<a(?:(?!<\/a>)[\s\S]){0,300}?Licen[cs]e\s*\(MPL[\s\S]*?<\/a\s*>)/;
function sweepSecurity(t) {
  if (t.includes('vulnerability-disclosure')) return [t, 0];
  // Five kit index pages (abstract-canvas, afrofuturism, bollywood-dreams,
  // marina-breeze, mid-century-modern) carry TWO <footer> blocks and the
  // License li lives in the second one — the first-footer match silently
  // skipped them. Pick the first footer that actually holds the license li.
  const blocks = [...t.matchAll(/<footer[\s\S]*?<\/footer>/g)].map((m) => m[0]);
  if (!blocks.length) return [t, -1]; // no footer at all
  const footer = blocks.find((b) => /Licen[cs]e\s*\(MPL/.test(b));
  if (!footer) return [t, -1];
  const lm = footer.match(LIC_LI);
  if (lm) {
    const indent = lm[1];
    const li =
      `${indent}<li>\n${indent}  <a href="${SEC_URL}" rel="noopener noreferrer">Security</a>\n${indent}</li>\n`;
    return [t.replace(footer, footer.replace(lm[0], li + lm[0])), 1];
  }
  const am = footer.match(LIC_A);
  if (am) {
    const indent = am[1];
    const a = `${indent}<a href="${SEC_URL}" rel="noopener noreferrer">Security</a>\n`;
    return [t.replace(footer, footer.replace(am[0], a + am[0])), 1];
  }
  return [t, -1];
}

// P5/P6: literal old→new swaps tolerant of Prettier wrapping (a mid-sentence
// newline silently defeats single-line literals — fix-license-facts PASS 2).
// The OLD strings must stay byte-faithful to the pre-W-min194 copy or the sweep
// goes vacuous; the NEW strings mirror shared/content.json at this tip.
function litSwap(oldText, newText) {
  const re = new RegExp(
    oldText
      .split(/\s+/)
      .map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
      .join('\\s+'),
    'g',
  );
  return (t) => {
    let n = 0;
    const out = t.replace(re, () => {
      n++;
      return newText;
    });
    return [out, n];
  };
}

const REVOCED = [
  [
    'Folder-watcher hashes mtimes, scanner parses S01E02 / (2020) titles, ItemRepository hydrates metadata_json. Add a file, see it appear.',
    'Add a file, see it appear. Phlix watches your folders for changes, recognizes naming like S01E02 and (2020), and fills in the titles, descriptions, and artwork for you — no renaming rituals, no manual entry.',
  ],
  [
    'Weighted-mean NTP offset over 5 samples keeps every device locked to the same frame. Play, pause, seek — everyone moves together.',
    "Watch together, perfectly in step. Phlix keeps every device's playback clock tightly synced, so play, pause, and seek move together for everyone in the room — or an ocean away.",
  ],
  [
    'QualitySelector profiles for mobile-low, mobile-high, web, and tv-4k. libx264/libx265 transcoding (H.264 defaults to CRF 23) with HLS master and variant playlists.',
    "Every device gets the right quality on its own — dedicated profiles for phones, web, and 4K TVs. When a file won't play directly, Phlix transcodes it on the fly with FFmpeg (H.264 defaults to CRF 23, the sweet spot between quality and size) and delivers it as adaptive HLS that rides out network hiccups.",
  ],
  [
    'JWT auth with refresh tokens, Argon2ID password hashing, up to 5 profiles per user, 4- or 6-digit PINs, rating filter from G to NC-17.',
    "One account, up to 5 personal profiles, each lockable with a 4- or 6-digit PIN. Passwords are protected with Argon2ID — today's strongest widely recommended hashing — and sign-ins stay secure with tokens that refresh themselves. Rating filters from G to NC-17 keep kids' profiles to kids' content.",
  ],
  [
    "ChannelManager, GuideManager, and Recorder give you scheduled recordings and a guide that doesn't make you click through menus.",
    "Watch, pause, and record live TV. Schedule a recording once and it happens on time; the on-screen guide opens straight to what's on now — no clicking through menus.",
  ],
  [
    "ContentDirectory, AvTransport, and a DeviceRegistry mean your old smart TV doesn't need a new app.",
    'Phlix speaks DLNA — the streaming standard already built into most older smart TVs, game consoles, and receivers — so the devices you own can play your library with no app to install.',
  ],
  [
    'LifecycleInterface + manifest schema. Install a plugin from Settings → Plugins and enable it. See phlix-plugin-example.',
    'Install plugins straight from Settings → Plugins and switch them on — extra metadata sources, account scrobblers, and add-ons. Want to build your own? A versioned contract and a minimal starter repo (phlix-plugin-example) show you the way in.',
  ],
  [
    'Sign in once. Reverse-tunnel relay handles NAT. Fully self-hostable — you run the hub, you own the relay.',
    'The hub is a small server you run in the cloud that connects your devices to your home server — no ports to open, no third-party tunnel. Sign in once and watch your library from anywhere. You run the hub, you own the relay.',
  ],
  [
    'Open-source media, on your terms.',
    'Open-source media, on your terms — free to use, no subscription. You pay only for your own hardware and bandwidth.',
  ],
  // M-WEBSITE-18/19 (review website__pm m2/m4): the roster bullet named four
  // device apps + DLNA site-wide; the shipped Linux console and the browser
  // portal were silently dropped. New text ends in DLNA — the shape law 13's
  // roster acquittal keys on — and makes no hub-mode claim. Mirrors
  // pitch_bullets in shared/content.json exactly.
  [
    'Native clients on Roku, Samsung Tizen, Windows, Mobile, plus any DLNA device',
    'Native apps for Roku, Samsung Tizen, Windows, Mobile, and the Linux console — plus the web portal and any DLNA device',
  ],
].map(([o, n]) => litSwap(o, n));

// ROSTER-CLAIMS — (M-WEBSITE-18/19) per-kit narrative sentences that count the
// SSOT client roster rather than the page's own grid. Page-internal counts
// ("Five stations, five materials", download-card/section tallies) stay
// truthful against their own cards and are deliberately NOT swept — extending
// the per-kit client card grids is an authoring wave (cure-spec in the W-min197
// report). Not in content.json: hand-authored kit prose.
const ROSTER_CLAIMS = [
  [
    'Five clients that talk to the server you control',
    'Seven clients that talk to the server you control',
  ],
].map(([o, n]) => litSwap(o, n));

// NEAR_ROSTERS — (M-WEBSITE-18/19) the six kit-voiced roster sentences where the
// SSOT bullet survived with small tail ornaments ((beta) markers, &nbsp;, strong
// splits, kit metaphors). Targeted, context-anchored, whitespace-tolerant rules;
// each replacement keeps the kit's own tail and stays hub-word-free / DLNA-
// terminated (law 13 acquittal shapes). The four meta og:description carriers on
// clients pages and page-internal grid counts stay authored against their own
// cards — authoring-wave disclosure in the W-min197 report, not swept.
const NEAR_ROSTERS = [
  [
    /Native\s+clients\s+on\s+Roku,\s+Samsung\s+Tizen,\s+Windows,\s+Mobile<\/strong>,\s+plus\s+any\s+DLNA\s+device/g,
    'Native apps for Roku, Samsung Tizen, Windows, Mobile, and the Linux console</strong>, plus the web portal and any DLNA device',
  ],
  [
    /Native\s+clients\s+on\s+Roku,\s+Samsung\s+Tizen,\s+Windows,\s+Mobile\s+\(beta\)<\/strong>,\s+plus\s+any\s+DLNA\s+device/g,
    'Native apps for Roku, Samsung Tizen, Windows, Mobile (beta), the Linux console and the web portal</strong>, plus any DLNA device',
  ],
  [
    /Native\s+clients\s+on\s+Roku,\s+Samsung\s+Tizen,\s+Windows,\s+Mobile,\s+plus\s+any\s+DLNA&nbsp;device/g,
    'Native apps for Roku, Samsung Tizen, Windows, Mobile, and the Linux console — plus the web portal and any DLNA&nbsp;device',
  ],
  [
    /Native\s+clients\s+on\s+Roku,\s+Samsung\s+Tizen,\s+Windows,\s+Mobile\s+\(beta\),\s+plus\s+any\s+DLNA\s+device/g,
    'Native apps for Roku, Samsung Tizen, Windows, Mobile (beta), the Linux console and the web portal — plus any DLNA device',
  ],
  [
    /Native\s+clients\s+on\s+Roku,\s+Samsung\s+Tizen,\s+Windows,\s+and\s+mobile\s+\(beta\)\.\s+Plus\s+any\s+DLNA\s+device\s+you\s+already\s+own/g,
    'Native apps for Roku, Samsung Tizen, Windows, mobile (beta), the Linux console and the web portal. Plus any DLNA device you already own',
  ],
  [
    /Native\s+clients\s+on\s+Roku,\s+Samsung\s+Tizen,\s+Windows,\s+and\s+Mobile\s+\(iOS\s*\+\s*Android\)\s+—\s+plus\s+any\s+DLNA\s+device\s+that\s+shares\s+your\s+network\.\s+Five\s+sanctuaries/g,
    'Native apps for Roku, Samsung Tizen, Windows, Mobile (iOS + Android), the Linux console and the web portal — plus any DLNA device that shares your network. Seven sanctuaries',
  ],
];

// RENATIVES — (P11, M-WEBSITE-18/19 W-min197 §19.14 re-adjudication) the native-
// client COUNT tokens bound to the noun by law 5's engine: four→five now that the
// Linux console client (phlix-console-client, shipped + localized) joins the
// lineup. Lookahead-only rules: they rewrite the number and leave the noun text
// exactly as the kit wrote it; case-shaped so prose keeps its shape (Four→Five).
// Idempotent: the post-swap digit/word no longer matches. Cross-element and kit-
// voice pairings the raw lookahead cannot see come back as reds from
// test/variant-copy-truth law 5 and are fixed by hand — this pass is the floor.
const RENATIVES = [
  [/\b4(?=[\s\u00a0]+[Nn]ative(?:[\s\u00a0]+[A-Za-z][\w-]*){0,2}[\s\u00a0]+[Cc]lients?\b)/g, '5'],
  [/\bFour(?=[\s\u00a0]+[Nn]ative(?:[\s\u00a0]+[A-Za-z][\w-]*){0,2}[\s\u00a0]+[Cc]lients?\b)/g, 'Five'],
  [/\bfour(?=[\s\u00a0]+[Nn]ative(?:[\s\u00a0]+[A-Za-z][\w-]*){0,2}[\s\u00a0]+[Cc]lients?\b)/g, 'five'],
  // Cross-element stat-grid shapes: the count lives in its own node and the noun
  // in the sibling label — the hop window matches what law 5 sees after markup
  // collapses, so these pairings move with the floor.
  [/\b4(?=<\/(?:div|span|p|dd|dt|strong|em|b)>[\s\S]{0,60}?(?:[Nn]ative\s+[Cc]lients?\b))/g, '5'],
  [/\bFour(?=<\/(?:div|span|p|dd|dt|strong|em|b)>[\s\S]{0,60}?(?:[Nn]ative\s+[Cc]lients?\b))/g, 'Five'],
  [/\bfour(?=<\/(?:div|span|p|dd|dt|strong|em|b)\s*>[\s\S]{0,60}?(?:[Nn]ative\s+[Cc]lients?\b))/g, 'five'],
  // Prettier's tag-split shape: >4</span\n> then the label span — the closing
  // tag may be broken across lines before its '>'.
  [/\b4(?=<\/(?:span|div|p|h3)\s*\n\s*>[\s\S]{0,160}?(?:[Nn]ative\s+[Cc]lients?\b))/g, '5'],
  [/\bFour(?=<\/(?:span|div|p|h3)\s*\n\s*>[\s\S]{0,160}?(?:[Nn]ative\s+[Cc]lients?\b))/g, 'Five'],
  [/\bfour(?=<\/(?:span|div|p|h3)\s*\n\s*>[\s\S]{0,160}?(?:[Nn]ative\s+[Cc]lients?\b))/g, 'five'],
  // Heading-number shapes: the count stands alone inside its heading node and
  // the next element's text starts with the noun (speakeasy-gold proof-card).
  [/\b4(?=\s*<\/h3>\s*<p\s*>[\s\S]{0,24}?Native\s+clients)/g, '5'],
  // Label-first shapes: <dt>Native clients</dt><dd>[count-word] — …</dd> and the
  // kit stat object with label "Native Clients" and a digit value.
  [/((?:[Nn]ative\s+[Cc]lients?)<\/dt>\s*<dd>)Four\b/g, '$1Five'],
  [/((?:[Nn]ative\s+[Cc]lients?)<\/dt>\s*<dd>)four\b/g, '$1five'],
  [/(label:\s*"Native Clients",\s*value:\s*")4("\s*})/g, '$15$2'],
];


// P5b near-verbatim families (M-WEBSITE-07 census tail): kit re-casts that kept
// the old jargon inside their own sentence shapes ("Sign in once. Reverse-tunnel
// relay handles NAT. Fully self-hostable." ×190; "LifecycleInterface + manifest
// schema" ×285 as meta/lead fragments; Folder-watcher/Weighted-mean/… openers).
// Phrase-level, case-shaped replacements that preserve the kit's own tail.
// Ordered specific-before-generic. Whitespace is \s+-tolerant (Prettier owns
// wrapping). Idempotent: no replacement re-matches any pattern. Decorative chips
// (<span class="wall-chip">AvTransport</span>), the mobile-low/tv-4k profile
// enumerations on deep about pages, and code samples (`implements
// LifecycleInterface {`) are deliberately out of scope: visible-styled widgets,
// factual option names, and developer documentation respectively.
const PHRASES = [
  [/The\s+Hub's\s+reverse-tunnel\s+relay\s+handles\s+NAT\s+traversal/g, "The Hub reaches your home server through an encrypted relay"],
  [/\b([Rr])everse-tunnel\s+relay\s+handles\s+(?:the\s+)?NAT(?:\s+traversal)?\b/g, (m, c) => `${c === 'R' ? 'A' : 'a'} relay you run reaches your home server without opening ports`],
  [/([Ww])eighted-mean\s+NTP\s+offset\s+over\s+\d+\s+samples/g, (m, c) => `${c === 'W' ? 'A' : 'a'} tightly-synchronized playback clock`],
  [/Weighted-mean\s+NTP\s+timing/g, 'Tight playback timing'],
  [/Folder-watcher\s+hashes\s+mtimes/g, 'Phlix watches your folders for changes'],
  // r2 (W-min194 review): the P5b era-rule [/scanner parses/ → 'recognizes']
  // shipped "the scanner parses" as "the recognizes" wherever the kit sentence
  // carried its own subject. These two rules repair the artifact and forbid
  // the recurrence; the bare rule below stays for the comma-list form
  // ("…for changes, scanner parses…") where the subject is elided.
  [/([Tt])he\s+scanner\s+parses/g, (m, c) => `${c}he scanner recognizes`],
  [/([Tt])he\s+recognizes/g, (m, c) => `${c}he scanner recognizes`],
  [/scanner\s+parses/g, 'recognizes'],
  [/ItemRepository\s+hydrates\s+metadata_json/g, 'Phlix fills in titles, artwork, and descriptions'],
  [/JWT\s+auth\s+with\s+refresh\s+tokens/g, 'secure sign-in that renews itself'],
  [/ChannelManager,\s+GuideManager,\s+and\s+Recorder/g, 'Built-in scheduling, the guide, and the recorder'],
  [/ContentDirectory\s+and\s+AvTransport\s+over\s+DLNA/g, 'the DLNA directory and transport protocols'],
  [/ContentDirectory,\s+AvTransport,\s+and\s+a\s+DeviceRegistry/g, 'the DLNA directory and transport protocols'],
  [/ContentDirectory\s+and\s+AvTransport/g, 'the DLNA directory and transport protocols'],
  [/QualitySelector\s+profiles\s+for\s+mobile-low,\s+mobile-high,\s+web,\s+and\s+tv-4k/g, 'Dedicated quality profiles for phones, web, and 4K TVs'],
  [/QualitySelector\s+profiles/g, 'quality profiles'],
  [/libx264\/libx265\s+transcoding/g, 'FFmpeg transcoding'],
  [/LifecycleInterface\s+\+\s+manifest\s+schema/g, 'A versioned plugin contract'],
  [/Implement\s+the\s+LifecycleInterface\b/g, 'Implement the plugin contract'],
  [/Implement\s+LifecycleInterface\b/g, 'Implement the plugin contract'],
  [/implement\s+LifecycleInterface\b/g, 'implement the plugin contract'],
];
function sweepPhrases(t) {
  let n = 0;
  for (const [re, repl] of PHRASES) {
    t = t.replace(re, (...args) => {
      n++;
      return typeof repl === 'function' ? repl(...args) : repl;
    });
  }
  return [t, n];
}

// P8 differentiator + BYO extensions (M-WEBSITE-11/15/20, W-min196): grow the
// just-revoiced bodies and pitch bullet with the facts the review says have no
// marketing surface — OIDC/LDAP/passkeys (server src/Plugins/{Oidc,Ldap},
// WebAuthn F7 quintet), VAAPI hardware profiles (config/hwaccel_profiles.php),
// hub federation Ed25519 proof-of-key (hub H-4/H-5), named scrobble plugins,
// and the explicit bring-your-own-media line. OLD literals are this tip's new
// bodies; they mirror shared/content.json byte-for-byte.

// Like litSwap, but for EXTENDED pairs whose NEW text literally begins with
// the OLD text (a grown sentence). Without the lookahead the grown shape would
// re-match its own output on the next run — the house idempotency law.
function litGrow(oldText, newText) {
  const esc = (w) => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const tail = newText.startsWith(oldText) ? newText.slice(oldText.length) : '';
  const tailGuard = tail
    ? '(?!\\s+' + tail.trim().split(/\s+/).slice(0, 4).map(esc).join('\\s+') + ')'
    : '';
  const re = new RegExp(oldText.split(/\s+/).map(esc).join('\\s+') + tailGuard, 'g');
  return (t) => {
    let n = 0;
    const out = t.replace(re, () => {
      n++;
      return newText;
    });
    return [out, n];
  };
}

const EXTENDED = [
  [
    '100% self-hostable — your library never leaves your hardware unless you say so',
    'Bring your own media — Phlix plays the files you own, on hardware you control, and your library never leaves it unless you say so. Free and open source; no subscription, no catalog to buy',
  ],
  [
    "One account, up to 5 personal profiles, each lockable with a 4- or 6-digit PIN. Passwords are protected with Argon2ID — today's strongest widely recommended hashing — and sign-ins stay secure with tokens that refresh themselves. Rating filters from G to NC-17 keep kids' profiles to kids' content.",
    "One account, up to 5 personal profiles, each lockable with a 4- or 6-digit PIN. Passwords are protected with Argon2ID — today's strongest widely recommended hashing — and sign-ins stay secure with tokens that refresh themselves. Rating filters from G to NC-17 keep kids' profiles to kids' content. Bring your existing identity too: OIDC, LDAP, and passkeys all work, so Phlix fits the sign-in you already run.",
  ],
  [
    "Every device gets the right quality on its own — dedicated profiles for phones, web, and 4K TVs. When a file won't play directly, Phlix transcodes it on the fly with FFmpeg (H.264 defaults to CRF 23, the sweet spot between quality and size) and delivers it as adaptive HLS that rides out network hiccups.",
    "Every device gets the right quality on its own — dedicated profiles for phones, web, and 4K TVs. When a file won't play directly, Phlix transcodes it on the fly with FFmpeg (H.264 defaults to CRF 23, the sweet spot between quality and size) and delivers it as adaptive HLS that rides out network hiccups. If your server has a compatible Intel or AMD GPU, hardware profiles run the heavy work on it instead of the CPU.",
  ],
  [
    'Install plugins straight from Settings → Plugins and switch them on — extra metadata sources, account scrobblers, and add-ons. Want to build your own? A versioned contract and a minimal starter repo (phlix-plugin-example) show you the way in.',
    "Install plugins straight from Settings → Plugins and switch them on — Trakt and Last.fm keep your watch history in step on services you already use (that's what scrobbling means), extra metadata providers sharpen artwork and subtitles, and more add-ons ship every month. Want to build your own? A versioned contract and a minimal starter repo (phlix-plugin-example) show you the way in.",
  ],
  [
    'The hub is a small server you run in the cloud that connects your devices to your home server — no ports to open, no third-party tunnel. Sign in once and watch your library from anywhere. You run the hub, you own the relay.',
    'The hub is a small server you run in the cloud that connects your devices to your home server — no ports to open, no third-party tunnel. Sign in once and watch your library from anywhere. You run the hub, you own the relay. Hubs can even link up with each other, each proving its identity with an Ed25519 signature.',
  ],
].map(([o, n]) => litGrow(o, n));

// P7: the primary install-command block ends at `sudo bash` closed through any
// of the three shipped shapes (`</code></pre>`, span-wrapped, or a wrapped
// `</code\n>` inside a div). Insert after it, consuming only the closers that
// sit immediately behind so the <p> lands inside the same card.
const RELEASES_URL = 'https://github.com/detain/phlix-server/releases';
const RELEASES_P = `<p>Every Phlix release ships with its changelog — see the <a href="${RELEASES_URL}">latest server releases on GitHub</a> for the current version and what's new.</p>`;
function sweepReleases(t) {
  if (t.includes(RELEASES_URL)) return [t, 0];
  const m = t.match(
    /sudo\s+bash\s*(?:<\/span\s*>)?\s*(?:<\/code\s*>|<\/pre\s*>|<\/p\s*>|<\/div\s*>)/,
  );
  if (!m) return [t, -1];
  const after = m.index + m[0].length;
  const closers = t
    .slice(after)
    .match(/^(\s*<\/pre>)?(\s*<\/p\s*>)?(\s*<\/div>)?(\s*<button[\s\S]{0,120}?<\/button>)?/)[0];
  return [
    t.slice(0, after + closers.length) + '\n' + RELEASES_P + t.slice(after + closers.length),
    1,
  ];
}

// P12 — the plain cost sentence, appended inside footer tagline carriers of
// the 38 deployed kits the W-min194 review measured at zero coverage. Joiner
// law: a carrier ending in sentence punctuation takes the cost as a new
// sentence; a bare prompt-style line (cyber-pursuit's per-page
// "root@phlix:~# cat error.log" taglines) takes it as an em-dash clause so the
// terminal voice survives. Intrinsic idempotence: the grown shape never
// re-matches; classed carriers also guard on 'no subscription'.
const COST_SENTENCE = ' Free to use, no subscription. You pay only for your own hardware and bandwidth.';
const COST_CLAUSE = ' — free to use, no subscription. You pay only for your own hardware and bandwidth.';
const COST_KITS = new Set([
  'abstract-canvas', 'art-nouveau-garden', 'celtic-twilight', 'chrome-velocity',
  'copper-steampunk', 'cosmic-odyssey', 'cottagecore-bloom', 'cyber-pursuit',
  'demolition-crew', 'desert-horizon', 'dia-de-muertos', 'digital-combat-zone',
  'editorial-underground', 'egyptian-dusk', 'festive-lantern',
  'holographic-future', 'ice-cathedral', 'inferno', 'library-amber',
  'manga-studio', 'marble-atrium', 'midnight-jazz', 'neon-noir', 'nexus-core',
  'pixel-dungeon', 'quantum-stream', 'renaissance-atelier', 'ricochet',
  'solarpunk-eden', 'soundwave-studio', 'speakeasy-gold',
  'stardust-observatory', 'storm-chaser', 'street-mural', 'swiss-modernist',
  'velocity-rush', 'wabi-sabi', 'wilderness-trail',
]);
function costJoin(pText) {
  return /[.!?]\s*$/.test(pText) ? COST_SENTENCE : COST_CLAUSE;
}
function sweepCostFooters(t) {
  let n = 0;
  let classed = 0;
  t = t.replace(
    /(<p\b[^>]*class="[^"]*\bfooter(?:-{1,2}|_{1,2})tagline\b[^"]*"[^>]*>)([\s\S]*?)(<\/p\s*>)/g,
    (m, open, inner, close) => {
      classed++;
      if (/no\s+subscription/i.test(inner)) return m;
      n++;
      return open + inner + costJoin(inner) + close;
    },
  );
  if (classed) return [t, n];
  // Unclassed footer carriers: three kits ship a footer sentence the class
  // matcher cannot see. Element-anchored (brand div / inline-styled p /
  // copyright p), footer-region scoped — the same sentences appear as hero
  // copy outside it and are not taglines.
  const fi = t.indexOf('<footer');
  if (fi === -1) return [t, 0];
  const footer = t
    .slice(fi)
    .replace(
      /(<div class="site-footer__brand">\s*<img[^>]*\/?>\s*<p>)([\s\S]*?)(<\/p\s*>)/g,
      (m, open, inner, close) => {
        if (/no\s+subscription/i.test(inner)) return m;
        n++;
        return open + inner + costJoin(inner) + close;
      },
    )
    .replace(
      /(<p style="color: var\(--color-text-muted\); font-size: 0\.9375rem">)([\s\S]*?)(<\/p\s*>)/g,
      (m, open, inner, close) => {
        if (/no\s+subscription/i.test(inner)) return m;
        n++;
        return open + inner + costJoin(inner) + close;
      },
    )
    .replace(/(<p class="footer-copyright">)([\s\S]*?)(<\/p\s*>)/g, (m, open, inner, close) => {
      if (/no\s+subscription/i.test(inner)) return m;
      n++;
      return open + inner + costJoin(inner) + close;
    });
  return n ? [t.slice(0, fi) + footer, n] : [t, 0];
}

let files = [
  ...globSync('sites/**/*.html', { ignore: 'sites/*/reviews/**' }),
  ...globSync('sites/**/*.js'),
  ...globSync('brand-kits/*.js'),
  'brand_kit_schema.js',
  'index.html',
];
const counts = {
  ortho: 0,
  oxford: 0,
  titles: 0,
  secInserted: 0,
  secMiss: [],
  revoiced: 0,
  phrases: 0,
  extended: 0,
  roster: 0,
  near: 0,
  natives: 0,
  releasesInserted: 0,
  releasesMiss: [],
  costFooters: 0,
  costKitJs: 0,
  costMiss: [],
};
for (const f of files) {
  let t = readFileSync(f, 'utf8');
  const orig = t;
  let o;
  // The HTML-shape passes (visible-text orthography census, footer <li>
  // insertion, Oxford-in-boilerplate) match markup and belong to the shipped
  // page corpus only; the copy passes below also run on the .js copy sources
  // (brand-kit spec strings, kit main.js) added for P11.
  if (f.endsWith('.html')) {
    [t, o] = sweepHtml(t);
    counts.ortho += o;
    [t, o] = sweepOxford(t);
    counts.oxford += o;
    [t, o] = sweepSecurity(t);
    if (o === 1) counts.secInserted++;
    else if (o === -1 && /Licen[cs]e\s*\(MPL/.test(t)) counts.secMiss.push(f);
  }
  [t, o] = sweepTitles(t);
  counts.titles += o;
  for (const swap of REVOCED) {
    [t, o] = swap(t);
    counts.revoiced += o;
  }
  [t, o] = sweepPhrases(t);
  counts.phrases += o;
  for (const swap of EXTENDED) {
    [t, o] = swap(t);
    counts.extended += o;
  }
  for (const swap of ROSTER_CLAIMS) {
    [t, o] = swap(t);
    counts.roster += o;
  }
  for (const [re, newText] of NEAR_ROSTERS) {
    t = t.replace(re, () => {
      counts.near++;
      return newText;
    });
  }
  for (const [re, newText] of RENATIVES) {
    const hit = t.match(re);
    if (hit) {
      counts.natives += hit.length;
      t = t.replace(re, newText);
    }
  }
  // P12 — deployed-kit footer cost line (html) + the kit's own declared
  // footer_tagline string, so the copy source and the shipped pages agree.
  if (f.endsWith('.html')) {
    const slug = f.startsWith('sites/') ? f.split('/')[1] : null;
    if (slug && COST_KITS.has(slug)) {
      [t, o] = sweepCostFooters(t);
      counts.costFooters += o;
      // A true miss = the page has NO carrier and NO cost line at all;
      // zero-append pages that already answer the cost are covered.
      if (o === 0 && !/no\s+subscription/i.test(t)) counts.costMiss.push(f);
    }
  } else if (f.startsWith('brand-kits/') && f.endsWith('.js')) {
    const slug = f.slice('brand-kits/'.length, -3);
    if (COST_KITS.has(slug)) {
      t = t.replace(/(footer_tagline:\s*")((?:[^"\\]|\\.)*)(")/g, (m, open, inner, close) => {
        if (/no\s+subscription/i.test(inner)) return m;
        counts.costKitJs++;
        return open + inner + costJoin(inner) + close;
      });
    }
  }
  if (f.endsWith('/download.html')) {
    [t, o] = sweepReleases(t);
    if (o === 1) counts.releasesInserted++;
    else if (o === -1) counts.releasesMiss.push(f);
  }
  if (t !== orig && !DRY) writeFileSync(f, t);
}

// content.json is prettier-ignored; fix the one British word in its note.
{
  const f = 'shared/content.json';
  let t = readFileSync(f, 'utf8');
  const [fixed, n] = ortho(t);
  if (n && !DRY) writeFileSync(f, fixed);
  counts.ortho += n;
}

console.log(
  JSON.stringify(
    {
      dryRun: DRY,
      filesScanned: files.length,
      orthography: counts.ortho,
      oxfordComma: counts.oxford,
      titleSeparators: counts.titles,
      securityLiInserted: counts.secInserted,
      securityMisses: counts.secMiss,
      revoicedSwaps: counts.revoiced,
      phrasesSwapped: counts.phrases,
      extendedSwaps: counts.extended,
      rosterSwaps: counts.roster,
      nearRosterSwaps: counts.near,
      nativesSwaps: counts.natives,
      releasesPInserted: counts.releasesInserted,
      releasesMisses: counts.releasesMiss,
      costFooterAppends: counts.costFooters,
      costKitJsAppends: counts.costKitJs,
      costCarrierMisses: counts.costMiss,
    },
    null,
    2,
  ),
);
