<script setup lang="ts">
import { type Project } from '../../core/types/data.types.ts';

const props = defineProps<{ projects: Project[] }>();
</script>

<template>
  <h1 class="projects-title">Projectes</h1>
  <div class="projects-container">
    <RouterLink
      v-for="project in props.projects"
      :key="project.id"
      class="project-container"
      :to="`projecte/${project.id}`"
    >
      <img
        :src="project.mainImage"
        alt="image"
        loading="lazy"
        width="200"
        height="200"
      />
      <h2>{{ project.year + ' ' + project.name }}</h2>
    </RouterLink>
  </div>
</template>

<style scoped>
.projects-container {
  max-width: 90vw;
  padding: 2rem 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(24rem, 1fr));
  gap: 0.4rem;
}

.projects-title {
  pointer-events: none;
  line-height: 0.2rem;

  color: var(--dark);
  text-align: center;

  opacity: 0;
  z-index: 1;
  font-size: clamp(1.3rem, 4vw, 4rem);
  text-transform: uppercase;

  animation: appear-left 0.5s linear forwards;
}

.project-container {
  z-index: 2;
  min-width: 15rem;
  height: 45vh;
  position: relative;
  cursor: pointer;
  overflow: hidden;
  opacity: 0;
  animation: appearing 0.3s ease-in-out forwards;
}

.number {
  position: absolute;
  bottom: -20rem;
  right: -2rem;
  color: var(--bg-gray);
  font-size: 15rem;
  overflow: hidden;
}

.project-container:after {
  background: linear-gradient(
    rgba(5, 3, 3, 0.6),
    rgba(9, 5, 5, 0.1) 80px,
    rgba(51, 29, 30, 0) 100px
  );
  box-shadow: inset 0 0 30px -59px #000000;
  content: '';
  display: block;
  height: 100%;
  position: absolute;
  top: 0;
  width: 100%;
}

h2 {
  position: absolute;
  color: #fff;
  top: -1rem;
  left: 1rem;
  z-index: 2;
  font-size: clamp(1rem, 4vw, 1.7rem);
}

h2::after {
  content: '';
  width: 5rem;
  height: 1px;
  background-color: #fff;
  position: absolute;
  top: 3rem;
  left: 2rem;
}

img {
  transition: all 0.5s ease;
}

.project-container:hover img {
  transform: scale(1.04);
}

h2:before {
  content: '';
  width: 8rem;
  height: 2px;
  background-color: #fff;
  position: absolute;
  bottom: -2px;
  left: 0;
  transform: scaleX(0);
  transform-origin: left center;
  transition: transform 0.3s ease;
}

article:hover h2:before {
  transform: scaleX(1);
}

@media screen and (max-width: 550px) {
  .projects-container {
    padding: 3rem 0;
    width: 90vw;
    grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
  }

  h2 {
    top: 0;
  }

  h2::after {
    top: 2rem;
  }
}
</style>
