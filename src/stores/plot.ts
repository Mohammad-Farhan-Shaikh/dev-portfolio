import { defineStore } from 'pinia';

export type ReadoutRow = { label: string; value: string };

/** The instrument readout: where the reader is on the sheet. */
export const usePlotStore = defineStore('plot', {
  state: () => ({
    active: 0,
    rows: [
      { label: 'Waypoint', value: '01 / 05' },
      { label: 'Grid', value: 'A 01' },
      { label: 'Bearing', value: '---' },
      { label: 'Navi Mumbai', value: '--:-- IST' },
    ] as ReadoutRow[],
  }),
  actions: {
    setActive(index: number) {
      this.active = index;
    },
    setRows(rows: [string, string][]) {
      this.rows = rows.map(([label, value]) => ({ label, value }));
    },
  },
});
