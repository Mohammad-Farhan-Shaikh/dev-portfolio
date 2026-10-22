<script setup lang="ts">
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import ThemeToggle from './components/ThemeToggle.vue';
import ScrollTop from './components/ScrollTop.vue';
</script>

<template>
  <a class="skip-link" href="#main">Skip to content</a>

  <div id="curtain" aria-hidden="true">
    <div class="curtain__panel">
      <div class="curtain__edge"></div>
    </div>
  </div>

  <Header />

  <main id="main" tabindex="-1">
    <RouterView />
  </main>

  <Footer />
  <ThemeToggle />
  <ScrollTop />
</template>
