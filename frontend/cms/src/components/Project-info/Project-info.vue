<script setup lang="ts">
import { type ProjectDetail } from '../../core/types/data.types.ts';

const props = defineProps<{
  project: ProjectDetail;
}>();
</script>

<template>
  <div class="project-info">
    <h1 class="project-title">{{ props.project.name }}</h1>
    <h2 class="project-year">{{ props.project.year }}</h2>
    <p class="project-description">
      {{ props.project.description }}
    </p>
    <p>{{ props.project.name }}</p>
  </div>
</template>

<style scoped>
.project-info {
  display: flex;
  flex-direction: column;
  width: 37vw;

  position: absolute;
  right: 10%;
  top: 10rem;
  opacity: 0;

  animation: appear-left 0.5s linear forwards;
}

.project-info p:last-of-type {
  position: absolute;
  font-size: clamp(2.2rem, 10vw, 6rem);
  text-transform: uppercase;
  color: var(--hero-light);
  top: 0;
  left: 4rem;
  font-weight: 400;
}

.project-title {
  color: var(--dark);
  z-index: 1;
  font-size: clamp(2rem, 10vw, 5rem);
  text-transform: uppercase;
}

.project-year {
  color: var(--dark-opacity);
  margin-top: -3rem;
  font-size: clamp(1rem, 7vw, 2.4rem);
}

.project-description {
  max-width: 60ch;
  font-size: clamp(0.8rem, 5vw, 1.5rem);
}

@media screen and (max-width: 950px) {
  .project-info {
    position: inherit;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 90vw;

    opacity: 0;
    animation: appear-left 0.5s linear forwards;
  }

  .project-description {
    text-align: center;
  }
}
</style>
