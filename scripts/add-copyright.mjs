#!/usr/bin/env node
/**
 * add-copyright.mjs - Idempotent copyright-header injector for phlix-website.
 * Adds @copyright 2026 Joe Huss <detain@interserver.net> to brand-kit JS files,
 * per-site JS (main.js), and per-site CSS files.
 *
 * Re-run produces zero diff when all files already have the header.
 *
 * Usage: `node scripts/add-copyright.mjs` (run from the repo root — paths are
 * resolved against process.cwd()).
 *
 * This file is the CLI half only: walking, reading, writing, reporting. All of
 * the pure header-manipulation logic lives in ./lib/copyright.mjs so it can be
 * unit-tested (test/copyright.test.mjs, `npm run test:unit`) without importing
 * this file. That is why there is deliberately NO
 * `import.meta.url === pathToFileURL(process.argv[1]).href` main-guard here:
 * importing the library can never trigger the walk, and such a guard silently
 * evaluates false whenever the script is reached through a symlink
 * (pathToFileURL does not resolve symlinks, import.meta.url is the realpath),
 * which turns the entire run into a zero-output, exit-0 no-op.
 */

import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, extname, basename } from 'node:path';

import {
  injectCssComment,
  prependCssComment,
  injectJsDocblock,
  prependJsDocblock,
  MARKER,
} from './lib/copyright.mjs';

const EXCLUDE_DIRS = new Set(['node_modules', 'dist', 'vendor', '.git', 'coverage', '.github', 'img', 'docs']);
const EXCLUDE_FILES = new Set([]);
const JS_EXTS = new Set(['.js', '.mjs']);

function walk(dir, exts, files = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!EXCLUDE_DIRS.has(entry.name)) walk(full, exts, files);
    } else {
      const ext = extname(entry.name);
      const base = basename(entry.name);
      if (exts.has(ext) && !EXCLUDE_FILES.has(base)) {
        files.push(full);
      }
    }
  }
  return files;
}

function processJsFile(filepath) {
  const content = readFileSync(filepath, 'utf8');
  if (content.includes(MARKER)) return null;
  return injectJsDocblock(content) ?? prependJsDocblock(content);
}

function processCssFile(filepath) {
  const content = readFileSync(filepath, 'utf8');
  if (content.includes(MARKER)) return null;
  return injectCssComment(content) ?? prependCssComment(content);
}

// ---- Main ----
const ROOT = process.cwd();

// Collect files
const brandKitFiles = walk(join(ROOT, 'brand-kits'), JS_EXTS);

// For sites/*/js/main.js - only the main.js files
const siteJsFiles = [];
const sitesDir = join(ROOT, 'sites');
for (const entry of readdirSync(sitesDir, { withFileTypes: true })) {
  if (entry.isDirectory()) {
    const mainJsPath = join(sitesDir, entry.name, 'js', 'main.js');
    try {
      const content = readFileSync(mainJsPath, 'utf8');
      siteJsFiles.push({ path: mainJsPath, content });
    } catch {
      // skip
    }
  }
}

// For sites/*/css/*.css - all three CSS files per site
const siteCssFiles = [];
for (const entry of readdirSync(sitesDir, { withFileTypes: true })) {
  if (entry.isDirectory()) {
    const cssDir = join(sitesDir, entry.name, 'css');
    try {
      for (const cssEntry of readdirSync(cssDir, { withFileTypes: true })) {
        if (cssEntry.isFile() && cssEntry.name.endsWith('.css')) {
          const cssPath = join(cssDir, cssEntry.name);
          const content = readFileSync(cssPath, 'utf8');
          siteCssFiles.push({ path: cssPath, content });
        }
      }
    } catch {
      // skip
    }
  }
}

let changed = 0;
const touched = [];

console.log('Processing brand-kit JS files...');
for (const file of brandKitFiles) {
  const newContent = processJsFile(file);
  if (newContent !== null) {
    writeFileSync(file, newContent, 'utf8');
    changed++;
    touched.push(file);
    console.log('ADDED: ' + file);
  } else {
    console.log('SKIP:  ' + file);
  }
}

console.log('\nProcessing site JS files...');
for (const { path: file, content } of siteJsFiles) {
  const newContent = processJsFile(file);
  if (newContent !== null) {
    writeFileSync(file, newContent, 'utf8');
    changed++;
    touched.push(file);
    console.log('ADDED: ' + file);
  } else {
    console.log('SKIP:  ' + file);
  }
}

console.log('\nProcessing site CSS files...');
for (const { path: file } of siteCssFiles) {
  const newContent = processCssFile(file);
  if (newContent !== null) {
    writeFileSync(file, newContent, 'utf8');
    changed++;
    touched.push(file);
    console.log('ADDED: ' + file);
  } else {
    console.log('SKIP:  ' + file);
  }
}

console.log(`\nDone: ${changed} file(s) updated.`);
if (touched.length > 0) {
  console.log('\nTouched:');
  for (const f of touched) console.log('  ' + f);
}
