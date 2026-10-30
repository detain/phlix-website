#!/usr/bin/env node
/**
 * tools/fix-copy-consistency.mjs
 *
 * One-shot copy-consistency sweep for the W-min193 website minors batch
 * (minors-space IDs). Four passes, each measured before it fires:
 *
 *  P1 orthography (M-WEBSITE-24): British → US spellings in VISIBLE text
 *     only — HTML text runs, meta/title attribute values. Deliberately NOT
 *     renamed: CSS/HTML identifiers (e.g. pop-art-explosion's `footer-licence`
 *     class, 11 sites/*.css hits), tooling comments whose wording test/
 *     literals pin (tools/gen-*.mjs "rasterise" family). They are invisible
 *     to every reader of the shipped artifact.
 *  P2 Oxford comma (M-WEBSITE-27): the three-item license clause
 *     "…libraries, plugins and clients are MIT" → "…, plugins, and clients",
 *     in every shipped prefix form (SSOT "the shared libraries, …" plus the
 *     kit-voice re-casts swiss-modernist/apex-predator/psychedelic-groove
 *     carry), matching the already-correct SSOT sentence in
 *     shared/content.json. The two-item clause ("; plugins and clients are
 *     MIT" — obsidian-pulse) needs no serial comma and stays untouched.
 *  P3 title separator (M-WEBSITE-26): the 19 storm-chaser/thunder-strike/
 *     android-dreams pages whose <title> joined clauses with " | " while all
 *     1317 other titles use " — ".
 *  P4 security link (M-WEBSITE-23): inserts a footer <li> linking the
 *     documented disclosure policy
 *     https://detain.github.io/phlix-docs/security/vulnerability-disclosure.html
 *     (authority: phlix-docs docs/security/vulnerability-disclosure.md, live
 *     in the published dist) directly before each footer's License (MPL…) li.
 *     Pages with two <footer> blocks are matched on the one holding the
 *     License li (five kit index pages ship a decorative footer first).
 *
 * House doctrine (carved by tools/fix-license-facts.mjs PASS 2): matching is
 * whitespace-tolerant because Prettier owns wrapping and mid-sentence breaks
 * silently defeat single-line literals; every pass is idempotent; --dry-run
 * reports per-pass counts without writing. Run `npm run format` after
 * applying so inserted markup adopts each file's prettier shape.
 *
 *   node tools/fix-copy-consistency.mjs --dry-run
 *   node tools/fix-copy-consistency.mjs
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { globSync } from 'glob';

const DRY = process.argv.includes('--dry-run');

const SEC_URL =
  'https://detain.github.io/phlix-docs/security/vulnerability-disclosure.html';

// Explicit stem pairs; occurrence census (tip, shipped scope) drove the list.
const BRIT = [
  ['licence', 'license'],
  ['rasterise', 'rasterize'],
  ['behaviour', 'behavior'],
  ['theatre', 'theater'],
  ['colour', 'color'],
  ['favourite', 'favorite'],
  ['centre', 'center'],
];
function restyle(us, match) {
  if (/^[A-Z]{2,}$/.test(match)) return us.toUpperCase();
  if (/^[A-Z]/.test(match)) return us[0].toUpperCase() + us.slice(1);
  return us;
}

const VISIBLE_ATTRS = /\b(content|alt|title|aria-label|placeholder)="([^"]*)"/g;

function ortho(text) {
  let n = 0;
  for (const [uk, us] of BRIT) {
    const re = new RegExp(`\\b${uk}(?:s|d)?\\b`, 'gi');
    text = text.replace(re, (m) => {
      n++;
      const suffix = m.slice(m.toLowerCase().indexOf(uk) + uk.length);
      return restyle(us, m) + suffix;
    });
  }
  return [text, n];
}

// Text runs between tags. [^<>] spans newlines, so Prettier-wrapped copy is
// matched as one run (fix-license-facts PASS 2 lesson).
function sweepHtml(t) {
  let count = 0;
  t = t.replace(/>([^<>]+)</g, (_m, run, off) => {
    const [fixed, n] = ortho(run);
    count += n;
    return n ? `>${fixed}<` : _m;
  });
  t = t.replace(VISIBLE_ATTRS, (m, attr, val) => {
    const [fixed, n] = ortho(val);
    count += n;
    return n ? `${attr}="${fixed}"` : m;
  });
  return [t, count];
}

function sweepTitles(t) {
  let n = 0;
  t = t.replace(/<title>([^<]*)<\/title>/g, (m, inner) => {
    if (!inner.includes(' | ')) return m;
    n++;
    return `<title>${inner.replaceAll(' | ', ' — ')}</title>`;
  });
  return [t, n];
}

// The three-item license clause in all its shipped prefixes: SSOT form
// ("the shared libraries, …") plus the kit-voice re-casts "swiss-modernist"
// kept un-swept and apex-predator/psychedelic-groove carry. The two-item
// clause ("; plugins and clients are MIT" — obsidian-pulse) takes NO serial
// comma and is deliberately NOT matched: the pattern anchors on "libraries,".
const OXFORD = /libraries,\s+plugins\s+and\s+clients\s+are\s+MIT/gi;
function sweepOxford(t) {
  let n = 0;
  t = t.replace(OXFORD, (m) => {
    n++;
    return m.replace(/plugins\s+and\s+clients/, 'plugins, and clients');
  });
  return [t, n];
}

// Whole <footer> blocks only; insert before the li whose visible text starts
// at "Licen[cs]e (MPL" — bounded hop that cannot cross into a nested li.
// Shape 1 (1064+ files): <li ...> ... License ... </li>
// Shape 2 (root index.html, foot-links divs): bare <a> ... License ... </a>
const LIC_LI =
  /([ \t]*)(<li[ >](?:(?!<li[ >]|<\/li>)[\s\S]){0,300}?Licen[cs]e\s*\(MPL[\s\S]*?<\/li>)/;
const LIC_A =
  /([ \t]*)(<a(?:(?!<\/a>)[\s\S]){0,300}?Licen[cs]e\s*\(MPL[\s\S]*?<\/a\s*>)/;
function sweepSecurity(t) {
  if (t.includes('vulnerability-disclosure')) return [t, 0];
  // Five kit index pages (abstract-canvas, afrofuturism, bollywood-dreams,
  // marina-breeze, mid-century-modern) carry TWO <footer> blocks and the
  // License li lives in the second one — the first-footer match silently
  // skipped them. Pick the first footer that actually holds the license li.
  const blocks = [...t.matchAll(/<footer[\s\S]*?<\/footer>/g)].map((m) => m[0]);
  if (!blocks.length) return [t, -1]; // no footer at all
  const footer = blocks.find((b) => /Licen[cs]e\s*\(MPL/.test(b));
  if (!footer) return [t, -1];
  const lm = footer.match(LIC_LI);
  if (lm) {
    const indent = lm[1];
    const li =
      `${indent}<li>\n${indent}  <a href="${SEC_URL}" rel="noopener noreferrer">Security</a>\n${indent}</li>\n`;
    return [t.replace(footer, footer.replace(lm[0], li + lm[0])), 1];
  }
  const am = footer.match(LIC_A);
  if (am) {
    const indent = am[1];
    const a = `${indent}<a href="${SEC_URL}" rel="noopener noreferrer">Security</a>\n`;
    return [t.replace(footer, footer.replace(am[0], a + am[0])), 1];
  }
  return [t, -1];
}

let files = [
  ...globSync('sites/**/*.html', { ignore: 'sites/*/reviews/**' }),
  'index.html',
];
const counts = { ortho: 0, oxford: 0, titles: 0, secInserted: 0, secMiss: [] };
for (const f of files) {
  let t = readFileSync(f, 'utf8');
  const orig = t;
  let o;
  [t, o] = sweepHtml(t);
  counts.ortho += o;
  [t, o] = sweepTitles(t);
  counts.titles += o;
  [t, o] = sweepOxford(t);
  counts.oxford += o;
  [t, o] = sweepSecurity(t);
  if (o === 1) counts.secInserted++;
  else if (o === -1 && /Licen[cs]e\s*\(MPL/.test(t)) counts.secMiss.push(f);
  if (t !== orig && !DRY) writeFileSync(f, t);
}

// content.json is prettier-ignored; fix the one British word in its note.
{
  const f = 'shared/content.json';
  let t = readFileSync(f, 'utf8');
  const [fixed, n] = ortho(t);
  if (n && !DRY) writeFileSync(f, fixed);
  counts.ortho += n;
}

console.log(
  JSON.stringify(
    {
      dryRun: DRY,
      filesScanned: files.length,
      orthography: counts.ortho,
      oxfordComma: counts.oxford,
      titleSeparators: counts.titles,
      securityLiInserted: counts.secInserted,
      securityMisses: counts.secMiss,
    },
    null,
    2,
  ),
);
