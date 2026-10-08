// Guard tests for scripts/audit-gate.mjs — the npm-audit allow-list gate wired
// into .github/workflows/lint.yml (replacing the bare `npm audit
// --audit-level=moderate` step). The gate exists because master went red on
// 2026-10-07 (run 37802257237) from registry-side advisory drift with NO
// in-range fix for two advisories: GHSA-vfj7-8cjw-p6xm (braces — 3.0.3 is the
// newest release ever published) and GHSA-c475-qrg2-pj4r (basic-ftp — patched
// at 6.2.1 but unreachable: get-uri declares ^5.x at every generation). It may
// pass ONLY while every reported advisory id is explicitly allow-listed, and it
// must fail LOUD on every neutering vector: unparseable JSON, unknown report
// shape, a failed spawn, or a nonzero audit exit reporting zero advisories.
//
// Design ported from phlix-windows-client tests/unit/audit-gate.test.mjs
// (vitest there; node:test + node:assert/strict here, matching this repo's
// `npm run test:unit` = `node --test "test/**/*.test.mjs"`).
//
// Importing scripts/audit-gate.mjs never execs an audit — the module's main
// guard ties process invocation to `node scripts/audit-gate.mjs` only. This
// file is the standing proof of that law: it imports the gate and runs zero
// npm processes.

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import {
  ALLOWED_ADVISORIES,
  AuditGateError,
  EXIT_OK,
  EXIT_STRUCTURE_ERROR,
  EXIT_VIOLATION,
  collectAdvisoryIds,
  decide,
} from '../scripts/audit-gate.mjs';

const VFJ7 = 'GHSA-vfj7-8cjw-p6xm'; // braces (no patched release exists)
const C475 = 'GHSA-c475-qrg2-pj4r'; // basic-ftp (patch unreachable under get-uri ^5.x)

/** v3 npm-audit advisory object for an arbitrary GHSA (url carries the id). */
function advisory(ghsa, name = 'some-package', severity = 'high') {
  return {
    source: 1,
    name,
    dependency: name,
    title: `synthetic ${ghsa}`,
    url: `https://github.com/advisories/${ghsa}`,
    severity,
    range: '*',
  };
}

/** Minimal v3 report (auditReportVersion 3, `vulnerabilities` keyed by package). */
function v3Report(entries) {
  const vulnerabilities = {};
  for (const [pkg, vias] of Object.entries(entries)) {
    vulnerabilities[pkg] = { name: pkg, severity: 'high', isDirect: false, via: vias, effects: [] };
  }
  return { auditReportVersion: 3, vulnerabilities, metadata: { vulnerabilities: { total: 1 } } };
}

const json = (report) => JSON.stringify(report);

describe('collectAdvisoryIds', () => {
  it('dedupes the 19 affected dev-chain packages down to the two real advisories', () => {
    // Condensed from the live `npm audit --json` on master after the in-range
    // refresh: npm counts 19 vulnerable PACKAGES (the stylelint→micromatch→
    // braces and @lhci/cli→get-uri→basic-ftp chains, plus dependents like
    // stylelint-config-standard whose `via` entries are STRINGS naming their
    // vulnerable dependency, not advisories). The advisory set is exactly two.
    const bracesChain = ['braces', 'micromatch', 'fast-glob', 'globby', 'stylelint'];
    const ftpChain = ['basic-ftp', 'get-uri', 'pac-proxy-agent', 'proxy-agent', '@lhci/cli'];
    const report = v3Report({
      ...Object.fromEntries(
        bracesChain.map((pkg) => [pkg, [pkg === 'braces' ? advisory(VFJ7, 'braces') : 'braces']]),
      ),
      ...Object.fromEntries(
        ftpChain.map((pkg) => [
          pkg,
          [pkg === 'basic-ftp' ? advisory(C475, 'basic-ftp') : 'basic-ftp'],
        ]),
      ),
    });
    assert.deepEqual([...collectAdvisoryIds(json(report))].sort(), [C475, VFJ7]);
  });

  it('collects every distinct advisory id across packages', () => {
    const report = v3Report({
      a: [advisory(VFJ7, 'a')],
      b: [advisory('GHSA-aaaa-bbbb-cccc', 'b'), 'a'],
    });
    assert.deepEqual([...collectAdvisoryIds(json(report))].sort(), ['GHSA-aaaa-bbbb-cccc', VFJ7]);
  });

  it('falls back to a github_advisory_id field when the url lacks a GHSA path', () => {
    const report = v3Report({
      a: [{ name: 'a', severity: 'high', github_advisory_id: 'GHSA-zzzz-zzzz-zzzz' }],
    });
    assert.deepEqual([...collectAdvisoryIds(json(report))], ['GHSA-zzzz-zzzz-zzzz']);
  });

  it('reads the legacy v2 `advisories`-keyed shape', () => {
    const report = {
      auditReportVersion: 2,
      advisories: { 100: { github_advisory_id: VFJ7, module_name: 'braces' } },
      metadata: {},
    };
    assert.deepEqual([...collectAdvisoryIds(json(report))], [VFJ7]);
  });

  it('reads the npm-12 shape (auditReportVersion 2 carrying a `vulnerabilities` map)', () => {
    // Local npm 12.0.2 emits exactly this on master; CI npm 11 emits v3. Both
    // must parse identically — the `vulnerabilities` branch is checked first.
    const report = {
      auditReportVersion: 2,
      vulnerabilities: {
        braces: { name: 'braces', severity: 'high', via: [advisory(VFJ7, 'braces')], effects: [] },
      },
      metadata: {},
    };
    assert.deepEqual([...collectAdvisoryIds(json(report))], [VFJ7]);
  });

  it('throws on unparseable output instead of guessing', () => {
    assert.throws(() => collectAdvisoryIds('not json {{{'), AuditGateError);
  });

  it('throws on a recognized-object report missing both known shapes', () => {
    assert.throws(
      () => collectAdvisoryIds(json({ auditReportVersion: 9, message: 'future npm' })),
      /unrecognized npm audit JSON shape/,
    );
  });

  it('throws on an advisory entry that carries no resolvable GHSA id', () => {
    assert.throws(
      () => collectAdvisoryIds(json(v3Report({ a: [{ name: 'a', severity: 'high' }] }))),
      /no resolvable GHSA id/,
    );
  });
});

describe('decide — pass verdicts', () => {
  it('passes a clean audit (exit 0, no advisories)', () => {
    const verdict = decide({ exitCode: 0, stdout: json(v3Report({})) });
    assert.equal(verdict.code, EXIT_OK);
    assert.equal(verdict.clean, true);
    assert.deepEqual(verdict.allowed, []);
  });

  it('passes the braces-only state (GHSA removed first) and names it as allowed', () => {
    const verdict = decide({
      exitCode: 1,
      stdout: json(v3Report({ braces: [advisory(VFJ7, 'braces')] })),
    });
    assert.equal(verdict.code, EXIT_OK);
    assert.deepEqual(verdict.allowed, [VFJ7]);
  });

  it('passes the live two-advisory state, each with its documented escape analysis', () => {
    const verdict = decide({
      exitCode: 1,
      stdout: json(
        v3Report({
          braces: [advisory(VFJ7, 'braces')],
          'basic-ftp': [advisory(C475, 'basic-ftp')],
        }),
      ),
    });
    assert.equal(verdict.code, EXIT_OK);
    assert.deepEqual(verdict.allowed, [C475, VFJ7]);

    const vfj7 = ALLOWED_ADVISORIES.get(VFJ7);
    assert.equal(vfj7.package, 'braces');
    assert.match(vfj7.justification, /NO patched release exists/);
    assert.match(vfj7.justification, /UPSTREAM WATCH/);
    assert.match(vfj7.justification, /Re-verify advisory status by 2027-01-03/);

    const c475 = ALLOWED_ADVISORIES.get(C475);
    assert.equal(c475.package, 'basic-ftp');
    assert.match(c475.justification, /UNREACHABLE/);
    assert.match(c475.justification, /cross-major override was rejected/);
    assert.match(c475.justification, /UPSTREAM WATCH/);
    assert.match(c475.justification, /Re-verify advisory status by 2027-01-03/);
  });

  it('matches allow-list entries case-insensitively (GHSA ids are case-insensitive by spec)', () => {
    const verdict = decide({
      exitCode: 1,
      stdout: json(v3Report({ a: [advisory(VFJ7.toUpperCase(), 'a')] })),
    });
    assert.equal(verdict.code, EXIT_OK);
    assert.deepEqual(verdict.allowed, [VFJ7]); // canonical key form surfaces downstream
  });
});

describe('decide — fail-loud verdicts', () => {
  it('reddens when the allowed pair is joined by ANY new advisory', () => {
    const verdict = decide({
      exitCode: 1,
      stdout: json(
        v3Report({
          braces: [advisory(VFJ7, 'braces')],
          'basic-ftp': [advisory(C475, 'basic-ftp')],
          evil: [advisory('GHSA-dead-beef-cafe', 'evil')],
        }),
      ),
    });
    assert.equal(verdict.code, EXIT_VIOLATION);
    assert.deepEqual(verdict.unknown, ['GHSA-dead-beef-cafe']);
    assert.match(verdict.problems.join(' '), /NOT on the allow-list: GHSA-dead-beef-cafe/);
    assert.deepEqual(verdict.allowed, [C475, VFJ7]); // still reported for context
  });

  it('reddens even when npm itself exits 0 below its --audit-level threshold (stricter than the bare step)', () => {
    const verdict = decide({
      exitCode: 0,
      stdout: json(v3Report({ a: [advisory('GHSA-aaaa-bbbb-cccc', 'a', 'moderate')] })),
    });
    assert.equal(verdict.code, EXIT_VIOLATION);
    assert.deepEqual(verdict.unknown, ['GHSA-aaaa-bbbb-cccc']);
  });

  it('refuses to treat a failed spawn as clean', () => {
    const verdict = decide({ exitCode: -1, stdout: '', spawnError: new Error('ENOENT npm') });
    assert.equal(verdict.code, EXIT_STRUCTURE_ERROR);
    assert.match(verdict.problems.join(' '), /could not be executed/);
  });

  it('refuses a nonzero audit exit that reports zero advisories (anti-neutering)', () => {
    const verdict = decide({ exitCode: 1, stdout: json(v3Report({})) });
    assert.equal(verdict.code, EXIT_STRUCTURE_ERROR);
    assert.match(verdict.problems.join(' '), /ZERO advisories/);
    assert.match(verdict.problems.join(' '), /broken audit/);
  });

  it('refuses unparseable output on a nonzero exit', () => {
    const verdict = decide({ exitCode: 1, stdout: '<html>registry error</html>' });
    assert.equal(verdict.code, EXIT_STRUCTURE_ERROR);
    assert.match(verdict.problems.join(' '), /unparseable/);
  });

  it('refuses an npm error envelope that parses but names no advisory shape', () => {
    const verdict = decide({
      exitCode: 1,
      stdout: json({ message: '404 Not Found - registry', 'npm-id': 'x' }),
    });
    assert.equal(verdict.code, EXIT_STRUCTURE_ERROR);
    assert.match(verdict.problems.join(' '), /unrecognized npm audit JSON shape/);
  });

  it('refuses an advisory it cannot name', () => {
    const verdict = decide({
      exitCode: 1,
      stdout: json(v3Report({ a: [{ name: 'a', severity: 'high' }] })),
    });
    assert.equal(verdict.code, EXIT_STRUCTURE_ERROR);
    assert.match(verdict.problems.join(' '), /no resolvable GHSA id/);
  });
});

describe('allow-list integrity', () => {
  it('contains EXACTLY the two justified entries (vfj7/braces, c475/basic-ftp) — additions/removals must be a reviewed decision', () => {
    assert.deepEqual([...ALLOWED_ADVISORIES.keys()].sort(), [C475, VFJ7]);
  });

  it('keys every entry in the canonical npm-reported GHSA form', () => {
    for (const key of ALLOWED_ADVISORIES.keys()) {
      assert.match(key, /^GHSA-[0-9a-z]+-[0-9a-z]+-[0-9a-z]+$/);
    }
  });

  it('requires a non-empty justification and package on every entry', () => {
    for (const [key, entry] of ALLOWED_ADVISORIES) {
      assert.ok(entry.justification, key);
      assert.ok(entry.package, key);
    }
  });

  it('names the package each allowed advisory was reported against in the live lockfile', () => {
    // If the gate script and the allow-list keys ever drift apart (id typo,
    // renamed package), the live-state test above and this pin both react.
    assert.equal(ALLOWED_ADVISORIES.get(VFJ7).package, 'braces');
    assert.equal(ALLOWED_ADVISORIES.get(C475).package, 'basic-ftp');
  });
});
