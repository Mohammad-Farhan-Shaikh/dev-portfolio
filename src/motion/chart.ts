// The instrument: a plotted route on a graticule, drawn from the schematic waypoints.
import { gsap } from 'gsap';
import { ease } from '../engine/env';

const NS = 'http://www.w3.org/2000/svg';
const COLS = 8;
const ROWS = 6;

export type PlotPoint = { slug: string; x: number; y: number };

export type PlotApi = {
  setActive(index: number, animate?: boolean): void;
  destroy(): void;
};

type Pt = { x: number; y: number };

const el = <K extends keyof SVGElementTagNameMap>(name: K, attrs: Record<string, string | number> = {}) => {
  const node = document.createElementNS(NS, name);
  for (const [k, v] of Object.entries(attrs)) node.setAttribute(k, String(v));
  return node;
};

/** Grid reference of a point, matching the letters and numbers drawn on the sheet. */
export const gridRef = (x: number, y: number) => {
  const col = 'ABCDEFGH'[Math.min(COLS - 1, Math.max(0, Math.floor(x * COLS)))];
  const row = String(Math.min(ROWS, Math.max(1, Math.floor(y * ROWS) + 1))).padStart(2, '0');
  return `${col} ${row}`;
};

/** Bearing from one waypoint to the next, in degrees. */
export const bearing = (a: PlotPoint, b: PlotPoint) => {
  const deg = (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI;
  return `${String(Math.round((deg + 360) % 360)).padStart(3, '0')}°`;
};

/** Catmull-Rom through the waypoints, drawn one segment at a time. */
const segment = (p: Pt[], i: number) => {
  const p0 = p[i - 1] ?? p[i];
  const p1 = p[i];
  const p2 = p[i + 1];
  const p3 = p[i + 2] ?? p2;
  const c1 = { x: p1.x + (p2.x - p0.x) / 6, y: p1.y + (p2.y - p0.y) / 6 };
  const c2 = { x: p2.x - (p3.x - p1.x) / 6, y: p2.y - (p3.y - p1.y) / 6 };
  return `M ${p1.x.toFixed(2)} ${p1.y.toFixed(2)} C ${c1.x.toFixed(2)} ${c1.y.toFixed(2)}, ${c2.x.toFixed(2)} ${c2.y.toFixed(2)}, ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`;
};

export function createPlot(root: HTMLElement, points: PlotPoint[]): PlotApi {
  const chart = root.querySelector<HTMLElement>('[data-chart]');
  if (!chart) return { setActive: () => {}, destroy: () => {} };

  let active = -1;
  let live: SVGPathElement[] = [];
  let dots: SVGGElement[] = [];
  let marker: SVGGElement | null = null;
  let pts: Pt[] = [];
  let observer: ResizeObserver | null = null;

  const build = () => {
    const rect = chart.getBoundingClientRect();
    const W = Math.max(240, Math.round(rect.width));
    const H = Math.max(170, Math.round(rect.height));
    const pad = W < 420 ? 20 : 26;
    const x0 = pad + 12;
    const y0 = pad + 10;
    const x1 = W - pad;
    const y1 = H - pad;
    const cellW = (x1 - x0) / COLS;
    const cellH = (y1 - y0) / ROWS;

    pts = points.map((p) => ({ x: x0 + p.x * (x1 - x0), y: y0 + p.y * (y1 - y0) }));

    chart.replaceChildren();
    const svg = el('svg', { viewBox: `0 0 ${W} ${H}`, width: W, height: H });
    svg.setAttribute('aria-hidden', 'true');

    // Graticule
    const grid = el('g', { class: 'chart__grid' });
    for (let c = 0; c <= COLS; c++) {
      const x = x0 + c * cellW;
      grid.appendChild(el('line', { x1: x, y1: y0, x2: x, y2: y1, class: c % 4 === 0 ? 'chart__gridline chart__gridline--major' : 'chart__gridline' }));
    }
    for (let r = 0; r <= ROWS; r++) {
      const y = y0 + r * cellH;
      grid.appendChild(el('line', { x1: x0, y1: y, x2: x1, y2: y, class: r % 3 === 0 ? 'chart__gridline chart__gridline--major' : 'chart__gridline' }));
    }
    svg.appendChild(grid);

    // Grid references
    const refs = el('g', { class: 'chart__refs' });
    for (let c = 0; c < COLS; c++) {
      const t = el('text', { x: x0 + c * cellW + cellW / 2, y: y0 - 5, 'text-anchor': 'middle' });
      t.textContent = 'ABCDEFGH'[c];
      refs.appendChild(t);
    }
    for (let r = 0; r < ROWS; r++) {
      const t = el('text', { x: x0 - 6, y: y0 + r * cellH + cellH / 2 + 3, 'text-anchor': 'end' });
      t.textContent = String(r + 1).padStart(2, '0');
      refs.appendChild(t);
    }
    svg.appendChild(refs);

    // The route: a ghost of the whole track and the drawn part on top.
    live = [];
    const ghosts = el('g', { class: 'chart__route' });
    const track = el('g', { class: 'chart__route' });
    for (let i = 0; i < pts.length - 1; i++) {
      const d = segment(pts, i);
      ghosts.appendChild(el('path', { d, class: 'route-line--ghost' }));
      const path = el('path', { d, class: 'route-line', pathLength: 1, 'stroke-dasharray': 1, 'stroke-dashoffset': 1 });
      live.push(path);
      track.appendChild(path);
    }
    svg.appendChild(ghosts);
    svg.appendChild(track);

    // Waypoints
    dots = [];
    const markers = el('g', { class: 'chart__markers' });
    pts.forEach((p, i) => {
      const g = el('g', { class: 'wp' });
      g.appendChild(el('circle', { cx: p.x, cy: p.y, r: 3.6 }));
      const label = el('text', { x: p.x + 9, y: p.y + 3.5, class: 'wp__id' });
      label.textContent = String(i + 1).padStart(2, '0');
      if (p.x > (x0 + x1) / 2) {
        label.setAttribute('x', String(p.x - 9));
        label.setAttribute('text-anchor', 'end');
      }
      g.appendChild(label);
      dots.push(g);
      markers.appendChild(g);
    });
    svg.appendChild(markers);

    // Position marker
    marker = el('g', { class: 'chart__marker' });
    marker.appendChild(el('path', { d: 'M 7 0 L -5 4.2 L -5 -4.2 Z' }));
    svg.appendChild(marker);
    gsap.set(marker, { svgOrigin: '0 0' });

    // Sheet furniture
    const notes = el('g', { class: 'chart__north' });
    const n = el('text', { x: x1, y: y0 + 4, 'text-anchor': 'end' });
    n.textContent = 'N';
    notes.appendChild(n);
    notes.appendChild(el('line', { x1: x1 - 4, y1: y0 + 9, x2: x1, y2: y0 + 9 }));
    notes.appendChild(el('line', { x1: x1 - 2, y1: y0 + 9, x2: x1, y2: y0 + 15 }));
    const scale = el('text', { x: x0, y: y1 + 12 });
    scale.textContent = 'Schematic, not to scale';
    notes.appendChild(scale);
    svg.appendChild(notes);

    chart.appendChild(svg);
  };

  const setActive = (index: number, animate = true) => {
    if (!pts.length) return;
    const i = Math.max(0, Math.min(pts.length - 1, index));
    for (let s = 0; s < live.length; s++) {
      const shown = s < i;
      if (live[s].getAttribute('data-shown') === (shown ? '1' : '0')) continue;
      live[s].setAttribute('data-shown', shown ? '1' : '0');
      gsap.to(live[s], {
        strokeDashoffset: shown ? 0 : 1,
        duration: animate ? (shown ? 0.85 : 0.35) : 0,
        ease: ease.out,
        overwrite: true,
      });
    }
    active = i;
    dots.forEach((d, k) => d.classList.toggle('is-active', k === i));
    if (marker) {
      const from = pts[Math.max(0, i - 1)];
      const to = pts[i];
      const deg = i === 0 ? 0 : (Math.atan2(to.y - from.y, to.x - from.x) * 180) / Math.PI;
      gsap.to(marker, {
        x: to.x,
        y: to.y,
        rotation: deg,
        duration: animate ? 0.8 : 0,
        ease: ease.out,
        overwrite: true,
      });
    }
  };

  build();

  const saved = active;
  active = -1;
  setActive(saved < 0 ? 0 : saved, false);

  observer = new ResizeObserver(() => {
    const w = Math.round(chart.getBoundingClientRect().width);
    if (!w) return;
    const current = active;
    build();
    active = -1;
    setActive(current < 0 ? 0 : current, false);
  });
  observer.observe(chart);

  return {
    setActive,
    destroy: () => {
      observer?.disconnect();
      live.forEach((p) => gsap.killTweensOf(p));
      if (marker) gsap.killTweensOf(marker);
    },
  };
}
