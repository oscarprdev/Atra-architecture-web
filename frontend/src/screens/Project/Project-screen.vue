<script setup lang="ts">
import { defineAsyncComponent } from 'vue';

const Project = defineAsyncComponent(
  async () => await import('../../components/Project/Project.vue')
);
</script>

<template>
  <section class="screen project-screen">
    <Project />
  </section>
</template>

<style scoped>
.project-screen {
  padding: 5rem 0 0;
}
</style>
