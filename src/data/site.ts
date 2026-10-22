// // Content for the whole site. Everything visible comes from this file.

// export type Role = {
//   title: string;
//   company: string;
//   location: string;
//   from: string;
//   to: string;
//   summary: string;
//   points: string[];
// };

// export type DiagramNode = { id: string; label: string; sub?: string };
// export type Diagram = {
//   kind: 'migration' | 'pipeline' | 'modules';
//   caption: string;
//   from?: { label: string; nodes: DiagramNode[] };
//   to?: { label: string; nodes: DiagramNode[] };
//   nodes?: DiagramNode[];
// };

// export type Project = {
//   slug: string;
//   waypoint: string;
//   title: string;
//   kind: string;
//   client: string;
//   year: string;
//   role: string;
//   stack: string[];
//   summary: string;
//   context: string;
//   idea: string;
//   craft: { label: string; text: string }[];
//   outcome: string;
//   diagram: Diagram;
// };

// export const site = {
//   name: 'Mohammad Farhan Shaikh',
//   mark: 'MFS',
//   role: 'Frontend developer, maps and real-time tracking',
//   url: 'https://mohammadfarhanshaikh.com',
//   description:
//     'Frontend developer in Navi Mumbai building the map layer of real-time tracking systems: Deck.gl on Google Maps, live vehicle positions, route history and SQL analytics.',
//   email: 'fnshaikh78666@gmail.com',
//   location: 'Navi Mumbai, India',
//   coordinates: '18.98 N / 73.03 E',
//   timezone: 'Asia/Kolkata',
//   socials: [
//     { label: 'GitHub', href: 'https://github.com/Mohammad-Farhan-Shaikh' },
//     { label: 'LinkedIn', href: 'https://www.linkedin.com/in/mohammad-farhan-shaikh70' },
//     { label: 'mohammadfarhanshaikh.com', href: 'https://mohammadfarhanshaikh.com' },
//   ],
// };
// export const statement =
//   'I design and build interfaces for maps, data and real-time systems with a focus on clarity, performance and usable detail.';

// export const roles: Role[] = [
//   {
//     title: 'Software developer',
//     company: 'Lateral Emsoft Pvt. Ltd',
//     location: 'Navi Mumbai, India',
//     from: 'Apr 2025',
//     to: 'Present',
//     summary:
//       'Frontend work on map-based fleet tracking, cold storage operations and SQL analytics for transport clients.',
//     points: [
//       'Plotted lakh-scale GPS point sets on Deck.gl over the Google Maps API for live vehicle tracking.',
//       'Replaced a three-provider map stack with one, so the map surface and the data layer stopped drifting apart.',
//       'Rebuilt legacy Mapbox reports with click-to-view location and route history playback.',
//       'Shipped a cold storage management app from Figma designs using Vue 3, TypeScript and Pinia.',
//       'Served map tiles for Ras Al Khaimah from a QGIS pipeline in Docker after the region came back empty.',
//       'Modelled driver, vehicle and group performance in SQL and published it through Metabase dashboards.',
//     ],
//   },
// ];

// export const stack: { group: string; items: string[] }[] = [
//   { group: 'Frameworks', items: ['Vue 3', 'TypeScript', 'Pinia', 'Angular', 'Ionic', 'Tailwind CSS'] },
//   { group: 'Maps and data', items: ['Deck.gl', 'Google Maps API', 'Leaflet', 'Mapbox', 'HERE Maps', 'OSRM', 'QGIS'] },
//   { group: 'Back end and tools', items: ['SQL', 'Metabase', 'Docker', 'Node.js', 'Vite', 'Git'] },
// ];

// export const education = [
//   {
//     title: 'Bachelor of Vocation, Software Development',
//     school: 'Pune University',
//     from: 'Jul 2021',
//     to: 'Apr 2024',
//     note: 'Grade 9.3 out of 10',
//   },
// ];

// export const projects: Project[] = [
//   {
//     slug: 'fleet-map-tracking',
//     waypoint: '01',
//     title: 'Fleet Map Tracking',
//     kind: 'Real-time tracking',
//     client: 'Transport operators (Lateral Emsoft)',
//     year: '2025 to 2026',
//     role: 'Frontend developer',
//     stack: ['Vue 3', 'TypeScript', 'Deck.gl', 'Google Maps API', 'SQL'],
//     summary:
//       'Live positions, routes and trip history for a whole fleet, drawn on one map that stays smooth while the vehicles move.',
//     context:
//       'Fleet operators were tracking vehicles across several map providers at once. Every surface drew its own version of the same journey, and the team spent their time reconciling the difference rather than reading the data.',
//     idea:
//       'One map surface, one coordinate space. The Google Maps API keeps the familiar road context, Deck.gl owns the layers above it, and every panel reads from the same store, so a vehicle position means the same thing wherever it appears.',
//     craft: [
//       { label: 'Layers', text: 'Trip history, live positions and route geometry sit in separate Deck.gl layers with their own visibility rules.' },
//       { label: 'Playback', text: 'A recorded trip can be replayed along its route with the vehicle marker following the same path the live layer uses.' },
//       { label: 'Density', text: 'Lakh-scale point sets are thinned per zoom level, so the map stays readable when the whole fleet is in view.' },
//     ],
//     outcome:
//       'The map stack now runs on a single provider, the reports read from the same tracking store, and the front end renders the fleet without dropping frames during playback.',
//     diagram: {
//       kind: 'migration',
//       caption: 'The map stack, before and after the migration.',
//       from: {
//         label: 'Before, three providers',
//         nodes: [
//           { id: 'here', label: 'HERE Maps', sub: 'road tiles and geocoding' },
//           { id: 'osrm', label: 'OSRM', sub: 'routing and distance' },
//           { id: 'leaflet', label: 'Leaflet', sub: 'legacy map surface' },
//         ],
//       },
//       to: {
//         label: 'After, one stack',
//         nodes: [
//           { id: 'gmaps', label: 'Google Maps API', sub: 'tiles, context, geocoding' },
//           { id: 'deck', label: 'Deck.gl', sub: 'vehicles, tracks, heat' },
//         ],
//       },
//     },
//   },
//   {
//     slug: 'cold-storage-app',
//     waypoint: '02',
//     title: 'Cold Storage Management App',
//     kind: 'Operations product',
//     client: 'Cold chain operators (Lateral Emsoft)',
//     year: '2026',
//     role: 'Frontend developer',
//     stack: ['Vue 3', 'TypeScript', 'Pinia', 'Figma'],
//     summary:
//       'A stock and temperature operations app built from Figma files, with the temperature history a handler needs on one screen.',
//     context:
//       'The design existed in Figma and the operations screens were being rebuilt by hand in the browser. Nothing in the hand off said which values had to stay in sync, so the stock numbers drifted from the temperature history.',
//     idea:
//       'Treat the Figma file as the contract and the store as the source. Every screen reads from Pinia, so a temperature reading that changes in the list also changes in the chart and in the alert row.',
//     craft: [
//       { label: 'Store', text: 'Pinia holds stock, bays and readings, with selectors for the values each screen needs.' },
//       { label: 'Handoff', text: 'Spacing, type and colour tokens were lifted straight from the Figma file into the CSS custom properties.' },
//       { label: 'Readings', text: 'The history chart stays legible on a phone in a cold room with gloves on.' },
//     ],
//     outcome:
//       'The operations screens shipped as a Vue 3 and TypeScript app with a shared store, and the design file and the running app now say the same thing.',
//     diagram: {
//       kind: 'pipeline',
//       caption: 'From the design file to the running app.',
//       nodes: [
//         { id: 'figma', label: 'Figma file', sub: 'frames, tokens, states' },
//         { id: 'vue', label: 'Vue 3 app', sub: 'components and routes' },
//         { id: 'pinia', label: 'Pinia store', sub: 'stock, bays, readings' },
//         { id: 'api', label: 'Operations API', sub: 'stock and sensor data' },
//       ],
//     },
//   },
//   {
//     slug: 'tile-server',
//     waypoint: '03',
//     title: 'Tile Server for Ras Al Khaimah',
//     kind: 'Map infrastructure',
//     client: 'Mapping team (Lateral Emsoft)',
//     year: '2025',
//     role: 'Frontend and infrastructure developer',
//     stack: ['QGIS', 'Docker', 'Tile serving', 'Mapbox', 'Leaflet'],
//     summary:
//       'A self-hosted tile pipeline for a region that came back empty, built from QGIS tiles running in Docker.',
//     context:
//       'After a provider change the map showed a blank rectangle over Ras Al Khaimah. The client side was fine, so the fix had to happen under the map: a region that no upstream tile server would draw.',
//     idea:
//       'Render the tiles ourselves. QGIS cuts the raster into a pyramid, a small container serves it in the standard tile scheme, and the client asks for tiles the same way it always did.',
//     craft: [
//       { label: 'Pyramid', text: 'QGIS exports a tile pyramid with the right zoom levels and extent for the region.' },
//       { label: 'Container', text: 'The tile server runs in Docker so it starts on any machine the team uses.' },
//       { label: 'Scheme', text: 'The tiles are served in the same z/x/y scheme the map client already requested.' },
//     ],
//     outcome:
//       'The region renders on the live map again, served from the team\u2019s own container instead of a blank area.',
//     diagram: {
//       kind: 'pipeline',
//       caption: 'The tile pipeline that filled the empty region.',
//       nodes: [
//         { id: 'qgis', label: 'QGIS', sub: 'raster and vector source' },
//         { id: 'pyramid', label: 'Tile pyramid', sub: 'zoom levels and extent' },
//         { id: 'docker', label: 'Docker container', sub: 'tile server' },
//         { id: 'client', label: 'Map client', sub: 'z/x/y requests' },
//       ],
//     },
//   },
//   {
//     slug: 'fleet-analytics',
//     waypoint: '04',
//     title: 'Driver and Vehicle Analytics',
//     kind: 'Data product',
//     client: 'Transport operators (Lateral Emsoft)',
//     year: '2025',
//     role: 'Frontend developer, data modelling',
//     stack: ['SQL', 'Metabase', 'PostgreSQL'],
//     summary:
//       'Dashboards for driver, vehicle and group performance, modelled in SQL and published where the operations team already works.',
//     context:
//       'The operation needed to know which drivers were behind on their routes and which vehicles were carrying more than their share of the load. The numbers existed in the tracking database and nowhere else.',
//     idea:
//       'Model the three questions separately in SQL, driver, vehicle and group, then publish each one as its own dashboard. The dashboards read the model instead of recomputing it in the browser.',
//     craft: [
//       { label: 'Model', text: 'One SQL model per level, so a driver number and a group number never disagree.' },
//       { label: 'Publish', text: 'Metabase serves the dashboards, which meant no new tool for the operations team to learn.' },
//       { label: 'Detail', text: 'Every dashboard cell opens the rows behind it, so a number can be traced to a trip.' },
//     ],
//     outcome:
//       'Driver, vehicle and group performance moved out of ad hoc queries and into three dashboards that the operations team checks every morning.',
//     diagram: {
//       kind: 'modules',
//       caption: 'The three levels of the performance model.',
//       nodes: [
//         { id: 'trips', label: 'Trips', sub: 'routes, stops, durations' },
//         { id: 'drivers', label: 'Drivers', sub: 'on time, distance, load' },
//         { id: 'vehicles', label: 'Vehicles', sub: 'utilisation, downtime' },
//         { id: 'groups', label: 'Groups', sub: 'fleet totals, targets' },
//         { id: 'metabase', label: 'Metabase', sub: 'dashboards' },
//         { id: 'read', label: 'Operations', sub: 'morning check' },
//       ],
//     },
//   },
//   {
//     slug: 'skycast-weather',
//     waypoint: '05',
//     title: 'SkyCast Weather',
//     kind: 'Open source style app',
//     client: 'Personal project',
//     year: '2026',
//     role: 'Frontend developer',
//     stack: ['HTML', 'JavaScript', 'Tailwind CSS', 'OpenWeather API'],
//     summary:
//       'A small weather app that shows current conditions and the next five days, written to learn the API end to end.',
//     context:
//       'I wanted to know what the request, the parsing and the refresh cycle looked like in something small enough to finish in a week, without a framework in the way.',
//     idea:
//       'Keep it plain: semantic HTML, a small JavaScript module that owns the fetch and the state, and a refresh that only redraws the values that changed.',
//     craft: [
//       { label: 'Fetch', text: 'One endpoint, one place that knows how the response is shaped.' },
//       { label: 'State', text: 'The screen reads a small state object, so the refresh never touches the DOM it does not need to.' },
//       { label: 'Layout', text: 'A single column that reflows to two on a wide screen, built with utility classes only.' },
//     ],
//     outcome:
//       'The app runs, the forecast updates on its own, and it is the smallest complete thing in this portfolio.',
//     diagram: {
//       kind: 'pipeline',
//       caption: 'The whole app in four parts.',
//       nodes: [
//         { id: 'api', label: 'OpenWeather API', sub: 'current and forecast' },
//         { id: 'fetch', label: 'Fetch module', sub: 'request and parse' },
//         { id: 'state', label: 'State object', sub: 'values that changed' },
//         { id: 'view', label: 'View', sub: 'semantic HTML' },
//       ],
//     },
//   },
// ];

// export const also = [
//   {
//     title: 'Field app interface',
//     text: 'Modernised the interface of a client Ionic and Angular application, including the forms and the list views.',
//   },
//   {
//     title: 'Route history reports',
//     text: 'Rebuilt legacy Mapbox reports in the Google Maps API with click to view location and playback of a route.',
//   },
// ];

// export const process = [
//   { step: 'Read', text: 'Start from the data and the questions people actually ask of it, not from the screen I want to draw.' },
//   { step: 'Draw', text: 'One map surface, one store, one vocabulary. The design file and the code use the same names.' },
//   { step: 'Ship', text: 'Build it in the real stack, measure it on a phone in daylight, then take out what did not earn its place.' },
// ];


export type Role = {
  title: string;
  company: string;
  location: string;
  from: string;
  to: string;
  summary: string;
  points: string[];
};

export type DiagramNode = { id: string; label: string; sub?: string };
export type Diagram = {
  kind: 'migration' | 'pipeline' | 'modules';
  caption: string;
  from?: { label: string; nodes: DiagramNode[] };
  to?: { label: string; nodes: DiagramNode[] };
  nodes?: DiagramNode[];
};

export type Project = {
  slug: string;
  waypoint: string;
  title: string;
  kind: string;
  client: string;
  year: string;
  role: string;
  stack: string[];
  summary: string;
  context: string;
  idea: string;
  craft: { label: string; text: string }[];
  outcome: string;
  diagram: Diagram;
};

export const site = {
  name: 'Mohammad Farhan Shaikh',
  mark: 'MFS',
  role: 'Frontend Developer',
  url: 'https://mohammadfarhanshaikh.com',
  description:
    'I’m Mohammad Farhan Shaikh, a frontend developer turning complex workflows and live data into clear, responsive web experiences with Vue and TypeScript.',
  email: 'fnshaikh78666@gmail.com',
  location: 'Navi Mumbai, India',
  coordinates: '18.98 N / 73.03 E',
  timezone: 'Asia/Kolkata',
  socials: [
    { label: 'GitHub', href: 'https://github.com/Mohammad-Farhan-Shaikh' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/mohammad-farhan-shaikh70' },
    { label: 'mohammadfarhanshaikh.com', href: 'https://mohammadfarhanshaikh.com' },
  ],
};

export const statement =
  'Good frontend work should feel effortless to use—even when the problem behind it is complex. I build thoughtful interfaces for real-world products, from live fleet tracking to operational tools and data-rich dashboards.';

export const roles: Role[] = [
  {
    title: 'Software Developer',
    company: 'Lateral Emsoft Pvt. Ltd',
    location: 'Navi Mumbai, India',
    from: 'Apr 2025',
    to: 'Present',
    summary:
      'At Lateral Emsoft, I build and improve production web applications used to track fleets, manage operations, and make sense of business data. My focus is turning complex workflows into interfaces people can actually use.',
    points: [
      'Built interactive fleet-tracking experiences with Vue, TypeScript, Deck.gl, and Google Maps—bringing live vehicle positions and dense GPS data into a single, usable view.',
      'Helped consolidate a multi-provider mapping setup into one integrated stack, making the tracking experience more consistent across the product.',
      'Modernized legacy route-history reports with clearer location details and trip playback, helping users follow a journey instead of piecing it together.',
      'Turned Figma designs into a Vue 3 and TypeScript cold-storage management app, using Pinia to keep shared operational data in sync across screens.',
      'Helped restore missing map coverage for Ras Al Khaimah by connecting QGIS tile generation, Docker, and the application’s existing map workflow.',
      'Shaped driver, vehicle, and group-level data with SQL and made it easier to explore through Metabase dashboards.',
    ],
  },
];

export const stack: { group: string; items: string[] }[] = [
  {
    group: 'Frontend Development',
    items: ['Vue 3', 'TypeScript', 'Pinia', 'Angular', 'Ionic', 'Tailwind CSS'],
  },
  {
    group: 'Data and Visualization',
    items: ['SQL', 'Metabase', 'Deck.gl', 'PostgreSQL'],
  },
  {
    group: 'Mapping Technologies',
    items: ['Google Maps API', 'Leaflet', 'Mapbox', 'HERE Maps', 'OSRM', 'QGIS'],
  },
  {
    group: 'Tools and Backend',
    items: ['Docker', 'Node.js', 'Vite', 'Git'],
  },
];

export const education = [
  {
    title: 'Bachelor of Vocation, Software Development',
    school: 'Pune University',
    from: 'Jul 2021',
    to: 'Apr 2024',
    note: 'Grade 9.3 out of 10',
  },
];

export const projects: Project[] = [
  {
    slug: 'fleet-map-tracking',
    waypoint: '01',
    title: 'Fleet Map Tracking',
    kind: 'Real-time product interface',
    client: 'Transport operators (Lateral Emsoft)',
    year: '2025 to 2026',
    role: 'Frontend developer',
    stack: ['Vue 3', 'TypeScript', 'Deck.gl', 'Google Maps API', 'SQL'],
    summary:
      'One map. Live fleet activity. A clearer view of every journey. An interactive tracking experience that brings vehicle positions, routes, and trip history together.',
    context:
      'A journey could be spread across different mapping providers, leaving operators to work harder just to follow one vehicle. The interface needed to make live activity and trip history feel like one connected experience.',
    idea:
      'I helped bring the experience into one cohesive map interface: Google Maps for the base layer, Deck.gl for high-volume vehicle and route data, and consistent application state across views.',
    craft: [
      {
        label: 'Interactive views',
        text: 'Separated live positions, route geometry, and trip history into controllable layers, so users can focus on the information they need without losing context.',
      },
      {
        label: 'Trip playback',
        text: 'Added trip playback that follows the recorded route, making it easier to review how a vehicle moved over time.',
      },
      {
        label: 'Large datasets',
        text: 'Adjusted GPS detail by zoom level to keep dense vehicle data readable as users move between wide-area and closer views.',
      },
    ],
    outcome:
      'The result is a more unified tracking workflow: one mapping stack, consistent tracking data, and a single place to follow vehicles and review journeys.',
    diagram: {
      kind: 'migration',
      caption: 'How the tracking interface moved from multiple providers to one stack.',
      from: {
        label: 'Before: multiple providers',
        nodes: [
          { id: 'here', label: 'HERE Maps', sub: 'road tiles and geocoding' },
          { id: 'osrm', label: 'OSRM', sub: 'routing and distance' },
          { id: 'leaflet', label: 'Leaflet', sub: 'legacy map surface' },
        ],
      },
      to: {
        label: 'After: one integrated stack',
        nodes: [
          { id: 'gmaps', label: 'Google Maps API', sub: 'base map and geocoding' },
          { id: 'deck', label: 'Deck.gl', sub: 'vehicles, routes, and data layers' },
        ],
      },
    },
  },
  {
    slug: 'cold-storage-app',
    waypoint: '02',
    title: 'Cold Storage Management App',
    kind: 'Operations product interface',
    client: 'Cold chain operators (Lateral Emsoft)',
    year: '2026',
    role: 'Frontend developer',
    stack: ['Vue 3', 'TypeScript', 'Pinia', 'Figma'],
    summary:
      'A business-facing interface for cold-storage operations, bringing stock, storage bays, temperature readings, and alerts into a more legible daily workflow.',
    context:
      'Cold-storage teams need to scan operational details quickly. Stock, bay assignments, temperature readings, and alerts had to be easy to understand—and stay consistent as users moved between screens.',
    idea:
      'I translated the supplied Figma designs into a Vue interface and used Pinia to keep shared information aligned across the app’s operational views.',
    craft: [
      {
        label: 'State management',
        text: 'Pinia stores stock, bay, and temperature information for the screens that need it.',
      },
      {
        label: 'UI implementation',
        text: 'The interface follows the spacing, typography, and colour choices defined in the Figma designs.',
      },
      {
        label: 'Information display',
        text: 'Temperature history and operational details are presented in a layout designed to be easy to scan.',
      },
    ],
    outcome:
      'The designs became a working Vue 3 and TypeScript application, with shared state supporting a consistent experience across the operations screens.',
    diagram: {
      kind: 'pipeline',
      caption: 'From design files to the working application.',
      nodes: [
        { id: 'figma', label: 'Figma designs', sub: 'layouts, styles, and states' },
        { id: 'vue', label: 'Vue 3 app', sub: 'components and routes' },
        { id: 'pinia', label: 'Pinia store', sub: 'stock, bays, and readings' },
        { id: 'api', label: 'Operations API', sub: 'stock and sensor data' },
      ],
    },
  },
  {
    slug: 'tile-server',
    waypoint: '03',
    title: 'Tile Server for Ras Al Khaimah',
    kind: 'Infrastructure and integration',
    client: 'Mapping team (Lateral Emsoft)',
    year: '2025',
    role: 'Frontend and infrastructure developer',
    stack: ['QGIS', 'Docker', 'Tile serving', 'Mapbox', 'Leaflet'],
    summary:
      'A self-hosted tile-serving workflow that restored missing map coverage for a specific region.',
    context:
      'Following a provider change, one region appeared blank in the application. The client interface was still requesting tiles, so the issue needed to be addressed in the tile data and serving workflow.',
    idea:
      'Generate the required tiles with QGIS and serve them from a Docker container using the standard tile scheme already expected by the client.',
    craft: [
      {
        label: 'Tile generation',
        text: 'QGIS creates a tile pyramid with the required zoom levels and geographic extent.',
      },
      {
        label: 'Container setup',
        text: 'Docker packages the tile-serving workflow so it can be run in the team environment.',
      },
      {
        label: 'Client integration',
        text: 'The tiles use the z/x/y request format expected by the existing application.',
      },
    ],
    outcome:
      'The missing region became available in the application through the team-managed tile-serving workflow.',
    diagram: {
      kind: 'pipeline',
      caption: 'The workflow used to generate and serve the regional tiles.',
      nodes: [
        { id: 'qgis', label: 'QGIS', sub: 'raster and vector source' },
        { id: 'pyramid', label: 'Tile pyramid', sub: 'zoom levels and extent' },
        { id: 'docker', label: 'Docker container', sub: 'tile server' },
        { id: 'client', label: 'Application', sub: 'requests the required tiles' },
      ],
    },
  },
  {
    slug: 'fleet-analytics',
    waypoint: '04',
    title: 'Driver and Vehicle Analytics',
    kind: 'Data and analytics',
    client: 'Transport operators (Lateral Emsoft)',
    year: '2025',
    role: 'Data modelling and analytics',
    stack: ['SQL', 'Metabase', 'PostgreSQL'],
    summary:
      'Performance dashboards for drivers, vehicles, and groups, backed by SQL models and published through Metabase.',
    context:
      'The operations team needed a clearer way to review driver performance, vehicle usage, and group-level figures. Much of the information was available in the tracking database but was not easy to review in one place.',
    idea:
      'Organize the data into separate SQL models for drivers, vehicles, and groups, then publish the resulting views in Metabase for the operations team.',
    craft: [
      {
        label: 'Data modelling',
        text: 'Separate SQL models organize the measures needed for driver, vehicle, and group-level reporting.',
      },
      {
        label: 'Dashboards',
        text: 'Metabase presents the results in dashboards within the team’s existing workflow.',
      },
      {
        label: 'Detail',
        text: 'Dashboard details help users investigate the records behind key figures.',
      },
    ],
    outcome:
      'Driver, vehicle, and group reporting became available through dedicated Metabase dashboards instead of relying only on ad hoc queries.',
    diagram: {
      kind: 'modules',
      caption: 'How the performance data is organized for reporting.',
      nodes: [
        { id: 'trips', label: 'Trips', sub: 'routes, stops, and durations' },
        { id: 'drivers', label: 'Drivers', sub: 'timing, distance, and load' },
        { id: 'vehicles', label: 'Vehicles', sub: 'utilisation and downtime' },
        { id: 'groups', label: 'Groups', sub: 'fleet totals and targets' },
        { id: 'metabase', label: 'Metabase', sub: 'analytics dashboards' },
        { id: 'read', label: 'Operations team', sub: 'reviews performance data' },
      ],
    },
  },
  {
    slug: 'skycast-weather',
    waypoint: '05',
    title: 'SkyCast Weather',
    kind: 'API-driven frontend project',
    client: 'Personal project',
    year: '2026',
    role: 'Frontend developer',
    stack: ['HTML', 'JavaScript', 'Tailwind CSS', 'OpenWeather API'],
    summary:
      'A lightweight weather app that turns live API data into a quick, responsive snapshot of current conditions and the next five days.',
    context:
      'The challenge was making the full data journey feel simple: request weather data, handle the response, and present the useful details without cluttering the screen.',
    idea:
      'I kept the build intentionally lean: semantic HTML, a focused JavaScript fetch module, and a responsive Tailwind layout that puts the forecast first.',
    craft: [
      {
        label: 'API integration',
        text: 'A dedicated fetch module handles the request and the shape of the API response.',
      },
      {
        label: 'Application state',
        text: 'The interface reads from a small state object so updated weather values can be rendered consistently.',
      },
      {
        label: 'Responsive layout',
        text: 'The layout adjusts from a single column on smaller screens to a wider arrangement on larger screens.',
      },
    ],
    outcome:
      'A focused end-to-end frontend project that connects a live weather API to a responsive interface for current conditions and a five-day outlook.',
    diagram: {
      kind: 'pipeline',
      caption: 'The main parts of the weather application.',
      nodes: [
        { id: 'api', label: 'OpenWeather API', sub: 'current conditions and forecast' },
        { id: 'fetch', label: 'Fetch module', sub: 'request and parse data' },
        { id: 'state', label: 'State object', sub: 'stores weather values' },
        { id: 'view', label: 'Interface', sub: 'displays the forecast' },
      ],
    },
  },
];

export const also = [
  {
    title: 'Field App Interface',
    text: 'Refined forms and list views in an existing Ionic and Angular app, making everyday tasks clearer and easier to move through.',
  },
  {
    title: 'Route History Reports',
    text: 'Improved a route-history experience with Google Maps integration, clearer location context, and journey playback.',
  },
];

export const process = [
  {
    step: 'Plan',
    text: 'First, I get clear on the user’s task, the messy parts of the workflow, and the information that matters most.',
  },
  {
    step: 'Build',
    text: 'I turn that understanding into a considered interface-with reusable components, predictable state, and interactions that make sense.',
  },
  {
    step: 'Refine',
    text: 'Then I test the details, smooth out friction, and make sure the experience holds up across screen sizes and real usage.',
  },
];
