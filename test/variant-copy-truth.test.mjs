// Guard: variant kits re-voice presentation copy — they never ship fabricated
// facts (review website__newcomer M-WEBSITE-06).
//
// Run with `npm run test:unit` (`node --test "test/**/*.test.mjs"`).
//
// WHY THIS FILE EXISTS
// --------------------
// new_site.md §2A is the estate law: shared/content.json is the single source
// of marketing FACTS; a brand kit may declare copy_overlay (hero eyebrow /
// headline / subheadline, CTA labels, section headings) and site_architecture
// .nav label renames — legal re-voicing, "Facts stay locked". chrome-velocity
// crossed that line: it shipped a hero title "Zero to Play in Under a Second",
// a subheadline claiming "built at Formula 1 pit-wall speed — no lag, no
// compromise, no excuses", and a tagline repeating the timing promise — into
// the page <title>/og:title/twitter:title, the hand-authored hero, the kit
// file's tagline_primary (which tools/build.mjs injects verbatim into the
// published root gallery via __PHLIX_KITS__), and its site-local
// content.json. No estate measurement backs a sub-second start.
//
// Two sibling claims named by the same review were already retracted by the
// truth sweeps and stay retracted under this law: "5 Native Clients" (the SSOT
// counts four native clients; the r2 sweep also retired desert-horizon's
// "8 native + DLNA clients" — same miscount class, see the pattern registry;
// r4 caught the class still breathing in two more carriers the literal law
// could not see — cyber-pursuit's { label: "Native Clients", value: "5" }
// proof_strategy stat, cured to "4" matching its own shipped trust-stat, and
// velocity-rush's SHIPPED og/twitter descriptions "Six native clients." — a
// word-form count beyond the 5/five literal family, cured to the §19.14
// sentence)
// and the swiss-modernist "hub access without the internet" (written before
// the relay existed; now "without opening ports").
// "CRF 23/28" was retired by be34d142 in favor of the honest "H.264 defaults
// to CRF 23". The M-WEBSITE-07 positive-fabrication class (unlimited-viewers
// marketing and invented sync benchmarks around watch parties, groups and
// share links) joins the list below, cured to the server's real caps — see the
// per-entry comments for both-sides coordinates. And the M-WEBSITE-08 class —
// the SHIPPED mobile apps (live `latest` prerelease APK; iOS build-from-source)
// narrated as "coming soon"/"in development" by nexus-core and cyber-pursuit —
// is regression-banned verbatim, alongside its two inverted cousins fixed in
// the same sweep: demolition-crew badging its (beta) Android card "Stable" and
// its iOS card "In Review" (no store submission exists to review). The r2 round
// widened the M8 literals into shape-aware pairs after review M-WEBSITE-08__r1
// proved the original three anchored only plural/compound whole phrases —
// per-platform singular regressions ("The Android app coming soon…") re-opened
// the class in total silence. See the M8 block below for the pairing law and
// the markup-collapse pass that kills label/value splits across tags. The
// M-WEBSITE-09 class — Samsung Tizen hub-mode claims in BOTH directions (the
// retired "coming soon"/"in development" underclaims and the a8597e21-era
// four-client overclaim, plus two invented capabilities) — is cured across 80
// files and regression-banned by the Tizen/universal-quantifier pairs at the
// end of the registry.
//
// WHAT IS DELIBERATELY NOT FORBIDDEN
// ----------------------------------
// The wide SyncPlay revoice family "no lag, no drift" and the unadjudicated
// perf-promise taglines of other velocity kits ("Zero Wait.", "Zero
// Buffering.") are legal-presentation voice per §2A and were not adjudicated
// false by this review — they are recorded as residual observations in the
// fix report, not policed here. This file kills only the claims the review
// named, wherever they try to come back.
//
// KNOWN SHAPE LIMITATIONS (r4, stated honestly per review M6r3 (3d)):
// the pairing law binds a count to the noun "native clients" through a
// punctuation gap, one key hop (label/value/count), or one element hop
// between sibling nodes. It deliberately does NOT bind: (a) counts decorated
// with "+" ("5+" headline badges) and (b) counts beside compound relief words
// ("Five windows/weapons", "Six cockpits", "Native Clients + DLNA", "5 client
// paths", "8 native features") — the r2 sweep table dispositioned that
// surface-enumeration family legal (four natives plus any DLNA device counted
// as surfaces), and r3 concurred it is owner-wave positive-pin material, not
// this law's prey. The one laundering-proof exception: a compound "N+ native
// clients" inside a SINGLE string is a count claim and dies as a raw-form
// literal — applied to collapsed markup it would (and in development, did)
// re-convict the very sibling-badge family this paragraph exempts. A
// fabrication that hides behind a "+" badge element or a relief noun stays
// outside the pairing net by design; a bare count paired directly to the noun
// 1..12, digit or word, in any key/value/adjacency shape, cannot.
//
// The laws:
//
//   1. no forbidden claim in ANY TRACKED TEXT FILE — the whole repo minus a
//      short list of exemptions that each carry a NAMED REASON (review
//      archives quoting claims as evidence, authoring records logging their
//      cure, the law doc's adjudication row, and this file's own registry).
//      r2 rewrote this law from an enumerated input set to the tracked tree
//      after review website__writer M6r1 caught the enumeration going blind:
//      brand_kit_schema.js — the BASE kit that seeds every future kit's
//      proof_strategy — sat outside the walk while still teaching the banned
//      "5 native clients" count. Enumerating inputs is how a law goes stale;
//      `git ls-files` is the denominator and exemptions must be justified.
//      HTML files are scanned twice: once as written, once with markup
//      collapsed to plain text (M8r2) — a claim split across a tag boundary
//      (badge label in one node, future-tense value in the next) is the same
//      claim to a reader and must be the same claim to the law. r4 adds the
//      SHAPE-AWARE natives pairing (see assertNativesShape): a count bound to
//      the words "native clients" through a key hop, one element hop, or bare
//      adjacency is a client-count claim even when no literal like
//      "5 native clients" ever appears — { label: "Native Clients",
//      value: "5" }, {"Native Clients":"5"}, <div>5</div><div>Native
//      Clients</div>, meta content="Six native clients", and word-counted
//      splits. The r3 review proved the label-based perimeter was blind to
//      exactly this shape, and r4's own sweep then found a SHIPPED sibling the
//      r3 probe class had also missed (velocity-rush's "Six native clients"
//      og/twitter descriptions — word forms beyond 5/five were outside every
//      literal). The pairing guard is structural, not a blanket number scan:
//      digits inside tag attributes/comments are masked away, zero-padded
//      ordinals and "+"-decorated surface badges never bind, and every
//      legitimate number in the tree ("5" User Profiles, "5 client paths",
//      "8 native features", "Five ways to watch") stays green by measurement.
//   2. no forbidden claim in the ARTIFACT — a real tools/build.mjs run into a
//      throwaway root (same isolation idiom as test/public-hub-truth.test.mjs
//      law 2: repo dist/ is rebuilt by test/csp-gate.test.mjs mid-run, so
//      reading it here would race). The r4 pairing guard applies here too, so
//      a split-shape claim cannot reach the Pages build;
//   3. the chrome-velocity hero keeps the SSOT fact set after the cure
//      (platforms + feature rail re-voiced, not deleted) and the root gallery
//      manifest carries the cured tagline — a "cure" that quietly amputated
//      the facts or the identity could not pass;
//   4. the tagline published twice (kit file feeds the root gallery; the
//      site-local content.json ships verbatim) agrees with itself;
//   5. (r4) the natives shape law has teeth and its cures stay cured: the
//      truth count is DERIVED from the SSOT enumeration, the cyber-pursuit
//      survivor and the velocity-rush metas are pinned at the derived truth,
//      and both scans must actually observe bound pairs (a matcher that
//      silently stopped pairing reddens the law instead of passing it).

import { after, test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import {
  mkdtempSync,
  readFileSync,
  readdirSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const BUILD = join(ROOT, 'tools', 'build.mjs');

// [pattern, what it was] — every entry is verbatim or near-verbatim member of
// the M-WEBSITE-06 evidence set, or (M8r2) a shape-aware pair derived from a
// named member of it. Case-insensitive: pages vary capitalisation.
const FORBIDDEN = [
  [/under a second/i, 'the "Zero to Play in Under a Second" timing promise'],
  [/pit-wall speed/i, 'the "built at Formula 1 pit-wall speed" claim'],
  [/no lag, no compromise/i, 'the "no lag, no compromise, no excuses" promise'],
  [/5 native clients/i, 'the "5 Native Clients" miscount (SSOT counts four)'],
  [/five native clients/i, 'the "five native clients" miscount, spelled'],
  // r2 sweep (review website__writer M6r1): the same miscount class wearing a
  // different number. desert-horizon shipped "8 native + DLNA clients" while
  // its own enumeration lists four natives + DLNA; cured to the §19.14
  // sentence and regression-banned alongside 5/five. (The "8 native features"
  // family in other kits is a TRUE feature count — content.json carries eight
  // — and stays deliberately unforbidden.)
  [
    /8 native \+ DLNA clients/i,
    'the "8 native + DLNA clients" miscount (SSOT §19.14: four native clients, plus any DLNA device)',
  ],
  [/CRF 23\/28/, 'the retracted "CRF 23/28" encoding claim (be34d142)'],
  [/without the internet/i, 'the swiss "hub access without the internet" claim'],
  // M-WEBSITE-07 (positive-fabrication class, review website__pm): capability
  // numbers around watch parties / groups / links with no estate measurement
  // behind them. Authoritative caps: SyncPlay rooms hold GroupState::
  // MAX_MEMBERS = 50 (phlix-server src/Session/SyncPlay/GroupState.php:106,
  // rejected at :388) — the "unlimited viewers" original and the velocity-x
  // "Tested to 20 simultaneous viewers with sub-100ms sync accuracy" and
  // quantum-stream "Sub-100ms ... up to 16 simultaneous observers" fabrications
  // are cured to that truth (TimeSync has no sub-100ms guarantee; the sync
  // tolerance is a 2000ms default, SPEC §group position). And no anonymous
  // "shareable library link" exists on either host: server auth is account-
  // based, hub invite links serve existing members — velocity-rush's claim is
  // cured to the verified local-account facts (UserProfileManager::
  // MAX_PROFILES_PER_USER = 5, phlix-server src/Auth/UserProfileManager.php:85).
  [
    /unlimited (?:viewers|members|participants|observers|guests)/i,
    'an "unlimited viewers/members" watch-party claim (real cap: MAX_MEMBERS = 50)',
  ],
  [
    /tested to \d+ simultaneous (?:viewers|members|observers)/i,
    'a fabricated viewer-cap benchmark ("Tested to 20 simultaneous viewers")',
  ],
  [
    /sub-100 ?ms/i,
    'the fabricated sub-100ms sync-latency figure (no estate measurement; contract tolerance is 2000ms)',
  ],
  [
    /up to 16 simultaneous observers/i,
    'the quantum-stream "16 simultaneous observers" miscount (real cap: 50)',
  ],
  [
    /shareable library links/i,
    'the velocity-rush "shareable library links without account creation" fabrication (no anonymous share links exist server- or hub-side)',
  ],
  // M-WEBSITE-08 (review website__pm M2): shipped mobile apps narrated in the
  // future tense. phlix-mobile-client publishes a live, non-draft `latest`
  // prerelease carrying app-release.apk (re-verified at the r2 lane via
  // `gh api .../releases`: exactly one release, that one) — Android installs
  // from that release today; iOS is build-from-source (no public TestFlight,
  // no store listings — the honest FAQ sentence at shared/content.json states
  // exactly this). Yet nexus-core's download hero shipped "Android and iOS
  // apps coming soon" and cyber-pursuit's clients gallery carried "Coming
  // soon: native iOS and Android apps" under an "In development" badge. The
  // copy was cured (a8597e21-era sweeps) and the rows added (1c43786a); the
  // literals below regression-ban the shipped-vs-coming fiction anywhere a
  // tracked file tries to bring it back.
  //
  // r2 (review M-WEBSITE-08__r1 ISSUE 1): the first trio anchored whole
  // plural/compound phrases only, and the review's planted probe
  // "<p>The Android app coming soon for phones. The iOS app is coming soon
  // too.</p>" sat SILENT GREEN. The shapes below pair the mobile nouns with
  // the future-tense family in BOTH directions with a bounded word gap, so
  // per-platform singular forms ("Android app coming soon", "iOS app is
  // coming soon", "the Android version is coming soon"), label/value splits
  // ("In development: mobile apps"), structured splits (JSON "platform":
  // "mobile app" beside "status": "coming soon") and — via the markup-
  // collapse pass — badge/value splits across tags all redden. The gap
  // classes are letters and spaces (plus JSON punctuation for the structured
  // pair) with hard length bounds, so unrelated roadmap copy one sentence
  // away stays outside the law; the whole tracked tree scans clean under
  // these patterns at this commit (measured, not assumed).
  [
    /android and ios apps coming soon/i,
    'the nexus-core "Android and iOS apps coming soon" fiction (the APK prerelease ships today)',
  ],
  [
    /coming soon: native ios and android/i,
    'the cyber-pursuit "Coming soon: native iOS and Android apps" gallery fiction (same shipped-vs-coming class)',
  ],
  [
    /(?:android|ios|mobile)[a-z ]{0,10}(?:app|apps|version|clients?)[a-z ]{0,10}coming soon/i,
    'a per-platform "app/version coming soon" narration of the shipped product (r1 probe: "The Android app coming soon for phones.")',
  ],
  [
    /(?:coming soon|in development)[ :.—-]{1,3}(?:the |a |native )*(?:android|ios|mobile)[a-z ,]{0,14}(?:app|apps|version|clients?)/i,
    'a future-tense label paired with its mobile value ("Coming soon: native iOS and Android apps", "In development: the mobile app")',
  ],
  [
    /(?:android|ios|mobile)[a-z ]{0,12}(?:app|apps|version|clients?)[a-z ]{0,12}(?:\bin development\b|\bdevelopment builds?\b|\bdev builds?\b)/i,
    'a mobile app/version/client narrated as "in development" or "development build" (the APK prerelease ships today)',
  ],
  [
    /(?:android|ios|mobile)[a-z_ ",:\n]{0,20}(?:app|apps|version|clients?)[a-z_ ",:\n]{0,20}(?:coming soon|\bin development\b|\bdevelopment builds?\b|\bdev builds?\b)/i,
    'a structured key/value split of the mobile-future claim (JSON-style "mobile app" … "coming soon" pairs)',
  ],
  [
    /(?:coming soon|\bin development\b|\bdevelopment builds?\b|\bdev builds?\b)[a-z_ ",:\n]{0,20}(?:android|ios|mobile)[a-z ,_"]{0,16}(?:app|apps|version|clients?)/i,
    'a structured future-claim key paired ahead of its mobile value (the reverse JSON split)',
  ],
  [
    /(?:android|ios|mobile)[a-z ]{0,4}coming soon/i,
    'a directly adjacent platform-then-future claim — with the markup-collapse pass this catches badge/value splits across tags',
  ],
  [
    /coming soon[a-z ]{0,4}(?:android|ios|mobile)/i,
    'a directly adjacent future-then-platform claim — the mirror split of the same fiction',
  ],
  // M-WEBSITE-09 (review website__pm M9): the Samsung Tizen hub-mode claim
  // class, both fiction directions. Truth: the shipped hub-mode clients are
  // Roku (phlix-roku-client source/lib/ApiClient.brs:979 + AppContext.brs:56-108),
  // Windows (phlix-windows-client src/renderer/resolveConfig.ts:8-31 hubGetConfig,
  // app:'server'|'hub') and Mobile (phlix-mobile-client src/hub/HubAuthService.ts,
  // SettingsScreen.tsx:94 handleHubSignIn). Tizen is SERVER-MODE ONLY today:
  // phlix-tizen-client src/api/hubRelay.ts:386 "Tizen is server-mode only today
  // (no hub-mode UI — S353 resolveConfig)", :372-373 the hub-relay context is
  // "written by a future hub-mode session; absent today → nothing opens", and
  // resolveConfig.ts:9 "Tizen has no hub-config IPC like the Windows/Electron".
  // Its relay CONSUMER is shipped and tested (S298) but no UI opens it — so
  // "coming soon" is also false: nothing is scheduled; the honest copy states
  // the direct-connection capability (SSOT shared/content.json tizen
  // highlights: "Vue 3 + Vite", "Direct play + HLS transcoded",
  // "Remote-optimized UI"). The pre-a8597e21 carriers atlantis and
  // stellar-command shipped exactly the two underclaim sentences banned
  // verbatim below; a8597e21 "cured" them by DELETING the honest triple-list
  // sentence and widening the hub-mode list to four — the overclaim direction
  // this sweep removes (80 files, 115 sites/ + tools/render.mjs lines). Two
  // further fabrications join the registry: neon-underground's "background Hub
  // mode — your library syncs even when the app is closed" (no background-sync
  // capability exists in the windows or mobile sources) and map-explorer's
  // "Samsung Tizen clients can be configured to use Hub mode as well".
  // Like M8r2, these are shape-aware pairs, measured green tree-wide at this
  // commit: the bridge classes exclude sentence periods and markup, and the
  // proximity pair is deliberately ≤24 chars so cured card rows ("Samsung
  // Tizen — direct play on your TV" beside "Windows — Hub mode built-in")
  // stay legal on the raw scan and are cut off by "+" / tag boundaries on the
  // collapsed one. The honest oscar-gold model ("Hub mode is available in the
  // Roku, Windows, and Mobile clients. Samsung Tizen uses direct connection…")
  // sits inside this perimeter by construction: the sentence-final period
  // blocks the forward pair.
  [
    /samsung\s+tizen\s+support\s+coming\s+soon/i,
    'the atlantis "Samsung Tizen support coming soon" underclaim (nothing is scheduled; hub-mode UI is simply absent)',
  ],
  [
    /samsung\s+tizen\s+support\s+is\s+in\s+development/i,
    'the stellar-command "Samsung Tizen support is in development" underclaim (same class)',
  ],
  [
    /(?:samsung\s+tizen|tizen)[a-z ,:—–-]{0,16}(?:support|clients?|hub\s+mode)[a-z ,:—–-]{0,16}(?:coming\s+soon|in\s+development|planned|upcoming)/i,
    'a Tizen hub-mode capability narrated as future work (per-platform split of the underclaim pair)',
  ],
  [
    /(?:coming\s+soon|in\s+development|planned)[ :.—–-]{1,3}(?:the\s+|a\s+|native\s+|samsung\s+)?(?:samsung\s+)?tizen\b/i,
    'a future-tense label paired with a Tizen value ("Coming soon: a Samsung Tizen hub client")',
  ],
  [
    /\bhub\s+mode\s+is\s+(?:available|built\s+into)[a-z ,—–"'\n]{0,70}?\btizen\b/i,
    'a hub-mode-availability claim reaching Samsung Tizen (overclaim pair — Tizen is server-mode only today)',
  ],
  [
    /\btizen\b[a-z ,—–-]{0,24}hub\s+mode/i,
    'a directly adjacent Tizen-then-hub-mode claim (the cured row/card split of the same overclaim)',
  ],
  [
    /\b(?:every|all)\s+(?:(?:the|four|official|native|phlix)\s+)*clients?\s*(?:[—–(\u2014][^.\n<>]{0,70}[)—]\s*)?(?:supports?|support|has|have|includes?|include|ships?|can\s+(?:operate|connect)|speaks?)\b[^.\n<>]{0,45}?hub\s+(?:mode|toggle)/i,
    'a universal "every/all clients support Hub mode" quantifier (the real set is Roku, Windows, Mobile — the swept fiction family)',
  ],
  [
    /\bhub\s+(?:mode|toggle)[^.\n<>]{0,45}?\b(?:built\s+into|in|for|on)\s+(?:every|all)\b[^.\n<>]{0,45}?clients?/i,
    'the passive/heading direction of the same universal quantifier ("Hub mode is built into every client", "Hub mode in every client")',
  ],
  [
    /\btizen\b(?![a-z ,()—–"\n]{0,20}?\bwindows\b\s*[—–-])[a-z ,()—–"\n]{0,20}?hub\s+(?:mode|toggle)/i,
    'a Tizen value reaching a Hub-mode claim across a comma/paren split ("Native clients (Roku, Samsung Tizen, Windows) support Hub mode") — guarded so a cured Tizen row beside a true "Windows — Hub mode" row stays legal',
  ],
  [
    /every\s+client\s+speaks\s+hub/i,
    'the copper-steampunk "every client speaks Hub" quantifier (same class, different voice)',
  ],
  [
    /background\s+hub\s+mode/i,
    'the neon-underground "background Hub mode" fiction (no background-sync capability exists in any client source)',
  ],
  [
    /library\s+syncs\s+even\s+when\s+the\s+app\s+is\s+closed/i,
    'the neon-underground closed-app sync claim (fabricated; zero in the windows/mobile sources)',
  ],
  [
    /tizen\s+clients?\s+can\s+be\s+configured/i,
    'the map-explorer "Samsung Tizen clients can be configured to use Hub mode" overclaim (no hub-config path exists — resolveConfig.ts:9)',
  ],
];

// build.mjs keepInSite() in miniature — review archives under sites/*/reviews/
// quote the fabricated sentences AS EVIDENCE and must not redden the scan.
const NOT_SHIPPED = new Set([
  'BUILD_LOG.md',
  'SITE.md',
  'PROMPTS.md',
  'REGEN_PLAN.md',
  'FINAL-REVIEW.md',
]);
function ships(relPath) {
  const segments = relPath.split('/');
  const base = segments[segments.length - 1];
  return (
    !segments.includes('reviews') &&
    !/\.worklog\.md$/i.test(base) &&
    !/^ROUND-\d+\.md$/i.test(base) &&
    !NOT_SHIPPED.has(base)
  );
}

// Same decode discipline as test/public-hub-truth.test.mjs: text scanned utf8,
// everything else latin1 so an ASCII claim cannot hide in a mangled decode.
// r2 adds `cjs` — lighthouserc*.cjs sat outside every extension regex.
const TEXT_EXT = /\.(?:html|css|cjs|js|mjs|json|md|txt|xml|svg|yml|yaml)$/i;

function walk(dir, base = '') {
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const rel = base ? `${base}/${entry.name}` : entry.name;
    if (entry.isDirectory()) out.push(...walk(join(dir, entry.name), rel));
    else if (entry.isFile()) out.push(rel);
  }
  return out;
}

function assertClean(text, label) {
  for (const [pattern, what] of FORBIDDEN) {
    assert.ok(!pattern.test(text), `${label}: ${what} is back — /${pattern.source}/ matched`);
  }
}

// M8r2: a claim split across markup (heading in one node, badge value in the
// next) is one claim to a reader. Collapse tags to spaces and re-run the same
// registry so the bounded-gap pairs above can bridge what the tags bridged.
function stripMarkup(text) {
  return text.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ');
}

// ── r4 (review M-WEBSITE-06__r3): SHAPE-AWARE natives miscount pairing ──────
// The literal registry needs "5 native clients" contiguous. Split shapes —
// { label: "Native Clients", value: "5" }, "Native Clients":"5", HTML badge
// cards, meta content="Six native clients" — carry the same claim through
// syntax instead of prose, and r3 proved the label-based perimeter walked
// right past cyber-pursuit:1361 while r4's own sweep then caught the
// word-form "Six" family shipping in velocity-rush. This guard PAIRS a small
// standalone count with the noun "native clients" across exactly the
// structural hops copy uses — never through new meaning — and demands the
// SSOT-derived truth. Precision notes (each learned from a corpus false
// positive during development, see the fix report):
//   - tag/comment interiors are masked to position-preserving \u0001 runs so
//     numerals inside style="…var(--space-7)" cannot pair with copy; quoted
//     CONTENT attributes (content/alt/title/aria-label/placeholder) are the
//     reader-visible exception;
//   - zero-padded numerals ("02", "03") are list ordinals, never counts;
//   - "+"-decorated numerals ("5+" badges) belong to the surface-enumeration
//     family the r2 table dispositioned legal;
//   - only the NEAREST count on either side of a noun is tried, and a noun
//     already paired on its left is never re-paired on its right, so
//     "4 native clients. One library." and adjacent stat cards cannot bleed.
const SSOT_BULLETS = JSON.parse(
  readFileSync(join(ROOT, 'shared', 'content.json'), 'utf8'),
).pitch_bullets;
const SSOT_NATIVES_LINE = (SSOT_BULLETS || []).find((b) => /^Native clients on /i.test(b));
if (!SSOT_NATIVES_LINE) {
  throw new Error('shared/content.json lost the "Native clients on …" pitch bullet');
}
const SSOT_NATIVES_MATCH = SSOT_NATIVES_LINE.match(
  /^Native clients on (.+?), plus any DLNA device$/i,
);
if (!SSOT_NATIVES_MATCH) {
  throw new Error(
    `SSOT native-clients bullet changed shape; re-derive deliberately: ${SSOT_NATIVES_LINE}`,
  );
}
// Roku, Samsung Tizen, Windows, Mobile → 4. If the estate genuinely gains a
// native client, this number moves with the SSOT — law 5 pins it so the move
// is a deliberate re-adjudication, never silent drift.
const SSOT_NATIVES = SSOT_NATIVES_MATCH[1].split(',').length;

// Noun with evasion-tolerant word separation (masked tags/comments are
// \u0001; JS concat is quote-plus-quote). Letters never separate the words.
const NATIVES_SEP = '(?:\\s|\\+|-|_|\u0001|&nbsp;|&#0*160;|["\']\\s*\\+\\s*["\']\\s*)+';
const NATIVES_NOUN_RE = new RegExp(`native${NATIVES_SEP}clients?\\b`, 'gi');
const WORD2N = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
  ten: 10,
  eleven: 11,
  twelve: 12,
};
const NATIVES_COUNT_RE =
  /(?<![\w.])(?:[1-9]|1[0-2])(?![\w.,%/:~+-])|(?<![\w])(?:one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve)(?![\w])/gi;

const COPY_ATTR = /\b(?:content|alt|title|aria-label|placeholder)\s*=\s*$/i;
function maskMarkup(text) {
  return text.replace(/<!--[\s\S]*?-->|<[^>]*>/g, (m) => {
    if (m.startsWith('<!--')) return '\u0001'.repeat(m.length);
    // Split on double-quoted segments; prettier normalises attributes to "…".
    const parts = m.split(/("[^"]*")/);
    let lastUnquoted = '';
    return parts
      .map((p, i) => {
        if (p.length > 1 && p.startsWith('"') && p.endsWith('"') && i % 2 === 1) {
          return COPY_ATTR.test(lastUnquoted) ? p : '\u0001'.repeat(p.length);
        }
        lastUnquoted = p;
        return '\u0001'.repeat(p.length);
      })
      .join('');
  });
}

// Can everything between a count and the noun be pure structure? Runs of
// punctuation, HTML comments, at most ONE closing and ONE opening tag
// (adjacent siblings — crossing a card boundary needs two closes), and up to
// two recognised key words (label/value/count…). Anything else carries
// meaning and breaks the pair.
const GAP_TAG_HOP = /^(?:<!--[\s\S]*?-->|<\/?[a-zA-Z][^<>]*>)/;
const GAP_KEY_HOP = /^(?:label|title|name|value|count|number|total|stat|stats|metric)s?(?![\w])/i;
function gapBinds(gap) {
  if (gap.length > 120) return false;
  let rest = gap;
  let closes = 0;
  let opens = 0;
  let keys = 0;
  while (rest.length > 0) {
    const punct = rest.match(/^[\s.,;:!?'"`|/\\()[\]{}=#*+\u2013\u2014\u00b7-]+/);
    if (punct) {
      rest = rest.slice(punct[0].length);
      continue;
    }
    const entity = rest.match(/^&(?:nbsp|mdash|ndash|hellip|#0*160;?|#[xX]0*[aA]0;?)/i);
    if (entity) {
      rest = rest.slice(entity[0].length);
      continue;
    }
    const hop = rest.match(GAP_TAG_HOP);
    if (hop) {
      if (/^<\//.test(hop[0])) closes++;
      else if (!/^<!--/.test(hop[0])) opens++;
      if (closes > 1 || opens > 1) return false;
      rest = rest.slice(hop[0].length);
      continue;
    }
    const key = rest.match(GAP_KEY_HOP);
    if (key) {
      keys++;
      if (keys > 2) return false;
      rest = rest.slice(key[0].length);
      continue;
    }
    return false;
  }
  return true;
}

function nativesShapeFindings(text) {
  if (!/native/i.test(text)) return { bindings: [], violations: [] };
  const scan = maskMarkup(text);
  const nouns = [...scan.matchAll(NATIVES_NOUN_RE)].map((m) => ({
    start: m.index,
    end: m.index + m[0].length,
  }));
  const counts = [];
  for (const m of scan.matchAll(NATIVES_COUNT_RE)) {
    const raw = m[0];
    const n = /^\d+$/.test(raw)
      ? parseInt(raw.replace(/^0(?=\d)/, ''), 10)
      : WORD2N[raw.toLowerCase()];
    if (n >= 1 && n <= 12) counts.push({ start: m.index, end: m.index + raw.length, n });
  }
  const bindings = [];
  const violations = [];
  for (const noun of nouns) {
    let bound = null;
    for (let i = counts.length - 1; i >= 0; i--) {
      const c = counts[i];
      if (c.end > noun.start) continue;
      if (gapBinds(text.slice(c.end, noun.start))) bound = c;
      break; // only the nearest preceding count can be this noun's value
    }
    if (!bound) {
      for (const c of counts) {
        if (c.start < noun.end) continue;
        if (gapBinds(text.slice(noun.end, c.start))) bound = c;
        break; // nothing claimed on the left — the nearest right count is it
      }
    }
    if (!bound) continue;
    bindings.push(bound.n);
    if (bound.n !== SSOT_NATIVES) {
      violations.push({
        count: scan.slice(bound.start, bound.end),
        line: text.slice(0, noun.start).split('\n').length,
      });
    }
  }
  return { bindings, violations };
}

// Returns the number of count↔noun pairs actually evaluated (non-vacuity).
function assertNativesShape(text, label) {
  const { bindings, violations } = nativesShapeFindings(text);
  for (const v of violations) {
    assert.fail(
      `${label}:${v.line}: a native-clients count of "${v.count}" is back — the SSOT ` +
        `(shared/content.json enumeration, §19.14) says ${SSOT_NATIVES}. The split-shape ` +
        `pairing law (r4) binds counts through key hops, one element hop, or bare adjacency.`,
    );
  }
  return bindings.length;
}

// r4: the pairing guard refuses to bind "+"-decorated badges to the noun —
// that is the surface-enumeration family the r2 table dispositioned legal
// (nordic-saga's "5+" card beside the honest four-plus-DLNA sentence). But a
// compound "N+ native clients" INSIDE ONE STRING claims N-or-more NATIVE
// clients, and the "+" exemption must not launder it, so it dies as a literal.
// RAW FORM ONLY, and that is load-bearing: once tags collapse, "5+" and
// "Native clients" from two sibling elements sit adjacent and would match —
// the r4 suite caught exactly that self-inflicted false positive. A claim
// across a tag boundary is a badge family (legal); a compound inside one
// string is a count claim (fatal). Zero matches tracked tree + artifact.
const NATIVES_COMPOUND_RE =
  /(?:[5-9]|five|six|seven|eight|nine|ten|eleven|twelve)\+ native clients/i;

function assertCleanBothForms(text, relPath, label) {
  let paired = assertNativesShape(text, label);
  assertClean(text, label);
  assert.ok(
    !NATIVES_COMPOUND_RE.test(text),
    `${label}: an "N+ native clients" compound claim is back — there are exactly four;` +
      ` the "+" badge exemption covers separate badge ELEMENTS (surface enumeration),` +
      ` never a same-string compound`,
  );
  if (/\.html$/i.test(relPath)) {
    const flat = stripMarkup(text);
    assertClean(flat, `${label} (markup-collapsed)`);
    paired += assertNativesShape(flat, `${label} (markup-collapsed)`);
  }
  return paired;
}

const tempRoots = [];
after(() => {
  for (const dir of tempRoots) rmSync(dir, { recursive: true, force: true });
});

/** Temp project root of symlinks to the real inputs — see public-hub-truth. */
function realInputsRoot() {
  const dir = mkdtempSync(join(tmpdir(), 'phlix-variant-copy-truth-'));
  tempRoots.push(dir);
  for (const name of ['brand-kits', 'sites', 'shared']) {
    symlinkSync(join(ROOT, name), join(dir, name), 'dir');
  }
  for (const name of ['index.html', '404.html', '_headers']) {
    symlinkSync(join(ROOT, name), join(dir, name), 'file');
  }
  writeFileSync(join(dir, 'package.json'), JSON.stringify({ type: 'module' }), 'utf8');
  return dir;
}

// One real build per run, shared by the laws that read the artifact.
let artifact = null;
function builtDist() {
  if (!artifact) {
    const dir = realInputsRoot();
    execFileSync(process.execPath, [BUILD], { cwd: dir, encoding: 'utf8', stdio: 'pipe' });
    artifact = join(dir, 'dist');
  }
  return artifact;
}

// law 1 perimeter (r2): every git-tracked text file. An exemption is a file
// that LEGALLY QUOTES a banned claim instead of teaching or shipping one, and
// it names its reason; a blind spot is only sound when it is known and clean,
// and the r1 review proved this perimeter neither was for brand_kit_schema.js.
const TRACKED = execFileSync('git', ['ls-files'], { cwd: ROOT, encoding: 'utf8' })
  .split('\n')
  .filter(Boolean);

// `_headers` matches no extension pattern, and the root templates were the
// first files the original enumerated law scanned — they stay explicit.
const ROOT_TEMPLATES = new Set(['index.html', '404.html', '_headers']);

function law1Exemption(rel) {
  const segments = rel.split('/');
  // Root reviews/ and every sites/*/reviews/ archive quote the fabricated
  // sentences AS EVIDENCE; build.mjs never copies a `reviews` dir (:341).
  if (segments.includes('reviews'))
    return 'review archive — quotes claims as evidence, never ships (build.mjs:341)';
  // Authoring-process records — now exempted repo-wide on the same base-name
  // rule, not only under sites/: the three sites/*/{BUILD_LOG,REGEN_PLAN}.md
  // carriers are adjudicated conflict records that quote the bad count to log
  // its resolution (nordic-saga:67, obsidian-pulse:58, speakeasy-gold:63).
  if (!ships(rel)) return 'authoring record — documents a cure, does not carry copy';
  // The estate law doc's §19.14 conflict row (:834) quotes "5 native clients"
  // precisely to teach that content.json wins on facts.
  if (rel === 'new_site.md') return 'law adjudication row — quotes the false count to fix it';
  // This file: the FORBIDDEN registry and the WHY header are literals by design.
  if (rel === 'test/variant-copy-truth.test.mjs') return 'the law itself (pattern registry)';
  return null;
}

test('law 1: no fabricated fact-claim in ANY tracked file (whole-tree perimeter)', () => {
  const scanSet = TRACKED.filter((f) => TEXT_EXT.test(f) || ROOT_TEMPLATES.has(f));
  let scanned = 0;
  let paired = 0;
  for (const rel of scanSet) {
    if (law1Exemption(rel)) continue;
    scanned++;
    paired += assertCleanBothForms(readFileSync(join(ROOT, rel), 'utf8'), rel, rel);
  }
  // Non-vacuity: the perimeter must actually be the whole tree, not a filter
  // accident. Measured at the r2 commit: scan set 4710, scanned 2795; floors
  // sit well below so ordinary churn cannot trip them, and a collapsed
  // ls-files/extension filter (the class of bug that created r1) cannot pass.
  assert.ok(
    scanSet.length >= 3000,
    `law 1 scan set has ${scanSet.length} files; the perimeter collapsed`,
  );
  assert.ok(scanned >= 1500, `law 1 scanned only ${scanned} files; the perimeter is vacuous`);
  // r4: the pairing guard must actually be pairing. Measured at this commit:
  // 300 count↔noun pairs over the tracked tree (187 as-written + 113
  // markup-collapsed). A matcher that silently stopped binding — the exact
  // failure class r3 caught in the literal law — reddens this floor instead
  // of passing green.
  assert.ok(
    paired >= 150,
    `law 1 pairing guard bound only ${paired} count↔noun pairs; it went shape-blind`,
  );
  // The r2 blind spot specifically: the base schema must be inside the set.
  assert.ok(scanSet.includes('brand_kit_schema.js'), 'brand_kit_schema.js left the perimeter');
});

test('law 2: the Pages artifact of a real build carries zero forbidden claims', () => {
  const dist = builtDist();

  const files = walk(dist);
  // Non-vacuity floor (same scale law as public-hub-truth law 2): an empty
  // artifact would make this scan green for the wrong reason.
  assert.ok(files.length >= 2000, `artifact has ${files.length} files; the scan is vacuous`);
  assert.ok(
    files.filter((f) => f.endsWith('.html')).length >= 700,
    'artifact HTML count collapsed below the published set',
  );

  let paired = 0;
  for (const rel of files) {
    paired += assertCleanBothForms(
      readFileSync(join(dist, rel), { encoding: TEXT_EXT.test(rel) ? 'utf8' : 'latin1' }),
      rel,
      `dist/${rel}`,
    );
  }
  // r4 structural non-vacuity: the artifact pairing scan must be seeing real
  // stat-card pairs (measured 125 = 70 as-written + 55 collapsed at this
  // commit). The velocity-rush "Six native clients" descriptions this law now
  // kills reached dist in the r4 sweep — a shape-blind artifact scan passed
  // them, so the floor is part of the cure.
  assert.ok(
    paired >= 60,
    `law 2 pairing guard bound only ${paired} count↔noun pairs; it went shape-blind`,
  );
});

test('law 3: the cure kept the facts and the identity (traceable revoice, not amputation)', () => {
  const hero = readFileSync(join(ROOT, 'sites', 'chrome-velocity', 'index.html'), 'utf8');
  const subtitle = hero.slice(hero.indexOf('hero__subtitle'), hero.indexOf('hero__actions'));
  assert.ok(subtitle.includes('PHP'), 'the SSOT fact "open-source PHP media server" was dropped');
  for (const platform of ['Roku', 'Samsung TV', 'Windows', 'DLNA']) {
    assert.ok(subtitle.includes(platform), `the SSOT platform fact "${platform}" was dropped`);
  }
  for (const fact of ['SyncPlay', 'Live TV', 'transcoding', 'hub']) {
    assert.ok(subtitle.includes(fact), `the SSOT feature fact "${fact}" was dropped`);
  }
  // The kit voice survived: eyebrow + headline + the grid metaphor stand pat.
  assert.match(hero, /Five lights out\./, 'the kit hero voice was erased, not cured');

  // The published root gallery manifest carries the cured kit tagline.
  const rootPage = readFileSync(join(builtDist(), 'index.html'), 'utf8');
  assert.match(
    rootPage,
    /Zero to Play\. Flat Out\./,
    'chrome-velocity lost its tagline in the root gallery instead of losing the claim',
  );
});

test('law 4: the tagline published twice agrees with itself', () => {
  const kit = readFileSync(join(ROOT, 'brand-kits', 'chrome-velocity.js'), 'utf8');
  const local = JSON.parse(
    readFileSync(join(ROOT, 'sites', 'chrome-velocity', 'content.json'), 'utf8'),
  );
  const kitTagline = kit.match(/tagline_primary:\s*"([^"]+)"/);
  assert.ok(kitTagline, 'chrome-velocity kit no longer declares tagline_primary');
  assert.equal(
    local.brand.tagline_primary,
    kitTagline[1],
    'the site-local content.json ships a tagline that drifted from the kit file ' +
      '(kit js feeds the root gallery via __PHLIX_KITS__; the local JSON ships verbatim)',
  );
  // And the one site-local content.json stays SSOT-factual where it claims to:
  assert.deepEqual(
    local.site,
    JSON.parse(readFileSync(join(ROOT, 'shared', 'content.json'), 'utf8')).site,
    'chrome-velocity/content.json site block drifted from the SSOT site block',
  );
});

// Law 5 (r4): the split-shape cures stay cured, positively — the pairing
// guard's own teeth, pinned so a future edit cannot satisfy law 1 by quietly
// deleting the truthful claims it once policed.
test('law 5: the natives pairing guard has teeth and its r4 cures stay cured', () => {
  // The truth is DERIVED from the SSOT enumeration, not copied prose. If the
  // estate genuinely gains (or loses) a native client this fails LOUD and the
  // §19.14 adjudication must be re-run deliberately — numbers move with the
  // source of fact, never silently with the law.
  assert.equal(
    SSOT_NATIVES,
    4,
    'shared/content.json no longer enumerates exactly four native clients — ' +
      're-adjudicate new_site.md §19.14 and re-derive this law on purpose',
  );

  // cyber-pursuit: the r3 survivor ({ label: "Native Clients", value: "5" },
  // f73714e7-era) must still pair its label with the SSOT count. A cure that
  // deleted the stat instead of correcting it would leave zero bindings.
  const kit = readFileSync(join(ROOT, 'brand-kits', 'cyber-pursuit.js'), 'utf8');
  const kitFindings = nativesShapeFindings(kit);
  assert.equal(kitFindings.violations.length, 0, 'cyber-pursuit stat miscount is back');
  assert.ok(
    kitFindings.bindings.includes(SSOT_NATIVES),
    'cyber-pursuit no longer pairs "Native Clients" with the SSOT count — the stat was amputated, not cured',
  );

  // velocity-rush: the r4 sweep's shipped finding — og + twitter + the page's
  // own description all enumerated "Four native clients … plus any DLNA
  // device"; every natives count on this page must be the truth, and the
  // three claims must still EXIST (>= 3 bindings: cure-by-deletion is not a
  // cure).
  const vr = readFileSync(join(ROOT, 'sites', 'velocity-rush', 'clients.html'), 'utf8');
  const vrFindings = nativesShapeFindings(vr);
  assert.equal(vrFindings.violations.length, 0, 'a velocity-rush client-count miscount is back');
  assert.ok(
    vrFindings.bindings.length >= 3,
    `velocity-rush carries ${vrFindings.bindings.length} native-clients claims; the cure shipped deletion`,
  );
  for (const n of vrFindings.bindings) {
    assert.equal(n, SSOT_NATIVES, 'velocity-rush natives count drifted from the SSOT');
  }
});
