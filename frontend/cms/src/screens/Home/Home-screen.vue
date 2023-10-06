<script setup lang="ts">
import Hero from '../../components/Hero/Hero.vue';
import { defineAsyncComponent } from 'vue';

const Gallery = defineAsyncComponent(
  async () => await import('../../components/Gallery/Gallery.vue')
);
</script>

<template>
  <section class="screen">
    <Hero />
    <Gallery />
  </section>
</template>
