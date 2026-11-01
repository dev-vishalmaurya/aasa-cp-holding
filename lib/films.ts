// ============================================================
// Section films: real footage, one clip per section, scrubbed by the scroll (never autoplayed).
// Files: /public/films/<name>/{d.mp4 (1920 desktop), m.mp4 (1280 phones), poster.webp}, encoded with a
// keyframe every 6 frames so seeking from the scroll position is instant.
// Sources (media-src): Pexels stock (pexels.com/license, free for commercial use) and the client's own
// AI clips (media-src/ai) for leadership, sustainability, clients and contact.
// Project footage is illustrative and labelled as such on the page.
// ============================================================

import { BUSINESS_UNITS, PROJECTS } from '@/lib/constants';

const UNIT_FILM: Record<string, string> = {
  'aasa-staffing': 'staffing',
  'aasa-power': 'power',
  'aasa-infra': 'infra',
  'aasa-mobility': 'mobility',
  'aasa-steel': 'steel',
  'aasa-tech': 'tech',
  'aasa-fm': 'fm',
  'aasa-access': 'access',
};

const PROJECT_FILM: Record<string, string> = {
  'adnoc-abu-dhabi': 'project-oil-gas',
  'emirates-dwc': 'project-aviation',
  'uae-steel-landmark': 'project-steel',
  'gcc-telecom-grid': 'project-grid',
};

/** data-shot anchor id on the home page → film folder */
export const FILM_FOR_SHOT: Record<string, string> = {
  hero: 'hero',
  about: 'about',
  divisions: 'divisions',
  ...Object.fromEntries(BUSINESS_UNITS.map((u) => [`unit-${u.slug}`, UNIT_FILM[u.slug]])),
  industries: 'industries',
  ...Object.fromEntries(PROJECTS.map((p) => [`project-${p.id}`, PROJECT_FILM[p.id]])),
  leadership: 'leadership',
  sustainability: 'sustainability',
  clients: 'clients',
  contact: 'contact',
};

export const unitFilm = (slug: string) => UNIT_FILM[slug];

export const filmSources = (name: string) => ({
  desktop: `/films/${name}/d.mp4`,
  mobile: `/films/${name}/m.mp4`,
  poster: `/films/${name}/poster.webp`,
});
