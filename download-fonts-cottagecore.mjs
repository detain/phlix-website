/**
 * download-fonts-cottagecore.mjs — Download and self-host Cottagecore Bloom fonts
 * Usage: node download-fonts-cottagecore.mjs
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import ttf2woff2 from 'ttf2woff2';

const FONTS_DIR = './sites/cottagecore-bloom/css/fonts';

async function fetchFont(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP ${response.status} for ${url}`);
  const arrayBuffer = await response.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

async function main() {
  mkdirSync(FONTS_DIR, { recursive: true });

  const families = [
    'Playfair+Display:ital,wght@0,700;0,900;1,700',
    'Dancing+Script:wght@700',
    'Lora:ital,wght@0,400;0,500;1,400',
    'Nunito:wght@400;500;600',
    'Courier+Prime:ital,wght@0,400;0,700;1,400'
  ].join('&family=');

  const apiUrl = `https://fonts.googleapis.com/css2?family=${families}&display=swap`;
  console.log('Fetching Cottagecore Bloom font list from Google Fonts...');
  const cssResponse = await fetch(apiUrl);
  const cssText = await cssResponse.text();

  const blocks = [...cssText.matchAll(/@font-face\s*\{([^}]+)\}/g)].map(m => m[0]);
  console.log(`Found ${blocks.length} @font-face blocks\n`);

  const localBlocks = [];

  for (const block of blocks) {
    const urlMatch = block.match(/src:\s*url\(([^)]+)\)\s+format\('([^']+)'\)/);
    if (!urlMatch) continue;
    const [, url, format] = urlMatch;

    const fontFamily = block.match(/font-family:\s*'([^']+)'/)?.[1] || '';
    const fontWeight = block.match(/font-weight:\s*(\d+)/)?.[1] || '400';
    const fontStyle = block.match(/font-style:\s*(\w+)/)?.[1] || 'normal';
    const fontDisplay = block.match(/font-display:\s*(\w+)/)?.[1] || 'swap';
    const unicodeRange = block.match(/unicode-range:\s*([^;]+);?/)?.[1] || 'U+0000-FFFF';

    const baseFilename = url.split('/').pop().split('?')[0];
    const ttfFilename = baseFilename.replace('.woff2', '.ttf');
    const woff2Filename = ttfFilename.replace('.ttf', '.woff2');
    const ttfPath = `${FONTS_DIR}/${ttfFilename}`;
    const woff2Path = `${FONTS_DIR}/${woff2Filename}`;

    try {
      const ttfBuf = await fetchFont(url);
      writeFileSync(ttfPath, ttfBuf);
      console.log(`  TTF: ${ttfPath} (${(ttfBuf.length / 1024).toFixed(1)} KB)`);

      try {
        const woff2Result = ttf2woff2(ttfBuf);
        const woff2Buf = Buffer.from(woff2Result.buffer);
        writeFileSync(woff2Path, woff2Buf);
        console.log(`  WOFF2: ${woff2Path} (${(woff2Buf.length / 1024).toFixed(1)} KB)`);
      } catch (e) {
        console.log(`  WOFF2 convert failed for ${ttfFilename}: ${e.message}`);
        continue;
      }

      const localBlock = `@font-face {
  font-family: '${fontFamily}';
  font-weight: ${fontWeight};
  font-style: ${fontStyle};
  unicode-range: ${unicodeRange};
  src: url(fonts/${woff2Filename}) format('woff2');
  font-display: ${fontDisplay};
}`;
      localBlocks.push(localBlock);
    } catch (e) {
      console.log(`  Failed to fetch ${url}: ${e.message}`);
    }
  }

  const localCSS = `/* Auto-generated — Cottagecore Bloom — do not edit by hand */\n\n${localBlocks.join('\n\n')}\n`;
  writeFileSync(`${FONTS_DIR}/fonts.css`, localCSS);
  console.log(`\nWrote ${FONTS_DIR}/fonts.css with ${localBlocks.length} @font-face blocks`);
}

main().catch(e => { console.error(e); process.exit(1); });
