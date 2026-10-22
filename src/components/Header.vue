<script setup lang="ts">
import { ref, watch, nextTick, onMounted, onBeforeUnmount } from 'vue';
import { useRoute } from 'vue-router';
import { site } from '../data/site';
import { stopScroll, startScroll, scrollToTarget } from '../engine';

const route = useRoute();

const links = [
  { label: 'Work', to: '/work/', key: 'work' },
  { label: 'About', to: '/about/', key: 'about' },
  { label: 'Contact', to: '/#contact', key: 'contact' },
];

const open = ref(false);
const present = ref(false);
const openClass = ref(false);
const panel = ref<HTMLElement | null>(null);
const button = ref<HTMLButtonElement | null>(null);
let returnFocus = false;

const toggle = () => {
  open.value = !open.value;
};

const close = (focus = false) => {
  if (!open.value) return;
  returnFocus = focus;
  open.value = false;
};

watch(open, async (v) => {
  if (v) {
    present.value = true;
    await nextTick();
    requestAnimationFrame(() => {
      openClass.value = true;
    });
    stopScroll();
    document.documentElement.classList.add('menu-open');
    await nextTick();
    panel.value?.querySelector<HTMLElement>('.menu__nav a')?.focus();
  } else {
    openClass.value = false;
    startScroll();
    document.documentElement.classList.remove('menu-open');
    setTimeout(() => {
      present.value = false;
      if (returnFocus) {
        returnFocus = false;
        button.value?.focus();
      }
    }, 700);
  }
});

const focusables = () =>
  [...(panel.value?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? [])];

const onKey = (e: KeyboardEvent) => {
  if (!open.value) return;
  if (e.key === 'Escape') {
    e.preventDefault();
    close(true);
    return;
  }
  if (e.key !== 'Tab' || !panel.value) return;
  const items = focusables();
  if (!items.length) return;
  const first = items[0];
  const last = items[items.length - 1];
  const active = document.activeElement as HTMLElement | null;
  const inside = active ? panel.value.contains(active) : false;
  if (e.shiftKey && (!inside || active === first)) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && (!inside || active === last)) {
    e.preventDefault();
    first.focus();
  }
};

const onLogo = (e: MouseEvent) => {
  if (route.path !== '/') return;
  e.preventDefault();
  if (route.hash) history.replaceState(null, '', '/');
  scrollToTarget(0);
};

const onMenuLink = () => {
  close(true);
};

onMounted(() => document.addEventListener('keydown', onKey));
onBeforeUnmount(() => {
  document.removeEventListener('keydown', onKey);
  document.documentElement.classList.remove('menu-open');
  startScroll();
});
</script>

<template>
  <header class="site-head">
    <RouterLink class="site-head__mark" to="/" @click="onLogo">
      <span class="mark-full">{{ site.name }}</span>
      <span class="mark-short" aria-label="Mohammad Farhan Shaikh">{{ site.mark }}</span>
    </RouterLink>

    <nav class="site-nav" aria-label="Primary">
      <RouterLink v-for="l in links" :key="l.key" class="nav-link" :to="l.to">
        {{ l.label }}
      </RouterLink>
    </nav>

    <button
      ref="button"
      class="menu-btn"
      type="button"
      data-menu-toggle
      :aria-expanded="open ? 'true' : 'false'"
      aria-controls="menu"
      @click="toggle"
    >
      Menu<span class="mono" aria-hidden="true">+</span>
    </button>
  </header>

  <div
    ref="panel"
    class="menu"
    id="menu"
    role="dialog"
    aria-modal="true"
    aria-label="Menu"
    :hidden="!present"
    :class="{ 'is-open': openClass }"
  >
    <button class="menu__close" type="button" @click="close(true)">
      Close <span aria-hidden="true">×</span>
    </button>
    <nav class="menu__nav" aria-label="Mobile">
      <RouterLink
        v-for="(l, i) in links"
        :key="l.key"
        :to="l.to"
        :style="{ '--i': i }"
        @click="onMenuLink"
      >{{ l.label }}</RouterLink>
    </nav>
    <div class="menu__foot mono">
      <a :href="`mailto:${site.email}`" @click="onMenuLink">{{ site.email }}</a>
      <span>{{ site.coordinates }}</span>
    </div>
  </div>
</template>
