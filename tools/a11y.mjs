#!/usr/bin/env node
// pa11y-ci wrapper.
//
// ---------------------------------------------------------------------------
// Why the page list lives HERE and not in .pa11yci.json
// ---------------------------------------------------------------------------
// pa11y-ci passes `config.urls` straight through to puppeteer untouched
// (lib/pa11y-ci.js: `pa11y(url, config)`), so a JSON config can only ever hold
// fully-qualified URLs -- there is no such thing as a portable relative path in
// one. The config this repo used to carry therefore hardcoded
// `file:///home/sites/phlix/phlix-website/...`, which exists on exactly one
// machine and on no CI runner.
//
// Command-line arguments do not have that problem: pa11y-ci runs every argument
// through `protocolify`, which turns an existing relative path into an absolute
// `file://` URL on whatever machine is running. So the split is:
//
//   .pa11yci.json  -> behaviour only (chrome flags, concurrency, standard).
//                     Contains NO `urls` key, and test/a11y-gate.test.mjs fails
//                     if anyone adds one or reintroduces an absolute path.
//   this file      -> the page list, globbed fresh every run.
//
// pa11y-ci concatenates the two (`urls.concat(config.urls || [])`), so passing
// both `--config` and a list of paths is supported and is what we do.
//
// ---------------------------------------------------------------------------
// Two pa11y-ci landmines this file exists to keep stepped-around
// ---------------------------------------------------------------------------
// 1. `chromeLaunchConfig` MUST be nested under `defaults`. pa11y-ci calls
//    `pa11yCi(urls, config.defaults)` and reads `options.chromeLaunchConfig`
//    off that object, so a TOP-LEVEL `chromeLaunchConfig` is silently ignored.
//    That is why the old config's `--no-sandbox` never reached Chrome and the
//    gate died with "No usable sandbox!" even though the flag was right there.
//
// 2. `useIncognitoBrowserContext` must be false whenever concurrency > 1 AND
//    urls arrive as plain strings. In pa11y-ci's testRunner, a string url takes
//    the `config = options` branch -- the SHARED options object -- and then
//    assigns `config.browser`. With concurrency 4 the four in-flight tasks
//    overwrite each other's `options.browser` and their `finally` blocks close
//    a context another task is still using. Measured: 62 of 144 pages died with
//    "Protocol error (Target.closeTarget): No target with given id found" and
//    were never assessed at all. Setting it false shares one browser, which
//    removes the race entirely -- and made the run 3.6x faster (2m51s -> 47s).
//
// ---------------------------------------------------------------------------
// Exit-code policy
// ---------------------------------------------------------------------------
// pa11y-ci exits 0 (clean), 2 (pages have findings), or 1 (it blew up). Those
// mean very different things and must not be collapsed:
//
//   0 -> pass.
//   2 -> the known, pre-existing content debt (see A11Y_KNOWN_FINDINGS below).
//        Reported loudly, but does not fail the build.
//   * -> pa11y-ci itself failed to run. This FAILS, and is the whole point:
//        for months `npm run a11y` crashed on startup with
//        "TypeError: pify(...).bind is not a function" and the CI step was
//        blanket `continue-on-error: true`, so a total non-execution was
//        indistinguishable from a pass. Crashes are now fatal; findings are not.
//
// Set A11Y_STRICT=1 to fail on findings too, once the debt is paid down.

import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { globSync } from 'glob';

const CONFIG = '.pa11yci.json';
const PAGES = 'sites/**/index.html';

// Measured on 2026-08-07 at 023ed2b9: 842 findings (839 colour-contrast,
// 3 empty anchors) across 82 of 144 pages. Recorded so the number is a fact in
// the repo rather than something a reader has to run a 47s job to discover.
//
// It is APPROXIMATE on purpose. Three consecutive clean runs gave 842, 842 and
// 843 -- sites/desert-horizon reported 37 findings twice and 38 once -- while
// the page-level result (62/144 passing) was identical every time. So do not
// turn this into a `--threshold` ratchet: a hard bound at the exact figure
// would flake red roughly one run in three. If this is ever gated, gate it on
// the number of FAILING PAGES, which is stable, not on the finding count.
export const A11Y_KNOWN_FINDINGS = 842;

/**
 * Map pa11y-ci's exit code to this wrapper's exit code.
 *
 * Exported and pure so test/a11y-gate.test.mjs can assert the POLICY rather
 * than grep the source for `process.exit(1)`. That distinction is not
 * academic: the first version of this guard did grep, and a mutation that
 * turned the crash branch into `process.exit(0)` sailed through green,
 * because an unrelated `process.exit(1)` elsewhere in the file satisfied the
 * pattern. The regex was testing that a string existed, not that a crash
 * failed.
 *
 * @param {number|null} code    pa11y-ci's exit code
 * @param {boolean}     strict  A11Y_STRICT=1
 * @returns {{exit: number, kind: 'pass'|'findings'|'crash'}}
 */
export function classifyExit(code, strict = false) {
  if (code === 0) {
    return { exit: 0, kind: 'pass' };
  }
  if (code === 2) {
    return { exit: strict ? 2 : 0, kind: 'findings' };
  }
  return { exit: 1, kind: 'crash' };
}

function main() {
  const cfgPath = resolve(process.cwd(), CONFIG);
  const pages = globSync(PAGES).sort();

  // A gate that inspected zero pages passes every assertion it makes, so the
  // page count is printed on every exit path -- same reasoning as tools/lint.mjs.
  if (pages.length === 0) {
    console.log(`[a11y] pa11y-ci inspected 0 pages (no ${PAGES}) -> exit 0 (skipped)`);
    process.exit(0);
  }

  if (!existsSync(cfgPath)) {
    console.error(`[a11y] ${CONFIG} is missing -- refusing to run without chrome flags`);
    process.exit(1);
  }

  const child = spawn('npx', ['--no-install', 'pa11y-ci', '--config', CONFIG, ...pages], {
    stdio: 'inherit',
  });

  child.on('exit', (code, signal) => {
    const seen = code ?? `signal ${signal}`;
    console.log(`[a11y] pa11y-ci inspected ${pages.length} pages -> exit ${seen}`);

    const { exit, kind } = classifyExit(code, process.env.A11Y_STRICT === '1');

    if (kind === 'findings') {
      const msg =
        `[a11y] findings present. This is the known pre-existing debt ` +
        `(~${A11Y_KNOWN_FINDINGS} findings, almost all WCAG2AA colour contrast).`;
      if (exit === 0) {
        console.log(`${msg} Not failing the build; re-run with A11Y_STRICT=1 to gate on it.`);
      } else {
        console.error(`${msg} A11Y_STRICT=1 -> failing.`);
      }
    } else if (kind === 'crash') {
      console.error(
        `[a11y] pa11y-ci did not complete (exit ${seen}). ` +
          `This is a harness failure, not an accessibility finding -> failing.`,
      );
    }

    process.exit(exit);
  });
}

// Only run when invoked as a script, so the test can import classifyExit.
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main();
}
