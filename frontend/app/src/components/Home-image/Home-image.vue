<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Image1 from '../../assets/images/rocafort-cuina.jpg';
import Image2 from '../../assets/images/santa_ana.jpg';

const imagesList = [Image1, Image2];
const currentImage = ref<ImageMetadata>(imagesList[0]);
let currentIndex = 0;

const preloadImage = (url: ImageMetadata): Promise<void> => {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.src = url.src;
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
    <figure
        class="absolute top-[-5rem] w-[90vw] h-[35vh] overflow-hidden md:w-full md:top-[15%] md:left-[-5rem] md:h-[70%]"
    >
        <img
            v-if="currentImage"
            :src="currentImage.src"
            alt="imatge destacada de projecte"
            class="w-full h-full object-cover"
        />
    </figure>
</template>
