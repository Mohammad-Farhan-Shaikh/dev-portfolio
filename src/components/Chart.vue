<script setup lang="ts">
import { usePlotStore } from '../stores/plot';

withDefaults(defineProps<{ count?: number; readout?: boolean }>(), { count: 5, readout: true });

const plot = usePlotStore();
</script>

<template>
  <div class="chart" data-chart :data-count="count" aria-hidden="true"></div>

  <div v-if="readout" class="readout" data-readout>
    <div v-for="(row, i) in plot.rows" :key="i" class="readout__row">
      <span :data-ro="i">{{ row.label }}</span>
      <b :data-rv="i">{{ row.value }}</b>
    </div>
  </div>
</template>
