<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { scrollToTarget } from '../engine';

const show = ref(false);

const onScroll = () => {
  show.value = window.scrollY > 400;
};

const top = () => {
  scrollToTarget(0);
};

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll);
});
</script>

<template>
  <button class="top-btn" type="button" :class="{ 'is-show': show }" aria-label="Scroll to top" @click="top">
    <span class="top-btn__arrow" aria-hidden="true">↑</span>
  </button>
</template>

<style scoped>
.top-btn {
  position: fixed;
  right: calc(var(--gutter) + 3.6rem);
  bottom: var(--gutter);
  z-index: calc(var(--z-header) - 1);
  width: 2.4rem;
  height: 2.4rem;
  display: grid;
  place-items: center;
  border: 1px solid var(--c-line);
  background: color-mix(in srgb, var(--c-ground) 90%, transparent);
  backdrop-filter: blur(6px);
  visibility: hidden;
  opacity: 0;
  pointer-events: none;
  transform: translateY(10px);
  transition: opacity 0.25s ease, transform 0.25s ease, border-color 0.25s ease, visibility 0s 0.25s;
}
.top-btn.is-show {
  visibility: visible;
  opacity: 1;
  pointer-events: auto;
  transform: translateY(0);
  transition: opacity 0.25s ease, transform 0.25s ease, border-color 0.25s ease, visibility 0s 0s;
}
.top-btn:hover {
  border-color: var(--c-ink);
}
</style>
