// Guard (WEB-S5 / WEB-3): command text in kit pages must survive HTML
// whitespace collapsing. Rejects a shell line-continuation backslash before a
// pipe ("\ |" flattens to a broken command) and run-on `git clone ... cd ...
// composer` text with no `&&` or newline-preserving <pre>.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', 'sites');
const pages = [];
for (const d of readdirSync(root, { withFileTypes: true })) {
  if (!d.isDirectory()) continue;
  for (const f of readdirSync(join(root, d.name))) {
    if (f.endsWith('.html')) pages.push(join(root, d.name, f));
  }
}

test('kit pages exist', () => {
  assert.ok(pages.length > 100 && existsSync(pages[0]));
});

test('no flattened "\\ |" continuation outside <pre>', () => {
  const bad = pages.filter((p) => {
    const rest = readFileSync(p, 'utf8').replace(/<pre[\s\S]*?<\/pre>/g, '');
    return /\\\s+\|/.test(rest);
  });
  assert.deepEqual(bad, []);
});

// A `git clone <url>` or `cd <dir>` immediately followed (no `&&`, `;` or
// newline) by another shell command word is a flattened run-on.
const RUN_ON =
  /\b(?:git\s+clone|cd)\s+[^\s&|;+]\S*\s+(?:cd|git|composer|npm|npx|php|make|docker|sudo|bash|sh|curl|wget|bin\/\S+|\.\/\S+)\s/;

test('no run-on git clone / cd / composer command text', () => {
  const bad = pages.filter((p) => {
    const html = readFileSync(p, 'utf8');
    // outside <pre> blocks (which preserve newlines)
    const rest = html.replace(/<pre[\s\S]*?<\/pre>/g, '');
    return RUN_ON.test(rest);
  });
  assert.deepEqual(bad, []);
});

test('run-on guard shape: flags flattened command chains, spares chained ones', () => {
  assert.ok(RUN_ON.test('git clone https://x/y.git cd y '));
  assert.ok(RUN_ON.test('cd /srv/phlix composer install '));
  assert.ok(RUN_ON.test('cd /srv/phlix npm ci '));
  assert.ok(!RUN_ON.test('git clone https://x/y.git &amp;&amp; cd y &amp;&amp; composer install'));
  assert.ok(!RUN_ON.test('cd /srv/phlix && composer install'));
});
