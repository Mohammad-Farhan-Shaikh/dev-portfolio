<script setup lang="ts">
import ProjectRow from '../components/ProjectRow.vue';
import Chart from '../components/Chart.vue';
import { site, stack, projects, also, process } from '../data/site';
import { plotCaption } from '../data/plot';

const toolGroups = stack;
</script>

<template>
  <section id="top" class="hero">
    <div class="hero__sheet" aria-hidden="true"></div>
    <div class="hero__inner shell">
      <div class="hero__top">
        <p class="mono">{{ site.coordinates }} &middot; {{ site.location }}</p>
        <p class="mono">Selected work &middot; Focused builds</p>
      </div>

      <p class="hero__kicker mono-label">Frontend developer</p>

      <h1 class="hero__name">
        <span class="hero__word" data-split="chars" data-intro>Mohammad</span>
        <span class="hero__word" data-split="chars" data-intro data-delay="0.1">Farhan</span>
        <span class="hero__word" data-split="chars" data-intro data-delay="0.2">Shaikh</span>
      </h1>

      <div class="hero__route" aria-hidden="true">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" focusable="false">
          <path
            data-route-path
            d="M0,118 C150,118 190,46 320,42 C450,38 462,104 600,100 C740,96 792,26 930,30 C1046,33 1092,76 1200,60"
            pathLength="1"
            stroke-dasharray="1"
            stroke-dashoffset="1"
          />
          <path
            class="hero__flow"
            d="M0,118 C150,118 190,46 320,42 C450,38 462,104 600,100 C740,96 792,26 930,30 C1046,33 1092,76 1200,60"
            pathLength="1"
          />
        </svg>
      </div>

      <div class="hero__bottom">
        <p class="hero__role" data-reveal="up" data-intro data-delay="0.3">
          I design and build interfaces for maps, data and real-time systems with a focus on clarity, performance and usable detail.
        </p>
        <div class="hero__plot" data-reveal="fade" data-intro data-delay="0.42">
          <p class="mono">Focus</p>
          <p><b>Interactive mapping &amp; live data</b></p>
          <p class="mono">Turning complex streams into legible views</p>
          <p class="mono">Vue 3 &middot; TypeScript &middot; Deck.gl &middot; Maps</p>
        </div>
      </div>
    </div>
  </section>

  <section id="about" class="about-block">
    <div class="shell">
      <div class="section-head">
        <h2 data-split="lines">About</h2>
        <p>I build clear interfaces for spatial data and live systems.</p>
      </div>
      <div class="about-grid">
        <div class="about-prose">
          <p>
            I'm Mohammad Farhan Shaikh, a frontend developer based in Navi Mumbai. I focus on map interfaces, real-time
            views and the data behind them, keeping things legible without adding noise.
          </p>
          <p>
            At Lateral Emsoft, I work on tracking interfaces that bring routes, trips and locations together in one
            view.
          </p>
        </div>
        <div class="about-list">
          <article class="about-card" data-reveal="up">
            <h3>Focus</h3>
            <p>Interactive maps, live data, dashboards and spatial UX.</p>
          </article>
          <article class="about-card" data-reveal="up">
            <h3>Location</h3>
            <p>Navi Mumbai, India &middot; IST</p>
          </article>
        </div>
      </div>
    </div>
  </section>

  <section class="work" id="work">
    <div class="shell">
      <div class="section-head">
        <h2 data-split="lines">Selected work</h2>
        <p>
          A focused set of builds spanning live tracking, operations tooling, spatial data and small utilities.
        </p>
      </div>

      <div class="work__grid">
        <ol class="work__list" data-work-list>
          <ProjectRow v-for="(p, i) in projects" :key="p.slug" :project="p" :index="i" :total="projects.length" />
        </ol>

        <div class="work__chart" data-plot>
          <Chart :count="projects.length" />
          <p class="plot-caption mono">{{ plotCaption }}</p>
        </div>
      </div>
    </div>
  </section>

  <section class="approach">
    <div class="shell">
      <div class="section-head">
        <h2 data-split="lines">Approach</h2>
        <p>Pragmatic steps that keep the interface and the data in sync.</p>
      </div>
      <ol class="approach__list">
        <li v-for="(s, i) in process" :key="s.step" class="approach__row" data-reveal="up">
          <span class="approach__num mono">0{{ i + 1 }}</span>
          <h3 class="approach__step">{{ s.step }}</h3>
          <p class="approach__text">{{ s.text }}</p>
        </li>
      </ol>
    </div>
  </section>

  <section class="notes">
    <div class="shell">
      <div class="notes__grid">
        <div class="notes__intro">
          <h2 data-split="lines">Other work</h2>
          <p class="notes__lead">Smaller pieces that sharpened the same craft.</p>
        </div>
        <div class="notes__list">
          <article v-for="a in also" :key="a.title" class="note" data-reveal="up">
            <h3>{{ a.title }}</h3>
            <p>{{ a.text }}</p>
          </article>
        </div>
      </div>
    </div>
  </section>

  <section class="system">
    <div class="shell">
      <div class="section-head">
        <h2 data-split="lines">Tools</h2>
        <p>Picked to keep maps, state and data easy to reason about.</p>
      </div>
      <div class="spec__grid">
        <div v-for="g in toolGroups" :key="g.group" class="spec__block">
          <h3>{{ g.group }}</h3>
          <ul class="tool-list">
            <li v-for="item in g.items" :key="item">{{ item }}</li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <section id="contact" class="contact-block">
    <div class="shell">
      <div class="section-head">
        <h2 data-split="lines">Contact</h2>
        <p>Open to building map-driven products and thoughtful interfaces.</p>
      </div>
      <div class="contact-grid">
        <a class="contact-card" :href="`mailto:${site.email}`" data-reveal="up">
          <span class="mono">Email</span>
          <strong>{{ site.email }}</strong>
        </a>
        <a class="contact-card" href="https://github.com/Mohammad-Farhan-Shaikh" target="_blank" rel="noopener" data-reveal="up">
          <span class="mono">GitHub</span>
          <strong>github.com/Mohammad-Farhan-Shaikh</strong>
        </a>
        <a class="contact-card" href="https://www.linkedin.com/in/mohammad-farhan-shaikh70" target="_blank" rel="noopener" data-reveal="up">
          <span class="mono">LinkedIn</span>
          <strong>linkedin.com/in/mohammad-farhan-shaikh70</strong>
        </a>
      </div>
    </div>
  </section>
</template>
