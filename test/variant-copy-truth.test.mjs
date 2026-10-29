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
// counts four native clients) and the swiss-modernist "hub access without the
// internet" (written before the relay existed; now "without opening ports").
// "CRF 23/28" was retired by be34d142 in favor of the honest "H.264 defaults
// to CRF 23". The M-WEBSITE-07 positive-fabrication class (unlimited-viewers
// marketing and invented sync benchmarks around watch parties, groups and
// share links) joins the list below, cured to the server's real caps — see the
// per-entry comments for both-sides coordinates.
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
//   1. no forbidden claim in any BUILD INPUT (root templates, brand-kit data
//      including internal brief fields, shared content, every sites/ file
//      that keepInSite lets ship — including chrome-velocity's site-local
//      content.json, which ships verbatim);
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
// the M-WEBSITE-06 evidence set. Case-insensitive: pages vary capitalisation.
const FORBIDDEN = [
  [/under a second/i, 'the "Zero to Play in Under a Second" timing promise'],
  [/pit-wall speed/i, 'the "built at Formula 1 pit-wall speed" claim'],
  [/no lag, no compromise/i, 'the "no lag, no compromise, no excuses" promise'],
  [/5 native clients/i, 'the "5 Native Clients" miscount (SSOT counts four)'],
  [/five native clients/i, 'the "five native clients" miscount, spelled'],
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
  [/unlimited (?:viewers|members|participants|observers|guests)/i, 'an "unlimited viewers/members" watch-party claim (real cap: MAX_MEMBERS = 50)'],
  [/tested to \d+ simultaneous (?:viewers|members|observers)/i, 'a fabricated viewer-cap benchmark ("Tested to 20 simultaneous viewers")'],
  [/sub-100 ?ms/i, 'the fabricated sub-100ms sync-latency figure (no estate measurement; contract tolerance is 2000ms)'],
  [/up to 16 simultaneous observers/i, 'the quantum-stream "16 simultaneous observers" miscount (real cap: 50)'],
  [/shareable library links/i, 'the velocity-rush "shareable library links without account creation" fabrication (no anonymous share links exist server- or hub-side)'],
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
const TEXT_EXT = /\.(?:html|css|js|mjs|json|md|txt|xml|svg|yml|yaml)$/i;

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

test('law 1: no fabricated fact-claim in any build input', () => {
  for (const rel of ['index.html', '404.html', '_headers']) {
    assertClean(readFileSync(join(ROOT, rel), 'utf8'), rel);
  }
  for (const file of walk(join(ROOT, 'shared'))) {
    if (!TEXT_EXT.test(file)) continue;
    assertClean(readFileSync(join(ROOT, 'shared', file), 'utf8'), `shared/${file}`);
  }
  for (const file of walk(join(ROOT, 'brand-kits'))) {
    if (!/\.(?:js|json)$/i.test(file)) continue;
    assertClean(readFileSync(join(ROOT, 'brand-kits', file), 'utf8'), `brand-kits/${file}`);
  }
  for (const file of walk(join(ROOT, 'sites'))) {
    if (!ships(file) || !TEXT_EXT.test(file)) continue;
    assertClean(readFileSync(join(ROOT, 'sites', file), 'utf8'), `sites/${file}`);
  }
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
    assertClean(
      readFileSync(join(dist, rel), { encoding: TEXT_EXT.test(rel) ? 'utf8' : 'latin1' }),
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
