import { createApp, nextTick } from 'vue';
import { createPinia } from 'pinia';
import { createRouter, createWebHistory } from 'vue-router';

import App from './App.vue';
import { routes } from './router';
import { applyMeta } from './composables/useMeta';
import { boot, leave, enter, scrollToTarget } from './engine';
import { setup } from './motion/setup';

import './styles/tokens.css';
import './styles/engine.css';
import './styles/base.css';

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => false, // Lenis owns the scroll position
});

const app = createApp(App);
app.use(createPinia());
app.use(router);

const scrollToHash = (hash: string) => {
  if (hash) requestAnimationFrame(() => scrollToTarget(hash, -80));
};

// The curtain covers the page while the route swaps.
router.beforeEach(async (to, from) => {
  if (from.name && to.path !== from.path) await leave();
  return true;
});

router.afterEach(async (to, from) => {
  applyMeta(to);
  if (!from.name) return; // the first page is booted below
  if (to.path === from.path) {
    // Same page, new anchor: no curtain, just plot the position.
    scrollToHash(to.hash);
    return;
  }
  await nextTick();
  await enter();
  scrollToHash(to.hash);
});

router.isReady().then(async () => {
  app.mount('#app');
  await boot(setup);
  document.documentElement.dataset.appReady = '1';
  scrollToHash(router.currentRoute.value.hash);
});

