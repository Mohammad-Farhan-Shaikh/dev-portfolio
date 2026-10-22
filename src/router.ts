import type { RouteRecordRaw } from 'vue-router';
import { site, projects, education } from './data/site';

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('./views/HomeView.vue'),
  },
  {
    path: '/about/',
    name: 'about',
    component: () => import('./views/AboutView.vue'),
  },
  {
    path: '/work/',
    name: 'work',
    component: () => import('./views/WorkIndexView.vue'),
  },
  {
    path: '/work/:slug/',
    name: 'case',
    component: () => import('./views/CaseView.vue'),
    props: true,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notfound',
    component: () => import('./views/NotFoundView.vue'),
  },
];

export const projectBySlug = (slug: string) => projects.find((p) => p.slug === slug);

export type PageMeta = {
  title: string;
  description: string;
  path: string;
  jsonLd?: Record<string, unknown>;
};

const abs = (path: string) => new URL(path, site.url).href;

/** Per route title, description and structured data. */
export function metaFor(route: { name: string | symbol | null | undefined; path: string; params: Record<string, string> }): PageMeta {
  const name = String(route.name ?? '');

  if (name === 'home') {
    return {
      title: `${site.name}, frontend developer in Navi Mumbai`,
      description: site.description,
      path: '/',
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: site.name,
        jobTitle: 'Frontend developer, maps and real-time tracking',
        description: site.description,
        url: site.url,
        email: `mailto:${site.email}`,
        address: { '@type': 'PostalAddress', addressLocality: 'Navi Mumbai', addressCountry: 'IN' },
        sameAs: site.socials.map((s) => s.href),
        knowsAbout: ['Vue 3', 'TypeScript', 'Deck.gl', 'Google Maps API', 'Pinia', 'SQL', 'Metabase', 'QGIS'],
      },
    };
  }

  if (name === 'about') {
    return {
      title: `About, ${site.name}`,
      description:
        'About Mohammad Farhan Shaikh: a frontend developer in Navi Mumbai working on map based tracking systems, fleet analytics and self hosted map tiles.',
      path: '/about/',
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'ProfilePage',
        url: abs('/about/'),
        mainEntity: {
          '@type': 'Person',
          name: site.name,
          jobTitle: 'Frontend developer',
          email: `mailto:${site.email}`,
          address: { '@type': 'PostalAddress', addressLocality: 'Navi Mumbai', addressCountry: 'IN' },
          sameAs: site.socials.map((s) => s.href),
          alumniOf: education.map((e) => ({ '@type': 'EducationalOrganization', name: e.school })),
        },
      },
    };
  }

  if (name === 'work') {
    return {
      title: `Work, ${site.name}`,
      description:
        'Five case studies from the map layer of tracking systems: fleet map tracking, cold storage operations, a self hosted tile server, driver analytics and a weather app.',
      path: '/work/',
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Work',
        url: abs('/work/'),
        hasPart: projects.map((p) => ({
          '@type': 'CreativeWork',
          name: p.title,
          url: abs(`/work/${p.slug}/`),
        })),
      },
    };
  }

  if (name === 'case') {
    const slug = Array.isArray(route.params.slug) ? route.params.slug[0] : route.params.slug;
    const project = projectBySlug(slug);
    if (!project) {
      return {
        title: `Sheet not found, ${site.name}`,
        description: 'This page is not on the sheet. The route ends here, the work does not.',
        path: '/404/',
      };
    }
    return {
      title: `${project.title}, ${site.name}`,
      description: project.summary,
      path: `/work/${project.slug}/`,
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        name: project.title,
        description: project.summary,
        url: abs(`/work/${project.slug}/`),
        author: { '@type': 'Person', name: site.name, url: site.url },
        about: project.stack,
        dateCreated: project.year,
      },
    };
  }

  return {
    title: `Sheet not found, ${site.name}`,
    description: 'This page is not on the sheet. The route ends here, the work does not.',
    path: '/404/',
  };
}
