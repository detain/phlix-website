#!/usr/bin/env node
// Wrapper: skip a linter with a friendly message when no files match.
// Without this, htmlhint is the only tool that returns 0 on empty matches;
// stylelint, eslint, and linkinator all exit non-zero, which would fail CI
// when a target directory is empty (e.g. a fresh checkout with no built sites).
//
// Targets are the generated brand-kit sites (sites/<slug>/), the hand-authored
// root pages (index.html = the gallery template, 404.html = the Pages error
// shim), and tools/. The old `variants/**` patterns were dropped: that
// directory was deleted on 2026-06-30 and replaced by sites/<slug>/.

import { spawn } from 'node:child_process';
import { globSync } from 'glob';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const [, , tool, ...rest] = process.argv;
if (!tool) {
  console.error('Usage: tools/lint.mjs <html|css|js|links>');
  process.exit(64);
}

// Root *.html (index.html, 404.html) is linted and format-checked, but is
// deliberately NOT in the `links` target: both are build templates whose real
// links only exist after `npm run build` injects them (index.html renders its
// cards from window.__PHLIX_KITS__) and 404.html's no-JS link is the absolute
// Pages base path `/phlix-website/`, which resolves nowhere in the source tree.
// linkinator would report those as broken. Check dist/ instead if you want them.
const ROOT_HTML = ['*.html'];
const PRETTIER_PATTERNS = [
  ...ROOT_HTML,
  'sites/**/*.html',
  'sites/**/*.css',
  'sites/**/*.js',
  'shared/**/*.json',
  'docs/**/*.md',
];

const targets = {
  html: { bin: 'htmlhint', patterns: [...ROOT_HTML, 'sites/**/*.html'] },
  css:  { bin: 'stylelint', patterns: ['sites/**/*.css'] },
  js:   { bin: 'eslint',    patterns: ['sites/**/*.js', 'tools/**/*.mjs'] },
  links:{ bin: 'linkinator', patterns: ['sites/**/*.html'], extraArgs: ['--silent'] },
  'format-check': { bin: 'prettier', patterns: PRETTIER_PATTERNS, extraArgs: ['--check'] },
  format:         { bin: 'prettier', patterns: PRETTIER_PATTERNS, extraArgs: ['--write'] },
};

const t = targets[tool];
if (!t) {
  console.error(`Unknown lint tool: ${tool}`);
  process.exit(64);
}

const thisFile = fileURLToPath(import.meta.url);
const projectRoot = resolve(dirname(thisFile), '..');
const configPath = resolve(projectRoot, '.stylelintrc.json');

const files = t.patterns.flatMap((p) => globSync(p, { cwd: projectRoot })).filter(Boolean);

if (files.length === 0) {
  console.log(`[lint:${tool}] no files match ${t.patterns.join(', ')} — skipping`);
  process.exit(0);
}

const toolArgs = (tool === 'css')
  ? ['--config', configPath, ...(t.extraArgs ?? []), ...files, ...rest]
  : [...(t.extraArgs ?? []), ...files, ...rest];

const child = spawn('npx', ['--no-install', t.bin, ...toolArgs], { stdio: 'inherit', cwd: projectRoot });
child.on('exit', (code) => process.exit(code ?? 1));
