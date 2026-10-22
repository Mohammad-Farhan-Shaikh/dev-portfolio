// Schematic plot of the five waypoints. The coordinates are the order of the work,
// not the geography of the projects.
export type PlotPoint = { slug: string; x: number; y: number };

export const plot: PlotPoint[] = [
  { slug: 'fleet-map-tracking', x: 0.09, y: 0.72 },
  { slug: 'cold-storage-app', x: 0.29, y: 0.44 },
  { slug: 'tile-server', x: 0.48, y: 0.62 },
  { slug: 'fleet-analytics', x: 0.67, y: 0.3 },
  { slug: 'skycast-weather', x: 0.88, y: 0.42 },
];

export const plotCaption = 'Schematic plot. The route is the order of the work, not a map of where the work happened.';
