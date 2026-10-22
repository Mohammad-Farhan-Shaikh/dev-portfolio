<script setup lang="ts">
import { ref, onMounted } from 'vue';

const theme = ref<'light' | 'dark'>('light');

const apply = (t: 'light' | 'dark') => {
  theme.value = t;
  document.documentElement.setAttribute('data-theme', t);
  localStorage.setItem('theme', t);
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', t === 'dark' ? '#101315' : '#ECEDE8');
};

const toggle = () => {
  apply(theme.value === 'dark' ? 'light' : 'dark');
};

onMounted(() => {
  // index.html sets this before first paint; only sync the button label here.
  theme.value = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
});
</script>

<template>
  <button class="theme-toggle" type="button" :aria-label="theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'" @click="toggle">
    <span class="theme-toggle__icon" aria-hidden="true">{{ theme === 'dark' ? '☀' : '☾' }}</span>
    <span class="theme-toggle__label mono" aria-hidden="true">{{ theme === 'dark' ? 'Light' : 'Dark' }}</span>
  </button>
</template>

<style scoped>
.theme-toggle {
  position: fixed;
  right: var(--gutter);
  bottom: var(--gutter);
  z-index: calc(var(--z-header) - 1);
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.5rem 0.7rem;
  border: 1px solid var(--c-line);
  background: color-mix(in srgb, var(--c-ground) 90%, transparent);
  backdrop-filter: blur(6px);
  font-size: var(--t-xs);
}
.theme-toggle__icon {
  font-size: 0.9rem;
}
.theme-toggle:hover {
  border-color: var(--c-ink);
}
</style>
