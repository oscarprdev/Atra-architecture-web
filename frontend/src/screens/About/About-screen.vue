<script setup lang="ts">
import { type Ref, defineAsyncComponent, onMounted, ref } from 'vue';
import { DefaultAboutService } from '../../core/services/about-service';
import { AboutInfo } from '../../core/types/data.types.ts';

const About = defineAsyncComponent(
  async () => await import('../../components/About/About.vue')
);

const aboutInfo: Ref<AboutInfo | null> = ref(null);

onMounted(async () => {
  aboutInfo.value = await new DefaultAboutService().getAboutScreenInfo();
});
</script>

<template>
  <section class="screen about-screen">
    <About v-if="aboutInfo" :about-info="aboutInfo" />
  </section>
</template>

<style>
.about-screen {
  padding: 4rem 2rem;
  animation: fade-in 0.5s ease;
  gap: 2rem;
}
</style>
