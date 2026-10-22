# DESIGN — Mohammad Farhan Shaikh

## Brief (Phase 0)

- **Subject:** Mohammad Farhan Shaikh, frontend developer working on maps and real-time
  tracking systems (Deck.gl on Google Maps API, Vue 3 + TypeScript, SQL/Metabase analytics).
  Currently at Lateral Emsoft Pvt. Ltd, Navi Mumbai. B.Voc Software Development, Pune
  University, 2024.
- **Audience:** hiring managers, engineering leads, recruiters. Screen one is a laptop, often
  a phone, often in a tab they will close after 20 seconds.
- **Job:** get hired for frontend work that involves maps, telemetry and dashboards.
- **Assets:** none supplied. Previous builds in the parent folder carried a resume-shaped data
  file; that is the source of the facts below (flagged in the hand-off as "verify").
- **Language:** English. **Stack:** Astro (static HTML, ClientRouter page swaps, ~75 KB of JS)
  because this is a content site whose motion is the product.

### Assumptions (placeholders)

1. "Lakhs of GPS points" is his own phrasing and is kept qualitative, not turned into a number.
2. The exact scope of each project is inferred from one-line notes; the case studies say what
   shipped, never a metric that was not verified.
3. Contact links (GitHub, LinkedIn, personal domain) come from the earlier build and are used
   as-is; the site URL `mohammadfarhanshaikh.com` is the production URL.
4. No photography exists. Every image on the site is a vector chart or diagram drawn from
   the real architecture of the work. Nothing is a fake screenshot.

---

## Concept (Phase 1)

Three territories were explored: the material of the profession (maps and telemetry), a
process metaphor (the track log of a vehicle crossing a city), and a formal system (the
quadkey tile grid).

| | A. The plotting sheet | B. The track log | C. The tile grid |
|---|---|---|---|
| Idea | The portfolio is a survey sheet: the reader's route through the work is plotted as a track, projects are waypoints, a readout reports the position on the sheet | The portfolio is a GPS log: each project is a leg, with timestamps, distance and stops | The page is assembled from map tiles that load as you scroll |
| Layout | Chart sheet with graticule, grid references, scale bar, north arrow, marginal data columns | Log table with timestamps and elevation profile | Tile mosaic, 256 px squares |
| Motion verb | Plot: lines draw, markers settle into register, readouts tick | Drive: the log writes itself line by line | Load: tiles snap in |
| Anchor | He builds tracking maps, migrated map stacks and a QGIS + Docker tile server | Same domain, told as a journey instead of an instrument | He fixed a missing-tile region with his own tile server |
| Signature | The track draws itself as you scroll; hovering a project plots a spur to its waypoint and the readout switches to that project's data | The log writes itself | Tiles snap in |
| O / F / Fe / P | 4 / 5 / 5 / 3 | 3 / 4 / 4 / 3 | 3 / 4 / 3 / 3 |

**Picked A.** It fits the work (a sheet is where a route is plotted before it is driven),
it survives to the footer, the case pages and the 404, and it is a drawing rather than a
decoration: every line on the site is data. B is a variation of A with a weaker frame, so
nothing was taken from it except the idea that a readout must carry real numbers.

### Concept card

```
Idea:        His portfolio is a survey sheet. The route through his work is plotted on it
             and a readout says where you are.
Metaphor:    The plotting sheet of a surveyor: graticule, grid references, waypoints, scale bar.
Signature:   The plotted track: a polyline draws itself as you scroll, waypoint markers settle
             into register as the line reaches them, and the readout (grid ref, bearing,
             waypoint index, local time in Navi Mumbai) is driven by the same one variable.
Emotion:     Instrumented calm. Precision, and the pleasure of a drawing that resolves.
Motion verb: Plot. Lines draw, points settle, numbers tick.
Screenshot:  The masthead set huge over a graticule, the vermilion track entering from the
             left edge, waypoint 01 marked, readout in the corner.
```

---

## Art direction (Phase 2)

### Palette

| Role | Value | Source |
|---|---|---|
| `--c-ground` | `#ECEDE8` | Uncoated plotter paper, cool bone, never cream |
| `--c-ink` | `#15181B` | Printer's black, slightly blue |
| `--c-muted` | `#5A6167` | Graphite pencil for marginal data (5.5:1 on ground) |
| `--c-line` | `rgba(21,24,27,0.14)` | Hairline rules and graticule |
| `--c-route` | `#C63A1C` | The route ink: one vermilion, used for the track, markers and active state (5.0:1 on ground) |
| `--c-panel` | `#15181B` | The readout panel is an ink block with paper type |

Second ink on the graticule only: `rgba(74,110,138,0.30)` survey blue, for water and
secondary graticule lines. No gradients, no glow, no glass.

### Type

- **Display and text:** Archivo (variable, `wdth` 62–125, `wght` 100–900), self-hosted
  woff2, latin subset, 88 KB. Used at `wdth 100` for reading, `wdth 118` for the masthead.
  The width axis is the site's typographic instrument: a label can be *set to its measure*.
- **Data:** Fragment Mono 400 (25 KB) for grid references, coordinates, dates, stack lists
  and readouts. Mono is used only where the content is data, never for decoration.
- Scale: `--t-mega clamp(3.1rem, 1rem + 9.2vw, 9.25rem)`, `--t-xl clamp(2rem, 1.15rem + 3.2vw, 3.5rem)`,
  `--t-l clamp(1.5rem, 1.15rem + 1.5vw, 2.3rem)`, `--t-m 1.25rem`, `--t-body clamp(1rem, .96rem + .2vw, 1.125rem)`,
  `--t-s .875rem`, `--t-xs .75rem`. Display tracking −0.035em (mega −0.045em), leading 0.86.
  Body 17 px / 1.55. Numbers tabular everywhere they can change.

### Grid and rhythm

12 columns, gutter `clamp(1.25rem, .55rem + 1.5vw, 2.5rem)`, outer margin equals gutter,
content capped at 1560 px and centred on wide screens. Titles hang from column 1, marginal
data from column 11, the chart occupies columns 8–12 in the work section. Section moods:
tight 2u, normal 4u, airy 7u, full viewport, assigned deliberately per section.

### Shape and motion

One radius rule: **0**. Nothing on a chart sheet is rounded. Eases: `expo.out` for entrances,
`expo.inOut` for the sheet change, `power3.out` for hover. Hovers 0.35 s, reveals 1.0–1.3 s
with 20–60 ms stagger, page transition 0.85 s each way, loader floor 1.1 s and ceiling 2.6 s.

Hover treatments, one per role, all in the "plot" verb:

- **Work rows (primary):** the row's title expands its width axis toward the measure
  (type being set to fit), the sheet's route marker for that project fills, and the readout
  switches to that project's year, role and stack. System response, not a colour swap.
- **Nav links:** the underline draws from the left, 1 px, 0.45 s.
- **Buttons and inline links:** the arrow chip travels along its direction; inline links in
  body copy keep their underline at rest.
- **Utility links** (colophon, legal, social): colour only.

### Composition plan

```
HERO (poster + chart sheet)
┌──────────────────────────────────────────────────────────────┐
│ MOHAMMAD FARHAN SHAIKH                    WORK ABOUT CONTACT  │  header
│  ┌─ graticule ─────────────────────────────────────────────┐  │
│  │                                                        │  │
│  │  MOHAMMAD                                             │  │
│  │  FARHAN                                               │  │  display, 3 lines
│  │  SHAIKH                                               │  │
│  │  ─────────────                                        │  │
│  │  Frontend developer. I build the map layer of          │  │
│  │  real-time tracking systems.                           │  │
│  │                                                        │  │
│  │  ◦──route──◦──◦                        ┌────────────┐  │  │
│  └──────────────────────────────────────────│ GRID  D4   │──┘  │  readout, ink panel
└──────────────────────────────────────────────────────────────┘

WORK (index list + sticky chart)
┌───────────────────────────────┬──────────────────────────────┐
│ 01  Fleet Map Tracking        │  ┌────────────────────────┐  │
│     Frontend developer, 2025  │  │   chart, sticky         │  │
│     Deck.gl, Google Maps      │  │   track + waypoints     │  │
│ ────────────────────────────  │  │   + readout             │  │
│ 02  Cold Storage Web App      │  └────────────────────────┘  │
│ ...                          │                              │
└───────────────────────────────┴──────────────────────────────┘

SYSTEM (facts + spec table)      CONTACT (ink panel, footer finale)
┌───────────────────────────────┐   ┌───────────────────────────┐
│ ▸ stack, grouped, mono        │   │ Start a conversation      │
│ ▸ role, timeline, dates       │   │ email · github · linkedin │
└───────────────────────────────┘   └───────────────────────────┘
```

Case study pages use a different family: sheet head (title + meta table), a full-width
vector diagram of the actual architecture, prose in two columns, a spec block, and a
"next waypoint" link that continues the route.

### Genericness test

A generic model asked for "a portfolio for a frontend developer" returns a dark card grid
with neon, a terminal hero and a "skills" wall of pills. Changed here: ground is paper, not
dark; there are no cards, pills or blobs; the imagery is a chart drawn from the real
architecture instead of stock or generated noise; the hero is a masthead over a drawing,
not a centred name over a gradient; the interaction is one instrument (the route and its
readout) rather than a stack of effects. Nothing on the site is a rounded container.

---

## Signature moment

One variable: `progress` (0–1) along the plotted route. It drives, in one place:

1. the length of the drawn route (`stroke-dashoffset`),
2. which waypoint markers have settled into register,
3. the readout (grid reference, bearing, waypoint index, run),
4. the route colour of the marker under the reader's position.

Hover on a work row maps the same variable to that project's waypoint, so the chart and the
list can never disagree. Idle: the position marker drifts a few pixels along its last leg
like a vehicle idling, and the local clock in Navi Mumbai keeps ticking. Off screen it
pauses; under reduced motion the route is drawn in full and nothing drifts.

---

## Explainer figure

Not applicable as an isometric figure: the diagrams that explain the systems are vector
drawings of the real architecture (map stack migration, tile pipeline, module map), and
the `anatomy` skill is not installed in this environment.
