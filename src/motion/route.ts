// The route: scrolling the work list moves the plot, and the readout reports where you are.
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { createPlot, gridRef, bearing } from './chart';
import { plot } from '../data/plot';
import { projects } from '../data/site';

const clock = () =>
  new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Kolkata',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(new Date());

export type PlotState = { active: number; rows: [string, string][] };

/**
 * Wire the plot to the page: scrolling the work list moves the route, hovering a row previews it,
 * and `onState` publishes the readout for the view to render.
 */
export function initPlot(onState?: (state: PlotState) => void): () => void {
  const root = document.querySelector<HTMLElement>('[data-plot]');
  if (!root) return () => {};

  const api = createPlot(root, plot);
  const abort = new AbortController();
  const { signal } = abort;

  let hover: number | null = null;
  let travelled = 0;

  const write = (rows: [string, string][]) => onState?.({ active: hover ?? travelled, rows });

  const render = () => {
    if (hover !== null) {
      const p = projects[hover];
      write([
        ['Project', p.title],
        ['Year', p.year],
        ['Stack', p.stack.slice(0, 2).join(' ')],
        ['Navi Mumbai', `${clock()} IST`],
      ]);
      return;
    }
    const point = plot[travelled];
    write([
      ['Waypoint', `${projects[travelled].waypoint} / ${String(projects.length).padStart(2, '0')}`],
      ['Grid', gridRef(point.x, point.y)],
      ['Bearing', travelled > 0 ? bearing(plot[travelled - 1], point) : '---'],
      ['Navi Mumbai', `${clock()} IST`],
    ]);
  };

  const goTo = (i: number) => {
    travelled = Math.max(0, Math.min(plot.length - 1, i));
    api.setActive(travelled);
    render();
  };

  const rows = [...document.querySelectorAll<HTMLElement>('[data-work-list] .work__row')];
  if (rows.length) {
    rows.forEach((row, i) => {
      ScrollTrigger.create({
        trigger: row,
        start: 'top 72%',
        end: 'bottom 30%',
        onEnter: () => goTo(i),
        onEnterBack: () => goTo(i),
      });
      row.addEventListener(
        'pointerenter',
        () => {
          hover = i;
          api.setActive(i);
          render();
        },
        { signal },
      );
      row.addEventListener(
        'pointerleave',
        () => {
          hover = null;
          api.setActive(travelled);
          render();
        },
        { signal },
      );
      row.addEventListener(
        'focus',
        () => {
          hover = i;
          api.setActive(i);
          render();
        },
        { signal },
      );
      row.addEventListener(
        'blur',
        () => {
          hover = null;
          api.setActive(travelled);
          render();
        },
        { signal },
      );
    });
  } else {
    const preset = Number(root.dataset.active || 0);
    travelled = Math.max(0, Math.min(plot.length - 1, preset));
    api.setActive(travelled, false);
  }

  const tick = setInterval(render, 1000);
  render();

  return () => {
    clearInterval(tick);
    abort.abort();
    api.destroy();
  };
}
