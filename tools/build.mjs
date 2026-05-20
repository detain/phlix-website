#!/usr/bin/env node
// Static build: copy each variants/<NN>-*/ into dist/<NN>-*/ and emit a
// top-level dist/index.html that lists every variant.
//
// While the variant directories are still empty placeholders, the build
// still produces a deployable dist/ so GH Pages and the pages.yml workflow
// have something to publish. Each variant is listed with its current state
// (built / placeholder) so visitors can see progress.

import {
  cpSync,
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  statSync,
  writeFileSync,
} from 'node:fs';
import { join, resolve } from 'node:path';

const ROOT = process.cwd();
const SRC_VARIANTS = resolve(ROOT, 'variants');
const SRC_SHARED = resolve(ROOT, 'shared');
const DIST = resolve(ROOT, 'dist');

const brandKits = JSON.parse(readFileSync(resolve(SRC_SHARED, 'data/brand-kits.json'), 'utf8'));

rmSync(DIST, { recursive: true, force: true });
mkdirSync(DIST, { recursive: true });

const variantDirs = readdirSync(SRC_VARIANTS)
  .filter((name) => statSync(join(SRC_VARIANTS, name)).isDirectory())
  .sort();

const variantSummaries = variantDirs.map((slug) => {
  const src = join(SRC_VARIANTS, slug);
  const dst = join(DIST, slug);
  const hasIndex = existsSync(join(src, 'index.html'));
  if (hasIndex) {
    cpSync(src, dst, { recursive: true });
  } else {
    mkdirSync(dst, { recursive: true });
    writeFileSync(
      join(dst, 'index.html'),
      placeholderPage(slug, brandKits.variants?.[slug]),
      'utf8',
    );
  }
  return { slug, built: hasIndex, kit: brandKits.variants?.[slug] };
});

if (existsSync(resolve(SRC_SHARED, 'assets'))) {
  cpSync(resolve(SRC_SHARED, 'assets'), join(DIST, 'assets'), { recursive: true });
}

writeFileSync(join(DIST, 'index.html'), indexPage(variantSummaries), 'utf8');
writeFileSync(join(DIST, 'robots.txt'), 'User-agent: *\nAllow: /\n', 'utf8');

console.log(`[build] wrote ${variantSummaries.length} variant(s) + index → ${DIST}`);
for (const v of variantSummaries) {
  console.log(`  ${v.built ? '✓' : '·'} ${v.slug}${v.built ? '' : ' (placeholder)'}`);
}

function indexPage(variants) {
  const items = variants
    .map(
      (v) => `      <li>
        <a href="./${v.slug}/">${escapeHtml(v.kit?.name ?? v.slug)}</a>
        ${v.built ? '<span class="ok">built</span>' : '<span class="todo">placeholder</span>'}
        <p>${escapeHtml(v.kit?.personality?.join(' · ') ?? '')}</p>
      </li>`,
    )
    .join('\n');

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Phlix — design variant preview</title>
  <meta name="description" content="Preview index for the five Phlix website design variants.">
  <link rel="canonical" href="https://detain.github.io/phlix-website/">
  <style>
    :root { color-scheme: light dark; font: 16px/1.5 system-ui, sans-serif; }
    body { max-width: 50rem; margin: 2rem auto; padding: 0 1rem; }
    h1 { margin-top: 0; }
    ul { list-style: none; padding: 0; }
    li { border: 1px solid #ccc4; border-radius: 0.5rem; padding: 1rem; margin-bottom: 0.75rem; }
    a { font-weight: 600; text-decoration: none; }
    a:hover, a:focus { text-decoration: underline; }
    .ok { background: #1a3; color: #fff; font-size: 0.75rem; padding: 0.15rem 0.5rem; border-radius: 999px; margin-left: 0.5rem; }
    .todo { background: #777; color: #fff; font-size: 0.75rem; padding: 0.15rem 0.5rem; border-radius: 999px; margin-left: 0.5rem; }
    p { margin: 0.25rem 0 0; color: #666; font-size: 0.9rem; }
    footer { margin-top: 2rem; color: #777; font-size: 0.85rem; }
  </style>
</head>
<body>
  <h1>Phlix website — variant preview</h1>
  <p>Five brand-themed design variants of the Phlix marketing site. See
    <a href="https://github.com/detain/phlix-website">detain/phlix-website</a>
    for the source and build plan.</p>
  <ul>
${items}
  </ul>
  <footer>
    <p><a href="https://github.com/detain/phlix-server">phlix-server</a> ·
       <a href="https://detain.github.io/phlix-docs">phlix-docs</a> ·
       <a href="https://github.com/detain/phlix-hub">phlix-hub</a></p>
  </footer>
</body>
</html>
`;
}

function placeholderPage(slug, kit) {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${escapeHtml(kit?.name ?? slug)} — Phlix (placeholder)</title>
  <meta name="description" content="Placeholder page for the ${escapeHtml(slug)} variant of the Phlix website.">
  <style>
    body { font: 16px/1.5 system-ui, sans-serif; max-width: 40rem; margin: 4rem auto; padding: 0 1rem; }
    code { background: #0001; padding: 0.1rem 0.3rem; border-radius: 0.25rem; }
  </style>
</head>
<body>
  <h1>${escapeHtml(kit?.name ?? slug)}</h1>
  <p>This variant has not been built yet. See <code>docs/HANDOFF_PROMPT.md</code> for how to launch the builder pipeline.</p>
  <p><a href="../">← Back to variant index</a></p>
</body>
</html>
`;
}

function escapeHtml(s) {
  return String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
}
