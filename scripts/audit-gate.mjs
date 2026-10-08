/**
 * audit-gate — npm-audit wrapper with an explicit, justified advisory allow-list.
 *
 * WHY THIS EXISTS:
 * The `npm audit --audit-level=moderate` step this replaces is red on master
 * since 2026-10-07 (run 37802257237) purely from registry-side advisory drift —
 * no commit touched dependencies. Six advisories had published patches inside
 * their parents' declared ranges and were cleared lockfile-only by
 * `npm update compression proxy-addr shell-quote source-map-js http-cache-semantics`.
 * Two remain, and NEITHER has a reachable fix (proofs per entry below), so the
 * gate ships as a DOCUMENTED ALLOW-LIST, ported from phlix-windows-client
 * 74fc744/bb9276d: the audit passes only while the reported advisory-id set is a
 * subset of ALLOWED_ADVISORIES below, and turns red the moment ANY other
 * advisory appears — at any severity, unlike the bare --audit-level=moderate
 * step this replaces, which silently passed sub-threshold findings.
 *
 * REACH: both allowed advisories sit in dev tooling only — every package in this
 * repo's tree is devDependency-reachable (site builds output static files; nothing
 * of the audit's chain is served to users). npm's human output counts affected
 * PACKAGES (19 here); this gate dedupes by advisory id via the JSON parse below.
 *
 * ANTI-NEUTERING LAW:
 * A silent gate is worse than no gate. The script distinguishes "audit clean"
 * from "audit broken": unparseable JSON, an unrecognized report shape, a failed
 * spawn, or a nonzero npm exit that reports ZERO advisories all exit with
 * EXIT_STRUCTURE_ERROR (2) — never 0. Unknown advisories exit EXIT_VIOLATION (1).
 *
 * Exit codes: 0 pass (clean or allowed-only) · 1 allow-list violation ·
 * 2 audit itself failed (structural — the verdict is unusable, not "clean").
 */

import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

export const EXIT_OK = 0;
export const EXIT_VIOLATION = 1;
export const EXIT_STRUCTURE_ERROR = 2;

// Exact GHSA ids the gate tolerates, each with the justification CI prints on
// every run. Subset semantics: ANY advisory id missing here reddens the gate.
export const ALLOWED_ADVISORIES = new Map([
  [
    'GHSA-vfj7-8cjw-p6xm',
    {
      package: 'braces',
      justification:
        'dev-chain-only (stylelint -> fast-glob/micromatch -> braces; the site is static ' +
        'output, nothing shipped to users); NO patched release exists — the advisory range ' +
        'is <=3.0.3 and 3.0.3 is the newest version ever published (registry dist-tags + ' +
        'version list verified 2026-10-08; GitHub advisory lists no first_patched_version), ' +
        'so no bump can clear it; micromatch 4.0.8 (latest) still declares braces ^3.0.3. ' +
        'The flaw is stack exhaustion via deeply nested brace globs — an attacker would ' +
        'need to control the CSS file names/glob patterns stylelint is pointed at. ' +
        'UPSTREAM WATCH (the removal plan): the moment a 3.0.4+ lands, `npm update braces` ' +
        'resolves inside the existing ^3.0.3 declaration — then REMOVE this entry, its ' +
        'justification, and the vfj7 fixtures in test/audit-gate.test.mjs. Re-verify ' +
        'advisory status by 2027-01-03: https://github.com/advisories/GHSA-vfj7-8cjw-p6xm',
    },
  ],
  [
    'GHSA-c475-qrg2-pj4r',
    {
      package: 'basic-ftp',
      justification:
        'dev-chain-only (@lhci/cli -> proxy-agent -> pac-proxy-agent -> get-uri -> ' +
        'basic-ftp; Lighthouse CI proxy machinery, nothing shipped to users — and the ' +
        'vulnerable Client.list() parser only runs when an ftp:// URI is fetched, which ' +
        'no workflow in this repo ever does); a patched release EXISTS (6.2.1, advisory ' +
        'published 2026-10-01) but is UNREACHABLE: get-uri 6.0.5 declares basic-ftp ^5.0.2 ' +
        'and even the newest upstream get-uri 8.0.1 declares ^5.3.1 (registry verified ' +
        '2026-10-08), while the advisory flags <=6.2.0 — every 5.x is vulnerable, so no ' +
        "in-range update clears it. A cross-major override was rejected: this repo's " +
        'S430 discipline ("overrides only when a parent range blocks resolution, never ' +
        'majors", deps-audit-floors.test.mjs header) and never force a major across an ' +
        'unaudited API boundary for a DoS in a code path that never executes. ' +
        'UPSTREAM WATCH (the removal plan): when get-uri declares basic-ftp ^6.2.1+ ' +
        "(or npm's suggested fix ever becomes non-breaking): `npm update basic-ftp` " +
        'clears it — then REMOVE this entry, its justification, and the c475 fixtures ' +
        'in test/audit-gate.test.mjs. Re-verify advisory status by 2027-01-03: ' +
        'https://github.com/advisories/GHSA-c475-qrg2-pj4r',
    },
  ],
]);

// The replaced CI step gated at moderate; the bare `--audit-level` flag only
// positions npm's own exit code — the JSON report below carries every advisory
// regardless of level, and decide() reddens on ANY un-allowlisted id, so the
// gate is strictly stronger than the step it replaces.
const AUDIT_ARGS = ['audit', '--json', '--audit-level=moderate'];
const MAX_BUFFER_BYTES = 64 * 1024 * 1024;

export class AuditGateError extends Error {}

/** Run the real `npm audit --json` the same way the replaced CI step did. */
export function runAudit() {
  // CI is linux-only, but the win32 branch is kept for parity with the
  // phlix-windows-client template this gate is ported from: npm there is
  // npm.cmd, which Node refuses to spawn without a shell since the
  // CVE-2024-27980 hardening, and this repo already documents cmd.exe
  // semantics for local dev (test/copyright.test.mjs header). The argv is a
  // fixed constant — no interpolation, no injection surface.
  const result = spawnSync('npm', AUDIT_ARGS, {
    encoding: 'utf8',
    maxBuffer: MAX_BUFFER_BYTES,
    shell: process.platform === 'win32',
  });
  return {
    exitCode: result.status ?? -1,
    stdout: result.stdout ?? '',
    stderr: result.stderr ?? '',
    spawnError: result.error ?? null,
  };
}

// GHSA ids are case-insensitive by spec. Extraction preserves the reported
// case for display; ALLOW-LIST MATCHING IS CASE-INSENSITIVE (decide() below
// lowercases both sides), so authoring a key as GHSA-… or ghsa-… both work.
function ghsaFromUrl(url) {
  const match = typeof url === 'string' ? /\/(GHSA-[0-9a-z]+(-[0-9a-z]+){2,3})$/i.exec(url) : null;
  return match ? match[1] : null;
}

function advisoryIdOf(via) {
  const fromUrl = ghsaFromUrl(via.url);
  if (fromUrl) return fromUrl;
  if (typeof via.github_advisory_id === 'string' && /^GHSA-/i.test(via.github_advisory_id)) {
    return via.github_advisory_id;
  }
  throw new AuditGateError(
    `advisory entry carries no resolvable GHSA id (url=${JSON.stringify(via.url ?? null)}); ` +
      `refusing to certify an unnamed advisory — ${JSON.stringify(via).slice(0, 200)}`,
  );
}

/** Parse npm audit JSON (report v3 `vulnerabilities`, legacy v2 `advisories`) into a Set of GHSA ids. */
export function collectAdvisoryIds(stdout) {
  let report;
  try {
    report = JSON.parse(stdout);
  } catch {
    throw new AuditGateError(
      `npm audit --json produced unparseable output: ${JSON.stringify(String(stdout).slice(0, 300))}`,
    );
  }
  if (report === null || typeof report !== 'object') {
    throw new AuditGateError(
      `npm audit --json produced a non-object report: ${JSON.stringify(report).slice(0, 200)}`,
    );
  }

  const ids = new Set();
  if (report.vulnerabilities && typeof report.vulnerabilities === 'object') {
    for (const node of Object.values(report.vulnerabilities)) {
      for (const via of node?.via ?? []) {
        // v3 (and npm 12's `auditReportVersion: 2` variant that still carries
        // a `vulnerabilities` map): `via` strings name affected dependents;
        // objects ARE the advisories.
        if (typeof via === 'object' && via !== null) ids.add(advisoryIdOf(via));
      }
    }
    return ids;
  }
  if (report.advisories && typeof report.advisories === 'object') {
    for (const advisory of Object.values(report.advisories)) {
      if (advisory && typeof advisory === 'object') ids.add(advisoryIdOf(advisory));
    }
    return ids;
  }
  throw new AuditGateError(
    'unrecognized npm audit JSON shape (no `vulnerabilities`/`advisories` key) — ' +
      `refusing to guess at an audit we cannot read: keys=[${Object.keys(report).join(',')}]`,
  );
}

/**
 * Pure decision: audit-run facts in, gate verdict out.
 * Returns { code, clean, allowed[], unknown[], problems[] }.
 */
export function decide({ exitCode, stdout, spawnError = null }) {
  if (spawnError) {
    return {
      code: EXIT_STRUCTURE_ERROR,
      clean: false,
      allowed: [],
      unknown: [],
      problems: [`npm audit could not be executed: ${spawnError.message}`],
    };
  }

  let ids;
  try {
    ids = collectAdvisoryIds(stdout);
  } catch (error) {
    return {
      code: EXIT_STRUCTURE_ERROR,
      clean: false,
      allowed: [],
      unknown: [],
      problems: [
        error instanceof AuditGateError ? error.message : `audit parse failed: ${error.message}`,
      ],
    };
  }

  const canonicalKeyByLowerId = new Map(
    [...ALLOWED_ADVISORIES.keys()].map((key) => [key.toLowerCase(), key]),
  );
  const allowed = [...ids]
    .filter((id) => canonicalKeyByLowerId.has(id.toLowerCase()))
    .map((id) => canonicalKeyByLowerId.get(id.toLowerCase()))
    .sort();
  const unknown = [...ids].filter((id) => !canonicalKeyByLowerId.has(id.toLowerCase())).sort();
  const problems = [];
  if (unknown.length > 0) {
    problems.push(
      `${unknown.length} advisory id(s) are NOT on the allow-list: ${unknown.join(', ')} — ` +
        'fix the dependency (preferred) or justify a deliberate, reviewed ALLOWED_ADVISORIES entry.',
    );
  }
  // Anti-neutering: nonzero exit with nothing allow-listable means the audit
  // command itself failed — an unread verdict is never a green verdict.
  if (exitCode !== 0 && ids.size === 0) {
    problems.push(
      `npm audit exited ${exitCode} while reporting ZERO advisories — the audit command failed; ` +
        'refusing to treat a broken audit as a clean one.',
    );
  }
  if (problems.length > 0) {
    return {
      code: unknown.length > 0 ? EXIT_VIOLATION : EXIT_STRUCTURE_ERROR,
      clean: false,
      allowed,
      unknown,
      problems,
    };
  }
  return { code: EXIT_OK, clean: exitCode === 0 && ids.size === 0, allowed, unknown, problems };
}

export function main() {
  const audit = runAudit();
  const verdict = decide(audit);

  for (const id of verdict.allowed) {
    const entry = ALLOWED_ADVISORIES.get(id);
    console.log(`audit-gate: ALLOWED ${id} (${entry.package}) — ${entry.justification}`);
  }
  for (const problem of verdict.problems) {
    console.error(`audit-gate: ${problem}`);
  }
  if (verdict.code === EXIT_OK) {
    console.log(
      verdict.clean
        ? 'audit-gate: PASS — npm audit clean (0 advisories, exit 0)'
        : `audit-gate: PASS — ${verdict.allowed.length} advisory id(s) reported, every one allow-listed (npm audit exit ${audit.exitCode})`,
    );
  }
  return verdict.code;
}

// Main guard: importing this module (test/audit-gate.test.mjs does) never execs
// an audit — only `node scripts/audit-gate.mjs` does.
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  process.exitCode = main();
}
