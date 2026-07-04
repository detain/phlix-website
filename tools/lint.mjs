#!/usr/bin/env node
// Wrapper: skip a linter with a friendly message when no files match.
// Without this, htmlhint is the only tool that returns 0 on empty matches;
// stylelint, eslint, and linkinator all exit non-zero, which would fail CI
// while the variant directories are still empty placeholders.

import { spawn } from 'node:child_process';
import { globSync } from 'glob';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const [, , tool, ...rest] = process.argv;
if (!tool) {
  console.error('Usage: tools/lint.mjs <html|css|js|links>');
  process.exit(64);
}

const targets = {
  html: { bin: 'htmlhint', patterns: ['variants/**/*.html', 'sites/**/*.html'] },
  css:  { bin: 'stylelint', patterns: ['variants/**/*.css', 'sites/**/*.css'] },
  js:   { bin: 'eslint',    patterns: ['variants/**/*.js', 'sites/**/*.js', 'tools/**/*.mjs'] },
  links:{ bin: 'linkinator', patterns: ['variants/**/*.html', 'sites/**/*.html'], extraArgs: ['--silent'] },
  'format-check': { bin: 'prettier', patterns: ['variants/**/*.html', 'variants/**/*.css', 'variants/**/*.js', 'sites/**/*.html', 'sites/**/*.css', 'sites/**/*.js', 'shared/**/*.json', 'docs/**/*.md'], extraArgs: ['--check'] },
  format:         { bin: 'prettier', patterns: ['variants/**/*.html', 'variants/**/*.css', 'variants/**/*.js', 'sites/**/*.html', 'sites/**/*.css', 'sites/**/*.js', 'shared/**/*.json', 'docs/**/*.md'], extraArgs: ['--write'] },
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
