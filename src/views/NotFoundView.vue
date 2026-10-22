<script setup lang="ts">
import LiveRule from '../components/LiveRule.vue';
</script>

<template>
  <section class="notfound">
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
