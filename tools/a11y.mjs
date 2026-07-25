#!/usr/bin/env node
// pa11y-ci wrapper that no-ops while there are no built pages.
// Reads .pa11yci.json if it exists, else builds a default URL list from
// sites that have an index.html.

import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { globSync } from 'glob';

const cfgPath = resolve(process.cwd(), '.pa11yci.json');
const indexPages = globSync('sites/**/index.html');

if (!existsSync(cfgPath) && indexPages.length === 0) {
  console.log('[a11y] no built pages and no .pa11yci.json — skipping');
  process.exit(0);
}

const args = existsSync(cfgPath) ? ['--config', '.pa11yci.json'] : indexPages;
const child = spawn('npx', ['--no-install', 'pa11y-ci', ...args], { stdio: 'inherit' });
child.on('exit', (code) => process.exit(code ?? 1));
