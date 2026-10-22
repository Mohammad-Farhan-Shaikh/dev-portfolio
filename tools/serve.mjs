// Static server for QA and local review of the built site.
//   node tools/serve.mjs [dist] [--port 4400]
// Same behaviour as the skill's serve.mjs (clean URLs, 404.html, MIME types) plus
// gzip and brotli, because every real host compresses and the QA numbers should
// reflect what a visitor downloads, not what the file weighs on disk.
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { fileURLToPath } from 'node:url';

const types = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.mjs': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.webp': 'image/webp', '.avif': 'image/avif', '.gif': 'image/gif', '.ico': 'image/x-icon', '.woff2': 'font/woff2',
  '.woff': 'font/woff', '.ttf': 'font/ttf', '.mp4': 'video/mp4', '.webm': 'video/webm', '.xml': 'application/xml',
  '.txt': 'text/plain', '.glb': 'model/gltf-binary', '.mp3': 'audio/mpeg',
};

const compressible = (ext) => ['.html', '.js', '.mjs', '.css', '.json', '.svg', '.xml', '.txt'].includes(ext);

export function serve(dir, port = 4400) {
  const root = path.resolve(dir);
  const resolve = (p) => {
    const clean = path.normalize(decodeURIComponent(p.split('?')[0])).replace(/^([/\\])+/, '');
    const base = path.join(root, clean);
    if (!base.startsWith(root)) return null;
    for (const c of [base, path.join(base, 'index.html'), base + '.html']) {
      try { if (fs.statSync(c).isFile()) return c; } catch {}
    }
    return null;
  };
  const server = http.createServer((req, res) => {
    const file = resolve(req.url || '/');
    const f = file || path.join(root, '404.html');
    if (!fs.existsSync(f)) { res.writeHead(404); return res.end('Not found'); }
    const ext = path.extname(f);
    const body = fs.readFileSync(f);
    const headers = { 'content-type': types[ext] || 'application/octet-stream', 'cache-control': 'no-cache' };
    const accept = String(req.headers['accept-encoding'] || '');
    if (compressible(ext) && /gzip/.test(accept)) {
      const buf = zlib.gzipSync(body, { level: 9 });
      res.writeHead(file ? 200 : 404, { ...headers, 'content-encoding': 'gzip', 'content-length': buf.length });
      return res.end(buf);
    }
    res.writeHead(file ? 200 : 404, { ...headers, 'content-length': body.length });
    res.end(body);
  });
  return new Promise((ok) => server.listen(port, '127.0.0.1', () => ok(server)));
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  const dir = args.find((a, i) => !a.startsWith('--') && args[i - 1] !== '--port') || 'dist';
  const pi = args.indexOf('--port');
  if (!fs.existsSync(dir)) { console.error(`No folder ${path.resolve(dir)}. Build first.`); process.exit(1); }
  const server = await serve(dir, pi > -1 ? +args[pi + 1] : 4400);
  console.log(`serving ${path.resolve(dir)} at http://127.0.0.1:${server.address().port}/`);
}
