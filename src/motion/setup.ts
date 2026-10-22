// Page setup: the loader handoff, the page transition, and the per page hooks.
import { gsap } from 'gsap';
import { getActivePinia } from 'pinia';
import { setLoaderExit, setTransition, onPage, ease, prefersReducedMotion } from '../engine';
import { initPlot } from './route';
import { usePlotStore } from '../stores/plot';

export function setup() {
  const pinia = getActivePinia();
  const plot = usePlotStore(pinia);

  // The sheet lifts off the page and hands over to the hero.
  setLoaderExit((root) =>
    gsap
      .timeline()
      .to(root.querySelectorAll('[data-loader-out]'), {
        yPercent: -130,
        duration: 0.4,
        ease: ease.inOut,
        stagger: 0.03,
      })
      .to(root, { clipPath: 'inset(0% 0% 100% 0%)', duration: 0.5, ease: ease.inOut }, '-=0.2'),
  );

  // A sheet of ink wipes up over the page, then lifts off the next one.
  setTransition({
    leave: (c) =>
      gsap
        .timeline()
        .set(c, { autoAlpha: 1 })
        .fromTo(
          c.querySelector('.curtain__panel'),
          { yPercent: 100 },
          { yPercent: 0, duration: 0.55, ease: ease.inOut },
        )
        .fromTo(
          c.querySelector('.curtain__edge'),
          { scaleX: 0 },
          { scaleX: 1, duration: 0.4, ease: ease.inOut },
          '-=0.15',
        ),
    enter: (c) =>
      gsap
        .timeline()
        .to(c.querySelector('.curtain__panel'), { yPercent: -100, duration: 0.7, ease: ease.inOut })
        .set(c, { autoAlpha: 0 }),
  });

  onPage(({ intro }) => {
    const path = document.querySelector<SVGPathElement>('[data-route-path]');
    if (path) {
      if (prefersReducedMotion()) gsap.set(path, { strokeDashoffset: 0 });
      else intro.to(path, { strokeDashoffset: 0, duration: 1.2, ease: ease.out }, 0.2);
    }

    const stopPlot = initPlot((state) => {
      plot.setActive(state.active);
      plot.setRows(state.rows);
    });
    return () => {
      stopPlot();
    };
  });
}
