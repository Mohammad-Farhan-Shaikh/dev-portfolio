<script setup lang="ts">
import type { Diagram } from '../data/site';

defineProps<{ diagram: Diagram }>();
</script>

<template>
  <div class="diagram">
    <template v-if="diagram.kind === 'migration' && diagram.from && diagram.to">
      <div class="diagram__cols">
        <div class="diagram__col">
          <span class="mono">{{ diagram.from.label }}</span>
          <div v-for="n in diagram.from.nodes" :key="n.id" class="diagram__node">
            <b>{{ n.label }}</b><span v-if="n.sub">{{ n.sub }}</span>
          </div>
        </div>
        <span class="diagram__arrow" aria-hidden="true"></span>
        <div class="diagram__col">
          <span class="mono">{{ diagram.to.label }}</span>
          <div v-for="n in diagram.to.nodes" :key="n.id" class="diagram__node">
            <b>{{ n.label }}</b><span v-if="n.sub">{{ n.sub }}</span>
          </div>
        </div>
      </div>
    </template>

    <template v-else-if="diagram.kind === 'pipeline' && diagram.nodes">
      <div class="diagram__row">
        <div v-for="n in diagram.nodes" :key="n.id" class="diagram__node">
          <b>{{ n.label }}</b><span v-if="n.sub">{{ n.sub }}</span>
        </div>
      </div>
    </template>

    <template v-else-if="diagram.kind === 'modules' && diagram.nodes">
      <div class="diagram__row">
        <div v-for="n in diagram.nodes.slice(0, 4)" :key="n.id" class="diagram__node">
          <b>{{ n.label }}</b><span v-if="n.sub">{{ n.sub }}</span>
        </div>
      </div>
      <div class="diagram__stack">
        <div v-for="n in diagram.nodes.slice(4)" :key="n.id" class="diagram__node">
          <b>{{ n.label }}</b><span v-if="n.sub">{{ n.sub }}</span>
        </div>
      </div>
    </template>
  </div>
</template>
