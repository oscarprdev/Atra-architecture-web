<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue';
import { type ProjectGallery } from '../../core/types/data.types.ts';
import { DefaultProjectsService } from '../../core/services/projects.service';

const lazyImages = ref<HTMLElement[]>([]);
const projectImages = ref<string[]>([]);

const projects = ref<ProjectGallery[]>([]);

const renderImagesAtIntersecting = () => {
  const options = {
    root: null,
    threshold: 0.3,
  };

  lazyImages.value = Array.from(document.querySelectorAll('.gallery-item'));

  lazyImages.value.forEach((item, index) => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          item.classList.add('gallery-active');
          projectImages.value[index] = projects.value[index].mainImage;
          observer.unobserve(item);
        }
      });
    }, options);

    observer.observe(item);
  });
};

onMounted(async () => {
  projects.value = await new DefaultProjectsService().getProjectsGallery();

  nextTick(renderImagesAtIntersecting);
});
</script>

<template>
  <section class="gallery-container">
    <h1 class="gallery-title">Destacats</h1>
    <div class="gallery" v-if="projects">
      <article
        v-for="(project, index) in projects"
        :key="project.id"
        class="gallery-item"
      >
        <figure id="gallery-image-wrapper" class="image-wrapper">
          <img
            :src="projectImages[index]"
            loading="lazy"
            alt="project main image"
            ref="lazyImages"
          />
        </figure>
        <div class="project-info">
          <p>{{ project.name }}</p>
          <p>{{ project.description }}</p>
          <p class="project-year">{{ project.year }}</p>
          <span>{{ project.name }}</span>
          <router-link :to="`/projecte/${project.id}`" class="project-link"
            >Veure mes</router-link
          >
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.gallery-active {
  animation: fade-up 0.5s linear forwards;
}
.gallery-container {
  position: relative;
  padding: 3rem;
  width: 100vw;
  height: fit-content;
  z-index: 2;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
}

.gallery-title {
  pointer-events: none;
  line-height: 1rem;

  color: var(--dark);
  text-align: start;

  z-index: 3;
  font-size: clamp(1.3rem, 4vw, 4rem);
  text-transform: uppercase;
}

.gallery {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8rem;
}

.gallery-item {
  opacity: 0;
  display: flex;
  gap: 5rem;
  width: 90vw;
  height: 70vh;
  position: relative;
}

.image-wrapper {
  height: 70%;
  width: 33%;
  position: relative;
}

.gallery-item::after {
  position: absolute;
  content: '';
  height: 70%;
  width: 33%;
  background-color: var(--hero-image-light);
  top: 6vh;
  left: 5vw;
  z-index: -1;
}

.project-info {
  display: flex;
  flex-direction: column;
  align-items: start;
}

.project-year {
  position: absolute;
  top: -2rem;
  font-size: 10rem;
  color: var(--hero-light);
  z-index: -1;
  right: -15rem;
}

.project-info::after {
  content: '';
  position: absolute;
  width: 10rem;
  height: 2px;
  background-color: var(--hero-light);
  bottom: 20vh;
  right: 19rem;
}

.project-link {
  text-transform: uppercase;
  color: var(--hero-mid-light);
  cursor: pointer;
  position: absolute;
  font-size: clamp(1rem, 3vw, 1.5rem);
  bottom: 22vh;
  right: 17vw;

  display: flex;
  align-items: center;
  gap: 1rem;
}

.project-link:hover {
  color: var(--hero-dark-light);
}

.gallery-item:nth-child(even) {
  flex-direction: row-reverse;
}

.gallery-item:nth-child(even)::after {
  left: 55vw;
}

.gallery-item:nth-child(even) .project-info {
  align-items: end;
  text-align: end;
}

.gallery-item:nth-child(even) .project-info::after {
  right: 68vw;
}

.gallery-item:nth-child(even) .project-year {
  right: 72vw;
}

.gallery-item:nth-child(even) .project-link {
  right: 72vw;
}

h3 {
  font-size: clamp(1.3rem, 4vw, 4rem);
  margin-bottom: -1rem;
}

p {
  font-size: clamp(0.8rem, 3vw, 1.6rem);
  width: 40vw;
  color: rgb(114, 114, 114);
}

.project-info p:first-of-type {
  font-size: clamp(1.2rem, 3vw, 2rem);
  color: var(--dark);
}

.project-info span:last-of-type {
  position: absolute;
  top: 1.5rem;
  left: calc(50% - 2.2rem);

  font-size: 4rem;
  color: var(--hero-light);
  z-index: -1;
}

.gallery-item:nth-child(even) .project-info span:last-of-type {
  left: auto;
  margin-right: 2rem;
}
</style>
