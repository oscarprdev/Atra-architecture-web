<script setup lang="ts">
import { type ProjectDetail } from '../../core/types/data.types.ts';

const props = defineProps<{
  project: ProjectDetail;
}>();
</script>

<template>
  <section class="project-gallery">
    <article v-for="(image, index) in props.project.images" :key="index">
      <img :src="image" alt="image" loading="lazy" width="200" height="200" />
    </article>
  </section>
</template>

<style scoped>
.project-gallery {
  width: 80vw;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  display: flex;
  flex-wrap: wrap;
}

article {
  width: 30vw;
  height: 30rem;
}

@media screen and (max-width: 950px) {
  .project-gallery {
    margin-top: 3rem;
    width: 95vw;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .image-0 {
    padding: 0.5rem;
    height: auto;
    grid-area: 1 / 1 / 2 / 9;
  }
}
</style>
