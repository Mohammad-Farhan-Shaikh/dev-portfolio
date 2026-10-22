<script setup lang="ts">
import LiveRule from '../components/LiveRule.vue';
import { site, roles, stack, education } from '../data/site';
</script>

<template>
  <section class="page-head">
    <div class="shell">
      <p class="page-head__label mono">Sheet 02 &middot; About</p>
      <h1 class="page-head__title" data-split="lines" data-intro>The map layer</h1>
      <p class="page-head__lead" data-reveal="up" data-intro data-delay="0.2">
        I am a frontend developer in Navi Mumbai. My work sits between the map and the data: live vehicle positions,
        route history, trip analytics, and the tiles under all of it.
      </p>
    </div>
    <LiveRule />
  </section>

  <section class="log">
    <div class="shell">
      <h2 class="sr-only">Where the work has been</h2>
      <article v-for="r in roles" :key="r.company + r.from" class="log__row">
        <div class="log__when">
          <p class="mono">{{ r.from }} to {{ r.to }}</p>
          <p class="log__org">{{ r.company }}</p>
          <p class="mono">{{ r.location }}</p>
        </div>
        <div class="log__what">
          <h3>{{ r.title }}</h3>
          <p>{{ r.summary }}</p>
          <ul class="log__points">
            <li v-for="p in r.points" :key="p">{{ p }}</li>
          </ul>
        </div>
      </article>
    </div>
  </section>

  <section class="system">
    <div class="shell">
      <div class="section-head">
        <h2 data-split="lines">The system</h2>
        <p>What the work is built with, grouped the way it is actually used.</p>
      </div>
      <div class="spec__grid">
        <div v-for="g in stack" :key="g.group" class="spec__block">
          <h3>{{ g.group }}</h3>
          <ul class="tool-list">
            <li v-for="item in g.items" :key="item">{{ item }}</li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <section class="system">
    <div class="shell">
      <div class="section-head">
        <h2 data-split="lines">Education</h2>
        <p>Where the map habit started.</p>
      </div>
      <div class="spec__grid">
        <div v-for="e in education" :key="e.title" class="spec__block">
          <h3>{{ e.title }}</h3>
          <ul class="tool-list">
            <li>{{ e.school }}</li>
            <li>{{ e.from }} to {{ e.to }}</li>
            <li>{{ e.note }}</li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <section class="notes">
    <div class="shell">
      <div class="notes__grid">
        <div class="notes__intro">
          <h2 data-split="lines">How to reach me</h2>
          <p class="notes__lead">
            Navi Mumbai, India. Working hours follow IST, so morning mail lands first.
          </p>
        </div>
        <div class="notes__list">
          <article class="note" data-reveal="up">
            <h3>Email</h3>
            <p><a :href="`mailto:${site.email}`">{{ site.email }}</a></p>
          </article>
          <article class="note" data-reveal="up">
            <h3>Code</h3>
            <p>
              <a href="https://github.com/Mohammad-Farhan-Shaikh" rel="noopener" target="_blank">
                github.com/Mohammad-Farhan-Shaikh
              </a>
            </p>
          </article>
          <article class="note" data-reveal="up">
            <h3>Work history</h3>
            <p>
              <a href="https://www.linkedin.com/in/mohammad-farhan-shaikh70" rel="noopener" target="_blank">
                linkedin.com/in/mohammad-farhan-shaikh70
              </a>
            </p>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>
