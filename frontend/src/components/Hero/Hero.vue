<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Image1 from '../../assets/images/rocafort-cuina_zfm2kx.jpg';
import Image2 from '../../assets/images/santa_ana_ms2iui.jpg';

const imagesList = [Image1, Image2];
const currentImage = ref<string>(imagesList[0]);
let currentIndex = 0;

const preloadImage = (url: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = url;
    image.classList.add('image-active');
    image.onload = () => resolve();
    image.onerror = reject;
  });
};

const loadNextImage = async () => {
  currentIndex = (currentIndex + 1) % imagesList.length;
  await preloadImage(imagesList[currentIndex]);
  currentImage.value = imagesList[currentIndex];
};

onMounted(async () => {
  await preloadImage(imagesList[currentIndex]);
  setInterval(loadNextImage, 7000);
});
</script>

<template>
  <section class="hero">
    <div class="hero-title">
      <h1>ATRA</h1>
      <p>Asistència tècnica en rehabilitació i arquitectura</p>
      <p>Jaume Perez Llopis</p>
    </div>
    <figure class="image-wrapper">
      <img
        v-if="currentImage"
        :key="currentImage"
        :src="currentImage"
        alt="imatge destacada de projecte"
      />
    </figure>
  </section>
</template>

<style scoped>
.hero {
  padding: 3rem;
  height: 100vh;
  width: 100vw;

  display: flex;
  align-items: center;
  justify-content: space-between;
}

.hero-title {
  display: flex;
  flex-direction: column;
  align-items: baseline;
  margin-top: -10rem;
  position: relative;

  animation: fade-right 0.5s ease-in-out forwards;
}

.hero-title::after {
  content: '';
  position: absolute;
  width: 20rem;
  height: 3px;
  background-color: var(--dark);
  top: 18rem;
  left: 4rem;
  background-color: var(--hero-light);
}

h1 {
  font-size: clamp(2rem, 15vw, 10rem);
  line-height: 1px;
  color: rgb(0, 0, 0);
  margin: 4rem;
}

p {
  color: rgb(0, 0, 0);
  font-size: clamp(1rem, 3vw, 1.5rem);
  margin: 0.5rem;
}

p:nth-child(odd) {
  color: rgb(95, 95, 95);
}

.image-wrapper {
  width: 40vw;
  height: 70vh;
  margin-right: 5rem;
  margin-top: 5rem;
  border: none;
  z-index: 2;
}

.image-wrapper img {
  animation: appearing 0.7s linear forwards;
}

.image-wrapper::after {
  z-index: -1;
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 40vw;
  height: 100vh;
  background-color: var(--dark);
}

@media screen and (max-width: 630px) {
  .hero {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }

  .hero-title {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin-top: 3rem;
    position: relative;
  }

  .hero-title::after {
    display: none;
  }

  h1 {
    margin: 2rem;
  }

  .image-wrapper {
    width: 80vw;
    height: 50vh;
    margin-right: 2rem;
    margin-top: 3rem;
    border: none;
    z-index: 2;
  }

  .image-wrapper::after {
    width: 100vw;
    height: 45vh;
    top: 55vh;
    bottom: 0;
  }
}
</style>
