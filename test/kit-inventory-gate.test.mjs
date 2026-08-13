// Guard: no tool that walks brand-kits/*.js may silently skip a kit, and none
// may report a count derived from the kits that happened to load.
//
// Run with `npm run test:unit` (`node --test "test/**/*.test.mjs"`), which the
// `unit` job in .github/workflows/lint.yml executes on every push and PR.
//
// WHY THIS FILE EXISTS
// --------------------
// test/brand-kit-load.test.mjs pins tools/build.mjs against exactly this defect
// (S278). S281 found the same defect, unchanged, in two more tools:
//
//   tools/preview-all.mjs:62,66  warn + `continue` on an import failure and on
//                                "no brand kit export", then
//                                `${KITS.length} kit(s) discovered` — the
//                                survivors. It also returned `[]` for a missing
//                                brand-kits/ and served an empty index, exit 0.
//   tools/vendor-fonts.mjs:234   warn + `continue` on the import failure, and
//                                `continue` with NO MESSAGE AT ALL on the "no
//                                export" case. A kit dropped there loses its
//                                fonts from shared/data/font-sources.json.
//
// Fixing build.mjs alone left the pattern alive, which is what this file exists
// to stop. All three now share tools/kit-inventory.mjs (build.mjs keeps its own
// inline copy for now; the last describe() below asserts the two agree, so the
// duplication cannot drift unnoticed).
//
// WHAT IT ASSERTS, per tool
// -------------------------
//   1. A corrupt kit reds it and names the file.
//   2. A DELETED kit reds it — the case a directory-derived count cannot see,
//      because 2 found / 2 loaded is as self-consistent as 76/76.
//   3. An EMPTY corpus reds it. This is the one that matters most: the
//      commonest way one of these checks becomes a no-op is by inspecting zero
//      files and passing every assertion it makes.
//   4. A vacuous pin (`"kits": []`) reds it — otherwise the set comparisons in
//      1-3 are satisfied by a manifest that says nothing.
//   5. The happy path exits 0 AND prints its denominator, with the number shown
//      to track the FILE count across two fixtures of different size.
//
// Each red is stated beside the green control from the same code path. "It
// reds" on its own proves only that it always reds.

import { match, notStrictEqual, ok, strictEqual } from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { after, describe, it } from 'node:test';

import { SITE_URL } from '../tools/gen-sitemap.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const PREVIEW = join(ROOT, 'tools', 'preview-all.mjs');
const FONTS = join(ROOT, 'tools', 'vendor-fonts.mjs');
const BUILD = join(ROOT, 'tools', 'build.mjs');

const tempRoots = [];
after(() => {
  for (const dir of tempRoots) rmSync(dir, { recursive: true, force: true });
});

const validKit = (slug, name) =>
  `export default { slug: '${slug}', name: '${name}', colors: { primary: '#112233' }, ` +
  `fonts: { headline: { family: 'Inter', weights: [400] } } };\n`;

/**
 * A minimal project root the real tools can run against. They resolve their
 * inputs from cwd (preview-all) or from their own location (vendor-fonts), so
 * the fixture carries both a brand-kits/ tree and the site/root files a build
 * needs, and each tool is pointed at it in the way that tool supports.
 *
 * ⚠ package.json `{"type":"module"}` is load-bearing, and its absence caused a
 * FALSE GREEN in the S278 version of this fixture: without it, Node's ESM
 * syntax detection treats a `module.exports` kit as CommonJS and it loads
 * cleanly — i.e. the test passed on input that is broken in the real repo.
 */
function makeFixture(kits, { pinFiles = null, pinCount = null, sites = true } = {}) {
  const dir = mkdtempSync(join(tmpdir(), 'phlix-kitinv-'));
  tempRoots.push(dir);
  mkdirSync(join(dir, 'brand-kits'), { recursive: true });
  mkdirSync(join(dir, 'sites'), { recursive: true });
  writeFileSync(join(dir, 'package.json'), JSON.stringify({ type: 'module' }, null, 2), 'utf8');

  for (const [name, body] of Object.entries(kits)) {
    writeFileSync(join(dir, 'brand-kits', name), body, 'utf8');
    if (!sites) continue;
    const slug = name.replace(/\.js$/, '');
    mkdirSync(join(dir, 'sites', slug), { recursive: true });
    writeFileSync(join(dir, 'sites', slug, 'index.html'), '<html><head></head><body>x</body></html>', 'utf8');
  }

  const files = pinFiles ?? Object.keys(kits).sort();
  writeFileSync(
    join(dir, 'brand-kits', 'expected-kits.json'),
    JSON.stringify({ count: pinCount ?? files.length, kits: files }, null, 2),
    'utf8',
  );
  writeFileSync(join(dir, 'index.html'), '<html><head></head><body>gallery</body></html>', 'utf8');
  // The no-JS gallery link must be the site's real fully-qualified URL or
  // tools/build.mjs reds on THAT check instead of the one under test (S277).
  writeFileSync(
    join(dir, '404.html'),
    `<html><head></head><body><a href="${SITE_URL}/">home</a></body></html>`,
    'utf8',
  );
  return dir;
}

/** Never throws; always reports code + both streams. */
function run(cmd, args, cwd) {
  try {
    const stdout = execFileSync(cmd, args, { cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
    return { code: 0, stdout, stderr: '' };
  } catch (err) {
    return { code: err.status ?? 1, stdout: err.stdout ?? '', stderr: err.stderr ?? '' };
  }
}

// `--check` validates the corpus, prints the denominator and binds NO port, so
// the gate is testable without a listening socket to leak. preview-all resolves
// brand-kits/ from process.cwd().
const runPreview = (cwd) => run(process.execPath, [PREVIEW, '--check'], cwd);

// vendor-fonts resolves ROOT from its own file location, so it is copied into
// the fixture and run from there. `--report` is the cheapest verb that still
// forces loadKits(): it writes nothing and touches no network.
function runFonts(cwd) {
  const toolsDir = join(cwd, 'tools');
  mkdirSync(toolsDir, { recursive: true });
  for (const f of ['vendor-fonts.mjs', 'kit-inventory.mjs']) {
    writeFileSync(join(toolsDir, f), readFileSync(join(ROOT, 'tools', f), 'utf8'), 'utf8');
  }
  return run(process.execPath, [join(toolsDir, 'vendor-fonts.mjs'), '--report', '--all'], cwd);
}

const runBuild = (cwd) => run(process.execPath, [BUILD], cwd);

// The three tools, each with the runner that exercises its kit walk.
const TOOLS = [
  { name: 'tools/preview-all.mjs', run: runPreview },
  { name: 'tools/vendor-fonts.mjs', run: runFonts },
];

for (const tool of TOOLS) {
  describe(`${tool.name}: an unusable kit corpus is fatal`, () => {
    // THE CONTROL ARM. Without a green from the same code path, every red below
    // is consistent with a tool that has simply been broken outright.
    it('exits 0 on a complete corpus and PRINTS ITS DENOMINATOR', () => {
      const dir = makeFixture({ 'alpha.js': validKit('alpha', 'Alpha'), 'beta.js': validKit('beta', 'Beta') });
      const { code, stdout, stderr } = tool.run(dir);
      strictEqual(code, 0, `expected a clean run, got:\n${stderr}`);
      match(
        stdout,
        /2 \/ 2 \(100%\) brand kit\(s\) loaded — pinned: 2/,
        `no denominator printed. A bare exit 0 does not distinguish a full pass ` +
          `from a no-op. Got:\n${stdout}`,
      );
    });

    // Proves the printed number is read from the filesystem rather than being a
    // constant: same code path, two corpora of different size.
    it('the printed denominator tracks the number of kit FILES', () => {
      for (const n of [1, 4]) {
        const kits = {};
        for (let i = 0; i < n; i += 1) kits[`kit${i}.js`] = validKit(`kit${i}`, `Kit ${i}`);
        const { code, stdout, stderr } = tool.run(makeFixture(kits));
        strictEqual(code, 0, `fixture of ${n} kits should pass:\n${stderr}`);
        match(
          stdout,
          new RegExp(`${n} / ${n} \\(100%\\) brand kit\\(s\\) loaded — pinned: ${n}`),
          `denominator did not track a corpus of ${n}. Got:\n${stdout}`,
        );
      }
    });

    it('reds on a kit with a syntax error, and names it', () => {
      const dir = makeFixture({
        'alpha.js': validKit('alpha', 'Alpha'),
        'broken.js': 'export default { bad key: 1 };\n',
      });
      const { code, stdout, stderr } = tool.run(dir);
      notStrictEqual(code, 0, 'an unloadable kit must be fatal');
      match(stdout + stderr, /broken\.js/, 'the failure must name the offending file');
    });

    it('reds on a kit that exports nothing (the CJS-in-ESM case), and names it', () => {
      const dir = makeFixture({
        'alpha.js': validKit('alpha', 'Alpha'),
        // Byte-for-byte the shape stellar-command.js and terraform.js shipped.
        'silent.js':
          'const k = { name: "Silent" };\nif (typeof module !== "undefined" && module.exports) {\n  module.exports = k;\n}\n',
      });
      const { code, stdout, stderr } = tool.run(dir);
      notStrictEqual(code, 0, 'a kit that exports nothing must be fatal');
      match(stdout + stderr, /silent\.js/, 'the failure must name the offending file');
      match(stdout + stderr, /no brand kit export/, 'the failure must explain what was missing');
    });

    it('reds when a kit file is DELETED — the case a directory-derived count cannot see', () => {
      const dir = makeFixture(
        { 'alpha.js': validKit('alpha', 'Alpha'), 'beta.js': validKit('beta', 'Beta') },
        { pinFiles: ['alpha.js', 'beta.js', 'gamma.js'] },
      );
      const { code, stdout, stderr } = tool.run(dir);
      notStrictEqual(code, 0, 'a deleted kit file must be fatal');
      match(stdout + stderr, /gamma\.js/, 'the failure must name the missing kit');
      match(stdout + stderr, /MISSING from disk/, 'the failure must say the file is absent');
    });

    it('reds when a kit is added without updating the pin', () => {
      const dir = makeFixture(
        { 'alpha.js': validKit('alpha', 'Alpha'), 'beta.js': validKit('beta', 'Beta') },
        { pinFiles: ['alpha.js'] },
      );
      const { code, stdout, stderr } = tool.run(dir);
      notStrictEqual(code, 0, 'an unpinned kit must be fatal');
      match(stdout + stderr, /beta\.js/, 'the failure must name the unpinned kit');
    });

    // ⚠ THE ANTI-VACUITY CASE. A tool that inspects zero kits satisfies every
    // check above — no load can fail, and the pin comparison is trivially
    // satisfied in both directions — so it exits 0 having verified nothing.
    // That shape (a gate that ran and inspected zero files) is the commonest
    // neuter in this estate, so it is asserted explicitly rather than assumed.
    it('reds on an EMPTY corpus rather than passing vacuously', () => {
      const dir = makeFixture({}, { pinFiles: ['alpha.js'] });
      const { code, stdout, stderr } = tool.run(dir);
      notStrictEqual(code, 0, 'zero kits must be a failure, not a skip');
      match(stdout + stderr, /corpus is EMPTY/, 'the failure must say the corpus was empty');
    });

    // The pin is the independent denominator, so an empty pin disarms every set
    // comparison in this file at once.
    it('reds on a vacuous pin (`"kits": []`)', () => {
      const dir = makeFixture({ 'alpha.js': validKit('alpha', 'Alpha') }, { pinFiles: [] });
      const { code, stdout, stderr } = tool.run(dir);
      notStrictEqual(code, 0, 'an empty pin must be fatal');
      match(stdout + stderr, /pin is vacuous/, 'the failure must name the vacuous pin');
    });

    it('reds when the pin contradicts itself (`count` != `kits.length`)', () => {
      const dir = makeFixture({ 'alpha.js': validKit('alpha', 'Alpha') }, { pinCount: 7 });
      const { code, stdout, stderr } = tool.run(dir);
      notStrictEqual(code, 0, 'an internally inconsistent pin must be fatal');
      match(stdout + stderr, /internally inconsistent/, 'the failure must say the pin disagrees with itself');
    });
  });
}

// tools/build.mjs keeps its own inline copy of the pin + load logic (S278,
// pinned by test/brand-kit-load.test.mjs). Duplication is only safe while the
// two cannot diverge without something going red, so the same fixtures are put
// through both and the verdicts compared.
describe('tools/build.mjs and tools/kit-inventory.mjs agree', () => {
  const cases = [
    ['complete corpus', () => makeFixture({ 'alpha.js': validKit('alpha', 'A'), 'beta.js': validKit('beta', 'B') }), 0],
    ['syntax error', () => makeFixture({ 'alpha.js': validKit('alpha', 'A'), 'broken.js': 'export default { bad key: 1 };\n' }), 1],
    [
      'deleted kit',
      () => makeFixture({ 'alpha.js': validKit('alpha', 'A') }, { pinFiles: ['alpha.js', 'gamma.js'] }),
      1,
    ],
    ['unpinned kit', () => makeFixture({ 'alpha.js': validKit('alpha', 'A') }, { pinFiles: [] }), 1],
  ];

  for (const [label, mk, expectZero] of cases) {
    it(`${label}: build.mjs and preview-all.mjs reach the same verdict`, () => {
      const dir = mk();
      const build = runBuild(dir);
      const preview = runPreview(dir);
      const buildOk = build.code === 0;
      const previewOk = preview.code === 0;
      strictEqual(
        buildOk,
        previewOk,
        `verdicts diverge on "${label}" — build exit ${build.code}, preview exit ${preview.code}.\n` +
          `build stderr:\n${build.stderr}\npreview stderr:\n${preview.stderr}`,
      );
      strictEqual(buildOk, expectZero === 0, `unexpected verdict for "${label}"`);
    });
  }
});

// ---------------------------------------------------------------------------
// The lint gate's own sub-corpus pin (S281)
// ---------------------------------------------------------------------------
// `lint:js` prints "eslint inspected N files", but N comes from the same globs
// it is reporting on. If `brand-kits/*.js` stopped matching, eslint would still
// see 191 files under sites/ and tools/, print a plausible number, and exit 0
// with the 79 build-critical kit files unchecked. tools/lint.mjs therefore
// counts the brand-kit slice separately against `count` in
// brand-kits/expected-kits.json — an independent denominator — and prints it.
describe('tools/lint.mjs pins the brand-kits sub-corpus independently', () => {
  const LINT = join(ROOT, 'tools', 'lint.mjs');

  // Runs the REAL tools/lint.mjs against a fixture root. `--no-eslintrc`-style
  // config is unnecessary: every red below fires before eslint is spawned.
  function runLintJs(cwd) {
    return run(process.execPath, [join(cwd, 'tools', 'lint.mjs'), 'js'], cwd);
  }

  function lintFixture({ kitCount, pinCount }) {
    const dir = mkdtempSync(join(tmpdir(), 'phlix-lintpin-'));
    tempRoots.push(dir);
    mkdirSync(join(dir, 'brand-kits'), { recursive: true });
    mkdirSync(join(dir, 'tools'), { recursive: true });
    mkdirSync(join(dir, 'node_modules'), { recursive: true });
    writeFileSync(join(dir, 'package.json'), JSON.stringify({ type: 'module' }, null, 2), 'utf8');
    // eslint v9+ refuses to run without a flat config, and its absence would
    // exit 2 — i.e. the happy-path control would red for a reason that has
    // nothing to do with the pin under test.
    writeFileSync(join(dir, 'eslint.config.js'), 'export default [];\n', 'utf8');
    writeFileSync(join(dir, 'tools', 'lint.mjs'), readFileSync(LINT, 'utf8'), 'utf8');
    // tools/lint.mjs resolves projectRoot from its own location and imports
    // `glob`; symlink the real node_modules so the fixture can load it.
    rmSync(join(dir, 'node_modules'), { recursive: true, force: true });
    symlinkSync(join(ROOT, 'node_modules'), join(dir, 'node_modules'), 'dir');
    const kits = [];
    for (let i = 0; i < kitCount; i += 1) {
      const name = `kit${i}.js`;
      writeFileSync(join(dir, 'brand-kits', name), validKit(`kit${i}`, `Kit ${i}`), 'utf8');
      kits.push(name);
    }
    writeFileSync(
      join(dir, 'brand-kits', 'expected-kits.json'),
      JSON.stringify({ count: pinCount, kits }, null, 2),
      'utf8',
    );
    return dir;
  }

  it('prints the sub-corpus denominator and passes when it matches', () => {
    const { code, stdout, stderr } = runLintJs(lintFixture({ kitCount: 3, pinCount: 3 }));
    match(
      stdout,
      /sub-corpus brand-kits\/\*\.js: 3 \/ 3 \(pinned by brand-kits\/expected-kits\.json\)/,
      `no sub-corpus denominator printed. Got:\n${stdout}\n${stderr}`,
    );
    strictEqual(code, 0, `expected a clean lint:js, got:\n${stdout}\n${stderr}`);
  });

  it('reds when the brand-kit slice SHRINKS below the pin', () => {
    const { code, stdout, stderr } = runLintJs(lintFixture({ kitCount: 2, pinCount: 3 }));
    notStrictEqual(code, 0, 'a shrunken sub-corpus must red lint:js');
    match(stdout + stderr, /contributed 2 file\(s\) to the lint corpus but .*pins 3/, `got:\n${stdout}\n${stderr}`);
  });

  // ⚠ THE ANTI-VACUITY CASE for the LINT gate. Zero brand kits leaves the other
  // 191 files matching, so without this the gate lints a partial corpus, prints
  // a number derived from that corpus, and exits 0.
  it('reds when the brand-kit slice is EMPTY, even though other patterns still match', () => {
    const dir = lintFixture({ kitCount: 0, pinCount: 3 });
    // Give the OTHER patterns something to match, so the overall corpus is
    // non-empty and the generic `files.length === 0` branch is NOT what fires.
    writeFileSync(join(dir, 'tools', 'filler.mjs'), 'export const x = 1;\n', 'utf8');
    const { code, stdout, stderr } = runLintJs(dir);
    notStrictEqual(code, 0, 'an empty brand-kit slice must red lint:js');
    match(stdout + stderr, /contributed 0 file\(s\) to the lint corpus but .*pins 3/, `got:\n${stdout}\n${stderr}`);
  });

  // ⚠ THE MUTATION THAT SURVIVED THE FIRST VERSION OF THIS CHECK, and the
  // reason it is written the way it is. The pin originally re-globbed
  // `brand-kits/*.js` itself. Neutering the TARGET pattern to `brand-kits/*.jsx`
  // therefore dropped all 79 kits from eslint's corpus (270 -> 191 files
  // inspected) while the pin reported a serene "79 / 79" and the gate exited 0
  // — a check measuring something other than what the tool consumed. It now
  // filters the list that is actually handed to the linter.
  it('reds when the TARGET GLOB stops matching kits, even though the pin file is untouched', () => {
    const dir = lintFixture({ kitCount: 3, pinCount: 3 });
    writeFileSync(join(dir, 'tools', 'filler.mjs'), 'export const x = 1;\n', 'utf8');
    const src = readFileSync(join(dir, 'tools', 'lint.mjs'), 'utf8');
    const neutered = src.replace("patterns: ['brand-kits/*.js',", "patterns: ['brand-kits/*.jsx',");
    // Non-vacuity: a replace that matched nothing would leave the tool intact
    // and this test would assert a red that never had a cause.
    notStrictEqual(neutered, src, 'the glob mutation did not apply — this test would prove nothing');
    writeFileSync(join(dir, 'tools', 'lint.mjs'), neutered, 'utf8');

    const { code, stdout, stderr } = runLintJs(dir);
    notStrictEqual(code, 0, 'a glob that no longer reaches the kits must red lint:js');
    match(stdout + stderr, /contributed 0 file\(s\) to the lint corpus but .*pins 3/, `got:\n${stdout}\n${stderr}`);
  });

  it('reds on a pin of zero — a pin that pins nothing', () => {
    const { code, stdout, stderr } = runLintJs(lintFixture({ kitCount: 0, pinCount: 0 }));
    notStrictEqual(code, 0, 'a zero pin must be fatal, not trivially satisfied');
    match(stdout + stderr, /pins nothing/, `got:\n${stdout}\n${stderr}`);
  });
});

// Non-vacuity for this file itself: the tool list must not be empty, or every
// `for (const tool of TOOLS)` block above registers zero tests and the file
// reports a clean pass having asserted nothing.
describe('this test file is not vacuous', () => {
  it('covers both tools S281 names', () => {
    ok(TOOLS.length >= 2, `expected at least 2 tools under test, got ${TOOLS.length}`);
    const names = TOOLS.map((t) => t.name);
    ok(names.includes('tools/preview-all.mjs'), 'preview-all.mjs is not covered');
    ok(names.includes('tools/vendor-fonts.mjs'), 'vendor-fonts.mjs is not covered');
  });
});
