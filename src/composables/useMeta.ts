import type { RouteLocationNormalized } from 'vue-router';
import { metaFor } from '../router';
import { site } from '../data/site';

const setMeta = (selector: string, key: string, value: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement('meta');
    document.head.appendChild(el);
  }
  el.setAttribute(key, value);
};

/** Write the per route head: title, description, canonical, social cards and structured data. */
export function applyMeta(route: RouteLocationNormalized) {
  const params = Object.fromEntries(
    Object.entries(route.params).map(([k, v]) => [k, Array.isArray(v) ? v[0] : v]),
  ) as Record<string, string>;
  const m = metaFor({ name: route.name ?? null, path: route.path, params });
  const canonical = new URL(m.path, site.url).href;
  const ogImage = new URL('/og.png', site.url).href;

  document.title = m.title;
  setMeta('meta[name="description"]', 'content', m.description);
  setMeta('meta[property="og:title"]', 'content', m.title);
  setMeta('meta[property="og:description"]', 'content', m.description);
  setMeta('meta[property="og:url"]', 'content', canonical);
  setMeta('meta[property="og:image"]', 'content', ogImage);
  setMeta('meta[name="twitter:title"]', 'content', m.title);
  setMeta('meta[name="twitter:description"]', 'content', m.description);
  setMeta('meta[name="twitter:image"]', 'content', ogImage);

  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.rel = 'canonical';
    document.head.appendChild(link);
  }
  link.href = canonical;

  let ld = document.head.querySelector<HTMLScriptElement>('script[data-jsonld]');
  if (m.jsonLd) {
    if (!ld) {
      ld = document.createElement('script');
      ld.type = 'application/ld+json';
      ld.dataset.jsonld = '1';
      document.head.appendChild(ld);
    }
    ld.textContent = JSON.stringify(m.jsonLd);
  } else {
    ld?.remove();
  }
}
