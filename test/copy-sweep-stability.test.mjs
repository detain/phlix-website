// Guard: tools/fix-copy-consistency.mjs sits at a FIXED POINT on the committed
// tree, and the P16 install-HTTPS residual detector is never weaker than the
// P16 sweep it reports on.
//
// Run with `npm run test:unit`, i.e. `node --test "test/**/*.test.mjs"`.
// (review w20 L9 — REVIEW-w20L9website.md, Major; laws 6/7 extended on the
//  w17 L7 reopen, same register.)
//
// WHY THIS FILE EXISTS
// --------------------
// The TW-092 register's proof sentence "idempotence proven by re-application"
// did not measure at tip 4b088316: `node tools/fix-copy-consistency.mjs
// --dry-run` reported "httpsClaimsCured": 1 and a LIVE run rewrote
// sites/swiss-modernist/download.html, corrupting the honest opt-in sentence
//
//   Pass <code>--domain</code> and <code>--admin-email</code> to
//   provision HTTPS in the same run.
//
// into "...to provision plain HTTP with optional HTTPS via --domain and
// --admin-email in the same run." — the flags sold as the way to get plain
// HTTP. Mechanism: the infinitive rescue was the single-whitespace lookbehind
// (?<!to\s); Prettier had wrapped "to" to a line end, so a newline plus the
// indent sat between it and "provision" and silently defeated the guard —
// exactly the class the tool's own header doctrine warns about ("matching is
// whitespace-tolerant because Prettier owns wrapping"). Compounding it, the
// residual detector could not see the pending cure: its https-verb arm listed
// four s-forms while the sweep cured the wider five-verb body with optional
// s, so the tool printed httpsResiduals: [] while counting 1 curable claim —
// weaker than the cure BY CONSTRUCTION.
//
// The forward fix makes both P16 guards whitespace-tolerant and builds the
// sweep and the detector from ONE shared verb body. This file is the stability
// pin the review prescribed, in the repo's teeth idiom (floors against
// vacuity, planted offenders convict, honest shapes acquit). Every law is
// labelled REGRESSION (red against the pre-fix tool) or CONTROL (green both
// sides, guarding the fix against over-blocking) exactly as
// test/copyright.test.mjs labels its characterization cases.
//
//   LAW 1 (tip fixed point) — REGRESSION. A --dry-run over the committed tree
//        must report ZERO on every mutating counter (every pass that changes
//        text increments one of them, so zero counters == zero writes) and an
//        empty httpsResiduals list, with a non-vacuity floor on filesScanned.
//        This is the reviewer's "dry-run-at-tip must print 0/0/[]", widened to
//        the whole fixed-point property.
//   LAW 2 (write-path fixed point) — REGRESSION. The tool's own input set,
//        re-globbed identically and cross-checked against filesScanned, is
//        copied to scratch and the tool is run LIVE over the copy: every file
//        must be byte-identical afterwards. The direct re-application proof
//        the register claimed but never measured at tip.
//   LAW 3 (wrap tolerance — the defect class) — REGRESSION. In a synthetic
//        tree, the Prettier-wrapped honest shapes ("to\n␣␣␣␣provision HTTPS"
//        and "optional HTTPS proxy\n␣␣␣with Let's Encrypt") must count zero
//        sweep matches and zero residuals, and the committed swiss-modernist
//        sentence itself is pinned byte-exact so the plant cannot rot away
//        from what it models.
//   LAW 4 (the sweep keeps its teeth) — CONTROL. Ten false claims, one per
//        verb form of the shared body (base and third-person provide/
//        provision/set up/configure/wire), must all be counted, then cured to
//        the canonical opt-in text by a live run, then stay cured. Widening
//        the lookbehinds must not have blinded the sweep.
//   LAW 5 (the residual wire is live) — CONTROL. A port clause no sweep may
//        touch ("on :80 / :9443") must convict the detector's port arm while
//        the sweep counts it zero, and the chip cure must clear its own arm:
//        the report is never decorative and never overreaches.
//   LAW 6 (one well — structural anti-regrowth) — REGRESSION. The tool's
//        source must build BOTH the sweep verb regex and the detector arm
//        from the shared HTTPS_VERB_BODY constant (referenced by both
//        constructions), and the two literals this cure deleted must never
//        regrow: the bare single-whitespace (?<!to\s) guard and the detector's
//        four-arm s-forms-only list.
//   LAW 7 (the w17 L7 shape families — reopen regression) — REGRESSION. The
//        ten survivors of the first re-cure — enumeration and adjective shapes
//        ("with automatic HTTPS via Let's Encrypt", "fully running/configured
//        … with HTTPS, X, and Y", ", HTTPS, and", ", HTTPS.", "HTTPS,
//        database, and systemd service … handled automatically") — must each
//        be counted, cured to the pinned post-cure grammar, and stay cured;
//        the adjudicated-honest guide copy ("fully installed, HTTPS-ready",
//        "including HTTPS provisioning", "to a running server with HTTPS")
//        must acquit both sweep and wire; and copy the narrow sweeps cannot
//        safely re-join (a 4+ item list, a non-systemd enumeration ending
//        "handled automatically") must be left untouched yet NAMED by the
//        https-fully / https-handled-wire arms — law 5's wire idiom.
//   LAW 7 EXTENDED (w17 L7 round 3 — RE-REVIEW-w17L7website.md): three further
//        survivors the re-cure vocabulary still could not see — the
//        enumeration-TAIL scheme claim ("…systemd service, and HTTPS in a
//        single command", no verb, no comma-item shape), the keyword-FREE
//        cert-provisioning claim ("…provisions Let's Encrypt certificate via
//        HAProxy", a sentence containing no HTTPS token at all, dodging every
//        HTTPS-keyed family), and cure-1's own doubled-optin splice artifact —
//        join the plants: the tail/cert shapes are report-only wires, the
//        doubled optin ships as one well collapsed by the sweep. The wires
//        carry sentence-scoped flag acquittal guards: conditional copy naming
//        --domain/--admin-email/--tls anywhere in its own sentence must stay
//        silent on BOTH sides of the claim, and the sentence-initial capital
//        infinitive "To provision HTTPS in the same run" (the loading-screen
//        block cure-1 mis-rewrote) must acquit sweep and detector alike.
//
// STATED BOUNDARIES (disclosed, not hidden): law 1 proves zero-COUNTER
// stability; laws 2/4 prove zero-WRITE stability on copies. A counter that
// fires yet writes nothing is impossible by construction (every replacement
// increments its counter), but a future pass that mutates WITHOUT counting
// would evade law 1 and be caught by law 2 — the two pins are deliberately
// independent. The synthetic trees carry no kit slug from COST_KITS and no
// roster/British carriers, so no other sweep can inflate the expectations.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { copyFileSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { dirname, join, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';
import { globSync } from 'glob';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const TOOL = join(ROOT, 'tools', 'fix-copy-consistency.mjs');

// Mirrors the tool's own file list EXACTLY (tools/fix-copy-consistency.mjs,
// the `let files = [...]` block) plus the tail-block carrier shared/
// content.json that lives outside the glob. Law 2 cross-checks this mirror
// against the tool's own filesScanned before trusting it.
const TOOL_GLOBS = [
  ...globSync('sites/**/*.html', { ignore: 'sites/*/reviews/**', cwd: ROOT }),
  ...globSync('sites/**/*.js', { cwd: ROOT }),
  ...globSync('brand-kits/*.js', { cwd: ROOT }),
  'brand_kit_schema.js',
  'index.html',
];
const TOOL_INPUTS = [...TOOL_GLOBS, 'shared/content.json'];

// Every JSON field whose non-zero value means a live run WOULD rewrite text.
// The miss/inventory lists (securityMisses, costCarrierMisses, britRosterNoMatch,
// releasesMisses, mobileCtaMisses, httpsResiduals) are report-shaped: misses
// may legitimately sit non-empty by the tool's report-never-invent law, so
// only httpsResiduals (an empty-by-construction promise, the card's own words
// "residual shapes are reported, never silently left") is pinned here too.
const MUTATING_COUNTERS = [
  'orthography',
  'oxfordComma',
  'titleSeparators',
  'securityLiInserted',
  'revoicedSwaps',
  'phrasesSwapped',
  'extendedSwaps',
  'rosterSwaps',
  'nearRosterSwaps',
  'nativesSwaps',
  'releasesPInserted',
  'costFooterAppends',
  'costKitJsAppends',
  'britRosterCures',
  'mobileCtaInserted',
  'secretKeyCured',
  'httpsClaimsCured',
  'httpsPortsCured',
];

function runTool(cwd, extraArgs) {
  const r = spawnSync(process.execPath, [TOOL, ...(extraArgs ?? [])], {
    cwd,
    encoding: 'utf8',
    maxBuffer: 32 * 1024 * 1024,
  });
  assert.equal(r.status, 0, `tool exited ${r.status} in ${cwd}: ${r.stderr}`);
  return JSON.parse(r.stdout);
}

function scratchTree() {
  const dir = mkdtempSync(join(tmpdir(), 'w20L9ff-synth-'));
  mkdirSync(join(dir, 'sites', 'synth'), { recursive: true });
  mkdirSync(join(dir, 'brand-kits'), { recursive: true });
  mkdirSync(join(dir, 'shared'), { recursive: true });
  writeFileSync(join(dir, 'index.html'), '<!doctype html><html><body><p>synthetic</p></body></html>\n');
  writeFileSync(join(dir, 'brand_kit_schema.js'), '// synthetic\n');
  writeFileSync(join(dir, 'brand-kits', 'synth.js'), '// synthetic\n');
  writeFileSync(join(dir, 'shared', 'content.json'), '{}\n');
  return dir;
}

function hashTree(dir, rels) {
  const map = new Map();
  for (const rel of rels) {
    map.set(rel, createHash('md5').update(readFileSync(join(dir, rel))).digest('hex'));
  }
  return map;
}

// ── LAW 1 ─────────────────────────────────────────────────────────────────────
test('law 1: the committed tree is the sweep tool`s fixed point (dry-run prints zeros)', () => {
  const report = runTool(ROOT, ['--dry-run']);
  assert.equal(report.dryRun, true, 'the tool ignored --dry-run');
  assert.ok(
    report.filesScanned >= 1400,
    `filesScanned ${report.filesScanned} below the 1400 floor (measured 1507 at the w20 L9 tip) — the sweep perimeter collapsed`,
  );
  const offenders = MUTATING_COUNTERS.filter((k) => {
    assert.ok(k in report, `counter ${k} vanished from the tool report — the JSON shape moved; re-derive this law`);
    return report[k] !== 0;
  });
  assert.deepEqual(
    offenders,
    [],
    `committed tree is NOT tool-stable: ${offenders.map((k) => `${k}=${report[k]}`).join(', ')} would be rewritten by a live run`,
  );
  assert.deepEqual(
    report.httpsResiduals,
    [],
    `httpsResiduals must be empty at a stable tip, got ${JSON.stringify(report.httpsResiduals)}`,
  );
});

// ── LAW 2 ─────────────────────────────────────────────────────────────────────
test('law 2: a LIVE run over a byte-copy of the whole swept input set writes nothing', () => {
  const report = runTool(ROOT, ['--dry-run']);
  assert.equal(
    TOOL_GLOBS.length,
    report.filesScanned,
    'this test`s input mirror no longer matches the tool`s file list (re-glob both sides identically or law 2 goes blind)',
  );
  const dir = scratchTree();
  try {
    for (const rel of TOOL_GLOBS) {
      const target = join(dir, rel);
      mkdirSync(dirname(target), { recursive: true });
      copyFileSync(join(ROOT, rel), target);
    }
    const before = hashTree(dir, TOOL_INPUTS);
    const live = runTool(dir);
    assert.equal(live.dryRun, false, 'the tool force-dry-ran in live mode');
    const after = hashTree(dir, TOOL_INPUTS);
    const moved = TOOL_INPUTS.filter((rel) => before.get(rel) !== after.get(rel));
    assert.deepEqual(
      moved,
      [],
      `live sweep rewrote ${moved.length} file(s) of the committed tree (${moved.slice(0, 5).join(', ')}) — the tool is not idempotent at tip`,
    );
  } finally {
    rmSync(dir, { recursive: true, force: true, maxRetries: 3 });
  }
});

// ── LAW 3 ─────────────────────────────────────────────────────────────────────
test('law 3: Prettier-wrapped honest opt-in shapes acquit the sweep and the detector (the defect class)', () => {
  // The committed sentence, byte-pinned so the plants below stay faithful to
  // what the tip actually ships.
  const swiss = readFileSync(join(ROOT, 'sites', 'swiss-modernist', 'download.html'), 'utf8');
  assert.ok(
    swiss.includes(
      'Pass <code>--domain</code> and <code>--admin-email</code> to\n            provision HTTPS in the same run.',
    ),
    'the swiss-modernist sentence the review convicted (wrapped "to provision HTTPS") moved — re-derive the plant below',
  );
  // Round 3: the loading-screen "Provision HTTPS" block restored to the honest
  // capital-infinitive sentence cure-1's case-sensitive lookbehind mis-rewrote.
  // Byte-pinned the same way the swiss sentence is, so the plant below cannot
  // rot away from what it models.
  const loading = readFileSync(join(ROOT, 'sites', 'loading-screen', 'download.html'), 'utf8');
  assert.ok(
    loading.includes('<h3>Provision HTTPS</h3>'),
    'the loading-screen "Provision HTTPS" block moved — re-derive the capital-infinitive plant below',
  );
  assert.ok(
    /To\s+provision\s+HTTPS\s+in\s+the\s+same\s+run:/.test(loading),
    'the loading-screen sentence is NOT the restored honest "To provision HTTPS in the same run:" — the capital infinitive was re-mangled',
  );

  const dir = scratchTree();
  try {
    writeFileSync(
      join(dir, 'sites', 'synth', 'wrapped-honest.html'),
      [
        '<!doctype html><html><body>',
        // The exact tip shape: "to" wrapped to the line end, 12-space indent.
        '<p class="code-caption">Pass <code>--domain</code> and <code>--admin-email</code> to',
        '            provision HTTPS in the same run.</p>',
        // The same wrap class on the proxy lookbehind: "proxy" wrapped away
        // from "with Let's Encrypt".
        '<p>The kit offers an optional HTTPS proxy',
        "   with Let's Encrypt only when you add the flags.</p>",
        // Unwrapped controls (case law predates this cure): the infinitive and
        // the proxy tail must ALSO acquit — a fix that over-blocks would pass
        // the plants above for the wrong reason.
        '<p>Pass both flags to provision HTTPS in the same run.</p>',
        "<p>Plain HTTP first; the box can run an optional HTTPS proxy with Let's Encrypt.</p>",
        // Round 3 (the loading-screen defect): sentence-initial CAPITAL "To"
        // infinitive — the case-sensitive guard (?<!to\s*) did not exempt it
        // and cure-1 rewrote the honest instructional line. Must acquit.
        '<h3>Provision HTTPS</h3>',
        '<p>To provision HTTPS in the same run:</p>',
        '</body></html>\n',
      ].join('\n'),
    );
    const report = runTool(dir, ['--dry-run']);
    assert.equal(
      report.httpsClaimsCured,
      0,
      `wrapped honest copy re-cured (httpsClaimsCured=${report.httpsClaimsCured}) — the whitespace-tolerant guards regressed`,
    );
    assert.equal(report.httpsPortsCured, 0, 'port sweeps fired on honest copy');
    assert.deepEqual(report.httpsResiduals, [], 'the detector convicted honest copy');
  } finally {
    rmSync(dir, { recursive: true, force: true, maxRetries: 3 });
  }
});

// ── LAW 4 ─────────────────────────────────────────────────────────────────────
const FALSE_CLAIMS = [
  'These scripts provide HTTPS by default.',
  'The installer provides HTTPS out of the box.',
  'These runs provision HTTPS automatically.',
  'The panel provisions HTTPS for you.',
  'They set up HTTPS on the box.',
  'The wizard sets up HTTPS at runtime.',
  'Some admins configure HTTPS manually.',
  'The script configures HTTPS silently.',
  'Many guides wire HTTPS into the stack.',
  'The kit wires HTTPS in.',
];

test('law 4: every verb form of the shared body is counted, cured, and stays cured (teeth control)', () => {
  const dir = scratchTree();
  try {
    const file = join(dir, 'sites', 'synth', 'false-claims.html');
    writeFileSync(
      file,
      '<!doctype html><html><body>' +
        FALSE_CLAIMS.map((s) => `<p>${s}</p>`).join('\n') +
        '</body></html>\n',
    );
    const dry = runTool(dir, ['--dry-run']);
    assert.equal(
      dry.httpsClaimsCured,
      FALSE_CLAIMS.length,
      `expected exactly ${FALSE_CLAIMS.length} curable claims in the plant matrix, got ${dry.httpsClaimsCured} — the sweep went shape-blind on some verb form`,
    );
    const live = runTool(dir);
    assert.equal(live.httpsClaimsCured, FALSE_CLAIMS.length, 'live count drifted from dry count');
    const cured = readFileSync(file, 'utf8');
    const adjacency = /(?:provides?|provisions?|sets?\s+up|configures?|wires?)\s+(?:an?\s+)?HTTPS/g;
    assert.equal(
      (cured.match(adjacency) ?? []).length,
      0,
      'a verb+HTTPS adjacency survived the LIVE sweep',
    );
    assert.equal(
      (cured.match(/plain HTTP with optional HTTPS via --domain and --admin-email/g) ?? []).length,
      FALSE_CLAIMS.length,
      'the canonical opt-in replacement did not land once per planted claim',
    );
    const again = runTool(dir, ['--dry-run']);
    assert.equal(again.httpsClaimsCured, 0, 'the cured text re-matched its own cure (idempotence broken)');
    assert.equal(again.httpsPortsCured, 0, 'cured text trips a port sweep');
    assert.deepEqual(again.httpsResiduals, [], 'the cured tree still reports residuals');
  } finally {
    rmSync(dir, { recursive: true, force: true, maxRetries: 3 });
  }
});

// ── LAW 5 ─────────────────────────────────────────────────────────────────────
test('law 5: the residual detector is a live wire — the port arm convicts what no sweep touches', () => {
  const dir = scratchTree();
  try {
    writeFileSync(
      join(dir, 'sites', 'synth', 'residuals.html'),
      [
        '<!doctype html><html><body>',
        '<p>The page sits behind HAProxy on :80 / :9443 for legacy gadgets.</p>',
        '<p>Chip (behind HAProxy :80 / :443) renders in the hero.</p>',
        '</body></html>\n',
      ].join('\n'),
    );
    const dry = runTool(dir, ['--dry-run']);
    // The chip IS a swept shape: one ports cure, and its own residual arm is
    // silent post-cure. The :80 / :9443 clause matches no sweep (the sweep
    // demands :443) yet the detector must name it — reported, never silently
    // left.
    assert.equal(dry.httpsPortsCured, 1, 'the chip shape must be swept exactly once');
    assert.deepEqual(
      dry.httpsResiduals,
      ['sites/synth/residuals.html: port'],
      `detector must report the uncured port clause once, got ${JSON.stringify(dry.httpsResiduals)}`,
    );
    const live = runTool(dir);
    assert.equal(live.httpsPortsCured, 1, 'live port count drifted from dry count');
    const after = runTool(dir, ['--dry-run']);
    assert.equal(after.httpsPortsCured, 0, 'the chip cure is not idempotent');
    assert.deepEqual(
      after.httpsResiduals,
      ['sites/synth/residuals.html: port'],
      'the port residual must survive (the tool reports it, it does not invent a cure)',
    );
  } finally {
    rmSync(dir, { recursive: true, force: true, maxRetries: 3 });
  }
});

// ── LAW 6 ─────────────────────────────────────────────────────────────────────
test('law 6: sweep and detector share one verb body; the single-whitespace guards never regrow', () => {
  const src = readFileSync(TOOL, 'utf8');
  // Count references in CODE only — docblocks may (and do) name the shared
  // constants in prose; a comment must never be able to satisfy the well.
  const code = src
    .split('\n')
    .filter((l) => !/^\s*(?:\/\/|\*|\/\*)/.test(l))
    .join('\n');
  assert.ok(
    /^const HTTPS_VERB_BODY = /m.test(src),
    'the shared verb-body constant vanished — the detector can go weaker than the sweep again',
  );
  for (const [name, uses] of [
    ['HTTPS_VERB_BODY', 2],
    ['HTTPS_TO_GUARD', 3],
    ['HTTPS_PROXY_GUARD', 2],
    ['HTTPS_ADJ_SHAPE', 2],
    ['HTTPS_FULLY_LEAD', 2],
    ['HTTPS_ENUM_MID_SHAPE', 2],
    ['HTTPS_ENUM_END_SHAPE', 2],
    ['HTTPS_HEAD_AUTO_SHAPE', 1],
    ['HTTPS_HANDLED_WIRE', 1],
    // Round 3 (RE-REVIEW-w17L7website.md): the tail-enum and cert wires each
    // ride on the shared sentence flag-acquittal guards (one well again), and
    // the doubled-optin shape feeds both a sweep arm and a residual arm.
    ['HTTPS_FLAG_HINT', 2],
    ['HTTPS_SENTENCE_NO_FLAGS_BEFORE', 2],
    ['HTTPS_SENTENCE_NO_FLAGS_AFTER', 2],
    ['HTTPS_TAIL_ENUM_WIRE', 1],
    ['HTTPS_CERT_SHAPE', 1],
    ['HTTPS_CERT_WIRE', 1],
    ['HTTPS_OPTIN_DUP_SHAPE', 2],
  ]) {
    assert.equal(
      (code.match(new RegExp(`\\b${name}\\b`, 'g')) ?? []).length,
      uses + 1,
      `${name} must appear exactly once as the definition plus ${uses} consuming constructions in code — the sweep/detector well was bypassed`,
    );
  }
  // Split-literal ban, the estate anti-regrowth idiom: the exact byte
  // sequences the cure deleted must not reappear anywhere in the tool.
  assert.ok(
    !src.includes(String.raw`(?<!to\s)`),
    'the single-whitespace infinitive guard regrew — the wrapped "to provision HTTPS" class reopens',
  );
  assert.ok(
    !src.includes(String.raw`optional\s+HTTPS\s+proxy\s)(`),
    'the single-whitespace proxy guard regrew',
  );
  assert.ok(
    !src.includes(String.raw`provides|provisions|sets\s+up|configures`),
    'the s-forms-only detector verb list regrew — the detector goes blind to base-form claims again',
  );
  assert.ok(
    !src.includes(String.raw`(?:fully\s+)?(?:running`),
    'the optional-"fully" lead regrew — the honest guide-scope shape (pastel "to a running server with HTTPS") would re-convict and law 1 would go red at tip',
  );
});

// ── LAW 7 ─────────────────────────────────────────────────────────────────────
// The w17 L7 reopen: the review proved ten false default-HTTPS occurrences
// survived the first sweep because they ride enumeration/adjective shapes the
// verb-tail vocabulary never covered. Each plant below mirrors one survivor
// byte-faithfully; the expected strings are the LIVE cure output the card
// shipped at sites/*/download.html + index.html (grammar pinned, not grepped).
const SHAPE_FALSE_CLAIMS = [
  // adjective family (bollywood-dreams meta, holographic-future og meta)
  [
    "<p>Runs with automatic HTTPS via Let's Encrypt out of the box.</p>",
    '<p>Runs with optional HTTPS via --domain and --admin-email out of the box.</p>',
  ],
  [
    "<meta name=\"description\" content=\"Phlix on your box: database, systemd service, and auto-provisioned HTTPS via Let's Encrypt.\">",
    '<meta name="description" content="Phlix on your box: database, systemd service, and optional HTTPS via --domain and --admin-email.">',
  ],
  // "fully" list family (autumn-harvest index, leaderboard-elite index)
  [
    '<p>One line gets you a fully running server with HTTPS, a database, and a systemd service.</p>',
    '<p>One line gets you a fully running server with a database and a systemd service.</p>',
  ],
  [
    '<p>One command gets you a fully configured media server with HTTPS, DLNA, and everything you need to start streaming.</p>',
    '<p>One command gets you a fully configured media server with DLNA and everything you need to start streaming.</p>',
  ],
  // enumeration families (autumn-harvest download metas x3; cybernetic-surge lead)
  [
    '<meta name="description" content="Free downloads for Phlix Media Server. Requirements: PHP 8.3+, MySQL, FFmpeg, HTTPS, and systemd — all at once.">',
    '<meta name="description" content="Free downloads for Phlix Media Server. Requirements: PHP 8.3+, MySQL, FFmpeg, and systemd — all at once.">',
  ],
  [
    '<p>The installer handles everything else — system packages, database, service, HTTPS.</p>',
    '<p>The installer handles everything else — system packages, database, service.</p>',
  ],
  // head-enumeration family (mid-century-modern download x2, both wordings)
  [
    '<p>Run one command. HTTPS, database, and systemd service are all handled automatically.</p>',
    '<p>Run one command. Database and systemd service are handled automatically.</p>',
  ],
  [
    '<p>One command. HTTPS, database, and systemd service handled automatically.</p>',
    '<p>One command. Database and systemd service are handled automatically.</p>',
  ],
  // round 3: cure-1's own splice artifact — the opt-in phrase doubled verbatim
  // in one sentence (leaderboard-elite download.html, written by the first
  // sweep's sequential cert-tail + verb arms). The dedup well collapses it.
  [
    '<p>Installs system packages, creates database, sets up systemd service, and configures plain HTTP with optional HTTPS via --domain and --admin-email with optional HTTPS via --domain and --admin-email.</p>',
    '<p>Installs system packages, creates database, sets up systemd service, and configures plain HTTP with optional HTTPS via --domain and --admin-email.</p>',
  ],
];

const SHAPE_HONEST_ACQUITTALS = [
  // desert-mirage index :365 (reviewer-adjudicated honest)
  '<p>One command gets you a fully installed, HTTPS-ready media server on any fresh Ubuntu box.</p>',
  // solarpunk-eden docs :120 (guide scope, reviewer-adjudicated honest)
  '<p>The Ubuntu and Debian install guide — including HTTPS provisioning, database setup, and reverse proxy notes.</p>',
  // pastel-dreamscape docs :199 (guide scope the narrow "fully" lead exists to acquit)
  '<p>Step-by-step install on Ubuntu or Debian — from a fresh host to a running server with HTTPS.</p>',
  // round 3: honest cert copy the sentence-scoped flag guards exist to spare —
  // the wilderness-trail infinitive, and both flag-position conditional shapes
  // (flags BEFORE the claim exercise the lookbehind, flags AFTER the lookahead).
  "<p>Adds <code>--domain</code> and <code>--admin-email</code> to provision a Let's Encrypt certificate in the same run.</p>",
  '<p>When you pass --domain and --admin-email, the installer provisions a Let\'s Encrypt certificate via HAProxy.</p>',
  '<p>The installer provisions a Let\'s Encrypt certificate in the same run when you add --domain and --admin-email.</p>',
];

const SHAPE_WIRE_CONVICTIONS = [
  // copy a safe narrow sweep cannot re-join: 4-item list. The https-fully arm
  // (lead + "HTTPS") outgrows the sweep and must name it — law 5 port idiom.
  '<p>One line gets you a fully running server with HTTPS, plugins, themes, docs, and remote access.</p>',
  // "handled automatically" on a NON-systemd enumeration: the narrow head-arm
  // is database-specific on purpose; the handled-wire catches the claim class.
  "<p>Run the setup. HTTPS, transcoding, and remote access are handled automatically.</p>",
  // round 3 survivor 1 (thunder-strike docs.html, byte-faithful incl. the
  // Prettier wrap): enumeration-TAIL scheme claim — HTTPS joins the list with
  // bare "and", no comma-item shape, no verb, no LE tail. No sweep may safely
  // re-join an arbitrary list, so the wire names it.
  '<p>One-line install on Ubuntu/Debian. System packages, database, systemd service, and\n                HTTPS in a single command.</p>',
  // round 3 survivor 2 (desert-mirage download.html, byte-faithful): cert
  // claim with NO HTTPS token anywhere in the sentence — every HTTPS-keyed
  // family was structurally blind to it. Flags absent from the sentence span,
  // so the cert wire convicts.
  "<p>Installs system packages, creates database, sets up systemd service, provisions Let's\n            Encrypt certificate via HAProxy.</p>",
];

test('law 7: the w17 L7 enum/adjective families cure to pinned grammar, honest guide copy acquits, and outgrowing shapes convict the wire (reopen regression)', () => {
  const dir = scratchTree();
  try {
    const falseFile = join(dir, 'sites', 'synth', 'shape-claims.html');
    writeFileSync(
      falseFile,
      '<!doctype html><html><body>\n' +
        SHAPE_FALSE_CLAIMS.map(([planted]) => planted).join('\n') +
        '\n</body></html>\n',
    );
    const dry = runTool(dir, ['--dry-run']);
    assert.equal(
      dry.httpsClaimsCured,
      SHAPE_FALSE_CLAIMS.length,
      `expected exactly ${SHAPE_FALSE_CLAIMS.length} curable shape claims, got ${dry.httpsClaimsCured} — a survivor family went shape-blind again`,
    );
    assert.deepEqual(dry.httpsResiduals, [], 'a curable shape reached the residual wire (arms must run on swept text)');
    const live = runTool(dir);
    assert.equal(live.httpsClaimsCured, SHAPE_FALSE_CLAIMS.length, 'live shape count drifted from dry count');
    const cured = readFileSync(falseFile, 'utf8');
    for (const [, expected] of SHAPE_FALSE_CLAIMS) {
      assert.ok(cured.includes(expected), `the live sweep did not land pinned grammar: ${expected}`);
    }
    const again = runTool(dir, ['--dry-run']);
    assert.equal(again.httpsClaimsCured, 0, 'a cured shape re-matched its own cure (idempotence broken)');
    assert.deepEqual(again.httpsResiduals, [], 'post-cure text still reports residuals');

    const honestFile = join(dir, 'sites', 'synth', 'honest-guide.html');
    writeFileSync(
      honestFile,
      '<!doctype html><html><body>\n' + SHAPE_HONEST_ACQUITTALS.join('\n') + '\n</body></html>\n',
    );
    const honest = runTool(dir, ['--dry-run']);
    assert.equal(honest.httpsClaimsCured, 0, 'the sweeps over-reached into adjudicated-honest guide copy');
    assert.deepEqual(honest.httpsResiduals, [], 'the wire convicted adjudicated-honest guide copy');

    const wireFile = join(dir, 'sites', 'synth', 'wire-convictions.html');
    writeFileSync(
      wireFile,
      '<!doctype html><html><body>\n' + SHAPE_WIRE_CONVICTIONS.join('\n') + '\n</body></html>\n',
    );
    const wire = runTool(dir, ['--dry-run']);
    assert.equal(
      wire.httpsClaimsCured,
      0,
      'a narrow sweep touched copy it cannot safely re-join — over-reach is the pastel over-block class',
    );
    assert.deepEqual(
      wire.httpsResiduals,
      [
        'sites/synth/wire-convictions.html: https-fully, https-handled-wire, https-tail-enum, https-cert',
      ],
      `the wire arms must name every outgrowing shape incl. the round-3 tail-enum/cert survivors, got ${JSON.stringify(wire.httpsResiduals)}`,
    );
    const before = hashTree(dir, ['sites/synth/wire-convictions.html']);
    const live2 = runTool(dir);
    assert.equal(live2.httpsClaimsCured, 0, 'the live run cured wire-only copy');
    const after = hashTree(dir, ['sites/synth/wire-convictions.html']);
    assert.equal(
      before.get('sites/synth/wire-convictions.html'),
      after.get('sites/synth/wire-convictions.html'),
      'the live run rewrote report-only wire copy — the detector is never a hidden second sweeper',
    );
  } finally {
    rmSync(dir, { recursive: true, force: true, maxRetries: 3 });
  }
});
