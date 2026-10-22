<script setup lang="ts">
import { site } from '../data/site';

const year = new Date().getFullYear();
</script>

<template>
  <footer class="site-foot">
    <div class="shell">
      <div class="foot__grid">
        <div class="foot__cta">
          <h2 data-split="lines" data-intro>Got a map to build?</h2>
          <a class="mono" :href="`mailto:${site.email}`">{{ site.email }}</a>
        </div>
        <nav class="foot__links" aria-label="Elsewhere">
          <a v-for="s in site.socials" :key="s.href" :href="s.href" rel="noopener me" target="_blank">
            {{ s.label }}
          </a>
        </nav>
      </div>
      <div class="foot__bottom mono">
        <span>&copy; {{ year }} {{ site.name }}</span>
        <span>{{ site.location }} &middot; {{ site.coordinates }}</span>
        <span>Set in Archivo and Fragment Mono</span>
      </div>
    </div>
  </footer>
</template>
