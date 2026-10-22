<script setup lang="ts">
import type { Project } from '../data/site';

defineProps<{ project: Project; index: number; total: number }>();
</script>

<template>
  <li class="work__item">
    <RouterLink
      class="work__row"
      :to="`/work/${project.slug}/`"
      :data-waypoint="index"
      :data-title="project.title"
    >
      <span class="work__num mono">{{ project.waypoint }}</span>
      <span class="work__title">{{ project.title }}</span>
      <span class="work__meta">
        <span class="work__kind mono">{{ project.kind }}</span>
        <span class="mono">{{ project.year }}</span>
        <span class="mono">{{ project.stack[0] }}</span>
      </span>
      <span class="sr-only">
        Waypoint {{ project.waypoint }} of {{ total }}. {{ project.kind }}, {{ project.year }}.
      </span>
    </RouterLink>
  </li>
</template>
