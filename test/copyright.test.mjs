// Tests for the copyright-header injection helpers in scripts/lib/copyright.mjs.
//
// Run with `npm run test:unit`, i.e. `node --test 'test/**/*.test.mjs'`. This
// uses node:test and node:assert from the standard library — no new dependency.
// package.json already pins `engines.node >= 24`, where node:test is stable.
// (The glob is quoted so node, not the shell, expands it. Note that the
// directory form `node --test test/` does NOT work on Node 24: it resolves the
// path as a module entry and dies with MODULE_NOT_FOUND.)
//
// Root cause of the defect these guard (fixed in the accompanying change):
// injectCssComment() used to scan for the LAST line containing `*/` in the WHOLE
// file — a loop with no `break`, keeping the highest matching index — instead of
// the terminator of the file's OWN opening comment block. Every site stylesheet
// here is full of later `/* ... */` comments (section banners,
// `/* stylelint-disable ... */` pragmas, and the `/* vendor-fonts:begin */` /
// `/* vendor-fonts:end */` machine markers written by tools/vendor-fonts.mjs), so
// the `* @copyright` line got dropped on whatever comment closed last, as a
// naked, delimiter-less line in the middle of the stylesheet.
//
// This was live-reachable. scripts/add-copyright.mjs discovers site CSS through
// a hand-rolled readdirSync loop over sites/<slug>/css/, NOT through walk() — so
// the "CSS_EXT is unused, therefore the CSS path is dead" reading is wrong;
// CSS_EXT was unused, but the CSS path runs. Measured against this repo's own
// sites/afrofuturism/css/base.css with its existing @copyright line stripped
// (i.e. exactly what a newly scaffolded site's CSS looks like): the pre-fix
// script put the line at 325, immediately before `/* vendor-fonts:end */`, and
// postcss then failed outright — "Unknown word *" at line 325 — so the entire
// stylesheet became unparseable and `npm run lint:css` would go red. The same
// defect shipped in phlix-tokens commit 9ec4298, destroyed 4 design tokens plus
// an entire `.eyebrow` rule, and reached the published npm tarball.
//
// All 151 tracked CSS files are clean TODAY only because every one of them
// already carries the marker, so the whole-content pre-check short-circuits
// before injectCssComment() runs. Any newly scaffolded site would have been
// corrupted.
//
// NOT every case below discriminates against the pre-fix code, and they are
// labelled so the distinction survives. Each label is derived from ONE MEASURED
// signature — the result of running THIS test body, unmodified, against the
// pre-fix implementation extracted from git (scripts/add-copyright.mjs at the
// commit before this change, truncated at its `// ---- Main ----` marker so it
// has no side effects, plus the MARKER const the old file inlined as a literal).
// Every label is mechanically checkable against that run, not a matter of
// judgement:
//
//   REGRESSION (pre-fix) — FAILS against the pre-fix implementation, PASSES now.
//                          These are the real regression guards.
//   GUARD (ported logic) — PASSES against the pre-fix implementation too. The
//                          pre-fix code got these right, or right by accident
//                          (its duplicate guard was widened as a side effect of
//                          scanning to the LAST `*/`, and its scan began at line
//                          1 so it never mis-closed a degenerate `/*/` opener).
//                          Kept because the ported implementation could
//                          plausibly break them; do NOT mistake them for guards
//                          against the shipped bug.
//   CHARACTERIZATION     — PASSES against both. Documents intended behaviour
//                          without discriminating between implementations.
//
// This is a pure-function test: it imports from scripts/lib/copyright.mjs, which
// reads no files, writes no files and walks no directories, so importing it can
// never touch the tree. The walking CLI lives in scripts/add-copyright.mjs and is
// deliberately NOT imported here.

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import {
  injectCssComment,
  prependCssComment,
  prependJsDocblock,
  COPYRIGHT,
  MARKER,
} from '../scripts/lib/copyright.mjs';

const BOM = String.fromCharCode(0xfeff);

// Mirrors scripts/add-copyright.mjs::processCssFile — the whole-content marker
// pre-check plus the inject-or-prepend dispatch.
function process_(content) {
  if (content.includes(MARKER)) return null;
  return injectCssComment(content) ?? prependCssComment(content);
}

// Strip every well-formed block comment. CSS comments do not nest and have no
// string escaping, so a non-greedy strip is exact — whatever @copyright text
// survives this was emitted OUTSIDE a comment, which is the corruption shape.
function stripComments(css) {
  return css.replace(/\/\*[\s\S]*?\*\//g, '');
}

describe('injectCssComment (CSS copyright injection)', () => {
  // REGRESSION (pre-fix) — the exact shape of this repo's site stylesheets: a
  // banner-style opening comment, a stylelint pragma, section banners, and the
  // vendor-fonts machine markers last.
  it('inserts inside the OPENING comment, not the last comment in the file', () => {
    const input = [
      '/* ============================================================================',
      ' * base.css — Afrofuturism Brand Kit',
      ' * Tokens: colors, spacing, radii, shadows, fonts',
      ' * ============================================================================ */',
      '',
      '/* stylelint-disable declaration-block-single-line-max-declarations */',
      '',
      ':root {',
      '  --color-bg: #0b0b0f;',
      '  --color-ink: #f5f2ea;',
      '}',
      '',
      '/* vendor-fonts:begin — generated by tools/vendor-fonts.mjs; do not edit by hand */',
      '@font-face {',
      "  font-family: 'Nunito';",
      '}',
      '/* vendor-fonts:end */',
      '',
    ].join('\n');

    const result = process_(input);
    const lines = result.split('\n');
    const copyIdx = lines.findIndex((l) => l.includes('@copyright'));

    // Landed inside the opening banner comment, before its terminator.
    assert.ok(copyIdx > 0, 'copyright line must exist and not be line 0');
    const openerCloseIdx = lines.findIndex((l) => l.includes('==== */'));
    assert.ok(copyIdx < openerCloseIdx, `copyright at ${copyIdx} must precede opener close at ${openerCloseIdx}`);

    // The pre-fix code dropped it immediately before the LAST comment in the
    // file, which here is the vendor-fonts end marker.
    const endMarkerIdx = lines.findIndex((l) => l.includes('vendor-fonts:end'));
    assert.ok(!lines[endMarkerIdx - 1].includes('@copyright'));

    // Nothing swallowed: every comment and declaration survives verbatim.
    assert.ok(result.includes('/* vendor-fonts:begin — generated by tools/vendor-fonts.mjs; do not edit by hand */'));
    assert.ok(result.includes('/* vendor-fonts:end */'));
    assert.ok(result.includes('/* stylelint-disable declaration-block-single-line-max-declarations */'));
    assert.ok(lines.includes('  --color-bg: #0b0b0f;'));
    assert.ok(lines.includes('  --color-ink: #f5f2ea;'));
  });

  // REGRESSION (pre-fix) — the corruption signature itself: a `* @copyright`
  // line with no enclosing `/* */`. That is what made postcss fail with
  // "Unknown word *", taking the whole stylesheet with it.
  it('never emits a naked @copyright line outside a comment', () => {
    const input = [
      '/* theme.css — tokens',
      '   typography roles, layout containers */',
      ':root {',
      '  --radius-sm: 6px;     /* badges, ticks */',
      '  --radius-md: 10px;    /* buttons, inputs */',
      '  --radius-pill: 9999px;',
      '}',
      '',
      '/* ── Reduced motion ── */',
      '@media (prefers-reduced-motion: reduce) {',
      '  * { animation-duration: 0.01ms !important; }',
      '}',
      '',
    ].join('\n');

    const result = process_(input);

    assert.ok(!stripComments(result).includes('@copyright'), 'no @copyright may survive comment stripping');

    // Each declaration (with its inline trailing comment) survives intact.
    const lines = result.split('\n');
    assert.ok(lines.includes('  --radius-sm: 6px;     /* badges, ticks */'));
    assert.ok(lines.includes('  --radius-md: 10px;    /* buttons, inputs */'));
    assert.ok(lines.includes('  --radius-pill: 9999px;'));

    // And it landed before the first rule, i.e. inside the opening comment.
    const copyIdx = lines.findIndex((l) => l.includes('@copyright'));
    assert.ok(copyIdx > -1);
    assert.ok(copyIdx < lines.indexOf(':root {'));
  });

  // REGRESSION (pre-fix) — a single-line opening comment. The pre-fix loop began
  // at line 1, so it skipped the opener's own terminator and latched onto a later
  // comment, injecting mid-file.
  it('expands a single-line `/* */` opening comment instead of injecting mid-file', () => {
    const input = [
      '/* nojs.css — no-JavaScript fallbacks */',
      '.nojs-banner {',
      '  display: block;',
      '}',
      '',
      '/* a later annotation comment */',
      '.foo {',
      '  color: red;',
      '}',
      '',
    ].join('\n');

    const result = process_(input);
    const lines = result.split('\n');
    const copyIdx = lines.findIndex((l) => l.includes('@copyright'));

    assert.ok(copyIdx > -1);
    assert.ok(copyIdx < lines.indexOf('.nojs-banner {'));
    assert.ok(!stripComments(result).includes('@copyright'));

    // The later annotation and both rules are untouched.
    assert.ok(result.includes('/* a later annotation comment */'));
    assert.ok(result.includes('  display: block;'));
    assert.ok(result.includes('  color: red;'));
  });

  // REGRESSION (pre-fix) — an injected line must adopt the file's own EOL. The
  // pre-fix implementation had no EOL-preservation logic at all, so it spliced a
  // bare-LF line into an otherwise CRLF file. .prettierrc.json pins
  // `endOfLine: "lf"` and prettier --check covers the site CSS, so a stray CR is
  // a lint failure as well as a correctness one.
  it('preserves CRLF line endings on the lines it injects', () => {
    const hasOnlyCrlf = (s) => !/(^|[^\r])\n/.test(s);

    // Multi-line opening comment → the "insert before the closer" branch.
    const multi = ['/*', ' * hdr', ' *', ' */', '', '.a { color: red; }', ''].join('\r\n');
    const multiOut = process_(multi);
    assert.ok(multiOut.includes('@copyright'));
    assert.ok(hasOnlyCrlf(multiOut), 'multi-line branch must stay pure CRLF');
    assert.ok(multiOut.includes(COPYRIGHT + '\r\n'));

    // Single-line opening comment → the "expand into a block" branch.
    const single = ['/* hdr */', '.a { color: red; }', ''].join('\r\n');
    const singleOut = process_(single);
    assert.ok(singleOut.includes('@copyright'));
    assert.ok(hasOnlyCrlf(singleOut), 'single-line branch must stay pure CRLF');

    // No opening comment at all → the prepend branch.
    const bare = ['.a { color: red; }', ''].join('\r\n');
    const bareOut = process_(bare);
    assert.ok(bareOut.includes('@copyright'));
    assert.ok(hasOnlyCrlf(bareOut), 'prepend branch must stay pure CRLF');

    // LF files stay pure LF — the CR is adopted from the input, never added.
    const lf = ['/*', ' * hdr', ' *', ' */', '', '.a { color: red; }', ''].join('\n');
    assert.ok(!process_(lf).includes('\r'));
  });

  // REGRESSION (pre-fix) — a leading UTF-8 BOM must stay at byte 0. The pre-fix
  // prependCssComment() emitted its header IN FRONT of the BOM, stranding U+FEFF
  // mid-file right before the first selector, which postcss then reads as part of
  // that selector — silent rule loss, the same failure class as the naked line.
  it('keeps a leading BOM at the very start of the file, not before the header', () => {
    const input = BOM + ['.a { color: red; }', ''].join('\n');

    const result = process_(input);

    assert.equal(result.charCodeAt(0), 0xfeff);
    assert.equal(result.indexOf(BOM, 1), -1, 'BOM must appear exactly once, at byte 0');
    assert.ok(result.slice(1).startsWith('/*'));
    assert.ok(result.includes('.a { color: red; }'));
  });

  // GUARD (ported logic) — a degenerate `/*/` first line SHARES its `*` between
  // the opener and the apparent closer (`'/*/'.indexOf('*/') === 1`). Treating
  // index 1 as the terminator would split the line into a bare `/` plus a stray
  // ` */`, destroying a source character. The ported scan starts at `openAt + 2`
  // to avoid that. The pre-fix code never hit this because its scan began at
  // line 1.
  it('does not corrupt a degenerate `/*/` first line — falls back to prepending', () => {
    const input = ['/*/', '.a { color: red; }', ''].join('\n');

    // There is no terminator for the opening comment, so injection declines.
    assert.equal(injectCssComment(input), null);

    const result = process_(input);
    const lines = result.split('\n');

    // The input survives verbatim after a freshly prepended header.
    assert.ok(result.endsWith(input));
    assert.ok(result.includes('/*/'));

    // Well-formed prepended block, and no line reduced to a bare `/`.
    assert.equal(lines[0], '/*');
    assert.equal(
      lines.findIndex((l) => l.includes('@copyright')),
      1,
    );
    assert.equal(lines[2], ' */');
    assert.ok(!lines.includes('/'));
  });

  // GUARD (ported logic) — the exported function's duplicate guard covers the
  // WHOLE content, not just the opening block, so a standalone caller cannot
  // inject a SECOND copyright into a file that already has one further down.
  it('refuses a file whose existing copyright sits outside the opening block', () => {
    const input = ['/*', ' * hdr', ' */', '.a { color: red; }', '/* ' + COPYRIGHT.trim() + ' */', ''].join('\n');

    // Called directly — process_()'s own whole-content pre-check would mask a
    // narrowed guard inside injectCssComment().
    assert.equal(injectCssComment(input), null);
    assert.equal((input.match(/@copyright/g) || []).length, 1);
  });

  // CHARACTERIZATION — no leading comment at all → prepend a fresh header.
  it('prepends a fresh header when the file has no leading comment at all', () => {
    const input = ['.nojs-banner {', '  display: block;', '}', ''].join('\n');

    const result = process_(input);
    const lines = result.split('\n');

    assert.equal(lines[0], '/*');
    assert.ok(lines.some((l) => l.includes('@copyright')));
    assert.ok(result.includes('.nojs-banner {'));
    assert.ok(result.includes('  display: block;'));
  });

  // CHARACTERIZATION — idempotency, the property the CLI's "re-run produces zero
  // diff" promise rests on. All 251 files the injector walks are already stamped,
  // so this is the property that keeps a re-run from touching them.
  it('is idempotent: a file that already has the copyright is left alone', () => {
    const input = ['/*', ' * already has it', ' *', COPYRIGHT, ' */', '', '.a { color: red; }', ''].join('\n');

    assert.equal(process_(input), null);
    assert.equal(injectCssComment(input), null);
  });
});

describe('prependJsDocblock (JS copyright injection — BOM handling)', () => {
  // REGRESSION (pre-fix) — same root cause as the CSS BOM case:
  // prependJsDocblock() used to emit its fresh docblock IN FRONT of a leading
  // BOM. Lower-stakes than the CSS path (U+FEFF is ECMAScript WhiteSpace, so a
  // relocated BOM is benign to node) but the same bug in the same family.
  it('keeps a leading BOM at byte 0, with the docblock landing after it', () => {
    const input = BOM + 'export const kit = {};\n';

    const result = prependJsDocblock(input);

    assert.equal(result.charCodeAt(0), 0xfeff);
    assert.equal(result.indexOf(BOM, 1), -1);
    assert.ok(result.slice(1).startsWith('/**'));
    assert.ok(result.includes(COPYRIGHT));
    assert.ok(result.includes('export const kit = {};'));
  });

  // REGRESSION (pre-fix) — the shebang path, which the BOM fix changes most:
  // pre-fix, `isShebang(BOM + '#!...')` was false (the BOM defeats
  // startsWith('#!')), so the docblock was spliced in FRONT of the shebang,
  // demoting it off byte 0 where alone it is honoured.
  it('keeps a shebang at line 0 when a leading BOM is present, docblock after both', () => {
    const input = BOM + '#!/usr/bin/env node\nexport const kit = {};\n';

    const result = prependJsDocblock(input);

    assert.equal(result.charCodeAt(0), 0xfeff);
    assert.equal(result.indexOf(BOM, 1), -1);
    assert.equal(result.slice(1).split('\n')[0], '#!/usr/bin/env node');
    assert.ok(result.indexOf('/**') > result.indexOf('#!/usr/bin/env node'));
    assert.ok(result.includes(COPYRIGHT));
    assert.ok(result.includes('export const kit = {};'));
  });
});
