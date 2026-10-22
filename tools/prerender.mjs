// Prerender the SPA into static HTML, one file per route, so crawlers and no-JS
// visitors get real content. Run after `vite build`:
//   node tools/prerender.mjs
// Each route is loaded in a headless browser, the app is allowed to settle, and the
// rendered DOM (head meta, structured data, markup) is written back into dist/.
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';

const root = process.cwd();
const dist = path.join(root, 'dist');
const origin = 'http://127.0.0.1:4173';

const mime = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
};

const site = 'https://mohammadfarhanshaikh.com';
const source = fs
  .readFileSync(path.join(root, 'src', 'data', 'site.ts'), 'utf8')
  .replace(/\/\*[\s\S]*?\*\//g, '')
  .replace(/^\s*\/\/.*$/gm, '');
const slugs = [...new Set([...source.matchAll(/slug:\s*'([^']+)'/g)].map((m) => m[1]))];

const routes = [
  { url: '/', file: 'index.html', priority: '1.0' },
  { url: '/about/', file: 'about/index.html', priority: '0.8' },
  { url: '/work/', file: 'work/index.html', priority: '0.9' },
  ...slugs.map((slug) => ({
    url: `/work/${slug}/`,
    file: `work/${slug}/index.html`,
    priority: '0.7',
  })),
  { url: '/404/', file: '404.html', priority: '0.2' },
];

if (!fs.existsSync(dist)) {
  console.error('dist/ not found. Run `vite build` first.');
  process.exit(1);
}

const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });

// Serve dist straight from disk: no server, no port, no cache surprises.
await context.route('**/*', async (route) => {
  const url = new URL(route.request().url());
  if (url.hostname !== '127.0.0.1') return route.continue();
  let file = path.join(dist, decodeURIComponent(url.pathname));
  if (url.pathname.endsWith('/')) file = path.join(file, 'index.html');
  if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) file = path.join(dist, 'index.html');
  const body = fs.readFileSync(file);
  await route.fulfill({
    status: 200,
    body,
    contentType: mime[path.extname(file)] || 'application/octet-stream',
    headers: { 'cache-control': 'no-store' },
  });
});

const page = await context.newPage();

for (const route of routes) {
  await page.goto(origin + route.url, { waitUntil: 'load' });
  await page
    .waitForFunction(() => document.documentElement.dataset.appReady === '1', null, { timeout: 20000 })
    .catch(() => console.error(`  ${route.url} did not report ready`));
  await page.waitForTimeout(1200); // let the intro and the fonts settle

  const html = await page.evaluate(() => {
    const doc = document.documentElement.cloneNode(true);
    // The sheet is a first paint moment: ship it visible, the app lifts it.
    doc.querySelector('#loader')?.removeAttribute('hidden');
    doc.classList.add('js');
    return `<!doctype html>\n${doc.outerHTML}`;
  });

  const out = path.join(dist, route.file);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, html);
  console.log(`${route.url} -> dist/${route.file} (${(html.length / 1024).toFixed(1)} KB)`);
}

// Sitemap, written from the same route list.
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .filter((r) => r.url !== '/404/')
  .map(
    (r) =>
      `  <url>\n    <loc>${site}${r.url}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>${r.priority}</priority>\n  </url>`,
  )
  .join('\n')}
</urlset>
`;
fs.writeFileSync(path.join(dist, 'sitemap.xml'), sitemap);

const robots = `User-agent: *\nAllow: /\n\nSitemap: ${site}/sitemap.xml\n`;
fs.writeFileSync(path.join(dist, 'robots.txt'), robots);

await browser.close();
console.log(`prerendered ${routes.length} routes`);
