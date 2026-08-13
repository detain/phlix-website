#!/usr/bin/env node
/**
 * tools/kit-inventory.mjs
 *
 * ONE loader for brand-kits/*.js, shared by every tool that walks the kit
 * corpus, so the "silently skip what will not load, then report a count of what
 * loaded" defect cannot be re-introduced in a third place.
 *
 * WHY THIS FILE EXISTS
 * --------------------
 * S278 fixed `tools/build.mjs`: it used to `console.warn` + `continue` past any
 * kit it could not import, and then print `${kitSummaries.length} brand kit(s)`
 * — the length of the list it had just finished filtering. 79 files on disk
 * became a perfectly self-consistent "76 brand kit(s), 76 built site(s)",
 * exit 0, for months, while three complete reviewed sites were never published.
 *
 * S281 found the SAME defect, byte for byte, in two more tools:
 *
 *   tools/preview-all.mjs  discoverKits() warned + continued on both the import
 *                          failure and the "no kit export" case, then announced
 *                          `${KITS.length} kit(s) discovered from brand-kits/*.js`
 *                          — again, a count of the survivors. It also returned
 *                          `[]` for a MISSING brand-kits/ directory and served a
 *                          cheerful empty index.
 *   tools/vendor-fonts.mjs loadKits() warned + continued on the import failure
 *                          and continued SILENTLY, with no message at all, on
 *                          the "no kit export" case.
 *
 * Two properties make a count here mean something, and both are needed:
 *
 *   1. The denominator is INDEPENDENT of the subject. A count taken from the
 *      brand-kits/ glob detects a kit that fails to LOAD, but it self-adjusts to
 *      a DELETION — 78 found / 78 loaded is exactly as internally consistent as
 *      76/76. So the glob is compared against brand-kits/expected-kits.json, a
 *      hand-maintained pin with deliberately no regeneration flag. A manifest a
 *      tool can rewrite from its own subject is not a pin.
 *   2. An EMPTY corpus FAILS. A gate that inspected zero files passes every
 *      assertion it makes and exits 0, which is the commonest way one of these
 *      checks quietly becomes a no-op. Zero kits is an error here, never a
 *      "nothing to do".
 *
 * tools/build.mjs keeps its own inline copy of this logic, pinned by
 * test/brand-kit-load.test.mjs; test/kit-inventory-gate.test.mjs asserts the two
 * agree on the same fixture, so the duplication cannot drift unnoticed.
 *
 * @copyright Copyright (c) 2026 Joe Huss <detain@interserver.net>
 * @license   MIT
 */

import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { basename, join } from 'node:path';
import { pathToFileURL } from 'node:url';

/** The pin filename, relative to the brand-kits directory. */
export const PIN_FILE = 'expected-kits.json';

/**
 * The kit-file filter, kept identical to tools/build.mjs. `.worklog.js` is
 * excluded because a kit's worklog sits beside it and is not a kit.
 */
export function isKitFile(name) {
  return name.endsWith('.js') && !name.endsWith('.worklog.js');
}

/** Thrown for every inventory problem, so a caller can report rather than stack-trace. */
export class KitInventoryError extends Error {
  constructor(message) {
    super(message);
    this.name = 'KitInventoryError';
  }
}

/**
 * Every brand-kits/*.js on disk, sorted.
 *
 * A missing directory and an empty directory are both ERRORS, not an empty
 * list. `return []` on a missing directory is what let preview-all.mjs report
 * "0 kit(s) discovered" and serve an empty index with exit 0.
 */
export function discoverKitFiles(kitsDir, tool = 'kit-inventory') {
  if (!existsSync(kitsDir)) {
    throw new KitInventoryError(
      `${tool}: brand kit directory does not exist: ${kitsDir}\n` +
        `  Refusing to report success on a corpus of zero kits.`,
    );
  }
  const files = readdirSync(kitsDir).filter(isKitFile).sort();
  if (files.length === 0) {
    throw new KitInventoryError(
      `${tool}: no brand kit files match ${kitsDir}/*.js — the corpus is EMPTY.\n` +
        `  A check that inspected zero kits passes every assertion it makes. ` +
        `Zero is a failure here, not a skip.`,
    );
  }
  return files;
}

/**
 * The independent denominator: brand-kits/expected-kits.json.
 *
 * Validated for internal consistency first, because a pin that says nothing
 * cannot fail anything: an absent/empty `kits` array would make every set
 * comparison below trivially satisfied.
 */
export function readPin(kitsDir, tool = 'kit-inventory') {
  const pinPath = join(kitsDir, PIN_FILE);
  if (!existsSync(pinPath)) {
    throw new KitInventoryError(
      `${tool}: ${PIN_FILE} is missing from ${kitsDir}.\n` +
        `  Without it the kit count is derived from the directory it is checking, ` +
        `which cannot detect a deletion.`,
    );
  }
  let pin;
  try {
    pin = JSON.parse(readFileSync(pinPath, 'utf8'));
  } catch (err) {
    throw new KitInventoryError(`${tool}: ${PIN_FILE} is not valid JSON — ${err.message}`);
  }
  if (!Array.isArray(pin.kits) || pin.kits.length === 0) {
    throw new KitInventoryError(`${tool}: ${PIN_FILE} has no non-empty "kits" array — the pin is vacuous`);
  }
  if (pin.kits.length !== pin.count) {
    throw new KitInventoryError(
      `${tool}: ${PIN_FILE} is internally inconsistent — ` +
        `"count" says ${pin.count} but "kits" lists ${pin.kits.length}`,
    );
  }
  return pin;
}

/**
 * Exact set comparison, both directions. Never a bare count and never a
 * substring: a rename is a deletion plus an addition, and against a count alone
 * the two cancel out to a clean pass.
 */
export function assertKitFilesMatchPin(kitFiles, pin, tool = 'kit-inventory') {
  const onDisk = new Set(kitFiles);
  const pinned = new Set(pin.kits);
  const missing = pin.kits.filter((f) => !onDisk.has(f));
  const unpinned = kitFiles.filter((f) => !pinned.has(f));
  if (!missing.length && !unpinned.length) return;

  const lines = [
    `${tool}: brand-kits/*.js does not match the pin in brand-kits/${PIN_FILE}`,
    `  pinned:  ${pin.kits.length}`,
    `  on disk: ${kitFiles.length}`,
  ];
  if (missing.length) lines.push(`  MISSING from disk (${missing.length}): ${missing.join(', ')}`);
  if (unpinned.length) lines.push(`  NOT in the pin (${unpinned.length}): ${unpinned.join(', ')}`);
  lines.push(`  If this change is intentional, update brand-kits/${PIN_FILE} ("kits" AND "count").`);
  throw new KitInventoryError(lines.join('\n'));
}

/**
 * Import every named kit file. Returns loaded kits AND failures — failures are
 * collected rather than thrown on first sight, so one run reports all of them.
 * Three separate red runs to find three broken kits is how they accumulate.
 */
export async function loadKitFiles(kitsDir, kitFiles) {
  const kits = [];
  const failures = [];
  for (const file of kitFiles) {
    let kit;
    try {
      const mod = await import(pathToFileURL(join(kitsDir, file)).href);
      kit = mod.default ?? mod.brandKit;
    } catch (err) {
      failures.push({ file, reason: `${err.constructor.name}: ${err.message}` });
      continue;
    }
    if (!kit || typeof kit !== 'object') {
      failures.push({
        file,
        reason:
          'no brand kit export — expected `export default <kit>` or `export { brandKit }`. ' +
          'This package is "type": "module", so `module.exports` / `window.X` export nothing.',
      });
      continue;
    }
    kits.push({ file, slug: kit.slug || basename(file, '.js'), name: kit.name || kit.slug || basename(file, '.js'), kit });
  }
  return { kits, failures };
}

/**
 * The full inventory, with every failure mode fatal. Callers get a corpus they
 * can trust or an exception naming exactly what is wrong.
 *
 * Returns `{ kitFiles, pin, kits, total, loaded, pinned }`.
 */
export async function kitInventory(kitsDir, tool = 'kit-inventory') {
  const kitFiles = discoverKitFiles(kitsDir, tool);
  const pin = readPin(kitsDir, tool);
  assertKitFilesMatchPin(kitFiles, pin, tool);

  const { kits, failures } = await loadKitFiles(kitsDir, kitFiles);

  // A kit that will not load is a FAILURE, not a warning. It means a site listed
  // in the README silently stops being published/previewed while the tool still
  // exits 0 and reports a number that agrees with itself.
  if (failures.length) {
    throw new KitInventoryError(
      [
        `${tool}: ${failures.length} of ${kitFiles.length} brand kit(s) in brand-kits/ could not be loaded:`,
        ...failures.map(({ file, reason }) => `  ✗ ${file}: ${reason}`),
        `Fix the kit(s) above, or remove them from brand-kits/ AND from brand-kits/${PIN_FILE}.`,
      ].join('\n'),
    );
  }

  // The invariant that keeps the reported number honest: one loaded kit per file
  // found on disk. `kitFiles.length` came from readdirSync and `kits.length` from
  // the import loop; they are COMPARED, neither is derived from the other.
  // Unreachable while `failures` is empty — which is the point. If a future edit
  // adds a third way to drop a kit, this is what catches it.
  if (kits.length !== kitFiles.length) {
    throw new KitInventoryError(
      `${tool}: kit accounting mismatch — ${kitFiles.length} kit file(s) on disk but ` +
        `${kits.length} loaded. A kit was dropped without being recorded as a failure.`,
    );
  }

  return {
    kitFiles,
    pin,
    kits,
    total: kitFiles.length,
    loaded: kits.length,
    pinned: pin.count,
  };
}

/**
 * The line every tool prints on EVERY run, success included.
 *
 * `79 / 79 (100%) brand kit(s) loaded — pinned: 79`
 *
 * A bare exit 0 does not distinguish a gate that checked the whole corpus from
 * one that checked nothing; the denominator does. Read this line, not the
 * absence of complaints.
 */
export function denominatorLine({ loaded, total, pinned }) {
  const pct = total === 0 ? 0 : Math.round((loaded / total) * 100);
  return `${loaded} / ${total} (${pct}%) brand kit(s) loaded — pinned: ${pinned}`;
}
