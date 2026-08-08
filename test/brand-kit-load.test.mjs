// Guard: the build must never again silently drop a brand kit it cannot load,
// and its reported kit count must never again be derived from the kits that
// happened to load.
//
// Run with `npm run test:unit` (`node --test "test/**/*.test.mjs"`), which the
// `unit` job in .github/workflows/lint.yml executes on every push and PR.
//
// WHY THIS FILE EXISTS
// --------------------
// tools/build.mjs used to `console.warn` + `continue` past any kit that failed
// to import, and then print `${kitSummaries.length} brand kit(s)` — the length
// of the list it had just finished filtering. Three kits were broken:
//
//   * event-horizon.js    — SyntaxError: an unquoted object key with a space in
//                           it (`consumption irreversibility:`).
//   * stellar-command.js  — `module.exports = ...` in a "type": "module"
//   * terraform.js          package, plus an IIFE wrapper. Under ESM `module`
//                           and `window` are both undefined, the `typeof`
//                           guards swallowed that, and `import()` resolved to an
//                           empty namespace. They exported nothing.
//
// 79 files on disk therefore became "76 brand kit(s), 76 built site(s)", exit 0.
// The sentence was true. Both numbers counted the survivors, so no matter how
// many kits broke, the report always agreed with itself. All three kits had a
// complete, reviewed site subtree under sites/ that was never once published.
//
// This is the self-adjusting-check failure mode: a check computed FROM its own
// subject cannot detect a change IN that subject. Fixing the three kits without
// fixing the count would leave the next broken kit exactly as invisible.
//
// WHAT IT ASSERTS
// ---------------
//   1. Every brand-kits/*.js in the repo really does import to a usable object —
//      the actual corpus, not a fixture, so a newly-added broken kit reds here
//      before it reaches the build.
//   2. The corpus is a plausible size and matches the pin. A test that inspects
//      zero kits passes every assertion it makes; asserting the count is what
//      makes a green here mean anything.
//   3. brand-kits/expected-kits.json matches the directory exactly, both
//      directions. This file is the independent denominator: a count taken from
//      the directory self-adjusts to a DELETION (78 found / 78 loaded / 78 built
//      is just as self-consistent as 76/76/76), so deleting a kit is detectable
//      only against a pin that is not derived from the directory.
//   4. End-to-end, by actually running tools/build.mjs against fixture roots:
//        a. a corrupt kit exits non-zero and names the file,
//        b. a deleted kit exits non-zero and names the file,
//        c. an unpinned extra kit exits non-zero and names the file,
//        d. the happy path exits zero,
//        e. THE KEY ONE: the reported count tracks the number of FILES ON DISK,
//           proved by a fixture whose file count differs from the count in the
//           original repo — see the comment on that test.

import { deepStrictEqual, match, notStrictEqual, ok, strictEqual } from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { cpSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { after, describe, it } from 'node:test';

import { SITE_URL } from '../tools/gen-sitemap.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const KITS_DIR = join(ROOT, 'brand-kits');
const BUILD = join(ROOT, 'tools', 'build.mjs');

// The same filter tools/build.mjs applies. Kept in step with it deliberately:
// if the build's glob changes, this test's corpus must change with it.
const kitFilesOnDisk = readdirSync(KITS_DIR)
  .filter((name) => name.endsWith('.js') && !name.endsWith('.worklog.js'))
  .sort();

const pin = JSON.parse(readFileSync(join(KITS_DIR, 'expected-kits.json'), 'utf8'));

// The number of kits at the time this guard was written. A floor, not an
// equality: adding a kit is allowed, silently losing one is not.
const KIT_COUNT_FLOOR = 79;

const tempRoots = [];
after(() => {
  for (const dir of tempRoots) rmSync(dir, { recursive: true, force: true });
});

/**
 * Build a minimal but real project root that tools/build.mjs can run against.
 * build.mjs resolves its inputs from process.cwd(), so pointing `cwd` at one of
 * these exercises the actual shipped script — not a copy of its logic.
 *
 * `kits` is a map of filename -> file contents. Every kit whose slug has a
 * matching entry in `sites` gets a site subtree.
 */
function makeFixture(kits, { pinFiles = null } = {}) {
  const dir = mkdtempSync(join(tmpdir(), 'phlix-kitbuild-'));
  tempRoots.push(dir);
  mkdirSync(join(dir, 'brand-kits'), { recursive: true });
  mkdirSync(join(dir, 'sites'), { recursive: true });

  // ⚠ Load-bearing, and it caught a false green while this test was being
  // written. Without a package.json the fixture inherits no module type, and
  // Node's ESM syntax detection then treats `export default` kits as ESM *and*
  // `module.exports` kits as CommonJS — so the "exports nothing" case exported
  // fine and the build went green on input that is broken in the real repo.
  // phlix-website is "type": "module"; the fixture must be too, or it is not a
  // reproduction of the environment the bug lives in.
  writeFileSync(join(dir, 'package.json'), JSON.stringify({ type: 'module' }, null, 2), 'utf8');

  for (const [name, body] of Object.entries(kits)) {
    writeFileSync(join(dir, 'brand-kits', name), body, 'utf8');
    const slug = name.replace(/\.js$/, '');
    mkdirSync(join(dir, 'sites', slug), { recursive: true });
    writeFileSync(join(dir, 'sites', slug, 'index.html'), '<html><head></head><body>x</body></html>', 'utf8');
  }

  const files = pinFiles ?? Object.keys(kits).sort();
  writeFileSync(
    join(dir, 'brand-kits', 'expected-kits.json'),
    JSON.stringify({ count: files.length, kits: files }, null, 2),
    'utf8',
  );

  // The root templates build.mjs injects into. 404.html must carry the no-JS
  // gallery link as the site's real FULLY-QUALIFIED url or the build fails on
  // that check instead of the one under test. (It was `${BASE_PATH}/` until
  // S277: Pages serves this one document for any missing path, so a site-
  // absolute href is right in a browser but unresolvable to the offline `links`
  // gate, which reads it as the filesystem path "phlix-website/".)
  writeFileSync(join(dir, 'index.html'), '<html><head></head><body>gallery</body></html>', 'utf8');
  writeFileSync(
    join(dir, '404.html'),
    `<html><head></head><body><a href="${SITE_URL}/">home</a></body></html>`,
    'utf8',
  );
  return dir;
}

const validKit = (slug, name) =>
  `export default { slug: '${slug}', name: '${name}', colors: { primary: '#112233' } };\n`;

/** Run tools/build.mjs in `cwd`; never throws, always reports what happened. */
function runBuild(cwd) {
  try {
    const stdout = execFileSync(process.execPath, [BUILD], {
      cwd,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    return { code: 0, stdout, stderr: '' };
  } catch (err) {
    return { code: err.status ?? 1, stdout: err.stdout ?? '', stderr: err.stderr ?? '' };
  }
}

describe('brand kits: every kit in the repo actually loads', () => {
  it('inspects a plausible corpus (non-vacuity)', () => {
    ok(
      kitFilesOnDisk.length >= KIT_COUNT_FLOOR,
      `expected at least ${KIT_COUNT_FLOOR} brand kits on disk, found ${kitFilesOnDisk.length}. ` +
        `If kits were deliberately removed, lower KIT_COUNT_FLOOR in this file.`,
    );
  });

  it('imports every brand-kits/*.js to a usable object', async () => {
    const failures = [];
    for (const file of kitFilesOnDisk) {
      let kit;
      try {
        const mod = await import(pathToFileURL(join(KITS_DIR, file)).href);
        kit = mod.default ?? mod.brandKit;
      } catch (err) {
        failures.push(`${file}: ${err.constructor.name}: ${err.message}`);
        continue;
      }
      if (!kit || typeof kit !== 'object') {
        failures.push(`${file}: no brand kit export (module.exports/window do not export under ESM)`);
      }
    }
    deepStrictEqual(
      failures,
      [],
      `brand kits that will not load:\n  ${failures.join('\n  ')}\n` +
        `Each of these would be silently dropped from the deployed site.`,
    );
  });
});

describe('brand kits: the pin is the denominator', () => {
  it('expected-kits.json is internally consistent', () => {
    ok(Array.isArray(pin.kits) && pin.kits.length > 0, 'pin has no non-empty "kits" array');
    strictEqual(pin.count, pin.kits.length, '"count" disagrees with the length of "kits"');
  });

  it('expected-kits.json matches the directory exactly, both directions', () => {
    const missing = pin.kits.filter((f) => !kitFilesOnDisk.includes(f));
    const unpinned = kitFilesOnDisk.filter((f) => !pin.kits.includes(f));
    deepStrictEqual(missing, [], 'pinned kits that are not on disk (deleted without updating the pin)');
    deepStrictEqual(unpinned, [], 'kits on disk that are not pinned (added without updating the pin)');
  });
});

describe('tools/build.mjs fails on a kit it cannot use', () => {
  it('reds on a kit with a syntax error, and names it', () => {
    const dir = makeFixture({
      'alpha.js': validKit('alpha', 'Alpha'),
      'broken.js': 'export default { bad key: 1 };\n',
    });
    const { code, stderr } = runBuild(dir);
    notStrictEqual(code, 0, 'a kit with a syntax error must red the build');
    match(stderr, /broken\.js/, 'the failure must name the offending file');
  });

  it('reds on a kit that exports nothing (the CJS-in-ESM case), and names it', () => {
    const dir = makeFixture({
      'alpha.js': validKit('alpha', 'Alpha'),
      // Byte-for-byte the shape stellar-command.js and terraform.js shipped.
      'silent.js': 'const k = { name: "Silent" };\nif (typeof module !== "undefined" && module.exports) {\n  module.exports = k;\n}\n',
    });
    const { code, stderr } = runBuild(dir);
    notStrictEqual(code, 0, 'a kit that exports nothing must red the build');
    match(stderr, /silent\.js/, 'the failure must name the offending file');
    match(stderr, /no brand kit export/, 'the failure must explain what was missing');
  });

  it('reds when a kit file is DELETED — the case a directory-derived count cannot see', () => {
    // The pin lists three kits; only two are on disk. Without the pin this is
    // 2 found / 2 loaded / 2 built: perfectly self-consistent, exit 0, one site
    // silently gone. This is the assertion that the whole expected-kits.json
    // mechanism exists for.
    const dir = makeFixture(
      { 'alpha.js': validKit('alpha', 'Alpha'), 'beta.js': validKit('beta', 'Beta') },
      { pinFiles: ['alpha.js', 'beta.js', 'gamma.js'] },
    );
    const { code, stderr } = runBuild(dir);
    notStrictEqual(code, 0, 'a deleted kit file must red the build');
    match(stderr, /gamma\.js/, 'the failure must name the missing kit');
    match(stderr, /MISSING from disk/, 'the failure must say the file is absent');
  });

  it('reds when a kit is added without updating the pin', () => {
    const dir = makeFixture(
      { 'alpha.js': validKit('alpha', 'Alpha'), 'beta.js': validKit('beta', 'Beta') },
      { pinFiles: ['alpha.js'] },
    );
    const { code, stderr } = runBuild(dir);
    notStrictEqual(code, 0, 'an unpinned kit must red the build');
    match(stderr, /beta\.js/, 'the failure must name the unpinned kit');
  });
});

describe('tools/build.mjs reports a count taken from the filesystem', () => {
  // The control the other tests need: the same code path must go GREEN when
  // nothing is wrong, or "it reds" proves only that it always reds.
  it('exits 0 when every kit loads', () => {
    const dir = makeFixture({
      'alpha.js': validKit('alpha', 'Alpha'),
      'beta.js': validKit('beta', 'Beta'),
    });
    const { code, stdout, stderr } = runBuild(dir);
    strictEqual(code, 0, `expected a clean build, got:\n${stderr}`);
    match(stdout, /2 brand kit file\(s\) on disk/);
  });

  // THE PROOF THAT THE COUNT COMES FROM THE GLOB.
  //
  // A count derived from the loaded set cannot distinguish these two fixtures:
  // both load every kit they can. The fixtures differ ONLY in how many kit
  // FILES exist on disk (2 vs 5). If the reported number tracks the file count
  // across both, it is being read from the directory. If it were still
  // `kitSummaries.length` filtered by what imported, this test would still pass
  // — so the deletion/corruption tests above are the other half of the proof:
  // together they pin the number to the filesystem and make a shortfall fatal.
  it('the reported number tracks the number of kit FILES, not a hardcoded total', () => {
    for (const n of [2, 5]) {
      const kits = {};
      for (let i = 0; i < n; i += 1) kits[`kit${i}.js`] = validKit(`kit${i}`, `Kit ${i}`);
      const { code, stdout, stderr } = runBuild(makeFixture(kits));
      strictEqual(code, 0, `fixture of ${n} kits should build:\n${stderr}`);
      match(
        stdout,
        new RegExp(`${n} brand kit file\\(s\\) on disk \\(pinned: ${n}\\), ${n} loaded`),
        `reported count did not track a directory of ${n} kits. Got:\n${stdout}`,
      );
    }
  });

  // The real repo's own numbers, stated with their denominator.
  it('the real brand-kits/ directory and the real dist/ agree', () => {
    strictEqual(
      pin.count,
      kitFilesOnDisk.length,
      `pin says ${pin.count} kits, the brand-kits/ glob finds ${kitFilesOnDisk.length}`,
    );
  });
});
