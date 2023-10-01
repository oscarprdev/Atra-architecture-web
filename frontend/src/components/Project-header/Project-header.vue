<script setup lang="ts">
import { type ProjectDetail } from '../../core/types/data.types.ts';
import ProjectInfo from '../Project-info/Project-info.vue';

const props = defineProps<{
  project: ProjectDetail;
}>();
</script>

<template>
  <header class="project-header">
    <div class="image-container">
      <img
        :src="props.project.mainImage"
        alt="image"
        loading="lazy"
        width="200"
        height="200"
      />
    </div>
    <ProjectInfo v-if="project" :project="project" />
  </header>
</template>

<style scoped>
.project-header {
  display: flex;
  align-items: center;

  height: 100vh;
}

.image-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 50vw;
  height: 100vh;
  overflow: hidden;
}

.image-container img {
  animation: appearing 0.3s linear forwards;
}

@media screen and (max-width: 950px) {
  .project-header {
    flex-direction: column;
    height: 110vh;
  }
  .image-container {
    position: relative;
    width: 100vw;
    margin-top: -2rem;
  }
}

@media screen and (max-width: 550px) {
  .project-header {
    flex-direction: column;
    height: 100vh;
  }
}
</style>
