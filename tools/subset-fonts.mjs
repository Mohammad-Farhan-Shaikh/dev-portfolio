// Subset the self hosted fonts to the characters the site actually uses.
//   node tools/subset-fonts.mjs
// Reads the built HTML in dist/ so the character set comes from the real copy,
// keeps a safety margin (ASCII, Latin 1, punctuation, arrows, symbols) and
// preserves the variable axes (wdth 62-125, wght 100-900) so the display type
// can still be stretched and weighed.
import fs from 'node:fs';
import path from 'node:path';
import subsetFont from 'subset-font';

const root = process.cwd();
const dist = path.join(root, 'dist');

const walk = (dir) =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? walk(p) : [p];
  });

const htmlFiles = fs.existsSync(dist) ? walk(dist).filter((f) => f.endsWith('.html')) : [];
let text = '';
for (const f of htmlFiles) text += fs.readFileSync(f, 'utf8');

// Strip tags but keep the text, then keep every character the markup contains too.
const chars = new Set();
for (const ch of text) chars.add(ch);
for (let c = 0x20; c <= 0x7e; c++) chars.add(String.fromCharCode(c));
for (let c = 0xa0; c <= 0xff; c++) chars.add(String.fromCharCode(c));
for (const ch of '·—–…•→←↑↓©®™°±×÷€£¥§¶«»“”‘’‰′″№†‡') chars.add(ch);

const set = [...chars].sort().join('');

const fonts = [
  { file: 'archivo-100_900-normal.woff2' },
  { file: 'fragment-mono-400-normal.woff2' },
];

for (const { file } of fonts) {
  const src = path.join(root, 'public', 'fonts', file);
  if (!fs.existsSync(src)) {
    console.error(`missing ${src}`);
    continue;
  }
  const before = fs.statSync(src).size;
  const out = await subsetFont(fs.readFileSync(src), set, { variationAxes: 'preserve' });
  fs.writeFileSync(src, out);
  console.log(`${file}: ${(before / 1024).toFixed(1)} KB -> ${(out.length / 1024).toFixed(1)} KB`);
}
