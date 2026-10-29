// Guard tests for scripts/audit-gate.mjs — the npm-audit allow-list gate wired
// into .github/workflows/lint.yml (replacing the bare `npm audit
// --audit-level=moderate` step). The gate exists because master goes red on
// registry-side advisory drift with NO in-range fix for some advisories. Origin
// story (2026-10-07/08): the first drift batch cleared five advisories
// lockfile-only and allow-listed two — GHSA-vfj7-8cjw-p6xm (braces) and
// GHSA-c475-qrg2-pj4r (basic-ftp). The second drift batch (2026-10-29, lint run
// 40870590683 at tip 49543526) newly reported body-parser GHSA-27r3-jxmh-p828 —
// cleared lockfile-only (`npm update body-parser` → 1.20.9, inside express's
// ~1.20.5 declaration; pinned as a floor in test/deps-audit-floors.test.mjs) —
// plus two that CANNOT be fixed in-range and joined the allow-list:
// GHSA-gcqx-w48m-w2h4 (deepmerge — no patched release has ever existed) and
// GHSA-mrhx-c7xc-m3w5 (zod — patched at 4.6.6, cross-major from chromium-bidi's
// ^3.24.1, with the puppeteer chain deliberately pinned by the S321 override).
// The braces entry was simultaneously REMOVED: the advisory was WITHDRAWN
// upstream on 2026-10-23 and npm no longer reports it, so the exact set below
// is [basic-ftp, deepmerge, zod] — withdrawn or cleared entries must not
// linger as if live (windows-client precedent d991d74 dropping the ch52 entry).
// The gate may pass ONLY while every reported advisory id is explicitly
// allow-listed, and it must fail LOUD on every neutering vector: unparseable
// JSON, unknown report shape, a failed spawn, or a nonzero audit exit reporting
// zero advisories.
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

const C475 = 'GHSA-c475-qrg2-pj4r'; // basic-ftp (patch unreachable under get-uri ^5.x)
const GCQX = 'GHSA-gcqx-w48m-w2h4'; // deepmerge (no patched release exists)
const MRHX = 'GHSA-mrhx-c7xc-m3w5'; // zod (4.6.6 cross-major; S321 override pins the chain)

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
  it('dedupes the 16 affected dev-chain packages down to the three real advisories', () => {
    // Condensed from the live `npm audit --json` on master after the 2026-10-29
    // body-parser clear: npm counts 16 vulnerable PACKAGES (the three advisory
    // roots basic-ftp/deepmerge/zod plus dependents like lighthouse or pa11y
    // whose `via` entries are STRINGS naming their vulnerable dependency, not
    // advisories). The advisory set is exactly three.
    const ftpChain = ['basic-ftp', 'get-uri', 'pac-proxy-agent', 'proxy-agent', '@lhci/cli'];
    const mergeChain = ['deepmerge', 'google-fonts-helper'];
    const zodChain = [
      'zod',
      'chromium-bidi',
      'puppeteer',
      'puppeteer-core',
      '@puppeteer/browsers',
      'pa11y',
      'pa11y-ci',
      'lighthouse',
      '@lhci/utils',
    ];
    const asChain = (chain, rootPkg, ghsa) =>
      Object.fromEntries(
        chain.map((pkg) => [pkg, [pkg === rootPkg ? advisory(ghsa, rootPkg) : rootPkg]]),
      );
    const report = v3Report({
      ...asChain(ftpChain, 'basic-ftp', C475),
      ...asChain(mergeChain, 'deepmerge', GCQX),
      ...asChain(zodChain, 'zod', MRHX),
    });
    assert.deepEqual([...collectAdvisoryIds(json(report))].sort(), [C475, GCQX, MRHX]);
  });

  it('collects every distinct advisory id across packages', () => {
    const report = v3Report({
      a: [advisory(GCQX, 'a')],
      b: [advisory('GHSA-aaaa-bbbb-cccc', 'b'), 'a'],
    });
    assert.deepEqual([...collectAdvisoryIds(json(report))].sort(), ['GHSA-aaaa-bbbb-cccc', GCQX]);
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
      advisories: { 100: { github_advisory_id: C475, module_name: 'basic-ftp' } },
      metadata: {},
    };
    assert.deepEqual([...collectAdvisoryIds(json(report))], [C475]);
  });

  it('reads the npm-12 shape (auditReportVersion 2 carrying a `vulnerabilities` map)', () => {
    // Local npm 12.0.2 emits exactly this on master; CI npm 11 emits v3. Both
    // must parse identically — the `vulnerabilities` branch is checked first.
    const report = {
      auditReportVersion: 2,
      vulnerabilities: {
        zod: { name: 'zod', severity: 'high', via: [advisory(MRHX, 'zod')], effects: [] },
      },
      metadata: {},
    };
    assert.deepEqual([...collectAdvisoryIds(json(report))], [MRHX]);
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

  it('passes a single-advisory state (one GHSA cleared first) and names it as allowed', () => {
    const verdict = decide({
      exitCode: 1,
      stdout: json(v3Report({ deepmerge: [advisory(GCQX, 'deepmerge')] })),
    });
    assert.equal(verdict.code, EXIT_OK);
    assert.deepEqual(verdict.allowed, [GCQX]);
  });

  it('passes the live three-advisory state, each with its documented escape analysis', () => {
    const verdict = decide({
      exitCode: 1,
      stdout: json(
        v3Report({
          'basic-ftp': [advisory(C475, 'basic-ftp')],
          deepmerge: [advisory(GCQX, 'deepmerge')],
          zod: [advisory(MRHX, 'zod')],
        }),
      ),
    });
    assert.equal(verdict.code, EXIT_OK);
    assert.deepEqual(verdict.allowed, [C475, GCQX, MRHX]);

    const c475 = ALLOWED_ADVISORIES.get(C475);
    assert.equal(c475.package, 'basic-ftp');
    assert.match(c475.justification, /UNREACHABLE/);
    assert.match(c475.justification, /cross-major override was rejected/);
    assert.match(c475.justification, /UPSTREAM WATCH/);
    assert.match(c475.justification, /Re-verify advisory status by 2027-01-03/);

    const gcqx = ALLOWED_ADVISORIES.get(GCQX);
    assert.equal(gcqx.package, 'deepmerge');
    assert.match(gcqx.justification, /NO patched release exists/);
    assert.match(gcqx.justification, /downgrade cannot escape/);
    assert.match(gcqx.justification, /UPSTREAM WATCH/);
    assert.match(gcqx.justification, /Re-verify advisory status by 2027-01-03/);

    const mrhx = ALLOWED_ADVISORIES.get(MRHX);
    assert.equal(mrhx.package, 'zod');
    assert.match(mrhx.justification, /UNREACHABLE at two axes/);
    assert.match(mrhx.justification, /CROSS-MAJOR/);
    assert.match(mrhx.justification, /S321/);
    assert.match(mrhx.justification, /UPSTREAM WATCH/);
    assert.match(mrhx.justification, /Re-verify advisory status by 2027-01-03/);
  });

  it('matches allow-list entries case-insensitively (GHSA ids are case-insensitive by spec)', () => {
    const verdict = decide({
      exitCode: 1,
      stdout: json(v3Report({ a: [advisory(MRHX.toUpperCase(), 'a')] })),
    });
    assert.equal(verdict.code, EXIT_OK);
    assert.deepEqual(verdict.allowed, [MRHX]); // canonical key form surfaces downstream
  });
});

describe('decide — fail-loud verdicts', () => {
  it('reddens when the allowed trio is joined by ANY new advisory', () => {
    const verdict = decide({
      exitCode: 1,
      stdout: json(
        v3Report({
          'basic-ftp': [advisory(C475, 'basic-ftp')],
          deepmerge: [advisory(GCQX, 'deepmerge')],
          zod: [advisory(MRHX, 'zod')],
          evil: [advisory('GHSA-dead-beef-cafe', 'evil')],
        }),
      ),
    });
    assert.equal(verdict.code, EXIT_VIOLATION);
    assert.deepEqual(verdict.unknown, ['GHSA-dead-beef-cafe']);
    assert.match(verdict.problems.join(' '), /NOT on the allow-list: GHSA-dead-beef-cafe/);
    assert.deepEqual(verdict.allowed, [C475, GCQX, MRHX]); // still reported for context
  });

  it('reddens a withdrawn-era id that npm stopped reporting (braces, stale in the list)', () => {
    // The gate is subset-based, so the DELETED vfj7 entry no longer shelters it:
    // if the braces advisory were ever un-withdrawn and re-reported, the gate
    // reddens until a human re-justifies it. This is the regression guard for
    // the 2026-10-29 removal — the id must be UNKNOWN again.
    const verdict = decide({
      exitCode: 1,
      stdout: json(v3Report({ braces: [advisory('GHSA-vfj7-8cjw-p6xm', 'braces')] })),
    });
    assert.equal(verdict.code, EXIT_VIOLATION);
    assert.deepEqual(verdict.unknown, ['GHSA-vfj7-8cjw-p6xm']);
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
  it('contains EXACTLY the three justified entries (c475/basic-ftp, gcqx/deepmerge, mrhx/zod) — additions/removals must be a reviewed decision', () => {
    assert.deepEqual([...ALLOWED_ADVISORIES.keys()].sort(), [C475, GCQX, MRHX]);
  });

  it('no longer carries the withdrawn braces entry (GHSA-vfj7-8cjw-p6xm, withdrawn 2026-10-23)', () => {
    assert.equal(ALLOWED_ADVISORIES.has('GHSA-vfj7-8cjw-p6xm'), false);
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
    assert.equal(ALLOWED_ADVISORIES.get(C475).package, 'basic-ftp');
    assert.equal(ALLOWED_ADVISORIES.get(GCQX).package, 'deepmerge');
    assert.equal(ALLOWED_ADVISORIES.get(MRHX).package, 'zod');
  });
});
