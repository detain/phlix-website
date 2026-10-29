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
// "8 native + DLNA clients" — same miscount class, see the pattern registry)
// and the swiss-modernist "hub access without the
// internet" (written before the relay existed; now "without opening ports").
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
// the markup-collapse pass that kills label/value splits across tags.
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
//      claim to a reader and must be the same claim to the law.
//   2. no forbidden claim in the ARTIFACT — a real tools/build.mjs run into a
//      throwaway root (same isolation idiom as test/public-hub-truth.test.mjs
//      law 2: repo dist/ is rebuilt by test/csp-gate.test.mjs mid-run, so
//      reading it here would race);
//   3. the chrome-velocity hero keeps the SSOT fact set after the cure
//      (platforms + feature rail re-voiced, not deleted) and the root gallery
//      manifest carries the cured tagline — a "cure" that quietly amputated
//      the facts or the identity could not pass;
//   4. the tagline published twice (kit file feeds the root gallery; the
//      site-local content.json ships verbatim) agrees with itself.

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
function assertCleanBothForms(text, relPath, label) {
  assertClean(text, label);
  if (/\.html$/i.test(relPath)) {
    assertClean(stripMarkup(text), `${label} (markup-collapsed)`);
  }
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
  for (const rel of scanSet) {
    if (law1Exemption(rel)) continue;
    scanned++;
    assertCleanBothForms(readFileSync(join(ROOT, rel), 'utf8'), rel, rel);
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

  for (const rel of files) {
    assertCleanBothForms(
      readFileSync(join(dist, rel), { encoding: TEXT_EXT.test(rel) ? 'utf8' : 'latin1' }),
      rel,
      `dist/${rel}`,
    );
  }
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
