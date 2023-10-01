<script setup lang="ts">
import type { AboutInfo } from '../../core/types/data.types.ts';

defineProps<{
  aboutInfo: AboutInfo;
}>();
</script>

<template>
  <figure class="about__image-container">
    <img :src="aboutInfo.image" alt="about-image" />
  </figure>
  <h1>{{ aboutInfo.title }}</h1>
  <div class="about__text">
    <p v-for="(text, index) in aboutInfo.text" :key="index">
      {{ text }}
    </p>
  </div>
</template>

<style scoped>
.about__image-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.3rem;
  margin-top: 3rem;
  box-shadow: 0 0 25px -10px rgba(0, 0, 0, 1);
}

h1 {
  font-size: clamp(2.5rem, 6vw, 5rem);
  line-height: 0;

  color: var(--dark);

  animation: fade-left ease-in-out 0.5s;
}

.about__text {
  padding: 1rem;
}

.about__text > p {
  max-width: 75ch;
  font-size: clamp(0.7rem, 5vw, 1.2rem);
}

@keyframes fade-in {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

@keyframes fade-left {
  0% {
    opacity: 0;
    transform: translateX(-1rem);
  }

  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

@media screen and (max-width: 1100px) {
  .about__text {
    width: 80vw;
  }
}

@media screen and (max-width: 550px) {
  .about__image-container {
    width: 100vw;
    height: 20vh;
    padding: 0;
  }

  .about__text {
    margin-top: -2rem;
  }
}
</style>
