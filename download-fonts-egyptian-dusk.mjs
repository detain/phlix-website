/**
 * download-fonts-egyptian-dusk.mjs
 * Downloads and converts Google Fonts to WOFF2 for Egyptian Dusk brand kit.
 */
import { writeFileSync, mkdirSync } from 'fs';
import { fetch } from 'undici';
import ttf2woff2 from 'ttf2woff2';

const FONTS_DIR = './sites/egyptian-dusk/css/fonts';

async function fetchFontBuffer(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP ${response.status} for ${url}`);
  return Buffer.from(await response.arrayBuffer());
}

async function main() {
  mkdirSync(FONTS_DIR, { recursive: true });

  const families = [
    'Cinzel:wght@400;600;700;900',
    'Cinzel+Decorative:wght@400;700;900',
    'Cormorant+Garamond:ital,wght@0,400;0,500;1,400;1,500',
    'Courier+Prime:ital,wght@0,400;0,700;1,400'
  ].join('&family=');

  const apiUrl = `https://fonts.googleapis.com/css2?family=${families}&display=swap`;
  console.log('Fetching Google Fonts CSS…');
  const cssText = await (await fetch(apiUrl)).text();

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

    console.log(`Fetching ${fontFamily} ${fontWeight}…`);
    const ttfBuf = await fetchFontBuffer(url);
    writeFileSync(ttfPath, ttfBuf);
    console.log(`  TTF: ${(ttfBuf.length / 1024).toFixed(1)} KB`);

    try {
      const woff2Result = ttf2woff2(ttfBuf);
      const woff2Buf = Buffer.from(woff2Result.buffer);
      writeFileSync(woff2Path, woff2Buf);
      console.log(`  WOFF2: ${(woff2Buf.length / 1024).toFixed(1)} KB`);
    } catch (e) {
      console.log(`  WOFF2 convert failed: ${e.message}`);
      continue;
    }

    localBlocks.push(`@font-face {
  font-family: '${fontFamily}';
  font-weight: ${fontWeight};
  font-style: ${fontStyle};
  unicode-range: ${unicodeRange};
  src: url(fonts/${woff2Filename}) format('woff2');
  font-display: ${fontDisplay};
}`);
  }

  const localCSS = `/* Auto-generated — Egyptian Dusk brand kit — do not edit by hand */\n\n${localBlocks.join('\n\n')}\n`;
  writeFileSync(`${FONTS_DIR}/fonts.css`, localCSS);
  console.log(`\nWrote ${localBlocks.length} @font-face blocks to ${FONTS_DIR}/fonts.css`);
}

main().catch(e => { console.error(e); process.exit(1); });
