<script setup lang="ts">
import LiveRule from '../components/LiveRule.vue';
import ProjectRow from '../components/ProjectRow.vue';
import Chart from '../components/Chart.vue';
import { projects } from '../data/site';
import { plotCaption } from '../data/plot';
</script>

<template>
  <section class="page-head">
    <div class="shell">
      <p class="page-head__label mono">Sheet 01 &middot; Work</p>
      <h1 class="page-head__title" data-split="lines" data-intro>Five waypoints</h1>
      <p class="page-head__lead" data-reveal="up" data-intro data-delay="0.2">
        The route below is the order the work was built in. Every waypoint opens the case study behind it.
      </p>
    </div>
    <LiveRule />
  </section>

  <section class="work work--index">
    <div class="shell">
      <div class="work__grid">
        <ol class="work__list" data-work-list>
          <ProjectRow v-for="(p, i) in projects" :key="p.slug" :project="p" :index="i" :total="projects.length" />
        </ol>
        <div class="work__chart" data-plot>
          <Chart :count="projects.length" />
          <p class="plot-caption mono">{{ plotCaption }}</p>
        </div>
      </div>

      <table class="index-table">
        <caption class="sr-only">Case studies, waypoint order</caption>
        <thead>
          <tr>
            <th scope="col">Waypoint</th>
            <th scope="col">Project</th>
            <th scope="col">Kind</th>
            <th scope="col">Year</th>
            <th scope="col">Stack</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="p in projects" :key="p.slug">
            <td class="mono">{{ p.waypoint }}</td>
            <td><RouterLink :to="`/work/${p.slug}/`">{{ p.title }}</RouterLink></td>
            <td class="mono">{{ p.kind }}</td>
            <td class="mono">{{ p.year }}</td>
            <td class="mono">{{ p.stack.join(' · ') }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>
