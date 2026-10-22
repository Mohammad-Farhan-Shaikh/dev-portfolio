<script setup lang="ts">
import { computed } from 'vue';
import LiveRule from '../components/LiveRule.vue';
import Diagram from '../components/Diagram.vue';
import Chart from '../components/Chart.vue';
import { projects } from '../data/site';
import { projectBySlug } from '../router';

const props = defineProps<{ slug: string }>();

const project = computed(() => projectBySlug(props.slug));
const index = computed(() => projects.findIndex((p) => p.slug === props.slug));
const next = computed(() => projects[(index.value + 1) % projects.length]);
const prev = computed(() => projects[(index.value - 1 + projects.length) % projects.length]);
</script>

<template>
  <article v-if="project" class="case">
    <div class="shell">
      <header class="case__head">
        <p class="case__label mono">
          <span>Waypoint {{ project.waypoint }}</span>
          <span>{{ project.kind }}</span>
          <span>{{ project.year }}</span>
        </p>
        <h1 class="case__title" data-split="lines" data-intro>{{ project.title }}</h1>
        <p class="case__summary" data-reveal="up" data-intro data-delay="0.24">{{ project.summary }}</p>

        <div class="case__facts">
          <div class="case__plot" data-plot :data-active="index">
            <Chart :count="projects.length" :readout="false" />
          </div>
          <dl>
            <div class="fact">
              <dt>Client</dt>
              <dd>{{ project.client }}</dd>
            </div>
            <div class="fact">
              <dt>Role</dt>
              <dd>{{ project.role }}</dd>
            </div>
            <div class="fact">
              <dt>Stack</dt>
              <dd class="mono">{{ project.stack.join(' · ') }}</dd>
            </div>
          </dl>
        </div>
        <LiveRule />
      </header>

      <figure class="case__figure">
        <Diagram :diagram="project.diagram" />
        <figcaption class="mono">{{ project.diagram.caption }}</figcaption>
      </figure>

      <div class="case__body">
        <div class="case__prose">
          <h2>The situation</h2>
          <p>{{ project.context }}</p>
          <h2>The idea</h2>
          <p>{{ project.idea }}</p>
        </div>
        <aside class="case__aside">
          <h2 class="mono-label">How it was built</h2>
          <ul class="craft">
            <li v-for="c in project.craft" :key="c.label"><b>{{ c.label }}</b><span>{{ c.text }}</span></li>
          </ul>
        </aside>
      </div>

      <div class="case__outcome">
        <h2>Where it landed</h2>
        <p>{{ project.outcome }}</p>
      </div>

      <nav class="case__next" aria-label="Case studies">
        <RouterLink :to="`/work/${next.slug}/`">
          <span class="mono">Next waypoint &middot; {{ next.waypoint }}</span>
          <strong>{{ next.title }}</strong>
        </RouterLink>
        <RouterLink class="case__prev mono" :to="`/work/${prev.slug}/`">
          Previous &middot; {{ prev.waypoint }}
        </RouterLink>
      </nav>
    </div>
  </article>

  <section v-else class="notfound">
    <div class="shell">
      <p class="notfound__code">404</p>
      <h1>This sheet is not in the plot.</h1>
      <p>
        The route ends here. The work is still on the sheet, so head back to the start and take it from waypoint one.
      </p>
      <RouterLink class="btn" to="/">
        Back to the sheet <span class="btn__arrow" aria-hidden="true">&rarr;</span>
      </RouterLink>
    </div>
    <LiveRule />
  </section>
</template>
