# Mohammad Farhan Shaikh, Portfolio

Personal portfolio for a frontend developer working on maps, live data and tracking
systems. The site is a static production build with a map-sheet visual language: a
plotted route, waypoint projects and a live readout.

Production domain: [portfolio.mohammadfarhanshaikh.com](https://portfolio.mohammadfarhanshaikh.com)

## Stack

- Vue 3 (`<script setup>`) + Vue Router + Pinia
- TypeScript and Vite 7
- GSAP (ScrollTrigger, SplitText) and Lenis for motion and smooth scrolling
- Playwright for static prerendering and visual QA
- axe-core for accessibility checks
- Self-hosted, subset variable fonts

No backend or runtime server is required. Every route is prerendered to HTML at build
time, so crawlers and no-JS visitors get the full page content.

## Requirements

- Node.js 20.19+ or 22.12+
- npm
- Chromium for Playwright (needed by `npm run build` and the QA scripts)

```bash
npm install
npx playwright install chromium
```

On Linux CI you may need `npx playwright install --with-deps chromium`.

## Getting started

```bash
npm run dev
```

The dev server runs at `http://localhost:4401`.

## Scripts

| Script | What it does |
| --- | --- |
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Typecheck, build with Vite, then prerender every route |
| `npm run build:fast` | Vite build only; no typecheck or prerender |
| `npm run typecheck` | Run `vue-tsc` against the app |
| `npm run preview` | Preview the Vite build |
| `npm run serve` | Serve `dist/` on `http://127.0.0.1:4400` with clean URLs, gzip and 404 handling |
| `npm run fonts` | Re-subset the self-hosted fonts from the built HTML |
| `npm run qa:audit` | Static SEO, metadata and accessibility audit of the built site |
| `npm run qa:shoot` | Desktop, mobile, reduced-motion and keyboard screenshot QA |

`npm run build` is the production build. It expects Chromium because the prerender step
loads each route in a headless browser. Use `build:fast` only for quick local checks.

## Routes

```text
/                    Home: hero, about, selected work, approach, other work, tools, contact
/about/              Profile, system, education and contact
/work/               Work index
/work/:slug/         One case study per project
404                  Prerendered to dist/404.html
```

The build currently prerenders 9 routes: home, about, the work index, five case studies
and the 404 page. `sitemap.xml` contains the eight public URLs; the 404 page is excluded.

Unknown paths are rendered by the Vue router and written to `dist/404.html`. Configure
your host to serve that file for unknown routes and to use clean URLs.

## Project structure

```text
src/
  views/             Home, About, Work index, Case study, 404
  components/        Header, Footer, project rows, charts and page controls
  engine/            Boot, loader, scroll, reveal and page-transition engine
  motion/            Route choreography and chart setup
  data/              Site copy, projects, process, education and chart data
  stores/            Pinia readout state
  styles/            Tokens, base styles and engine styles
  router.ts          Routes, page metadata and structured data
tools/
  prerender.mjs      Static HTML, sitemap and robots generation
  serve.mjs          Production-like local server for dist/
  subset-fonts.mjs   Font subsetting
  qa/                Audit and screenshot tooling
```

## Editing content

All site content lives in `src/data/site.ts`: profile details, social links, projects
and case studies, stack, process and education. `src/data/plot.ts` and
`src/stores/plot.ts` feed the live readout and chart.

Project slugs are the source of truth for case-study routes. Add or remove a project in
`projects` and rebuild; `tools/prerender.mjs` reads the slugs from `site.ts` and updates
the route HTML and `sitemap.xml` automatically.

`src/router.ts` contains the per-route title, description, canonical path and JSON-LD.
Update it when adding a new page type. `DESIGN.md` holds the original art direction and
concept notes.

## Build and deploy

```bash
npm run build
npm run serve
```

The build writes a static site to `dist/`:

- one `index.html` per route
- hashed CSS and JS assets
- `sitemap.xml`
- `robots.txt`
- `404.html`

Deploy the contents of `dist/` to any static host. If the domain changes, update
`site.url` in `src/data/site.ts` and the `site` constant in `tools/prerender.mjs`, then
rebuild so canonical URLs, JSON-LD, the sitemap and robots file all match.

## Fonts

The fonts in `public/fonts/` are self-hosted and subset for this site. The subsetter
reads the text in `dist/`, so run it after a build:

```bash
npm run build
npm run fonts
npm run build
```

`npm run fonts` overwrites the woff2 files in `public/fonts/`. The full source fonts
are kept in `tools/font-src/`; if new copy needs characters that are not in the current
subset, restore the originals from there before subsetting again.

## QA

Serve the production build first, then run the checks:

```bash
npm run serve
npm run qa:audit
npm run qa:shoot
```

- `qa:audit` crawls the site and checks semantics, SEO, metadata, accessibility basics,
  page weight and placeholder copy. It exits with an error if a check fails.
- `qa:shoot` captures desktop, throttled mobile, reduced-motion and keyboard-focus
  frames, plus LCP, CLS, FPS, console errors, axe-core results and a page report.

Screenshots go to `.shots/`, which is ignored by Git. They are QA artifacts and can be
deleted at any time.

## Accessibility and fallbacks

- Skip link, visible focus styles and keyboard-trapped mobile menu
- Light and dark themes, persisted and applied before first paint
- Reduced-motion support: motion is skipped and content stays visible
- Prerendered HTML plus a no-JS fallback for the loader and reveal styles
- Dark panels use shared contrast tokens instead of inverted hard-coded colors

## License

Personal project. All content, writing and design belong to Mohammad Farhan Shaikh.
