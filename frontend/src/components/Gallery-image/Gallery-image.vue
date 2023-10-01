<script setup lang="ts">
import { type Project } from '../../core/types/data.types.ts';

const props = defineProps<{
  project: Project;
}>();
</script>

<template>
  <router-link class="image-container" :to="`projecte/${props.project.id}`">
    <img
      :src="props.project.mainImage"
      alt="image"
      loading="lazy"
      width="200"
      height="200"
    />
    <div class="image-backdrop">
      <h2 class="image-title">
        {{ props.project.year + ' ' + props.project.name }}
      </h2>
    </div>
  </router-link>
</template>

<style scoped>
.image-container {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;

  cursor: pointer;
}

.image-backdrop {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  background-color: var(--dark-opacity-light);
  transition: opacity 0.6s ease;
}

.image-container:hover .image-backdrop,
.image-container:hover .image-backdrop h2 {
  opacity: 1;
}

.image-title {
  z-index: 4;
  position: absolute;
  bottom: 0;
  left: 2rem;
  font-size: clamp(1.5rem, 5vw, 2.5rem);
  text-underline-offset: 10px;
  text-decoration: 1px underline;
  color: #fff;
  opacity: 0;
  transition: opacity 0.6s ease;
  font-weight: 600;
}

@media screen and (max-width: 550px) {
  .image-container .image-backdrop {
    opacity: 1;
    background-color: rgba(0, 0, 0, 0.14);
  }

  .image-container .image-backdrop h2 {
    opacity: 1;
    left: 1rem;
  }
}
</style>
